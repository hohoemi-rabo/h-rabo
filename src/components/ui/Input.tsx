import React, { forwardRef } from 'react'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'cyber' | 'neon'
  className?: string
  containerClassName?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  containerClassName = '',
  disabled,
  ...props
}, ref) => {
  const baseInputStyles = 'w-full rounded-lg px-4 py-3 transition-all duration-300 focus:outline-none font-futura placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed'
  
  const variants = {
    default: `
      bg-dark-800 border text-white
      ${error 
        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
        : 'border-dark-600 focus:border-neon-blue focus:shadow-neon'
      }
    `,
    cyber: `
      bg-dark-700/50 border backdrop-blur-sm text-white
      ${error
        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.6)]'
        : 'border-dark-500 focus:border-neon-blue focus:shadow-[0_0_15px_rgba(0,212,255,0.4)]'
      }
    `,
    neon: `
      bg-dark-800/80 border text-white shadow-sm
      ${error
        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.7)]'
        : 'border-neon-blue/50 focus:border-neon-blue focus:shadow-neon'
      }
    `
  }

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block font-futura text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={`${baseInputStyles} ${variants[variant]} ${className}`.replace(/\s+/g, ' ').trim()}
          {...props}
        />
        
        {/* Focus ring effect for cyber variant */}
        {variant === 'cyber' && (
          <div className="absolute inset-0 rounded-lg pointer-events-none opacity-0 focus-within:opacity-100 transition-opacity duration-300">
            <div className="absolute inset-0 rounded-lg bg-neon-blue/10 blur-sm"></div>
          </div>
        )}
      </div>
      
      {error && (
        <p className="font-futura mt-2 text-sm text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="font-futura mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input

// Textarea component
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  helperText?: string
  variant?: 'default' | 'cyber' | 'neon'
  containerClassName?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  error,
  helperText,
  variant = 'default',
  className = '',
  containerClassName = '',
  disabled,
  rows = 4,
  ...props
}, ref) => {
  const baseStyles = 'w-full rounded-lg px-4 py-3 transition-all duration-300 focus:outline-none font-futura placeholder:text-gray-400 disabled:opacity-50 disabled:cursor-not-allowed resize-vertical'
  
  const variants = {
    default: `
      bg-dark-800 border text-white
      ${error 
        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.5)]' 
        : 'border-dark-600 focus:border-neon-blue focus:shadow-neon'
      }
    `,
    cyber: `
      bg-dark-700/50 border backdrop-blur-sm text-white
      ${error
        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_15px_rgba(239,68,68,0.6)]'
        : 'border-dark-500 focus:border-neon-blue focus:shadow-[0_0_15px_rgba(0,212,255,0.4)]'
      }
    `,
    neon: `
      bg-dark-800/80 border text-white shadow-sm
      ${error
        ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_20px_rgba(239,68,68,0.7)]'
        : 'border-neon-blue/50 focus:border-neon-blue focus:shadow-neon'
      }
    `
  }

  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="block font-futura text-sm font-medium text-gray-300 mb-2">
          {label}
        </label>
      )}
      
      <textarea
        ref={ref}
        rows={rows}
        disabled={disabled}
        className={`${baseStyles} ${variants[variant]} ${className}`.replace(/\s+/g, ' ').trim()}
        {...props}
      />
      
      {error && (
        <p className="font-futura mt-2 text-sm text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="font-futura mt-2 text-sm text-gray-500">
          {helperText}
        </p>
      )}
    </div>
  )
})

Textarea.displayName = 'Textarea'