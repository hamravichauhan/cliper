import React, { useState, useEffect, useRef } from 'react'
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
  Layers,
  RotateCcw,
  Sparkles,
  AlertCircle,
  Copy,
  Check,
  LayoutDashboard
} from 'lucide-react'

interface JobData {
  job_id: string
  created_at: number
  source_url_or_path: string
  status: 'queued' | 'ingesting' | 'transcribing' | 'segmenting' | 'scoring' | 'rendering' | 'completed' | 'failed' | 'cancelled'
  progress: number
  stage: string
  log_messages: string[]
  error_message?: string | null
  metadata?: any
  candidates?: any[]
  timing_report?: Record<string, number>
}

export const ProcessingScreen: React.FC = () => {
  const {
    activeJobId,
    setActiveJobId,
    setScreen,
    addToast,
    loadJobIntoStudio,
    fetchProjects,
    fetchAnalytics
  } = useStore()

  const [jobData, setJobData] = useState<JobData | null>(null)
  const [logExpanded, setLogExpanded] = useState(true)
  const [copiedLogs, setCopiedLogs] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const logEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll logs
  useEffect(() => {
    if (logExpanded && logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [jobData?.log_messages, logExpanded])

  // Polling logic
  useEffect(() => {
    let isMounted = true

    const fetchJob = async (id: string) => {
      try {
        const res = await fetch(`/api/jobs/${id}`)
        if (res.ok) {
          const data: JobData = await res.json()
          if (isMounted) {
            setJobData(data)
            setIsLoading(false)

            if (data.status === 'completed') {
              // Preload clips into studio and sync dashboard
              loadJobIntoStudio(data.job_id, false)
              fetchProjects()
              fetchAnalytics()
            }
          }
        }
      } catch (err) {
        console.error('Error fetching job status:', err)
      }
    }

    const discoverLatestJob = async () => {
      try {
        const res = await fetch('/api/jobs')
        if (res.ok) {
          const jobs: any[] = await res.json()
          if (jobs.length > 0) {
            // Find active running job or pick latest
            const running = jobs.find((j) =>
              ['queued', 'ingesting', 'transcribing', 'segmenting', 'scoring', 'rendering'].includes(j.status)
            )
            const targetId = running ? running.job_id : jobs[0].job_id
            if (isMounted) {
              setActiveJobId(targetId)
              fetchJob(targetId)
            }
            return
          }
        }
      } catch (err) {
        console.error('Error discovering jobs:', err)
      }
      if (isMounted) setIsLoading(false)
    }

    if (activeJobId) {
      fetchJob(activeJobId)
    } else {
      discoverLatestJob()
    }

    const interval = setInterval(() => {
      const currentId = activeJobId || jobData?.job_id
      if (currentId) {
        fetchJob(currentId)
      }
    }, 1000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [activeJobId, jobData?.job_id, setActiveJobId])

  const handleCancelJob = async () => {
    if (!jobData?.job_id) return
    try {
      const res = await fetch(`/api/jobs/${jobData.job_id}/cancel`, { method: 'POST' })
      if (res.ok) {
        addToast({
          title: 'Job Cancelled',
          description: `Pipeline execution for ${jobData.job_id} halted.`,
          type: 'warning'
        })
        setJobData((prev) => (prev ? { ...prev, status: 'cancelled', stage: 'Cancelled by user' } : null))
      }
    } catch {
      addToast({ title: 'Cancellation Failed', type: 'danger' })
    }
  }

  const handleRetryJob = async () => {
    if (!jobData?.job_id) return
    try {
      const res = await fetch(`/api/jobs/${jobData.job_id}/retry`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        setActiveJobId(data.job_id)
        addToast({
          title: 'Job Retried',
          description: `New job ${data.job_id} submitted to queue.`,
          type: 'success'
        })
      }
    } catch {
      addToast({ title: 'Retry Failed', type: 'danger' })
    }
  }

  const handleOpenStudio = async () => {
    if (!jobData) return
    const success = await loadJobIntoStudio(jobData.job_id)
    if (!success) {
      setScreen('studio')
    }
  }

  const handleCopyLogs = () => {
    if (!jobData?.log_messages) return
    navigator.clipboard.writeText(jobData.log_messages.join('\n'))
    setCopiedLogs(true)
    setTimeout(() => setCopiedLogs(false), 2000)
    addToast({ title: 'Logs Copied', description: 'Terminal log copied to clipboard.', type: 'info' })
  }

  // If no job data yet
  if (isLoading && !jobData) {
    return (
      <div className="max-w-[800px] mx-auto py-16 px-6 text-center space-y-4">
        <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto" />
        <h3 className="text-sm font-semibold text-text-primary">Connecting to Local Processing Engine...</h3>
        <p className="text-xs text-text-muted">Reading SQLite pipeline queue on Apple Silicon.</p>
      </div>
    )
  }

  if (!jobData) {
    return (
      <div className="max-w-[800px] mx-auto py-16 px-6 text-center space-y-4 bg-bg-surface border border-border rounded-card mt-8">
        <Layers className="w-10 h-10 text-text-muted mx-auto" />
        <h3 className="text-sm font-semibold text-text-primary">No Active Pipeline Job</h3>
        <p className="text-xs text-text-muted max-w-sm mx-auto">
          There are currently no videos being processed in the pipeline queue.
        </p>
        <Button variant="primary" size="sm" onClick={() => setScreen('new-project')}>
          Start New Project
        </Button>
      </div>
    )
  }

  const progress = Math.min(100, Math.max(0, Math.round(jobData.progress || 0)))
  const isFinished = jobData.status === 'completed'
  const isFailed = jobData.status === 'failed'
  const isCancelled = jobData.status === 'cancelled'
  const isRunning = !isFinished && !isFailed && !isCancelled

  // Intelligent Stage-Aware ETA Calculation (Calibrated for Apple Silicon M4)
  const elapsedSec = Math.max(1, Math.round(Date.now() / 1000 - jobData.created_at))
  const videoDurationSec = jobData.metadata?.duration || 3600
  let etaText = 'Calculating...'

  if (isFinished) {
    etaText = `Completed in ${Math.round(elapsedSec)}s`
  } else if (isFailed) {
    etaText = 'Failed'
  } else if (isCancelled) {
    etaText = 'Cancelled'
  } else {
    let remainingSec = 60
    if (jobData.status === 'ingesting' || progress < 20) {
      remainingSec = 90
    } else if (
      jobData.status === 'transcribing' ||
      jobData.status === 'segmenting' ||
      (progress >= 20 && progress < 50)
    ) {
      // Whisper MLX Turbo runs at ~10x real-time speed on Apple M4 GPU
      const whisperTotalSec = Math.round(videoDurationSec / 10.0)
      const ingestTime = jobData.timing_report?.['Ingest & Probe'] || 120
      const transcribeElapsed = Math.max(0, elapsedSec - ingestTime)
      const whisperRemaining = Math.max(30, whisperTotalSec - transcribeElapsed)
      remainingSec = whisperRemaining + 25 + 60
    } else if (jobData.status === 'scoring' || (progress >= 50 && progress < 70)) {
      remainingSec = 75
    } else if (jobData.status === 'rendering' || progress >= 70) {
      const remainingProgressRatio = Math.max(0.1, (100 - progress) / 30.0)
      remainingSec = Math.max(5, Math.round(60 * remainingProgressRatio))
    }

    if (remainingSec >= 60) {
      const mins = Math.floor(remainingSec / 60)
      const secs = remainingSec % 60
      etaText = `~${mins}m ${secs > 0 ? `${secs}s` : ''} remaining`
    } else {
      etaText = `~${remainingSec}s remaining`
    }
  }

  // Derive execution steps status dynamically from real progress and timing report
  const steps = [
    {
      title: 'Source Ingestion & Audio Demuxing',
      desc: '16kHz mono WAV extraction via FFmpeg with probe inspection',
      isCompleted: progress >= 20 || Boolean(jobData.timing_report?.['Ingest & Probe']),
      isCurrent: jobData.status === 'ingesting' || (progress < 20 && isRunning),
      timeText: jobData.timing_report?.['Ingest & Probe']
        ? `Done (${jobData.timing_report['Ingest & Probe'].toFixed(1)}s)`
        : progress >= 20
        ? 'Done'
        : jobData.status === 'ingesting'
        ? 'In Progress'
        : 'Pending'
    },
    {
      title: 'Whisper MLX Speech-to-Text',
      desc: 'Word-level timestamp extraction with Apple Metal FP16 Whisper Turbo',
      isCompleted: progress >= 50 || Boolean(jobData.timing_report?.['Transcription']),
      isCurrent:
        jobData.status === 'transcribing' ||
        jobData.status === 'segmenting' ||
        (progress >= 20 && progress < 50 && isRunning),
      timeText: jobData.timing_report?.['Transcription']
        ? `Done (${jobData.timing_report['Transcription'].toFixed(1)}s)`
        : progress >= 50
        ? 'Done'
        : jobData.status === 'transcribing' || jobData.status === 'segmenting'
        ? 'In Progress'
        : 'Pending'
    },
    {
      title: '6-Factor Virality Scoring & Spoken Context',
      desc: 'Hook, acoustics, pacing, and thesis context headline extraction',
      isCompleted: progress >= 70 || Boolean(jobData.timing_report?.['Scoring & Ranking']),
      isCurrent: jobData.status === 'scoring' || (progress >= 50 && progress < 70 && isRunning),
      timeText: jobData.timing_report?.['Scoring & Ranking']
        ? `Done (${jobData.timing_report['Scoring & Ranking'].toFixed(1)}s)`
        : progress >= 70
        ? 'Done'
        : jobData.status === 'scoring'
        ? 'In Progress'
        : 'Pending'
    },
    {
      title: 'Parallel VideoToolbox 9:16 Render',
      desc: 'Hardware ProRes/H.265 encoding with burned-in ASS animated subtitles',
      isCompleted: isFinished || progress >= 100,
      isCurrent: jobData.status === 'rendering' || (progress >= 70 && progress < 100 && isRunning),
      timeText: jobData.timing_report?.['Rendering']
        ? `Done (${jobData.timing_report['Rendering'].toFixed(1)}s)`
        : isFinished || progress >= 100
        ? 'Done'
        : jobData.status === 'rendering'
        ? 'In Progress'
        : 'Pending'
    }
  ]

  const videoTitle =
    jobData.metadata?.title ||
    jobData.source_url_or_path.split('/').pop() ||
    jobData.source_url_or_path

  return (
    <div className="max-w-[800px] mx-auto py-8 px-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Processing Video Pipeline
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Job ID: <span className="font-mono text-accent">{jobData.job_id}</span> • Apple M4 Hardware Acceleration
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isRunning && (
            <Button
              variant="danger"
              size="sm"
              icon={<X className="w-3.5 h-3.5" />}
              onClick={handleCancelJob}
            >
              Cancel Job
            </Button>
          )}

          {isFailed && (
            <Button
              variant="secondary"
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={handleRetryJob}
            >
              Retry Job
            </Button>
          )}
        </div>
      </div>

      {/* Failure Callout if error */}
      {isFailed && jobData.error_message && (
        <div className="bg-danger/10 border border-danger/30 rounded-card p-4 flex items-start gap-3 text-xs">
          <AlertCircle className="w-4 h-4 text-danger shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-danger">Pipeline Execution Failed</h4>
            <p className="text-text-secondary mt-1 font-mono text-[11px] break-all">
              {jobData.error_message}
            </p>
          </div>
        </div>
      )}

      {/* Main Real Progress Bar */}
      <div className="bg-bg-surface border border-border rounded-card p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-text-primary">Overall Pipeline Progress</span>
            <Badge
              variant={isFinished ? 'accent' : isFailed ? 'danger' : isCancelled ? 'muted' : 'primary'}
              size="sm"
            >
              {jobData.stage || jobData.status}
            </Badge>
          </div>
          <span className="font-mono text-accent font-bold text-sm">{progress}%</span>
        </div>

        <div className="w-full h-2.5 bg-[#1F1F23] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-300 ease-out ${
              isFailed ? 'bg-danger' : isCancelled ? 'bg-amber-500' : 'bg-accent'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-text-muted pt-1">
          <span className="truncate max-w-[400px]" title={jobData.source_url_or_path}>
            Source: <strong className="text-text-primary">{videoTitle}</strong>
          </span>
          <span className="font-mono text-text-secondary">{etaText}</span>
        </div>
      </div>

      {/* Vertical Stepper */}
      <div className="bg-bg-surface border border-border rounded-card p-6 space-y-6">
        <h3 className="text-xs font-semibold text-text-muted uppercase tracking-wider">
          Pipeline Execution Stages
        </h3>

        <div className="space-y-6">
          {steps.map((s, idx) => (
            <div key={s.title} className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0">
                {s.isCompleted ? (
                  <div className="w-6 h-6 rounded-full bg-status-success/20 text-status-success border border-status-success/40 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                ) : s.isCurrent ? (
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
                      s.isCompleted || s.isCurrent ? 'text-text-primary' : 'text-text-muted'
                    }`}
                  >
                    {s.title}
                  </h4>
                  <span
                    className={`text-[11px] font-mono ${
                      s.isCompleted
                        ? 'text-status-success'
                        : s.isCurrent
                        ? 'text-accent font-semibold'
                        : 'text-text-muted'
                    }`}
                  >
                    {s.timeText}
                  </span>
                </div>
                <p className="text-[11px] text-text-secondary mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {isFinished && (
          <div className="pt-4 border-t border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs text-status-success font-medium flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              All short-form clips rendered and ready for review.
            </span>
            <div className="flex items-center gap-2.5">
              <Button
                variant="secondary"
                size="md"
                icon={<LayoutDashboard className="w-4 h-4" />}
                onClick={() => {
                  fetchProjects()
                  fetchAnalytics()
                  setScreen('home')
                }}
              >
                Go to Dashboard
              </Button>
              <Button
                variant="primary"
                size="md"
                icon={<Sparkles className="w-4 h-4" />}
                onClick={handleOpenStudio}
              >
                Open in Clip Review Studio
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Live Mono Log Output from Backend */}
      <div className="bg-[#09090B] border border-border rounded-card overflow-hidden">
        <div className="w-full px-4 py-2.5 bg-[#111113] border-b border-border flex items-center justify-between text-xs text-text-secondary">
          <button
            onClick={() => setLogExpanded(!logExpanded)}
            className="flex items-center gap-2 font-mono text-[11px] hover:text-text-primary"
          >
            <Terminal className="w-3.5 h-3.5 text-accent" />
            <span>Live Terminal Execution Log ({jobData.log_messages?.length || 0} events)</span>
            {logExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <Button
            variant="ghost"
            size="sm"
            className="h-6 text-[10px] px-2"
            icon={copiedLogs ? <Check className="w-3 h-3 text-status-success" /> : <Copy className="w-3 h-3" />}
            onClick={handleCopyLogs}
          >
            {copiedLogs ? 'Copied' : 'Copy Log'}
          </Button>
        </div>

        {logExpanded && (
          <div className="p-3 font-mono text-[11px] text-text-muted space-y-1.5 max-h-56 overflow-y-auto bg-black select-text">
            {jobData.log_messages && jobData.log_messages.length > 0 ? (
              jobData.log_messages.map((log, i) => (
                <div key={i} className="hover:text-text-secondary transition-colors leading-relaxed">
                  <span className="text-text-muted/60 select-none mr-2">[{i + 1}]</span>
                  {log}
                </div>
              ))
            ) : (
              <div className="text-text-muted italic">Waiting for pipeline messages...</div>
            )}
            {isRunning && (
              <div className="text-accent animate-pulse font-mono flex items-center gap-1 text-[10px]">
                <span>Pipeline active</span>
                <span className="animate-ping">...</span>
              </div>
            )}
            <div ref={logEndRef} />
          </div>
        )}
      </div>
    </div>
  )
}
