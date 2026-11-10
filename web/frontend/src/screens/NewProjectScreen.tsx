import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { CaptionStyle, CAPTION_STYLE_OPTIONS } from '../types'
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
  Play
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

  // Step 2: Settings
  const [clipCount, setClipCount] = useState(5)
  const [duration, setDuration] = useState(35)
  const [selectedStyle, setSelectedStyle] = useState<CaptionStyle>('hormozi')
  const [selectedBrandKit, setSelectedBrandKit] = useState(brandKits[0]?.id || '')
  const [multiCam, setMultiCam] = useState(true)
  const [faceTracking, setFaceTracking] = useState(true)
  const [sfx, setSfx] = useState(true)
  const [music, setMusic] = useState(false)

  // Initial discover search on mount
  useEffect(() => {
    handleSearch('naval ravikant')
  }, [])

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
      mode: faceTracking ? 'auto' : 'center',
      min_duration: Math.max(15, duration - 10),
      max_duration: Math.min(60, duration + 10),
      backend: 'mlx',
      use_llm: true,
      auto_zoom: true,
      multicam: multiCam,
      top_banner: true,
      include_emojis: true,
      include_sfx: sfx,
      background_music: music,
      anti_copyright: true
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

        {/* STEP 2: PIPELINE SETTINGS */}
        <div className="bg-bg-surface border border-border rounded-card p-5 space-y-5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-primary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-accent/20 text-accent font-mono text-xs flex items-center justify-center font-bold">
                2
              </span>
              <span>Pipeline & Styling Settings</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <Slider
                label="Number of Viral Clips to Harvest"
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

              <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                  Brand Kit Preset
                </label>
                <select
                  className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                  value={selectedBrandKit}
                  onChange={(e) => {
                    const kitId = e.target.value
                    setSelectedBrandKit(kitId)
                    const found = brandKits.find((b) => b.id === kitId)
                    if (found && found.defaultStyle) {
                      setSelectedStyle(found.defaultStyle)
                    }
                  }}
                >
                  {brandKits.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.name} ({b.handle})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-3.5">
              <Toggle
                label="Multi-Cam Active Speaker Auto-Cut"
                description="Switches camera framing to the active speaker."
                checked={multiCam}
                onChange={setMultiCam}
              />

              <Toggle
                label="9:16 Face Centering & Tracking"
                description="Crops horizontal footage to vertical around the face."
                checked={faceTracking}
                onChange={setFaceTracking}
              />

              <Toggle
                label="Dynamic Sound Effects & Pop Animations"
                description="Syncs whoosh SFX and animated emphasis on hooks."
                checked={sfx}
                onChange={setSfx}
              />

              <Toggle
                label="Background Music Ducking"
                description="Subtly mixes high-tension lo-fi beneath dialogue."
                checked={music}
                onChange={setMusic}
              />
            </div>
          </div>

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
    </div>
  )
}
