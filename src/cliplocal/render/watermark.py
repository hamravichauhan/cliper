import re
from typing import Tuple, Optional

def build_watermark_filter(
    input_label: str = "v_in",
    output_label: str = "v_watermark",
    handle: Optional[str] = None,
    position: str = "top_left"
) -> Tuple[str, str]:
    """
    Build FFmpeg drawtext watermark filter for social handle branding.
    Creates a clean, semi-translucent dark pill with white handle text.
    """
    if not handle or not handle.strip():
        # Pass-through
        return f"[{input_label}]null[{output_label}]", output_label

    clean_handle = re.sub(r"[^\w@.-]", "", handle.strip())
    if not clean_handle.startswith("@"):
        clean_handle = f"@{clean_handle}"

    # Safe margin positions for 1080x1920 vertical canvas
    if position == "top_right":
        x_expr = "w-tw-70"
        y_expr = "100"
    elif position == "bottom_center":
        x_expr = "(w-tw)/2"
        y_expr = "h-140"
    else:  # default top_left
        x_expr = "70"
        y_expr = "100"

    filter_str = (
        f"[{input_label}]"
        f"drawtext=text='{clean_handle}':"
        f"fontsize=28:"
        f"fontcolor=white@0.85:"
        f"box=1:"
        f"boxcolor=black@0.45:"
        f"boxborderw=10:"
        f"x={x_expr}:"
        f"y={y_expr}"
        f"[{output_label}]"
    )
    return filter_str, output_label
