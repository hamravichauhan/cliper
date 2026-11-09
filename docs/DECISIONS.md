# ClipLocal Architecture & Technical Decisions

## 1. Reference Repositories Evaluation

### `open-clip-studio` (MIT)
- **Evaluation**: Employs a Node.js/Express server orchestrating separate Python scripts (`acoustic_analyzer.py`, `semantic_scorer.py`, `tracker_local.py`). The heuristic virality engine (`viralityService.js`) has well-crafted rules for short-form content: hook categories with boosts, emotion word banks, payoff/resolution patterns, WPM sweet spots (~115-180 WPM), dangling word checks, banter/setup penalties, and IoU-based candidate deduplication.
- **Decision**: Port and refine the heuristic scoring rules into clean, typed Python modules. Do not adopt the split Node-Python architecture. Keep all scoring weights and hook phrases editable in `config/config.yaml` so the user can easily tune virality signals.

### `clip-forge` (MIT)
- **Evaluation**: Electron/TypeScript desktop app with on-device AI pipelines. Features an export script for LR-ASD (IJCV 2025, MIT) to ONNX, bundled Silero-VAD, and a word-level ASS caption generator implementing the "Opus Clip" animated popping karaoke style (`\c`, `\fscx109`, `\bord10\3c`).
- **Decision**: Adopt the ASS karaoke generation technique in Python, supporting 4 distinct caption styles (Hormozi, Minimal, Boxed, Neon). Use MediaPipe for face tracking and Mouth-Aspect-Ratio (MAR) correlation for Phase 1 active speaker detection, and ONNX Runtime with CoreML execution provider for LR-ASD in Phase 2. Run speaker detection only on selected candidate clips for maximum speed.

### `autocut` (Apache-2.0)
- **Evaluation**: Uses transcript-based video trimming where deleting words in the transcript removes those video spans via FFmpeg filters.
- **Decision**: Integrate transcript-level word trimming into ClipLocal's clip editor (Screen 3): when words are marked deleted, the render engine generates trim spans and remaps caption timestamps automatically.

---

## 2. System Architecture & Constraints

- **Single-User, Offline Localhost**: Runs strictly on localhost (`127.0.0.1:8000`). No external cloud services, authentication, or telemetries.
- **Memory Management (16 GB M4)**:
  - Total Unified Memory: 16 GB.
  - Sequential pipeline execution: transcription model (Whisper) is unloaded from memory before any local LLM (Ollama) inference is executed.
  - Chunked video and audio processing: long videos (1-3 hours) are processed via streaming FFmpeg pipelines without loading raw video frames into memory.
  - Video caching: intermediate artifacts (extracted audio, transcripts, candidate windows, face tracking data) are cached by SHA-256 hash in `.cache/` to ensure re-runs and parameter changes are instant.
- **Hardware Acceleration**:
  - Transcode/Render: `h264_videotoolbox` on macOS with fallback to `libx264`. Audio normalization via FFmpeg `loudnorm`.
  - Subtitles: Rendered using FFmpeg's `libass` / `ass` filter with custom font styling.
  - Neural inference: Metal Performance Shaders (MPS) for PyTorch / MLX, and CoreMLExecutionProvider for ONNX Runtime.

---

## 3. Tech Stack

| Component | Choice | Reason |
| :--- | :--- | :--- |
| **Language & Environment** | Python 3.11+ with `uv` | High performance, instant virtualenvs, reproducible lockfiles |
| **Backend Framework** | FastAPI + Uvicorn | Async performance, auto OpenAPI docs, typed Pydantic v2 schemas |
| **Job Queue & State** | In-process Async Queue + SQLite | Zero external daemon overhead (no Redis/Celery required) |
| **ASR (Transcription)** | Benchmarked configurable backends (`mlx-whisper`, `whisper.cpp`, `faster-whisper`) | Apple Silicon optimization with word-level timestamps |
| **Audio Analysis** | `librosa` + `soundfile` + `numpy` | Pitch variation, energy peaks, speaking rate, silence boundaries |
| **Face & Speaker** | MediaPipe Face Mesh + ONNX Runtime (CoreML) + PySceneDetect | Lightweight, high-accuracy face tracking, MAR speaker detection, scene cut awareness |
| **Captions** | Custom ASS generator + FFmpeg libass | Exact word timing, popping karaoke effect, custom fonts and colors |
| **Frontend** | React 18 + Vite + Tailwind CSS | Fast, clean, dark-themed UI with timeline scrubber and preview player |
| **Local LLM** | Ollama (~7-8B or 3B instruct) | Optional enhancement for title generation & candidate re-ranking; heuristic fallback |
