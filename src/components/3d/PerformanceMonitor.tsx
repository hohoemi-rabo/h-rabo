'use client'

import { useEffect, useRef, useState } from 'react'
import { useSceneStore } from '@/store/sceneStore'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  gpuUtilization: number
  renderTime: number
}

/**
 * 3D遷移システムのパフォーマンスモニタリング
 * フレームレート、メモリ使用量、GPU使用率を監視し、
 * 必要に応じて品質を自動調整
 */
export default function PerformanceMonitor() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 60,
    memoryUsage: 0,
    renderTime: 0,
    gpuUtilization: 0
  })

  const frameCountRef = useRef(0)
  const lastTimeRef = useRef(performance.now())
  const renderStartRef = useRef(0)
  const performanceObserverRef = useRef<PerformanceObserver | null>(null)

  // フレームレート監視
  useEffect(() => {
    let animationFrameId: number

    const measureFPS = () => {
      const now = performance.now()
      frameCountRef.current++

      if (now - lastTimeRef.current >= 1000) {
        const fps = Math.round((frameCountRef.current * 1000) / (now - lastTimeRef.current))
        
        setMetrics(prev => ({
          ...prev,
          fps,
          renderTime: now - renderStartRef.current
        }))

        // FPSが30以下の場合、品質を下げる
        if (fps < 30) {
          useSceneStore.getState().setPerformanceMode('low')
        } else if (fps > 55) {
          useSceneStore.getState().setPerformanceMode('high')
        }

        frameCountRef.current = 0
        lastTimeRef.current = now
      }

      renderStartRef.current = now
      animationFrameId = requestAnimationFrame(measureFPS)
    }

    animationFrameId = requestAnimationFrame(measureFPS)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  // メモリ使用量監視
  useEffect(() => {
    if ('memory' in performance) {
      const measureMemory = () => {
        const memInfo = (performance as any).memory
        if (memInfo) {
          const usage = (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize) * 100
          setMetrics(prev => ({ ...prev, memoryUsage: usage }))

          // メモリ使用量が80%を超えた場合、ガベージコレクションを促進
          if (usage > 80) {
            // 非アクティブなセクションのメモリクリーンアップ
            useSceneStore.getState().cleanupInactiveSections()
          }
        }
      }

      const interval = setInterval(measureMemory, 2000)
      return () => clearInterval(interval)
    }
  }, [])

  // Performance Observer for GPU metrics
  useEffect(() => {
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'measure') {
              // GPU関連のパフォーマンス測定
              const gpuTime = entry.duration
              setMetrics(prev => ({
                ...prev,
                gpuUtilization: Math.min(100, (gpuTime / 16.67) * 100) // 60fps基準
              }))
            }
          }
        })

        observer.observe({ entryTypes: ['measure'] })
        performanceObserverRef.current = observer

        return () => {
          observer.disconnect()
        }
      } catch (error) {
        console.warn('PerformanceObserver not supported:', error)
      }
    }
  }, [])

  // 開発環境でのパフォーマンス表示
  if (process.env.NODE_ENV === 'development') {
    return (
      <div className="fixed top-4 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs font-mono">
        <div>FPS: {metrics.fps}</div>
        <div>Memory: {metrics.memoryUsage.toFixed(1)}%</div>
        <div>Render: {metrics.renderTime.toFixed(1)}ms</div>
        <div>GPU: {metrics.gpuUtilization.toFixed(1)}%</div>
      </div>
    )
  }

  return null
}

/**
 * パフォーマンス最適化のためのユーティリティ関数
 */
export const performanceUtils = {
  // レイジーローディング用のIntersection Observer
  createLazyObserver: (callback: (entries: IntersectionObserverEntry[]) => void) => {
    return new IntersectionObserver(callback, {
      rootMargin: '100px',
      threshold: 0.1
    })
  },

  // デバウンス関数（リサイズイベント等）
  debounce: <T extends (...args: any[]) => any>(
    func: T,
    wait: number
  ): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout
    return (...args: Parameters<T>) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => func(...args), wait)
    }
  },

  // requestIdleCallback のポリフィル
  requestIdleCallback: (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      return window.requestIdleCallback(callback)
    } else {
      return setTimeout(callback, 1)
    }
  },

  // メモリ使用量チェック
  checkMemoryPressure: (): boolean => {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory
      return memInfo ? (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize) > 0.8 : false
    }
    return false
  },

  // GPU acceleration の有効性チェック
  checkGPUAcceleration: (): boolean => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
    const result = !!gl
    canvas.remove()
    return result
  }
}