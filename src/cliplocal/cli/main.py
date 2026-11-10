from pathlib import Path
from typing import Optional, List
import typer
from rich.console import Console
from rich.panel import Panel

from src.cliplocal.core.models import CaptionStyleName, ReframeMode, CandidateClip
from src.cliplocal.core.timing import StageTimer
from src.cliplocal.ingest.downloader import is_url, download_video
from src.cliplocal.ingest.probe import probe_video
from src.cliplocal.ingest.audio import extract_normalized_audio
from src.cliplocal.transcribe.service import transcribe_audio_cached
from src.cliplocal.transcribe.benchmark import run_transcription_benchmark
from src.cliplocal.segment.sentences import group_words_into_sentences
from src.cliplocal.candidates.window_builder import build_candidate_windows
from src.cliplocal.score.virality import score_all_candidates
from src.cliplocal.candidates.dedupe import deduplicate_candidates
from src.cliplocal.llm.rerank import rerank_candidates_with_llm
from src.cliplocal.render.engine import render_candidate_clip
from src.cliplocal.config.settings import config

app = typer.Typer(help="ClipLocal: Offline Klap/OpusClip-style short clip generator with anti-copyright protections.")
console = Console()

def run_pipeline(
    source: str,
    num_clips: int = 6,
    style: CaptionStyleName = CaptionStyleName.HORMOZI,
    reframe_mode: ReframeMode = ReframeMode.CENTER,
    backend: Optional[str] = None,
    use_llm: bool = False,
    auto_zoom: bool = True,
    multicam: bool = True,
    include_emojis: bool = True,
    include_sfx: bool = True,
    background_music: bool = False,
    anti_copyright: bool = False,
    broll: bool = False,
    top_banner: bool = True,
    output_dir: Optional[Path] = None
) -> List[Path]:
    """Execute full ingest -> transcribe -> segment -> score -> render pipeline."""
    timer = StageTimer()

    # Stage 1: Ingest
    timer.start_stage("1. Ingest & Probe")
    if is_url(source):
        console.print(f"[yellow]Downloading video from URL:[/] {source}")
        video_path = download_video(source)
    else:
        video_path = Path(source).resolve()

    if not video_path.exists():
        raise FileNotFoundError(f"Source video file not found: {video_path}")

    metadata = probe_video(video_path)
    console.print(f"[dim]Input: {video_path.name} | {metadata.width}x{metadata.height} | {metadata.duration:.1f}s | FPS: {metadata.fps}[/]")
    audio_path = extract_normalized_audio(video_path)
    timer.end_stage()

    # Stage 2: Transcribe
    timer.start_stage("2. Transcription (Word-level)")
    transcript = transcribe_audio_cached(audio_path, backend=backend)
    console.print(f"[green]✔ Transcribed {len(transcript.words)} words (Language: {transcript.language})[/]")
    timer.end_stage()

    # Stage 3: Sentence Segmentation
    timer.start_stage("3. Sentence Segmentation")
    sentences = group_words_into_sentences(transcript.words)
    console.print(f"[green]✔ Segmented into {len(sentences)} natural thought units[/]")
    timer.end_stage()

    # Stage 4: Candidate Windows
    timer.start_stage("4. Candidate Windows")
    raw_candidates = build_candidate_windows(sentences)
    timer.end_stage()

    # Stage 5: Heuristic Scoring
    timer.start_stage("5. Heuristic Scoring")
    scored = score_all_candidates(raw_candidates, audio_path=audio_path)
    timer.end_stage()

    # Stage 6: Deduplication & Ranking
    timer.start_stage("6. Deduplication & Ranking")
    top_candidates = deduplicate_candidates(scored, top_n=num_clips)
    if use_llm:
        console.print("[cyan]Running local Ollama LLM re-ranking & title generation...[/]")
        top_candidates = rerank_candidates_with_llm(top_candidates)
    timer.end_stage()

    # Stage 7: Render Clips
    timer.start_stage("7. 9:16 Video Rendering")
    if output_dir is None:
        target_dir = Path("output") / video_path.stem
    else:
        target_dir = Path(output_dir)
    target_dir.mkdir(parents=True, exist_ok=True)

    rendered_files: List[Path] = []
    for cand in top_candidates:
        cand.caption_style = style
        out_file = render_candidate_clip(
            video_path=video_path,
            candidate=cand,
            output_dir=target_dir,
            metadata=metadata,
            reframe_mode=reframe_mode,
            auto_zoom=auto_zoom,
            multicam=multicam,
            top_banner=top_banner,
            include_emojis=include_emojis,
            include_sfx=include_sfx,
            background_music=background_music,
            anti_copyright=anti_copyright,
            broll=broll,
            extract_thumbnails=True
        )
        rendered_files.append(out_file)
        console.print(f"  [green]✔ Rendered:[/] {out_file.name}")

    timer.end_stage()
    timer.print_report()
    return rendered_files

