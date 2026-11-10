import React from 'react'
import { useStore } from '../store/useStore'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ScoreRing } from '../components/ui/ScoreRing'
import {
  Scissors,
  Clock,
  Zap,
  HardDrive,
  PlusCircle,
  Play,
  ArrowRight,
  TrendingUp,
  FolderOpen
} from 'lucide-react'

export const HomeScreen: React.FC = () => {
  const { setScreen, projects, selectProject } = useStore()
  const activeProj = projects[0]

  const stats = [
    { label: 'Clips Produced', val: '142', change: '+24 this week', icon: <Scissors className="w-4 h-4 text-accent" /> },
    { label: 'Hours Saved', val: '38.5h', change: '8.4x faster vs Premiere', icon: <Clock className="w-4 h-4 text-text-muted" /> },
    { label: 'Avg Virality Score', val: '86.4', change: 'Top 5% bracket', icon: <TrendingUp className="w-4 h-4 text-accent" /> },
    { label: 'Minutes Ingested', val: '840m', change: '14 total episodes', icon: <Zap className="w-4 h-4 text-text-muted" /> },
    { label: 'Storage Used', val: '14.2 GB', change: 'Cache: 4.8 GB', icon: <HardDrive className="w-4 h-4 text-text-muted" /> }
  ]

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-6 space-y-8">
      {/* Welcome & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Studio Overview
          </h2>
          <p className="text-xs text-text-secondary mt-1">
            Local Apple Silicon acceleration active • Zero cloud latency • Everything runs offline
          </p>
        </div>
        <Button
          variant="primary"
          size="md"
          icon={<PlusCircle className="w-4 h-4" />}
          onClick={() => setScreen('new-project')}
        >
          New Project
        </Button>
      </div>

      {/* Top 5 KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="bg-bg-surface border border-border rounded-card p-4 space-y-1.5 transition-all hover:border-[#3F3F46]"
          >
            <div className="flex items-center justify-between text-text-muted">
              <span className="text-[11px] font-medium text-text-secondary">{s.label}</span>
              {s.icon}
            </div>
            <div className="text-xl font-bold font-mono tracking-tight text-text-primary">
              {s.val}
            </div>
            <p className="text-[10px] text-accent/90 font-medium">{s.change}</p>
          </div>
        ))}
      </div>

      {/* Continue where you left off */}
      {activeProj && (
        <div className="bg-bg-surface border border-border rounded-card p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                Continue Where You Left Off
              </span>
            </div>
            <Badge variant="accent">Ready for Review</Badge>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 bg-[#18181B] border border-border/80 rounded-control p-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-control overflow-hidden bg-black shrink-0 border border-border">
                <img
                  src={activeProj.thumbnailUrl}
                  alt={activeProj.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-text-primary">
                  {activeProj.title}
                </h3>
                <p className="text-xs text-text-secondary">
                  Source: <span className="font-mono text-text-muted">{activeProj.source}</span> • {activeProj.clipsCount} viral candidate clips generated
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              onClick={() => selectProject(activeProj.id)}
            >
              Open in Review Studio
            </Button>
          </div>
        </div>
      )}

      {/* Recent Projects Table Preview */}
      <div className="bg-bg-surface border border-border rounded-card p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-text-primary">Recent Projects</h3>
          <button
            onClick={() => setScreen('projects')}
            className="text-xs text-accent hover:underline flex items-center gap-1"
          >
            <span>View all projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-border/60">
          {projects.slice(0, 5).map((p) => (
            <div
              key={p.id}
              onClick={() => selectProject(p.id)}
              className="py-3 flex items-center justify-between gap-4 cursor-pointer hover:bg-bg-elevated px-3 -mx-3 rounded-control transition-colors"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-control bg-black overflow-hidden border border-border shrink-0">
                  <img src={p.thumbnailUrl} alt={p.title} className="w-full h-full object-cover" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-semibold text-text-primary truncate">{p.title}</h4>
                  <p className="text-[11px] text-text-muted font-mono">{p.source}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs shrink-0">
                <span className="text-text-muted font-mono hidden md:inline">
                  {p.clipsCount} clips
                </span>
                {p.status === 'completed' && <Badge variant="success">Completed</Badge>}
                {p.status === 'processing' && <Badge variant="warning">Processing</Badge>}
                {p.status === 'failed' && <Badge variant="danger">Failed</Badge>}
                <ArrowRight className="w-3.5 h-3.5 text-text-muted" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
