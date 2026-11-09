from pathlib import Path
from typing import Optional
import typer
from rich.console import Console
from rich.panel import Panel

from src.cliplocal.core.models import CaptionStyleName, ReframeMode
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

app = typer.Typer(help="ClipLocal: Offline Klap/OpusClip-style short clip generator for Apple Silicon Mac.")
console = Console()

@app.command()
def run(
    source: str = typer.Argument(..., help="Path to local horizontal video file or YouTube URL"),
    clips: int = typer.Option(6, "--clips", "-c", help="Number of top clips to render"),
    style: str = typer.Option("hormozi", "--style", "-s", help="Caption style: hormozi | minimal | boxed | neon"),
    mode: str = typer.Option("center", "--mode", "-m", help="Reframe mode: center | blur_fill | face_follow | auto"),
    backend: Optional[str] = typer.Option(None, "--backend", "-b", help="Transcription backend: mlx | faster_whisper | whisper_cpp"),
    no_llm: bool = typer.Option(True, "--no-llm", help="Disable Ollama LLM re-ranking (pure heuristics)")
):
    """Transform horizontal video into ranked, captioned, vertical 9:16 short clips."""
    console.print(Panel.fit("[bold green]🎬 ClipLocal Pipeline[/] — Free, Offline Short Clip Generator", style="cyan"))
    timer = StageTimer()

    # Stage 1: Ingest
    timer.start_stage("1. Ingest & Probe")
    if is_url(source):
        console.print(f"[yellow]Downloading video from URL:[/] {source}")
        video_path = download_video(source)
    else:
        video_path = Path(source).resolve()

    if not video_path.exists():
        console.print(f"[bold red]Error: Source video file not found: {video_path}[/]")
        raise typer.Exit(code=1)

    metadata = probe_video(video_path)
    console.print(f"[dim]Input: {video_path.name} | {metadata.width}x{metadata.height} | {metadata.duration:.1f}s | FPS: {metadata.fps}[/]")

    # Extract 16kHz audio
    audio_path = extract_normalized_audio(video_path)
    timer.end_stage()

    # Stage 2: Transcribe
    timer.start_stage("2. Transcription (Word-level)")
    console.print(f"[cyan]Transcribing with backend: {backend or config.get('transcribe', {}).get('backend', 'mlx')}...[/]")
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
    console.print(f"[dim]Generated {len(raw_candidates)} candidate windows (20s - 60s)[/]")
    timer.end_stage()

    # Stage 5: Heuristic Scoring
    timer.start_stage("5. Heuristic Scoring")
    scored = score_all_candidates(raw_candidates, audio_path=audio_path)
    timer.end_stage()

    # Stage 6: Deduplication
    timer.start_stage("6. Deduplication & Ranking")
    top_candidates = deduplicate_candidates(scored, top_n=clips)

    if not no_llm:
        console.print("[cyan]Running local Ollama LLM re-ranking & title generation...[/]")
        top_candidates = rerank_candidates_with_llm(top_candidates)

    console.print(f"[bold green]✔ Selected Top {len(top_candidates)} viral candidates:[/]")
    for c in top_candidates:
        console.print(f"  [bold]#{c.index:02d}[/] [yellow]{c.start:.1f}s - {c.end:.1f}s ({c.duration:.1f}s)[/] | Score: [bold cyan]{c.score.total_score:.1f}[/] | Title: [white]\"{c.title}\"[/] | Hook: [magenta]{c.score.hook_type}[/]")
    timer.end_stage()

    # Stage 7: Render Clips
    timer.start_stage("7. 9:16 Video Rendering")
    output_dir = Path("output") / video_path.stem
    output_dir.mkdir(parents=True, exist_ok=True)

    reframe_mode = ReframeMode(mode) if mode in [e.value for e in ReframeMode] else ReframeMode.CENTER
    caption_style = CaptionStyleName(style) if style in [e.value for e in CaptionStyleName] else CaptionStyleName.HORMOZI

    with console.status("[bold green]Rendering 9:16 clips with burned-in ASS captions...[/]"):
        for cand in top_candidates:
            cand.caption_style = caption_style
            out_file = render_candidate_clip(
                video_path=video_path,
                candidate=cand,
                output_dir=output_dir,
                metadata=metadata,
                reframe_mode=reframe_mode
            )
            console.print(f"  [green]✔ Rendered:[/] {out_file.name}")
    timer.end_stage()

    # Print Summary & Timing Report
    console.print("\n[bold green]🎉 Pipeline completed successfully![/]")
    console.print(f"[dim]Output files saved to: {output_dir.resolve()}[/]\n")
    timer.print_report()

@app.command()
def benchmark(
    audio_path: str = typer.Argument(..., help="Path to sample audio file to benchmark")
):
    """Benchmark whisper transcription engines on this machine."""
    run_transcription_benchmark(audio_path)

if __name__ == "__main__":
    app()
