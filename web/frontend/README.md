# ClipLocal Frontend Studio — API Integration Guide

ClipLocal's frontend is designed local-first with a calm, dark Linear/Raycast aesthetic. It runs completely offline with realistic mock data out of the box, and seamlessly binds to the local FastAPI backend.

---

## 🎨 Design Tokens

- **Background Canvas**: `#09090B` (`var(--bg)`)
- **Surface**: `#111113` (`var(--surface)`)
- **Elevated Controls**: `#18181B` (`var(--elevated)`)
- **1px Border**: `#27272A` (`var(--border)`)
- **Text Primary**: `#FAFAFA` (`var(--text-primary)`)
- **Text Secondary**: `#A1A1AA` (`var(--text-secondary)`)
- **Text Muted**: `#71717A` (`var(--text-muted)`)
- **Accent (Lime)**: `#A3E635` (`var(--accent)`) — Used for 80+ virality scores, primary CTAs, active states
- **Warning (Amber)**: `#F59E0B` (`var(--warning)`) — 60–79 virality score
- **Success (Green)**: `#22C55E` (`var(--success)`) — Approved clips, healthy workers
- **Danger (Red)**: `#EF4444` (`var(--danger)`) — Rejected clips, error states

---

## 🔌 API Endpoint Mapping by Screen

| Screen | Primary Backend Endpoint | HTTP Method | Payload / Response |
|---|---|---|---|
| **Engine Health (Sidebar)** | `/api/health` | `GET` | Returns Metal GPU device, Whisper model, Ollama status, active workers |
| **1. Home / Dashboard** | `/api/analytics` & `/api/jobs` | `GET` | Aggregated KPIs (hours saved, clips produced, storage) and recent jobs |
| **2. New Project (Ingest)** | `/api/jobs` | `POST` | `multipart/form-data` with `file` or `url`, `rights_confirmed: true`, pipeline settings |
| **3. Processing (Live)** | `/api/jobs/{job_id}` | `GET` (poll or SSE) | Live stage progress (`0-100%`), ETA, live terminal logs |
| **4. Clip Review Studio** | `/api/jobs/{job_id}` | `GET` | Full candidate clip breakdown, word timestamps, 6-factor scores |
| **4. Clip Review (Re-render)** | `/api/clips/re-render` | `POST` | `{"clip_id": "...", "start": 142.0, "end": 184.5, "title": "...", "caption_style": "hormozi"}` |
| **4. Bulk Export** | `/api/jobs/{job_id}/delivery` | `GET` | Streams `.zip` containing 9:16 MP4s, transformation log JSON, and metadata |
| **5. Projects Tracker** | `/api/jobs` | `GET`, `DELETE` | List, retry, cancel, or delete jobs |
| **6. Library** | `/api/clips` | `GET` | List all finished clips across projects |
| **7. Brand Kits** | `/api/brand-kits` | `GET`, `POST`, `PUT` | Store client logos, typography, watermarks, caption presets |
| **8. Schedule Engine** | `/api/schedule/export-csv` | `POST` | Generates 30-day CSV formatted for Meta Business Suite & Buffer |
| **9. Settings** | `/api/config` | `GET`, `POST` | Hardware encoding flags, model weights, cache purge trigger |

---

## ⌨️ Desktop Keyboard Bindings

- `J` / `K`: Navigate to next / previous clip
- `Space`: Toggle 9:16 video playback
- `A`: Approve current clip for export
- `R`: Reject current clip
- `E`: Export all approved clips
- `⌘ + K`: Open Command Palette
- `?`: Open Keyboard Shortcuts Cheat Sheet
- `⌘ + Z`: Undo boundary trim or headline edit
