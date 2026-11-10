import asyncio
import time
import uuid
from pathlib import Path
from typing import Dict, Any, Optional, List
from src.cliplocal.core.models import (
    JobState, JobStatus, VideoMetadata, CandidateClip,
    CaptionStyleName, ReframeMode
)
from src.cliplocal.web.db import save_job, get_job
from src.cliplocal.ingest.downloader import is_url, download_video
from src.cliplocal.ingest.probe import probe_video
from src.cliplocal.ingest.audio import extract_normalized_audio
from src.cliplocal.transcribe.service import transcribe_audio_cached
from src.cliplocal.segment.sentences import group_words_into_sentences
from src.cliplocal.candidates.window_builder import build_candidate_windows
from src.cliplocal.score.virality import score_all_candidates
from src.cliplocal.candidates.dedupe import deduplicate_candidates
from src.cliplocal.llm.rerank import rerank_candidates_with_llm
from src.cliplocal.render.engine import render_candidate_clip

class JobManager:
    def __init__(self):
        self.queue: asyncio.Queue = asyncio.Queue()
        self.active_jobs: Dict[str, JobState] = {}
        self.cancelled_jobs: set = set()
        self.worker_task: Optional[asyncio.Task] = None

    def start_worker(self):
        if self.worker_task is None or self.worker_task.done():
            self.worker_task = asyncio.create_task(self._worker_loop())

    async def _worker_loop(self):
        while True:
            job_id, source, options = await self.queue.get()
            try:
                await self._execute_job(job_id, source, options)
            except Exception as e:
                if job_id in self.active_jobs:
                    job = self.active_jobs[job_id]
                    job.status = JobStatus.FAILED
                    job.error_message = str(e)
                    job.stage = "Failed"
                    job.log_messages.append(f"❌ Error: {e}")
                    self._persist_job(job, options)
            finally:
                self.queue.task_done()

    def _persist_job(self, job: JobState, options: dict):
        save_job(
            job_id=job.job_id,
            created_at=job.created_at,
            status=job.status.value,
            progress=job.progress,
            stage=job.stage,
            source=job.source_url_or_path,
            options=options,
            state=job.model_dump()
        )

    def submit_job(self, source: str, options: dict) -> JobState:
        job_id = f"job_{uuid.uuid4().hex[:12]}"
        job = JobState(
            job_id=job_id,
            created_at=time.time(),
            source_url_or_path=source,
            status=JobStatus.QUEUED,
            progress=0.0,
            stage="Queued in processing backlog",
            log_messages=[f"Job created for source: {source}"]
        )
        self.active_jobs[job_id] = job
        self._persist_job(job, options)
        self.queue.put_nowait((job_id, source, options))
        return job

    def cancel_job(self, job_id: str) -> bool:
        self.cancelled_jobs.add(job_id)
        if job_id in self.active_jobs:
            self.active_jobs[job_id].status = JobStatus.CANCELLED
            self.active_jobs[job_id].stage = "Cancelled by user"
            return True
        return False

    def get_job_state(self, job_id: str) -> Optional[JobState]:
        if job_id in self.active_jobs:
            return self.active_jobs[job_id]
        persisted = get_job(job_id)
        if persisted and persisted.get("state"):
            return JobState.model_validate(persisted["state"])
        return None

    async def _execute_job(self, job_id: str, source: str, options: dict):
        job = self.active_jobs[job_id]
        if job_id in self.cancelled_jobs:
            return

        timing_report: Dict[str, float] = {}

        def log(msg: str):
            job.log_messages.append(msg)

        # 1. Ingest
        t0 = time.perf_counter()
        job.status = JobStatus.INGESTING
        job.stage = "1. Ingesting & probing media"
        job.progress = 5.0
        log(f"Starting media ingestion for: {source}")

        if is_url(source):
            log("Downloading video via yt-dlp...")
            video_path = await asyncio.to_thread(download_video, source)
        else:
            video_path = Path(source).resolve()

        if not video_path.exists():
            raise FileNotFoundError(f"Video file not found: {video_path}")

        metadata = await asyncio.to_thread(probe_video, video_path)
        job.metadata = metadata
        log(f"Probe complete: {metadata.width}x{metadata.height} | {metadata.duration:.1f}s | FPS: {metadata.fps}")

        log("Normalizing 16kHz mono audio for Whisper...")
        audio_path = await asyncio.to_thread(extract_normalized_audio, video_path)
        timing_report["Ingest & Probe"] = round(time.perf_counter() - t0, 3)
        job.progress = 20.0
        self._persist_job(job, options)

        if job_id in self.cancelled_jobs:
            return

        # 2. Transcribe
        t0 = time.perf_counter()
        job.status = JobStatus.TRANSCRIBING
        job.stage = "2. Transcribing speech with word-level timestamps"
        backend = options.get("backend", "mlx")
        log(f"Transcribing audio with backend '{backend}'...")

        transcript = await asyncio.to_thread(
            transcribe_audio_cached,
            audio_path=audio_path,
            backend=backend,
            language=options.get("language")
        )
        job.transcript = transcript
        log(f"Transcription complete: {len(transcript.words)} words detected (Language: {transcript.language})")
        timing_report["Transcription"] = round(time.perf_counter() - t0, 3)
        job.progress = 45.0
        self._persist_job(job, options)

        if job_id in self.cancelled_jobs:
            return

        # 3. Sentence Segmentation
        t0 = time.perf_counter()
        job.status = JobStatus.SEGMENTING
        job.stage = "3. Sentence & natural thought boundary segmentation"
        log("Grouping words into complete sentences...")
        sentences = await asyncio.to_thread(group_words_into_sentences, transcript.words)
        job.transcript.sentences = sentences
        log(f"Segmented into {len(sentences)} natural thought units")
        timing_report["Segmentation"] = round(time.perf_counter() - t0, 3)
        job.progress = 55.0
        self._persist_job(job, options)

        # 4. Candidates & Scoring
        t0 = time.perf_counter()
        job.status = JobStatus.SCORING
        job.stage = "4. Building & scoring viral candidate windows"
        min_dur = float(options.get("min_duration", 20.0))
        max_dur = float(options.get("max_duration", 60.0))
        
        raw_candidates = await asyncio.to_thread(
            build_candidate_windows,
            sentences=sentences,
            min_duration=min_dur,
            max_duration=max_dur
        )
        log(f"Generated {len(raw_candidates)} candidate windows ({min_dur}s - {max_dur}s)")

        scored = await asyncio.to_thread(score_all_candidates, raw_candidates, audio_path=audio_path)
        clip_count = int(options.get("clips", 6))
        top_candidates = await asyncio.to_thread(deduplicate_candidates, scored, top_n=clip_count)
        log(f"Deduplicated and selected top {len(top_candidates)} viral candidates")

        # 4.5 Optional Local LLM Re-Ranking
        if options.get("use_llm"):
            job.stage = "4.5 Ollama Local LLM Re-Ranking & Titles"
            log("Running local Ollama LLM to enhance titles and social hooks...")
            top_candidates = await asyncio.to_thread(rerank_candidates_with_llm, top_candidates)
            log("LLM re-ranking and caption generation complete")

        timing_report["Scoring & Ranking"] = round(time.perf_counter() - t0, 3)
        job.progress = 70.0
        self._persist_job(job, options)

        if job_id in self.cancelled_jobs:
            return

        # 5. Render Clips
        t0 = time.perf_counter()
        job.status = JobStatus.RENDERING
        job.stage = "5. Rendering 1080x1920 clips with burned-in ASS captions"
        output_dir = Path("output") / video_path.stem
        output_dir.mkdir(parents=True, exist_ok=True)

        style_str = options.get("style", "hormozi")
        mode_str = options.get("mode", "auto")
        caption_style = CaptionStyleName(style_str) if style_str in [e.value for e in CaptionStyleName] else CaptionStyleName.HORMOZI
        reframe_mode = ReframeMode(mode_str) if mode_str in [e.value for e in ReframeMode] else ReframeMode.AUTO

        rendered_list = []
        for i, cand in enumerate(top_candidates):
            if job_id in self.cancelled_jobs:
                return
            cand.caption_style = caption_style
            log(f"Rendering clip #{cand.index:02d} ({cand.duration:.1f}s, Score: {cand.score.total_score:.1f})...")
            
            await asyncio.to_thread(
                render_candidate_clip,
                video_path=video_path,
                candidate=cand,
                output_dir=output_dir,
                metadata=metadata,
                reframe_mode=reframe_mode,
                auto_zoom=bool(options.get("auto_zoom", True)),
                multicam=bool(options.get("multicam", True)),
                top_banner=bool(options.get("top_banner", True)),
                include_emojis=bool(options.get("include_emojis", True)),
                include_sfx=bool(options.get("include_sfx", True)),
                background_music=bool(options.get("background_music", False)),
                anti_copyright=bool(options.get("anti_copyright", False)),
                broll=bool(options.get("broll", False)),
                extract_thumbnails=True,
                watermark=options.get("watermark")
            )
            rendered_list.append(cand)
            step_progress = 70.0 + ((i + 1) / len(top_candidates)) * 28.0
            job.progress = round(step_progress, 1)
            self._persist_job(job, options)

        timing_report["Rendering"] = round(time.perf_counter() - t0, 3)
        job.candidates = rendered_list
        job.timing_report = timing_report
        job.progress = 100.0
        job.status = JobStatus.COMPLETED
        job.stage = "Completed"
        log("🎉 All short clips rendered and ready for preview & export!")
        self._persist_job(job, options)

job_manager = JobManager()
