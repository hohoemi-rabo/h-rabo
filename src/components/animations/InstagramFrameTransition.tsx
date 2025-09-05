'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useState, useEffect } from 'react'

interface InstagramFrameTransitionProps {
  children: ReactNode
  className?: string
}

/**
 * インスタグラム風フレーム遷移アニメーション
 * 写真フレームのようなエフェクトでページが切り替わる
 * スクエア型フレームが拡大・縮小しながらコンテンツが遷移
 */
export default function InstagramFrameTransition({ 
  children, 
  className = '' 
}: InstagramFrameTransitionProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // フレーム展開のバリエーション（シンプルに変更）
  const frameVariants = {
    initial: {
      opacity: 0,
      y: 20
    },
    animate: {
      opacity: 1,
      y: 0
    },
    exit: {
      opacity: 0,
      y: -20
    }
  }

  // コンテンツのバリエーション（無効化）
  const contentVariants = {
    initial: {},
    animate: {},
    exit: {}
  }

  // 遷移設定
  const transition = {
    type: 'spring' as const,
    damping: 25,
    stiffness: 300,
    mass: 0.8,
    duration: 0.6
  }

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="relative w-full"
          initial="initial"
          animate="animate"
          exit="exit"
          variants={frameVariants}
          transition={transition}
        >
          {/* コンテンツエリア（枠なし） */}
          <motion.div
            className="relative overflow-hidden"
            variants={contentVariants}
            transition={{ ...transition, delay: 0.1 }}
          >
            {children}
          </motion.div>
          
          {/* パーティクル効果 */}
          {mounted && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[...Array(12)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-pink-400/60 rounded-full"
                  style={{
                    left: `${20 + (i % 4) * 20}%`,
                    top: `${20 + Math.floor(i / 4) * 20}%`,
                  }}
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.8, 0],
                    rotate: [0, 180, 360]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: 'easeInOut'
                  }}
                />
              ))}
            </div>
          )}

          {/* ハートアイコンエフェクト */}
          <motion.div
            className="absolute top-4 right-4 text-pink-500 text-2xl opacity-0"
            animate={{
              opacity: [0, 1, 0],
              scale: [0.5, 1.2, 0.5],
              rotate: [0, -10, 10, 0]
            }}
            transition={{
              duration: 1.5,
              delay: 0.3
            }}
          >
            ❤️
          </motion.div>

          {/* カメラアイコンエフェクト */}
          <motion.div
            className="absolute bottom-4 left-4 text-purple-400 text-xl opacity-0"
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.3, 1, 0.3],
              y: [0, -10, 0]
            }}
            transition={{
              duration: 1.8,
              delay: 0.5
            }}
          >
            📸
          </motion.div>

        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/**
 * インスタグラムフレーム遷移のためのフック
 */
export function useInstagramFrameTransition() {
  const pathname = usePathname()
  
  const shouldUseFrameTransition = (targetPath: string) => {
    return targetPath === '/instagram'
  }

  return {
    shouldUseFrameTransition
  }
}