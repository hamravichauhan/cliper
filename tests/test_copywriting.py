import pytest
from src.cliplocal.core.models import CandidateClip, ScoreBreakdown
from src.cliplocal.copywriting.generator import generate_social_copy, detect_topic_category

def test_detect_topic_category():
    assert detect_topic_category("How to raise money for your startup and scale revenue") == "business"
    assert detect_topic_category("Understanding dopamine receptors and neuroscience focus") == "psychology"
    assert detect_topic_category("Writing clean python code and AI algorithms") == "tech"
    assert detect_topic_category("Stay disciplined and avoid weak excuses") == "discipline"

def test_generate_social_copy():
    cand = CandidateClip(
        clip_id="test_clip_1",
        index=1,
        start=0.0,
        end=30.0,
        duration=30.0,
        text="Most people waste their twenties chasing the wrong goals. Focus on high leverage skills that compound over time.",
        score=ScoreBreakdown(total_score=88.5, hook_type="Contrarian Truth"),
        title="Stop Wasting Your Twenties"
    )

    copy_bundle = generate_social_copy(cand, brand_handle="@ApexMindset")
    assert "Stop Wasting Your Twenties" in copy_bundle.youtube.title
    assert "@ApexMindset" in copy_bundle.instagram.caption
    assert len(copy_bundle.instagram.hashtags) == 15
    assert "Save this reel" in copy_bundle.instagram.caption
    assert "TITLE:" in copy_bundle.youtube.formatted_post
