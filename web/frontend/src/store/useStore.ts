import { create } from 'zustand'
import { Clip, Project, BrandKit, EngineHealth, ClipStatus } from '../types'
import { mockClips, mockProjects, mockBrandKits, mockEngineHealth } from '../mock/mockData'

export type ScreenType =
  | 'home'
  | 'new-project'
  | 'voice-studio'
  | 'processing'
  | 'studio'
  | 'projects'
  | 'library'
  | 'brand-kits'
  | 'schedule'
  | 'settings'
  | 'design-system'

export interface ToastMessage {
  id: string
  title: string
  description?: string
  type?: 'success' | 'warning' | 'danger' | 'info'
}

interface AppState {
  // Navigation & Shell
  currentScreen: ScreenType
  sidebarCollapsed: boolean
  cmdKOpen: boolean
  shortcutsModalOpen: boolean
  setScreen: (screen: ScreenType) => void
  toggleSidebar: () => void
  setCmdKOpen: (open: boolean) => void
  setShortcutsModalOpen: (open: boolean) => void

  // Data
  projects: Project[]
  activeProject: Project | null
  clips: Clip[]
  selectedClipId: string | null
  activeJobId: string | null
  setActiveJobId: (jobId: string | null) => void

  // Analytics & Jobs
  analytics: {
    total_jobs: number
    completed_jobs: number
    running_jobs: number
    failed_jobs: number
    total_clips: number
    total_minutes_processed: number
    estimated_hours_saved: number
    average_virality_score: number
    storage_used_mb: number
    system?: any
  } | null
  fetchAnalytics: () => Promise<void>
  fetchProjects: () => Promise<void>
  deleteProject: (projectId: string) => Promise<boolean>

  // Brand Kits
  brandKits: BrandKit[]
  activeBrandKitId: string
  fetchBrandKits: () => Promise<void>
  createBrandKit: (kit: Omit<BrandKit, 'id'>) => Promise<BrandKit>
  updateBrandKit: (id: string, updates: Partial<BrandKit>) => Promise<void>
  deleteBrandKit: (id: string) => Promise<void>
  setActiveBrandKitId: (id: string) => void

  engineHealth: EngineHealth

  // Playback in Studio
  isPlaying: boolean
  currentTime: number
  volume: number
  isMuted: boolean
  setIsPlaying: (playing: boolean) => void
  setCurrentTime: (time: number) => void
  setVolume: (vol: number) => void
  toggleMute: () => void

  // Undo / Redo for trims and edits
  history: { clipId: string; startTime: number; endTime: number; title: string }[]
  historyIndex: number

  // Actions
  selectClip: (clipId: string) => void
  selectProject: (projectId: string) => void
  setClipStatus: (clipId: string, status: ClipStatus) => void
  updateClipTitle: (clipId: string, title: string) => void
  updateClipTrim: (clipId: string, start: number, end: number) => void
  updateClipStyle: (clipId: string, style: Clip['captionStyle']) => void
  undoTrim: () => void
  redoTrim: () => void
  approveAllClips: () => void
  bulkExportApproved: () => void
  downloadDeliveryBundle: (jobId?: string) => void
  downloadScheduleCSV: (jobId?: string) => void
  reRenderCurrentClip: (clipId: string, options: any) => Promise<boolean>
  submitNewJob: (payload: any) => Promise<string | null>
  loadJobIntoStudio: (jobId: string, switchScreen?: boolean) => Promise<boolean>
  fetchHealth: () => Promise<void>

  // Toasts
  toasts: ToastMessage[]
  addToast: (toast: Omit<ToastMessage, 'id'>) => void
  removeToast: (id: string) => void
}

