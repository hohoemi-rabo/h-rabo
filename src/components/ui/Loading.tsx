import React from 'react'

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  type?: 'spinner' | 'pulse' | 'cyber' | 'dots' | 'bars'
  color?: 'blue' | 'purple' | 'green' | 'pink'
  className?: string
  text?: string
}

export default function Loading({ 
  size = 'md', 
  type = 'cyber', 
  color = 'blue',
  className = '',
  text
}: LoadingProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20'
  }

  const colors = {
    blue: 'border-neon-blue',
    purple: 'border-neon-purple', 
    green: 'border-neon-green',
    pink: 'border-neon-pink'
  }

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const renderSpinner = () => (
    <div className={`${sizes[size]} relative ${className}`}>
      <div className={`absolute inset-0 animate-spin rounded-full border-2 border-t-transparent ${colors[color]}`}></div>
    </div>
  )

  const renderCyberSpinner = () => (
    <div className={`${sizes[size]} relative ${className}`}>
      <div className={`absolute inset-0 animate-spin rounded-full border-2 border-t-transparent ${colors[color]} shadow-neon`}></div>
      <div className={`absolute inset-2 animate-spin rounded-full border-2 border-b-transparent ${colors[color === 'blue' ? 'purple' : 'blue']} animate-reverse`}></div>
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-current to-transparent opacity-20 animate-pulse"></div>
    </div>
  )

  const renderPulse = () => (
    <div className={`${sizes[size]} ${className}`}>
      <div className={`w-full h-full rounded-full animate-pulse bg-gradient-to-r from-neon-blue to-neon-purple shadow-glow`}></div>
    </div>
  )

  const renderDots = () => (
    <div className={`flex space-x-2 ${className}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`w-2 h-2 ${colors[color]} rounded-full animate-bounce bg-current shadow-neon`}
          style={{ animationDelay: `${i * 0.2}s` }}
        ></div>
      ))}
    </div>
  )

  const renderBars = () => (
    <div className={`flex space-x-1 ${className}`}>
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={`w-1 bg-current ${colors[color]} shadow-neon animate-pulse`}
          style={{ 
            height: `${12 + (i % 2) * 8}px`,
            animationDelay: `${i * 0.15}s`,
            animationDuration: '1s'
          }}
        ></div>
      ))}
    </div>
  )

  const renderLoader = () => {
    switch (type) {
      case 'spinner':
        return renderSpinner()
      case 'cyber':
        return renderCyberSpinner()
      case 'pulse':
        return renderPulse()
      case 'dots':
        return renderDots()
      case 'bars':
        return renderBars()
      default:
        return renderCyberSpinner()
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-3">
      {renderLoader()}
      {text && (
        <div className={`font-cyber text-gray-300 ${textSizes[size]} animate-pulse`}>
          {text}
        </div>
      )}
    </div>
  )
}

// Full screen loading overlay
export function LoadingOverlay({ 
  isVisible, 
  text = "読み込み中...",
  type = 'cyber',
  backdrop = true 
}: {
  isVisible: boolean
  text?: string
  type?: LoadingProps['type']
  backdrop?: boolean
}) {
  if (!isVisible) return null

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${backdrop ? 'bg-dark-900/80 backdrop-blur-sm' : ''}`}>
      <div className="text-center">
        <Loading type={type} size="xl" text={text} />
      </div>
    </div>
  )
}

// Inline loading for buttons/small areas
export function InlineLoading({ size = 'sm', className = '' }: { size?: LoadingProps['size'], className?: string }) {
  return (
    <Loading 
      type="spinner" 
      size={size} 
      className={`inline-block ${className}`}
    />
  )
}