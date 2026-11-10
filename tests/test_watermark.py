import pytest
from src.cliplocal.render.watermark import build_watermark_filter

def test_build_watermark_filter():
    filter_str, out_label = build_watermark_filter("v_in", "v_out", handle="@ApexMindset", position="top_left")
    assert out_label == "v_out"
    assert "drawtext=" in filter_str
    assert "@ApexMindset" in filter_str
    assert "box=1" in filter_str

def test_build_watermark_empty_handle():
    filter_str, out_label = build_watermark_filter("v_in", "v_out", handle=None)
    assert out_label == "v_out"
    assert "null" in filter_str
