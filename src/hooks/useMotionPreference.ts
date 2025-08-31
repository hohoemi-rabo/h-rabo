'use client'

import { useState, useEffect } from 'react'

/**
 * ユーザーのモーション設定を検出するカスタムフック
 * prefers-reduced-motionメディアクエリを監視
 */
export function useMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    
    if (typeof window === 'undefined') return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handler)

    return () => {
      mediaQuery.removeEventListener('change', handler)
    }
  }, [])

  return {
    prefersReducedMotion,
    isClient,
    // 安全なアニメーション設定を提供
    getSafeAnimationConfig: () => ({
      duration: prefersReducedMotion ? 0.01 : undefined,
      transition: prefersReducedMotion 
        ? { duration: 0.01, type: 'tween' }
        : undefined
    })
  }
}

/**
 * デバイス性能に基づくアニメーション品質の判定
 */
export function useAnimationQuality() {
  const [animationQuality, setAnimationQuality] = useState<'high' | 'medium' | 'low'>('high')

  useEffect(() => {
    if (typeof window === 'undefined') return

    // GPU性能の簡易判定
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    
    if (!gl) {
      setAnimationQuality('low')
      return
    }

    // デバイスメモリやCPUコア数で判定
    const deviceMemory = (navigator as any).deviceMemory || 4
    const hardwareConcurrency = navigator.hardwareConcurrency || 4
    const isMobile = /Mobi|Android/i.test(navigator.userAgent)

    if (isMobile || deviceMemory < 4 || hardwareConcurrency < 4) {
      setAnimationQuality('medium')
    } else if (deviceMemory >= 8 && hardwareConcurrency >= 8) {
      setAnimationQuality('high')
    } else {
      setAnimationQuality('medium')
    }

    // クリーンアップ
    canvas.remove()
  }, [])

  return {
    animationQuality,
    shouldUseGPU: animationQuality === 'high',
    maxParticles: animationQuality === 'high' ? 30 : animationQuality === 'medium' ? 15 : 5,
    transitionDuration: animationQuality === 'high' ? 1 : animationQuality === 'medium' ? 0.8 : 0.5
  }
}