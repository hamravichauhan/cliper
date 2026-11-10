export type ViralityFactor = 'hook' | 'acoustics' | 'pace' | 'payoff' | 'sentiment' | 'duration'

export interface ScoreFactors {
  hook: number        // 0 - 100 (Weight: 30%)
  acoustics: number   // 0 - 100 (Weight: 20%)
  pace: number        // 0 - 100 (Weight: 15%)
  payoff: number      // 0 - 100 (Weight: 15%)
  sentiment: number   // 0 - 100 (Weight: 10%)
  duration: number    // 0 - 100 (Weight: 10%)
}

export interface WordTimestamp {
  id: number
  word: string
  start: number
  end: number
  deleted?: boolean
}

export type ClipStatus = 'pending' | 'approved' | 'rejected'

export interface ClipSocialCopy {
  youtubeTitle: string
  youtubeDescription: string
  youtubeTags: string[]
  instagramCaption: string
  hashtags: string[]
}

export interface Clip {
  id: string
  index: number
  title: string               // Spoken Context Headline (e.g. "Why 99% of people fail in year one")
  startTime: number           // in seconds
  endTime: number             // in seconds
  duration: number            // in seconds
  viralityScore: number       // 0 - 100
  factors: ScoreFactors
  status: ClipStatus
  thumbnailUrl: string
  videoUrl?: string
  words: WordTimestamp[]
  fullText: string
  captionStyle: 'hormozi' | 'mrbeast' | 'alex' | 'cyberpunk' | 'minimal'
  copy: ClipSocialCopy
  brandKitId?: string
  watermarkHandle?: string
  narrativeFlags: {
    sponsorshipRisk: number   // 0.0 - 1.0
    fillersScrubbed: number
    silenceSnappedMs: number
  }
}

export interface BrandKit {
  id: string
  name: string
  clientName: string
  handle: string
  primaryColor: string
  highlightColor: string
  fontFamily: string
  logoUrl?: string
  defaultStyle: 'hormozi' | 'mrbeast' | 'alex' | 'cyberpunk' | 'minimal'
}

export interface Project {
  id: string
  title: string
  source: string              // file name or YouTube URL
  sourceType: 'upload' | 'youtube' | 'channel'
  rightsConfirmed: boolean
  status: 'processing' | 'completed' | 'failed'
  createdAt: string
  durationSec: number
  clipsCount: number
  avgScore: number
  thumbnailUrl: string
  clips: Clip[]
}

export interface EngineHealth {
  metalAccelerated: boolean
  metalDeviceName: string
  whisperModel: string
  whisperDevice: string
  ollamaAvailable: boolean
  ollamaModel: string
  circuitBreakerState: 'CLOSED' | 'HALF_OPEN' | 'OPEN'
  activeWorkers: number
  maxWorkers: number
  ramAvailableGb: number
}
