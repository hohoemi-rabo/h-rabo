'use client'

import { useState, useEffect } from 'react'
import { useMediaQuery } from './useMediaQuery'

export interface DeviceInfo {
  isTouchDevice: boolean
  isDesktop: boolean
  isMobile: boolean
  isTablet: boolean
  screenWidth: number
  screenHeight: number
  pixelRatio: number
  orientation: 'portrait' | 'landscape'
  hasHover: boolean
  supportsWebGL: boolean
  supportsTouchEvents: boolean
  isRetina: boolean
  deviceType: 'mobile' | 'desktop' | 'unknown'
}

/**
 * デバイス検出とデバイス情報を提供するフック
 */
export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isTouchDevice: false,
    isDesktop: false,
    isMobile: false,
    isTablet: false,
    screenWidth: 0,
    screenHeight: 0,
    pixelRatio: 1,
    orientation: 'landscape',
    hasHover: false,
    supportsWebGL: false,
    supportsTouchEvents: false,
    isRetina: false,
    deviceType: 'unknown',
  })

  // メディアクエリベースの検出
  const isTouchQuery = useMediaQuery('(hover: none) and (pointer: coarse)')
  const hasHoverQuery = useMediaQuery('(hover: hover) and (pointer: fine)')
  const isRetinaQuery = useMediaQuery('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)')

  useEffect(() => {
    if (typeof window === 'undefined') return

    const updateDeviceInfo = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelRatio = window.devicePixelRatio || 1

      // デバイスタイプの判定
      const isMobile = width < 768
      const isTablet = width >= 768 && width < 1024
      const isDesktop = width >= 1024

      // WebGLサポート検出
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      const supportsWebGL = !!gl

      // タッチイベントサポート検出
      const supportsTouchEvents = 'ontouchstart' in window || 
                                navigator.maxTouchPoints > 0 ||
                                ('msMaxTouchPoints' in navigator && (navigator as { msMaxTouchPoints: number }).msMaxTouchPoints > 0)

      setDeviceInfo({
        isTouchDevice: isTouchQuery,
        isDesktop,
        isMobile,
        isTablet,
        screenWidth: width,
        screenHeight: height,
        pixelRatio,
        orientation: width > height ? 'landscape' : 'portrait',
        hasHover: hasHoverQuery,
        supportsWebGL,
        supportsTouchEvents,
        isRetina: isRetinaQuery,
        deviceType: isMobile ? 'mobile' : isDesktop ? 'desktop' : 'unknown',
      })
    }

    updateDeviceInfo()
    
    const handleResize = () => updateDeviceInfo()
    const handleOrientationChange = () => {
      // オリエンテーション変更後の処理を遅延実行
      setTimeout(updateDeviceInfo, 100)
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleOrientationChange)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleOrientationChange)
    }
  }, [isTouchQuery, hasHoverQuery, isRetinaQuery])

  return deviceInfo
}

/**
 * デバイス最適化のためのユーティリティ関数
 */
export function getOptimalImageSize(deviceInfo: DeviceInfo): { width: number, height: number, quality: number } {
  const { screenWidth, isRetina, isMobile } = deviceInfo
  
  let width = screenWidth
  let quality = 80

  if (isRetina) {
    width = screenWidth * 2
    quality = 85
  }

  if (isMobile && screenWidth < 480) {
    quality = 75 // モバイルでは品質を少し下げて高速化
  }

  return {
    width: Math.ceil(width),
    height: Math.ceil(width * 0.6), // 16:10のアスペクト比
    quality
  }
}

/**
 * パフォーマンス最適化のためのデバイス設定
 */
export function getPerformanceSettings(deviceInfo: DeviceInfo) {
  const { isMobile, supportsWebGL, pixelRatio } = deviceInfo

  return {
    // アニメーションの品質レベル
    animationQuality: isMobile ? 'low' : supportsWebGL ? 'high' : 'medium',
    // パーティクル数
    maxParticles: isMobile ? 20 : supportsWebGL ? 100 : 50,
    // レンダリング品質
    renderScale: pixelRatio > 1 ? Math.min(pixelRatio, 2) : 1,
    // 3D効果の有効/無効
    enable3D: supportsWebGL && !isMobile,
    // 遅延読み込みの閾値
    lazyLoadThreshold: isMobile ? '50px' : '100px'
  }
}