import { Clip, Project, BrandKit, EngineHealth } from '../types'

export const mockBrandKits: BrandKit[] = [
  {
    id: 'bk-1',
    name: 'Alex Hormozi Style',
    clientName: 'Acquisition.com',
    handle: '@alexhormozi',
    primaryColor: '#FFFFFF',
    highlightColor: '#FACC15',
    fontFamily: 'Montserrat',
    defaultStyle: 'hormozi'
  },
  {
    id: 'bk-2',
    name: 'Tech Minimalist',
    clientName: 'MKBHD Clips',
    handle: '@mkbhd',
    primaryColor: '#FAFAFA',
    highlightColor: '#EF4444',
    fontFamily: 'Inter',
    defaultStyle: 'minimal'
  },
  {
    id: 'bk-3',
    name: 'Cyberpunk High-Octane',
    clientName: 'Founders Podcast',
    handle: '@foundersfm',
    primaryColor: '#00F0FF',
    highlightColor: '#FFE600',
    fontFamily: 'Inter',
    defaultStyle: 'cyberpunk'
  }
]

export const mockClips: Clip[] = [
  {
    id: 'clip-01',
    index: 1,
    title: 'Why 99% Of People Never Make Money',
    startTime: 142.0,
    endTime: 184.5,
    duration: 42.5,
    viralityScore: 92,
    factors: {
      hook: 96,
      acoustics: 91,
      pace: 88,
      payoff: 94,
      sentiment: 85,
      duration: 90
    },
    status: 'approved',
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
    words: [
      { id: 1, word: "The", start: 0.0, end: 0.2 },
      { id: 2, word: "reason", start: 0.2, end: 0.6 },
      { id: 3, word: "most", start: 0.6, end: 0.9 },
      { id: 4, word: "people", start: 0.9, end: 1.3 },
      { id: 5, word: "fail", start: 1.3, end: 1.8 },
      { id: 6, word: "is", start: 1.9, end: 2.1 },
      { id: 7, word: "not", start: 2.1, end: 2.4 },
      { id: 8, word: "lack", start: 2.4, end: 2.7 },
      { id: 9, word: "of", start: 2.7, end: 2.9 },
      { id: 10, word: "talent.", start: 2.9, end: 3.5 },
      { id: 11, word: "It's", start: 3.7, end: 4.0 },
      { id: 12, word: "because", start: 4.0, end: 4.4 },
      { id: 13, word: "they", start: 4.4, end: 4.6 },
      { id: 14, word: "switch", start: 4.6, end: 5.0 },
      { id: 15, word: "vehicles", start: 5.0, end: 5.5 },
      { id: 16, word: "every", start: 5.6, end: 6.0 },
      { id: 17, word: "six", start: 6.0, end: 6.3 },
      { id: 18, word: "months.", start: 6.3, end: 6.9 },
      { id: 19, word: "If", start: 7.2, end: 7.4 },
      { id: 20, word: "you", start: 7.4, end: 7.6 },
      { id: 21, word: "dig", start: 7.6, end: 7.9 },
      { id: 22, word: "ten", start: 8.0, end: 8.3 },
      { id: 23, word: "shallow", start: 8.3, end: 8.8 },
      { id: 24, word: "holes,", start: 8.8, end: 9.3 },
      { id: 25, word: "you", start: 9.6, end: 9.8 },
      { id: 26, word: "never", start: 9.8, end: 10.2 },
      { id: 27, word: "find", start: 10.2, end: 10.5 },
      { id: 28, word: "water.", start: 10.5, end: 11.2 },
      { id: 29, word: "You", start: 11.6, end: 11.8 },
      { id: 30, word: "have", start: 11.8, end: 12.1 },
      { id: 31, word: "to", start: 12.1, end: 12.3 },
      { id: 32, word: "pick", start: 12.3, end: 12.6 },
      { id: 33, word: "one", start: 12.6, end: 12.9 },
      { id: 34, word: "thing,", start: 12.9, end: 13.5 },
      { id: 35, word: "execute", start: 13.8, end: 14.3 },
      { id: 36, word: "relentlessly,", start: 14.3, end: 15.2 },
      { id: 37, word: "and", start: 15.5, end: 15.7 },
      { id: 38, word: "outlast", start: 15.7, end: 16.3 },
      { id: 39, word: "everyone.", start: 16.3, end: 17.2 }
    ],
    fullText: "The reason most people fail is not lack of talent. It's because they switch vehicles every six months. If you dig ten shallow holes, you never find water. You have to pick one thing, execute relentlessly, and outlast everyone.",
    captionStyle: 'hormozi',
    brandKitId: 'bk-1',
    watermarkHandle: '@alexhormozi',
    copy: {
      youtubeTitle: "The Real Reason 99% Of People Stay Broke #shorts",
      youtubeDescription: "Alex Hormozi breaks down why constantly switching business ideas kills your success. Focus on one vehicle until it works.\n\nSubscribe for daily business frameworks.",
      youtubeTags: ["alex hormozi", "business advice", "entrepreneurship", "focus", "wealth mindset"],
      instagramCaption: "Stop digging 10 shallow holes. Pick one spot and dig until you strike gold. Discipline beats novelty every single time. 🔥",
      hashtags: ["#AlexHormozi", "#Discipline", "#Entrepreneurship", "#Focus", "#WealthBuilding", "#MindsetShift"]
    },
    narrativeFlags: {
      sponsorshipRisk: 0.0,
      fillersScrubbed: 3,
      silenceSnappedMs: 140
    }
  },
  {
    id: 'clip-02',
    index: 2,
    title: 'The Uncomfortable Truth About High Performers',
    startTime: 412.0,
    endTime: 449.0,
    duration: 37.0,
    viralityScore: 86,
    factors: {
      hook: 92,
      acoustics: 84,
      pace: 89,
      payoff: 87,
      sentiment: 78,
      duration: 85
    },
    status: 'pending',
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    words: [
      { id: 1, word: "Nobody", start: 0.0, end: 0.4 },
      { id: 2, word: "talks", start: 0.4, end: 0.7 },
      { id: 3, word: "about", start: 0.7, end: 1.0 },
      { id: 4, word: "the", start: 1.0, end: 1.2 },
      { id: 5, word: "isolation", start: 1.2, end: 1.8 },
      { id: 6, word: "at", start: 1.8, end: 2.0 },
      { id: 7, word: "the", start: 2.0, end: 2.2 },
      { id: 8, word: "very", start: 2.2, end: 2.5 },
      { id: 9, word: "top.", start: 2.5, end: 3.1 },
      { id: 10, word: "When", start: 3.4, end: 3.7 },
      { id: 11, word: "you", start: 3.7, end: 3.9 },
      { id: 12, word: "outpace", start: 3.9, end: 4.4 },
      { id: 13, word: "your", start: 4.4, end: 4.7 },
      { id: 14, word: "peer", start: 4.7, end: 5.0 },
      { id: 15, word: "group,", start: 5.0, end: 5.6 },
      { id: 16, word: "you", start: 5.8, end: 6.0 },
      { id: 17, word: "lose", start: 6.0, end: 6.4 },
      { id: 18, word: "friends.", start: 6.4, end: 7.1 }
    ],
    fullText: "Nobody talks about the isolation at the very top. When you outpace your peer group, you lose friends.",
    captionStyle: 'minimal',
    brandKitId: 'bk-2',
    watermarkHandle: '@mkbhd',
    copy: {
      youtubeTitle: "What Nobody Tells You About Reaching The Top #shorts",
      youtubeDescription: "Success requires leaving comfort zones, which often means leaving old circles behind.",
      youtubeTags: ["productivity", "mindset", "success", "isolation", "motivation"],
      instagramCaption: "Growth can be lonely, but staying stagnant is far more painful in the long run.",
      hashtags: ["#HighPerformance", "#Solitude", "#GrowthMindset", "#Ambition"]
    },
    narrativeFlags: {
      sponsorshipRisk: 0.0,
      fillersScrubbed: 1,
      silenceSnappedMs: 220
    }
  },
  {
    id: 'clip-03',
    index: 3,
    title: 'How To Get 10 Hours Of Work Done In 3 Hours',
    startTime: 780.0,
    endTime: 818.0,
    duration: 38.0,
    viralityScore: 79,
    factors: {
      hook: 82,
      acoustics: 75,
      pace: 81,
      payoff: 78,
      sentiment: 72,
      duration: 86
    },
    status: 'pending',
    thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    words: [
      { id: 1, word: "If", start: 0.0, end: 0.2 },
      { id: 2, word: "you", start: 0.2, end: 0.4 },
      { id: 3, word: "eliminate", start: 0.4, end: 0.9 },
      { id: 4, word: "notifications", start: 0.9, end: 1.6 },
      { id: 5, word: "for", start: 1.6, end: 1.8 },
      { id: 6, word: "just", start: 1.8, end: 2.1 },
      { id: 7, word: "one", start: 2.1, end: 2.4 },
      { id: 8, word: "morning,", start: 2.4, end: 3.0 },
      { id: 9, word: "your", start: 3.2, end: 3.4 },
      { id: 10, word: "output", start: 3.4, end: 3.8 },
      { id: 11, word: "quadruples.", start: 3.8, end: 4.5 }
    ],
    fullText: "If you eliminate notifications for just one morning, your output quadruples.",
    captionStyle: 'cyberpunk',
    brandKitId: 'bk-3',
    watermarkHandle: '@foundersfm',
    copy: {
      youtubeTitle: "The 3-Hour Deep Work Protocol #shorts",
      youtubeDescription: "How cutting notifications before noon doubles your weekly output.",
      youtubeTags: ["deep work", "focus", "time management", "productivity hack"],
      instagramCaption: "Distraction is the silent killer of compounding results. Protect your mornings.",
      hashtags: ["#DeepWork", "#FocusHacks", "#Output", "#CalNewport"]
    },
    narrativeFlags: {
      sponsorshipRisk: 0.0,
      fillersScrubbed: 4,
      silenceSnappedMs: 90
    }
  },
  {
    id: 'clip-04',
    index: 4,
    title: 'The 3-Second Rule That Saves Failing Startups',
    startTime: 1120.0,
    endTime: 1152.0,
    duration: 32.0,
    viralityScore: 68,
    factors: {
      hook: 71,
      acoustics: 69,
      pace: 65,
      payoff: 70,
      sentiment: 66,
      duration: 68
    },
    status: 'pending',
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    words: [
      { id: 1, word: "Whenever", start: 0.0, end: 0.4 },
      { id: 2, word: "a", start: 0.4, end: 0.5 },
      { id: 3, word: "customer", start: 0.5, end: 1.0 },
      { id: 4, word: "complains,", start: 1.0, end: 1.6 },
      { id: 5, word: "you", start: 1.8, end: 2.0 },
      { id: 6, word: "have", start: 2.0, end: 2.2 },
      { id: 7, word: "three", start: 2.2, end: 2.5 },
      { id: 8, word: "seconds", start: 2.5, end: 2.9 },
      { id: 9, word: "to", start: 2.9, end: 3.1 },
      { id: 10, word: "listen", start: 3.1, end: 3.6 }
    ],
    fullText: "Whenever a customer complains, you have three seconds to listen without defending yourself.",
    captionStyle: 'mrbeast',
    brandKitId: 'bk-1',
    watermarkHandle: '@alexhormozi',
    copy: {
      youtubeTitle: "How Great Founders Handle Negative Feedback #shorts",
      youtubeDescription: "Never defend your product when a user gives honest criticism.",
      youtubeTags: ["startups", "customer feedback", "product management"],
      instagramCaption: "Listen before you defend. The customer's pain is your roadmap.",
      hashtags: ["#StartupLessons", "#CustomerFeedback", "#ProductMarketFit"]
    },
    narrativeFlags: {
      sponsorshipRisk: 0.05,
      fillersScrubbed: 2,
      silenceSnappedMs: 160
    }
  },
  {
    id: 'clip-05',
    index: 5,
    title: 'Why Cheaper Products Are Actually Harder To Sell',
    startTime: 1540.0,
    endTime: 1579.0,
    duration: 39.0,
    viralityScore: 54,
    factors: {
      hook: 56,
      acoustics: 58,
      pace: 52,
      payoff: 55,
      sentiment: 50,
      duration: 53
    },
    status: 'rejected',
    thumbnailUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80',
    words: [
      { id: 1, word: "Low", start: 0.0, end: 0.3 },
      { id: 2, word: "prices", start: 0.3, end: 0.7 },
      { id: 3, word: "attract", start: 0.7, end: 1.1 },
      { id: 4, word: "high", start: 1.1, end: 1.4 },
      { id: 5, word: "maintenance", start: 1.4, end: 2.0 },
      { id: 6, word: "buyers.", start: 2.0, end: 2.6 }
    ],
    fullText: "Low prices attract high maintenance buyers. When you raise prices, customer satisfaction goes up.",
    captionStyle: 'minimal',
    brandKitId: 'bk-2',
    watermarkHandle: '@alexhormozi',
    copy: {
      youtubeTitle: "Why You Should Double Your Prices Today #shorts",
      youtubeDescription: "Counter-intuitively, cheap products produce the most refunds.",
      youtubeTags: ["pricing", "business strategy", "sales"],
      instagramCaption: "Price is a perception of value. When you discount, you diminish the perceived transformation.",
      hashtags: ["#PricingStrategy", "#SalesTips", "#B2B"]
    },
    narrativeFlags: {
      sponsorshipRisk: 0.1,
      fillersScrubbed: 5,
      silenceSnappedMs: 310
    }
  }
]

