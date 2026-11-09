import subprocess
from pathlib import Path
from src.cliplocal.core.utils import check_hardware_encoder
from src.cliplocal.config.settings import config

def run_ffmpeg_render(
    video_path: Path | str,
    start_sec: float,
    duration: float,
    filter_complex: str,
    output_mp4: Path | str,
    audio_loudnorm: bool = True
) -> Path:
    """
    Execute FFmpeg transcode pipeline to generate vertical short clip.
    Uses h264_videotoolbox hardware encoding with fallback to libx264.
    """
    in_p = Path(video_path).resolve()
    out_p = Path(output_mp4).resolve()
    out_p.parent.mkdir(parents=True, exist_ok=True)

    encoder = check_hardware_encoder()
    audio_filter = "loudnorm=I=-14:TP=-1.5:LRA=11" if audio_loudnorm else "anull"

    # Assemble ffmpeg arguments
    def build_cmd(selected_encoder: str):
        cmd = [
            "ffmpeg",
            "-y",
            "-ss", f"{start_sec:.3f}",
            "-t", f"{duration:.3f}",
            "-i", str(in_p),
            "-filter_complex", f"{filter_complex};[0:a]{audio_filter}[a_out]",
            "-map", "[v_out]",
            "-map", "[a_out]",
            "-c:v", selected_encoder,
            "-pix_fmt", "yuv420p",
            "-c:a", "aac",
            "-b:a", "192k",
            "-ar", "48000",
            "-movflags", "+faststart",
            str(out_p)
        ]
        return cmd

    try:
        cmd = build_cmd(encoder)
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, check=True)
    except subprocess.CalledProcessError:
        # Fallback to software encoder libx264
        cmd = build_cmd("libx264")
        subprocess.run(cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, check=True)

    return out_p
