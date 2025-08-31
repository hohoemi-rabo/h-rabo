'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useSceneStore } from '@/store/sceneStore'

/**
 * 3D遷移システムの総合パフォーマンス最適化フック
 */
export function usePerformanceOptimization() {
  const rafRef = useRef<number | null>(null)
  const lastFrameTime = useRef(0)
  const frameCount = useRef(0)

  // Zustand ストアから必要な状態を取得
  const store = useSceneStore()
  const { 
    performanceMode, 
    setPerformanceMode, 
    cleanupInactiveSections,
    currentSectionId,
    getNextSection,
    getPrevSection,
    preloadSection
  } = store

  // フレームレート監視とパフォーマンス自動調整
  const monitorPerformance = useCallback(() => {
    const now = performance.now()
    frameCount.current++

    if (now - lastFrameTime.current >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / (now - lastFrameTime.current))
      
      // 自動パフォーマンス調整
      if (fps < 30 && performanceMode !== 'low') {
        console.log(`[Performance] FPS low (${fps}), switching to low performance mode`)
        setPerformanceMode('low')
      } else if (fps > 55 && performanceMode !== 'high') {
        console.log(`[Performance] FPS stable (${fps}), switching to high performance mode`)
        setPerformanceMode('high')
      } else if (fps >= 30 && fps <= 55 && performanceMode !== 'medium') {
        console.log(`[Performance] FPS medium (${fps}), switching to medium performance mode`)
        setPerformanceMode('medium')
      }

      frameCount.current = 0
      lastFrameTime.current = now
    }

    rafRef.current = requestAnimationFrame(monitorPerformance)
  }, [performanceMode, setPerformanceMode])

  // メモリ使用量監視
  const monitorMemory = useCallback(() => {
    if ('memory' in performance) {
      const memInfo = (performance as any).memory
      if (memInfo) {
        const usage = (memInfo.usedJSHeapSize / memInfo.totalJSHeapSize) * 100
        
        if (usage > 85) {
          console.log(`[Performance] High memory usage (${usage.toFixed(1)}%), cleaning up inactive sections`)
          cleanupInactiveSections()
        }
      }
    }
  }, [cleanupInactiveSections])

  // セクションの事前読み込み
  const preloadAdjacentSections = useCallback(() => {
    const nextSection = getNextSection()
    const prevSection = getPrevSection()

    if (nextSection && performanceMode !== 'low') {
      preloadSection(nextSection.id)
    }
    
    if (prevSection && performanceMode !== 'low') {
      preloadSection(prevSection.id)
    }
  }, [getNextSection, getPrevSection, preloadSection, performanceMode])

  // GPU加速の有効性チェック
  const checkGPUAcceleration = useCallback(() => {
    const canvas = document.createElement('canvas')
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext | null
    
    if (!gl) {
      console.warn('[Performance] WebGL not supported, switching to low performance mode')
      setPerformanceMode('low')
    } else {
      // WebGL情報を取得してパフォーマンス判定
      const renderer = gl.getParameter(gl.RENDERER)
      const vendor = gl.getParameter(gl.VENDOR)
      
      console.log(`[Performance] GPU Info - Vendor: ${vendor}, Renderer: ${renderer}`)
      
      // 統合グラフィックスの場合は中性能モード
      if (renderer && renderer.toString().toLowerCase().includes('intel')) {
        setPerformanceMode('medium')
      }
    }
    
    canvas.remove()
  }, [setPerformanceMode])

  // リサイズイベントの最適化
  const handleResize = useCallback(() => {
    // デバウンスされたリサイズハンドリング
    const timeoutId = setTimeout(() => {
      // 画面サイズに応じてパフォーマンスモードを調整
      const width = window.innerWidth
      const height = window.innerHeight
      const pixelCount = width * height
      
      if (pixelCount > 2073600) { // 1920x1080以上
        if (performanceMode === 'high') return
      } else if (pixelCount > 921600) { // 1280x720以上
        if (performanceMode !== 'low') {
          setPerformanceMode('medium')
        }
      } else { // それ以下
        setPerformanceMode('low')
      }
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [performanceMode, setPerformanceMode])

  // 初期化とクリーンアップ
  useEffect(() => {
    // 初期パフォーマンスチェック
    checkGPUAcceleration()
    
    // フレームレート監視開始
    rafRef.current = requestAnimationFrame(monitorPerformance)
    
    // メモリ監視（5秒間隔）
    const memoryInterval = setInterval(monitorMemory, 5000)
    
    // セクション事前読み込み（セクション変更時）
    preloadAdjacentSections()
    
    // リサイズイベントリスナー
    window.addEventListener('resize', handleResize)

    return () => {
      // クリーンアップ
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
      clearInterval(memoryInterval)
      window.removeEventListener('resize', handleResize)
    }
  }, [
    checkGPUAcceleration, 
    monitorPerformance, 
    monitorMemory, 
    preloadAdjacentSections, 
    handleResize
  ])

  // セクション変更時の事前読み込み
  useEffect(() => {
    preloadAdjacentSections()
  }, [currentSectionId, preloadAdjacentSections])

  // パフォーマンス統計の取得
  const getPerformanceStats = useCallback(() => {
    const memInfo = (performance as any).memory
    return {
      performanceMode,
      memoryUsage: memInfo ? {
        used: Math.round(memInfo.usedJSHeapSize / 1024 / 1024),
        total: Math.round(memInfo.totalJSHeapSize / 1024 / 1024),
        percentage: Math.round((memInfo.usedJSHeapSize / memInfo.totalJSHeapSize) * 100)
      } : null,
      timestamp: Date.now()
    }
  }, [performanceMode])

  return {
    performanceMode,
    getPerformanceStats,
    // 手動でパフォーマンス調整を行う関数
    optimizePerformance: useCallback(() => {
      cleanupInactiveSections()
      preloadAdjacentSections()
    }, [cleanupInactiveSections, preloadAdjacentSections])
  }
}

/**
 * バッテリー状態に基づくパフォーマンス調整
 */
export function useBatteryOptimization() {
  const setPerformanceMode = useSceneStore((state) => state.setPerformanceMode)

  useEffect(() => {
    // Battery API サポートチェック
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        const updatePerformanceMode = () => {
          if (battery.charging === false && battery.level < 0.2) {
            // バッテリー残量20%未満かつ充電中でない場合は低性能モード
            setPerformanceMode('low')
            console.log('[Performance] Low battery detected, switching to low performance mode')
          }
        }

        // 初回チェック
        updatePerformanceMode()

        // イベントリスナー登録
        battery.addEventListener('chargingchange', updatePerformanceMode)
        battery.addEventListener('levelchange', updatePerformanceMode)

        return () => {
          battery.removeEventListener('chargingchange', updatePerformanceMode)
          battery.removeEventListener('levelchange', updatePerformanceMode)
        }
      })
    }
  }, [setPerformanceMode])
}