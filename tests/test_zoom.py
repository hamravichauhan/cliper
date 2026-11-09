import pytest
from src.cliplocal.render.zoom import compute_punch_in_intervals, build_dynamic_zoom_filter

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
