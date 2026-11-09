import pytest
from src.cliplocal.captions.emojis import get_emoji_for_word, enrich_text_with_emoji

def test_emoji_trigger_keywords():
    assert get_emoji_for_word("secret") == "🤫"
    assert get_emoji_for_word("money") == "💰"
    assert get_emoji_for_word("million") == "💸"
    assert get_emoji_for_word("stop") == "🛑"
    assert get_emoji_for_word("fire") == "🔥"
    assert get_emoji_for_word("wrong") == "❌"
    assert get_emoji_for_word("regularword") is None

def test_enrich_text_with_emoji():
    assert "secret 🤫" in enrich_text_with_emoji("secret")
    assert enrich_text_with_emoji("hello") == "hello"
