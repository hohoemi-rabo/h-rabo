'use client'

import { motion } from 'framer-motion'
import { useMemo } from 'react'

interface TransitionParticlesProps {
  isActive: boolean
  direction: number
}

interface Particle {
  id: number
  x: number
  y: number
  delay: number
  size: number
  color: string
  velocity: { x: number; y: number }
}

/**
 * ページ遷移時のネオンパーティクルエフェクト
 * 方向に応じてパーティクルが流れる印象的な視覚効果
 */
export default function TransitionParticles({ isActive, direction }: TransitionParticlesProps) {
  // パーティクルの生成（固定値でSSR安全）
  const particles = useMemo<Particle[]>(() => {
    const colors = ['#00d4ff', '#8b5cf6', '#ff0080', '#00ff88', '#ffff00']
    const particleCount = 12
    
    return Array.from({ length: particleCount }, (_, i) => {
      // シード値を使用した疑似ランダム
      const seed = i * 137.5 // 黄金角度を使用
      const seedX = Math.sin(seed * 0.1) * 0.5 + 0.5
      const seedY = Math.sin(seed * 0.2) * 0.5 + 0.5
      const seedSize = Math.sin(seed * 0.3) * 0.5 + 0.5
      const seedColor = Math.floor((Math.sin(seed * 0.4) * 0.5 + 0.5) * colors.length)
      
      return {
        id: i,
        x: seedX * 100,
        y: seedY * 100,
        delay: i * 0.05,
        size: seedSize * 8 + 2,
        color: colors[seedColor] || colors[0],
        velocity: {
          x: (seedX - 0.5) * 200,
          y: (seedY - 0.5) * 100,
        }
      }
    })
  }, [])

  if (!isActive) return null

  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          initial={{
            opacity: 0,
            scale: 0,
            x: direction > 0 ? -100 : 100,
          }}
          animate={{
            opacity: [0, 1, 1, 0],
            scale: [0, 1, 1.2, 0],
            x: [
              direction > 0 ? -100 : 100,
              0,
              particle.velocity.x,
              direction > 0 ? 200 : -200
            ],
            y: [0, particle.velocity.y * 0.3, particle.velocity.y, particle.velocity.y * 1.5],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 0.8,
            delay: particle.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
            times: [0, 0.3, 0.7, 1],
          }}
        />
      ))}
      
      {/* 光の軌跡エフェクト */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={`trail-${i}`}
          className="absolute top-1/2 h-0.5 bg-gradient-to-r from-transparent via-neon-blue to-transparent"
          style={{
            left: direction > 0 ? '-100%' : '100%',
            width: '200%',
            transform: 'translateY(-50%)',
          }}
          initial={{ 
            opacity: 0,
            scaleX: 0,
          }}
          animate={{ 
            opacity: [0, 1, 0],
            scaleX: [0, 1, 0],
            x: direction > 0 ? '50%' : '-50%',
          }}
          transition={{
            duration: 0.6,
            delay: i * 0.1,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* 中央エネルギーバースト */}
      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: [0, 0.8, 0],
          scale: [0, 2, 4],
        }}
        transition={{
          duration: 0.8,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
      >
        <div className="w-32 h-32 rounded-full border border-neon-blue/50 relative">
          <div className="absolute inset-2 rounded-full border border-neon-purple/30" />
          <div className="absolute inset-4 rounded-full border border-neon-pink/20" />
        </div>
      </motion.div>
    </div>
  )
}