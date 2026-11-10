import { Clip, Project, BrandKit, EngineHealth } from '../types'

export const mockBrandKits: BrandKit[] = [
  {
    "id": "bk-rogan",
    "name": "Joe Rogan Podcast",
    "clientName": "Joe Rogan",
    "handle": "@joerogan",
    "primaryColor": "#FAFAFA",
    "highlightColor": "#FACC15",
    "fontFamily": "Montserrat",
    "defaultStyle": "hormozi"
  },
  {
    "id": "bk-aakash",
    "name": "Aakash Gupta Comedy",
    "clientName": "Aakash Gupta",
    "handle": "@aakashgupta",
    "primaryColor": "#FFFFFF",
    "highlightColor": "#FFE600",
    "fontFamily": "Montserrat",
    "defaultStyle": "hormozi"
  },
  {
    "id": "bk-mrbeast",
    "name": "MrBeast Challenges",
    "clientName": "MrBeast",
    "handle": "@mrbeast",
    "primaryColor": "#00F0FF",
    "highlightColor": "#FFE600",
    "fontFamily": "Inter",
    "defaultStyle": "mrbeast"
  }
];

export const mockClips: Clip[] = [
  {
    "id": "proj-rogan-1",
    "index": 1,
    "title": "There's no longer one guy like a Walter Cronkite",
    "startTime": 3520.76,
    "endTime": 3563.46,
    "duration": 42.7,
    "viralityScore": 84,
    "factors": {
      "hook": 100,
      "acoustics": 86,
      "pace": 100,
      "payoff": 65,
      "sentiment": 20,
      "duration": 98
    },
    "status": "approved",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_01_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_01_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "There's",
        "start": 0.0,
        "end": 0.44
      },
      {
        "id": 2,
        "word": "no",
        "start": 0.44,
        "end": 0.56
      },
      {
        "id": 3,
        "word": "longer",
        "start": 0.56,
        "end": 0.8
      },
      {
        "id": 4,
        "word": "one",
        "start": 0.8,
        "end": 1.1
      },
      {
        "id": 5,
        "word": "guy",
        "start": 1.1,
        "end": 1.38
      },
      {
        "id": 6,
        "word": "like",
        "start": 1.38,
        "end": 1.58
      },
      {
        "id": 7,
        "word": "a",
        "start": 1.58,
        "end": 1.68
      },
      {
        "id": 8,
        "word": "Walter",
        "start": 1.68,
        "end": 1.92
      },
      {
        "id": 9,
        "word": "Cronkite",
        "start": 1.92,
        "end": 2.46
      },
      {
        "id": 10,
        "word": "that",
        "start": 2.46,
        "end": 2.62
      },
      {
        "id": 11,
        "word": "everyone's",
        "start": 2.62,
        "end": 2.96
      },
      {
        "id": 12,
        "word": "going",
        "start": 2.96,
        "end": 3.04
      },
      {
        "id": 13,
        "word": "to",
        "start": 3.04,
        "end": 3.1
      },
      {
        "id": 14,
        "word": "listen",
        "start": 3.1,
        "end": 3.32
      },
      {
        "id": 15,
        "word": "to.",
        "start": 3.32,
        "end": 3.54
      },
      {
        "id": 16,
        "word": "It's",
        "start": 3.72,
        "end": 4.16
      },
      {
        "id": 17,
        "word": "now",
        "start": 4.16,
        "end": 4.32
      },
      {
        "id": 18,
        "word": "all",
        "start": 4.32,
        "end": 4.48
      },
      {
        "id": 19,
        "word": "just",
        "start": 4.48,
        "end": 4.6
      },
      {
        "id": 20,
        "word": "shock",
        "start": 4.6,
        "end": 4.88
      },
      {
        "id": 21,
        "word": "troops",
        "start": 4.88,
        "end": 5.14
      },
      {
        "id": 22,
        "word": "fighting",
        "start": 5.14,
        "end": 5.5
      },
      {
        "id": 23,
        "word": "wars",
        "start": 5.5,
        "end": 5.86
      },
      {
        "id": 24,
        "word": "with",
        "start": 5.86,
        "end": 6.0
      },
      {
        "id": 25,
        "word": "each",
        "start": 6.0,
        "end": 6.14
      },
      {
        "id": 26,
        "word": "other.",
        "start": 6.14,
        "end": 6.34
      },
      {
        "id": 27,
        "word": "How",
        "start": 6.96,
        "end": 7.18
      },
      {
        "id": 28,
        "word": "does",
        "start": 7.18,
        "end": 7.32
      },
      {
        "id": 29,
        "word": "this",
        "start": 7.32,
        "end": 7.44
      },
      {
        "id": 30,
        "word": "play",
        "start": 7.44,
        "end": 7.66
      },
      {
        "id": 31,
        "word": "out?",
        "start": 7.66,
        "end": 7.96
      },
      {
        "id": 32,
        "word": "Have",
        "start": 8.68,
        "end": 9.24
      },
      {
        "id": 33,
        "word": "you",
        "start": 9.24,
        "end": 9.32
      },
      {
        "id": 34,
        "word": "thought",
        "start": 9.32,
        "end": 9.48
      },
      {
        "id": 35,
        "word": "about",
        "start": 9.48,
        "end": 9.66
      },
      {
        "id": 36,
        "word": "it?",
        "start": 9.66,
        "end": 9.82
      },
      {
        "id": 37,
        "word": "Yeah,",
        "start": 9.96,
        "end": 10.08
      },
      {
        "id": 38,
        "word": "a",
        "start": 10.2,
        "end": 10.26
      },
      {
        "id": 39,
        "word": "little",
        "start": 10.26,
        "end": 10.38
      },
      {
        "id": 40,
        "word": "bit.",
        "start": 10.38,
        "end": 10.58
      },
      {
        "id": 41,
        "word": "So",
        "start": 10.92,
        "end": 11.48
      },
      {
        "id": 42,
        "word": "what",
        "start": 11.48,
        "end": 11.98
      },
      {
        "id": 43,
        "word": "the",
        "start": 11.98,
        "end": 12.16
      },
      {
        "id": 44,
        "word": "internet",
        "start": 12.16,
        "end": 12.48
      },
      {
        "id": 45,
        "word": "does,",
        "start": 12.48,
        "end": 12.88
      },
      {
        "id": 46,
        "word": "a",
        "start": 13.08,
        "end": 13.32
      },
      {
        "id": 47,
        "word": "lot",
        "start": 13.32,
        "end": 13.4
      },
      {
        "id": 48,
        "word": "of",
        "start": 13.4,
        "end": 13.48
      },
      {
        "id": 49,
        "word": "this",
        "start": 13.48,
        "end": 13.58
      },
      {
        "id": 50,
        "word": "is",
        "start": 13.58,
        "end": 13.72
      },
      {
        "id": 51,
        "word": "internet",
        "start": 13.72,
        "end": 14.02
      },
      {
        "id": 52,
        "word": "driven.",
        "start": 14.02,
        "end": 14.3
      },
      {
        "id": 53,
        "word": "What",
        "start": 14.52,
        "end": 14.94
      },
      {
        "id": 54,
        "word": "the",
        "start": 14.94,
        "end": 15.1
      },
      {
        "id": 55,
        "word": "internet",
        "start": 15.1,
        "end": 15.42
      },
      {
        "id": 56,
        "word": "does",
        "start": 15.42,
        "end": 15.86
      },
      {
        "id": 57,
        "word": "is",
        "start": 15.86,
        "end": 16.24
      },
      {
        "id": 58,
        "word": "the",
        "start": 16.24,
        "end": 16.42
      },
      {
        "id": 59,
        "word": "internet",
        "start": 16.42,
        "end": 16.76
      },
      {
        "id": 60,
        "word": "creates",
        "start": 16.76,
        "end": 17.38
      },
      {
        "id": 61,
        "word": "one",
        "start": 17.38,
        "end": 18.52
      },
      {
        "id": 62,
        "word": "giant",
        "start": 18.52,
        "end": 19.02
      },
      {
        "id": 63,
        "word": "aggregator",
        "start": 19.02,
        "end": 19.7
      },
      {
        "id": 64,
        "word": "or",
        "start": 19.7,
        "end": 20.0
      },
      {
        "id": 65,
        "word": "two",
        "start": 20.0,
        "end": 20.28
      },
      {
        "id": 66,
        "word": "for",
        "start": 20.28,
        "end": 20.64
      },
      {
        "id": 67,
        "word": "everything.",
        "start": 20.64,
        "end": 21.1
      },
      {
        "id": 68,
        "word": "One",
        "start": 21.54,
        "end": 21.72
      },
      {
        "id": 69,
        "word": "taxi",
        "start": 21.72,
        "end": 22.32
      },
      {
        "id": 70,
        "word": "dispatcher,",
        "start": 22.32,
        "end": 22.96
      },
      {
        "id": 71,
        "word": "one",
        "start": 23.08,
        "end": 23.2
      },
      {
        "id": 72,
        "word": "e",
        "start": 23.2,
        "end": 23.4
      },
      {
        "id": 73,
        "word": "-commerce",
        "start": 23.4,
        "end": 23.68
      },
      {
        "id": 74,
        "word": "store,",
        "start": 23.68,
        "end": 24.04
      },
      {
        "id": 75,
        "word": "one",
        "start": 24.22,
        "end": 24.32
      },
      {
        "id": 76,
        "word": "search",
        "start": 24.32,
        "end": 24.64
      },
      {
        "id": 77,
        "word": "engine,",
        "start": 24.64,
        "end": 25.08
      },
      {
        "id": 78,
        "word": "one,",
        "start": 25.62,
        "end": 25.82
      },
      {
        "id": 79,
        "word": "you",
        "start": 25.82,
        "end": 26.74
      },
      {
        "id": 80,
        "word": "know,",
        "start": 26.74,
        "end": 26.86
      },
      {
        "id": 81,
        "word": "one",
        "start": 27.16,
        "end": 27.64
      },
      {
        "id": 82,
        "word": "social",
        "start": 27.64,
        "end": 27.98
      },
      {
        "id": 83,
        "word": "media",
        "start": 27.98,
        "end": 28.26
      },
      {
        "id": 84,
        "word": "site",
        "start": 28.26,
        "end": 28.64
      },
      {
        "id": 85,
        "word": "for",
        "start": 28.64,
        "end": 28.94
      },
      {
        "id": 86,
        "word": "friends",
        "start": 28.94,
        "end": 29.52
      },
      {
        "id": 87,
        "word": "and",
        "start": 29.52,
        "end": 29.66
      },
      {
        "id": 88,
        "word": "family,",
        "start": 29.66,
        "end": 30.06
      },
      {
        "id": 89,
        "word": "one",
        "start": 30.24,
        "end": 30.34
      },
      {
        "id": 90,
        "word": "for",
        "start": 30.34,
        "end": 30.5
      },
      {
        "id": 91,
        "word": "business,",
        "start": 30.5,
        "end": 30.88
      },
      {
        "id": 92,
        "word": "etc.",
        "start": 31.04,
        "end": 31.16
      },
      {
        "id": 93,
        "word": "So",
        "start": 31.16,
        "end": 31.82
      },
      {
        "id": 94,
        "word": "the",
        "start": 31.82,
        "end": 31.94
      },
      {
        "id": 95,
        "word": "internet",
        "start": 31.94,
        "end": 32.2
      },
      {
        "id": 96,
        "word": "is",
        "start": 32.2,
        "end": 32.42
      },
      {
        "id": 97,
        "word": "this",
        "start": 32.42,
        "end": 32.58
      },
      {
        "id": 98,
        "word": "giant",
        "start": 32.58,
        "end": 32.92
      },
      {
        "id": 99,
        "word": "aggregator",
        "start": 32.92,
        "end": 33.6
      },
      {
        "id": 100,
        "word": "where",
        "start": 33.6,
        "end": 33.94
      },
      {
        "id": 101,
        "word": "it",
        "start": 33.94,
        "end": 34.06
      },
      {
        "id": 102,
        "word": "creates",
        "start": 34.06,
        "end": 34.3
      },
      {
        "id": 103,
        "word": "one",
        "start": 34.3,
        "end": 34.68
      },
      {
        "id": 104,
        "word": "big",
        "start": 34.68,
        "end": 35.1
      },
      {
        "id": 105,
        "word": "hegemon",
        "start": 35.1,
        "end": 35.96
      },
      {
        "id": 106,
        "word": "for",
        "start": 35.96,
        "end": 36.5
      },
      {
        "id": 107,
        "word": "everything.",
        "start": 36.5,
        "end": 36.92
      },
      {
        "id": 108,
        "word": "And",
        "start": 36.92,
        "end": 38.1
      },
      {
        "id": 109,
        "word": "it",
        "start": 38.1,
        "end": 38.5
      },
      {
        "id": 110,
        "word": "creates",
        "start": 38.5,
        "end": 38.78
      },
      {
        "id": 111,
        "word": "an",
        "start": 38.78,
        "end": 38.98
      },
      {
        "id": 112,
        "word": "atomized",
        "start": 38.98,
        "end": 39.58
      },
      {
        "id": 113,
        "word": "long",
        "start": 39.58,
        "end": 40.12
      },
      {
        "id": 114,
        "word": "tail",
        "start": 40.12,
        "end": 40.6
      },
      {
        "id": 115,
        "word": "of",
        "start": 40.6,
        "end": 41.2
      },
      {
        "id": 116,
        "word": "millions",
        "start": 41.2,
        "end": 41.66
      },
      {
        "id": 117,
        "word": "and",
        "start": 41.66,
        "end": 41.84
      },
      {
        "id": 118,
        "word": "millions",
        "start": 41.84,
        "end": 42.1
      },
      {
        "id": 119,
        "word": "of",
        "start": 42.1,
        "end": 42.26
      },
      {
        "id": 120,
        "word": "individuals.",
        "start": 42.26,
        "end": 42.7
      }
    ],
    "fullText": "There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you thought about it? Yeah, a little bit. So what the internet does, a lot of this is internet driven. What the internet does is the internet creates one giant aggregator or two for everything. One taxi dispatcher, one e -commerce store, one search engine, one, you know, one social media site for friends and family, one for business, etc. So the internet is this giant aggregator where it creates one big hegemon for everything. And it creates an atomized long tail of millions and millions of individuals.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-rogan",
    "watermarkHandle": "@joerogan",
    "copy": {
      "youtubeTitle": "There's no longer one guy like a Walter Cronkite #shorts",
      "youtubeDescription": "There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you thought about it? Yeah, a little bit. So what the internet does, a lot of this is internet driven. What the internet does is the internet creates one giant aggregator or two for everything. One taxi dispatcher, one e -commerce store, one search engine, one, you know, one social media site for friends and family, one for business, etc. So the internet is this giant aggregator where it creates one big hegemon for everything. And it creates an atomized long tail of millions and millions of individuals.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you ... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-rogan-2",
    "index": 2,
    "title": "And the two of them are just fighting it",
    "startTime": 3497.72,
    "endTime": 3535.06,
    "duration": 37.34,
    "viralityScore": 79,
    "factors": {
      "hook": 100,
      "acoustics": 82,
      "pace": 83,
      "payoff": 65,
      "sentiment": 20,
      "duration": 88
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_02_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_02_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "And",
        "start": 0.0,
        "end": 0.56
      },
      {
        "id": 2,
        "word": "the",
        "start": 0.56,
        "end": 0.68
      },
      {
        "id": 3,
        "word": "two",
        "start": 0.68,
        "end": 0.8
      },
      {
        "id": 4,
        "word": "of",
        "start": 0.8,
        "end": 0.9
      },
      {
        "id": 5,
        "word": "them",
        "start": 0.9,
        "end": 0.98
      },
      {
        "id": 6,
        "word": "are",
        "start": 0.98,
        "end": 1.1
      },
      {
        "id": 7,
        "word": "just",
        "start": 1.1,
        "end": 1.26
      },
      {
        "id": 8,
        "word": "fighting",
        "start": 1.26,
        "end": 1.56
      },
      {
        "id": 9,
        "word": "it",
        "start": 1.56,
        "end": 1.68
      },
      {
        "id": 10,
        "word": "out",
        "start": 1.68,
        "end": 1.8
      },
      {
        "id": 11,
        "word": "using",
        "start": 1.8,
        "end": 2.02
      },
      {
        "id": 12,
        "word": "their",
        "start": 2.02,
        "end": 2.22
      },
      {
        "id": 13,
        "word": "various",
        "start": 2.22,
        "end": 2.52
      },
      {
        "id": 14,
        "word": "media",
        "start": 2.52,
        "end": 2.84
      },
      {
        "id": 15,
        "word": "organs",
        "start": 2.84,
        "end": 3.18
      },
      {
        "id": 16,
        "word": "and",
        "start": 3.18,
        "end": 3.34
      },
      {
        "id": 17,
        "word": "memes.",
        "start": 3.34,
        "end": 3.64
      },
      {
        "id": 18,
        "word": "So",
        "start": 3.98,
        "end": 4.46
      },
      {
        "id": 19,
        "word": "basically,",
        "start": 4.46,
        "end": 5.4
      },
      {
        "id": 20,
        "word": "when",
        "start": 5.42,
        "end": 5.72
      },
      {
        "id": 21,
        "word": "you",
        "start": 5.72,
        "end": 5.86
      },
      {
        "id": 22,
        "word": "see",
        "start": 5.86,
        "end": 6.08
      },
      {
        "id": 23,
        "word": "one",
        "start": 6.08,
        "end": 6.3
      },
      {
        "id": 24,
        "word": "of",
        "start": 6.3,
        "end": 6.38
      },
      {
        "id": 25,
        "word": "these",
        "start": 6.38,
        "end": 6.6
      },
      {
        "id": 26,
        "word": "news",
        "start": 6.6,
        "end": 6.86
      },
      {
        "id": 27,
        "word": "organizations",
        "start": 6.86,
        "end": 7.44
      },
      {
        "id": 28,
        "word": "doxing",
        "start": 7.44,
        "end": 8.08
      },
      {
        "id": 29,
        "word": "an",
        "start": 8.08,
        "end": 8.22
      },
      {
        "id": 30,
        "word": "individual,",
        "start": 8.22,
        "end": 8.64
      },
      {
        "id": 31,
        "word": "that's",
        "start": 9.12,
        "end": 9.46
      },
      {
        "id": 32,
        "word": "like",
        "start": 9.46,
        "end": 9.58
      },
      {
        "id": 33,
        "word": "a",
        "start": 9.58,
        "end": 9.68
      },
      {
        "id": 34,
        "word": "tank",
        "start": 9.68,
        "end": 10.0
      },
      {
        "id": 35,
        "word": "running",
        "start": 10.0,
        "end": 10.22
      },
      {
        "id": 36,
        "word": "over",
        "start": 10.22,
        "end": 10.44
      },
      {
        "id": 37,
        "word": "a",
        "start": 10.44,
        "end": 10.62
      },
      {
        "id": 38,
        "word": "soldier.",
        "start": 10.62,
        "end": 10.94
      },
      {
        "id": 39,
        "word": "That's",
        "start": 11.42,
        "end": 11.9
      },
      {
        "id": 40,
        "word": "what's",
        "start": 11.9,
        "end": 12.08
      },
      {
        "id": 41,
        "word": "going",
        "start": 12.08,
        "end": 12.26
      },
      {
        "id": 42,
        "word": "on.",
        "start": 12.26,
        "end": 12.52
      },
      {
        "id": 43,
        "word": "It's",
        "start": 12.6,
        "end": 12.72
      },
      {
        "id": 44,
        "word": "just",
        "start": 12.72,
        "end": 12.88
      },
      {
        "id": 45,
        "word": "war.",
        "start": 12.88,
        "end": 13.32
      },
      {
        "id": 46,
        "word": "And",
        "start": 13.52,
        "end": 13.92
      },
      {
        "id": 47,
        "word": "so",
        "start": 13.92,
        "end": 14.14
      },
      {
        "id": 48,
        "word": "there's",
        "start": 14.14,
        "end": 14.52
      },
      {
        "id": 49,
        "word": "no",
        "start": 14.52,
        "end": 14.68
      },
      {
        "id": 50,
        "word": "such",
        "start": 14.68,
        "end": 15.68
      },
      {
        "id": 51,
        "word": "thing",
        "start": 15.68,
        "end": 15.98
      },
      {
        "id": 52,
        "word": "anymore",
        "start": 15.98,
        "end": 16.4
      },
      {
        "id": 53,
        "word": "as",
        "start": 16.4,
        "end": 16.78
      },
      {
        "id": 54,
        "word": "a",
        "start": 16.78,
        "end": 16.92
      },
      {
        "id": 55,
        "word": "neutral",
        "start": 16.92,
        "end": 17.28
      },
      {
        "id": 56,
        "word": "media",
        "start": 17.28,
        "end": 17.66
      },
      {
        "id": 57,
        "word": "commentator.",
        "start": 17.66,
        "end": 18.36
      },
      {
        "id": 58,
        "word": "The",
        "start": 18.56,
        "end": 19.04
      },
      {
        "id": 59,
        "word": "illusion",
        "start": 19.04,
        "end": 19.92
      },
      {
        "id": 60,
        "word": "of",
        "start": 19.92,
        "end": 20.24
      },
      {
        "id": 61,
        "word": "objectivity",
        "start": 20.24,
        "end": 20.98
      },
      {
        "id": 62,
        "word": "that",
        "start": 20.98,
        "end": 21.24
      },
      {
        "id": 63,
        "word": "journalism",
        "start": 21.24,
        "end": 21.7
      },
      {
        "id": 64,
        "word": "had",
        "start": 21.7,
        "end": 22.16
      },
      {
        "id": 65,
        "word": "is",
        "start": 22.16,
        "end": 22.4
      },
      {
        "id": 66,
        "word": "lost.",
        "start": 22.4,
        "end": 22.8
      },
      {
        "id": 67,
        "word": "There's",
        "start": 23.04,
        "end": 23.48
      },
      {
        "id": 68,
        "word": "no",
        "start": 23.48,
        "end": 23.6
      },
      {
        "id": 69,
        "word": "longer",
        "start": 23.6,
        "end": 23.84
      },
      {
        "id": 70,
        "word": "one",
        "start": 23.84,
        "end": 24.14
      },
      {
        "id": 71,
        "word": "guy",
        "start": 24.14,
        "end": 24.42
      },
      {
        "id": 72,
        "word": "like",
        "start": 24.42,
        "end": 24.62
      },
      {
        "id": 73,
        "word": "a",
        "start": 24.62,
        "end": 24.72
      },
      {
        "id": 74,
        "word": "Walter",
        "start": 24.72,
        "end": 24.96
      },
      {
        "id": 75,
        "word": "Cronkite",
        "start": 24.96,
        "end": 25.5
      },
      {
        "id": 76,
        "word": "that",
        "start": 25.5,
        "end": 25.66
      },
      {
        "id": 77,
        "word": "everyone's",
        "start": 25.66,
        "end": 26.0
      },
      {
        "id": 78,
        "word": "going",
        "start": 26.0,
        "end": 26.08
      },
      {
        "id": 79,
        "word": "to",
        "start": 26.08,
        "end": 26.14
      },
      {
        "id": 80,
        "word": "listen",
        "start": 26.14,
        "end": 26.36
      },
      {
        "id": 81,
        "word": "to.",
        "start": 26.36,
        "end": 26.58
      },
      {
        "id": 82,
        "word": "It's",
        "start": 26.76,
        "end": 27.2
      },
      {
        "id": 83,
        "word": "now",
        "start": 27.2,
        "end": 27.36
      },
      {
        "id": 84,
        "word": "all",
        "start": 27.36,
        "end": 27.52
      },
      {
        "id": 85,
        "word": "just",
        "start": 27.52,
        "end": 27.64
      },
      {
        "id": 86,
        "word": "shock",
        "start": 27.64,
        "end": 27.92
      },
      {
        "id": 87,
        "word": "troops",
        "start": 27.92,
        "end": 28.18
      },
      {
        "id": 88,
        "word": "fighting",
        "start": 28.18,
        "end": 28.54
      },
      {
        "id": 89,
        "word": "wars",
        "start": 28.54,
        "end": 28.9
      },
      {
        "id": 90,
        "word": "with",
        "start": 28.9,
        "end": 29.04
      },
      {
        "id": 91,
        "word": "each",
        "start": 29.04,
        "end": 29.18
      },
      {
        "id": 92,
        "word": "other.",
        "start": 29.18,
        "end": 29.38
      },
      {
        "id": 93,
        "word": "How",
        "start": 30.0,
        "end": 30.22
      },
      {
        "id": 94,
        "word": "does",
        "start": 30.22,
        "end": 30.36
      },
      {
        "id": 95,
        "word": "this",
        "start": 30.36,
        "end": 30.48
      },
      {
        "id": 96,
        "word": "play",
        "start": 30.48,
        "end": 30.7
      },
      {
        "id": 97,
        "word": "out?",
        "start": 30.7,
        "end": 31.0
      },
      {
        "id": 98,
        "word": "Have",
        "start": 31.72,
        "end": 32.28
      },
      {
        "id": 99,
        "word": "you",
        "start": 32.28,
        "end": 32.36
      },
      {
        "id": 100,
        "word": "thought",
        "start": 32.36,
        "end": 32.52
      },
      {
        "id": 101,
        "word": "about",
        "start": 32.52,
        "end": 32.7
      },
      {
        "id": 102,
        "word": "it?",
        "start": 32.7,
        "end": 32.86
      },
      {
        "id": 103,
        "word": "Yeah,",
        "start": 33.0,
        "end": 33.12
      },
      {
        "id": 104,
        "word": "a",
        "start": 33.24,
        "end": 33.3
      },
      {
        "id": 105,
        "word": "little",
        "start": 33.3,
        "end": 33.42
      },
      {
        "id": 106,
        "word": "bit.",
        "start": 33.42,
        "end": 33.62
      },
      {
        "id": 107,
        "word": "So",
        "start": 33.96,
        "end": 34.52
      },
      {
        "id": 108,
        "word": "what",
        "start": 34.52,
        "end": 35.02
      },
      {
        "id": 109,
        "word": "the",
        "start": 35.02,
        "end": 35.2
      },
      {
        "id": 110,
        "word": "internet",
        "start": 35.2,
        "end": 35.52
      },
      {
        "id": 111,
        "word": "does,",
        "start": 35.52,
        "end": 35.92
      },
      {
        "id": 112,
        "word": "a",
        "start": 36.12,
        "end": 36.36
      },
      {
        "id": 113,
        "word": "lot",
        "start": 36.36,
        "end": 36.44
      },
      {
        "id": 114,
        "word": "of",
        "start": 36.44,
        "end": 36.52
      },
      {
        "id": 115,
        "word": "this",
        "start": 36.52,
        "end": 36.62
      },
      {
        "id": 116,
        "word": "is",
        "start": 36.62,
        "end": 36.76
      },
      {
        "id": 117,
        "word": "internet",
        "start": 36.76,
        "end": 37.06
      },
      {
        "id": 118,
        "word": "driven.",
        "start": 37.06,
        "end": 37.34
      }
    ],
    "fullText": "And the two of them are just fighting it out using their various media organs and memes. So basically, when you see one of these news organizations doxing an individual, that's like a tank running over a soldier. That's what's going on. It's just war. And so there's no such thing anymore as a neutral media commentator. The illusion of objectivity that journalism had is lost. There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you thought about it? Yeah, a little bit. So what the internet does, a lot of this is internet driven.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-rogan",
    "watermarkHandle": "@joerogan",
    "copy": {
      "youtubeTitle": "And the two of them are just fighting it #shorts",
      "youtubeDescription": "And the two of them are just fighting it out using their various media organs and memes. So basically, when you see one of these news organizations doxing an individual, that's like a tank running over a soldier. That's what's going on. It's just war. And so there's no such thing anymore as a neutral media commentator. The illusion of objectivity that journalism had is lost. There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you thought about it? Yeah, a little bit. So what the internet does, a lot of this is internet driven.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "And the two of them are just fighting it out using their various media organs and memes. So basically, when you see one of these news organizations doxing an individual, that's lik... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-rogan-3",
    "index": 3,
    "title": "In their eyes",
    "startTime": 1071.98,
    "endTime": 1113.86,
    "duration": 41.88,
    "viralityScore": 77,
    "factors": {
      "hook": 86,
      "acoustics": 84,
      "pace": 82,
      "payoff": 65,
      "sentiment": 20,
      "duration": 100
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_03_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_03_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "In",
        "start": 0.0,
        "end": 0.62
      },
      {
        "id": 2,
        "word": "their",
        "start": 0.62,
        "end": 1.04
      },
      {
        "id": 3,
        "word": "eyes,",
        "start": 1.04,
        "end": 1.54
      },
      {
        "id": 4,
        "word": "it",
        "start": 1.76,
        "end": 1.92
      },
      {
        "id": 5,
        "word": "is",
        "start": 1.92,
        "end": 2.4
      },
      {
        "id": 6,
        "word": "the",
        "start": 2.4,
        "end": 3.64
      },
      {
        "id": 7,
        "word": "peak,",
        "start": 3.64,
        "end": 4.44
      },
      {
        "id": 8,
        "word": "the",
        "start": 4.66,
        "end": 5.28
      },
      {
        "id": 9,
        "word": "pinnacle,",
        "start": 5.28,
        "end": 5.68
      },
      {
        "id": 10,
        "word": "the",
        "start": 5.8,
        "end": 5.86
      },
      {
        "id": 11,
        "word": "most",
        "start": 5.86,
        "end": 6.1
      },
      {
        "id": 12,
        "word": "important",
        "start": 6.1,
        "end": 6.5
      },
      {
        "id": 13,
        "word": "thing.",
        "start": 6.5,
        "end": 6.88
      },
      {
        "id": 14,
        "word": "It's",
        "start": 7.24,
        "end": 7.6
      },
      {
        "id": 15,
        "word": "not",
        "start": 7.6,
        "end": 7.74
      },
      {
        "id": 16,
        "word": "a",
        "start": 7.74,
        "end": 7.86
      },
      {
        "id": 17,
        "word": "trade",
        "start": 7.86,
        "end": 8.08
      },
      {
        "id": 18,
        "word": "-off.",
        "start": 8.08,
        "end": 8.34
      },
      {
        "id": 19,
        "word": "I",
        "start": 9.18,
        "end": 9.54
      },
      {
        "id": 20,
        "word": "would",
        "start": 9.54,
        "end": 9.68
      },
      {
        "id": 21,
        "word": "argue",
        "start": 9.68,
        "end": 9.98
      },
      {
        "id": 22,
        "word": "that",
        "start": 9.98,
        "end": 10.16
      },
      {
        "id": 23,
        "word": "if,",
        "start": 10.16,
        "end": 10.32
      },
      {
        "id": 24,
        "word": "now",
        "start": 10.5,
        "end": 10.66
      },
      {
        "id": 25,
        "word": "when",
        "start": 10.66,
        "end": 10.82
      },
      {
        "id": 26,
        "word": "I",
        "start": 10.82,
        "end": 10.92
      },
      {
        "id": 27,
        "word": "say",
        "start": 10.92,
        "end": 11.1
      },
      {
        "id": 28,
        "word": "happy,",
        "start": 11.1,
        "end": 11.56
      },
      {
        "id": 29,
        "word": "happy",
        "start": 11.78,
        "end": 12.16
      },
      {
        "id": 30,
        "word": "is",
        "start": 12.16,
        "end": 12.34
      },
      {
        "id": 31,
        "word": "one",
        "start": 12.34,
        "end": 12.46
      },
      {
        "id": 32,
        "word": "of",
        "start": 12.46,
        "end": 12.52
      },
      {
        "id": 33,
        "word": "those",
        "start": 12.52,
        "end": 12.64
      },
      {
        "id": 34,
        "word": "words",
        "start": 12.64,
        "end": 12.88
      },
      {
        "id": 35,
        "word": "that",
        "start": 12.88,
        "end": 13.02
      },
      {
        "id": 36,
        "word": "means",
        "start": 13.02,
        "end": 13.28
      },
      {
        "id": 37,
        "word": "a",
        "start": 13.28,
        "end": 13.46
      },
      {
        "id": 38,
        "word": "zillion",
        "start": 13.46,
        "end": 13.74
      },
      {
        "id": 39,
        "word": "different",
        "start": 13.74,
        "end": 14.0
      },
      {
        "id": 40,
        "word": "things.",
        "start": 14.0,
        "end": 14.3
      },
      {
        "id": 41,
        "word": "It's",
        "start": 14.36,
        "end": 14.72
      },
      {
        "id": 42,
        "word": "like",
        "start": 14.72,
        "end": 14.84
      },
      {
        "id": 43,
        "word": "love,",
        "start": 14.84,
        "end": 15.16
      },
      {
        "id": 44,
        "word": "right?",
        "start": 15.28,
        "end": 15.36
      },
      {
        "id": 45,
        "word": "What",
        "start": 15.42,
        "end": 15.54
      },
      {
        "id": 46,
        "word": "does",
        "start": 15.54,
        "end": 15.64
      },
      {
        "id": 47,
        "word": "that",
        "start": 15.64,
        "end": 15.78
      },
      {
        "id": 48,
        "word": "mean?",
        "start": 15.78,
        "end": 16.0
      },
      {
        "id": 49,
        "word": "Right,",
        "start": 16.36,
        "end": 16.52
      },
      {
        "id": 50,
        "word": "I",
        "start": 16.58,
        "end": 16.66
      },
      {
        "id": 51,
        "word": "love",
        "start": 16.66,
        "end": 16.78
      },
      {
        "id": 52,
        "word": "cheese.",
        "start": 16.78,
        "end": 17.14
      },
      {
        "id": 53,
        "word": "Yeah,",
        "start": 17.42,
        "end": 17.58
      },
      {
        "id": 54,
        "word": "I'm",
        "start": 17.84,
        "end": 18.0
      },
      {
        "id": 55,
        "word": "going",
        "start": 18.0,
        "end": 18.0
      },
      {
        "id": 56,
        "word": "to",
        "start": 18.0,
        "end": 18.12
      },
      {
        "id": 57,
        "word": "define",
        "start": 18.12,
        "end": 18.32
      },
      {
        "id": 58,
        "word": "it",
        "start": 18.32,
        "end": 18.44
      },
      {
        "id": 59,
        "word": "a",
        "start": 18.44,
        "end": 18.58
      },
      {
        "id": 60,
        "word": "little",
        "start": 18.58,
        "end": 18.68
      },
      {
        "id": 61,
        "word": "bit",
        "start": 18.68,
        "end": 18.84
      },
      {
        "id": 62,
        "word": "more",
        "start": 18.84,
        "end": 19.0
      },
      {
        "id": 63,
        "word": "tightly,",
        "start": 19.0,
        "end": 19.34
      },
      {
        "id": 64,
        "word": "right?",
        "start": 19.68,
        "end": 20.02
      },
      {
        "id": 65,
        "word": "So",
        "start": 20.2,
        "end": 20.44
      },
      {
        "id": 66,
        "word": "let's",
        "start": 20.44,
        "end": 22.92
      },
      {
        "id": 67,
        "word": "go",
        "start": 22.92,
        "end": 23.04
      },
      {
        "id": 68,
        "word": "back",
        "start": 23.04,
        "end": 23.2
      },
      {
        "id": 69,
        "word": "to",
        "start": 23.2,
        "end": 23.36
      },
      {
        "id": 70,
        "word": "desire,",
        "start": 23.36,
        "end": 24.08
      },
      {
        "id": 71,
        "word": "right?",
        "start": 24.54,
        "end": 24.74
      },
      {
        "id": 72,
        "word": "This",
        "start": 24.76,
        "end": 24.96
      },
      {
        "id": 73,
        "word": "is",
        "start": 24.96,
        "end": 25.08
      },
      {
        "id": 74,
        "word": "old,",
        "start": 25.08,
        "end": 25.4
      },
      {
        "id": 75,
        "word": "old",
        "start": 25.44,
        "end": 25.62
      },
      {
        "id": 76,
        "word": "Buddhist",
        "start": 25.62,
        "end": 25.9
      },
      {
        "id": 77,
        "word": "wisdom.",
        "start": 25.9,
        "end": 26.22
      },
      {
        "id": 78,
        "word": "I'm",
        "start": 26.38,
        "end": 26.42
      },
      {
        "id": 79,
        "word": "not",
        "start": 26.42,
        "end": 26.56
      },
      {
        "id": 80,
        "word": "saying",
        "start": 26.56,
        "end": 26.78
      },
      {
        "id": 81,
        "word": "anything",
        "start": 26.78,
        "end": 27.04
      },
      {
        "id": 82,
        "word": "original,",
        "start": 27.04,
        "end": 27.42
      },
      {
        "id": 83,
        "word": "but",
        "start": 27.42,
        "end": 27.92
      },
      {
        "id": 84,
        "word": "desire",
        "start": 27.92,
        "end": 28.88
      },
      {
        "id": 85,
        "word": "to",
        "start": 28.88,
        "end": 29.08
      },
      {
        "id": 86,
        "word": "me",
        "start": 29.08,
        "end": 29.24
      },
      {
        "id": 87,
        "word": "is",
        "start": 29.24,
        "end": 29.36
      },
      {
        "id": 88,
        "word": "a",
        "start": 29.36,
        "end": 29.46
      },
      {
        "id": 89,
        "word": "contract",
        "start": 29.46,
        "end": 29.86
      },
      {
        "id": 90,
        "word": "that",
        "start": 29.86,
        "end": 30.14
      },
      {
        "id": 91,
        "word": "you",
        "start": 30.14,
        "end": 30.28
      },
      {
        "id": 92,
        "word": "make",
        "start": 30.28,
        "end": 30.5
      },
      {
        "id": 93,
        "word": "with",
        "start": 30.5,
        "end": 30.68
      },
      {
        "id": 94,
        "word": "yourself",
        "start": 30.68,
        "end": 31.08
      },
      {
        "id": 95,
        "word": "to",
        "start": 31.08,
        "end": 31.44
      },
      {
        "id": 96,
        "word": "be",
        "start": 31.44,
        "end": 31.6
      },
      {
        "id": 97,
        "word": "unhappy",
        "start": 31.6,
        "end": 32.08
      },
      {
        "id": 98,
        "word": "until",
        "start": 32.08,
        "end": 32.58
      },
      {
        "id": 99,
        "word": "you",
        "start": 32.58,
        "end": 32.8
      },
      {
        "id": 100,
        "word": "get",
        "start": 32.8,
        "end": 33.02
      },
      {
        "id": 101,
        "word": "what",
        "start": 33.02,
        "end": 33.18
      },
      {
        "id": 102,
        "word": "you",
        "start": 33.18,
        "end": 33.34
      },
      {
        "id": 103,
        "word": "want,",
        "start": 33.34,
        "end": 33.7
      },
      {
        "id": 104,
        "word": "okay?",
        "start": 34.56,
        "end": 34.92
      },
      {
        "id": 105,
        "word": "And",
        "start": 34.92,
        "end": 35.16
      },
      {
        "id": 106,
        "word": "I",
        "start": 35.16,
        "end": 35.3
      },
      {
        "id": 107,
        "word": "keep",
        "start": 35.3,
        "end": 35.58
      },
      {
        "id": 108,
        "word": "that",
        "start": 35.58,
        "end": 35.78
      },
      {
        "id": 109,
        "word": "in",
        "start": 35.78,
        "end": 36.0
      },
      {
        "id": 110,
        "word": "front",
        "start": 36.0,
        "end": 36.18
      },
      {
        "id": 111,
        "word": "of",
        "start": 36.18,
        "end": 36.28
      },
      {
        "id": 112,
        "word": "mine.",
        "start": 36.28,
        "end": 36.46
      },
      {
        "id": 113,
        "word": "So",
        "start": 36.64,
        "end": 36.7
      },
      {
        "id": 114,
        "word": "when",
        "start": 36.7,
        "end": 36.9
      },
      {
        "id": 115,
        "word": "I'm",
        "start": 36.9,
        "end": 37.1
      },
      {
        "id": 116,
        "word": "unhappy",
        "start": 37.1,
        "end": 37.58
      },
      {
        "id": 117,
        "word": "about",
        "start": 37.58,
        "end": 37.84
      },
      {
        "id": 118,
        "word": "something,",
        "start": 37.84,
        "end": 38.22
      },
      {
        "id": 119,
        "word": "I",
        "start": 38.44,
        "end": 38.8
      },
      {
        "id": 120,
        "word": "look",
        "start": 38.8,
        "end": 39.0
      },
      {
        "id": 121,
        "word": "for",
        "start": 39.0,
        "end": 39.16
      },
      {
        "id": 122,
        "word": "what",
        "start": 39.16,
        "end": 39.34
      },
      {
        "id": 123,
        "word": "is",
        "start": 39.34,
        "end": 39.48
      },
      {
        "id": 124,
        "word": "the",
        "start": 39.48,
        "end": 39.6
      },
      {
        "id": 125,
        "word": "underlying",
        "start": 39.6,
        "end": 39.98
      },
      {
        "id": 126,
        "word": "desire",
        "start": 39.98,
        "end": 40.44
      },
      {
        "id": 127,
        "word": "that",
        "start": 40.44,
        "end": 40.66
      },
      {
        "id": 128,
        "word": "I",
        "start": 40.66,
        "end": 40.76
      },
      {
        "id": 129,
        "word": "have",
        "start": 40.76,
        "end": 40.92
      },
      {
        "id": 130,
        "word": "that's",
        "start": 40.92,
        "end": 41.14
      },
      {
        "id": 131,
        "word": "not",
        "start": 41.14,
        "end": 41.3
      },
      {
        "id": 132,
        "word": "being",
        "start": 41.3,
        "end": 41.48
      },
      {
        "id": 133,
        "word": "fulfilled.",
        "start": 41.48,
        "end": 41.88
      }
    ],
    "fullText": "In their eyes, it is the peak, the pinnacle, the most important thing. It's not a trade -off. I would argue that if, now when I say happy, happy is one of those words that means a zillion different things. It's like love, right? What does that mean? Right, I love cheese. Yeah, I'm going to define it a little bit more tightly, right? So let's go back to desire, right? This is old, old Buddhist wisdom. I'm not saying anything original, but desire to me is a contract that you make with yourself to be unhappy until you get what you want, okay? And I keep that in front of mine. So when I'm unhappy about something, I look for what is the underlying desire that I have that's not being fulfilled.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-rogan",
    "watermarkHandle": "@joerogan",
    "copy": {
      "youtubeTitle": "In their eyes #shorts",
      "youtubeDescription": "In their eyes, it is the peak, the pinnacle, the most important thing. It's not a trade -off. I would argue that if, now when I say happy, happy is one of those words that means a zillion different things. It's like love, right? What does that mean? Right, I love cheese. Yeah, I'm going to define it a little bit more tightly, right? So let's go back to desire, right? This is old, old Buddhist wisdom. I'm not saying anything original, but desire to me is a contract that you make with yourself to be unhappy until you get what you want, okay? And I keep that in front of mine. So when I'm unhappy about something, I look for what is the underlying desire that I have that's not being fulfilled.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "In their eyes, it is the peak, the pinnacle, the most important thing. It's not a trade -off. I would argue that if, now when I say happy, happy is one of those words that means a ... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-rogan-4",
    "index": 4,
    "title": "The reason why people like hearing me is",
    "startTime": 45.8,
    "endTime": 93.66,
    "duration": 47.86,
    "viralityScore": 74,
    "factors": {
      "hook": 80,
      "acoustics": 85,
      "pace": 86,
      "payoff": 65,
      "sentiment": 20,
      "duration": 85
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_04_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_04_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "Yeah,",
        "start": 0.0,
        "end": 0.4
      },
      {
        "id": 2,
        "word": "you",
        "start": 0.72,
        "end": 0.82
      },
      {
        "id": 3,
        "word": "know,",
        "start": 0.82,
        "end": 0.86
      },
      {
        "id": 4,
        "word": "I",
        "start": 0.96,
        "end": 1.08
      },
      {
        "id": 5,
        "word": "think",
        "start": 1.08,
        "end": 1.36
      },
      {
        "id": 6,
        "word": "the",
        "start": 1.36,
        "end": 1.52
      },
      {
        "id": 7,
        "word": "reason",
        "start": 1.52,
        "end": 1.74
      },
      {
        "id": 8,
        "word": "why",
        "start": 1.74,
        "end": 1.92
      },
      {
        "id": 9,
        "word": "people",
        "start": 1.92,
        "end": 2.16
      },
      {
        "id": 10,
        "word": "like",
        "start": 2.16,
        "end": 2.5
      },
      {
        "id": 11,
        "word": "hearing",
        "start": 2.5,
        "end": 3.6
      },
      {
        "id": 12,
        "word": "me",
        "start": 3.6,
        "end": 4.02
      },
      {
        "id": 13,
        "word": "is",
        "start": 4.02,
        "end": 4.38
      },
      {
        "id": 14,
        "word": "because",
        "start": 4.38,
        "end": 4.74
      },
      {
        "id": 15,
        "word": "it's",
        "start": 4.74,
        "end": 5.68
      },
      {
        "id": 16,
        "word": "like",
        "start": 5.68,
        "end": 5.8
      },
      {
        "id": 17,
        "word": "if",
        "start": 5.8,
        "end": 5.94
      },
      {
        "id": 18,
        "word": "you",
        "start": 5.94,
        "end": 6.0
      },
      {
        "id": 19,
        "word": "go",
        "start": 6.0,
        "end": 6.12
      },
      {
        "id": 20,
        "word": "to",
        "start": 6.12,
        "end": 6.2
      },
      {
        "id": 21,
        "word": "a",
        "start": 6.2,
        "end": 6.6
      },
      {
        "id": 22,
        "word": "circus",
        "start": 6.6,
        "end": 6.9
      },
      {
        "id": 23,
        "word": "and",
        "start": 6.9,
        "end": 7.1
      },
      {
        "id": 24,
        "word": "you",
        "start": 7.1,
        "end": 7.18
      },
      {
        "id": 25,
        "word": "see",
        "start": 7.18,
        "end": 7.32
      },
      {
        "id": 26,
        "word": "a",
        "start": 7.32,
        "end": 7.44
      },
      {
        "id": 27,
        "word": "bear,",
        "start": 7.44,
        "end": 7.74
      },
      {
        "id": 28,
        "word": "right,",
        "start": 8.06,
        "end": 8.16
      },
      {
        "id": 29,
        "word": "that's",
        "start": 8.2,
        "end": 8.4
      },
      {
        "id": 30,
        "word": "kind",
        "start": 8.4,
        "end": 8.54
      },
      {
        "id": 31,
        "word": "of",
        "start": 8.54,
        "end": 8.64
      },
      {
        "id": 32,
        "word": "interesting,",
        "start": 8.64,
        "end": 9.0
      },
      {
        "id": 33,
        "word": "but",
        "start": 9.18,
        "end": 9.24
      },
      {
        "id": 34,
        "word": "not",
        "start": 9.24,
        "end": 9.54
      },
      {
        "id": 35,
        "word": "that",
        "start": 9.54,
        "end": 9.7
      },
      {
        "id": 36,
        "word": "much.",
        "start": 9.7,
        "end": 10.0
      },
      {
        "id": 37,
        "word": "If",
        "start": 10.0,
        "end": 10.3
      },
      {
        "id": 38,
        "word": "you",
        "start": 10.3,
        "end": 10.4
      },
      {
        "id": 39,
        "word": "see",
        "start": 10.4,
        "end": 10.56
      },
      {
        "id": 40,
        "word": "a",
        "start": 10.56,
        "end": 10.68
      },
      {
        "id": 41,
        "word": "unicycle,",
        "start": 10.68,
        "end": 11.24
      },
      {
        "id": 42,
        "word": "that's",
        "start": 11.34,
        "end": 11.52
      },
      {
        "id": 43,
        "word": "interesting,",
        "start": 11.52,
        "end": 11.86
      },
      {
        "id": 44,
        "word": "but",
        "start": 11.98,
        "end": 12.06
      },
      {
        "id": 45,
        "word": "you",
        "start": 12.06,
        "end": 12.14
      },
      {
        "id": 46,
        "word": "see",
        "start": 12.14,
        "end": 12.26
      },
      {
        "id": 47,
        "word": "a",
        "start": 12.26,
        "end": 12.36
      },
      {
        "id": 48,
        "word": "bear",
        "start": 12.36,
        "end": 12.56
      },
      {
        "id": 49,
        "word": "on",
        "start": 12.56,
        "end": 12.76
      },
      {
        "id": 50,
        "word": "a",
        "start": 12.76,
        "end": 12.82
      },
      {
        "id": 51,
        "word": "unicycle,",
        "start": 12.82,
        "end": 13.32
      },
      {
        "id": 52,
        "word": "that's",
        "start": 13.46,
        "end": 13.66
      },
      {
        "id": 53,
        "word": "really",
        "start": 13.66,
        "end": 13.88
      },
      {
        "id": 54,
        "word": "interesting,",
        "start": 13.88,
        "end": 14.26
      },
      {
        "id": 55,
        "word": "right?",
        "start": 14.46,
        "end": 14.64
      },
      {
        "id": 56,
        "word": "So",
        "start": 14.94,
        "end": 15.34
      },
      {
        "id": 57,
        "word": "when",
        "start": 15.34,
        "end": 15.66
      },
      {
        "id": 58,
        "word": "you",
        "start": 15.66,
        "end": 15.76
      },
      {
        "id": 59,
        "word": "combine",
        "start": 15.76,
        "end": 16.12
      },
      {
        "id": 60,
        "word": "things",
        "start": 16.12,
        "end": 16.4
      },
      {
        "id": 61,
        "word": "you're",
        "start": 16.4,
        "end": 16.58
      },
      {
        "id": 62,
        "word": "not",
        "start": 16.58,
        "end": 16.7
      },
      {
        "id": 63,
        "word": "supposed",
        "start": 16.7,
        "end": 16.96
      },
      {
        "id": 64,
        "word": "to",
        "start": 16.96,
        "end": 17.1
      },
      {
        "id": 65,
        "word": "combine,",
        "start": 17.1,
        "end": 17.58
      },
      {
        "id": 66,
        "word": "people",
        "start": 17.84,
        "end": 18.26
      },
      {
        "id": 67,
        "word": "get",
        "start": 18.26,
        "end": 18.5
      },
      {
        "id": 68,
        "word": "interested.",
        "start": 18.5,
        "end": 18.84
      },
      {
        "id": 69,
        "word": "It's",
        "start": 18.96,
        "end": 19.02
      },
      {
        "id": 70,
        "word": "like",
        "start": 19.02,
        "end": 19.1
      },
      {
        "id": 71,
        "word": "Bruce",
        "start": 19.1,
        "end": 19.36
      },
      {
        "id": 72,
        "word": "Lee,",
        "start": 19.36,
        "end": 19.56
      },
      {
        "id": 73,
        "word": "right,",
        "start": 19.74,
        "end": 19.82
      },
      {
        "id": 74,
        "word": "striking",
        "start": 20.08,
        "end": 20.3
      },
      {
        "id": 75,
        "word": "thoughts,",
        "start": 20.3,
        "end": 20.8
      },
      {
        "id": 76,
        "word": "philosophy,",
        "start": 21.04,
        "end": 21.46
      },
      {
        "id": 77,
        "word": "plus",
        "start": 21.46,
        "end": 21.94
      },
      {
        "id": 78,
        "word": "martial",
        "start": 21.94,
        "end": 22.32
      },
      {
        "id": 79,
        "word": "arts.",
        "start": 22.32,
        "end": 22.74
      },
      {
        "id": 80,
        "word": "And",
        "start": 23.36,
        "end": 23.84
      },
      {
        "id": 81,
        "word": "I",
        "start": 23.84,
        "end": 24.08
      },
      {
        "id": 82,
        "word": "think",
        "start": 24.08,
        "end": 24.2
      },
      {
        "id": 83,
        "word": "it's",
        "start": 24.2,
        "end": 24.4
      },
      {
        "id": 84,
        "word": "because",
        "start": 24.4,
        "end": 24.74
      },
      {
        "id": 85,
        "word": "at",
        "start": 24.74,
        "end": 24.88
      },
      {
        "id": 86,
        "word": "some",
        "start": 24.88,
        "end": 25.06
      },
      {
        "id": 87,
        "word": "level,",
        "start": 25.06,
        "end": 25.38
      },
      {
        "id": 88,
        "word": "all",
        "start": 25.4,
        "end": 26.08
      },
      {
        "id": 89,
        "word": "humans",
        "start": 26.08,
        "end": 26.52
      },
      {
        "id": 90,
        "word": "are",
        "start": 26.52,
        "end": 27.08
      },
      {
        "id": 91,
        "word": "broad.",
        "start": 27.08,
        "end": 27.54
      },
      {
        "id": 92,
        "word": "We're",
        "start": 27.8,
        "end": 27.94
      },
      {
        "id": 93,
        "word": "all",
        "start": 27.94,
        "end": 28.06
      },
      {
        "id": 94,
        "word": "multivariate,",
        "start": 28.06,
        "end": 28.74
      },
      {
        "id": 95,
        "word": "but",
        "start": 28.84,
        "end": 29.08
      },
      {
        "id": 96,
        "word": "we",
        "start": 29.08,
        "end": 29.26
      },
      {
        "id": 97,
        "word": "get",
        "start": 29.26,
        "end": 29.54
      },
      {
        "id": 98,
        "word": "summarized",
        "start": 29.54,
        "end": 30.52
      },
      {
        "id": 99,
        "word": "in",
        "start": 30.52,
        "end": 30.82
      },
      {
        "id": 100,
        "word": "pithy",
        "start": 30.82,
        "end": 31.18
      },
      {
        "id": 101,
        "word": "ways",
        "start": 31.18,
        "end": 31.46
      },
      {
        "id": 102,
        "word": "in",
        "start": 31.46,
        "end": 31.62
      },
      {
        "id": 103,
        "word": "our",
        "start": 31.62,
        "end": 31.72
      },
      {
        "id": 104,
        "word": "lives.",
        "start": 31.72,
        "end": 32.1
      },
      {
        "id": 105,
        "word": "And",
        "start": 32.24,
        "end": 32.34
      },
      {
        "id": 106,
        "word": "at",
        "start": 32.34,
        "end": 32.9
      },
      {
        "id": 107,
        "word": "some",
        "start": 32.9,
        "end": 33.06
      },
      {
        "id": 108,
        "word": "deep",
        "start": 33.06,
        "end": 33.28
      },
      {
        "id": 109,
        "word": "level,",
        "start": 33.28,
        "end": 33.56
      },
      {
        "id": 110,
        "word": "we",
        "start": 33.64,
        "end": 33.74
      },
      {
        "id": 111,
        "word": "know",
        "start": 33.74,
        "end": 33.86
      },
      {
        "id": 112,
        "word": "that's",
        "start": 33.86,
        "end": 34.12
      },
      {
        "id": 113,
        "word": "not",
        "start": 34.12,
        "end": 34.26
      },
      {
        "id": 114,
        "word": "true,",
        "start": 34.26,
        "end": 34.58
      },
      {
        "id": 115,
        "word": "right?",
        "start": 34.8,
        "end": 34.92
      },
      {
        "id": 116,
        "word": "Every",
        "start": 35.1,
        "end": 35.36
      },
      {
        "id": 117,
        "word": "human",
        "start": 35.36,
        "end": 35.7
      },
      {
        "id": 118,
        "word": "basically",
        "start": 35.7,
        "end": 36.26
      },
      {
        "id": 119,
        "word": "is",
        "start": 36.26,
        "end": 36.52
      },
      {
        "id": 120,
        "word": "capable",
        "start": 36.52,
        "end": 36.82
      },
      {
        "id": 121,
        "word": "of",
        "start": 36.82,
        "end": 37.08
      },
      {
        "id": 122,
        "word": "every",
        "start": 37.08,
        "end": 37.28
      },
      {
        "id": 123,
        "word": "experience",
        "start": 37.28,
        "end": 37.76
      },
      {
        "id": 124,
        "word": "and",
        "start": 37.76,
        "end": 37.96
      },
      {
        "id": 125,
        "word": "every",
        "start": 37.96,
        "end": 38.16
      },
      {
        "id": 126,
        "word": "thought.",
        "start": 38.16,
        "end": 38.48
      },
      {
        "id": 127,
        "word": "You",
        "start": 39.08,
        "end": 39.48
      },
      {
        "id": 128,
        "word": "know,",
        "start": 39.48,
        "end": 39.56
      },
      {
        "id": 129,
        "word": "you're",
        "start": 39.64,
        "end": 39.84
      },
      {
        "id": 130,
        "word": "a",
        "start": 39.84,
        "end": 39.96
      },
      {
        "id": 131,
        "word": "UFC",
        "start": 39.96,
        "end": 40.34
      },
      {
        "id": 132,
        "word": "comedian,",
        "start": 40.34,
        "end": 40.96
      },
      {
        "id": 133,
        "word": "commentator,",
        "start": 41.42,
        "end": 41.9
      },
      {
        "id": 134,
        "word": "podcaster,",
        "start": 42.06,
        "end": 42.56
      },
      {
        "id": 135,
        "word": "but",
        "start": 42.58,
        "end": 42.8
      },
      {
        "id": 136,
        "word": "you're",
        "start": 42.8,
        "end": 42.96
      },
      {
        "id": 137,
        "word": "also",
        "start": 42.96,
        "end": 43.12
      },
      {
        "id": 138,
        "word": "more",
        "start": 43.12,
        "end": 43.36
      },
      {
        "id": 139,
        "word": "than",
        "start": 43.36,
        "end": 43.5
      },
      {
        "id": 140,
        "word": "that.",
        "start": 43.5,
        "end": 43.7
      },
      {
        "id": 141,
        "word": "You're",
        "start": 43.84,
        "end": 43.9
      },
      {
        "id": 142,
        "word": "also",
        "start": 43.9,
        "end": 44.16
      },
      {
        "id": 143,
        "word": "a",
        "start": 44.16,
        "end": 44.36
      },
      {
        "id": 144,
        "word": "father,",
        "start": 44.36,
        "end": 44.68
      },
      {
        "id": 145,
        "word": "lover,",
        "start": 45.18,
        "end": 46.04
      },
      {
        "id": 146,
        "word": "you",
        "start": 46.58,
        "end": 46.58
      },
      {
        "id": 147,
        "word": "know,",
        "start": 46.58,
        "end": 46.72
      },
      {
        "id": 148,
        "word": "thinker,",
        "start": 46.92,
        "end": 47.56
      },
      {
        "id": 149,
        "word": "etc.",
        "start": 47.7,
        "end": 47.86
      }
    ],
    "fullText": "Yeah, you know, I think the reason why people like hearing me is because it's like if you go to a circus and you see a bear, right, that's kind of interesting, but not that much. If you see a unicycle, that's interesting, but you see a bear on a unicycle, that's really interesting, right? So when you combine things you're not supposed to combine, people get interested. It's like Bruce Lee, right, striking thoughts, philosophy, plus martial arts. And I think it's because at some level, all humans are broad. We're all multivariate, but we get summarized in pithy ways in our lives. And at some deep level, we know that's not true, right? Every human basically is capable of every experience and every thought. You know, you're a UFC comedian, commentator, podcaster, but you're also more than that. You're also a father, lover, you know, thinker, etc.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-rogan",
    "watermarkHandle": "@joerogan",
    "copy": {
      "youtubeTitle": "The reason why people like hearing me is #shorts",
      "youtubeDescription": "Yeah, you know, I think the reason why people like hearing me is because it's like if you go to a circus and you see a bear, right, that's kind of interesting, but not that much. If you see a unicycle, that's interesting, but you see a bear on a unicycle, that's really interesting, right? So when you combine things you're not supposed to combine, people get interested. It's like Bruce Lee, right, striking thoughts, philosophy, plus martial arts. And I think it's because at some level, all humans are broad. We're all multivariate, but we get summarized in pithy ways in our lives. And at some deep level, we know that's not true, right? Every human basically is capable of every experience and every thought. You know, you're a UFC comedian, commentator, podcaster, but you're also more than that. You're also a father, lover, you know, thinker, etc.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "Yeah, you know, I think the reason why people like hearing me is because it's like if you go to a circus and you see a bear, right, that's kind of interesting, but not that much. I... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-rogan-5",
    "index": 5,
    "title": "Important Topic Breakdown",
    "startTime": 2327.0,
    "endTime": 2369.3,
    "duration": 42.3,
    "viralityScore": 73,
    "factors": {
      "hook": 51,
      "acoustics": 84,
      "pace": 100,
      "payoff": 90,
      "sentiment": 20,
      "duration": 99
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_05_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_05_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "Right?",
        "start": 0.0,
        "end": 0.44
      },
      {
        "id": 2,
        "word": "These",
        "start": 0.7,
        "end": 0.94
      },
      {
        "id": 3,
        "word": "are",
        "start": 0.94,
        "end": 1.1
      },
      {
        "id": 4,
        "word": "still",
        "start": 1.1,
        "end": 1.44
      },
      {
        "id": 5,
        "word": "man",
        "start": 1.44,
        "end": 2.46
      },
      {
        "id": 6,
        "word": "-made,",
        "start": 2.46,
        "end": 2.9
      },
      {
        "id": 7,
        "word": "very",
        "start": 3.1,
        "end": 3.58
      },
      {
        "id": 8,
        "word": "closed,",
        "start": 3.58,
        "end": 4.26
      },
      {
        "id": 9,
        "word": "bounded",
        "start": 4.64,
        "end": 4.9
      },
      {
        "id": 10,
        "word": "games.",
        "start": 4.9,
        "end": 5.34
      },
      {
        "id": 11,
        "word": "They're",
        "start": 5.34,
        "end": 6.16
      },
      {
        "id": 12,
        "word": "not",
        "start": 6.16,
        "end": 6.78
      },
      {
        "id": 13,
        "word": "on",
        "start": 6.78,
        "end": 7.8
      },
      {
        "id": 14,
        "word": "the",
        "start": 7.8,
        "end": 7.98
      },
      {
        "id": 15,
        "word": "road",
        "start": 7.98,
        "end": 8.3
      },
      {
        "id": 16,
        "word": "to",
        "start": 8.3,
        "end": 8.48
      },
      {
        "id": 17,
        "word": "the",
        "start": 8.48,
        "end": 8.6
      },
      {
        "id": 18,
        "word": "unbounded",
        "start": 8.6,
        "end": 9.2
      },
      {
        "id": 19,
        "word": "game",
        "start": 9.2,
        "end": 9.36
      },
      {
        "id": 20,
        "word": "of",
        "start": 9.36,
        "end": 9.54
      },
      {
        "id": 21,
        "word": "life.",
        "start": 9.54,
        "end": 9.84
      },
      {
        "id": 22,
        "word": "They",
        "start": 10.16,
        "end": 10.58
      },
      {
        "id": 23,
        "word": "are",
        "start": 10.58,
        "end": 10.8
      },
      {
        "id": 24,
        "word": "completely",
        "start": 10.8,
        "end": 11.54
      },
      {
        "id": 25,
        "word": "artificial.",
        "start": 11.54,
        "end": 12.16
      },
      {
        "id": 26,
        "word": "But",
        "start": 12.48,
        "end": 12.8
      },
      {
        "id": 27,
        "word": "didn't",
        "start": 12.8,
        "end": 13.5
      },
      {
        "id": 28,
        "word": "Go,",
        "start": 13.5,
        "end": 13.88
      },
      {
        "id": 29,
        "word": "didn't",
        "start": 14.34,
        "end": 14.98
      },
      {
        "id": 30,
        "word": "that",
        "start": 14.98,
        "end": 15.28
      },
      {
        "id": 31,
        "word": "give",
        "start": 15.28,
        "end": 15.58
      },
      {
        "id": 32,
        "word": "you",
        "start": 15.58,
        "end": 15.72
      },
      {
        "id": 33,
        "word": "like",
        "start": 15.72,
        "end": 15.86
      },
      {
        "id": 34,
        "word": "a",
        "start": 15.86,
        "end": 15.96
      },
      {
        "id": 35,
        "word": "little",
        "start": 15.96,
        "end": 16.1
      },
      {
        "id": 36,
        "word": "bit",
        "start": 16.1,
        "end": 16.3
      },
      {
        "id": 37,
        "word": "of",
        "start": 16.3,
        "end": 16.46
      },
      {
        "id": 38,
        "word": "a",
        "start": 16.46,
        "end": 16.6
      },
      {
        "id": 39,
        "word": "pause?",
        "start": 16.6,
        "end": 17.12
      },
      {
        "id": 40,
        "word": "A",
        "start": 17.32,
        "end": 17.54
      },
      {
        "id": 41,
        "word": "little",
        "start": 17.54,
        "end": 17.7
      },
      {
        "id": 42,
        "word": "bit.",
        "start": 17.7,
        "end": 17.9
      },
      {
        "id": 43,
        "word": "Go",
        "start": 18.1,
        "end": 18.18
      },
      {
        "id": 44,
        "word": "is",
        "start": 18.18,
        "end": 18.34
      },
      {
        "id": 45,
        "word": "not,",
        "start": 18.34,
        "end": 18.54
      },
      {
        "id": 46,
        "word": "Go",
        "start": 18.74,
        "end": 19.16
      },
      {
        "id": 47,
        "word": "or",
        "start": 19.16,
        "end": 19.34
      },
      {
        "id": 48,
        "word": "League",
        "start": 19.34,
        "end": 19.52
      },
      {
        "id": 49,
        "word": "of",
        "start": 19.52,
        "end": 19.66
      },
      {
        "id": 50,
        "word": "Legends",
        "start": 19.66,
        "end": 19.94
      },
      {
        "id": 51,
        "word": "or",
        "start": 19.94,
        "end": 20.14
      },
      {
        "id": 52,
        "word": "Fortnite,",
        "start": 20.14,
        "end": 20.42
      },
      {
        "id": 53,
        "word": "they're",
        "start": 20.58,
        "end": 20.68
      },
      {
        "id": 54,
        "word": "not",
        "start": 20.68,
        "end": 20.8
      },
      {
        "id": 55,
        "word": "completely",
        "start": 20.8,
        "end": 21.3
      },
      {
        "id": 56,
        "word": "deterministic.",
        "start": 21.3,
        "end": 22.12
      },
      {
        "id": 57,
        "word": "Right.",
        "start": 22.28,
        "end": 22.56
      },
      {
        "id": 58,
        "word": "But",
        "start": 22.56,
        "end": 23.3
      },
      {
        "id": 59,
        "word": "they're",
        "start": 23.3,
        "end": 23.76
      },
      {
        "id": 60,
        "word": "still",
        "start": 23.76,
        "end": 24.04
      },
      {
        "id": 61,
        "word": "very",
        "start": 24.04,
        "end": 24.56
      },
      {
        "id": 62,
        "word": "artificial,",
        "start": 24.56,
        "end": 25.06
      },
      {
        "id": 63,
        "word": "very",
        "start": 25.3,
        "end": 25.42
      },
      {
        "id": 64,
        "word": "bounded",
        "start": 25.42,
        "end": 25.74
      },
      {
        "id": 65,
        "word": "games.",
        "start": 25.74,
        "end": 26.14
      },
      {
        "id": 66,
        "word": "Being",
        "start": 26.62,
        "end": 26.76
      },
      {
        "id": 67,
        "word": "good",
        "start": 26.76,
        "end": 27.0
      },
      {
        "id": 68,
        "word": "at",
        "start": 27.0,
        "end": 27.16
      },
      {
        "id": 69,
        "word": "Go",
        "start": 27.16,
        "end": 27.38
      },
      {
        "id": 70,
        "word": "doesn't",
        "start": 27.38,
        "end": 27.78
      },
      {
        "id": 71,
        "word": "mean",
        "start": 27.78,
        "end": 27.94
      },
      {
        "id": 72,
        "word": "that",
        "start": 27.94,
        "end": 28.1
      },
      {
        "id": 73,
        "word": "you",
        "start": 28.1,
        "end": 28.22
      },
      {
        "id": 74,
        "word": "can",
        "start": 28.22,
        "end": 28.34
      },
      {
        "id": 75,
        "word": "then",
        "start": 28.34,
        "end": 28.56
      },
      {
        "id": 76,
        "word": "suddenly",
        "start": 28.56,
        "end": 28.92
      },
      {
        "id": 77,
        "word": "figure",
        "start": 28.92,
        "end": 29.18
      },
      {
        "id": 78,
        "word": "out",
        "start": 29.18,
        "end": 29.3
      },
      {
        "id": 79,
        "word": "how",
        "start": 29.3,
        "end": 29.4
      },
      {
        "id": 80,
        "word": "to",
        "start": 29.4,
        "end": 29.48
      },
      {
        "id": 81,
        "word": "write",
        "start": 29.48,
        "end": 29.66
      },
      {
        "id": 82,
        "word": "great",
        "start": 29.66,
        "end": 29.84
      },
      {
        "id": 83,
        "word": "poetry.",
        "start": 29.84,
        "end": 30.26
      },
      {
        "id": 84,
        "word": "Right.",
        "start": 30.54,
        "end": 30.66
      },
      {
        "id": 85,
        "word": "The",
        "start": 31.18,
        "end": 31.3
      },
      {
        "id": 86,
        "word": "creativity",
        "start": 31.3,
        "end": 31.86
      },
      {
        "id": 87,
        "word": "for",
        "start": 31.86,
        "end": 32.3
      },
      {
        "id": 88,
        "word": "sure",
        "start": 32.3,
        "end": 32.6
      },
      {
        "id": 89,
        "word": "is",
        "start": 32.6,
        "end": 32.94
      },
      {
        "id": 90,
        "word": "something",
        "start": 32.94,
        "end": 33.18
      },
      {
        "id": 91,
        "word": "that's",
        "start": 33.18,
        "end": 33.48
      },
      {
        "id": 92,
        "word": "very...",
        "start": 33.48,
        "end": 33.84
      },
      {
        "id": 93,
        "word": "Creativity",
        "start": 33.84,
        "end": 34.06
      },
      {
        "id": 94,
        "word": "is",
        "start": 34.06,
        "end": 34.26
      },
      {
        "id": 95,
        "word": "the",
        "start": 34.26,
        "end": 34.36
      },
      {
        "id": 96,
        "word": "last",
        "start": 34.36,
        "end": 34.64
      },
      {
        "id": 97,
        "word": "frontier.",
        "start": 34.64,
        "end": 35.08
      },
      {
        "id": 98,
        "word": "So",
        "start": 35.3,
        "end": 35.36
      },
      {
        "id": 99,
        "word": "I",
        "start": 35.36,
        "end": 35.5
      },
      {
        "id": 100,
        "word": "do",
        "start": 35.5,
        "end": 35.7
      },
      {
        "id": 101,
        "word": "believe",
        "start": 35.7,
        "end": 36.04
      },
      {
        "id": 102,
        "word": "that",
        "start": 36.04,
        "end": 36.32
      },
      {
        "id": 103,
        "word": "automation",
        "start": 36.32,
        "end": 36.86
      },
      {
        "id": 104,
        "word": "over",
        "start": 36.86,
        "end": 37.28
      },
      {
        "id": 105,
        "word": "a",
        "start": 37.28,
        "end": 37.46
      },
      {
        "id": 106,
        "word": "long",
        "start": 37.46,
        "end": 37.58
      },
      {
        "id": 107,
        "word": "enough",
        "start": 37.58,
        "end": 37.76
      },
      {
        "id": 108,
        "word": "period",
        "start": 37.76,
        "end": 37.92
      },
      {
        "id": 109,
        "word": "of",
        "start": 37.92,
        "end": 38.04
      },
      {
        "id": 110,
        "word": "time",
        "start": 38.04,
        "end": 38.32
      },
      {
        "id": 111,
        "word": "will",
        "start": 38.32,
        "end": 38.54
      },
      {
        "id": 112,
        "word": "replace",
        "start": 38.54,
        "end": 38.92
      },
      {
        "id": 113,
        "word": "every",
        "start": 38.92,
        "end": 39.22
      },
      {
        "id": 114,
        "word": "non",
        "start": 39.22,
        "end": 39.52
      },
      {
        "id": 115,
        "word": "-creative",
        "start": 39.52,
        "end": 39.9
      },
      {
        "id": 116,
        "word": "job",
        "start": 39.9,
        "end": 40.18
      },
      {
        "id": 117,
        "word": "or",
        "start": 40.18,
        "end": 41.16
      },
      {
        "id": 118,
        "word": "every",
        "start": 41.16,
        "end": 41.4
      },
      {
        "id": 119,
        "word": "non",
        "start": 41.4,
        "end": 41.64
      },
      {
        "id": 120,
        "word": "-creative",
        "start": 41.64,
        "end": 42.04
      },
      {
        "id": 121,
        "word": "work.",
        "start": 42.04,
        "end": 42.3
      }
    ],
    "fullText": "Right? These are still man -made, very closed, bounded games. They're not on the road to the unbounded game of life. They are completely artificial. But didn't Go, didn't that give you like a little bit of a pause? A little bit. Go is not, Go or League of Legends or Fortnite, they're not completely deterministic. Right. But they're still very artificial, very bounded games. Being good at Go doesn't mean that you can then suddenly figure out how to write great poetry. Right. The creativity for sure is something that's very... Creativity is the last frontier. So I do believe that automation over a long enough period of time will replace every non -creative job or every non -creative work.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-rogan",
    "watermarkHandle": "@joerogan",
    "copy": {
      "youtubeTitle": "Important Topic Breakdown #shorts",
      "youtubeDescription": "Right? These are still man -made, very closed, bounded games. They're not on the road to the unbounded game of life. They are completely artificial. But didn't Go, didn't that give you like a little bit of a pause? A little bit. Go is not, Go or League of Legends or Fortnite, they're not completely deterministic. Right. But they're still very artificial, very bounded games. Being good at Go doesn't mean that you can then suddenly figure out how to write great poetry. Right. The creativity for sure is something that's very... Creativity is the last frontier. So I do believe that automation over a long enough period of time will replace every non -creative job or every non -creative work.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "Right? These are still man -made, very closed, bounded games. They're not on the road to the unbounded game of life. They are completely artificial. But didn't Go, didn't that give... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-aakash-1",
    "index": 1,
    "title": "You don't have to go to jail",
    "startTime": 1707.86,
    "endTime": 1748.26,
    "duration": 40.4,
    "viralityScore": 92,
    "factors": {
      "hook": 100,
      "acoustics": 86,
      "pace": 100,
      "payoff": 65,
      "sentiment": 100,
      "duration": 96
    },
    "status": "approved",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_01_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_01_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "you",
        "start": 0.0,
        "end": 0.44
      },
      {
        "id": 2,
        "word": "don't",
        "start": 0.44,
        "end": 0.88
      },
      {
        "id": 3,
        "word": "have",
        "start": 0.88,
        "end": 0.88
      },
      {
        "id": 4,
        "word": "to",
        "start": 0.88,
        "end": 1.04
      },
      {
        "id": 5,
        "word": "go",
        "start": 1.04,
        "end": 1.1
      },
      {
        "id": 6,
        "word": "to",
        "start": 1.1,
        "end": 1.1
      },
      {
        "id": 7,
        "word": "jail.",
        "start": 1.1,
        "end": 1.1
      },
      {
        "id": 8,
        "word": "They",
        "start": 1.94,
        "end": 2.38
      },
      {
        "id": 9,
        "word": "go",
        "start": 2.38,
        "end": 2.38
      },
      {
        "id": 10,
        "word": "to",
        "start": 2.38,
        "end": 2.38
      },
      {
        "id": 11,
        "word": "the",
        "start": 2.38,
        "end": 2.38
      },
      {
        "id": 12,
        "word": "rickshaw.",
        "start": 2.38,
        "end": 2.78
      },
      {
        "id": 13,
        "word": "They'll",
        "start": 2.9,
        "end": 2.92
      },
      {
        "id": 14,
        "word": "Google",
        "start": 2.92,
        "end": 3.12
      },
      {
        "id": 15,
        "word": "it.",
        "start": 3.12,
        "end": 3.4
      },
      {
        "id": 16,
        "word": "They",
        "start": 3.86,
        "end": 4.16
      },
      {
        "id": 17,
        "word": "know",
        "start": 4.16,
        "end": 4.38
      },
      {
        "id": 18,
        "word": "what's",
        "start": 4.38,
        "end": 4.88
      },
      {
        "id": 19,
        "word": "going",
        "start": 4.88,
        "end": 4.88
      },
      {
        "id": 20,
        "word": "on.",
        "start": 4.88,
        "end": 4.98
      },
      {
        "id": 21,
        "word": "There's",
        "start": 5.1,
        "end": 5.26
      },
      {
        "id": 22,
        "word": "a",
        "start": 5.26,
        "end": 5.32
      },
      {
        "id": 23,
        "word": "main",
        "start": 5.32,
        "end": 6.66
      },
      {
        "id": 24,
        "word": "road.",
        "start": 6.66,
        "end": 6.88
      },
      {
        "id": 25,
        "word": "Jail",
        "start": 7.42,
        "end": 7.86
      },
      {
        "id": 26,
        "word": "Road.",
        "start": 7.86,
        "end": 8.06
      },
      {
        "id": 27,
        "word": "What",
        "start": 10.14,
        "end": 10.58
      },
      {
        "id": 28,
        "word": "an",
        "start": 10.58,
        "end": 10.74
      },
      {
        "id": 29,
        "word": "innovative",
        "start": 10.74,
        "end": 11.06
      },
      {
        "id": 30,
        "word": "name.",
        "start": 11.06,
        "end": 11.36
      },
      {
        "id": 31,
        "word": "Jail",
        "start": 12.56,
        "end": 13.08
      },
      {
        "id": 32,
        "word": "road.",
        "start": 13.08,
        "end": 13.32
      },
      {
        "id": 33,
        "word": "Jail",
        "start": 13.58,
        "end": 13.76
      },
      {
        "id": 34,
        "word": "road.",
        "start": 13.76,
        "end": 14.0
      },
      {
        "id": 35,
        "word": "Jail",
        "start": 14.52,
        "end": 15.04
      },
      {
        "id": 36,
        "word": "road.",
        "start": 15.04,
        "end": 15.04
      },
      {
        "id": 37,
        "word": "Nala",
        "start": 15.04,
        "end": 15.2
      },
      {
        "id": 38,
        "word": "road.",
        "start": 15.2,
        "end": 15.44
      },
      {
        "id": 39,
        "word": "Nala",
        "start": 15.74,
        "end": 15.84
      },
      {
        "id": 40,
        "word": "road.",
        "start": 15.84,
        "end": 16.12
      },
      {
        "id": 41,
        "word": "Why",
        "start": 16.7,
        "end": 17.22
      },
      {
        "id": 42,
        "word": "are",
        "start": 17.22,
        "end": 17.28
      },
      {
        "id": 43,
        "word": "you",
        "start": 17.28,
        "end": 17.28
      },
      {
        "id": 44,
        "word": "thinking?",
        "start": 17.28,
        "end": 17.52
      },
      {
        "id": 45,
        "word": "The",
        "start": 21.24,
        "end": 21.76
      },
      {
        "id": 46,
        "word": "whole",
        "start": 21.76,
        "end": 21.9
      },
      {
        "id": 47,
        "word": "road",
        "start": 21.9,
        "end": 22.16
      },
      {
        "id": 48,
        "word": "has",
        "start": 22.16,
        "end": 22.34
      },
      {
        "id": 49,
        "word": "a",
        "start": 22.34,
        "end": 22.42
      },
      {
        "id": 50,
        "word": "wall.",
        "start": 22.42,
        "end": 22.76
      },
      {
        "id": 51,
        "word": "It's",
        "start": 22.94,
        "end": 23.0
      },
      {
        "id": 52,
        "word": "so",
        "start": 23.0,
        "end": 23.48
      },
      {
        "id": 53,
        "word": "beautiful",
        "start": 23.48,
        "end": 23.9
      },
      {
        "id": 54,
        "word": "poem.",
        "start": 23.9,
        "end": 24.28
      },
      {
        "id": 55,
        "word": "It's",
        "start": 25.1,
        "end": 25.58
      },
      {
        "id": 56,
        "word": "written",
        "start": 25.58,
        "end": 25.66
      },
      {
        "id": 57,
        "word": "by",
        "start": 25.66,
        "end": 25.66
      },
      {
        "id": 58,
        "word": "a",
        "start": 25.66,
        "end": 25.98
      },
      {
        "id": 59,
        "word": "man.",
        "start": 25.98,
        "end": 26.8
      },
      {
        "id": 60,
        "word": "It's",
        "start": 26.8,
        "end": 26.9
      },
      {
        "id": 61,
        "word": "written",
        "start": 26.9,
        "end": 27.14
      },
      {
        "id": 62,
        "word": "by",
        "start": 27.14,
        "end": 27.14
      },
      {
        "id": 63,
        "word": "a",
        "start": 27.14,
        "end": 27.14
      },
      {
        "id": 64,
        "word": "man.",
        "start": 27.14,
        "end": 27.14
      },
      {
        "id": 65,
        "word": "It's",
        "start": 27.32,
        "end": 27.54
      },
      {
        "id": 66,
        "word": "a",
        "start": 27.54,
        "end": 28.18
      },
      {
        "id": 67,
        "word": "love",
        "start": 28.18,
        "end": 28.38
      },
      {
        "id": 68,
        "word": "letter.",
        "start": 28.38,
        "end": 28.66
      },
      {
        "id": 69,
        "word": "It's",
        "start": 28.82,
        "end": 29.2
      },
      {
        "id": 70,
        "word": "a",
        "start": 29.2,
        "end": 29.26
      },
      {
        "id": 71,
        "word": "woman",
        "start": 29.26,
        "end": 29.54
      },
      {
        "id": 72,
        "word": "who",
        "start": 29.54,
        "end": 30.34
      },
      {
        "id": 73,
        "word": "is",
        "start": 30.34,
        "end": 30.36
      },
      {
        "id": 74,
        "word": "in",
        "start": 30.36,
        "end": 30.46
      },
      {
        "id": 75,
        "word": "jail.",
        "start": 30.46,
        "end": 30.56
      },
      {
        "id": 76,
        "word": "She",
        "start": 31.06,
        "end": 31.16
      },
      {
        "id": 77,
        "word": "doesn't",
        "start": 31.16,
        "end": 31.42
      },
      {
        "id": 78,
        "word": "know",
        "start": 31.42,
        "end": 31.56
      },
      {
        "id": 79,
        "word": "when",
        "start": 31.56,
        "end": 31.74
      },
      {
        "id": 80,
        "word": "she",
        "start": 31.74,
        "end": 31.96
      },
      {
        "id": 81,
        "word": "will",
        "start": 31.96,
        "end": 32.02
      },
      {
        "id": 82,
        "word": "come.",
        "start": 32.02,
        "end": 32.02
      },
      {
        "id": 83,
        "word": "So,",
        "start": 32.82,
        "end": 33.18
      },
      {
        "id": 84,
        "word": "it's",
        "start": 33.34,
        "end": 33.34
      },
      {
        "id": 85,
        "word": "like",
        "start": 33.34,
        "end": 33.4
      },
      {
        "id": 86,
        "word": "a",
        "start": 33.4,
        "end": 33.48
      },
      {
        "id": 87,
        "word": "poem.",
        "start": 33.48,
        "end": 34.56
      },
      {
        "id": 88,
        "word": "I",
        "start": 34.88,
        "end": 35.36
      },
      {
        "id": 89,
        "word": "write",
        "start": 35.36,
        "end": 35.6
      },
      {
        "id": 90,
        "word": "in",
        "start": 35.6,
        "end": 35.84
      },
      {
        "id": 91,
        "word": "the",
        "start": 35.84,
        "end": 35.84
      },
      {
        "id": 92,
        "word": "morning.",
        "start": 35.84,
        "end": 35.84
      },
      {
        "id": 93,
        "word": "I",
        "start": 36.44,
        "end": 36.92
      },
      {
        "id": 94,
        "word": "write",
        "start": 36.92,
        "end": 37.28
      },
      {
        "id": 95,
        "word": "in",
        "start": 37.28,
        "end": 37.28
      },
      {
        "id": 96,
        "word": "the",
        "start": 37.28,
        "end": 37.28
      },
      {
        "id": 97,
        "word": "evening.",
        "start": 37.28,
        "end": 37.28
      },
      {
        "id": 98,
        "word": "I",
        "start": 38.34,
        "end": 38.34
      },
      {
        "id": 99,
        "word": "write",
        "start": 38.34,
        "end": 38.36
      },
      {
        "id": 100,
        "word": "in",
        "start": 38.36,
        "end": 38.36
      },
      {
        "id": 101,
        "word": "the",
        "start": 38.36,
        "end": 38.48
      },
      {
        "id": 102,
        "word": "evening.",
        "start": 38.48,
        "end": 39.8
      },
      {
        "id": 103,
        "word": "I",
        "start": 39.8,
        "end": 39.8
      },
      {
        "id": 104,
        "word": "write",
        "start": 39.8,
        "end": 40.4
      },
      {
        "id": 105,
        "word": "in",
        "start": 40.4,
        "end": 40.4
      },
      {
        "id": 106,
        "word": "the",
        "start": 40.4,
        "end": 40.4
      },
      {
        "id": 107,
        "word": "evening.",
        "start": 40.4,
        "end": 40.4
      }
    ],
    "fullText": "you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road. What an innovative name. Jail road. Jail road. Jail road. Nala road. Nala road. Why are you thinking? The whole road has a wall. It's so beautiful poem. It's written by a man. It's written by a man. It's a love letter. It's a woman who is in jail. She doesn't know when she will come. So, it's like a poem. I write in the morning. I write in the evening. I write in the evening. I write in the evening.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-aakash",
    "watermarkHandle": "@aakashgupta",
    "copy": {
      "youtubeTitle": "You don't have to go to jail #shorts",
      "youtubeDescription": "you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road. What an innovative name. Jail road. Jail road. Jail road. Nala road. Nala road. Why are you thinking? The whole road has a wall. It's so beautiful poem. It's written by a man. It's written by a man. It's a love letter. It's a woman who is in jail. She doesn't know when she will come. So, it's like a poem. I write in the morning. I write in the evening. I write in the evening. I write in the evening.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road. What an innovative name. Jail road. Jail road. ... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-aakash-2",
    "index": 2,
    "title": "I want to murder",
    "startTime": 1054.14,
    "endTime": 1084.82,
    "duration": 30.68,
    "viralityScore": 85,
    "factors": {
      "hook": 100,
      "acoustics": 81,
      "pace": 90,
      "payoff": 65,
      "sentiment": 88,
      "duration": 72
    },
    "status": "approved",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_02_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_02_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "I",
        "start": 0.0,
        "end": 0.42
      },
      {
        "id": 2,
        "word": "want",
        "start": 0.42,
        "end": 0.46
      },
      {
        "id": 3,
        "word": "to",
        "start": 0.46,
        "end": 0.5
      },
      {
        "id": 4,
        "word": "murder",
        "start": 0.5,
        "end": 0.64
      },
      {
        "id": 5,
        "word": "so",
        "start": 0.64,
        "end": 1.3
      },
      {
        "id": 6,
        "word": "that",
        "start": 1.3,
        "end": 1.46
      },
      {
        "id": 7,
        "word": "I",
        "start": 1.46,
        "end": 1.54
      },
      {
        "id": 8,
        "word": "will",
        "start": 1.54,
        "end": 1.62
      },
      {
        "id": 9,
        "word": "go",
        "start": 1.62,
        "end": 1.98
      },
      {
        "id": 10,
        "word": "to",
        "start": 1.98,
        "end": 2.08
      },
      {
        "id": 11,
        "word": "jail.",
        "start": 2.08,
        "end": 2.24
      },
      {
        "id": 12,
        "word": "I'm",
        "start": 3.36,
        "end": 3.78
      },
      {
        "id": 13,
        "word": "changing",
        "start": 3.78,
        "end": 3.8
      },
      {
        "id": 14,
        "word": "the",
        "start": 3.8,
        "end": 3.88
      },
      {
        "id": 15,
        "word": "playlist.",
        "start": 3.88,
        "end": 4.1
      },
      {
        "id": 16,
        "word": "You",
        "start": 8.9,
        "end": 9.32
      },
      {
        "id": 17,
        "word": "are",
        "start": 9.32,
        "end": 9.46
      },
      {
        "id": 18,
        "word": "the",
        "start": 9.46,
        "end": 9.48
      },
      {
        "id": 19,
        "word": "same.",
        "start": 9.48,
        "end": 10.2
      },
      {
        "id": 20,
        "word": "Mix",
        "start": 11.68,
        "end": 12.1
      },
      {
        "id": 21,
        "word": "and",
        "start": 12.1,
        "end": 12.34
      },
      {
        "id": 22,
        "word": "match.",
        "start": 12.34,
        "end": 12.52
      },
      {
        "id": 23,
        "word": "What",
        "start": 13.76,
        "end": 14.18
      },
      {
        "id": 24,
        "word": "do",
        "start": 14.18,
        "end": 14.34
      },
      {
        "id": 25,
        "word": "you",
        "start": 14.34,
        "end": 14.4
      },
      {
        "id": 26,
        "word": "see?",
        "start": 14.4,
        "end": 14.42
      },
      {
        "id": 27,
        "word": "You",
        "start": 14.7,
        "end": 14.82
      },
      {
        "id": 28,
        "word": "can",
        "start": 14.82,
        "end": 14.96
      },
      {
        "id": 29,
        "word": "play",
        "start": 14.96,
        "end": 15.0
      },
      {
        "id": 30,
        "word": "Punjabi.",
        "start": 15.0,
        "end": 15.52
      },
      {
        "id": 31,
        "word": "It",
        "start": 16.56,
        "end": 16.98
      },
      {
        "id": 32,
        "word": "will",
        "start": 16.98,
        "end": 17.02
      },
      {
        "id": 33,
        "word": "be",
        "start": 17.02,
        "end": 17.04
      },
      {
        "id": 34,
        "word": "a",
        "start": 17.04,
        "end": 17.08
      },
      {
        "id": 35,
        "word": "place",
        "start": 17.08,
        "end": 17.28
      },
      {
        "id": 36,
        "word": "in",
        "start": 17.28,
        "end": 17.68
      },
      {
        "id": 37,
        "word": "the",
        "start": 17.68,
        "end": 17.72
      },
      {
        "id": 38,
        "word": "morning.",
        "start": 17.72,
        "end": 17.72
      },
      {
        "id": 39,
        "word": "Like",
        "start": 19.08,
        "end": 19.5
      },
      {
        "id": 40,
        "word": "Micah",
        "start": 19.5,
        "end": 19.92
      },
      {
        "id": 41,
        "word": "Ba",
        "start": 19.92,
        "end": 20.0
      },
      {
        "id": 42,
        "word": "Ji's",
        "start": 20.0,
        "end": 20.32
      },
      {
        "id": 43,
        "word": "songs,",
        "start": 20.32,
        "end": 20.32
      },
      {
        "id": 44,
        "word": "you",
        "start": 20.8,
        "end": 20.9
      },
      {
        "id": 45,
        "word": "play",
        "start": 20.9,
        "end": 21.08
      },
      {
        "id": 46,
        "word": "at",
        "start": 21.08,
        "end": 21.28
      },
      {
        "id": 47,
        "word": "6",
        "start": 21.28,
        "end": 21.56
      },
      {
        "id": 48,
        "word": "o",
        "start": 21.56,
        "end": 21.56
      },
      {
        "id": 49,
        "word": "'clock.",
        "start": 21.56,
        "end": 21.86
      },
      {
        "id": 50,
        "word": "On",
        "start": 22.16,
        "end": 22.52
      },
      {
        "id": 51,
        "word": "the",
        "start": 22.52,
        "end": 22.54
      },
      {
        "id": 52,
        "word": "loudspeaker.",
        "start": 22.54,
        "end": 23.04
      },
      {
        "id": 53,
        "word": "With",
        "start": 28.48,
        "end": 28.74
      },
      {
        "id": 54,
        "word": "my",
        "start": 28.74,
        "end": 29.48
      },
      {
        "id": 55,
        "word": "feet",
        "start": 29.48,
        "end": 30.42
      },
      {
        "id": 56,
        "word": "in",
        "start": 30.42,
        "end": 30.42
      },
      {
        "id": 57,
        "word": "the",
        "start": 30.42,
        "end": 30.68
      },
      {
        "id": 58,
        "word": "morning.",
        "start": 30.68,
        "end": 30.68
      }
    ],
    "fullText": "I want to murder so that I will go to jail. I'm changing the playlist. You are the same. Mix and match. What do you see? You can play Punjabi. It will be a place in the morning. Like Micah Ba Ji's songs, you play at 6 o 'clock. On the loudspeaker. With my feet in the morning.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-aakash",
    "watermarkHandle": "@aakashgupta",
    "copy": {
      "youtubeTitle": "I want to murder #shorts",
      "youtubeDescription": "I want to murder so that I will go to jail. I'm changing the playlist. You are the same. Mix and match. What do you see? You can play Punjabi. It will be a place in the morning. Like Micah Ba Ji's songs, you play at 6 o 'clock. On the loudspeaker. With my feet in the morning.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "I want to murder so that I will go to jail. I'm changing the playlist. You are the same. Mix and match. What do you see? You can play Punjabi. It will be a place in the morning. Li... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-aakash-3",
    "index": 3,
    "title": "I don't know how to go to jail",
    "startTime": 1886.32,
    "endTime": 1929.52,
    "duration": 43.2,
    "viralityScore": 84,
    "factors": {
      "hook": 100,
      "acoustics": 85,
      "pace": 100,
      "payoff": 65,
      "sentiment": 22,
      "duration": 97
    },
    "status": "approved",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_03_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_03_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "I",
        "start": 0.0,
        "end": 0.6
      },
      {
        "id": 2,
        "word": "don't",
        "start": 0.6,
        "end": 0.76
      },
      {
        "id": 3,
        "word": "know",
        "start": 0.76,
        "end": 0.94
      },
      {
        "id": 4,
        "word": "how",
        "start": 0.94,
        "end": 1.2
      },
      {
        "id": 5,
        "word": "to",
        "start": 1.2,
        "end": 1.42
      },
      {
        "id": 6,
        "word": "go",
        "start": 1.42,
        "end": 1.44
      },
      {
        "id": 7,
        "word": "to",
        "start": 1.44,
        "end": 1.44
      },
      {
        "id": 8,
        "word": "jail.",
        "start": 1.44,
        "end": 1.64
      },
      {
        "id": 9,
        "word": "And",
        "start": 2.98,
        "end": 3.58
      },
      {
        "id": 10,
        "word": "especially",
        "start": 3.58,
        "end": 3.78
      },
      {
        "id": 11,
        "word": "if",
        "start": 3.78,
        "end": 3.98
      },
      {
        "id": 12,
        "word": "you",
        "start": 3.98,
        "end": 4.36
      },
      {
        "id": 13,
        "word": "understand,",
        "start": 4.36,
        "end": 4.58
      },
      {
        "id": 14,
        "word": "all",
        "start": 4.74,
        "end": 4.84
      },
      {
        "id": 15,
        "word": "are",
        "start": 4.84,
        "end": 5.24
      },
      {
        "id": 16,
        "word": "all",
        "start": 5.24,
        "end": 5.44
      },
      {
        "id": 17,
        "word": "toppers.",
        "start": 5.44,
        "end": 5.94
      },
      {
        "id": 18,
        "word": "I'm",
        "start": 7.96,
        "end": 8.56
      },
      {
        "id": 19,
        "word": "a",
        "start": 8.56,
        "end": 8.56
      },
      {
        "id": 20,
        "word": "intern.",
        "start": 8.56,
        "end": 9.0
      },
      {
        "id": 21,
        "word": "I",
        "start": 11.0,
        "end": 11.6
      },
      {
        "id": 22,
        "word": "won't",
        "start": 11.6,
        "end": 11.68
      },
      {
        "id": 23,
        "word": "do",
        "start": 11.68,
        "end": 11.68
      },
      {
        "id": 24,
        "word": "it",
        "start": 11.68,
        "end": 11.84
      },
      {
        "id": 25,
        "word": "with",
        "start": 11.84,
        "end": 12.46
      },
      {
        "id": 26,
        "word": "them.",
        "start": 12.46,
        "end": 12.46
      },
      {
        "id": 27,
        "word": "That's",
        "start": 13.84,
        "end": 14.24
      },
      {
        "id": 28,
        "word": "my",
        "start": 14.24,
        "end": 14.24
      },
      {
        "id": 29,
        "word": "first",
        "start": 14.24,
        "end": 14.52
      },
      {
        "id": 30,
        "word": "night",
        "start": 14.52,
        "end": 14.74
      },
      {
        "id": 31,
        "word": "that",
        "start": 14.74,
        "end": 15.02
      },
      {
        "id": 32,
        "word": "you're",
        "start": 15.02,
        "end": 15.26
      },
      {
        "id": 33,
        "word": "taking",
        "start": 15.26,
        "end": 15.44
      },
      {
        "id": 34,
        "word": "work",
        "start": 15.44,
        "end": 15.86
      },
      {
        "id": 35,
        "word": "there",
        "start": 15.86,
        "end": 15.98
      },
      {
        "id": 36,
        "word": "on",
        "start": 15.98,
        "end": 16.08
      },
      {
        "id": 37,
        "word": "certain",
        "start": 16.08,
        "end": 16.18
      },
      {
        "id": 38,
        "word": "news",
        "start": 16.18,
        "end": 16.26
      },
      {
        "id": 39,
        "word": "while",
        "start": 16.26,
        "end": 16.38
      },
      {
        "id": 40,
        "word": "there.",
        "start": 16.38,
        "end": 16.64
      },
      {
        "id": 41,
        "word": "And",
        "start": 17.64,
        "end": 18.04
      },
      {
        "id": 42,
        "word": "that's",
        "start": 18.04,
        "end": 18.12
      },
      {
        "id": 43,
        "word": "how",
        "start": 18.12,
        "end": 18.3
      },
      {
        "id": 44,
        "word": "you've",
        "start": 18.3,
        "end": 18.44
      },
      {
        "id": 45,
        "word": "seen",
        "start": 18.44,
        "end": 18.44
      },
      {
        "id": 46,
        "word": "me",
        "start": 18.44,
        "end": 18.5
      },
      {
        "id": 47,
        "word": "every",
        "start": 18.5,
        "end": 19.0
      },
      {
        "id": 48,
        "word": "day.",
        "start": 19.0,
        "end": 19.18
      },
      {
        "id": 49,
        "word": "Yes,",
        "start": 19.74,
        "end": 20.14
      },
      {
        "id": 50,
        "word": "what",
        "start": 20.28,
        "end": 20.46
      },
      {
        "id": 51,
        "word": "are",
        "start": 20.46,
        "end": 20.48
      },
      {
        "id": 52,
        "word": "you",
        "start": 20.48,
        "end": 20.72
      },
      {
        "id": 53,
        "word": "doing",
        "start": 20.72,
        "end": 20.76
      },
      {
        "id": 54,
        "word": "or",
        "start": 20.76,
        "end": 20.76
      },
      {
        "id": 55,
        "word": "what",
        "start": 20.76,
        "end": 20.88
      },
      {
        "id": 56,
        "word": "are",
        "start": 20.88,
        "end": 20.96
      },
      {
        "id": 57,
        "word": "you",
        "start": 20.96,
        "end": 21.18
      },
      {
        "id": 58,
        "word": "doing?",
        "start": 21.18,
        "end": 21.46
      },
      {
        "id": 59,
        "word": "People",
        "start": 21.64,
        "end": 21.84
      },
      {
        "id": 60,
        "word": "are",
        "start": 21.84,
        "end": 22.04
      },
      {
        "id": 61,
        "word": "telling",
        "start": 22.04,
        "end": 22.14
      },
      {
        "id": 62,
        "word": "me",
        "start": 22.14,
        "end": 22.3
      },
      {
        "id": 63,
        "word": "that",
        "start": 22.3,
        "end": 22.5
      },
      {
        "id": 64,
        "word": "I'm",
        "start": 22.5,
        "end": 22.68
      },
      {
        "id": 65,
        "word": "murdering",
        "start": 22.68,
        "end": 23.14
      },
      {
        "id": 66,
        "word": "that.",
        "start": 23.14,
        "end": 23.48
      },
      {
        "id": 67,
        "word": "And",
        "start": 23.64,
        "end": 23.94
      },
      {
        "id": 68,
        "word": "he",
        "start": 23.94,
        "end": 24.02
      },
      {
        "id": 69,
        "word": "said,",
        "start": 24.02,
        "end": 24.04
      },
      {
        "id": 70,
        "word": "15",
        "start": 24.06,
        "end": 25.08
      },
      {
        "id": 71,
        "word": "full",
        "start": 25.08,
        "end": 25.36
      },
      {
        "id": 72,
        "word": "to",
        "start": 25.36,
        "end": 25.54
      },
      {
        "id": 73,
        "word": "6",
        "start": 25.54,
        "end": 25.66
      },
      {
        "id": 74,
        "word": "men.",
        "start": 25.66,
        "end": 25.94
      },
      {
        "id": 75,
        "word": "Now",
        "start": 27.88,
        "end": 28.28
      },
      {
        "id": 76,
        "word": "that's",
        "start": 28.28,
        "end": 28.48
      },
      {
        "id": 77,
        "word": "more",
        "start": 28.48,
        "end": 28.64
      },
      {
        "id": 78,
        "word": "better",
        "start": 28.64,
        "end": 28.68
      },
      {
        "id": 79,
        "word": "chicken",
        "start": 28.68,
        "end": 28.92
      },
      {
        "id": 80,
        "word": "such",
        "start": 28.92,
        "end": 29.28
      },
      {
        "id": 81,
        "word": "as",
        "start": 29.28,
        "end": 29.62
      },
      {
        "id": 82,
        "word": "myself.",
        "start": 29.62,
        "end": 29.62
      },
      {
        "id": 83,
        "word": "That's",
        "start": 30.98,
        "end": 31.3
      },
      {
        "id": 84,
        "word": "how",
        "start": 31.3,
        "end": 31.32
      },
      {
        "id": 85,
        "word": "it",
        "start": 31.32,
        "end": 31.38
      },
      {
        "id": 86,
        "word": "went",
        "start": 31.38,
        "end": 31.72
      },
      {
        "id": 87,
        "word": "with",
        "start": 31.72,
        "end": 31.82
      },
      {
        "id": 88,
        "word": "one",
        "start": 31.82,
        "end": 31.88
      },
      {
        "id": 89,
        "word": "pair",
        "start": 31.88,
        "end": 32.04
      },
      {
        "id": 90,
        "word": "of",
        "start": 32.04,
        "end": 32.14
      },
      {
        "id": 91,
        "word": "vosks.",
        "start": 32.14,
        "end": 32.34
      },
      {
        "id": 92,
        "word": "He",
        "start": 34.58,
        "end": 34.98
      },
      {
        "id": 93,
        "word": "said,",
        "start": 34.98,
        "end": 35.02
      },
      {
        "id": 94,
        "word": "you've",
        "start": 35.06,
        "end": 35.3
      },
      {
        "id": 95,
        "word": "made",
        "start": 35.3,
        "end": 35.42
      },
      {
        "id": 96,
        "word": "Dannieabai",
        "start": 35.42,
        "end": 36.36
      },
      {
        "id": 97,
        "word": "kidney?",
        "start": 36.36,
        "end": 36.82
      },
      {
        "id": 98,
        "word": "d\u00e1'm",
        "start": 38.36,
        "end": 38.76
      },
      {
        "id": 99,
        "word": "entrepreneur.",
        "start": 38.76,
        "end": 39.1
      },
      {
        "id": 100,
        "word": "I",
        "start": 42.4,
        "end": 42.8
      },
      {
        "id": 101,
        "word": "like",
        "start": 42.8,
        "end": 43.0
      },
      {
        "id": 102,
        "word": "it.",
        "start": 43.0,
        "end": 43.2
      }
    ],
    "fullText": "I don't know how to go to jail. And especially if you understand, all are all toppers. I'm a intern. I won't do it with them. That's my first night that you're taking work there on certain news while there. And that's how you've seen me every day. Yes, what are you doing or what are you doing? People are telling me that I'm murdering that. And he said, 15 full to 6 men. Now that's more better chicken such as myself. That's how it went with one pair of vosks. He said, you've made Dannieabai kidney? d\u00e1'm entrepreneur. I like it.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-aakash",
    "watermarkHandle": "@aakashgupta",
    "copy": {
      "youtubeTitle": "I don't know how to go to jail #shorts",
      "youtubeDescription": "I don't know how to go to jail. And especially if you understand, all are all toppers. I'm a intern. I won't do it with them. That's my first night that you're taking work there on certain news while there. And that's how you've seen me every day. Yes, what are you doing or what are you doing? People are telling me that I'm murdering that. And he said, 15 full to 6 men. Now that's more better chicken such as myself. That's how it went with one pair of vosks. He said, you've made Dannieabai kidney? d\u00e1'm entrepreneur. I like it.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "I don't know how to go to jail. And especially if you understand, all are all toppers. I'm a intern. I won't do it with them. That's my first night that you're taking work there on... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-aakash-4",
    "index": 4,
    "title": "Important Topic Breakdown",
    "startTime": 1676.22,
    "endTime": 1715.92,
    "duration": 39.7,
    "viralityScore": 80,
    "factors": {
      "hook": 63,
      "acoustics": 85,
      "pace": 100,
      "payoff": 65,
      "sentiment": 97,
      "duration": 94
    },
    "status": "approved",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_04_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_04_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "Listen.",
        "start": 0.0,
        "end": 0.36
      },
      {
        "id": 2,
        "word": "You've",
        "start": 0.8,
        "end": 1.16
      },
      {
        "id": 3,
        "word": "cut",
        "start": 1.16,
        "end": 1.22
      },
      {
        "id": 4,
        "word": "our",
        "start": 1.22,
        "end": 1.54
      },
      {
        "id": 5,
        "word": "tongue.",
        "start": 1.54,
        "end": 1.86
      },
      {
        "id": 6,
        "word": "This",
        "start": 4.98,
        "end": 5.34
      },
      {
        "id": 7,
        "word": "is",
        "start": 5.34,
        "end": 5.44
      },
      {
        "id": 8,
        "word": "it,",
        "start": 5.44,
        "end": 5.46
      },
      {
        "id": 9,
        "word": "brother.",
        "start": 5.5,
        "end": 5.66
      },
      {
        "id": 10,
        "word": "I",
        "start": 7.04,
        "end": 7.4
      },
      {
        "id": 11,
        "word": "asked",
        "start": 7.4,
        "end": 7.66
      },
      {
        "id": 12,
        "word": "others",
        "start": 7.66,
        "end": 8.02
      },
      {
        "id": 13,
        "word": "to",
        "start": 8.02,
        "end": 8.24
      },
      {
        "id": 14,
        "word": "say,",
        "start": 8.24,
        "end": 8.26
      },
      {
        "id": 15,
        "word": "You",
        "start": 8.28,
        "end": 8.46
      },
      {
        "id": 16,
        "word": "go",
        "start": 8.46,
        "end": 8.5
      },
      {
        "id": 17,
        "word": "to",
        "start": 8.5,
        "end": 8.54
      },
      {
        "id": 18,
        "word": "the",
        "start": 8.54,
        "end": 8.6
      },
      {
        "id": 19,
        "word": "rickshaw.",
        "start": 8.6,
        "end": 8.76
      },
      {
        "id": 20,
        "word": "What",
        "start": 9.04,
        "end": 9.18
      },
      {
        "id": 21,
        "word": "are",
        "start": 9.18,
        "end": 9.28
      },
      {
        "id": 22,
        "word": "you",
        "start": 9.28,
        "end": 9.48
      },
      {
        "id": 23,
        "word": "listening",
        "start": 9.48,
        "end": 9.52
      },
      {
        "id": 24,
        "word": "to?",
        "start": 9.52,
        "end": 10.32
      },
      {
        "id": 25,
        "word": "I'll",
        "start": 10.46,
        "end": 10.82
      },
      {
        "id": 26,
        "word": "go",
        "start": 10.82,
        "end": 10.82
      },
      {
        "id": 27,
        "word": "to",
        "start": 10.82,
        "end": 10.82
      },
      {
        "id": 28,
        "word": "the",
        "start": 10.82,
        "end": 10.82
      },
      {
        "id": 29,
        "word": "rickshaw.",
        "start": 10.82,
        "end": 10.9
      },
      {
        "id": 30,
        "word": "I'll",
        "start": 11.06,
        "end": 11.14
      },
      {
        "id": 31,
        "word": "go",
        "start": 11.14,
        "end": 11.24
      },
      {
        "id": 32,
        "word": "to",
        "start": 11.24,
        "end": 11.3
      },
      {
        "id": 33,
        "word": "your",
        "start": 11.3,
        "end": 11.46
      },
      {
        "id": 34,
        "word": "mother.",
        "start": 11.46,
        "end": 11.62
      },
      {
        "id": 35,
        "word": "I've",
        "start": 15.78,
        "end": 16.14
      },
      {
        "id": 36,
        "word": "been",
        "start": 16.14,
        "end": 16.18
      },
      {
        "id": 37,
        "word": "in",
        "start": 16.18,
        "end": 16.18
      },
      {
        "id": 38,
        "word": "that",
        "start": 16.18,
        "end": 16.18
      },
      {
        "id": 39,
        "word": "house",
        "start": 16.18,
        "end": 16.18
      },
      {
        "id": 40,
        "word": "many",
        "start": 16.18,
        "end": 16.2
      },
      {
        "id": 41,
        "word": "years.",
        "start": 16.2,
        "end": 16.52
      },
      {
        "id": 42,
        "word": "We",
        "start": 17.86,
        "end": 18.22
      },
      {
        "id": 43,
        "word": "went",
        "start": 18.22,
        "end": 18.28
      },
      {
        "id": 44,
        "word": "there.",
        "start": 18.28,
        "end": 18.8
      },
      {
        "id": 45,
        "word": "We",
        "start": 19.54,
        "end": 19.98
      },
      {
        "id": 46,
        "word": "made",
        "start": 19.98,
        "end": 20.06
      },
      {
        "id": 47,
        "word": "a",
        "start": 20.06,
        "end": 20.18
      },
      {
        "id": 48,
        "word": "toxic",
        "start": 20.18,
        "end": 20.56
      },
      {
        "id": 49,
        "word": "relation",
        "start": 20.56,
        "end": 21.0
      },
      {
        "id": 50,
        "word": "with",
        "start": 22.22,
        "end": 22.66
      },
      {
        "id": 51,
        "word": "the",
        "start": 22.66,
        "end": 22.74
      },
      {
        "id": 52,
        "word": "Tihar",
        "start": 22.74,
        "end": 22.9
      },
      {
        "id": 53,
        "word": "jail.",
        "start": 22.9,
        "end": 23.1
      },
      {
        "id": 54,
        "word": "I",
        "start": 23.92,
        "end": 24.36
      },
      {
        "id": 55,
        "word": "was",
        "start": 24.36,
        "end": 24.44
      },
      {
        "id": 56,
        "word": "going",
        "start": 24.44,
        "end": 24.56
      },
      {
        "id": 57,
        "word": "to",
        "start": 24.56,
        "end": 24.62
      },
      {
        "id": 58,
        "word": "see",
        "start": 24.62,
        "end": 25.02
      },
      {
        "id": 59,
        "word": "what's",
        "start": 25.02,
        "end": 25.3
      },
      {
        "id": 60,
        "word": "going",
        "start": 25.3,
        "end": 25.46
      },
      {
        "id": 61,
        "word": "on.",
        "start": 25.46,
        "end": 25.74
      },
      {
        "id": 62,
        "word": "Now",
        "start": 27.28,
        "end": 27.72
      },
      {
        "id": 63,
        "word": "it's",
        "start": 27.72,
        "end": 27.82
      },
      {
        "id": 64,
        "word": "a",
        "start": 27.82,
        "end": 27.84
      },
      {
        "id": 65,
        "word": "very",
        "start": 27.84,
        "end": 27.96
      },
      {
        "id": 66,
        "word": "modern",
        "start": 27.96,
        "end": 28.26
      },
      {
        "id": 67,
        "word": "jail.",
        "start": 28.26,
        "end": 28.46
      },
      {
        "id": 68,
        "word": "I",
        "start": 28.78,
        "end": 28.78
      },
      {
        "id": 69,
        "word": "think",
        "start": 28.78,
        "end": 29.18
      },
      {
        "id": 70,
        "word": "you",
        "start": 29.18,
        "end": 29.8
      },
      {
        "id": 71,
        "word": "can",
        "start": 29.8,
        "end": 30.1
      },
      {
        "id": 72,
        "word": "go",
        "start": 30.1,
        "end": 30.12
      },
      {
        "id": 73,
        "word": "and",
        "start": 30.12,
        "end": 30.28
      },
      {
        "id": 74,
        "word": "see.",
        "start": 30.28,
        "end": 30.42
      },
      {
        "id": 75,
        "word": "If",
        "start": 30.66,
        "end": 30.7
      },
      {
        "id": 76,
        "word": "you",
        "start": 30.7,
        "end": 30.72
      },
      {
        "id": 77,
        "word": "go",
        "start": 30.72,
        "end": 30.72
      },
      {
        "id": 78,
        "word": "to",
        "start": 30.72,
        "end": 30.72
      },
      {
        "id": 79,
        "word": "Delhi,",
        "start": 30.72,
        "end": 30.78
      },
      {
        "id": 80,
        "word": "you",
        "start": 31.64,
        "end": 32.08
      },
      {
        "id": 81,
        "word": "don't",
        "start": 32.08,
        "end": 32.52
      },
      {
        "id": 82,
        "word": "have",
        "start": 32.52,
        "end": 32.52
      },
      {
        "id": 83,
        "word": "to",
        "start": 32.52,
        "end": 32.68
      },
      {
        "id": 84,
        "word": "go",
        "start": 32.68,
        "end": 32.74
      },
      {
        "id": 85,
        "word": "to",
        "start": 32.74,
        "end": 32.74
      },
      {
        "id": 86,
        "word": "jail.",
        "start": 32.74,
        "end": 32.74
      },
      {
        "id": 87,
        "word": "They",
        "start": 33.58,
        "end": 34.02
      },
      {
        "id": 88,
        "word": "go",
        "start": 34.02,
        "end": 34.02
      },
      {
        "id": 89,
        "word": "to",
        "start": 34.02,
        "end": 34.02
      },
      {
        "id": 90,
        "word": "the",
        "start": 34.02,
        "end": 34.02
      },
      {
        "id": 91,
        "word": "rickshaw.",
        "start": 34.02,
        "end": 34.42
      },
      {
        "id": 92,
        "word": "They'll",
        "start": 34.54,
        "end": 34.56
      },
      {
        "id": 93,
        "word": "Google",
        "start": 34.56,
        "end": 34.76
      },
      {
        "id": 94,
        "word": "it.",
        "start": 34.76,
        "end": 35.04
      },
      {
        "id": 95,
        "word": "They",
        "start": 35.5,
        "end": 35.8
      },
      {
        "id": 96,
        "word": "know",
        "start": 35.8,
        "end": 36.02
      },
      {
        "id": 97,
        "word": "what's",
        "start": 36.02,
        "end": 36.52
      },
      {
        "id": 98,
        "word": "going",
        "start": 36.52,
        "end": 36.52
      },
      {
        "id": 99,
        "word": "on.",
        "start": 36.52,
        "end": 36.62
      },
      {
        "id": 100,
        "word": "There's",
        "start": 36.74,
        "end": 36.9
      },
      {
        "id": 101,
        "word": "a",
        "start": 36.9,
        "end": 36.96
      },
      {
        "id": 102,
        "word": "main",
        "start": 36.96,
        "end": 38.3
      },
      {
        "id": 103,
        "word": "road.",
        "start": 38.3,
        "end": 38.52
      },
      {
        "id": 104,
        "word": "Jail",
        "start": 39.06,
        "end": 39.5
      },
      {
        "id": 105,
        "word": "Road.",
        "start": 39.5,
        "end": 39.7
      }
    ],
    "fullText": "Listen. You've cut our tongue. This is it, brother. I asked others to say, You go to the rickshaw. What are you listening to? I'll go to the rickshaw. I'll go to your mother. I've been in that house many years. We went there. We made a toxic relation with the Tihar jail. I was going to see what's going on. Now it's a very modern jail. I think you can go and see. If you go to Delhi, you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-aakash",
    "watermarkHandle": "@aakashgupta",
    "copy": {
      "youtubeTitle": "Important Topic Breakdown #shorts",
      "youtubeDescription": "Listen. You've cut our tongue. This is it, brother. I asked others to say, You go to the rickshaw. What are you listening to? I'll go to the rickshaw. I'll go to your mother. I've been in that house many years. We went there. We made a toxic relation with the Tihar jail. I was going to see what's going on. Now it's a very modern jail. I think you can go and see. If you go to Delhi, you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "Listen. You've cut our tongue. This is it, brother. I asked others to say, You go to the rickshaw. What are you listening to? I'll go to the rickshaw. I'll go to your mother. I've ... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-aakash-5",
    "index": 5,
    "title": "Do you know Tihar jail",
    "startTime": 169.84,
    "endTime": 211.18,
    "duration": 41.34,
    "viralityScore": 76,
    "factors": {
      "hook": 51,
      "acoustics": 81,
      "pace": 100,
      "payoff": 65,
      "sentiment": 100,
      "duration": 98
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_05_engaging_moment_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_05_engaging_moment.mp4",
    "words": [
      {
        "id": 1,
        "word": "Do",
        "start": 0.0,
        "end": 0.56
      },
      {
        "id": 2,
        "word": "you",
        "start": 0.56,
        "end": 0.7
      },
      {
        "id": 3,
        "word": "know",
        "start": 0.7,
        "end": 0.7
      },
      {
        "id": 4,
        "word": "Tihar",
        "start": 0.7,
        "end": 1.22
      },
      {
        "id": 5,
        "word": "jail?",
        "start": 1.22,
        "end": 1.38
      },
      {
        "id": 6,
        "word": "Yes.",
        "start": 1.56,
        "end": 1.82
      },
      {
        "id": 7,
        "word": "I'll",
        "start": 2.26,
        "end": 2.5
      },
      {
        "id": 8,
        "word": "tell",
        "start": 2.5,
        "end": 2.5
      },
      {
        "id": 9,
        "word": "you.",
        "start": 2.5,
        "end": 3.6
      },
      {
        "id": 10,
        "word": "It's",
        "start": 4.12,
        "end": 4.68
      },
      {
        "id": 11,
        "word": "the",
        "start": 4.68,
        "end": 4.68
      },
      {
        "id": 12,
        "word": "biggest",
        "start": 4.68,
        "end": 4.9
      },
      {
        "id": 13,
        "word": "jail",
        "start": 4.9,
        "end": 5.34
      },
      {
        "id": 14,
        "word": "of",
        "start": 5.34,
        "end": 5.4
      },
      {
        "id": 15,
        "word": "India.",
        "start": 5.4,
        "end": 5.4
      },
      {
        "id": 16,
        "word": "They've",
        "start": 5.96,
        "end": 6.44
      },
      {
        "id": 17,
        "word": "made",
        "start": 6.44,
        "end": 6.58
      },
      {
        "id": 18,
        "word": "it",
        "start": 6.58,
        "end": 6.58
      },
      {
        "id": 19,
        "word": "in",
        "start": 6.58,
        "end": 6.58
      },
      {
        "id": 20,
        "word": "the",
        "start": 6.58,
        "end": 6.62
      },
      {
        "id": 21,
        "word": "middle",
        "start": 6.62,
        "end": 6.8
      },
      {
        "id": 22,
        "word": "of",
        "start": 6.8,
        "end": 6.9
      },
      {
        "id": 23,
        "word": "the",
        "start": 6.9,
        "end": 7.28
      },
      {
        "id": 24,
        "word": "residential",
        "start": 7.28,
        "end": 7.52
      },
      {
        "id": 25,
        "word": "area.",
        "start": 7.52,
        "end": 7.94
      },
      {
        "id": 26,
        "word": "The",
        "start": 10.06,
        "end": 10.62
      },
      {
        "id": 27,
        "word": "jail",
        "start": 10.62,
        "end": 10.62
      },
      {
        "id": 28,
        "word": "is",
        "start": 10.62,
        "end": 10.62
      },
      {
        "id": 29,
        "word": "in",
        "start": 10.62,
        "end": 10.64
      },
      {
        "id": 30,
        "word": "the",
        "start": 10.64,
        "end": 10.7
      },
      {
        "id": 31,
        "word": "four",
        "start": 10.7,
        "end": 10.82
      },
      {
        "id": 32,
        "word": "sides.",
        "start": 10.82,
        "end": 11.06
      },
      {
        "id": 33,
        "word": "It",
        "start": 12.18,
        "end": 12.74
      },
      {
        "id": 34,
        "word": "was",
        "start": 12.74,
        "end": 12.74
      },
      {
        "id": 35,
        "word": "my",
        "start": 12.74,
        "end": 12.82
      },
      {
        "id": 36,
        "word": "sister.",
        "start": 12.82,
        "end": 13.12
      },
      {
        "id": 37,
        "word": "You",
        "start": 14.9,
        "end": 15.46
      },
      {
        "id": 38,
        "word": "know,",
        "start": 15.46,
        "end": 15.52
      },
      {
        "id": 39,
        "word": "the",
        "start": 15.9,
        "end": 16.18
      },
      {
        "id": 40,
        "word": "magnitude",
        "start": 16.18,
        "end": 16.58
      },
      {
        "id": 41,
        "word": "of",
        "start": 16.58,
        "end": 16.88
      },
      {
        "id": 42,
        "word": "the",
        "start": 16.88,
        "end": 16.94
      },
      {
        "id": 43,
        "word": "jail,",
        "start": 16.94,
        "end": 17.06
      },
      {
        "id": 44,
        "word": "the",
        "start": 17.18,
        "end": 17.24
      },
      {
        "id": 45,
        "word": "biggest",
        "start": 17.24,
        "end": 17.52
      },
      {
        "id": 46,
        "word": "jail.",
        "start": 17.52,
        "end": 17.8
      },
      {
        "id": 47,
        "word": "If",
        "start": 17.92,
        "end": 17.98
      },
      {
        "id": 48,
        "word": "it's",
        "start": 17.98,
        "end": 17.98
      },
      {
        "id": 49,
        "word": "in",
        "start": 17.98,
        "end": 18.46
      },
      {
        "id": 50,
        "word": "a",
        "start": 18.46,
        "end": 18.52
      },
      {
        "id": 51,
        "word": "country,",
        "start": 18.52,
        "end": 18.98
      },
      {
        "id": 52,
        "word": "they",
        "start": 19.26,
        "end": 19.48
      },
      {
        "id": 53,
        "word": "make",
        "start": 19.48,
        "end": 19.94
      },
      {
        "id": 54,
        "word": "it",
        "start": 19.94,
        "end": 20.38
      },
      {
        "id": 55,
        "word": "out",
        "start": 20.38,
        "end": 20.52
      },
      {
        "id": 56,
        "word": "of",
        "start": 20.52,
        "end": 21.1
      },
      {
        "id": 57,
        "word": "the",
        "start": 21.1,
        "end": 21.1
      },
      {
        "id": 58,
        "word": "city.",
        "start": 21.1,
        "end": 21.1
      },
      {
        "id": 59,
        "word": "In",
        "start": 21.1,
        "end": 21.8
      },
      {
        "id": 60,
        "word": "a",
        "start": 21.8,
        "end": 21.92
      },
      {
        "id": 61,
        "word": "water",
        "start": 21.92,
        "end": 22.16
      },
      {
        "id": 62,
        "word": "body.",
        "start": 22.16,
        "end": 22.42
      },
      {
        "id": 63,
        "word": "In",
        "start": 22.72,
        "end": 22.72
      },
      {
        "id": 64,
        "word": "a",
        "start": 22.72,
        "end": 22.72
      },
      {
        "id": 65,
        "word": "water",
        "start": 22.72,
        "end": 22.72
      },
      {
        "id": 66,
        "word": "body.",
        "start": 22.72,
        "end": 22.74
      },
      {
        "id": 67,
        "word": "Tihar?",
        "start": 23.48,
        "end": 24.0
      },
      {
        "id": 68,
        "word": "They",
        "start": 24.26,
        "end": 24.7
      },
      {
        "id": 69,
        "word": "were",
        "start": 24.7,
        "end": 24.7
      },
      {
        "id": 70,
        "word": "like",
        "start": 24.7,
        "end": 24.7
      },
      {
        "id": 71,
        "word": "my",
        "start": 24.7,
        "end": 24.7
      },
      {
        "id": 72,
        "word": "balcony.",
        "start": 24.7,
        "end": 25.06
      },
      {
        "id": 73,
        "word": "That",
        "start": 27.68,
        "end": 28.2
      },
      {
        "id": 74,
        "word": "whole",
        "start": 28.2,
        "end": 28.22
      },
      {
        "id": 75,
        "word": "jail",
        "start": 28.22,
        "end": 28.4
      },
      {
        "id": 76,
        "word": "campus",
        "start": 28.4,
        "end": 28.92
      },
      {
        "id": 77,
        "word": "was",
        "start": 28.92,
        "end": 29.06
      },
      {
        "id": 78,
        "word": "the",
        "start": 29.06,
        "end": 29.06
      },
      {
        "id": 79,
        "word": "whole.",
        "start": 29.06,
        "end": 29.24
      },
      {
        "id": 80,
        "word": "Complex,",
        "start": 33.12,
        "end": 33.64
      },
      {
        "id": 81,
        "word": "whatever.",
        "start": 33.86,
        "end": 34.0
      },
      {
        "id": 82,
        "word": "You",
        "start": 35.76,
        "end": 36.16
      },
      {
        "id": 83,
        "word": "understand?",
        "start": 36.16,
        "end": 36.22
      },
      {
        "id": 84,
        "word": "I",
        "start": 36.62,
        "end": 36.78
      },
      {
        "id": 85,
        "word": "mean,",
        "start": 36.78,
        "end": 36.78
      },
      {
        "id": 86,
        "word": "I",
        "start": 36.98,
        "end": 37.12
      },
      {
        "id": 87,
        "word": "didn't",
        "start": 37.12,
        "end": 37.44
      },
      {
        "id": 88,
        "word": "see",
        "start": 37.44,
        "end": 37.6
      },
      {
        "id": 89,
        "word": "my",
        "start": 37.6,
        "end": 37.82
      },
      {
        "id": 90,
        "word": "balcony",
        "start": 37.82,
        "end": 38.14
      },
      {
        "id": 91,
        "word": "balcony",
        "start": 38.14,
        "end": 38.14
      },
      {
        "id": 92,
        "word": "from",
        "start": 38.14,
        "end": 38.14
      },
      {
        "id": 93,
        "word": "my",
        "start": 38.14,
        "end": 38.14
      },
      {
        "id": 94,
        "word": "balcony.",
        "start": 38.14,
        "end": 38.24
      },
      {
        "id": 95,
        "word": "The",
        "start": 38.5,
        "end": 38.64
      },
      {
        "id": 96,
        "word": "people.",
        "start": 38.64,
        "end": 38.84
      },
      {
        "id": 97,
        "word": "I'm",
        "start": 39.66,
        "end": 40.18
      },
      {
        "id": 98,
        "word": "standing",
        "start": 40.18,
        "end": 40.26
      },
      {
        "id": 99,
        "word": "in",
        "start": 40.26,
        "end": 40.26
      },
      {
        "id": 100,
        "word": "the",
        "start": 40.26,
        "end": 40.3
      },
      {
        "id": 101,
        "word": "balcony,",
        "start": 40.3,
        "end": 40.52
      },
      {
        "id": 102,
        "word": "and",
        "start": 40.96,
        "end": 40.96
      },
      {
        "id": 103,
        "word": "there",
        "start": 40.96,
        "end": 41.04
      },
      {
        "id": 104,
        "word": "are",
        "start": 41.04,
        "end": 41.08
      },
      {
        "id": 105,
        "word": "caddies.",
        "start": 41.08,
        "end": 41.34
      }
    ],
    "fullText": "Do you know Tihar jail? Yes. I'll tell you. It's the biggest jail of India. They've made it in the middle of the residential area. The jail is in the four sides. It was my sister. You know, the magnitude of the jail, the biggest jail. If it's in a country, they make it out of the city. In a water body. In a water body. Tihar? They were like my balcony. That whole jail campus was the whole. Complex, whatever. You understand? I mean, I didn't see my balcony balcony from my balcony. The people. I'm standing in the balcony, and there are caddies.",
    "captionStyle": "hormozi",
    "brandKitId": "bk-aakash",
    "watermarkHandle": "@aakashgupta",
    "copy": {
      "youtubeTitle": "Do you know Tihar jail #shorts",
      "youtubeDescription": "Do you know Tihar jail? Yes. I'll tell you. It's the biggest jail of India. They've made it in the middle of the residential area. The jail is in the four sides. It was my sister. You know, the magnitude of the jail, the biggest jail. If it's in a country, they make it out of the city. In a water body. In a water body. Tihar? They were like my balcony. That whole jail campus was the whole. Complex, whatever. You understand? I mean, I didn't see my balcony balcony from my balcony. The people. I'm standing in the balcony, and there are caddies.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "Do you know Tihar jail? Yes. I'll tell you. It's the biggest jail of India. They've made it in the middle of the residential area. The jail is in the four sides. It was my sister. ... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-mrbeast-1",
    "index": 1,
    "title": "Hold on",
    "startTime": 393.88,
    "endTime": 430.92,
    "duration": 37.04,
    "viralityScore": 71,
    "factors": {
      "hook": 63,
      "acoustics": 67,
      "pace": 97,
      "payoff": 90,
      "sentiment": 20,
      "duration": 88
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_01_direct_attention_grabber_hold__thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_01_direct_attention_grabber_hold_.mp4",
    "words": [
      {
        "id": 1,
        "word": "Hold",
        "start": 0.0,
        "end": 0.26
      },
      {
        "id": 2,
        "word": "on.",
        "start": 0.26,
        "end": 0.48
      },
      {
        "id": 3,
        "word": "Hold",
        "start": 0.72,
        "end": 0.86
      },
      {
        "id": 4,
        "word": "on.",
        "start": 0.86,
        "end": 1.02
      },
      {
        "id": 5,
        "word": "What",
        "start": 1.28,
        "end": 1.56
      },
      {
        "id": 6,
        "word": "are",
        "start": 1.56,
        "end": 1.64
      },
      {
        "id": 7,
        "word": "you",
        "start": 1.64,
        "end": 1.68
      },
      {
        "id": 8,
        "word": "doing?",
        "start": 1.68,
        "end": 1.84
      },
      {
        "id": 9,
        "word": "I'm",
        "start": 2.06,
        "end": 2.26
      },
      {
        "id": 10,
        "word": "over",
        "start": 2.26,
        "end": 2.48
      },
      {
        "id": 11,
        "word": "it.",
        "start": 2.48,
        "end": 2.62
      },
      {
        "id": 12,
        "word": "Don't",
        "start": 2.84,
        "end": 3.08
      },
      {
        "id": 13,
        "word": "care.",
        "start": 3.08,
        "end": 3.32
      },
      {
        "id": 14,
        "word": "I'm",
        "start": 3.32,
        "end": 4.18
      },
      {
        "id": 15,
        "word": "struggling.",
        "start": 4.18,
        "end": 4.78
      },
      {
        "id": 16,
        "word": "I",
        "start": 5.68,
        "end": 6.42
      },
      {
        "id": 17,
        "word": "feel",
        "start": 6.42,
        "end": 6.76
      },
      {
        "id": 18,
        "word": "awful.",
        "start": 6.76,
        "end": 7.72
      },
      {
        "id": 19,
        "word": "This",
        "start": 8.26,
        "end": 8.86
      },
      {
        "id": 20,
        "word": "sucks.",
        "start": 8.86,
        "end": 9.16
      },
      {
        "id": 21,
        "word": "I",
        "start": 10.9,
        "end": 12.1
      },
      {
        "id": 22,
        "word": "don't",
        "start": 12.1,
        "end": 12.28
      },
      {
        "id": 23,
        "word": "want",
        "start": 12.28,
        "end": 12.42
      },
      {
        "id": 24,
        "word": "to",
        "start": 12.42,
        "end": 12.52
      },
      {
        "id": 25,
        "word": "do",
        "start": 12.52,
        "end": 12.72
      },
      {
        "id": 26,
        "word": "this.",
        "start": 12.72,
        "end": 13.32
      },
      {
        "id": 27,
        "word": "Okay.",
        "start": 14.96,
        "end": 16.16
      },
      {
        "id": 28,
        "word": "What's",
        "start": 17.9,
        "end": 18.54
      },
      {
        "id": 29,
        "word": "wrong?",
        "start": 18.54,
        "end": 18.82
      },
      {
        "id": 30,
        "word": "I'm",
        "start": 19.12,
        "end": 19.52
      },
      {
        "id": 31,
        "word": "so",
        "start": 19.52,
        "end": 20.02
      },
      {
        "id": 32,
        "word": "not",
        "start": 20.02,
        "end": 20.34
      },
      {
        "id": 33,
        "word": "used",
        "start": 20.34,
        "end": 20.68
      },
      {
        "id": 34,
        "word": "to",
        "start": 20.68,
        "end": 20.92
      },
      {
        "id": 35,
        "word": "it.",
        "start": 20.92,
        "end": 21.28
      },
      {
        "id": 36,
        "word": "I've",
        "start": 22.08,
        "end": 22.72
      },
      {
        "id": 37,
        "word": "been",
        "start": 22.72,
        "end": 22.82
      },
      {
        "id": 38,
        "word": "doing",
        "start": 22.82,
        "end": 22.96
      },
      {
        "id": 39,
        "word": "this",
        "start": 22.96,
        "end": 23.18
      },
      {
        "id": 40,
        "word": "for",
        "start": 23.18,
        "end": 23.34
      },
      {
        "id": 41,
        "word": "39",
        "start": 23.34,
        "end": 23.76
      },
      {
        "id": 42,
        "word": "days",
        "start": 23.76,
        "end": 24.28
      },
      {
        "id": 43,
        "word": "after",
        "start": 24.28,
        "end": 24.92
      },
      {
        "id": 44,
        "word": "spending",
        "start": 24.92,
        "end": 25.32
      },
      {
        "id": 45,
        "word": "27",
        "start": 25.32,
        "end": 25.78
      },
      {
        "id": 46,
        "word": "years",
        "start": 25.78,
        "end": 26.58
      },
      {
        "id": 47,
        "word": "not",
        "start": 26.58,
        "end": 26.92
      },
      {
        "id": 48,
        "word": "doing",
        "start": 26.92,
        "end": 27.14
      },
      {
        "id": 49,
        "word": "any",
        "start": 27.14,
        "end": 27.56
      },
      {
        "id": 50,
        "word": "of",
        "start": 27.56,
        "end": 27.78
      },
      {
        "id": 51,
        "word": "this.",
        "start": 27.78,
        "end": 28.1
      },
      {
        "id": 52,
        "word": "Look,",
        "start": 28.54,
        "end": 28.86
      },
      {
        "id": 53,
        "word": "it",
        "start": 29.18,
        "end": 29.84
      },
      {
        "id": 54,
        "word": "is",
        "start": 29.84,
        "end": 30.04
      },
      {
        "id": 55,
        "word": "all",
        "start": 30.04,
        "end": 30.32
      },
      {
        "id": 56,
        "word": "right.",
        "start": 30.32,
        "end": 30.56
      },
      {
        "id": 57,
        "word": "We",
        "start": 30.88,
        "end": 31.38
      },
      {
        "id": 58,
        "word": "will",
        "start": 31.38,
        "end": 31.52
      },
      {
        "id": 59,
        "word": "get",
        "start": 31.52,
        "end": 31.7
      },
      {
        "id": 60,
        "word": "through",
        "start": 31.7,
        "end": 31.94
      },
      {
        "id": 61,
        "word": "this",
        "start": 31.94,
        "end": 32.34
      },
      {
        "id": 62,
        "word": "together.",
        "start": 32.34,
        "end": 32.92
      },
      {
        "id": 63,
        "word": "Just",
        "start": 33.62,
        "end": 33.76
      },
      {
        "id": 64,
        "word": "remember",
        "start": 33.76,
        "end": 34.06
      },
      {
        "id": 65,
        "word": "that.",
        "start": 34.06,
        "end": 34.3
      },
      {
        "id": 66,
        "word": "Having",
        "start": 34.5,
        "end": 34.82
      },
      {
        "id": 67,
        "word": "Trey",
        "start": 34.82,
        "end": 35.14
      },
      {
        "id": 68,
        "word": "gives",
        "start": 35.14,
        "end": 35.5
      },
      {
        "id": 69,
        "word": "me",
        "start": 35.5,
        "end": 35.68
      },
      {
        "id": 70,
        "word": "a",
        "start": 35.68,
        "end": 35.84
      },
      {
        "id": 71,
        "word": "lot",
        "start": 35.84,
        "end": 36.02
      },
      {
        "id": 72,
        "word": "more",
        "start": 36.02,
        "end": 36.4
      },
      {
        "id": 73,
        "word": "confidence.",
        "start": 36.4,
        "end": 37.04
      },
      {
        "id": 74,
        "word": "It",
        "start": 37.04,
        "end": 37.36
      }
    ],
    "fullText": "Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this. Okay. What's wrong? I'm so not used to it. I've been doing this for 39 days after spending 27 years not doing any of this. Look, it is all right. We will get through this together. Just remember that. Having Trey gives me a lot more confidence.",
    "captionStyle": "mrbeast",
    "brandKitId": "bk-mrbeast",
    "watermarkHandle": "@mrbeast",
    "copy": {
      "youtubeTitle": "Hold on #shorts",
      "youtubeDescription": "Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this. Okay. What's wrong? I'm so not used to it. I've been doing this for 39 days after spending 27 years not doing any of this. Look, it is all right. We will get through this together. Just remember that. Having Trey gives me a lot more confidence.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this. Okay. What's wrong? I'm so not used to it. I've be... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-mrbeast-2",
    "index": 2,
    "title": "Wait a minute",
    "startTime": 1371.6,
    "endTime": 1411.7,
    "duration": 40.1,
    "viralityScore": 68,
    "factors": {
      "hook": 63,
      "acoustics": 64,
      "pace": 100,
      "payoff": 65,
      "sentiment": 20,
      "duration": 95
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_02_direct_attention_grabber_wait__thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_02_direct_attention_grabber_wait_.mp4",
    "words": [
      {
        "id": 1,
        "word": "Wait",
        "start": 0.0,
        "end": 0.18
      },
      {
        "id": 2,
        "word": "a",
        "start": 0.18,
        "end": 0.44
      },
      {
        "id": 3,
        "word": "minute!",
        "start": 0.44,
        "end": 0.86
      },
      {
        "id": 4,
        "word": "Oh!",
        "start": 1.52,
        "end": 1.74
      },
      {
        "id": 5,
        "word": "My",
        "start": 2.8,
        "end": 3.28
      },
      {
        "id": 6,
        "word": "God.",
        "start": 3.28,
        "end": 3.6
      },
      {
        "id": 7,
        "word": "Oh!",
        "start": 3.88,
        "end": 4.18
      },
      {
        "id": 8,
        "word": "Yeah.",
        "start": 6.34,
        "end": 6.78
      },
      {
        "id": 9,
        "word": "Yeah.",
        "start": 7.06,
        "end": 7.42
      },
      {
        "id": 10,
        "word": "We",
        "start": 7.88,
        "end": 8.18
      },
      {
        "id": 11,
        "word": "need",
        "start": 8.18,
        "end": 8.38
      },
      {
        "id": 12,
        "word": "to",
        "start": 8.38,
        "end": 8.54
      },
      {
        "id": 13,
        "word": "do",
        "start": 8.54,
        "end": 8.72
      },
      {
        "id": 14,
        "word": "whatever",
        "start": 8.72,
        "end": 9.04
      },
      {
        "id": 15,
        "word": "it",
        "start": 9.04,
        "end": 9.24
      },
      {
        "id": 16,
        "word": "takes.",
        "start": 9.24,
        "end": 9.58
      },
      {
        "id": 17,
        "word": "With",
        "start": 9.98,
        "end": 10.26
      },
      {
        "id": 18,
        "word": "their",
        "start": 10.26,
        "end": 10.42
      },
      {
        "id": 19,
        "word": "laps",
        "start": 10.42,
        "end": 10.68
      },
      {
        "id": 20,
        "word": "doubled,",
        "start": 10.68,
        "end": 11.08
      },
      {
        "id": 21,
        "word": "they",
        "start": 11.22,
        "end": 11.44
      },
      {
        "id": 22,
        "word": "wasted",
        "start": 11.44,
        "end": 11.82
      },
      {
        "id": 23,
        "word": "no",
        "start": 11.82,
        "end": 12.14
      },
      {
        "id": 24,
        "word": "time.",
        "start": 12.14,
        "end": 12.6
      },
      {
        "id": 25,
        "word": "Rain",
        "start": 15.02,
        "end": 15.46
      },
      {
        "id": 26,
        "word": "or",
        "start": 15.46,
        "end": 15.9
      },
      {
        "id": 27,
        "word": "shot.",
        "start": 15.9,
        "end": 16.18
      },
      {
        "id": 28,
        "word": "Dang,",
        "start": 16.42,
        "end": 16.78
      },
      {
        "id": 29,
        "word": "it's",
        "start": 16.88,
        "end": 17.0
      },
      {
        "id": 30,
        "word": "hot,",
        "start": 17.0,
        "end": 17.16
      },
      {
        "id": 31,
        "word": "y",
        "start": 17.26,
        "end": 17.36
      },
      {
        "id": 32,
        "word": "'all.",
        "start": 17.36,
        "end": 17.46
      },
      {
        "id": 33,
        "word": "150,",
        "start": 19.52,
        "end": 19.96
      },
      {
        "id": 34,
        "word": "we're",
        "start": 20.04,
        "end": 20.22
      },
      {
        "id": 35,
        "word": "halfway",
        "start": 20.22,
        "end": 20.38
      },
      {
        "id": 36,
        "word": "there.",
        "start": 20.38,
        "end": 20.6
      },
      {
        "id": 37,
        "word": "Get",
        "start": 21.82,
        "end": 22.1
      },
      {
        "id": 38,
        "word": "momentum,",
        "start": 22.1,
        "end": 22.6
      },
      {
        "id": 39,
        "word": "you",
        "start": 22.6,
        "end": 23.0
      },
      {
        "id": 40,
        "word": "got",
        "start": 23.0,
        "end": 23.2
      },
      {
        "id": 41,
        "word": "it.",
        "start": 23.2,
        "end": 23.4
      },
      {
        "id": 42,
        "word": "Finish",
        "start": 23.76,
        "end": 24.14
      },
      {
        "id": 43,
        "word": "to",
        "start": 24.14,
        "end": 24.3
      },
      {
        "id": 44,
        "word": "the",
        "start": 24.3,
        "end": 24.42
      },
      {
        "id": 45,
        "word": "end,",
        "start": 24.42,
        "end": 24.54
      },
      {
        "id": 46,
        "word": "you",
        "start": 24.58,
        "end": 24.64
      },
      {
        "id": 47,
        "word": "got",
        "start": 24.64,
        "end": 24.78
      },
      {
        "id": 48,
        "word": "it,",
        "start": 24.78,
        "end": 24.86
      },
      {
        "id": 49,
        "word": "you",
        "start": 24.92,
        "end": 24.96
      },
      {
        "id": 50,
        "word": "got",
        "start": 24.96,
        "end": 25.12
      },
      {
        "id": 51,
        "word": "it.",
        "start": 25.12,
        "end": 25.26
      },
      {
        "id": 52,
        "word": "How's",
        "start": 26.82,
        "end": 27.26
      },
      {
        "id": 53,
        "word": "it",
        "start": 27.26,
        "end": 27.38
      },
      {
        "id": 54,
        "word": "going?",
        "start": 27.38,
        "end": 27.66
      },
      {
        "id": 55,
        "word": "Well,",
        "start": 28.28,
        "end": 28.72
      },
      {
        "id": 56,
        "word": "look",
        "start": 28.9,
        "end": 29.1
      },
      {
        "id": 57,
        "word": "at",
        "start": 29.1,
        "end": 29.26
      },
      {
        "id": 58,
        "word": "you",
        "start": 29.26,
        "end": 29.46
      },
      {
        "id": 59,
        "word": "two.",
        "start": 29.46,
        "end": 29.7
      },
      {
        "id": 60,
        "word": "You",
        "start": 29.96,
        "end": 30.32
      },
      {
        "id": 61,
        "word": "guys",
        "start": 30.32,
        "end": 30.5
      },
      {
        "id": 62,
        "word": "are",
        "start": 30.5,
        "end": 30.64
      },
      {
        "id": 63,
        "word": "looking",
        "start": 30.64,
        "end": 30.86
      },
      {
        "id": 64,
        "word": "way",
        "start": 30.86,
        "end": 31.2
      },
      {
        "id": 65,
        "word": "leaner.",
        "start": 31.2,
        "end": 31.74
      },
      {
        "id": 66,
        "word": "You",
        "start": 31.9,
        "end": 32.26
      },
      {
        "id": 67,
        "word": "know,",
        "start": 32.26,
        "end": 32.4
      },
      {
        "id": 68,
        "word": "I",
        "start": 32.52,
        "end": 32.64
      },
      {
        "id": 69,
        "word": "was",
        "start": 32.64,
        "end": 32.84
      },
      {
        "id": 70,
        "word": "stopping",
        "start": 32.84,
        "end": 33.04
      },
      {
        "id": 71,
        "word": "by",
        "start": 33.04,
        "end": 33.38
      },
      {
        "id": 72,
        "word": "because",
        "start": 33.38,
        "end": 33.72
      },
      {
        "id": 73,
        "word": "I",
        "start": 33.72,
        "end": 34.16
      },
      {
        "id": 74,
        "word": "was",
        "start": 34.16,
        "end": 34.16
      },
      {
        "id": 75,
        "word": "like,",
        "start": 34.16,
        "end": 34.16
      },
      {
        "id": 76,
        "word": "oh,",
        "start": 34.16,
        "end": 34.16
      },
      {
        "id": 77,
        "word": "I'm",
        "start": 34.16,
        "end": 34.16
      },
      {
        "id": 78,
        "word": "not",
        "start": 34.16,
        "end": 34.16
      },
      {
        "id": 79,
        "word": "going",
        "start": 34.16,
        "end": 34.16
      },
      {
        "id": 80,
        "word": "to",
        "start": 34.16,
        "end": 34.16
      },
      {
        "id": 81,
        "word": "do",
        "start": 34.16,
        "end": 34.16
      },
      {
        "id": 82,
        "word": "it.",
        "start": 34.16,
        "end": 34.16
      },
      {
        "id": 83,
        "word": "You",
        "start": 34.16,
        "end": 34.36
      },
      {
        "id": 84,
        "word": "know,",
        "start": 34.36,
        "end": 34.44
      },
      {
        "id": 85,
        "word": "we",
        "start": 34.58,
        "end": 34.6
      },
      {
        "id": 86,
        "word": "have",
        "start": 34.6,
        "end": 34.78
      },
      {
        "id": 87,
        "word": "two",
        "start": 34.78,
        "end": 35.02
      },
      {
        "id": 88,
        "word": "cars",
        "start": 35.02,
        "end": 35.4
      },
      {
        "id": 89,
        "word": "on",
        "start": 35.4,
        "end": 35.56
      },
      {
        "id": 90,
        "word": "the",
        "start": 35.56,
        "end": 35.64
      },
      {
        "id": 91,
        "word": "line",
        "start": 35.64,
        "end": 35.88
      },
      {
        "id": 92,
        "word": "and",
        "start": 35.88,
        "end": 36.08
      },
      {
        "id": 93,
        "word": "I",
        "start": 36.08,
        "end": 36.32
      },
      {
        "id": 94,
        "word": "didn't",
        "start": 36.32,
        "end": 36.46
      },
      {
        "id": 95,
        "word": "know",
        "start": 36.46,
        "end": 36.56
      },
      {
        "id": 96,
        "word": "if",
        "start": 36.56,
        "end": 36.7
      },
      {
        "id": 97,
        "word": "he",
        "start": 36.7,
        "end": 36.74
      },
      {
        "id": 98,
        "word": "needed",
        "start": 36.74,
        "end": 36.92
      },
      {
        "id": 99,
        "word": "some",
        "start": 36.92,
        "end": 37.08
      },
      {
        "id": 100,
        "word": "help",
        "start": 37.08,
        "end": 37.26
      },
      {
        "id": 101,
        "word": "pulling",
        "start": 37.26,
        "end": 37.76
      },
      {
        "id": 102,
        "word": "it.",
        "start": 37.76,
        "end": 38.0
      },
      {
        "id": 103,
        "word": "Will",
        "start": 38.18,
        "end": 38.54
      },
      {
        "id": 104,
        "word": "it",
        "start": 38.54,
        "end": 38.56
      },
      {
        "id": 105,
        "word": "take",
        "start": 38.56,
        "end": 38.66
      },
      {
        "id": 106,
        "word": "some",
        "start": 38.66,
        "end": 38.88
      },
      {
        "id": 107,
        "word": "help?",
        "start": 38.88,
        "end": 38.9
      },
      {
        "id": 108,
        "word": "I",
        "start": 39.02,
        "end": 39.08
      },
      {
        "id": 109,
        "word": "mean,",
        "start": 39.08,
        "end": 39.08
      },
      {
        "id": 110,
        "word": "we'll",
        "start": 39.12,
        "end": 39.26
      },
      {
        "id": 111,
        "word": "always",
        "start": 39.26,
        "end": 39.56
      },
      {
        "id": 112,
        "word": "take",
        "start": 39.56,
        "end": 39.78
      },
      {
        "id": 113,
        "word": "some",
        "start": 39.78,
        "end": 39.94
      },
      {
        "id": 114,
        "word": "help.",
        "start": 39.94,
        "end": 40.1
      }
    ],
    "fullText": "Wait a minute! Oh! My God. Oh! Yeah. Yeah. We need to do whatever it takes. With their laps doubled, they wasted no time. Rain or shot. Dang, it's hot, y 'all. 150, we're halfway there. Get momentum, you got it. Finish to the end, you got it, you got it. How's it going? Well, look at you two. You guys are looking way leaner. You know, I was stopping by because I was like, oh, I'm not going to do it. You know, we have two cars on the line and I didn't know if he needed some help pulling it. Will it take some help? I mean, we'll always take some help.",
    "captionStyle": "mrbeast",
    "brandKitId": "bk-mrbeast",
    "watermarkHandle": "@mrbeast",
    "copy": {
      "youtubeTitle": "Wait a minute #shorts",
      "youtubeDescription": "Wait a minute! Oh! My God. Oh! Yeah. Yeah. We need to do whatever it takes. With their laps doubled, they wasted no time. Rain or shot. Dang, it's hot, y 'all. 150, we're halfway there. Get momentum, you got it. Finish to the end, you got it, you got it. How's it going? Well, look at you two. You guys are looking way leaner. You know, I was stopping by because I was like, oh, I'm not going to do it. You know, we have two cars on the line and I didn't know if he needed some help pulling it. Will it take some help? I mean, we'll always take some help.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "Wait a minute! Oh! My God. Oh! Yeah. Yeah. We need to do whatever it takes. With their laps doubled, they wasted no time. Rain or shot. Dang, it's hot, y 'all. 150, we're halfway t... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-mrbeast-3",
    "index": 3,
    "title": "What does that mean?",
    "startTime": 1737.66,
    "endTime": 1788.38,
    "duration": 50.72,
    "viralityScore": 68,
    "factors": {
      "hook": 57,
      "acoustics": 65,
      "pace": 96,
      "payoff": 90,
      "sentiment": 20,
      "duration": 78
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_03_provocative_question_what_does_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_03_provocative_question_what_does.mp4",
    "words": [
      {
        "id": 1,
        "word": "What",
        "start": 0.0,
        "end": 0.3
      },
      {
        "id": 2,
        "word": "does",
        "start": 0.3,
        "end": 0.38
      },
      {
        "id": 3,
        "word": "that",
        "start": 0.38,
        "end": 0.54
      },
      {
        "id": 4,
        "word": "mean?",
        "start": 0.54,
        "end": 0.7
      },
      {
        "id": 5,
        "word": "Well,",
        "start": 1.5,
        "end": 1.96
      },
      {
        "id": 6,
        "word": "I",
        "start": 2.2,
        "end": 2.44
      },
      {
        "id": 7,
        "word": "might",
        "start": 2.44,
        "end": 2.72
      },
      {
        "id": 8,
        "word": "have",
        "start": 2.72,
        "end": 2.92
      },
      {
        "id": 9,
        "word": "built",
        "start": 2.92,
        "end": 3.3
      },
      {
        "id": 10,
        "word": "a",
        "start": 3.3,
        "end": 3.62
      },
      {
        "id": 11,
        "word": "second",
        "start": 3.62,
        "end": 4.0
      },
      {
        "id": 12,
        "word": "gym",
        "start": 4.0,
        "end": 4.34
      },
      {
        "id": 13,
        "word": "where",
        "start": 4.34,
        "end": 4.86
      },
      {
        "id": 14,
        "word": "Trey",
        "start": 4.86,
        "end": 5.78
      },
      {
        "id": 15,
        "word": "is",
        "start": 5.78,
        "end": 5.96
      },
      {
        "id": 16,
        "word": "going",
        "start": 5.96,
        "end": 6.08
      },
      {
        "id": 17,
        "word": "to",
        "start": 6.08,
        "end": 6.12
      },
      {
        "id": 18,
        "word": "be",
        "start": 6.12,
        "end": 6.2
      },
      {
        "id": 19,
        "word": "training",
        "start": 6.2,
        "end": 6.42
      },
      {
        "id": 20,
        "word": "in",
        "start": 6.42,
        "end": 6.56
      },
      {
        "id": 21,
        "word": "the",
        "start": 6.56,
        "end": 6.6
      },
      {
        "id": 22,
        "word": "next",
        "start": 6.6,
        "end": 6.76
      },
      {
        "id": 23,
        "word": "30",
        "start": 6.76,
        "end": 6.98
      },
      {
        "id": 24,
        "word": "days",
        "start": 6.98,
        "end": 7.24
      },
      {
        "id": 25,
        "word": "independent",
        "start": 7.24,
        "end": 7.6
      },
      {
        "id": 26,
        "word": "of",
        "start": 7.6,
        "end": 7.96
      },
      {
        "id": 27,
        "word": "you.",
        "start": 7.96,
        "end": 8.06
      },
      {
        "id": 28,
        "word": "I",
        "start": 9.08,
        "end": 9.44
      },
      {
        "id": 29,
        "word": "had",
        "start": 9.44,
        "end": 9.64
      },
      {
        "id": 30,
        "word": "a",
        "start": 9.64,
        "end": 9.74
      },
      {
        "id": 31,
        "word": "-",
        "start": 9.74,
        "end": 9.84
      },
      {
        "id": 32,
        "word": "Jimmy,",
        "start": 9.84,
        "end": 10.08
      },
      {
        "id": 33,
        "word": "I",
        "start": 10.22,
        "end": 10.22
      },
      {
        "id": 34,
        "word": "had",
        "start": 10.22,
        "end": 10.34
      },
      {
        "id": 35,
        "word": "a",
        "start": 10.34,
        "end": 10.44
      },
      {
        "id": 36,
        "word": "feeling.",
        "start": 10.44,
        "end": 10.82
      },
      {
        "id": 37,
        "word": "Oh,",
        "start": 11.36,
        "end": 11.72
      },
      {
        "id": 38,
        "word": "no.",
        "start": 11.72,
        "end": 12.08
      },
      {
        "id": 39,
        "word": "I'm",
        "start": 12.28,
        "end": 12.36
      },
      {
        "id": 40,
        "word": "going",
        "start": 12.36,
        "end": 12.46
      },
      {
        "id": 41,
        "word": "to",
        "start": 12.46,
        "end": 12.52
      },
      {
        "id": 42,
        "word": "cry.",
        "start": 12.52,
        "end": 12.94
      },
      {
        "id": 43,
        "word": "You",
        "start": 13.88,
        "end": 14.24
      },
      {
        "id": 44,
        "word": "got",
        "start": 14.24,
        "end": 14.38
      },
      {
        "id": 45,
        "word": "to",
        "start": 14.38,
        "end": 14.48
      },
      {
        "id": 46,
        "word": "be",
        "start": 14.48,
        "end": 14.56
      },
      {
        "id": 47,
        "word": "strong,",
        "start": 14.56,
        "end": 14.88
      },
      {
        "id": 48,
        "word": "okay?",
        "start": 15.06,
        "end": 15.18
      },
      {
        "id": 49,
        "word": "All",
        "start": 15.46,
        "end": 15.62
      },
      {
        "id": 50,
        "word": "I've",
        "start": 15.62,
        "end": 15.78
      },
      {
        "id": 51,
        "word": "been",
        "start": 15.78,
        "end": 15.88
      },
      {
        "id": 52,
        "word": "saying",
        "start": 15.88,
        "end": 16.14
      },
      {
        "id": 53,
        "word": "this",
        "start": 16.14,
        "end": 16.34
      },
      {
        "id": 54,
        "word": "whole",
        "start": 16.34,
        "end": 16.5
      },
      {
        "id": 55,
        "word": "time",
        "start": 16.5,
        "end": 16.7
      },
      {
        "id": 56,
        "word": "is",
        "start": 16.7,
        "end": 16.88
      },
      {
        "id": 57,
        "word": "that",
        "start": 16.88,
        "end": 16.98
      },
      {
        "id": 58,
        "word": "I",
        "start": 16.98,
        "end": 17.08
      },
      {
        "id": 59,
        "word": "couldn't",
        "start": 17.08,
        "end": 17.38
      },
      {
        "id": 60,
        "word": "do",
        "start": 17.38,
        "end": 17.54
      },
      {
        "id": 61,
        "word": "it",
        "start": 17.54,
        "end": 17.7
      },
      {
        "id": 62,
        "word": "without",
        "start": 17.7,
        "end": 17.92
      },
      {
        "id": 63,
        "word": "you.",
        "start": 17.92,
        "end": 18.34
      },
      {
        "id": 64,
        "word": "Yes,",
        "start": 18.34,
        "end": 18.34
      },
      {
        "id": 65,
        "word": "you",
        "start": 18.36,
        "end": 18.4
      },
      {
        "id": 66,
        "word": "did.",
        "start": 18.4,
        "end": 18.52
      },
      {
        "id": 67,
        "word": "30",
        "start": 19.48,
        "end": 19.8
      },
      {
        "id": 68,
        "word": "days,",
        "start": 19.8,
        "end": 20.16
      },
      {
        "id": 69,
        "word": "okay?",
        "start": 20.36,
        "end": 20.54
      },
      {
        "id": 70,
        "word": "You",
        "start": 20.76,
        "end": 20.94
      },
      {
        "id": 71,
        "word": "got",
        "start": 20.94,
        "end": 21.04
      },
      {
        "id": 72,
        "word": "it.",
        "start": 21.04,
        "end": 21.04
      },
      {
        "id": 73,
        "word": "You",
        "start": 21.16,
        "end": 21.42
      },
      {
        "id": 74,
        "word": "got",
        "start": 21.42,
        "end": 21.64
      },
      {
        "id": 75,
        "word": "this.",
        "start": 21.64,
        "end": 21.86
      },
      {
        "id": 76,
        "word": "You",
        "start": 21.92,
        "end": 22.06
      },
      {
        "id": 77,
        "word": "got",
        "start": 22.06,
        "end": 22.28
      },
      {
        "id": 78,
        "word": "it.",
        "start": 22.28,
        "end": 22.36
      },
      {
        "id": 79,
        "word": "You",
        "start": 22.44,
        "end": 22.56
      },
      {
        "id": 80,
        "word": "got",
        "start": 22.56,
        "end": 22.74
      },
      {
        "id": 81,
        "word": "it.",
        "start": 22.74,
        "end": 22.84
      },
      {
        "id": 82,
        "word": "There",
        "start": 23.76,
        "end": 24.12
      },
      {
        "id": 83,
        "word": "you",
        "start": 24.12,
        "end": 24.22
      },
      {
        "id": 84,
        "word": "go.",
        "start": 24.22,
        "end": 24.34
      },
      {
        "id": 85,
        "word": "And",
        "start": 24.42,
        "end": 24.48
      },
      {
        "id": 86,
        "word": "then",
        "start": 24.48,
        "end": 24.56
      },
      {
        "id": 87,
        "word": "step",
        "start": 24.56,
        "end": 24.76
      },
      {
        "id": 88,
        "word": "over.",
        "start": 24.76,
        "end": 25.02
      },
      {
        "id": 89,
        "word": "Whoa!",
        "start": 25.58,
        "end": 25.8
      },
      {
        "id": 90,
        "word": "All",
        "start": 26.58,
        "end": 26.72
      },
      {
        "id": 91,
        "word": "right,",
        "start": 26.72,
        "end": 26.8
      },
      {
        "id": 92,
        "word": "Darius,",
        "start": 26.88,
        "end": 27.12
      },
      {
        "id": 93,
        "word": "cover",
        "start": 27.28,
        "end": 27.48
      },
      {
        "id": 94,
        "word": "it",
        "start": 27.48,
        "end": 27.6
      },
      {
        "id": 95,
        "word": "back",
        "start": 27.6,
        "end": 27.78
      },
      {
        "id": 96,
        "word": "up.",
        "start": 27.78,
        "end": 27.96
      },
      {
        "id": 97,
        "word": "I",
        "start": 28.02,
        "end": 28.16
      },
      {
        "id": 98,
        "word": "gotcha.",
        "start": 28.16,
        "end": 28.58
      },
      {
        "id": 99,
        "word": "Let's",
        "start": 29.14,
        "end": 29.38
      },
      {
        "id": 100,
        "word": "go,",
        "start": 29.38,
        "end": 29.52
      },
      {
        "id": 101,
        "word": "Trey.",
        "start": 29.64,
        "end": 29.66
      },
      {
        "id": 102,
        "word": "Let's",
        "start": 29.66,
        "end": 29.88
      },
      {
        "id": 103,
        "word": "head",
        "start": 29.88,
        "end": 30.06
      },
      {
        "id": 104,
        "word": "on",
        "start": 30.06,
        "end": 30.22
      },
      {
        "id": 105,
        "word": "our",
        "start": 30.22,
        "end": 30.36
      },
      {
        "id": 106,
        "word": "journey.",
        "start": 30.36,
        "end": 30.72
      },
      {
        "id": 107,
        "word": "Goodbye,",
        "start": 31.44,
        "end": 31.8
      },
      {
        "id": 108,
        "word": "Sarah.",
        "start": 31.96,
        "end": 32.24
      },
      {
        "id": 109,
        "word": "Goodbye.",
        "start": 32.48,
        "end": 32.68
      },
      {
        "id": 110,
        "word": "Welcome,",
        "start": 33.74,
        "end": 34.1
      },
      {
        "id": 111,
        "word": "Trey,",
        "start": 34.32,
        "end": 34.6
      },
      {
        "id": 112,
        "word": "to",
        "start": 34.76,
        "end": 35.06
      },
      {
        "id": 113,
        "word": "your",
        "start": 35.06,
        "end": 35.3
      },
      {
        "id": 114,
        "word": "brand",
        "start": 35.3,
        "end": 35.86
      },
      {
        "id": 115,
        "word": "new",
        "start": 35.86,
        "end": 36.62
      },
      {
        "id": 116,
        "word": "home.",
        "start": 36.62,
        "end": 37.36
      },
      {
        "id": 117,
        "word": "Whoa.",
        "start": 37.36,
        "end": 37.5
      },
      {
        "id": 118,
        "word": "You",
        "start": 37.62,
        "end": 37.8
      },
      {
        "id": 119,
        "word": "have",
        "start": 37.8,
        "end": 38.06
      },
      {
        "id": 120,
        "word": "a",
        "start": 38.06,
        "end": 38.36
      },
      {
        "id": 121,
        "word": "full",
        "start": 38.36,
        "end": 38.68
      },
      {
        "id": 122,
        "word": "-fledged",
        "start": 38.68,
        "end": 39.08
      },
      {
        "id": 123,
        "word": "basketball",
        "start": 39.08,
        "end": 39.48
      },
      {
        "id": 124,
        "word": "court.",
        "start": 39.48,
        "end": 39.82
      },
      {
        "id": 125,
        "word": "Whoa.",
        "start": 40.04,
        "end": 40.18
      },
      {
        "id": 126,
        "word": "You",
        "start": 40.18,
        "end": 40.22
      },
      {
        "id": 127,
        "word": "have",
        "start": 40.22,
        "end": 40.36
      },
      {
        "id": 128,
        "word": "all",
        "start": 40.36,
        "end": 40.82
      },
      {
        "id": 129,
        "word": "the",
        "start": 40.82,
        "end": 41.06
      },
      {
        "id": 130,
        "word": "workout",
        "start": 41.06,
        "end": 41.36
      },
      {
        "id": 131,
        "word": "equipment",
        "start": 41.36,
        "end": 41.68
      },
      {
        "id": 132,
        "word": "you",
        "start": 41.68,
        "end": 41.88
      },
      {
        "id": 133,
        "word": "could",
        "start": 41.88,
        "end": 42.06
      },
      {
        "id": 134,
        "word": "ever",
        "start": 42.06,
        "end": 42.5
      },
      {
        "id": 135,
        "word": "want",
        "start": 42.5,
        "end": 42.92
      },
      {
        "id": 136,
        "word": "in",
        "start": 42.92,
        "end": 43.12
      },
      {
        "id": 137,
        "word": "life.",
        "start": 43.12,
        "end": 43.3
      },
      {
        "id": 138,
        "word": "What",
        "start": 43.46,
        "end": 43.58
      },
      {
        "id": 139,
        "word": "in",
        "start": 43.58,
        "end": 43.82
      },
      {
        "id": 140,
        "word": "the",
        "start": 43.82,
        "end": 43.98
      },
      {
        "id": 141,
        "word": "world?",
        "start": 43.98,
        "end": 44.4
      },
      {
        "id": 142,
        "word": "And",
        "start": 45.2,
        "end": 45.62
      },
      {
        "id": 143,
        "word": "you",
        "start": 45.62,
        "end": 46.04
      },
      {
        "id": 144,
        "word": "have",
        "start": 46.04,
        "end": 46.52
      },
      {
        "id": 145,
        "word": "a",
        "start": 46.52,
        "end": 46.6
      },
      {
        "id": 146,
        "word": "bedroom.",
        "start": 46.6,
        "end": 46.9
      },
      {
        "id": 147,
        "word": "Oh.",
        "start": 47.7,
        "end": 47.74
      },
      {
        "id": 148,
        "word": "Dang!",
        "start": 48.28,
        "end": 48.68
      },
      {
        "id": 149,
        "word": "Wait!",
        "start": 49.16,
        "end": 49.32
      },
      {
        "id": 150,
        "word": "Whoa!",
        "start": 49.72,
        "end": 49.9
      },
      {
        "id": 151,
        "word": "Exactly.",
        "start": 50.3,
        "end": 50.72
      }
    ],
    "fullText": "What does that mean? Well, I might have built a second gym where Trey is going to be training in the next 30 days independent of you. I had a - Jimmy, I had a feeling. Oh, no. I'm going to cry. You got to be strong, okay? All I've been saying this whole time is that I couldn't do it without you. Yes, you did. 30 days, okay? You got it. You got this. You got it. You got it. There you go. And then step over. Whoa! All right, Darius, cover it back up. I gotcha. Let's go, Trey. Let's head on our journey. Goodbye, Sarah. Goodbye. Welcome, Trey, to your brand new home. Whoa. You have a full -fledged basketball court. Whoa. You have all the workout equipment you could ever want in life. What in the world? And you have a bedroom. Oh. Dang! Wait! Whoa! Exactly.",
    "captionStyle": "mrbeast",
    "brandKitId": "bk-mrbeast",
    "watermarkHandle": "@mrbeast",
    "copy": {
      "youtubeTitle": "What does that mean? #shorts",
      "youtubeDescription": "What does that mean? Well, I might have built a second gym where Trey is going to be training in the next 30 days independent of you. I had a - Jimmy, I had a feeling. Oh, no. I'm going to cry. You got to be strong, okay? All I've been saying this whole time is that I couldn't do it without you. Yes, you did. 30 days, okay? You got it. You got this. You got it. You got it. There you go. And then step over. Whoa! All right, Darius, cover it back up. I gotcha. Let's go, Trey. Let's head on our journey. Goodbye, Sarah. Goodbye. Welcome, Trey, to your brand new home. Whoa. You have a full -fledged basketball court. Whoa. You have all the workout equipment you could ever want in life. What in the world? And you have a bedroom. Oh. Dang! Wait! Whoa! Exactly.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "What does that mean? Well, I might have built a second gym where Trey is going to be training in the next 30 days independent of you. I had a - Jimmy, I had a feeling. Oh, no. I'm ... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-mrbeast-4",
    "index": 4,
    "title": "What are you doing?",
    "startTime": 1887.1,
    "endTime": 1929.48,
    "duration": 42.38,
    "viralityScore": 68,
    "factors": {
      "hook": 57,
      "acoustics": 69,
      "pace": 100,
      "payoff": 65,
      "sentiment": 20,
      "duration": 99
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_04_provocative_question_what_doin_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_04_provocative_question_what_doin.mp4",
    "words": [
      {
        "id": 1,
        "word": "What",
        "start": 0.0,
        "end": 0.5
      },
      {
        "id": 2,
        "word": "are",
        "start": 0.5,
        "end": 0.68
      },
      {
        "id": 3,
        "word": "you",
        "start": 0.68,
        "end": 0.8
      },
      {
        "id": 4,
        "word": "doing?",
        "start": 0.8,
        "end": 1.3
      },
      {
        "id": 5,
        "word": "Do",
        "start": 1.9,
        "end": 2.1
      },
      {
        "id": 6,
        "word": "you",
        "start": 2.1,
        "end": 2.32
      },
      {
        "id": 7,
        "word": "like",
        "start": 2.32,
        "end": 2.64
      },
      {
        "id": 8,
        "word": "it",
        "start": 2.64,
        "end": 2.9
      },
      {
        "id": 9,
        "word": "at",
        "start": 2.9,
        "end": 3.02
      },
      {
        "id": 10,
        "word": "home?",
        "start": 3.02,
        "end": 3.02
      },
      {
        "id": 11,
        "word": "I",
        "start": 3.12,
        "end": 3.64
      },
      {
        "id": 12,
        "word": "can't",
        "start": 3.64,
        "end": 3.9
      },
      {
        "id": 13,
        "word": "hear",
        "start": 3.9,
        "end": 4.16
      },
      {
        "id": 14,
        "word": "you.",
        "start": 4.16,
        "end": 4.5
      },
      {
        "id": 15,
        "word": "I",
        "start": 4.5,
        "end": 5.1
      },
      {
        "id": 16,
        "word": "don't",
        "start": 5.1,
        "end": 5.28
      },
      {
        "id": 17,
        "word": "know",
        "start": 5.28,
        "end": 5.4
      },
      {
        "id": 18,
        "word": "if",
        "start": 5.4,
        "end": 5.56
      },
      {
        "id": 19,
        "word": "you're",
        "start": 5.56,
        "end": 5.8
      },
      {
        "id": 20,
        "word": "dead.",
        "start": 5.8,
        "end": 6.08
      },
      {
        "id": 21,
        "word": "Ugh.",
        "start": 6.42,
        "end": 6.94
      },
      {
        "id": 22,
        "word": "What",
        "start": 7.46,
        "end": 7.68
      },
      {
        "id": 23,
        "word": "are",
        "start": 7.68,
        "end": 7.98
      },
      {
        "id": 24,
        "word": "you",
        "start": 7.98,
        "end": 8.12
      },
      {
        "id": 25,
        "word": "doing?",
        "start": 8.12,
        "end": 8.3
      },
      {
        "id": 26,
        "word": "I",
        "start": 8.62,
        "end": 8.86
      },
      {
        "id": 27,
        "word": "can't",
        "start": 8.86,
        "end": 9.26
      },
      {
        "id": 28,
        "word": "hear",
        "start": 9.26,
        "end": 9.54
      },
      {
        "id": 29,
        "word": "you.",
        "start": 9.54,
        "end": 9.86
      },
      {
        "id": 30,
        "word": "Dang,",
        "start": 10.18,
        "end": 10.48
      },
      {
        "id": 31,
        "word": "bruh,",
        "start": 10.64,
        "end": 10.78
      },
      {
        "id": 32,
        "word": "like",
        "start": 10.84,
        "end": 10.96
      },
      {
        "id": 33,
        "word": "I",
        "start": 10.96,
        "end": 11.04
      },
      {
        "id": 34,
        "word": "really",
        "start": 11.04,
        "end": 11.3
      },
      {
        "id": 35,
        "word": "cannot",
        "start": 11.3,
        "end": 11.58
      },
      {
        "id": 36,
        "word": "hear",
        "start": 11.58,
        "end": 11.86
      },
      {
        "id": 37,
        "word": "her.",
        "start": 11.86,
        "end": 12.1
      },
      {
        "id": 38,
        "word": "Ugh,",
        "start": 12.3,
        "end": 12.56
      },
      {
        "id": 39,
        "word": "this",
        "start": 12.64,
        "end": 12.84
      },
      {
        "id": 40,
        "word": "is",
        "start": 12.84,
        "end": 12.98
      },
      {
        "id": 41,
        "word": "so",
        "start": 12.98,
        "end": 13.18
      },
      {
        "id": 42,
        "word": "sad.",
        "start": 13.18,
        "end": 13.58
      },
      {
        "id": 43,
        "word": "I",
        "start": 13.92,
        "end": 14.16
      },
      {
        "id": 44,
        "word": "can",
        "start": 14.16,
        "end": 14.32
      },
      {
        "id": 45,
        "word": "see",
        "start": 14.32,
        "end": 14.6
      },
      {
        "id": 46,
        "word": "him",
        "start": 14.6,
        "end": 14.8
      },
      {
        "id": 47,
        "word": "but",
        "start": 14.8,
        "end": 14.98
      },
      {
        "id": 48,
        "word": "I",
        "start": 14.98,
        "end": 15.1
      },
      {
        "id": 49,
        "word": "can't",
        "start": 15.1,
        "end": 15.46
      },
      {
        "id": 50,
        "word": "hear",
        "start": 15.46,
        "end": 15.72
      },
      {
        "id": 51,
        "word": "him.",
        "start": 15.72,
        "end": 16.16
      },
      {
        "id": 52,
        "word": "Ugh.",
        "start": 16.66,
        "end": 16.98
      },
      {
        "id": 53,
        "word": "Like",
        "start": 17.18,
        "end": 17.42
      },
      {
        "id": 54,
        "word": "complete",
        "start": 17.42,
        "end": 17.78
      },
      {
        "id": 55,
        "word": "isolation",
        "start": 17.78,
        "end": 18.42
      },
      {
        "id": 56,
        "word": "from",
        "start": 18.42,
        "end": 18.96
      },
      {
        "id": 57,
        "word": "just",
        "start": 18.96,
        "end": 19.46
      },
      {
        "id": 58,
        "word": "her",
        "start": 19.46,
        "end": 19.74
      },
      {
        "id": 59,
        "word": "not",
        "start": 19.74,
        "end": 20.04
      },
      {
        "id": 60,
        "word": "knowing",
        "start": 20.04,
        "end": 20.2
      },
      {
        "id": 61,
        "word": "how",
        "start": 20.2,
        "end": 20.38
      },
      {
        "id": 62,
        "word": "she's",
        "start": 20.38,
        "end": 20.6
      },
      {
        "id": 63,
        "word": "doing.",
        "start": 20.6,
        "end": 20.78
      },
      {
        "id": 64,
        "word": "This",
        "start": 21.04,
        "end": 21.26
      },
      {
        "id": 65,
        "word": "sucks.",
        "start": 21.26,
        "end": 21.8
      },
      {
        "id": 66,
        "word": "Sarah",
        "start": 22.18,
        "end": 22.54
      },
      {
        "id": 67,
        "word": "and",
        "start": 22.54,
        "end": 22.78
      },
      {
        "id": 68,
        "word": "Trey",
        "start": 22.78,
        "end": 22.94
      },
      {
        "id": 69,
        "word": "are",
        "start": 22.94,
        "end": 23.24
      },
      {
        "id": 70,
        "word": "finding",
        "start": 23.24,
        "end": 23.58
      },
      {
        "id": 71,
        "word": "out",
        "start": 23.58,
        "end": 23.84
      },
      {
        "id": 72,
        "word": "how",
        "start": 23.84,
        "end": 24.1
      },
      {
        "id": 73,
        "word": "much",
        "start": 24.1,
        "end": 24.36
      },
      {
        "id": 74,
        "word": "250k",
        "start": 24.36,
        "end": 25.42
      },
      {
        "id": 75,
        "word": "is",
        "start": 25.42,
        "end": 25.98
      },
      {
        "id": 76,
        "word": "really",
        "start": 25.98,
        "end": 26.42
      },
      {
        "id": 77,
        "word": "worth.",
        "start": 26.42,
        "end": 26.64
      },
      {
        "id": 78,
        "word": "I",
        "start": 26.9,
        "end": 27.06
      },
      {
        "id": 79,
        "word": "wanna",
        "start": 27.06,
        "end": 27.14
      },
      {
        "id": 80,
        "word": "go",
        "start": 27.14,
        "end": 27.28
      },
      {
        "id": 81,
        "word": "home.",
        "start": 27.28,
        "end": 27.56
      },
      {
        "id": 82,
        "word": "I",
        "start": 27.56,
        "end": 28.38
      },
      {
        "id": 83,
        "word": "think",
        "start": 28.38,
        "end": 28.6
      },
      {
        "id": 84,
        "word": "my",
        "start": 28.6,
        "end": 29.0
      },
      {
        "id": 85,
        "word": "motivation",
        "start": 29.0,
        "end": 29.56
      },
      {
        "id": 86,
        "word": "has",
        "start": 29.56,
        "end": 30.14
      },
      {
        "id": 87,
        "word": "like",
        "start": 30.14,
        "end": 30.34
      },
      {
        "id": 88,
        "word": "plummeted",
        "start": 30.34,
        "end": 31.16
      },
      {
        "id": 89,
        "word": "the",
        "start": 31.16,
        "end": 31.48
      },
      {
        "id": 90,
        "word": "past",
        "start": 31.48,
        "end": 31.72
      },
      {
        "id": 91,
        "word": "two",
        "start": 31.72,
        "end": 31.94
      },
      {
        "id": 92,
        "word": "days.",
        "start": 31.94,
        "end": 32.22
      },
      {
        "id": 93,
        "word": "I'm",
        "start": 32.6,
        "end": 32.66
      },
      {
        "id": 94,
        "word": "so",
        "start": 32.66,
        "end": 32.78
      },
      {
        "id": 95,
        "word": "bored.",
        "start": 32.78,
        "end": 33.46
      },
      {
        "id": 96,
        "word": "Um,",
        "start": 36.58,
        "end": 37.2
      },
      {
        "id": 97,
        "word": "just",
        "start": 37.4,
        "end": 37.5
      },
      {
        "id": 98,
        "word": "emotionally",
        "start": 37.5,
        "end": 38.02
      },
      {
        "id": 99,
        "word": "I",
        "start": 38.02,
        "end": 38.26
      },
      {
        "id": 100,
        "word": "miss",
        "start": 38.26,
        "end": 38.56
      },
      {
        "id": 101,
        "word": "Trey",
        "start": 38.56,
        "end": 38.88
      },
      {
        "id": 102,
        "word": "a",
        "start": 38.88,
        "end": 39.08
      },
      {
        "id": 103,
        "word": "lot.",
        "start": 39.08,
        "end": 39.3
      },
      {
        "id": 104,
        "word": "I",
        "start": 39.56,
        "end": 39.6
      },
      {
        "id": 105,
        "word": "miss",
        "start": 39.6,
        "end": 39.84
      },
      {
        "id": 106,
        "word": "Sarah.",
        "start": 39.84,
        "end": 40.14
      },
      {
        "id": 107,
        "word": "Time's",
        "start": 40.56,
        "end": 40.98
      },
      {
        "id": 108,
        "word": "just",
        "start": 40.98,
        "end": 41.14
      },
      {
        "id": 109,
        "word": "moving",
        "start": 41.14,
        "end": 41.52
      },
      {
        "id": 110,
        "word": "really",
        "start": 41.52,
        "end": 41.9
      },
      {
        "id": 111,
        "word": "slow.",
        "start": 41.9,
        "end": 42.38
      }
    ],
    "fullText": "What are you doing? Do you like it at home? I can't hear you. I don't know if you're dead. Ugh. What are you doing? I can't hear you. Dang, bruh, like I really cannot hear her. Ugh, this is so sad. I can see him but I can't hear him. Ugh. Like complete isolation from just her not knowing how she's doing. This sucks. Sarah and Trey are finding out how much 250k is really worth. I wanna go home. I think my motivation has like plummeted the past two days. I'm so bored. Um, just emotionally I miss Trey a lot. I miss Sarah. Time's just moving really slow.",
    "captionStyle": "mrbeast",
    "brandKitId": "bk-mrbeast",
    "watermarkHandle": "@mrbeast",
    "copy": {
      "youtubeTitle": "What are you doing? #shorts",
      "youtubeDescription": "What are you doing? Do you like it at home? I can't hear you. I don't know if you're dead. Ugh. What are you doing? I can't hear you. Dang, bruh, like I really cannot hear her. Ugh, this is so sad. I can see him but I can't hear him. Ugh. Like complete isolation from just her not knowing how she's doing. This sucks. Sarah and Trey are finding out how much 250k is really worth. I wanna go home. I think my motivation has like plummeted the past two days. I'm so bored. Um, just emotionally I miss Trey a lot. I miss Sarah. Time's just moving really slow.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "What are you doing? Do you like it at home? I can't hear you. I don't know if you're dead. Ugh. What are you doing? I can't hear you. Dang, bruh, like I really cannot hear her. Ugh... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-mrbeast-5",
    "index": 5,
    "title": "What if I told you, Trey, this Ford F?",
    "startTime": 1255.26,
    "endTime": 1301.74,
    "duration": 46.48,
    "viralityScore": 67,
    "factors": {
      "hook": 71,
      "acoustics": 62,
      "pace": 85,
      "payoff": 65,
      "sentiment": 20,
      "duration": 89
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_05_contrarian_take_what_told_you__thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_05_contrarian_take_what_told_you_.mp4",
    "words": [
      {
        "id": 1,
        "word": "What",
        "start": 0.0,
        "end": 0.24
      },
      {
        "id": 2,
        "word": "if",
        "start": 0.24,
        "end": 0.38
      },
      {
        "id": 3,
        "word": "I",
        "start": 0.38,
        "end": 0.46
      },
      {
        "id": 4,
        "word": "told",
        "start": 0.46,
        "end": 0.64
      },
      {
        "id": 5,
        "word": "you,",
        "start": 0.64,
        "end": 0.8
      },
      {
        "id": 6,
        "word": "Trey,",
        "start": 0.88,
        "end": 0.96
      },
      {
        "id": 7,
        "word": "this",
        "start": 1.06,
        "end": 1.24
      },
      {
        "id": 8,
        "word": "Ford",
        "start": 1.24,
        "end": 1.48
      },
      {
        "id": 9,
        "word": "F",
        "start": 1.48,
        "end": 1.68
      },
      {
        "id": 10,
        "word": "-150",
        "start": 1.68,
        "end": 2.1
      },
      {
        "id": 11,
        "word": "could",
        "start": 2.1,
        "end": 2.58
      },
      {
        "id": 12,
        "word": "be",
        "start": 2.58,
        "end": 2.78
      },
      {
        "id": 13,
        "word": "yours",
        "start": 2.78,
        "end": 3.24
      },
      {
        "id": 14,
        "word": "in",
        "start": 3.24,
        "end": 3.74
      },
      {
        "id": 15,
        "word": "over",
        "start": 3.74,
        "end": 4.16
      },
      {
        "id": 16,
        "word": "the",
        "start": 4.16,
        "end": 4.32
      },
      {
        "id": 17,
        "word": "next",
        "start": 4.32,
        "end": 4.58
      },
      {
        "id": 18,
        "word": "30",
        "start": 4.58,
        "end": 4.9
      },
      {
        "id": 19,
        "word": "days.",
        "start": 4.9,
        "end": 5.36
      },
      {
        "id": 20,
        "word": "You",
        "start": 5.76,
        "end": 5.82
      },
      {
        "id": 21,
        "word": "and",
        "start": 5.82,
        "end": 6.02
      },
      {
        "id": 22,
        "word": "Sarah",
        "start": 6.02,
        "end": 6.38
      },
      {
        "id": 23,
        "word": "pulled",
        "start": 6.38,
        "end": 6.8
      },
      {
        "id": 24,
        "word": "around",
        "start": 6.8,
        "end": 7.06
      },
      {
        "id": 25,
        "word": "the",
        "start": 7.06,
        "end": 7.28
      },
      {
        "id": 26,
        "word": "circle",
        "start": 7.28,
        "end": 7.64
      },
      {
        "id": 27,
        "word": "150",
        "start": 7.64,
        "end": 8.16
      },
      {
        "id": 28,
        "word": "times.",
        "start": 8.16,
        "end": 8.66
      },
      {
        "id": 29,
        "word": "Just",
        "start": 8.9,
        "end": 9.34
      },
      {
        "id": 30,
        "word": "five",
        "start": 9.34,
        "end": 9.56
      },
      {
        "id": 31,
        "word": "times",
        "start": 9.56,
        "end": 9.76
      },
      {
        "id": 32,
        "word": "a",
        "start": 9.76,
        "end": 9.9
      },
      {
        "id": 33,
        "word": "day?",
        "start": 9.9,
        "end": 9.96
      },
      {
        "id": 34,
        "word": "Five",
        "start": 10.06,
        "end": 10.18
      },
      {
        "id": 35,
        "word": "times",
        "start": 10.18,
        "end": 10.34
      },
      {
        "id": 36,
        "word": "a",
        "start": 10.34,
        "end": 10.46
      },
      {
        "id": 37,
        "word": "day.",
        "start": 10.46,
        "end": 10.56
      },
      {
        "id": 38,
        "word": "Woo!",
        "start": 11.98,
        "end": 12.28
      },
      {
        "id": 39,
        "word": "All",
        "start": 13.38,
        "end": 13.82
      },
      {
        "id": 40,
        "word": "right,",
        "start": 13.82,
        "end": 13.9
      },
      {
        "id": 41,
        "word": "let's",
        "start": 13.96,
        "end": 14.16
      },
      {
        "id": 42,
        "word": "go",
        "start": 14.16,
        "end": 14.28
      },
      {
        "id": 43,
        "word": "for",
        "start": 14.28,
        "end": 14.48
      },
      {
        "id": 44,
        "word": "it.",
        "start": 14.48,
        "end": 14.54
      },
      {
        "id": 45,
        "word": "Start",
        "start": 14.6,
        "end": 14.72
      },
      {
        "id": 46,
        "word": "pulling.",
        "start": 14.72,
        "end": 15.0
      },
      {
        "id": 47,
        "word": "Let's",
        "start": 15.18,
        "end": 15.18
      },
      {
        "id": 48,
        "word": "go.",
        "start": 15.18,
        "end": 15.34
      },
      {
        "id": 49,
        "word": "Get",
        "start": 15.78,
        "end": 15.78
      },
      {
        "id": 50,
        "word": "those",
        "start": 15.78,
        "end": 16.04
      },
      {
        "id": 51,
        "word": "legs!",
        "start": 16.04,
        "end": 16.5
      },
      {
        "id": 52,
        "word": "You",
        "start": 16.68,
        "end": 16.86
      },
      {
        "id": 53,
        "word": "got",
        "start": 16.86,
        "end": 17.0
      },
      {
        "id": 54,
        "word": "to",
        "start": 17.0,
        "end": 17.1
      },
      {
        "id": 55,
        "word": "get",
        "start": 17.1,
        "end": 17.22
      },
      {
        "id": 56,
        "word": "low.",
        "start": 17.22,
        "end": 17.48
      },
      {
        "id": 57,
        "word": "Oh,",
        "start": 17.48,
        "end": 17.62
      },
      {
        "id": 58,
        "word": "come",
        "start": 17.62,
        "end": 18.1
      },
      {
        "id": 59,
        "word": "on.",
        "start": 18.1,
        "end": 18.22
      },
      {
        "id": 60,
        "word": "It's",
        "start": 18.46,
        "end": 18.72
      },
      {
        "id": 61,
        "word": "going",
        "start": 18.72,
        "end": 18.72
      },
      {
        "id": 62,
        "word": "to",
        "start": 18.72,
        "end": 18.72
      },
      {
        "id": 63,
        "word": "be",
        "start": 18.72,
        "end": 18.82
      },
      {
        "id": 64,
        "word": "leg",
        "start": 18.82,
        "end": 19.02
      },
      {
        "id": 65,
        "word": "day",
        "start": 19.02,
        "end": 19.22
      },
      {
        "id": 66,
        "word": "every",
        "start": 19.22,
        "end": 19.62
      },
      {
        "id": 67,
        "word": "day.",
        "start": 19.62,
        "end": 19.84
      },
      {
        "id": 68,
        "word": "Every",
        "start": 19.9,
        "end": 20.08
      },
      {
        "id": 69,
        "word": "day,",
        "start": 20.08,
        "end": 20.24
      },
      {
        "id": 70,
        "word": "Sarah.",
        "start": 20.34,
        "end": 20.48
      },
      {
        "id": 71,
        "word": "Now,",
        "start": 20.68,
        "end": 20.9
      },
      {
        "id": 72,
        "word": "it",
        "start": 21.06,
        "end": 21.24
      },
      {
        "id": 73,
        "word": "goes",
        "start": 21.24,
        "end": 21.4
      },
      {
        "id": 74,
        "word": "without",
        "start": 21.4,
        "end": 21.58
      },
      {
        "id": 75,
        "word": "saying,",
        "start": 21.58,
        "end": 21.98
      },
      {
        "id": 76,
        "word": "but",
        "start": 22.06,
        "end": 22.24
      },
      {
        "id": 77,
        "word": "if",
        "start": 22.24,
        "end": 22.34
      },
      {
        "id": 78,
        "word": "you",
        "start": 22.34,
        "end": 22.42
      },
      {
        "id": 79,
        "word": "accidentally",
        "start": 22.42,
        "end": 22.68
      },
      {
        "id": 80,
        "word": "step",
        "start": 22.68,
        "end": 22.92
      },
      {
        "id": 81,
        "word": "on",
        "start": 22.92,
        "end": 23.04
      },
      {
        "id": 82,
        "word": "the",
        "start": 23.04,
        "end": 23.08
      },
      {
        "id": 83,
        "word": "red",
        "start": 23.08,
        "end": 23.2
      },
      {
        "id": 84,
        "word": "line",
        "start": 23.2,
        "end": 23.34
      },
      {
        "id": 85,
        "word": "while",
        "start": 23.34,
        "end": 23.48
      },
      {
        "id": 86,
        "word": "doing",
        "start": 23.48,
        "end": 23.66
      },
      {
        "id": 87,
        "word": "this,",
        "start": 23.66,
        "end": 23.82
      },
      {
        "id": 88,
        "word": "you're",
        "start": 23.9,
        "end": 23.98
      },
      {
        "id": 89,
        "word": "out.",
        "start": 23.98,
        "end": 24.1
      },
      {
        "id": 90,
        "word": "And",
        "start": 24.22,
        "end": 24.44
      },
      {
        "id": 91,
        "word": "no",
        "start": 24.44,
        "end": 24.6
      },
      {
        "id": 92,
        "word": "one's",
        "start": 24.6,
        "end": 24.88
      },
      {
        "id": 93,
        "word": "allowed",
        "start": 24.88,
        "end": 25.06
      },
      {
        "id": 94,
        "word": "to",
        "start": 25.06,
        "end": 25.22
      },
      {
        "id": 95,
        "word": "pull",
        "start": 25.22,
        "end": 25.48
      },
      {
        "id": 96,
        "word": "but",
        "start": 25.48,
        "end": 25.68
      },
      {
        "id": 97,
        "word": "these",
        "start": 25.68,
        "end": 25.92
      },
      {
        "id": 98,
        "word": "two.",
        "start": 25.92,
        "end": 26.12
      },
      {
        "id": 99,
        "word": "All",
        "start": 26.26,
        "end": 26.42
      },
      {
        "id": 100,
        "word": "right.",
        "start": 26.42,
        "end": 26.66
      },
      {
        "id": 101,
        "word": "So,",
        "start": 26.84,
        "end": 27.0
      },
      {
        "id": 102,
        "word": "we",
        "start": 27.0,
        "end": 27.18
      },
      {
        "id": 103,
        "word": "haven't",
        "start": 27.18,
        "end": 27.44
      },
      {
        "id": 104,
        "word": "even",
        "start": 27.44,
        "end": 27.56
      },
      {
        "id": 105,
        "word": "finished",
        "start": 27.56,
        "end": 27.94
      },
      {
        "id": 106,
        "word": "a",
        "start": 27.94,
        "end": 28.16
      },
      {
        "id": 107,
        "word": "lap",
        "start": 28.16,
        "end": 28.4
      },
      {
        "id": 108,
        "word": "yet.",
        "start": 28.4,
        "end": 28.58
      },
      {
        "id": 109,
        "word": "How",
        "start": 28.58,
        "end": 28.78
      },
      {
        "id": 110,
        "word": "are",
        "start": 28.78,
        "end": 28.86
      },
      {
        "id": 111,
        "word": "you",
        "start": 28.86,
        "end": 28.96
      },
      {
        "id": 112,
        "word": "two",
        "start": 28.96,
        "end": 29.06
      },
      {
        "id": 113,
        "word": "feeling?",
        "start": 29.06,
        "end": 29.3
      },
      {
        "id": 114,
        "word": "I'm",
        "start": 29.44,
        "end": 29.64
      },
      {
        "id": 115,
        "word": "exhausted.",
        "start": 29.64,
        "end": 30.0
      },
      {
        "id": 116,
        "word": "I'm",
        "start": 30.34,
        "end": 30.54
      },
      {
        "id": 117,
        "word": "tired.",
        "start": 30.54,
        "end": 30.54
      },
      {
        "id": 118,
        "word": "Yeah.",
        "start": 30.9,
        "end": 31.0
      },
      {
        "id": 119,
        "word": "Keep",
        "start": 31.18,
        "end": 31.38
      },
      {
        "id": 120,
        "word": "going.",
        "start": 31.38,
        "end": 31.68
      },
      {
        "id": 121,
        "word": "That",
        "start": 31.92,
        "end": 32.18
      },
      {
        "id": 122,
        "word": "was",
        "start": 32.18,
        "end": 32.38
      },
      {
        "id": 123,
        "word": "one",
        "start": 32.38,
        "end": 32.66
      },
      {
        "id": 124,
        "word": "lap.",
        "start": 32.66,
        "end": 32.96
      },
      {
        "id": 125,
        "word": "How",
        "start": 33.06,
        "end": 33.22
      },
      {
        "id": 126,
        "word": "was",
        "start": 33.22,
        "end": 33.46
      },
      {
        "id": 127,
        "word": "it?",
        "start": 33.46,
        "end": 33.6
      },
      {
        "id": 128,
        "word": "That",
        "start": 34.0,
        "end": 34.2
      },
      {
        "id": 129,
        "word": "sucked.",
        "start": 34.2,
        "end": 34.48
      },
      {
        "id": 130,
        "word": "One",
        "start": 34.84,
        "end": 35.12
      },
      {
        "id": 131,
        "word": "down.",
        "start": 35.12,
        "end": 35.4
      },
      {
        "id": 132,
        "word": "149",
        "start": 36.76,
        "end": 37.16
      },
      {
        "id": 133,
        "word": "to",
        "start": 37.16,
        "end": 37.32
      },
      {
        "id": 134,
        "word": "go.",
        "start": 37.32,
        "end": 37.52
      },
      {
        "id": 135,
        "word": "There",
        "start": 40.28,
        "end": 40.68
      },
      {
        "id": 136,
        "word": "you",
        "start": 40.68,
        "end": 40.8
      },
      {
        "id": 137,
        "word": "go.",
        "start": 40.8,
        "end": 41.04
      },
      {
        "id": 138,
        "word": "There",
        "start": 41.78,
        "end": 42.18
      },
      {
        "id": 139,
        "word": "you",
        "start": 42.18,
        "end": 42.34
      },
      {
        "id": 140,
        "word": "go.",
        "start": 42.34,
        "end": 42.64
      },
      {
        "id": 141,
        "word": "Let's",
        "start": 43.66,
        "end": 44.06
      },
      {
        "id": 142,
        "word": "cross",
        "start": 44.06,
        "end": 44.34
      },
      {
        "id": 143,
        "word": "it.",
        "start": 44.34,
        "end": 44.6
      },
      {
        "id": 144,
        "word": "Two",
        "start": 45.26,
        "end": 45.66
      },
      {
        "id": 145,
        "word": "laps",
        "start": 45.66,
        "end": 46.06
      },
      {
        "id": 146,
        "word": "down!",
        "start": 46.06,
        "end": 46.48
      },
      {
        "id": 147,
        "word": "I'm",
        "start": 46.48,
        "end": 47.1
      }
    ],
    "fullText": "What if I told you, Trey, this Ford F -150 could be yours in over the next 30 days. You and Sarah pulled around the circle 150 times. Just five times a day? Five times a day. Woo! All right, let's go for it. Start pulling. Let's go. Get those legs! You got to get low. Oh, come on. It's going to be leg day every day. Every day, Sarah. Now, it goes without saying, but if you accidentally step on the red line while doing this, you're out. And no one's allowed to pull but these two. All right. So, we haven't even finished a lap yet. How are you two feeling? I'm exhausted. I'm tired. Yeah. Keep going. That was one lap. How was it? That sucked. One down. 149 to go. There you go. There you go. Let's cross it. Two laps down!",
    "captionStyle": "mrbeast",
    "brandKitId": "bk-mrbeast",
    "watermarkHandle": "@mrbeast",
    "copy": {
      "youtubeTitle": "What if I told you, Trey, this Ford F? #shorts",
      "youtubeDescription": "What if I told you, Trey, this Ford F -150 could be yours in over the next 30 days. You and Sarah pulled around the circle 150 times. Just five times a day? Five times a day. Woo! All right, let's go for it. Start pulling. Let's go. Get those legs! You got to get low. Oh, come on. It's going to be leg day every day. Every day, Sarah. Now, it goes without saying, but if you accidentally step on the red line while doing this, you're out. And no one's allowed to pull but these two. All right. So, we haven't even finished a lap yet. How are you two feeling? I'm exhausted. I'm tired. Yeah. Keep going. That was one lap. How was it? That sucked. One down. 149 to go. There you go. There you go. Let's cross it. Two laps down!\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "What if I told you, Trey, this Ford F -150 could be yours in over the next 30 days. You and Sarah pulled around the circle 150 times. Just five times a day? Five times a day. Woo! ... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  },
  {
    "id": "proj-mrbeast-6",
    "index": 6,
    "title": "How does that weight feel?",
    "startTime": 377.76,
    "endTime": 407.2,
    "duration": 29.44,
    "viralityScore": 67,
    "factors": {
      "hook": 51,
      "acoustics": 64,
      "pace": 100,
      "payoff": 65,
      "sentiment": 68,
      "duration": 69
    },
    "status": "pending",
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_06_question_hook_does_that_weight_thumb_1.jpg",
    "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_06_question_hook_does_that_weight.mp4",
    "words": [
      {
        "id": 1,
        "word": "How",
        "start": 0.0,
        "end": 0.18
      },
      {
        "id": 2,
        "word": "does",
        "start": 0.18,
        "end": 0.32
      },
      {
        "id": 3,
        "word": "that",
        "start": 0.32,
        "end": 0.48
      },
      {
        "id": 4,
        "word": "weight",
        "start": 0.48,
        "end": 0.64
      },
      {
        "id": 5,
        "word": "feel?",
        "start": 0.64,
        "end": 0.88
      },
      {
        "id": 6,
        "word": "This",
        "start": 1.32,
        "end": 1.84
      },
      {
        "id": 7,
        "word": "is",
        "start": 1.84,
        "end": 1.96
      },
      {
        "id": 8,
        "word": "hard.",
        "start": 1.96,
        "end": 2.28
      },
      {
        "id": 9,
        "word": "And",
        "start": 3.0,
        "end": 3.36
      },
      {
        "id": 10,
        "word": "by",
        "start": 3.36,
        "end": 3.5
      },
      {
        "id": 11,
        "word": "day",
        "start": 3.5,
        "end": 3.68
      },
      {
        "id": 12,
        "word": "35,",
        "start": 3.68,
        "end": 4.16
      },
      {
        "id": 13,
        "word": "her",
        "start": 4.44,
        "end": 4.56
      },
      {
        "id": 14,
        "word": "morale",
        "start": 4.56,
        "end": 4.9
      },
      {
        "id": 15,
        "word": "was",
        "start": 4.9,
        "end": 5.34
      },
      {
        "id": 16,
        "word": "fading.",
        "start": 5.34,
        "end": 5.66
      },
      {
        "id": 17,
        "word": "Whoever",
        "start": 5.84,
        "end": 6.02
      },
      {
        "id": 18,
        "word": "thought",
        "start": 6.02,
        "end": 6.32
      },
      {
        "id": 19,
        "word": "of",
        "start": 6.32,
        "end": 6.5
      },
      {
        "id": 20,
        "word": "this",
        "start": 6.5,
        "end": 6.68
      },
      {
        "id": 21,
        "word": "deserves",
        "start": 6.68,
        "end": 7.08
      },
      {
        "id": 22,
        "word": "jail.",
        "start": 7.08,
        "end": 7.94
      },
      {
        "id": 23,
        "word": "Literal",
        "start": 9.32,
        "end": 9.84
      },
      {
        "id": 24,
        "word": "jail.",
        "start": 9.84,
        "end": 10.12
      },
      {
        "id": 25,
        "word": "And",
        "start": 10.72,
        "end": 11.2
      },
      {
        "id": 26,
        "word": "the",
        "start": 11.2,
        "end": 11.26
      },
      {
        "id": 27,
        "word": "worse",
        "start": 11.26,
        "end": 11.48
      },
      {
        "id": 28,
        "word": "her",
        "start": 11.48,
        "end": 11.62
      },
      {
        "id": 29,
        "word": "morale",
        "start": 11.62,
        "end": 11.92
      },
      {
        "id": 30,
        "word": "got,",
        "start": 11.92,
        "end": 12.24
      },
      {
        "id": 31,
        "word": "the",
        "start": 12.36,
        "end": 12.62
      },
      {
        "id": 32,
        "word": "worse",
        "start": 12.62,
        "end": 12.94
      },
      {
        "id": 33,
        "word": "her",
        "start": 12.94,
        "end": 13.18
      },
      {
        "id": 34,
        "word": "workouts",
        "start": 13.18,
        "end": 13.64
      },
      {
        "id": 35,
        "word": "got.",
        "start": 13.64,
        "end": 13.94
      },
      {
        "id": 36,
        "word": "I'm",
        "start": 14.76,
        "end": 15.06
      },
      {
        "id": 37,
        "word": "over",
        "start": 15.06,
        "end": 15.68
      },
      {
        "id": 38,
        "word": "it.",
        "start": 15.68,
        "end": 15.92
      },
      {
        "id": 39,
        "word": "Hold",
        "start": 16.12,
        "end": 16.38
      },
      {
        "id": 40,
        "word": "on.",
        "start": 16.38,
        "end": 16.6
      },
      {
        "id": 41,
        "word": "Hold",
        "start": 16.84,
        "end": 16.98
      },
      {
        "id": 42,
        "word": "on.",
        "start": 16.98,
        "end": 17.14
      },
      {
        "id": 43,
        "word": "What",
        "start": 17.4,
        "end": 17.68
      },
      {
        "id": 44,
        "word": "are",
        "start": 17.68,
        "end": 17.76
      },
      {
        "id": 45,
        "word": "you",
        "start": 17.76,
        "end": 17.8
      },
      {
        "id": 46,
        "word": "doing?",
        "start": 17.8,
        "end": 17.96
      },
      {
        "id": 47,
        "word": "I'm",
        "start": 18.18,
        "end": 18.38
      },
      {
        "id": 48,
        "word": "over",
        "start": 18.38,
        "end": 18.6
      },
      {
        "id": 49,
        "word": "it.",
        "start": 18.6,
        "end": 18.74
      },
      {
        "id": 50,
        "word": "Don't",
        "start": 18.96,
        "end": 19.2
      },
      {
        "id": 51,
        "word": "care.",
        "start": 19.2,
        "end": 19.44
      },
      {
        "id": 52,
        "word": "I'm",
        "start": 19.44,
        "end": 20.3
      },
      {
        "id": 53,
        "word": "struggling.",
        "start": 20.3,
        "end": 20.9
      },
      {
        "id": 54,
        "word": "I",
        "start": 21.8,
        "end": 22.54
      },
      {
        "id": 55,
        "word": "feel",
        "start": 22.54,
        "end": 22.88
      },
      {
        "id": 56,
        "word": "awful.",
        "start": 22.88,
        "end": 23.84
      },
      {
        "id": 57,
        "word": "This",
        "start": 24.38,
        "end": 24.98
      },
      {
        "id": 58,
        "word": "sucks.",
        "start": 24.98,
        "end": 25.28
      },
      {
        "id": 59,
        "word": "I",
        "start": 27.02,
        "end": 28.22
      },
      {
        "id": 60,
        "word": "don't",
        "start": 28.22,
        "end": 28.4
      },
      {
        "id": 61,
        "word": "want",
        "start": 28.4,
        "end": 28.54
      },
      {
        "id": 62,
        "word": "to",
        "start": 28.54,
        "end": 28.64
      },
      {
        "id": 63,
        "word": "do",
        "start": 28.64,
        "end": 28.84
      },
      {
        "id": 64,
        "word": "this.",
        "start": 28.84,
        "end": 29.44
      }
    ],
    "fullText": "How does that weight feel? This is hard. And by day 35, her morale was fading. Whoever thought of this deserves jail. Literal jail. And the worse her morale got, the worse her workouts got. I'm over it. Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this.",
    "captionStyle": "mrbeast",
    "brandKitId": "bk-mrbeast",
    "watermarkHandle": "@mrbeast",
    "copy": {
      "youtubeTitle": "How does that weight feel? #shorts",
      "youtubeDescription": "How does that weight feel? This is hard. And by day 35, her morale was fading. Whoever thought of this deserves jail. Literal jail. And the worse her morale got, the worse her workouts got. I'm over it. Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
      "youtubeTags": [
        "#shorts",
        "#viral",
        "#podcast"
      ],
      "instagramCaption": "How does that weight feel? This is hard. And by day 35, her morale was fading. Whoever thought of this deserves jail. Literal jail. And the worse her morale got, the worse her work... \ud83d\udd25\n\nDrop your thoughts below!",
      "hashtags": [
        "#shorts",
        "#viral",
        "#podcast"
      ]
    },
    "narrativeFlags": {
      "sponsorshipRisk": 0.0,
      "fillersScrubbed": 0,
      "silenceSnappedMs": 140
    }
  }
];

export const mockProjects: Project[] = [
  {
    "id": "proj-rogan",
    "title": "Joe Rogan Experience #1309 \u2014 Naval Ravikant",
    "source": "https://youtube.com/watch?v=250a05f4a90b1754",
    "sourceType": "youtube",
    "rightsConfirmed": true,
    "status": "completed",
    "createdAt": "2026-11-10T12:00:00Z",
    "durationSec": 7420,
    "clipsCount": 5,
    "avgScore": 77.4,
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_01_engaging_moment_thumb_1.jpg",
    "clips": [
      {
        "id": "proj-rogan-1",
        "index": 1,
        "title": "There's no longer one guy like a Walter Cronkite",
        "startTime": 3520.76,
        "endTime": 3563.46,
        "duration": 42.7,
        "viralityScore": 84,
        "factors": {
          "hook": 100,
          "acoustics": 86,
          "pace": 100,
          "payoff": 65,
          "sentiment": 20,
          "duration": 98
        },
        "status": "approved",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_01_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_01_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "There's",
            "start": 0.0,
            "end": 0.44
          },
          {
            "id": 2,
            "word": "no",
            "start": 0.44,
            "end": 0.56
          },
          {
            "id": 3,
            "word": "longer",
            "start": 0.56,
            "end": 0.8
          },
          {
            "id": 4,
            "word": "one",
            "start": 0.8,
            "end": 1.1
          },
          {
            "id": 5,
            "word": "guy",
            "start": 1.1,
            "end": 1.38
          },
          {
            "id": 6,
            "word": "like",
            "start": 1.38,
            "end": 1.58
          },
          {
            "id": 7,
            "word": "a",
            "start": 1.58,
            "end": 1.68
          },
          {
            "id": 8,
            "word": "Walter",
            "start": 1.68,
            "end": 1.92
          },
          {
            "id": 9,
            "word": "Cronkite",
            "start": 1.92,
            "end": 2.46
          },
          {
            "id": 10,
            "word": "that",
            "start": 2.46,
            "end": 2.62
          },
          {
            "id": 11,
            "word": "everyone's",
            "start": 2.62,
            "end": 2.96
          },
          {
            "id": 12,
            "word": "going",
            "start": 2.96,
            "end": 3.04
          },
          {
            "id": 13,
            "word": "to",
            "start": 3.04,
            "end": 3.1
          },
          {
            "id": 14,
            "word": "listen",
            "start": 3.1,
            "end": 3.32
          },
          {
            "id": 15,
            "word": "to.",
            "start": 3.32,
            "end": 3.54
          },
          {
            "id": 16,
            "word": "It's",
            "start": 3.72,
            "end": 4.16
          },
          {
            "id": 17,
            "word": "now",
            "start": 4.16,
            "end": 4.32
          },
          {
            "id": 18,
            "word": "all",
            "start": 4.32,
            "end": 4.48
          },
          {
            "id": 19,
            "word": "just",
            "start": 4.48,
            "end": 4.6
          },
          {
            "id": 20,
            "word": "shock",
            "start": 4.6,
            "end": 4.88
          },
          {
            "id": 21,
            "word": "troops",
            "start": 4.88,
            "end": 5.14
          },
          {
            "id": 22,
            "word": "fighting",
            "start": 5.14,
            "end": 5.5
          },
          {
            "id": 23,
            "word": "wars",
            "start": 5.5,
            "end": 5.86
          },
          {
            "id": 24,
            "word": "with",
            "start": 5.86,
            "end": 6.0
          },
          {
            "id": 25,
            "word": "each",
            "start": 6.0,
            "end": 6.14
          },
          {
            "id": 26,
            "word": "other.",
            "start": 6.14,
            "end": 6.34
          },
          {
            "id": 27,
            "word": "How",
            "start": 6.96,
            "end": 7.18
          },
          {
            "id": 28,
            "word": "does",
            "start": 7.18,
            "end": 7.32
          },
          {
            "id": 29,
            "word": "this",
            "start": 7.32,
            "end": 7.44
          },
          {
            "id": 30,
            "word": "play",
            "start": 7.44,
            "end": 7.66
          },
          {
            "id": 31,
            "word": "out?",
            "start": 7.66,
            "end": 7.96
          },
          {
            "id": 32,
            "word": "Have",
            "start": 8.68,
            "end": 9.24
          },
          {
            "id": 33,
            "word": "you",
            "start": 9.24,
            "end": 9.32
          },
          {
            "id": 34,
            "word": "thought",
            "start": 9.32,
            "end": 9.48
          },
          {
            "id": 35,
            "word": "about",
            "start": 9.48,
            "end": 9.66
          },
          {
            "id": 36,
            "word": "it?",
            "start": 9.66,
            "end": 9.82
          },
          {
            "id": 37,
            "word": "Yeah,",
            "start": 9.96,
            "end": 10.08
          },
          {
            "id": 38,
            "word": "a",
            "start": 10.2,
            "end": 10.26
          },
          {
            "id": 39,
            "word": "little",
            "start": 10.26,
            "end": 10.38
          },
          {
            "id": 40,
            "word": "bit.",
            "start": 10.38,
            "end": 10.58
          },
          {
            "id": 41,
            "word": "So",
            "start": 10.92,
            "end": 11.48
          },
          {
            "id": 42,
            "word": "what",
            "start": 11.48,
            "end": 11.98
          },
          {
            "id": 43,
            "word": "the",
            "start": 11.98,
            "end": 12.16
          },
          {
            "id": 44,
            "word": "internet",
            "start": 12.16,
            "end": 12.48
          },
          {
            "id": 45,
            "word": "does,",
            "start": 12.48,
            "end": 12.88
          },
          {
            "id": 46,
            "word": "a",
            "start": 13.08,
            "end": 13.32
          },
          {
            "id": 47,
            "word": "lot",
            "start": 13.32,
            "end": 13.4
          },
          {
            "id": 48,
            "word": "of",
            "start": 13.4,
            "end": 13.48
          },
          {
            "id": 49,
            "word": "this",
            "start": 13.48,
            "end": 13.58
          },
          {
            "id": 50,
            "word": "is",
            "start": 13.58,
            "end": 13.72
          },
          {
            "id": 51,
            "word": "internet",
            "start": 13.72,
            "end": 14.02
          },
          {
            "id": 52,
            "word": "driven.",
            "start": 14.02,
            "end": 14.3
          },
          {
            "id": 53,
            "word": "What",
            "start": 14.52,
            "end": 14.94
          },
          {
            "id": 54,
            "word": "the",
            "start": 14.94,
            "end": 15.1
          },
          {
            "id": 55,
            "word": "internet",
            "start": 15.1,
            "end": 15.42
          },
          {
            "id": 56,
            "word": "does",
            "start": 15.42,
            "end": 15.86
          },
          {
            "id": 57,
            "word": "is",
            "start": 15.86,
            "end": 16.24
          },
          {
            "id": 58,
            "word": "the",
            "start": 16.24,
            "end": 16.42
          },
          {
            "id": 59,
            "word": "internet",
            "start": 16.42,
            "end": 16.76
          },
          {
            "id": 60,
            "word": "creates",
            "start": 16.76,
            "end": 17.38
          },
          {
            "id": 61,
            "word": "one",
            "start": 17.38,
            "end": 18.52
          },
          {
            "id": 62,
            "word": "giant",
            "start": 18.52,
            "end": 19.02
          },
          {
            "id": 63,
            "word": "aggregator",
            "start": 19.02,
            "end": 19.7
          },
          {
            "id": 64,
            "word": "or",
            "start": 19.7,
            "end": 20.0
          },
          {
            "id": 65,
            "word": "two",
            "start": 20.0,
            "end": 20.28
          },
          {
            "id": 66,
            "word": "for",
            "start": 20.28,
            "end": 20.64
          },
          {
            "id": 67,
            "word": "everything.",
            "start": 20.64,
            "end": 21.1
          },
          {
            "id": 68,
            "word": "One",
            "start": 21.54,
            "end": 21.72
          },
          {
            "id": 69,
            "word": "taxi",
            "start": 21.72,
            "end": 22.32
          },
          {
            "id": 70,
            "word": "dispatcher,",
            "start": 22.32,
            "end": 22.96
          },
          {
            "id": 71,
            "word": "one",
            "start": 23.08,
            "end": 23.2
          },
          {
            "id": 72,
            "word": "e",
            "start": 23.2,
            "end": 23.4
          },
          {
            "id": 73,
            "word": "-commerce",
            "start": 23.4,
            "end": 23.68
          },
          {
            "id": 74,
            "word": "store,",
            "start": 23.68,
            "end": 24.04
          },
          {
            "id": 75,
            "word": "one",
            "start": 24.22,
            "end": 24.32
          },
          {
            "id": 76,
            "word": "search",
            "start": 24.32,
            "end": 24.64
          },
          {
            "id": 77,
            "word": "engine,",
            "start": 24.64,
            "end": 25.08
          },
          {
            "id": 78,
            "word": "one,",
            "start": 25.62,
            "end": 25.82
          },
          {
            "id": 79,
            "word": "you",
            "start": 25.82,
            "end": 26.74
          },
          {
            "id": 80,
            "word": "know,",
            "start": 26.74,
            "end": 26.86
          },
          {
            "id": 81,
            "word": "one",
            "start": 27.16,
            "end": 27.64
          },
          {
            "id": 82,
            "word": "social",
            "start": 27.64,
            "end": 27.98
          },
          {
            "id": 83,
            "word": "media",
            "start": 27.98,
            "end": 28.26
          },
          {
            "id": 84,
            "word": "site",
            "start": 28.26,
            "end": 28.64
          },
          {
            "id": 85,
            "word": "for",
            "start": 28.64,
            "end": 28.94
          },
          {
            "id": 86,
            "word": "friends",
            "start": 28.94,
            "end": 29.52
          },
          {
            "id": 87,
            "word": "and",
            "start": 29.52,
            "end": 29.66
          },
          {
            "id": 88,
            "word": "family,",
            "start": 29.66,
            "end": 30.06
          },
          {
            "id": 89,
            "word": "one",
            "start": 30.24,
            "end": 30.34
          },
          {
            "id": 90,
            "word": "for",
            "start": 30.34,
            "end": 30.5
          },
          {
            "id": 91,
            "word": "business,",
            "start": 30.5,
            "end": 30.88
          },
          {
            "id": 92,
            "word": "etc.",
            "start": 31.04,
            "end": 31.16
          },
          {
            "id": 93,
            "word": "So",
            "start": 31.16,
            "end": 31.82
          },
          {
            "id": 94,
            "word": "the",
            "start": 31.82,
            "end": 31.94
          },
          {
            "id": 95,
            "word": "internet",
            "start": 31.94,
            "end": 32.2
          },
          {
            "id": 96,
            "word": "is",
            "start": 32.2,
            "end": 32.42
          },
          {
            "id": 97,
            "word": "this",
            "start": 32.42,
            "end": 32.58
          },
          {
            "id": 98,
            "word": "giant",
            "start": 32.58,
            "end": 32.92
          },
          {
            "id": 99,
            "word": "aggregator",
            "start": 32.92,
            "end": 33.6
          },
          {
            "id": 100,
            "word": "where",
            "start": 33.6,
            "end": 33.94
          },
          {
            "id": 101,
            "word": "it",
            "start": 33.94,
            "end": 34.06
          },
          {
            "id": 102,
            "word": "creates",
            "start": 34.06,
            "end": 34.3
          },
          {
            "id": 103,
            "word": "one",
            "start": 34.3,
            "end": 34.68
          },
          {
            "id": 104,
            "word": "big",
            "start": 34.68,
            "end": 35.1
          },
          {
            "id": 105,
            "word": "hegemon",
            "start": 35.1,
            "end": 35.96
          },
          {
            "id": 106,
            "word": "for",
            "start": 35.96,
            "end": 36.5
          },
          {
            "id": 107,
            "word": "everything.",
            "start": 36.5,
            "end": 36.92
          },
          {
            "id": 108,
            "word": "And",
            "start": 36.92,
            "end": 38.1
          },
          {
            "id": 109,
            "word": "it",
            "start": 38.1,
            "end": 38.5
          },
          {
            "id": 110,
            "word": "creates",
            "start": 38.5,
            "end": 38.78
          },
          {
            "id": 111,
            "word": "an",
            "start": 38.78,
            "end": 38.98
          },
          {
            "id": 112,
            "word": "atomized",
            "start": 38.98,
            "end": 39.58
          },
          {
            "id": 113,
            "word": "long",
            "start": 39.58,
            "end": 40.12
          },
          {
            "id": 114,
            "word": "tail",
            "start": 40.12,
            "end": 40.6
          },
          {
            "id": 115,
            "word": "of",
            "start": 40.6,
            "end": 41.2
          },
          {
            "id": 116,
            "word": "millions",
            "start": 41.2,
            "end": 41.66
          },
          {
            "id": 117,
            "word": "and",
            "start": 41.66,
            "end": 41.84
          },
          {
            "id": 118,
            "word": "millions",
            "start": 41.84,
            "end": 42.1
          },
          {
            "id": 119,
            "word": "of",
            "start": 42.1,
            "end": 42.26
          },
          {
            "id": 120,
            "word": "individuals.",
            "start": 42.26,
            "end": 42.7
          }
        ],
        "fullText": "There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you thought about it? Yeah, a little bit. So what the internet does, a lot of this is internet driven. What the internet does is the internet creates one giant aggregator or two for everything. One taxi dispatcher, one e -commerce store, one search engine, one, you know, one social media site for friends and family, one for business, etc. So the internet is this giant aggregator where it creates one big hegemon for everything. And it creates an atomized long tail of millions and millions of individuals.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-rogan",
        "watermarkHandle": "@joerogan",
        "copy": {
          "youtubeTitle": "There's no longer one guy like a Walter Cronkite #shorts",
          "youtubeDescription": "There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you thought about it? Yeah, a little bit. So what the internet does, a lot of this is internet driven. What the internet does is the internet creates one giant aggregator or two for everything. One taxi dispatcher, one e -commerce store, one search engine, one, you know, one social media site for friends and family, one for business, etc. So the internet is this giant aggregator where it creates one big hegemon for everything. And it creates an atomized long tail of millions and millions of individuals.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you ... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-rogan-2",
        "index": 2,
        "title": "And the two of them are just fighting it",
        "startTime": 3497.72,
        "endTime": 3535.06,
        "duration": 37.34,
        "viralityScore": 79,
        "factors": {
          "hook": 100,
          "acoustics": 82,
          "pace": 83,
          "payoff": 65,
          "sentiment": 20,
          "duration": 88
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_02_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_02_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "And",
            "start": 0.0,
            "end": 0.56
          },
          {
            "id": 2,
            "word": "the",
            "start": 0.56,
            "end": 0.68
          },
          {
            "id": 3,
            "word": "two",
            "start": 0.68,
            "end": 0.8
          },
          {
            "id": 4,
            "word": "of",
            "start": 0.8,
            "end": 0.9
          },
          {
            "id": 5,
            "word": "them",
            "start": 0.9,
            "end": 0.98
          },
          {
            "id": 6,
            "word": "are",
            "start": 0.98,
            "end": 1.1
          },
          {
            "id": 7,
            "word": "just",
            "start": 1.1,
            "end": 1.26
          },
          {
            "id": 8,
            "word": "fighting",
            "start": 1.26,
            "end": 1.56
          },
          {
            "id": 9,
            "word": "it",
            "start": 1.56,
            "end": 1.68
          },
          {
            "id": 10,
            "word": "out",
            "start": 1.68,
            "end": 1.8
          },
          {
            "id": 11,
            "word": "using",
            "start": 1.8,
            "end": 2.02
          },
          {
            "id": 12,
            "word": "their",
            "start": 2.02,
            "end": 2.22
          },
          {
            "id": 13,
            "word": "various",
            "start": 2.22,
            "end": 2.52
          },
          {
            "id": 14,
            "word": "media",
            "start": 2.52,
            "end": 2.84
          },
          {
            "id": 15,
            "word": "organs",
            "start": 2.84,
            "end": 3.18
          },
          {
            "id": 16,
            "word": "and",
            "start": 3.18,
            "end": 3.34
          },
          {
            "id": 17,
            "word": "memes.",
            "start": 3.34,
            "end": 3.64
          },
          {
            "id": 18,
            "word": "So",
            "start": 3.98,
            "end": 4.46
          },
          {
            "id": 19,
            "word": "basically,",
            "start": 4.46,
            "end": 5.4
          },
          {
            "id": 20,
            "word": "when",
            "start": 5.42,
            "end": 5.72
          },
          {
            "id": 21,
            "word": "you",
            "start": 5.72,
            "end": 5.86
          },
          {
            "id": 22,
            "word": "see",
            "start": 5.86,
            "end": 6.08
          },
          {
            "id": 23,
            "word": "one",
            "start": 6.08,
            "end": 6.3
          },
          {
            "id": 24,
            "word": "of",
            "start": 6.3,
            "end": 6.38
          },
          {
            "id": 25,
            "word": "these",
            "start": 6.38,
            "end": 6.6
          },
          {
            "id": 26,
            "word": "news",
            "start": 6.6,
            "end": 6.86
          },
          {
            "id": 27,
            "word": "organizations",
            "start": 6.86,
            "end": 7.44
          },
          {
            "id": 28,
            "word": "doxing",
            "start": 7.44,
            "end": 8.08
          },
          {
            "id": 29,
            "word": "an",
            "start": 8.08,
            "end": 8.22
          },
          {
            "id": 30,
            "word": "individual,",
            "start": 8.22,
            "end": 8.64
          },
          {
            "id": 31,
            "word": "that's",
            "start": 9.12,
            "end": 9.46
          },
          {
            "id": 32,
            "word": "like",
            "start": 9.46,
            "end": 9.58
          },
          {
            "id": 33,
            "word": "a",
            "start": 9.58,
            "end": 9.68
          },
          {
            "id": 34,
            "word": "tank",
            "start": 9.68,
            "end": 10.0
          },
          {
            "id": 35,
            "word": "running",
            "start": 10.0,
            "end": 10.22
          },
          {
            "id": 36,
            "word": "over",
            "start": 10.22,
            "end": 10.44
          },
          {
            "id": 37,
            "word": "a",
            "start": 10.44,
            "end": 10.62
          },
          {
            "id": 38,
            "word": "soldier.",
            "start": 10.62,
            "end": 10.94
          },
          {
            "id": 39,
            "word": "That's",
            "start": 11.42,
            "end": 11.9
          },
          {
            "id": 40,
            "word": "what's",
            "start": 11.9,
            "end": 12.08
          },
          {
            "id": 41,
            "word": "going",
            "start": 12.08,
            "end": 12.26
          },
          {
            "id": 42,
            "word": "on.",
            "start": 12.26,
            "end": 12.52
          },
          {
            "id": 43,
            "word": "It's",
            "start": 12.6,
            "end": 12.72
          },
          {
            "id": 44,
            "word": "just",
            "start": 12.72,
            "end": 12.88
          },
          {
            "id": 45,
            "word": "war.",
            "start": 12.88,
            "end": 13.32
          },
          {
            "id": 46,
            "word": "And",
            "start": 13.52,
            "end": 13.92
          },
          {
            "id": 47,
            "word": "so",
            "start": 13.92,
            "end": 14.14
          },
          {
            "id": 48,
            "word": "there's",
            "start": 14.14,
            "end": 14.52
          },
          {
            "id": 49,
            "word": "no",
            "start": 14.52,
            "end": 14.68
          },
          {
            "id": 50,
            "word": "such",
            "start": 14.68,
            "end": 15.68
          },
          {
            "id": 51,
            "word": "thing",
            "start": 15.68,
            "end": 15.98
          },
          {
            "id": 52,
            "word": "anymore",
            "start": 15.98,
            "end": 16.4
          },
          {
            "id": 53,
            "word": "as",
            "start": 16.4,
            "end": 16.78
          },
          {
            "id": 54,
            "word": "a",
            "start": 16.78,
            "end": 16.92
          },
          {
            "id": 55,
            "word": "neutral",
            "start": 16.92,
            "end": 17.28
          },
          {
            "id": 56,
            "word": "media",
            "start": 17.28,
            "end": 17.66
          },
          {
            "id": 57,
            "word": "commentator.",
            "start": 17.66,
            "end": 18.36
          },
          {
            "id": 58,
            "word": "The",
            "start": 18.56,
            "end": 19.04
          },
          {
            "id": 59,
            "word": "illusion",
            "start": 19.04,
            "end": 19.92
          },
          {
            "id": 60,
            "word": "of",
            "start": 19.92,
            "end": 20.24
          },
          {
            "id": 61,
            "word": "objectivity",
            "start": 20.24,
            "end": 20.98
          },
          {
            "id": 62,
            "word": "that",
            "start": 20.98,
            "end": 21.24
          },
          {
            "id": 63,
            "word": "journalism",
            "start": 21.24,
            "end": 21.7
          },
          {
            "id": 64,
            "word": "had",
            "start": 21.7,
            "end": 22.16
          },
          {
            "id": 65,
            "word": "is",
            "start": 22.16,
            "end": 22.4
          },
          {
            "id": 66,
            "word": "lost.",
            "start": 22.4,
            "end": 22.8
          },
          {
            "id": 67,
            "word": "There's",
            "start": 23.04,
            "end": 23.48
          },
          {
            "id": 68,
            "word": "no",
            "start": 23.48,
            "end": 23.6
          },
          {
            "id": 69,
            "word": "longer",
            "start": 23.6,
            "end": 23.84
          },
          {
            "id": 70,
            "word": "one",
            "start": 23.84,
            "end": 24.14
          },
          {
            "id": 71,
            "word": "guy",
            "start": 24.14,
            "end": 24.42
          },
          {
            "id": 72,
            "word": "like",
            "start": 24.42,
            "end": 24.62
          },
          {
            "id": 73,
            "word": "a",
            "start": 24.62,
            "end": 24.72
          },
          {
            "id": 74,
            "word": "Walter",
            "start": 24.72,
            "end": 24.96
          },
          {
            "id": 75,
            "word": "Cronkite",
            "start": 24.96,
            "end": 25.5
          },
          {
            "id": 76,
            "word": "that",
            "start": 25.5,
            "end": 25.66
          },
          {
            "id": 77,
            "word": "everyone's",
            "start": 25.66,
            "end": 26.0
          },
          {
            "id": 78,
            "word": "going",
            "start": 26.0,
            "end": 26.08
          },
          {
            "id": 79,
            "word": "to",
            "start": 26.08,
            "end": 26.14
          },
          {
            "id": 80,
            "word": "listen",
            "start": 26.14,
            "end": 26.36
          },
          {
            "id": 81,
            "word": "to.",
            "start": 26.36,
            "end": 26.58
          },
          {
            "id": 82,
            "word": "It's",
            "start": 26.76,
            "end": 27.2
          },
          {
            "id": 83,
            "word": "now",
            "start": 27.2,
            "end": 27.36
          },
          {
            "id": 84,
            "word": "all",
            "start": 27.36,
            "end": 27.52
          },
          {
            "id": 85,
            "word": "just",
            "start": 27.52,
            "end": 27.64
          },
          {
            "id": 86,
            "word": "shock",
            "start": 27.64,
            "end": 27.92
          },
          {
            "id": 87,
            "word": "troops",
            "start": 27.92,
            "end": 28.18
          },
          {
            "id": 88,
            "word": "fighting",
            "start": 28.18,
            "end": 28.54
          },
          {
            "id": 89,
            "word": "wars",
            "start": 28.54,
            "end": 28.9
          },
          {
            "id": 90,
            "word": "with",
            "start": 28.9,
            "end": 29.04
          },
          {
            "id": 91,
            "word": "each",
            "start": 29.04,
            "end": 29.18
          },
          {
            "id": 92,
            "word": "other.",
            "start": 29.18,
            "end": 29.38
          },
          {
            "id": 93,
            "word": "How",
            "start": 30.0,
            "end": 30.22
          },
          {
            "id": 94,
            "word": "does",
            "start": 30.22,
            "end": 30.36
          },
          {
            "id": 95,
            "word": "this",
            "start": 30.36,
            "end": 30.48
          },
          {
            "id": 96,
            "word": "play",
            "start": 30.48,
            "end": 30.7
          },
          {
            "id": 97,
            "word": "out?",
            "start": 30.7,
            "end": 31.0
          },
          {
            "id": 98,
            "word": "Have",
            "start": 31.72,
            "end": 32.28
          },
          {
            "id": 99,
            "word": "you",
            "start": 32.28,
            "end": 32.36
          },
          {
            "id": 100,
            "word": "thought",
            "start": 32.36,
            "end": 32.52
          },
          {
            "id": 101,
            "word": "about",
            "start": 32.52,
            "end": 32.7
          },
          {
            "id": 102,
            "word": "it?",
            "start": 32.7,
            "end": 32.86
          },
          {
            "id": 103,
            "word": "Yeah,",
            "start": 33.0,
            "end": 33.12
          },
          {
            "id": 104,
            "word": "a",
            "start": 33.24,
            "end": 33.3
          },
          {
            "id": 105,
            "word": "little",
            "start": 33.3,
            "end": 33.42
          },
          {
            "id": 106,
            "word": "bit.",
            "start": 33.42,
            "end": 33.62
          },
          {
            "id": 107,
            "word": "So",
            "start": 33.96,
            "end": 34.52
          },
          {
            "id": 108,
            "word": "what",
            "start": 34.52,
            "end": 35.02
          },
          {
            "id": 109,
            "word": "the",
            "start": 35.02,
            "end": 35.2
          },
          {
            "id": 110,
            "word": "internet",
            "start": 35.2,
            "end": 35.52
          },
          {
            "id": 111,
            "word": "does,",
            "start": 35.52,
            "end": 35.92
          },
          {
            "id": 112,
            "word": "a",
            "start": 36.12,
            "end": 36.36
          },
          {
            "id": 113,
            "word": "lot",
            "start": 36.36,
            "end": 36.44
          },
          {
            "id": 114,
            "word": "of",
            "start": 36.44,
            "end": 36.52
          },
          {
            "id": 115,
            "word": "this",
            "start": 36.52,
            "end": 36.62
          },
          {
            "id": 116,
            "word": "is",
            "start": 36.62,
            "end": 36.76
          },
          {
            "id": 117,
            "word": "internet",
            "start": 36.76,
            "end": 37.06
          },
          {
            "id": 118,
            "word": "driven.",
            "start": 37.06,
            "end": 37.34
          }
        ],
        "fullText": "And the two of them are just fighting it out using their various media organs and memes. So basically, when you see one of these news organizations doxing an individual, that's like a tank running over a soldier. That's what's going on. It's just war. And so there's no such thing anymore as a neutral media commentator. The illusion of objectivity that journalism had is lost. There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you thought about it? Yeah, a little bit. So what the internet does, a lot of this is internet driven.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-rogan",
        "watermarkHandle": "@joerogan",
        "copy": {
          "youtubeTitle": "And the two of them are just fighting it #shorts",
          "youtubeDescription": "And the two of them are just fighting it out using their various media organs and memes. So basically, when you see one of these news organizations doxing an individual, that's like a tank running over a soldier. That's what's going on. It's just war. And so there's no such thing anymore as a neutral media commentator. The illusion of objectivity that journalism had is lost. There's no longer one guy like a Walter Cronkite that everyone's going to listen to. It's now all just shock troops fighting wars with each other. How does this play out? Have you thought about it? Yeah, a little bit. So what the internet does, a lot of this is internet driven.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "And the two of them are just fighting it out using their various media organs and memes. So basically, when you see one of these news organizations doxing an individual, that's lik... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-rogan-3",
        "index": 3,
        "title": "In their eyes",
        "startTime": 1071.98,
        "endTime": 1113.86,
        "duration": 41.88,
        "viralityScore": 77,
        "factors": {
          "hook": 86,
          "acoustics": 84,
          "pace": 82,
          "payoff": 65,
          "sentiment": 20,
          "duration": 100
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_03_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_03_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "In",
            "start": 0.0,
            "end": 0.62
          },
          {
            "id": 2,
            "word": "their",
            "start": 0.62,
            "end": 1.04
          },
          {
            "id": 3,
            "word": "eyes,",
            "start": 1.04,
            "end": 1.54
          },
          {
            "id": 4,
            "word": "it",
            "start": 1.76,
            "end": 1.92
          },
          {
            "id": 5,
            "word": "is",
            "start": 1.92,
            "end": 2.4
          },
          {
            "id": 6,
            "word": "the",
            "start": 2.4,
            "end": 3.64
          },
          {
            "id": 7,
            "word": "peak,",
            "start": 3.64,
            "end": 4.44
          },
          {
            "id": 8,
            "word": "the",
            "start": 4.66,
            "end": 5.28
          },
          {
            "id": 9,
            "word": "pinnacle,",
            "start": 5.28,
            "end": 5.68
          },
          {
            "id": 10,
            "word": "the",
            "start": 5.8,
            "end": 5.86
          },
          {
            "id": 11,
            "word": "most",
            "start": 5.86,
            "end": 6.1
          },
          {
            "id": 12,
            "word": "important",
            "start": 6.1,
            "end": 6.5
          },
          {
            "id": 13,
            "word": "thing.",
            "start": 6.5,
            "end": 6.88
          },
          {
            "id": 14,
            "word": "It's",
            "start": 7.24,
            "end": 7.6
          },
          {
            "id": 15,
            "word": "not",
            "start": 7.6,
            "end": 7.74
          },
          {
            "id": 16,
            "word": "a",
            "start": 7.74,
            "end": 7.86
          },
          {
            "id": 17,
            "word": "trade",
            "start": 7.86,
            "end": 8.08
          },
          {
            "id": 18,
            "word": "-off.",
            "start": 8.08,
            "end": 8.34
          },
          {
            "id": 19,
            "word": "I",
            "start": 9.18,
            "end": 9.54
          },
          {
            "id": 20,
            "word": "would",
            "start": 9.54,
            "end": 9.68
          },
          {
            "id": 21,
            "word": "argue",
            "start": 9.68,
            "end": 9.98
          },
          {
            "id": 22,
            "word": "that",
            "start": 9.98,
            "end": 10.16
          },
          {
            "id": 23,
            "word": "if,",
            "start": 10.16,
            "end": 10.32
          },
          {
            "id": 24,
            "word": "now",
            "start": 10.5,
            "end": 10.66
          },
          {
            "id": 25,
            "word": "when",
            "start": 10.66,
            "end": 10.82
          },
          {
            "id": 26,
            "word": "I",
            "start": 10.82,
            "end": 10.92
          },
          {
            "id": 27,
            "word": "say",
            "start": 10.92,
            "end": 11.1
          },
          {
            "id": 28,
            "word": "happy,",
            "start": 11.1,
            "end": 11.56
          },
          {
            "id": 29,
            "word": "happy",
            "start": 11.78,
            "end": 12.16
          },
          {
            "id": 30,
            "word": "is",
            "start": 12.16,
            "end": 12.34
          },
          {
            "id": 31,
            "word": "one",
            "start": 12.34,
            "end": 12.46
          },
          {
            "id": 32,
            "word": "of",
            "start": 12.46,
            "end": 12.52
          },
          {
            "id": 33,
            "word": "those",
            "start": 12.52,
            "end": 12.64
          },
          {
            "id": 34,
            "word": "words",
            "start": 12.64,
            "end": 12.88
          },
          {
            "id": 35,
            "word": "that",
            "start": 12.88,
            "end": 13.02
          },
          {
            "id": 36,
            "word": "means",
            "start": 13.02,
            "end": 13.28
          },
          {
            "id": 37,
            "word": "a",
            "start": 13.28,
            "end": 13.46
          },
          {
            "id": 38,
            "word": "zillion",
            "start": 13.46,
            "end": 13.74
          },
          {
            "id": 39,
            "word": "different",
            "start": 13.74,
            "end": 14.0
          },
          {
            "id": 40,
            "word": "things.",
            "start": 14.0,
            "end": 14.3
          },
          {
            "id": 41,
            "word": "It's",
            "start": 14.36,
            "end": 14.72
          },
          {
            "id": 42,
            "word": "like",
            "start": 14.72,
            "end": 14.84
          },
          {
            "id": 43,
            "word": "love,",
            "start": 14.84,
            "end": 15.16
          },
          {
            "id": 44,
            "word": "right?",
            "start": 15.28,
            "end": 15.36
          },
          {
            "id": 45,
            "word": "What",
            "start": 15.42,
            "end": 15.54
          },
          {
            "id": 46,
            "word": "does",
            "start": 15.54,
            "end": 15.64
          },
          {
            "id": 47,
            "word": "that",
            "start": 15.64,
            "end": 15.78
          },
          {
            "id": 48,
            "word": "mean?",
            "start": 15.78,
            "end": 16.0
          },
          {
            "id": 49,
            "word": "Right,",
            "start": 16.36,
            "end": 16.52
          },
          {
            "id": 50,
            "word": "I",
            "start": 16.58,
            "end": 16.66
          },
          {
            "id": 51,
            "word": "love",
            "start": 16.66,
            "end": 16.78
          },
          {
            "id": 52,
            "word": "cheese.",
            "start": 16.78,
            "end": 17.14
          },
          {
            "id": 53,
            "word": "Yeah,",
            "start": 17.42,
            "end": 17.58
          },
          {
            "id": 54,
            "word": "I'm",
            "start": 17.84,
            "end": 18.0
          },
          {
            "id": 55,
            "word": "going",
            "start": 18.0,
            "end": 18.0
          },
          {
            "id": 56,
            "word": "to",
            "start": 18.0,
            "end": 18.12
          },
          {
            "id": 57,
            "word": "define",
            "start": 18.12,
            "end": 18.32
          },
          {
            "id": 58,
            "word": "it",
            "start": 18.32,
            "end": 18.44
          },
          {
            "id": 59,
            "word": "a",
            "start": 18.44,
            "end": 18.58
          },
          {
            "id": 60,
            "word": "little",
            "start": 18.58,
            "end": 18.68
          },
          {
            "id": 61,
            "word": "bit",
            "start": 18.68,
            "end": 18.84
          },
          {
            "id": 62,
            "word": "more",
            "start": 18.84,
            "end": 19.0
          },
          {
            "id": 63,
            "word": "tightly,",
            "start": 19.0,
            "end": 19.34
          },
          {
            "id": 64,
            "word": "right?",
            "start": 19.68,
            "end": 20.02
          },
          {
            "id": 65,
            "word": "So",
            "start": 20.2,
            "end": 20.44
          },
          {
            "id": 66,
            "word": "let's",
            "start": 20.44,
            "end": 22.92
          },
          {
            "id": 67,
            "word": "go",
            "start": 22.92,
            "end": 23.04
          },
          {
            "id": 68,
            "word": "back",
            "start": 23.04,
            "end": 23.2
          },
          {
            "id": 69,
            "word": "to",
            "start": 23.2,
            "end": 23.36
          },
          {
            "id": 70,
            "word": "desire,",
            "start": 23.36,
            "end": 24.08
          },
          {
            "id": 71,
            "word": "right?",
            "start": 24.54,
            "end": 24.74
          },
          {
            "id": 72,
            "word": "This",
            "start": 24.76,
            "end": 24.96
          },
          {
            "id": 73,
            "word": "is",
            "start": 24.96,
            "end": 25.08
          },
          {
            "id": 74,
            "word": "old,",
            "start": 25.08,
            "end": 25.4
          },
          {
            "id": 75,
            "word": "old",
            "start": 25.44,
            "end": 25.62
          },
          {
            "id": 76,
            "word": "Buddhist",
            "start": 25.62,
            "end": 25.9
          },
          {
            "id": 77,
            "word": "wisdom.",
            "start": 25.9,
            "end": 26.22
          },
          {
            "id": 78,
            "word": "I'm",
            "start": 26.38,
            "end": 26.42
          },
          {
            "id": 79,
            "word": "not",
            "start": 26.42,
            "end": 26.56
          },
          {
            "id": 80,
            "word": "saying",
            "start": 26.56,
            "end": 26.78
          },
          {
            "id": 81,
            "word": "anything",
            "start": 26.78,
            "end": 27.04
          },
          {
            "id": 82,
            "word": "original,",
            "start": 27.04,
            "end": 27.42
          },
          {
            "id": 83,
            "word": "but",
            "start": 27.42,
            "end": 27.92
          },
          {
            "id": 84,
            "word": "desire",
            "start": 27.92,
            "end": 28.88
          },
          {
            "id": 85,
            "word": "to",
            "start": 28.88,
            "end": 29.08
          },
          {
            "id": 86,
            "word": "me",
            "start": 29.08,
            "end": 29.24
          },
          {
            "id": 87,
            "word": "is",
            "start": 29.24,
            "end": 29.36
          },
          {
            "id": 88,
            "word": "a",
            "start": 29.36,
            "end": 29.46
          },
          {
            "id": 89,
            "word": "contract",
            "start": 29.46,
            "end": 29.86
          },
          {
            "id": 90,
            "word": "that",
            "start": 29.86,
            "end": 30.14
          },
          {
            "id": 91,
            "word": "you",
            "start": 30.14,
            "end": 30.28
          },
          {
            "id": 92,
            "word": "make",
            "start": 30.28,
            "end": 30.5
          },
          {
            "id": 93,
            "word": "with",
            "start": 30.5,
            "end": 30.68
          },
          {
            "id": 94,
            "word": "yourself",
            "start": 30.68,
            "end": 31.08
          },
          {
            "id": 95,
            "word": "to",
            "start": 31.08,
            "end": 31.44
          },
          {
            "id": 96,
            "word": "be",
            "start": 31.44,
            "end": 31.6
          },
          {
            "id": 97,
            "word": "unhappy",
            "start": 31.6,
            "end": 32.08
          },
          {
            "id": 98,
            "word": "until",
            "start": 32.08,
            "end": 32.58
          },
          {
            "id": 99,
            "word": "you",
            "start": 32.58,
            "end": 32.8
          },
          {
            "id": 100,
            "word": "get",
            "start": 32.8,
            "end": 33.02
          },
          {
            "id": 101,
            "word": "what",
            "start": 33.02,
            "end": 33.18
          },
          {
            "id": 102,
            "word": "you",
            "start": 33.18,
            "end": 33.34
          },
          {
            "id": 103,
            "word": "want,",
            "start": 33.34,
            "end": 33.7
          },
          {
            "id": 104,
            "word": "okay?",
            "start": 34.56,
            "end": 34.92
          },
          {
            "id": 105,
            "word": "And",
            "start": 34.92,
            "end": 35.16
          },
          {
            "id": 106,
            "word": "I",
            "start": 35.16,
            "end": 35.3
          },
          {
            "id": 107,
            "word": "keep",
            "start": 35.3,
            "end": 35.58
          },
          {
            "id": 108,
            "word": "that",
            "start": 35.58,
            "end": 35.78
          },
          {
            "id": 109,
            "word": "in",
            "start": 35.78,
            "end": 36.0
          },
          {
            "id": 110,
            "word": "front",
            "start": 36.0,
            "end": 36.18
          },
          {
            "id": 111,
            "word": "of",
            "start": 36.18,
            "end": 36.28
          },
          {
            "id": 112,
            "word": "mine.",
            "start": 36.28,
            "end": 36.46
          },
          {
            "id": 113,
            "word": "So",
            "start": 36.64,
            "end": 36.7
          },
          {
            "id": 114,
            "word": "when",
            "start": 36.7,
            "end": 36.9
          },
          {
            "id": 115,
            "word": "I'm",
            "start": 36.9,
            "end": 37.1
          },
          {
            "id": 116,
            "word": "unhappy",
            "start": 37.1,
            "end": 37.58
          },
          {
            "id": 117,
            "word": "about",
            "start": 37.58,
            "end": 37.84
          },
          {
            "id": 118,
            "word": "something,",
            "start": 37.84,
            "end": 38.22
          },
          {
            "id": 119,
            "word": "I",
            "start": 38.44,
            "end": 38.8
          },
          {
            "id": 120,
            "word": "look",
            "start": 38.8,
            "end": 39.0
          },
          {
            "id": 121,
            "word": "for",
            "start": 39.0,
            "end": 39.16
          },
          {
            "id": 122,
            "word": "what",
            "start": 39.16,
            "end": 39.34
          },
          {
            "id": 123,
            "word": "is",
            "start": 39.34,
            "end": 39.48
          },
          {
            "id": 124,
            "word": "the",
            "start": 39.48,
            "end": 39.6
          },
          {
            "id": 125,
            "word": "underlying",
            "start": 39.6,
            "end": 39.98
          },
          {
            "id": 126,
            "word": "desire",
            "start": 39.98,
            "end": 40.44
          },
          {
            "id": 127,
            "word": "that",
            "start": 40.44,
            "end": 40.66
          },
          {
            "id": 128,
            "word": "I",
            "start": 40.66,
            "end": 40.76
          },
          {
            "id": 129,
            "word": "have",
            "start": 40.76,
            "end": 40.92
          },
          {
            "id": 130,
            "word": "that's",
            "start": 40.92,
            "end": 41.14
          },
          {
            "id": 131,
            "word": "not",
            "start": 41.14,
            "end": 41.3
          },
          {
            "id": 132,
            "word": "being",
            "start": 41.3,
            "end": 41.48
          },
          {
            "id": 133,
            "word": "fulfilled.",
            "start": 41.48,
            "end": 41.88
          }
        ],
        "fullText": "In their eyes, it is the peak, the pinnacle, the most important thing. It's not a trade -off. I would argue that if, now when I say happy, happy is one of those words that means a zillion different things. It's like love, right? What does that mean? Right, I love cheese. Yeah, I'm going to define it a little bit more tightly, right? So let's go back to desire, right? This is old, old Buddhist wisdom. I'm not saying anything original, but desire to me is a contract that you make with yourself to be unhappy until you get what you want, okay? And I keep that in front of mine. So when I'm unhappy about something, I look for what is the underlying desire that I have that's not being fulfilled.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-rogan",
        "watermarkHandle": "@joerogan",
        "copy": {
          "youtubeTitle": "In their eyes #shorts",
          "youtubeDescription": "In their eyes, it is the peak, the pinnacle, the most important thing. It's not a trade -off. I would argue that if, now when I say happy, happy is one of those words that means a zillion different things. It's like love, right? What does that mean? Right, I love cheese. Yeah, I'm going to define it a little bit more tightly, right? So let's go back to desire, right? This is old, old Buddhist wisdom. I'm not saying anything original, but desire to me is a contract that you make with yourself to be unhappy until you get what you want, okay? And I keep that in front of mine. So when I'm unhappy about something, I look for what is the underlying desire that I have that's not being fulfilled.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "In their eyes, it is the peak, the pinnacle, the most important thing. It's not a trade -off. I would argue that if, now when I say happy, happy is one of those words that means a ... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-rogan-4",
        "index": 4,
        "title": "The reason why people like hearing me is",
        "startTime": 45.8,
        "endTime": 93.66,
        "duration": 47.86,
        "viralityScore": 74,
        "factors": {
          "hook": 80,
          "acoustics": 85,
          "pace": 86,
          "payoff": 65,
          "sentiment": 20,
          "duration": 85
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_04_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_04_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "Yeah,",
            "start": 0.0,
            "end": 0.4
          },
          {
            "id": 2,
            "word": "you",
            "start": 0.72,
            "end": 0.82
          },
          {
            "id": 3,
            "word": "know,",
            "start": 0.82,
            "end": 0.86
          },
          {
            "id": 4,
            "word": "I",
            "start": 0.96,
            "end": 1.08
          },
          {
            "id": 5,
            "word": "think",
            "start": 1.08,
            "end": 1.36
          },
          {
            "id": 6,
            "word": "the",
            "start": 1.36,
            "end": 1.52
          },
          {
            "id": 7,
            "word": "reason",
            "start": 1.52,
            "end": 1.74
          },
          {
            "id": 8,
            "word": "why",
            "start": 1.74,
            "end": 1.92
          },
          {
            "id": 9,
            "word": "people",
            "start": 1.92,
            "end": 2.16
          },
          {
            "id": 10,
            "word": "like",
            "start": 2.16,
            "end": 2.5
          },
          {
            "id": 11,
            "word": "hearing",
            "start": 2.5,
            "end": 3.6
          },
          {
            "id": 12,
            "word": "me",
            "start": 3.6,
            "end": 4.02
          },
          {
            "id": 13,
            "word": "is",
            "start": 4.02,
            "end": 4.38
          },
          {
            "id": 14,
            "word": "because",
            "start": 4.38,
            "end": 4.74
          },
          {
            "id": 15,
            "word": "it's",
            "start": 4.74,
            "end": 5.68
          },
          {
            "id": 16,
            "word": "like",
            "start": 5.68,
            "end": 5.8
          },
          {
            "id": 17,
            "word": "if",
            "start": 5.8,
            "end": 5.94
          },
          {
            "id": 18,
            "word": "you",
            "start": 5.94,
            "end": 6.0
          },
          {
            "id": 19,
            "word": "go",
            "start": 6.0,
            "end": 6.12
          },
          {
            "id": 20,
            "word": "to",
            "start": 6.12,
            "end": 6.2
          },
          {
            "id": 21,
            "word": "a",
            "start": 6.2,
            "end": 6.6
          },
          {
            "id": 22,
            "word": "circus",
            "start": 6.6,
            "end": 6.9
          },
          {
            "id": 23,
            "word": "and",
            "start": 6.9,
            "end": 7.1
          },
          {
            "id": 24,
            "word": "you",
            "start": 7.1,
            "end": 7.18
          },
          {
            "id": 25,
            "word": "see",
            "start": 7.18,
            "end": 7.32
          },
          {
            "id": 26,
            "word": "a",
            "start": 7.32,
            "end": 7.44
          },
          {
            "id": 27,
            "word": "bear,",
            "start": 7.44,
            "end": 7.74
          },
          {
            "id": 28,
            "word": "right,",
            "start": 8.06,
            "end": 8.16
          },
          {
            "id": 29,
            "word": "that's",
            "start": 8.2,
            "end": 8.4
          },
          {
            "id": 30,
            "word": "kind",
            "start": 8.4,
            "end": 8.54
          },
          {
            "id": 31,
            "word": "of",
            "start": 8.54,
            "end": 8.64
          },
          {
            "id": 32,
            "word": "interesting,",
            "start": 8.64,
            "end": 9.0
          },
          {
            "id": 33,
            "word": "but",
            "start": 9.18,
            "end": 9.24
          },
          {
            "id": 34,
            "word": "not",
            "start": 9.24,
            "end": 9.54
          },
          {
            "id": 35,
            "word": "that",
            "start": 9.54,
            "end": 9.7
          },
          {
            "id": 36,
            "word": "much.",
            "start": 9.7,
            "end": 10.0
          },
          {
            "id": 37,
            "word": "If",
            "start": 10.0,
            "end": 10.3
          },
          {
            "id": 38,
            "word": "you",
            "start": 10.3,
            "end": 10.4
          },
          {
            "id": 39,
            "word": "see",
            "start": 10.4,
            "end": 10.56
          },
          {
            "id": 40,
            "word": "a",
            "start": 10.56,
            "end": 10.68
          },
          {
            "id": 41,
            "word": "unicycle,",
            "start": 10.68,
            "end": 11.24
          },
          {
            "id": 42,
            "word": "that's",
            "start": 11.34,
            "end": 11.52
          },
          {
            "id": 43,
            "word": "interesting,",
            "start": 11.52,
            "end": 11.86
          },
          {
            "id": 44,
            "word": "but",
            "start": 11.98,
            "end": 12.06
          },
          {
            "id": 45,
            "word": "you",
            "start": 12.06,
            "end": 12.14
          },
          {
            "id": 46,
            "word": "see",
            "start": 12.14,
            "end": 12.26
          },
          {
            "id": 47,
            "word": "a",
            "start": 12.26,
            "end": 12.36
          },
          {
            "id": 48,
            "word": "bear",
            "start": 12.36,
            "end": 12.56
          },
          {
            "id": 49,
            "word": "on",
            "start": 12.56,
            "end": 12.76
          },
          {
            "id": 50,
            "word": "a",
            "start": 12.76,
            "end": 12.82
          },
          {
            "id": 51,
            "word": "unicycle,",
            "start": 12.82,
            "end": 13.32
          },
          {
            "id": 52,
            "word": "that's",
            "start": 13.46,
            "end": 13.66
          },
          {
            "id": 53,
            "word": "really",
            "start": 13.66,
            "end": 13.88
          },
          {
            "id": 54,
            "word": "interesting,",
            "start": 13.88,
            "end": 14.26
          },
          {
            "id": 55,
            "word": "right?",
            "start": 14.46,
            "end": 14.64
          },
          {
            "id": 56,
            "word": "So",
            "start": 14.94,
            "end": 15.34
          },
          {
            "id": 57,
            "word": "when",
            "start": 15.34,
            "end": 15.66
          },
          {
            "id": 58,
            "word": "you",
            "start": 15.66,
            "end": 15.76
          },
          {
            "id": 59,
            "word": "combine",
            "start": 15.76,
            "end": 16.12
          },
          {
            "id": 60,
            "word": "things",
            "start": 16.12,
            "end": 16.4
          },
          {
            "id": 61,
            "word": "you're",
            "start": 16.4,
            "end": 16.58
          },
          {
            "id": 62,
            "word": "not",
            "start": 16.58,
            "end": 16.7
          },
          {
            "id": 63,
            "word": "supposed",
            "start": 16.7,
            "end": 16.96
          },
          {
            "id": 64,
            "word": "to",
            "start": 16.96,
            "end": 17.1
          },
          {
            "id": 65,
            "word": "combine,",
            "start": 17.1,
            "end": 17.58
          },
          {
            "id": 66,
            "word": "people",
            "start": 17.84,
            "end": 18.26
          },
          {
            "id": 67,
            "word": "get",
            "start": 18.26,
            "end": 18.5
          },
          {
            "id": 68,
            "word": "interested.",
            "start": 18.5,
            "end": 18.84
          },
          {
            "id": 69,
            "word": "It's",
            "start": 18.96,
            "end": 19.02
          },
          {
            "id": 70,
            "word": "like",
            "start": 19.02,
            "end": 19.1
          },
          {
            "id": 71,
            "word": "Bruce",
            "start": 19.1,
            "end": 19.36
          },
          {
            "id": 72,
            "word": "Lee,",
            "start": 19.36,
            "end": 19.56
          },
          {
            "id": 73,
            "word": "right,",
            "start": 19.74,
            "end": 19.82
          },
          {
            "id": 74,
            "word": "striking",
            "start": 20.08,
            "end": 20.3
          },
          {
            "id": 75,
            "word": "thoughts,",
            "start": 20.3,
            "end": 20.8
          },
          {
            "id": 76,
            "word": "philosophy,",
            "start": 21.04,
            "end": 21.46
          },
          {
            "id": 77,
            "word": "plus",
            "start": 21.46,
            "end": 21.94
          },
          {
            "id": 78,
            "word": "martial",
            "start": 21.94,
            "end": 22.32
          },
          {
            "id": 79,
            "word": "arts.",
            "start": 22.32,
            "end": 22.74
          },
          {
            "id": 80,
            "word": "And",
            "start": 23.36,
            "end": 23.84
          },
          {
            "id": 81,
            "word": "I",
            "start": 23.84,
            "end": 24.08
          },
          {
            "id": 82,
            "word": "think",
            "start": 24.08,
            "end": 24.2
          },
          {
            "id": 83,
            "word": "it's",
            "start": 24.2,
            "end": 24.4
          },
          {
            "id": 84,
            "word": "because",
            "start": 24.4,
            "end": 24.74
          },
          {
            "id": 85,
            "word": "at",
            "start": 24.74,
            "end": 24.88
          },
          {
            "id": 86,
            "word": "some",
            "start": 24.88,
            "end": 25.06
          },
          {
            "id": 87,
            "word": "level,",
            "start": 25.06,
            "end": 25.38
          },
          {
            "id": 88,
            "word": "all",
            "start": 25.4,
            "end": 26.08
          },
          {
            "id": 89,
            "word": "humans",
            "start": 26.08,
            "end": 26.52
          },
          {
            "id": 90,
            "word": "are",
            "start": 26.52,
            "end": 27.08
          },
          {
            "id": 91,
            "word": "broad.",
            "start": 27.08,
            "end": 27.54
          },
          {
            "id": 92,
            "word": "We're",
            "start": 27.8,
            "end": 27.94
          },
          {
            "id": 93,
            "word": "all",
            "start": 27.94,
            "end": 28.06
          },
          {
            "id": 94,
            "word": "multivariate,",
            "start": 28.06,
            "end": 28.74
          },
          {
            "id": 95,
            "word": "but",
            "start": 28.84,
            "end": 29.08
          },
          {
            "id": 96,
            "word": "we",
            "start": 29.08,
            "end": 29.26
          },
          {
            "id": 97,
            "word": "get",
            "start": 29.26,
            "end": 29.54
          },
          {
            "id": 98,
            "word": "summarized",
            "start": 29.54,
            "end": 30.52
          },
          {
            "id": 99,
            "word": "in",
            "start": 30.52,
            "end": 30.82
          },
          {
            "id": 100,
            "word": "pithy",
            "start": 30.82,
            "end": 31.18
          },
          {
            "id": 101,
            "word": "ways",
            "start": 31.18,
            "end": 31.46
          },
          {
            "id": 102,
            "word": "in",
            "start": 31.46,
            "end": 31.62
          },
          {
            "id": 103,
            "word": "our",
            "start": 31.62,
            "end": 31.72
          },
          {
            "id": 104,
            "word": "lives.",
            "start": 31.72,
            "end": 32.1
          },
          {
            "id": 105,
            "word": "And",
            "start": 32.24,
            "end": 32.34
          },
          {
            "id": 106,
            "word": "at",
            "start": 32.34,
            "end": 32.9
          },
          {
            "id": 107,
            "word": "some",
            "start": 32.9,
            "end": 33.06
          },
          {
            "id": 108,
            "word": "deep",
            "start": 33.06,
            "end": 33.28
          },
          {
            "id": 109,
            "word": "level,",
            "start": 33.28,
            "end": 33.56
          },
          {
            "id": 110,
            "word": "we",
            "start": 33.64,
            "end": 33.74
          },
          {
            "id": 111,
            "word": "know",
            "start": 33.74,
            "end": 33.86
          },
          {
            "id": 112,
            "word": "that's",
            "start": 33.86,
            "end": 34.12
          },
          {
            "id": 113,
            "word": "not",
            "start": 34.12,
            "end": 34.26
          },
          {
            "id": 114,
            "word": "true,",
            "start": 34.26,
            "end": 34.58
          },
          {
            "id": 115,
            "word": "right?",
            "start": 34.8,
            "end": 34.92
          },
          {
            "id": 116,
            "word": "Every",
            "start": 35.1,
            "end": 35.36
          },
          {
            "id": 117,
            "word": "human",
            "start": 35.36,
            "end": 35.7
          },
          {
            "id": 118,
            "word": "basically",
            "start": 35.7,
            "end": 36.26
          },
          {
            "id": 119,
            "word": "is",
            "start": 36.26,
            "end": 36.52
          },
          {
            "id": 120,
            "word": "capable",
            "start": 36.52,
            "end": 36.82
          },
          {
            "id": 121,
            "word": "of",
            "start": 36.82,
            "end": 37.08
          },
          {
            "id": 122,
            "word": "every",
            "start": 37.08,
            "end": 37.28
          },
          {
            "id": 123,
            "word": "experience",
            "start": 37.28,
            "end": 37.76
          },
          {
            "id": 124,
            "word": "and",
            "start": 37.76,
            "end": 37.96
          },
          {
            "id": 125,
            "word": "every",
            "start": 37.96,
            "end": 38.16
          },
          {
            "id": 126,
            "word": "thought.",
            "start": 38.16,
            "end": 38.48
          },
          {
            "id": 127,
            "word": "You",
            "start": 39.08,
            "end": 39.48
          },
          {
            "id": 128,
            "word": "know,",
            "start": 39.48,
            "end": 39.56
          },
          {
            "id": 129,
            "word": "you're",
            "start": 39.64,
            "end": 39.84
          },
          {
            "id": 130,
            "word": "a",
            "start": 39.84,
            "end": 39.96
          },
          {
            "id": 131,
            "word": "UFC",
            "start": 39.96,
            "end": 40.34
          },
          {
            "id": 132,
            "word": "comedian,",
            "start": 40.34,
            "end": 40.96
          },
          {
            "id": 133,
            "word": "commentator,",
            "start": 41.42,
            "end": 41.9
          },
          {
            "id": 134,
            "word": "podcaster,",
            "start": 42.06,
            "end": 42.56
          },
          {
            "id": 135,
            "word": "but",
            "start": 42.58,
            "end": 42.8
          },
          {
            "id": 136,
            "word": "you're",
            "start": 42.8,
            "end": 42.96
          },
          {
            "id": 137,
            "word": "also",
            "start": 42.96,
            "end": 43.12
          },
          {
            "id": 138,
            "word": "more",
            "start": 43.12,
            "end": 43.36
          },
          {
            "id": 139,
            "word": "than",
            "start": 43.36,
            "end": 43.5
          },
          {
            "id": 140,
            "word": "that.",
            "start": 43.5,
            "end": 43.7
          },
          {
            "id": 141,
            "word": "You're",
            "start": 43.84,
            "end": 43.9
          },
          {
            "id": 142,
            "word": "also",
            "start": 43.9,
            "end": 44.16
          },
          {
            "id": 143,
            "word": "a",
            "start": 44.16,
            "end": 44.36
          },
          {
            "id": 144,
            "word": "father,",
            "start": 44.36,
            "end": 44.68
          },
          {
            "id": 145,
            "word": "lover,",
            "start": 45.18,
            "end": 46.04
          },
          {
            "id": 146,
            "word": "you",
            "start": 46.58,
            "end": 46.58
          },
          {
            "id": 147,
            "word": "know,",
            "start": 46.58,
            "end": 46.72
          },
          {
            "id": 148,
            "word": "thinker,",
            "start": 46.92,
            "end": 47.56
          },
          {
            "id": 149,
            "word": "etc.",
            "start": 47.7,
            "end": 47.86
          }
        ],
        "fullText": "Yeah, you know, I think the reason why people like hearing me is because it's like if you go to a circus and you see a bear, right, that's kind of interesting, but not that much. If you see a unicycle, that's interesting, but you see a bear on a unicycle, that's really interesting, right? So when you combine things you're not supposed to combine, people get interested. It's like Bruce Lee, right, striking thoughts, philosophy, plus martial arts. And I think it's because at some level, all humans are broad. We're all multivariate, but we get summarized in pithy ways in our lives. And at some deep level, we know that's not true, right? Every human basically is capable of every experience and every thought. You know, you're a UFC comedian, commentator, podcaster, but you're also more than that. You're also a father, lover, you know, thinker, etc.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-rogan",
        "watermarkHandle": "@joerogan",
        "copy": {
          "youtubeTitle": "The reason why people like hearing me is #shorts",
          "youtubeDescription": "Yeah, you know, I think the reason why people like hearing me is because it's like if you go to a circus and you see a bear, right, that's kind of interesting, but not that much. If you see a unicycle, that's interesting, but you see a bear on a unicycle, that's really interesting, right? So when you combine things you're not supposed to combine, people get interested. It's like Bruce Lee, right, striking thoughts, philosophy, plus martial arts. And I think it's because at some level, all humans are broad. We're all multivariate, but we get summarized in pithy ways in our lives. And at some deep level, we know that's not true, right? Every human basically is capable of every experience and every thought. You know, you're a UFC comedian, commentator, podcaster, but you're also more than that. You're also a father, lover, you know, thinker, etc.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "Yeah, you know, I think the reason why people like hearing me is because it's like if you go to a circus and you see a bear, right, that's kind of interesting, but not that much. I... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-rogan-5",
        "index": 5,
        "title": "Important Topic Breakdown",
        "startTime": 2327.0,
        "endTime": 2369.3,
        "duration": 42.3,
        "viralityScore": 73,
        "factors": {
          "hook": 51,
          "acoustics": 84,
          "pace": 100,
          "payoff": 90,
          "sentiment": 20,
          "duration": 99
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_05_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/250a05f4a90b1754_Joe%20Rogan%20Experience%20%231309%20-%20Naval%20Ravikant/clip_05_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "Right?",
            "start": 0.0,
            "end": 0.44
          },
          {
            "id": 2,
            "word": "These",
            "start": 0.7,
            "end": 0.94
          },
          {
            "id": 3,
            "word": "are",
            "start": 0.94,
            "end": 1.1
          },
          {
            "id": 4,
            "word": "still",
            "start": 1.1,
            "end": 1.44
          },
          {
            "id": 5,
            "word": "man",
            "start": 1.44,
            "end": 2.46
          },
          {
            "id": 6,
            "word": "-made,",
            "start": 2.46,
            "end": 2.9
          },
          {
            "id": 7,
            "word": "very",
            "start": 3.1,
            "end": 3.58
          },
          {
            "id": 8,
            "word": "closed,",
            "start": 3.58,
            "end": 4.26
          },
          {
            "id": 9,
            "word": "bounded",
            "start": 4.64,
            "end": 4.9
          },
          {
            "id": 10,
            "word": "games.",
            "start": 4.9,
            "end": 5.34
          },
          {
            "id": 11,
            "word": "They're",
            "start": 5.34,
            "end": 6.16
          },
          {
            "id": 12,
            "word": "not",
            "start": 6.16,
            "end": 6.78
          },
          {
            "id": 13,
            "word": "on",
            "start": 6.78,
            "end": 7.8
          },
          {
            "id": 14,
            "word": "the",
            "start": 7.8,
            "end": 7.98
          },
          {
            "id": 15,
            "word": "road",
            "start": 7.98,
            "end": 8.3
          },
          {
            "id": 16,
            "word": "to",
            "start": 8.3,
            "end": 8.48
          },
          {
            "id": 17,
            "word": "the",
            "start": 8.48,
            "end": 8.6
          },
          {
            "id": 18,
            "word": "unbounded",
            "start": 8.6,
            "end": 9.2
          },
          {
            "id": 19,
            "word": "game",
            "start": 9.2,
            "end": 9.36
          },
          {
            "id": 20,
            "word": "of",
            "start": 9.36,
            "end": 9.54
          },
          {
            "id": 21,
            "word": "life.",
            "start": 9.54,
            "end": 9.84
          },
          {
            "id": 22,
            "word": "They",
            "start": 10.16,
            "end": 10.58
          },
          {
            "id": 23,
            "word": "are",
            "start": 10.58,
            "end": 10.8
          },
          {
            "id": 24,
            "word": "completely",
            "start": 10.8,
            "end": 11.54
          },
          {
            "id": 25,
            "word": "artificial.",
            "start": 11.54,
            "end": 12.16
          },
          {
            "id": 26,
            "word": "But",
            "start": 12.48,
            "end": 12.8
          },
          {
            "id": 27,
            "word": "didn't",
            "start": 12.8,
            "end": 13.5
          },
          {
            "id": 28,
            "word": "Go,",
            "start": 13.5,
            "end": 13.88
          },
          {
            "id": 29,
            "word": "didn't",
            "start": 14.34,
            "end": 14.98
          },
          {
            "id": 30,
            "word": "that",
            "start": 14.98,
            "end": 15.28
          },
          {
            "id": 31,
            "word": "give",
            "start": 15.28,
            "end": 15.58
          },
          {
            "id": 32,
            "word": "you",
            "start": 15.58,
            "end": 15.72
          },
          {
            "id": 33,
            "word": "like",
            "start": 15.72,
            "end": 15.86
          },
          {
            "id": 34,
            "word": "a",
            "start": 15.86,
            "end": 15.96
          },
          {
            "id": 35,
            "word": "little",
            "start": 15.96,
            "end": 16.1
          },
          {
            "id": 36,
            "word": "bit",
            "start": 16.1,
            "end": 16.3
          },
          {
            "id": 37,
            "word": "of",
            "start": 16.3,
            "end": 16.46
          },
          {
            "id": 38,
            "word": "a",
            "start": 16.46,
            "end": 16.6
          },
          {
            "id": 39,
            "word": "pause?",
            "start": 16.6,
            "end": 17.12
          },
          {
            "id": 40,
            "word": "A",
            "start": 17.32,
            "end": 17.54
          },
          {
            "id": 41,
            "word": "little",
            "start": 17.54,
            "end": 17.7
          },
          {
            "id": 42,
            "word": "bit.",
            "start": 17.7,
            "end": 17.9
          },
          {
            "id": 43,
            "word": "Go",
            "start": 18.1,
            "end": 18.18
          },
          {
            "id": 44,
            "word": "is",
            "start": 18.18,
            "end": 18.34
          },
          {
            "id": 45,
            "word": "not,",
            "start": 18.34,
            "end": 18.54
          },
          {
            "id": 46,
            "word": "Go",
            "start": 18.74,
            "end": 19.16
          },
          {
            "id": 47,
            "word": "or",
            "start": 19.16,
            "end": 19.34
          },
          {
            "id": 48,
            "word": "League",
            "start": 19.34,
            "end": 19.52
          },
          {
            "id": 49,
            "word": "of",
            "start": 19.52,
            "end": 19.66
          },
          {
            "id": 50,
            "word": "Legends",
            "start": 19.66,
            "end": 19.94
          },
          {
            "id": 51,
            "word": "or",
            "start": 19.94,
            "end": 20.14
          },
          {
            "id": 52,
            "word": "Fortnite,",
            "start": 20.14,
            "end": 20.42
          },
          {
            "id": 53,
            "word": "they're",
            "start": 20.58,
            "end": 20.68
          },
          {
            "id": 54,
            "word": "not",
            "start": 20.68,
            "end": 20.8
          },
          {
            "id": 55,
            "word": "completely",
            "start": 20.8,
            "end": 21.3
          },
          {
            "id": 56,
            "word": "deterministic.",
            "start": 21.3,
            "end": 22.12
          },
          {
            "id": 57,
            "word": "Right.",
            "start": 22.28,
            "end": 22.56
          },
          {
            "id": 58,
            "word": "But",
            "start": 22.56,
            "end": 23.3
          },
          {
            "id": 59,
            "word": "they're",
            "start": 23.3,
            "end": 23.76
          },
          {
            "id": 60,
            "word": "still",
            "start": 23.76,
            "end": 24.04
          },
          {
            "id": 61,
            "word": "very",
            "start": 24.04,
            "end": 24.56
          },
          {
            "id": 62,
            "word": "artificial,",
            "start": 24.56,
            "end": 25.06
          },
          {
            "id": 63,
            "word": "very",
            "start": 25.3,
            "end": 25.42
          },
          {
            "id": 64,
            "word": "bounded",
            "start": 25.42,
            "end": 25.74
          },
          {
            "id": 65,
            "word": "games.",
            "start": 25.74,
            "end": 26.14
          },
          {
            "id": 66,
            "word": "Being",
            "start": 26.62,
            "end": 26.76
          },
          {
            "id": 67,
            "word": "good",
            "start": 26.76,
            "end": 27.0
          },
          {
            "id": 68,
            "word": "at",
            "start": 27.0,
            "end": 27.16
          },
          {
            "id": 69,
            "word": "Go",
            "start": 27.16,
            "end": 27.38
          },
          {
            "id": 70,
            "word": "doesn't",
            "start": 27.38,
            "end": 27.78
          },
          {
            "id": 71,
            "word": "mean",
            "start": 27.78,
            "end": 27.94
          },
          {
            "id": 72,
            "word": "that",
            "start": 27.94,
            "end": 28.1
          },
          {
            "id": 73,
            "word": "you",
            "start": 28.1,
            "end": 28.22
          },
          {
            "id": 74,
            "word": "can",
            "start": 28.22,
            "end": 28.34
          },
          {
            "id": 75,
            "word": "then",
            "start": 28.34,
            "end": 28.56
          },
          {
            "id": 76,
            "word": "suddenly",
            "start": 28.56,
            "end": 28.92
          },
          {
            "id": 77,
            "word": "figure",
            "start": 28.92,
            "end": 29.18
          },
          {
            "id": 78,
            "word": "out",
            "start": 29.18,
            "end": 29.3
          },
          {
            "id": 79,
            "word": "how",
            "start": 29.3,
            "end": 29.4
          },
          {
            "id": 80,
            "word": "to",
            "start": 29.4,
            "end": 29.48
          },
          {
            "id": 81,
            "word": "write",
            "start": 29.48,
            "end": 29.66
          },
          {
            "id": 82,
            "word": "great",
            "start": 29.66,
            "end": 29.84
          },
          {
            "id": 83,
            "word": "poetry.",
            "start": 29.84,
            "end": 30.26
          },
          {
            "id": 84,
            "word": "Right.",
            "start": 30.54,
            "end": 30.66
          },
          {
            "id": 85,
            "word": "The",
            "start": 31.18,
            "end": 31.3
          },
          {
            "id": 86,
            "word": "creativity",
            "start": 31.3,
            "end": 31.86
          },
          {
            "id": 87,
            "word": "for",
            "start": 31.86,
            "end": 32.3
          },
          {
            "id": 88,
            "word": "sure",
            "start": 32.3,
            "end": 32.6
          },
          {
            "id": 89,
            "word": "is",
            "start": 32.6,
            "end": 32.94
          },
          {
            "id": 90,
            "word": "something",
            "start": 32.94,
            "end": 33.18
          },
          {
            "id": 91,
            "word": "that's",
            "start": 33.18,
            "end": 33.48
          },
          {
            "id": 92,
            "word": "very...",
            "start": 33.48,
            "end": 33.84
          },
          {
            "id": 93,
            "word": "Creativity",
            "start": 33.84,
            "end": 34.06
          },
          {
            "id": 94,
            "word": "is",
            "start": 34.06,
            "end": 34.26
          },
          {
            "id": 95,
            "word": "the",
            "start": 34.26,
            "end": 34.36
          },
          {
            "id": 96,
            "word": "last",
            "start": 34.36,
            "end": 34.64
          },
          {
            "id": 97,
            "word": "frontier.",
            "start": 34.64,
            "end": 35.08
          },
          {
            "id": 98,
            "word": "So",
            "start": 35.3,
            "end": 35.36
          },
          {
            "id": 99,
            "word": "I",
            "start": 35.36,
            "end": 35.5
          },
          {
            "id": 100,
            "word": "do",
            "start": 35.5,
            "end": 35.7
          },
          {
            "id": 101,
            "word": "believe",
            "start": 35.7,
            "end": 36.04
          },
          {
            "id": 102,
            "word": "that",
            "start": 36.04,
            "end": 36.32
          },
          {
            "id": 103,
            "word": "automation",
            "start": 36.32,
            "end": 36.86
          },
          {
            "id": 104,
            "word": "over",
            "start": 36.86,
            "end": 37.28
          },
          {
            "id": 105,
            "word": "a",
            "start": 37.28,
            "end": 37.46
          },
          {
            "id": 106,
            "word": "long",
            "start": 37.46,
            "end": 37.58
          },
          {
            "id": 107,
            "word": "enough",
            "start": 37.58,
            "end": 37.76
          },
          {
            "id": 108,
            "word": "period",
            "start": 37.76,
            "end": 37.92
          },
          {
            "id": 109,
            "word": "of",
            "start": 37.92,
            "end": 38.04
          },
          {
            "id": 110,
            "word": "time",
            "start": 38.04,
            "end": 38.32
          },
          {
            "id": 111,
            "word": "will",
            "start": 38.32,
            "end": 38.54
          },
          {
            "id": 112,
            "word": "replace",
            "start": 38.54,
            "end": 38.92
          },
          {
            "id": 113,
            "word": "every",
            "start": 38.92,
            "end": 39.22
          },
          {
            "id": 114,
            "word": "non",
            "start": 39.22,
            "end": 39.52
          },
          {
            "id": 115,
            "word": "-creative",
            "start": 39.52,
            "end": 39.9
          },
          {
            "id": 116,
            "word": "job",
            "start": 39.9,
            "end": 40.18
          },
          {
            "id": 117,
            "word": "or",
            "start": 40.18,
            "end": 41.16
          },
          {
            "id": 118,
            "word": "every",
            "start": 41.16,
            "end": 41.4
          },
          {
            "id": 119,
            "word": "non",
            "start": 41.4,
            "end": 41.64
          },
          {
            "id": 120,
            "word": "-creative",
            "start": 41.64,
            "end": 42.04
          },
          {
            "id": 121,
            "word": "work.",
            "start": 42.04,
            "end": 42.3
          }
        ],
        "fullText": "Right? These are still man -made, very closed, bounded games. They're not on the road to the unbounded game of life. They are completely artificial. But didn't Go, didn't that give you like a little bit of a pause? A little bit. Go is not, Go or League of Legends or Fortnite, they're not completely deterministic. Right. But they're still very artificial, very bounded games. Being good at Go doesn't mean that you can then suddenly figure out how to write great poetry. Right. The creativity for sure is something that's very... Creativity is the last frontier. So I do believe that automation over a long enough period of time will replace every non -creative job or every non -creative work.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-rogan",
        "watermarkHandle": "@joerogan",
        "copy": {
          "youtubeTitle": "Important Topic Breakdown #shorts",
          "youtubeDescription": "Right? These are still man -made, very closed, bounded games. They're not on the road to the unbounded game of life. They are completely artificial. But didn't Go, didn't that give you like a little bit of a pause? A little bit. Go is not, Go or League of Legends or Fortnite, they're not completely deterministic. Right. But they're still very artificial, very bounded games. Being good at Go doesn't mean that you can then suddenly figure out how to write great poetry. Right. The creativity for sure is something that's very... Creativity is the last frontier. So I do believe that automation over a long enough period of time will replace every non -creative job or every non -creative work.\n\nFrom Joe Rogan Experience #1309 \u2014 Naval Ravikant. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "Right? These are still man -made, very closed, bounded games. They're not on the road to the unbounded game of life. They are completely artificial. But didn't Go, didn't that give... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      }
    ]
  },
  {
    "id": "proj-aakash",
    "title": "Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy)",
    "source": "https://youtube.com/watch?v=d452da5e429e2d80",
    "sourceType": "youtube",
    "rightsConfirmed": true,
    "status": "completed",
    "createdAt": "2026-11-10T12:00:00Z",
    "durationSec": 2006,
    "clipsCount": 5,
    "avgScore": 83.4,
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_01_engaging_moment_thumb_1.jpg",
    "clips": [
      {
        "id": "proj-aakash-1",
        "index": 1,
        "title": "You don't have to go to jail",
        "startTime": 1707.86,
        "endTime": 1748.26,
        "duration": 40.4,
        "viralityScore": 92,
        "factors": {
          "hook": 100,
          "acoustics": 86,
          "pace": 100,
          "payoff": 65,
          "sentiment": 100,
          "duration": 96
        },
        "status": "approved",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_01_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_01_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "you",
            "start": 0.0,
            "end": 0.44
          },
          {
            "id": 2,
            "word": "don't",
            "start": 0.44,
            "end": 0.88
          },
          {
            "id": 3,
            "word": "have",
            "start": 0.88,
            "end": 0.88
          },
          {
            "id": 4,
            "word": "to",
            "start": 0.88,
            "end": 1.04
          },
          {
            "id": 5,
            "word": "go",
            "start": 1.04,
            "end": 1.1
          },
          {
            "id": 6,
            "word": "to",
            "start": 1.1,
            "end": 1.1
          },
          {
            "id": 7,
            "word": "jail.",
            "start": 1.1,
            "end": 1.1
          },
          {
            "id": 8,
            "word": "They",
            "start": 1.94,
            "end": 2.38
          },
          {
            "id": 9,
            "word": "go",
            "start": 2.38,
            "end": 2.38
          },
          {
            "id": 10,
            "word": "to",
            "start": 2.38,
            "end": 2.38
          },
          {
            "id": 11,
            "word": "the",
            "start": 2.38,
            "end": 2.38
          },
          {
            "id": 12,
            "word": "rickshaw.",
            "start": 2.38,
            "end": 2.78
          },
          {
            "id": 13,
            "word": "They'll",
            "start": 2.9,
            "end": 2.92
          },
          {
            "id": 14,
            "word": "Google",
            "start": 2.92,
            "end": 3.12
          },
          {
            "id": 15,
            "word": "it.",
            "start": 3.12,
            "end": 3.4
          },
          {
            "id": 16,
            "word": "They",
            "start": 3.86,
            "end": 4.16
          },
          {
            "id": 17,
            "word": "know",
            "start": 4.16,
            "end": 4.38
          },
          {
            "id": 18,
            "word": "what's",
            "start": 4.38,
            "end": 4.88
          },
          {
            "id": 19,
            "word": "going",
            "start": 4.88,
            "end": 4.88
          },
          {
            "id": 20,
            "word": "on.",
            "start": 4.88,
            "end": 4.98
          },
          {
            "id": 21,
            "word": "There's",
            "start": 5.1,
            "end": 5.26
          },
          {
            "id": 22,
            "word": "a",
            "start": 5.26,
            "end": 5.32
          },
          {
            "id": 23,
            "word": "main",
            "start": 5.32,
            "end": 6.66
          },
          {
            "id": 24,
            "word": "road.",
            "start": 6.66,
            "end": 6.88
          },
          {
            "id": 25,
            "word": "Jail",
            "start": 7.42,
            "end": 7.86
          },
          {
            "id": 26,
            "word": "Road.",
            "start": 7.86,
            "end": 8.06
          },
          {
            "id": 27,
            "word": "What",
            "start": 10.14,
            "end": 10.58
          },
          {
            "id": 28,
            "word": "an",
            "start": 10.58,
            "end": 10.74
          },
          {
            "id": 29,
            "word": "innovative",
            "start": 10.74,
            "end": 11.06
          },
          {
            "id": 30,
            "word": "name.",
            "start": 11.06,
            "end": 11.36
          },
          {
            "id": 31,
            "word": "Jail",
            "start": 12.56,
            "end": 13.08
          },
          {
            "id": 32,
            "word": "road.",
            "start": 13.08,
            "end": 13.32
          },
          {
            "id": 33,
            "word": "Jail",
            "start": 13.58,
            "end": 13.76
          },
          {
            "id": 34,
            "word": "road.",
            "start": 13.76,
            "end": 14.0
          },
          {
            "id": 35,
            "word": "Jail",
            "start": 14.52,
            "end": 15.04
          },
          {
            "id": 36,
            "word": "road.",
            "start": 15.04,
            "end": 15.04
          },
          {
            "id": 37,
            "word": "Nala",
            "start": 15.04,
            "end": 15.2
          },
          {
            "id": 38,
            "word": "road.",
            "start": 15.2,
            "end": 15.44
          },
          {
            "id": 39,
            "word": "Nala",
            "start": 15.74,
            "end": 15.84
          },
          {
            "id": 40,
            "word": "road.",
            "start": 15.84,
            "end": 16.12
          },
          {
            "id": 41,
            "word": "Why",
            "start": 16.7,
            "end": 17.22
          },
          {
            "id": 42,
            "word": "are",
            "start": 17.22,
            "end": 17.28
          },
          {
            "id": 43,
            "word": "you",
            "start": 17.28,
            "end": 17.28
          },
          {
            "id": 44,
            "word": "thinking?",
            "start": 17.28,
            "end": 17.52
          },
          {
            "id": 45,
            "word": "The",
            "start": 21.24,
            "end": 21.76
          },
          {
            "id": 46,
            "word": "whole",
            "start": 21.76,
            "end": 21.9
          },
          {
            "id": 47,
            "word": "road",
            "start": 21.9,
            "end": 22.16
          },
          {
            "id": 48,
            "word": "has",
            "start": 22.16,
            "end": 22.34
          },
          {
            "id": 49,
            "word": "a",
            "start": 22.34,
            "end": 22.42
          },
          {
            "id": 50,
            "word": "wall.",
            "start": 22.42,
            "end": 22.76
          },
          {
            "id": 51,
            "word": "It's",
            "start": 22.94,
            "end": 23.0
          },
          {
            "id": 52,
            "word": "so",
            "start": 23.0,
            "end": 23.48
          },
          {
            "id": 53,
            "word": "beautiful",
            "start": 23.48,
            "end": 23.9
          },
          {
            "id": 54,
            "word": "poem.",
            "start": 23.9,
            "end": 24.28
          },
          {
            "id": 55,
            "word": "It's",
            "start": 25.1,
            "end": 25.58
          },
          {
            "id": 56,
            "word": "written",
            "start": 25.58,
            "end": 25.66
          },
          {
            "id": 57,
            "word": "by",
            "start": 25.66,
            "end": 25.66
          },
          {
            "id": 58,
            "word": "a",
            "start": 25.66,
            "end": 25.98
          },
          {
            "id": 59,
            "word": "man.",
            "start": 25.98,
            "end": 26.8
          },
          {
            "id": 60,
            "word": "It's",
            "start": 26.8,
            "end": 26.9
          },
          {
            "id": 61,
            "word": "written",
            "start": 26.9,
            "end": 27.14
          },
          {
            "id": 62,
            "word": "by",
            "start": 27.14,
            "end": 27.14
          },
          {
            "id": 63,
            "word": "a",
            "start": 27.14,
            "end": 27.14
          },
          {
            "id": 64,
            "word": "man.",
            "start": 27.14,
            "end": 27.14
          },
          {
            "id": 65,
            "word": "It's",
            "start": 27.32,
            "end": 27.54
          },
          {
            "id": 66,
            "word": "a",
            "start": 27.54,
            "end": 28.18
          },
          {
            "id": 67,
            "word": "love",
            "start": 28.18,
            "end": 28.38
          },
          {
            "id": 68,
            "word": "letter.",
            "start": 28.38,
            "end": 28.66
          },
          {
            "id": 69,
            "word": "It's",
            "start": 28.82,
            "end": 29.2
          },
          {
            "id": 70,
            "word": "a",
            "start": 29.2,
            "end": 29.26
          },
          {
            "id": 71,
            "word": "woman",
            "start": 29.26,
            "end": 29.54
          },
          {
            "id": 72,
            "word": "who",
            "start": 29.54,
            "end": 30.34
          },
          {
            "id": 73,
            "word": "is",
            "start": 30.34,
            "end": 30.36
          },
          {
            "id": 74,
            "word": "in",
            "start": 30.36,
            "end": 30.46
          },
          {
            "id": 75,
            "word": "jail.",
            "start": 30.46,
            "end": 30.56
          },
          {
            "id": 76,
            "word": "She",
            "start": 31.06,
            "end": 31.16
          },
          {
            "id": 77,
            "word": "doesn't",
            "start": 31.16,
            "end": 31.42
          },
          {
            "id": 78,
            "word": "know",
            "start": 31.42,
            "end": 31.56
          },
          {
            "id": 79,
            "word": "when",
            "start": 31.56,
            "end": 31.74
          },
          {
            "id": 80,
            "word": "she",
            "start": 31.74,
            "end": 31.96
          },
          {
            "id": 81,
            "word": "will",
            "start": 31.96,
            "end": 32.02
          },
          {
            "id": 82,
            "word": "come.",
            "start": 32.02,
            "end": 32.02
          },
          {
            "id": 83,
            "word": "So,",
            "start": 32.82,
            "end": 33.18
          },
          {
            "id": 84,
            "word": "it's",
            "start": 33.34,
            "end": 33.34
          },
          {
            "id": 85,
            "word": "like",
            "start": 33.34,
            "end": 33.4
          },
          {
            "id": 86,
            "word": "a",
            "start": 33.4,
            "end": 33.48
          },
          {
            "id": 87,
            "word": "poem.",
            "start": 33.48,
            "end": 34.56
          },
          {
            "id": 88,
            "word": "I",
            "start": 34.88,
            "end": 35.36
          },
          {
            "id": 89,
            "word": "write",
            "start": 35.36,
            "end": 35.6
          },
          {
            "id": 90,
            "word": "in",
            "start": 35.6,
            "end": 35.84
          },
          {
            "id": 91,
            "word": "the",
            "start": 35.84,
            "end": 35.84
          },
          {
            "id": 92,
            "word": "morning.",
            "start": 35.84,
            "end": 35.84
          },
          {
            "id": 93,
            "word": "I",
            "start": 36.44,
            "end": 36.92
          },
          {
            "id": 94,
            "word": "write",
            "start": 36.92,
            "end": 37.28
          },
          {
            "id": 95,
            "word": "in",
            "start": 37.28,
            "end": 37.28
          },
          {
            "id": 96,
            "word": "the",
            "start": 37.28,
            "end": 37.28
          },
          {
            "id": 97,
            "word": "evening.",
            "start": 37.28,
            "end": 37.28
          },
          {
            "id": 98,
            "word": "I",
            "start": 38.34,
            "end": 38.34
          },
          {
            "id": 99,
            "word": "write",
            "start": 38.34,
            "end": 38.36
          },
          {
            "id": 100,
            "word": "in",
            "start": 38.36,
            "end": 38.36
          },
          {
            "id": 101,
            "word": "the",
            "start": 38.36,
            "end": 38.48
          },
          {
            "id": 102,
            "word": "evening.",
            "start": 38.48,
            "end": 39.8
          },
          {
            "id": 103,
            "word": "I",
            "start": 39.8,
            "end": 39.8
          },
          {
            "id": 104,
            "word": "write",
            "start": 39.8,
            "end": 40.4
          },
          {
            "id": 105,
            "word": "in",
            "start": 40.4,
            "end": 40.4
          },
          {
            "id": 106,
            "word": "the",
            "start": 40.4,
            "end": 40.4
          },
          {
            "id": 107,
            "word": "evening.",
            "start": 40.4,
            "end": 40.4
          }
        ],
        "fullText": "you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road. What an innovative name. Jail road. Jail road. Jail road. Nala road. Nala road. Why are you thinking? The whole road has a wall. It's so beautiful poem. It's written by a man. It's written by a man. It's a love letter. It's a woman who is in jail. She doesn't know when she will come. So, it's like a poem. I write in the morning. I write in the evening. I write in the evening. I write in the evening.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-aakash",
        "watermarkHandle": "@aakashgupta",
        "copy": {
          "youtubeTitle": "You don't have to go to jail #shorts",
          "youtubeDescription": "you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road. What an innovative name. Jail road. Jail road. Jail road. Nala road. Nala road. Why are you thinking? The whole road has a wall. It's so beautiful poem. It's written by a man. It's written by a man. It's a love letter. It's a woman who is in jail. She doesn't know when she will come. So, it's like a poem. I write in the morning. I write in the evening. I write in the evening. I write in the evening.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road. What an innovative name. Jail road. Jail road. ... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-aakash-2",
        "index": 2,
        "title": "I want to murder",
        "startTime": 1054.14,
        "endTime": 1084.82,
        "duration": 30.68,
        "viralityScore": 85,
        "factors": {
          "hook": 100,
          "acoustics": 81,
          "pace": 90,
          "payoff": 65,
          "sentiment": 88,
          "duration": 72
        },
        "status": "approved",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_02_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_02_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "I",
            "start": 0.0,
            "end": 0.42
          },
          {
            "id": 2,
            "word": "want",
            "start": 0.42,
            "end": 0.46
          },
          {
            "id": 3,
            "word": "to",
            "start": 0.46,
            "end": 0.5
          },
          {
            "id": 4,
            "word": "murder",
            "start": 0.5,
            "end": 0.64
          },
          {
            "id": 5,
            "word": "so",
            "start": 0.64,
            "end": 1.3
          },
          {
            "id": 6,
            "word": "that",
            "start": 1.3,
            "end": 1.46
          },
          {
            "id": 7,
            "word": "I",
            "start": 1.46,
            "end": 1.54
          },
          {
            "id": 8,
            "word": "will",
            "start": 1.54,
            "end": 1.62
          },
          {
            "id": 9,
            "word": "go",
            "start": 1.62,
            "end": 1.98
          },
          {
            "id": 10,
            "word": "to",
            "start": 1.98,
            "end": 2.08
          },
          {
            "id": 11,
            "word": "jail.",
            "start": 2.08,
            "end": 2.24
          },
          {
            "id": 12,
            "word": "I'm",
            "start": 3.36,
            "end": 3.78
          },
          {
            "id": 13,
            "word": "changing",
            "start": 3.78,
            "end": 3.8
          },
          {
            "id": 14,
            "word": "the",
            "start": 3.8,
            "end": 3.88
          },
          {
            "id": 15,
            "word": "playlist.",
            "start": 3.88,
            "end": 4.1
          },
          {
            "id": 16,
            "word": "You",
            "start": 8.9,
            "end": 9.32
          },
          {
            "id": 17,
            "word": "are",
            "start": 9.32,
            "end": 9.46
          },
          {
            "id": 18,
            "word": "the",
            "start": 9.46,
            "end": 9.48
          },
          {
            "id": 19,
            "word": "same.",
            "start": 9.48,
            "end": 10.2
          },
          {
            "id": 20,
            "word": "Mix",
            "start": 11.68,
            "end": 12.1
          },
          {
            "id": 21,
            "word": "and",
            "start": 12.1,
            "end": 12.34
          },
          {
            "id": 22,
            "word": "match.",
            "start": 12.34,
            "end": 12.52
          },
          {
            "id": 23,
            "word": "What",
            "start": 13.76,
            "end": 14.18
          },
          {
            "id": 24,
            "word": "do",
            "start": 14.18,
            "end": 14.34
          },
          {
            "id": 25,
            "word": "you",
            "start": 14.34,
            "end": 14.4
          },
          {
            "id": 26,
            "word": "see?",
            "start": 14.4,
            "end": 14.42
          },
          {
            "id": 27,
            "word": "You",
            "start": 14.7,
            "end": 14.82
          },
          {
            "id": 28,
            "word": "can",
            "start": 14.82,
            "end": 14.96
          },
          {
            "id": 29,
            "word": "play",
            "start": 14.96,
            "end": 15.0
          },
          {
            "id": 30,
            "word": "Punjabi.",
            "start": 15.0,
            "end": 15.52
          },
          {
            "id": 31,
            "word": "It",
            "start": 16.56,
            "end": 16.98
          },
          {
            "id": 32,
            "word": "will",
            "start": 16.98,
            "end": 17.02
          },
          {
            "id": 33,
            "word": "be",
            "start": 17.02,
            "end": 17.04
          },
          {
            "id": 34,
            "word": "a",
            "start": 17.04,
            "end": 17.08
          },
          {
            "id": 35,
            "word": "place",
            "start": 17.08,
            "end": 17.28
          },
          {
            "id": 36,
            "word": "in",
            "start": 17.28,
            "end": 17.68
          },
          {
            "id": 37,
            "word": "the",
            "start": 17.68,
            "end": 17.72
          },
          {
            "id": 38,
            "word": "morning.",
            "start": 17.72,
            "end": 17.72
          },
          {
            "id": 39,
            "word": "Like",
            "start": 19.08,
            "end": 19.5
          },
          {
            "id": 40,
            "word": "Micah",
            "start": 19.5,
            "end": 19.92
          },
          {
            "id": 41,
            "word": "Ba",
            "start": 19.92,
            "end": 20.0
          },
          {
            "id": 42,
            "word": "Ji's",
            "start": 20.0,
            "end": 20.32
          },
          {
            "id": 43,
            "word": "songs,",
            "start": 20.32,
            "end": 20.32
          },
          {
            "id": 44,
            "word": "you",
            "start": 20.8,
            "end": 20.9
          },
          {
            "id": 45,
            "word": "play",
            "start": 20.9,
            "end": 21.08
          },
          {
            "id": 46,
            "word": "at",
            "start": 21.08,
            "end": 21.28
          },
          {
            "id": 47,
            "word": "6",
            "start": 21.28,
            "end": 21.56
          },
          {
            "id": 48,
            "word": "o",
            "start": 21.56,
            "end": 21.56
          },
          {
            "id": 49,
            "word": "'clock.",
            "start": 21.56,
            "end": 21.86
          },
          {
            "id": 50,
            "word": "On",
            "start": 22.16,
            "end": 22.52
          },
          {
            "id": 51,
            "word": "the",
            "start": 22.52,
            "end": 22.54
          },
          {
            "id": 52,
            "word": "loudspeaker.",
            "start": 22.54,
            "end": 23.04
          },
          {
            "id": 53,
            "word": "With",
            "start": 28.48,
            "end": 28.74
          },
          {
            "id": 54,
            "word": "my",
            "start": 28.74,
            "end": 29.48
          },
          {
            "id": 55,
            "word": "feet",
            "start": 29.48,
            "end": 30.42
          },
          {
            "id": 56,
            "word": "in",
            "start": 30.42,
            "end": 30.42
          },
          {
            "id": 57,
            "word": "the",
            "start": 30.42,
            "end": 30.68
          },
          {
            "id": 58,
            "word": "morning.",
            "start": 30.68,
            "end": 30.68
          }
        ],
        "fullText": "I want to murder so that I will go to jail. I'm changing the playlist. You are the same. Mix and match. What do you see? You can play Punjabi. It will be a place in the morning. Like Micah Ba Ji's songs, you play at 6 o 'clock. On the loudspeaker. With my feet in the morning.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-aakash",
        "watermarkHandle": "@aakashgupta",
        "copy": {
          "youtubeTitle": "I want to murder #shorts",
          "youtubeDescription": "I want to murder so that I will go to jail. I'm changing the playlist. You are the same. Mix and match. What do you see? You can play Punjabi. It will be a place in the morning. Like Micah Ba Ji's songs, you play at 6 o 'clock. On the loudspeaker. With my feet in the morning.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "I want to murder so that I will go to jail. I'm changing the playlist. You are the same. Mix and match. What do you see? You can play Punjabi. It will be a place in the morning. Li... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-aakash-3",
        "index": 3,
        "title": "I don't know how to go to jail",
        "startTime": 1886.32,
        "endTime": 1929.52,
        "duration": 43.2,
        "viralityScore": 84,
        "factors": {
          "hook": 100,
          "acoustics": 85,
          "pace": 100,
          "payoff": 65,
          "sentiment": 22,
          "duration": 97
        },
        "status": "approved",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_03_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_03_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "I",
            "start": 0.0,
            "end": 0.6
          },
          {
            "id": 2,
            "word": "don't",
            "start": 0.6,
            "end": 0.76
          },
          {
            "id": 3,
            "word": "know",
            "start": 0.76,
            "end": 0.94
          },
          {
            "id": 4,
            "word": "how",
            "start": 0.94,
            "end": 1.2
          },
          {
            "id": 5,
            "word": "to",
            "start": 1.2,
            "end": 1.42
          },
          {
            "id": 6,
            "word": "go",
            "start": 1.42,
            "end": 1.44
          },
          {
            "id": 7,
            "word": "to",
            "start": 1.44,
            "end": 1.44
          },
          {
            "id": 8,
            "word": "jail.",
            "start": 1.44,
            "end": 1.64
          },
          {
            "id": 9,
            "word": "And",
            "start": 2.98,
            "end": 3.58
          },
          {
            "id": 10,
            "word": "especially",
            "start": 3.58,
            "end": 3.78
          },
          {
            "id": 11,
            "word": "if",
            "start": 3.78,
            "end": 3.98
          },
          {
            "id": 12,
            "word": "you",
            "start": 3.98,
            "end": 4.36
          },
          {
            "id": 13,
            "word": "understand,",
            "start": 4.36,
            "end": 4.58
          },
          {
            "id": 14,
            "word": "all",
            "start": 4.74,
            "end": 4.84
          },
          {
            "id": 15,
            "word": "are",
            "start": 4.84,
            "end": 5.24
          },
          {
            "id": 16,
            "word": "all",
            "start": 5.24,
            "end": 5.44
          },
          {
            "id": 17,
            "word": "toppers.",
            "start": 5.44,
            "end": 5.94
          },
          {
            "id": 18,
            "word": "I'm",
            "start": 7.96,
            "end": 8.56
          },
          {
            "id": 19,
            "word": "a",
            "start": 8.56,
            "end": 8.56
          },
          {
            "id": 20,
            "word": "intern.",
            "start": 8.56,
            "end": 9.0
          },
          {
            "id": 21,
            "word": "I",
            "start": 11.0,
            "end": 11.6
          },
          {
            "id": 22,
            "word": "won't",
            "start": 11.6,
            "end": 11.68
          },
          {
            "id": 23,
            "word": "do",
            "start": 11.68,
            "end": 11.68
          },
          {
            "id": 24,
            "word": "it",
            "start": 11.68,
            "end": 11.84
          },
          {
            "id": 25,
            "word": "with",
            "start": 11.84,
            "end": 12.46
          },
          {
            "id": 26,
            "word": "them.",
            "start": 12.46,
            "end": 12.46
          },
          {
            "id": 27,
            "word": "That's",
            "start": 13.84,
            "end": 14.24
          },
          {
            "id": 28,
            "word": "my",
            "start": 14.24,
            "end": 14.24
          },
          {
            "id": 29,
            "word": "first",
            "start": 14.24,
            "end": 14.52
          },
          {
            "id": 30,
            "word": "night",
            "start": 14.52,
            "end": 14.74
          },
          {
            "id": 31,
            "word": "that",
            "start": 14.74,
            "end": 15.02
          },
          {
            "id": 32,
            "word": "you're",
            "start": 15.02,
            "end": 15.26
          },
          {
            "id": 33,
            "word": "taking",
            "start": 15.26,
            "end": 15.44
          },
          {
            "id": 34,
            "word": "work",
            "start": 15.44,
            "end": 15.86
          },
          {
            "id": 35,
            "word": "there",
            "start": 15.86,
            "end": 15.98
          },
          {
            "id": 36,
            "word": "on",
            "start": 15.98,
            "end": 16.08
          },
          {
            "id": 37,
            "word": "certain",
            "start": 16.08,
            "end": 16.18
          },
          {
            "id": 38,
            "word": "news",
            "start": 16.18,
            "end": 16.26
          },
          {
            "id": 39,
            "word": "while",
            "start": 16.26,
            "end": 16.38
          },
          {
            "id": 40,
            "word": "there.",
            "start": 16.38,
            "end": 16.64
          },
          {
            "id": 41,
            "word": "And",
            "start": 17.64,
            "end": 18.04
          },
          {
            "id": 42,
            "word": "that's",
            "start": 18.04,
            "end": 18.12
          },
          {
            "id": 43,
            "word": "how",
            "start": 18.12,
            "end": 18.3
          },
          {
            "id": 44,
            "word": "you've",
            "start": 18.3,
            "end": 18.44
          },
          {
            "id": 45,
            "word": "seen",
            "start": 18.44,
            "end": 18.44
          },
          {
            "id": 46,
            "word": "me",
            "start": 18.44,
            "end": 18.5
          },
          {
            "id": 47,
            "word": "every",
            "start": 18.5,
            "end": 19.0
          },
          {
            "id": 48,
            "word": "day.",
            "start": 19.0,
            "end": 19.18
          },
          {
            "id": 49,
            "word": "Yes,",
            "start": 19.74,
            "end": 20.14
          },
          {
            "id": 50,
            "word": "what",
            "start": 20.28,
            "end": 20.46
          },
          {
            "id": 51,
            "word": "are",
            "start": 20.46,
            "end": 20.48
          },
          {
            "id": 52,
            "word": "you",
            "start": 20.48,
            "end": 20.72
          },
          {
            "id": 53,
            "word": "doing",
            "start": 20.72,
            "end": 20.76
          },
          {
            "id": 54,
            "word": "or",
            "start": 20.76,
            "end": 20.76
          },
          {
            "id": 55,
            "word": "what",
            "start": 20.76,
            "end": 20.88
          },
          {
            "id": 56,
            "word": "are",
            "start": 20.88,
            "end": 20.96
          },
          {
            "id": 57,
            "word": "you",
            "start": 20.96,
            "end": 21.18
          },
          {
            "id": 58,
            "word": "doing?",
            "start": 21.18,
            "end": 21.46
          },
          {
            "id": 59,
            "word": "People",
            "start": 21.64,
            "end": 21.84
          },
          {
            "id": 60,
            "word": "are",
            "start": 21.84,
            "end": 22.04
          },
          {
            "id": 61,
            "word": "telling",
            "start": 22.04,
            "end": 22.14
          },
          {
            "id": 62,
            "word": "me",
            "start": 22.14,
            "end": 22.3
          },
          {
            "id": 63,
            "word": "that",
            "start": 22.3,
            "end": 22.5
          },
          {
            "id": 64,
            "word": "I'm",
            "start": 22.5,
            "end": 22.68
          },
          {
            "id": 65,
            "word": "murdering",
            "start": 22.68,
            "end": 23.14
          },
          {
            "id": 66,
            "word": "that.",
            "start": 23.14,
            "end": 23.48
          },
          {
            "id": 67,
            "word": "And",
            "start": 23.64,
            "end": 23.94
          },
          {
            "id": 68,
            "word": "he",
            "start": 23.94,
            "end": 24.02
          },
          {
            "id": 69,
            "word": "said,",
            "start": 24.02,
            "end": 24.04
          },
          {
            "id": 70,
            "word": "15",
            "start": 24.06,
            "end": 25.08
          },
          {
            "id": 71,
            "word": "full",
            "start": 25.08,
            "end": 25.36
          },
          {
            "id": 72,
            "word": "to",
            "start": 25.36,
            "end": 25.54
          },
          {
            "id": 73,
            "word": "6",
            "start": 25.54,
            "end": 25.66
          },
          {
            "id": 74,
            "word": "men.",
            "start": 25.66,
            "end": 25.94
          },
          {
            "id": 75,
            "word": "Now",
            "start": 27.88,
            "end": 28.28
          },
          {
            "id": 76,
            "word": "that's",
            "start": 28.28,
            "end": 28.48
          },
          {
            "id": 77,
            "word": "more",
            "start": 28.48,
            "end": 28.64
          },
          {
            "id": 78,
            "word": "better",
            "start": 28.64,
            "end": 28.68
          },
          {
            "id": 79,
            "word": "chicken",
            "start": 28.68,
            "end": 28.92
          },
          {
            "id": 80,
            "word": "such",
            "start": 28.92,
            "end": 29.28
          },
          {
            "id": 81,
            "word": "as",
            "start": 29.28,
            "end": 29.62
          },
          {
            "id": 82,
            "word": "myself.",
            "start": 29.62,
            "end": 29.62
          },
          {
            "id": 83,
            "word": "That's",
            "start": 30.98,
            "end": 31.3
          },
          {
            "id": 84,
            "word": "how",
            "start": 31.3,
            "end": 31.32
          },
          {
            "id": 85,
            "word": "it",
            "start": 31.32,
            "end": 31.38
          },
          {
            "id": 86,
            "word": "went",
            "start": 31.38,
            "end": 31.72
          },
          {
            "id": 87,
            "word": "with",
            "start": 31.72,
            "end": 31.82
          },
          {
            "id": 88,
            "word": "one",
            "start": 31.82,
            "end": 31.88
          },
          {
            "id": 89,
            "word": "pair",
            "start": 31.88,
            "end": 32.04
          },
          {
            "id": 90,
            "word": "of",
            "start": 32.04,
            "end": 32.14
          },
          {
            "id": 91,
            "word": "vosks.",
            "start": 32.14,
            "end": 32.34
          },
          {
            "id": 92,
            "word": "He",
            "start": 34.58,
            "end": 34.98
          },
          {
            "id": 93,
            "word": "said,",
            "start": 34.98,
            "end": 35.02
          },
          {
            "id": 94,
            "word": "you've",
            "start": 35.06,
            "end": 35.3
          },
          {
            "id": 95,
            "word": "made",
            "start": 35.3,
            "end": 35.42
          },
          {
            "id": 96,
            "word": "Dannieabai",
            "start": 35.42,
            "end": 36.36
          },
          {
            "id": 97,
            "word": "kidney?",
            "start": 36.36,
            "end": 36.82
          },
          {
            "id": 98,
            "word": "d\u00e1'm",
            "start": 38.36,
            "end": 38.76
          },
          {
            "id": 99,
            "word": "entrepreneur.",
            "start": 38.76,
            "end": 39.1
          },
          {
            "id": 100,
            "word": "I",
            "start": 42.4,
            "end": 42.8
          },
          {
            "id": 101,
            "word": "like",
            "start": 42.8,
            "end": 43.0
          },
          {
            "id": 102,
            "word": "it.",
            "start": 43.0,
            "end": 43.2
          }
        ],
        "fullText": "I don't know how to go to jail. And especially if you understand, all are all toppers. I'm a intern. I won't do it with them. That's my first night that you're taking work there on certain news while there. And that's how you've seen me every day. Yes, what are you doing or what are you doing? People are telling me that I'm murdering that. And he said, 15 full to 6 men. Now that's more better chicken such as myself. That's how it went with one pair of vosks. He said, you've made Dannieabai kidney? d\u00e1'm entrepreneur. I like it.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-aakash",
        "watermarkHandle": "@aakashgupta",
        "copy": {
          "youtubeTitle": "I don't know how to go to jail #shorts",
          "youtubeDescription": "I don't know how to go to jail. And especially if you understand, all are all toppers. I'm a intern. I won't do it with them. That's my first night that you're taking work there on certain news while there. And that's how you've seen me every day. Yes, what are you doing or what are you doing? People are telling me that I'm murdering that. And he said, 15 full to 6 men. Now that's more better chicken such as myself. That's how it went with one pair of vosks. He said, you've made Dannieabai kidney? d\u00e1'm entrepreneur. I like it.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "I don't know how to go to jail. And especially if you understand, all are all toppers. I'm a intern. I won't do it with them. That's my first night that you're taking work there on... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-aakash-4",
        "index": 4,
        "title": "Important Topic Breakdown",
        "startTime": 1676.22,
        "endTime": 1715.92,
        "duration": 39.7,
        "viralityScore": 80,
        "factors": {
          "hook": 63,
          "acoustics": 85,
          "pace": 100,
          "payoff": 65,
          "sentiment": 97,
          "duration": 94
        },
        "status": "approved",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_04_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_04_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "Listen.",
            "start": 0.0,
            "end": 0.36
          },
          {
            "id": 2,
            "word": "You've",
            "start": 0.8,
            "end": 1.16
          },
          {
            "id": 3,
            "word": "cut",
            "start": 1.16,
            "end": 1.22
          },
          {
            "id": 4,
            "word": "our",
            "start": 1.22,
            "end": 1.54
          },
          {
            "id": 5,
            "word": "tongue.",
            "start": 1.54,
            "end": 1.86
          },
          {
            "id": 6,
            "word": "This",
            "start": 4.98,
            "end": 5.34
          },
          {
            "id": 7,
            "word": "is",
            "start": 5.34,
            "end": 5.44
          },
          {
            "id": 8,
            "word": "it,",
            "start": 5.44,
            "end": 5.46
          },
          {
            "id": 9,
            "word": "brother.",
            "start": 5.5,
            "end": 5.66
          },
          {
            "id": 10,
            "word": "I",
            "start": 7.04,
            "end": 7.4
          },
          {
            "id": 11,
            "word": "asked",
            "start": 7.4,
            "end": 7.66
          },
          {
            "id": 12,
            "word": "others",
            "start": 7.66,
            "end": 8.02
          },
          {
            "id": 13,
            "word": "to",
            "start": 8.02,
            "end": 8.24
          },
          {
            "id": 14,
            "word": "say,",
            "start": 8.24,
            "end": 8.26
          },
          {
            "id": 15,
            "word": "You",
            "start": 8.28,
            "end": 8.46
          },
          {
            "id": 16,
            "word": "go",
            "start": 8.46,
            "end": 8.5
          },
          {
            "id": 17,
            "word": "to",
            "start": 8.5,
            "end": 8.54
          },
          {
            "id": 18,
            "word": "the",
            "start": 8.54,
            "end": 8.6
          },
          {
            "id": 19,
            "word": "rickshaw.",
            "start": 8.6,
            "end": 8.76
          },
          {
            "id": 20,
            "word": "What",
            "start": 9.04,
            "end": 9.18
          },
          {
            "id": 21,
            "word": "are",
            "start": 9.18,
            "end": 9.28
          },
          {
            "id": 22,
            "word": "you",
            "start": 9.28,
            "end": 9.48
          },
          {
            "id": 23,
            "word": "listening",
            "start": 9.48,
            "end": 9.52
          },
          {
            "id": 24,
            "word": "to?",
            "start": 9.52,
            "end": 10.32
          },
          {
            "id": 25,
            "word": "I'll",
            "start": 10.46,
            "end": 10.82
          },
          {
            "id": 26,
            "word": "go",
            "start": 10.82,
            "end": 10.82
          },
          {
            "id": 27,
            "word": "to",
            "start": 10.82,
            "end": 10.82
          },
          {
            "id": 28,
            "word": "the",
            "start": 10.82,
            "end": 10.82
          },
          {
            "id": 29,
            "word": "rickshaw.",
            "start": 10.82,
            "end": 10.9
          },
          {
            "id": 30,
            "word": "I'll",
            "start": 11.06,
            "end": 11.14
          },
          {
            "id": 31,
            "word": "go",
            "start": 11.14,
            "end": 11.24
          },
          {
            "id": 32,
            "word": "to",
            "start": 11.24,
            "end": 11.3
          },
          {
            "id": 33,
            "word": "your",
            "start": 11.3,
            "end": 11.46
          },
          {
            "id": 34,
            "word": "mother.",
            "start": 11.46,
            "end": 11.62
          },
          {
            "id": 35,
            "word": "I've",
            "start": 15.78,
            "end": 16.14
          },
          {
            "id": 36,
            "word": "been",
            "start": 16.14,
            "end": 16.18
          },
          {
            "id": 37,
            "word": "in",
            "start": 16.18,
            "end": 16.18
          },
          {
            "id": 38,
            "word": "that",
            "start": 16.18,
            "end": 16.18
          },
          {
            "id": 39,
            "word": "house",
            "start": 16.18,
            "end": 16.18
          },
          {
            "id": 40,
            "word": "many",
            "start": 16.18,
            "end": 16.2
          },
          {
            "id": 41,
            "word": "years.",
            "start": 16.2,
            "end": 16.52
          },
          {
            "id": 42,
            "word": "We",
            "start": 17.86,
            "end": 18.22
          },
          {
            "id": 43,
            "word": "went",
            "start": 18.22,
            "end": 18.28
          },
          {
            "id": 44,
            "word": "there.",
            "start": 18.28,
            "end": 18.8
          },
          {
            "id": 45,
            "word": "We",
            "start": 19.54,
            "end": 19.98
          },
          {
            "id": 46,
            "word": "made",
            "start": 19.98,
            "end": 20.06
          },
          {
            "id": 47,
            "word": "a",
            "start": 20.06,
            "end": 20.18
          },
          {
            "id": 48,
            "word": "toxic",
            "start": 20.18,
            "end": 20.56
          },
          {
            "id": 49,
            "word": "relation",
            "start": 20.56,
            "end": 21.0
          },
          {
            "id": 50,
            "word": "with",
            "start": 22.22,
            "end": 22.66
          },
          {
            "id": 51,
            "word": "the",
            "start": 22.66,
            "end": 22.74
          },
          {
            "id": 52,
            "word": "Tihar",
            "start": 22.74,
            "end": 22.9
          },
          {
            "id": 53,
            "word": "jail.",
            "start": 22.9,
            "end": 23.1
          },
          {
            "id": 54,
            "word": "I",
            "start": 23.92,
            "end": 24.36
          },
          {
            "id": 55,
            "word": "was",
            "start": 24.36,
            "end": 24.44
          },
          {
            "id": 56,
            "word": "going",
            "start": 24.44,
            "end": 24.56
          },
          {
            "id": 57,
            "word": "to",
            "start": 24.56,
            "end": 24.62
          },
          {
            "id": 58,
            "word": "see",
            "start": 24.62,
            "end": 25.02
          },
          {
            "id": 59,
            "word": "what's",
            "start": 25.02,
            "end": 25.3
          },
          {
            "id": 60,
            "word": "going",
            "start": 25.3,
            "end": 25.46
          },
          {
            "id": 61,
            "word": "on.",
            "start": 25.46,
            "end": 25.74
          },
          {
            "id": 62,
            "word": "Now",
            "start": 27.28,
            "end": 27.72
          },
          {
            "id": 63,
            "word": "it's",
            "start": 27.72,
            "end": 27.82
          },
          {
            "id": 64,
            "word": "a",
            "start": 27.82,
            "end": 27.84
          },
          {
            "id": 65,
            "word": "very",
            "start": 27.84,
            "end": 27.96
          },
          {
            "id": 66,
            "word": "modern",
            "start": 27.96,
            "end": 28.26
          },
          {
            "id": 67,
            "word": "jail.",
            "start": 28.26,
            "end": 28.46
          },
          {
            "id": 68,
            "word": "I",
            "start": 28.78,
            "end": 28.78
          },
          {
            "id": 69,
            "word": "think",
            "start": 28.78,
            "end": 29.18
          },
          {
            "id": 70,
            "word": "you",
            "start": 29.18,
            "end": 29.8
          },
          {
            "id": 71,
            "word": "can",
            "start": 29.8,
            "end": 30.1
          },
          {
            "id": 72,
            "word": "go",
            "start": 30.1,
            "end": 30.12
          },
          {
            "id": 73,
            "word": "and",
            "start": 30.12,
            "end": 30.28
          },
          {
            "id": 74,
            "word": "see.",
            "start": 30.28,
            "end": 30.42
          },
          {
            "id": 75,
            "word": "If",
            "start": 30.66,
            "end": 30.7
          },
          {
            "id": 76,
            "word": "you",
            "start": 30.7,
            "end": 30.72
          },
          {
            "id": 77,
            "word": "go",
            "start": 30.72,
            "end": 30.72
          },
          {
            "id": 78,
            "word": "to",
            "start": 30.72,
            "end": 30.72
          },
          {
            "id": 79,
            "word": "Delhi,",
            "start": 30.72,
            "end": 30.78
          },
          {
            "id": 80,
            "word": "you",
            "start": 31.64,
            "end": 32.08
          },
          {
            "id": 81,
            "word": "don't",
            "start": 32.08,
            "end": 32.52
          },
          {
            "id": 82,
            "word": "have",
            "start": 32.52,
            "end": 32.52
          },
          {
            "id": 83,
            "word": "to",
            "start": 32.52,
            "end": 32.68
          },
          {
            "id": 84,
            "word": "go",
            "start": 32.68,
            "end": 32.74
          },
          {
            "id": 85,
            "word": "to",
            "start": 32.74,
            "end": 32.74
          },
          {
            "id": 86,
            "word": "jail.",
            "start": 32.74,
            "end": 32.74
          },
          {
            "id": 87,
            "word": "They",
            "start": 33.58,
            "end": 34.02
          },
          {
            "id": 88,
            "word": "go",
            "start": 34.02,
            "end": 34.02
          },
          {
            "id": 89,
            "word": "to",
            "start": 34.02,
            "end": 34.02
          },
          {
            "id": 90,
            "word": "the",
            "start": 34.02,
            "end": 34.02
          },
          {
            "id": 91,
            "word": "rickshaw.",
            "start": 34.02,
            "end": 34.42
          },
          {
            "id": 92,
            "word": "They'll",
            "start": 34.54,
            "end": 34.56
          },
          {
            "id": 93,
            "word": "Google",
            "start": 34.56,
            "end": 34.76
          },
          {
            "id": 94,
            "word": "it.",
            "start": 34.76,
            "end": 35.04
          },
          {
            "id": 95,
            "word": "They",
            "start": 35.5,
            "end": 35.8
          },
          {
            "id": 96,
            "word": "know",
            "start": 35.8,
            "end": 36.02
          },
          {
            "id": 97,
            "word": "what's",
            "start": 36.02,
            "end": 36.52
          },
          {
            "id": 98,
            "word": "going",
            "start": 36.52,
            "end": 36.52
          },
          {
            "id": 99,
            "word": "on.",
            "start": 36.52,
            "end": 36.62
          },
          {
            "id": 100,
            "word": "There's",
            "start": 36.74,
            "end": 36.9
          },
          {
            "id": 101,
            "word": "a",
            "start": 36.9,
            "end": 36.96
          },
          {
            "id": 102,
            "word": "main",
            "start": 36.96,
            "end": 38.3
          },
          {
            "id": 103,
            "word": "road.",
            "start": 38.3,
            "end": 38.52
          },
          {
            "id": 104,
            "word": "Jail",
            "start": 39.06,
            "end": 39.5
          },
          {
            "id": 105,
            "word": "Road.",
            "start": 39.5,
            "end": 39.7
          }
        ],
        "fullText": "Listen. You've cut our tongue. This is it, brother. I asked others to say, You go to the rickshaw. What are you listening to? I'll go to the rickshaw. I'll go to your mother. I've been in that house many years. We went there. We made a toxic relation with the Tihar jail. I was going to see what's going on. Now it's a very modern jail. I think you can go and see. If you go to Delhi, you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-aakash",
        "watermarkHandle": "@aakashgupta",
        "copy": {
          "youtubeTitle": "Important Topic Breakdown #shorts",
          "youtubeDescription": "Listen. You've cut our tongue. This is it, brother. I asked others to say, You go to the rickshaw. What are you listening to? I'll go to the rickshaw. I'll go to your mother. I've been in that house many years. We went there. We made a toxic relation with the Tihar jail. I was going to see what's going on. Now it's a very modern jail. I think you can go and see. If you go to Delhi, you don't have to go to jail. They go to the rickshaw. They'll Google it. They know what's going on. There's a main road. Jail Road.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "Listen. You've cut our tongue. This is it, brother. I asked others to say, You go to the rickshaw. What are you listening to? I'll go to the rickshaw. I'll go to your mother. I've ... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-aakash-5",
        "index": 5,
        "title": "Do you know Tihar jail",
        "startTime": 169.84,
        "endTime": 211.18,
        "duration": 41.34,
        "viralityScore": 76,
        "factors": {
          "hook": 51,
          "acoustics": 81,
          "pace": 100,
          "payoff": 65,
          "sentiment": 100,
          "duration": 98
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_05_engaging_moment_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/d452da5e429e2d80_Tihar%20Jail%20%EF%BD%9C%20Aakash%20Gupta%20%EF%BD%9C%20Stand-up%20Comedy/clip_05_engaging_moment.mp4",
        "words": [
          {
            "id": 1,
            "word": "Do",
            "start": 0.0,
            "end": 0.56
          },
          {
            "id": 2,
            "word": "you",
            "start": 0.56,
            "end": 0.7
          },
          {
            "id": 3,
            "word": "know",
            "start": 0.7,
            "end": 0.7
          },
          {
            "id": 4,
            "word": "Tihar",
            "start": 0.7,
            "end": 1.22
          },
          {
            "id": 5,
            "word": "jail?",
            "start": 1.22,
            "end": 1.38
          },
          {
            "id": 6,
            "word": "Yes.",
            "start": 1.56,
            "end": 1.82
          },
          {
            "id": 7,
            "word": "I'll",
            "start": 2.26,
            "end": 2.5
          },
          {
            "id": 8,
            "word": "tell",
            "start": 2.5,
            "end": 2.5
          },
          {
            "id": 9,
            "word": "you.",
            "start": 2.5,
            "end": 3.6
          },
          {
            "id": 10,
            "word": "It's",
            "start": 4.12,
            "end": 4.68
          },
          {
            "id": 11,
            "word": "the",
            "start": 4.68,
            "end": 4.68
          },
          {
            "id": 12,
            "word": "biggest",
            "start": 4.68,
            "end": 4.9
          },
          {
            "id": 13,
            "word": "jail",
            "start": 4.9,
            "end": 5.34
          },
          {
            "id": 14,
            "word": "of",
            "start": 5.34,
            "end": 5.4
          },
          {
            "id": 15,
            "word": "India.",
            "start": 5.4,
            "end": 5.4
          },
          {
            "id": 16,
            "word": "They've",
            "start": 5.96,
            "end": 6.44
          },
          {
            "id": 17,
            "word": "made",
            "start": 6.44,
            "end": 6.58
          },
          {
            "id": 18,
            "word": "it",
            "start": 6.58,
            "end": 6.58
          },
          {
            "id": 19,
            "word": "in",
            "start": 6.58,
            "end": 6.58
          },
          {
            "id": 20,
            "word": "the",
            "start": 6.58,
            "end": 6.62
          },
          {
            "id": 21,
            "word": "middle",
            "start": 6.62,
            "end": 6.8
          },
          {
            "id": 22,
            "word": "of",
            "start": 6.8,
            "end": 6.9
          },
          {
            "id": 23,
            "word": "the",
            "start": 6.9,
            "end": 7.28
          },
          {
            "id": 24,
            "word": "residential",
            "start": 7.28,
            "end": 7.52
          },
          {
            "id": 25,
            "word": "area.",
            "start": 7.52,
            "end": 7.94
          },
          {
            "id": 26,
            "word": "The",
            "start": 10.06,
            "end": 10.62
          },
          {
            "id": 27,
            "word": "jail",
            "start": 10.62,
            "end": 10.62
          },
          {
            "id": 28,
            "word": "is",
            "start": 10.62,
            "end": 10.62
          },
          {
            "id": 29,
            "word": "in",
            "start": 10.62,
            "end": 10.64
          },
          {
            "id": 30,
            "word": "the",
            "start": 10.64,
            "end": 10.7
          },
          {
            "id": 31,
            "word": "four",
            "start": 10.7,
            "end": 10.82
          },
          {
            "id": 32,
            "word": "sides.",
            "start": 10.82,
            "end": 11.06
          },
          {
            "id": 33,
            "word": "It",
            "start": 12.18,
            "end": 12.74
          },
          {
            "id": 34,
            "word": "was",
            "start": 12.74,
            "end": 12.74
          },
          {
            "id": 35,
            "word": "my",
            "start": 12.74,
            "end": 12.82
          },
          {
            "id": 36,
            "word": "sister.",
            "start": 12.82,
            "end": 13.12
          },
          {
            "id": 37,
            "word": "You",
            "start": 14.9,
            "end": 15.46
          },
          {
            "id": 38,
            "word": "know,",
            "start": 15.46,
            "end": 15.52
          },
          {
            "id": 39,
            "word": "the",
            "start": 15.9,
            "end": 16.18
          },
          {
            "id": 40,
            "word": "magnitude",
            "start": 16.18,
            "end": 16.58
          },
          {
            "id": 41,
            "word": "of",
            "start": 16.58,
            "end": 16.88
          },
          {
            "id": 42,
            "word": "the",
            "start": 16.88,
            "end": 16.94
          },
          {
            "id": 43,
            "word": "jail,",
            "start": 16.94,
            "end": 17.06
          },
          {
            "id": 44,
            "word": "the",
            "start": 17.18,
            "end": 17.24
          },
          {
            "id": 45,
            "word": "biggest",
            "start": 17.24,
            "end": 17.52
          },
          {
            "id": 46,
            "word": "jail.",
            "start": 17.52,
            "end": 17.8
          },
          {
            "id": 47,
            "word": "If",
            "start": 17.92,
            "end": 17.98
          },
          {
            "id": 48,
            "word": "it's",
            "start": 17.98,
            "end": 17.98
          },
          {
            "id": 49,
            "word": "in",
            "start": 17.98,
            "end": 18.46
          },
          {
            "id": 50,
            "word": "a",
            "start": 18.46,
            "end": 18.52
          },
          {
            "id": 51,
            "word": "country,",
            "start": 18.52,
            "end": 18.98
          },
          {
            "id": 52,
            "word": "they",
            "start": 19.26,
            "end": 19.48
          },
          {
            "id": 53,
            "word": "make",
            "start": 19.48,
            "end": 19.94
          },
          {
            "id": 54,
            "word": "it",
            "start": 19.94,
            "end": 20.38
          },
          {
            "id": 55,
            "word": "out",
            "start": 20.38,
            "end": 20.52
          },
          {
            "id": 56,
            "word": "of",
            "start": 20.52,
            "end": 21.1
          },
          {
            "id": 57,
            "word": "the",
            "start": 21.1,
            "end": 21.1
          },
          {
            "id": 58,
            "word": "city.",
            "start": 21.1,
            "end": 21.1
          },
          {
            "id": 59,
            "word": "In",
            "start": 21.1,
            "end": 21.8
          },
          {
            "id": 60,
            "word": "a",
            "start": 21.8,
            "end": 21.92
          },
          {
            "id": 61,
            "word": "water",
            "start": 21.92,
            "end": 22.16
          },
          {
            "id": 62,
            "word": "body.",
            "start": 22.16,
            "end": 22.42
          },
          {
            "id": 63,
            "word": "In",
            "start": 22.72,
            "end": 22.72
          },
          {
            "id": 64,
            "word": "a",
            "start": 22.72,
            "end": 22.72
          },
          {
            "id": 65,
            "word": "water",
            "start": 22.72,
            "end": 22.72
          },
          {
            "id": 66,
            "word": "body.",
            "start": 22.72,
            "end": 22.74
          },
          {
            "id": 67,
            "word": "Tihar?",
            "start": 23.48,
            "end": 24.0
          },
          {
            "id": 68,
            "word": "They",
            "start": 24.26,
            "end": 24.7
          },
          {
            "id": 69,
            "word": "were",
            "start": 24.7,
            "end": 24.7
          },
          {
            "id": 70,
            "word": "like",
            "start": 24.7,
            "end": 24.7
          },
          {
            "id": 71,
            "word": "my",
            "start": 24.7,
            "end": 24.7
          },
          {
            "id": 72,
            "word": "balcony.",
            "start": 24.7,
            "end": 25.06
          },
          {
            "id": 73,
            "word": "That",
            "start": 27.68,
            "end": 28.2
          },
          {
            "id": 74,
            "word": "whole",
            "start": 28.2,
            "end": 28.22
          },
          {
            "id": 75,
            "word": "jail",
            "start": 28.22,
            "end": 28.4
          },
          {
            "id": 76,
            "word": "campus",
            "start": 28.4,
            "end": 28.92
          },
          {
            "id": 77,
            "word": "was",
            "start": 28.92,
            "end": 29.06
          },
          {
            "id": 78,
            "word": "the",
            "start": 29.06,
            "end": 29.06
          },
          {
            "id": 79,
            "word": "whole.",
            "start": 29.06,
            "end": 29.24
          },
          {
            "id": 80,
            "word": "Complex,",
            "start": 33.12,
            "end": 33.64
          },
          {
            "id": 81,
            "word": "whatever.",
            "start": 33.86,
            "end": 34.0
          },
          {
            "id": 82,
            "word": "You",
            "start": 35.76,
            "end": 36.16
          },
          {
            "id": 83,
            "word": "understand?",
            "start": 36.16,
            "end": 36.22
          },
          {
            "id": 84,
            "word": "I",
            "start": 36.62,
            "end": 36.78
          },
          {
            "id": 85,
            "word": "mean,",
            "start": 36.78,
            "end": 36.78
          },
          {
            "id": 86,
            "word": "I",
            "start": 36.98,
            "end": 37.12
          },
          {
            "id": 87,
            "word": "didn't",
            "start": 37.12,
            "end": 37.44
          },
          {
            "id": 88,
            "word": "see",
            "start": 37.44,
            "end": 37.6
          },
          {
            "id": 89,
            "word": "my",
            "start": 37.6,
            "end": 37.82
          },
          {
            "id": 90,
            "word": "balcony",
            "start": 37.82,
            "end": 38.14
          },
          {
            "id": 91,
            "word": "balcony",
            "start": 38.14,
            "end": 38.14
          },
          {
            "id": 92,
            "word": "from",
            "start": 38.14,
            "end": 38.14
          },
          {
            "id": 93,
            "word": "my",
            "start": 38.14,
            "end": 38.14
          },
          {
            "id": 94,
            "word": "balcony.",
            "start": 38.14,
            "end": 38.24
          },
          {
            "id": 95,
            "word": "The",
            "start": 38.5,
            "end": 38.64
          },
          {
            "id": 96,
            "word": "people.",
            "start": 38.64,
            "end": 38.84
          },
          {
            "id": 97,
            "word": "I'm",
            "start": 39.66,
            "end": 40.18
          },
          {
            "id": 98,
            "word": "standing",
            "start": 40.18,
            "end": 40.26
          },
          {
            "id": 99,
            "word": "in",
            "start": 40.26,
            "end": 40.26
          },
          {
            "id": 100,
            "word": "the",
            "start": 40.26,
            "end": 40.3
          },
          {
            "id": 101,
            "word": "balcony,",
            "start": 40.3,
            "end": 40.52
          },
          {
            "id": 102,
            "word": "and",
            "start": 40.96,
            "end": 40.96
          },
          {
            "id": 103,
            "word": "there",
            "start": 40.96,
            "end": 41.04
          },
          {
            "id": 104,
            "word": "are",
            "start": 41.04,
            "end": 41.08
          },
          {
            "id": 105,
            "word": "caddies.",
            "start": 41.08,
            "end": 41.34
          }
        ],
        "fullText": "Do you know Tihar jail? Yes. I'll tell you. It's the biggest jail of India. They've made it in the middle of the residential area. The jail is in the four sides. It was my sister. You know, the magnitude of the jail, the biggest jail. If it's in a country, they make it out of the city. In a water body. In a water body. Tihar? They were like my balcony. That whole jail campus was the whole. Complex, whatever. You understand? I mean, I didn't see my balcony balcony from my balcony. The people. I'm standing in the balcony, and there are caddies.",
        "captionStyle": "hormozi",
        "brandKitId": "bk-aakash",
        "watermarkHandle": "@aakashgupta",
        "copy": {
          "youtubeTitle": "Do you know Tihar jail #shorts",
          "youtubeDescription": "Do you know Tihar jail? Yes. I'll tell you. It's the biggest jail of India. They've made it in the middle of the residential area. The jail is in the four sides. It was my sister. You know, the magnitude of the jail, the biggest jail. If it's in a country, they make it out of the city. In a water body. In a water body. Tihar? They were like my balcony. That whole jail campus was the whole. Complex, whatever. You understand? I mean, I didn't see my balcony balcony from my balcony. The people. I'm standing in the balcony, and there are caddies.\n\nFrom Tihar Jail \u2014 Aakash Gupta (Stand-up Comedy). Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "Do you know Tihar jail? Yes. I'll tell you. It's the biggest jail of India. They've made it in the middle of the residential area. The jail is in the four sides. It was my sister. ... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      }
    ]
  },
  {
    "id": "proj-mrbeast",
    "title": "Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast",
    "source": "https://youtube.com/watch?v=eff6534ca9eef1b4",
    "sourceType": "youtube",
    "rightsConfirmed": true,
    "status": "completed",
    "createdAt": "2026-11-10T12:00:00Z",
    "durationSec": 1540,
    "clipsCount": 6,
    "avgScore": 68.2,
    "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_01_direct_attention_grabber_hold__thumb_1.jpg",
    "clips": [
      {
        "id": "proj-mrbeast-1",
        "index": 1,
        "title": "Hold on",
        "startTime": 393.88,
        "endTime": 430.92,
        "duration": 37.04,
        "viralityScore": 71,
        "factors": {
          "hook": 63,
          "acoustics": 67,
          "pace": 97,
          "payoff": 90,
          "sentiment": 20,
          "duration": 88
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_01_direct_attention_grabber_hold__thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_01_direct_attention_grabber_hold_.mp4",
        "words": [
          {
            "id": 1,
            "word": "Hold",
            "start": 0.0,
            "end": 0.26
          },
          {
            "id": 2,
            "word": "on.",
            "start": 0.26,
            "end": 0.48
          },
          {
            "id": 3,
            "word": "Hold",
            "start": 0.72,
            "end": 0.86
          },
          {
            "id": 4,
            "word": "on.",
            "start": 0.86,
            "end": 1.02
          },
          {
            "id": 5,
            "word": "What",
            "start": 1.28,
            "end": 1.56
          },
          {
            "id": 6,
            "word": "are",
            "start": 1.56,
            "end": 1.64
          },
          {
            "id": 7,
            "word": "you",
            "start": 1.64,
            "end": 1.68
          },
          {
            "id": 8,
            "word": "doing?",
            "start": 1.68,
            "end": 1.84
          },
          {
            "id": 9,
            "word": "I'm",
            "start": 2.06,
            "end": 2.26
          },
          {
            "id": 10,
            "word": "over",
            "start": 2.26,
            "end": 2.48
          },
          {
            "id": 11,
            "word": "it.",
            "start": 2.48,
            "end": 2.62
          },
          {
            "id": 12,
            "word": "Don't",
            "start": 2.84,
            "end": 3.08
          },
          {
            "id": 13,
            "word": "care.",
            "start": 3.08,
            "end": 3.32
          },
          {
            "id": 14,
            "word": "I'm",
            "start": 3.32,
            "end": 4.18
          },
          {
            "id": 15,
            "word": "struggling.",
            "start": 4.18,
            "end": 4.78
          },
          {
            "id": 16,
            "word": "I",
            "start": 5.68,
            "end": 6.42
          },
          {
            "id": 17,
            "word": "feel",
            "start": 6.42,
            "end": 6.76
          },
          {
            "id": 18,
            "word": "awful.",
            "start": 6.76,
            "end": 7.72
          },
          {
            "id": 19,
            "word": "This",
            "start": 8.26,
            "end": 8.86
          },
          {
            "id": 20,
            "word": "sucks.",
            "start": 8.86,
            "end": 9.16
          },
          {
            "id": 21,
            "word": "I",
            "start": 10.9,
            "end": 12.1
          },
          {
            "id": 22,
            "word": "don't",
            "start": 12.1,
            "end": 12.28
          },
          {
            "id": 23,
            "word": "want",
            "start": 12.28,
            "end": 12.42
          },
          {
            "id": 24,
            "word": "to",
            "start": 12.42,
            "end": 12.52
          },
          {
            "id": 25,
            "word": "do",
            "start": 12.52,
            "end": 12.72
          },
          {
            "id": 26,
            "word": "this.",
            "start": 12.72,
            "end": 13.32
          },
          {
            "id": 27,
            "word": "Okay.",
            "start": 14.96,
            "end": 16.16
          },
          {
            "id": 28,
            "word": "What's",
            "start": 17.9,
            "end": 18.54
          },
          {
            "id": 29,
            "word": "wrong?",
            "start": 18.54,
            "end": 18.82
          },
          {
            "id": 30,
            "word": "I'm",
            "start": 19.12,
            "end": 19.52
          },
          {
            "id": 31,
            "word": "so",
            "start": 19.52,
            "end": 20.02
          },
          {
            "id": 32,
            "word": "not",
            "start": 20.02,
            "end": 20.34
          },
          {
            "id": 33,
            "word": "used",
            "start": 20.34,
            "end": 20.68
          },
          {
            "id": 34,
            "word": "to",
            "start": 20.68,
            "end": 20.92
          },
          {
            "id": 35,
            "word": "it.",
            "start": 20.92,
            "end": 21.28
          },
          {
            "id": 36,
            "word": "I've",
            "start": 22.08,
            "end": 22.72
          },
          {
            "id": 37,
            "word": "been",
            "start": 22.72,
            "end": 22.82
          },
          {
            "id": 38,
            "word": "doing",
            "start": 22.82,
            "end": 22.96
          },
          {
            "id": 39,
            "word": "this",
            "start": 22.96,
            "end": 23.18
          },
          {
            "id": 40,
            "word": "for",
            "start": 23.18,
            "end": 23.34
          },
          {
            "id": 41,
            "word": "39",
            "start": 23.34,
            "end": 23.76
          },
          {
            "id": 42,
            "word": "days",
            "start": 23.76,
            "end": 24.28
          },
          {
            "id": 43,
            "word": "after",
            "start": 24.28,
            "end": 24.92
          },
          {
            "id": 44,
            "word": "spending",
            "start": 24.92,
            "end": 25.32
          },
          {
            "id": 45,
            "word": "27",
            "start": 25.32,
            "end": 25.78
          },
          {
            "id": 46,
            "word": "years",
            "start": 25.78,
            "end": 26.58
          },
          {
            "id": 47,
            "word": "not",
            "start": 26.58,
            "end": 26.92
          },
          {
            "id": 48,
            "word": "doing",
            "start": 26.92,
            "end": 27.14
          },
          {
            "id": 49,
            "word": "any",
            "start": 27.14,
            "end": 27.56
          },
          {
            "id": 50,
            "word": "of",
            "start": 27.56,
            "end": 27.78
          },
          {
            "id": 51,
            "word": "this.",
            "start": 27.78,
            "end": 28.1
          },
          {
            "id": 52,
            "word": "Look,",
            "start": 28.54,
            "end": 28.86
          },
          {
            "id": 53,
            "word": "it",
            "start": 29.18,
            "end": 29.84
          },
          {
            "id": 54,
            "word": "is",
            "start": 29.84,
            "end": 30.04
          },
          {
            "id": 55,
            "word": "all",
            "start": 30.04,
            "end": 30.32
          },
          {
            "id": 56,
            "word": "right.",
            "start": 30.32,
            "end": 30.56
          },
          {
            "id": 57,
            "word": "We",
            "start": 30.88,
            "end": 31.38
          },
          {
            "id": 58,
            "word": "will",
            "start": 31.38,
            "end": 31.52
          },
          {
            "id": 59,
            "word": "get",
            "start": 31.52,
            "end": 31.7
          },
          {
            "id": 60,
            "word": "through",
            "start": 31.7,
            "end": 31.94
          },
          {
            "id": 61,
            "word": "this",
            "start": 31.94,
            "end": 32.34
          },
          {
            "id": 62,
            "word": "together.",
            "start": 32.34,
            "end": 32.92
          },
          {
            "id": 63,
            "word": "Just",
            "start": 33.62,
            "end": 33.76
          },
          {
            "id": 64,
            "word": "remember",
            "start": 33.76,
            "end": 34.06
          },
          {
            "id": 65,
            "word": "that.",
            "start": 34.06,
            "end": 34.3
          },
          {
            "id": 66,
            "word": "Having",
            "start": 34.5,
            "end": 34.82
          },
          {
            "id": 67,
            "word": "Trey",
            "start": 34.82,
            "end": 35.14
          },
          {
            "id": 68,
            "word": "gives",
            "start": 35.14,
            "end": 35.5
          },
          {
            "id": 69,
            "word": "me",
            "start": 35.5,
            "end": 35.68
          },
          {
            "id": 70,
            "word": "a",
            "start": 35.68,
            "end": 35.84
          },
          {
            "id": 71,
            "word": "lot",
            "start": 35.84,
            "end": 36.02
          },
          {
            "id": 72,
            "word": "more",
            "start": 36.02,
            "end": 36.4
          },
          {
            "id": 73,
            "word": "confidence.",
            "start": 36.4,
            "end": 37.04
          },
          {
            "id": 74,
            "word": "It",
            "start": 37.04,
            "end": 37.36
          }
        ],
        "fullText": "Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this. Okay. What's wrong? I'm so not used to it. I've been doing this for 39 days after spending 27 years not doing any of this. Look, it is all right. We will get through this together. Just remember that. Having Trey gives me a lot more confidence.",
        "captionStyle": "mrbeast",
        "brandKitId": "bk-mrbeast",
        "watermarkHandle": "@mrbeast",
        "copy": {
          "youtubeTitle": "Hold on #shorts",
          "youtubeDescription": "Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this. Okay. What's wrong? I'm so not used to it. I've been doing this for 39 days after spending 27 years not doing any of this. Look, it is all right. We will get through this together. Just remember that. Having Trey gives me a lot more confidence.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this. Okay. What's wrong? I'm so not used to it. I've be... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-mrbeast-2",
        "index": 2,
        "title": "Wait a minute",
        "startTime": 1371.6,
        "endTime": 1411.7,
        "duration": 40.1,
        "viralityScore": 68,
        "factors": {
          "hook": 63,
          "acoustics": 64,
          "pace": 100,
          "payoff": 65,
          "sentiment": 20,
          "duration": 95
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_02_direct_attention_grabber_wait__thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_02_direct_attention_grabber_wait_.mp4",
        "words": [
          {
            "id": 1,
            "word": "Wait",
            "start": 0.0,
            "end": 0.18
          },
          {
            "id": 2,
            "word": "a",
            "start": 0.18,
            "end": 0.44
          },
          {
            "id": 3,
            "word": "minute!",
            "start": 0.44,
            "end": 0.86
          },
          {
            "id": 4,
            "word": "Oh!",
            "start": 1.52,
            "end": 1.74
          },
          {
            "id": 5,
            "word": "My",
            "start": 2.8,
            "end": 3.28
          },
          {
            "id": 6,
            "word": "God.",
            "start": 3.28,
            "end": 3.6
          },
          {
            "id": 7,
            "word": "Oh!",
            "start": 3.88,
            "end": 4.18
          },
          {
            "id": 8,
            "word": "Yeah.",
            "start": 6.34,
            "end": 6.78
          },
          {
            "id": 9,
            "word": "Yeah.",
            "start": 7.06,
            "end": 7.42
          },
          {
            "id": 10,
            "word": "We",
            "start": 7.88,
            "end": 8.18
          },
          {
            "id": 11,
            "word": "need",
            "start": 8.18,
            "end": 8.38
          },
          {
            "id": 12,
            "word": "to",
            "start": 8.38,
            "end": 8.54
          },
          {
            "id": 13,
            "word": "do",
            "start": 8.54,
            "end": 8.72
          },
          {
            "id": 14,
            "word": "whatever",
            "start": 8.72,
            "end": 9.04
          },
          {
            "id": 15,
            "word": "it",
            "start": 9.04,
            "end": 9.24
          },
          {
            "id": 16,
            "word": "takes.",
            "start": 9.24,
            "end": 9.58
          },
          {
            "id": 17,
            "word": "With",
            "start": 9.98,
            "end": 10.26
          },
          {
            "id": 18,
            "word": "their",
            "start": 10.26,
            "end": 10.42
          },
          {
            "id": 19,
            "word": "laps",
            "start": 10.42,
            "end": 10.68
          },
          {
            "id": 20,
            "word": "doubled,",
            "start": 10.68,
            "end": 11.08
          },
          {
            "id": 21,
            "word": "they",
            "start": 11.22,
            "end": 11.44
          },
          {
            "id": 22,
            "word": "wasted",
            "start": 11.44,
            "end": 11.82
          },
          {
            "id": 23,
            "word": "no",
            "start": 11.82,
            "end": 12.14
          },
          {
            "id": 24,
            "word": "time.",
            "start": 12.14,
            "end": 12.6
          },
          {
            "id": 25,
            "word": "Rain",
            "start": 15.02,
            "end": 15.46
          },
          {
            "id": 26,
            "word": "or",
            "start": 15.46,
            "end": 15.9
          },
          {
            "id": 27,
            "word": "shot.",
            "start": 15.9,
            "end": 16.18
          },
          {
            "id": 28,
            "word": "Dang,",
            "start": 16.42,
            "end": 16.78
          },
          {
            "id": 29,
            "word": "it's",
            "start": 16.88,
            "end": 17.0
          },
          {
            "id": 30,
            "word": "hot,",
            "start": 17.0,
            "end": 17.16
          },
          {
            "id": 31,
            "word": "y",
            "start": 17.26,
            "end": 17.36
          },
          {
            "id": 32,
            "word": "'all.",
            "start": 17.36,
            "end": 17.46
          },
          {
            "id": 33,
            "word": "150,",
            "start": 19.52,
            "end": 19.96
          },
          {
            "id": 34,
            "word": "we're",
            "start": 20.04,
            "end": 20.22
          },
          {
            "id": 35,
            "word": "halfway",
            "start": 20.22,
            "end": 20.38
          },
          {
            "id": 36,
            "word": "there.",
            "start": 20.38,
            "end": 20.6
          },
          {
            "id": 37,
            "word": "Get",
            "start": 21.82,
            "end": 22.1
          },
          {
            "id": 38,
            "word": "momentum,",
            "start": 22.1,
            "end": 22.6
          },
          {
            "id": 39,
            "word": "you",
            "start": 22.6,
            "end": 23.0
          },
          {
            "id": 40,
            "word": "got",
            "start": 23.0,
            "end": 23.2
          },
          {
            "id": 41,
            "word": "it.",
            "start": 23.2,
            "end": 23.4
          },
          {
            "id": 42,
            "word": "Finish",
            "start": 23.76,
            "end": 24.14
          },
          {
            "id": 43,
            "word": "to",
            "start": 24.14,
            "end": 24.3
          },
          {
            "id": 44,
            "word": "the",
            "start": 24.3,
            "end": 24.42
          },
          {
            "id": 45,
            "word": "end,",
            "start": 24.42,
            "end": 24.54
          },
          {
            "id": 46,
            "word": "you",
            "start": 24.58,
            "end": 24.64
          },
          {
            "id": 47,
            "word": "got",
            "start": 24.64,
            "end": 24.78
          },
          {
            "id": 48,
            "word": "it,",
            "start": 24.78,
            "end": 24.86
          },
          {
            "id": 49,
            "word": "you",
            "start": 24.92,
            "end": 24.96
          },
          {
            "id": 50,
            "word": "got",
            "start": 24.96,
            "end": 25.12
          },
          {
            "id": 51,
            "word": "it.",
            "start": 25.12,
            "end": 25.26
          },
          {
            "id": 52,
            "word": "How's",
            "start": 26.82,
            "end": 27.26
          },
          {
            "id": 53,
            "word": "it",
            "start": 27.26,
            "end": 27.38
          },
          {
            "id": 54,
            "word": "going?",
            "start": 27.38,
            "end": 27.66
          },
          {
            "id": 55,
            "word": "Well,",
            "start": 28.28,
            "end": 28.72
          },
          {
            "id": 56,
            "word": "look",
            "start": 28.9,
            "end": 29.1
          },
          {
            "id": 57,
            "word": "at",
            "start": 29.1,
            "end": 29.26
          },
          {
            "id": 58,
            "word": "you",
            "start": 29.26,
            "end": 29.46
          },
          {
            "id": 59,
            "word": "two.",
            "start": 29.46,
            "end": 29.7
          },
          {
            "id": 60,
            "word": "You",
            "start": 29.96,
            "end": 30.32
          },
          {
            "id": 61,
            "word": "guys",
            "start": 30.32,
            "end": 30.5
          },
          {
            "id": 62,
            "word": "are",
            "start": 30.5,
            "end": 30.64
          },
          {
            "id": 63,
            "word": "looking",
            "start": 30.64,
            "end": 30.86
          },
          {
            "id": 64,
            "word": "way",
            "start": 30.86,
            "end": 31.2
          },
          {
            "id": 65,
            "word": "leaner.",
            "start": 31.2,
            "end": 31.74
          },
          {
            "id": 66,
            "word": "You",
            "start": 31.9,
            "end": 32.26
          },
          {
            "id": 67,
            "word": "know,",
            "start": 32.26,
            "end": 32.4
          },
          {
            "id": 68,
            "word": "I",
            "start": 32.52,
            "end": 32.64
          },
          {
            "id": 69,
            "word": "was",
            "start": 32.64,
            "end": 32.84
          },
          {
            "id": 70,
            "word": "stopping",
            "start": 32.84,
            "end": 33.04
          },
          {
            "id": 71,
            "word": "by",
            "start": 33.04,
            "end": 33.38
          },
          {
            "id": 72,
            "word": "because",
            "start": 33.38,
            "end": 33.72
          },
          {
            "id": 73,
            "word": "I",
            "start": 33.72,
            "end": 34.16
          },
          {
            "id": 74,
            "word": "was",
            "start": 34.16,
            "end": 34.16
          },
          {
            "id": 75,
            "word": "like,",
            "start": 34.16,
            "end": 34.16
          },
          {
            "id": 76,
            "word": "oh,",
            "start": 34.16,
            "end": 34.16
          },
          {
            "id": 77,
            "word": "I'm",
            "start": 34.16,
            "end": 34.16
          },
          {
            "id": 78,
            "word": "not",
            "start": 34.16,
            "end": 34.16
          },
          {
            "id": 79,
            "word": "going",
            "start": 34.16,
            "end": 34.16
          },
          {
            "id": 80,
            "word": "to",
            "start": 34.16,
            "end": 34.16
          },
          {
            "id": 81,
            "word": "do",
            "start": 34.16,
            "end": 34.16
          },
          {
            "id": 82,
            "word": "it.",
            "start": 34.16,
            "end": 34.16
          },
          {
            "id": 83,
            "word": "You",
            "start": 34.16,
            "end": 34.36
          },
          {
            "id": 84,
            "word": "know,",
            "start": 34.36,
            "end": 34.44
          },
          {
            "id": 85,
            "word": "we",
            "start": 34.58,
            "end": 34.6
          },
          {
            "id": 86,
            "word": "have",
            "start": 34.6,
            "end": 34.78
          },
          {
            "id": 87,
            "word": "two",
            "start": 34.78,
            "end": 35.02
          },
          {
            "id": 88,
            "word": "cars",
            "start": 35.02,
            "end": 35.4
          },
          {
            "id": 89,
            "word": "on",
            "start": 35.4,
            "end": 35.56
          },
          {
            "id": 90,
            "word": "the",
            "start": 35.56,
            "end": 35.64
          },
          {
            "id": 91,
            "word": "line",
            "start": 35.64,
            "end": 35.88
          },
          {
            "id": 92,
            "word": "and",
            "start": 35.88,
            "end": 36.08
          },
          {
            "id": 93,
            "word": "I",
            "start": 36.08,
            "end": 36.32
          },
          {
            "id": 94,
            "word": "didn't",
            "start": 36.32,
            "end": 36.46
          },
          {
            "id": 95,
            "word": "know",
            "start": 36.46,
            "end": 36.56
          },
          {
            "id": 96,
            "word": "if",
            "start": 36.56,
            "end": 36.7
          },
          {
            "id": 97,
            "word": "he",
            "start": 36.7,
            "end": 36.74
          },
          {
            "id": 98,
            "word": "needed",
            "start": 36.74,
            "end": 36.92
          },
          {
            "id": 99,
            "word": "some",
            "start": 36.92,
            "end": 37.08
          },
          {
            "id": 100,
            "word": "help",
            "start": 37.08,
            "end": 37.26
          },
          {
            "id": 101,
            "word": "pulling",
            "start": 37.26,
            "end": 37.76
          },
          {
            "id": 102,
            "word": "it.",
            "start": 37.76,
            "end": 38.0
          },
          {
            "id": 103,
            "word": "Will",
            "start": 38.18,
            "end": 38.54
          },
          {
            "id": 104,
            "word": "it",
            "start": 38.54,
            "end": 38.56
          },
          {
            "id": 105,
            "word": "take",
            "start": 38.56,
            "end": 38.66
          },
          {
            "id": 106,
            "word": "some",
            "start": 38.66,
            "end": 38.88
          },
          {
            "id": 107,
            "word": "help?",
            "start": 38.88,
            "end": 38.9
          },
          {
            "id": 108,
            "word": "I",
            "start": 39.02,
            "end": 39.08
          },
          {
            "id": 109,
            "word": "mean,",
            "start": 39.08,
            "end": 39.08
          },
          {
            "id": 110,
            "word": "we'll",
            "start": 39.12,
            "end": 39.26
          },
          {
            "id": 111,
            "word": "always",
            "start": 39.26,
            "end": 39.56
          },
          {
            "id": 112,
            "word": "take",
            "start": 39.56,
            "end": 39.78
          },
          {
            "id": 113,
            "word": "some",
            "start": 39.78,
            "end": 39.94
          },
          {
            "id": 114,
            "word": "help.",
            "start": 39.94,
            "end": 40.1
          }
        ],
        "fullText": "Wait a minute! Oh! My God. Oh! Yeah. Yeah. We need to do whatever it takes. With their laps doubled, they wasted no time. Rain or shot. Dang, it's hot, y 'all. 150, we're halfway there. Get momentum, you got it. Finish to the end, you got it, you got it. How's it going? Well, look at you two. You guys are looking way leaner. You know, I was stopping by because I was like, oh, I'm not going to do it. You know, we have two cars on the line and I didn't know if he needed some help pulling it. Will it take some help? I mean, we'll always take some help.",
        "captionStyle": "mrbeast",
        "brandKitId": "bk-mrbeast",
        "watermarkHandle": "@mrbeast",
        "copy": {
          "youtubeTitle": "Wait a minute #shorts",
          "youtubeDescription": "Wait a minute! Oh! My God. Oh! Yeah. Yeah. We need to do whatever it takes. With their laps doubled, they wasted no time. Rain or shot. Dang, it's hot, y 'all. 150, we're halfway there. Get momentum, you got it. Finish to the end, you got it, you got it. How's it going? Well, look at you two. You guys are looking way leaner. You know, I was stopping by because I was like, oh, I'm not going to do it. You know, we have two cars on the line and I didn't know if he needed some help pulling it. Will it take some help? I mean, we'll always take some help.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "Wait a minute! Oh! My God. Oh! Yeah. Yeah. We need to do whatever it takes. With their laps doubled, they wasted no time. Rain or shot. Dang, it's hot, y 'all. 150, we're halfway t... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-mrbeast-3",
        "index": 3,
        "title": "What does that mean?",
        "startTime": 1737.66,
        "endTime": 1788.38,
        "duration": 50.72,
        "viralityScore": 68,
        "factors": {
          "hook": 57,
          "acoustics": 65,
          "pace": 96,
          "payoff": 90,
          "sentiment": 20,
          "duration": 78
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_03_provocative_question_what_does_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_03_provocative_question_what_does.mp4",
        "words": [
          {
            "id": 1,
            "word": "What",
            "start": 0.0,
            "end": 0.3
          },
          {
            "id": 2,
            "word": "does",
            "start": 0.3,
            "end": 0.38
          },
          {
            "id": 3,
            "word": "that",
            "start": 0.38,
            "end": 0.54
          },
          {
            "id": 4,
            "word": "mean?",
            "start": 0.54,
            "end": 0.7
          },
          {
            "id": 5,
            "word": "Well,",
            "start": 1.5,
            "end": 1.96
          },
          {
            "id": 6,
            "word": "I",
            "start": 2.2,
            "end": 2.44
          },
          {
            "id": 7,
            "word": "might",
            "start": 2.44,
            "end": 2.72
          },
          {
            "id": 8,
            "word": "have",
            "start": 2.72,
            "end": 2.92
          },
          {
            "id": 9,
            "word": "built",
            "start": 2.92,
            "end": 3.3
          },
          {
            "id": 10,
            "word": "a",
            "start": 3.3,
            "end": 3.62
          },
          {
            "id": 11,
            "word": "second",
            "start": 3.62,
            "end": 4.0
          },
          {
            "id": 12,
            "word": "gym",
            "start": 4.0,
            "end": 4.34
          },
          {
            "id": 13,
            "word": "where",
            "start": 4.34,
            "end": 4.86
          },
          {
            "id": 14,
            "word": "Trey",
            "start": 4.86,
            "end": 5.78
          },
          {
            "id": 15,
            "word": "is",
            "start": 5.78,
            "end": 5.96
          },
          {
            "id": 16,
            "word": "going",
            "start": 5.96,
            "end": 6.08
          },
          {
            "id": 17,
            "word": "to",
            "start": 6.08,
            "end": 6.12
          },
          {
            "id": 18,
            "word": "be",
            "start": 6.12,
            "end": 6.2
          },
          {
            "id": 19,
            "word": "training",
            "start": 6.2,
            "end": 6.42
          },
          {
            "id": 20,
            "word": "in",
            "start": 6.42,
            "end": 6.56
          },
          {
            "id": 21,
            "word": "the",
            "start": 6.56,
            "end": 6.6
          },
          {
            "id": 22,
            "word": "next",
            "start": 6.6,
            "end": 6.76
          },
          {
            "id": 23,
            "word": "30",
            "start": 6.76,
            "end": 6.98
          },
          {
            "id": 24,
            "word": "days",
            "start": 6.98,
            "end": 7.24
          },
          {
            "id": 25,
            "word": "independent",
            "start": 7.24,
            "end": 7.6
          },
          {
            "id": 26,
            "word": "of",
            "start": 7.6,
            "end": 7.96
          },
          {
            "id": 27,
            "word": "you.",
            "start": 7.96,
            "end": 8.06
          },
          {
            "id": 28,
            "word": "I",
            "start": 9.08,
            "end": 9.44
          },
          {
            "id": 29,
            "word": "had",
            "start": 9.44,
            "end": 9.64
          },
          {
            "id": 30,
            "word": "a",
            "start": 9.64,
            "end": 9.74
          },
          {
            "id": 31,
            "word": "-",
            "start": 9.74,
            "end": 9.84
          },
          {
            "id": 32,
            "word": "Jimmy,",
            "start": 9.84,
            "end": 10.08
          },
          {
            "id": 33,
            "word": "I",
            "start": 10.22,
            "end": 10.22
          },
          {
            "id": 34,
            "word": "had",
            "start": 10.22,
            "end": 10.34
          },
          {
            "id": 35,
            "word": "a",
            "start": 10.34,
            "end": 10.44
          },
          {
            "id": 36,
            "word": "feeling.",
            "start": 10.44,
            "end": 10.82
          },
          {
            "id": 37,
            "word": "Oh,",
            "start": 11.36,
            "end": 11.72
          },
          {
            "id": 38,
            "word": "no.",
            "start": 11.72,
            "end": 12.08
          },
          {
            "id": 39,
            "word": "I'm",
            "start": 12.28,
            "end": 12.36
          },
          {
            "id": 40,
            "word": "going",
            "start": 12.36,
            "end": 12.46
          },
          {
            "id": 41,
            "word": "to",
            "start": 12.46,
            "end": 12.52
          },
          {
            "id": 42,
            "word": "cry.",
            "start": 12.52,
            "end": 12.94
          },
          {
            "id": 43,
            "word": "You",
            "start": 13.88,
            "end": 14.24
          },
          {
            "id": 44,
            "word": "got",
            "start": 14.24,
            "end": 14.38
          },
          {
            "id": 45,
            "word": "to",
            "start": 14.38,
            "end": 14.48
          },
          {
            "id": 46,
            "word": "be",
            "start": 14.48,
            "end": 14.56
          },
          {
            "id": 47,
            "word": "strong,",
            "start": 14.56,
            "end": 14.88
          },
          {
            "id": 48,
            "word": "okay?",
            "start": 15.06,
            "end": 15.18
          },
          {
            "id": 49,
            "word": "All",
            "start": 15.46,
            "end": 15.62
          },
          {
            "id": 50,
            "word": "I've",
            "start": 15.62,
            "end": 15.78
          },
          {
            "id": 51,
            "word": "been",
            "start": 15.78,
            "end": 15.88
          },
          {
            "id": 52,
            "word": "saying",
            "start": 15.88,
            "end": 16.14
          },
          {
            "id": 53,
            "word": "this",
            "start": 16.14,
            "end": 16.34
          },
          {
            "id": 54,
            "word": "whole",
            "start": 16.34,
            "end": 16.5
          },
          {
            "id": 55,
            "word": "time",
            "start": 16.5,
            "end": 16.7
          },
          {
            "id": 56,
            "word": "is",
            "start": 16.7,
            "end": 16.88
          },
          {
            "id": 57,
            "word": "that",
            "start": 16.88,
            "end": 16.98
          },
          {
            "id": 58,
            "word": "I",
            "start": 16.98,
            "end": 17.08
          },
          {
            "id": 59,
            "word": "couldn't",
            "start": 17.08,
            "end": 17.38
          },
          {
            "id": 60,
            "word": "do",
            "start": 17.38,
            "end": 17.54
          },
          {
            "id": 61,
            "word": "it",
            "start": 17.54,
            "end": 17.7
          },
          {
            "id": 62,
            "word": "without",
            "start": 17.7,
            "end": 17.92
          },
          {
            "id": 63,
            "word": "you.",
            "start": 17.92,
            "end": 18.34
          },
          {
            "id": 64,
            "word": "Yes,",
            "start": 18.34,
            "end": 18.34
          },
          {
            "id": 65,
            "word": "you",
            "start": 18.36,
            "end": 18.4
          },
          {
            "id": 66,
            "word": "did.",
            "start": 18.4,
            "end": 18.52
          },
          {
            "id": 67,
            "word": "30",
            "start": 19.48,
            "end": 19.8
          },
          {
            "id": 68,
            "word": "days,",
            "start": 19.8,
            "end": 20.16
          },
          {
            "id": 69,
            "word": "okay?",
            "start": 20.36,
            "end": 20.54
          },
          {
            "id": 70,
            "word": "You",
            "start": 20.76,
            "end": 20.94
          },
          {
            "id": 71,
            "word": "got",
            "start": 20.94,
            "end": 21.04
          },
          {
            "id": 72,
            "word": "it.",
            "start": 21.04,
            "end": 21.04
          },
          {
            "id": 73,
            "word": "You",
            "start": 21.16,
            "end": 21.42
          },
          {
            "id": 74,
            "word": "got",
            "start": 21.42,
            "end": 21.64
          },
          {
            "id": 75,
            "word": "this.",
            "start": 21.64,
            "end": 21.86
          },
          {
            "id": 76,
            "word": "You",
            "start": 21.92,
            "end": 22.06
          },
          {
            "id": 77,
            "word": "got",
            "start": 22.06,
            "end": 22.28
          },
          {
            "id": 78,
            "word": "it.",
            "start": 22.28,
            "end": 22.36
          },
          {
            "id": 79,
            "word": "You",
            "start": 22.44,
            "end": 22.56
          },
          {
            "id": 80,
            "word": "got",
            "start": 22.56,
            "end": 22.74
          },
          {
            "id": 81,
            "word": "it.",
            "start": 22.74,
            "end": 22.84
          },
          {
            "id": 82,
            "word": "There",
            "start": 23.76,
            "end": 24.12
          },
          {
            "id": 83,
            "word": "you",
            "start": 24.12,
            "end": 24.22
          },
          {
            "id": 84,
            "word": "go.",
            "start": 24.22,
            "end": 24.34
          },
          {
            "id": 85,
            "word": "And",
            "start": 24.42,
            "end": 24.48
          },
          {
            "id": 86,
            "word": "then",
            "start": 24.48,
            "end": 24.56
          },
          {
            "id": 87,
            "word": "step",
            "start": 24.56,
            "end": 24.76
          },
          {
            "id": 88,
            "word": "over.",
            "start": 24.76,
            "end": 25.02
          },
          {
            "id": 89,
            "word": "Whoa!",
            "start": 25.58,
            "end": 25.8
          },
          {
            "id": 90,
            "word": "All",
            "start": 26.58,
            "end": 26.72
          },
          {
            "id": 91,
            "word": "right,",
            "start": 26.72,
            "end": 26.8
          },
          {
            "id": 92,
            "word": "Darius,",
            "start": 26.88,
            "end": 27.12
          },
          {
            "id": 93,
            "word": "cover",
            "start": 27.28,
            "end": 27.48
          },
          {
            "id": 94,
            "word": "it",
            "start": 27.48,
            "end": 27.6
          },
          {
            "id": 95,
            "word": "back",
            "start": 27.6,
            "end": 27.78
          },
          {
            "id": 96,
            "word": "up.",
            "start": 27.78,
            "end": 27.96
          },
          {
            "id": 97,
            "word": "I",
            "start": 28.02,
            "end": 28.16
          },
          {
            "id": 98,
            "word": "gotcha.",
            "start": 28.16,
            "end": 28.58
          },
          {
            "id": 99,
            "word": "Let's",
            "start": 29.14,
            "end": 29.38
          },
          {
            "id": 100,
            "word": "go,",
            "start": 29.38,
            "end": 29.52
          },
          {
            "id": 101,
            "word": "Trey.",
            "start": 29.64,
            "end": 29.66
          },
          {
            "id": 102,
            "word": "Let's",
            "start": 29.66,
            "end": 29.88
          },
          {
            "id": 103,
            "word": "head",
            "start": 29.88,
            "end": 30.06
          },
          {
            "id": 104,
            "word": "on",
            "start": 30.06,
            "end": 30.22
          },
          {
            "id": 105,
            "word": "our",
            "start": 30.22,
            "end": 30.36
          },
          {
            "id": 106,
            "word": "journey.",
            "start": 30.36,
            "end": 30.72
          },
          {
            "id": 107,
            "word": "Goodbye,",
            "start": 31.44,
            "end": 31.8
          },
          {
            "id": 108,
            "word": "Sarah.",
            "start": 31.96,
            "end": 32.24
          },
          {
            "id": 109,
            "word": "Goodbye.",
            "start": 32.48,
            "end": 32.68
          },
          {
            "id": 110,
            "word": "Welcome,",
            "start": 33.74,
            "end": 34.1
          },
          {
            "id": 111,
            "word": "Trey,",
            "start": 34.32,
            "end": 34.6
          },
          {
            "id": 112,
            "word": "to",
            "start": 34.76,
            "end": 35.06
          },
          {
            "id": 113,
            "word": "your",
            "start": 35.06,
            "end": 35.3
          },
          {
            "id": 114,
            "word": "brand",
            "start": 35.3,
            "end": 35.86
          },
          {
            "id": 115,
            "word": "new",
            "start": 35.86,
            "end": 36.62
          },
          {
            "id": 116,
            "word": "home.",
            "start": 36.62,
            "end": 37.36
          },
          {
            "id": 117,
            "word": "Whoa.",
            "start": 37.36,
            "end": 37.5
          },
          {
            "id": 118,
            "word": "You",
            "start": 37.62,
            "end": 37.8
          },
          {
            "id": 119,
            "word": "have",
            "start": 37.8,
            "end": 38.06
          },
          {
            "id": 120,
            "word": "a",
            "start": 38.06,
            "end": 38.36
          },
          {
            "id": 121,
            "word": "full",
            "start": 38.36,
            "end": 38.68
          },
          {
            "id": 122,
            "word": "-fledged",
            "start": 38.68,
            "end": 39.08
          },
          {
            "id": 123,
            "word": "basketball",
            "start": 39.08,
            "end": 39.48
          },
          {
            "id": 124,
            "word": "court.",
            "start": 39.48,
            "end": 39.82
          },
          {
            "id": 125,
            "word": "Whoa.",
            "start": 40.04,
            "end": 40.18
          },
          {
            "id": 126,
            "word": "You",
            "start": 40.18,
            "end": 40.22
          },
          {
            "id": 127,
            "word": "have",
            "start": 40.22,
            "end": 40.36
          },
          {
            "id": 128,
            "word": "all",
            "start": 40.36,
            "end": 40.82
          },
          {
            "id": 129,
            "word": "the",
            "start": 40.82,
            "end": 41.06
          },
          {
            "id": 130,
            "word": "workout",
            "start": 41.06,
            "end": 41.36
          },
          {
            "id": 131,
            "word": "equipment",
            "start": 41.36,
            "end": 41.68
          },
          {
            "id": 132,
            "word": "you",
            "start": 41.68,
            "end": 41.88
          },
          {
            "id": 133,
            "word": "could",
            "start": 41.88,
            "end": 42.06
          },
          {
            "id": 134,
            "word": "ever",
            "start": 42.06,
            "end": 42.5
          },
          {
            "id": 135,
            "word": "want",
            "start": 42.5,
            "end": 42.92
          },
          {
            "id": 136,
            "word": "in",
            "start": 42.92,
            "end": 43.12
          },
          {
            "id": 137,
            "word": "life.",
            "start": 43.12,
            "end": 43.3
          },
          {
            "id": 138,
            "word": "What",
            "start": 43.46,
            "end": 43.58
          },
          {
            "id": 139,
            "word": "in",
            "start": 43.58,
            "end": 43.82
          },
          {
            "id": 140,
            "word": "the",
            "start": 43.82,
            "end": 43.98
          },
          {
            "id": 141,
            "word": "world?",
            "start": 43.98,
            "end": 44.4
          },
          {
            "id": 142,
            "word": "And",
            "start": 45.2,
            "end": 45.62
          },
          {
            "id": 143,
            "word": "you",
            "start": 45.62,
            "end": 46.04
          },
          {
            "id": 144,
            "word": "have",
            "start": 46.04,
            "end": 46.52
          },
          {
            "id": 145,
            "word": "a",
            "start": 46.52,
            "end": 46.6
          },
          {
            "id": 146,
            "word": "bedroom.",
            "start": 46.6,
            "end": 46.9
          },
          {
            "id": 147,
            "word": "Oh.",
            "start": 47.7,
            "end": 47.74
          },
          {
            "id": 148,
            "word": "Dang!",
            "start": 48.28,
            "end": 48.68
          },
          {
            "id": 149,
            "word": "Wait!",
            "start": 49.16,
            "end": 49.32
          },
          {
            "id": 150,
            "word": "Whoa!",
            "start": 49.72,
            "end": 49.9
          },
          {
            "id": 151,
            "word": "Exactly.",
            "start": 50.3,
            "end": 50.72
          }
        ],
        "fullText": "What does that mean? Well, I might have built a second gym where Trey is going to be training in the next 30 days independent of you. I had a - Jimmy, I had a feeling. Oh, no. I'm going to cry. You got to be strong, okay? All I've been saying this whole time is that I couldn't do it without you. Yes, you did. 30 days, okay? You got it. You got this. You got it. You got it. There you go. And then step over. Whoa! All right, Darius, cover it back up. I gotcha. Let's go, Trey. Let's head on our journey. Goodbye, Sarah. Goodbye. Welcome, Trey, to your brand new home. Whoa. You have a full -fledged basketball court. Whoa. You have all the workout equipment you could ever want in life. What in the world? And you have a bedroom. Oh. Dang! Wait! Whoa! Exactly.",
        "captionStyle": "mrbeast",
        "brandKitId": "bk-mrbeast",
        "watermarkHandle": "@mrbeast",
        "copy": {
          "youtubeTitle": "What does that mean? #shorts",
          "youtubeDescription": "What does that mean? Well, I might have built a second gym where Trey is going to be training in the next 30 days independent of you. I had a - Jimmy, I had a feeling. Oh, no. I'm going to cry. You got to be strong, okay? All I've been saying this whole time is that I couldn't do it without you. Yes, you did. 30 days, okay? You got it. You got this. You got it. You got it. There you go. And then step over. Whoa! All right, Darius, cover it back up. I gotcha. Let's go, Trey. Let's head on our journey. Goodbye, Sarah. Goodbye. Welcome, Trey, to your brand new home. Whoa. You have a full -fledged basketball court. Whoa. You have all the workout equipment you could ever want in life. What in the world? And you have a bedroom. Oh. Dang! Wait! Whoa! Exactly.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "What does that mean? Well, I might have built a second gym where Trey is going to be training in the next 30 days independent of you. I had a - Jimmy, I had a feeling. Oh, no. I'm ... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-mrbeast-4",
        "index": 4,
        "title": "What are you doing?",
        "startTime": 1887.1,
        "endTime": 1929.48,
        "duration": 42.38,
        "viralityScore": 68,
        "factors": {
          "hook": 57,
          "acoustics": 69,
          "pace": 100,
          "payoff": 65,
          "sentiment": 20,
          "duration": 99
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_04_provocative_question_what_doin_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_04_provocative_question_what_doin.mp4",
        "words": [
          {
            "id": 1,
            "word": "What",
            "start": 0.0,
            "end": 0.5
          },
          {
            "id": 2,
            "word": "are",
            "start": 0.5,
            "end": 0.68
          },
          {
            "id": 3,
            "word": "you",
            "start": 0.68,
            "end": 0.8
          },
          {
            "id": 4,
            "word": "doing?",
            "start": 0.8,
            "end": 1.3
          },
          {
            "id": 5,
            "word": "Do",
            "start": 1.9,
            "end": 2.1
          },
          {
            "id": 6,
            "word": "you",
            "start": 2.1,
            "end": 2.32
          },
          {
            "id": 7,
            "word": "like",
            "start": 2.32,
            "end": 2.64
          },
          {
            "id": 8,
            "word": "it",
            "start": 2.64,
            "end": 2.9
          },
          {
            "id": 9,
            "word": "at",
            "start": 2.9,
            "end": 3.02
          },
          {
            "id": 10,
            "word": "home?",
            "start": 3.02,
            "end": 3.02
          },
          {
            "id": 11,
            "word": "I",
            "start": 3.12,
            "end": 3.64
          },
          {
            "id": 12,
            "word": "can't",
            "start": 3.64,
            "end": 3.9
          },
          {
            "id": 13,
            "word": "hear",
            "start": 3.9,
            "end": 4.16
          },
          {
            "id": 14,
            "word": "you.",
            "start": 4.16,
            "end": 4.5
          },
          {
            "id": 15,
            "word": "I",
            "start": 4.5,
            "end": 5.1
          },
          {
            "id": 16,
            "word": "don't",
            "start": 5.1,
            "end": 5.28
          },
          {
            "id": 17,
            "word": "know",
            "start": 5.28,
            "end": 5.4
          },
          {
            "id": 18,
            "word": "if",
            "start": 5.4,
            "end": 5.56
          },
          {
            "id": 19,
            "word": "you're",
            "start": 5.56,
            "end": 5.8
          },
          {
            "id": 20,
            "word": "dead.",
            "start": 5.8,
            "end": 6.08
          },
          {
            "id": 21,
            "word": "Ugh.",
            "start": 6.42,
            "end": 6.94
          },
          {
            "id": 22,
            "word": "What",
            "start": 7.46,
            "end": 7.68
          },
          {
            "id": 23,
            "word": "are",
            "start": 7.68,
            "end": 7.98
          },
          {
            "id": 24,
            "word": "you",
            "start": 7.98,
            "end": 8.12
          },
          {
            "id": 25,
            "word": "doing?",
            "start": 8.12,
            "end": 8.3
          },
          {
            "id": 26,
            "word": "I",
            "start": 8.62,
            "end": 8.86
          },
          {
            "id": 27,
            "word": "can't",
            "start": 8.86,
            "end": 9.26
          },
          {
            "id": 28,
            "word": "hear",
            "start": 9.26,
            "end": 9.54
          },
          {
            "id": 29,
            "word": "you.",
            "start": 9.54,
            "end": 9.86
          },
          {
            "id": 30,
            "word": "Dang,",
            "start": 10.18,
            "end": 10.48
          },
          {
            "id": 31,
            "word": "bruh,",
            "start": 10.64,
            "end": 10.78
          },
          {
            "id": 32,
            "word": "like",
            "start": 10.84,
            "end": 10.96
          },
          {
            "id": 33,
            "word": "I",
            "start": 10.96,
            "end": 11.04
          },
          {
            "id": 34,
            "word": "really",
            "start": 11.04,
            "end": 11.3
          },
          {
            "id": 35,
            "word": "cannot",
            "start": 11.3,
            "end": 11.58
          },
          {
            "id": 36,
            "word": "hear",
            "start": 11.58,
            "end": 11.86
          },
          {
            "id": 37,
            "word": "her.",
            "start": 11.86,
            "end": 12.1
          },
          {
            "id": 38,
            "word": "Ugh,",
            "start": 12.3,
            "end": 12.56
          },
          {
            "id": 39,
            "word": "this",
            "start": 12.64,
            "end": 12.84
          },
          {
            "id": 40,
            "word": "is",
            "start": 12.84,
            "end": 12.98
          },
          {
            "id": 41,
            "word": "so",
            "start": 12.98,
            "end": 13.18
          },
          {
            "id": 42,
            "word": "sad.",
            "start": 13.18,
            "end": 13.58
          },
          {
            "id": 43,
            "word": "I",
            "start": 13.92,
            "end": 14.16
          },
          {
            "id": 44,
            "word": "can",
            "start": 14.16,
            "end": 14.32
          },
          {
            "id": 45,
            "word": "see",
            "start": 14.32,
            "end": 14.6
          },
          {
            "id": 46,
            "word": "him",
            "start": 14.6,
            "end": 14.8
          },
          {
            "id": 47,
            "word": "but",
            "start": 14.8,
            "end": 14.98
          },
          {
            "id": 48,
            "word": "I",
            "start": 14.98,
            "end": 15.1
          },
          {
            "id": 49,
            "word": "can't",
            "start": 15.1,
            "end": 15.46
          },
          {
            "id": 50,
            "word": "hear",
            "start": 15.46,
            "end": 15.72
          },
          {
            "id": 51,
            "word": "him.",
            "start": 15.72,
            "end": 16.16
          },
          {
            "id": 52,
            "word": "Ugh.",
            "start": 16.66,
            "end": 16.98
          },
          {
            "id": 53,
            "word": "Like",
            "start": 17.18,
            "end": 17.42
          },
          {
            "id": 54,
            "word": "complete",
            "start": 17.42,
            "end": 17.78
          },
          {
            "id": 55,
            "word": "isolation",
            "start": 17.78,
            "end": 18.42
          },
          {
            "id": 56,
            "word": "from",
            "start": 18.42,
            "end": 18.96
          },
          {
            "id": 57,
            "word": "just",
            "start": 18.96,
            "end": 19.46
          },
          {
            "id": 58,
            "word": "her",
            "start": 19.46,
            "end": 19.74
          },
          {
            "id": 59,
            "word": "not",
            "start": 19.74,
            "end": 20.04
          },
          {
            "id": 60,
            "word": "knowing",
            "start": 20.04,
            "end": 20.2
          },
          {
            "id": 61,
            "word": "how",
            "start": 20.2,
            "end": 20.38
          },
          {
            "id": 62,
            "word": "she's",
            "start": 20.38,
            "end": 20.6
          },
          {
            "id": 63,
            "word": "doing.",
            "start": 20.6,
            "end": 20.78
          },
          {
            "id": 64,
            "word": "This",
            "start": 21.04,
            "end": 21.26
          },
          {
            "id": 65,
            "word": "sucks.",
            "start": 21.26,
            "end": 21.8
          },
          {
            "id": 66,
            "word": "Sarah",
            "start": 22.18,
            "end": 22.54
          },
          {
            "id": 67,
            "word": "and",
            "start": 22.54,
            "end": 22.78
          },
          {
            "id": 68,
            "word": "Trey",
            "start": 22.78,
            "end": 22.94
          },
          {
            "id": 69,
            "word": "are",
            "start": 22.94,
            "end": 23.24
          },
          {
            "id": 70,
            "word": "finding",
            "start": 23.24,
            "end": 23.58
          },
          {
            "id": 71,
            "word": "out",
            "start": 23.58,
            "end": 23.84
          },
          {
            "id": 72,
            "word": "how",
            "start": 23.84,
            "end": 24.1
          },
          {
            "id": 73,
            "word": "much",
            "start": 24.1,
            "end": 24.36
          },
          {
            "id": 74,
            "word": "250k",
            "start": 24.36,
            "end": 25.42
          },
          {
            "id": 75,
            "word": "is",
            "start": 25.42,
            "end": 25.98
          },
          {
            "id": 76,
            "word": "really",
            "start": 25.98,
            "end": 26.42
          },
          {
            "id": 77,
            "word": "worth.",
            "start": 26.42,
            "end": 26.64
          },
          {
            "id": 78,
            "word": "I",
            "start": 26.9,
            "end": 27.06
          },
          {
            "id": 79,
            "word": "wanna",
            "start": 27.06,
            "end": 27.14
          },
          {
            "id": 80,
            "word": "go",
            "start": 27.14,
            "end": 27.28
          },
          {
            "id": 81,
            "word": "home.",
            "start": 27.28,
            "end": 27.56
          },
          {
            "id": 82,
            "word": "I",
            "start": 27.56,
            "end": 28.38
          },
          {
            "id": 83,
            "word": "think",
            "start": 28.38,
            "end": 28.6
          },
          {
            "id": 84,
            "word": "my",
            "start": 28.6,
            "end": 29.0
          },
          {
            "id": 85,
            "word": "motivation",
            "start": 29.0,
            "end": 29.56
          },
          {
            "id": 86,
            "word": "has",
            "start": 29.56,
            "end": 30.14
          },
          {
            "id": 87,
            "word": "like",
            "start": 30.14,
            "end": 30.34
          },
          {
            "id": 88,
            "word": "plummeted",
            "start": 30.34,
            "end": 31.16
          },
          {
            "id": 89,
            "word": "the",
            "start": 31.16,
            "end": 31.48
          },
          {
            "id": 90,
            "word": "past",
            "start": 31.48,
            "end": 31.72
          },
          {
            "id": 91,
            "word": "two",
            "start": 31.72,
            "end": 31.94
          },
          {
            "id": 92,
            "word": "days.",
            "start": 31.94,
            "end": 32.22
          },
          {
            "id": 93,
            "word": "I'm",
            "start": 32.6,
            "end": 32.66
          },
          {
            "id": 94,
            "word": "so",
            "start": 32.66,
            "end": 32.78
          },
          {
            "id": 95,
            "word": "bored.",
            "start": 32.78,
            "end": 33.46
          },
          {
            "id": 96,
            "word": "Um,",
            "start": 36.58,
            "end": 37.2
          },
          {
            "id": 97,
            "word": "just",
            "start": 37.4,
            "end": 37.5
          },
          {
            "id": 98,
            "word": "emotionally",
            "start": 37.5,
            "end": 38.02
          },
          {
            "id": 99,
            "word": "I",
            "start": 38.02,
            "end": 38.26
          },
          {
            "id": 100,
            "word": "miss",
            "start": 38.26,
            "end": 38.56
          },
          {
            "id": 101,
            "word": "Trey",
            "start": 38.56,
            "end": 38.88
          },
          {
            "id": 102,
            "word": "a",
            "start": 38.88,
            "end": 39.08
          },
          {
            "id": 103,
            "word": "lot.",
            "start": 39.08,
            "end": 39.3
          },
          {
            "id": 104,
            "word": "I",
            "start": 39.56,
            "end": 39.6
          },
          {
            "id": 105,
            "word": "miss",
            "start": 39.6,
            "end": 39.84
          },
          {
            "id": 106,
            "word": "Sarah.",
            "start": 39.84,
            "end": 40.14
          },
          {
            "id": 107,
            "word": "Time's",
            "start": 40.56,
            "end": 40.98
          },
          {
            "id": 108,
            "word": "just",
            "start": 40.98,
            "end": 41.14
          },
          {
            "id": 109,
            "word": "moving",
            "start": 41.14,
            "end": 41.52
          },
          {
            "id": 110,
            "word": "really",
            "start": 41.52,
            "end": 41.9
          },
          {
            "id": 111,
            "word": "slow.",
            "start": 41.9,
            "end": 42.38
          }
        ],
        "fullText": "What are you doing? Do you like it at home? I can't hear you. I don't know if you're dead. Ugh. What are you doing? I can't hear you. Dang, bruh, like I really cannot hear her. Ugh, this is so sad. I can see him but I can't hear him. Ugh. Like complete isolation from just her not knowing how she's doing. This sucks. Sarah and Trey are finding out how much 250k is really worth. I wanna go home. I think my motivation has like plummeted the past two days. I'm so bored. Um, just emotionally I miss Trey a lot. I miss Sarah. Time's just moving really slow.",
        "captionStyle": "mrbeast",
        "brandKitId": "bk-mrbeast",
        "watermarkHandle": "@mrbeast",
        "copy": {
          "youtubeTitle": "What are you doing? #shorts",
          "youtubeDescription": "What are you doing? Do you like it at home? I can't hear you. I don't know if you're dead. Ugh. What are you doing? I can't hear you. Dang, bruh, like I really cannot hear her. Ugh, this is so sad. I can see him but I can't hear him. Ugh. Like complete isolation from just her not knowing how she's doing. This sucks. Sarah and Trey are finding out how much 250k is really worth. I wanna go home. I think my motivation has like plummeted the past two days. I'm so bored. Um, just emotionally I miss Trey a lot. I miss Sarah. Time's just moving really slow.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "What are you doing? Do you like it at home? I can't hear you. I don't know if you're dead. Ugh. What are you doing? I can't hear you. Dang, bruh, like I really cannot hear her. Ugh... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-mrbeast-5",
        "index": 5,
        "title": "What if I told you, Trey, this Ford F?",
        "startTime": 1255.26,
        "endTime": 1301.74,
        "duration": 46.48,
        "viralityScore": 67,
        "factors": {
          "hook": 71,
          "acoustics": 62,
          "pace": 85,
          "payoff": 65,
          "sentiment": 20,
          "duration": 89
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_05_contrarian_take_what_told_you__thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_05_contrarian_take_what_told_you_.mp4",
        "words": [
          {
            "id": 1,
            "word": "What",
            "start": 0.0,
            "end": 0.24
          },
          {
            "id": 2,
            "word": "if",
            "start": 0.24,
            "end": 0.38
          },
          {
            "id": 3,
            "word": "I",
            "start": 0.38,
            "end": 0.46
          },
          {
            "id": 4,
            "word": "told",
            "start": 0.46,
            "end": 0.64
          },
          {
            "id": 5,
            "word": "you,",
            "start": 0.64,
            "end": 0.8
          },
          {
            "id": 6,
            "word": "Trey,",
            "start": 0.88,
            "end": 0.96
          },
          {
            "id": 7,
            "word": "this",
            "start": 1.06,
            "end": 1.24
          },
          {
            "id": 8,
            "word": "Ford",
            "start": 1.24,
            "end": 1.48
          },
          {
            "id": 9,
            "word": "F",
            "start": 1.48,
            "end": 1.68
          },
          {
            "id": 10,
            "word": "-150",
            "start": 1.68,
            "end": 2.1
          },
          {
            "id": 11,
            "word": "could",
            "start": 2.1,
            "end": 2.58
          },
          {
            "id": 12,
            "word": "be",
            "start": 2.58,
            "end": 2.78
          },
          {
            "id": 13,
            "word": "yours",
            "start": 2.78,
            "end": 3.24
          },
          {
            "id": 14,
            "word": "in",
            "start": 3.24,
            "end": 3.74
          },
          {
            "id": 15,
            "word": "over",
            "start": 3.74,
            "end": 4.16
          },
          {
            "id": 16,
            "word": "the",
            "start": 4.16,
            "end": 4.32
          },
          {
            "id": 17,
            "word": "next",
            "start": 4.32,
            "end": 4.58
          },
          {
            "id": 18,
            "word": "30",
            "start": 4.58,
            "end": 4.9
          },
          {
            "id": 19,
            "word": "days.",
            "start": 4.9,
            "end": 5.36
          },
          {
            "id": 20,
            "word": "You",
            "start": 5.76,
            "end": 5.82
          },
          {
            "id": 21,
            "word": "and",
            "start": 5.82,
            "end": 6.02
          },
          {
            "id": 22,
            "word": "Sarah",
            "start": 6.02,
            "end": 6.38
          },
          {
            "id": 23,
            "word": "pulled",
            "start": 6.38,
            "end": 6.8
          },
          {
            "id": 24,
            "word": "around",
            "start": 6.8,
            "end": 7.06
          },
          {
            "id": 25,
            "word": "the",
            "start": 7.06,
            "end": 7.28
          },
          {
            "id": 26,
            "word": "circle",
            "start": 7.28,
            "end": 7.64
          },
          {
            "id": 27,
            "word": "150",
            "start": 7.64,
            "end": 8.16
          },
          {
            "id": 28,
            "word": "times.",
            "start": 8.16,
            "end": 8.66
          },
          {
            "id": 29,
            "word": "Just",
            "start": 8.9,
            "end": 9.34
          },
          {
            "id": 30,
            "word": "five",
            "start": 9.34,
            "end": 9.56
          },
          {
            "id": 31,
            "word": "times",
            "start": 9.56,
            "end": 9.76
          },
          {
            "id": 32,
            "word": "a",
            "start": 9.76,
            "end": 9.9
          },
          {
            "id": 33,
            "word": "day?",
            "start": 9.9,
            "end": 9.96
          },
          {
            "id": 34,
            "word": "Five",
            "start": 10.06,
            "end": 10.18
          },
          {
            "id": 35,
            "word": "times",
            "start": 10.18,
            "end": 10.34
          },
          {
            "id": 36,
            "word": "a",
            "start": 10.34,
            "end": 10.46
          },
          {
            "id": 37,
            "word": "day.",
            "start": 10.46,
            "end": 10.56
          },
          {
            "id": 38,
            "word": "Woo!",
            "start": 11.98,
            "end": 12.28
          },
          {
            "id": 39,
            "word": "All",
            "start": 13.38,
            "end": 13.82
          },
          {
            "id": 40,
            "word": "right,",
            "start": 13.82,
            "end": 13.9
          },
          {
            "id": 41,
            "word": "let's",
            "start": 13.96,
            "end": 14.16
          },
          {
            "id": 42,
            "word": "go",
            "start": 14.16,
            "end": 14.28
          },
          {
            "id": 43,
            "word": "for",
            "start": 14.28,
            "end": 14.48
          },
          {
            "id": 44,
            "word": "it.",
            "start": 14.48,
            "end": 14.54
          },
          {
            "id": 45,
            "word": "Start",
            "start": 14.6,
            "end": 14.72
          },
          {
            "id": 46,
            "word": "pulling.",
            "start": 14.72,
            "end": 15.0
          },
          {
            "id": 47,
            "word": "Let's",
            "start": 15.18,
            "end": 15.18
          },
          {
            "id": 48,
            "word": "go.",
            "start": 15.18,
            "end": 15.34
          },
          {
            "id": 49,
            "word": "Get",
            "start": 15.78,
            "end": 15.78
          },
          {
            "id": 50,
            "word": "those",
            "start": 15.78,
            "end": 16.04
          },
          {
            "id": 51,
            "word": "legs!",
            "start": 16.04,
            "end": 16.5
          },
          {
            "id": 52,
            "word": "You",
            "start": 16.68,
            "end": 16.86
          },
          {
            "id": 53,
            "word": "got",
            "start": 16.86,
            "end": 17.0
          },
          {
            "id": 54,
            "word": "to",
            "start": 17.0,
            "end": 17.1
          },
          {
            "id": 55,
            "word": "get",
            "start": 17.1,
            "end": 17.22
          },
          {
            "id": 56,
            "word": "low.",
            "start": 17.22,
            "end": 17.48
          },
          {
            "id": 57,
            "word": "Oh,",
            "start": 17.48,
            "end": 17.62
          },
          {
            "id": 58,
            "word": "come",
            "start": 17.62,
            "end": 18.1
          },
          {
            "id": 59,
            "word": "on.",
            "start": 18.1,
            "end": 18.22
          },
          {
            "id": 60,
            "word": "It's",
            "start": 18.46,
            "end": 18.72
          },
          {
            "id": 61,
            "word": "going",
            "start": 18.72,
            "end": 18.72
          },
          {
            "id": 62,
            "word": "to",
            "start": 18.72,
            "end": 18.72
          },
          {
            "id": 63,
            "word": "be",
            "start": 18.72,
            "end": 18.82
          },
          {
            "id": 64,
            "word": "leg",
            "start": 18.82,
            "end": 19.02
          },
          {
            "id": 65,
            "word": "day",
            "start": 19.02,
            "end": 19.22
          },
          {
            "id": 66,
            "word": "every",
            "start": 19.22,
            "end": 19.62
          },
          {
            "id": 67,
            "word": "day.",
            "start": 19.62,
            "end": 19.84
          },
          {
            "id": 68,
            "word": "Every",
            "start": 19.9,
            "end": 20.08
          },
          {
            "id": 69,
            "word": "day,",
            "start": 20.08,
            "end": 20.24
          },
          {
            "id": 70,
            "word": "Sarah.",
            "start": 20.34,
            "end": 20.48
          },
          {
            "id": 71,
            "word": "Now,",
            "start": 20.68,
            "end": 20.9
          },
          {
            "id": 72,
            "word": "it",
            "start": 21.06,
            "end": 21.24
          },
          {
            "id": 73,
            "word": "goes",
            "start": 21.24,
            "end": 21.4
          },
          {
            "id": 74,
            "word": "without",
            "start": 21.4,
            "end": 21.58
          },
          {
            "id": 75,
            "word": "saying,",
            "start": 21.58,
            "end": 21.98
          },
          {
            "id": 76,
            "word": "but",
            "start": 22.06,
            "end": 22.24
          },
          {
            "id": 77,
            "word": "if",
            "start": 22.24,
            "end": 22.34
          },
          {
            "id": 78,
            "word": "you",
            "start": 22.34,
            "end": 22.42
          },
          {
            "id": 79,
            "word": "accidentally",
            "start": 22.42,
            "end": 22.68
          },
          {
            "id": 80,
            "word": "step",
            "start": 22.68,
            "end": 22.92
          },
          {
            "id": 81,
            "word": "on",
            "start": 22.92,
            "end": 23.04
          },
          {
            "id": 82,
            "word": "the",
            "start": 23.04,
            "end": 23.08
          },
          {
            "id": 83,
            "word": "red",
            "start": 23.08,
            "end": 23.2
          },
          {
            "id": 84,
            "word": "line",
            "start": 23.2,
            "end": 23.34
          },
          {
            "id": 85,
            "word": "while",
            "start": 23.34,
            "end": 23.48
          },
          {
            "id": 86,
            "word": "doing",
            "start": 23.48,
            "end": 23.66
          },
          {
            "id": 87,
            "word": "this,",
            "start": 23.66,
            "end": 23.82
          },
          {
            "id": 88,
            "word": "you're",
            "start": 23.9,
            "end": 23.98
          },
          {
            "id": 89,
            "word": "out.",
            "start": 23.98,
            "end": 24.1
          },
          {
            "id": 90,
            "word": "And",
            "start": 24.22,
            "end": 24.44
          },
          {
            "id": 91,
            "word": "no",
            "start": 24.44,
            "end": 24.6
          },
          {
            "id": 92,
            "word": "one's",
            "start": 24.6,
            "end": 24.88
          },
          {
            "id": 93,
            "word": "allowed",
            "start": 24.88,
            "end": 25.06
          },
          {
            "id": 94,
            "word": "to",
            "start": 25.06,
            "end": 25.22
          },
          {
            "id": 95,
            "word": "pull",
            "start": 25.22,
            "end": 25.48
          },
          {
            "id": 96,
            "word": "but",
            "start": 25.48,
            "end": 25.68
          },
          {
            "id": 97,
            "word": "these",
            "start": 25.68,
            "end": 25.92
          },
          {
            "id": 98,
            "word": "two.",
            "start": 25.92,
            "end": 26.12
          },
          {
            "id": 99,
            "word": "All",
            "start": 26.26,
            "end": 26.42
          },
          {
            "id": 100,
            "word": "right.",
            "start": 26.42,
            "end": 26.66
          },
          {
            "id": 101,
            "word": "So,",
            "start": 26.84,
            "end": 27.0
          },
          {
            "id": 102,
            "word": "we",
            "start": 27.0,
            "end": 27.18
          },
          {
            "id": 103,
            "word": "haven't",
            "start": 27.18,
            "end": 27.44
          },
          {
            "id": 104,
            "word": "even",
            "start": 27.44,
            "end": 27.56
          },
          {
            "id": 105,
            "word": "finished",
            "start": 27.56,
            "end": 27.94
          },
          {
            "id": 106,
            "word": "a",
            "start": 27.94,
            "end": 28.16
          },
          {
            "id": 107,
            "word": "lap",
            "start": 28.16,
            "end": 28.4
          },
          {
            "id": 108,
            "word": "yet.",
            "start": 28.4,
            "end": 28.58
          },
          {
            "id": 109,
            "word": "How",
            "start": 28.58,
            "end": 28.78
          },
          {
            "id": 110,
            "word": "are",
            "start": 28.78,
            "end": 28.86
          },
          {
            "id": 111,
            "word": "you",
            "start": 28.86,
            "end": 28.96
          },
          {
            "id": 112,
            "word": "two",
            "start": 28.96,
            "end": 29.06
          },
          {
            "id": 113,
            "word": "feeling?",
            "start": 29.06,
            "end": 29.3
          },
          {
            "id": 114,
            "word": "I'm",
            "start": 29.44,
            "end": 29.64
          },
          {
            "id": 115,
            "word": "exhausted.",
            "start": 29.64,
            "end": 30.0
          },
          {
            "id": 116,
            "word": "I'm",
            "start": 30.34,
            "end": 30.54
          },
          {
            "id": 117,
            "word": "tired.",
            "start": 30.54,
            "end": 30.54
          },
          {
            "id": 118,
            "word": "Yeah.",
            "start": 30.9,
            "end": 31.0
          },
          {
            "id": 119,
            "word": "Keep",
            "start": 31.18,
            "end": 31.38
          },
          {
            "id": 120,
            "word": "going.",
            "start": 31.38,
            "end": 31.68
          },
          {
            "id": 121,
            "word": "That",
            "start": 31.92,
            "end": 32.18
          },
          {
            "id": 122,
            "word": "was",
            "start": 32.18,
            "end": 32.38
          },
          {
            "id": 123,
            "word": "one",
            "start": 32.38,
            "end": 32.66
          },
          {
            "id": 124,
            "word": "lap.",
            "start": 32.66,
            "end": 32.96
          },
          {
            "id": 125,
            "word": "How",
            "start": 33.06,
            "end": 33.22
          },
          {
            "id": 126,
            "word": "was",
            "start": 33.22,
            "end": 33.46
          },
          {
            "id": 127,
            "word": "it?",
            "start": 33.46,
            "end": 33.6
          },
          {
            "id": 128,
            "word": "That",
            "start": 34.0,
            "end": 34.2
          },
          {
            "id": 129,
            "word": "sucked.",
            "start": 34.2,
            "end": 34.48
          },
          {
            "id": 130,
            "word": "One",
            "start": 34.84,
            "end": 35.12
          },
          {
            "id": 131,
            "word": "down.",
            "start": 35.12,
            "end": 35.4
          },
          {
            "id": 132,
            "word": "149",
            "start": 36.76,
            "end": 37.16
          },
          {
            "id": 133,
            "word": "to",
            "start": 37.16,
            "end": 37.32
          },
          {
            "id": 134,
            "word": "go.",
            "start": 37.32,
            "end": 37.52
          },
          {
            "id": 135,
            "word": "There",
            "start": 40.28,
            "end": 40.68
          },
          {
            "id": 136,
            "word": "you",
            "start": 40.68,
            "end": 40.8
          },
          {
            "id": 137,
            "word": "go.",
            "start": 40.8,
            "end": 41.04
          },
          {
            "id": 138,
            "word": "There",
            "start": 41.78,
            "end": 42.18
          },
          {
            "id": 139,
            "word": "you",
            "start": 42.18,
            "end": 42.34
          },
          {
            "id": 140,
            "word": "go.",
            "start": 42.34,
            "end": 42.64
          },
          {
            "id": 141,
            "word": "Let's",
            "start": 43.66,
            "end": 44.06
          },
          {
            "id": 142,
            "word": "cross",
            "start": 44.06,
            "end": 44.34
          },
          {
            "id": 143,
            "word": "it.",
            "start": 44.34,
            "end": 44.6
          },
          {
            "id": 144,
            "word": "Two",
            "start": 45.26,
            "end": 45.66
          },
          {
            "id": 145,
            "word": "laps",
            "start": 45.66,
            "end": 46.06
          },
          {
            "id": 146,
            "word": "down!",
            "start": 46.06,
            "end": 46.48
          },
          {
            "id": 147,
            "word": "I'm",
            "start": 46.48,
            "end": 47.1
          }
        ],
        "fullText": "What if I told you, Trey, this Ford F -150 could be yours in over the next 30 days. You and Sarah pulled around the circle 150 times. Just five times a day? Five times a day. Woo! All right, let's go for it. Start pulling. Let's go. Get those legs! You got to get low. Oh, come on. It's going to be leg day every day. Every day, Sarah. Now, it goes without saying, but if you accidentally step on the red line while doing this, you're out. And no one's allowed to pull but these two. All right. So, we haven't even finished a lap yet. How are you two feeling? I'm exhausted. I'm tired. Yeah. Keep going. That was one lap. How was it? That sucked. One down. 149 to go. There you go. There you go. Let's cross it. Two laps down!",
        "captionStyle": "mrbeast",
        "brandKitId": "bk-mrbeast",
        "watermarkHandle": "@mrbeast",
        "copy": {
          "youtubeTitle": "What if I told you, Trey, this Ford F? #shorts",
          "youtubeDescription": "What if I told you, Trey, this Ford F -150 could be yours in over the next 30 days. You and Sarah pulled around the circle 150 times. Just five times a day? Five times a day. Woo! All right, let's go for it. Start pulling. Let's go. Get those legs! You got to get low. Oh, come on. It's going to be leg day every day. Every day, Sarah. Now, it goes without saying, but if you accidentally step on the red line while doing this, you're out. And no one's allowed to pull but these two. All right. So, we haven't even finished a lap yet. How are you two feeling? I'm exhausted. I'm tired. Yeah. Keep going. That was one lap. How was it? That sucked. One down. 149 to go. There you go. There you go. Let's cross it. Two laps down!\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "What if I told you, Trey, this Ford F -150 could be yours in over the next 30 days. You and Sarah pulled around the circle 150 times. Just five times a day? Five times a day. Woo! ... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      },
      {
        "id": "proj-mrbeast-6",
        "index": 6,
        "title": "How does that weight feel?",
        "startTime": 377.76,
        "endTime": 407.2,
        "duration": 29.44,
        "viralityScore": 67,
        "factors": {
          "hook": 51,
          "acoustics": 64,
          "pace": 100,
          "payoff": 65,
          "sentiment": 68,
          "duration": 69
        },
        "status": "pending",
        "thumbnailUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_06_question_hook_does_that_weight_thumb_1.jpg",
        "videoUrl": "/api/media/stream?path=/Volumes/Ravi%27s%20SSD/PROJECTS/kalp/output/eff6534ca9eef1b4_Lose%20150%20Lbs%20Together%2C%20Win%20%24250%2C000/clip_06_question_hook_does_that_weight.mp4",
        "words": [
          {
            "id": 1,
            "word": "How",
            "start": 0.0,
            "end": 0.18
          },
          {
            "id": 2,
            "word": "does",
            "start": 0.18,
            "end": 0.32
          },
          {
            "id": 3,
            "word": "that",
            "start": 0.32,
            "end": 0.48
          },
          {
            "id": 4,
            "word": "weight",
            "start": 0.48,
            "end": 0.64
          },
          {
            "id": 5,
            "word": "feel?",
            "start": 0.64,
            "end": 0.88
          },
          {
            "id": 6,
            "word": "This",
            "start": 1.32,
            "end": 1.84
          },
          {
            "id": 7,
            "word": "is",
            "start": 1.84,
            "end": 1.96
          },
          {
            "id": 8,
            "word": "hard.",
            "start": 1.96,
            "end": 2.28
          },
          {
            "id": 9,
            "word": "And",
            "start": 3.0,
            "end": 3.36
          },
          {
            "id": 10,
            "word": "by",
            "start": 3.36,
            "end": 3.5
          },
          {
            "id": 11,
            "word": "day",
            "start": 3.5,
            "end": 3.68
          },
          {
            "id": 12,
            "word": "35,",
            "start": 3.68,
            "end": 4.16
          },
          {
            "id": 13,
            "word": "her",
            "start": 4.44,
            "end": 4.56
          },
          {
            "id": 14,
            "word": "morale",
            "start": 4.56,
            "end": 4.9
          },
          {
            "id": 15,
            "word": "was",
            "start": 4.9,
            "end": 5.34
          },
          {
            "id": 16,
            "word": "fading.",
            "start": 5.34,
            "end": 5.66
          },
          {
            "id": 17,
            "word": "Whoever",
            "start": 5.84,
            "end": 6.02
          },
          {
            "id": 18,
            "word": "thought",
            "start": 6.02,
            "end": 6.32
          },
          {
            "id": 19,
            "word": "of",
            "start": 6.32,
            "end": 6.5
          },
          {
            "id": 20,
            "word": "this",
            "start": 6.5,
            "end": 6.68
          },
          {
            "id": 21,
            "word": "deserves",
            "start": 6.68,
            "end": 7.08
          },
          {
            "id": 22,
            "word": "jail.",
            "start": 7.08,
            "end": 7.94
          },
          {
            "id": 23,
            "word": "Literal",
            "start": 9.32,
            "end": 9.84
          },
          {
            "id": 24,
            "word": "jail.",
            "start": 9.84,
            "end": 10.12
          },
          {
            "id": 25,
            "word": "And",
            "start": 10.72,
            "end": 11.2
          },
          {
            "id": 26,
            "word": "the",
            "start": 11.2,
            "end": 11.26
          },
          {
            "id": 27,
            "word": "worse",
            "start": 11.26,
            "end": 11.48
          },
          {
            "id": 28,
            "word": "her",
            "start": 11.48,
            "end": 11.62
          },
          {
            "id": 29,
            "word": "morale",
            "start": 11.62,
            "end": 11.92
          },
          {
            "id": 30,
            "word": "got,",
            "start": 11.92,
            "end": 12.24
          },
          {
            "id": 31,
            "word": "the",
            "start": 12.36,
            "end": 12.62
          },
          {
            "id": 32,
            "word": "worse",
            "start": 12.62,
            "end": 12.94
          },
          {
            "id": 33,
            "word": "her",
            "start": 12.94,
            "end": 13.18
          },
          {
            "id": 34,
            "word": "workouts",
            "start": 13.18,
            "end": 13.64
          },
          {
            "id": 35,
            "word": "got.",
            "start": 13.64,
            "end": 13.94
          },
          {
            "id": 36,
            "word": "I'm",
            "start": 14.76,
            "end": 15.06
          },
          {
            "id": 37,
            "word": "over",
            "start": 15.06,
            "end": 15.68
          },
          {
            "id": 38,
            "word": "it.",
            "start": 15.68,
            "end": 15.92
          },
          {
            "id": 39,
            "word": "Hold",
            "start": 16.12,
            "end": 16.38
          },
          {
            "id": 40,
            "word": "on.",
            "start": 16.38,
            "end": 16.6
          },
          {
            "id": 41,
            "word": "Hold",
            "start": 16.84,
            "end": 16.98
          },
          {
            "id": 42,
            "word": "on.",
            "start": 16.98,
            "end": 17.14
          },
          {
            "id": 43,
            "word": "What",
            "start": 17.4,
            "end": 17.68
          },
          {
            "id": 44,
            "word": "are",
            "start": 17.68,
            "end": 17.76
          },
          {
            "id": 45,
            "word": "you",
            "start": 17.76,
            "end": 17.8
          },
          {
            "id": 46,
            "word": "doing?",
            "start": 17.8,
            "end": 17.96
          },
          {
            "id": 47,
            "word": "I'm",
            "start": 18.18,
            "end": 18.38
          },
          {
            "id": 48,
            "word": "over",
            "start": 18.38,
            "end": 18.6
          },
          {
            "id": 49,
            "word": "it.",
            "start": 18.6,
            "end": 18.74
          },
          {
            "id": 50,
            "word": "Don't",
            "start": 18.96,
            "end": 19.2
          },
          {
            "id": 51,
            "word": "care.",
            "start": 19.2,
            "end": 19.44
          },
          {
            "id": 52,
            "word": "I'm",
            "start": 19.44,
            "end": 20.3
          },
          {
            "id": 53,
            "word": "struggling.",
            "start": 20.3,
            "end": 20.9
          },
          {
            "id": 54,
            "word": "I",
            "start": 21.8,
            "end": 22.54
          },
          {
            "id": 55,
            "word": "feel",
            "start": 22.54,
            "end": 22.88
          },
          {
            "id": 56,
            "word": "awful.",
            "start": 22.88,
            "end": 23.84
          },
          {
            "id": 57,
            "word": "This",
            "start": 24.38,
            "end": 24.98
          },
          {
            "id": 58,
            "word": "sucks.",
            "start": 24.98,
            "end": 25.28
          },
          {
            "id": 59,
            "word": "I",
            "start": 27.02,
            "end": 28.22
          },
          {
            "id": 60,
            "word": "don't",
            "start": 28.22,
            "end": 28.4
          },
          {
            "id": 61,
            "word": "want",
            "start": 28.4,
            "end": 28.54
          },
          {
            "id": 62,
            "word": "to",
            "start": 28.54,
            "end": 28.64
          },
          {
            "id": 63,
            "word": "do",
            "start": 28.64,
            "end": 28.84
          },
          {
            "id": 64,
            "word": "this.",
            "start": 28.84,
            "end": 29.44
          }
        ],
        "fullText": "How does that weight feel? This is hard. And by day 35, her morale was fading. Whoever thought of this deserves jail. Literal jail. And the worse her morale got, the worse her workouts got. I'm over it. Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this.",
        "captionStyle": "mrbeast",
        "brandKitId": "bk-mrbeast",
        "watermarkHandle": "@mrbeast",
        "copy": {
          "youtubeTitle": "How does that weight feel? #shorts",
          "youtubeDescription": "How does that weight feel? This is hard. And by day 35, her morale was fading. Whoever thought of this deserves jail. Literal jail. And the worse her morale got, the worse her workouts got. I'm over it. Hold on. Hold on. What are you doing? I'm over it. Don't care. I'm struggling. I feel awful. This sucks. I don't want to do this.\n\nFrom Lose 150 Lbs Together, Win $250,000 \u2014 MrBeast. Processed 100% offline with ClipLocal.",
          "youtubeTags": [
            "#shorts",
            "#viral",
            "#podcast"
          ],
          "instagramCaption": "How does that weight feel? This is hard. And by day 35, her morale was fading. Whoever thought of this deserves jail. Literal jail. And the worse her morale got, the worse her work... \ud83d\udd25\n\nDrop your thoughts below!",
          "hashtags": [
            "#shorts",
            "#viral",
            "#podcast"
          ]
        },
        "narrativeFlags": {
          "sponsorshipRisk": 0.0,
          "fillersScrubbed": 0,
          "silenceSnappedMs": 140
        }
      }
    ]
  }
];

export const mockEngineHealth: EngineHealth = {
  metalAccelerated: true,
  metalDeviceName: 'Apple M4 (Unified Memory)',
  whisperModel: 'mlx-community/whisper-large-v3-turbo',
  whisperDevice: 'Metal / GPU FP16',
  ollamaAvailable: true,
  ollamaModel: 'llama3.2:latest',
  circuitBreakerState: 'CLOSED',
  activeWorkers: 3,
  maxWorkers: 3,
  ramAvailableGb: 6.5
};
