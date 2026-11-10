from __future__ import annotations
from enum import Enum
from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class ReframeMode(str, Enum):
    CENTER = "center"
    BLUR_FILL = "blur_fill"
    FACE_FOLLOW = "face_follow"
    ACTIVE_SPEAKER = "active_speaker"
    SPLIT_STACKED = "split_stacked"
    AUTO = "auto"

class CaptionStyleName(str, Enum):
    HORMOZI = "hormozi"
    MINIMAL = "minimal"
    BOXED = "boxed"
    NEON = "neon"
    CYBERPUNK = "cyberpunk"
    EMERALD = "emerald"
    FIRE = "fire"

class Word(BaseModel):
    word: str
    start: float
    end: float
    probability: float = 1.0

class Sentence(BaseModel):
    index: int
    start: float
    end: float
    text: str
    words: List[Word]
    has_terminal_punct: bool = True
    dangling_end: bool = False

class Transcript(BaseModel):
    language: str = "en"
    duration: float = 0.0
    text: str = ""
    words: List[Word] = Field(default_factory=list)
    sentences: List[Sentence] = Field(default_factory=list)

class VideoMetadata(BaseModel):
    file_path: str
    file_hash: str
    duration: float
    width: int
    height: int
    fps: float
    video_codec: str
    audio_codec: Optional[str] = None
    audio_sample_rate: int = 44100
    audio_channels: int = 2
    file_size_bytes: int = 0

class ScoreBreakdown(BaseModel):
    total_score: float = Field(0.0, ge=0.0, le=100.0)
    hook_score: float = 0.0
    acoustic_score: float = 0.0
    pace_score: float = 0.0
    payoff_score: float = 0.0
    sentiment_score: float = 0.0
    length_score: float = 0.0
    penalties: float = 0.0
    hook_type: Optional[str] = None
    hook_reason: Optional[str] = None
    words_per_minute: float = 0.0
    energy_variance: float = 0.0

class CandidateClip(BaseModel):
    clip_id: str
    index: int
    start: float
    end: float
    duration: float
    text: str
    words: List[Word] = Field(default_factory=list)
    sentences: List[Sentence] = Field(default_factory=list)
    score: ScoreBreakdown
    title: str = "Engaging Moment"
    caption: str = ""
    hashtags: List[str] = Field(default_factory=list)
    reframe_mode: ReframeMode = ReframeMode.AUTO
    caption_style: CaptionStyleName = CaptionStyleName.HORMOZI
    output_path: Optional[str] = None
    thumbnails: List[str] = Field(default_factory=list)
    top_banner: bool = True
    multicam: bool = True
    anti_copyright: bool = False
    broll: bool = False

class JobStatus(str, Enum):
    QUEUED = "queued"
    INGESTING = "ingesting"
    TRANSCRIBING = "transcribing"
    SEGMENTING = "segmenting"
    SCORING = "scoring"
    RERANKING = "reranking"
    RENDERING = "rendering"
    COMPLETED = "completed"
    FAILED = "failed"
    CANCELLED = "cancelled"

class JobState(BaseModel):
    job_id: str
    created_at: float
    source_url_or_path: str
    status: JobStatus = JobStatus.QUEUED
    progress: float = 0.0
    stage: str = "Initialized"
    log_messages: List[str] = Field(default_factory=list)
    error_message: Optional[str] = None
    metadata: Optional[VideoMetadata] = None
    transcript: Optional[Transcript] = None
    candidates: List[CandidateClip] = Field(default_factory=list)
    timing_report: Dict[str, float] = Field(default_factory=dict)
