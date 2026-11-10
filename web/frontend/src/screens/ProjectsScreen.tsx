import React, { useState, useEffect } from 'react'
import { useStore } from '../store/useStore'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import {
  Search,
  PlusCircle,
  FileSpreadsheet,
  FileArchive,
  Trash2,
  RefreshCw,
  Video,
  Loader2,
  Sparkles
} from 'lucide-react'

export const ProjectsScreen: React.FC = () => {
  const {
    projects,
    selectProject,
    setScreen,
    setActiveJobId,
    addToast,
    downloadDeliveryBundle,
    downloadScheduleCSV,
    fetchProjects,
    deleteProject
  } = useStore()
  const [filter, setFilter] = useState<'all' | 'processing' | 'completed' | 'failed'>('all')
  const [search, setSearch] = useState('')
  const [deleteModalProject, setDeleteModalProject] = useState<string | null>(null)

  useEffect(() => {
    fetchProjects()
    const timer = setInterval(() => {
      fetchProjects()
    }, 4000)
    return () => clearInterval(timer)
  }, [fetchProjects])

  const filtered = projects.filter((p) => {
    const matchesFilter = filter === 'all' ? true : p.status === filter
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.source.toLowerCase().includes(search.toLowerCase())
    return matchesFilter && matchesSearch
  })

  return (
    <div className="max-w-[1280px] mx-auto py-8 px-6 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-text-primary">
            Projects Tracker
          </h2>
          <p className="text-xs text-text-secondary mt-0.5">
            Manage video harvests, monitor background encodes, and export agency delivery packages.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={() => fetchProjects()}
            title="Refresh database"
          >
            Refresh
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={<PlusCircle className="w-3.5 h-3.5" />}
            onClick={() => setScreen('new-project')}
          >
            New Project
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-bg-surface border border-border rounded-card p-3">
        {/* Search Input */}
        <div className="w-full sm:w-72 relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#18181B] border border-border focus:border-accent text-xs rounded-control pl-8 pr-3 py-1.5 text-text-primary placeholder:text-text-muted outline-none"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto">
          {(['all', 'processing', 'completed', 'failed'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-control capitalize transition-colors ${
                filter === s
                  ? 'bg-bg-elevated text-text-primary font-medium border border-border shadow-subtle'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-bg-surface border border-border rounded-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#141416] border-b border-border text-text-muted text-[11px] uppercase tracking-wider font-semibold">
              <tr>
                <th className="py-3 px-4">Project / Video</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Clips</th>
                <th className="py-3 px-4">Avg Score</th>
                <th className="py-3 px-4">Created</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-text-muted">
                    No projects match the current filter.
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-bg-elevated/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-control bg-[#18181B] overflow-hidden border border-border shrink-0 flex items-center justify-center">
                          {p.thumbnailUrl ? (
                            <img
                              src={p.thumbnailUrl}
                              alt=""
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none'
                              }}
                            />
                          ) : (
                            <Video className="w-4 h-4 text-accent/80" />
                          )}
                        </div>
                        <span
                          className="font-semibold text-text-primary truncate max-w-xs block"
                          title={p.title}
                        >
                          {p.title}
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-text-muted truncate max-w-[160px]">
                      {p.source}
                    </td>
                    <td className="py-3.5 px-4">
                      {p.status === 'completed' && <Badge variant="success">Completed</Badge>}
                      {p.status === 'processing' && <Badge variant="warning">Processing</Badge>}
                      {p.status === 'failed' && <Badge variant="danger">Failed</Badge>}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-text-primary">{p.clipsCount}</td>
                    <td className="py-3.5 px-4 font-mono font-semibold">
                      {p.status === 'completed' && p.clipsCount > 0 && p.avgScore > 0 ? (
                        <span className="text-accent">{p.avgScore}/100</span>
                      ) : (
                        <span className="text-text-muted">—</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-text-muted">
                      {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        {p.status === 'completed' && p.clipsCount > 0 ? (
                          <>
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => selectProject(p.id)}
                            >
                              Open Studio
                            </Button>
                            <button
                              onClick={() => downloadDeliveryBundle(p.id)}
                              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-[#18181B] rounded transition-colors"
                              title="Download Delivery ZIP"
                            >
                              <FileArchive className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => downloadScheduleCSV(p.id)}
                              className="p-1.5 text-text-muted hover:text-text-primary hover:bg-[#18181B] rounded transition-colors"
                              title="Download Schedule CSV"
                            >
                              <FileSpreadsheet className="w-3.5 h-3.5" />
                            </button>
                          </>
                        ) : p.status === 'processing' ? (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="text-accent border-accent/40"
                            icon={<Loader2 className="w-3 h-3 animate-spin" />}
                            onClick={() => {
                              setActiveJobId(p.id)
                              setScreen('processing')
                            }}
                          >
                            View Progress
                          </Button>
                        ) : (
                          <Button
                            variant="secondary"
                            size="sm"
                            className="text-text-muted"
                            onClick={() => selectProject(p.id)}
                          >
                            Inspect
                          </Button>
                        )}

                        <button
                          onClick={() => setDeleteModalProject(p.id)}
                          className="p-1.5 text-text-muted hover:text-status-danger hover:bg-status-danger/10 rounded transition-colors ml-1"
                          title="Delete project"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={!!deleteModalProject}
        onClose={() => setDeleteModalProject(null)}
        title="Delete Project?"
        description="Are you sure you want to delete this project and cached transcripts? This action cannot be undone."
      >
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="ghost" size="sm" onClick={() => setDeleteModalProject(null)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={async () => {
              if (deleteModalProject) {
                await deleteProject(deleteModalProject)
                setDeleteModalProject(null)
              }
            }}
          >
            Confirm Delete
          </Button>
        </div>
      </Modal>
    </div>
  )
}
