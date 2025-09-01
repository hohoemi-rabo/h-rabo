'use client'

import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useRef, useEffect, useState } from 'react'
import TransitionParticles from './TransitionParticles'
import LoadingIndicator from './LoadingIndicator'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * ページ遷移アニメーションコンポーネント（洗練版）
 * 左右スライドアニメーション + ネオンエフェクト + パフォーマンス最適化
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const previousPathnameRef = useRef<string>('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    previousPathnameRef.current = pathname
  }, [pathname])

  // ページの順序定義
  const routes = [
    '/',           // ホーム (0)
    '/instructor', // 講師紹介 (1)
    '/services',   // サービス (2)
    '/voice',      // お客様の声 (3)
    '/access',     // アクセス (4)
  ]

  // 遷移方向の計算
  const getDirection = (currentPath: string, previousPath: string) => {
    const currentIndex = routes.indexOf(currentPath)
    const previousIndex = routes.indexOf(previousPath)
    
    if (currentIndex === -1 || previousIndex === -1) {
      return 0
    }
    
    return currentIndex > previousIndex ? 1 : -1
  }

  const direction = getDirection(pathname, previousPathnameRef.current)

  // モーション軽減対応
  const getAnimationConfig = () => {
    if (shouldReduceMotion) {
      return {
        slideVariants: {
          enter: { opacity: 0 },
          center: { opacity: 1 },
          exit: { opacity: 0 },
        },
        transition: {
          type: 'tween' as const,
          duration: 0.3,
          ease: 'easeInOut' as const,
        }
      }
    }

    return {
      slideVariants: {
        enter: (direction: number) => ({
          x: direction > 0 ? '100%' : direction < 0 ? '-100%' : '100%',
          opacity: 0,
          scale: 0.98,
          filter: 'blur(4px)',
        }),
        center: {
          x: 0,
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
        },
        exit: (direction: number) => ({
          x: direction > 0 ? '-100%' : direction < 0 ? '100%' : '-100%',
          opacity: 0,
          scale: 1.02,
          filter: 'blur(2px)',
        }),
      },
      transition: {
        type: 'tween' as const,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      }
    }
  }

  const { slideVariants, transition } = getAnimationConfig()

  // 遷移状態の管理
  const handleAnimationStart = () => {
    setIsTransitioning(true)
    setLoadingProgress(0)
    
    // プログレスバーのアニメーション
    const progressInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15 + 5
      })
    }, 50)

    setTimeout(() => {
      clearInterval(progressInterval)
      setLoadingProgress(100)
    }, 700)
  }
  
  const handleAnimationComplete = () => {
    setTimeout(() => {
      setIsTransitioning(false)
      setLoadingProgress(0)
    }, 100)
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      <AnimatePresence 
        mode="wait" 
        custom={direction}
        onExitComplete={() => setIsTransitioning(false)}
      >
        <motion.div
          key={pathname}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
          className="w-full"
        >
          {/* コンテンツフェードイン */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.2,
              duration: shouldReduceMotion ? 0 : 0.6,
              ease: [0.25, 0.46, 0.45, 0.94] as const,
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </AnimatePresence>
      
      {/* 洗練されたオーバーレイエフェクト */}
      {!shouldReduceMotion && (
        <AnimatePresence>
          <motion.div
            key={`overlay-${pathname}`}
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ x: '100%' }}
            animate={{ x: '100%' }}
            exit={{ 
              x: ['100%', '0%', '-100%'],
              transition: { 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94] as const,
                times: [0, 0.5, 1]
              }
            }}
          >
            {/* グラデーションオーバーレイ */}
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900" />
            
            {/* ネオンエッジライト */}
            <div className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-neon-blue via-neon-purple to-neon-pink" />
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-green via-neon-cyan to-neon-blue" />
            
            {/* スキャンライン */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent"
              animate={{
                y: ['-100%', '100%'],
              }}
              transition={{
                duration: 0.8,
                ease: 'linear',
              }}
              style={{ height: '2px' }}
            />
          </motion.div>
        </AnimatePresence>
      )}

      {/* ローディングインジケーター */}
      {!shouldReduceMotion && (
        <LoadingIndicator isVisible={isTransitioning} progress={loadingProgress} />
      )}

      {/* ネオンパーティクルエフェクト */}
      {!shouldReduceMotion && (
        <TransitionParticles isActive={isTransitioning} direction={direction} />
      )}

      {/* パフォーマンスインジケーター（開発用） */}
      {process.env.NODE_ENV === 'development' && isTransitioning && (
        <div className="fixed top-4 left-4 z-50 bg-neon-blue/20 text-neon-blue text-xs px-2 py-1 rounded border border-neon-blue/50">
          Transitioning... ({Math.round(loadingProgress)}%)
        </div>
      )}
    </div>
  )
}