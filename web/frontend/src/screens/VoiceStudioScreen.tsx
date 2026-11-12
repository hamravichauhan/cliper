import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import {
  Mic,
  Play,
  Pause,
  Download,
  Sparkles,
  Music,
  Sliders,
  RotateCcw,
  Volume2,
  Check,
  Flame,
  FileText,
  Cpu
} from 'lucide-react'

interface VoiceProfile {
  model_name: string
  voice_owner: string
  native_language: string
  timbre_profile: string
  engine: string
  hardware_target: string
  styles: Record<string, { audio: string; transcript: string; description: string }>
}

const PRESET_SCRIPTS = [
  {
    label: 'रामायण कथा (सरयू नदी)',
    lang: 'Devanagari Hindi',
    text: 'सरयू नदी के किनारे कौशल नामक एक राज्य था जिसकी राजधानी अयोध्या थी और अयोध्या के राजा थे दशरथ।'
  },
  {
    label: 'धर्म व मर्यादा (अवतार कथा)',
    lang: 'Devanagari Hindi',
    text: 'रामायण कथा के अनुसार भगवान राम विष्णु के मानव अवतार थे जिन्होंने धर्म की पुनर्स्थापना की और मर्यादा का संदेश दिया।'
  },
  {
    label: 'Podcast Opening (Hinglish)',
    lang: 'Conversational Hinglish',
    text: 'Namaste dosto, aaj ke podcast me hum baat karenge Ramayan ke us adhyay ki jahan Shri Ram ne Lanka par vijay praapt ki thi.'
  },
  {
    label: 'Viral Hook Teaser',
    lang: 'Conversational Hinglish',
    text: 'Namaste dosto! Aaj hum explore karenge ek aisi kahani jo aapne pehle kabhi nahi suni hogi.'
  }
]

