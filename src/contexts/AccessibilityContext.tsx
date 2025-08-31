'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export interface AccessibilityContextType {
  fontSize: 'normal' | 'large' | 'senior'
  setFontSize: (size: 'normal' | 'large' | 'senior') => void
  contrast: 'normal' | 'high'
  setContrast: (contrast: 'normal' | 'high') => void
  reducedMotion: boolean
  setReducedMotion: (reduced: boolean) => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider')
  }
  return context
}

interface AccessibilityProviderProps {
  children: React.ReactNode
}

export function AccessibilityProvider({ children }: AccessibilityProviderProps) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'senior'>('normal')
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal')
  const [reducedMotion, setReducedMotion] = useState(false)

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedFontSize = localStorage.getItem('fontSize') as 'normal' | 'large' | 'senior'
    const savedContrast = localStorage.getItem('contrast') as 'normal' | 'high'
    const savedReducedMotion = localStorage.getItem('reducedMotion') === 'true'

    if (savedFontSize) setFontSize(savedFontSize)
    if (savedContrast) setContrast(savedContrast)
    setReducedMotion(savedReducedMotion)

    // Check system preference for reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(prefersReducedMotion.matches)

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    prefersReducedMotion.addEventListener('change', handleMotionChange)
    return () => prefersReducedMotion.removeEventListener('change', handleMotionChange)
  }, [])

  // Save settings to localStorage when changed
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize)
  }, [fontSize])

  useEffect(() => {
    localStorage.setItem('contrast', contrast)
  }, [contrast])

  useEffect(() => {
    localStorage.setItem('reducedMotion', reducedMotion.toString())
  }, [reducedMotion])

  // Apply classes to body element
  useEffect(() => {
    const body = document.body
    
    // Remove all accessibility classes first
    body.classList.remove('senior-mode', 'large-font-mode', 'high-contrast', 'reduced-motion')
    
    // Apply font size class
    if (fontSize === 'senior') {
      body.classList.add('senior-mode')
    } else if (fontSize === 'large') {
      body.classList.add('large-font-mode')
    }
    
    // Apply contrast class
    if (contrast === 'high') {
      body.classList.add('high-contrast')
    }
    
    // Apply reduced motion class
    if (reducedMotion) {
      body.classList.add('reduced-motion')
    }
  }, [fontSize, contrast, reducedMotion])

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        contrast,
        setContrast,
        reducedMotion,
        setReducedMotion,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export default AccessibilityProvider