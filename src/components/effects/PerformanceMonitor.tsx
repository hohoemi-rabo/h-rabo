'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface PerformanceMetrics {
  fps: number
  memoryUsage: number
  renderTime: number
  frameDrops: number
  cpuUsage: number
  timestamp: number
}

interface PerformanceStats {
  current: PerformanceMetrics
  average: PerformanceMetrics
  peak: PerformanceMetrics
  history: PerformanceMetrics[]
}

interface PerformanceMonitorProps {
  enabled?: boolean
  showUI?: boolean
  onPerformanceChange?: (metrics: PerformanceMetrics) => void
  thresholds?: {
    fps: { warning: number; critical: number }
    memory: { warning: number; critical: number }
    renderTime: { warning: number; critical: number }
  }
}

/**
 * パフォーマンス監視システム
 * FPS、メモリ使用量、レンダリング時間などを監視
 */
export default function PerformanceMonitor({
  enabled = true,
  showUI = process.env.NODE_ENV === 'development',
  onPerformanceChange,
  thresholds = {
    fps: { warning: 45, critical: 30 },
    memory: { warning: 50, critical: 80 },
    renderTime: { warning: 16, critical: 33 },
  }
}: PerformanceMonitorProps) {
  const [stats, setStats] = useState<PerformanceStats>({
    current: {
      fps: 60,
      memoryUsage: 0,
      renderTime: 0,
      frameDrops: 0,
      cpuUsage: 0,
      timestamp: performance.now(),
    },
    average: {
      fps: 60,
      memoryUsage: 0,
      renderTime: 0,
      frameDrops: 0,
      cpuUsage: 0,
      timestamp: performance.now(),
    },
    peak: {
      fps: 60,
      memoryUsage: 0,
      renderTime: 0,
      frameDrops: 0,
      cpuUsage: 0,
      timestamp: performance.now(),
    },
    history: [],
  })

  const [isVisible, setIsVisible] = useState(false)
  const animationFrameRef = useRef<number>()
  const lastTimeRef = useRef<number>(performance.now())
  const frameCountRef = useRef<number>(0)
  const renderTimesRef = useRef<number[]>([])
  const historyRef = useRef<PerformanceMetrics[]>([])

  // FPS計算
  const calculateFPS = useCallback(() => {
    const now = performance.now()
    const delta = now - lastTimeRef.current

    if (delta >= 1000) {
      const fps = Math.round((frameCountRef.current * 1000) / delta)
      frameCountRef.current = 0
      lastTimeRef.current = now
      return fps
    }

    frameCountRef.current++
    return null
  }, [])

  // メモリ使用量取得
  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return Math.round((memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100)
    }
    return 0
  }, [])

  // レンダリング時間測定
  const measureRenderTime = useCallback((startTime: number) => {
    const renderTime = performance.now() - startTime
    renderTimesRef.current.push(renderTime)
    
    // 最新10フレームの平均を計算
    if (renderTimesRef.current.length > 10) {
      renderTimesRef.current.shift()
    }
    
    return renderTimesRef.current.reduce((sum, time) => sum + time, 0) / renderTimesRef.current.length
  }, [])

  // パフォーマンス計測メインループ
  const measurePerformance = useCallback(() => {
    if (!enabled) return

    const frameStart = performance.now()
    
    const fps = calculateFPS()
    if (fps !== null) {
      const memoryUsage = getMemoryUsage()
      const renderTime = measureRenderTime(frameStart)
      
      const newMetrics: PerformanceMetrics = {
        fps,
        memoryUsage,
        renderTime,
        frameDrops: fps < thresholds.fps.warning ? stats.current.frameDrops + 1 : 0,
        cpuUsage: Math.min(100, (renderTime / 16.67) * 100), // 60FPS基準
        timestamp: performance.now(),
      }

      // 履歴更新
      historyRef.current.push(newMetrics)
      if (historyRef.current.length > 60) { // 60秒分保持
        historyRef.current.shift()
      }

      // 統計計算
      const history = historyRef.current
      const average = history.reduce((acc, metrics) => ({
        fps: acc.fps + metrics.fps,
        memoryUsage: acc.memoryUsage + metrics.memoryUsage,
        renderTime: acc.renderTime + metrics.renderTime,
        frameDrops: acc.frameDrops + metrics.frameDrops,
        cpuUsage: acc.cpuUsage + metrics.cpuUsage,
        timestamp: acc.timestamp + metrics.timestamp,
      }), { fps: 0, memoryUsage: 0, renderTime: 0, frameDrops: 0, cpuUsage: 0, timestamp: 0 })

      const avgCount = history.length
      const averageMetrics: PerformanceMetrics = {
        fps: Math.round(average.fps / avgCount),
        memoryUsage: Math.round(average.memoryUsage / avgCount),
        renderTime: Math.round((average.renderTime / avgCount) * 100) / 100,
        frameDrops: Math.round(average.frameDrops / avgCount),
        cpuUsage: Math.round(average.cpuUsage / avgCount),
        timestamp: average.timestamp / avgCount,
      }

      const peakMetrics: PerformanceMetrics = {
        fps: Math.min(...history.map(h => h.fps)),
        memoryUsage: Math.max(...history.map(h => h.memoryUsage)),
        renderTime: Math.max(...history.map(h => h.renderTime)),
        frameDrops: Math.max(...history.map(h => h.frameDrops)),
        cpuUsage: Math.max(...history.map(h => h.cpuUsage)),
        timestamp: newMetrics.timestamp,
      }

      const newStats: PerformanceStats = {
        current: newMetrics,
        average: averageMetrics,
        peak: peakMetrics,
        history: [...history],
      }

      setStats(newStats)
      
      if (onPerformanceChange) {
        onPerformanceChange(newMetrics)
      }
    }

    if (enabled) {
      animationFrameRef.current = requestAnimationFrame(measurePerformance)
    }
  }, [enabled, calculateFPS, getMemoryUsage, measureRenderTime, thresholds.fps.warning, stats.current.frameDrops, onPerformanceChange])

  // 監視開始/停止
  useEffect(() => {
    if (enabled) {
      measurePerformance()
    } else if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [enabled, measurePerformance])

  // アラートレベル判定
  const getAlertLevel = (metric: keyof PerformanceMetrics, value: number): 'normal' | 'warning' | 'critical' => {
    switch (metric) {
      case 'fps':
        if (value < thresholds.fps.critical) return 'critical'
        if (value < thresholds.fps.warning) return 'warning'
        return 'normal'
      case 'memoryUsage':
        if (value > thresholds.memory.critical) return 'critical'
        if (value > thresholds.memory.warning) return 'warning'
        return 'normal'
      case 'renderTime':
        if (value > thresholds.renderTime.critical) return 'critical'
        if (value > thresholds.renderTime.warning) return 'warning'
        return 'normal'
      default:
        return 'normal'
    }
  }

  if (!enabled || !showUI) {
    return null
  }

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* トグルボタン */}
      <motion.button
        className="mb-2 px-3 py-1 bg-black/80 text-white rounded-md text-sm font-mono border border-white/30"
        onClick={() => setIsVisible(!isVisible)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isVisible ? 'HIDE PERF' : 'SHOW PERF'}
      </motion.button>

      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="bg-black/90 backdrop-blur-sm text-white p-4 rounded-lg border border-white/20 font-mono text-xs max-w-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="mb-3 text-neon-blue font-semibold">PERFORMANCE MONITOR</div>
            
            {/* 現在の値 */}
            <div className="mb-3">
              <div className="text-white/60 mb-1">CURRENT</div>
              <MetricRow 
                label="FPS" 
                value={stats.current.fps} 
                unit=""
                alert={getAlertLevel('fps', stats.current.fps)} 
              />
              <MetricRow 
                label="MEM" 
                value={stats.current.memoryUsage} 
                unit="%" 
                alert={getAlertLevel('memoryUsage', stats.current.memoryUsage)}
              />
              <MetricRow 
                label="RENDER" 
                value={stats.current.renderTime} 
                unit="ms" 
                alert={getAlertLevel('renderTime', stats.current.renderTime)}
              />
              <MetricRow 
                label="DROPS" 
                value={stats.current.frameDrops} 
                unit="" 
                alert={stats.current.frameDrops > 5 ? 'warning' : 'normal'}
              />
              <MetricRow 
                label="CPU" 
                value={stats.current.cpuUsage} 
                unit="%" 
                alert={stats.current.cpuUsage > 80 ? 'critical' : stats.current.cpuUsage > 60 ? 'warning' : 'normal'}
              />
            </div>

            {/* 平均値 */}
            <div className="mb-3">
              <div className="text-white/60 mb-1">AVERAGE</div>
              <MetricRow label="FPS" value={stats.average.fps} unit="" />
              <MetricRow label="MEM" value={stats.average.memoryUsage} unit="%" />
              <MetricRow label="RENDER" value={stats.average.renderTime} unit="ms" />
              <MetricRow label="CPU" value={stats.average.cpuUsage} unit="%" />
            </div>

            {/* ピーク値 */}
            <div className="mb-3">
              <div className="text-white/60 mb-1">PEAK</div>
              <MetricRow label="LOW FPS" value={stats.peak.fps} unit="" />
              <MetricRow label="HIGH MEM" value={stats.peak.memoryUsage} unit="%" />
              <MetricRow label="SLOW RENDER" value={stats.peak.renderTime} unit="ms" />
              <MetricRow label="HIGH CPU" value={stats.peak.cpuUsage} unit="%" />
            </div>

            {/* ミニグラフ */}
            <div>
              <div className="text-white/60 mb-1">FPS HISTORY</div>
              <div className="h-8 bg-black/50 rounded flex items-end">
                {stats.history.slice(-20).map((metric, index) => (
                  <div
                    key={index}
                    className={`flex-1 mx-px rounded-t ${
                      metric.fps >= thresholds.fps.warning ? 'bg-neon-green' :
                      metric.fps >= thresholds.fps.critical ? 'bg-yellow-400' : 'bg-red-400'
                    }`}
                    style={{
                      height: `${Math.max(2, (metric.fps / 60) * 100)}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* アラート */}
            {(getAlertLevel('fps', stats.current.fps) !== 'normal' ||
              getAlertLevel('memoryUsage', stats.current.memoryUsage) !== 'normal' ||
              getAlertLevel('renderTime', stats.current.renderTime) !== 'normal') && (
              <motion.div
                className="mt-3 p-2 rounded bg-red-900/50 border border-red-500 text-red-300 text-xs"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                PERFORMANCE ALERT
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface MetricRowProps {
  label: string
  value: number
  unit?: string
  alert?: 'normal' | 'warning' | 'critical'
}

function MetricRow({ label, value, unit = '', alert = 'normal' }: MetricRowProps) {
  const colorClass = {
    normal: 'text-neon-green',
    warning: 'text-yellow-400',
    critical: 'text-red-400',
  }[alert]

  return (
    <div className="flex justify-between items-center">
      <span className="text-white/80">{label}:</span>
      <span className={`${colorClass} font-bold`}>
        {typeof value === 'number' ? value.toFixed(value < 10 ? 1 : 0) : value}{unit}
      </span>
    </div>
  )
}

/**
 * パフォーマンス最適化ヘルパー
 * コンポーネントのパフォーマンス状態に応じて設定を調整
 */
export function usePerformanceOptimization() {
  const [optimizationLevel, setOptimizationLevel] = useState<'high' | 'medium' | 'low'>('high')
  const [shouldReduceEffects, setShouldReduceEffects] = useState(false)

  const handlePerformanceChange = useCallback((metrics: PerformanceMetrics) => {
    if (metrics.fps < 30) {
      setOptimizationLevel('low')
      setShouldReduceEffects(true)
    } else if (metrics.fps < 45) {
      setOptimizationLevel('medium')
      setShouldReduceEffects(true)
    } else {
      setOptimizationLevel('high')
      setShouldReduceEffects(false)
    }
  }, [])

  return {
    optimizationLevel,
    shouldReduceEffects,
    handlePerformanceChange,
  }
}

/**
 * レンダリング最適化フック
 * 不要な再レンダリングを防ぐ
 */
export function useRenderOptimization<T>(value: T, delay: number = 100): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}