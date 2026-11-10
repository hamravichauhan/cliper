import React, { useState, useEffect } from 'react'
import {
  Activity,
  CheckCircle2,
  Clock,
  Flame,
  HardDrive,
  RefreshCw,
  Search,
  Sliders,
  Sparkles,
  Trash2,
  RotateCcw,
  StopCircle,
  ExternalLink,
  Archive,
  Calendar,
  Layers,
  Cpu,
  AlertTriangle,
  Play,
  ChevronRight
} from 'lucide-react'

interface JobItem {
  job_id: string
  created_at: number
  status: string
  progress: number
  stage: string
  source: string
  title: string
  duration: number
  clip_count: number
  avg_virality_score: number
  error_message?: string
  timing_report?: Record<string, number>
  style?: string
  options?: any
}

interface AnalyticsData {
  total_jobs: number
  completed_jobs: number
  running_jobs: number
  failed_jobs: number
  total_clips: number
  total_minutes_processed: number
  estimated_hours_saved: number
  average_virality_score: number
  storage_used_mb: number
  system: {
    platform: string
    apple_silicon: boolean
    mlx_acceleration: boolean
    whisper_backend: string
    whisper_model: string
    ollama_online: boolean
    disk_free_gb: number
    disk_total_gb: number
  }
}

interface Props {
  onSelectJob: (jobId: string) => void
  onNewJob: () => void
}

