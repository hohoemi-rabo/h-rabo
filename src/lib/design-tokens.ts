/**
 * Design Tokens for Cyber-themed UI Design System
 * ほほ笑みラボ - サイバーデザインシステム
 */

export const designTokens = {
  colors: {
    // Primary Colors (Neon)
    primary: {
      blue: 'var(--neon-blue)',
      purple: 'var(--neon-purple)',
      green: 'var(--neon-green)',
      pink: 'var(--neon-pink)',
      yellow: 'var(--neon-yellow)',
      cyan: 'var(--neon-cyan)',
    },
    
    // Background Colors
    background: {
      primary: 'var(--dark-900)',    // #0a0a0a
      secondary: 'var(--dark-800)',  // #1a1a1a
      card: 'var(--dark-700)',       // #2a2a2a
      border: 'var(--dark-600)',     // #3a3a3a
    },
    
    // Text Colors
    text: {
      primary: '#ffffff',
      secondary: '#e0e0e0',
      muted: '#a0a0a0',
      neon: 'var(--neon-blue)',
    },
  },
  
  // Typography
  typography: {
    fontFamily: {
      heading: 'font-cyber',      // Orbitron
      body: 'font-sans',          // Geist Sans
      mono: 'font-mono-cyber',    // JetBrains Mono
    },
    
    fontSize: {
      xs: 'text-xs',
      sm: 'text-sm',
      base: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
    },
    
    fontWeight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
  },
  
  // Effects & Shadows
  effects: {
    shadow: {
      neon: 'shadow-neon',
      neonStrong: 'shadow-neon-strong',
      glow: 'shadow-glow',
      glowStrong: 'shadow-glow-strong',
      cyber: 'shadow-cyber',
      cyberInset: 'shadow-cyber-inset',
      pink: 'shadow-neon-pink',
      green: 'shadow-neon-green',
    },
    
    animation: {
      glow: 'animate-glow',
      pulseNeon: 'animate-pulse-neon',
      float: 'animate-float',
    },
    
    background: {
      cyberGrid: 'cyber-grid',
      neonText: 'neon-text',
      neonTextPurple: 'neon-text-purple',
      neonTextGreen: 'neon-text-green',
    },
  },
  
  // Component Classes
  components: {
    button: {
      cyber: 'cyber-button',
      neon: 'bg-gradient-to-r from-neon-blue to-neon-purple hover:shadow-neon',
    },
    
    card: {
      cyber: 'cyber-card',
      neon: 'bg-dark-700 border border-dark-600 shadow-cyber',
    },
    
    border: {
      cyber: 'cyber-border',
      neon: 'border-neon-blue shadow-neon',
    },
    
    text: {
      glitch: 'glitch-text',
      neon: 'neon-text',
      hero: 'font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink',
    },
  },
  
  // Spacing
  spacing: {
    xs: '0.5rem',    // 8px
    sm: '1rem',      // 16px
    md: '1.5rem',    // 24px
    lg: '2rem',      // 32px
    xl: '3rem',      // 48px
    '2xl': '4rem',   // 64px
    '3xl': '6rem',   // 96px
  },
  
  // Breakpoints
  breakpoints: {
    xs: '475px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const

// Type definitions for better TypeScript support
export type ColorToken = keyof typeof designTokens.colors
export type TypographyToken = keyof typeof designTokens.typography
export type EffectToken = keyof typeof designTokens.effects
export type ComponentToken = keyof typeof designTokens.components

// Helper functions for easier access  
export const getColor = (path: string): string => {
  const result = path.split('.').reduce((obj: Record<string, unknown>, key) => {
    return (obj[key] as Record<string, unknown>) || {}
  }, designTokens.colors as unknown as Record<string, unknown>)
  return result as unknown as string
}

export const getEffect = (category: keyof typeof designTokens.effects, name: string): string => {
  const effectCategory = designTokens.effects[category] as Record<string, string>
  return effectCategory?.[name] || ''
}

export const getComponent = (category: keyof typeof designTokens.components, variant: string): string => {
  const componentCategory = designTokens.components[category] as Record<string, string>
  return componentCategory?.[variant] || ''
}

// CSS Custom Properties mapping
export const cssVariables = {
  '--neon-blue': '#00d4ff',
  '--neon-purple': '#8b5cf6',
  '--neon-green': '#00ff88',
  '--neon-pink': '#ff0080',
  '--neon-yellow': '#ffff00',
  '--neon-cyan': '#00ffff',
  '--dark-900': '#0a0a0a',
  '--dark-800': '#1a1a1a',
  '--dark-700': '#2a2a2a',
  '--dark-600': '#3a3a3a',
} as const

export default designTokens