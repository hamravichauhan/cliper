import React, { useState } from 'react'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ScoreRing } from '../components/ui/ScoreRing'
import { ScoreBar } from '../components/ui/ScoreBar'
import { Input, Textarea } from '../components/ui/Input'
import { Slider } from '../components/ui/Slider'
import { Toggle } from '../components/ui/Toggle'
import { Tabs } from '../components/ui/Tabs'
import { EmptyState } from '../components/ui/EmptyState'
import { Modal } from '../components/ui/Modal'
import { useStore } from '../store/useStore'
import {
  Sparkles,
  Download,
  Search,
  Check,
  AlertTriangle,
  FolderPlus,
  Play,
  RotateCcw
} from 'lucide-react'

export const DesignSystem: React.FC = () => {
  const { addToast } = useStore()
  const [sliderVal, setSliderVal] = useState(42)
  const [toggleVal, setToggleVal] = useState(true)
  const [activeTab, setActiveTab] = useState('overview')
  const [modalOpen, setModalOpen] = useState(false)

  const colorTokens = [
    { name: 'Background', hex: '#09090B', var: '--bg', role: 'Canvas and main window' },
    { name: 'Surface', hex: '#111113', var: '--surface', role: 'Sidebars, panels, cards' },
    { name: 'Elevated', hex: '#18181B', var: '--elevated', role: 'Hover, active controls, dropdowns' },
    { name: 'Border', hex: '#27272A', var: '--border', role: '1px clean structural dividers' },
    { name: 'Text Primary', hex: '#FAFAFA', var: '--text-primary', role: 'Headlines, active labels' },
    { name: 'Text Secondary', hex: '#A1A1AA', var: '--text-secondary', role: 'Body copy, descriptions' },
    { name: 'Text Muted', hex: '#71717A', var: '--text-muted', role: 'Placeholders, subtle tags' },
    { name: 'Accent (Lime)', hex: '#A3E635', var: '--accent', role: 'Virality 80+, primary CTA' },
    { name: 'Success', hex: '#22C55E', var: '--success', role: 'Approved clips, healthy workers' },
    { name: 'Warning', hex: '#F59E0B', var: '--warning', role: 'Virality 60-79, LLM fallback' },
    { name: 'Danger', hex: '#EF4444', var: '--danger', role: 'Rejected clips, errors' }
  ]

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-6 space-y-12">
      {/* Header */}
      <div className="border-b border-border pb-6 space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="accent">ClipLocal Design System</Badge>
          <span className="text-xs font-mono text-text-muted">v2.0 • Raycast/Linear Dark</span>
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-text-primary">
          Design Tokens & Components
        </h2>
        <p className="text-sm text-text-secondary max-w-2xl leading-relaxed">
          Calm, dark, precision-focused design tokens for high-velocity creators and clipping agencies.
          Content is the hero; UI chrome stays whisper-quiet with 1px borders and a single lime accent.
        </p>
      </div>

      {/* 1. Color Palette Tokens */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          1. Color Palette Tokens
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {colorTokens.map((t) => (
            <div
              key={t.name}
              className="bg-bg-surface border border-border rounded-card p-3 space-y-2.5 transition-all hover:border-[#3F3F46]"
            >
              <div
                className="w-full h-10 rounded-[6px] border border-black/30 shadow-inner flex items-center justify-end px-2"
                style={{ backgroundColor: t.hex }}
              />
              <div>
                <p className="text-xs font-semibold text-text-primary">{t.name}</p>
                <p className="text-[11px] font-mono text-accent">{t.hex}</p>
                <p className="text-[10px] text-text-muted mt-1 leading-snug">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Virality Score Colors */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          2. Virality Score Metric Tiers
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-bg-surface border border-border rounded-card p-4 flex items-center gap-4">
            <ScoreRing score={92} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-accent">Viral (80 – 100)</span>
                <Badge variant="accent">Top Tier</Badge>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Accent lime color. High acoustic contrast, strong curiosity gap, instant payoff.
              </p>
            </div>
          </div>

          <div className="bg-bg-surface border border-border rounded-card p-4 flex items-center gap-4">
            <ScoreRing score={68} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-status-warning">Solid (60 – 79)</span>
                <Badge variant="warning">Good Candidate</Badge>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Amber warning color. Good pacing, but might require minor hook tightening.
              </p>
            </div>
          </div>

          <div className="bg-bg-surface border border-border rounded-card p-4 flex items-center gap-4">
            <ScoreRing score={52} size="lg" />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-text-muted">Weak (Below 60)</span>
                <Badge variant="muted">Filtered</Badge>
              </div>
              <p className="text-xs text-text-secondary mt-1">
                Muted gray color. Flat acoustics, long preamble, or corporate sponsor jargon.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 6-Factor Virality Breakdown Bars */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          3. 6-Factor Virality Scoring Model
        </h3>
        <div className="bg-bg-surface border border-border rounded-card p-5 max-w-xl space-y-3">
          <ScoreBar label="Hook Strength" weight={30} value={94} info="Curiosity gap, first 3 seconds acoustic intensity" />
          <ScoreBar label="Acoustic Energy" weight={20} value={88} info="RMS variance, speech pitch modulation, no mumbling" />
          <ScoreBar label="Pacing & Flow" weight={15} value={82} info="Words per minute (140-170 WPM optimal window)" />
          <ScoreBar label="Payoff & Resolution" weight={15} value={90} info="Core thesis answered cleanly before clip end" />
          <ScoreBar label="Emotional Sentiment" weight={10} value={78} info="High valence inflection points" />
          <ScoreBar label="Target Duration" weight={10} value={85} info="Optimal 30-45s vertical retention sweet spot" />
        </div>
      </section>

      {/* 4. Button Variants & States */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          4. Buttons (Primary, Secondary, Ghost, Danger)
        </h3>
        <div className="bg-bg-surface border border-border rounded-card p-5 space-y-5">
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" icon={<Download className="w-3.5 h-3.5" />}>
              Primary Lime Accent
            </Button>
            <Button variant="secondary" icon={<Play className="w-3.5 h-3.5" />}>
              Secondary Surface
            </Button>
            <Button variant="ghost" icon={<RotateCcw className="w-3.5 h-3.5" />}>
              Ghost Action
            </Button>
            <Button variant="danger" icon={<AlertTriangle className="w-3.5 h-3.5" />}>
              Danger Action
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/60">
            <Button variant="primary" size="sm">Small 28px</Button>
            <Button variant="primary" size="md">Medium 36px</Button>
            <Button variant="primary" size="lg">Large 44px</Button>
            <Button variant="primary" isLoading>Rendering...</Button>
            <Button variant="secondary" disabled>Disabled State</Button>
          </div>
        </div>
      </section>

      {/* 5. Inputs, Sliders & Controls */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          5. Controls, Toggles & Sliders
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-bg-surface border border-border rounded-card p-5">
          <div className="space-y-4">
            <Input
              label="Spoken Context Headline"
              placeholder="e.g. Why most creators fail in their first year..."
              defaultValue="Why 99% Of People Never Make Money"
            />
            <Input
              label="YouTube Video URL"
              icon={<Search className="w-4 h-4" />}
              placeholder="https://youtube.com/watch?v=..."
            />
            <Textarea
              label="Social Caption Copy"
              rows={3}
              defaultValue="Discipline beats novelty every single time. Stop digging 10 shallow holes."
            />
          </div>

          <div className="space-y-5">
            <Slider
              label="Clip Target Duration"
              min={20}
              max={60}
              step={1}
              unit="s"
              value={sliderVal}
              onChange={setSliderVal}
            />

            <Toggle
              label="Multi-Cam Active Speaker Auto-Switch"
              description="Tracks active face trajectory and cuts angles on switch."
              checked={toggleVal}
              onChange={setToggleVal}
            />

            <Toggle
              label="Anti-Copyright Audio Tempo Shift (+2.5%)"
              description="Shifts audio pitch/tempo slightly to evade automated false-positive bots."
              checked={true}
              onChange={() => {}}
            />

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-2">
                Caption Preset Tabs
              </label>
              <Tabs
                tabs={[
                  { id: 'overview', label: 'Hormozi' },
                  { id: 'captions', label: 'MrBeast' },
                  { id: 'cyberpunk', label: 'Cyberpunk' },
                  { id: 'minimal', label: 'Minimal' }
                ]}
                activeTab={activeTab}
                onChange={setActiveTab}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Empty States & Feedback */}
      <section className="space-y-4">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
          6. Empty States & Toast Trigger
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-bg-surface border border-border rounded-card p-6">
            <EmptyState
              icon={<FolderPlus className="w-5 h-5 text-accent" />}
              title="No Finished Clips Yet"
              description="Upload a long podcast or keynote video to generate 9:16 short-form clips automatically."
              actionLabel="Start New Project"
              onAction={() => addToast({ title: 'New Project Clicked', type: 'info' })}
            />
          </div>

          <div className="bg-bg-surface border border-border rounded-card p-6 flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-semibold text-text-primary mb-2">Interactive Feedback</h4>
              <p className="text-xs text-text-secondary leading-relaxed mb-4">
                Test the non-intrusive notification toast stack and modal dialog.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  addToast({
                    title: 'Clip Exported Successfully',
                    description: 'Saved to /Volumes/SSD/Exports/clip_01.mp4',
                    type: 'success'
                  })
                }
              >
                Trigger Success Toast
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() =>
                  addToast({
                    title: 'LLM Circuit Breaker Tripped',
                    description: 'Ollama timed out; heuristic title fallback active.',
                    type: 'warning'
                  })
                }
              >
                Trigger Warning Toast
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => setModalOpen(true)}
              >
                Open Demo Modal
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Confirm Export Package"
        description="Render and compress 4 selected clips with Apple VideoToolbox hardware acceleration."
      >
        <div className="space-y-4 pt-2">
          <p className="text-xs text-text-secondary leading-relaxed">
            Clips will be generated at 1080x1920 (9:16) 60fps with burned-in subtitles and context headlines.
            Output folder: <code className="font-mono text-accent">~/Movies/ClipLocal/Exports</code>
          </p>
          <div className="flex justify-end gap-3 pt-3 border-t border-border">
            <Button variant="ghost" size="sm" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setModalOpen(false)
                addToast({ title: 'Export Started', type: 'success' })
              }}
            >
              Start Export
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
