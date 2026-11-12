import React from 'react'
import { useStore, ScreenType } from '../../store/useStore'
import { Tooltip } from '../ui/Tooltip'
import {
  LayoutDashboard,
  PlusCircle,
  FolderKanban,
  Library,
  Palette,
  Calendar,
  Settings,
  Scissors,
  Mic,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Cpu,
  Zap,
  Bot
} from 'lucide-react'

export const Sidebar: React.FC = () => {
  const {
    currentScreen,
    setScreen,
    sidebarCollapsed,
    toggleSidebar,
    engineHealth,
    clips
  } = useStore()

  const navItems: { id: ScreenType; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'home', label: 'Home', icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'new-project', label: 'New Project', icon: <PlusCircle className="w-4 h-4 text-accent" /> },
    { id: 'voice-studio', label: 'AI Voice Studio', icon: <Mic className="w-4 h-4 text-accent" />, badge: 'Indian Flow' },
    { id: 'studio', label: 'Clip Review Studio', icon: <Scissors className="w-4 h-4 text-accent" />, badge: clips.length > 0 ? String(clips.length) : undefined },
    { id: 'projects', label: 'Projects', icon: <FolderKanban className="w-4 h-4" /> },
    { id: 'library', label: 'Library', icon: <Library className="w-4 h-4" /> },
    { id: 'brand-kits', label: 'Brand Kits', icon: <Palette className="w-4 h-4" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> },
    { id: 'design-system', label: 'Design System', icon: <Sparkles className="w-4 h-4 text-accent" />, badge: 'Tokens' }
  ]

  return (
    <aside
      className={`relative flex flex-col justify-between bg-bg-surface border-r border-border transition-all duration-200 select-none shrink-0 ${
        sidebarCollapsed ? 'w-16' : 'w-60'
      }`}
    >
      {/* Top Header / Brand */}
      <div>
        <div className="flex items-center justify-between px-4 py-4 border-b border-border/80 h-14">
          <div
            onClick={() => setScreen('home')}
            className="flex items-center gap-2.5 cursor-pointer group overflow-hidden"
          >
            <div className="w-7 h-7 rounded-control bg-accent flex items-center justify-center shrink-0">
              <Scissors className="w-4 h-4 text-[#09090B]" />
            </div>
            {!sidebarCollapsed && (
              <div className="flex items-center gap-1.5 overflow-hidden">
                <span className="font-semibold text-sm tracking-tight text-text-primary whitespace-nowrap">
                  ClipLocal
                </span>
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-accent/15 text-accent border border-accent/30 font-medium">
                  M4
                </span>
              </div>
            )}
          </div>

          <button
            onClick={toggleSidebar}
            className="text-text-muted hover:text-text-primary p-1 rounded-control hover:bg-bg-elevated transition-colors"
            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {sidebarCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const isActive = currentScreen === item.id
            const buttonContent = (
              <button
                key={item.id}
                onClick={() => setScreen(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-control text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-bg-elevated text-text-primary border border-border shadow-subtle'
                    : 'text-text-secondary hover:text-text-primary hover:bg-[#18181B]/60'
                } ${sidebarCollapsed ? 'justify-center px-0' : ''}`}
              >
                <span className={`shrink-0 ${isActive ? 'text-accent' : ''}`}>{item.icon}</span>
                {!sidebarCollapsed && (
                  <span className="flex-1 text-left truncate">{item.label}</span>
                )}
                {!sidebarCollapsed && item.badge && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                      isActive ? 'bg-accent/20 text-accent font-bold' : 'bg-[#27272A] text-text-muted'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            )

            if (sidebarCollapsed) {
              return (
                <Tooltip key={item.id} content={item.label} position="right">
                  {buttonContent}
                </Tooltip>
              )
            }
            return buttonContent
          })}
        </nav>
      </div>

      {/* Bottom: Engine Health Indicator */}
      <div className="p-3 border-t border-border/80">
        {!sidebarCollapsed ? (
          <div className="bg-[#09090B] border border-border rounded-control p-2.5 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-semibold text-text-secondary">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-accent" />
                <span>Engine Health</span>
              </span>
              <span className="text-[10px] font-mono text-text-muted">100% Offline</span>
            </div>

            <div className="space-y-1.5 pt-1 text-[11px]">
              {/* Metal Acceleration */}
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Metal GPU</span>
                <span className="flex items-center gap-1.5 text-text-primary font-mono text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success animate-pulse" />
                  M4 Pro
                </span>
              </div>

              {/* Whisper Model */}
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Whisper</span>
                <span className="flex items-center gap-1.5 text-text-primary font-mono text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-status-success" />
                  turbo-v3
                </span>
              </div>

              {/* Ollama LLM */}
              <div className="flex items-center justify-between">
                <span className="text-text-muted">Ollama LLM</span>
                <span className="flex items-center gap-1.5 text-text-primary font-mono text-[10px]">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      engineHealth.ollamaAvailable ? 'bg-status-success' : 'bg-status-warning'
                    }`}
                  />
                  llama3.2
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 py-1">
            <Tooltip content="Metal GPU: Active (Apple M4 Pro)" position="right">
              <div className="w-2.5 h-2.5 rounded-full bg-status-success" />
            </Tooltip>
            <Tooltip content="Whisper: large-v3-turbo (Local FP16)" position="right">
              <div className="w-2.5 h-2.5 rounded-full bg-status-success" />
            </Tooltip>
            <Tooltip content="Ollama: llama3.2 (Circuit Breaker: CLOSED)" position="right">
              <div className="w-2.5 h-2.5 rounded-full bg-accent" />
            </Tooltip>
          </div>
        )}
      </div>
    </aside>
  )
}
