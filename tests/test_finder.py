import pytest
from unittest.mock import patch
from src.cliplocal.discovery.finder import search_viral_long_videos, format_view_count, format_duration

def test_format_helpers():
    assert format_view_count(14_800_000) == "14.8M views"
    assert format_view_count(450_000) == "450K views"
    assert format_view_count(850) == "850 views"

    assert format_duration(3665) == "1h 01m"
    assert format_duration(450) == "7m 30s"

def test_search_viral_long_videos_mocked():
    fake_entries = [
        {
            "id": "abc1",
            "title": "Lex Fridman Interview with Sam Altman",
            "channel": "Lex Fridman",
            "duration": 7200, # 2 hours
            "view_count": 3_500_000,
            "url": "https://www.youtube.com/watch?v=abc1"
        },
        {
            "id": "abc2",
            "title": "Short 1-minute clip",
            "channel": "Random Clip",
            "duration": 60, # 1 min -> should be filtered out because < 600s
            "view_count": 10_000_000,
            "url": "https://www.youtube.com/watch?v=abc2"
        },
        {
            "id": "abc3",
            "title": "Sam Altman Stanford Talk",
            "channel": "Stanford",
            "duration": 1800, # 30 mins
            "view_count": 500_000,
            "url": "https://www.youtube.com/watch?v=abc3"
        }
    ]

    with patch("src.cliplocal.discovery.finder.yt_dlp.YoutubeDL") as mock_ydl_cls:
        mock_instance = mock_ydl_cls.return_value.__enter__.return_value
        mock_instance.extract_info.return_value = {"entries": fake_entries}
        results = search_viral_long_videos("sam altman", min_duration_sec=600, limit=5)
        # Should filter out the 1-minute clip abc2
        assert len(results) == 2
        # Should be ranked descending by view count: abc1 (3.5M) then abc3 (500K)
        assert results[0].id == "abc1"
        assert results[0].view_count == 3_500_000
        assert results[1].id == "abc3"
