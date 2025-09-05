'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useState, useEffect, useMemo } from 'react'

interface LayeredSlideTransitionProps {
  children: ReactNode
  className?: string
}

/**
 * レイヤードスライド遷移アニメーション
 * ページを複数の層に分解し、各層が異なる速度でスライドする視差効果
 * 3D酔いを避けつつ、印象的な遷移を実現
 */
export default function LayeredSlideTransition({ 
  children, 
  className = '' 
}: LayeredSlideTransitionProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // 固定のパーティクル位置を生成（hydration対策）
  const particlePositions = useMemo(() => {
    if (!mounted) return []
    
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animateX: Math.random() * 100 - 50,
      animateY: Math.random() * 100 - 50,
      duration: 2 + Math.random() * 2
    }))
  }, [mounted])

  // レイヤーのバリエーション定義
  const layerVariants = [
    // 背景レイヤー（最も遅い）
    {
      initial: { x: '100%', opacity: 0, scale: 0.95, z: 0 },
      in: { x: '0%', opacity: 1, scale: 1, z: 0 },
      out: { x: '-30%', opacity: 0.3, scale: 0.95, z: 0 }
    },
    // 中間レイヤー1
    {
      initial: { x: '120%', opacity: 0, scale: 0.9, z: 10 },
      in: { x: '0%', opacity: 1, scale: 1, z: 10 },
      out: { x: '-50%', opacity: 0.5, scale: 0.9, z: 10 }
    },
    // 中間レイヤー2
    {
      initial: { x: '140%', opacity: 0, scale: 0.85, z: 20 },
      in: { x: '0%', opacity: 1, scale: 1, z: 20 },
      out: { x: '-70%', opacity: 0.7, scale: 0.85, z: 20 }
    },
    // 前景レイヤー（最も速い）
    {
      initial: { x: '160%', opacity: 0, scale: 0.8, z: 30 },
      in: { x: '0%', opacity: 1, scale: 1, z: 30 },
      out: { x: '-100%', opacity: 0, scale: 0.8, z: 30 }
    }
  ]

  // レイヤーごとの遷移タイミング
  const layerTransitions = [
    {
      type: 'tween' as const,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      duration: 0.8,
      delay: 0
    },
    {
      type: 'tween' as const,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      duration: 0.7,
      delay: 0.1
    },
    {
      type: 'tween' as const,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      duration: 0.6,
      delay: 0.2
    },
    {
      type: 'tween' as const,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      duration: 0.5,
      delay: 0.3
    }
  ]

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        transformStyle: 'preserve-3d',
        perspective: '1000px'
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          className="relative w-full"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* レイヤー分割されたコンテンツ */}
          {layerVariants.map((variants, index) => (
            <motion.div
              key={`layer-${index}`}
              initial="initial"
              animate="in"
              exit="out"
              variants={variants}
              transition={layerTransitions[index]}
              className={`absolute inset-0 ${index === 0 ? 'relative' : ''}`}
              style={{
                zIndex: 10 - index,
                clipPath: getClipPath(index),
                filter: `blur(${index * 0.5}px)`,
                opacity: 1 - (index * 0.1)
              }}
            >
              {/* 最初のレイヤーのみ実際のコンテンツを表示 */}
              {index === 0 ? (
                children
              ) : (
                // 他のレイヤーは背景として複製（ぼかし効果付き）
                <div 
                  className="w-full h-full bg-gradient-to-br from-dark-900/80 via-dark-800/60 to-dark-900/80"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 80%, rgba(0, 212, 255, ${0.1 - index * 0.02}) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(139, 92, 246, ${0.1 - index * 0.02}) 0%, transparent 50%),
                      radial-gradient(circle at 40% 40%, rgba(255, 0, 128, ${0.05 - index * 0.01}) 0%, transparent 50%)
                    `
                  }}
                />
              )}
            </motion.div>
          ))}

          {/* パーティクルエフェクト - hydration対策 */}
          {mounted && (
            <motion.div
              className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {particlePositions.map((particle) => (
                <motion.div
                  key={particle.id}
                  className="absolute w-1 h-1 bg-neon-blue/60 rounded-full"
                  style={{
                    left: `${particle.left}%`,
                    top: `${particle.top}%`
                  }}
                  animate={{
                    x: [0, particle.animateX],
                    y: [0, particle.animateY],
                    opacity: [0.6, 0, 0.6]
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
              ))}
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

/**
 * レイヤーごとのクリップパス生成
 * 各レイヤーが異なる形状で切り抜かれる
 */
function getClipPath(layerIndex: number): string {
  const clipPaths = [
    'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)', // 全体
    'polygon(0% 0%, 100% 0%, 95% 100%, 5% 100%)',   // 少し内側
    'polygon(5% 0%, 95% 0%, 90% 100%, 10% 100%)',   // もう少し内側  
    'polygon(10% 0%, 90% 0%, 85% 100%, 15% 100%)'   // 最も内側
  ]
  
  return clipPaths[layerIndex] || clipPaths[0]
}

/**
 * レイヤードスライド遷移のためのフック
 */
export function useLayeredSlideTransition() {
  const pathname = usePathname()
  
  const shouldUseLayeredTransition = (targetPath: string) => {
    return targetPath === '/services'
  }

  return {
    shouldUseLayeredTransition
  }
}