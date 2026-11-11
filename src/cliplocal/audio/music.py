from pathlib import Path
from typing import Optional, Tuple
import numpy as np
import scipy.io.wavfile as wav

MUSIC_DIR = Path(__file__).resolve().parent.parent / "assets" / "music"

MUSIC_PRESETS = {
    "ambient_lofi": "ambient_lofi.wav",
    "phonk_drift": "phonk_drift.wav",
    "synthwave": "synthwave.wav",
    "cinematic": "cinematic.wav",
    "tension_drone": "tension_drone.wav",
    "emotional_piano": "emotional_piano.wav"
}

ARCHETYPE_SUITE_MAP = {
    "contrarian_truth": "tension_drone",
    "conflict_debate": "tension_drone",
    "shocking_revelation": "tension_drone",
    "conspiracy_theory": "tension_drone",
    "insider_secret": "tension_drone",
    "story_metaphor": "emotional_piano",
    "emotional_vulnerability": "emotional_piano",
    "actionable_framework": "emotional_piano",
    "life_lesson": "emotional_piano",
    "counter_intuitive": "ambient_lofi",
    "humor_roast": "ambient_lofi"
}

def get_podcast_sound_suite_for_archetype(archetype: str) -> str:
    """Map viral question archetype to optimal background sound suite."""
    clean = archetype.lower().strip()
    return ARCHETYPE_SUITE_MAP.get(clean, "tension_drone")

