import re
from typing import Tuple, List
from src.cliplocal.config.settings import config

BANTER_PHRASES = [
    "stream check", "hair check", "mic check", "can you hear me", "check check",
    "keep it on me", "testing mic", "one two three", "just making sure",
    "is it on", "hold on let me", "turn around", "adjust the camera",
    "can you hold this", "sound check", "is the stream working", "wait hold on",
    "chat is this real", "stream setup"
]

BROKEN_START_PATTERNS = [
    re.compile(r"^(why do i say this|these are the things|and that is why|so that is why|as i was saying|like i said)\b", re.I),
    re.compile(r"^(and then|and also|and that|and so|and but|but then|so then|or then)\b", re.I),
]

def check_penalties(full_text: str, first_sentence_text: str) -> Tuple[float, List[str]]:
    """Compute negative penalty points and reasons for low-value banter or broken preambles."""
    penalties = 0.0
    reasons: List[str] = []
    text_lower = full_text.lower()
    first_lower = first_sentence_text.lower().strip()

    banter_penalty_val = config.get("scoring", {}).get("banter_penalty", -25.0)
    broken_penalty_val = config.get("scoring", {}).get("broken_start_penalty", -20.0)

    for phrase in BANTER_PHRASES:
        if phrase in text_lower:
            penalties += banter_penalty_val
            reasons.append(f"Contains gear setup/banter phrase: '{phrase}'")
            break

    for pat in BROKEN_START_PATTERNS:
        if pat.search(first_lower):
            penalties += broken_penalty_val
            reasons.append("Opens with an incomplete anaphoric preamble")
            break

    # Excessive filler density
    words = re.findall(r"\b[a-zA-Z]+\b", text_lower)
    if words:
        filler_count = sum(1 for w in words if w in {"um", "uh", "erm"})
        if (filler_count / len(words)) > 0.06:
            penalties -= 15.0
            reasons.append("High filler word density")

    return penalties, reasons
