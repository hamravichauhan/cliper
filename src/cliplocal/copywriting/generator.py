import re
from typing import Dict, List, Optional
from pydantic import BaseModel
from src.cliplocal.core.models import CandidateClip

class PlatformCopy(BaseModel):
    title: str
    caption: str
    hashtags: List[str]
    formatted_post: str

class SocialCopyBundle(BaseModel):
    youtube: PlatformCopy
    instagram: PlatformCopy
    hook_sentence: str
    takeaways: List[str]

# High-performing tiered hashtags by topic
NICHE_HASHTAGS: Dict[str, Dict[str, List[str]]] = {
    "business": {
        "niche": ["#businessgrowthtips", "#entrepreneurmindsets", "#startupfounders", "#ceolife", "#scalingbusiness"],
        "medium": ["#entrepreneurship", "#businesstips", "#mindsetmatters", "#successhabits", "#wealthbuilding"],
        "broad": ["#business", "#success", "#money", "#shorts", "#reels"]
    },
    "psychology": {
        "niche": ["#dopaminedetox", "#cognitivebias", "#mentalclaritytips", "#focusmode", "#behavioralscience"],
        "medium": ["#psychologyfacts", "#mindsetshift", "#productivitytips", "#habitbuilding", "#selfimprovement"],
        "broad": ["#psychology", "#mindset", "#motivation", "#reels", "#shorts"]
    },
    "tech": {
        "niche": ["#learncoding", "#softwareengineertips", "#aitechnology", "#developermindset", "#pythoncoding"],
        "medium": ["#codinglife", "#techtrends", "#artificialintelligence", "#programmingtips", "#futureoftech"],
        "broad": ["#tech", "#coding", "#ai", "#shorts", "#reels"]
    },
    "discipline": {
        "niche": ["#disciplineovermotivation", "#stoicphilosophy", "#hardworkpaysoff", "#dailydiscipline", "#noexcuseswork"],
        "medium": ["#selfdiscipline", "#stoicism", "#grindneverstops", "#growthmindset", "#mentalstrength"],
        "broad": ["#discipline", "#motivation", "#focus", "#reels", "#shorts"]
    }
}

DEFAULT_TAGS = {
    "niche": ["#dailygrowthtips", "#viralinsights", "#wisdomshorts", "#lifehacksdaily", "#thinkdeep"],
    "medium": ["#mindsetshift", "#productivity", "#selfgrowth", "#successquotes", "#lifelessons"],
    "broad": ["#viral", "#shorts", "#reels", "#trending", "#foryou"]
}

def detect_topic_category(text: str) -> str:
    lower = text.lower()
    if any(k in lower for k in ["money", "business", "dollar", "profit", "customer", "startup", "invest", "revenue", "scale"]):
        return "business"
    if any(k in lower for k in ["brain", "think", "mind", "dopamine", "sleep", "psychology", "habit", "trauma"]):
        return "psychology"
    if any(k in lower for k in ["code", "software", "ai", "algorithm", "computer", "developer", "model", "python"]):
        return "tech"
    if any(k in lower for k in ["discipline", "goggins", "pain", "hard", "excuse", "stop", "never", "stoic"]):
        return "discipline"
    return "business"

def extract_key_takeaways(text: str, max_points: int = 2) -> List[str]:
    sentences = [s.strip() for s in re.split(r"[.!?]+", text) if len(s.strip().split()) >= 4]
    if not sentences:
        return ["Focus on high-leverage execution.", "Consistency beats short-term intensity."]
    return sentences[:max_points]

def generate_social_copy(
    candidate: CandidateClip,
    brand_handle: str = "@ClipLocal",
    cta_keyword: str = "GROWTH"
) -> SocialCopyBundle:
    """
    Generate viral, algorithm-optimized post copy tailored specifically for
    YouTube Shorts (high CTR titles & tags) and Instagram Reels (hook line & save/DM CTA).
    """
    category = detect_topic_category(candidate.text)
    tags_pool = NICHE_HASHTAGS.get(category, DEFAULT_TAGS)
    
    hook_raw = candidate.title or "The Harsh Truth Nobody Tells You"
    clean_hook = re.sub(r"[^\w\s-]", "", hook_raw).strip()
    takeaways = extract_key_takeaways(candidate.text, max_points=2)
    
    # YouTube Shorts Package
    yt_title = f"{clean_hook[:42]} 🛑"
    yt_tags = ["shorts", "viral", category] + [t.replace("#", "") for t in tags_pool["medium"][:4]]
    yt_description = (
        f"{yt_title}\n\n"
        f"Key Takeaway: {takeaways[0] if takeaways else candidate.text[:80]}\n\n"
        f"💬 What's your take on this? Comment below!\n\n"
        f"Subscribe to {brand_handle} for daily high-impact clips.\n\n"
        f"{' '.join(tags_pool['broad'][:3])} #{category}"
    )
    yt_copy = PlatformCopy(
        title=yt_title,
        caption=yt_description,
        hashtags=tags_pool["broad"],
        formatted_post=f"TITLE: {yt_title}\n\nDESCRIPTION:\n{yt_description}\n\nTAGS:\n{', '.join(yt_tags)}"
    )

    # Instagram Reels Package
    all_ig_tags = tags_pool["niche"][:5] + tags_pool["medium"][:5] + tags_pool["broad"][:5]
    ig_caption = (
        f"{clean_hook.upper()} 📌\n\n"
        f"Here is why this matters:\n"
        f"• {takeaways[0] if len(takeaways) > 0 else 'Insight from today.'}\n"
        f"• {takeaways[1] if len(takeaways) > 1 else 'Small changes compound into massive results.'}\n\n"
        f"💬 Comment '{cta_keyword}' and I'll send you our free strategy breakdown.\n"
        f"📌 Save this reel so you don't forget it later.\n"
        f"👉 Follow {brand_handle} for daily wisdom.\n\n"
        f".\n.\n"
        f"{' '.join(all_ig_tags)}"
    )
    ig_copy = PlatformCopy(
        title=clean_hook,
        caption=ig_caption,
        hashtags=all_ig_tags,
        formatted_post=ig_caption
    )

    return SocialCopyBundle(
        youtube=yt_copy,
        instagram=ig_copy,
        hook_sentence=clean_hook,
        takeaways=takeaways
    )
