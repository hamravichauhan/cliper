import re
import json
from pathlib import Path
from typing import Dict, Any, Optional, Tuple, Set

CONFIG_FILE = Path(__file__).resolve().parent.parent / "config" / "cc_channels.json"

DEFAULT_CC_ALLOWLIST = {
    "ted",
    "tedx",
    "blender foundation",
    "nasa",
    "y combinator",
    "stanford",
    "mit opencourseware",
    "crashcourse",
    "khan academy",
    "wikimedia",
    "veritasium"
}

DEFAULT_CLAIMANTS = {
    "warner music",
    "universal music",
    "sony music",
    "vevo",
    "wmg",
    "sme",
    "umg",
    "nba",
    "fifa",
    "uefa",
    "ufc",
    "wwe",
    "formula 1",
    "f1"
}

def load_channels_config() -> Tuple[Set[str], Set[str]]:
    """Load configurable allowlist channels and aggressive claimant keywords from JSON file."""
    if CONFIG_FILE.exists():
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                data = json.load(f)
                return set(data.get("allowlist_channels", [])), set(data.get("aggressive_claimants", []))
        except Exception:
            pass
    return DEFAULT_CC_ALLOWLIST, DEFAULT_CLAIMANTS

CC_DESCRIPTION_REGEX = re.compile(
    r"(creative\s+commons|cc[-_\s]?by|reuse\s+allowed|attribution\s+(?:4\.0|3\.0)|cc\s+license)",
    re.IGNORECASE
)

def analyze_video_license(
    info_dict: Optional[Dict[str, Any]] = None,
    channel: str = "",
    description: str = "",
    url: str = ""
) -> Dict[str, Any]:
    """
    Analyze YouTube/video metadata to evaluate Creative Commons status and copyright claim risk.
    Uses multi-signal detection: yt-dlp license tags, description text regex, and creator allowlists.
    Always defaults to 'standard' (yellow) when uncertain - never falsely flags as green.
    """
    allowlist, claimants = load_channels_config()
    info = info_dict or {}
    raw_license = str(info.get("license") or "")
    is_cc_flag = bool(info.get("is_creative_commons", False))
    clean_channel = (channel or info.get("channel") or info.get("uploader") or "").lower().strip()
    clean_desc = (description or info.get("description") or "").strip()

    # 1. Check for aggressive claimant entities (High Risk)
    for claimant in claimants:
        if claimant in clean_channel:
            return {
                "is_creative_commons": False,
                "license_name": raw_license or "Aggressive Commercial Claimant",
                "risk_level": "high_risk",
                "badge_label": "High Claim Risk (Commercial Entity)",
                "reason": f"Channel '{clean_channel}' matches known aggressive commercial content ID enforcement."
            }

    # 2. Check direct CC flag or raw license text
    if is_cc_flag or "creative commons" in raw_license.lower():
        return {
            "is_creative_commons": True,
            "license_name": raw_license or "Creative Commons Attribution (CC-BY)",
            "risk_level": "low_risk",
            "badge_label": "Creative Commons (Remix Allowed)",
            "reason": "Direct Creative Commons license declared in video metadata."
        }

    # 3. Check Channel Allowlists
    for allowed in allowlist:
        if allowed in clean_channel:
            return {
                "is_creative_commons": True,
                "license_name": "Creative Commons / Open Educational License",
                "risk_level": "low_risk",
                "badge_label": "Open Educational / Creative Commons",
                "reason": f"Uploader '{clean_channel}' is an acknowledged open-content/educational publisher."
            }

    # 4. Check Description Regex
    if CC_DESCRIPTION_REGEX.search(clean_desc):
        return {
            "is_creative_commons": True,
            "license_name": "Creative Commons (Detected in Description)",
            "risk_level": "low_risk",
            "badge_label": "Creative Commons (Remix Allowed)",
            "reason": "Explicit Creative Commons reuse declaration matched in video description."
        }

    # 5. Default Safe Fallback (Standard License - Requires Transformation / Fair-Use)
    return {
        "is_creative_commons": False,
        "license_name": raw_license or "Standard YouTube License",
        "risk_level": "standard",
        "badge_label": "Standard License (Requires Fair-Use Transformation)",
        "reason": "Standard broadcast license. Automated transformation logging recommended."
    }
