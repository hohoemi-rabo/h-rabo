import React from 'react'

export interface IconProps {
  name: string
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | number
  className?: string
  color?: 'default' | 'neon-blue' | 'neon-purple' | 'neon-green' | 'neon-pink' | 'white' | 'gray'
  glowing?: boolean
}

// サイバー風のSVGアイコンセット
const icons = {
  // Navigation icons
  menu: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  ),
  close: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  ),
  arrow_right: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  ),
  arrow_left: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  ),
  arrow_down: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
  ),
  arrow_up: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
  ),

  // Tech/Cyber icons
  cpu: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" strokeWidth={2} fill="none" />
      <rect x="9" y="9" width="6" height="6" strokeWidth={2} fill="none" />
      <line x1="9" y1="1" x2="9" y2="4" strokeWidth={2} />
      <line x1="15" y1="1" x2="15" y2="4" strokeWidth={2} />
      <line x1="9" y1="20" x2="9" y2="23" strokeWidth={2} />
      <line x1="15" y1="20" x2="15" y2="23" strokeWidth={2} />
      <line x1="20" y1="9" x2="23" y2="9" strokeWidth={2} />
      <line x1="20" y1="14" x2="23" y2="14" strokeWidth={2} />
      <line x1="1" y1="9" x2="4" y2="9" strokeWidth={2} />
      <line x1="1" y1="14" x2="4" y2="14" strokeWidth={2} />
    </>
  ),
  circuit: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" strokeWidth={2} fill="none" />
      <circle cx="8" cy="8" r="2" strokeWidth={2} fill="none" />
      <circle cx="16" cy="8" r="2" strokeWidth={2} fill="none" />
      <circle cx="12" cy="16" r="2" strokeWidth={2} fill="none" />
      <path d="M10 8h4M12 10v4" strokeWidth={2} />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5" rx="9" ry="3" strokeWidth={2} fill="none" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" strokeWidth={2} fill="none" />
      <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" strokeWidth={2} fill="none" />
    </>
  ),
  network: (
    <>
      <circle cx="12" cy="12" r="2" strokeWidth={2} fill="none" />
      <circle cx="6" cy="6" r="2" strokeWidth={2} fill="none" />
      <circle cx="18" cy="6" r="2" strokeWidth={2} fill="none" />
      <circle cx="6" cy="18" r="2" strokeWidth={2} fill="none" />
      <circle cx="18" cy="18" r="2" strokeWidth={2} fill="none" />
      <path d="M8 6l6 6M8 18l6-6M6 8v8M18 8v8" strokeWidth={2} />
    </>
  ),

  // Communication icons
  email: (
    <>
      <rect x="2" y="4" width="20" height="16" rx="2" ry="2" strokeWidth={2} fill="none" />
      <path d="M22 6L12 13L2 6" strokeWidth={2} />
    </>
  ),
  phone: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  ),
  location: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
  ),

  // UI icons
  check: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
  ),
  error: (
    <>
      <circle cx="12" cy="12" r="10" strokeWidth={2} fill="none" />
      <line x1="15" y1="9" x2="9" y2="15" strokeWidth={2} />
      <line x1="9" y1="9" x2="15" y2="15" strokeWidth={2} />
    </>
  ),
  warning: (
    <>
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" strokeWidth={2} fill="none" />
      <line x1="12" y1="9" x2="12" y2="13" strokeWidth={2} />
      <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2} />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="10" strokeWidth={2} fill="none" />
      <line x1="12" y1="16" x2="12" y2="12" strokeWidth={2} />
      <line x1="12" y1="8" x2="12.01" y2="8" strokeWidth={2} />
    </>
  ),

  // Cyber-specific icons
  shield: (
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 1l9 3v8c0 6-9 12-9 12s-9-6-9-12V4l9-3z" fill="none" />
  ),
  lock: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeWidth={2} fill="none" />
      <circle cx="12" cy="7" r="4" strokeWidth={2} fill="none" />
      <path d="M8 11V7a4 4 0 018 0v4" strokeWidth={2} />
    </>
  ),
  key: (
    <>
      <circle cx="8" cy="16" r="6" strokeWidth={2} fill="none" />
      <path d="M16 10l6-6M20 2l2 2M14 12l2 2" strokeWidth={2} />
    </>
  ),
  power: (
    <>
      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" strokeWidth={2} fill="none" />
      <line x1="12" y1="2" x2="12" y2="12" strokeWidth={2} />
    </>
  )
}

export default function Icon({ 
  name, 
  size = 'md', 
  className = '', 
  color = 'default',
  glowing = false 
}: IconProps) {
  const sizes = typeof size === 'number' ? { width: size, height: size } : {
    xs: { width: 16, height: 16 },
    sm: { width: 20, height: 20 },
    md: { width: 24, height: 24 },
    lg: { width: 32, height: 32 },
    xl: { width: 40, height: 40 }
  }[size]

  const colors = {
    default: 'text-current',
    'neon-blue': 'text-neon-blue',
    'neon-purple': 'text-neon-purple',
    'neon-green': 'text-neon-green',
    'neon-pink': 'text-neon-pink',
    white: 'text-white',
    gray: 'text-gray-400'
  }

  const glowEffect = glowing ? 'drop-shadow-[0_0_8px_currentColor]' : ''

  const iconPath = icons[name as keyof typeof icons]

  if (!iconPath) {
    console.warn(`Icon "${name}" not found`)
    return null
  }

  return (
    <svg
      width={sizes.width}
      height={sizes.height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      className={`${colors[color]} ${glowEffect} ${className}`}
    >
      {iconPath}
    </svg>
  )
}

// 利用可能なアイコンの型定義をエクスポート
export type IconName = keyof typeof icons