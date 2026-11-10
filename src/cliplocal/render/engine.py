import json
import re
from pathlib import Path
from typing import Optional, List
from src.cliplocal.core.models import CandidateClip, ReframeMode, VideoMetadata
from src.cliplocal.captions.ass_generator import generate_ass_subtitles
from src.cliplocal.render.crop import build_crop_filter
from src.cliplocal.render.zoom import (
    compute_punch_in_intervals,
    compute_multicam_intervals,
    build_dynamic_zoom_filter
)
from src.cliplocal.render.ffmpeg import run_ffmpeg_render
from src.cliplocal.reframe.face_tracker import FaceTracker
from src.cliplocal.audio.sfx import find_sfx_trigger_points, ensure_sfx_assets
from src.cliplocal.audio.music import ensure_ambient_music, build_ducking_audio_filter
from src.cliplocal.transform.copyright import (
    build_transformative_audio_filter,
    build_transformative_video_filter,
    get_transformative_meta
)
from src.cliplocal.broll.engine import find_broll_cutaways
from src.cliplocal.render.thumbnail import extract_viral_thumbnails
from src.cliplocal.render.watermark import build_watermark_filter
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
    multicam: bool = True,
    top_banner: bool = True,
    include_emojis: bool = True,
    include_sfx: bool = True,
    background_music: bool = False,
    mute_original: bool = False,
    music_track: Optional[str] = None,
    music_volume: float = 0.22,
    anti_copyright: bool = False,
    broll: bool = False,
    extract_thumbnails: bool = True,
    watermark: Optional[str] = None
) -> Path:
    """
    Render a short clip with 9:16 framing, simulated multi-cam cuts, burned-in ASS captions,
    top hook headline banner, contextual emojis, sound effects, auto-ducked music,
    transformative anti-copyright filters, and viral thumbnail generation.
    """
    vp = Path(video_path).resolve()
    base_out = Path(output_dir).resolve()
    base_out.mkdir(parents=True, exist_ok=True)

    slug = slugify(candidate.title or candidate.score.hook_type or "clip")
    clip_filename = f"clip_{candidate.index:02d}_{slug}.mp4"
    sidecar_filename = f"clip_{candidate.index:02d}_{slug}.json"
    transform_log_filename = f"clip_{candidate.index:02d}_{slug}_transformation_log.json"
    mp4_out = base_out / clip_filename
    json_out = base_out / sidecar_filename
    transform_log_out = base_out / transform_log_filename

    # If anti-copyright is enabled, automatically layer background music for audio masking
    if anti_copyright:
        background_music = True

    # 1. Generate ASS subtitles for this clip in /tmp
    ass_path = Path("/tmp") / f"cliplocal_subs_{candidate.clip_id}_{candidate.index}.ass"
    
    # Extract dynamic, meaningful context headline from spoken words (never generic 'Engaging Moment')
    from src.cliplocal.context.extractor import extract_clip_context
    if not candidate.title or candidate.title.strip().lower() in ("engaging moment", "untitled", "clip"):
        candidate.title = extract_clip_context(candidate.text, candidate.sentences)

    top_headline = candidate.title if top_banner else None

    generate_ass_subtitles(
        words=candidate.words,
        output_ass_path=ass_path,
        time_offset=candidate.start,
        style_name=candidate.caption_style,
        include_emojis=include_emojis,
        top_hook_headline=top_headline,
        top_hook_persistent=False,
        clip_duration=candidate.duration
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

    # Video Filter Construction
    extra_inputs: List[str] = []
    video_filter_parts: List[str] = []
    next_input_idx = 1

    # Base Crop with Multi-Cam or Auto-Zoom
    if effective_mode in (ReframeMode.FACE_FOLLOW, ReframeMode.CENTER):
        if multicam and candidate.sentences:
            intervals = compute_multicam_intervals(
                candidate.duration,
                candidate.sentences,
                time_offset=candidate.start
            )
            base_crop = build_dynamic_zoom_filter(
                in_w=in_w,
                in_h=in_h,
                out_w=1080,
                out_h=1920,
                center_x_ratio=center_x,
                intervals=intervals,
                zoom_factor=1.24
            )
        elif auto_zoom:
            intervals = compute_punch_in_intervals(candidate.duration, candidate.sentences)
            base_crop = build_dynamic_zoom_filter(
                in_w=in_w,
                in_h=in_h,
                out_w=1080,
                out_h=1920,
                center_x_ratio=center_x,
                intervals=intervals,
                zoom_factor=1.15
            )
        else:
            base_crop = build_crop_filter(
                mode=effective_mode,
                in_w=in_w,
                in_h=in_h,
                out_w=1080,
                out_h=1920,
                center_x_ratio=center_x
            )
    else:
        base_crop = build_crop_filter(
            mode=effective_mode,
            in_w=in_w,
            in_h=in_h,
            out_w=1080,
            out_h=1920,
            center_x_ratio=center_x
        )

    video_filter_parts.append(base_crop)
    curr_v_label = "v_reframed"

    # Optional B-Roll Cutaway Overlays
    if broll and candidate.words:
        cutaways = find_broll_cutaways(
            words=candidate.words,
            time_offset=candidate.start,
            clip_duration=candidate.duration,
            max_cutaways=2
        )
        for i, cut in enumerate(cutaways):
            extra_inputs.append(cut.asset_path)
            broll_in_idx = next_input_idx
            next_input_idx += 1
            scaled_label = f"broll_sc_{i}"
            next_v_label = f"v_broll_{i}"

            video_filter_parts.append(
                f"[{broll_in_idx}:v]scale=1080:1920:force_original_aspect_ratio=increase,crop=1080:1920,setsar=1[{scaled_label}]"
            )
            video_filter_parts.append(
                f"[{curr_v_label}][{scaled_label}]overlay=0:0:enable='between(t,{cut.t_start:.2f},{cut.t_end:.2f})'[{next_v_label}]"
            )
            curr_v_label = next_v_label

    # Optional Anti-Copyright Transformative Video Filter
    if anti_copyright:
        v_trans_filter, next_v_label = build_transformative_video_filter(curr_v_label, "v_trans")
        video_filter_parts.append(v_trans_filter)
        curr_v_label = next_v_label

    # Optional Social Handle / Watermark Overlay
    if watermark and watermark.strip():
        w_filter, next_v_label = build_watermark_filter(curr_v_label, "v_watermarked", handle=watermark)
        video_filter_parts.append(w_filter)
        curr_v_label = next_v_label

    # Subtitles burn-in
    escaped_ass = str(ass_path).replace("\\", "/").replace(":", "\\:")
    video_filter_parts.append(f"[{curr_v_label}]ass={escaped_ass}[v_out]")
    full_video_filter = ";".join(video_filter_parts)

    # 3. Audio Filter Construction
    audio_filter_parts: List[str] = []
    current_audio_label = "0:a"

    # Optional Sound Effects on Keywords
    if include_sfx and candidate.words:
        sfx_assets = ensure_sfx_assets()
        triggers = find_sfx_trigger_points(candidate.words, candidate.start)

        if triggers:
            sfx_labels = []
            for t_offset, sfx_type in triggers[:4]:
                sfx_file = sfx_assets.get(sfx_type, sfx_assets["pop"])
                extra_inputs.append(str(sfx_file))
                sfx_in_idx = next_input_idx
                next_input_idx += 1
                delay_ms = int(t_offset * 1000)
                sfx_label = f"sfx{sfx_in_idx}"
                audio_filter_parts.append(
                    f"[{sfx_in_idx}:a]adelay={delay_ms}|{delay_ms},volume=0.35[{sfx_label}]"
                )
                sfx_labels.append(f"[{sfx_label}]")

            all_sfx_inputs = f"[{current_audio_label}]" + "".join(sfx_labels)
            num_inputs = len(sfx_labels) + 1
            audio_filter_parts.append(
                f"{all_sfx_inputs}amix=inputs={num_inputs}:dropout_transition=0:weights=1.0 " + " ".join(["0.4"] * len(sfx_labels)) + "[a_with_sfx]"
            )
            current_audio_label = "a_with_sfx"

    # Optional Anti-Copyright Transformative Audio Filter (Tempo & Vocal EQ)
    if anti_copyright:
        a_trans_filter, next_a_label = build_transformative_audio_filter(current_audio_label, "a_trans")
        audio_filter_parts.append(a_trans_filter)
        current_audio_label = next_a_label

    # Optional Background Music or Song Layering with Muting / Auto-Ducking
    has_song = background_music or bool(music_track)
    if mute_original:
        if has_song:
            music_path = ensure_ambient_music(music_track or "ambient_lofi")
            extra_inputs.append(str(music_path))
            music_input_idx = next_input_idx
            next_input_idx += 1
            audio_filter_parts.append(f"[{music_input_idx}:a]volume={music_volume or 0.85}[a_music_only]")
            current_audio_label = "a_music_only"
        else:
            audio_filter_parts.append(f"[{current_audio_label}]volume=0.0[a_muted]")
            current_audio_label = "a_muted"
    elif has_song:
        music_path = ensure_ambient_music(music_track or "ambient_lofi")
        extra_inputs.append(str(music_path))
        music_input_idx = next_input_idx
        next_input_idx += 1

        duck_filter = build_ducking_audio_filter(
            main_audio_label=current_audio_label,
            music_input_index=music_input_idx,
            duck_threshold=0.08,
            duck_ratio=8.0,
            music_volume=music_volume or 0.22
        )
        audio_filter_parts.append(duck_filter)
        current_audio_label = "a_mixed"

    # Final Loudness Normalization
    audio_filter_parts.append(f"[{current_audio_label}]loudnorm=I=-14:TP=-1.5:LRA=11[a_out]")
    full_audio_filter = ";".join(audio_filter_parts)

    full_filter_complex = f"{full_video_filter};{full_audio_filter}"

    # 4. Transcode with FFmpeg
    run_ffmpeg_render(
        video_path=vp,
        start_sec=candidate.start,
        duration=candidate.duration,
        filter_complex=full_filter_complex,
        output_mp4=mp4_out,
        audio_loudnorm=False,
        extra_inputs=extra_inputs
    )

    # 5. Cleanup tmp ASS file
    try:
        ass_path.unlink()
    except Exception:
        pass

    # 6. Extract Viral Thumbnails
    thumb_paths: List[Path] = []
    if extract_thumbnails:
        try:
            thumb_paths = extract_viral_thumbnails(
                video_path=vp,
                start_sec=candidate.start,
                duration=candidate.duration,
                title=candidate.title,
                output_dir=base_out,
                clip_index=candidate.index,
                count=3
            )
        except Exception:
            thumb_paths = []

    candidate.thumbnails = [str(t) for t in thumb_paths]
    candidate.output_path = str(mp4_out)

    # 7. Write JSON sidecar
    import datetime
    import hashlib

    weights_dict = config.get("scoring", {}).get("weights", {})
    weights_json = json.dumps(weights_dict, sort_keys=True)
    scoring_weights_hash = hashlib.sha256(weights_json.encode("utf-8")).hexdigest()[:12]

    # Full source provenance block
    source_info = {
        "url": getattr(metadata, "source_url", None) or str(vp),
        "video_id": getattr(metadata, "video_id", None) or vp.stem,
        "channel": getattr(metadata, "channel", None) or "Local Video",
        "duration_sec": getattr(metadata, "duration", candidate.duration),
        "downloaded_at_utc": getattr(metadata, "downloaded_at_utc", None) or datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "source_sha256_audio": getattr(metadata, "source_sha256_audio", None) or getattr(metadata, "file_hash", "unknown"),
        "detected_license": getattr(metadata, "detected_license", "Standard License"),
        "is_creative_commons": getattr(metadata, "is_creative_commons", False)
    }

    transformation_factors = {
        "audio_tempo_multiplier": 1.025 if anti_copyright else 1.0,
        "vocal_presence_eq": anti_copyright,
        "ambient_music_layering": background_music or anti_copyright,
        "vertical_reframing_mode": reframe_mode.value,
        "simulated_multicam": multicam,
        "top_banner_hook": top_banner,
        "contextual_emojis": include_emojis,
        "sound_effects": include_sfx,
        "burned_captions_style": candidate.caption_style.value
    }

    sidecar_data = {
        "cliplocal_version": "1.0.0",
        "transformation_pipeline_version": "v2.1-apple-videotoolbox",
        "scoring_weights_hash": scoring_weights_hash,
        "legal_notice": "This document logs automated creative transformations. It constitutes technical metadata, not legal fair-use determination. Users bear sole responsibility for copyright compliance.",
        "source": source_info,
        "transformation_factors": transformation_factors,
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
        "multicam": multicam,
        "top_banner": top_banner,
        "include_emojis": include_emojis,
        "include_sfx": include_sfx,
        "background_music": background_music,
        "anti_copyright": anti_copyright,
        "broll": broll,
        "watermark": watermark,
        "thumbnails": candidate.thumbnails,
        "score_breakdown": candidate.score.model_dump(),
        "transcript_excerpt": candidate.text
    }

    if anti_copyright:
        sidecar_data["transformative_meta"] = get_transformative_meta()

    with open(json_out, "w", encoding="utf-8") as f:
        json.dump(sidecar_data, f, indent=2)

    with open(transform_log_out, "w", encoding="utf-8") as f:
        json.dump(sidecar_data, f, indent=2)

    return mp4_out