export const VoiceStudioScreen: React.FC = () => {
  const { addToast } = useStore()
  const [profile, setProfile] = useState<VoiceProfile | null>(null)
  const [musicTracks, setMusicTracks] = useState<string[]>([])
  const [scriptText, setScriptText] = useState(PRESET_SCRIPTS[0].text)
  const [selectedStyle, setSelectedStyle] = useState('indian_storyteller')
  const [speed, setSpeed] = useState(1.0)
  const [bgMusic, setBgMusic] = useState(false)
  const [musicTrack, setMusicTrack] = useState('cinematic')
  const [musicVolume, setMusicVolume] = useState(0.15)
  const [isGenerating, setIsGenerating] = useState(false)
  
  // Audio Playback
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null)
  const [generatedDuration, setGeneratedDuration] = useState<number | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    fetch('/api/voice/profiles')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ready') {
          setProfile(data.profile)
          if (data.music_tracks) setMusicTracks(data.music_tracks)
        }
      })
      .catch(err => console.error('Failed to load voice profiles', err))
  }, [])

  const handleGenerate = async () => {
    if (!scriptText.trim()) {
      addToast({ id: String(Date.now()), title: 'Empty Script', description: 'Please enter text to synthesize', type: 'warning' })
      return
    }

    setIsGenerating(true)
    setIsPlaying(false)
    try {
      const res = await fetch('/api/voice/synthesize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: scriptText,
          style: selectedStyle,
          speed: speed,
          bg_music: bgMusic,
          music_track: musicTrack,
          music_volume: musicVolume
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || 'Voice synthesis failed')

      setGeneratedAudioUrl(data.audio_url)
      setGeneratedDuration(data.duration)
      addToast({
        id: String(Date.now()),
        title: 'Voice Synthesized Successfully',
        description: `Generated in Ravi's voice (${data.duration}s) with Indian flow.`,
        type: 'success'
      })
    } catch (err: any) {
      addToast({
        id: String(Date.now()),
        title: 'Synthesis Error',
        description: err.message,
        type: 'danger'
      })
    } finally {
      setIsGenerating(false)
    }
  }

  const togglePlay = () => {
    if (!audioRef.current || !generatedAudioUrl) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const wordCount = scriptText.trim() ? scriptText.trim().split(/\s+/).length : 0
  const estimatedDuration = Math.round((wordCount / 2.2) * (1 / speed))

  return (
    <div className="flex-1 p-8 overflow-y-auto max-w-6xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent">
              <Mic className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-text-primary">AI Voice Studio</h1>
                <span className="px-2 py-0.5 text-xs font-semibold rounded-full bg-accent/10 border border-accent/25 text-accent">
                  Indian Storytelling Flow
                </span>
              </div>
              <p className="text-xs text-text-muted mt-0.5">
                Ravi Chauhan Voice Master (v2) · Merged with Ramayan Narrative Cadence · Apple Silicon M4 GPU
              </p>
            </div>
          </div>
        </div>

        {/* Engine Specs Pill */}
        <div className="flex items-center gap-3 bg-bg-surface/80 border border-border px-4 py-2.5 rounded-xl text-xs">
          <div className="flex items-center gap-1.5 text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Metal MPS Active</span>
          </div>
          <div className="w-px h-3.5 bg-border" />
          <div className="flex items-center gap-1.5 text-text-muted">
            <Cpu className="w-3.5 h-3.5 text-accent" />
            <span>F5-TTS Flow-Matching DiT</span>
          </div>
          <div className="w-px h-3.5 bg-border" />
          <span className="text-text-muted">24 kHz Vocos Vocoder</span>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Script Input & Presets (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Preset Buttons */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-accent" /> Quick Script Presets
              </label>
              <span className="text-xs text-text-muted">1-Click Templates</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {PRESET_SCRIPTS.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => setScriptText(preset.text)}
                  className={`text-left p-3 rounded-xl border text-xs transition-all ${
                    scriptText === preset.text
                      ? 'border-accent bg-accent/10 text-text-primary'
                      : 'border-border bg-bg-surface/50 hover:bg-bg-surface text-text-muted hover:text-text-primary'
                  }`}
                >
                  <div className="font-medium flex items-center justify-between mb-1">
                    <span>{preset.label}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-bg-elevated text-text-muted border border-border/50">
                      {preset.lang}
                    </span>
                  </div>
                  <p className="line-clamp-1 opacity-75 font-mono text-[11px]">{preset.text}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Script Editor Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-text-muted flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-accent" /> Script Input (Hindi Devanagari or Hinglish)
              </label>
              <div className="text-xs text-text-muted flex items-center gap-3">
                <span>{wordCount} words</span>
                <span>•</span>
                <span>~{estimatedDuration}s estimated duration</span>
              </div>
            </div>
            <div className="relative">
              <textarea
                value={scriptText}
                onChange={e => setScriptText(e.target.value)}
                rows={6}
                placeholder="यहाँ हिंदी में लिखें या Hinglish script enter karein..."
                className="w-full bg-bg-surface border border-border rounded-xl p-4 text-sm text-text-primary focus:outline-none focus:border-accent transition-all resize-y font-sans leading-relaxed"
              />
            </div>
            <p className="text-[11px] text-text-muted flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-accent" />
              Devanagari characters (`सरयू नदी...`) and Latin Hinglish (`Namaste dosto...`) are automatically converted into authentic Indian acoustic cadence.
            </p>
          </div>

          {/* Generate Button */}
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !scriptText.trim()}
            className="w-full py-3.5 px-6 rounded-xl bg-accent text-[#09090B] font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-accent/20"
          >
            {isGenerating ? (
              <>
                <div className="w-4 h-4 border-2 border-[#09090B] border-t-transparent rounded-full animate-spin" />
                <span>Generating Speech with Indian Flow (M4 GPU)...</span>
              </>
            ) : (
              <>
                <Flame className="w-4 h-4" />
                <span>Generate Voiceover in Ravi Chauhan Voice</span>
              </>
            )}
          </button>

          {/* Output Audio Player */}
          {generatedAudioUrl && (
            <div className="p-5 rounded-2xl bg-bg-surface border border-accent/40 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">Generated Voice Output</h4>
                    <p className="text-xs text-text-muted">Mastered at −16.0 LUFS Broadcast Standard</p>
                  </div>
                </div>
                <a
                  href={generatedAudioUrl}
                  download="ravi_voice_indian_flow.wav"
                  className="px-3 py-1.5 rounded-lg border border-border bg-bg-elevated hover:bg-bg text-xs font-medium text-text-primary flex items-center gap-1.5 transition-all"
                >
                  <Download className="w-3.5 h-3.5 text-accent" />
                  Download WAV
                </a>
              </div>

              {/* Custom Player Controls */}
              <div className="flex items-center gap-4 bg-bg-elevated p-3 rounded-xl border border-border">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-accent text-[#09090B] flex items-center justify-center hover:opacity-90 transition-all shrink-0 shadow-md"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </button>

                <div className="flex-1 space-y-1">
                  <div className="flex justify-between text-xs text-text-muted font-mono">
                    <span>{currentTime.toFixed(1)}s</span>
                    <span>{generatedDuration ? `${generatedDuration}s` : '--'}</span>
                  </div>
                  <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                    <div
                      className="bg-accent h-full transition-all"
                      style={{
                        width: generatedDuration ? `${(currentTime / generatedDuration) * 100}%` : '0%'
                      }}
                    />
                  </div>
                </div>
              </div>

              <audio
                ref={audioRef}
                src={generatedAudioUrl}
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleAudioEnded}
                className="hidden"
              />
            </div>
          )}
        </div>

        {/* Right Column: Voice Styling & Modulation Controls */}
        <div className="space-y-6">
          <div className="p-5 rounded-2xl bg-bg-surface border border-border space-y-5">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <h3 className="text-sm font-bold text-text-primary flex items-center gap-2">
                <Sliders className="w-4 h-4 text-accent" /> Voice Cadence & DNA
              </h3>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent/10 text-accent">
                Style Profile
              </span>
            </div>

            {/* Style Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                Cadence Archetype
              </label>
              <div className="space-y-2">
                {[
                  {
                    id: 'indian_storyteller',
                    name: 'Indian Storyteller (Ramayan Flow)',
                    desc: 'Calibrated on classical Ramayan cadence · Pure Indian prosody & breath rhythm'
                  },
                  {
                    id: 'hinglish_documentary',
                    name: 'Hinglish Documentary',
                    desc: 'Dramatic, fast-paced narrative with high informational clarity'
                  },
                  {
                    id: 'geographic_narrative',
                    name: 'Geographic Narrative',
                    desc: 'Calm, expansive descriptive cadence for deep scenes'
                  },
                  {
                    id: 'emotional_drama',
                    name: 'Emotional Story',
                    desc: 'Warm, poignant human delivery with emotive micro-pauses'
                  }
                ].map(st => (
                  <button
                    key={st.id}
                    onClick={() => setSelectedStyle(st.id)}
                    className={`w-full text-left p-3 rounded-xl border transition-all ${
                      selectedStyle === st.id
                        ? 'border-accent bg-accent/10 text-text-primary shadow-sm'
                        : 'border-border bg-bg-elevated/40 hover:bg-bg-elevated text-text-muted hover:text-text-primary'
                    }`}
                  >
                    <div className="font-semibold text-xs flex items-center justify-between">
                      <span>{st.name}</span>
                      {selectedStyle === st.id && <Check className="w-3.5 h-3.5 text-accent" />}
                    </div>
                    <p className="text-[11px] text-text-muted mt-1 leading-snug">{st.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Speaking Rate Slider */}
            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-text-muted">Speech Rate Multiplier</span>
                <span className="font-mono text-accent font-medium">{speed.toFixed(2)}x</span>
              </div>
              <input
                type="range"
                min="0.8"
                max="1.2"
                step="0.05"
                value={speed}
                onChange={e => setSpeed(parseFloat(e.target.value))}
                className="w-full accent-accent h-1.5 bg-border rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text-muted">
                <span>0.8x (Deliberate)</span>
                <span>1.0x (Standard)</span>
                <span>1.2x (Fast)</span>
              </div>
            </div>

            {/* Background Music Suite */}
            <div className="space-y-3 pt-3 border-t border-border">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Music className="w-4 h-4 text-accent" />
                  <span className="text-xs font-semibold text-text-primary">Cinematic Music Bed</span>
                </div>
                <input
                  type="checkbox"
                  checked={bgMusic}
                  onChange={e => setBgMusic(e.target.checked)}
                  className="accent-accent w-4 h-4 rounded cursor-pointer"
                />
              </div>

              {bgMusic && (
                <div className="space-y-3 pt-2 animate-in fade-in duration-150">
                  <div className="space-y-1">
                    <label className="text-[11px] text-text-muted font-medium">Select Sound Suite</label>
                    <select
                      value={musicTrack}
                      onChange={e => setMusicTrack(e.target.value)}
                      className="w-full bg-bg-elevated border border-border rounded-lg p-2 text-xs text-text-primary focus:outline-none focus:border-accent"
                    >
                      {musicTracks.length > 0 ? (
                        musicTracks.map(track => (
                          <option key={track} value={track}>
                            {track.replace('_', ' ').toUpperCase()}
                          </option>
                        ))
                      ) : (
                        <option value="cinematic">CINEMATIC</option>
                      )}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-text-muted">
                      <span>Music Bed Level</span>
                      <span className="font-mono text-accent">{Math.round(musicVolume * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0.05"
                      max="0.30"
                      step="0.01"
                      value={musicVolume}
                      onChange={e => setMusicVolume(parseFloat(e.target.value))}
                      className="w-full accent-accent h-1.5 bg-border rounded-lg cursor-pointer"
                    />
                  </div>

                  <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    2.4 kHz Vocal Clarity Notch enabled automatically.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
