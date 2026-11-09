import json
import re
from pathlib import Path
from typing import Optional
from src.cliplocal.core.models import CandidateClip, ReframeMode, VideoMetadata
from src.cliplocal.captions.ass_generator import generate_ass_subtitles
from src.cliplocal.render.crop import build_crop_filter
from src.cliplocal.render.ffmpeg import run_ffmpeg_render
from src.cliplocal.config.settings import config

def slugify(text: str) -> str:
    """Create a safe URL/filename slug from title or text."""
    clean = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    return re.sub(r"[-\s]+", "_", clean)[:30]

def render_candidate_clip(
    video_path: Path | str,
    candidate: CandidateClip,
    output_dir: Path | str,
    metadata: Optional[VideoMetadata] = None,
    reframe_mode: ReframeMode = ReframeMode.CENTER
) -> Path:
    """
    Render a single candidate clip with 9:16 framing, burned-in ASS captions,
    loudnorm audio, and write a JSON metadata sidecar.
    """
    vp = Path(video_path).resolve()
    base_out = Path(output_dir).resolve()
    base_out.mkdir(parents=True, exist_ok=True)

    slug = slugify(candidate.title or candidate.score.hook_type or "clip")
    clip_filename = f"clip_{candidate.index:02d}_{slug}.mp4"
    sidecar_filename = f"clip_{candidate.index:02d}_{slug}.json"
    mp4_out = base_out / clip_filename
    json_out = base_out / sidecar_filename

    # 1. Generate ASS subtitles for this clip in /tmp to avoid any path quoting issues
    ass_path = Path("/tmp") / f"cliplocal_subs_{candidate.clip_id}_{candidate.index}.ass"
    generate_ass_subtitles(
        words=candidate.words,
        output_ass_path=ass_path,
        time_offset=candidate.start,
        style_name=candidate.caption_style
    )

    # 2. Build Filter Complex
    in_w = metadata.width if metadata else 1920
    in_h = metadata.height if metadata else 1080
    crop_filter = build_crop_filter(
        mode=reframe_mode,
        in_w=in_w,
        in_h=in_h,
        out_w=1080,
        out_h=1920
    )

    # Path for FFmpeg libass filter
    escaped_ass = str(ass_path).replace("\\", "/").replace(":", "\\:")
    filter_complex = f"{crop_filter};[v_reframed]ass={escaped_ass}[v_out]"

    # 3. Transcode with FFmpeg
    run_ffmpeg_render(
        video_path=vp,
        start_sec=candidate.start,
        duration=candidate.duration,
        filter_complex=filter_complex,
        output_mp4=mp4_out,
        audio_loudnorm=True
    )

    # 4. Cleanup tmp ASS file
    try:
        ass_path.unlink()
    except Exception:
        pass

    # 5. Write JSON sidecar
    candidate.output_path = str(mp4_out)
    sidecar_data = {
        "clip_id": candidate.clip_id,
        "index": candidate.index,
        "output_mp4": str(mp4_out),
        "start": candidate.start,
        "end": candidate.end,
        "duration": candidate.duration,
        "title": candidate.title,
        "caption": candidate.caption or candidate.text[:140],
        "hashtags": candidate.hashtags or ["#shorts", "#viral", "#podcast"],
        "reframe_mode": reframe_mode.value,
        "caption_style": candidate.caption_style.value,
        "score_breakdown": candidate.score.model_dump(),
        "transcript_excerpt": candidate.text
    }

    with open(json_out, "w", encoding="utf-8") as f:
        json.dump(sidecar_data, f, indent=2)

    return mp4_out
