import pytest
from pathlib import Path
from src.cliplocal.render.thumbnail import extract_viral_thumbnails, calculate_frame_sharpness
import numpy as np

def test_calculate_frame_sharpness():
    # Sharp image with distinct borders
    sharp_img = np.zeros((100, 100, 3), dtype=np.uint8)
    sharp_img[20:80, 20:80] = 255
    sharpness = calculate_frame_sharpness(sharp_img)
    assert sharpness > 100.0

def test_extract_viral_thumbnails(tmp_path):
    fixture_path = Path("fixtures/test_podcast_sample.mp4").resolve()
    if not fixture_path.exists():
        pytest.skip("Test fixture not generated yet")

    thumbs = extract_viral_thumbnails(
        video_path=fixture_path,
        start_sec=0.0,
        duration=5.0,
        title="Why You Fail At Code",
        output_dir=tmp_path,
        clip_index=1,
        count=2
    )

    assert len(thumbs) >= 1
    for t in thumbs:
        assert t.exists()
        assert t.suffix.lower() == ".jpg"
        assert t.stat().st_size > 1000
