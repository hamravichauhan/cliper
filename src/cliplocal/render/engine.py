import json
import re
from pathlib import Path
from typing import Optional
from src.cliplocal.core.models import CandidateClip, ReframeMode, VideoMetadata
from src.cliplocal.captions.ass_generator import generate_ass_subtitles
from src.cliplocal.render.crop import build_crop_filter
from src.cliplocal.render.zoom import compute_punch_in_intervals, build_dynamic_zoom_filter
from src.cliplocal.render.ffmpeg import run_ffmpeg_render
from src.cliplocal.reframe.face_tracker import FaceTracker
from src.cliplocal.audio.sfx import find_sfx_trigger_points, ensure_sfx_assets
from src.cliplocal.audio.music import ensure_ambient_music, build_ducking_audio_filter
from src.cliplocal.config.settings import config

_face_tracker: Optional[FaceTracker] = None

def get_face_tracker() -> FaceTracker:
    global _face_tracker
    if _face_tracker is None:
        _face_tracker = FaceTracker()
    return _face_tracker

def slugify(text: str) -> str:
    """Create a safe URL/filename slug from title or text."""
    clean = re.sub(r"[^\w\s-]", "", text.lower()).strip()
    return re.sub(r"[-\s]+", "_", clean)[:30]

def render_candidate_clip(
    video_path: Path | str,
    candidate: CandidateClip,
    output_dir: Path | str,
    metadata: Optional[VideoMetadata] = None,
    reframe_mode: ReframeMode = ReframeMode.CENTER,
    auto_zoom: bool = True,
    include_emojis: bool = True,
    include_sfx: bool = True,
    background_music: bool = False
) -> Path:
    """
    Render a short clip with 9:16 framing, dynamic punch-ins, burned-in ASS captions,
    contextual emojis, sound effects, background music auto-ducking, and loudnorm audio.
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
        style_name=candidate.caption_style,
        include_emojis=include_emojis
    )

    # 2. Reframe Analysis & Filter Construction
    in_w = metadata.width if metadata else 1920
    in_h = metadata.height if metadata else 1080
    effective_mode = reframe_mode
    center_x = 0.5

    if reframe_mode in (ReframeMode.AUTO, ReframeMode.FACE_FOLLOW):
        try:
            tracker = get_face_tracker()
            track_result = tracker.track_clip(vp, candidate.start, candidate.end)
            center_x = track_result.get("dominant_center_x", 0.5)
            if reframe_mode == ReframeMode.AUTO:
                effective_mode = track_result.get("recommended_mode", ReframeMode.FACE_FOLLOW)
            else:
                effective_mode = ReframeMode.FACE_FOLLOW
        except Exception:
            effective_mode = ReframeMode.CENTER

    # Apply Auto-Zoom if mode is FACE_FOLLOW or CENTER
    if auto_zoom and effective_mode in (ReframeMode.FACE_FOLLOW, ReframeMode.CENTER):
        zoom_intervals = compute_punch_in_intervals(candidate.duration, candidate.sentences)
        crop_filter = build_dynamic_zoom_filter(
            in_w=in_w,
            in_h=in_h,
            out_w=1080,
            out_h=1920,
            center_x_ratio=center_x,
            intervals=zoom_intervals
        )
    else:
        crop_filter = build_crop_filter(
            mode=effective_mode,
            in_w=in_w,
            in_h=in_h,
            out_w=1080,
            out_h=1920,
            center_x_ratio=center_x
        )

    # Path for FFmpeg libass filter
    escaped_ass = str(ass_path).replace("\\", "/").replace(":", "\\:")
    video_filter = f"{crop_filter};[v_reframed]ass={escaped_ass}[v_out]"

    # 3. Audio Enhancements (SFX & Music Ducking)
    extra_inputs = []
    audio_filter_parts = []
    current_audio_label = "0:a"
    next_input_idx = 1

    # Optional Sound Effects on Keywords
    if include_sfx and candidate.words:
        sfx_assets = ensure_sfx_assets()
        triggers = find_sfx_trigger_points(candidate.words, candidate.start)

        if triggers:
            # Map up to 4 trigger points
            sfx_labels = []
            for t_offset, sfx_type in triggers[:4]:
                sfx_file = sfx_assets.get(sfx_type, sfx_assets["pop"])
                extra_inputs.append(str(sfx_file))
                sfx_in_idx = next_input_idx
                next_input_idx += 1
                delay_ms = int(t_offset * 1000)
                sfx_label = f"sfx{sfx_in_idx}"
                # Add delay and volume
                audio_filter_parts.append(
                    f"[{sfx_in_idx}:a]adelay={delay_ms}|{delay_ms},volume=0.35[{sfx_label}]"
                )
                sfx_labels.append(f"[{sfx_label}]")

            # Mix voice with delayed SFX
            all_sfx_inputs = f"[{current_audio_label}]" + "".join(sfx_labels)
            num_inputs = len(sfx_labels) + 1
            audio_filter_parts.append(
                f"{all_sfx_inputs}amix=inputs={num_inputs}:dropout_transition=0:weights=1.0 " + " ".join(["0.4"] * len(sfx_labels)) + "[a_with_sfx]"
            )
            current_audio_label = "a_with_sfx"

    # Optional Background Music with Auto-Ducking
    if background_music:
        music_path = ensure_ambient_music()
        extra_inputs.append(str(music_path))
        music_input_idx = next_input_idx
        next_input_idx += 1

        duck_filter = build_ducking_audio_filter(
            main_audio_label=current_audio_label,
            music_input_index=music_input_idx,
            duck_threshold=0.08,
            duck_ratio=8.0,
            music_volume=0.20
        )
        audio_filter_parts.append(duck_filter)
        current_audio_label = "a_mixed"

    # Final Loudness Normalization
    audio_filter_parts.append(f"[{current_audio_label}]loudnorm=I=-14:TP=-1.5:LRA=11[a_out]")
    full_audio_filter = ";".join(audio_filter_parts)

    full_filter_complex = f"{video_filter};{full_audio_filter}"

    # 4. Transcode with FFmpeg
    run_ffmpeg_render(
        video_path=vp,
        start_sec=candidate.start,
        duration=candidate.duration,
        filter_complex=full_filter_complex,
        output_mp4=mp4_out,
        audio_loudnorm=False, # already handled in filter complex
        extra_inputs=extra_inputs
    )

    # 5. Cleanup tmp ASS file
    try:
        ass_path.unlink()
    except Exception:
        pass

    # 6. Write JSON sidecar
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
        "auto_zoom": auto_zoom,
        "include_emojis": include_emojis,
        "include_sfx": include_sfx,
        "background_music": background_music,
        "score_breakdown": candidate.score.model_dump(),
        "transcript_excerpt": candidate.text
    }

    with open(json_out, "w", encoding="utf-8") as f:
        json.dump(sidecar_data, f, indent=2)

    return mp4_out
