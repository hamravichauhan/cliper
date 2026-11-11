import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { CaptionStyle, CAPTION_STYLE_OPTIONS, SongOption, SONG_PRESETS } from '../types'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Slider } from '../components/ui/Slider'
import { Toggle } from '../components/ui/Toggle'
import { Tabs } from '../components/ui/Tabs'
import { Badge } from '../components/ui/Badge'
import {
  UploadCloud,
  Youtube,
  Radio,
  FileVideo,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Search,
  Flame,
  Check,
  RefreshCw,
  ExternalLink,
  Clock,
  Play,
  Volume2,
  VolumeX,
  Music,
  X
} from 'lucide-react'

export const NewProjectScreen: React.FC = () => {
  const { setScreen, brandKits, addToast, submitNewJob } = useStore()

  // Step 1: Source
  const [sourceTab, setSourceTab] = useState<'upload' | 'youtube' | 'channel'>('channel')
  const [uploadedFile, setUploadedFile] = useState<string | null>('naval_rogan_interview.mp4')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [selectedVideo, setSelectedVideo] = useState<any | null>(null)
  const [rightsConfirmed, setRightsConfirmed] = useState(true)

  // Harvester & Discovery state
  const [searchQuery, setSearchQuery] = useState('naval ravikant')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [channelUrl, setChannelUrl] = useState('https://www.youtube.com/@hubermanlab')
  const [maxHarvest, setMaxHarvest] = useState(2)
  const [isHarvesting, setIsHarvesting] = useState(false)
  const [harvestedVideos, setHarvestedVideos] = useState<any[]>([])

  // Step 2: Settings & Granular Feature Toggles
  const [podcastMode, setPodcastMode] = useState(false)
  const [stylesList, setStylesList] = useState<any[]>([])
  const [selectedStyleProfile, setSelectedStyleProfile] = useState<string>('raj_shamani')
  const [isCloneModalOpen, setIsCloneModalOpen] = useState(false)
  const [cloneName, setCloneName] = useState('')
  const [cloneHandle, setCloneHandle] = useState('')
  const [cloneUrls, setCloneUrls] = useState('')
  const [isCloning, setIsCloning] = useState(false)

  const [clipCount, setClipCount] = useState(5)
  const [duration, setDuration] = useState(35)
  const [selectedStyle, setSelectedStyle] = useState<CaptionStyle>('hormozi')
  const [selectedBrandKit, setSelectedBrandKit] = useState(brandKits[0]?.id || '')

  // Camera & Framing Toggles
  const [reactionSplit, setReactionSplit] = useState(true)               // Dual-Speaker Reaction Split
  const [faceTracking, setFaceTracking] = useState(true)                 // 9:16 Face Follow
  const [multiCam, setMultiCam] = useState(true)                         // Multi-Cam Jump Cuts
  const [autoZoom, setAutoZoom] = useState(true)                         // Punch-in Auto Zoom
  const [hookSnapZoom, setHookSnapZoom] = useState(true)                 // 0.0s Hook Snap-Zoom
  const [patternZoom, setPatternZoom] = useState(true)                   // Pattern Interrupt Zooms

  // Audio & Sound Suite Toggles
  const [addSong, setAddSong] = useState(false)                          // Background Music
  const [selectedSong, setSelectedSong] = useState('tension_drone')      // Music Track Preset
  const [songVolume, setSongVolume] = useState(70)                       // Music Volume
  const [customSongFile, setCustomSongFile] = useState<string | null>(null)
  const [frequencyCarving, setFrequencyCarving] = useState(true)         // 2.4kHz Vocal Clarity Notch
  const [sfx, setSfx] = useState(true)                                   // Dynamic Sound Effects (SFX)
  const [muteOriginal, setMuteOriginal] = useState(false)                // Mute Source Video Audio

  // Hook & Speech Polishing Toggles
  const [stripFillers, setStripFillers] = useState(true)                 // Strip Dead Air & Fillers
  const [coldOpenTeaser, setColdOpenTeaser] = useState(false)             // Cold Open Climax Teaser
  const [topBanner, setTopBanner] = useState(true)                       // Top Context Headline Banner
  const [hookStinger, setHookStinger] = useState(true)                   // 0.0s Acoustic Whoosh Stinger

  // Visual Overlays & Anti-Copyright Toggles
  const [useStickers, setUseStickers] = useState(true)                   // Floating Die-Cut Stickers
  const [brollCutaways, setBrollCutaways] = useState(false)              // Fullscreen B-Roll Cutaways
  const [semanticHighlighting, setSemanticHighlighting] = useState(true) // Dynamic Word Pop Highlighting
  const [includeEmojis, setIncludeEmojis] = useState(true)               // Contextual Smart Emojis
  const [retentionBar, setRetentionBar] = useState(false)                // 3px Retention Progress Bar
  const [antiCopyright, setAntiCopyright] = useState(false)              // Transformative Anti-Copyright Shield

  // Initial discover search on mount
  useEffect(() => {
    handleSearch('naval ravikant')
    fetchStyles()
  }, [])

  const fetchStyles = async () => {
    try {
      const res = await fetch('/api/styles')
      if (res.ok) {
        const data = await res.json()
        setStylesList(data)
      }
    } catch (e) {
      console.error('Failed to load styles:', e)
    }
  }

  const handleCloneStyle = async () => {
    if (!cloneName.trim() || !cloneUrls.trim()) {
      addToast({ title: 'Validation Error', description: 'Name and at least 1 URL or video path is required.', type: 'warning' })
      return
    }
    setIsCloning(true)
    try {
      const urls = cloneUrls.split('\n').map((u) => u.trim()).filter(Boolean)
      const res = await fetch('/api/styles/clone', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: cloneName,
          creator_handle: cloneHandle || `@${cloneName}`,
          sample_urls: urls
        })
      })
      if (res.ok) {
        const result = await res.json()
        addToast({
          title: 'Creator Style DNA Cloned!',
          description: `Successfully analyzed and saved '${result.profile.name}'`,
          type: 'success'
        })
        await fetchStyles()
        setSelectedStyleProfile(result.profile.id)
        setIsCloneModalOpen(false)
        setCloneName('')
        setCloneHandle('')
        setCloneUrls('')
      } else {
        const err = await res.json()
        addToast({ title: 'Clone Failed', description: err.detail || 'Could not analyze video', type: 'danger' })
      }
    } catch (e) {
      addToast({ title: 'Clone Error', description: 'Failed to connect to style engine', type: 'danger' })
    } finally {
      setIsCloning(false)
    }
  }

  const handleSearch = async (query: string) => {
    if (!query.trim()) return
    setIsSearching(true)
    try {
      const res = await fetch(`/api/discover/search?query=${encodeURIComponent(query)}&limit=6`)
      if (res.ok) {
        const data = await res.json()
        setSearchResults(data)
      }
    } catch (err) {
      console.error('Search error:', err)
    } finally {
      setIsSearching(false)
    }
  }

  const handleHarvestChannel = async () => {
    if (!channelUrl.trim()) return
    setIsHarvesting(true)
    try {
      const res = await fetch('/api/harvest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channel_url: channelUrl,
          clips: clipCount,
          max_videos: maxHarvest,
          anti_copyright: true,
          watermark: brandKits[0]?.handle || '@ClipLocal'
        })
      })

      if (res.ok) {
        const data = await res.json()
        setHarvestedVideos(data.started_jobs || [])
        addToast({
          title: 'Channel Harvest Started',
          description: `Discovered and queued ${data.detected_count || data.started_jobs?.length || 1} new uploads!`,
          type: 'success'
        })
      }
    } catch (err) {
      console.error('Harvest error:', err)
      addToast({ title: 'Harvest Failed', description: 'Could not connect to channel stream.', type: 'danger' })
    } finally {
      setIsHarvesting(false)
    }
  }

  const handleSelectVideo = (video: any) => {
    setSelectedVideo(video)
    setYoutubeUrl(video.url)
    addToast({
      title: 'Video Selected for Clipping',
      description: video.title,
      type: 'info'
    })
  }

  const handleStartProcessing = async () => {
    if (!rightsConfirmed) {
      addToast({
        title: 'Rights Confirmation Required',
        description: 'Please confirm you own or have permission to clip this content.',
        type: 'warning'
      })
      return
    }

    const source =
      sourceTab === 'upload'
        ? (uploadedFile || 'sample.mp4')
        : (youtubeUrl || selectedVideo?.url || 'https://www.youtube.com/watch?v=3qHkcs3kG44')

    await submitNewJob({
      source,
      clips: clipCount,
      style: selectedStyle,
      mode: reactionSplit ? 'podcast_reaction_split' : (faceTracking ? 'auto' : 'center'),
      min_duration: Math.max(15, duration - 10),
      max_duration: Math.min(60, duration + 10),
      backend: 'mlx',
      podcast_mode: podcastMode,
      style_profile: selectedStyleProfile === 'none' ? null : selectedStyleProfile,
      use_llm: true,
      auto_zoom: autoZoom,
      multicam: multiCam,
      top_banner: topBanner,
      include_emojis: includeEmojis,
      include_sfx: sfx,
      background_music: addSong,
      mute_original: muteOriginal,
      music_track: customSongFile || selectedSong,
      music_volume: muteOriginal ? (songVolume / 100) : Number(((songVolume / 100) * 0.35).toFixed(2)),
      anti_copyright: antiCopyright,
      frequency_carving: frequencyCarving,
      podcast_reaction_split: reactionSplit,
      hook_snap_zoom: hookSnapZoom,
      hook_stinger: hookStinger,
      strip_fillers: stripFillers,
      teaser_stitch: coldOpenTeaser,
      use_stickers: useStickers,
      broll: brollCutaways,
      retention_bar: retentionBar,
      semantic_highlighting: semanticHighlighting,
      pattern_zoom: patternZoom
    })

    setScreen('processing')
  }

  return (
    <div className="max-w-[960px] mx-auto py-8 px-6 space-y-8">
      {/* Page Title */}
      <div className="border-b border-border pb-4 space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">
          Create New Clipping Project
        </h2>
        <p className="text-xs text-text-secondary">
          Configure video source and AI pipeline settings. Everything is processed locally with Apple Silicon acceleration.
        </p>
      </div>

      {/* PRIMARY MODE SELECTOR: Standard vs Podcast Q&A Mode */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Select Clipping Mode
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Option A: Standard Mode */}
          <div
            onClick={() => setPodcastMode(false)}
            className={`cursor-pointer rounded-card p-4 border transition-all flex items-start gap-3.5 ${
              !podcastMode
                ? 'bg-[#18181B] border-accent shadow-md shadow-accent/5'
                : 'bg-bg-surface border-border hover:border-border/80 opacity-70'
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              !podcastMode ? 'bg-accent/20 text-accent' : 'bg-surface-elevated text-text-muted'
            }`}>
              <Zap className="w-5 h-5" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-text-primary">🎬 Standard Shorts Mode</h3>
                {!podcastMode && <Badge variant="accent">Active</Badge>}
              </div>
              <p className="text-[11px] text-text-secondary leading-snug">
                Detects highest-energy sentences, punchlines, and topic highlights with auto-zoom and dynamic pacing.
              </p>
            </div>
          </div>

          {/* Option B: Podcast Q&A Mode */}
          <div
            onClick={() => setPodcastMode(true)}
            className={`cursor-pointer rounded-card p-4 border transition-all flex items-start gap-3.5 ${
              podcastMode
                ? 'bg-[#18181B] border-purple-400 shadow-md shadow-purple-500/10'
                : 'bg-bg-surface border-border hover:border-border/80 opacity-70'
            }`}
          >
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
              podcastMode ? 'bg-purple-500/20 text-purple-400' : 'bg-surface-elevated text-text-muted'
            }`}>
              <Radio className="w-5 h-5" />
            </div>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-bold text-text-primary">🎙️ Podcast Q&A Mode</h3>
                  <Badge variant="accent">NEW</Badge>
                </div>
                {podcastMode && <Badge variant="accent">Active</Badge>}
              </div>
              <p className="text-[11px] text-text-secondary leading-snug">
                Pairs questions with guest answers, strips host rambling, cuts on mic-drops, and builds a master Q&A index.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progressive 3-Step Flow */}
      <div className="space-y-6">
        {/* STEP 1: SOURCE */}
        <div className="bg-bg-surface border border-border rounded-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center font-bold">
                1
              </span>
              <span>Source Video Ingestion</span>
            </span>
            <Badge variant="accent">Local Offline Ingest</Badge>
          </div>

          <Tabs
            tabs={[
              { id: 'channel', label: 'Channel Harvest & Discover', icon: <Radio className="w-3.5 h-3.5 text-accent" /> },
              { id: 'youtube', label: 'YouTube URL', icon: <Youtube className="w-3.5 h-3.5" /> },
              { id: 'upload', label: 'Local File (.mp4, .mov)', icon: <UploadCloud className="w-3.5 h-3.5" /> }
            ]}
            activeTab={sourceTab}
            onChange={(id) => setSourceTab(id as any)}
          />

          {/* TAB: CHANNEL HARVEST & DISCOVER */}
          {sourceTab === 'channel' && (
            <div className="space-y-5 pt-1">
              {/* Harvester Search Bar */}
              <div className="space-y-2">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
                    <input
                      type="text"
                      placeholder="Search any creator, channel or podcast (e.g. 'naval ravikant', 'huberman', 'alex hormozi')..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch(searchQuery)}
                      className="w-full bg-[#18181B] border border-border focus:border-accent text-xs rounded-control pl-9 pr-3 py-2 text-text-primary placeholder:text-text-muted outline-none transition-colors"
                    />
                  </div>
                  <Button
                    variant="primary"
                    size="md"
                    isLoading={isSearching}
                    onClick={() => handleSearch(searchQuery)}
                  >
                    Search
                  </Button>
                </div>

                {/* Quick Niche Goldmines */}
                <div className="flex flex-wrap items-center gap-1.5 text-xs">
                  <span className="text-[10px] uppercase font-semibold text-text-muted mr-1">
                    Proven Goldmines:
                  </span>
                  {[
                    'Naval Ravikant',
                    'Alex Hormozi',
                    'Huberman Lab',
                    'David Goggins',
                    'Y Combinator',
                    'Joe Rogan'
                  ].map((chip) => (
                    <button
                      key={chip}
                      onClick={() => {
                        setSearchQuery(chip)
                        handleSearch(chip)
                      }}
                      className="px-2.5 py-1 rounded-control bg-[#18181B] hover:bg-[#222226] text-text-secondary hover:text-text-primary text-[11px] border border-border transition-colors select-none"
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              </div>

              {/* Channel Auto-Harvest Section */}
              <div className="bg-[#141416] border border-border rounded-control p-3.5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio className="w-3.5 h-3.5 text-accent animate-pulse" />
                    <span className="text-xs font-semibold text-text-primary">
                      Channel Upload Auto-Harvester
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted">Auto-Detects New Episodes</span>
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    value={channelUrl}
                    onChange={(e) => setChannelUrl(e.target.value)}
                    placeholder="https://www.youtube.com/@channelhandle"
                    className="flex-1 bg-[#18181B] border border-border focus:border-accent text-xs rounded-control px-3 py-2 text-text-primary placeholder:text-text-muted outline-none font-mono"
                  />
                  <div className="flex items-center gap-2">
                    <select
                      value={maxHarvest}
                      onChange={(e) => setMaxHarvest(Number(e.target.value))}
                      className="bg-[#18181B] border border-border text-xs rounded-control px-2.5 py-2 text-text-primary outline-none"
                    >
                      <option value={1}>1 Video</option>
                      <option value={2}>2 Videos</option>
                      <option value={3}>3 Videos</option>
                      <option value={5}>5 Videos</option>
                    </select>
                    <Button
                      variant="secondary"
                      size="md"
                      isLoading={isHarvesting}
                      icon={<RefreshCw className="w-3.5 h-3.5 text-accent" />}
                      onClick={handleHarvestChannel}
                    >
                      Scan & Harvest
                    </Button>
                  </div>
                </div>

                {harvestedVideos.length > 0 && (
                  <div className="p-2.5 bg-accent/10 border border-accent/20 rounded-control space-y-1 text-xs">
                    <p className="font-semibold text-accent flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      Harvest active: Queued {harvestedVideos.length} episodes for processing
                    </p>
                    <ul className="text-[11px] text-text-secondary list-disc pl-4 space-y-0.5 font-mono">
                      {harvestedVideos.map((hv, idx) => (
                        <li key={idx} className="truncate">{hv.title || hv.url}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Selected Video Confirmation Pill */}
              {(selectedVideo || youtubeUrl) && (
                <div className="p-3 bg-accent/10 border border-accent/30 rounded-control flex items-center justify-between text-xs animate-in fade-in duration-150">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-8 rounded bg-black overflow-hidden shrink-0 border border-border">
                      <img
                        src={selectedVideo?.thumbnail_url || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80'}
                        alt="Selected"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[10px] uppercase font-mono font-bold text-accent block">
                        Selected Video to Harvest
                      </span>
                      <h4 className="font-semibold text-text-primary text-xs truncate max-w-lg">
                        {selectedVideo?.title || youtubeUrl}
                      </h4>
                    </div>
                  </div>
                  <Badge variant="accent" size="sm">READY TO CLIP</Badge>
                </div>
              )}

              {/* Discovered Video Cards Grid */}
              <div className="space-y-2">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                  Discovered Videos ({searchResults.length})
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {searchResults.map((v) => {
                    const isChosen = youtubeUrl === v.url || selectedVideo?.url === v.url
                    return (
                      <div
                        key={v.id || v.url}
                        className={`bg-[#141416] border rounded-card overflow-hidden flex flex-col justify-between transition-all ${
                          isChosen
                            ? 'border-accent shadow-md ring-1 ring-accent/30 bg-[#18181B]'
                            : 'border-border hover:border-[#3F3F46]'
                        }`}
                      >
                        {/* Thumbnail with overlay badges */}
                        <div className="relative aspect-video bg-black overflow-hidden">
                          <img
                            src={v.thumbnail_url}
                            alt={v.title}
                            className="w-full h-full object-cover"
                          />
                          <span className="absolute bottom-1 right-1 px-1.5 py-0.2 rounded bg-black/80 text-[10px] font-mono text-white">
                            {v.duration_formatted}
                          </span>
                          <span className="absolute top-1 left-1 px-1.5 py-0.2 rounded bg-accent/90 text-[10px] font-bold text-[#09090B] flex items-center gap-0.5">
                            <Flame className="w-2.5 h-2.5 fill-current" /> {v.view_count_formatted}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="p-3 flex-1 flex flex-col justify-between space-y-2.5">
                          <div>
                            <h4 className="font-semibold text-xs text-text-primary line-clamp-2 leading-snug">
                              {v.title}
                            </h4>
                            <p className="text-[10px] text-text-muted mt-1 truncate">{v.channel}</p>
                          </div>

                          <Button
                            variant={isChosen ? 'primary' : 'secondary'}
                            size="sm"
                            className="w-full"
                            icon={isChosen ? <Check className="w-3.5 h-3.5" /> : <Zap className="w-3.5 h-3.5 text-accent" />}
                            onClick={() => handleSelectVideo(v)}
                          >
                            {isChosen ? 'Selected to Harvest' : 'Clip This Video'}
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB: YOUTUBE URL */}
          {sourceTab === 'youtube' && (
            <div className="space-y-3 pt-1">
              <Input
                label="Direct YouTube Video Link"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
              <p className="text-[11px] text-text-muted">
                Downloaded using local yt-dlp with automatic Creative Commons license detection and thumbnail caching.
              </p>
            </div>
          )}

          {/* TAB: LOCAL FILE */}
          {sourceTab === 'upload' && (
            <div className="border-2 border-dashed border-border hover:border-accent/60 rounded-card p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#0D0D10]">
              <UploadCloud className="w-8 h-8 text-accent mb-2" />
              <p className="text-xs font-semibold text-text-primary">
                {uploadedFile ? uploadedFile : 'Drag and drop video file here, or click to browse'}
              </p>
              <p className="text-[11px] text-text-muted mt-1">
                Supports ProRes, MP4, MKV, MOV up to 4K 60fps with zero file size limits.
              </p>
            </div>
          )}

          {/* REQUIRED RIGHTS CHECKBOX */}
          <div className="p-3 bg-[#18181B] border border-border rounded-control flex items-start gap-3">
            <input
              type="checkbox"
              id="rightsCheck"
              checked={rightsConfirmed}
              onChange={(e) => setRightsConfirmed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-border accent-[#A3E635] cursor-pointer"
            />
            <label htmlFor="rightsCheck" className="text-xs text-text-secondary cursor-pointer leading-relaxed">
              <strong className="text-text-primary">Legal & Rights Confirmation:</strong> I own this content or have explicit permission to clip and repurpose it.
            </label>
          </div>
        </div>

        {/* STEP 2: PIPELINE SETTINGS & FEATURE CONTROL CENTER */}
        <div className="bg-bg-surface border border-border rounded-card p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-border/80 pb-3">
            <span className="text-xs font-semibold text-text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Feature Control Center (Granular AI Pipeline Options)</span>
            </span>
            <span className="text-[11px] text-text-muted">
              Click any toggle to select or deselect features individually.
            </span>
          </div>

          {/* Primary Harvest Parameters */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-[#141417] border border-border rounded-control">
            <Slider
              label="Clips to Harvest"
              min={1}
              max={15}
              value={clipCount}
              unit=" clips"
              onChange={setClipCount}
            />

            <Slider
              label="Target Clip Duration"
              min={20}
              max={60}
              value={duration}
              unit="s"
              onChange={setDuration}
            />

            {/* Creator Style DNA Preset */}
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-text-primary flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-accent" />
                  <span>Creator Style DNA</span>
                </label>
                <button
                  type="button"
                  className="text-[10px] text-accent hover:underline font-semibold"
                  onClick={() => setIsCloneModalOpen(true)}
                >
                  + Clone Style
                </button>
              </div>
              <select
                className="w-full bg-[#18181B] border border-border text-xs rounded-control px-2.5 py-1.5 text-text-primary outline-none focus:border-accent"
                value={selectedStyleProfile}
                onChange={(e) => setSelectedStyleProfile(e.target.value)}
              >
                <option value="none">✨ Manual / Custom (No Profile Override)</option>
                {stylesList.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.creator_handle || s.id})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-text-muted truncate">
                {selectedStyleProfile === 'none'
                  ? 'All toggles below operate purely on your manual selections.'
                  : stylesList.find((s) => s.id === selectedStyleProfile)?.description || 'Applies creator typography, cadence, and overlays.'}
              </p>
            </div>
          </div>

          {/* Granular Feature Toggles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* GROUP A: Podcast & Hook Optimization */}
            <div className="p-4 bg-[#141417] border border-border rounded-control space-y-3.5">
              <div className="flex items-center gap-2 pb-1 border-b border-border/60">
                <Radio className="w-4 h-4 text-purple-400" />
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                  Podcast & Hook Optimization
                </h4>
              </div>

              <Toggle
                label="🎙️ Dual-Speaker Reaction Split"
                description="Host on top, Guest on bottom during initial 3.2s question, then snaps to guest face-follow."
                checked={reactionSplit}
                onChange={setReactionSplit}
              />

              <Toggle
                label="⚡ Cold Open Climax Teaser"
                description="Stitches 1.5s climax punchline before the question separated by a whoosh transition."
                checked={coldOpenTeaser}
                onChange={setColdOpenTeaser}
              />

              <Toggle
                label="🧹 Strip Dead Air & Filler Words"
                description="Auto-cuts opening 'uhm, so, you know' and awkward pauses before speech."
                checked={stripFillers}
                onChange={setStripFillers}
              />

              <Toggle
                label="🏷️ Top Context Headline Banner"
                description="Displays clean spoken thesis headline at the top without ugly bounding box."
                checked={topBanner}
                onChange={setTopBanner}
              />

              <Toggle
                label="💨 0.0s Orienting Acoustic Stinger"
                description="Injects a crisp whoosh transition sound at the very opening millisecond."
                checked={hookStinger}
                onChange={setHookStinger}
              />
            </div>

            {/* GROUP B: Camera Framing & Motion Engine */}
            <div className="p-4 bg-[#141417] border border-border rounded-control space-y-3.5">
              <div className="flex items-center gap-2 pb-1 border-b border-border/60">
                <FileVideo className="w-4 h-4 text-accent" />
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                  Camera Framing & Motion
                </h4>
              </div>

              <Toggle
                label="👤 9:16 Face Follow Centering"
                description="Uses local MediaPipe / OpenCV face detector to frame the speaker."
                checked={faceTracking}
                onChange={setFaceTracking}
              />

              <Toggle
                label="✂️ Multi-Cam Active Speaker Auto-Cut"
                description="Simulates professional multi-camera cuts between wide and close-up angles."
                checked={multiCam}
                onChange={setMultiCam}
              />

              <Toggle
                label="🔍 Punch-in Auto-Zoom on Emphasis"
                description="Performs subtle 1.15x zoom punches on high-energy sentences."
                checked={autoZoom}
                onChange={setAutoZoom}
              />

              <Toggle
                label="⚡ 0.0s Hook Snap-Zoom"
                description="Instantly zooms in to 1.25x for the opening 2.2 seconds to maximize retention."
                checked={hookSnapZoom}
                onChange={setHookSnapZoom}
              />

              <Toggle
                label="📐 Pattern Interrupt Cadence"
                description="Varies framing every 2.5-3.0s to prevent viewer scrolling drop-off."
                checked={patternZoom}
                onChange={setPatternZoom}
              />
            </div>

            {/* GROUP C: Audio, Sound Suites & Vocal Carving */}
            <div className="p-4 bg-[#141417] border border-border rounded-control space-y-3.5">
              <div className="flex items-center gap-2 pb-1 border-b border-border/60">
                <Music className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                  Audio & Sound Engine
                </h4>
              </div>

              <Toggle
                label="🎵 Background Music / Sound Suite"
                description="Layer Content-ID-safe procedural sound loop with sidechain auto-ducking."
                checked={addSong}
                onChange={setAddSong}
              />

              <Toggle
                label="🎙️ 2.4kHz Vocal Clarity Notch (Carving)"
                description="Applies an EQ notch to background music at 2.4kHz so dialogue cuts through crystal-clear."
                checked={frequencyCarving}
                onChange={setFrequencyCarving}
              />

              <Toggle
                label="🔊 Dynamic Sound Effects (SFX)"
                description="Adds whoosh cuts, pop transitions, and cash dings synced to speech."
                checked={sfx}
                onChange={setSfx}
              />

              <Toggle
                label="🔇 Mute Source Video Audio"
                description="Silence all dialogue and background noise from the original video completely."
                checked={muteOriginal}
                onChange={setMuteOriginal}
              />
            </div>

            {/* GROUP D: Visual Overlays, Stickers & Anti-Copyright */}
            <div className="p-4 bg-[#141417] border border-border rounded-control space-y-3.5">
              <div className="flex items-center gap-2 pb-1 border-b border-border/60">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <h4 className="text-xs font-bold text-text-primary uppercase tracking-wider">
                  Overlays, Stickers & Security
                </h4>
              </div>

              <Toggle
                label="🏷️ Floating Die-Cut Cutout Stickers"
                description="Pops non-copyright entity stickers with 4px solid white stroke and soft drop shadow."
                checked={useStickers}
                onChange={setUseStickers}
              />

              <Toggle
                label="🎬 Fullscreen B-Roll Cutaways"
                description="Contextual cutaway footage triggered by spoken topic entities."
                checked={brollCutaways}
                onChange={setBrollCutaways}
              />

              <Toggle
                label="✨ Semantic Word Pop Highlighting"
                description="Vibrantly colors the active spoken word with animated pop scale."
                checked={semanticHighlighting}
                onChange={setSemanticHighlighting}
              />

              <Toggle
                label="😀 Contextual Smart Emojis"
                description="Places relevant animated emojis above high-energy words."
                checked={includeEmojis}
                onChange={setIncludeEmojis}
              />

              <Toggle
                label="📊 3px Retention Progress Bar"
                description="Slim neon progress bar across the bottom to combat mobile skip rates."
                checked={retentionBar}
                onChange={setRetentionBar}
              />

              <Toggle
                label="🛡️ Transformative Anti-Copyright Shield"
                description="Applies subtle 2.5% tempo masking, vocal presence EQ, and transformation factors."
                checked={antiCopyright}
                onChange={setAntiCopyright}
              />
            </div>
          </div>

          {/* Song / Audio Layering Selector */}
          {addSong && (
            <div className="p-4 bg-[#141417] border border-border rounded-control space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h4 className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                    <Music className="w-3.5 h-3.5 text-accent" />
                    Select Background Song / Beat
                  </h4>
                  <p className="text-[11px] text-text-muted mt-0.5">
                    {muteOriginal
                      ? '⚡ Original video is MUTED. This song will play as the full primary soundtrack.'
                      : '🎧 Original dialogue is ACTIVE. Song will smoothly duck beneath speech.'}
                  </p>
                </div>

                <Badge variant={muteOriginal ? 'accent' : 'muted'} size="sm">
                  {muteOriginal ? 'Primary Soundtrack' : 'Auto-Ducked Background'}
                </Badge>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {SONG_PRESETS.map((song) => {
                  const isSelected = selectedSong === song.id && !customSongFile
                  return (
                    <button
                      key={song.id}
                      type="button"
                      onClick={() => {
                        setSelectedSong(song.id)
                        setCustomSongFile(null)
                      }}
                      className={`p-3 rounded-control border text-left transition-all ${
                        isSelected
                          ? 'bg-bg-elevated border-accent ring-1 ring-accent/30 shadow-sm'
                          : 'bg-[#18181B] border-border hover:border-[#3F3F46]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-base">{song.icon}</span>
                        <span className="text-[10px] font-mono text-accent">{song.bpm} BPM</span>
                      </div>
                      <p className="text-xs font-bold text-text-primary truncate">{song.name}</p>
                      <p className="text-[10px] text-text-muted truncate mt-0.5">{song.genre}</p>
                    </button>
                  )
                })}
              </div>

              {/* Volume Slider & Custom Upload */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-border/60">
                <Slider
                  label="Song Volume Level"
                  min={10}
                  max={100}
                  value={songVolume}
                  unit="%"
                  onChange={setSongVolume}
                />

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Or Use Custom Song File (.mp3, .wav)
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
                            setCustomSongFile(data.file_path)
                            addToast({
                              title: 'Custom Song Uploaded',
                              description: file.name,
                              type: 'success'
                            })
                          }
                        } catch {
                          addToast({ title: 'Upload Failed', type: 'danger' })
                        }
                      }
                    }}
                    className="w-full text-xs text-text-muted file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[11px] file:font-semibold file:bg-bg-elevated file:text-text-primary hover:file:bg-[#27272A] file:cursor-pointer"
                  />
                  {customSongFile && (
                    <span className="text-[10px] text-accent mt-1 block font-mono truncate">
                      ✓ Active custom track: {customSongFile.split('/').pop()}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Visual Caption Style Selector - All 7 Presets */}
          <div className="pt-4 border-t border-border/80 space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-text-primary">
                Burned-in Subtitle Aesthetic ({CAPTION_STYLE_OPTIONS.length} Presets)
              </label>
              <span className="text-[11px] text-text-muted">
                Active Style: <strong className="text-accent">{CAPTION_STYLE_OPTIONS.find((s) => s.id === selectedStyle)?.name || selectedStyle}</strong>
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
              {CAPTION_STYLE_OPTIONS.map((style) => {
                const isSelected = selectedStyle === style.id
                return (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setSelectedStyle(style.id)}
                    className={`p-3 rounded-control border text-left transition-all ${
                      isSelected
                        ? 'bg-bg-elevated border-accent ring-1 ring-accent/30 shadow-sm'
                        : 'bg-[#141416] border-border hover:border-[#3F3F46]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold text-text-primary">{style.name}</span>
                      <div className="flex items-center gap-1">
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/50"
                          style={{ backgroundColor: style.primaryColor }}
                          title={`Primary: ${style.primaryColor}`}
                        />
                        <span
                          className="w-2.5 h-2.5 rounded-full border border-black/50"
                          style={{ backgroundColor: style.highlightColor }}
                          title={`Pop: ${style.highlightColor}`}
                        />
                      </div>
                    </div>
                    <p className="text-[10px] text-text-muted line-clamp-1">{style.desc}</p>
                  </button>
                )
              })}
            </div>
          </div>
        </div>

        {/* STEP 3: REVIEW AND START */}
        <div className="bg-bg-surface border border-border rounded-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center font-bold">
                3
              </span>
              <span>Review & Launch</span>
            </span>
          </div>

          <div className="bg-[#18181B] border border-border/80 rounded-control p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <p className="text-xs text-text-primary font-medium">
                Ready to harvest {clipCount} clips (~{duration}s each) from{' '}
                <strong className="text-accent">{selectedVideo?.title ? selectedVideo.title.substring(0, 40) + '...' : (youtubeUrl ? youtubeUrl.substring(0, 40) + '...' : uploadedFile)}</strong>
              </p>
              <p className="text-[11px] text-text-muted">
                Estimated processing time: ~45 seconds on Apple M4 hardware encoder.
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={<Zap className="w-4 h-4" />}
              onClick={handleStartProcessing}
            >
              Start Processing
            </Button>
          </div>
        </div>
      </div>

      {/* CLONE CREATOR STYLE MODAL */}
      {isCloneModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#18181B] border border-border rounded-card max-w-lg w-full p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-border/80 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3 className="text-sm font-bold text-text-primary">Clone Any Creator's Style DNA</h3>
              </div>
              <button
                onClick={() => setIsCloneModalOpen(false)}
                className="text-text-muted hover:text-text-primary p-1 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-text-secondary leading-relaxed">
                Paste 1–3 YouTube Shorts or Reels links from any creator (e.g. Raj Shamani, Iman Gadzhi). The engine will reverse-engineer their caption colors, cut pacing, snap-zooms, and graphic sticker styles so you can reuse them on any podcast.
              </p>

              <Input
                label="Creator or Style Name"
                placeholder="e.g. Raj Shamani, Alex Hormozi, My Custom Style"
                value={cloneName}
                onChange={(e) => setCloneName(e.target.value)}
              />

              <Input
                label="Creator Handle (Optional)"
                placeholder="e.g. @rajshamani"
                value={cloneHandle}
                onChange={(e) => setCloneHandle(e.target.value)}
              />

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Reference Short URLs or File Paths (1 to 3 links, one per line)
                </label>
                <textarea
                  className="w-full bg-[#121214] border border-border text-xs rounded-control p-3 text-text-primary placeholder:text-text-muted outline-none focus:border-accent min-h-[90px]"
                  placeholder="https://www.youtube.com/shorts/..."
                  value={cloneUrls}
                  onChange={(e) => setCloneUrls(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2 border-t border-border/80">
              <Button
                variant="secondary"
                size="md"
                onClick={() => setIsCloneModalOpen(false)}
                disabled={isCloning}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                isLoading={isCloning}
                icon={<Sparkles className="w-4 h-4" />}
                onClick={handleCloneStyle}
              >
                {isCloning ? 'Analyzing Style (6-10s)...' : 'Clone & Save Style DNA'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
