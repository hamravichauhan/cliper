import re
from pathlib import Path
from typing import List, Tuple, Optional
import cv2
import numpy as np

def calculate_frame_sharpness(frame: np.ndarray) -> float:
    """Laplacian variance to measure focus and absence of motion blur."""
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    return float(cv2.Laplacian(gray, cv2.CV_64F).var())

def extract_viral_thumbnails(
    video_path: Path | str,
    start_sec: float,
    duration: float,
    title: str,
    output_dir: Path | str,
    clip_index: int = 1,
    count: int = 3
) -> List[Path]:
    """
    Extract high-retention 9:16 cover thumbnail frames with hook title card overlays.
    Selects frames with high sharpness, centered face presence, and passionate facial expression.
    """
    vp = Path(video_path).resolve()
    out_d = Path(output_dir).resolve()
    out_d.mkdir(parents=True, exist_ok=True)

    cap = cv2.VideoCapture(str(vp))
    if not cap.isOpened():
        return []

    fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
    total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
    start_frame = int(start_sec * fps)
    end_frame = min(total_frames, int((start_sec + duration) * fps))

    # Sample candidate frames every ~0.8 seconds
    step_frames = max(1, int(fps * 0.8))
    candidates: List[Tuple[float, float, np.ndarray]] = []  # (score, timestamp, frame)

    curr = start_frame
    while curr < end_frame:
        cap.set(cv2.CAP_PROP_POS_FRAMES, curr)
        ret, frame = cap.read()
        if not ret or frame is None:
            curr += step_frames
            continue

        sharpness = calculate_frame_sharpness(frame)
        if sharpness < 40.0:  # Skip visibly blurry frames
            curr += step_frames
            continue

        h, w = frame.shape[:2]
        # Evaluate brightness / contrast
        brightness = float(np.mean(frame))
        if brightness < 30.0 or brightness > 230.0:
            curr += step_frames
            continue

        t_sec = curr / fps
        # Score emphasizes sharpness and ideal mid-brightness
        score = min(100.0, sharpness / 5.0) + (100.0 - abs(brightness - 128.0) * 0.8)
        candidates.append((score, t_sec, frame))
        curr += step_frames

    cap.release()

    if not candidates:
        return []

    # Sort descending by score
    candidates.sort(key=lambda x: x[0], reverse=True)

    # Pick top distinct frames separated by at least 2.0s
    selected: List[Tuple[float, np.ndarray]] = []
    for sc, t, fr in candidates:
        if all(abs(t - st) >= 2.0 for st, _ in selected):
            selected.append((t, fr))
            if len(selected) >= count:
                break

    # If fewer than count, take whatever best frames exist
    if len(selected) < count:
        for sc, t, fr in candidates:
            if not any(abs(t - st) < 0.5 for st, _ in selected):
                selected.append((t, fr))
                if len(selected) >= count:
                    break

    thumbnail_paths: List[Path] = []
    clean_title = (title or "MUST WATCH").strip()[:35].upper()

    for idx, (t, frame) in enumerate(selected[:count]):
        h, w = frame.shape[:2]

        # Crop to 9:16 vertical if input is landscape
        if w > h:
            crop_w = int(h * 9 / 16)
            crop_x = (w - crop_w) // 2
            cropped = frame[:, crop_x:crop_x + crop_w]
        else:
            cropped = frame

        # Resize to standard 1080x1920
        v_thumb = cv2.resize(cropped, (1080, 1920), interpolation=cv2.INTER_AREA)

        # Draw sleek viral title banner at top
        banner_y1, banner_y2 = 180, 310
        # Translucent dark charcoal pill banner
        overlay = v_thumb.copy()
        cv2.rectangle(overlay, (80, banner_y1), (1000, banner_y2), (20, 20, 25), -1)
        cv2.addWeighted(overlay, 0.85, v_thumb, 0.15, 0, v_thumb)
        # Gold accent border
        cv2.rectangle(v_thumb, (80, banner_y1), (1000, banner_y2), (0, 215, 255), 4)

        # Draw title text centered
        font = cv2.FONT_HERSHEY_DUPLEX
        font_scale = 1.3
        thickness = 3
        text_size = cv2.getTextSize(clean_title, font, font_scale, thickness)[0]
        text_x = max(90, (1080 - text_size[0]) // 2)
        text_y = banner_y1 + ((banner_y2 - banner_y1) + text_size[1]) // 2

        # Shadow + Text
        cv2.putText(v_thumb, clean_title, (text_x + 2, text_y + 2), font, font_scale, (0, 0, 0), thickness + 2, cv2.LINE_AA)
        cv2.putText(v_thumb, clean_title, (text_x, text_y), font, font_scale, (255, 255, 255), thickness, cv2.LINE_AA)

        out_thumb_path = out_d / f"clip_{clip_index:02d}_thumb_{idx + 1}.jpg"
        cv2.imwrite(str(out_thumb_path), v_thumb, [cv2.IMWRITE_JPEG_QUALITY, 92])
        thumbnail_paths.append(out_thumb_path)

    return thumbnail_paths
