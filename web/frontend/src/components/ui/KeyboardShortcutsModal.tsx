import React, { useEffect } from 'react'
import { useStore } from '../../store/useStore'
import { Modal } from './Modal'

export const KeyboardShortcutsModal: React.FC = () => {
  const { shortcutsModalOpen, setShortcutsModalOpen } = useStore()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in input or textarea, don't trigger
      const target = e.target as HTMLElement
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return

      if (e.key === '?') {
        e.preventDefault()
        setShortcutsModalOpen(!shortcutsModalOpen)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [shortcutsModalOpen, setShortcutsModalOpen])

  const shortcutGroups = [
    {
      group: 'Clip Review Studio',
      items: [
        { key: 'J / K', desc: 'Navigate next / previous candidate clip' },
        { key: 'Space', desc: 'Toggle video playback' },
        { key: 'A', desc: 'Approve current clip for export' },
        { key: 'R', desc: 'Reject current clip' },
        { key: 'E', desc: 'Export approved clips package' },
        { key: '⌘ + Z', desc: 'Undo boundary trim or edit' }
      ]
    },
    {
      group: 'Global Navigation',
      items: [
        { key: '⌘ + K', desc: 'Open Command Palette' },
        { key: '?', desc: 'Toggle this keyboard shortcuts cheatsheet' },
        { key: 'Esc', desc: 'Close dialogs, menus, or command bar' }
      ]
    }
  ]

  return (
    <Modal
      isOpen={shortcutsModalOpen}
      onClose={() => setShortcutsModalOpen(false)}
      title="Keyboard Shortcuts"
      description="Work at high velocity with built-in desktop keybindings."
      maxWidth="md"
    >
      <div className="space-y-5 pt-2">
        {shortcutGroups.map((g) => (
          <div key={g.group} className="space-y-2">
            <h4 className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
              {g.group}
            </h4>
            <div className="space-y-1.5 bg-[#111113] border border-border rounded-control p-2.5">
              {g.items.map((item) => (
                <div key={item.key} className="flex justify-between items-center text-xs py-1">
                  <span className="text-text-secondary">{item.desc}</span>
                  <kbd className="px-2 py-0.5 text-[11px] font-mono font-medium text-accent bg-[#18181B] border border-border rounded">
                    {item.key}
                  </kbd>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  )
}
