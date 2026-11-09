from pathlib import Path
from typing import List, Tuple, Dict, Any, Optional
import cv2
import numpy as np

from src.cliplocal.core.models import ReframeMode
from src.cliplocal.reframe.scene_detect import detect_scene_cuts

YUNET_MODEL_PATH = Path(__file__).resolve().parent.parent / "models" / "face-detection-yunet.onnx"

class FaceTracker:
    def __init__(self, model_path: Optional[Path | str] = None):
        self.model_path = str(model_path or YUNET_MODEL_PATH)
        self.detector = None

    def _ensure_detector(self, width: int = 320, height: int = 320):
        if self.detector is None:
            self.detector = cv2.FaceDetectorYN.create(
                self.model_path,
                "",
                (width, height),
                score_threshold=0.6,
                nms_threshold=0.3
            )
        else:
            self.detector.setInputSize((width, height))

    def track_clip(
        self,
        video_path: Path | str,
        start_sec: float,
        end_sec: float,
        target_sample_fps: float = 5.0
    ) -> Dict[str, Any]:
        """
        Track faces in video clip slice, apply scene-cut aware EMA smoothing with dead-zone,
        and recommend the optimal reframing mode.
        """
        vp = Path(video_path).resolve()
        cap = cv2.VideoCapture(str(vp))
        if not cap.isOpened():
            return {
                "recommended_mode": ReframeMode.CENTER,
                "dominant_center_x": 0.5,
                "trajectories": []
            }

        fps = cap.get(cv2.CAP_PROP_FPS) or 30.0
        frame_w = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH) or 1920)
        frame_h = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT) or 1080)
        scale_w, scale_h = 640, 360

        self._ensure_detector(scale_w, scale_h)
        scene_cuts = detect_scene_cuts(vp)

        step = max(1, int(round(fps / target_sample_fps)))
        cap.set(cv2.CAP_PROP_POS_MSEC, start_sec * 1000.0)

        raw_positions: List[Tuple[float, float, int]] = [] # (time_sec, center_x_ratio, face_count)
        current_time = start_sec

        while current_time < end_sec:
            ret, frame = cap.read()
            if not ret:
                break

            current_frame_idx = int(cap.get(cv2.CAP_PROP_POS_FRAMES))
            if (current_frame_idx % step) != 0:
                current_time = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
                continue

            current_time = cap.get(cv2.CAP_PROP_POS_MSEC) / 1000.0
            resized = cv2.resize(frame, (scale_w, scale_h))
            _, faces = self.detector.detect(resized)

            if faces is not None and len(faces) > 0:
                # Find largest face by bounding box area (w * h)
                faces_sorted = sorted(faces, key=lambda f: f[2] * f[3], reverse=True)
                largest = faces_sorted[0]
                box_x, box_y, box_w, box_h = largest[0], largest[1], largest[2], largest[3]
                cx = (box_x + box_w / 2.0) / scale_w
                raw_positions.append((current_time, float(cx), len(faces)))
            else:
                raw_positions.append((current_time, 0.5, 0))

        cap.release()

        if not raw_positions:
            return {
                "recommended_mode": ReframeMode.CENTER,
                "dominant_center_x": 0.5,
                "trajectories": []
            }

        # Determine dominant face count
        counts = [p[2] for p in raw_positions]
        faces_detected = [c for c in counts if c > 0]
        avg_faces = float(np.mean(faces_detected)) if faces_detected else 0.0

        if avg_faces < 0.3:
            recommended_mode = ReframeMode.BLUR_FILL
        elif avg_faces > 1.6:
            recommended_mode = ReframeMode.ACTIVE_SPEAKER
        else:
            recommended_mode = ReframeMode.FACE_FOLLOW

        # Apply EMA smoothing with dead-zone and scene cuts
        alpha = 0.20
        dead_zone = 0.035
        max_pan_speed_per_sec = 0.18

        smoothed: List[Tuple[float, float]] = []
        current_smoothed_x = raw_positions[0][1]
        prev_t = raw_positions[0][0]

        for t, target_x, f_count in raw_positions:
            dt = max(0.01, t - prev_t)

            # Check if crossing a scene cut -> snap instantly
            is_cut = any(prev_t < cut <= t for cut in scene_cuts)
            if is_cut:
                current_smoothed_x = target_x
            else:
                # Dead-zone filter to remove micro-jitter
                if abs(target_x - current_smoothed_x) > dead_zone:
                    delta = (target_x - current_smoothed_x) * alpha
                    # Pan speed limit clamp to avoid motion sickness
                    max_delta = max_pan_speed_per_sec * dt
                    delta = np.clip(delta, -max_delta, max_delta)
                    current_smoothed_x += delta

            smoothed.append((round(t - start_sec, 3), round(float(current_smoothed_x), 3)))
            prev_t = t

        dominant_x = float(np.median([s[1] for s in smoothed]))

        return {
            "recommended_mode": recommended_mode,
            "dominant_center_x": round(dominant_x, 3),
            "trajectories": smoothed
        }
