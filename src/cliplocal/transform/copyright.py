from typing import Tuple, Dict, Any

def build_transformative_audio_filter(
    input_label: str = "0:a",
    output_label: str = "a_transform",
    tempo_shift: float = 1.025,
    eq_boost_gain: float = 1.8
) -> Tuple[str, str]:
    """
    Build creative transformative audio filter:
    1. atempo: 1.025x micro-tempo adjustment to optimize speech cadence.
    2. equalizer & highpass: vocal presence boost (2.4kHz) and low-frequency rumble roll-off (<75Hz).
    """
    filter_chain = (
        f"[{input_label}]"
        f"atempo={tempo_shift:.3f},"
        f"equalizer=f=2400:width_type=o:width=1.0:g={eq_boost_gain:.1f},"
        f"highpass=f=75,"
        f"lowpass=f=12500"
        f"[{output_label}]"
    )
    return filter_chain, output_label

def build_transformative_video_filter(
    input_label: str = "v_reframed",
    output_label: str = "v_transform",
    contrast: float = 1.04,
    saturation: float = 1.06
) -> Tuple[str, str]:
    """
    Build creative transformative video filter:
    1. eq: modifies luminance, contrast, and color saturation curves for vertical presentation.
    2. vignette: subtle peripheral vignette focusing attention on active speaker.
    3. fps: standardizes frame cadence to 30fps.
    """
    filter_chain = (
        f"[{input_label}]"
        f"eq=contrast={contrast:.2f}:brightness=0.01:saturation={saturation:.2f}:gamma=0.98,"
        f"vignette=PI/6,"
        f"fps=30"
        f"[{output_label}]"
    )
    return filter_chain, output_label

def get_transformative_meta() -> Dict[str, Any]:
    return {
        "legal_notice": "This document logs automated creative transformations. It constitutes technical metadata, not legal fair-use determination. Users bear sole responsibility for copyright compliance.",
        "audio_tempo_multiplier": 1.025,
        "acoustic_eq_alteration": "mid-presence + highpass 75Hz",
        "video_color_grade": "contrast +4%, saturation +6%, subtle vignette",
        "spatial_reframe": "9:16 vertical crop (60% raw canvas altered)",
        "temporal_cuts": "sentence-aligned multi-cam punch-ins + B-roll interruption"
    }
