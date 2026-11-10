import pytest
from src.cliplocal.render.zoom import compute_punch_in_intervals, compute_multicam_intervals, build_dynamic_zoom_filter
from src.cliplocal.core.models import Sentence, Word

def test_compute_multicam_intervals():
    sentences = [
        Sentence(index=0, start=10.0, end=13.0, text="Hook sentence here", words=[]),
        Sentence(index=1, start=13.2, end=17.0, text="Second sentence context", words=[]),
        Sentence(index=2, start=17.2, end=21.0, text="Third sentence punchline", words=[]),
    ]
    intervals = compute_multicam_intervals(clip_duration=15.0, sentences=sentences, time_offset=10.0)
    assert len(intervals) >= 1
    # First interval starts at 0.0 (relative to offset 10.0)
    assert intervals[0][0] == 0.0
    assert intervals[0][1] == 3.0

def test_compute_punch_in_intervals():
    intervals = compute_punch_in_intervals(clip_duration=30.0, sentences=[])
    assert len(intervals) >= 2
    # First interval should be opening hook punch-in
    assert intervals[0][0] == 0.0
    assert intervals[0][1] <= 2.8

def test_build_dynamic_zoom_filter():
    intervals = [(0.0, 2.5), (7.0, 9.5)]
    filter_str = build_dynamic_zoom_filter(
        in_w=1920,
        in_h=1080,
        out_w=1080,
        out_h=1920,
        center_x_ratio=0.5,
        intervals=intervals,
        zoom_factor=1.15
    )
    assert "crop=w=" in filter_str
    assert "between(t,0.00,2.50)" in filter_str
    assert "between(t,7.00,9.50)" in filter_str
    assert "scale=1080:1920" in filter_str
