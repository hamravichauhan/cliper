# 🎬 ClipLocal

> **Legal Reminder**: Only process videos you own or have the explicit legal right to use.

ClipLocal is a **100% free, fully offline, single-user** video-to-shorts tool designed specifically for Apple Silicon Macs (optimized for M4, 16 GB unified memory). It automatically turns long-form horizontal videos (podcasts, interviews, talks, streams) into ranked, vertical 9:16 short clips (1080x1920 MP4) with animated popping captions, similar to Klap.app and OpusClip.

---

## Key Features

- **100% Free & Localhost Only**: Zero paid APIs, no subscriptions, no accounts, and no cloud dependencies. Works completely offline once setup is complete.
- **Apple Silicon Hardware Acceleration**:
  - Video encode via `h264_videotoolbox` (with automatic fallback to `libx264`).
  - Metal GPU acceleration for Whisper via `mlx-whisper` and `whisper.cpp`.
  - CoreML execution provider for ONNX Runtime face and speaker detection.
- **Explainable Heuristic Virality Scoring (0–100)**:
  - Detects hook patterns (curiosity gaps, actionable advice, contrarian takes, questions, statistics, narrative openers).
  - Analyzes audio energy variance, speaking pace (115–180 WPM sweet spot), and conclusive payoffs.
  - Penalizes gear checks, stream banter, mic checks, and dead preambles.
  - Transparent score breakdown for every clip.
- **Intelligent 9:16 Reframing**:
  - **Mode A (Center Crop)**: Static 9:16 crop.
  - **Mode B (Blur-Fill)**: Landscape video centered over a scaled, blurred background.
  - **Mode C (Face-Follow)**: Real-time face tracking with dead-zone jitter removal, EMA smoothing, and scene-cut snapping.
  - **Mode D (Active Speaker)**: Determines who is speaking using mouth movement variance with broadcast hysteresis.
  - **Mode E (Split-Stacked)**: Two-speaker vertical stacked layout with divider.
  - **Auto Mode**: Automatically selects the best mode based on detected faces.
- **Animated Karaoke ASS Captions**:
  - High-retention word-by-word popping highlights (Hormozi style, Cyberpunk, Emerald Cash, Fire Drop, Minimalist, Boxed pill, and Neon glow).
  - **Contextual Animated Emojis**: Automatic emoji injection above viral trigger words (e.g. 💰, 🔥, 🤫, 🛑, 🚀, 💡).
  - Safe-area margin compliance for TikTok, Reels, and Shorts.
- **Top Hook Headline Pill Banners**:
  - Persistent or 4.5s opening frosted pill banners pinned at the top-third safe zone to maximize 3-second hook retention.
- **Simulated 2-Camera Multi-Cam Cuts**:
  - Automatically alternates between Shot A (Wide 1.0x) and Shot B (Tight Close-Up 1.24x) on natural sentence boundaries and cadence resets.
- **Local B-Roll & Visual Cutaways**:
  - Automatically detects topic keywords (money, tech, growth, mind, warning) and overlays visual cutaway clips with audio dialogue preservation.
- **🛡️ Anti-Copyright Transformative Engine**:
  - **Acoustic Fingerprint Defeat**: 1.025x micro-tempo shift (`atempo=1.025`) and microphone vocal EQ coloring (`highpass=75`, presence boost at 2.4 kHz) destroys acoustic waveform alignment.
  - **Visual Hashing Disruption**: 9:16 vertical crop (60% canvas altered), subtle contrast/saturation grading (`eq=contrast=1.04:saturation=1.06`), vignette, and multi-cam/B-roll cuts break continuous video sequence matching.
  - **Audio Layer Masking**: Procedural Lo-Fi background track with `sidechaincompress` auto-ducking creates a dual-layer harmonic waveform that frustrates single-voice Content ID detection.
- **📸 Viral Cover Thumbnail Extractor**:
  - Evaluates candidate frames for Laplacian sharpness and expressive facial engagement, stamping high-contrast title banners onto 9:16 cover JPEGs ready for upload.
- **⚡ Overnight Batch Folder Watcher**:
  - Dedicated background daemon (`cliplocal watch <folder>`) that monitors a directory, processes videos sequentially within memory bounds, and moves originals to `done/`.
- **Dynamic Punch-Ins (Auto-Zoom)**:
  - Automatic 1.15x close-up punch-ins on opening hook sentences and intermittent cadence resets every ~7 seconds.
- **Viral SFX & Background Music with Auto-Ducking**:
  - **Procedural 48kHz SFX**: Subtly mixes pops, whooshes, and dings on keywords and statistics.
  - **Smart Lo-Fi Background Music**: Includes a warm 60s ambient chord track automatically ducked (-18 dB) when the speaker talks and smoothly swelling during pauses via FFmpeg `sidechaincompress`.
- **Interactive Web Studio & CLI**:
  - **Screen 1**: Drop a video or paste a URL, configure parameters, and monitor live progress logs.
  - **Screen 2**: Browse ranked clips, inspect virality score breakdowns, and preview 9:16 video.
  - **Screen 3 (Clip Editor)**: Scrubber timeline with word-boundary snapping, autocut-style word deletion to trim video spans, and live re-rendering.
- **Optional Local LLM (Ollama)**:
  - Re-ranks candidates and generates titles, captions, and hashtags using local models (`llava:7b`, `llama3.2:3b`, `qwen2.5:7b`).
  - Memory-safe: unloads Whisper before prompting Ollama.
  - Pure heuristic fallback if LLM is toggled off or unavailable.

