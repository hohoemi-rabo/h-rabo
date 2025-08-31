'use client'

import { useState, useEffect } from 'react'

/**
 * カスタムメディアクエリフック
 * 指定されたメディアクエリの状態を監視
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

/**
 * ブレークポイント検出フック
 * 現在のスクリーンサイズを判定
 */
export function useBreakpoints() {
  const isXs = useMediaQuery('(max-width: 474px)')
  const isSm = useMediaQuery('(min-width: 475px) and (max-width: 639px)')
  const isMd = useMediaQuery('(min-width: 640px) and (max-width: 767px)')
  const isMdLg = useMediaQuery('(min-width: 768px) and (max-width: 895px)')
  const isLg = useMediaQuery('(min-width: 896px) and (max-width: 1023px)')
  const isXl = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)')
  const is2xl = useMediaQuery('(min-width: 1280px) and (max-width: 1535px)')
  const is3xl = useMediaQuery('(min-width: 1536px)')

  // デバイス判定
  const isMobile = isXs || isSm
  const isTablet = isMd || isMdLg
  const isDesktop = isLg || isXl || is2xl || is3xl

  return {
    isXs,
    isSm,
    isMd,
    isMdLg,
    isLg,
    isXl,
    is2xl,
    is3xl,
    isMobile,
    isTablet,
    isDesktop,
    // 現在のブレークポイント名を取得
    currentBreakpoint: isXs ? 'xs' :
                      isSm ? 'sm' :
                      isMd ? 'md' :
                      isMdLg ? 'md-lg' :
                      isLg ? 'lg' :
                      isXl ? 'xl' :
                      is2xl ? '2xl' :
                      '3xl'
  }
}

/**
 * 高さベースのブレークポイントフック
 */
export function useHeightBreakpoints() {
  const isHSm = useMediaQuery('(min-height: 640px)')
  const isHMd = useMediaQuery('(min-height: 768px)')
  const isHLg = useMediaQuery('(min-height: 1024px)')

  return {
    isHSm,
    isHMd,
    isHLg,
    isShortScreen: !isHSm,
    isRegularScreen: isHSm && !isHLg,
    isTallScreen: isHLg
  }
}

/**
 * デバイス機能検出フック
 */
export function useDeviceCapabilities() {
  const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)')
  const hasHover = useMediaQuery('(hover: hover) and (pointer: fine)')
  const isRetina = useMediaQuery('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')

  return {
    isTouchDevice,
    hasHover,
    isRetina,
    prefersReducedMotion,
    prefersDark,
    // デバイスタイプ推定
    deviceType: isTouchDevice ? 'mobile' : hasHover ? 'desktop' : 'unknown'
  }
}