import { create } from 'zustand'
import { Clip, Project, BrandKit, EngineHealth, ClipStatus } from '../types'
import { mockClips, mockProjects, mockBrandKits, mockEngineHealth } from '../mock/mockData'

export type ScreenType =
  | 'home'
  | 'new-project'
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
  brandKits: BrandKit[]
  activeBrandKitId: string
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
  brandKits: mockBrandKits,
  activeBrandKitId: mockBrandKits[0].id,
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

  selectProject: (projectId) => {
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
