import re
from typing import List, Dict, Any, Optional
from pydantic import BaseModel
import yt_dlp
from src.cliplocal.ingest.license import analyze_video_license

class DiscoveredVideo(BaseModel):
    id: str
    title: str
    url: str
    channel: str
    view_count: int
    view_count_formatted: str
    duration_sec: float
    duration_formatted: str
    thumbnail_url: str
    is_creative_commons: bool = False
    license_name: str = "Standard YouTube License"
    risk_level: str = "standard"
    badge_label: str = "Standard License"

CURATED_PRESETS: Dict[str, List[Dict[str, str]]] = {
    "Business & Wealth": [
        {"name": "Alex Hormozi", "query": "alex hormozi full podcast"},
        {"name": "My First Million", "query": "my first million full episode"},
        {"name": "The Diary Of A CEO", "query": "diary of a ceo business"},
        {"name": "Naval Ravikant", "query": "naval ravikant joe rogan podcast"}
    ],
    "Psychology & Mind": [
        {"name": "Huberman Lab", "query": "huberman lab podcast episode"},
        {"name": "Chris Williamson", "query": "modern wisdom chris williamson full"},
        {"name": "Jordan Peterson", "query": "jordan peterson podcast conversation"},
        {"name": "Mel Robbins", "query": "mel robbins podcast episode"}
    ],
    "Tech & AI": [
        {"name": "Lex Fridman (AI)", "query": "lex fridman sam altman podcast"},
        {"name": "Y Combinator", "query": "y combinator startup school lecture"},
        {"name": "Jensen Huang", "query": "jensen huang nvidia keynote interview"},
        {"name": "Steve Jobs", "query": "steve jobs archival interview full"}
    ],
    "Discipline & Stoicism": [
        {"name": "David Goggins", "query": "david goggins full podcast interview"},
        {"name": "Jocko Willink", "query": "jocko podcast full episode discipline"},
        {"name": "Ryan Holiday (Stoic)", "query": "daily stoic ryan holiday podcast"}
    ]
}

def format_view_count(views: int) -> str:
    if views >= 1_000_000:
        return f"{views / 1_000_000:.1f}M views"
    if views >= 1_000:
        return f"{views / 1_000:.0f}K views"
    return f"{views} views"

def format_duration(seconds: float) -> str:
    mins = int(seconds // 60)
    secs = int(seconds % 60)
    hours = mins // 60
    if hours > 0:
        mins = mins % 60
        return f"{hours}h {mins:02d}m"
    return f"{mins}m {secs:02d}s"

def search_viral_long_videos(
    query: str,
    min_duration_sec: int = 600,  # At least 10 minutes (long-form)
    limit: int = 10,
    sort_by_views: bool = True
) -> List[DiscoveredVideo]:
    """
    Search YouTube for high-performing long-form videos matching a topic or creator.
    Filters for long-form podcasts/talks (>10min) and ranks by total view count.
    """
    clean_query = query.strip()
    if not clean_query:
        return []

    # Fetch top candidates using yt-dlp search
    search_term = f"ytsearch{limit * 2}:{clean_query}"
    ydl_opts = {
        "extract_flat": True,
        "quiet": True,
        "no_warnings": True,
    }

    results: List[DiscoveredVideo] = []

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(search_term, download=False)
            entries = info.get("entries") or []
            for e in entries:
                if not e:
                    continue
                v_id = e.get("id")
                dur = float(e.get("duration") or 0.0)

                # Filter out shorts / clips (must be long form)
                if dur < min_duration_sec:
                    continue

                views = int(e.get("view_count") or 0)
                title = e.get("title") or "Untitled"
                channel = e.get("channel") or e.get("uploader") or "YouTube Creator"
                v_url = e.get("url") or f"https://www.youtube.com/watch?v={v_id}"
                thumb = e.get("thumbnail") or f"https://i.ytimg.com/vi/{v_id}/hqdefault.jpg"

                lic = analyze_video_license(
                    info_dict=e,
                    channel=channel,
                    description=e.get("description") or "",
                    url=v_url
                )

                results.append(DiscoveredVideo(
                    id=v_id,
                    title=title,
                    url=v_url,
                    channel=channel,
                    view_count=views,
                    view_count_formatted=format_view_count(views),
                    duration_sec=dur,
                    duration_formatted=format_duration(dur),
                    thumbnail_url=thumb,
                    is_creative_commons=lic["is_creative_commons"],
                    license_name=lic["license_name"],
                    risk_level=lic["risk_level"],
                    badge_label=lic["badge_label"]
                ))
        except Exception:
            pass

    if sort_by_views:
        results.sort(key=lambda x: x.view_count, reverse=True)

    return results[:limit]
