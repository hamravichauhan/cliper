import React from 'react'

export interface ScoreBarProps {
  label: string
  weight: number // e.g. 30 for 30%
  value: number  // 0 - 100
  info?: string
}

export const ScoreBar: React.FC<ScoreBarProps> = ({
  label,
  weight,
  value,
  info
}) => {
  const getBarColor = (val: number) => {
    if (val >= 80) return 'bg-accent'
    if (val >= 60) return 'bg-status-warning'
    return 'bg-text-muted'
  }

  const getTextColor = (val: number) => {
    if (val >= 80) return 'text-accent'
    if (val >= 60) return 'text-status-warning'
    return 'text-text-muted'
  }

  return (
    <div className="space-y-1.5 py-1">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-1.5">
          <span className="text-text-primary font-medium capitalize">{label}</span>
          <span className="text-[10px] text-text-muted font-mono">({weight}%)</span>
        </div>
        <div className="flex items-center gap-1">
          <span className={`font-mono font-bold ${getTextColor(value)}`}>{value}</span>
          <span className="text-[10px] text-text-muted">/100</span>
        </div>
      </div>

      <div className="w-full h-1.5 bg-[#1F1F23] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${getBarColor(value)}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>

      {info && (
        <p className="text-[10px] text-text-muted leading-tight">{info}</p>
      )}
    </div>
  )
}
