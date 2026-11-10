import time
import shutil
import json
from pathlib import Path
from typing import Optional, List
from rich.console import Console

from src.cliplocal.core.models import CaptionStyleName, ReframeMode
from src.cliplocal.cli.main import run_pipeline

console = Console()

VIDEO_EXTENSIONS = {".mp4", ".mov", ".mkv", ".webm", ".avi", ".m4v"}

def is_file_ready(file_path: Path, wait_sec: float = 2.0) -> bool:
    """Ensure a file has finished downloading or transferring by checking size stability."""
    try:
        size1 = file_path.stat().st_size
        if size1 == 0:
            return False
        time.sleep(wait_sec)
        size2 = file_path.stat().st_size
        return size1 == size2 and size2 > 0
    except Exception:
        return False

def process_batch_folder(
    input_dir: Path | str,
    output_dir: Path | str = "output",
    clips: int = 6,
    style: CaptionStyleName = CaptionStyleName.HORMOZI,
    mode: ReframeMode = ReframeMode.AUTO,
    use_llm: bool = False,
    anti_copyright: bool = False,
    multicam: bool = True,
    broll: bool = False,
    top_banner: bool = True,
    once: bool = False
) -> List[Path]:
    """
    Scan input folder for video files, process each through the full ClipLocal pipeline
    sequentially (to maintain 16 GB memory safety), and move originals to done/.
    """
    in_d = Path(input_dir).resolve()
    out_d = Path(output_dir).resolve()
    in_d.mkdir(parents=True, exist_ok=True)
    out_d.mkdir(parents=True, exist_ok=True)
    done_d = in_d / "done"
    done_d.mkdir(parents=True, exist_ok=True)

    console.print(f"[bold cyan]🎬 ClipLocal Batch Watcher active[/bold cyan]")
    console.print(f"Monitoring: [green]{in_d}[/green]")
    console.print(f"Output: [green]{out_d}[/green]")
    console.print(f"Anti-Copyright: [yellow]{anti_copyright}[/yellow] | Multi-Cam: [yellow]{multicam}[/yellow] | B-Roll: [yellow]{broll}[/yellow]\n")

    processed_any: List[Path] = []

    while True:
        # List candidate video files not in done/
        candidates = [
            p for p in in_d.iterdir()
            if p.is_file() and p.suffix.lower() in VIDEO_EXTENSIONS
        ]

        if not candidates and once:
            break

        for video_file in candidates:
            console.print(f"[*] Detected incoming file: [bold]{video_file.name}[/bold]")
            if not is_file_ready(video_file):
                console.print(f"[yellow]File {video_file.name} is still copying/writing. Waiting...[/yellow]")
                continue

            console.print(f"[bold green]▶ Processing {video_file.name}...[/bold green]")
            target_out = out_d / video_file.stem
            target_out.mkdir(parents=True, exist_ok=True)

            try:
                # Execute full pipeline
                rendered_clips = run_pipeline(
                    source=str(video_file),
                    num_clips=clips,
                    style=style,
                    reframe_mode=mode,
                    use_llm=use_llm,
                    auto_zoom=multicam,
                    include_emojis=True,
                    include_sfx=True,
                    background_music=anti_copyright,
                    anti_copyright=anti_copyright,
                    broll=broll,
                    top_banner=top_banner,
                    output_dir=target_out
                )
                processed_any.extend(rendered_clips)

                # Move source to done/
                dest = done_d / video_file.name
                if dest.exists():
                    dest.unlink()
                shutil.move(str(video_file), str(dest))
                console.print(f"[bold green]✔ Done: {video_file.name} moved to done/[/bold green]\n")

            except Exception as e:
                console.print(f"[bold red]✖ Error processing {video_file.name}: {e}[/bold red]\n")

        if once:
            break

        time.sleep(5.0)

    return processed_any
