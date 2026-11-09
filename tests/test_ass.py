import pytest
from pathlib import Path
from src.cliplocal.core.models import Word, CaptionStyleName
from src.cliplocal.captions.ass_generator import generate_ass_subtitles, hex_to_ass_color

def test_hex_to_ass_color_conversion():
    # ASS is &HAABBGGRR
    # Pure White #FFFFFF -> &H00FFFFFF
    assert hex_to_ass_color("#FFFFFF") == "&H00FFFFFF"
    # Pure Red #FF0000 -> &H000000FF (R=FF, G=00, B=00 -> BGR is 0000FF)
    assert hex_to_ass_color("#FF0000") == "&H000000FF"
    # Pure Blue #0000FF -> &H00FF0000
    assert hex_to_ass_color("#0000FF") == "&H00FF0000"

def test_generate_ass_subtitles(tmp_path):
    words = [
        Word(word="Hello", start=10.0, end=10.5),
        Word(word="world", start=10.6, end=11.0),
        Word(word="this", start=11.1, end=11.4),
        Word(word="is", start=11.5, end=11.7),
        Word(word="ClipLocal.", start=11.8, end=12.5),
    ]

    out_file = tmp_path / "test.ass"
    generate_ass_subtitles(
        words=words,
        output_ass_path=out_file,
        time_offset=10.0,
        style_name=CaptionStyleName.HORMOZI
    )

    assert out_file.exists()
    content = out_file.read_text(encoding="utf-8")
    assert "[Script Info]" in content
    assert "PlayResX: 1080" in content
    assert "PlayResY: 1920" in content
    assert "Dialogue:" in content
    # Words should be offset by -10.0s, so start should be around 0:00:00.00
    assert "0:00:00.00" in content
    assert "\\t(0,70,\\fscx115\\fscy115)" in content
