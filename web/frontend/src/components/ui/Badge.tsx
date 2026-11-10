import React from 'react'

export interface BadgeProps {
  children: React.ReactNode
  variant?: 'accent' | 'success' | 'warning' | 'danger' | 'muted' | 'outline'
  size?: 'sm' | 'md'
  className?: string
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'muted',
  size = 'sm',
  className = ''
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium rounded-full',
    md: 'text-xs px-2.5 py-1 font-medium rounded-full'
  }

  const variantStyles = {
    accent: 'bg-accent/15 text-accent border border-accent/30',
    success: 'bg-status-success/15 text-status-success border border-status-success/30',
    warning: 'bg-status-warning/15 text-status-warning border border-status-warning/30',
    danger: 'bg-status-danger/15 text-status-danger border border-status-danger/30',
    muted: 'bg-[#18181B] text-text-secondary border border-border',
    outline: 'bg-transparent text-text-secondary border border-border'
  }

  return (
    <span className={`inline-flex items-center gap-1.5 select-none ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}>
      {children}
    </span>
  )
}
