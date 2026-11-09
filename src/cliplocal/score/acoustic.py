from pathlib import Path
from typing import Tuple, List
import numpy as np
import soundfile as sf
import librosa
from src.cliplocal.core.models import Word
from src.cliplocal.config.settings import config

def calculate_speaking_pace(words: List[Word], duration: float) -> Tuple[float, float]:
    """
    Compute words per minute (WPM) and pace score (0-100).
    Sweet spot: ~115 - 180 WPM.
    """
    if duration <= 0 or not words:
        return 0.0, 30.0

    wpm = (len(words) / duration) * 60.0
    wpm_optimal = config.get("scoring", {}).get("pace_wpm_optimal", [120, 175])
    wpm_acceptable = config.get("scoring", {}).get("pace_wpm_acceptable", [95, 210])

    if wpm_optimal[0] <= wpm <= wpm_optimal[1]:
        score = 100.0
    elif wpm_acceptable[0] <= wpm < wpm_optimal[0]:
        ratio = (wpm - wpm_acceptable[0]) / (wpm_optimal[0] - wpm_acceptable[0])
        score = 60.0 + ratio * 40.0
    elif wpm_optimal[1] < wpm <= wpm_acceptable[1]:
        ratio = (wpm_acceptable[1] - wpm) / (wpm_acceptable[1] - wpm_optimal[1])
        score = 60.0 + ratio * 40.0
    else:
        score = max(20.0, 50.0 - abs(wpm - 150) * 0.4)

    return round(wpm, 1), round(score, 1)

def analyze_audio_segment(
    audio_path: Path | str,
    start_sec: float,
    end_sec: float
) -> Tuple[float, float, float]:
    """
    Analyze energy variance and pitch variation in the audio slice using librosa.
    Returns (acoustic_score 0-100, energy_variance, pitch_variation).
    """
    ap = Path(audio_path).resolve()
    if not ap.exists():
        return 50.0, 0.0, 0.0

    duration = max(0.1, end_sec - start_sec)
    try:
        # Load only the slice to keep memory minimal
        y, sr = sf.read(ap, start=int(start_sec * 16000), stop=int(end_sec * 16000), dtype="float32")
        if len(y) < 1600:
            return 50.0, 0.0, 0.0

        # 1. Energy Analysis (RMS)
        rms = librosa.feature.rms(y=y, frame_length=1024, hop_length=512)[0]
        rms_mean = float(np.mean(rms))
        rms_std = float(np.std(rms))
        energy_variance = (rms_std / (rms_mean + 1e-6)) if rms_mean > 0 else 0.0

        # 2. Pitch / F0 estimation using pyin or zero-crossing rate + spectral centroid for speed
        spectral_contrast = librosa.feature.spectral_contrast(y=y, sr=sr)
        contrast_std = float(np.std(spectral_contrast))

        # Dynamic range & expressiveness scoring
        norm_energy = min(1.0, energy_variance / 0.8)
        norm_contrast = min(1.0, contrast_std / 8.0)

        acoustic_score = (norm_energy * 0.55 + norm_contrast * 0.45) * 100.0
        return round(float(acoustic_score), 1), round(energy_variance, 3), round(contrast_std, 3)
    except Exception:
        return 50.0, 0.0, 0.0
