from __future__ import annotations
import re
from typing import List, Dict, Tuple, Optional
from src.cliplocal.segment.podcast_qa import PodcastQAPair

# 10 Viral Archetypes with lexicons and targeting rules
ARCHETYPES_CONFIG: Dict[str, Dict] = {
    "Contrarian Heresy": {
        "keywords": ["wrong", "myth", "lie", "never", "worst", "scam", "truth", "nobody tells you", "actually", "stop doing", "trap", "bullshit"],
        "platform": "YouTube Shorts",
        "headline_prefix": "THE TRUTH ABOUT",
        "weight": 22
    },
    "Raw Vulnerability": {
        "keywords": ["regret", "hardest", "cried", "failed", "scared", "fear", "mistake", "lonely", "pain", "broke", "ashamed", "confess", "marriage", "divorce", "tears"],
        "platform": "Instagram Reels",
        "headline_prefix": "A RAW CONFESSION ON",
        "weight": 25
    },
    "Specific Shock Number": {
        "pattern": r"(\$\d+[\d,]*|\b\d+%\b|\b\d+\s*(?:million|billion|k|thousand|hours|days|years)\b|\bzero\b)",
        "keywords": ["cost", "lost", "made", "revenue", "profit", "price", "valuable"],
        "platform": "YouTube Shorts",
        "headline_prefix": "THE EXACT NUMBERS BEHIND",
        "weight": 24
    },
    "Tactical Blueprint": {
        "keywords": ["step", "how to", "first thing", "rule", "strategy", "playbook", "day 1", "advice", "framework", "formula", "system", "process"],
        "platform": "YouTube Shorts",
        "headline_prefix": "THE STEP-BY-STEP PLAYBOOK FOR",
        "weight": 20
    },
    "Harsh Truth": {
        "keywords": ["lazy", "excuse", "hard work", "reality", "discipline", "hate", "harsh", "blame", "wake up", "nobody cares", "stop complaining", "weakness"],
        "platform": "Instagram Reels",
        "headline_prefix": "THE HARSH TRUTH ABOUT",
        "weight": 22
    },
    "Insider Exposure": {
        "keywords": ["secret", "behind the scenes", "industry", "wall street", "silicon valley", "hollywood", "hidden", "algorithm", "scandal", "they don't want you to know"],
        "platform": "YouTube Shorts",
        "headline_prefix": "WHAT THEY NEVER TELL YOU ABOUT",
        "weight": 23
    },
    "Existential Epiphany": {
        "keywords": ["happiness", "meaning", "success", "depressed", "empty", "realize", "money isn't", "purpose", "peace", "fulfillment", "soul", "burnout"],
        "platform": "Instagram Reels",
        "headline_prefix": "WHAT SUCCESS DOESN'T BUY YOU",
        "weight": 21
    },
    "Binary Pressure Test": {
        "keywords": ["would you rather", "yes or no", "pick one", "choose", "versus", "vs", "or", "right now"],
        "platform": "YouTube Shorts",
        "headline_prefix": "PICK ONE",
        "weight": 19
    },
    "High Stakes Story": {
        "keywords": ["hospital", "died", "arrested", "prison", "police", "kill", "gun", "knife", "lawsuit", "bankrupt", "crisis", "blood", "emergency", "jail"],
        "platform": "Instagram Reels",
        "headline_prefix": "THE NIGHT EVERYTHING ALMOST ENDED",
        "weight": 25
    },
    "Psychological Human Bug": {
        "keywords": ["psychology", "bias", "brain", "toxic", "manipulate", "narcissist", "ego", "addicted", "habit", "trauma", "dopamine", "cognitive"],
        "platform": "Instagram Reels",
        "headline_prefix": "THE PSYCHOLOGY BEHIND",
        "weight": 20
    }
}

