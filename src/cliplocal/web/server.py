import os
import asyncio
import shutil
import mimetypes
from contextlib import asynccontextmanager
from pathlib import Path
from typing import Optional, List
from fastapi import FastAPI, UploadFile, File, Form, HTTPException, Request, Response
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from src.cliplocal.core.models import JobState, CaptionStyleName, ReframeMode, Word
from src.cliplocal.web.jobs import job_manager
from src.cliplocal.web.db import list_jobs, get_analytics_summary, list_brand_kits, save_brand_kit, delete_brand_kit
from src.cliplocal.render.engine import render_candidate_clip
from src.cliplocal.render.crop import build_crop_filter
from src.cliplocal.render.ffmpeg import run_ffmpeg_render
from src.cliplocal.captions.ass_generator import generate_ass_subtitles
from src.cliplocal.export.delivery import create_client_delivery_bundle
from src.cliplocal.export.scheduler import export_bulk_schedule_csv
from src.cliplocal.harvest.monitor import detect_unprocessed_videos
from src.cliplocal.discovery.finder import search_viral_long_videos, CURATED_PRESETS
from src.cliplocal.config.settings import config

@asynccontextmanager
async def lifespan(app: FastAPI):
    job_manager.start_worker()
    yield

app = FastAPI(title="ClipLocal API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SubmitJobRequest(BaseModel):
    source: str
    clips: int = 6
    style: str = "hormozi"
    mode: str = "auto"
    min_duration: float = 20.0
    max_duration: float = 60.0
    backend: str = "mlx"
    language: Optional[str] = None
    podcast_mode: bool = False
    style_profile: Optional[str] = "raj_shamani"
    use_llm: bool = False
    auto_zoom: bool = True
    multicam: bool = True
    top_banner: bool = False
    include_emojis: bool = True
    include_sfx: bool = True
    background_music: bool = False
    mute_original: bool = False
    music_track: Optional[str] = "ambient_lofi"
    music_volume: float = 0.22
    anti_copyright: bool = False
    broll: bool = False
    watermark: Optional[str] = None
    frequency_carving: bool = True
    podcast_reaction_split: bool = False
    hook_snap_zoom: bool = True
    hook_stinger: bool = True
    hook_stinger_type: str = "whoosh"
    strip_fillers: bool = True
    teaser_stitch: bool = False
    use_stickers: bool = False
    retention_bar: bool = False
    semantic_highlighting: bool = True
    pattern_zoom: bool = True

@app.post("/api/jobs")
async def create_job(req: SubmitJobRequest):
    job = job_manager.submit_job(req.source, req.model_dump())
    return {"job_id": job.job_id, "status": job.status}

@app.post("/api/upload")
async def upload_file(file: UploadFile = File(...)):
    cache_dir = Path(".cache/uploads")
    cache_dir.mkdir(parents=True, exist_ok=True)
    dest_path = cache_dir / file.filename

    with open(dest_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return {"file_path": str(dest_path.resolve()), "filename": file.filename}

@app.get("/api/jobs")
async def get_all_jobs():
    return list_jobs()

@app.get("/api/health")
async def get_health():
    from src.cliplocal.llm.circuit_breaker import ollama_circuit_breaker
    ram_gb = 16.0
    try:
        import psutil
        ram_gb = round(psutil.virtual_memory().available / (1024**3), 2)
    except Exception:
        pass

    has_metal = False
    try:
        import mlx.core as mx
        has_metal = mx.metal.is_available()
    except Exception:
        pass

    return {
        "status": "healthy",
        "metal_accelerated": has_metal,
        "metal_device_name": "Apple M4 (Unified Memory)" if has_metal else "CPU Fallback",
        "whisper_model": "mlx-community/whisper-large-v3-turbo" if has_metal else "whisper-base",
        "ollama_available": ollama_circuit_breaker.state.value != "OPEN",
        "circuit_breaker_state": ollama_circuit_breaker.state.value,
        "ram_available_gb": ram_gb,
        "active_workers": config.get("parallel_workers", 3) if isinstance(config, dict) else getattr(config, "parallel_workers", 3)
    }

@app.get("/api/analytics")
async def get_analytics():
    return get_analytics_summary()

@app.get("/api/brand-kits")
async def get_brand_kits():
    return list_brand_kits()

@app.post("/api/brand-kits")
async def create_or_update_brand_kit(req: Request):
    data = await req.json()
    return save_brand_kit(data)

@app.put("/api/brand-kits/{kit_id}")
async def update_brand_kit_endpoint(kit_id: str, req: Request):
    data = await req.json()
    data["id"] = kit_id
    return save_brand_kit(data)

@app.delete("/api/brand-kits/{kit_id}")
async def delete_brand_kit_endpoint(kit_id: str):
    success = delete_brand_kit(kit_id)
    return {"deleted": success}

@app.get("/api/jobs/{job_id}")
async def get_job_status(job_id: str):
    job = job_manager.get_job_state(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    return job.model_dump()

@app.post("/api/jobs/{job_id}/cancel")
async def cancel_job(job_id: str):
    success = job_manager.cancel_job(job_id)
    return {"cancelled": success}

@app.delete("/api/jobs/{job_id}")
async def delete_job_endpoint(job_id: str):
    success = job_manager.delete_job(job_id)
    return {"deleted": success}

@app.post("/api/jobs/{job_id}/retry")
async def retry_job_endpoint(job_id: str):
    new_job = job_manager.retry_job(job_id)
    if not new_job:
        raise HTTPException(status_code=404, detail="Job could not be found to retry")
    return {"job_id": new_job.job_id, "status": new_job.status}

class ReRenderRequest(BaseModel):
    job_id: str
    clip_id: str
    start: float
    end: float
    title: Optional[str] = None
    deleted_words: List[int] = [] # Autocut-style: indices of words to remove
    caption_style: str = "hormozi"
    reframe_mode: str = "center"
    auto_zoom: bool = True
    multicam: bool = True
    top_banner: bool = False
    include_emojis: bool = True
    include_sfx: bool = True
    background_music: bool = False
    mute_original: bool = False
    music_track: Optional[str] = "ambient_lofi"
    music_volume: float = 0.22
    anti_copyright: bool = False
    broll: bool = False
    watermark: Optional[str] = None
    frequency_carving: bool = True
    podcast_reaction_split: bool = False
    hook_snap_zoom: bool = True
    hook_stinger: bool = True
    hook_stinger_type: str = "whoosh"
    strip_fillers: bool = True
    teaser_stitch: bool = False
    use_stickers: bool = False
    retention_bar: bool = False
    semantic_highlighting: bool = True
    pattern_zoom: bool = True
    hook_headline: Optional[str] = None
    style_profile: Optional[str] = None

@app.post("/api/clips/re-render")
def re_render_clip(req: ReRenderRequest):
    job = job_manager.get_job_state(req.job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    candidate = next((c for c in job.candidates if c.clip_id == req.clip_id), None)
    if not candidate:
        raise HTTPException(status_code=404, detail="Candidate not found")

    # Update candidate boundaries and context headline
    candidate.start = req.start
    candidate.end = req.end
    candidate.duration = req.end - req.start
    if req.title is not None:
        candidate.title = req.title

    effective_reframe = ReframeMode(req.reframe_mode) if req.reframe_mode in [e.value for e in ReframeMode] else ReframeMode.CENTER
    if req.podcast_reaction_split or req.reframe_mode == "podcast_reaction_split":
        effective_reframe = ReframeMode.PODCAST_REACTION_SPLIT
    candidate.reframe_mode = effective_reframe

    candidate.caption_style = CaptionStyleName(req.caption_style) if req.caption_style in [e.value for e in CaptionStyleName] else CaptionStyleName.HORMOZI

    use_stickers = req.use_stickers
    use_broll = req.broll
    use_track = req.music_track
    use_bg_music = req.background_music
    use_sfx = req.include_sfx
    use_zoom = req.auto_zoom

    if req.style_profile:
        from src.cliplocal.styles.manager import get_style_profile
        prof = get_style_profile(req.style_profile)
        if prof:
            if prof.id == "raj_shamani":
                candidate.caption_style = CaptionStyleName.BOXED
            elif prof.id == "alex_hormozi":
                candidate.caption_style = CaptionStyleName.HORMOZI
            elif prof.id == "ali_abdaal":
                candidate.caption_style = CaptionStyleName.MINIMAL

            if prof.graphics.enabled:
                use_broll = True
                if prof.graphics.overlay_type == "die_cut_sticker":
                    use_stickers = True
            if prof.audio.bg_music_track:
                use_bg_music = True
                use_track = prof.audio.bg_music_track
            use_sfx = prof.audio.whoosh_on_cuts
            use_zoom = prof.rhythm.snap_zoom_on_emphasis

    # Filter words if autocut deletion was applied
    if req.deleted_words and candidate.words:
        kept_words = [w for idx, w in enumerate(candidate.words) if idx not in set(req.deleted_words)]
        candidate.words = kept_words

    output_dir = Path("output") / Path(job.metadata.file_path).stem
    out_file = render_candidate_clip(
        video_path=job.metadata.file_path,
        candidate=candidate,
        output_dir=output_dir,
        metadata=job.metadata,
        reframe_mode=candidate.reframe_mode,
        auto_zoom=use_zoom,
        multicam=req.multicam,
        top_banner=req.top_banner,
        include_emojis=req.include_emojis,
        include_sfx=use_sfx,
        background_music=use_bg_music,
        mute_original=req.mute_original,
        music_track=use_track,
        music_volume=req.music_volume,
        anti_copyright=req.anti_copyright,
        broll=use_broll,
        extract_thumbnails=True,
        watermark=req.watermark,
        retention_bar=req.retention_bar,
        semantic_highlighting=req.semantic_highlighting,
        pattern_zoom=req.pattern_zoom,
        strip_fillers=req.strip_fillers,
        hook_stinger=req.hook_stinger,
        hook_stinger_type=req.hook_stinger_type,
        hook_snap_zoom=req.hook_snap_zoom,
        teaser_stitch=req.teaser_stitch,
        hook_headline=req.hook_headline,
        frequency_carving=req.frequency_carving,
        reaction_split_duration=3.2,
        use_stickers=use_stickers
    )

    return {"output_path": str(out_file), "candidate": candidate.model_dump()}

@app.get("/api/media/stream")
async def stream_media(path: str, request: Request):
    """Stream media file with HTTP 206 Partial Content Range header support."""
    file_path = Path(path).resolve()
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Media file not found")

    file_size = file_path.stat().st_size
    range_header = request.headers.get("range")

    content_type, _ = mimetypes.guess_type(str(file_path))
    content_type = content_type or "video/mp4"

    if range_header:
        # Parse range header: e.g. bytes=0-1048576
        byte_range = range_header.replace("bytes=", "").split("-")
        start = int(byte_range[0])
        end = int(byte_range[1]) if byte_range[1] else file_size - 1
        end = min(end, file_size - 1)
        chunk_size = (end - start) + 1

        with open(file_path, "rb") as f:
            f.seek(start)
            data = f.read(chunk_size)

        headers = {
            "Content-Range": f"bytes {start}-{end}/{file_size}",
            "Accept-Ranges": "bytes",
            "Content-Length": str(chunk_size),
            "Content-Type": content_type,
        }
        return Response(data, status_code=206, headers=headers)
    else:
        with open(file_path, "rb") as f:
            data = f.read()
        return Response(data, media_type=content_type)

@app.get("/api/jobs/{job_id}/export/bundle")
async def export_job_bundle(job_id: str, client_name: str = "Valued_Client", handle: str = "@ClipLocal"):
    job = job_manager.get_job_state(job_id)
    if not job or not job.candidates:
        raise HTTPException(status_code=404, detail="Job or rendered candidates not found")

    out_bundle_dir = Path("output/bundles")
    out_bundle_dir.mkdir(parents=True, exist_ok=True)
    zip_path = create_client_delivery_bundle(
        candidates=job.candidates,
        output_bundle_dir=out_bundle_dir,
        client_name=client_name,
        brand_handle=handle,
        source_name=Path(job.source_url_or_path).stem if not job.source_url_or_path.startswith("http") else "Web Video",
        make_zip=True
    )

    return FileResponse(
        path=str(zip_path),
        filename=zip_path.name,
        media_type="application/zip"
    )

@app.get("/api/jobs/{job_id}/export/schedule")
async def export_job_schedule(job_id: str, handle: str = "@ClipLocal"):
    job = job_manager.get_job_state(job_id)
    if not job or not job.candidates:
        raise HTTPException(status_code=404, detail="Job or rendered candidates not found")

    csv_out = Path("output/schedules") / f"schedule_{job_id}.csv"
    csv_file = export_bulk_schedule_csv(
        candidates=job.candidates,
        output_csv_path=csv_out,
        brand_handle=handle
    )

    return FileResponse(
        path=str(csv_file),
        filename=csv_file.name,
        media_type="text/csv"
    )

@app.get("/api/jobs/{job_id}/qa-manifest")
async def get_job_qa_manifest(job_id: str):
    job = job_manager.get_job_state(job_id)
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")

    possible_dirs = []
    if job.metadata and job.metadata.file_path:
        possible_dirs.append(Path("output") / Path(job.metadata.file_path).stem)
    possible_dirs.append(Path("output") / job_id)
    if not job.source_url_or_path.startswith("http"):
        possible_dirs.append(Path("output") / Path(job.source_url_or_path).stem)

    for p in possible_dirs:
        manifest_file = p / "podcast_qa_manifest.json"
        if manifest_file.exists():
            import json
            return json.loads(manifest_file.read_text(encoding="utf-8"))

    for manifest_file in Path("output").glob("*/podcast_qa_manifest.json"):
        import json
        try:
            return json.loads(manifest_file.read_text(encoding="utf-8"))
        except Exception:
            pass

    return {"total_questions_detected": 0, "questions": []}

@app.post("/api/jobs/{job_id}/render-question/{qa_id}")
async def render_question_on_demand(job_id: str, qa_id: int):
    job = job_manager.get_job_state(job_id)
    if not job or not job.metadata:
        raise HTTPException(status_code=404, detail="Job or video metadata not found")

    video_path = Path(job.metadata.file_path)
    if not video_path.exists():
        raise HTTPException(status_code=404, detail=f"Source video file not found: {video_path}")

    possible_dirs = [
        Path("output") / video_path.stem,
        Path("output") / job_id
    ]
    manifest_path = None
    for d in possible_dirs:
        mf = d / "podcast_qa_manifest.json"
        if mf.exists():
            manifest_path = mf
            break

    if not manifest_path:
        raise HTTPException(status_code=404, detail="Podcast Q&A manifest not found for this job")

    import json
    data = json.loads(manifest_path.read_text(encoding="utf-8"))
    target_q = None
    for q in data.get("questions", []):
        if q.get("qa_id") == qa_id:
            target_q = q
            break

    if not target_q:
        raise HTTPException(status_code=404, detail=f"Question #{qa_id} not found in manifest")

    from src.cliplocal.core.models import CandidateClip, ScoreBreakdown, ReframeMode, CaptionStyleName
    from src.cliplocal.render.engine import render_candidate_clip
    from src.cliplocal.audio.music import get_podcast_sound_suite_for_archetype

    sound_suite = get_podcast_sound_suite_for_archetype(target_q.get("viral_archetype", "contrarian_truth"))

    output_dir = manifest_path.parent
    clip_index = len(job.candidates) + 1
    new_candidate = CandidateClip(
        clip_id=f"podcast_qa_{qa_id:03d}",
        index=clip_index,
        start=target_q["timestamps"]["total_start"],
        end=target_q["timestamps"]["total_end"],
        duration=target_q["timestamps"]["duration_seconds"],
        text=target_q["question_text"],
        score=ScoreBreakdown(
            total_score=float(target_q.get("viral_score", 85.0)),
            hook_score=90.0,
            acoustic_score=75.0,
            pace_score=80.0,
            payoff_score=85.0,
            hook_type=target_q.get("viral_archetype", "Podcast Q&A")
        ),
        title=target_q.get("hook_headline", target_q["question_text"][:50]),
        caption=target_q.get("social_caption", target_q["question_text"]),
        hashtags=target_q.get("hashtags", ["#podcast", "#shorts"]),
        reframe_mode=ReframeMode.PODCAST_REACTION_SPLIT,
        caption_style=CaptionStyleName.BOXED,
        top_banner=False,
        multicam=True
    )

    rendered_file = await asyncio.to_thread(
        render_candidate_clip,
        video_path=video_path,
        candidate=new_candidate,
        output_dir=output_dir,
        metadata=job.metadata,
        reframe_mode=ReframeMode.PODCAST_REACTION_SPLIT,
        auto_zoom=True,
        multicam=True,
        top_banner=False,
        include_emojis=True,
        include_sfx=True,
        background_music=True,
        music_track=sound_suite,
        music_volume=0.20,
        frequency_carving=True,
        reaction_split_duration=3.2,
        broll=True,
        use_stickers=True,
        extract_thumbnails=True
    )

    target_q["is_rendered"] = True
    manifest_path.write_text(json.dumps(data, indent=2, ensure_ascii=False), encoding="utf-8")

    job.candidates.append(new_candidate)
    persisted = get_job(job_id)
    options = persisted.get("options") if persisted else {}
    from src.cliplocal.web.db import save_job
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

    return {
        "status": "success",
        "qa_id": qa_id,
        "clip_index": clip_index,
        "output_path": str(rendered_file),
        "candidate": new_candidate.model_dump()
    }

# =========================================================
# CREATOR STYLE DNA & PROFILES API
# =========================================================

class CloneStyleRequest(BaseModel):
    name: str
    creator_handle: Optional[str] = None
    sample_urls: List[str]
    description: Optional[str] = None

@app.get("/api/styles")
async def get_styles():
    from src.cliplocal.styles.manager import list_style_profiles
    profiles = list_style_profiles()
    return [p.model_dump() for p in profiles]

@app.get("/api/styles/{profile_id}")
async def get_single_style(profile_id: str):
    from src.cliplocal.styles.manager import get_style_profile
    p = get_style_profile(profile_id)
    if not p:
        raise HTTPException(status_code=404, detail="Style profile not found")
    return p.model_dump()

@app.post("/api/styles/clone")
async def clone_creator_style(req: CloneStyleRequest):
    if not req.sample_urls:
        raise HTTPException(status_code=400, detail="Must provide at least 1 reference video URL or path")

    from src.cliplocal.styles.extractor import clone_creator_style_dna
    try:
        profile = await asyncio.to_thread(
            clone_creator_style_dna,
            sample_paths_or_urls=req.sample_urls,
            profile_id=req.name,
            profile_name=req.name,
            creator_handle=req.creator_handle,
            description=req.description
        )
        return {"status": "success", "profile": profile.model_dump()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to clone creator style: {e}")

@app.delete("/api/styles/{profile_id}")
async def remove_custom_style(profile_id: str):
    from src.cliplocal.styles.manager import delete_style_profile
    deleted = delete_style_profile(profile_id)
    if not deleted:
        raise HTTPException(status_code=400, detail="Cannot delete built-in profile or profile not found")
    return {"status": "success", "deleted": profile_id}

class HarvestRequest(BaseModel):
    channel_url: str
    clips: int = 5
    max_videos: int = 2
    anti_copyright: bool = True
    watermark: Optional[str] = "@ClipLocal"

@app.post("/api/harvest")
async def harvest_channel(req: HarvestRequest):
    new_vids = detect_unprocessed_videos([req.channel_url], max_per_channel=req.max_videos)
    started_jobs = []
    for vid in new_vids:
        job = job_manager.submit_job(vid["url"], {
            "source": vid["url"],
            "clips": req.clips,
            "style": "hormozi",
            "mode": "auto",
            "anti_copyright": req.anti_copyright,
            "multicam": True,
            "top_banner": True,
            "watermark": req.watermark
        })
        started_jobs.append({"title": vid["title"], "url": vid["url"], "job_id": job.job_id})

    return {"detected_count": len(new_vids), "started_jobs": started_jobs}

@app.get("/api/discover/presets")
async def get_discover_presets():
    return CURATED_PRESETS

@app.get("/api/discover/search")
async def search_discover_videos(query: str, limit: int = 6):
    return search_viral_long_videos(query=query, limit=limit)

# --- AI Voice Studio Endpoints (Indian Flow Voice Cloning) ---
VOICE_OUTPUT_DIR = Path("/Volumes/Ravi's SSD/PROJECTS/kalp/data/voice_outputs").resolve()
VOICE_OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
VOICE_MODEL_DIR = Path("/Users/ravichauhan/Desktop/WORK /video/models/ravi_voice_master")
VOICE_PYTHON = Path("/Users/ravichauhan/lemo-opuscar/.venv/bin/python3")

class VoiceSynthesisRequest(BaseModel):
    text: str
    style: str = "indian_storyteller"
    speed: float = 1.0
    bg_music: bool = False
    music_track: Optional[str] = "cinematic"
    music_volume: float = 0.15

@app.get("/api/voice/profiles")
async def get_voice_profiles():
    profile_json = VOICE_MODEL_DIR / "profile.json"
    if profile_json.exists():
        try:
            import json
            data = json.loads(profile_json.read_text(encoding="utf-8"))
            return {
                "status": "ready",
                "profile": data,
                "engine": "F5-TTS Flow-Matching DiT (Apple Silicon Metal MPS)",
                "music_tracks": ["cinematic", "ambient_lofi", "emotional_piano", "tension_drone", "phonk_drift", "synthwave"]
            }
        except Exception as e:
            return {"status": "error", "message": str(e)}
    return {"status": "not_configured"}

@app.post("/api/voice/synthesize")
async def synthesize_voice(req: VoiceSynthesisRequest):
    if not req.text.strip():
        raise HTTPException(status_code=400, detail="Text cannot be empty")
    
    import uuid
    output_id = uuid.uuid4().hex[:10]
    raw_wav = VOICE_OUTPUT_DIR / f"voice_{output_id}_raw.wav"
    final_wav = VOICE_OUTPUT_DIR / f"voice_{output_id}.wav"
    
    synthesize_script = VOICE_MODEL_DIR / "synthesize.py"
    if not synthesize_script.exists():
        raise HTTPException(status_code=500, detail="Voice model script not found")
        
    cmd = [
        str(VOICE_PYTHON),
        str(synthesize_script),
        req.text,
        "-o", str(raw_wav),
        "--style", req.style,
        "--speed", str(req.speed)
    ]
    
    proc = await asyncio.create_subprocess_exec(
        *cmd,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE
    )
    stdout, stderr = await proc.communicate()
    if proc.returncode != 0:
        err_msg = stderr.decode(errors="ignore")
        raise HTTPException(status_code=500, detail=f"Voice synthesis failed: {err_msg}")
        
    if not raw_wav.exists():
        raise HTTPException(status_code=500, detail="Voice synthesis failed to produce audio file")
        
    # Optional Background Music Mixing & Loudness Normalization (-16 LUFS)
    music_file = Path("src/cliplocal/assets/music") / f"{req.music_track}.wav"
    if req.bg_music and music_file.exists():
        mix_cmd = [
            "ffmpeg", "-y",
            "-i", str(raw_wav),
            "-stream_loop", "-1", "-i", str(music_file),
            "-filter_complex",
            f"[1:a]volume={req.music_volume},equalizer=f=2400:t=q:w=1.2:g=-5[bg];"
            f"[0:a][bg]amix=inputs=2:duration=first:dropout_transition=2,"
            f"loudnorm=I=-16:LRA=7:TP=-1.5[out]",
            "-map", "[out]",
            "-ar", "24000",
            "-ac", "1",
            str(final_wav)
        ]
        mix_proc = await asyncio.create_subprocess_exec(*mix_cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
        await mix_proc.communicate()
    else:
        norm_cmd = [
            "ffmpeg", "-y",
            "-i", str(raw_wav),
            "-af", "loudnorm=I=-16:LRA=7:TP=-1.5",
            "-ar", "24000",
            "-ac", "1",
            str(final_wav)
        ]
        norm_proc = await asyncio.create_subprocess_exec(*norm_cmd, stdout=asyncio.subprocess.PIPE, stderr=asyncio.subprocess.PIPE)
        await norm_proc.communicate()
        
    if raw_wav.exists():
        raw_wav.unlink()
        
    duration = 0.0
    try:
        import soundfile as sf
        info = sf.info(str(final_wav))
        duration = info.duration
    except Exception:
        pass
        
    return {
        "status": "success",
        "filename": final_wav.name,
        "audio_url": f"/api/voice/audio/{final_wav.name}",
        "duration": round(duration, 2),
        "style": req.style,
        "text": req.text
    }

# Mount audio files directory for high-performance streaming with Range requests
app.mount("/api/voice/audio", StaticFiles(directory=str(VOICE_OUTPUT_DIR)), name="voice_audio")

# Mount frontend build directory if it exists
frontend_dist = Path("web/frontend/dist")
if frontend_dist.exists():
    app.mount("/", StaticFiles(directory=str(frontend_dist), html=True), name="frontend")
