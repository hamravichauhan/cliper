import json
from pathlib import Path
from typing import List, Dict, Any, Optional
import yt_dlp

def get_harvest_cache_file() -> Path:
    cache_f = Path(".cache/harvest_history.json")
    cache_f.parent.mkdir(parents=True, exist_ok=True)
    if not cache_f.exists():
        cache_f.write_text("{}", encoding="utf-8")
    return cache_f

def load_harvest_history() -> Dict[str, Any]:
    cache_f = get_harvest_cache_file()
    try:
        return json.loads(cache_f.read_text(encoding="utf-8"))
    except Exception:
        return {}

def save_harvest_history(history: Dict[str, Any]):
    cache_f = get_harvest_cache_file()
    cache_f.write_text(json.dumps(history, indent=2), encoding="utf-8")

def fetch_latest_channel_videos(
    channel_url: str,
    max_videos: int = 5
) -> List[Dict[str, str]]:
    """
    Fetch the latest video entries from a YouTube channel or playlist without downloading media.
    Extracts flat playlist info in 1-2 seconds.
    """
    ydl_opts = {
        "extract_flat": True,
        "playlistend": max_videos,
        "quiet": True,
        "no_warnings": True
    }

    results: List[Dict[str, str]] = []
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(channel_url, download=False)
            entries = info.get("entries") or []
            for entry in entries:
                v_id = entry.get("id")
                v_title = entry.get("title") or "Untitled"
                v_url = entry.get("url") or f"https://www.youtube.com/watch?v={v_id}"
                if v_id and v_url:
                    results.append({
                        "id": v_id,
                        "title": v_title,
                        "url": v_url
                    })
        except Exception as e:
            pass

    return results

def detect_unprocessed_videos(
    channel_urls: List[str],
    max_per_channel: int = 3
) -> List[Dict[str, str]]:
    """
    Compare latest videos against local harvest cache to find new episodes that haven't been processed yet.
    """
    history = load_harvest_history()
    new_videos: List[Dict[str, str]] = []

    for c_url in channel_urls:
        if not c_url.strip():
            continue
        latest = fetch_latest_channel_videos(c_url.strip(), max_videos=max_per_channel)
        for item in latest:
            v_id = item["id"]
            if v_id not in history:
                new_videos.append(item)
                history[v_id] = {
                    "title": item["title"],
                    "url": item["url"],
                    "discovered_at": str(Path.cwd())
                }

    if new_videos:
        save_harvest_history(history)

    return new_videos
