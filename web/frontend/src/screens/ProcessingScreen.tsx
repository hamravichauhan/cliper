import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import {
  CheckCircle2,
  Clock,
  Terminal,
  X,
  ChevronDown,
  ChevronUp,
  Cpu,
  Layers
} from 'lucide-react'

export const ProcessingScreen: React.FC = () => {
  const { setScreen, addToast } = useStore()

  const [step, setStep] = useState(2) // 0: Audio, 1: Whisper, 2: 6-Factor, 3: VideoToolbox Render
  const [progress, setProgress] = useState(65)
  const [logExpanded, setLogExpanded] = useState(true)

  const steps = [
    { title: 'Extract Audio & Demuxing', eta: 'Done (1.2s)', desc: '16kHz mono WAV extraction via FFmpeg' },
    { title: 'Whisper MLX Transcription', eta: 'Done (8.4s)', desc: 'large-v3-turbo with Metal FP16 acceleration' },
    { title: '6-Factor Virality Scoring & Context', eta: 'In Progress (ETA 4s)', desc: 'Hook, acoustics, pacing, and spoken context derivation' },
    { title: 'Parallel VideoToolbox Render', eta: 'Pending', desc: 'Hardware ProRes/H.265 encoding with 3 parallel workers' }
  ]

  const mockLogs = [
    '[00:00.12] cliplocal.ingest: Demuxing audio stream from hormozi_masterclass_4k.mp4...',
    '[00:01.32] cliplocal.asr: Initializing MLX Whisper large-v3-turbo on Apple M4 GPU...',
    '[00:05.80] cliplocal.asr: Transcription complete. 1,420 words detected. Language: English (99.8%)',
    '[00:07.10] cliplocal.scoring: Evaluating candidate segments across 6 virality factors...',
    '[00:08.40] cliplocal.scoring: Segment [142.0s - 184.5s] Hook score: 96, Acoustics: 91 -> Virality: 92',
    '[00:09.10] cliplocal.context: Spoken context headline extracted: "Why 99% Of People Never Make Money"',
    '[00:10.50] cliplocal.render: Spawning ThreadPoolExecutor(max_workers=3) with VideoToolbox hardware encoder...'
  ]

  // Simulate auto-completion after 6 seconds for smooth demo
  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(100)
      setStep(3)
      addToast({
        title: 'Processing Complete!',
        description: '5 viral clips generated and ready for review.',
        type: 'success'
      })
    }, 4500)
    return () => clearTimeout(timer)
  }, [addToast])

  return (
    <div className="max-w-[800px] mx-auto py-8 px-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Processing Video Pipeline
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Job ID: <span className="font-mono text-accent">job_7a9f2c</span> • Apple M4 Hardware Acceleration
          </p>
        </div>

        <Button
          variant="danger"
          size="sm"
          icon={<X className="w-3.5 h-3.5" />}
          onClick={() => {
            addToast({ title: 'Job Cancelled', type: 'warning' })
            setScreen('home')
          }}
        >
          Cancel Job
        </Button>
      </div>

      {/* Main Progress Bar */}
      <div className="bg-bg-surface border border-border rounded-card p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold text-text-primary">Overall Pipeline Progress</span>
          <span className="font-mono text-accent font-bold">{progress}%</span>
        </div>
        <div className="w-full h-2 bg-[#1F1F23] rounded-full overflow-hidden">
          <div
            className="h-full bg-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] text-text-muted pt-1">
          <span>Target: 5 Clips (35s vertical)</span>
          <span>ETA remaining: ~6 seconds</span>
        </div>
      </div>

      {/* Vertical Stepper */}
      <div className="bg-bg-surface border border-border rounded-card p-6 space-y-6">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Pipeline Execution Stages
        </h3>

        <div className="space-y-6">
          {steps.map((s, idx) => {
            const isCompleted = idx < step || progress === 100
            const isCurrent = idx === step && progress < 100
            const isPending = idx > step && progress < 100

            return (
              <div key={s.title} className="flex items-start gap-4">
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <div className="w-6 h-6 rounded-full bg-status-success/20 text-status-success border border-status-success/40 flex items-center justify-center">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                  ) : isCurrent ? (
                    <div className="w-6 h-6 rounded-full bg-accent/20 text-accent border border-accent/40 flex items-center justify-center animate-spin">
                      <Cpu className="w-3.5 h-3.5" />
                    </div>
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#18181B] text-text-muted border border-border flex items-center justify-center font-mono text-xs">
                      {idx + 1}
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4
                      className={`text-xs font-semibold ${
                        isCompleted || isCurrent ? 'text-text-primary' : 'text-text-muted'
                      }`}
                    >
                      {s.title}
                    </h4>
                    <span className="text-[11px] font-mono text-text-muted">{s.eta}</span>
                  </div>
                  <p className="text-[11px] text-text-secondary mt-0.5">{s.desc}</p>
                </div>
              </div>
            )
          })}
        </div>

        {progress === 100 && (
          <div className="pt-4 border-t border-border flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={() => setScreen('studio')}
            >
              Open in Clip Review Studio
            </Button>
          </div>
        )}
      </div>

      {/* Live Mono Log Output */}
      <div className="bg-[#09090B] border border-border rounded-card overflow-hidden">
        <button
          onClick={() => setLogExpanded(!logExpanded)}
          className="w-full px-4 py-2.5 bg-[#111113] border-b border-border flex items-center justify-between text-xs text-text-secondary hover:text-text-primary"
        >
          <span className="flex items-center gap-2 font-mono text-[11px]">
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span>Live Terminal Execution Log</span>
          </span>
          {logExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {logExpanded && (
          <div className="p-3 font-mono text-[11px] text-text-muted space-y-1 max-h-48 overflow-y-auto bg-black">
            {mockLogs.map((log, i) => (
              <div key={i} className="hover:text-text-secondary transition-colors">
                {log}
              </div>
            ))}
            <div className="text-accent animate-pulse font-mono">_</div>
          </div>
        )}
      </div>
    </div>
  )
}
