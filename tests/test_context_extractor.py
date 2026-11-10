import pytest
from pathlib import Path
from src.cliplocal.core.models import Sentence, CandidateClip, ScoreBreakdown
from src.cliplocal.context.extractor import (
    extract_clip_context,
    format_context_for_ass,
    assign_clip_contexts
)
from src.cliplocal.captions.ass_generator import generate_ass_subtitles

def test_extract_clip_context_question():
    text = "Why do 90 percent of startups fail in their first year? It usually comes down to product market fit."
    context = extract_clip_context(text)
    assert "Why do 90 percent" in context
    assert context.endswith("?")
    assert "Engaging Moment" not in context

def test_extract_clip_context_hook_pattern():
    text = "You know, the biggest mistake people make with investing is waiting for the perfect market timing."
    context = extract_clip_context(text)
    assert "The biggest mistake people make" in context
    assert "You know" not in context
    assert "Engaging Moment" not in context

def test_extract_clip_context_core_thought():
    text = "Basically trading your time for money will never make you truly wealthy because time is fundamentally finite."
    context = extract_clip_context(text)
    assert "Trading your time for money" in context
    assert "Basically" not in context
    assert "Engaging Moment" not in context

def test_format_context_for_ass_two_line_split():
    long_context = "The biggest mistake first time founders make"
    formatted = format_context_for_ass(long_context, max_chars_per_line=24)
    assert "\\N" in formatted
    parts = formatted.split("\\N")
    assert len(parts) == 2
    assert parts[0].strip() and parts[1].strip()

def test_assign_clip_contexts_replaces_generic_placeholders():
    clips = [
        CandidateClip(
            clip_id="c1",
            index=1,
            start=0.0,
            end=10.0,
            duration=10.0,
            text="If you want to build a business that lasts you need high gross margins.",
            score=ScoreBreakdown(),
            title="Engaging Moment" # Should be overwritten!
        ),
        CandidateClip(
            clip_id="c2",
            index=2,
            start=10.0,
            end=20.0,
            duration=10.0,
            text="How does compound interest actually create massive long term wealth?",
            score=ScoreBreakdown(),
            title="" # Empty should be populated!
        )
    ]

    updated = assign_clip_contexts(clips)
    assert updated[0].title != "Engaging Moment"
    assert "margins" in updated[0].title.lower() or "business" in updated[0].title.lower()

    assert updated[1].title != ""
    assert "compound interest" in updated[1].title.lower() or "wealth" in updated[1].title.lower()

def test_ass_generator_uses_clean_top_context_typography(tmp_path):
    ass_file = tmp_path / "test_subs.ass"
    generate_ass_subtitles(
        words=[],
        output_ass_path=ass_file,
        time_offset=0.0,
        top_hook_headline="Why You Never Give Up",
        clip_duration=10.0
    )

    content = ass_file.read_text(encoding="utf-8")
    # Verify TopContext style is present
    assert "Style: TopContext" in content
    # Verify BorderStyle is 1 (clean text with outline & shadow), NOT 3 (ugly opaque box)
    assert ",1,3.5,2.0,8," in content
    assert "TopHook" not in content
    assert "WHY YOU NEVER GIVE UP" in content
