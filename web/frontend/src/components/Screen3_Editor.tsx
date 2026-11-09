import React, { useState } from 'react'
import { ArrowLeft, Play, Scissors, Sparkles, RefreshCw, Check, Undo2 } from 'lucide-react'

interface Props {
  clip: any
  jobId: string
  onBack: () => void
  onClipUpdated: (updatedClip: any) => void
}

export const Screen3_Editor: React.FC<Props> = ({ clip, jobId, onBack, onClipUpdated }) => {
  const [start, setStart] = useState<number>(clip.start)
  const [end, setEnd] = useState<number>(clip.end)
  const [captionStyle, setCaptionStyle] = useState<string>(clip.caption_style || 'hormozi')
  const [reframeMode, setReframeMode] = useState<string>(clip.reframe_mode || 'center')
  const [deletedIndices, setDeletedIndices] = useState<Set<number>>(new Set())
  const [isReRendering, setIsReRendering] = useState<boolean>(false)
  const [videoSrc, setVideoSrc] = useState<string>(
    `/api/media/stream?path=${encodeURIComponent(clip.output_path || '')}`
  )

  const words = clip.words || []

  const toggleWord = (index: number) => {
    const next = new Set(deletedIndices)
    if (next.has(index)) {
      next.delete(index)
    } else {
      next.add(index)
    }
    setDeletedIndices(next)
  }

  const handleReRender = async () => {
    setIsReRendering(true)
    try {
      const res = await fetch('/api/clips/re-render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: jobId,
          clip_id: clip.clip_id,
          start: Number(start),
          end: Number(end),
          deleted_words: Array.from(deletedIndices),
          caption_style: captionStyle,
          reframe_mode: reframeMode
        })
      })

      if (!res.ok) {
        throw new Error('Re-render request failed')
      }

      const data = await res.json()
      onClipUpdated(data.candidate)
      // Force video player refresh with cache buster
      setVideoSrc(`/api/media/stream?path=${encodeURIComponent(data.output_path)}&t=${Date.now()}`)
    } catch (err: any) {
      alert(`Error re-rendering clip: ${err.message}`)
    } finally {
      setIsReRendering(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Ranked Clips
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Editing Clip #{clip.index}</span>
          <span className="px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-400 text-xs font-bold">
            {clip.duration?.toFixed(1)}s
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: 9:16 Video Player Preview */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-[320px] aspect-[9/16] bg-black rounded-2xl overflow-hidden border border-slate-800 shadow-2xl relative">
            <video
              key={videoSrc}
              src={videoSrc}
              controls
              playsInline
              className="w-full h-full object-contain"
            />
            {isReRendering && (
              <div className="absolute inset-0 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                <RefreshCw className="w-8 h-8 text-violet-400 animate-spin" />
                <span className="text-xs font-semibold text-white">Rendering with FFmpeg...</span>
              </div>
            )}
          </div>
        </div>

        {/* Right: Interactive Editor Controls */}
        <div className="lg:col-span-7 space-y-6">
          {/* Time Boundaries with Word Snapping */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Scissors className="w-4 h-4 text-violet-400" /> Boundary Snapping (Seconds)
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-400 block mb-1">Start Time (sec)</label>
                <input
                  type="number"
                  step="0.1"
                  value={start}
                  onChange={(e) => setStart(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 block mb-1">End Time (sec)</label>
                <input
                  type="number"
                  step="0.1"
                  value={end}
                  onChange={(e) => setEnd(Number(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white font-mono"
                />
              </div>
            </div>
            <div className="text-xs text-slate-500">
              New Clip Duration: <span className="text-violet-400 font-bold">{(end - start).toFixed(1)}s</span>
            </div>
          </div>

          {/* Autocut Transcript Editor */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white">Autocut Transcript Trimmer</h3>
                <p className="text-xs text-slate-400">Click words to strike-through and cut those spans out</p>
              </div>
              {deletedIndices.size > 0 && (
                <button
                  onClick={() => setDeletedIndices(new Set())}
                  className="flex items-center gap-1 text-xs text-violet-400 hover:text-violet-300"
                >
                  <Undo2 className="w-3.5 h-3.5" /> Reset ({deletedIndices.size})
                </button>
              )}
            </div>

            <div className="bg-slate-950 border border-slate-800/80 rounded-xl p-4 max-h-56 overflow-y-auto flex flex-wrap gap-1.5 leading-relaxed">
              {words.map((w: any, idx: number) => {
                const isDeleted = deletedIndices.has(idx)
                return (
                  <span
                    key={idx}
                    onClick={() => toggleWord(idx)}
                    title={`${w.start.toFixed(2)}s - ${w.end.toFixed(2)}s`}
                    className={`cursor-pointer px-2 py-0.5 rounded text-xs transition-all select-none ${
                      isDeleted
                        ? 'bg-rose-950/60 text-rose-400 line-through border border-rose-800/50'
                        : 'bg-slate-900 text-slate-200 hover:bg-violet-900/40 hover:text-white border border-slate-800'
                    }`}
                  >
                    {w.word}
                  </span>
                )
              })}
            </div>
          </div>

          {/* Styling & Framing */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">Caption Style</label>
              <select
                value={captionStyle}
                onChange={(e) => setCaptionStyle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="hormozi">🔥 Hormozi Bold</option>
                <option value="minimal">✨ Minimalist</option>
                <option value="boxed">🏷️ Boxed Pill</option>
                <option value="neon">⚡ Neon Glow</option>
              </select>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase">Reframe Mode</label>
              <select
                value={reframeMode}
                onChange={(e) => setReframeMode(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="center">🎯 Center Crop</option>
                <option value="blur_fill">🌫️ Blur-Fill</option>
                <option value="face_follow">👤 Face-Follow</option>
              </select>
            </div>
          </div>

          {/* Re-Render Button */}
          <button
            onClick={handleReRender}
            disabled={isReRendering}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${isReRendering ? 'animate-spin' : ''}`} />
            <span>{isReRendering ? 'Re-Rendering Clip...' : 'Apply Changes & Re-Render Clip'}</span>
          </button>
        </div>
      </div>
    </div>
  )
}
