import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
  icon?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'secondary',
  size = 'md',
  isLoading = false,
  icon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-control focus:outline-none focus:ring-2 focus:ring-accent/40 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none'

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5 h-7',
    md: 'text-sm px-3.5 py-2 gap-2 h-9',
    lg: 'text-sm px-5 py-2.5 gap-2.5 h-11 font-semibold'
  }

  const variantStyles = {
    // Primary is Lime Accent (#A3E635), dark text for maximum contrast & crispness
    primary: 'bg-accent text-[#09090B] font-semibold hover:bg-accent-hover shadow-sm border border-accent/20',
    // Secondary is surface elevated with 1px border
    secondary: 'bg-bg-elevated hover:bg-[#202024] text-text-primary border border-border hover:border-[#3F3F46]',
    // Ghost is transparent with subtle hover
    ghost: 'bg-transparent hover:bg-bg-elevated text-text-secondary hover:text-text-primary',
    // Danger is muted red background with red text and border
    danger: 'bg-status-danger/10 hover:bg-status-danger/20 text-status-danger border border-status-danger/30'
  }

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : icon ? (
        <span className="w-4 h-4 flex items-center justify-center shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  )
}
