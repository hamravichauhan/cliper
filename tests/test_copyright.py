import pytest
from src.cliplocal.transform.copyright import (
    build_transformative_audio_filter,
    build_transformative_video_filter,
    get_transformative_meta
)

def test_build_transformative_audio_filter():
    filter_chain, out_label = build_transformative_audio_filter("0:a", "a_trans")
    assert out_label == "a_trans"
    assert "atempo=1.025" in filter_chain
    assert "equalizer=" in filter_chain
    assert "highpass=f=75" in filter_chain

def test_build_transformative_video_filter():
    filter_chain, out_label = build_transformative_video_filter("v_reframed", "v_trans")
    assert out_label == "v_trans"
    assert "eq=contrast=1.04" in filter_chain
    assert "saturation=1.06" in filter_chain
    assert "vignette=" in filter_chain

def test_get_transformative_meta():
    meta = get_transformative_meta()
    assert meta["audio_tempo_multiplier"] == 1.025
    assert "acoustic_eq_alteration" in meta
