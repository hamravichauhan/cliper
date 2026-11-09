import pytest
from src.cliplocal.core.models import CandidateClip, ScoreBreakdown
from src.cliplocal.candidates.dedupe import deduplicate_candidates, compute_overlap_ratio

def make_candidate(clip_id: str, start: float, end: float, score_val: float) -> CandidateClip:
    return CandidateClip(
        clip_id=clip_id,
        index=0,
        start=start,
        end=end,
        duration=end - start,
        text=f"Text for {clip_id}",
        score=ScoreBreakdown(total_score=score_val)
    )

def test_iou_overlap_computation():
    c1 = make_candidate("c1", 0.0, 30.0, 90.0)
    c2 = make_candidate("c2", 15.0, 45.0, 80.0) # 15s overlap over 45s union = 33.3%
    iou = compute_overlap_ratio(c1, c2)
    assert abs(iou - (15.0 / 45.0)) < 0.01

def test_deduplication_suppresses_overlapping_candidates():
    c1 = make_candidate("c1", 0.0, 40.0, 95.0) # Highest score
    c2 = make_candidate("c2", 5.0, 45.0, 85.0) # Overlaps c1 heavily
    c3 = make_candidate("c3", 50.0, 90.0, 75.0) # No overlap

    selected = deduplicate_candidates([c1, c2, c3], max_overlap=0.30, top_n=5)
    selected_ids = [c.clip_id for c in selected]

    assert "c1" in selected_ids
    assert "c2" not in selected_ids
    assert "c3" in selected_ids
