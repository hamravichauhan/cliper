import React, { useState } from 'react'
import { useStore } from '../store/useStore'
import { BrandKit } from '../types'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import {
  Palette,
  PlusCircle,
  Check,
  Sparkles,
  Trash2,
  Sliders,
  Type
} from 'lucide-react'

export const BrandKitsScreen: React.FC = () => {
  const { brandKits, addToast } = useStore()
  const [activeKitId, setActiveKitId] = useState(brandKits[0].id)

  const activeKit = brandKits.find((b) => b.id === activeKitId) || brandKits[0]

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Agency Brand Kits
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Configure client presets, color palettes, fonts, watermarks, and subtitle styling for instant 1-click batch branding.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<PlusCircle className="w-3.5 h-3.5" />}
          onClick={() => addToast({ title: 'New Brand Kit Created', type: 'success' })}
        >
          New Brand Kit
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Brand Kit List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
            Saved Client Kits ({brandKits.length})
          </span>

          <div className="space-y-2">
            {brandKits.map((b) => {
              const isSelected = b.id === activeKit.id
              return (
                <div
                  key={b.id}
                  onClick={() => setActiveKitId(b.id)}
                  className={`p-3.5 rounded-card border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-bg-elevated border-accent shadow-sm'
                      : 'bg-bg-surface border-border hover:border-[#3F3F46]'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xs font-semibold text-text-primary">{b.name}</h4>
                      <p className="text-[11px] text-text-muted">{b.clientName}</p>
                    </div>
                    <Badge variant={isSelected ? 'accent' : 'muted'} size="sm">
                      {b.defaultStyle}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-border/60 text-[10px]">
                    <span className="font-mono text-accent">{b.handle}</span>
                    <div className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full border border-black/40"
                        style={{ backgroundColor: b.primaryColor }}
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-black/40"
                        style={{ backgroundColor: b.highlightColor }}
                      />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right: Brand Kit Editor & Live Sample Preview */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-bg-surface border border-border rounded-card p-5 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <div>
                <h3 className="text-sm font-semibold text-text-primary">
                  Editing: {activeKit.name}
                </h3>
                <p className="text-[11px] text-text-muted font-mono">{activeKit.handle}</p>
              </div>

              <Button
                variant="primary"
                size="sm"
                icon={<Check className="w-3.5 h-3.5" />}
                onClick={() => addToast({ title: 'Brand Kit Saved', type: 'success' })}
              >
                Save Changes
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Controls */}
              <div className="space-y-4">
                <Input label="Brand Kit Name" defaultValue={activeKit.name} />
                <Input label="Client Name" defaultValue={activeKit.clientName} />
                <Input label="Watermark Handle" defaultValue={activeKit.handle} />

                <div className="grid grid-cols-2 gap-3">
                  <Input label="Primary Text Color" defaultValue={activeKit.primaryColor} />
                  <Input label="Highlight Pop Color" defaultValue={activeKit.highlightColor} />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Font Family
                  </label>
                  <select
                    className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                    defaultValue={activeKit.fontFamily}
                  >
                    <option value="Montserrat">Montserrat (Extra Bold)</option>
                    <option value="Inter">Inter (Modern Clean)</option>
                    <option value="Impact">Impact (Classic Viral)</option>
                    <option value="Futura">Futura Bold</option>
                  </select>
                </div>
              </div>

              {/* Live Preview Sample 9:16 Canvas */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#09090B] border border-border rounded-card space-y-3">
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  Live Vertical 9:16 Preview
                </span>

                <div className="relative w-48 h-84 aspect-[9/16] bg-black rounded-control border border-border overflow-hidden shadow-xl select-none">
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80"
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

                  {/* Clean Top Context Headline (NO UGLY BOX!) */}
                  <div className="absolute top-6 left-2 right-2 text-center">
                    <span
                      className="text-[10px] font-bold text-white uppercase"
                      style={{ textShadow: '0 1px 4px #000' }}
                    >
                      Why 99% Of People Fail
                    </span>
                  </div>

                  {/* Sample Burned Captions */}
                  <div className="absolute bottom-10 left-2 right-2 text-center">
                    <p
                      className="text-xs font-black uppercase tracking-tight"
                      style={{
                        color: activeKit.highlightColor,
                        textShadow: '0 2px 4px #000',
                        fontFamily: activeKit.fontFamily
                      }}
                    >
                      EXECUTE RELENTLESSLY
                    </p>
                  </div>

                  {/* Watermark */}
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/80 bg-black/50 px-1 py-0.2 rounded">
                    {activeKit.handle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
