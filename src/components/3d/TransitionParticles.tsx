'use client'

import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface TransitionParticlesProps {
  type: 'rotate' | 'zoom' | 'slide' | 'fade'
  isActive?: boolean
  duration?: number
}

interface Particle {
  id: number
  x: number
  y: number
  delay: number
  size: number
  color: string
}

/**
 * 遷移エフェクト用のパーティクルシステム
 * 遷移タイプに応じて異なるアニメーションパターンを表示
 */
export default function TransitionParticles({ 
  type, 
  isActive = false,
  duration = 1.0 
}: TransitionParticlesProps) {
  
  // パーティクルの生成
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#00d4ff', '#8b5cf6', '#ff0080', '#00ff88']
    const particleCount = type === 'zoom' ? 30 : 20
    
    return Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: i * 0.03,
      size: Math.random() * 0.4 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)]
    }))
  }, [type])

  // 遷移タイプ別のアニメーション設定
  const getParticleAnimation = (particle: Particle) => {
    const baseAnimation = {
      duration: duration * 1.5,
      delay: particle.delay,
      ease: [0.4, 0, 0.2, 1] as const,
    }

    switch (type) {
      case 'rotate':
        return {
          initial: {
            rotate: -180,
            scale: 0,
            opacity: 0,
            x: particle.x - 50,
            y: particle.y - 50,
          },
          animate: {
            rotate: [0, 180, 360],
            scale: [0, particle.size * 2, 0],
            opacity: [0, 1, 0],
            x: particle.x,
            y: particle.y,
          },
          transition: baseAnimation,
        }

      case 'zoom':
        return {
          initial: {
            scale: 0,
            opacity: 0,
            x: 50, // 中央から
            y: 50,
          },
          animate: {
            scale: [0, particle.size * 3, particle.size, 0],
            opacity: [0, 1, 0.8, 0],
            x: [50, particle.x, particle.x, particle.x + (Math.random() - 0.5) * 200],
            y: [50, particle.y, particle.y, particle.y + (Math.random() - 0.5) * 200],
          },
          transition: {
            ...baseAnimation,
            duration: duration * 2,
          },
        }

      case 'slide':
        const direction = Math.random() > 0.5 ? 1 : -1
        return {
          initial: {
            x: particle.x + direction * 100,
            y: particle.y,
            opacity: 0,
            scale: 0,
          },
          animate: {
            x: [particle.x + direction * 100, particle.x, particle.x - direction * 50],
            y: particle.y,
            opacity: [0, 1, 0],
            scale: [0, particle.size, 0],
          },
          transition: baseAnimation,
        }

      default: // fade
        return {
          initial: {
            opacity: 0,
            scale: 0,
            x: particle.x,
            y: particle.y,
          },
          animate: {
            opacity: [0, 1, 1, 0],
            scale: [0, particle.size, particle.size * 1.2, 0],
            y: particle.y - 20, // 軽く上昇
          },
          transition: baseAnimation,
        }
    }
  }

  if (!isActive) return null

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => {
        const animation = getParticleAnimation(particle)
        
        return (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              backgroundColor: particle.color,
              boxShadow: `0 0 10px ${particle.color}`,
              width: '8px',
              height: '8px',
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            initial={animation.initial}
            animate={animation.animate}
            transition={animation.transition}
          />
        )
      })}

      {/* 中央エフェクト（ズーム時のみ） */}
      {type === 'zoom' && (
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ 
            scale: [0, 2, 0],
            opacity: [0, 0.3, 0] 
          }}
          transition={{
            duration: duration * 0.8,
            ease: [0.4, 0, 0.2, 1] as const,
          }}
        >
          <div className="w-32 h-32 rounded-full border-2 border-neon-blue/50" />
        </motion.div>
      )}

      {/* 回転エフェクト（ローテート時のみ） */}
      {type === 'rotate' && (
        <motion.div
          className="absolute inset-0"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: duration,
            ease: 'linear',
            repeat: 1,
          }}
        >
          <div className="absolute left-1/2 top-1/2 w-64 h-0.5 bg-gradient-to-r from-transparent via-neon-purple to-transparent -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute left-1/2 top-1/2 w-0.5 h-64 bg-gradient-to-b from-transparent via-neon-blue to-transparent -translate-x-1/2 -translate-y-1/2" />
        </motion.div>
      )}
    </div>
  )
}