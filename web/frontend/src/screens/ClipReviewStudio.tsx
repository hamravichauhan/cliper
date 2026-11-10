import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { Clip, WordTimestamp, CAPTION_STYLE_OPTIONS, SONG_PRESETS } from '../types'
import { ScoreRing } from '../components/ui/ScoreRing'
import { ScoreBar } from '../components/ui/ScoreBar'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Input, Textarea } from '../components/ui/Input'
import { Slider } from '../components/ui/Slider'
import { Toggle } from '../components/ui/Toggle'
import { Tabs } from '../components/ui/Tabs'
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Check,
  X,
  Download,
  Copy,
  Scissors,
  Sparkles,
  HelpCircle,
  Undo2,
  Redo2,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Layers,
  FileText,
  Share2,
  ShieldAlert,
  Music,
  ChevronRight,
  Maximize2,
  Zap,
  Flame,
  Activity
} from 'lucide-react'

export const ClipReviewStudio: React.FC = () => {
  const {
    clips,
    selectedClipId,
    selectClip,
    setClipStatus,
    updateClipTitle,
    updateClipTrim,
    updateClipStyle,
    undoTrim,
    redoTrim,
    historyIndex,
    history,
    isPlaying,
    setIsPlaying,
    currentTime,
    setCurrentTime,
    isMuted,
    toggleMute,
    setShortcutsModalOpen,
    bulkExportApproved,
    addToast,
    brandKits,
    reRenderCurrentClip,
    downloadDeliveryBundle
  } = useStore()

  // Find active clip
  const clip = clips.find((c) => c.id === selectedClipId) || clips[0]

  // Video element reference for real playback
  const videoRef = useRef<HTMLVideoElement>(null)

  // Local inspector tab
  const [inspectorTab, setInspectorTab] = useState<'details' | 'polish' | 'captions' | 'audio' | 'pipeline' | 'copy' | 'brand'>('details')
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)

  // Post-Clip Viral Polish Micro-Edits State
  const [retentionBar, setRetentionBar] = useState(true)
  const [patternZoom, setPatternZoom] = useState(true)
  const [semanticHighlight, setSemanticHighlight] = useState(true)
  const [kineticSfx, setKineticSfx] = useState(true)
  const [isPolishReRendering, setIsPolishReRendering] = useState(false)

  // Audio & Song overlay state
  const [clipMuteOriginal, setClipMuteOriginal] = useState(false)
  const [clipAddSong, setClipAddSong] = useState(false)
  const [clipSong, setClipSong] = useState('ambient_lofi')
  const [clipSongVolume, setClipSongVolume] = useState(70)
  const [clipCustomSong, setClipCustomSong] = useState<string | null>(null)
  const [isAudioReRendering, setIsAudioReRendering] = useState(false)

  // AI Pipeline & Reframing State
  const [reframeMode, setReframeMode] = useState<'auto' | 'center'>('auto')
  const [autoZoom, setAutoZoom] = useState(true)
  const [multiCam, setMultiCam] = useState(true)
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [includeSfx, setIncludeSfx] = useState(true)
  const [antiCopyright, setAntiCopyright] = useState(false)
  const [topBanner, setTopBanner] = useState(true)
  const [broll, setBroll] = useState(false)
  const [isPipelineReRendering, setIsPipelineReRendering] = useState(false)

  // Autocut Word Deletion (Strike-through filler/pause spans)
  const [isCutMode, setIsCutMode] = useState(false)
  const [deletedWordIndices, setDeletedWordIndices] = useState<Set<number>>(new Set())

  const toggleWordCut = (idx: number) => {
    const next = new Set(deletedWordIndices)
    if (next.has(idx)) {
      next.delete(idx)
    } else {
      next.add(idx)
    }
    setDeletedWordIndices(next)
  }

  const handleApplyPolish = async () => {
    if (!clip) return
    setIsPolishReRendering(true)
    await reRenderCurrentClip(clip.id, {
      retention_bar: retentionBar,
      semantic_highlighting: semanticHighlight,
      pattern_zoom: patternZoom,
      include_sfx: kineticSfx,
      background_music: clipAddSong,
      mute_original: clipMuteOriginal,
      music_track: clipSong,
      music_volume: clipSongVolume / 100.0,
      top_banner: topBanner,
      reframe_mode: reframeMode,
      auto_zoom: autoZoom,
      multicam: multiCam
    })
    setIsPolishReRendering(false)
  }

  // Sync real video player with isPlaying
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    if (isPlaying) {
      vid.play().catch(() => {})
    } else {
      vid.pause()
    }
  }, [isPlaying, clip?.id])

  // Sync seek if needed
  useEffect(() => {
    const vid = videoRef.current
    if (!vid) return
    if (Math.abs(vid.currentTime - currentTime) > 0.4) {
      vid.currentTime = currentTime
    }
  }, [currentTime])

  // Playback timer simulation (fallback if video element not active)
  useEffect(() => {
    let animFrame: number
    let lastTime = performance.now()

    if (isPlaying && clip && !videoRef.current) {
      const step = (now: number) => {
        const delta = (now - lastTime) / 1000
        lastTime = now

        setCurrentTime(currentTime + delta >= clip.duration ? 0 : currentTime + delta)
        animFrame = requestAnimationFrame(step)
      }
      animFrame = requestAnimationFrame(step)
    }

    return () => cancelAnimationFrame(animFrame)
  }, [isPlaying, currentTime, clip, setCurrentTime])

  // Global Keyboard Navigation (J/K, Space, A, R, E, ?)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault()
        setIsPlaying(!isPlaying)
      } else if (e.key === 'j' || e.key === 'J') {
        // Next clip
        e.preventDefault()
        const idx = clips.findIndex((c) => c.id === clip?.id)
        if (idx < clips.length - 1) {
          selectClip(clips[idx + 1].id)
        }
      } else if (e.key === 'k' || e.key === 'K') {
        // Prev clip
        e.preventDefault()
        const idx = clips.findIndex((c) => c.id === clip?.id)
        if (idx > 0) {
          selectClip(clips[idx - 1].id)
        }
      } else if (e.key === 'a' || e.key === 'A') {
        e.preventDefault()
        if (clip) setClipStatus(clip.id, 'approved')
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault()
        if (clip) setClipStatus(clip.id, 'rejected')
      } else if (e.key === 'e' || e.key === 'E') {
        e.preventDefault()
        bulkExportApproved()
      } else if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
        e.preventDefault()
        if (e.shiftKey) redoTrim()
        else undoTrim()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isPlaying, clip, clips, selectClip, setClipStatus, bulkExportApproved, setIsPlaying, undoTrim, redoTrim])

  if (!clip) return null

  // Filter clips in left list
  const filteredClips = clips.filter((c) => {
    const matchesFilter =
      filterStatus === 'all' ? true : c.status === filterStatus
    const matchesSearch =
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.fullText.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const approvedCount = clips.filter((c) => c.status === 'approved').length

  // Find active word for karaoke caption simulation
  const activeWordIndex = clip.words.findIndex(
    (w) => currentTime >= w.start && currentTime <= w.end
  )

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60)
    const s = Math.floor(sec % 60)
    const ms = Math.floor((sec % 1) * 10)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms}`
  }

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(fieldName)
    addToast({ title: 'Copied to Clipboard', description: `Copied ${fieldName}.`, type: 'success' })
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-bg">
      {/* 3-Column Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* ========================================================= */}
        {/* COLUMN 1: Ranked Clip List (Left) */}
        {/* ========================================================= */}
        <div className="w-80 border-r border-border bg-bg-surface flex flex-col shrink-0">
          {/* Header & Search */}
          <div className="p-3 border-b border-border space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                <span>Ranked Candidates</span>
                <span className="font-mono text-[10px] text-accent px-1.5 py-0.2 rounded-full bg-accent/10 border border-accent/20">
                  {clips.length}
                </span>
              </span>
              <span className="text-[10px] font-mono text-text-muted">
                J/K to navigate
              </span>
            </div>

            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search clips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#18181B] border border-border focus:border-accent text-xs rounded-control pl-8 pr-3 py-1.5 text-text-primary placeholder:text-text-muted outline-none transition-colors"
              />
            </div>

            {/* Filter pills */}
            <div className="flex items-center gap-1 pt-0.5">
              {(['all', 'approved', 'pending', 'rejected'] as const).map((status) => {
                const count = status === 'all' ? clips.length : clips.filter((c) => c.status === status).length
                const isActive = filterStatus === status
                return (
                  <button
                    key={status}
                    onClick={() => setFilterStatus(status)}
                    className={`text-[10px] capitalize px-2 py-1 rounded-[5px] transition-all flex items-center gap-1 ${
                      isActive
                        ? 'bg-bg-elevated text-text-primary font-medium border border-border shadow-subtle'
                        : 'text-text-muted hover:text-text-secondary'
                    }`}
                  >
                    <span>{status}</span>
                    <span className="text-[9px] font-mono text-text-muted">({count})</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Scrollable Clip Cards */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
            {filteredClips.map((c, i) => {
              const isSelected = c.id === clip.id
              return (
                <div
                  key={c.id}
                  onClick={() => selectClip(c.id)}
                  className={`group relative p-2.5 rounded-card border transition-all duration-150 cursor-pointer select-none ${
                    isSelected
                      ? 'bg-bg-elevated border-accent shadow-sm ring-1 ring-accent/30'
                      : 'bg-[#141416] border-border hover:border-[#3F3F46] hover:bg-[#18181B]'
                  }`}
                >
                  <div className="flex gap-2.5 items-start">
                    {/* 9:16 Aspect Mini Thumbnail */}
                    <div className="relative w-14 h-20 rounded-control overflow-hidden bg-black shrink-0 border border-border/80">
                      <img
                        src={c.thumbnailUrl}
                        alt={c.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <span className="absolute bottom-1 right-1 text-[9px] font-mono font-medium text-white px-1 py-0.2 rounded bg-black/70">
                        {Math.round(c.duration)}s
                      </span>
                    </div>

                    {/* Clip Info */}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-[10px] font-mono text-text-muted">#{i + 1}</span>
                        <ScoreRing score={c.viralityScore} size="sm" />
                      </div>

                      <h4 className="text-xs font-semibold text-text-primary line-clamp-2 leading-snug">
                        {c.title}
                      </h4>

                      <div className="flex items-center justify-between pt-1 text-[10px]">
                        <span className="text-text-muted font-mono">
                          {formatSeconds(c.startTime)}
                        </span>
                        {c.status === 'approved' && (
                          <Badge variant="success" size="sm">Approved</Badge>
                        )}
                        {c.status === 'rejected' && (
                          <Badge variant="danger" size="sm">Rejected</Badge>
                        )}
                        {c.status === 'pending' && (
                          <Badge variant="muted" size="sm">Review</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}

            {filteredClips.length === 0 && (
              <div className="py-12 text-center text-xs text-text-muted">
                No clips match this filter.
              </div>
            )}
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 2: 9:16 Player & Word-Level Transcript (Center) */}
        {/* ========================================================= */}
        <div className="flex-1 flex flex-col bg-bg overflow-y-auto">
          {/* Top Bar inside Center Column */}
          <div className="h-11 border-b border-border px-5 flex items-center justify-between bg-bg-surface/50 text-xs shrink-0">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-text-primary truncate max-w-md">
                {clip.title}
              </span>
              <ScoreRing score={clip.viralityScore} size="sm" showLabel />
            </div>

            {/* Clip Status Toggle Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant={clip.status === 'approved' ? 'primary' : 'secondary'}
                size="sm"
                icon={<Check className="w-3.5 h-3.5" />}
                onClick={() => setClipStatus(clip.id, 'approved')}
              >
                Approve (A)
              </Button>
              <Button
                variant={clip.status === 'rejected' ? 'danger' : 'ghost'}
                size="sm"
                icon={<X className="w-3.5 h-3.5" />}
                onClick={() => setClipStatus(clip.id, 'rejected')}
              >
                Reject (R)
              </Button>
              <Button
                variant="secondary"
                size="sm"
                icon={<RotateCw className="w-3.5 h-3.5" />}
                onClick={() => reRenderCurrentClip(clip.id, {})}
                title="Re-render with Apple VideoToolbox"
              >
                Re-render
              </Button>
            </div>
          </div>

          {/* Player + Controls Container */}
          <div className="p-4 flex flex-col items-center justify-center space-y-4">
            {/* 9:16 Mobile Player Canvas */}
            <div className="relative w-[300px] h-[533px] bg-black rounded-card border border-border shadow-2xl overflow-hidden select-none group">
              {clip.videoUrl ? (
                <video
                  ref={videoRef}
                  src={clip.videoUrl}
                  poster={clip.thumbnailUrl}
                  className="w-full h-full object-cover"
                  playsInline
                  muted={isMuted}
                  loop
                  onTimeUpdate={(e) => setCurrentTime((e.target as HTMLVideoElement).currentTime)}
                />
              ) : (
                <img
                  src={clip.thumbnailUrl}
                  alt="Video frame"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isPlaying ? 'scale-105' : 'scale-100'
                  }`}
                />
              )}
              {/* Big Center Play/Pause button on hover */}
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-150"
              >
                <div className="w-14 h-14 rounded-full bg-accent/90 text-[#09090B] flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                </div>
              </button>

              {/* Live Retention Progress Bar on Mobile Canvas */}
              {retentionBar && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/40 z-20 pointer-events-none">
                  <div
                    className="h-full bg-[#00FF88] shadow-[0_0_8px_#00FF88] transition-all duration-100 ease-linear"
                    style={{
                      width: `${Math.min(100, Math.max(0, (currentTime / (clip.duration || 1)) * 100))}%`
                    }}
                  />
                </div>
              )}
            </div>

            {/* Scrubber & Playback Controls Bar */}
            <div className="w-full max-w-[560px] bg-bg-surface border border-border rounded-card p-3 space-y-2">
              {/* Scrubber Bar */}
              <div className="relative flex items-center h-4 cursor-pointer">
                <input
                  type="range"
                  min={0}
                  max={clip.duration}
                  step={0.1}
                  value={currentTime}
                  onChange={(e) => setCurrentTime(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#1F1F23] rounded-lg appearance-none cursor-pointer accent-[#A3E635]"
                  style={{
                    background: `linear-gradient(to right, #A3E635 0%, #A3E635 ${
                      (currentTime / clip.duration) * 100
                    }%, #27272A ${(currentTime / clip.duration) * 100}%, #27272A 100%)`
                  }}
                />
              </div>

              {/* Controls Row */}
              <div className="flex items-center justify-between text-xs text-text-secondary pt-0.5">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 text-text-primary hover:text-accent rounded-control hover:bg-bg-elevated transition-colors"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                  </button>

                  <button
                    onClick={() => setCurrentTime(Math.max(0, currentTime - 0.5))}
                    className="p-1.5 text-text-muted hover:text-text-primary rounded-control hover:bg-bg-elevated transition-colors"
                    title="Nudge -0.5s"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setCurrentTime(Math.min(clip.duration, currentTime + 0.5))}
                    className="p-1.5 text-text-muted hover:text-text-primary rounded-control hover:bg-bg-elevated transition-colors"
                    title="Nudge +0.5s"
                  >
                    <RotateCw className="w-3.5 h-3.5" />
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-1.5 text-text-muted hover:text-text-primary rounded-control hover:bg-bg-elevated transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-status-danger" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                </div>

                <div className="font-mono text-xs text-text-primary flex items-center gap-1.5">
                  <span>{formatSeconds(currentTime)}</span>
                  <span className="text-text-muted">/</span>
                  <span className="text-text-muted">{formatSeconds(clip.duration)}</span>
                </div>
              </div>
            </div>

            {/* Interactive Transcript & Trim Section */}
            <div className="w-full max-w-[680px] bg-bg-surface border border-border rounded-card p-4 space-y-3">
              <div className="flex justify-between items-center text-xs pb-1 border-b border-border/80">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-text-primary flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-accent" />
                    <span>Interactive Transcript</span>
                  </span>

                  {/* Mode Switch: Seek vs Autocut Word Trim */}
                  <div className="flex items-center bg-[#18181B] border border-border rounded p-0.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setIsCutMode(false)}
                      className={`px-2 py-0.5 rounded transition-all ${
                        !isCutMode ? 'bg-accent text-[#09090B] font-bold' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      Seek Mode
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCutMode(true)}
                      className={`px-2 py-0.5 rounded transition-all flex items-center gap-1 ${
                        isCutMode ? 'bg-danger text-white font-bold' : 'text-text-muted hover:text-text-primary'
                      }`}
                    >
                      <Scissors className="w-2.5 h-2.5" />
                      Cut Spans {deletedWordIndices.size > 0 && `(${deletedWordIndices.size})`}
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {deletedWordIndices.size > 0 && (
                    <button
                      type="button"
                      onClick={() => setDeletedWordIndices(new Set())}
                      className="text-[10px] text-danger hover:underline mr-1"
                    >
                      Reset Cuts
                    </button>
                  )}
                  <button
                    onClick={undoTrim}
                    disabled={historyIndex < 0}
                    className="p-1 text-text-muted hover:text-text-primary disabled:opacity-30 rounded hover:bg-bg-elevated"
                    title="Undo trim (⌘Z)"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={redoTrim}
                    disabled={historyIndex >= history.length - 1}
                    className="p-1 text-text-muted hover:text-text-primary disabled:opacity-30 rounded hover:bg-bg-elevated"
                    title="Redo trim (⌘⇧Z)"
                  >
                    <Redo2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Clickable Words Stream */}
              <div className="flex flex-wrap gap-1.5 text-xs leading-relaxed max-h-36 overflow-y-auto p-1 font-sans">
                {clip.words.map((w, idx) => {
                  const isActive = currentTime >= w.start && currentTime <= w.end
                  const isCut = deletedWordIndices.has(idx)
                  return (
                    <button
                      key={w.id}
                      onClick={() => {
                        if (isCutMode) {
                          toggleWordCut(idx)
                        } else {
                          setCurrentTime(w.start)
                          setIsPlaying(true)
                        }
                      }}
                      className={`px-1.5 py-0.5 rounded transition-all select-none text-left ${
                        isCut
                          ? 'bg-rose-950/80 text-rose-400 line-through border border-rose-800/60'
                          : isActive
                          ? 'bg-accent text-[#09090B] font-bold shadow-sm scale-105'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                      }`}
                      title={
                        isCutMode
                          ? isCut
                            ? 'Click to restore word'
                            : 'Click to cut word from clip'
                          : `Seek to ${w.start.toFixed(1)}s`
                      }
                    >
                      {w.word}
                    </button>
                  )
                })}
              </div>

              {/* Interactive Start/End Trim Handles */}
              <div className="pt-2 border-t border-border flex items-center justify-between text-xs">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-muted text-[11px]">Start:</span>
                    <input
                      type="number"
                      step={0.5}
                      value={clip.startTime}
                      onChange={(e) => updateClipTrim(clip.id, Number(e.target.value), clip.endTime)}
                      className="w-16 bg-[#18181B] border border-border text-center rounded text-xs font-mono py-1 text-text-primary"
                    />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-text-muted text-[11px]">End:</span>
                    <input
                      type="number"
                      step={0.5}
                      value={clip.endTime}
                      onChange={(e) => updateClipTrim(clip.id, clip.startTime, Number(e.target.value))}
                      className="w-16 bg-[#18181B] border border-border text-center rounded text-xs font-mono py-1 text-text-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge variant="accent">Duration: {clip.duration.toFixed(1)}s</Badge>
                  <span className="text-[10px] text-text-muted font-mono">
                    Snapped -{clip.narrativeFlags.silenceSnappedMs}ms
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* COLUMN 3: Inspector Tabs (Right) */}
        {/* ========================================================= */}
        <div className="w-84 border-l border-border bg-bg-surface flex flex-col shrink-0">
          {/* Tabs Header */}
          <div className="p-2 border-b border-border bg-bg-surface">
            <Tabs
              tabs={[
                { id: 'details', label: 'Details' },
                { id: 'polish', label: 'Viral Polish' },
                { id: 'captions', label: 'Captions' },
                { id: 'audio', label: 'Audio' },
                { id: 'pipeline', label: 'AI Reframing' },
                { id: 'copy', label: 'Copy' },
                { id: 'brand', label: 'Brand' }
              ]}
              activeTab={inspectorTab}
              onChange={(tab) => setInspectorTab(tab as any)}
            />
          </div>

          {/* Inspector Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* TAB 1: DETAILS */}
            {inspectorTab === 'details' && (
              <div className="space-y-5">
                {/* Score Summary Box */}
                <div className="bg-[#18181B] border border-border rounded-card p-4 flex items-center gap-4">
                  <ScoreRing score={clip.viralityScore} size="lg" />
                  <div>
                    <h4 className="text-sm font-semibold text-text-primary">
                      {clip.viralityScore >= 80 ? 'High Viral Potential' : 'Moderate Engagement'}
                    </h4>
                    <p className="text-xs text-text-secondary mt-0.5">
                      Predicted top 5% completion rate on TikTok & Reels.
                    </p>
                  </div>
                </div>

                {/* 6-Factor Breakdown */}
                <div className="space-y-3">
                  <h5 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                    6-Factor Scoring Breakdown
                  </h5>
                  <div className="space-y-1.5 bg-[#141416] border border-border rounded-card p-3">
                    <ScoreBar label="Hook Intensity" weight={30} value={clip.factors.hook} />
                    <ScoreBar label="Acoustic Energy" weight={20} value={clip.factors.acoustics} />
                    <ScoreBar label="Pacing (WPM)" weight={15} value={clip.factors.pace} />
                    <ScoreBar label="Payoff Resolution" weight={15} value={clip.factors.payoff} />
                    <ScoreBar label="Sentiment Valence" weight={10} value={clip.factors.sentiment} />
                    <ScoreBar label="Target Duration" weight={10} value={clip.factors.duration} />
                  </div>
                </div>

                {/* Narrative Safety & Quality Flags */}
                <div className="space-y-2">
                  <h5 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                    Pipeline Transformation Log
                  </h5>
                  <div className="bg-[#141416] border border-border rounded-card p-3 space-y-2 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Sponsorship Risk</span>
                      <span className="text-status-success font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> 0% (Clean)
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Fillers Scrubbed</span>
                      <span className="font-mono text-text-primary">
                        {clip.narrativeFlags.fillersScrubbed} words
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Silence Snap</span>
                      <span className="font-mono text-accent">
                        -{clip.narrativeFlags.silenceSnappedMs}ms
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-text-secondary">Tempo Multiplier</span>
                      <span className="font-mono text-text-muted">1.025x (Safe)</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: POST-GENERATION VIRAL POLISH */}
            {inspectorTab === 'polish' && (
              <div className="space-y-4">
                <div className="bg-[#18181B] border border-border rounded-card p-3 space-y-1">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <h4 className="text-xs font-semibold text-text-primary">
                      Post-Clip Viral Polish
                    </h4>
                  </div>
                  <p className="text-[11px] text-text-secondary leading-relaxed">
                    Fine-tune micro-edits on this generated clip to maximize audience completion rate and rewatch score.
                  </p>
                </div>

                {/* 1. Retention Progress Bar */}
                <div className="bg-[#18181B] border border-border rounded-card p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-text-primary block">
                        3px Retention Progress Bar
                      </span>
                      <span className="text-[10px] text-text-muted">
                        Stops viewer swipe-aways on mobile
                      </span>
                    </div>
                    <Toggle checked={retentionBar} onChange={setRetentionBar} />
                  </div>
                  <p className="text-[11px] text-text-secondary">
                    Burns a slim neon mint-green progress bar across the bottom. Viewers who see few seconds left finish the video.
                  </p>
                  {retentionBar && (
                    <div className="pt-1.5 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#00FF88] shadow-[0_0_6px_#00FF88]" />
                      <span className="text-[10px] font-mono text-[#00FF88]">Live Canvas Preview Active</span>
                    </div>
                  )}
                </div>

                {/* 2. Pattern Interrupt Snap-Zooms */}
                <div className="bg-[#18181B] border border-border rounded-card p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-text-primary block">
                        Pattern Interrupt Snap-Zooms
                      </span>
                      <span className="text-[10px] text-text-muted">
                        Cuts visual monotony every 3-5 seconds
                      </span>
                    </div>
                    <Toggle checked={patternZoom} onChange={setPatternZoom} />
                  </div>
                  <p className="text-[11px] text-text-secondary">
                    Applies sudden 1.18x punch-in cuts on key sentence transitions to reset the viewer's dopamine clock.
                  </p>
                </div>

                {/* 3. Semantic Keyword Highlighting */}
                <div className="bg-[#18181B] border border-border rounded-card p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-text-primary block">
                        Semantic Keyword Highlighting
                      </span>
                      <span className="text-[10px] text-text-muted">
                        Dynamic color pop on high-salience words
                      </span>
                    </div>
                    <Toggle checked={semanticHighlight} onChange={setSemanticHighlight} />
                  </div>
                  <p className="text-[11px] text-text-secondary">
                    Automatically colors currency & metrics in Mint Green, and alert words in Fire Red.
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#00FF88]/15 text-[#00FF88] border border-[#00FF88]/30 font-mono font-semibold">
                      $100K / 99% (Mint)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FF3B30]/15 text-[#FF3B30] border border-[#FF3B30]/30 font-mono font-semibold">
                      Never / Mistake (Red)
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-[#FFEA00]/15 text-[#FFEA00] border border-[#FFEA00]/30 font-mono font-semibold">
                      Action (Style Pop)
                    </span>
                  </div>
                </div>

                {/* 4. Kinetic Sound Effects */}
                <div className="bg-[#18181B] border border-border rounded-card p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-text-primary block">
                        Kinetic Micro-SFX Drops
                      </span>
                      <span className="text-[10px] text-text-muted">
                        Auditory triggers on keyword hits
                      </span>
                    </div>
                    <Toggle checked={kineticSfx} onChange={setKineticSfx} />
                  </div>
                  <p className="text-[11px] text-text-secondary">
                    Plays procedurally generated 48kHz audio pops on key highlights, dings on stats, and subtle whooshes.
                  </p>
                </div>

                {/* Action Button: Apply Polish & Re-Render */}
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center shadow-lg"
                  icon={isPolishReRendering ? <RotateCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
                  disabled={isPolishReRendering}
                  onClick={handleApplyPolish}
                >
                  {isPolishReRendering ? 'Burning Polish with VideoToolbox (~2s)...' : 'Apply Viral Polish & Re-Render'}
                </Button>
              </div>
            )}

            {/* TAB 2: CAPTIONS */}
            {inspectorTab === 'captions' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">
                    Caption Aesthetic Preset
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {CAPTION_STYLE_OPTIONS.map((style) => (
                      <button
                        key={style.id}
                        type="button"
                        onClick={() => updateClipStyle(clip.id, style.id)}
                        className={`p-2.5 rounded-control border text-left transition-all ${
                          clip.captionStyle === style.id
                            ? 'bg-bg-elevated border-accent ring-1 ring-accent/30'
                            : 'bg-[#141416] border-border hover:border-[#3F3F46]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-semibold text-text-primary">{style.name}</p>
                          <div className="flex items-center gap-1">
                            <span
                              className="w-2 h-2 rounded-full border border-black/40"
                              style={{ backgroundColor: style.primaryColor }}
                            />
                            <span
                              className="w-2 h-2 rounded-full border border-black/40"
                              style={{ backgroundColor: style.highlightColor }}
                            />
                          </div>
                        </div>
                        <p className="text-[10px] text-text-muted mt-0.5 truncate">{style.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <Input
                  label="Top Context Headline (No ugly box)"
                  value={clip.title}
                  onChange={(e) => updateClipTitle(clip.id, e.target.value)}
                  placeholder="Spoken thesis headline..."
                />

                <Slider
                  label="Caption Font Size"
                  min={32}
                  max={64}
                  value={46}
                  unit="pt"
                  onChange={() => {}}
                />

                <Toggle
                  label="Force Uppercase Text"
                  checked={true}
                  onChange={() => {}}
                />

                <Button
                  variant="primary"
                  size="sm"
                  className="w-full mt-2"
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={() =>
                    reRenderCurrentClip(clip.id, {
                      title: clip.title,
                      caption_style: clip.captionStyle
                    })
                  }
                >
                  Apply & Re-render Video
                </Button>
              </div>
            )}

            {/* TAB: AUDIO & SONG */}
            {inspectorTab === 'audio' && (
              <div className="space-y-4">
                <div className="p-3.5 bg-[#18181B] border border-border rounded-control space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                      {clipMuteOriginal ? (
                        <VolumeX className="w-3.5 h-3.5 text-danger" />
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-accent" />
                      )}
                      Original Video Audio
                    </span>
                    <Badge variant={clipMuteOriginal ? 'danger' : 'accent'} size="sm">
                      {clipMuteOriginal ? 'Muted' : 'Audible (100%)'}
                    </Badge>
                  </div>

                  <Toggle
                    label="Mute Video Audio Completely"
                    description="Silence dialogue and background noise from the source video."
                    checked={clipMuteOriginal}
                    onChange={setClipMuteOriginal}
                  />
                </div>

                <div className="p-3.5 bg-[#18181B] border border-border rounded-control space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                      <Music className="w-3.5 h-3.5 text-accent" />
                      Background Song / Track
                    </span>
                    <Badge variant={clipAddSong ? 'accent' : 'muted'} size="sm">
                      {clipAddSong ? 'Active' : 'Disabled'}
                    </Badge>
                  </div>

                  <Toggle
                    label="Layer Song / Beat Over Clip"
                    description="Add viral music beneath dialogue or as the primary soundtrack."
                    checked={clipAddSong}
                    onChange={setClipAddSong}
                  />

                  {clipAddSong && (
                    <div className="pt-2 space-y-3 border-t border-border/60">
                      <div className="grid grid-cols-2 gap-2">
                        {SONG_PRESETS.map((song) => {
                          const isSelected = clipSong === song.id && !clipCustomSong
                          return (
                            <button
                              key={song.id}
                              type="button"
                              onClick={() => {
                                setClipSong(song.id)
                                setClipCustomSong(null)
                              }}
                              className={`p-2 rounded-control border text-left transition-all ${
                                isSelected
                                  ? 'bg-bg-elevated border-accent ring-1 ring-accent/30'
                                  : 'bg-[#141416] border-border hover:border-[#3F3F46]'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-0.5">
                                <span className="text-sm">{song.icon}</span>
                                <span className="text-[9px] font-mono text-accent">{song.bpm} BPM</span>
                              </div>
                              <p className="text-xs font-semibold text-text-primary truncate">{song.name}</p>
                              <p className="text-[10px] text-text-muted truncate">{song.genre}</p>
                            </button>
                          )
                        })}
                      </div>

                      <Slider
                        label="Song Volume Level"
                        min={10}
                        max={100}
                        value={clipSongVolume}
                        unit="%"
                        onChange={setClipSongVolume}
                      />

                      <div>
                        <label className="block text-xs font-medium text-text-secondary mb-1">
                          Upload Custom Track (.mp3, .wav)
                        </label>
                        <input
                          type="file"
                          accept="audio/*"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (file) {
                              const formData = new FormData()
                              formData.append('file', file)
                              try {
                                const res = await fetch('/api/upload', {
                                  method: 'POST',
                                  body: formData
                                })
                                if (res.ok) {
                                  const data = await res.json()
                                  setClipCustomSong(data.file_path)
                                  addToast({
                                    title: 'Custom Audio Loaded',
                                    description: file.name,
                                    type: 'success'
                                  })
                                }
                              } catch {
                                addToast({ title: 'Upload Failed', type: 'danger' })
                              }
                            }
                          }}
                          className="w-full text-xs text-text-muted file:mr-2 file:py-1 file:px-2 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-bg-elevated file:text-text-primary hover:file:bg-[#27272A] file:cursor-pointer"
                        />
                        {clipCustomSong && (
                          <span className="text-[10px] text-accent mt-1 block font-mono truncate">
                            ✓ {clipCustomSong.split('/').pop()}
                          </span>
                        )}
                      </div>

                      <div className="p-2.5 rounded bg-bg-surface border border-border text-[11px] text-text-secondary leading-relaxed">
                        {clipMuteOriginal
                          ? '⚡ Original video dialogue is muted. This song will play as the full primary soundtrack.'
                          : '🎧 Original dialogue is audible. This song will automatically duck smoothly beneath spoken sentences.'}
                      </div>
                    </div>
                  )}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  disabled={isAudioReRendering}
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={async () => {
                    setIsAudioReRendering(true)
                    try {
                      await reRenderCurrentClip(clip.id, {
                        mute_original: clipMuteOriginal,
                        background_music: clipAddSong,
                        music_track: clipCustomSong || clipSong,
                        music_volume: clipMuteOriginal
                          ? clipSongVolume / 100
                          : Number(((clipSongVolume / 100) * 0.35).toFixed(2))
                      })
                    } finally {
                      setIsAudioReRendering(false)
                    }
                  }}
                >
                  {isAudioReRendering ? 'Re-Rendering Audio with VideoToolbox...' : 'Apply & Re-Render Audio'}
                </Button>
              </div>
            )}

            {/* TAB: AI PIPELINE & FRAMING */}
            {inspectorTab === 'pipeline' && (
              <div className="space-y-4">
                {/* 9:16 Reframe Mode */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-medium text-text-secondary">
                    9:16 Video Reframe Mode
                  </label>
                  <select
                    value={reframeMode}
                    onChange={(e) => setReframeMode(e.target.value as any)}
                    className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                  >
                    <option value="auto">🤖 Auto-Detect (Face-Tracking + EMA)</option>
                    <option value="center">🎯 Center Crop (Static 9:16)</option>
                  </select>
                </div>

                {/* AI Feature Toggles */}
                <div className="space-y-3 pt-2 border-t border-border/80">
                  <Toggle
                    label="Multi-Cam Active Speaker Auto-Cut"
                    description="Dynamically switch camera framing to active speaker."
                    checked={multiCam}
                    onChange={setMultiCam}
                  />

                  <Toggle
                    label="Dynamic Punch-In Auto-Zoom"
                    description="1.15x punch-in zooms on high-energy sentence hooks."
                    checked={autoZoom}
                    onChange={setAutoZoom}
                  />

                  <Toggle
                    label="Animated Keyword SFX & Pops"
                    description="Trigger whoosh SFX and animated emphasis on power words."
                    checked={includeSfx}
                    onChange={setIncludeSfx}
                  />

                  <Toggle
                    label="Anti-Copyright Transform Engine"
                    description="1.025x subtle tempo + pitch shift to prevent content ID flags."
                    checked={antiCopyright}
                    onChange={setAntiCopyright}
                  />

                  <Toggle
                    label="Top Hook Headline Banner"
                    description="Burn clean context headline at top safe area."
                    checked={topBanner}
                    onChange={setTopBanner}
                  />

                  <Toggle
                    label="B-Roll Narrative Cutaways"
                    description="Insert visual concept cutaways during setups."
                    checked={broll}
                    onChange={setBroll}
                  />
                </div>

                {/* Autocut Status */}
                {deletedWordIndices.size > 0 && (
                  <div className="p-3 bg-danger/10 border border-danger/30 rounded-control flex items-center justify-between text-xs">
                    <span className="text-danger font-medium">
                      ✂️ {deletedWordIndices.size} word spans will be cut out
                    </span>
                    <button
                      type="button"
                      onClick={() => setDeletedWordIndices(new Set())}
                      className="text-[11px] text-text-muted hover:text-white underline"
                    >
                      Clear
                    </button>
                  </div>
                )}

                <Button
                  variant="primary"
                  size="sm"
                  className="w-full mt-2"
                  disabled={isPipelineReRendering}
                  icon={<Sparkles className="w-3.5 h-3.5" />}
                  onClick={async () => {
                    setIsPipelineReRendering(true)
                    try {
                      await reRenderCurrentClip(clip.id, {
                        title: clip.title,
                        caption_style: clip.captionStyle,
                        reframe_mode: reframeMode,
                        auto_zoom: autoZoom,
                        multicam: multiCam,
                        top_banner: topBanner,
                        include_emojis: includeEmojis,
                        include_sfx: includeSfx,
                        anti_copyright: antiCopyright,
                        broll: broll,
                        deleted_words: Array.from(deletedWordIndices)
                      })
                    } finally {
                      setIsPipelineReRendering(false)
                    }
                  }}
                >
                  {isPipelineReRendering
                    ? 'Re-Rendering with VideoToolbox...'
                    : 'Apply Pipeline & Re-Render'}
                </Button>
              </div>
            )}

            {/* TAB 3: COPY (SOCIAL METADATA) */}
            {inspectorTab === 'copy' && (
              <div className="space-y-4">
                {/* YouTube Title */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-secondary font-medium">YouTube Shorts Title</span>
                    <button
                      onClick={() => handleCopy(clip.copy.youtubeTitle, 'YouTube Title')}
                      className="text-[11px] text-accent hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedField === 'YouTube Title' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <Input value={clip.copy.youtubeTitle} readOnly />
                </div>

                {/* YouTube Description */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-secondary font-medium">Description</span>
                    <button
                      onClick={() => handleCopy(clip.copy.youtubeDescription, 'Description')}
                      className="text-[11px] text-accent hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedField === 'Description' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <Textarea rows={3} value={clip.copy.youtubeDescription} readOnly />
                </div>

                {/* Instagram Caption */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-secondary font-medium">Instagram / TikTok Caption</span>
                    <button
                      onClick={() => handleCopy(clip.copy.instagramCaption, 'Instagram Caption')}
                      className="text-[11px] text-accent hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      {copiedField === 'Instagram Caption' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <Textarea rows={3} value={clip.copy.instagramCaption} readOnly />
                </div>

                {/* Hashtags */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-text-secondary font-medium">Viral Hashtags</span>
                    <button
                      onClick={() => handleCopy(clip.copy.hashtags.join(' '), 'Hashtags')}
                      className="text-[11px] text-accent hover:underline flex items-center gap-1"
                    >
                      <Copy className="w-3 h-3" />
                      Copy All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1 p-2 bg-[#141416] border border-border rounded-control">
                    {clip.copy.hashtags.map((tag) => (
                      <span key={tag} className="text-[11px] font-mono text-accent/90">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: BRAND */}
            {inspectorTab === 'brand' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Active Brand Kit
                  </label>
                  <select
                    className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                    defaultValue={clip.brandKitId || 'bk-1'}
                  >
                    {brandKits.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name} ({b.handle})
                      </option>
                    ))}
                  </select>
                </div>

                <Input
                  label="Watermark Social Handle"
                  value={clip.watermarkHandle || '@alexhormozi'}
                  onChange={() => {}}
                />

                <Slider
                  label="Watermark Opacity"
                  min={10}
                  max={100}
                  value={75}
                  unit="%"
                  onChange={() => {}}
                />

                <Toggle
                  label="Burn Client Logo on Intro (0-2s)"
                  checked={true}
                  onChange={() => {}}
                />

                <div className="pt-2 border-t border-border space-y-3">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-text-muted">
                    Transformative Engine Features
                  </span>
                  <Toggle
                    label="Anti-Copyright Audio Shift (1.025x)"
                    description="Subtle tempo & EQ shift to evade false-positive bot flags."
                    checked={true}
                    onChange={() => {}}
                  />
                  <Toggle
                    label="Multi-Cam Active Speaker Auto-Cut"
                    description="Switches camera framing dynamically on speaker switch."
                    checked={true}
                    onChange={() => {}}
                  />
                  <Toggle
                    label="Dynamic Smart Zoom Punch-ins"
                    description="Adds subtle scale punch-ins on high-emotion phrases."
                    checked={true}
                    onChange={() => {}}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* BOTTOM BULK BAR (Appears when clips are approved) */}
      {/* ========================================================= */}
      {approvedCount > 0 && (
        <div className="h-14 border-t border-border bg-[#111113] px-6 flex items-center justify-between z-20 shrink-0">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium text-text-primary">
              <strong className="text-accent">{approvedCount}</strong> of {clips.length} clips approved for export
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-text-muted hidden sm:inline">
              Format: <span className="font-mono text-text-secondary">Apple ProRes 422 / 9:16 MP4</span>
            </span>
            <Button
              variant="primary"
              size="md"
              icon={<Download className="w-4 h-4" />}
              onClick={bulkExportApproved}
            >
              Export {approvedCount} Approved Clips (E)
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
