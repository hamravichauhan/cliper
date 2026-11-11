import pytest
from src.cliplocal.audio.music import ensure_ambient_music, build_ducking_audio_filter

def test_ensure_ambient_music():
    path = ensure_ambient_music()
    assert path.exists()
    assert path.stat().st_size > 50000

    # Test all multi-genre presets including podcast sound suites
    for genre in ["phonk_drift", "synthwave", "cinematic", "tension_drone", "emotional_piano"]:
        g_path = ensure_ambient_music(genre)
        assert g_path.exists()
        assert g_path.stat().st_size > 50000

def test_build_ducking_audio_filter():
    filter_str = build_ducking_audio_filter(main_audio_label="0:a", music_input_index=1)
    assert "[1:a][0:a]sidechaincompress=" in filter_str
    assert "threshold=0.08" in filter_str
    assert "amix=inputs=2" in filter_str

    # Test frequency carving
    carved_str = build_ducking_audio_filter(main_audio_label="0:a", music_input_index=1, frequency_carving=True)
    assert "equalizer=f=2400:t=q:w=1.2:g=-4.5" in carved_str
    assert "[carved_bg_1][0:a]sidechaincompress=" in carved_str

def test_podcast_sound_suite_mapping():
    from src.cliplocal.audio.music import get_podcast_sound_suite_for_archetype
    assert get_podcast_sound_suite_for_archetype("contrarian_truth") == "tension_drone"
    assert get_podcast_sound_suite_for_archetype("shocking_revelation") == "tension_drone"
    assert get_podcast_sound_suite_for_archetype("story_metaphor") == "emotional_piano"
    assert get_podcast_sound_suite_for_archetype("life_lesson") == "emotional_piano"
