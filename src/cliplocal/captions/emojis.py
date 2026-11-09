import re
from typing import Dict, Optional

EMOJI_KEYWORDS: Dict[str, str] = {
    # Money & Success
    "money": "💰",
    "dollar": "💵",
    "million": "💸",
    "billion": "🏦",
    "profit": "📈",
    "revenue": "💎",
    "rich": "🤑",
    "success": "🏆",
    "winner": "🥇",
    # Curiosity & Secrets
    "secret": "🤫",
    "hidden": "🔍",
    "mystery": "🕵️",
    "truth": "👁️",
    "reveal": "✨",
    # Attention & Urgency
    "stop": "🛑",
    "warning": "⚠️",
    "danger": "🚨",
    "listen": "👂",
    "attention": "📢",
    "wait": "✋",
    # Growth & Ideas
    "grow": "🌱",
    "growth": "🚀",
    "scale": "🚀",
    "idea": "💡",
    "think": "🧠",
    "brain": "🧠",
    "future": "🔮",
    # Drama & Conflict
    "fire": "🔥",
    "hot": "🔥",
    "kill": "⚡",
    "attack": "💥",
    "fight": "🥊",
    "wrong": "❌",
    "mistake": "⚠️",
    "fail": "📉",
    "problem": "🚨",
    # Emotion & Heart
    "love": "❤️",
    "heart": "💖",
    "happy": "😄",
    "crazy": "🤯",
    "insane": "🤯",
    "shocking": "😱",
    # Questions & Clarity
    "question": "❓",
    "why": "❓",
    "how": "🎯",
    "simple": "👌",
    "best": "⭐",
    "lesson": "📚",
    "target": "🎯",
    "focus": "🎯"
}

def get_emoji_for_word(word: str) -> Optional[str]:
    """Return matching emoji if word is a recognized viral trigger."""
    clean = re.sub(r"[^a-zA-Z]", "", word.lower())
    return EMOJI_KEYWORDS.get(clean)

def enrich_text_with_emoji(word: str) -> str:
    """Append emoji to word if it triggers a viral keyword."""
    emoji = get_emoji_for_word(word)
    if emoji:
        return f"{word} {emoji}"
    return word
