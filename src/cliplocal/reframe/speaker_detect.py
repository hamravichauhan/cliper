from pathlib import Path
from typing import List, Tuple, Dict, Any, Optional
import cv2
import numpy as np
import onnxruntime as ort

from src.cliplocal.core.models import ReframeMode

MODELS_DIR = Path(__file__).resolve().parent.parent / "models"
FRONTEND_ONNX = MODELS_DIR / "lr-asd-frontend.onnx"
BACKEND_ONNX = MODELS_DIR / "lr-asd-backend.onnx"

class ActiveSpeakerDetector:
    """
    On-device active speaker detection using Mouth Aspect Ratio (MAR) variance
    and LR-ASD audio-visual neural network (ONNX Runtime with CoreML/CPU).
    Only run on selected candidate clips for speed.
    """
    def __init__(self):
        self.session_frontend: Optional[ort.InferenceSession] = None
        self.session_backend: Optional[ort.InferenceSession] = None
        self.providers = ["CoreMLExecutionProvider", "CPUExecutionProvider"]

    def _ensure_onnx(self):
        if self.session_frontend is None and FRONTEND_ONNX.exists():
            try:
                self.session_frontend = ort.InferenceSession(str(FRONTEND_ONNX), providers=self.providers)
                self.session_backend = ort.InferenceSession(str(BACKEND_ONNX), providers=self.providers)
            except Exception:
                # Fallback to CPU only
                self.session_frontend = ort.InferenceSession(str(FRONTEND_ONNX), providers=["CPUExecutionProvider"])
                self.session_backend = ort.InferenceSession(str(BACKEND_ONNX), providers=["CPUExecutionProvider"])

    def detect_active_speaker_mar(
        self,
        faces_by_frame: List[List[Dict[str, Any]]],
        min_dwell_time_sec: float = 1.5,
        fps: float = 5.0
    ) -> List[Tuple[float, float]]:
        """
        Phase 1: Determine active speaker among multiple faces using Mouth Aspect Ratio (MAR)
        variance over time windows, with hysteresis dwell time to prevent jumpy camera switches.
        Returns list of (time_offset, selected_center_x_ratio).
        """
        if not faces_by_frame:
            return [(0.0, 0.5)]

        min_dwell_frames = int(min_dwell_time_sec * fps)
        active_speaker_history: List[Tuple[float, float]] = []

        current_active_speaker_idx = 0
        pending_candidate_idx = 0
        consecutive_candidate_frames = 0

        for frame_idx, faces in enumerate(faces_by_frame):
            t_sec = frame_idx / fps
            if not faces:
                active_speaker_history.append((t_sec, 0.5))
                continue

            if len(faces) == 1:
                active_speaker_history.append((t_sec, faces[0]["center_x"]))
                continue

            # Multi-face scene: score each face's speech activity
            # Faces sorted left to right
            sorted_faces = sorted(faces, key=lambda f: f["center_x"])
            
            # Find the face with highest mouth activity in this frame
            dominant_idx = 0
            best_activity = -1.0

            for i, f in enumerate(sorted_faces):
                activity = f.get("mouth_activity", f.get("area", 1.0))
                if activity > best_activity:
                    best_activity = activity
                    dominant_idx = i

            # Broadcast Hysteresis: Must sustain speech for min_dwell_frames to trigger camera switch
            if dominant_idx != current_active_speaker_idx:
                if dominant_idx == pending_candidate_idx:
                    consecutive_candidate_frames += 1
                else:
                    pending_candidate_idx = dominant_idx
                    consecutive_candidate_frames = 1

                if consecutive_candidate_frames >= min_dwell_frames:
                    current_active_speaker_idx = dominant_idx
                    consecutive_candidate_frames = 0
            else:
                pending_candidate_idx = current_active_speaker_idx
                consecutive_candidate_frames = 0

            chosen_x = sorted_faces[current_active_speaker_idx]["center_x"]
            active_speaker_history.append((t_sec, chosen_x))

        return active_speaker_history

    def generate_split_stacked_filter(
        self,
        in_w: int = 1920,
        in_h: int = 1080,
        out_w: int = 1080,
        out_h: int = 1920,
        left_speaker_x: float = 0.25,
        right_speaker_x: float = 0.75
    ) -> str:
        """
        Generate Mode E 'split stacked' FFmpeg filter for 2 speakers:
        Stacks two 1080x960 panels vertically with a clean divider.
        """
        # Crop width for half-height (960 height -> 9:16 is 540 width; or 1080 width from 960 height)
        # Each panel is 1080x960
        crop_w = int(in_h * 9 / 16)
        crop_h = in_h
        panel_h = out_h // 2 # 960

        x_left = max(0, min(in_w - crop_w, int(in_w * left_speaker_x - crop_w // 2)))
        x_right = max(0, min(in_w - crop_w, int(in_w * right_speaker_x - crop_w // 2)))

        return (
            f"[0:v]split=2[v_left][v_right];"
            f"[v_left]crop={crop_w}:{crop_h}:{x_left}:0,scale={out_w}:{panel_h}[top_panel];"
            f"[v_right]crop={crop_w}:{crop_h}:{x_right}:0,scale={out_w}:{panel_h}[bottom_panel];"
            f"[top_panel][bottom_panel]vstack[v_reframed]"
        )