def ensure_ambient_music(genre: str = "ambient_lofi") -> Path:
    """Procedurally synthesize royalty-free background music loops (lo-fi, phonk, synthwave, cinematic)."""
    MUSIC_DIR.mkdir(parents=True, exist_ok=True)
    
    # Check if genre is a direct custom file path
    custom_path = Path(genre)
    if custom_path.exists() and custom_path.is_file():
        return custom_path.resolve()

    clean_genre = genre.lower().replace("-", "_").strip()
    filename = MUSIC_PRESETS.get(clean_genre, "ambient_lofi.wav")
    music_file = MUSIC_DIR / filename
    if music_file.exists() and music_file.stat().st_size > 50000:
        return music_file

    sr = 48000
    duration_s = 60.0
    total_samples = int(sr * duration_s)
    t = np.linspace(0, duration_s, total_samples, endpoint=False)
    wave = np.zeros(total_samples, dtype=np.float32)

    if clean_genre == "phonk_drift":
        # Fast driving 135 BPM phonk minor riff with punchy 808-style bass
        bpm = 135.0
        beat_dur = 60.0 / bpm
        root = 55.0 # A1 bass
        for i, t_val in enumerate(t):
            bar_t = t_val % (beat_dur * 4)
            step = int(bar_t / (beat_dur / 2)) # 8th note steps
            note_freq = root * (1.0 if step in (0, 1, 4) else (1.2 if step in (2, 5) else 1.33))
            # Distorted bass with cowbell harmonics
            bass = np.sin(2 * np.pi * note_freq * t_val) * 0.4
            sub = np.sin(2 * np.pi * (note_freq / 2) * t_val) * 0.3
            cowbell = (np.sin(2 * np.pi * note_freq * 8 * t_val) + np.sin(2 * np.pi * note_freq * 12 * t_val)) * 0.08
            wave[i] = np.tanh((bass + sub + cowbell) * 1.5) * 0.35

    elif clean_genre == "synthwave":
        # 115 BPM 80s driving synth arpeggios
        bpm = 115.0
        step_dur = (60.0 / bpm) / 4 # 16th notes
        scale = [110.0, 130.81, 164.81, 196.0, 220.0, 261.63] # Am pentatonic
        for i, t_val in enumerate(t):
            step_idx = int((t_val / step_dur) % len(scale))
            f = scale[step_idx]
            # Sawtooth-like harmonic synth pulse
            synth = (np.sin(2 * np.pi * f * t_val) * 0.25 +
                     np.sin(2 * np.pi * f * 2 * t_val) * 0.12 +
                     np.sin(2 * np.pi * f * 3 * t_val) * 0.06)
            bass = np.sin(2 * np.pi * 55.0 * t_val) * 0.25
            wave[i] = (synth + bass) * 0.35

    elif clean_genre == "cinematic":
        # Low dramatic sub-bass drone and tension strings (D minor)
        d_freq = 73.42 # D2
        for i, t_val in enumerate(t):
            sub = np.sin(2 * np.pi * d_freq * t_val) * 0.28
            tension = np.sin(2 * np.pi * (d_freq * 1.2) * t_val) * 0.10 # minor 3rd
            fifth = np.sin(2 * np.pi * (d_freq * 1.5) * t_val) * 0.12 # perfect 5th
            swell = 0.8 + 0.2 * np.sin(2 * np.pi * 0.15 * t_val)
            wave[i] = (sub + tension + fifth) * swell * 0.35

    elif clean_genre == "tension_drone":
        # Podcast Tension Drone: 40Hz sub-bass pulse + D-minor drone pad with slow 0.8Hz heartbeat swell
        d_freq = 73.42 # D2 root
        for i, t_val in enumerate(t):
            sub = np.sin(2 * np.pi * 40.0 * t_val) * 0.32
            drone = np.sin(2 * np.pi * d_freq * t_val) * 0.22
            tension = np.sin(2 * np.pi * (d_freq * 1.2) * t_val) * 0.12 # minor 3rd (F2)
            dissonance = np.sin(2 * np.pi * (d_freq * 1.414) * t_val) * 0.08 # tritone / flat 5
            heartbeat = 0.85 + 0.15 * np.sin(2 * np.pi * 0.8 * t_val) # 48 BPM pulse
            wave[i] = (sub + drone + tension + dissonance) * heartbeat * 0.34

    elif clean_genre == "emotional_piano":
        # Podcast Emotional Piano: Minor chords (Am, F, C, Em) with piano hammer decay and warm cello sustain
        chords = [
            [110.0, 130.81, 164.81], # Am
            [87.31, 110.0, 130.81],  # F
            [65.41, 98.0, 130.81],   # C
            [82.41, 123.47, 164.81]  # Em
        ]
        chord_dur = 7.5
        for i, t_val in enumerate(t):
            chord_idx = int((t_val % (chord_dur * len(chords))) // chord_dur)
            t_in_chord = t_val % chord_dur
            decay = np.exp(-1.8 * (t_in_chord / chord_dur))
            freqs = chords[chord_idx]
            piano_strike = 0.0
            cello_sustain = 0.0
            for f in freqs:
                piano_strike += (np.sin(2 * np.pi * f * 2 * t_val) * 0.18 + np.sin(2 * np.pi * f * 4 * t_val) * 0.06) * decay
                cello_sustain += np.sin(2 * np.pi * f * t_val) * 0.12
            vibrato = 1.0 + 0.08 * np.sin(2 * np.pi * 4.5 * t_val)
            wave[i] = (piano_strike + cello_sustain * vibrato) * 0.35

    else:
        # Default: ambient_lofi 4-chord progression: Cmaj7, Am7, Fmaj7, G7
        chords = [
            [261.63, 329.63, 392.00, 493.88], # Cmaj7
            [220.00, 261.63, 329.63, 392.00], # Am7
            [174.61, 220.00, 261.63, 329.63], # Fmaj7
            [196.00, 246.94, 293.66, 349.23]  # G7
        ]
        chord_dur = 7.5
        for i, t_val in enumerate(t):
            chord_idx = int((t_val % (chord_dur * len(chords))) // chord_dur)
            freqs = chords[chord_idx]
            val = 0.0
            for f in freqs:
                val += np.sin(2 * np.pi * f * t_val) * 0.15
                val += np.sin(4 * np.pi * f * t_val) * 0.05
            tremolo = 1.0 + 0.15 * np.sin(2 * np.pi * 3.5 * t_val)
            wave[i] = val * tremolo

    # Apply soft attack and release envelope
    ramp = int(sr * 1.5)
    wave[:ramp] *= np.linspace(0, 1, ramp)
    wave[-ramp:] *= np.linspace(1, 0, ramp)

    # Normalize to -16 dBFS level
    wave = wave / (np.max(np.abs(wave)) + 1e-6) * 0.28
    wav.write(music_file, sr, (wave * 32767).astype(np.int16))

    return music_file

def build_ducking_audio_filter(
    main_audio_label: str = "0:a",
    music_input_index: int = 1,
    duck_threshold: float = 0.08,
    duck_ratio: float = 8.0,
    music_volume: float = 0.22,
    frequency_carving: bool = False
) -> str:
    """
    Build FFmpeg sidechaincompress filter snippet for automatic music ducking.
    Ducks music volume when speaker is vocal, smoothly brings it up in pauses.
    If frequency_carving is True, applies a -4.5 dB EQ notch at 2.4 kHz so human speech cuts through cleanly.
    """
    if frequency_carving:
        carved_label = f"carved_bg_{music_input_index}"
        return (
            f"[{music_input_index}:a]equalizer=f=2400:t=q:w=1.2:g=-4.5[{carved_label}];"
            f"[{carved_label}][{main_audio_label}]sidechaincompress="
            f"threshold={duck_threshold}:ratio={duck_ratio}:attack=20:release=250[ducked_bg];"
            f"[{main_audio_label}][ducked_bg]amix=inputs=2:weights=1.0 {music_volume}[a_mixed]"
        )
    return (
        f"[{music_input_index}:a][{main_audio_label}]sidechaincompress="
        f"threshold={duck_threshold}:ratio={duck_ratio}:attack=20:release=250[ducked_bg];"
        f"[{main_audio_label}][ducked_bg]amix=inputs=2:weights=1.0 {music_volume}[a_mixed]"
    )
