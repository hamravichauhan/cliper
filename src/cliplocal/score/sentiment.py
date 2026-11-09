import re
from typing import List, Set, Tuple

EMOTION_BANKS: dict[str, Set[str]] = {
    "high_stakes": {"knife", "kill", "police", "court", "jail", "attack", "weapon", "murder", "arrest", "threat", "danger", "dead", "survive"},
    "surprise": {"wow", "insane", "crazy", "unbelievable", "incredible", "shocking", "mind-blowing", "peak", "wild"},
    "humor": {"funny", "hilarious", "laugh", "joke", "comedy", "bro", "lmao", "haha"},
    "authority": {"research", "study", "scientist", "professor", "expert", "data", "proven", "evidence", "fact", "statistics", "science"},
    "curiosity": {"secret", "hidden", "nobody", "unknown", "mystery", "discover", "reveal", "truth", "untold", "expose"},
    "urgency": {"immediately", "urgent", "critical", "warning", "danger", "quickly", "vital"}
}

PAYOFF_PATTERNS = [
    re.compile(r"\b(that's why|that's the reason|and that's|at the end of the day|bottom line|the point is|essentially is)\b", re.I),
    re.compile(r"\b(solution|exactly|period|remember that|this changed everything|the result was)\b", re.I),
    re.compile(r"[.!]$")
]

def score_sentiment(text: str) -> float:
    """Evaluate sentiment & emotional intensity based on keyword density."""
    words = re.findall(r"\b[a-zA-Z]{3,}\b", text.lower())
    if not words:
        return 30.0

    hits = 0
    for w in words:
        for bank in EMOTION_BANKS.values():
            if w in bank:
                hits += 1
                break

    density = hits / len(words)
    # 0.08 density is very high emotional density for conversational audio
    score = min(100.0, (density / 0.06) * 100.0)
    return round(max(20.0, score), 1)

def score_payoff(last_sentence_text: str) -> float:
    """Evaluate whether the candidate clip ends with a conclusive, satisfying resolution."""
    text = last_sentence_text.strip()
    score = 40.0

    for pat in PAYOFF_PATTERNS:
        if pat.search(text):
            score += 25.0

    return min(100.0, score)
