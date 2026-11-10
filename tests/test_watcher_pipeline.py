import shutil
import json
from pathlib import Path
import pytest
from src.cliplocal.cli.watcher import is_file_ready, process_batch_folder
from src.cliplocal.core.models import CaptionStyleName, ReframeMode

def test_is_file_ready(tmp_path):
    f = tmp_path / "sample.mp4"
    f.write_bytes(b"dummy video content 123456")
    ready = is_file_ready(f, wait_sec=0.1)
    assert ready is True

def test_batch_watcher_processing(tmp_path):
    fixture_path = Path("fixtures/test_podcast_sample.mp4").resolve()
    if not fixture_path.exists():
        pytest.skip("Test fixture not generated yet")

    in_dir = tmp_path / "incoming"
    out_dir = tmp_path / "rendered"
    in_dir.mkdir()
    out_dir.mkdir()

    # Copy fixture video into in_dir
    target_video = in_dir / "episode_1.mp4"
    shutil.copyfile(fixture_path, target_video)

    # Run batch processor with once=True
    rendered = process_batch_folder(
        input_dir=in_dir,
        output_dir=out_dir,
        clips=1,
        style=CaptionStyleName.HORMOZI,
        mode=ReframeMode.CENTER,
        use_llm=False,
        anti_copyright=True,
        multicam=True,
        broll=True,
        top_banner=True,
        once=True
    )

    assert len(rendered) >= 1
    rendered_file = rendered[0]
    assert rendered_file.exists()
    assert rendered_file.suffix == ".mp4"

    # Check sidecar JSON
    sidecar_files = list(out_dir.glob("**/*.json"))
    assert len(sidecar_files) >= 1
    sidecar_data = json.loads(sidecar_files[0].read_text())
    assert sidecar_data["anti_copyright"] is True
    assert "transformative_meta" in sidecar_data
    assert "thumbnails" in sidecar_data

    # Check that original video was moved to done/
    assert not target_video.exists()
    assert (in_dir / "done" / "episode_1.mp4").exists()
