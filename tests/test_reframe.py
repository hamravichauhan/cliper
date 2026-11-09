import pytest
from src.cliplocal.core.models import ReframeMode
from src.cliplocal.render.crop import build_crop_filter
from src.cliplocal.reframe.face_tracker import FaceTracker

def test_crop_filter_builder_center_crop():
    filter_str = build_crop_filter(ReframeMode.CENTER, in_w=1920, in_h=1080)
    assert "crop=606:1080:(iw-ow)/2:0" in filter_str
    assert "scale=1080:1920" in filter_str

def test_crop_filter_builder_blur_fill():
    filter_str = build_crop_filter(ReframeMode.BLUR_FILL, in_w=1920, in_h=1080)
    assert "split=2" in filter_str
    assert "boxblur=20:5" in filter_str
    assert "overlay=" in filter_str

def test_crop_filter_builder_face_follow():
    # Face at 25% from left
    filter_str = build_crop_filter(ReframeMode.FACE_FOLLOW, in_w=1920, in_h=1080, center_x_ratio=0.25)
    assert "crop=606:1080" in filter_str
    # 1920 * 0.25 = 480; 480 - 303 = 177 offset
    assert "177:0" in filter_str
