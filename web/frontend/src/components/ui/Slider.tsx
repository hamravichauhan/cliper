import React from 'react'

export interface SliderProps {
  label?: string
  value: number
  min: number
  max: number
  step?: number
  unit?: string
  onChange: (val: number) => void
  className?: string
}

export const Slider: React.FC<SliderProps> = ({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange,
  className = ''
}) => {
  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div className={`space-y-2 w-full ${className}`}>
      {label && (
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-secondary font-medium">{label}</span>
          <span className="font-mono text-text-primary text-xs">
            {value}
            {unit}
          </span>
        </div>
      )}
      <div className="relative flex items-center h-5">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-1.5 bg-[#1F1F23] rounded-lg appearance-none cursor-pointer accent-[#A3E635] focus:outline-none"
          style={{
            background: `linear-gradient(to right, #A3E635 0%, #A3E635 ${percentage}%, #27272A ${percentage}%, #27272A 100%)`
          }}
        />
      </div>
    </div>
  )
}
