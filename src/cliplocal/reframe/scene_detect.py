from pathlib import Path
from typing import List, Tuple
from scenedetect import detect, ContentDetector

def detect_scene_cuts(video_path: Path | str, threshold: float = 27.0) -> List[float]:
    """
    Detect visual scene changes/cuts in the video.
    Returns list of cut timestamps in seconds.
    """
    vp = Path(video_path).resolve()
    if not vp.exists():
        return []

    try:
        scene_list = detect(str(vp), ContentDetector(threshold=threshold))
        cuts: List[float] = []
        for scene in scene_list:
            cut_sec = scene[0].get_seconds()
            if cut_sec > 0.05:
                cuts.append(round(cut_sec, 3))
        return cuts
    except Exception:
        return []
