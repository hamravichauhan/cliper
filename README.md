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
  - High-retention word-by-word popping highlights (Hormozi style, Minimalist, Boxed pill, and Neon glow).
  - **Contextual Animated Emojis**: Automatic emoji injection above viral trigger words (e.g. 💰, 🔥, 🤫, 🛑, 🚀, 💡).
  - Safe-area margin compliance for TikTok, Reels, and Shorts.
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

- **Operating System**: macOS (Apple Silicon M1/M2/M3/M4)
- **Memory**: 16 GB Unified Memory (or higher)
- **Prerequisites**: [Homebrew](https://brew.sh) and Python 3.11+

---

## Quick Start

### 1. Run Setup
The single setup script verifies Homebrew, installs `uv`, links `ffmpeg-full` with `libass` and `h264_videotoolbox`, configures the Python virtual environment, and builds the frontend:

```bash
./setup.sh
```

### 2. Launch the Web Studio
Start the local server and open the studio in your browser (`http://127.0.0.1:8000`):

```bash
./run.sh
```

---

## CLI Usage

ClipLocal includes a full-featured CLI for terminal workflows:

```bash
# Process a local video or YouTube URL into 6 ranked shorts
uv run cliplocal run /path/to/video.mp4 --clips 6 --style hormozi --mode auto

# Process a YouTube URL without LLM re-ranking (pure heuristics)
uv run cliplocal run "https://www.youtube.com/watch?v=..." --clips 5 --no-llm

# Run with specific caption style (hormozi | minimal | boxed | neon)
uv run cliplocal run fixtures/test_podcast_sample.mp4 --style neon --mode blur_fill

# Benchmark transcription backends on a sample audio file
uv run cliplocal benchmark fixtures/test_audio.wav
```

### CLI Flags

| Flag | Default | Description |
| :--- | :--- | :--- |
| `source` | *Required* | Path to local video file or YouTube URL |
| `--clips, -c` | `6` | Number of top viral clips to render |
| `--style, -s` | `hormozi` | Subtitle style: `hormozi`, `minimal`, `boxed`, `neon` |
| `--mode, -m` | `center` | Reframing mode: `center`, `blur_fill`, `face_follow`, `auto` |
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

Run the automated test suite covering sentence segmentation, candidate generation, heuristic virality scoring, deduplication, ASS subtitles, crop smoothing, active speaker hysteresis, and jump-cut trimming:

```bash
uv run pytest tests/
```

All 20 unit tests execute in under 1 second.

---

## Architecture & Decisions

Detailed architectural trade-offs, reference repository evaluations (`open-clip-studio`, `clip-forge`, `autocut`), and implementation decisions are documented in:
- [`docs/DECISIONS.md`](docs/DECISIONS.md)
- [`docs/PLAN.md`](docs/PLAN.md)

---

## License

This project is built strictly with permissive-licensed components (MIT, Apache-2.0, BSD). See individual component licenses in `docs/DECISIONS.md`.
