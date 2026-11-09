from src.cliplocal.core.models import ReframeMode

def build_crop_filter(
    mode: ReframeMode = ReframeMode.CENTER,
    in_w: int = 1920,
    in_h: int = 1080,
    out_w: int = 1080,
    out_h: int = 1920,
    center_x_ratio: float = 0.5
) -> str:
    """
    Build FFmpeg filtergraph snippet for reframing horizontal video into vertical 9:16.
    """
    if mode == ReframeMode.BLUR_FILL:
        # Blur-fill: split into background (blurred & scaled to fill 1080x1920) and foreground (scaled to fit width)
        return (
            f"[0:v]split=2[bg][fg];"
            f"[bg]scale={out_w}:{out_h}:force_original_aspect_ratio=increase,crop={out_w}:{out_h},boxblur=20:5[bg_blur];"
            f"[fg]scale={out_w}:-1[fg_scaled];"
            f"[bg_blur][fg_scaled]overlay=(W-w)/2:(H-h)/2[v_reframed]"
        )
    elif mode == ReframeMode.SPLIT_STACKED:
        # Mode E: Split stacked 2-speaker vertical layout (two 1080x960 panels stacked)
        crop_w = int(in_h * 9 / 16)
        if crop_w % 2 != 0:
            crop_w -= 1
        crop_h = in_h
        panel_h = out_h // 2
        x_left = max(0, min(in_w - crop_w, int(in_w * 0.25 - crop_w // 2)))
        x_right = max(0, min(in_w - crop_w, int(in_w * 0.75 - crop_w // 2)))
        return (
            f"[0:v]split=2[v_left][v_right];"
            f"[v_left]crop={crop_w}:{crop_h}:{x_left}:0,scale={out_w}:{panel_h}[top_panel];"
            f"[v_right]crop={crop_w}:{crop_h}:{x_right}:0,scale={out_w}:{panel_h}[bottom_panel];"
            f"[top_panel][bottom_panel]vstack[v_reframed]"
        )
    elif mode in (ReframeMode.FACE_FOLLOW, ReframeMode.ACTIVE_SPEAKER):
        # Dynamic or centered face/speaker crop
        crop_w = int(in_h * 9 / 16)
        if crop_w % 2 != 0:
            crop_w -= 1
        crop_h = in_h
        
        # Calculate X offset based on center_x_ratio
        x_center = int(in_w * center_x_ratio)
        x_offset = max(0, min(in_w - crop_w, x_center - crop_w // 2))
        return f"[0:v]crop={crop_w}:{crop_h}:{x_offset}:0,scale={out_w}:{out_h}[v_reframed]"
    else:
        # Default: Mode A Center Crop
        crop_w = int(in_h * 9 / 16)
        if crop_w % 2 != 0:
            crop_w -= 1
        crop_h = in_h
        return f"[0:v]crop={crop_w}:{crop_h}:(iw-ow)/2:0,scale={out_w}:{out_h}[v_reframed]"
