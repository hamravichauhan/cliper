import React, { useState, useEffect } from 'react'
import { useStore, ScreenType } from '../../store/useStore'
import {
  Search,
  LayoutDashboard,
  Film,
  PlusCircle,
  FolderKanban,
  Library,
  Palette,
  Calendar,
  Settings,
  Sparkles,
  Check,
  X,
  Download,
  HelpCircle
} from 'lucide-react'

export const CommandPalette: React.FC = () => {
  const {
    cmdKOpen,
    setCmdKOpen,
    setScreen,
    setShortcutsModalOpen,
    selectedClipId,
    setClipStatus,
    bulkExportApproved
  } = useStore()

  const [query, setQuery] = useState('')

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setCmdKOpen(!cmdKOpen)
      } else if (e.key === 'Escape' && cmdKOpen) {
        setCmdKOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [cmdKOpen, setCmdKOpen])

  if (!cmdKOpen) return null

  const navigationItems = [
    { id: 'studio', label: 'Go to Clip Review Studio', icon: <Film className="w-4 h-4 text-accent" />, action: () => setScreen('studio') },
    { id: 'home', label: 'Go to Home / Dashboard', icon: <LayoutDashboard className="w-4 h-4" />, action: () => setScreen('home') },
    { id: 'new-project', label: 'Create New Project', icon: <PlusCircle className="w-4 h-4" />, action: () => setScreen('new-project') },
    { id: 'projects', label: 'View Projects Tracker', icon: <FolderKanban className="w-4 h-4" />, action: () => setScreen('projects') },
    { id: 'library', label: 'Browse Finished Library', icon: <Library className="w-4 h-4" />, action: () => setScreen('library') },
    { id: 'brand-kits', label: 'Manage Brand Kits', icon: <Palette className="w-4 h-4" />, action: () => setScreen('brand-kits') },
    { id: 'schedule', label: 'Open 30-Day Content Schedule', icon: <Calendar className="w-4 h-4" />, action: () => setScreen('schedule') },
    { id: 'settings', label: 'Open Settings & Engine', icon: <Settings className="w-4 h-4" />, action: () => setScreen('settings') },
    { id: 'design-system', label: 'View Design System & Tokens', icon: <Sparkles className="w-4 h-4 text-accent" />, action: () => setScreen('design-system') }
  ]

  const actionItems = [
    {
      id: 'approve',
      label: 'Approve current clip (A)',
      icon: <Check className="w-4 h-4 text-status-success" />,
      action: () => selectedClipId && setClipStatus(selectedClipId, 'approved')
    },
    {
      id: 'reject',
      label: 'Reject current clip (R)',
      icon: <X className="w-4 h-4 text-status-danger" />,
      action: () => selectedClipId && setClipStatus(selectedClipId, 'rejected')
    },
    {
      id: 'export',
      label: 'Export approved clips (E)',
      icon: <Download className="w-4 h-4 text-accent" />,
      action: () => bulkExportApproved()
    },
    {
      id: 'shortcuts',
      label: 'Show keyboard shortcuts (?)',
      icon: <HelpCircle className="w-4 h-4 text-text-muted" />,
      action: () => setShortcutsModalOpen(true)
    }
  ]

  const filteredNav = navigationItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))
  const filteredActions = actionItems.filter((i) => i.label.toLowerCase().includes(query.toLowerCase()))

  const handleSelect = (action: () => void) => {
    action()
    setCmdKOpen(false)
    setQuery('')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 p-4">
      <div
        className="fixed inset-0 bg-[#000000]/70 backdrop-blur-sm"
        onClick={() => setCmdKOpen(false)}
      />

      <div className="relative w-full max-w-xl bg-bg-surface border border-border rounded-card shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-100">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
          <Search className="w-4 h-4 text-text-muted" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or jump to screen..."
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-muted outline-none"
          />
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono text-text-muted bg-[#18181B] border border-border rounded">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2 space-y-4">
          {filteredNav.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                Navigation
              </div>
              <div className="space-y-0.5">
                {filteredNav.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.action)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-control text-left transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredActions.length > 0 && (
            <div>
              <div className="px-2 pb-1 text-[10px] font-semibold text-text-muted uppercase tracking-wider">
                Quick Actions
              </div>
              <div className="space-y-0.5">
                {filteredActions.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleSelect(item.action)}
                    className="w-full flex items-center gap-3 px-3 py-2 text-xs text-text-secondary hover:text-text-primary hover:bg-bg-elevated rounded-control text-left transition-colors"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredNav.length === 0 && filteredActions.length === 0 && (
            <div className="py-8 text-center text-xs text-text-muted">
              No matching commands found.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
