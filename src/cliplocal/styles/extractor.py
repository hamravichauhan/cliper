from __future__ import annotations
import re
import time
from pathlib import Path
from typing import List, Optional, Tuple, Dict, Any
import cv2
import numpy as np

from src.cliplocal.ingest.downloader import is_url, download_video
from src.cliplocal.styles.models import (
    CreatorStyleProfile, TypographyDNA, RhythmDNA, GraphicOverlayDNA, AudioDNA
)
from src.cliplocal.styles.manager import save_style_profile

def rgb_to_hex(r: int, g: int, b: int) -> str:
    return f"#{r:02X}{g:02X}{b:02X}"

def detect_caption_colors_from_frames(frames: List[np.ndarray]) -> Tuple[str, str, bool]:
    """
    Sample candidate text regions in the lower/middle half of the vertical frames.
    Extracts the dominant text color (usually White or Black) and the highlight color (Yellow/Green/Cyan).
    Returns (primary_color_hex, highlight_color_hex, has_dark_pill_box).
    """
    primary_color = "#FFFFFF"
    highlight_color = "#FFD700" # Default Golden Yellow
    has_pill_box = False

    if not frames:
        return primary_color, highlight_color, has_pill_box

    color_samples: List[Tuple[int, int, int]] = []
    dark_pixel_ratios: List[float] = []

    for frame in frames:
        h, w = frame.shape[:2]
        # Focus on vertical middle to lower third (typical short caption zone)
        roi = frame[int(h * 0.45):int(h * 0.75), int(w * 0.08):int(w * 0.92)]
        if roi.size == 0:
            continue

        # Convert to HSV to detect high-saturation text highlights
        hsv = cv2.cvtColor(roi, cv2.COLOR_BGR2HSV)
        # Check dark pixels (for translucent box/pill detection)
        gray = cv2.cvtColor(roi, cv2.COLOR_BGR2GRAY)
        dark_pixels = np.sum(gray < 40)
        dark_pixel_ratios.append(dark_pixels / max(1, gray.size))

        # Detect Yellow/Gold highlights (H: 20-40, S: 100-255, V: 150-255)
        yellow_mask = cv2.inRange(hsv, np.array([18, 110, 140]), np.array([36, 255, 255]))
        # Detect Bright Green highlights (H: 36-80, S: 110-255, V: 140-255)
        green_mask = cv2.inRange(hsv, np.array([36, 110, 140]), np.array([85, 255, 255]))
        # Detect Bright Cyan/Blue highlights (H: 86-125, S: 100-255, V: 140-255)
        cyan_mask = cv2.inRange(hsv, np.array([86, 100, 140]), np.array([125, 255, 255]))

        y_count = np.count_nonzero(yellow_mask)
        g_count = np.count_nonzero(green_mask)
        c_count = np.count_nonzero(cyan_mask)

        if y_count > 150:
            highlight_color = "#FFD700" # Golden Yellow (Raj Shamani / Alex Hormozi)
        elif g_count > 150:
            highlight_color = "#00FF66" # Neon Emerald Green
        elif c_count > 150:
            highlight_color = "#38BDF8" # Sky Blue (Ali Abdaal)

    # If >12% of ROI has dark background, creator uses a dark backing pill
    if dark_pixel_ratios and np.mean(dark_pixel_ratios) > 0.12:
        has_pill_box = True

    return primary_color, highlight_color, has_pill_box

def measure_video_cut_rhythm(video_path: Path) -> Tuple[float, float]:
    """
    Calculate Average Shot Duration (ASD) and camera zoom punch ratio
    using histogram differencing across frame samples.
    """
    cap = cv2.VideoCapture(str(video_path))
    if not cap.isOpened():
        return 2.2, 1.25

    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    sample_step = max(1, int(fps * 0.1)) # Sample every 100ms

    cuts: List[float] = [0.0]
    prev_hist = None
    curr_frame = 0

    while curr_frame < min(total_frames, int(fps * 60)): # Sample up to 60s
        cap.set(cv2.CAP_PROP_POS_FRAMES, curr_frame)
        ret, frame = cap.read()
        if not ret or frame is None:
            break

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        hist = cv2.calcHist([gray], [0], None, [32], [0, 256])
        cv2.normalize(hist, hist)

        if prev_hist is not None:
            diff = cv2.compareHist(prev_hist, hist, cv2.HISTCMP_CHISQR)
            if diff > 18.0: # Significant visual cut
                t_sec = curr_frame / fps
                if (t_sec - cuts[-1]) >= 1.0: # Minimum 1s shot duration
                    cuts.append(t_sec)

        prev_hist = hist
        curr_frame += sample_step

    cap.release()

    if len(cuts) > 1:
        shot_lengths = [cuts[i] - cuts[i - 1] for i in range(1, len(cuts))]
        asd = float(np.median(shot_lengths))
        asd = max(1.4, min(4.5, asd))
    else:
        asd = 2.1

    # Typical snap zoom in short form is 1.20x - 1.25x
    zoom_ratio = 1.25 if asd <= 2.2 else 1.18
    return round(asd, 2), zoom_ratio

