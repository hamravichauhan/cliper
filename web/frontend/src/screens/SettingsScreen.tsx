import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Toggle } from '../components/ui/Toggle'
import { Badge } from '../components/ui/Badge'
import {
  Cpu,
  HardDrive,
  Shield,
  Trash2,
  Check,
  Folder,
  RefreshCw,
  Zap,
  Info
} from 'lucide-react'

export const SettingsScreen: React.FC = () => {
  const { engineHealth, addToast } = useStore()

  const [hardwareEncoder, setHardwareEncoder] = useState(true)
  const [circuitBreaker, setCircuitBreaker] = useState(true)
  const [outputFolder, setOutputFolder] = useState('/Volumes/Ravi\'s SSD/PROJECTS/kalp/exports')
  const [cacheSize, setCacheSize] = useState('4.82 GB')

  const handleClearCache = () => {
    setCacheSize('0.00 GB')
    addToast({
      title: 'Cache Cleared',
      description: 'Audio WAVs, scene cut hashes, and temp frames wiped.',
      type: 'success'
    })
  }

  return (
    <div className="max-w-[880px] mx-auto py-8 px-6 space-y-8">
      {/* Top Header */}
      <div className="border-b border-border pb-4 space-y-1">
        <h2 className="text-xl font-bold tracking-tight text-text-primary">
          Engine & Local Hardware Settings
        </h2>
        <p className="text-xs text-text-secondary">
          Configure Apple Silicon GPU compute, Whisper models, Ollama fallback, and on-disk caching.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. COMPUTE ENGINE */}
        <div className="bg-bg-surface border border-border rounded-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Cpu className="w-4 h-4 text-accent" />
              <span>Apple Silicon & AI Engine</span>
            </h3>
            <Badge variant="accent">Metal Active</Badge>
          </div>

          <div className="space-y-3.5 pt-2">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Local Whisper Speech-to-Text Model
              </label>
              <select
                className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                defaultValue="large-v3-turbo"
              >
                <option value="large-v3-turbo">
                  mlx-community/whisper-large-v3-turbo (Recommended • 8x Realtime)
                </option>
                <option value="base">whisper-base.en (Ultra-fast • Lower accuracy)</option>
                <option value="small">whisper-small (Balanced)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Local Ollama LLM Model (Re-Ranking & Social Copy)
              </label>
              <select
                className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                defaultValue="llama3.2"
              >
                <option value="llama3.2">llama3.2:latest (Fast • 3B params)</option>
                <option value="mistral">mistral:latest (7B)</option>
                <option value="qwen2.5">qwen2.5:latest (7B)</option>
              </select>
            </div>

            <Toggle
              label="Apple VideoToolbox Hardware Encoding (h264_videotoolbox)"
              description="Uses Apple Silicon dedicated media engine for fast 60fps renders."
              checked={hardwareEncoder}
              onChange={setHardwareEncoder}
            />

            <Toggle
              label="LLM Circuit Breaker (8.0s hard timeout with fallback)"
              description="Prevents hung Ollama calls from blocking batch clip exports."
              checked={circuitBreaker}
              onChange={setCircuitBreaker}
            />
          </div>
        </div>

        {/* 2. STORAGE & CACHE */}
        <div className="bg-bg-surface border border-border rounded-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <HardDrive className="w-4 h-4 text-accent" />
              <span>Storage & Local Cache</span>
            </h3>
            <span className="text-xs font-mono text-text-muted">Total Cache: {cacheSize}</span>
          </div>

          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="block text-xs font-medium text-text-secondary">
                Render Export Directory
              </label>
              <div className="flex items-center gap-2">
                <Input value={outputFolder} onChange={(e) => setOutputFolder(e.target.value)} />
                <Button
                  variant="secondary"
                  size="md"
                  icon={<Folder className="w-3.5 h-3.5" />}
                  onClick={() => addToast({ title: 'Directory Changed', type: 'info' })}
                >
                  Browse
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#18181B] border border-border rounded-control">
              <div>
                <p className="text-xs font-semibold text-text-primary">Clear Intermediate Caches</p>
                <p className="text-[11px] text-text-muted">
                  Wipes audio hashes, scene cut landmarks, and temp ASS files. Transcripts remain safe in SQLite.
                </p>
              </div>
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={handleClearCache}
              >
                Clear Cache
              </Button>
            </div>
          </div>
        </div>

        {/* 3. ABOUT & LICENSE */}
        <div className="bg-bg-surface border border-border rounded-card p-5 space-y-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-text-primary flex items-center gap-2">
              <Info className="w-4 h-4 text-accent" />
              <span>About ClipLocal</span>
            </h3>
            <Badge variant="outline">v2.1.0-prod</Badge>
          </div>
          <p className="text-xs text-text-secondary leading-relaxed pt-1">
            ClipLocal runs 100% locally on your machine with zero external cloud dependencies.
            Audio and video files never leave your Mac. Built for high-volume creators and clipping agencies.
          </p>
        </div>
      </div>
    </div>
  )
}
