import pytest
from src.cliplocal.core.models import ReframeMode
from src.cliplocal.render.crop import build_crop_filter
from src.cliplocal.reframe.speaker_detect import ActiveSpeakerDetector

def test_split_stacked_crop_filter():
    filter_str = build_crop_filter(ReframeMode.SPLIT_STACKED, in_w=1920, in_h=1080, out_w=1080, out_h=1920)
    assert "split=2[v_left][v_right]" in filter_str
    assert "vstack[v_reframed]" in filter_str
    assert "scale=1080:960" in filter_str

def test_active_speaker_mar_dwell_time_hysteresis():
    detector = ActiveSpeakerDetector()
    # Simulate 2 speakers: Face 0 at x=0.25, Face 1 at x=0.75
    # Frames 0-4: Face 0 speaking (activity=0.8)
    # Frame 5: Face 1 speaks briefly (activity=0.9), but less than dwell time
    # Frame 6-8: Face 0 speaks again
    faces_stream = []
    for i in range(10):
        if i == 5:
            # Brief glitch/single word interrupt
            faces_stream.append([
                {"center_x": 0.25, "mouth_activity": 0.2},
                {"center_x": 0.75, "mouth_activity": 0.9}
            ])
        else:
            faces_stream.append([
                {"center_x": 0.25, "mouth_activity": 0.8},
                {"center_x": 0.75, "mouth_activity": 0.1}
            ])

    trajectory = detector.detect_active_speaker_mar(faces_stream, min_dwell_time_sec=1.0, fps=5.0)
    assert len(trajectory) == 10
    # Camera should stay on speaker 1 (x=0.25) without jumpy glitch at frame 5
    assert trajectory[5][1] == 0.25
