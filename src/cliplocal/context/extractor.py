import re
from typing import List, Optional
from src.cliplocal.core.models import Sentence, CandidateClip

LEADING_VERBAL_FILLERS = [
    "you know", "i mean", "like i said", "like", "basically", "so basically",
    "honestly", "to be honest", "and so", "so yeah", "actually", "right",
    "well", "look", "listen", "i think that", "i think", "i believe"
]

QUESTION_STARTERS = (
    "why", "how", "what", "is it", "can you", "should you", "have you",
    "do you", "will you", "could you", "where does", "who is", "when did"
)

STRONG_HOOK_STARTERS = [
    r"\b(the biggest mistake (?:people|founders|creators|everyone) make\b.*)",
    r"\b(the real reason (?:why|people|you|nobody)\b.*)",
    r"\b(the secret to\b.*)",
    r"\b(the truth about\b.*)",
    r"\b(the difference between\b.*)",
    r"\b(the #1 (?:rule|habit|thing|secret|reason)\b.*)",
    r"\b(if you (?:want to|can't|don't|ever)\b.*)",
    r"\b(when you (?:realize|start|build|fail)\b.*)",
    r"\b(never (?:do this|compromise|give up|underestimate)\b.*)",
    r"\b(how to (?:actually|consistently|master|grow)\b.*)"
]

def clean_clause(text: str) -> str:
    """Strip leading verbal fillers and awkward punctuation."""
    clean = text.strip()
    for filler in LEADING_VERBAL_FILLERS:
        if clean.lower().startswith(filler):
            clean = clean[len(filler):].lstrip(" ,-:")
            break
    if clean:
        clean = clean[0].upper() + clean[1:]
    return clean.rstrip(" ,-:")

def extract_clip_context(
    text: str,
    sentences: Optional[List[Sentence]] = None,
    max_words: int = 9,
    max_chars: int = 50
) -> str:
    """
    Extract a meaningful, high-retention context headline from the transcript of a clip.
    Never outputs generic placeholders like 'Engaging Moment'.
    
    Priority:
    1. Question detection ("Why do...", "How can...", "What happens...")
    2. High-impact hook patterns ("The biggest mistake...", "The real reason...", "If you want to...")
    3. Core thought clause of opening sentence.
    """
    if not text or not text.strip():
        return "Key Conversation Takeaway"

    all_sentences = [s.text.strip() for s in (sentences or []) if s.text.strip()]
    if not all_sentences:
        all_sentences = [s.strip() for s in re.split(r"[.!?]+", text) if s.strip()]

    # Priority 1: Check for explicit questions in first 2 sentences
    for sent in all_sentences[:2]:
        cleaned = clean_clause(sent)
        words = cleaned.split()
        if cleaned.endswith("?") or (words and words[0].lower() in QUESTION_STARTERS):
            candidate = " ".join(words[:max_words]).rstrip(" ,.-")
            if not candidate.endswith("?"):
                candidate += "?"
            if len(candidate) <= max_chars:
                return candidate

    # Priority 2: Check for proven high-impact hook patterns
    full_sample = " ".join(all_sentences[:2]) if all_sentences else text
    for pattern in STRONG_HOOK_STARTERS:
        match = re.search(pattern, full_sample, re.I)
        if match:
            matched_phrase = match.group(1)
            words = matched_phrase.split()
            candidate = " ".join(words[:max_words]).rstrip(" ,.-!?")
            if len(candidate) <= max_chars and len(words) >= 4:
                return candidate[0].upper() + candidate[1:]

    # Priority 3: Extract the primary core clause from the opening sentence
    first_sent = clean_clause(all_sentences[0] if all_sentences else text)
    # Split on natural pause marks (commas, dashes, conjunctions)
    clauses = re.split(r"[,;—–]|\b(because|so that|which means|in order to)\b", first_sent, flags=re.I)
    valid_clauses = [c.strip() for c in clauses if c and len(c.strip().split()) >= 3]

    if valid_clauses:
        best = clean_clause(valid_clauses[0])
        words = best.split()
        candidate = " ".join(words[:max_words]).rstrip(" ,.-!?")
        if len(candidate) <= max_chars and len(words) >= 3:
            return candidate[0].upper() + candidate[1:]

    # Priority 4: Clean first words bounded at natural boundary
    words = first_sent.split()
    candidate = " ".join(words[:max_words]).rstrip(" ,.-!?")
    if len(candidate) > max_chars:
        candidate = candidate[:max_chars].rsplit(" ", 1)[0].rstrip(" ,.-!?")
    
    final_text = candidate[0].upper() + candidate[1:] if candidate else "Important Topic Breakdown"
    return final_text

def format_context_for_ass(context_text: str, max_chars_per_line: int = 26) -> str:
    """
    Format context headline into 1 or 2 balanced lines using ASS line break (\\N).
    Ensures clean, modern typography in 9:16 vertical view instead of awkward cramped text.
    """
    clean = context_text.strip()
    words = clean.split()
    if len(clean) <= max_chars_per_line or len(words) <= 3:
        return clean

    # Balanced 2-line split
    mid = (len(words) + 1) // 2
    line1 = " ".join(words[:mid])
    line2 = " ".join(words[mid:])
    return f"{line1}\\N{line2}"

def assign_clip_contexts(candidates: List[CandidateClip]) -> List[CandidateClip]:
    """Ensure every candidate clip has a meaningful, content-derived context title."""
    for cand in candidates:
        if not cand.title or cand.title.strip().lower() in ("engaging moment", "untitled", "clip"):
            cand.title = extract_clip_context(cand.text, cand.sentences)
    return candidates
