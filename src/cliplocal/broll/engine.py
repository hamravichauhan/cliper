import re
from pathlib import Path
from typing import List, Dict, Optional, Tuple
from pydantic import BaseModel
from src.cliplocal.core.models import Word

BROLL_TAGS: Dict[str, List[str]] = {
    "money": ["money", "dollar", "cash", "wealth", "rich", "revenue", "profit", "salary", "invest", "crypto", "bitcoin", "budget", "cost"],
    "tech": ["code", "computer", "ai", "algorithm", "software", "app", "model", "python", "developer", "data", "machine", "cloud"],
    "growth": ["scale", "growth", "grow", "10x", "viral", "success", "rocket", "double", "triple", "explode", "winning", "fast"],
    "mind": ["think", "mind", "brain", "psychology", "focus", "mental", "idea", "thoughts", "learn", "study", "smart"],
    "warning": ["stop", "mistake", "fail", "danger", "wrong", "trap", "risk", "avoid", "never", "ruin", "bad", "lose"]
}

class BrollCutaway(BaseModel):
    tag: str
    t_start: float
    t_end: float
    asset_path: str
    matched_word: str

def get_broll_dir() -> Path:
    """Return local b-roll directory."""
    broll_dir = Path(__file__).resolve().parent.parent / "assets" / "broll"
    broll_dir.mkdir(parents=True, exist_ok=True)
    return broll_dir

def ensure_default_broll_assets() -> Dict[str, Path]:
    """
    Ensure each default category has at least one valid graphic/video asset.
    Generates high-contrast procedural 1080x1920 graphic cards if missing.
    """
    import cv2
    import numpy as np

    broll_dir = get_broll_dir()
    asset_map: Dict[str, Path] = {}

    configs = {
        "money": ((15, 60, 20), "GROWTH & CAPITAL", "FINANCIAL CATALYST"),
        "tech": ((35, 20, 15), "ALGORITHM & CODE", "SYSTEM ARCHITECTURE"),
        "growth": ((10, 45, 55), "EXPONENTIAL SCALE", "10X TRACTION"),
        "mind": ((40, 15, 35), "COGNITIVE FOCUS", "DEEP STRATEGY"),
        "warning": ((15, 15, 60), "CRITICAL ALERT", "AVOID COMMON PITFALLS")
    }

    for tag, (bg_bgr, title, sub) in configs.items():
        tag_file = broll_dir / f"{tag}_default.png"
        if not tag_file.exists():
            # Create a 1080x1920 graphic card
            img = np.zeros((1920, 1080, 3), dtype=np.uint8)
            # Subtle gradient background
            for y in range(1920):
                ratio = y / 1920.0
                c = [int(v * (0.8 + 0.4 * ratio)) for v in bg_bgr]
                img[y, :] = c

            # Accent banner rectangle
            cv2.rectangle(img, (100, 800), (980, 1120), (30, 30, 35), -1)
            cv2.rectangle(img, (100, 800), (980, 1120), (80, 80, 120), 4)

            # Text
            cv2.putText(img, title, (140, 940), cv2.FONT_HERSHEY_DUPLEX, 1.4, (255, 255, 255), 3, cv2.LINE_AA)
            cv2.putText(img, sub, (140, 1030), cv2.FONT_HERSHEY_DUPLEX, 1.0, (0, 230, 255), 2, cv2.LINE_AA)

            cv2.imwrite(str(tag_file), img)

        asset_map[tag] = tag_file

    return asset_map

def find_broll_for_tag(tag: str) -> Optional[Path]:
    """Find a custom video/image or default asset for a tag."""
    broll_dir = get_broll_dir()
    # Check for custom user files first (e.g. money.mp4, money.jpg)
    for ext in (".mp4", ".mov", ".png", ".jpg", ".jpeg"):
        custom = broll_dir / f"{tag}{ext}"
        if custom.exists():
            return custom
    # Check tag folder
    tag_folder = broll_dir / tag
    if tag_folder.is_dir():
        for p in tag_folder.iterdir():
            if p.suffix.lower() in (".mp4", ".mov", ".png", ".jpg", ".jpeg"):
                return p
    # Fallback to default generated asset
    defaults = ensure_default_broll_assets()
    return defaults.get(tag)

def find_broll_cutaways(
    words: List[Word],
    time_offset: float = 0.0,
    clip_duration: float = 30.0,
    max_cutaways: int = 2,
    min_spacing: float = 8.0,
    cutaway_duration: float = 2.4,
    use_stickers: bool = False
) -> List[BrollCutaway]:
    """
    Analyze words in clip, locate topic keywords, and schedule short B-roll cutaway windows.
    Protects opening hook (0 to 3.0s) and tail (last 1.5s).
    If use_stickers is True, generates or fetches die-cut sticker pop PNGs.
    """
    if clip_duration < 8.0 or not words:
        return []

    cutaways: List[BrollCutaway] = []
    last_end = 3.0  # Do not cut before 3.0s

    # Inverted map from keyword to tag
    word_to_tag: Dict[str, str] = {}
    for tag, kw_list in BROLL_TAGS.items():
        for kw in kw_list:
            word_to_tag[kw] = tag

    for w in words:
        rel_start = round(max(0.0, w.start - time_offset), 2)
        rel_end = round(rel_start + cutaway_duration, 2)

        # Bounds checks
        if rel_start < last_end:
            continue
        if rel_end > (clip_duration - 1.5):
            continue

        clean_w = re.sub(r"[^\w]", "", w.word.lower())
        tag = word_to_tag.get(clean_w)
        if tag or use_stickers:
            asset = None
            if use_stickers:
                try:
                    from src.cliplocal.broll.scraper import get_sticker_for_transcript_snippet
                    asset = get_sticker_for_transcript_snippet(clean_w)
                except Exception:
                    asset = None
            if not asset and tag:
                asset = find_broll_for_tag(tag)

            if asset:
                cutaways.append(BrollCutaway(
                    tag=tag or "sticker",
                    t_start=rel_start,
                    t_end=rel_end,
                    asset_path=str(asset),
                    matched_word=clean_w
                ))
                last_end = rel_end + min_spacing
                if len(cutaways) >= max_cutaways:
                    break

    return cutaways
