import React from 'react'
import { useStore } from '../../store/useStore'
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react'

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore()

  if (toasts.length === 0) return null

  const icons = {
    success: <CheckCircle2 className="w-4 h-4 text-status-success shrink-0" />,
    warning: <AlertTriangle className="w-4 h-4 text-status-warning shrink-0" />,
    danger: <XCircle className="w-4 h-4 text-status-danger shrink-0" />,
    info: <Info className="w-4 h-4 text-accent shrink-0" />
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const type = toast.type || 'info'
        return (
          <div
            key={toast.id}
            className="pointer-events-auto bg-bg-elevated border border-border rounded-card p-3.5 shadow-xl flex items-start gap-3 animate-in slide-in-from-bottom-2 duration-150"
          >
            {icons[type]}
            <div className="flex-1 min-w-0">
              <h5 className="text-xs font-semibold text-text-primary leading-tight">{toast.title}</h5>
              {toast.description && (
                <p className="text-[11px] text-text-secondary mt-0.5 leading-relaxed">{toast.description}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-text-primary p-0.5 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )
      })}
    </div>
  )
}
