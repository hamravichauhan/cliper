import time
from pathlib import Path
from typing import Dict, Any
from rich.console import Console
from rich.table import Table

from src.cliplocal.transcribe.mlx_engine import MLXWhisperTranscriber
from src.cliplocal.transcribe.faster_engine import FasterWhisperTranscriber
from src.cliplocal.transcribe.cpp_engine import WhisperCppTranscriber

console = Console()

def run_transcription_benchmark(sample_audio_path: Path | str) -> Dict[str, Any]:
    """Benchmark whisper backends on sample audio file and return execution statistics."""
    p = Path(sample_audio_path).resolve()
    if not p.exists():
        raise FileNotFoundError(f"Audio file not found: {p}")

    backends = [
        ("mlx_whisper", MLXWhisperTranscriber(model_name="mlx-community/whisper-large-v3-turbo")),
        ("faster_whisper (CPU int8)", FasterWhisperTranscriber(model_name="large-v3-turbo", device="cpu", compute_type="int8")),
        ("whisper.cpp (Metal)", WhisperCppTranscriber(model_name="ggml-large-v3-turbo.bin")),
    ]

    results = {}
    table = Table(title="🎙️ Transcription Engine Benchmark (Word-level Timestamps)", header_style="bold magenta")
    table.add_column("Engine / Backend", style="cyan")
    table.add_column("Duration (sec)", justify="right")
    table.add_column("Real-time Factor (RTFx)", justify="right")
    table.add_column("Word Count", justify="right")
    table.add_column("Status", justify="center")

    for name, engine in backends:
        console.print(f"[bold yellow]Benchmarking {name}...[/]")
        start = time.perf_counter()
        try:
            transcript = engine.transcribe(p)
            elapsed = time.perf_counter() - start
            audio_duration = transcript.duration if transcript.duration > 0 else 60.0
            rtf = round(audio_duration / elapsed, 2) if elapsed > 0 else 0.0
            word_count = len(transcript.words)
            results[name] = {
                "elapsed_sec": round(elapsed, 2),
                "rtfx": rtf,
                "word_count": word_count,
                "status": "Success",
                "preview": transcript.text[:120]
            }
            table.add_row(name, f"{elapsed:.2f}s", f"{rtf}x faster than realtime", str(word_count), "[green]✔ OK[/]")
        except Exception as e:
            elapsed = time.perf_counter() - start
            results[name] = {
                "elapsed_sec": round(elapsed, 2),
                "status": f"Error: {e}",
                "word_count": 0
            }
            table.add_row(name, f"{elapsed:.2f}s", "-", "0", f"[red]Failed ({e})[/]")
        finally:
            engine.unload()

    console.print(table)
    return results
