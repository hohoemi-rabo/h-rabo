'use client'

import { useState, useEffect, useCallback } from 'react'
import { useDeviceDetection, getPerformanceSettings } from './useDeviceDetection'

export interface PerformanceMetrics {
  fps: number
  memory: number | null
  connectionSpeed: 'slow' | 'medium' | 'fast'
  renderTime: number
  isHighPerformance: boolean
  batteryLevel?: number
  isLowPowerMode?: boolean
}

/**
 * パフォーマンス監視とデバイス最適化フック
 */
export function usePerformance() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memory: null,
    connectionSpeed: 'medium',
    renderTime: 0,
    isHighPerformance: true
  })

  const deviceInfo = useDeviceDetection()
  const performanceSettings = getPerformanceSettings(deviceInfo)

  // FPS監視
  const measureFPS = useCallback(() => {
    let fps = 0
    let lastTime = performance.now()
    let frameCount = 0

    const measureFrame = (currentTime: number) => {
      frameCount++
      const deltaTime = currentTime - lastTime

      if (deltaTime >= 1000) {
        fps = Math.round((frameCount * 1000) / deltaTime)
        frameCount = 0
        lastTime = currentTime

        setMetrics(prev => ({ ...prev, fps }))
      }

      requestAnimationFrame(measureFrame)
    }

    requestAnimationFrame(measureFrame)
  }, [])

  // メモリ使用量監視
  const measureMemory = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as { memory: { usedJSHeapSize: number } }).memory
      const memoryMB = Math.round(memory.usedJSHeapSize / 1048576)
      
      setMetrics(prev => ({ ...prev, memory: memoryMB }))
    }
  }, [])

  // ネットワーク速度検出
  const detectConnectionSpeed = useCallback(() => {
    if ('connection' in navigator) {
      const connection = (navigator as { connection: { effectiveType: string } }).connection
      const effectiveType = connection.effectiveType

      let speed: 'slow' | 'medium' | 'fast' = 'medium'
      
      switch (effectiveType) {
        case 'slow-2g':
        case '2g':
          speed = 'slow'
          break
        case '3g':
          speed = 'medium'
          break
        case '4g':
          speed = 'fast'
          break
        default:
          speed = 'medium'
      }

      setMetrics(prev => ({ ...prev, connectionSpeed: speed }))
    }
  }, [])

  // バッテリー情報取得
  const getBatteryInfo = useCallback(async () => {
    if ('getBattery' in navigator) {
      try {
        const battery = await (navigator as { getBattery: () => Promise<{ level: number }> }).getBattery()
        setMetrics(prev => ({
          ...prev,
          batteryLevel: Math.round(battery.level * 100),
          isLowPowerMode: battery.level < 0.2
        }))
      } catch {
        // バッテリー情報が取得できない場合は無視
      }
    }
  }, [])

  // レンダリング時間測定
  const measureRenderTime = useCallback((startTime: number) => {
    const renderTime = performance.now() - startTime
    setMetrics(prev => ({ ...prev, renderTime }))
  }, [])

  // 高パフォーマンスデバイス判定
  const checkHighPerformance = useCallback(() => {
    const isHighPerf = 
      deviceInfo.supportsWebGL &&
      !deviceInfo.isMobile &&
      metrics.fps >= 50 &&
      (metrics.memory === null || metrics.memory < 500) &&
      metrics.connectionSpeed !== 'slow'

    setMetrics(prev => ({ ...prev, isHighPerformance: isHighPerf }))
  }, [deviceInfo, metrics.fps, metrics.memory, metrics.connectionSpeed])

  // 初期化とクリーンアップ
  useEffect(() => {
    let intervalId: NodeJS.Timeout | undefined

    // 初回測定
    detectConnectionSpeed()
    getBatteryInfo()
    measureFPS()

    // 定期的なメトリクス更新
    intervalId = setInterval(() => {
      measureMemory()
      checkHighPerformance()
    }, 5000) // 5秒間隔

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [detectConnectionSpeed, getBatteryInfo, measureFPS, measureMemory, checkHighPerformance])

  return {
    metrics,
    performanceSettings,
    measureRenderTime,
    // パフォーマンス最適化されたコンポーネント設定
    getOptimalSettings: () => ({
      ...performanceSettings,
      // FPSに基づくアニメーション調整
      animationDuration: metrics.fps < 30 ? 'slow' : metrics.fps > 50 ? 'fast' : 'medium',
      // メモリ使用量に基づくキャッシュサイズ
      maxCacheSize: metrics.memory && metrics.memory > 200 ? 'small' : 'large',
      // バッテリー状態に基づく最適化
      batteryOptimized: metrics.isLowPowerMode || (metrics.batteryLevel && metrics.batteryLevel < 30)
    })
  }
}

/**
 * リアルタイムパフォーマンス監視フック
 * 開発環境でのみ使用を推奨
 */
export function usePerformanceMonitor(enabled: boolean = false) {
  const [performanceData, setPerformanceData] = useState<{
    navigationTiming: PerformanceNavigationTiming | null
    resourceTiming: PerformanceResourceTiming[]
    paintTiming: PerformanceEntry[]
  }>({
    navigationTiming: null,
    resourceTiming: [],
    paintTiming: []
  })

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    // Navigation Timing
    const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    // Resource Timing
    const resourceTiming = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
    
    // Paint Timing
    const paintTiming = performance.getEntriesByType('paint')

    setPerformanceData({
      navigationTiming: navTiming,
      resourceTiming,
      paintTiming
    })

    // Performance Observer for real-time monitoring
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries()
        
        entries.forEach(entry => {
          if (process.env.NODE_ENV === 'development') {
            console.log(`Performance: ${entry.entryType} - ${entry.name}: ${entry.duration}ms`)
          }
        })
      })

      observer.observe({ entryTypes: ['measure', 'navigation', 'resource', 'paint'] })

      return () => observer.disconnect()
    }
  }, [enabled])

  return {
    performanceData,
    // Core Web Vitals の計算
    getCoreWebVitals: () => {
      const { navigationTiming, paintTiming } = performanceData
      
      if (!navigationTiming) return null

      const fcp = paintTiming.find(entry => entry.name === 'first-contentful-paint')?.startTime || 0
      const lcp = 0 // LCP は別途 PerformanceObserver で取得が必要
      const cls = 0 // CLS も同様
      const fid = 0 // FID も同様

      return {
        fcp: Math.round(fcp),
        lcp: Math.round(lcp),
        cls: Math.round(cls * 1000) / 1000,
        fid: Math.round(fid),
        ttfb: Math.round(navigationTiming.responseStart - navigationTiming.requestStart)
      }
    }
  }
}