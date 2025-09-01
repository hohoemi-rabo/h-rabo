'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  size: number
  color: string
  id: number
}

interface Connection {
  particle1: Particle
  particle2: Particle
  distance: number
  opacity: number
}

interface ParticleNetworkProps {
  particleCount?: number
  connectionDistance?: number
  particleSpeed?: number
  colors?: string[]
  className?: string
  interactive?: boolean
  mouseInfluence?: number
}

/**
 * パーティクルネットワークエフェクト
 * 動的に接続されるパーティクルシステム
 */
export default function ParticleNetwork({
  particleCount = 80,
  connectionDistance = 120,
  particleSpeed = 0.5,
  colors = ['#00d4ff', '#8b5cf6', '#ff0080', '#00ff88'],
  className = '',
  interactive = true,
  mouseInfluence = 100,
}: ParticleNetworkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const mouseRef = useRef({ x: 0, y: 0 })
  
  const [isVisible, setIsVisible] = useState(true)
  const [performance, setPerformance] = useState({ fps: 60, shouldOptimize: false })

  // パーティクル生成
  const createParticle = useCallback((canvas: HTMLCanvasElement, id?: number): Particle => {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * particleSpeed,
      vy: (Math.random() - 0.5) * particleSpeed,
      life: 0,
      maxLife: 200 + Math.random() * 300,
      size: 1 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      id: id ?? Math.random(),
    }
  }, [particleSpeed, colors])

  // パーティクル初期化
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    const optimizedCount = performance.shouldOptimize 
      ? Math.floor(particleCount * 0.6) 
      : particleCount

    particlesRef.current = Array.from({ length: optimizedCount }, (_, i) => 
      createParticle(canvas, i)
    )
  }, [createParticle, particleCount, performance.shouldOptimize])

  // 接続線の計算と描画
  const drawConnections = useCallback((
    ctx: CanvasRenderingContext2D, 
    particles: Particle[]
  ) => {
    const connections: Connection[] = []
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < connectionDistance) {
          const opacity = Math.max(0, 1 - distance / connectionDistance)
          connections.push({
            particle1: particles[i],
            particle2: particles[j],
            distance,
            opacity: opacity * 0.5,
          })
        }
      }
    }

    // 接続線を描画
    connections.forEach(connection => {
      ctx.strokeStyle = `rgba(139, 92, 246, ${connection.opacity})`
      ctx.lineWidth = 0.5
      ctx.beginPath()
      ctx.moveTo(connection.particle1.x, connection.particle1.y)
      ctx.lineTo(connection.particle2.x, connection.particle2.y)
      ctx.stroke()
    })

    return connections
  }, [connectionDistance])

  // パーティクル更新
  const updateParticle = useCallback((
    particle: Particle, 
    canvas: HTMLCanvasElement,
    mousePos: { x: number, y: number }
  ) => {
    // マウスの影響
    if (interactive) {
      const dx = mousePos.x - particle.x
      const dy = mousePos.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (distance < mouseInfluence && distance > 0) {
        const force = (mouseInfluence - distance) / mouseInfluence
        particle.vx += (dx / distance) * force * 0.01
        particle.vy += (dy / distance) * force * 0.01
      }
    }

    // 位置更新
    particle.x += particle.vx
    particle.y += particle.vy
    particle.life++

    // 境界反射
    if (particle.x <= 0 || particle.x >= canvas.width) {
      particle.vx *= -0.8
      particle.x = Math.max(0, Math.min(canvas.width, particle.x))
    }
    if (particle.y <= 0 || particle.y >= canvas.height) {
      particle.vy *= -0.8
      particle.y = Math.max(0, Math.min(canvas.height, particle.y))
    }

    // 速度減衰
    particle.vx *= 0.99
    particle.vy *= 0.99

    // リスポーン
    if (particle.life > particle.maxLife) {
      Object.assign(particle, createParticle(canvas, particle.id))
    }
  }, [interactive, mouseInfluence, createParticle])

  // FPS監視
  const monitorPerformance = useCallback(() => {
    let frameCount = 0
    let lastTime = performance.now()

    const checkFPS = () => {
      frameCount++
      const currentTime = performance.now()
      
      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime))
        setPerformance(prev => ({
          fps,
          shouldOptimize: fps < 30,
        }))
        
        frameCount = 0
        lastTime = currentTime
      }
    }

    return checkFPS
  }, [])

  // メインアニメーションループ
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisible) return

    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const checkFPS = monitorPerformance()

    // Canvas サイズ調整
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = rect.height
      initParticles(canvas)
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // マウス追跡
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      }
    }

    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }

    // アニメーションループ
    const animate = () => {
      checkFPS()
      
      // クリア（フェード効果付き）
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      const particles = particlesRef.current

      // パーティクル更新
      particles.forEach(particle => {
        updateParticle(particle, canvas, mouseRef.current)
      })

      // 接続線描画
      if (!performance.shouldOptimize) {
        drawConnections(ctx, particles)
      }

      // パーティクル描画
      particles.forEach(particle => {
        const lifeRatio = 1 - (particle.life / particle.maxLife)
        const alpha = Math.max(0.3, lifeRatio)
        
        // パーティクルの描画
        ctx.fillStyle = particle.color.replace(')', `, ${alpha})`)
          .replace('rgb', 'rgba')
          .replace('#', 'rgba(') + (particle.color.startsWith('#') ? 
            `${parseInt(particle.color.slice(1, 3), 16)}, ${parseInt(particle.color.slice(3, 5), 16)}, ${parseInt(particle.color.slice(5, 7), 16)}, ${alpha})` : '')
        
        // 簡易的な色変換（#形式の場合）
        if (particle.color.startsWith('#')) {
          const r = parseInt(particle.color.slice(1, 3), 16)
          const g = parseInt(particle.color.slice(3, 5), 16)
          const b = parseInt(particle.color.slice(5, 7), 16)
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`
        } else {
          ctx.fillStyle = particle.color.replace(')', `, ${alpha})`).replace('rgb', 'rgba')
        }

        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // グロウエフェクト
        if (!performance.shouldOptimize && lifeRatio > 0.7) {
          ctx.shadowColor = particle.color
          ctx.shadowBlur = particle.size * 3
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
          ctx.fill()
          ctx.shadowBlur = 0
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove)
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [
    isVisible, 
    initParticles, 
    updateParticle, 
    drawConnections, 
    interactive, 
    monitorPerformance,
    performance.shouldOptimize
  ])

  // Intersection Observer で可視性を監視
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 }
    )

    observer.observe(canvas)

    return () => observer.disconnect()
  }, [])

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          opacity: 0.6,
          mixBlendMode: 'screen',
        }}
      />
      
      {/* パフォーマンス情報（開発時のみ） */}
      {process.env.NODE_ENV === 'development' && (
        <motion.div 
          className="absolute top-2 left-2 text-xs text-white/70 font-mono bg-black/50 px-2 py-1 rounded"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div>FPS: {performance.fps}</div>
          <div>Particles: {particlesRef.current.length}</div>
          {performance.shouldOptimize && (
            <div className="text-yellow-400">Optimizing...</div>
          )}
        </motion.div>
      )}
    </div>
  )
}

/**
 * シンプル版パーティクルネットワーク
 * 軽量で基本的な機能のみ
 */
interface SimpleParticleNetworkProps {
  className?: string
}

export function SimpleParticleNetwork({ className }: SimpleParticleNetworkProps) {
  return (
    <ParticleNetwork
      particleCount={40}
      connectionDistance={100}
      particleSpeed={0.3}
      colors={['#00d4ff80', '#8b5cf680']}
      className={className}
      interactive={false}
      mouseInfluence={0}
    />
  )
}