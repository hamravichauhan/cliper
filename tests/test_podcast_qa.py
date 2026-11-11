import pytest
import json
from pathlib import Path

from src.cliplocal.core.models import Sentence, Word, Transcript
from src.cliplocal.segment.podcast_qa import (
    is_interrogative_sentence,
    strip_host_fluff,
    extract_podcast_qa_pairs,
    PodcastQAPair
)
from src.cliplocal.score.qa_scorer import (
    score_podcast_qa_pairs,
    classify_viral_archetype,
    pick_top_qa_clips
)
from src.cliplocal.export.qa_manifest import (
    export_podcast_qa_manifest_json,
    export_podcast_qa_manifest_md
)

def make_word(token: str, start: float, end: float) -> Word:
    return Word(word=token, start=start, end=end, probability=0.98)

def make_sentence(index: int, text: str, start: float, end: float, has_punct: bool = True) -> Sentence:
    tokens = text.split()
    dur_per_word = (end - start) / max(1, len(tokens))
    words = []
    curr = start
    for tok in tokens:
        words.append(make_word(tok, curr, curr + dur_per_word))
        curr += dur_per_word
    return Sentence(
        index=index,
        start=start,
        end=end,
        text=text,
        words=words,
        has_terminal_punct=has_punct,
        dangling_end=False
    )

def test_is_interrogative_sentence():
    # 5W1H Question
    s1 = make_sentence(0, "Why is saving money actually keeping you poor?", 0.0, 3.0)
    assert is_interrogative_sentence(s1) is True

    # Auxiliary inversion
    s2 = make_sentence(1, "Do you think AI will replace programmers?", 3.5, 6.0)
    assert is_interrogative_sentence(s2) is True

    # Imperative question setup
    s3 = make_sentence(2, "Tell me about the hardest lesson from your first company.", 6.5, 10.0)
    assert is_interrogative_sentence(s3) is True

    # Backchannel chatter should NOT be a question
    s4 = make_sentence(3, "Right?", 10.5, 11.0)
    assert is_interrogative_sentence(s4) is False

    s5 = make_sentence(4, "Yeah exactly.", 11.5, 12.0)
    assert is_interrogative_sentence(s5) is False

def test_strip_host_fluff():
    # Rambling preamble before direct question
    sent = make_sentence(
        0,
        "So you know I was thinking about this yesterday when I read the news and tell me what is the #1 mistake founders make?",
        0.0,
        8.0
    )
    cleaned_text, start_t, end_t = strip_host_fluff(sent)
    assert "what is the #1 mistake founders make?" in cleaned_text.lower()
    assert start_t >= 0.0

def test_extract_podcast_qa_pairs():
    # Create simulated interview dialogue
    sentences = [
        # Question 1
        make_sentence(0, "What is the single biggest mistake first-time founders make with money?", 0.0, 4.5),
        # Answer sentences
        make_sentence(1, "The biggest mistake is hiring a huge marketing agency before having product-market fit.", 5.0, 15.0),
        make_sentence(2, "They blow 500,000 dollars on paid ads while the core product is still leaking users.", 15.5, 26.0),
        make_sentence(3, "And that is why 90% of funded startups die in year one.", 26.5, 33.0),
        # Host reaction
        make_sentence(4, "Boom.", 33.5, 34.2),

        # Question 2
        make_sentence(5, "How did your marriage survive when you were broke?", 36.0, 40.0),
        make_sentence(6, "It was brutal. I remember crying on the kitchen floor at 2 AM with zero dollars in the bank.", 41.0, 52.0),
        make_sentence(7, "She looked at me and said we will figure this out together and that changed everything.", 52.5, 68.0),
        make_sentence(8, "Exactly.", 68.5, 69.2)
    ]

    qa_pairs = extract_podcast_qa_pairs(sentences, min_duration=15.0, max_duration=60.0)
    assert len(qa_pairs) == 2

    # Check QA 1
    assert "What is the single biggest mistake" in qa_pairs[0].question_text
    assert "Boom." in qa_pairs[0].sentences[-1].text
    assert qa_pairs[0].duration >= 25.0

    # Check QA 2
    assert "marriage survive" in qa_pairs[1].question_text
    assert qa_pairs[1].duration >= 25.0

def test_score_podcast_qa_pairs_and_archetypes():
    sentences1 = [
        make_sentence(0, "What is the single biggest mistake first-time founders make with money?", 0.0, 4.5),
        make_sentence(1, "They blow 500,000 dollars on paid ads and that is why they fail.", 5.0, 32.0),
        make_sentence(2, "Boom.", 32.5, 33.2)
    ]
    qa1 = extract_podcast_qa_pairs(sentences1, min_duration=15.0)[0]

    sentences2 = [
        make_sentence(0, "What was the hardest thing you confessed to your wife when you failed?", 0.0, 4.5),
        make_sentence(1, "I had so much shame and guilt when the company went bankrupt.", 5.0, 34.0),
        make_sentence(2, "Exactly.", 34.5, 35.2)
    ]
    qa2 = extract_podcast_qa_pairs(sentences2, min_duration=15.0)[0]

    scored = score_podcast_qa_pairs([qa1, qa2])
    assert len(scored) == 2
    for qa in scored:
        assert 50.0 <= qa.viral_score <= 100.0
        assert len(qa.hook_headline) > 0
        assert len(qa.hashtags) > 0

    # qa2 should trigger Raw Vulnerability and Instagram Reels
    assert qa2.viral_archetype == "Raw Vulnerability"
    assert qa2.recommended_platform == "Instagram Reels"

def test_manifest_export_json_and_md(tmp_path):
    sentences = [
        make_sentence(0, "Why is saving money actually keeping you poor?", 0.0, 4.0),
        make_sentence(1, "Inflation eats 7% of purchasing power while high yield accounts only pay 4%.", 4.5, 25.0),
        make_sentence(2, "And that is why the middle class gets wiped out.", 25.5, 35.0),
        make_sentence(3, "Damn.", 35.5, 36.2)
    ]
    qa = extract_podcast_qa_pairs(sentences, min_duration=15.0)[0]
    scored = score_podcast_qa_pairs([qa])

    json_out = tmp_path / "podcast_qa_manifest.json"
    md_out = tmp_path / "podcast_qa_manifest.md"

    export_podcast_qa_manifest_json(scored, json_out, video_title="Finance Episode", rendered_indices=[1])
    export_podcast_qa_manifest_md(scored, md_out, video_title="Finance Episode", rendered_indices=[1])

    assert json_out.exists()
    assert md_out.exists()

    data = json.loads(json_out.read_text(encoding="utf-8"))
    assert data["total_questions_detected"] == 1
    assert data["total_rendered_clips"] == 1
    assert data["questions"][0]["is_rendered"] is True
    assert data["questions"][0]["recommended_platform"] in ["YouTube Shorts", "Instagram Reels"]

    md_content = md_out.read_text(encoding="utf-8")
    assert "Podcast Q&A Master Index" in md_content
    assert "Why is saving money actually keeping you poor?" in md_content
    assert "Rendered" in md_content
