import React, { useState, useEffect } from 'react'
import { Screen1_Ingest } from './components/Screen1_Ingest'
import { Screen2_Clips } from './components/Screen2_Clips'
import { Screen3_Editor } from './components/Screen3_Editor'
import { Dashboard } from './components/Dashboard'
import { Scissors, Activity, PlusCircle, CheckCircle2 } from 'lucide-react'

export const App: React.FC = () => {
  const [activeScreen, setActiveScreen] = useState<'dashboard' | 'ingest' | 'clips' | 'editor'>('dashboard')
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

  const handleSelectJob = async (id: string) => {
    try {
      const res = await fetch(`/api/jobs/${id}`)
      if (res.ok) {
        const data = await res.json()
        setJobId(id)
        setJob(data)
        if (data.status === 'completed' && data.candidates && data.candidates.length > 0) {
          setActiveScreen('clips')
        } else {
          setActiveScreen('ingest')
        }
      }
    } catch (err) {
      console.error('Failed to load selected job:', err)
    }
  }

  const handleNewJob = () => {
    setJobId(null)
    setJob(null)
    setSelectedClip(null)
    setActiveScreen('ingest')
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

  const isStudioActive = activeScreen === 'ingest' || activeScreen === 'clips' || activeScreen === 'editor'

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F17] text-slate-100">
      {/* Top Navigation Bar */}
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-3.5">
        <div className="max-w-7xl mx-auto flex justify-between items-center gap-4">
          {/* Logo & Brand */}
          <div
            onClick={() => setActiveScreen('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform">
              <Scissors className="w-4 h-4 text-white" />
            </div>
            <div className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              ClipLocal <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-violet-500/20 text-violet-400 border border-violet-500/30">M4 Studio</span>
            </div>
          </div>

          {/* Center Navigation Tabs */}
          <nav className="flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setActiveScreen('dashboard')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeScreen === 'dashboard'
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => {
                if (job && job.status === 'completed' && job.candidates?.length > 0) {
                  setActiveScreen('clips')
                } else {
                  setActiveScreen('ingest')
                }
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                isStudioActive
                  ? 'bg-violet-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Scissors className="w-3.5 h-3.5" />
              <span>Studio {job && job.candidates?.length > 0 ? `(${job.candidates.length})` : ''}</span>
            </button>
          </nav>

          {/* Right Header Status & Action */}
          <div className="flex items-center gap-3 text-xs">
            {job && (
              <span
                onClick={() => {
                  if (job.status === 'completed') setActiveScreen('clips')
                  else setActiveScreen('ingest')
                }}
                className="hidden sm:inline-flex items-center gap-2 text-slate-400 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-lg cursor-pointer hover:border-slate-700 transition-colors"
                title="Click to view live job"
              >
                <span className={`w-2 h-2 rounded-full ${job.status === 'completed' ? 'bg-emerald-400' : 'bg-amber-400 animate-pulse'}`} />
                <span className="capitalize text-slate-300 font-medium">{job.status}</span>
                {job.progress > 0 && job.progress < 100 && (
                  <span className="font-mono text-violet-400 font-bold">{job.progress}%</span>
                )}
              </span>
            )}

            <button
              onClick={handleNewJob}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-medium border border-slate-700 transition-colors"
            >
              <PlusCircle className="w-3.5 h-3.5 text-violet-400" />
              <span>New Job</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-6">
        {activeScreen === 'dashboard' && (
          <Dashboard
            onSelectJob={handleSelectJob}
            onNewJob={handleNewJob}
          />
        )}

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
            onNewJob={handleNewJob}
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
        ClipLocal • 100% Offline • Mac mini M4 Optimized • Zero Cloud Subscriptions • Production Ready
      </footer>
    </div>
  )
}
export default App
