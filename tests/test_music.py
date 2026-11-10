import pytest
from src.cliplocal.audio.music import ensure_ambient_music, build_ducking_audio_filter

def test_ensure_ambient_music():
    path = ensure_ambient_music()
    assert path.exists()
    assert path.stat().st_size > 50000

    # Test all multi-genre presets
    for genre in ["phonk_drift", "synthwave", "cinematic"]:
        g_path = ensure_ambient_music(genre)
        assert g_path.exists()
        assert g_path.stat().st_size > 50000

def test_build_ducking_audio_filter():
    filter_str = build_ducking_audio_filter(main_audio_label="0:a", music_input_index=1)
    assert "[1:a][0:a]sidechaincompress=" in filter_str
    assert "threshold=0.08" in filter_str
    assert "amix=inputs=2" in filter_str
