import subprocess
from pathlib import Path
from src.cliplocal.config.settings import config

def extract_normalized_audio(video_path: Path | str, cache_dir: Path | str | None = None) -> Path:
    """Extract audio from video as 16 kHz mono PCM 16-bit WAV for optimal ASR processing."""
    vp = Path(video_path).resolve()
    base_cache = Path(cache_dir or config.get("app", {}).get("cache_dir", ".cache"))
    base_cache.mkdir(parents=True, exist_ok=True)

    output_wav = base_cache / f"{vp.stem}_16k_mono.wav"

    # Cache hit
    if output_wav.exists() and output_wav.stat().st_size > 1024:
        return output_wav

    # Extract audio using FFmpeg with streaming chunks
    cmd = [
        "ffmpeg",
        "-y",
        "-i", str(vp),
        "-vn",
        "-acodec", "pcm_s16le",
        "-ar", "16000",
        "-ac", "1",
        str(output_wav)
    ]

    subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, check=True)
    return output_wav
