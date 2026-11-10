import React from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  rightElement?: React.ReactNode
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  icon,
  rightElement,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-medium text-text-secondary">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {icon && (
          <div className="absolute left-3 flex items-center pointer-events-none text-text-muted">
            {icon}
          </div>
        )}
        <input
          className={`w-full bg-[#111113] border border-border focus:border-accent text-text-primary placeholder:text-text-muted text-sm rounded-control transition-all duration-150 px-3 py-2 outline-none focus:ring-1 focus:ring-accent/30 ${
            icon ? 'pl-9' : ''
          } ${rightElement ? 'pr-10' : ''} ${error ? 'border-status-danger focus:border-status-danger focus:ring-status-danger/30' : ''} ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute right-3 flex items-center text-text-muted">
            {rightElement}
          </div>
        )}
      </div>
      {error && <p className="text-[11px] text-status-danger">{error}</p>}
    </div>
  )
}

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label className="block text-xs font-medium text-text-secondary">
          {label}
        </label>
      )}
      <textarea
        className={`w-full bg-[#111113] border border-border focus:border-accent text-text-primary placeholder:text-text-muted text-sm rounded-control transition-all duration-150 p-3 outline-none focus:ring-1 focus:ring-accent/30 ${
          error ? 'border-status-danger focus:border-status-danger focus:ring-status-danger/30' : ''
        } ${className}`}
        {...props}
      />
      {error && <p className="text-[11px] text-status-danger">{error}</p>}
    </div>
  )
}
