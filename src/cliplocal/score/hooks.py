import re
from typing import Tuple, Optional, List, Dict, Any

HOOK_PATTERNS: List[Dict[str, Any]] = [
    {
        "regex": re.compile(r"\b(almost (got )?(killed|stabbed|shot|died|arrested)|with a knife|pulled (a|out a) (knife|gun)|police came|called the police|go to jail|go to court|fighting|fought|deadly|threat)\b", re.I),
        "type": "Shocking Confession",
        "reason": "High-stakes drama or personal danger",
        "boost": 35.0
    },
    {
        "regex": re.compile(r"\b(the best way to|the most important thing|the secret to|the single biggest|the number one|the key to|how to actually|how you can|here is how)\b", re.I),
        "type": "Actionable Advice",
        "reason": "High-utility takeaway for viewers",
        "boost": 30.0
    },
    {
        "regex": re.compile(r"\b(here\'s why|the reason why|nobody talks about|nobody knows|the truth about|the real reason|this is why|what happens when|you have to understand)\b", re.I),
        "type": "Curiosity Gap",
        "reason": "Creates intense curiosity to watch till end",
        "boost": 28.0
    },
    {
        "regex": re.compile(r"\b(stop doing|never do|biggest mistake|worst thing|you won\'t believe|you should never|don\'t ever|huge problem)\b", re.I),
        "type": "Pattern Interrupt",
        "reason": "Challenges common assumptions or warns of danger",
        "boost": 26.0
    },
    {
        "regex": re.compile(r"\b(people don\'t realize|everyone thinks|what if i told you|what you have to realize|most people don\'t)\b", re.I),
        "type": "Contrarian Take",
        "reason": "Contrarian perspective that sparks engagement",
        "boost": 25.0
    },
    {
        "regex": re.compile(r"^(wait|hold on|stop|listen|okay so|so basically|here's the thing|let me tell you)", re.I),
        "type": "Direct Attention Grabber",
        "reason": "Direct second-person command",
        "boost": 22.0
    },
    {
        "regex": re.compile(r"^(can you explain|what does|what do you|what are you|why do|what happened|how do you|tell me|who are you|what is)", re.I),
        "type": "Provocative Question",
        "reason": "Strong interrogative opener",
        "boost": 20.0
    },
    {
        "regex": re.compile(r"^(so i was|when i was|years ago|back when|i remember|i used to|one time|one day)", re.I),
        "type": "Storytelling Narrative",
        "reason": "Relatable first-person story arc",
        "boost": 18.0
    },
    {
        "regex": re.compile(r"\b(million|billion|trillion|percent|hundred thousand)\b", re.I),
        "type": "Stat-Based Hook",
        "reason": "Concrete numbers and compelling metrics",
        "boost": 16.0
    }
]

def score_hook(first_sentence_text: str) -> Tuple[float, Optional[str], Optional[str]]:
    """
    Evaluate the opening sentence of a candidate clip against hook patterns.
    Returns (score 0-100, hook_type, hook_reason).
    """
    text = first_sentence_text.strip()
    best_score = 0.0
    best_type = None
    best_reason = None

    for item in HOOK_PATTERNS:
        if item["regex"].search(text):
            if item["boost"] > best_score:
                best_score = item["boost"]
                best_type = item["type"]
                best_reason = item["reason"]

    # Check question mark in opening
    if "?" in text and best_score < 20.0:
        best_score = max(best_score, 18.0)
        best_type = "Question Hook"
        best_reason = "Opens with an engaging inquiry"

    # Scale 0-35 boost to 0-100 range
    normalized = min(100.0, (best_score / 35.0) * 100.0) if best_score > 0 else 15.0
    return normalized, best_type, best_reason