export const Dashboard: React.FC<Props> = ({ onSelectJob, onNewJob }) => {
  const [jobs, setJobs] = useState<JobItem[]>([])
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'running' | 'completed' | 'failed'>('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [autoRefresh, setAutoRefresh] = useState(true)

  const fetchData = async () => {
    try {
      const [jobsRes, statsRes] = await Promise.all([
        fetch('/api/jobs'),
        fetch('/api/analytics')
      ])
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json()
        setJobs(jobsData)
      }
      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setAnalytics(statsData)
      }
    } catch (err) {
      console.error('Error fetching dashboard data:', err)
    } finally {
      setIsRefreshing(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!autoRefresh) return
    const interval = setInterval(() => {
      fetchData()
    }, 3000)
    return () => clearInterval(interval)
  }, [autoRefresh])

  const handleManualRefresh = () => {
    setIsRefreshing(true)
    fetchData()
  }

  const handleDelete = async (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    if (!confirm(`Are you sure you want to delete job ${jobId}?`)) return
    try {
      const res = await fetch(`/api/jobs/${jobId}`, { method: 'DELETE' })
      if (res.ok) {
        fetchData()
      }
    } catch (err) {
      console.error('Failed to delete job:', err)
    }
  }

  const handleCancel = async (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const res = await fetch(`/api/jobs/${jobId}/cancel`, { method: 'POST' })
      if (res.ok) {
        fetchData()
      }
    } catch (err) {
      console.error('Failed to cancel job:', err)
    }
  }

  const handleRetry = async (jobId: string, e: React.MouseEvent) => {
    e.stopPropagation()
    try {
      const res = await fetch(`/api/jobs/${jobId}/retry`, { method: 'POST' })
      if (res.ok) {
        const data = await res.json()
        onSelectJob(data.job_id)
      }
    } catch (err) {
      console.error('Failed to retry job:', err)
    }
  }

  const filteredJobs = jobs.filter((j) => {
    const matchesQuery =
      j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      j.job_id.toLowerCase().includes(searchQuery.toLowerCase())

    if (!matchesQuery) return false

    if (filterStatus === 'running') {
      return ['queued', 'ingesting', 'transcribing', 'segmenting', 'scoring', 'rendering'].includes(j.status)
    }
    if (filterStatus === 'completed') {
      return j.status === 'completed'
    }
    if (filterStatus === 'failed') {
      return ['failed', 'cancelled'].includes(j.status)
    }
    return true
  })

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp * 1000)
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDuration = (seconds: number) => {
    if (!seconds) return '0s'
    const mins = Math.floor(seconds / 60)
    const hours = Math.floor(mins / 60)
    if (hours > 0) {
      return `${hours}h ${mins % 60}m`
    }
    return `${mins}m ${Math.floor(seconds % 60)}s`
  }

  return (
    <div className="max-w-7xl mx-auto py-8 space-y-8 animate-fadeIn">
      {/* Top Banner / Hero */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-900/60 border border-slate-800 p-6 rounded-3xl backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Activity className="w-6 h-6 text-violet-400" /> Production Studio Dashboard
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Live Pipeline
            </span>
          </div>
          <p className="text-sm text-slate-400 mt-1">
            Real-time tracking of AI transcription, multi-camera framing, virality scoring & bulk exports.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={handleManualRefresh}
            className={`p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-all ${
              isRefreshing ? 'animate-spin text-violet-400' : ''
            }`}
            title="Refresh pipeline status"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setAutoRefresh(!autoRefresh)}
            className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition-all ${
              autoRefresh
                ? 'bg-violet-500/15 border-violet-500 text-violet-300'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-violet-400 animate-pulse' : 'bg-slate-600'}`} />
            Auto-Sync: {autoRefresh ? '3s' : 'OFF'}
          </button>

          <button
            onClick={onNewJob}
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-violet-600/20 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> + New Clip Pipeline
          </button>
        </div>
      </div>

      {/* KPI / Metric Counters Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {/* Total Clips */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Clips Produced</span>
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{analytics?.total_clips ?? 0}</span>
            <span className="text-[11px] text-emerald-400 font-medium">Ready to post</span>
          </div>
        </div>

        {/* Editing Hours Saved */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Hours Saved</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{analytics?.estimated_hours_saved ?? 0}h</span>
            <span className="text-[11px] text-slate-400 font-medium">vs manual cut</span>
          </div>
        </div>

        {/* Avg Virality Score */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Avg Virality</span>
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{analytics?.average_virality_score ?? 0}</span>
            <span className="text-[11px] text-amber-400 font-medium">/ 100 benchmark</span>
          </div>
        </div>

        {/* Total Processed Duration */}
        <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Video Ingested</span>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{analytics?.total_minutes_processed ?? 0}m</span>
            <span className="text-[11px] text-slate-400 font-medium">across {analytics?.total_jobs ?? 0} runs</span>
          </div>
        </div>

        {/* Local Storage Footprint */}
        <div className="col-span-2 md:col-span-1 bg-slate-900/90 border border-slate-800 p-5 rounded-2xl relative overflow-hidden">
          <div className="flex justify-between items-start">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Local Storage</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
              <HardDrive className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">
              {((analytics?.storage_used_mb ?? 0) / 1024).toFixed(1)} GB
            </span>
            <span className="text-[11px] text-slate-400 font-medium">{analytics?.system.disk_free_gb ?? 0} GB free</span>
          </div>
        </div>
      </div>

      {/* Production System Health Bar */}
      {analytics?.system && (
        <div className="bg-slate-950 border border-slate-850 rounded-2xl px-6 py-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Cpu className="w-4 h-4 text-violet-400" />
            <span className="text-slate-400">Engine Hardware:</span>
            <span className="font-bold text-white">{analytics.system.platform}</span>
            {analytics.system.apple_silicon && (
              <span className="px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono text-[10px] border border-violet-500/30">
                ⚡ Metal Accelerated
              </span>
            )}
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-slate-400">Whisper Backend:</span>
              <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-200 font-mono text-[10px]">
                {analytics.system.whisper_backend} ({analytics.system.whisper_model})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-slate-400">Local LLM:</span>
              <span className={`px-2 py-0.5 rounded font-mono text-[10px] flex items-center gap-1 ${
                analytics.system.ollama_online
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                  : 'bg-slate-800 text-slate-500'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${analytics.system.ollama_online ? 'bg-emerald-400' : 'bg-slate-500'}`} />
                {analytics.system.ollama_online ? 'Ollama Online' : 'Ollama Offline'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Filter Tabs & Search Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
        <div className="flex items-center gap-1.5 bg-slate-900 border border-slate-800 p-1 rounded-xl">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'all'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Jobs ({jobs.length})
          </button>
          <button
            onClick={() => setFilterStatus('running')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              filterStatus === 'running'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>Processing</span>
            {analytics?.running_jobs ? (
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            ) : null}
            <span className="text-[10px] opacity-70">({analytics?.running_jobs ?? 0})</span>
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'completed'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Completed ({analytics?.completed_jobs ?? 0})
          </button>
          <button
            onClick={() => setFilterStatus('failed')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
              filterStatus === 'failed'
                ? 'bg-violet-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Failed ({analytics?.failed_jobs ?? 0})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 sm:max-w-xs">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by title, URL or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-violet-500 transition-colors"
          />
        </div>
      </div>

      {/* Jobs Production List / Table */}
      {filteredJobs.length === 0 ? (
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-12 text-center space-y-4">
          <Layers className="w-12 h-12 text-slate-600 mx-auto" />
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-300">No clipping jobs found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              {searchQuery
                ? `No jobs match your search "${searchQuery}". Try clearing the search.`
                : 'Start your first automated clipping job using the Studio Ingest screen.'}
            </p>
          </div>
          <button
            onClick={onNewJob}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold rounded-xl transition-colors inline-flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 fill-current" /> Start First Job
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredJobs.map((job) => {
            const isRunning = ['queued', 'ingesting', 'transcribing', 'segmenting', 'scoring', 'rendering'].includes(job.status)
            const isCompleted = job.status === 'completed'
            const isFailed = job.status === 'failed' || job.status === 'cancelled'

            return (
              <div
                key={job.job_id}
                onClick={() => onSelectJob(job.job_id)}
                className={`bg-slate-900/80 border rounded-2xl p-5 transition-all cursor-pointer group hover:border-violet-500/60 hover:shadow-xl hover:shadow-violet-900/10 ${
                  isRunning ? 'border-amber-500/40 bg-amber-950/10' : isFailed ? 'border-red-500/30' : 'border-slate-800'
                }`}
              >
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  {/* Left: Status, Title, Source, Metadata */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="mt-1">
                      {isCompleted && (
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-sm">
                          <CheckCircle2 className="w-5 h-5" />
                        </div>
                      )}
                      {isRunning && (
                        <div className="w-9 h-9 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 animate-spin">
                          <RefreshCw className="w-5 h-5" />
                        </div>
                      )}
                      {isFailed && (
                        <div className="w-9 h-9 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-400">
                          <AlertTriangle className="w-5 h-5" />
                        </div>
                      )}
                    </div>

                    <div className="space-y-1.5 flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          isCompleted
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : isRunning
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 animate-pulse'
                            : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}>
                          {job.status}
                        </span>

                        <span className="text-[10px] font-mono text-slate-500">
                          ID: {job.job_id}
                        </span>

                        <span className="text-[10px] text-slate-500">
                          • {formatTimestamp(job.created_at)}
                        </span>

                        {job.style && (
                          <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-medium text-slate-400">
                            Style: {job.style}
                          </span>
                        )}
                      </div>

                      <h3 className="font-bold text-sm text-white group-hover:text-violet-300 transition-colors line-clamp-1">
                        {job.title}
                      </h3>

                      <p className="text-xs text-slate-400 font-mono truncate max-w-xl">
                        {job.source}
                      </p>

                      {/* Error message preview if failed */}
                      {job.error_message && (
                        <p className="text-xs text-red-400 bg-red-950/40 border border-red-900/50 p-2 rounded-lg mt-2 font-mono">
                          Error: {job.error_message}
                        </p>
                      )}

                      {/* Live Progress Bar if Running */}
                      {isRunning && (
                        <div className="pt-2 space-y-1.5 max-w-md">
                          <div className="flex justify-between items-center text-[11px]">
                            <span className="text-amber-400 font-medium flex items-center gap-1.5">
                              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                              {job.stage}
                            </span>
                            <span className="font-mono font-bold text-amber-300">{job.progress}%</span>
                          </div>
                          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                            <div
                              className="bg-gradient-to-r from-amber-500 to-violet-500 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${job.progress}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Metrics & Actions */}
                  <div className="flex flex-wrap lg:flex-nowrap items-center gap-3 w-full lg:w-auto pt-3 lg:pt-0 border-t lg:border-t-0 border-slate-800/80">
                    {/* Metrics Pills */}
                    {isCompleted && (
                      <div className="flex items-center gap-2 mr-2">
                        <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                          <span className="block text-[10px] font-semibold text-slate-500 uppercase">Clips</span>
                          <span className="font-black text-xs text-violet-400">{job.clip_count}</span>
                        </div>

                        {job.avg_virality_score > 0 && (
                          <div className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                            <span className="block text-[10px] font-semibold text-slate-500 uppercase">Virality</span>
                            <span className="font-black text-xs text-amber-400">{job.avg_virality_score}</span>
                          </div>
                        )}

                        {job.duration > 0 && (
                          <div className="hidden sm:block px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-center">
                            <span className="block text-[10px] font-semibold text-slate-500 uppercase">Length</span>
                            <span className="font-mono text-xs text-slate-300">{formatDuration(job.duration)}</span>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1.5 ml-auto">
                      {isCompleted && (
                        <>
                          <a
                            href={`/api/jobs/${job.job_id}/export/bundle`}
                            download={`Client_Pack_${job.job_id}.zip`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                            title="Download Turnkey Client Delivery Pack (.ZIP with HTML Report)"
                          >
                            <Archive className="w-4 h-4 text-violet-400" />
                          </a>

                          <a
                            href={`/api/jobs/${job.job_id}/export/schedule`}
                            download={`Schedule_${job.job_id}.csv`}
                            onClick={(e) => e.stopPropagation()}
                            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors"
                            title="Download 30-Day Social Scheduling CSV"
                          >
                            <Calendar className="w-4 h-4 text-emerald-400" />
                          </a>

                          <button
                            onClick={() => onSelectJob(job.job_id)}
                            className="px-3.5 py-1.5 bg-violet-600 hover:bg-violet-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                          >
                            <span>Open Studio</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </>
                      )}

                      {isRunning && (
                        <button
                          onClick={(e) => handleCancel(job.job_id, e)}
                          className="px-3 py-1.5 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <StopCircle className="w-3.5 h-3.5" /> Cancel
                        </button>
                      )}

                      {isFailed && (
                        <button
                          onClick={(e) => handleRetry(job.job_id, e)}
                          className="px-3 py-1.5 bg-amber-600/20 hover:bg-amber-600 text-amber-300 hover:text-white border border-amber-500/30 text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5"
                        >
                          <RotateCcw className="w-3.5 h-3.5" /> Retry
                        </button>
                      )}

                      <button
                        onClick={(e) => handleDelete(job.job_id, e)}
                        className="p-2 rounded-xl text-slate-600 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                        title="Delete job from history"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
export default Dashboard