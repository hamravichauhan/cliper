import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Slider } from '../components/ui/Slider'
import {
  Calendar as CalendarIcon,
  Download,
  Sparkles,
  Clock,
  Share2,
  FileSpreadsheet,
  Check
} from 'lucide-react'

export const ScheduleScreen: React.FC = () => {
  const { clips, addToast, downloadScheduleCSV } = useStore()
  const [postsPerDay, setPostsPerDay] = useState(2)
  const [generated, setGenerated] = useState(true)

  // 30 days matrix
  const days = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    date: `Nov ${i + 1}`,
    clips: i < 15 ? [clips[i % clips.length]] : []
  }))

  const handleExportCSV = () => {
    downloadScheduleCSV()
  }

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            30-Day Content Scheduling Engine
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Auto-generate optimal posting slots across TikTok, YouTube Shorts, and Instagram Reels with ready-to-import CSVs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5 text-accent" />}
            onClick={() => addToast({ title: 'Schedule Regenerated', type: 'info' })}
          >
            Auto-Optimize Posting Slots
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<FileSpreadsheet className="w-3.5 h-3.5" />}
            onClick={handleExportCSV}
          >
            Export Meta / Buffer CSV
          </Button>
        </div>
      </div>

      {/* Settings Row */}
      <div className="bg-bg-surface border border-border rounded-card p-4 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="w-full md:w-72">
          <Slider
            label="Target Posts Per Day"
            min={1}
            max={4}
            value={postsPerDay}
            unit=" posts/day"
            onChange={setPostsPerDay}
          />
        </div>

        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-accent" />
            <span>Optimal Times: <strong>11:30 AM, 6:45 PM EST</strong></span>
          </div>
          <Badge variant="accent">30 Total Slots Planned</Badge>
        </div>
      </div>

      {/* 30-Day Calendar Grid */}
      <div className="bg-bg-surface border border-border rounded-card p-4 space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div key={day} className="text-center text-[11px] font-semibold text-text-muted py-1">
              {day}
            </div>
          ))}

          {days.map((d) => (
            <div
              key={d.day}
              className="min-h-24 bg-[#141416] border border-border/80 rounded-control p-2 flex flex-col justify-between hover:border-[#3F3F46] transition-colors"
            >
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-semibold text-text-primary">{d.day}</span>
                <span className="text-text-muted">{d.date}</span>
              </div>

              {d.clips.length > 0 ? (
                <div className="bg-[#18181B] border border-accent/30 rounded p-1.5 space-y-1">
                  <p className="text-[10px] font-semibold text-text-primary truncate">
                    {d.clips[0].title}
                  </p>
                  <div className="flex justify-between items-center text-[9px] text-accent font-mono">
                    <span>11:30 AM</span>
                    <span>{d.clips[0].viralityScore} pts</span>
                  </div>
                </div>
              ) : (
                <div className="text-center py-3 text-[10px] text-text-muted">
                  + Add slot
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
