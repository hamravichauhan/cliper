import json
import subprocess
from pathlib import Path
from src.cliplocal.core.models import VideoMetadata
from src.cliplocal.core.utils import compute_file_hash

def probe_video(file_path: Path | str) -> VideoMetadata:
    """Run ffprobe on a video file and return structured VideoMetadata."""
    p = Path(file_path).resolve()
    if not p.exists():
        raise FileNotFoundError(f"Video file not found: {p}")

    cmd = [
        "ffprobe",
        "-v", "quiet",
        "-print_format", "json",
        "-show_format",
        "-show_streams",
        str(p)
    ]

    result = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, check=True)
    info = json.loads(result.stdout)

    video_stream = next((s for s in info.get("streams", []) if s.get("codec_type") == "video"), None)
    audio_stream = next((s for s in info.get("streams", []) if s.get("codec_type") == "audio"), None)

    if not video_stream:
        raise ValueError(f"No video stream found in {p}")

    # Parse FPS
    fps_raw = video_stream.get("r_frame_rate", "30/1")
    if "/" in fps_raw:
        num, den = fps_raw.split("/")
        fps = float(num) / float(den) if float(den) != 0 else 30.0
    else:
        fps = float(fps_raw)

    duration = float(info.get("format", {}).get("duration", 0.0))
    if duration == 0.0 and "duration" in video_stream:
        duration = float(video_stream["duration"])

    return VideoMetadata(
        file_path=str(p),
        file_hash=compute_file_hash(p),
        duration=duration,
        width=int(video_stream.get("width", 1920)),
        height=int(video_stream.get("height", 1080)),
        fps=round(fps, 2),
        video_codec=video_stream.get("codec_name", "unknown"),
        audio_codec=audio_stream.get("codec_name") if audio_stream else None,
        audio_sample_rate=int(audio_stream.get("sample_rate", 44100)) if audio_stream else 44100,
        audio_channels=int(audio_stream.get("channels", 2)) if audio_stream else 0,
        file_size_bytes=p.stat().st_size
    )
