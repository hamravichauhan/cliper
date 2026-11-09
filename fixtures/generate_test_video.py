import subprocess
from pathlib import Path

def generate_sample_video(output_mp4: Path | str = "fixtures/test_podcast_sample.mp4") -> Path:
    out_p = Path(output_mp4).resolve()
    out_p.parent.mkdir(parents=True, exist_ok=True)

    if out_p.exists() and out_p.stat().st_size > 10000:
        return out_p

    speech_script = (
        "Here is the thing. The secret to building great products is listening to users every single day. "
        "Most people get this completely wrong because they fall in love with their features rather than the actual problems. "
        "What happens when you ignore real customer feedback? Your business collapses. "
        "Wait, hold on, let me do a quick mic check. Okay, is the stream working? "
        "Now back to the point. Why do the greatest companies succeed? "
        "Because they solve painful problems with ruthless simplicity. "
        "At the end of the day, that is the single biggest lesson in entrepreneurship."
    )

    tmp_aiff = out_p.parent / "tmp_speech.aiff"
    tmp_wav = out_p.parent / "tmp_speech.wav"

    # 1. Synthesize speech via macOS say
    subprocess.run(["say", "-o", str(tmp_aiff), speech_script], check=True)

    # 2. Convert to 16kHz stereo WAV
    subprocess.run(["ffmpeg", "-y", "-i", str(tmp_aiff), "-ar", "48000", "-ac", "2", str(tmp_wav)], check=True)

    # 3. Create 1920x1080 video with synthetic animation and speech audio
    # Duration probe
    probe = subprocess.check_output([
        "ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", str(tmp_wav)
    ], text=True).strip()
    duration = float(probe)

    # FFmpeg synthetic horizontal 1920x1080 video with a simulated speaker avatar
    ffmpeg_cmd = [
        "ffmpeg", "-y",
        "-f", "lavfi",
        "-i", f"color=c=0x1a1a2e:s=1920x1080:d={duration}:r=30",
        "-i", str(tmp_wav),
        "-filter_complex",
        "[0:v]drawtext=text='ClipLocal Test Podcast':fontsize=48:fontcolor=white:x=(w-text_w)/2:y=100,"
        "drawbox=x=860:y=440:w=200:h=200:color=0x4e54c8@0.8:t=fill,"
        "drawtext=text='SPEAKER':fontsize=32:fontcolor=white:x=(w-text_w)/2:y=520[v]",
        "-map", "[v]",
        "-map", "1:a",
        "-c:v", "libx264",
        "-pix_fmt", "yuv420p",
        "-c:a", "aac",
        "-b:a", "192k",
        str(out_p)
    ]

    subprocess.run(ffmpeg_cmd, check=True)

    # Cleanup temp audio
    try:
        tmp_aiff.unlink()
        tmp_wav.unlink()
    except Exception:
        pass

    return out_p

if __name__ == "__main__":
    path = generate_sample_video()
    print(f"Generated sample video at: {path}")