@app.command()
def run(
    source: str = typer.Argument(..., help="Path to local horizontal video file or YouTube URL"),
    clips: int = typer.Option(6, "--clips", "-c", help="Number of top clips to render"),
    style: str = typer.Option("hormozi", "--style", "-s", help="Caption style: hormozi | minimal | boxed | neon | cyberpunk | emerald | fire"),
    mode: str = typer.Option("auto", "--mode", "-m", help="Reframe mode: auto | center | blur_fill | face_follow"),
    backend: Optional[str] = typer.Option(None, "--backend", "-b", help="Transcription backend: mlx | faster_whisper | whisper_cpp"),
    no_llm: bool = typer.Option(True, "--no-llm", help="Disable Ollama LLM re-ranking (pure heuristics)"),
    anti_copyright: bool = typer.Option(False, "--anti-copyright/--no-anti-copyright", help="Apply transformative audio tempo (1.025x), vocal EQ, and visual grading"),
    multicam: bool = typer.Option(True, "--multicam/--no-multicam", help="Simulate 2-camera setup (wide vs tight close-up cuts on sentence transitions)"),
    broll: bool = typer.Option(False, "--broll/--no-broll", help="Insert visual B-roll cutaway overlays on topic keywords"),
    top_banner: bool = typer.Option(True, "--top-banner/--no-top-banner", help="Add high-retention hook headline pill banner at top safe area"),
    auto_zoom: bool = typer.Option(True, "--auto-zoom/--no-auto-zoom", help="Enable dynamic punch-in zooms"),
    emojis: bool = typer.Option(True, "--emojis/--no-emojis", help="Add contextual animated emojis to captions"),
    sfx: bool = typer.Option(True, "--sfx/--no-sfx", help="Add subtle pop & chime sound effects on hook keywords"),
    music: bool = typer.Option(False, "--music/--no-music", help="Add ambient lo-fi background music with auto-ducking")
):
    """Transform horizontal video into ranked, captioned, vertical 9:16 short clips."""
    console.print(Panel.fit("[bold green]🎬 ClipLocal Pipeline[/] — Free, Offline Short Clip Generator", style="cyan"))
    reframe_mode = ReframeMode(mode) if mode in [e.value for e in ReframeMode] else ReframeMode.AUTO
    caption_style = CaptionStyleName(style) if style in [e.value for e in CaptionStyleName] else CaptionStyleName.HORMOZI

    run_pipeline(
        source=source,
        num_clips=clips,
        style=caption_style,
        reframe_mode=reframe_mode,
        backend=backend,
        use_llm=not no_llm,
        auto_zoom=auto_zoom,
        multicam=multicam,
        include_emojis=emojis,
        include_sfx=sfx,
        background_music=music,
        anti_copyright=anti_copyright,
        broll=broll,
        top_banner=top_banner
    )

@app.command()
def watch(
    folder: str = typer.Argument(..., help="Path to input directory to monitor for new videos"),
    output: str = typer.Option("output", "--output", "-o", help="Directory where rendered shorts are saved"),
    clips: int = typer.Option(6, "--clips", "-c", help="Number of clips to render per video"),
    style: str = typer.Option("hormozi", "--style", "-s", help="Caption style"),
    mode: str = typer.Option("auto", "--mode", "-m", help="Reframe mode"),
    anti_copyright: bool = typer.Option(False, "--anti-copyright", help="Apply transformative anti-copyright filters"),
    multicam: bool = typer.Option(True, "--multicam/--no-multicam", help="Enable simulated 2-camera cuts"),
    broll: bool = typer.Option(False, "--broll/--no-broll", help="Enable B-roll cutaway overlays"),
    top_banner: bool = typer.Option(True, "--top-banner/--no-top-banner", help="Enable top headline banner"),
    once: bool = typer.Option(False, "--once", help="Process existing files once and exit without continuous daemon polling")
):
    """Overnight Batch Watcher: automatically process all videos dropped into a folder."""
    from src.cliplocal.cli.watcher import process_batch_folder

    reframe_mode = ReframeMode(mode) if mode in [e.value for e in ReframeMode] else ReframeMode.AUTO
    caption_style = CaptionStyleName(style) if style in [e.value for e in CaptionStyleName] else CaptionStyleName.HORMOZI

    process_batch_folder(
        input_dir=folder,
        output_dir=output,
        clips=clips,
        style=caption_style,
        mode=reframe_mode,
        anti_copyright=anti_copyright,
        multicam=multicam,
        broll=broll,
        top_banner=top_banner,
        once=once
    )

@app.command()
def benchmark(
    audio_path: str = typer.Argument(..., help="Path to sample audio file to benchmark")
):
    """Benchmark whisper transcription engines on this machine."""
    run_transcription_benchmark(audio_path)

if __name__ == "__main__":
    app()
