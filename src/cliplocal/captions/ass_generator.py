from pathlib import Path
from typing import List, Optional
from src.cliplocal.core.models import Word, CaptionStyleName
from src.cliplocal.core.utils import ass_time
from src.cliplocal.captions.styles import get_caption_style, CaptionStyleConfig
from src.cliplocal.captions.emojis import get_emoji_for_word

def hex_to_ass_color(hex_str: str, alpha: str = "00") -> str:
    """Convert #RRGGBB to ASS &HAABBGGRR (Blue-Green-Red order)."""
    clean = hex_str.strip().lstrip("#")
    if len(clean) != 6:
        clean = "FFFFFF"
    r = clean[0:2]
    g = clean[2:4]
    b = clean[4:6]
    return f"&H{alpha}{b}{g}{r}".upper()

def escape_ass(text: str) -> str:
    """Escape ASS formatting control characters."""
    return text.replace("\\", "").replace("{", "").replace("}", "").replace("\n", " ").strip()

def group_words_into_lines(words: List[Word], max_words_per_group: int = 4) -> List[List[Word]]:
    """Group words into display clusters of 2-4 words for high readability on vertical 9:16 mobile screens."""
    groups: List[List[Word]] = []
    current_group: List[Word] = []

    for w in words:
        current_group.append(w)
        if len(current_group) >= max_words_per_group or (w.word.endswith((".", "!", "?")) and len(current_group) >= 2):
            groups.append(current_group)
            current_group = []

    if current_group:
        groups.append(current_group)
    return groups

def generate_ass_subtitles(
    words: List[Word],
    output_ass_path: Path | str,
    time_offset: float = 0.0,
    style_name: CaptionStyleName | str = CaptionStyleName.HORMOZI,
    max_words_per_group: int = 3,
    include_emojis: bool = True
) -> Path:
    """
    Generate an ASS subtitle file with animated word-level karaoke pop highlights.
    All timestamps are shifted by -time_offset so subtitles align with the cut clip.
    """
    out_p = Path(output_ass_path).resolve()
    out_p.parent.mkdir(parents=True, exist_ok=True)

    style = get_caption_style(style_name)
    primary_ass = hex_to_ass_color(style.primary_color)
    highlight_ass = hex_to_ass_color(style.highlight_color)
    outline_ass = hex_to_ass_color(style.outline_color)

    # ASS Header
    ass_lines = [
        "[Script Info]",
        "ScriptType: v4.00+",
        "PlayResX: 1080",
        "PlayResY: 1920",
        "ScaledBorderAndShadow: yes",
        "",
        "[V4+ Styles]",
        "Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding",
        f"Style: Default,{style.font_name},{style.font_size},{primary_ass},{highlight_ass},{outline_ass},&H80000000,"
        f"{'-1' if style.bold else '0'},0,0,0,100,100,0,0,1,{style.outline_width},{style.shadow_offset},2,60,60,{style.margin_v},1",
        "",
        "[Events]",
        "Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text"
    ]

    # Filter words inside clip
    valid_words = [w for w in words if (w.end - time_offset) > 0.0]
    word_groups = group_words_into_lines(valid_words, max_words_per_group=max_words_per_group)

    for group in word_groups:
        if not group:
            continue
        group_start = max(0.0, group[0].start - time_offset)
        group_end = max(0.0, group[-1].end - time_offset)

        # Emit an event for each active word in the group
        for idx, active_word in enumerate(group):
            w_start = max(0.0, active_word.start - time_offset)
            # Duration extends until the next word in the group starts, or group end
            if idx < len(group) - 1:
                w_end = max(w_start + 0.1, group[idx + 1].start - time_offset)
            else:
                w_end = max(w_start + 0.15, group_end)

            # Format the text with karaoke popping on active word
            formatted_words = []
            for j, w in enumerate(group):
                text_clean = escape_ass(w.word)
                if style.uppercase:
                    text_clean = text_clean.upper()

                if include_emojis:
                    emoji = get_emoji_for_word(w.word)
                    if emoji:
                        text_clean = f"{text_clean} {emoji}"

                if j == idx:
                    # Popping animation tag on active word
                    scale = style.highlight_scale
                    if style.highlight_box_color:
                        box_color = hex_to_ass_color(style.highlight_box_color)
                        tag = f"{{\\c{highlight_ass}\\3c{box_color}\\bord12\\fscx100\\fscy100\\t(0,70,\\fscx{scale}\\fscy{scale})}}{text_clean}{{\\r}}"
                    else:
                        tag = f"{{\\c{highlight_ass}\\fscx100\\fscy100\\t(0,70,\\fscx{scale}\\fscy{scale})}}{text_clean}{{\\r}}"
                    formatted_words.append(tag)
                else:
                    tag = f"{{\\c{primary_ass}}}{text_clean}{{\\r}}"
                    formatted_words.append(tag)

            dialogue_text = " ".join(formatted_words)
            event_line = f"Dialogue: 0,{ass_time(w_start)},{ass_time(w_end)},Default,,0,0,0,,{dialogue_text}"
            ass_lines.append(event_line)

    with open(out_p, "w", encoding="utf-8") as f:
        f.write("\n".join(ass_lines) + "\n")

    return out_p
