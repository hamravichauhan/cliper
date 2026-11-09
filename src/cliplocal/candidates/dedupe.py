from typing import List
from src.cliplocal.core.models import CandidateClip
from src.cliplocal.config.settings import config

def compute_overlap_ratio(clip_a: CandidateClip, clip_b: CandidateClip) -> float:
    """Compute temporal Intersection-over-Union (IoU) of two candidate spans."""
    intersection_start = max(clip_a.start, clip_b.start)
    intersection_end = min(clip_a.end, clip_b.end)
    intersection = max(0.0, intersection_end - intersection_start)

    if intersection <= 0.0:
        return 0.0

    union_start = min(clip_a.start, clip_b.start)
    union_end = max(clip_a.end, clip_b.end)
    union = max(1e-6, union_end - union_start)

    return intersection / union

def deduplicate_candidates(
    candidates: List[CandidateClip],
    max_overlap: float | None = None,
    top_n: int | None = None
) -> List[CandidateClip]:
    """
    Sort candidates by virality score descending and eliminate candidates
    overlapping with an already chosen candidate by more than max_overlap (default 30%).
    """
    if not candidates:
        return []

    threshold = max_overlap or config.get("candidates", {}).get("dedupe_overlap_threshold", 0.30)
    limit = top_n or config.get("candidates", {}).get("default_top_n", 6)

    # Sort descending by total score
    sorted_candidates = sorted(candidates, key=lambda c: c.score.total_score, reverse=True)

    selected: List[CandidateClip] = []
    for candidate in sorted_candidates:
        overlaps = False
        for chosen in selected:
            if compute_overlap_ratio(candidate, chosen) > threshold:
                overlaps = True
                break
        if not overlaps:
            candidate.index = len(selected) + 1
            selected.append(candidate)
            if len(selected) >= limit:
                break

    return selected
