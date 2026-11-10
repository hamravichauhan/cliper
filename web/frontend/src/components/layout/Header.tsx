import React from 'react'
import { useStore } from '../../store/useStore'
import { Button } from '../ui/Button'
import {
  Search,
  Command,
  HelpCircle,
  Download,
  PlusCircle,
  Sparkles
} from 'lucide-react'

export const Header: React.FC = () => {
  const {
    currentScreen,
    setScreen,
    setCmdKOpen,
    setShortcutsModalOpen,
    activeProject,
    clips,
    bulkExportApproved
  } = useStore()

  const approvedCount = clips.filter((c) => c.status === 'approved').length

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return 'Dashboard'
      case 'new-project':
        return 'New Project'
      case 'processing':
        return 'Processing Video'
      case 'studio':
        return 'Clip Review Studio'
      case 'projects':
        return 'Projects Tracker'
      case 'library':
        return 'Finished Clips Library'
      case 'brand-kits':
        return 'Brand Kits'
      case 'schedule':
        return '30-Day Content Schedule'
      case 'settings':
        return 'Engine & Storage Settings'
      case 'design-system':
        return 'Design System & Tokens'
      default:
        return 'ClipLocal'
    }
  }

  return (
    <header className="h-14 border-b border-border bg-bg-surface px-6 flex items-center justify-between gap-4 select-none">
      {/* Left: Screen title & active project badge */}
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-semibold text-text-primary tracking-tight">
          {getScreenTitle()}
        </h1>

        {activeProject && currentScreen === 'studio' && (
          <div className="hidden sm:flex items-center gap-2 pl-3 border-l border-border text-xs text-text-secondary truncate max-w-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-accent" />
            <span className="truncate font-medium">{activeProject.title}</span>
          </div>
        )}
      </div>

      {/* Right: Cmd+K Search bar, Shortcuts Help, and Primary Action */}
      <div className="flex items-center gap-2.5">
        {/* Command Palette Button */}
        <button
          onClick={() => setCmdKOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 bg-[#18181B] hover:bg-[#202024] border border-border rounded-control text-xs text-text-muted hover:text-text-primary transition-colors"
        >
          <Search className="w-3.5 h-3.5" />
          <span className="hidden md:inline">Search or command</span>
          <kbd className="hidden md:inline-flex items-center gap-0.5 text-[10px] font-mono text-text-muted bg-[#111113] border border-border px-1.5 py-0.2 rounded">
            <Command className="w-2.5 h-2.5" /> K
          </kbd>
        </button>

        {/* Keyboard Shortcuts (?) */}
        <button
          onClick={() => setShortcutsModalOpen(true)}
          className="p-1.5 text-text-muted hover:text-text-primary hover:bg-[#18181B] border border-transparent hover:border-border rounded-control transition-colors"
          title="Keyboard shortcuts (?)"
        >
          <HelpCircle className="w-4 h-4" />
        </button>

        {/* Action based on screen */}
        {currentScreen === 'studio' ? (
          <Button
            variant="primary"
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            onClick={bulkExportApproved}
            disabled={approvedCount === 0}
          >
            Export {approvedCount > 0 ? `${approvedCount} Approved` : 'Clips'}
          </Button>
        ) : (
          <Button
            variant="primary"
            size="sm"
            icon={<PlusCircle className="w-3.5 h-3.5" />}
            onClick={() => setScreen('new-project')}
          >
            New Project
          </Button>
        )}
      </div>
    </header>
  )
}
