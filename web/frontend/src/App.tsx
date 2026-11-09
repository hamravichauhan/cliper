import React, { useState, useEffect } from 'react'
import { Screen1_Ingest } from './components/Screen1_Ingest'
import { Screen2_Clips } from './components/Screen2_Clips'
import { Screen3_Editor } from './components/Screen3_Editor'
import { Scissors, Sparkles, CheckCircle2 } from 'lucide-react'

export const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'ingest' | 'clips' | 'editor'>('ingest')
  const [jobId, setJobId] = useState<string | null>(null)
  const [job, setJob] = useState<any | null>(null)
  const [selectedClip, setSelectedClip] = useState<any | null>(null)

  // Poll for job status if active
  useEffect(() => {
    if (!jobId) return

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/jobs/${jobId}`)
        if (res.ok) {
          const data = await res.json()
          setJob(data)
          if (data.status === 'completed' && activeScreen === 'ingest') {
            setActiveScreen('clips')
          }
        }
      } catch (err) {
        console.error('Job polling error:', err)
      }
    }, 1500)

    return () => clearInterval(interval)
  }, [jobId, activeScreen])

  const handleJobStarted = (id: string) => {
    setJobId(id)
  }

  const handleEditClip = (clip: any) => {
    setSelectedClip(clip)
    setActiveScreen('editor')
  }

  const handleClipUpdated = (updatedClip: any) => {
    setSelectedClip(updatedClip)
    if (job && job.candidates) {
      const nextCandidates = job.candidates.map((c: any) =>
        c.clip_id === updatedClip.clip_id ? updatedClip : c
      )
      setJob({ ...job, candidates: nextCandidates })
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div
            onClick={() => setActiveScreen('ingest')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <div className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              ClipLocal <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 border border-violet-500/30">M4 Offline</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            {job && (
              <span className="hidden sm:inline-flex items-center gap-1.5 text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg">
                <span className={`w-2 h-2 rounded-full ${job.status === 'completed' ? 'bg-emerald-400' : 'bg-violet-400 animate-pulse'}`} />
                Status: <strong className="text-white capitalize">{job.status}</strong>
              </span>
            )}
            {activeScreen !== 'ingest' && (
              <button
                onClick={() => setActiveScreen('ingest')}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium transition-colors"
              >
                + New Project
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-6">
        {activeScreen === 'ingest' && (
          <Screen1_Ingest
            onJobStarted={handleJobStarted}
            currentJob={job}
          />
        )}

        {activeScreen === 'clips' && (
          <Screen2_Clips
            job={job}
            onEditClip={handleEditClip}
            onNewJob={() => {
              setJobId(null)
              setJob(null)
              setActiveScreen('ingest')
            }}
          />
        )}

        {activeScreen === 'editor' && selectedClip && (
          <Screen3_Editor
            clip={selectedClip}
            jobId={jobId!}
            onBack={() => setActiveScreen('clips')}
            onClipUpdated={handleClipUpdated}
          />
        )}
      </main>

      <footer className="border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        ClipLocal • 100% Offline • Mac mini M4 Optimized • No Cloud APIs
      </footer>
    </div>
  )
}
export default App
