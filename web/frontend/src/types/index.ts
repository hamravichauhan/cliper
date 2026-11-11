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

export type CaptionStyle =
  | 'hormozi'
  | 'cyberpunk'
  | 'emerald'
  | 'fire'
  | 'minimal'
  | 'boxed'
  | 'neon'
  | 'mrbeast'

export interface CaptionStyleOption {
  id: CaptionStyle
  name: string
  subtitle: string
  desc: string
  primaryColor: string
  highlightColor: string
  outlineColor: string
  pill?: boolean
}

export const CAPTION_STYLE_OPTIONS: CaptionStyleOption[] = [
  {
    id: 'hormozi',
    name: 'Hormozi Bold',
    subtitle: 'Yellow Pop',
    desc: 'High-contrast yellow word pop with heavy black stroke',
    primaryColor: '#FFFFFF',
    highlightColor: '#FFEA00',
    outlineColor: '#000000'
  },
  {
    id: 'cyberpunk',
    name: 'Cyberpunk',
    subtitle: 'Cyan & Magenta',
    desc: 'Electric cyan highlight with magenta neon outline',
    primaryColor: '#FFFFFF',
    highlightColor: '#00F0FF',
    outlineColor: '#FF007F'
  },
  {
    id: 'emerald',
    name: 'Emerald Cash',
    subtitle: 'Mint Green',
    desc: 'Vibrant mint green pop with deep emerald shadow',
    primaryColor: '#FFFFFF',
    highlightColor: '#00FF88',
    outlineColor: '#0B3019'
  },
  {
    id: 'fire',
    name: 'Fire Drop',
    subtitle: 'Yellow & Red',
    desc: 'Blazing red-orange pop on bold yellow text body',
    primaryColor: '#FFFF00',
    highlightColor: '#FF2A00',
    outlineColor: '#000000'
  },
  {
    id: 'minimal',
    name: 'Minimalist',
    subtitle: 'Clean Blue',
    desc: 'Understated clean white text with soft sky-blue pop',
    primaryColor: '#FFFFFF',
    highlightColor: '#64B5F6',
    outlineColor: '#1E1E1E'
  },
  {
    id: 'boxed',
    name: 'Boxed Pill',
    subtitle: 'High Contrast',
    desc: 'Dark text inside vivid yellow pill bounding box',
    primaryColor: '#000000',
    highlightColor: '#000000',
    outlineColor: '#FFCC00',
    pill: true
  },
  {
    id: 'neon',
    name: 'Neon Glow',
    subtitle: 'Cyber Glow',
    desc: 'Intense cyan glow with glowing magenta shadow',
    primaryColor: '#FFFFFF',
    highlightColor: '#00F0FF',
    outlineColor: '#FF007F'
  }
]

export interface SongOption {
  id: string
  name: string
  genre: string
  desc: string
  bpm: number
  icon: string
}

export const SONG_PRESETS: SongOption[] = [
  {
    id: 'ambient_lofi',
    name: 'Chill Lo-Fi',
    genre: 'Lo-Fi / Chillhop',
    desc: 'Warm Rhodes chords and vinyl textures, perfect for wisdom & podcasts',
    bpm: 80,
    icon: '🎵'
  },
  {
    id: 'phonk_drift',
    name: 'Phonk Drift',
    genre: 'Drift Phonk / Gym',
    desc: 'Distorted 808 sub-bass with aggressive rhythm for viral gym & motivational shorts',
    bpm: 135,
    icon: '⚡'
  },
  {
    id: 'synthwave',
    name: 'Retro Synthwave',
    genre: 'Electronic / Synth',
    desc: 'Driving 80s bassline with melodic arpeggios for tech & gaming hooks',
    bpm: 115,
    icon: '🌌'
  },
  {
    id: 'cinematic',
    name: 'Cinematic Tension',
    genre: 'Suspense / Drama',
    desc: 'Deep sub-bass drone with rising string swells for dramatic payoffs',
    bpm: 90,
    icon: '🎬'
  },
  {
    id: 'tension_drone',
    name: 'Podcast Tension Drone',
    genre: 'Podcast / Suspense',
    desc: '40Hz sub-bass pulse & D-minor pad with 48 BPM heartbeat swell for debates & controversies',
    bpm: 72,
    icon: '🎙️'
  },
  {
    id: 'emotional_piano',
    name: 'Emotional Piano & Cello',
    genre: 'Podcast / Vulnerable',
    desc: 'Melancholic Am/F/C minor chords with warm sustained cello body for confessions & life lessons',
    bpm: 68,
    icon: '🎹'
  }
]

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
  captionStyle: CaptionStyle
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
  defaultStyle: CaptionStyle
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
