import json
from typing import List, Optional
from src.cliplocal.core.models import CandidateClip
from src.cliplocal.llm.client import OllamaClient
from src.cliplocal.llm.json_repair import extract_and_repair_json

SYSTEM_PROMPT = """You are an expert social media editor for viral vertical shorts (TikTok, Reels, YouTube Shorts).
Your task is to analyze candidate video clip transcripts and rank them for virality potential.
You must respond with ONLY a valid JSON array of objects. Do not include markdown commentary or preamble outside the JSON array.
Each object must have these exact keys:
- "id": candidate id matching input
- "score": viral score from 0 to 100
- "title": punchy, curiosity-inducing title (under 8 words, no clickbait quotes)
- "hook_reason": 1 sentence explaining the primary hook or emotional peak
- "caption": 1-2 sentence engaging social caption
- "hashtags": array of 3 relevant hashtags (e.g. ["#business", "#growth", "#shorts"])
"""

ENGLISH_FILLER_WORDS = [
    "you know", "i mean", "like", "basically", "so basically",
    "to be honest", "honestly", "so yeah", "actually", "right?"
]

def truncate_at_word_boundary(text: str, max_chars: int = 60) -> str:
    """Ensure titles never truncate mid-word."""
    clean = text.strip()
    if len(clean) <= max_chars:
        return clean
    truncated = clean[:max_chars]
    last_space = truncated.rfind(" ")
    if last_space > 15:
        return truncated[:last_space].rstrip(" ,.-!?")
    return truncated.rstrip()

def clean_opening_hook(first_sentence: str, language: str = "en") -> str:
    """Scrub leading verbal fillers with strict English-only locale guard."""
    clean = first_sentence.strip()
    if language.lower() in ("en", "english"):
        for filler in ENGLISH_FILLER_WORDS:
            if clean.lower().startswith(filler):
                clean = clean[len(filler):].lstrip(" ,-:")
                break
    return clean

def generate_heuristic_title(text: str, hook_type: Optional[str] = None, language: str = "en") -> str:
    """Generate high-CTR title without cutting words mid-syllable."""
    clean_text = clean_opening_hook(text, language=language)
    words = clean_text.split()
    if not words:
        return "Must Watch Insight"

    candidate_phrase = " ".join(words[:7])
    if hook_type:
        prefix = f"{hook_type}: "
        max_content = max(20, 58 - len(prefix))
        bounded = truncate_at_word_boundary(candidate_phrase, max_chars=max_content)
        return f"{prefix}{bounded}"

    bounded = truncate_at_word_boundary(candidate_phrase, max_chars=58)
    return bounded.capitalize()

def rerank_candidates_with_llm(
    candidates: List[CandidateClip],
    client: Optional[OllamaClient] = None,
    max_to_rank: int = 12,
    language: str = "en"
) -> List[CandidateClip]:
    """
    Send top candidate transcripts to local Ollama LLM for re-ranking, titles, and social captions.
    Guaranteed to preserve candidate timestamps and fall back to heuristics on any error.
    """
    if not candidates:
        return []

    # Apply heuristic titles first as guaranteed baseline
    for c in candidates:
        first_line = c.sentences[0].text if c.sentences else c.text
        if not c.title or c.title == "Engaging Moment":
            c.title = generate_heuristic_title(first_line, c.score.hook_type, language=language)
        if not c.caption:
            c.caption = truncate_at_word_boundary(c.text, max_chars=140)
        if not c.hashtags:
            c.hashtags = ["#shorts", "#viral", "#podcast"]

    llm = client or OllamaClient()
    if not llm.is_available():
        # Clean heuristic fallback
        return candidates

    # Prepare top subset for LLM prompt
    target_candidates = candidates[:max_to_rank]
    items_to_send = []
    for c in target_candidates:
        items_to_send.append({
            "id": c.clip_id,
            "duration_s": c.duration,
            "first_sentence": c.sentences[0].text if c.sentences else "",
            "last_sentence": c.sentences[-1].text if c.sentences else "",
            "full_transcript": c.text,
            "heuristic_score": c.score.total_score
        })

    prompt = (
        "Analyze these candidate clips from a long-form video transcript. "
        "Rank them by engagement, hook strength, and completeness of payoff. "
        "Return the strict JSON array:\n"
        f"{json.dumps(items_to_send, indent=2)}"
    )

    raw_response = llm.generate(prompt, system_prompt=SYSTEM_PROMPT)
    if not raw_response:
        return candidates

    parsed = extract_and_repair_json(raw_response)
    if not parsed or not isinstance(parsed, list):
        return candidates

    # Map LLM outputs back to candidate clips by ID
    results_by_id = {item["id"]: item for item in parsed if isinstance(item, dict) and "id" in item}

    for c in target_candidates:
        if c.clip_id in results_by_id:
            res = results_by_id[c.clip_id]
            llm_score = float(res.get("score", c.score.total_score))
            # Blend LLM score (40%) with acoustic/heuristic score (60%) for stability
            blended_score = round(c.score.total_score * 0.60 + llm_score * 0.40, 1)
            c.score.total_score = min(100.0, max(0.0, blended_score))

            if res.get("title"):
                c.title = str(res["title"]).strip().strip('"')
            if res.get("hook_reason"):
                c.score.hook_reason = str(res["hook_reason"]).strip()
            if res.get("caption"):
                c.caption = str(res["caption"]).strip()
            if res.get("hashtags") and isinstance(res["hashtags"], list):
                c.hashtags = [str(h) for h in res["hashtags"]]

    # Sort descending by blended score
    return sorted(candidates, key=lambda x: x.score.total_score, reverse=True)
