import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  loading?: boolean
  disabled?: boolean
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  loading = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}: ButtonProps) {
  const baseStyles = 'font-cyber font-semibold rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-800 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed'

  const variants = {
    primary: 'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon hover:shadow-glow focus:ring-neon-blue disabled:hover:shadow-neon',
    secondary: 'border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-900 hover:shadow-neon focus:ring-neon-blue disabled:hover:bg-transparent disabled:hover:text-neon-blue',
    ghost: 'text-neon-green hover:text-white hover:bg-neon-green/20 focus:ring-neon-green disabled:hover:bg-transparent disabled:hover:text-neon-green',
    danger: 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:from-red-600 hover:to-red-700 focus:ring-red-500'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      disabled={isDisabled}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-inherit">
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <span className={loading ? 'opacity-0' : 'opacity-100'}>
        {children}
      </span>
    </button>
  )
}