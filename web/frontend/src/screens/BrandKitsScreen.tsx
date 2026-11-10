import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { BrandKit, CAPTION_STYLE_OPTIONS, CaptionStyle } from '../types'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import {
  Palette,
  PlusCircle,
  Check,
  Trash2,
  Type,
  Sparkles,
  Sliders,
  Tv
} from 'lucide-react'

export const BrandKitsScreen: React.FC = () => {
  const {
    brandKits,
    activeBrandKitId,
    setActiveBrandKitId,
    createBrandKit,
    updateBrandKit,
    deleteBrandKit,
    fetchBrandKits,
    addToast
  } = useStore()

  useEffect(() => {
    fetchBrandKits()
  }, [fetchBrandKits])

  const activeKit =
    brandKits.find((b) => b.id === activeBrandKitId) || brandKits[0] || {
      id: 'default',
      name: 'Default Kit',
      clientName: 'Creator',
      handle: '@creator',
      primaryColor: '#FFFFFF',
      highlightColor: '#A3E635',
      fontFamily: 'Inter',
      defaultStyle: 'hormozi' as CaptionStyle
    }

  // Active kit form state
  const [formName, setFormName] = useState(activeKit.name)
  const [formClient, setFormClient] = useState(activeKit.clientName)
  const [formHandle, setFormHandle] = useState(activeKit.handle)
  const [formPrimary, setFormPrimary] = useState(activeKit.primaryColor)
  const [formHighlight, setFormHighlight] = useState(activeKit.highlightColor)
  const [formFont, setFormFont] = useState(activeKit.fontFamily)
  const [formStyle, setFormStyle] = useState<CaptionStyle>(activeKit.defaultStyle)

  // Sync form state when active kit changes
  useEffect(() => {
    if (activeKit) {
      setFormName(activeKit.name)
      setFormClient(activeKit.clientName)
      setFormHandle(activeKit.handle)
      setFormPrimary(activeKit.primaryColor)
      setFormHighlight(activeKit.highlightColor)
      setFormFont(activeKit.fontFamily)
      setFormStyle(activeKit.defaultStyle)
    }
  }, [activeKit.id])

  // New Kit Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newKitName, setNewKitName] = useState('')
  const [newKitClient, setNewKitClient] = useState('')
  const [newKitHandle, setNewKitHandle] = useState('')
  const [newKitPrimary, setNewKitPrimary] = useState('#FFFFFF')
  const [newKitHighlight, setNewKitHighlight] = useState('#A3E635')
  const [newKitFont, setNewKitFont] = useState('Montserrat')
  const [newKitStyle, setNewKitStyle] = useState<CaptionStyle>('hormozi')

  const handleSaveActiveKit = async () => {
    await updateBrandKit(activeKit.id, {
      name: formName,
      clientName: formClient,
      handle: formHandle.startsWith('@') ? formHandle : `@${formHandle}`,
      primaryColor: formPrimary,
      highlightColor: formHighlight,
      fontFamily: formFont,
      defaultStyle: formStyle
    })
  }

  const handleCreateKit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newKitName.trim() || !newKitHandle.trim()) {
      addToast({
        title: 'Validation Error',
        description: 'Brand Kit Name and Handle are required.',
        type: 'warning'
      })
      return
    }

    const created = await createBrandKit({
      name: newKitName.trim(),
      clientName: newKitClient.trim() || newKitName.trim(),
      handle: newKitHandle.trim().startsWith('@') ? newKitHandle.trim() : `@${newKitHandle.trim()}`,
      primaryColor: newKitPrimary,
      highlightColor: newKitHighlight,
      fontFamily: newKitFont,
      defaultStyle: newKitStyle
    })

    setIsModalOpen(false)
    setActiveBrandKitId(created.id)
    setNewKitName('')
    setNewKitClient('')
    setNewKitHandle('')
  }

  const handleDeleteActiveKit = async () => {
    if (brandKits.length <= 1) {
      addToast({
        title: 'Cannot Delete Kit',
        description: 'You must maintain at least one brand kit.',
        type: 'warning'
      })
      return
    }
    if (window.confirm(`Are you sure you want to delete "${activeKit.name}"?`)) {
      await deleteBrandKit(activeKit.id)
    }
  }

  const activeStyleConfig =
    CAPTION_STYLE_OPTIONS.find((s) => s.id === formStyle) || CAPTION_STYLE_OPTIONS[0]

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
          onClick={() => setIsModalOpen(true)}
        >
          New Brand Kit
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Brand Kit List */}
        <div className="lg:col-span-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
              Saved Client Kits ({brandKits.length})
            </span>
          </div>

          <div className="space-y-2">
            {brandKits.map((b) => {
              const isSelected = b.id === activeKit.id
              return (
                <div
                  key={b.id}
                  onClick={() => setActiveBrandKitId(b.id)}
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
                        title={`Primary: ${b.primaryColor}`}
                      />
                      <span
                        className="w-3 h-3 rounded-full border border-black/40"
                        style={{ backgroundColor: b.highlightColor }}
                        title={`Highlight: ${b.highlightColor}`}
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
                  Editing: {formName}
                </h3>
                <p className="text-[11px] text-text-muted font-mono">{formHandle}</p>
              </div>

              <div className="flex items-center gap-2">
                {brandKits.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-danger hover:text-danger hover:bg-danger/10"
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                    onClick={handleDeleteActiveKit}
                  >
                    Delete Kit
                  </Button>
                )}
                <Button
                  variant="primary"
                  size="sm"
                  icon={<Check className="w-3.5 h-3.5" />}
                  onClick={handleSaveActiveKit}
                >
                  Save Changes
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Form Controls */}
              <div className="space-y-4">
                <Input
                  label="Brand Kit Name"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Joe Rogan Experience"
                />
                <Input
                  label="Client / Creator Name"
                  value={formClient}
                  onChange={(e) => setFormClient(e.target.value)}
                  placeholder="e.g. Joe Rogan"
                />
                <Input
                  label="Watermark Social Handle"
                  value={formHandle}
                  onChange={(e) => setFormHandle(e.target.value)}
                  placeholder="@handle"
                />

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">
                      Primary Text Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formPrimary}
                        onChange={(e) => setFormPrimary(e.target.value)}
                        className="w-8 h-8 rounded border border-border bg-transparent cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={formPrimary}
                        onChange={(e) => setFormPrimary(e.target.value)}
                        className="flex-1 bg-[#18181B] border border-border text-xs rounded-control px-2.5 py-1.5 text-text-primary outline-none focus:border-accent font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-secondary mb-1.5">
                      Highlight Pop Color
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={formHighlight}
                        onChange={(e) => setFormHighlight(e.target.value)}
                        className="w-8 h-8 rounded border border-border bg-transparent cursor-pointer p-0.5"
                      />
                      <input
                        type="text"
                        value={formHighlight}
                        onChange={(e) => setFormHighlight(e.target.value)}
                        className="flex-1 bg-[#18181B] border border-border text-xs rounded-control px-2.5 py-1.5 text-text-primary outline-none focus:border-accent font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Font Family
                  </label>
                  <select
                    className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                    value={formFont}
                    onChange={(e) => setFormFont(e.target.value)}
                  >
                    <option value="Montserrat">Montserrat (Extra Bold)</option>
                    <option value="Inter">Inter (Modern Clean)</option>
                    <option value="Impact">Impact (Classic Viral)</option>
                    <option value="Bebas Neue">Bebas Neue (Tall Condensed)</option>
                    <option value="Arial">Arial (Universal Clean)</option>
                  </select>
                </div>

                {/* Subtitle Style Options - All 7 backend styles */}
                <div>
                  <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Default Subtitle Style ({CAPTION_STYLE_OPTIONS.length} Presets)
                  </label>
                  <select
                    className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                    value={formStyle}
                    onChange={(e) => setFormStyle(e.target.value as CaptionStyle)}
                  >
                    {CAPTION_STYLE_OPTIONS.map((style) => (
                      <option key={style.id} value={style.id}>
                        {style.name} ({style.subtitle})
                      </option>
                    ))}
                  </select>
                  <p className="text-[11px] text-text-muted mt-1">
                    {activeStyleConfig.desc}
                  </p>
                </div>
              </div>

              {/* Live Preview Sample 9:16 Canvas */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#09090B] border border-border rounded-card space-y-3">
                <span className="text-[11px] font-semibold text-text-muted uppercase tracking-wider">
                  Live Vertical 9:16 Preview
                </span>

                <div className="relative w-48 aspect-[9/16] bg-black rounded-control border border-border overflow-hidden shadow-2xl select-none">
                  {/* Background sample image */}
                  <img
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&auto=format&fit=crop&q=80"
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70 pointer-events-none" />

                  {/* Clean Top Context Headline (NO UGLY BOX) */}
                  <div className="absolute top-5 left-2 right-2 text-center">
                    <span
                      className="text-[10px] font-bold text-white uppercase tracking-tight"
                      style={{ textShadow: '0 2px 4px #000' }}
                    >
                      Why 99% Of People Fail
                    </span>
                  </div>

                  {/* Sample Burned-in Captions preview */}
                  <div className="absolute bottom-12 left-2 right-2 text-center">
                    {formStyle === 'boxed' ? (
                      <span
                        className="inline-block px-2.5 py-1 rounded font-black text-xs uppercase"
                        style={{
                          backgroundColor: formHighlight,
                          color: '#000000',
                          fontFamily: formFont
                        }}
                      >
                        EXECUTE RELENTLESSLY
                      </span>
                    ) : (
                      <p
                        className="text-xs font-black uppercase tracking-tight leading-tight"
                        style={{
                          color: formHighlight,
                          textShadow:
                            formStyle === 'cyberpunk' || formStyle === 'neon'
                              ? `0 0 8px ${activeStyleConfig.outlineColor}, 0 2px 4px #000`
                              : '0 2px 5px #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                          fontFamily: formFont
                        }}
                      >
                        <span style={{ color: formPrimary }}>JUST </span>
                        EXECUTE RELENTLESSLY
                      </p>
                    )}
                    <span className="text-[8px] text-white/70 block mt-1 font-mono uppercase">
                      Style: {activeStyleConfig.name}
                    </span>
                  </div>

                  {/* Watermark Handle */}
                  <div className="absolute bottom-2 right-2 text-[9px] font-mono text-white/90 bg-black/60 px-1.5 py-0.5 rounded border border-white/10">
                    {formHandle || '@creator'}
                  </div>
                </div>

                <p className="text-[11px] text-text-muted text-center max-w-[200px]">
                  Simulates 1080x1920 crop with burned-in ASS captions and dynamic watermark.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Create New Brand Kit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create New Agency Brand Kit"
        description="Add a dedicated branding preset for a new creator or podcast client."
        maxWidth="md"
      >
        <form onSubmit={handleCreateKit} className="space-y-4 pt-2">
          <Input
            label="Brand Kit Name"
            value={newKitName}
            onChange={(e) => setNewKitName(e.target.value)}
            placeholder="e.g. Huberman Lab Routine"
            required
          />

          <Input
            label="Client / Creator Name"
            value={newKitClient}
            onChange={(e) => setNewKitClient(e.target.value)}
            placeholder="e.g. Andrew Huberman"
          />

          <Input
            label="Social Handle / Watermark"
            value={newKitHandle}
            onChange={(e) => setNewKitHandle(e.target.value)}
            placeholder="@hubermanlab"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Primary Text Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newKitPrimary}
                  onChange={(e) => setNewKitPrimary(e.target.value)}
                  className="w-8 h-8 rounded border border-border bg-transparent cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={newKitPrimary}
                  onChange={(e) => setNewKitPrimary(e.target.value)}
                  className="flex-1 bg-[#18181B] border border-border text-xs rounded-control px-2.5 py-1.5 text-text-primary outline-none focus:border-accent font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Highlight Pop Color
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={newKitHighlight}
                  onChange={(e) => setNewKitHighlight(e.target.value)}
                  className="w-8 h-8 rounded border border-border bg-transparent cursor-pointer p-0.5"
                />
                <input
                  type="text"
                  value={newKitHighlight}
                  onChange={(e) => setNewKitHighlight(e.target.value)}
                  className="flex-1 bg-[#18181B] border border-border text-xs rounded-control px-2.5 py-1.5 text-text-primary outline-none focus:border-accent font-mono"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Font Family
              </label>
              <select
                className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                value={newKitFont}
                onChange={(e) => setNewKitFont(e.target.value)}
              >
                <option value="Montserrat">Montserrat (Extra Bold)</option>
                <option value="Inter">Inter (Modern Clean)</option>
                <option value="Impact">Impact (Classic Viral)</option>
                <option value="Bebas Neue">Bebas Neue (Tall)</option>
                <option value="Arial">Arial (Clean)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-text-secondary mb-1.5">
                Default Subtitle Style
              </label>
              <select
                className="w-full bg-[#18181B] border border-border text-xs rounded-control px-3 py-2 text-text-primary outline-none focus:border-accent"
                value={newKitStyle}
                onChange={(e) => setNewKitStyle(e.target.value as CaptionStyle)}
              >
                {CAPTION_STYLE_OPTIONS.map((style) => (
                  <option key={style.id} value={style.id}>
                    {style.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-border">
            <Button variant="ghost" size="sm" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" type="submit">
              Create Brand Kit
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  )
}