export const mockProjects: Project[] = [
  {
    id: 'proj-01',
    title: 'Alex Hormozi — $100M Masterclass (Full Keynote)',
    source: 'hormozi_full_keynote_4k.mp4',
    sourceType: 'upload',
    rightsConfirmed: true,
    status: 'completed',
    createdAt: '2026-11-09T18:30:00Z',
    durationSec: 3740,
    clipsCount: 5,
    avgScore: 84,
    thumbnailUrl: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80',
    clips: mockClips
  },
  {
    id: 'proj-02',
    title: 'MKBHD — Apple Vision Pro 6 Months Later',
    source: 'https://youtube.com/watch?v=mkbhd_visionpro',
    sourceType: 'youtube',
    rightsConfirmed: true,
    status: 'completed',
    createdAt: '2026-11-08T14:15:00Z',
    durationSec: 1420,
    clipsCount: 4,
    avgScore: 88,
    thumbnailUrl: 'https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?w=600&auto=format&fit=crop&q=80',
    clips: []
  },
  {
    id: 'proj-03',
    title: 'Huberman Lab — Dopamine & Focus Masterclass',
    source: 'huberman_ep84_dopamine.mp4',
    sourceType: 'upload',
    rightsConfirmed: true,
    status: 'processing',
    createdAt: '2026-11-10T09:40:00Z',
    durationSec: 7200,
    clipsCount: 8,
    avgScore: 0,
    thumbnailUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&auto=format&fit=crop&q=80',
    clips: []
  },
  {
    id: 'proj-04',
    title: 'All-In Podcast — State of AI & Tech Capital',
    source: 'https://youtube.com/watch?v=allin_e192',
    sourceType: 'youtube',
    rightsConfirmed: true,
    status: 'completed',
    createdAt: '2026-11-06T11:20:00Z',
    durationSec: 4980,
    clipsCount: 6,
    avgScore: 79,
    thumbnailUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=80',
    clips: []
  },
  {
    id: 'proj-05',
    title: 'Lex Fridman Podcast #420 — Sam Altman Interview',
    source: 'lex_sam_altman.mp4',
    sourceType: 'upload',
    rightsConfirmed: true,
    status: 'failed',
    createdAt: '2026-11-05T08:10:00Z',
    durationSec: 10800,
    clipsCount: 0,
    avgScore: 0,
    thumbnailUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    clips: []
  }
]

export const mockEngineHealth: EngineHealth = {
  metalAccelerated: true,
  metalDeviceName: 'Apple M4 Pro (Unified Memory)',
  whisperModel: 'mlx-community/whisper-large-v3-turbo',
  whisperDevice: 'Metal / GPU FP16',
  ollamaAvailable: true,
  ollamaModel: 'llama3.2:latest',
  circuitBreakerState: 'CLOSED',
  activeWorkers: 3,
  maxWorkers: 3,
  ramAvailableGb: 22.4
}
