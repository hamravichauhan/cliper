from typing import List, Tuple
from src.cliplocal.core.models import Sentence

def compute_punch_in_intervals(
    clip_duration: float,
    sentences: List[Sentence],
    zoom_interval_sec: float = 7.0,
    zoom_duration_sec: float = 3.0
) -> List[Tuple[float, float]]:
    """
    Generate dynamic punch-in intervals (t_start, t_end) relative to clip start (0.0).
    Punches in on the opening hook (first 3 seconds) and intermittently every ~7 seconds
    to reset viewer attention without causing visual fatigue.
    """
    intervals: List[Tuple[float, float]] = []

    # 1. Opening hook punch-in (first 2.5s)
    if clip_duration >= 6.0:
        intervals.append((0.0, min(2.8, clip_duration)))

    # 2. Subsequent rhythm punch-ins
    current_t = 6.5
    while (current_t + zoom_duration_sec) < (clip_duration - 2.0):
        intervals.append((round(current_t, 2), round(current_t + zoom_duration_sec, 2)))
        current_t += zoom_interval_sec + zoom_duration_sec

    return intervals

def build_dynamic_zoom_filter(
    in_w: int = 1920,
    in_h: int = 1080,
    out_w: int = 1080,
    out_h: int = 1920,
    center_x_ratio: float = 0.5,
    intervals: List[Tuple[float, float]] = None,
    zoom_factor: float = 1.15
) -> str:
    """
    Build dynamic FFmpeg crop expression that punches in (zoom_factor) during specified intervals.
    """
    base_crop_w = int(in_h * 9 / 16)
    if base_crop_w % 2 != 0:
        base_crop_w -= 1
    base_crop_h = in_h

    zoom_crop_w = int(base_crop_w / zoom_factor)
    if zoom_crop_w % 2 != 0:
        zoom_crop_w -= 1
    zoom_crop_h = int(base_crop_h / zoom_factor)
    if zoom_crop_h % 2 != 0:
        zoom_crop_h -= 1

    if not intervals:
        # Static crop fallback
        x_offset = max(0, min(in_w - base_crop_w, int(in_w * center_x_ratio - base_crop_w // 2)))
        return f"[0:v]crop={base_crop_w}:{base_crop_h}:{x_offset}:0,scale={out_w}:{out_h}[v_reframed]"

    # Build between condition: e.g. between(t, 0.0, 2.8) + between(t, 6.5, 9.5)
    condition_parts = [f"between(t,{start:.2f},{end:.2f})" for start, end in intervals]
    combined_cond = "+".join(condition_parts)

    w_expr = f"if({combined_cond},{zoom_crop_w},{base_crop_w})"
    h_expr = f"if({combined_cond},{zoom_crop_h},{base_crop_h})"

    # X centering around speaker
    x_center = int(in_w * center_x_ratio)
    # When ow changes between zoom and base, center around x_center clamped to bounds
    x_expr = f"max(0,min({in_w}-ow,{x_center}-ow/2))"
    y_expr = "(ih-oh)/2"

    return f"[0:v]crop=w='{w_expr}':h='{h_expr}':x='{x_expr}':y='{y_expr}',scale={out_w}:{out_h}[v_reframed]"
