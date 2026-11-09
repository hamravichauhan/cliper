import re
from pathlib import Path
from typing import List, Tuple, Dict, Any, Optional
import numpy as np
import scipy.io.wavfile as wav

from src.cliplocal.core.models import Word

SFX_DIR = Path(__file__).resolve().parent.parent / "assets" / "sfx"

def ensure_sfx_assets() -> Dict[str, Path]:
    """Procedurally synthesize and cache clean 48kHz sound effects."""
    SFX_DIR.mkdir(parents=True, exist_ok=True)
    sr = 48000

    pop_path = SFX_DIR / "pop.wav"
    ding_path = SFX_DIR / "ding.wav"
    whoosh_path = SFX_DIR / "whoosh.wav"

    if not pop_path.exists():
        t = np.linspace(0, 0.075, int(sr * 0.075), endpoint=False)
        f = 650 * np.exp(-t * 35)
        phase = 2 * np.pi * np.cumsum(f) / sr
        env = np.sin(np.pi * (t / 0.075)) * np.exp(-t * 20)
        sfx = (np.sin(phase) * env * 0.85).astype(np.float32)
        wav.write(pop_path, sr, (sfx * 32767).astype(np.int16))

    if not ding_path.exists():
        t = np.linspace(0, 0.280, int(sr * 0.280), endpoint=False)
        env = np.exp(-t * 14)
        sfx = (np.sin(2 * np.pi * 1320 * t) * 0.55 + np.sin(2 * np.pi * 2640 * t) * 0.25) * env
        wav.write(ding_path, sr, (sfx * 32767).astype(np.int16))

    if not whoosh_path.exists():
        t = np.linspace(0, 0.280, int(sr * 0.280), endpoint=False)
        freq = 140 + 750 * (t / 0.280)**2
        phase = 2 * np.pi * np.cumsum(freq) / sr
        noise = np.random.uniform(-0.12, 0.12, len(t))
        env = np.sin(np.pi * (t / 0.280))**2
        sfx = (np.sin(phase) * 0.35 + noise) * env
        wav.write(whoosh_path, sr, (sfx * 32767).astype(np.int16))

    return {
        "pop": pop_path,
        "ding": ding_path,
        "whoosh": whoosh_path
    }

def find_sfx_trigger_points(
    words: List[Word],
    clip_start: float,
    min_spacing_sec: float = 3.5
) -> List[Tuple[float, str]]:
    """
    Identify key emphasis words to trigger sound effects with spacing limits.
    Returns list of (relative_time_sec, sfx_type).
    """
    if not words:
        return []

    ensure_sfx_assets()
    triggers: List[Tuple[float, str]] = []
    last_trigger_t = -10.0

    # Trigger opening whoosh at first word
    first_rel_t = max(0.0, words[0].start - clip_start)
    triggers.append((round(first_rel_t, 3), "whoosh"))
    last_trigger_t = first_rel_t

    for w in words[1:]:
        rel_t = max(0.0, w.start - clip_start)
        if (rel_t - last_trigger_t) < min_spacing_sec:
            continue

        clean = re.sub(r"[^a-zA-Z0-9]", "", w.word.lower())

        # Ding trigger for numbers, stats, money
        if bool(re.search(r"\d", w.word)) or clean in {"million", "billion", "thousand", "percent", "dollar", "money", "profit"}:
            triggers.append((round(rel_t, 3), "ding"))
            last_trigger_t = rel_t
        # Pop trigger for hooks, questions, emotional words
        elif clean in {"secret", "stop", "never", "mistake", "truth", "crazy", "insane", "why", "how", "boom", "biggest"}:
            triggers.append((round(rel_t, 3), "pop"))
            last_trigger_t = rel_t

    return triggers