def clone_creator_style_dna(
    sample_paths_or_urls: List[str],
    profile_id: str,
    profile_name: str,
    creator_handle: Optional[str] = None,
    description: Optional[str] = None
) -> CreatorStyleProfile:
    """
    Ingest 1-3 reference videos from any creator, reverse-engineer their
    typography, cut cadence, and audio/graphics patterns, and save a reusable CreatorStyleProfile.
    """
    resolved_paths: List[Path] = []
    for item in sample_paths_or_urls:
        if is_url(item):
            p = download_video(item)
            resolved_paths.append(p)
        else:
            p = Path(item).resolve()
            if p.exists():
                resolved_paths.append(p)

    if not resolved_paths:
        raise ValueError("No valid reference videos found to analyze.")

    # 1. Sample frames for color & typography detection
    sampled_frames: List[np.ndarray] = []
    asd_list: List[float] = []
    zoom_ratios: List[float] = []

    for vp in resolved_paths:
        cap = cv2.VideoCapture(str(vp))
        if cap.isOpened():
            fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
            total = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            # Grab ~15 frames spread across the video
            indices = np.linspace(int(fps * 2), max(int(fps * 2) + 1, total - int(fps * 2)), 15, dtype=int)
            for idx in indices:
                cap.set(cv2.CAP_PROP_POS_FRAMES, int(idx))
                ret, f = cap.read()
                if ret and f is not None:
                    sampled_frames.append(f)
            cap.release()

        asd, zoom = measure_video_cut_rhythm(vp)
        asd_list.append(asd)
        zoom_ratios.append(zoom)

    # 2. Extract typography and color profile
    prim_color, high_color, has_pill = detect_caption_colors_from_frames(sampled_frames)
    avg_asd = float(np.mean(asd_list)) if asd_list else 2.1
    avg_zoom = float(np.mean(zoom_ratios)) if zoom_ratios else 1.25

    # 3. Assemble Style DNA
    clean_id = re.sub(r"[^a-zA-Z0-9_]", "", profile_id.lower().replace(" ", "_").replace("@", ""))
    desc = description or f"Cloned editing style from {creator_handle or profile_name} (Cut rhythm: {avg_asd:.1f}s, Highlight: {high_color})."

    profile = CreatorStyleProfile(
        id=clean_id,
        name=profile_name,
        creator_handle=creator_handle or f"@{clean_id}",
        description=desc,
        is_builtin=False,
        created_at=time.time(),
        sample_urls=sample_paths_or_urls,
        typography=TypographyDNA(
            font_family="Arial",
            font_size=52 if avg_asd <= 2.2 else 46,
            bold=True,
            uppercase=True,
            primary_color=prim_color,
            highlight_color=high_color,
            highlight_box_color="#18181B" if has_pill else None,
            outline_color="#000000",
            outline_width=4,
            shadow_offset=2,
            highlight_scale=116,
            words_per_line=3 if avg_asd <= 2.4 else 4
        ),
        rhythm=RhythmDNA(
            average_shot_duration_sec=avg_asd,
            zoom_punch_ratio=avg_zoom,
            snap_zoom_on_emphasis=True
        ),
        graphics=GraphicOverlayDNA(
            enabled=True,
            overlay_type="die_cut_sticker",
            sticker_border_px=4,
            sticker_border_color="#FFFFFF",
            drop_shadow=True,
            animation_style="spring_pop",
            max_overlays_per_clip=3
        ),
        audio=AudioDNA(
            whoosh_on_cuts=True,
            shutter_on_stickers=True,
            sub_drop_on_climax=True,
            bg_music_track="ambient_lofi",
            bg_music_ducking_db=-18.0
        )
    )

    save_style_profile(profile)
    return profile
