import React, { useState } from 'react'
import { useStore } from '../store/useStore'
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
  Zap
} from 'lucide-react'

export const NewProjectScreen: React.FC = () => {
  const { setScreen, brandKits, addToast, submitNewJob } = useStore()

  // Step 1: Source
  const [sourceTab, setSourceTab] = useState<'upload' | 'youtube' | 'channel'>('upload')
  const [uploadedFile, setUploadedFile] = useState<string | null>('hormozi_masterclass_4k.mp4')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [rightsConfirmed, setRightsConfirmed] = useState(false)

  // Step 2: Settings
  const [clipCount, setClipCount] = useState(5)
  const [duration, setDuration] = useState(35)
  const [selectedStyle, setSelectedStyle] = useState<'hormozi' | 'mrbeast' | 'cyberpunk' | 'minimal'>('hormozi')
  const [selectedBrandKit, setSelectedBrandKit] = useState(brandKits[0].id)
  const [multiCam, setMultiCam] = useState(true)
  const [faceTracking, setFaceTracking] = useState(true)
  const [sfx, setSfx] = useState(true)
  const [music, setMusic] = useState(false)

  const handleStartProcessing = async () => {
    if (!rightsConfirmed) {
      addToast({
        title: 'Rights Confirmation Required',
        description: 'Please confirm you own or have permission to clip this content.',
        type: 'warning'
      })
      return
    }

    const source = sourceTab === 'upload' ? (uploadedFile || 'sample.mp4') : (youtubeUrl || 'https://youtu.be/sample')
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
    <div className="max-w-[840px] mx-auto py-8 px-6 space-y-8">
      {/* Page Title */}
      <div className="border-b border-border pb-4 space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">
          Create New Clipping Project
        </h2>
        <p className="text-xs text-text-secondary">
          Configure video source and AI pipeline settings. Everything is processed locally.
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
              { id: 'upload', label: 'Local File (.mp4, .mov)', icon: <UploadCloud className="w-3.5 h-3.5" /> },
              { id: 'youtube', label: 'YouTube URL', icon: <Youtube className="w-3.5 h-3.5" /> },
              { id: 'channel', label: 'Channel Harvest', icon: <Radio className="w-3.5 h-3.5" /> }
            ]}
            activeTab={sourceTab}
            onChange={(id) => setSourceTab(id as any)}
          />

          {sourceTab === 'upload' && (
            <div className="border-2 border-dashed border-border hover:border-accent/60 rounded-card p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors bg-[#0D0D10]">
              <UploadCloud className="w-8 h-8 text-accent mb-2" />
              <p className="text-xs font-semibold text-text-primary">
                {uploadedFile ? uploadedFile : 'Drag and drop video file here, or click to browse'}
              </p>
              <p className="text-[11px] text-text-muted mt-1">
                Supports ProRes, MP4, MKV, MOV up to 4K 60fps
              </p>
            </div>
          )}

          {sourceTab === 'youtube' && (
            <div className="space-y-2">
              <Input
                label="YouTube Video Link"
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
              <p className="text-[11px] text-text-muted">
                Downloaded using local yt-dlp with automatic Creative Commons license detection.
              </p>
            </div>
          )}

          {sourceTab === 'channel' && (
            <div className="space-y-2">
              <Input
                label="Channel URL or Handle"
                placeholder="https://www.youtube.com/@hubermanlab"
              />
              <p className="text-[11px] text-text-muted">
                Harvest top-performing recent uploads and process in batch.
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
                  Brand Kit
                </label>
                <select
                  className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                  value={selectedBrandKit}
                  onChange={(e) => setSelectedBrandKit(e.target.value)}
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
                Ready to extract {clipCount} clips (~{duration}s each) with Apple VideoToolbox.
              </p>
              <p className="text-[11px] text-text-muted">
                Estimated processing time: ~45 seconds on Apple M4.
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
