'use client'

import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMotionPreference, useAnimationQuality } from '@/hooks/useMotionPreference'

interface MotionWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  className?: string
}

/**
 * アクセシビリティに配慮したモーションラッパー
 * prefers-reduced-motionに応じて適切なアニメーションを提供
 */
export default function MotionWrapper({ 
  children, 
  fallback,
  className = '' 
}: MotionWrapperProps) {
  const { prefersReducedMotion, isClient } = useMotionPreference()
  const { animationQuality, transitionDuration } = useAnimationQuality()

  // サーバーサイドレンダリング中は静的表示
  if (!isClient) {
    return <div className={className}>{fallback || children}</div>
  }

  // モーション軽減設定の場合はシンプルなフェード
  if (prefersReducedMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ 
          duration: 0.2,
          type: 'tween',
          ease: 'linear'
        }}
      >
        {fallback || children}
      </motion.div>
    )
  }

  // 低品質デバイスの場合は軽量アニメーション
  if (animationQuality === 'low') {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: transitionDuration * 0.6,
          type: 'tween',
          ease: 'easeOut'
        }}
      >
        {children}
      </motion.div>
    )
  }

  // 通常の高品質アニメーション
  return (
    <div className={className}>
      {children}
    </div>
  )
}

/**
 * セクション遷移専用のアクセシブルラッパー
 */
export function AccessibleTransitionWrapper({ 
  children, 
  sectionId,
  isActive 
}: { 
  children: ReactNode
  sectionId: string
  isActive: boolean
}) {
  const { prefersReducedMotion } = useMotionPreference()

  return (
    <div 
      role="region"
      aria-label={`Section ${sectionId}`}
      aria-hidden={!isActive}
      tabIndex={isActive ? 0 : -1}
      style={{
        // スクリーンリーダー用の説明
        position: 'relative'
      }}
    >
      {/* フォーカス管理のための非表示スキップリンク */}
      <a
        href={`#section-${sectionId}`}
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 z-50 bg-neon-blue text-dark-900 px-4 py-2 rounded"
        tabIndex={isActive ? 0 : -1}
      >
        {sectionId}セクションへスキップ
      </a>
      
      <div id={`section-${sectionId}`}>
        {prefersReducedMotion ? (
          <div
            style={{
              transition: 'opacity 0.2s ease',
              opacity: isActive ? 1 : 0,
              visibility: isActive ? 'visible' : 'hidden'
            }}
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  )
}

/**
 * キーボードナビゲーション用の視覚的インジケーター
 */
export function KeyboardNavigationHint({ isVisible }: { isVisible: boolean }) {
  const { prefersReducedMotion } = useMotionPreference()

  if (!isVisible) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 bg-dark-800/90 backdrop-blur-sm rounded-lg px-4 py-2 text-sm text-gray-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: prefersReducedMotion ? 0.1 : 0.3,
          type: prefersReducedMotion ? 'tween' : 'spring'
        }}
      >
        <div className="flex items-center space-x-4 text-xs">
          <span>← → / ↑ ↓ でナビゲーション</span>
          <span>1-5 で直接移動</span>
          <span>Home/End でページ端</span>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}