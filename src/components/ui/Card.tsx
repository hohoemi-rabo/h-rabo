import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  glowing?: boolean
  variant?: 'default' | 'glass' | 'neon' | 'elevated'
  padding?: 'none' | 'sm' | 'md' | 'lg'
  hoverable?: boolean
}

export default function Card({ 
  children, 
  className = '', 
  glowing = false,
  variant = 'default',
  padding = 'md',
  hoverable = true
}: CardProps) {
  const baseStyles = 'rounded-lg border transition-all duration-300'
  
  const variants = {
    default: 'bg-dark-700/80 border-dark-600 backdrop-blur-sm',
    glass: 'bg-dark-700/40 border-dark-600/50 backdrop-blur-md',
    neon: 'bg-dark-800/90 border-neon-blue shadow-neon',
    elevated: 'bg-dark-700 border-dark-600 shadow-cyber'
  }

  const paddings = {
    none: '',
    sm: 'p-4',
    md: 'p-6', 
    lg: 'p-8'
  }

  const hoverEffects = hoverable ? {
    default: 'hover:border-neon-blue/50 hover:shadow-lg',
    glass: 'hover:bg-dark-700/60 hover:border-neon-blue/30',
    neon: 'hover:shadow-glow hover:border-neon-purple',
    elevated: 'hover:shadow-glow hover:-translate-y-1'
  } : {}

  const glowEffect = glowing ? 'shadow-neon hover:shadow-glow' : ''
  const hoverEffect = hoverable ? (hoverEffects[variant] || '') : ''

  return (
    <div
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${paddings[padding]} 
        ${glowEffect}
        ${hoverEffect}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </div>
  )
}

// サブコンポーネント
export function CardHeader({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`mb-4 ${className}`}>
      {children}
    </div>
  )
}

export function CardTitle({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <h3 className={`font-cyber font-semibold text-lg text-white mb-2 ${className}`}>
      {children}
    </h3>
  )
}

export function CardContent({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`text-gray-300 ${className}`}>
      {children}
    </div>
  )
}

export function CardFooter({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={`mt-4 flex items-center justify-between ${className}`}>
      {children}
    </div>
  )
}