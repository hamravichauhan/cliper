import React from 'react'

export interface ScoreRingProps {
  score: number // 0 to 100
  size?: 'sm' | 'md' | 'lg'
  showLabel?: boolean
  className?: string
}

export const ScoreRing: React.FC<ScoreRingProps> = ({
  score,
  size = 'md',
  showLabel = false,
  className = ''
}) => {
  // Score color tiers
  const getColor = (s: number) => {
    if (s >= 80) return { stroke: '#A3E635', text: 'text-accent', bg: 'bg-accent/10', label: 'Viral' }
    if (s >= 60) return { stroke: '#F59E0B', text: 'text-status-warning', bg: 'bg-status-warning/10', label: 'Solid' }
    return { stroke: '#71717A', text: 'text-text-muted', bg: 'bg-[#27272A]/30', label: 'Weak' }
  }

  const { stroke, text, bg, label } = getColor(score)

  const dimensions = {
    sm: { diameter: 28, strokeWidth: 3, fontSize: 'text-[11px]' },
    md: { diameter: 40, strokeWidth: 3.5, fontSize: 'text-xs' },
    lg: { diameter: 56, strokeWidth: 4.5, fontSize: 'text-base' }
  }

  const { diameter, strokeWidth, fontSize } = dimensions[size]
  const radius = (diameter - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (score / 100) * circumference

  return (
    <div className={`inline-flex items-center gap-2 ${className}`}>
      <div className="relative inline-flex items-center justify-center" style={{ width: diameter, height: diameter }}>
        <svg
          className="transform -rotate-90 origin-center"
          width={diameter}
          height={diameter}
        >
          {/* Track background */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="transparent"
            stroke="#27272A"
            strokeWidth={strokeWidth}
          />
          {/* Active progress */}
          <circle
            cx={diameter / 2}
            cy={diameter / 2}
            r={radius}
            fill="transparent"
            stroke={stroke}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500 ease-out"
          />
        </svg>
        <span className={`absolute font-mono font-bold tracking-tight ${fontSize} ${text}`}>
          {score}
        </span>
      </div>

      {showLabel && (
        <div className="flex flex-col leading-tight">
          <span className={`text-xs font-semibold ${text}`}>{label}</span>
          <span className="text-[10px] text-text-muted font-mono">{score}/100</span>
        </div>
      )}
    </div>
  )
}
