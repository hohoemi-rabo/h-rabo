'use client'

import { motion, AnimatePresence, Variants } from 'framer-motion'
import { useSceneStore } from '@/store/sceneStore'
import { useRef, ReactNode, useEffect, useCallback, memo } from 'react'
import { performanceUtils } from './PerformanceMonitor'

interface TransitionContainerProps {
  sectionId: string
  children: ReactNode
  className?: string
}

/**
 * 3D空間遷移コンテナコンポーネント（最適化版）
 * セクションごとの独自の3D遷移アニメーションを提供
 * GPU加速とメモリ効率化対応
 */
const TransitionContainer = memo(function TransitionContainer({ 
  sectionId, 
  children, 
  className = '' 
}: TransitionContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animationFrameRef = useRef<number | null>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  const { 
    currentSectionId, 
    isTransitioning, 
    sections, 
    previousSectionId,
    performanceMode,
    preloadSection
  } = useSceneStore()

  const section = sections.find((s) => s.id === sectionId)
  const isActive = currentSectionId === sectionId
  const wasActive = previousSectionId === sectionId
  const shouldRender = isActive || (isTransitioning && wasActive)

  // パフォーマンス最適化：不要な再レンダーを防ぐ
  const optimizedShouldRender = useCallback(() => {
    if (performanceMode === 'low') {
      return isActive // 低性能モードでは現在のセクションのみ
    }
    return shouldRender
  }, [isActive, shouldRender, performanceMode])

  // Intersection Observer による可視性監視
  useEffect(() => {
    if (!containerRef.current) return

    observerRef.current = performanceUtils.createLazyObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isActive) {
          // 近づいているセクションを事前読み込み
          preloadSection(sectionId)
        }
      })
    })

    observerRef.current.observe(containerRef.current)

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [sectionId, isActive, preloadSection])

  // メモリクリーンアップ
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [])

  if (!section) return null

  // セクションタイプ別の遷移アニメーション設定（パフォーマンス最適化）
  const getTransitionVariants = useCallback((): Variants => {
    const { type } = section.transition

    // GPU加速のためのbaseスタイル
    const gpuAccelerated = {
      willChange: 'transform, opacity',
      backfaceVisibility: 'hidden' as const,
      perspective: 1000,
    }

    const baseVariants: Variants = {
      initial: {
        opacity: 0,
        scale: 0.95,
        ...gpuAccelerated
      },
      enter: {
        opacity: 1,
        scale: 1,
        ...gpuAccelerated,
        transition: {
          type: 'spring' as const,
          stiffness: 100,
          damping: 20,
          duration: section.transition.duration,
        },
      },
      exit: {
        opacity: 0,
        scale: 0.9,
        ...gpuAccelerated,
        transition: {
          duration: section.transition.duration * 0.6,
          ease: 'easeInOut',
        },
      },
    }

    // パフォーマンスモードに応じてアニメーションを簡素化
    if (performanceMode === 'low') {
      return {
        initial: { opacity: 0 },
        enter: { opacity: 1 },
        exit: { opacity: 0 }
      }
    }

    switch (type) {
      case 'rotate':
        return {
          initial: {
            ...baseVariants.initial,
            rotateY: -90,
            transformPerspective: 1000,
          },
          enter: {
            ...baseVariants.enter,
            rotateY: 0,
            transformPerspective: 1000,
          },
          exit: {
            ...baseVariants.exit,
            rotateY: 90,
            transformPerspective: 1000,
          },
        }

      case 'zoom':
        return {
          initial: {
            ...baseVariants.initial,
            scale: 0.3,
            z: -500,
          },
          enter: {
            ...baseVariants.enter,
            scale: 1,
            z: 0,
          },
          exit: {
            ...baseVariants.exit,
            scale: 1.5,
            z: 300,
          },
        }

      case 'slide':
        return {
          initial: {
            ...baseVariants.initial,
            x: section.position[0] < 0 ? -100 : section.position[0] > 0 ? 100 : 0,
            y: section.position[1] < 0 ? -100 : section.position[1] > 0 ? 100 : 0,
          },
          enter: {
            ...baseVariants.enter,
            x: 0,
            y: 0,
          },
          exit: {
            ...baseVariants.exit,
            x: section.position[0] < 0 ? 100 : section.position[0] > 0 ? -100 : 0,
            y: section.position[1] < 0 ? 100 : section.position[1] > 0 ? -100 : 0,
          },
        }

      default: // fade
        return baseVariants
    }
  }, [section.transition, section.position, performanceMode])

  const variants = getTransitionVariants()

  // パフォーマンス最適化されたレンダリング条件
  if (!optimizedShouldRender()) {
    return null
  }

  return (
    <AnimatePresence mode="wait">
      {shouldRender && (
        <motion.div
          ref={containerRef}
          key={`section-${sectionId}`}
          className={`absolute inset-0 w-full h-full ${className}`}
          style={{
            transformStyle: 'preserve-3d',
            pointerEvents: isActive ? 'auto' : 'none',
            zIndex: isActive ? 10 : 1,
            // GPU加速を強制的に有効化
            transform: 'translate3d(0, 0, 0)',
            WebkitTransform: 'translate3d(0, 0, 0)',
            willChange: 'transform, opacity',
            // メモリ効率化
            contain: 'layout style paint',
          }}
          initial="initial"
          animate={isActive ? 'enter' : 'exit'}
          exit="exit"
          variants={variants}
          onAnimationComplete={() => {
            if (!isActive && containerRef.current) {
              // 非アクティブ時のメモリクリーンアップ
              containerRef.current.style.visibility = 'hidden'
              containerRef.current.style.transform = 'translate3d(-9999px, -9999px, 0)'
            }
          }}
          onAnimationStart={() => {
            if (containerRef.current) {
              containerRef.current.style.visibility = 'visible'
              containerRef.current.style.transform = 'translate3d(0, 0, 0)'
            }
          }}
        >
          {/* セクション固有の回転効果（パフォーマンス最適化版） */}
          {performanceMode !== 'low' && (
            <motion.div
              className="relative h-full w-full"
              animate={{
                rotateX: section.rotation[0] * (180 / Math.PI),
                rotateY: section.rotation[1] * (180 / Math.PI),
                rotateZ: section.rotation[2] * (180 / Math.PI),
              }}
              transition={{ 
                duration: performanceMode === 'high' ? 1.5 : 1.0, 
                ease: 'easeOut',
                delay: isActive ? 0.2 : 0 
              }}
              style={{
                willChange: 'transform',
                backfaceVisibility: 'hidden',
              }}
            >
              {children}
            </motion.div>
          )}
          
          {/* 低性能モード時のシンプル表示 */}
          {performanceMode === 'low' && (
            <div className="relative h-full w-full">
              {children}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
})

export default TransitionContainer