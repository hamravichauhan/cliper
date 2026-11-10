import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { ScoreRing } from '../components/ui/ScoreRing'
import {
  Download,
  Filter,
  CheckSquare,
  Square,
  Play,
  Share2,
  Trash2,
  Tag
} from 'lucide-react'

export const LibraryScreen: React.FC = () => {
  const { clips, addToast, selectClip, setScreen } = useStore()
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [filterTag, setFilterTag] = useState<string>('all')

  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((i) => i !== id))
    } else {
      setSelectedIds([...selectedIds, id])
    }
  }

  const selectAll = () => {
    if (selectedIds.length === clips.length) {
      setSelectedIds([])
    } else {
      setSelectedIds(clips.map((c) => c.id))
    }
  }

  const handleBulkExport = () => {
    addToast({
      title: 'Bulk Export Started',
      description: `Packaging ${selectedIds.length} clips into ZIP archive.`,
      type: 'success'
    })
  }

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Finished Clips Library
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            All rendered 9:16 vertical clips across all projects, tagged and ready for multi-platform distribution.
          </p>
        </div>

        {selectedIds.length > 0 && (
          <Button
            variant="primary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={handleBulkExport}
          >
            Export {selectedIds.length} Selected Clips
          </Button>
        )}
      </div>

      {/* Filter / Bulk Bar */}
      <div className="flex items-center justify-between text-xs bg-bg-surface border border-border rounded-card p-3">
        <button
          onClick={selectAll}
          className="flex items-center gap-2 text-text-secondary hover:text-text-primary"
        >
          {selectedIds.length === clips.length ? (
            <CheckSquare className="w-4 h-4 text-accent" />
          ) : (
            <Square className="w-4 h-4 text-text-muted" />
          )}
          <span>Select All ({clips.length} clips)</span>
        </button>

        <span className="text-text-muted font-mono">
          {selectedIds.length} of {clips.length} selected
        </span>
      </div>

      {/* 9:16 Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {clips.map((c) => {
          const isSelected = selectedIds.includes(c.id)
          return (
            <div
              key={c.id}
              className={`group relative bg-bg-surface border rounded-card overflow-hidden transition-all duration-150 flex flex-col ${
                isSelected
                  ? 'border-accent shadow-md ring-1 ring-accent/30'
                  : 'border-border hover:border-[#3F3F46]'
              }`}
            >
              {/* 9:16 Video Canvas Area */}
              <div className="relative aspect-[9/16] bg-black overflow-hidden">
                <img
                  src={c.thumbnailUrl}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 pointer-events-none" />

                {/* Select Checkbox */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleSelect(c.id)
                  }}
                  className="absolute top-2 left-2 p-1 rounded bg-black/60 text-white hover:text-accent z-10 transition-colors"
                >
                  {isSelected ? (
                    <CheckSquare className="w-4 h-4 text-accent" />
                  ) : (
                    <Square className="w-4 h-4 text-white/70" />
                  )}
                </button>

                {/* Score Ring Badge */}
                <div className="absolute top-2 right-2 z-10">
                  <ScoreRing score={c.viralityScore} size="sm" />
                </div>

                {/* Play Button Overlay */}
                <button
                  onClick={() => {
                    selectClip(c.id)
                    setScreen('studio')
                  }}
                  className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/30"
                >
                  <div className="w-10 h-10 rounded-full bg-accent text-[#09090B] flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                  </div>
                </button>

                {/* Duration */}
                <span className="absolute bottom-2 right-2 text-[10px] font-mono font-medium text-white px-1.5 py-0.5 rounded bg-black/80">
                  {Math.round(c.duration)}s
                </span>
              </div>

              {/* Card Meta Info */}
              <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                <h4 className="text-xs font-semibold text-text-primary line-clamp-2 leading-snug">
                  {c.title}
                </h4>

                <div className="flex items-center justify-between pt-1 border-t border-border/60 text-[10px]">
                  <span className="text-text-muted font-mono capitalize">
                    {c.captionStyle}
                  </span>
                  <Badge variant={c.status === 'approved' ? 'success' : 'muted'} size="sm">
                    {c.status}
                  </Badge>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