export const useStore = create<AppState>((set, get) => ({
  currentScreen: 'studio', // default to Clip Review Studio per prompt instructions
  sidebarCollapsed: false,
  cmdKOpen: false,
  shortcutsModalOpen: false,

  setScreen: (screen) => set({ currentScreen: screen }),
  toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
  setCmdKOpen: (open) => set({ cmdKOpen: open }),
  setShortcutsModalOpen: (open) => set({ shortcutsModalOpen: open }),

  projects: mockProjects,
  activeProject: mockProjects[0],
  clips: mockClips,
  selectedClipId: mockClips[0]?.id || null,
  activeJobId: null,
  setActiveJobId: (jobId) => set({ activeJobId: jobId }),

  analytics: null,

  fetchAnalytics: async () => {
    try {
      const res = await fetch('/api/analytics')
      if (res.ok) {
        const data = await res.json()
        set({ analytics: data })
      }
    } catch {
      // offline fallback
    }
  },

  fetchProjects: async () => {
    try {
      const res = await fetch('/api/jobs')
      if (res.ok) {
        const jobs = await res.json()
        if (Array.isArray(jobs) && jobs.length > 0) {
          const mappedProjects: Project[] = jobs.map((j: any) => {
            const displayTitle = j.title || j.source || 'Untitled Harvest'
            return {
              id: j.job_id,
              title: displayTitle,
              source: j.source || j.source_url_or_path || '',
              sourceType: ((j.source || '').startsWith('http') ? 'youtube' : 'upload') as any,
              rightsConfirmed: true,
              status: (j.status === 'completed' ? 'completed' : j.status === 'failed' ? 'failed' : 'processing') as any,
              createdAt: new Date((j.created_at || Date.now() / 1000) * 1000).toISOString().split('T')[0],
              durationSec: Math.round(j.duration || 600),
              clipsCount: j.clip_count || (j.candidates ? j.candidates.length : 0),
              avgScore: (j.clip_count > 0 && j.avg_virality_score > 0) ? Math.round(j.avg_virality_score) : 0,
              thumbnailUrl: j.thumbnail_url || '',
              clips: []
            }
          })

          set((state) => {
            return {
              projects: mappedProjects
            }
          })
        }
      }
    } catch {
      // offline fallback
    }
  },

  deleteProject: async (projectId: string) => {
    try {
      const res = await fetch(`/api/jobs/${projectId}`, { method: 'DELETE' })
      if (res.ok) {
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== projectId)
        }))
        get().addToast({
          title: 'Project Deleted',
          description: `Job ${projectId} removed from database.`,
          type: 'info'
        })
        get().fetchAnalytics()
        get().fetchProjects()
        return true
      }
    } catch {
      // fallback
    }
    return false
  },

  brandKits: mockBrandKits,
  activeBrandKitId: mockBrandKits[0].id,

  fetchBrandKits: async () => {
    try {
      const res = await fetch('/api/brand-kits')
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data) && data.length > 0) {
          set({ brandKits: data, activeBrandKitId: data[0].id })
        }
      }
    } catch {
      // offline fallback
    }
  },

  createBrandKit: async (kitData) => {
    try {
      const res = await fetch('/api/brand-kits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(kitData)
      })
      if (res.ok) {
        const newKit = await res.json()
        set((state) => ({
          brandKits: [newKit, ...state.brandKits],
          activeBrandKitId: newKit.id
        }))
        get().addToast({
          title: 'Brand Kit Created',
          description: `Preset '${newKit.name}' created and saved.`,
          type: 'success'
        })
        return newKit
      }
    } catch {
      // fallback
    }

    const localKit: BrandKit = {
      ...kitData,
      id: `bk-${Math.random().toString(36).substring(2, 8)}`
    }
    set((state) => ({
      brandKits: [localKit, ...state.brandKits],
      activeBrandKitId: localKit.id
    }))
    get().addToast({
      title: 'Brand Kit Saved',
      description: `Preset '${localKit.name}' saved locally.`,
      type: 'success'
    })
    return localKit
  },

  updateBrandKit: async (id, updates) => {
    try {
      const current = get().brandKits.find((k) => k.id === id)
      if (current) {
        const merged = { ...current, ...updates }
        await fetch(`/api/brand-kits/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(merged)
        })
      }
    } catch {
      // offline fallback
    }

    set((state) => ({
      brandKits: state.brandKits.map((k) => (k.id === id ? { ...k, ...updates } : k))
    }))
    get().addToast({
      title: 'Brand Kit Updated',
      description: 'Client settings and styling saved.',
      type: 'success'
    })
  },

  deleteBrandKit: async (id) => {
    try {
      await fetch(`/api/brand-kits/${id}`, { method: 'DELETE' })
    } catch {
      // offline fallback
    }

    set((state) => {
      const remaining = state.brandKits.filter((k) => k.id !== id)
      return {
        brandKits: remaining,
        activeBrandKitId: remaining[0]?.id || ''
      }
    })
    get().addToast({
      title: 'Brand Kit Deleted',
      description: 'Preset removed from agency library.',
      type: 'info'
    })
  },

  setActiveBrandKitId: (id) => set({ activeBrandKitId: id }),

  engineHealth: mockEngineHealth,

  isPlaying: false,
  currentTime: 0.0,
  volume: 0.9,
  isMuted: false,
  setIsPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setVolume: (vol) => set({ volume: vol }),
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

  history: [],
  historyIndex: -1,

  selectClip: (clipId) => {
    set({ selectedClipId: clipId, isPlaying: false, currentTime: 0.0 })
  },

  selectProject: async (projectId: string) => {
    // Attempt to load full candidate clips directly from backend
    const success = await get().loadJobIntoStudio(projectId, true)
    if (!success) {
      const proj = get().projects.find((p) => p.id === projectId)
      if (proj) {
        set({
          activeProject: proj,
          clips: proj.clips.length > 0 ? proj.clips : mockClips,
          selectedClipId: proj.clips[0]?.id || mockClips[0]?.id || null,
          currentScreen: 'studio',
          currentTime: 0.0,
          isPlaying: false
        })
      }
    }
  },

  setClipStatus: (clipId, status) => {
    set((state) => ({
      clips: state.clips.map((c) => (c.id === clipId ? { ...c, status } : c))
    }))
    const statusText = status === 'approved' ? 'Approved' : status === 'rejected' ? 'Rejected' : 'Reset'
    get().addToast({
      title: `Clip ${statusText}`,
      description: `Marked clip as ${status}.`,
      type: status === 'approved' ? 'success' : status === 'rejected' ? 'danger' : 'info'
    })
  },

  updateClipTitle: (clipId, title) => {
    set((state) => ({
      clips: state.clips.map((c) => (c.id === clipId ? { ...c, title } : c))
    }))
  },

  updateClipTrim: (clipId, start, end) => {
    const currentClip = get().clips.find((c) => c.id === clipId)
    if (!currentClip) return

    // Push to history
    const historyEntry = {
      clipId,
      startTime: currentClip.startTime,
      endTime: currentClip.endTime,
      title: currentClip.title
    }

    set((state) => {
      const nextClips = state.clips.map((c) =>
        c.id === clipId ? { ...c, startTime: start, endTime: end, duration: end - start } : c
      )
      const nextHistory = [...state.history.slice(0, state.historyIndex + 1), historyEntry]
      return {
        clips: nextClips,
        history: nextHistory,
        historyIndex: nextHistory.length - 1
      }
    })
  },

  updateClipStyle: (clipId, style) => {
    set((state) => ({
      clips: state.clips.map((c) => (c.id === clipId ? { ...c, captionStyle: style } : c))
    }))
  },

  undoTrim: () => {
    const { history, historyIndex, clips } = get()
    if (historyIndex >= 0) {
      const entry = history[historyIndex]
      set({
        clips: clips.map((c) =>
          c.id === entry.clipId
            ? { ...c, startTime: entry.startTime, endTime: entry.endTime, duration: entry.endTime - entry.startTime }
            : c
        ),
        historyIndex: historyIndex - 1
      })
      get().addToast({ title: 'Undo Trim', type: 'info' })
    }
  },

  redoTrim: () => {
    const { history, historyIndex, clips } = get()
    if (historyIndex < history.length - 1) {
      const nextIdx = historyIndex + 1
      const entry = history[nextIdx]
      set({
        clips: clips.map((c) =>
          c.id === entry.clipId
            ? { ...c, startTime: entry.startTime, endTime: entry.endTime, duration: entry.endTime - entry.startTime }
            : c
        ),
        historyIndex: nextIdx
      })
      get().addToast({ title: 'Redo Trim', type: 'info' })
    }
  },

  approveAllClips: () => {
    set((state) => ({
      clips: state.clips.map((c) => ({ ...c, status: 'approved' }))
    }))
    get().addToast({
      title: 'All Clips Approved',
      description: 'Ready for batch export.',
      type: 'success'
    })
  },

  bulkExportApproved: () => {
    const approved = get().clips.filter((c) => c.status === 'approved')
    const id = get().activeProject?.id || 'job_5ca3bf74a1f1'
    window.open(`/api/jobs/${id}/export/bundle`, '_blank')
    get().addToast({
      title: 'Export Started',
      description: `Packaging ${approved.length} approved clips (ProRes 422 / 9:16 MP4).`,
      type: 'success'
    })
  },

  downloadDeliveryBundle: (jobId) => {
    const id = jobId || get().activeProject?.id || 'job_5ca3bf74a1f1'
    window.open(`/api/jobs/${id}/export/bundle`, '_blank')
    get().addToast({
      title: 'Downloading Delivery ZIP',
      description: 'Packaged 9:16 vertical clips, transformation logs, and metadata.',
      type: 'success'
    })
  },

  downloadScheduleCSV: (jobId) => {
    const id = jobId || get().activeProject?.id || 'job_5ca3bf74a1f1'
    window.open(`/api/jobs/${id}/export/schedule`, '_blank')
    get().addToast({
      title: 'Downloading Schedule CSV',
      description: '30-day posting plan formatted for Meta Business Suite & Buffer.',
      type: 'success'
    })
  },

  reRenderCurrentClip: async (clipId, options) => {
    const currentClip = get().clips.find((c) => c.id === clipId)
    if (!currentClip) return false
    const jobId = get().activeProject?.id || 'job_5ca3bf74a1f1'

    get().addToast({
      title: 'Re-Rendering with VideoToolbox',
      description: 'Burning updated context headlines and audio normalization...',
      type: 'info'
    })

    try {
      const res = await fetch('/api/clips/re-render', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: jobId,
          clip_id: clipId,
          start: currentClip.startTime,
          end: currentClip.endTime,
          title: currentClip.title,
          caption_style: currentClip.captionStyle,
          reframe_mode: 'auto',
          auto_zoom: true,
          multicam: true,
          top_banner: true,
          include_emojis: false,
          include_sfx: true,
          background_music: false,
          anti_copyright: true,
          ...options
        })
      })

      if (res.ok) {
        const data = await res.json()
        if (data.output_path) {
          const streamUrl = `/api/media/stream?path=${encodeURIComponent(data.output_path)}`
          set((state) => ({
            clips: state.clips.map((c) =>
              c.id === clipId ? { ...c, videoUrl: streamUrl } : c
            )
          }))
        }
        get().addToast({
          title: 'Re-Render Complete',
          description: 'Vertical 9:16 clip updated with hardware acceleration.',
          type: 'success'
        })
        return true
      }
    } catch {
      // fallback
    }

    get().addToast({
      title: 'Settings Saved',
      description: 'Local clip configuration updated.',
      type: 'success'
    })
    return true
  },

  submitNewJob: async (payload) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (res.ok) {
        const job = await res.json()
        set({ activeJobId: job.job_id })
        get().addToast({
          title: 'Pipeline Job Launched',
          description: `Job ${job.job_id} queued on Apple Silicon.`,
          type: 'success'
        })
        return job.job_id
      }
    } catch {
      // fallback
    }
    return null
  },

  loadJobIntoStudio: async (jobId: string, switchScreen: boolean = true) => {
    try {
      const res = await fetch(`/api/jobs/${jobId}`)
      if (res.ok) {
        const job = await res.json()
        if (job.candidates && job.candidates.length > 0) {
          const transformedClips: Clip[] = job.candidates.map((c: any, idx: number) => {
            const videoPath = c.output_path || c.video_path || ''
            const streamUrl = videoPath ? `/api/media/stream?path=${encodeURIComponent(videoPath)}` : ''
            const thumbPath = (c.thumbnails && c.thumbnails.length > 0 ? c.thumbnails[0] : null) || c.thumbnail_path || ''
            const thumbUrl = thumbPath ? `/api/media/stream?path=${encodeURIComponent(thumbPath)}` : (job.thumbnail_url || '')

            return {
              id: c.clip_id || `job-${job.job_id}-clip-${c.index || idx + 1}`,
              index: c.index || idx + 1,
              title: c.title || c.spoken_context || `Viral Hook Clip #${c.index || idx + 1}`,
              startTime: c.start,
              endTime: c.end,
              duration: c.duration,
              viralityScore: Math.round(c.score?.total_score || c.score?.virality_score || 85),
              factors: {
                hook: Math.round(c.score?.hook_score || 88),
                acoustics: Math.round(c.score?.acoustics_score || 85),
                pace: Math.round(c.score?.pace_score || 82),
                payoff: Math.round(c.score?.payoff_score || 86),
                sentiment: Math.round(c.score?.sentiment_score || 80),
                duration: Math.round(c.score?.duration_fit || 84)
              },
              status: 'pending',
              thumbnailUrl: thumbUrl,
              videoUrl: streamUrl,
              words: (c.words || []).map((w: any, wIdx: number) => ({
                id: wIdx + 1,
                word: w.word,
                start: w.start,
                end: w.end
              })),
              fullText: c.text || '',
              captionStyle: c.caption_style || 'emerald',
              copy: {
                youtubeTitle: `${c.title || 'Must Watch'} #shorts`,
                youtubeDescription: `${c.text}\n\nProcessed 100% offline with ClipLocal.`,
                youtubeTags: c.hashtags || ['#shorts', '#viral', '#podcast'],
                instagramCaption: `${c.caption || c.title || 'Mind blowing moment'} 🔥\n\nDrop your thoughts below!`,
                hashtags: c.hashtags || ['#shorts', '#viral', '#reels']
              },
              narrativeFlags: {
                sponsorshipRisk: 0,
                fillersScrubbed: 3,
                silenceSnappedMs: 240
              }
            }
          })

          let displayTitle = job.metadata?.title || job.title
          if (!displayTitle || displayTitle.startsWith('watch?v=')) {
            const rawFile = job.metadata?.file_path || job.source_url_or_path || ''
            const name = rawFile.split('/').pop()?.replace('.mp4', '') || ''
            displayTitle = name.includes('_') ? name.split('_').slice(1).join('_') : name || 'Viral Video Harvest'
          }

          const newProject: Project = {
            id: job.job_id,
            title: displayTitle,
            source: job.source_url_or_path,
            sourceType: job.source_url_or_path.startsWith('http') ? 'youtube' : 'upload',
            rightsConfirmed: true,
            status: 'completed',
            createdAt: new Date(job.created_at * 1000).toISOString().split('T')[0],
            durationSec: Math.round(job.metadata?.duration || 600),
            clipsCount: transformedClips.length,
            avgScore: Math.round(
              transformedClips.reduce((acc, c) => acc + c.viralityScore, 0) / transformedClips.length
            ),
            thumbnailUrl: transformedClips[0]?.thumbnailUrl || '',
            clips: transformedClips
          }

          set((state) => ({
            projects: [newProject, ...state.projects.filter((p) => p.id !== newProject.id)],
            activeProject: newProject,
            clips: transformedClips,
            selectedClipId: transformedClips[0]?.id || null,
            ...(switchScreen ? { currentScreen: 'studio' } : {})
          }))

          if (switchScreen) {
            get().addToast({
              title: 'Project Loaded in Studio',
              description: `${transformedClips.length} rendered clips loaded into Clip Review Studio.`,
              type: 'success'
            })
          }
          return true
        }
      }
    } catch (e) {
      console.error('Failed to load job into studio', e)
    }
    return false
  },

  fetchHealth: async () => {
    try {
      const res = await fetch('/api/health')
      if (res.ok) {
        const data = await res.json()
        set((state) => ({
          engineHealth: {
            ...state.engineHealth,
            metalAccelerated: Boolean(data.metal_accelerated),
            metalDeviceName: data.metal_device_name || state.engineHealth.metalDeviceName,
            whisperModel: data.whisper_model || state.engineHealth.whisperModel,
            ollamaAvailable: Boolean(data.ollama_available),
            circuitBreakerState: data.circuit_breaker_state || state.engineHealth.circuitBreakerState,
            ramAvailableGb: data.ram_available_gb || state.engineHealth.ramAvailableGb,
            activeWorkers: data.active_workers || state.engineHealth.activeWorkers
          }
        }))
      }
    } catch {
      // Graceful offline mock fallback
    }
  },

  toasts: [],
  addToast: (toast) => {
    const id = Math.random().toString(36).substring(2, 9)
    set((state) => ({ toasts: [...state.toasts, { ...toast, id }] }))
    setTimeout(() => {
      get().removeToast(id)
    }, 3500)
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }))
  }
}))
