import React, { useState, useEffect } from 'react'
import { UploadCloud, Link as LinkIcon, Sparkles, Sliders, Play, Terminal, CheckCircle2, AlertCircle, ShieldAlert } from 'lucide-react'

interface Props {
  onJobStarted: (jobId: string) => void
  currentJob: any
}

export const Screen1_Ingest: React.FC<Props> = ({ onJobStarted, currentJob }) => {
  const [sourceType, setSourceType] = useState<'url' | 'file'>('url')
  const [url, setUrl] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [clipsCount, setClipsCount] = useState(5)
  const [minDuration, setMinDuration] = useState(20)
  const [maxDuration, setMaxDuration] = useState(55)
  const [captionStyle, setCaptionStyle] = useState('hormozi')
  const [reframeMode, setReframeMode] = useState('auto')
  const [backend, setBackend] = useState('mlx')
  const [useLLM, setUseLLM] = useState(false)
  const [autoZoom, setAutoZoom] = useState(true)
  const [multicam, setMulticam] = useState(true)
  const [topBanner, setTopBanner] = useState(true)
  const [includeEmojis, setIncludeEmojis] = useState(true)
  const [includeSfx, setIncludeSfx] = useState(true)
  const [bgMusic, setBgMusic] = useState(false)
  const [antiCopyright, setAntiCopyright] = useState(false)
  const [broll, setBroll] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')

  const handleStart = async () => {
    setIsSubmitting(true)
    try {
      let sourcePath = url
      if (sourceType === 'file' && file) {
        setUploadProgress('Uploading video file to local cache...')
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/upload', { method: 'POST', body: formData })
        const data = await res.json()
        sourcePath = data.file_path
      }

      setUploadProgress('Submitting pipeline job...')
      const jobRes = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: sourcePath,
          clips: clipsCount,
          style: captionStyle,
          mode: reframeMode,
          min_duration: minDuration,
          max_duration: maxDuration,
          backend,
          use_llm: useLLM,
          auto_zoom: autoZoom,
          multicam: multicam,
          top_banner: topBanner,
          include_emojis: includeEmojis,
          include_sfx: includeSfx,
          background_music: bgMusic || antiCopyright,
          anti_copyright: antiCopyright,
          broll: broll
        })
      })
      const jobData = await jobRes.json()
      onJobStarted(jobData.job_id)
    } catch (err: any) {
      alert(`Failed to start job: ${err.message}`)
    } finally {
      setIsSubmitting(false)
      setUploadProgress('')
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-6">
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" /> 100% Free & Local Processing
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
          Turn Long Videos Into <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-indigo-400">Viral Shorts</span>
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto">
          Word-level AI transcription, virality scoring, face tracking, simulated multi-cam, top hook banners, and anti-copyright transformative filtering.
        </p>
      </div>

      {/* Input Selector */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6">
        <div className="flex border-b border-slate-800 pb-4 gap-4">
          <button
            onClick={() => setSourceType('url')}
            className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 ${
              sourceType === 'url' ? 'border-violet-500 text-violet-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <LinkIcon className="w-4 h-4" /> YouTube / Web URL
          </button>
          <button
            onClick={() => setSourceType('file')}
            className={`flex items-center gap-2 pb-2 text-sm font-semibold transition-colors border-b-2 ${
              sourceType === 'file' ? 'border-violet-500 text-violet-400' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UploadCloud className="w-4 h-4" /> Local Video Upload
          </button>
        </div>

        {sourceType === 'url' ? (
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
              Video URL (YouTube, Vimeo, etc.)
            </label>
            <input
              type="text"
              placeholder="https://www.youtube.com/watch?v=..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-violet-500 transition-colors"
            />
          </div>
        ) : (
          <div className="border-2 border-dashed border-slate-700 hover:border-violet-500/60 rounded-xl p-8 text-center transition-colors">
            <UploadCloud className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-medium text-slate-300">
              {file ? file.name : 'Select or drag a horizontal video file (.mp4, .mov, .mkv)'}
            </p>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-block mt-3 px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-violet-400 rounded-lg cursor-pointer transition-colors"
            >
              Browse Local File
            </label>
          </div>
        )}

        {/* Configuration Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2 border-t border-slate-800/80">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
              Clips to Generate: <span className="text-violet-400 font-bold">{clipsCount}</span>
            </label>
            <input
              type="range"
              min="1"
              max="12"
              value={clipsCount}
              onChange={(e) => setClipsCount(Number(e.target.value))}
              className="w-full accent-violet-500 cursor-pointer"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">
              Duration: <span className="text-violet-400 font-bold">{minDuration}s – {maxDuration}s</span>
            </label>
            <div className="flex gap-2">
              <input
                type="number"
                min="15"
                max="45"
                value={minDuration}
                onChange={(e) => setMinDuration(Number(e.target.value))}
                className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
              />
              <input
                type="number"
                min="30"
                max="90"
                value={maxDuration}
                onChange={(e) => setMaxDuration(Number(e.target.value))}
                className="w-1/2 bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Caption Style</label>
            <select
              value={captionStyle}
              onChange={(e) => setCaptionStyle(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:border-violet-500"
            >
              <option value="hormozi">🔥 Hormozi Bold (Yellow Pop)</option>
              <option value="cyberpunk">⚡ Cyberpunk (Cyan & Magenta)</option>
              <option value="emerald">💎 Emerald Cash (Mint Green)</option>
              <option value="fire">💥 Fire Drop (Yellow & Red)</option>
              <option value="minimal">✨ Minimalist (Clean Blue)</option>
              <option value="boxed">🏷️ Boxed Pill (High Contrast)</option>
              <option value="neon">🌈 Neon Glow</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">9:16 Reframe Mode</label>
            <select
              value={reframeMode}
              onChange={(e) => setReframeMode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
            >
              <option value="auto">🤖 Auto-Detect (Faces/Screencast)</option>
              <option value="face_follow">👤 Face-Follow (Smooth EMA)</option>
              <option value="blur_fill">🌫️ Blur-Fill (Landscape Inset)</option>
              <option value="center">🎯 Center Crop (Static 9:16)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase mb-2">Whisper Engine</label>
            <select
              value={backend}
              onChange={(e) => setBackend(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-xs text-slate-200"
            >
              <option value="mlx">⚡ Apple MLX Whisper (Metal GPU)</option>
              <option value="faster_whisper">⚙️ Faster-Whisper (CPU / CUDA)</option>
              <option value="whisper_cpp">🔨 Whisper.cpp CLI (Metal)</option>
            </select>
          </div>

          <div className="flex items-center justify-between pt-5">
            <div>
              <span className="text-xs font-semibold text-slate-300 block">Local LLM Re-Ranking</span>
              <span className="text-[10px] text-slate-500">Ollama instruct models</span>
            </div>
            <button
              type="button"
              onClick={() => setUseLLM(!useLLM)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                useLLM ? 'bg-violet-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  useLLM ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Viral & Transformative Protective Enhancements */}
        <div className="border-t border-slate-800/80 pt-4 space-y-3">
          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Viral & Transformative Protective Features
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button
              type="button"
              onClick={() => setAntiCopyright(!antiCopyright)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                antiCopyright
                  ? 'bg-rose-500/20 border-rose-500 text-rose-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <span>🛡️ Anti-Copyright</span>
              <span className="text-[10px]">{antiCopyright ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setMulticam(!multicam)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                multicam
                  ? 'bg-violet-500/15 border-violet-500 text-violet-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span>🎥 Multi-Cam Cut</span>
              <span className="text-[10px]">{multicam ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setTopBanner(!topBanner)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                topBanner
                  ? 'bg-amber-500/15 border-amber-500 text-amber-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span>🏷️ Top Hook Pill</span>
              <span className="text-[10px]">{topBanner ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setBroll(!broll)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                broll
                  ? 'bg-blue-500/15 border-blue-500 text-blue-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span>🖼️ B-Roll Inserts</span>
              <span className="text-[10px]">{broll ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setAutoZoom(!autoZoom)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                autoZoom
                  ? 'bg-violet-500/15 border-violet-500 text-violet-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span>⚡ Auto-Zoom</span>
              <span className="text-[10px]">{autoZoom ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIncludeEmojis(!includeEmojis)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                includeEmojis
                  ? 'bg-fuchsia-500/15 border-fuchsia-500 text-fuchsia-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span>✨ Smart Emojis</span>
              <span className="text-[10px]">{includeEmojis ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setIncludeSfx(!includeSfx)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                includeSfx
                  ? 'bg-cyan-500/15 border-cyan-500 text-cyan-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span>🔊 Pop SFX</span>
              <span className="text-[10px]">{includeSfx ? 'ON' : 'OFF'}</span>
            </button>

            <button
              type="button"
              onClick={() => setBgMusic(!bgMusic)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all ${
                bgMusic || antiCopyright
                  ? 'bg-emerald-500/15 border-emerald-500 text-emerald-300 shadow-sm'
                  : 'bg-slate-950 border-slate-800 text-slate-500'
              }`}
            >
              <span>🎵 Lo-Fi Music</span>
              <span className="text-[10px]">{bgMusic || antiCopyright ? 'ON' : 'OFF'}</span>
            </button>
          </div>
        </div>

        <button
          onClick={handleStart}
          disabled={isSubmitting || (!url && !file)}
          className="w-full py-4 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <span className="animate-pulse">{uploadProgress || 'Processing...'}</span>
          ) : (
            <>
              <Play className="w-5 h-5 fill-current" /> Generate Ranked Clips
            </>
          )}
        </button>
      </div>

      {/* Live Pipeline Monitor */}
      {currentJob && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                <span className="animate-spin text-violet-400">⚙️</span>
                {currentJob.stage}
              </h3>
              <p className="text-xs text-slate-400">Job ID: {currentJob.job_id}</p>
            </div>
            <span className="text-sm font-mono font-bold text-violet-400">{currentJob.progress}%</span>
          </div>

          <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-violet-500 to-fuchsia-500 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${currentJob.progress}%` }}
            />
          </div>

          {/* Terminal Logs */}
          <div className="bg-black/80 rounded-xl p-4 border border-slate-800 font-mono text-xs text-slate-300 max-h-48 overflow-y-auto space-y-1">
            <div className="text-slate-500 flex items-center gap-1">
              <Terminal className="w-3.5 h-3.5" /> Pipeline Live Stream Console:
            </div>
            {currentJob.log_messages && currentJob.log_messages.map((log: string, idx: number) => (
              <div key={idx} className="leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
