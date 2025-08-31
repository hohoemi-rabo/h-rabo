'use client'

import { useEffect, useState } from 'react'
import { useDeviceDetection } from './useDeviceDetection'

export interface Performance3DSettings {
  quality: 'high' | 'medium' | 'low'
  particleCount: number
  objectCount: number
  shadowsEnabled: boolean
  antialias: boolean
  pixelRatio: number
  maxLights: number
}

/**
 * 3Dパフォーマンスを最適化するためのフック
 * デバイス性能に応じて3D設定を調整
 */
export function use3DPerformance(): Performance3DSettings {
  const [settings, setSettings] = useState<Performance3DSettings>({
    quality: 'high',
    particleCount: 1000,
    objectCount: 8,
    shadowsEnabled: true,
    antialias: true,
    pixelRatio: 2,
    maxLights: 3
  })

  const deviceInfo = useDeviceDetection()

  useEffect(() => {
    const checkPerformance = () => {
      // WebGL対応チェック
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')

      if (!gl) {
        // WebGL非対応
        setSettings({
          quality: 'low',
          particleCount: 0,
          objectCount: 0,
          shadowsEnabled: false,
          antialias: false,
          pixelRatio: 1,
          maxLights: 1
        })
        return
      }

      // デバイス性能判定
      const isMobile = deviceInfo.isMobile
      const isTablet = deviceInfo.isTablet
      const hasLowMemory = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2

      if (isMobile) {
        // モバイル設定
        setSettings({
          quality: 'low',
          particleCount: 200,
          objectCount: 4,
          shadowsEnabled: false,
          antialias: false,
          pixelRatio: Math.min(deviceInfo.pixelRatio, 1.5),
          maxLights: 1
        })
      } else if (isTablet || hasLowMemory) {
        // タブレット/低性能PC設定
        setSettings({
          quality: 'medium',
          particleCount: 500,
          objectCount: 6,
          shadowsEnabled: false,
          antialias: true,
          pixelRatio: Math.min(deviceInfo.pixelRatio, 1.5),
          maxLights: 2
        })
      } else {
        // ハイエンドデスクトップ設定
        setSettings({
          quality: 'high',
          particleCount: 1000,
          objectCount: 8,
          shadowsEnabled: true,
          antialias: true,
          pixelRatio: Math.min(deviceInfo.pixelRatio, 2),
          maxLights: 3
        })
      }

      // WebGLのレンダラー情報取得（デバッグ用）
      if ('getExtension' in gl && gl instanceof WebGLRenderingContext) {
        const debugInfo = gl.getExtension('WEBGL_debug_renderer_info')
        if (debugInfo) {
          const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL)
          console.log('WebGL Renderer:', renderer)
        }
      }
    }

    checkPerformance()
  }, [deviceInfo])

  return settings
}

/**
 * 3Dシーンの動的品質調整フック
 * FPSに基づいてリアルタイムで品質を調整
 */
export function useAdaptive3DQuality(targetFPS: number = 30) {
  const [dynamicQuality, setDynamicQuality] = useState(1)
  const [frameCount, setFrameCount] = useState(0)
  const [lastTime, setLastTime] = useState(performance.now())

  useEffect(() => {
    let animationId: number

    const measureFPS = () => {
      const currentTime = performance.now()
      setFrameCount(prev => prev + 1)

      if (currentTime - lastTime >= 1000) {
        const fps = frameCount
        
        // FPSに基づいて品質を調整
        if (fps < targetFPS - 5) {
          setDynamicQuality(prev => Math.max(0.5, prev - 0.1))
        } else if (fps > targetFPS + 5) {
          setDynamicQuality(prev => Math.min(1, prev + 0.05))
        }

        setFrameCount(0)
        setLastTime(currentTime)
      }

      animationId = requestAnimationFrame(measureFPS)
    }

    animationId = requestAnimationFrame(measureFPS)

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId)
      }
    }
  }, [frameCount, lastTime, targetFPS])

  return dynamicQuality
}