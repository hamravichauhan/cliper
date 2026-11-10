import React, { useState, useEffect, useRef } from 'react'
import { useStore } from '../store/useStore'
import { Clip, WordTimestamp } from '../types'
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
  ChevronRight,
  Maximize2
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
  const [inspectorTab, setInspectorTab] = useState<'details' | 'captions' | 'copy' | 'brand'>('details')
  const [filterStatus, setFilterStatus] = useState<'all' | 'approved' | 'pending' | 'rejected'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [copiedField, setCopiedField] = useState<string | null>(null)

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
              <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

              {/* Top Context Headline Overlay (NO UGLY BOX!) */}
              <div className="absolute top-12 left-4 right-4 text-center pointer-events-none">
                <span
                  className="inline-block text-white font-extrabold text-sm uppercase tracking-wide px-3 py-1 text-center"
                  style={{
                    textShadow: '0 2px 8px rgba(0,0,0,0.9), 0 0 4px #000',
                    WebkitTextStroke: '1px #000'
                  }}
                >
                  {clip.title}
                </span>
              </div>

              {/* Active Spoken Caption Karaoke Highlight */}
              <div className="absolute bottom-16 left-4 right-4 text-center pointer-events-none px-2">
                <div className="inline-flex flex-wrap justify-center items-center gap-1.5">
                  {clip.words.slice(0, 10).map((w, idx) => {
                    const isActive = idx === (activeWordIndex >= 0 ? activeWordIndex % 10 : 0)
                    return (
                      <span
                        key={w.id}
                        className={`text-base font-extrabold uppercase tracking-tight transition-all duration-150 ${
                          isActive
                            ? 'text-[#FACC15] scale-110 drop-shadow-[0_2px_10px_rgba(250,204,21,0.8)]'
                            : 'text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]'
                        }`}
                        style={{ WebkitTextStroke: '1.2px #000' }}
                      >
                        {w.word}
                      </span>
                    )
                  })}
                </div>
              </div>

              {/* Watermark Handle Preview */}
              {clip.watermarkHandle && (
                <div className="absolute bottom-4 right-4 text-[10px] font-mono text-white/80 bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm pointer-events-none">
                  {clip.watermarkHandle}
                </div>
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
                <span className="font-semibold text-text-primary flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-accent" />
                  <span>Interactive Transcript</span>
                  <span className="text-[10px] text-text-muted">(Click word to seek)</span>
                </span>

                <div className="flex items-center gap-2">
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
                  return (
                    <button
                      key={w.id}
                      onClick={() => {
                        setCurrentTime(w.start)
                        setIsPlaying(true)
                      }}
                      className={`px-1.5 py-0.5 rounded transition-all select-none text-left ${
                        isActive
                          ? 'bg-accent text-[#09090B] font-bold shadow-sm scale-105'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                      }`}
                      title={`Seek to ${w.start.toFixed(1)}s`}
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
                { id: 'captions', label: 'Captions' },
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

            {/* TAB 2: CAPTIONS */}
            {inspectorTab === 'captions' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-2">
                    Caption Aesthetic Preset
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'hormozi', name: 'Hormozi', desc: 'Yellow pop, bold' },
                      { id: 'mrbeast', name: 'MrBeast', desc: 'Neon cyan, energy' },
                      { id: 'cyberpunk', name: 'Cyberpunk', desc: 'High contrast glitch' },
                      { id: 'minimal', name: 'Minimal', desc: 'Clean white shadow' }
                    ].map((style) => (
                      <button
                        key={style.id}
                        onClick={() => updateClipStyle(clip.id, style.id as any)}
                        className={`p-2.5 rounded-control border text-left transition-all ${
                          clip.captionStyle === style.id
                            ? 'bg-bg-elevated border-accent ring-1 ring-accent/30'
                            : 'bg-[#141416] border-border hover:border-[#3F3F46]'
                        }`}
                      >
                        <p className="text-xs font-semibold text-text-primary">{style.name}</p>
                        <p className="text-[10px] text-text-muted mt-0.5">{style.desc}</p>
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
