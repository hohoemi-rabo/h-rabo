'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransition3DProps {
  children: ReactNode
  className?: string
}

/**
 * 3D回転ページ遷移アニメーション
 * 現在のページが3D回転しながら奥へ、新しいページが手前にスライドイン
 */
export default function PageTransition3D({ 
  children, 
  className = '' 
}: PageTransition3DProps) {
  const pathname = usePathname()

  const pageVariants = {
    initial: {
      rotateY: 90,
      x: '100%',
      opacity: 0,
      scale: 0.8,
      transformOrigin: 'left center',
      transformStyle: 'preserve-3d'
    },
    in: {
      rotateY: 0,
      x: '0%',
      opacity: 1,
      scale: 1,
      transformOrigin: 'center center',
      transformStyle: 'preserve-3d'
    },
    out: {
      rotateY: -90,
      x: '-100%',
      opacity: 0,
      scale: 0.8,
      transformOrigin: 'right center',
      transformStyle: 'preserve-3d'
    }
  }

  const pageTransition = {
    type: 'tween',
    ease: [0.25, 0.46, 0.45, 0.94], // cubic-bezier(0.25, 0.46, 0.45, 0.94)
    duration: 0.8
  }

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        perspective: '1200px',
        perspectiveOrigin: '50% 50%'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="w-full"
          style={{
            backfaceVisibility: 'hidden',
            transformStyle: 'preserve-3d'
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* 3D空間の奥行き感を強化する背景エフェクト */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background: `
            radial-gradient(ellipse at center, transparent 40%, rgba(0, 0, 0, 0.3) 70%),
            linear-gradient(45deg, 
              rgba(0, 212, 255, 0.05) 0%, 
              rgba(139, 92, 246, 0.05) 50%, 
              rgba(255, 0, 128, 0.05) 100%
            )
          `,
          transform: 'translateZ(-100px)'
        }}
      />
    </div>
  )
}

/**
 * 特定のページに適用するための3D遷移フック
 */
export function usePageTransition3D() {
  const pathname = usePathname()
  
  const shouldUse3DTransition = (targetPath: string) => {
    // 講師紹介ページへの遷移のみ3D効果を適用
    return targetPath === '/instructor'
  }

  const triggerTransition = async (targetPath: string, navigate: () => void) => {
    if (shouldUse3DTransition(targetPath)) {
      // 3D遷移エフェクト開始
      const transitionElement = document.querySelector('[data-page-transition="3d"]')
      if (transitionElement) {
        transitionElement.classList.add('page-transition-active')
      }
      
      // 少し待ってからナビゲーション実行
      await new Promise(resolve => setTimeout(resolve, 100))
      navigate()
    } else {
      // 通常の遷移
      navigate()
    }
  }

  return {
    shouldUse3DTransition,
    triggerTransition
  }
}

/**
 * 3D遷移プリローダー（より滑らかな遷移のため）
 */
export function PageTransition3DPreloader() {
  return (
    <motion.div
      className="fixed inset-0 bg-dark-900/50 backdrop-blur-sm z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="relative"
        animate={{ 
          rotateY: [0, 360],
          scale: [0.8, 1, 0.8]
        }}
        transition={{ 
          duration: 1.2,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        <div className="w-12 h-12 border-2 border-neon-blue rounded-lg">
          <div className="w-full h-full border border-neon-purple/50 rounded-lg transform rotate-45" />
        </div>
      </motion.div>
    </motion.div>
  )
}