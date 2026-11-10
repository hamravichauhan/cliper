import subprocess
import pytest
from pathlib import Path
from src.cliplocal.render.ffmpeg import run_ffmpeg_render

def test_real_ffmpeg_synthetic_render(tmp_path):
    """
    Integration test: executes real FFmpeg subprocess pipeline to render a 1-second synthetic clip.
    Verifies that local FFmpeg and hardware/software encoders generate a valid MP4 file.
    """
    input_video = tmp_path / "synthetic_input.mp4"
    output_video = tmp_path / "rendered_output.mp4"

    # 1. Generate 1-second synthetic test video with audio using FFmpeg
    gen_cmd = [
        "ffmpeg",
        "-y",
        "-f", "lavfi",
        "-i", "testsrc=size=1920x1080:rate=30",
        "-f", "lavfi",
        "-i", "sine=frequency=440:sample_rate=48000",
        "-t", "1.0",
        "-c:v", "libx264",
        "-preset", "ultrafast",
        "-c:a", "aac",
        str(input_video)
    ]
    subprocess.run(gen_cmd, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE, check=True)
    assert input_video.exists() and input_video.stat().st_size > 1000

    # 2. Run ClipLocal's real render pipeline (hardware encoder with libx264 fallback)
    filter_complex = "[0:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920[v_out]"
    result_path = run_ffmpeg_render(
        video_path=input_video,
        start_sec=0.0,
        duration=1.0,
        filter_complex=filter_complex,
        output_mp4=output_video,
        audio_loudnorm=False
    )

    assert result_path.exists()
    assert result_path.stat().st_size > 2000
