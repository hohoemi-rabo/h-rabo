'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

type TransitionType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'rotate3D'

interface SimplePageTransitionProps {
  children: ReactNode
  type?: TransitionType
  className?: string
}

/**
 * シンプルで軽量なページ遷移アニメーション
 * パフォーマンスを重視し、CSS Transform + Opacity のみを使用
 */
export default function SimplePageTransition({ 
  children, 
  type = 'fadeUp',
  className = '' 
}: SimplePageTransitionProps) {
  const pathname = usePathname()

  // アニメーションのバリエーション定義（完全統一）
  const variants = {
    fadeUp: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -30 }
    },
    fadeDown: {
      initial: { opacity: 0, y: -30 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: 30 }
    },
    fadeLeft: {
      initial: { opacity: 0, x: 30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -30 }
    },
    fadeRight: {
      initial: { opacity: 0, x: -30 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 30 }
    },
    rotate3D: {
      initial: { 
        opacity: 0, 
        rotateY: -90,
        scale: 0.8
      },
      animate: { 
        opacity: 1, 
        rotateY: 0,
        scale: 1
      },
      exit: { 
        opacity: 0, 
        rotateY: 90,
        scale: 0.8
      }
    }
  }

  const selectedVariant = variants[type]

  // トランジション設定（完全統一）
  const transition = {
    duration: 0.5,
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number]
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={selectedVariant}
        transition={transition}
        className={className}
        style={{
          willChange: 'transform, opacity',
          perspective: '1000px',
          transformStyle: type === 'rotate3D' ? 'preserve-3d' : 'flat'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

/**
 * アクセシビリティ対応
 * prefers-reduced-motion が有効な場合はアニメーションを無効化
 */
export function SimplePageTransitionAccessible({ 
  children, 
  type = 'fadeUp',
  className = '' 
}: SimplePageTransitionProps) {
  const pathname = usePathname()
  
  // ユーザーがアニメーションを減らす設定をしている場合
  if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return <div className={className}>{children}</div>
  }

  return (
    <SimplePageTransition type={type} className={className}>
      {children}
    </SimplePageTransition>
  )
}