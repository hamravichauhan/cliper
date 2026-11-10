from pathlib import Path
from typing import List, Tuple, Dict
from scenedetect import detect, ContentDetector

_SCENE_CUTS_CACHE: Dict[str, List[float]] = {}

def detect_scene_cuts(video_path: Path | str, threshold: float = 27.0) -> List[float]:
    """
    Detect visual scene changes/cuts in the video.
    Caches results per video path & modification timestamp for instant reuse across clips.
    """
    vp = Path(video_path).resolve()
    if not vp.exists():
        return []

    cache_key = f"{str(vp)}_{vp.stat().st_mtime}_{threshold}"
    if cache_key in _SCENE_CUTS_CACHE:
        return _SCENE_CUTS_CACHE[cache_key]

    try:
        scene_list = detect(str(vp), ContentDetector(threshold=threshold))
        cuts: List[float] = []
        for scene in scene_list:
            cut_sec = scene[0].get_seconds()
            if cut_sec > 0.05:
                cuts.append(round(cut_sec, 3))
        _SCENE_CUTS_CACHE[cache_key] = cuts
        return cuts
    except Exception:
        return []
