import pytest
from pathlib import Path
from unittest.mock import patch
from src.cliplocal.harvest.monitor import (
    detect_unprocessed_videos,
    load_harvest_history,
    save_harvest_history,
    get_harvest_cache_file
)

def test_detect_unprocessed_videos(tmp_path):
    mock_history = tmp_path / "mock_harvest_cache.json"
    mock_history.write_text("{}", encoding="utf-8")

    with patch("src.cliplocal.harvest.monitor.get_harvest_cache_file", return_value=mock_history):
        fake_entries = [
            {"id": "vid101", "title": "Episode 101 - How To Scale", "url": "https://www.youtube.com/watch?v=vid101"},
            {"id": "vid102", "title": "Episode 102 - AI Future", "url": "https://www.youtube.com/watch?v=vid102"},
        ]
        with patch("src.cliplocal.harvest.monitor.fetch_latest_channel_videos", return_value=fake_entries):
            # First pass: discovers 2 new videos
            discovered = detect_unprocessed_videos(["https://www.youtube.com/@SamplePodcast/videos"], max_per_channel=2)
            assert len(discovered) == 2
            assert discovered[0]["id"] == "vid101"

            # Second pass: zero new videos because they are cached
            discovered_again = detect_unprocessed_videos(["https://www.youtube.com/@SamplePodcast/videos"], max_per_channel=2)
            assert len(discovered_again) == 0