---

## System Requirements

- **macOS**: Apple Silicon M1 / M2 / M3 / M4 (16 GB Unified Memory recommended).
- **Windows**: Windows 10 or 11 (64-bit), 16 GB RAM recommended. NVIDIA GeForce / RTX GPU (NVENC acceleration) supported, with automatic CPU fallback.

---

## Quick Start (macOS)

### 1. Run Setup
The setup script verifies Homebrew, installs `uv`, links `ffmpeg-full` with `libass` and `h264_videotoolbox`, configures the Python virtual environment, and builds the frontend:

```bash
./setup.sh
```

### 2. Launch the Web Studio
Start the local server and open the studio in your browser (`http://127.0.0.1:8000`):

```bash
./run.sh
```

---

## Quick Start (Windows)

ClipLocal runs natively on Windows 10 & 11!

### 1. Prerequisites (One-Time)
Open **PowerShell** as Administrator or standard terminal and install `uv` and `ffmpeg` (Gyan.dev build with `libass`):

```powershell
# Install uv package manager
winget install --id=astral-sh.uv -e

# Install full FFmpeg (with libass subtitle and NVENC support)
winget install --id=Gyan.FFmpeg -e
```
*(Or install manually from https://docs.astral.sh/uv/ and https://www.gyan.dev/ffmpeg/builds/)*.

### 2. Run Setup
In the project directory, run the Windows setup script:

```cmd
setup.bat
```
*(This syncs Python 3.11 packages via `uv`, compiles the React Web UI, and generates the test fixture).*

### 3. Launch the Studio
Double-click `run.bat` or run:

```cmd
run.bat
```
This automatically launches the FastAPI studio and opens your default browser at `http://127.0.0.1:8000`.

> **Windows Tip**: On Windows, the transcription backend automatically defaults to `faster_whisper` (CPU int8 or NVIDIA CUDA), and video encoding uses NVIDIA NVENC (`h264_nvenc`) if present, or CPU `libx264`.

---

## CLI Usage

ClipLocal includes a full-featured CLI for terminal workflows:

```bash
# Process a local video or YouTube URL into 6 ranked shorts with Anti-Copyright & Multi-Cam
uv run cliplocal run /path/to/video.mp4 --clips 6 --style hormozi --anti-copyright --multicam --top-banner

# Run with Cyberpunk or Emerald Cash style and B-Roll cutaways
uv run cliplocal run fixtures/test_podcast_sample.mp4 --style cyberpunk --broll

# Overnight Batch Watcher: automatically process all videos dropped into a folder
uv run cliplocal watch ./incoming_videos/ --output ./output/ --clips 5 --anti-copyright

# Benchmark transcription backends on a sample audio file
uv run cliplocal benchmark fixtures/test_audio.wav
```

### CLI Flags

| Flag | Default | Description |
| :--- | :--- | :--- |
| `source` | *Required* | Path to local video file or YouTube URL |
| `--clips, -c` | `6` | Number of top viral clips to render |
| `--style, -s` | `hormozi` | Subtitle style: `hormozi`, `cyberpunk`, `emerald`, `fire`, `minimal`, `boxed`, `neon` |
| `--mode, -m` | `auto` | Reframing mode: `auto`, `center`, `blur_fill`, `face_follow` |
| `--anti-copyright` | `False` | Apply transformative tempo (1.025x), vocal EQ, visual grading, and harmonic music |
| `--multicam` | `True` | Simulate 2-camera studio setup (wide vs tight snap-cuts on sentence boundaries) |
| `--broll` | `False` | Insert visual B-roll cutaway overlays on topic keywords (dialogue preserved) |
| `--top-banner` | `True` | Pin high-retention hook headline pill banner at top safe area |
| `--backend, -b` | `mlx` | Whisper backend: `mlx`, `faster_whisper`, `whisper_cpp` |
| `--no-llm` | `True` | Disable Ollama LLM enhancement and use pure heuristics |

---

## Tuning Scoring Weights

All heuristic scoring parameters, hook patterns, emotion word banks, and penalties are config-driven and can be edited in `src/cliplocal/config/config.yaml`:

```yaml
scoring:
  weights:
    hook: 30.0        # Hook strength & opening question/claim
    acoustic: 20.0    # Audio energy variance & dynamic range
    pace: 15.0        # Speaking pace (WPM sweet spot: 120 - 175 WPM)
    payoff: 15.0      # Conclusive thought resolution
    sentiment: 10.0   # Emotional intensity & high-stakes keywords
    length_fit: 10.0  # Duration fit relative to target (42s)
  pace_wpm_optimal: [120, 175]
  banter_penalty: -25.0
  broken_start_penalty: -20.0
```

---

## Testing

Run the automated test suite covering sentence segmentation, candidate generation, heuristic virality scoring, deduplication, ASS subtitles, crop smoothing, active speaker hysteresis, jump-cut trimming, anti-copyright transformative filters, B-roll overlays, and batch processing:

```bash
uv run pytest tests/
```

All 39 unit and integration tests execute in under 12 seconds.

---

## Architecture & Decisions

Detailed architectural trade-offs, reference repository evaluations (`open-clip-studio`, `clip-forge`, `autocut`), and implementation decisions are documented in:
- [`docs/DECISIONS.md`](docs/DECISIONS.md)
- [`docs/PLAN.md`](docs/PLAN.md)

---

## License

This project is built strictly with permissive-licensed components (MIT, Apache-2.0, BSD). See individual component licenses in `docs/DECISIONS.md`.
