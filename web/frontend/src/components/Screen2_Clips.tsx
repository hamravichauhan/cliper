import React, { useState } from 'react'
import { Play, Copy, Download, Sliders, Check, Info, Share2, Sparkles, ChevronDown, ChevronUp, Archive, Calendar } from 'lucide-react'

interface Props {
  job: any
  onEditClip: (clip: any) => void
  onNewJob: () => void
}

export const Screen2_Clips: React.FC<Props> = ({ job, onEditClip, onNewJob }) => {
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  const candidates = job?.candidates || []

  const handleCopyIG = (clip: any, index: number) => {
    const hook = clip.title || 'Must Watch'
    const tags = (clip.hashtags && clip.hashtags.length > 0) ? clip.hashtags.join(' ') : '#shorts #reels #viral #growth'
    const text = `${hook.toUpperCase()} 📌\n\n• Key insight from this conversation.\n• Small consistent habits compound into massive results.\n\n💬 Comment 'GROWTH' for our breakdown!\n📌 Save this reel so you don't forget it.\n👉 Follow for daily high-impact clips.\n\n.\n.\n${tags}`
    navigator.clipboard.writeText(text)
    setCopiedIndex(`ig_${index}`)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const handleCopyYT = (clip: any, index: number) => {
    const title = `${clip.title || 'Viral Insight'} 🛑`
    const text = `TITLE: ${title}\n\nDESCRIPTION:\n${clip.caption || clip.text}\n\n💬 What do you think about this? Comment below!\nSubscribe for daily clips.\n\n#shorts #viral #growth`
    navigator.clipboard.writeText(text)
    setCopiedIndex(`yt_${index}`)
    setTimeout(() => setCopiedIndex(null), 2000)
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10'
    if (score >= 60) return 'text-amber-400 border-amber-500/30 bg-amber-500/10'
    return 'text-slate-400 border-slate-700 bg-slate-800/40'
  }

  return (
    <div className="max-w-6xl mx-auto py-6 space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">
            🔥 Ranked Viral Shorts ({candidates.length})
          </h2>
          <p className="text-sm text-slate-400">
            Source: <span className="font-mono text-slate-300">{job?.source_url_or_path}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <a
            href={`/api/jobs/${job?.job_id}/export/bundle`}
            download={`Client_Pack_${job?.job_id}.zip`}
            className="flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all"
            title="Export complete client delivery folder with HTML report, videos, covers, and copy"
          >
            <Archive className="w-3.5 h-3.5" />
            <span>Client Pack (.ZIP)</span>
          </a>

          <a
            href={`/api/jobs/${job?.job_id}/export/schedule`}
            download={`Schedule_${job?.job_id}.csv`}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-emerald-400 text-xs font-semibold rounded-xl border border-slate-700 transition-colors"
            title="Download 30-day bulk scheduling CSV for Meta Business Suite & Buffer"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>30-Day CSV</span>
          </a>

          <button
            onClick={onNewJob}
            className="px-3 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800 transition-colors"
          >
            New Video
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((clip: any, idx: number) => {
          const streamUrl = `/api/media/stream?path=${encodeURIComponent(clip.output_path || '')}`
          const isExpanded = expandedIndex === idx

          return (
            <div
              key={clip.clip_id || idx}
              className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl overflow-hidden shadow-xl flex flex-col transition-all"
            >
              {/* 9:16 Video Preview Header */}
              <div className="relative aspect-[9/16] bg-black max-h-[460px] flex items-center justify-center overflow-hidden">
                <video
                  src={streamUrl}
                  controls
                  playsInline
                  className="w-full h-full object-contain"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-xs font-bold text-white border border-white/10">
                    #{clip.index || idx + 1}
                  </span>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getScoreColor(clip.score?.total_score || 0)}`}>
                    Score: {clip.score?.total_score?.toFixed(1)}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded-md bg-black/60 text-[10px] font-mono text-slate-300">
                    {clip.duration?.toFixed(1)}s
                  </span>
                </div>
              </div>

              {/* Clip Details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-bold text-sm text-white line-clamp-2">
                      {clip.title || clip.score?.hook_type || 'Engaging Short'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 line-clamp-2">
                    {clip.caption || clip.text}
                  </p>
                  <div className="text-[11px] text-violet-400 font-medium">
                    🎯 Hook: {clip.score?.hook_type}
                  </div>
                </div>

                {/* Score Breakdown Accordion */}
                <div className="border-t border-slate-800/80 pt-3">
                  <button
                    onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                    className="w-full flex justify-between items-center text-xs text-slate-400 hover:text-slate-200 transition-colors"
                  >
                    <span>Virality Breakdown</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>

                  {isExpanded && clip.score && (
                    <div className="mt-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Hook Impact:</span>
                        <span className="text-emerald-400">{clip.score.hook_score?.toFixed(1)}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Acoustic Energy:</span>
                        <span className="text-cyan-400">{clip.score.acoustic_score?.toFixed(1)}/100</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Pace (WPM):</span>
                        <span className="text-amber-400">{clip.score.words_per_minute?.toFixed(0)} WPM ({clip.score.pace_score?.toFixed(0)}pts)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Payoff & Resolution:</span>
                        <span className="text-violet-400">{clip.score.payoff_score?.toFixed(1)}/100</span>
                      </div>
                      {clip.score.penalties !== 0 && (
                        <div className="flex justify-between text-rose-400">
                          <span>Penalties:</span>
                          <span>{clip.score.penalties}</span>
                        </div>
                      )}
                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
                        {clip.score.hook_reason}
                      </div>
                    </div>
                  )}
                </div>

                {/* Viral Thumbnails / Covers */}
                {clip.thumbnails && clip.thumbnails.length > 0 && (
                  <div className="border-t border-slate-800/80 pt-3">
                    <div className="text-[11px] font-semibold text-slate-400 mb-2 flex items-center justify-between">
                      <span>📸 Viral Cover Cards ({clip.thumbnails.length})</span>
                    </div>
                    <div className="flex gap-2">
                      {clip.thumbnails.map((thumbPath: string, tIdx: number) => {
                        const thumbUrl = `/api/media/stream?path=${encodeURIComponent(thumbPath)}`
                        return (
                          <a
                            key={tIdx}
                            href={thumbUrl}
                            target="_blank"
                            rel="noreferrer"
                            download={`clip_${clip.index || idx + 1}_cover_${tIdx + 1}.jpg`}
                            className="group relative w-1/3 aspect-[9/16] rounded-lg overflow-hidden border border-slate-800 hover:border-violet-500 transition-colors block bg-black"
                            title={`Download Cover #${tIdx + 1}`}
                          >
                            <img src={thumbUrl} alt="Cover Thumbnail" className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                              <Download className="w-4 h-4 text-white" />
                            </div>
                            <span className="absolute bottom-1 right-1 px-1 bg-black/80 rounded text-[9px] font-mono text-white">
                              #{tIdx + 1}
                            </span>
                          </a>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleCopyIG(clip, idx)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-pink-950/40 hover:bg-pink-900/50 text-pink-300 text-[11px] font-semibold border border-pink-800/40 transition-colors"
                      title="Copy Instagram Caption & 15 Tiered Hashtags"
                    >
                      {copiedIndex === `ig_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIndex === `ig_${idx}` ? 'Copied IG' : 'Copy IG Copy'}</span>
                    </button>

                    <button
                      onClick={() => handleCopyYT(clip, idx)}
                      className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-red-950/40 hover:bg-red-900/50 text-red-300 text-[11px] font-semibold border border-red-800/40 transition-colors"
                      title="Copy YouTube Shorts Title & SEO Description"
                    >
                      {copiedIndex === `yt_${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIndex === `yt_${idx}` ? 'Copied YT' : 'Copy YT Copy'}</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onEditClip(clip)}
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-violet-600/20 hover:bg-violet-600/30 text-violet-300 text-xs font-semibold border border-violet-500/30 transition-colors"
                    >
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <a
                      href={streamUrl}
                      download={`clip_${clip.index || idx + 1}.mp4`}
                      className="flex items-center justify-center gap-1 py-2 px-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save MP4</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
