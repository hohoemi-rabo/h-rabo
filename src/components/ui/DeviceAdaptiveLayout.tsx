'use client'

import React from 'react'
import { useDeviceDetection } from '@/hooks/useDeviceDetection'
import { useBreakpoints, useDeviceCapabilities } from '@/hooks/useMediaQuery'
import { useAccessibility } from '@/contexts/AccessibilityContext'

export interface DeviceAdaptiveLayoutProps {
  children: React.ReactNode
  /** モバイル専用コンテンツ */
  mobileContent?: React.ReactNode
  /** タブレット専用コンテンツ */
  tabletContent?: React.ReactNode
  /** デスクトップ専用コンテンツ */
  desktopContent?: React.ReactNode
  /** 大画面専用コンテンツ */
  largeScreenContent?: React.ReactNode
  /** フォールディングデバイス用コンテンツ */
  foldableContent?: React.ReactNode
  /** デバイス機能に基づく表示制御 */
  requiresWebGL?: boolean
  requiresTouch?: boolean
  className?: string
}

/**
 * デバイス特性に応じてUIを最適化するアダプティブレイアウトコンポーネント
 */
export default function DeviceAdaptiveLayout({
  children,
  mobileContent,
  tabletContent,
  desktopContent,
  largeScreenContent,
  foldableContent,
  requiresWebGL = false,
  requiresTouch = false,
  className = ''
}: DeviceAdaptiveLayoutProps) {
  const deviceInfo = useDeviceDetection()
  const { isMobile, isTablet, isDesktop, is3xl } = useBreakpoints()
  const { isTouchDevice, hasHover } = useDeviceCapabilities()
  const { fontSize, reducedMotion } = useAccessibility()

  // デバイス要件チェック
  const meetsRequirements = () => {
    if (requiresWebGL && !deviceInfo.supportsWebGL) return false
    if (requiresTouch && !isTouchDevice) return false
    return true
  }

  // フォールディングデバイス検出（実験的）
  const isFoldable = () => {
    // CSS環境変数または画面比率から推測
    return deviceInfo.screenWidth / deviceInfo.screenHeight > 2.5 ||
           window.matchMedia('(display-mode: window-controls-overlay)').matches
  }

  // デバイス別クラス生成
  const getDeviceClasses = () => {
    const classes = []
    
    if (isMobile) classes.push('device-mobile')
    if (isTablet) classes.push('device-tablet')
    if (isDesktop) classes.push('device-desktop')
    if (is3xl) classes.push('device-large')
    if (isTouchDevice) classes.push('touch-device')
    if (hasHover) classes.push('hover-device')
    if (deviceInfo.isRetina) classes.push('retina-device')
    if (deviceInfo.orientation === 'portrait') classes.push('portrait-mode')
    if (deviceInfo.orientation === 'landscape') classes.push('landscape-mode')
    if (fontSize === 'senior') classes.push('senior-ui')
    if (reducedMotion) classes.push('reduced-motion-ui')
    
    return classes.join(' ')
  }

  // 要件を満たさない場合のフォールバック
  if (!meetsRequirements()) {
    return (
      <div className={`device-fallback ${className}`}>
        <div className="text-center text-gray-400 p-8">
          <p>このコンテンツはお使いのデバイスには対応していません。</p>
        </div>
      </div>
    )
  }

  // デバイス特化コンテンツの選択
  const getSpecificContent = () => {
    // フォールディングデバイス
    if (foldableContent && isFoldable()) {
      return foldableContent
    }
    
    // 大画面デスクトップ
    if (largeScreenContent && is3xl) {
      return largeScreenContent
    }
    
    // デスクトップ
    if (desktopContent && isDesktop && !isMobile && !isTablet) {
      return desktopContent
    }
    
    // タブレット
    if (tabletContent && isTablet) {
      return tabletContent
    }
    
    // モバイル
    if (mobileContent && isMobile) {
      return mobileContent
    }
    
    return null
  }

  const specificContent = getSpecificContent()

  return (
    <div 
      className={`device-adaptive-layout ${getDeviceClasses()} ${className}`}
      data-device-type={deviceInfo.deviceType}
      data-screen-size={deviceInfo.isMobile ? 'small' : deviceInfo.isTablet ? 'medium' : 'large'}
      data-orientation={deviceInfo.orientation}
      data-pixel-ratio={deviceInfo.pixelRatio}
      style={{
        '--screen-width': `${deviceInfo.screenWidth}px`,
        '--screen-height': `${deviceInfo.screenHeight}px`,
        '--pixel-ratio': deviceInfo.pixelRatio,
      } as React.CSSProperties}
    >
      {specificContent || children}
    </div>
  )
}

/**
 * 条件付きレンダリングコンポーネント
 */
export function ShowOn({
  children,
  mobile = false,
  tablet = false,
  desktop = false,
  touch = false,
  hover = false,
  webgl = false,
  retina = false,
  landscape = false,
  portrait = false
}: {
  children: React.ReactNode
  mobile?: boolean
  tablet?: boolean
  desktop?: boolean
  touch?: boolean
  hover?: boolean
  webgl?: boolean
  retina?: boolean
  landscape?: boolean
  portrait?: boolean
}) {
  const { isMobile, isTablet, isDesktop } = useBreakpoints()
  const { isTouchDevice, hasHover } = useDeviceCapabilities()
  const deviceInfo = useDeviceDetection()

  const shouldShow = 
    (!mobile || isMobile) &&
    (!tablet || isTablet) &&
    (!desktop || isDesktop) &&
    (!touch || isTouchDevice) &&
    (!hover || hasHover) &&
    (!webgl || deviceInfo.supportsWebGL) &&
    (!retina || deviceInfo.isRetina) &&
    (!landscape || deviceInfo.orientation === 'landscape') &&
    (!portrait || deviceInfo.orientation === 'portrait')

  return shouldShow ? <>{children}</> : null
}

/**
 * デバイス別スタイリングコンポーネント
 */
export function AdaptiveStyles({
  mobile,
  tablet,
  desktop,
  touch,
  hover,
  children
}: {
  mobile?: string
  tablet?: string
  desktop?: string
  touch?: string
  hover?: string
  children: React.ReactNode
}) {
  const { isMobile, isTablet, isDesktop } = useBreakpoints()
  const { isTouchDevice, hasHover } = useDeviceCapabilities()

  const getClassNames = () => {
    const classes = []
    
    if (mobile && isMobile) classes.push(mobile)
    if (tablet && isTablet) classes.push(tablet)
    if (desktop && isDesktop) classes.push(desktop)
    if (touch && isTouchDevice) classes.push(touch)
    if (hover && hasHover) classes.push(hover)
    
    return classes.join(' ')
  }

  return (
    <div className={getClassNames()}>
      {children}
    </div>
  )
}