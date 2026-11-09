from pathlib import Path
from typing import Optional, Tuple
import numpy as np
import scipy.io.wavfile as wav

MUSIC_DIR = Path(__file__).resolve().parent.parent / "assets" / "music"

def ensure_ambient_music() -> Path:
    """Procedurally synthesize a smooth 60s royalty-free ambient lofi chord track."""
    MUSIC_DIR.mkdir(parents=True, exist_ok=True)
    music_file = MUSIC_DIR / "ambient_lofi.wav"
    if music_file.exists() and music_file.stat().st_size > 100000:
        return music_file

    sr = 48000
    duration_s = 60.0
    total_samples = int(sr * duration_s)
    t = np.linspace(0, duration_s, total_samples, endpoint=False)

    # 4-chord progression: Cmaj7, Am7, Fmaj7, G7 (each 7.5s, repeating)
    # Warm Rhodes-like synthesized sinusoids with gentle octave harmonics
    chords = [
        [261.63, 329.63, 392.00, 493.88], # Cmaj7
        [220.00, 261.63, 329.63, 392.00], # Am7
        [174.61, 220.00, 261.63, 329.63], # Fmaj7
        [196.00, 246.94, 293.66, 349.23]  # G7
    ]

    chord_dur = 7.5
    wave = np.zeros(total_samples, dtype=np.float32)

    for i, t_val in enumerate(t):
        chord_idx = int((t_val % (chord_dur * len(chords))) // chord_dur)
        freqs = chords[chord_idx]
        val = 0.0
        for f in freqs:
            val += np.sin(2 * np.pi * f * t_val) * 0.15
            val += np.sin(4 * np.pi * f * t_val) * 0.05
        # Soft tremolo
        tremolo = 1.0 + 0.15 * np.sin(2 * np.pi * 3.5 * t_val)
        wave[i] = val * tremolo

    # Apply soft attack and release envelope to whole loop
    ramp = int(sr * 1.5)
    wave[:ramp] *= np.linspace(0, 1, ramp)
    wave[-ramp:] *= np.linspace(1, 0, ramp)

    # Normalize to -18 dBFS level for background
    wave = wave / (np.max(np.abs(wave)) + 1e-6) * 0.25
    wav.write(music_file, sr, (wave * 32767).astype(np.int16))

    return music_file

def build_ducking_audio_filter(
    main_audio_label: str = "0:a",
    music_input_index: int = 1,
    duck_threshold: float = 0.08,
    duck_ratio: float = 8.0,
    music_volume: float = 0.22
) -> str:
    """
    Build FFmpeg sidechaincompress filter snippet for automatic music ducking.
    Ducks music volume when speaker is vocal, smoothly brings it up in pauses.
    """
    return (
        f"[{music_input_index}:a][{main_audio_label}]sidechaincompress="
        f"threshold={duck_threshold}:ratio={duck_ratio}:attack=20:release=250[ducked_bg];"
        f"[{main_audio_label}][ducked_bg]amix=inputs=2:weights=1.0 {music_volume}[a_mixed]"
    )
