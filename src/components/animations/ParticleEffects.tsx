'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'

/**
 * パーティクル爆発エフェクト
 * クリックやトリガーで爆発的にパーティクルを放出
 */
interface ParticleExplosionProps {
  trigger: boolean
  count?: number
  colors?: string[]
  size?: number
  duration?: number
  distance?: number
  className?: string
  onComplete?: () => void
}

export function ParticleExplosion({
  trigger,
  count = 20,
  colors = ['#00d4ff', '#8b5cf6', '#ff0080', '#00ff88'],
  size = 8,
  duration = 1.5,
  distance = 150,
  className = '',
  onComplete,
}: ParticleExplosionProps) {
  const particles = useMemo(
    () => {
      // 固定されたシード値を使用して一貫性のある乱数を生成
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000
        return x - Math.floor(x)
      }
      
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: Math.round(((Math.PI * 2 * i) / count + seededRandom(i * 2) * 0.5) * 1000) / 1000,
        distance: Math.round(distance * (0.5 + seededRandom(i * 3) * 0.5) * 100) / 100,
        color: colors[Math.floor(seededRandom(i * 5) * colors.length)],
        scale: Math.round((0.5 + seededRandom(i * 7) * 0.5) * 100) / 100,
        duration: Math.round(duration * (0.8 + seededRandom(i * 11) * 0.4) * 100) / 100,
      }))
    },
    [count, colors, distance, duration]
  )

  useEffect(() => {
    if (trigger && onComplete) {
      const timer = setTimeout(onComplete, duration * 1000)
      return () => clearTimeout(timer)
    }
  }, [trigger, duration, onComplete])

  return (
    <AnimatePresence>
      {trigger && (
        <div className={`pointer-events-none absolute inset-0 ${className}`}>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full"
              style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: particle.color,
                left: '50%',
                top: '50%',
                boxShadow: `0 0 ${size}px ${particle.color}`,
              }}
              initial={{
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                scale: [0, particle.scale, particle.scale * 0.5, 0],
                x: Math.cos(particle.angle) * particle.distance,
                y: Math.sin(particle.angle) * particle.distance,
                opacity: [0, 1, 0.5, 0],
              }}
              exit={{
                scale: 0,
                opacity: 0,
              }}
              transition={{
                duration: particle.duration,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

/**
 * 花火エフェクト
 * より複雑な花火のようなパーティクルエフェクト
 */
interface FireworksProps {
  x: number
  y: number
  trigger: boolean
  colors?: string[]
  layers?: number
  particlesPerLayer?: number
  onComplete?: () => void
}

export function Fireworks({
  x,
  y,
  trigger,
  colors = ['#00d4ff', '#8b5cf6', '#ff0080', '#ffff00', '#00ff88'],
  layers = 3,
  particlesPerLayer = 12,
  onComplete,
}: FireworksProps) {
  const [stage, setStage] = useState<'launch' | 'explode' | 'fade'>('launch')

  useEffect(() => {
    if (!trigger) {
      setStage('launch')
      return
    }

    const timers: NodeJS.Timeout[] = []

    // 打ち上げ → 爆発
    timers.push(
      setTimeout(() => setStage('explode'), 500)
    )

    // 爆発 → フェード
    timers.push(
      setTimeout(() => {
        setStage('fade')
        onComplete?.()
      }, 2000)
    )

    return () => timers.forEach(clearTimeout)
  }, [trigger, onComplete])

  const explosionParticles = useMemo(() => {
    // 固定されたシード値を使用して一貫性のある乱数を生成
    const seededRandom = (seed: number) => {
      const x = Math.sin(seed) * 10000
      return x - Math.floor(x)
    }
    
    const particles = []
    for (let layer = 0; layer < layers; layer++) {
      for (let i = 0; i < particlesPerLayer; i++) {
        const angle = (Math.PI * 2 * i) / particlesPerLayer
        const layerDelay = layer * 0.1
        const distance = 100 + layer * 50
        const seed = layer * 100 + i
        
        particles.push({
          id: `${layer}-${i}`,
          angle,
          distance,
          color: colors[Math.floor(seededRandom(seed) * colors.length)],
          delay: layerDelay,
          scale: 1 - layer * 0.2,
        })
      }
    }
    return particles
  }, [layers, particlesPerLayer, colors])

  return (
    <AnimatePresence>
      {trigger && (
        <div 
          className="pointer-events-none fixed"
          style={{ left: x, top: y }}
        >
          {/* 打ち上げトレイル */}
          {stage === 'launch' && (
            <motion.div
              className="absolute w-1 bg-gradient-to-t from-neon-blue to-transparent"
              initial={{ height: 0, y: 0 }}
              animate={{ height: 100, y: -100 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
          )}

          {/* 爆発 */}
          {stage === 'explode' && explosionParticles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                backgroundColor: particle.color,
                boxShadow: `0 0 10px ${particle.color}`,
              }}
              initial={{
                scale: 0,
                x: 0,
                y: 0,
              }}
              animate={{
                scale: [0, particle.scale, 0],
                x: Math.cos(particle.angle) * particle.distance,
                y: Math.sin(particle.angle) * particle.distance,
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 1.5,
                delay: particle.delay,
                ease: 'easeOut',
              }}
            />
          ))}

          {/* トレイルパーティクル */}
          {stage === 'explode' && explosionParticles.map((particle) => (
            <motion.div
              key={`trail-${particle.id}`}
              className="absolute"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{
                duration: 2,
                delay: particle.delay + 0.2,
              }}
            >
              {Array.from({ length: 5 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full"
                  style={{
                    backgroundColor: particle.color,
                  }}
                  animate={{
                    x: Math.cos(particle.angle) * particle.distance * (i * 0.2),
                    y: Math.sin(particle.angle) * particle.distance * (i * 0.2) + i * 5,
                    opacity: [0, 0.5 - i * 0.1, 0],
                  }}
                  transition={{
                    duration: 1,
                    delay: particle.delay + i * 0.05,
                  }}
                />
              ))}
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

/**
 * 星屑エフェクト
 * 常に浮遊している星のようなパーティクル
 */
interface StarfieldProps {
  count?: number
  className?: string
}

export function Starfield({
  count = 50,
  className = '',
}: StarfieldProps) {
  const stars = useMemo(
    () => {
      // 固定されたシード値を使用して一貫性のある乱数を生成
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000
        return x - Math.floor(x)
      }
      
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.round(seededRandom(i * 2) * 10000) / 100,
        y: Math.round(seededRandom(i * 3) * 10000) / 100,
        size: Math.round((seededRandom(i * 5) * 3 + 1) * 100) / 100,
        duration: Math.round((seededRandom(i * 7) * 20 + 10) * 100) / 100,
        delay: Math.round(seededRandom(i * 11) * 500) / 100,
        opacity: Math.round((seededRandom(i * 13) * 0.5 + 0.5) * 100) / 100,
      }))
    },
    [count]
  )

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            opacity: [star.opacity, star.opacity * 0.3, star.opacity],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/**
 * カーソル追従パーティクル
 * マウスカーソルの動きに追従するパーティクル
 */
interface CursorParticlesProps {
  color?: string
  size?: number
  count?: number
}

export function CursorParticles({
  color = '#00d4ff',
  size = 4,
  count = 10,
}: CursorParticlesProps) {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
  }>>([])

  useEffect(() => {
    let particleId = 0

    const handleMouseMove = (e: MouseEvent) => {
      const newParticle = {
        id: particleId++,
        x: e.clientX,
        y: e.clientY,
      }

      setParticles((prev) => [...prev.slice(-count + 1), newParticle])
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              left: `${particle.x}px`,
              top: `${particle.y}px`,
              boxShadow: `0 0 ${size * 2}px ${color}`,
            }}
            initial={{
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: 1,
              opacity: 0,
            }}
            exit={{
              scale: 0,
              opacity: 0,
            }}
            transition={{
              duration: 1,
              ease: 'easeOut',
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

/**
 * 泡エフェクト
 * 下から上に浮かび上がる泡のアニメーション
 */
interface BubblesProps {
  count?: number
  className?: string
}

export function Bubbles({
  count = 20,
  className = '',
}: BubblesProps) {
  const bubbles = useMemo(
    () => {
      // 固定されたシード値を使用して一貫性のある乱数を生成
      const seededRandom = (seed: number) => {
        const x = Math.sin(seed) * 10000
        return x - Math.floor(x)
      }
      
      return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.round(seededRandom(i * 2) * 10000) / 100,
        size: Math.round((seededRandom(i * 3) * 20 + 10) * 100) / 100,
        duration: Math.round((seededRandom(i * 5) * 10 + 5) * 100) / 100,
        delay: Math.round(seededRandom(i * 7) * 500) / 100,
      }))
    },
    [count]
  )

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border border-neon-blue/30 bg-neon-blue/10"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.x}%`,
          }}
          initial={{
            y: '100vh',
          }}
          animate={{
            y: '-100px',
            x: [0, 10, -10, 0],
          }}
          transition={{
            y: {
              duration: bubble.duration,
              repeat: Infinity,
              ease: 'linear',
              delay: bubble.delay,
            },
            x: {
              duration: 3,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: bubble.delay,
            },
          }}
        />
      ))}
    </div>
  )
}