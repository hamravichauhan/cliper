from typing import Dict, Any
from pydantic import BaseModel
from src.cliplocal.core.models import CaptionStyleName

class CaptionStyleConfig(BaseModel):
    name: CaptionStyleName
    font_name: str = "Arial"
    font_size: int = 50
    bold: bool = True
    uppercase: bool = True
    primary_color: str = "#FFFFFF"       # White
    highlight_color: str = "#FFEA00"     # Vibrant Yellow
    highlight_box_color: str | None = None
    outline_color: str = "#000000"       # Black
    outline_width: int = 4
    shadow_offset: int = 2
    highlight_scale: int = 112
    margin_v: int = 280

STYLES: Dict[CaptionStyleName, CaptionStyleConfig] = {
    CaptionStyleName.HORMOZI: CaptionStyleConfig(
        name=CaptionStyleName.HORMOZI,
        font_name="Arial",
        font_size=52,
        bold=True,
        uppercase=True,
        primary_color="#FFFFFF",
        highlight_color="#FFEA00", # Yellow pop
        outline_color="#000000",
        outline_width=5,
        shadow_offset=3,
        highlight_scale=115,
        margin_v=280
    ),
    CaptionStyleName.MINIMAL: CaptionStyleConfig(
        name=CaptionStyleName.MINIMAL,
        font_name="Arial",
        font_size=42,
        bold=False,
        uppercase=False,
        primary_color="#FFFFFF",
        highlight_color="#64B5F6", # Soft sky blue
        outline_color="#1E1E1E",
        outline_width=2,
        shadow_offset=1,
        highlight_scale=105,
        margin_v=280
    ),
    CaptionStyleName.BOXED: CaptionStyleConfig(
        name=CaptionStyleName.BOXED,
        font_name="Arial",
        font_size=46,
        bold=True,
        uppercase=True,
        primary_color="#000000", # Dark text inside pill
        highlight_color="#000000",
        highlight_box_color="#FFCC00", # Yellow pill outline
        outline_color="#FFCC00",
        outline_width=8,
        shadow_offset=0,
        highlight_scale=108,
        margin_v=280
    ),
    CaptionStyleName.NEON: CaptionStyleConfig(
        name=CaptionStyleName.NEON,
        font_name="Arial",
        font_size=48,
        bold=True,
        uppercase=True,
        primary_color="#FFFFFF",
        highlight_color="#00F0FF", # Cyan glow
        outline_color="#FF007F", # Magenta neon border
        outline_width=5,
        shadow_offset=4,
        highlight_scale=115,
        margin_v=280
    ),
    CaptionStyleName.CYBERPUNK: CaptionStyleConfig(
        name=CaptionStyleName.CYBERPUNK,
        font_name="Arial",
        font_size=50,
        bold=True,
        uppercase=True,
        primary_color="#FFFFFF",
        highlight_color="#00F0FF", # Vibrant Cyan pop
        outline_color="#FF007F", # Magenta outline
        outline_width=5,
        shadow_offset=3,
        highlight_scale=118,
        margin_v=280
    ),
    CaptionStyleName.EMERALD: CaptionStyleConfig(
        name=CaptionStyleName.EMERALD,
        font_name="Arial",
        font_size=50,
        bold=True,
        uppercase=True,
        primary_color="#FFFFFF",
        highlight_color="#00FF88", # Emerald mint cash pop
        outline_color="#0B3019", # Dark emerald outline
        outline_width=5,
        shadow_offset=3,
        highlight_scale=115,
        margin_v=280
    ),
    CaptionStyleName.FIRE: CaptionStyleConfig(
        name=CaptionStyleName.FIRE,
        font_name="Arial",
        font_size=52,
        bold=True,
        uppercase=True,
        primary_color="#FFFF00", # Yellow body
        highlight_color="#FF2A00", # Blazing red-orange pop
        outline_color="#000000", # Heavy black stroke
        outline_width=6,
        shadow_offset=3,
        highlight_scale=120,
        margin_v=280
    )
}

def get_caption_style(name: CaptionStyleName | str) -> CaptionStyleConfig:
    try:
        val = CaptionStyleName(name)
        return STYLES[val]
    except Exception:
        return STYLES[CaptionStyleName.HORMOZI]