def classify_viral_archetype(qa: PodcastQAPair) -> Tuple[str, str, float, str]:
    """
    Classify a Q&A pair into one of the 10 viral archetypes.
    Returns (archetype_name, recommended_platform, archetype_score, headline_prefix).
    """
    combined_text = f"{qa.question_text} {qa.answer_text}".lower()

    best_archetype = "General Insight"
    best_platform = "YouTube Shorts"
    best_score = 0.0
    best_prefix = "MUST-HEAR INSIGHT"

    for name, cfg in ARCHETYPES_CONFIG.items():
        score = 0.0
        # Check regex pattern if present
        if "pattern" in cfg:
            matches = re.findall(cfg["pattern"], combined_text)
            if matches:
                score += len(matches) * 12.0

        # Check keywords
        for kw in cfg["keywords"]:
            if kw in combined_text:
                # Higher weight if keyword is directly inside the question
                if kw in qa.question_text.lower():
                    score += 8.0
                else:
                    score += 4.0

        if score > best_score:
            best_score = score
            best_archetype = name
            best_platform = cfg["platform"]
            best_prefix = cfg["headline_prefix"]

    # Normalize archetype score contribution
    normalized_archetype_score = min(25.0, best_score)
    return best_archetype, best_platform, normalized_archetype_score, best_prefix

def generate_qa_hook_headline(qa: PodcastQAPair, prefix: str) -> str:
    """Generate high-CTR hook headline banner for the Q&A clip."""
    q = qa.question_text.strip().rstrip("?.!")
    words = q.split()

    # If question is short, keep it punchy
    if len(words) <= 7:
        return q.upper()

    # Extract 3-5 key words after interrogative
    short_topic = " ".join(words[:6]).upper()
    return f"{prefix}: {short_topic}"

def score_podcast_qa_pairs(qa_pairs: List[PodcastQAPair]) -> List[PodcastQAPair]:
    """
    Score all Q&A pairs on a 0-100 virality scale, assign archetypes,
    generate headlines, and sort by descending score.
    """
    for qa in qa_pairs:
        archetype, platform, arch_score, prefix = classify_viral_archetype(qa)
        qa.viral_archetype = archetype
        qa.recommended_platform = platform

        base_score = 55.0

        # Duration sweet spot bonus (30s - 55s is algorithm peak)
        duration_bonus = 0.0
        if 28.0 <= qa.duration <= 55.0:
            duration_bonus = 12.0
        elif 20.0 <= qa.duration < 28.0 or 55.0 < qa.duration <= 65.0:
            duration_bonus = 6.0

        # Question clarity bonus (starts with direct 5W1H)
        q_first_word = qa.question_text.strip().split()[0].lower() if qa.question_text.strip() else ""
        clarity_bonus = 8.0 if q_first_word in {"why", "how", "what", "who", "when", "tell"} else 4.0

        # Payoff presence bonus
        payoff_bonus = 8.0 if any(term in qa.answer_text.lower() for term in ["that is why", "that's why", "lesson", "secret", "never", "changed everything"]) else 0.0

        raw_total = base_score + arch_score + duration_bonus + clarity_bonus + payoff_bonus
        qa.viral_score = round(min(99.0, max(45.0, raw_total)), 1)

        # Generate headline and social caption
        qa.hook_headline = generate_qa_hook_headline(qa, prefix)
        qa.social_caption = f"{qa.question_text}\n\nKey takeaway from this interview exchange. What do you think?"
        qa.hashtags = [
            f"#{archetype.lower().replace(' ', '')}",
            "#podcastclips",
            "#interview",
            "#shorts" if platform == "YouTube Shorts" else "#reels"
        ]

    # Sort descending by viral score
    qa_pairs.sort(key=lambda q: q.viral_score, reverse=True)
    return qa_pairs

def pick_top_qa_clips(qa_pairs: List[PodcastQAPair], top_n: int = 8) -> List[PodcastQAPair]:
    """Select the top N viral Q&A clips for automatic rendering."""
    return qa_pairs[:top_n]
