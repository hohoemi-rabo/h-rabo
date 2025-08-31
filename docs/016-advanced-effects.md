# 016: 高度なエフェクト・インタラクション実装

## 概要
パフォーマンスを維持しながら、印象的な視覚効果とインタラクションを実装する

## 優先度
Medium

## 前提条件
- 015: Framer Motion基本アニメーション実装が完了していること
- 013: Three.js 3D要素の実装が完了していること

## Todoリスト
- [ ] カーソル追従エフェクト
  - [ ] カスタムカーソルデザイン
  - [ ] マウストレイル効果
  - [ ] ホバー時のカーソル変形
  - [ ] インタラクティブ要素での反応
- [ ] 背景エフェクト
  - [ ] 動的グラデーション
  - [ ] ノイズテクスチャ
  - [ ] パーティクルネットワーク
  - [ ] 環境光の変化
- [ ] テキストエフェクト
  - [ ] グリッチエフェクト
  - [ ] ホログラム風テキスト
  - [ ] 文字の分散・結合アニメーション
  - [ ] タイポグラフィモーフィング
- [ ] インタラクティブUI要素
  - [ ] 磁石効果（Magnetic Button）
  - [ ] リキッドドロップ効果
  - [ ] モーフィングアイコン
  - [ ] 音波視覚化（擬似）
- [ ] パフォーマンス最適化
  - [ ] Canvas最適化
  - [ ] GPU加速の活用
  - [ ] メモリリーク対策
  - [ ] フレームレート監視

## 実装詳細
### カスタムカーソル
```tsx
// components/effects/CustomCursor.tsx
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'click'>('default')
  
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    
    const handleMouseDown = () => setCursorType('click')
    const handleMouseUp = () => setCursorType('default')
    
    window.addEventListener('mousemove', updateMousePosition)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])
  
  const cursorVariants = {
    default: {
      scale: 1,
      backgroundColor: '#00d4ff',
      mixBlendMode: 'difference' as const,
    },
    hover: {
      scale: 1.5,
      backgroundColor: '#ff0080',
      mixBlendMode: 'difference' as const,
    },
    click: {
      scale: 0.8,
      backgroundColor: '#00ff88',
    }
  }
  
  return (
    <>
      {/* メインカーソル */}
      <motion.div
        className="fixed w-6 h-6 rounded-full pointer-events-none z-50"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
          ...cursorVariants[cursorType]
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      
      {/* トレイルカーソル */}
      <motion.div
        className="fixed w-8 h-8 rounded-full border border-neon-blue pointer-events-none z-40"
        animate={{
          x: mousePosition.x - 16,
          y: mousePosition.y - 16,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      />
    </>
  )
}
```

### グリッチテキストエフェクト
```tsx
// components/effects/GlitchText.tsx
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface GlitchTextProps {
  text: string
  glitchIntensity?: number
  className?: string
}

export default function GlitchText({ 
  text, 
  glitchIntensity = 3,
  className = '' 
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchText, setGlitchText] = useState(text)
  
  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?'
  
  useEffect(() => {
    if (!isGlitching) return
    
    const interval = setInterval(() => {
      let newText = text
      for (let i = 0; i < glitchIntensity; i++) {
        const randomIndex = Math.floor(Math.random() * text.length)
        const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
        newText = newText.substring(0, randomIndex) + randomChar + newText.substring(randomIndex + 1)
      }
      setGlitchText(newText)
    }, 50)
    
    const timeout = setTimeout(() => {
      setIsGlitching(false)
      setGlitchText(text)
    }, 200)
    
    return () => {
      clearInterval(interval)
      clearTimeout(timeout)
    }
  }, [isGlitching, text, glitchIntensity])
  
  return (
    <motion.span
      className={`relative inline-block cursor-pointer ${className}`}
      onHoverStart={() => setIsGlitching(true)}
      style={{
        filter: isGlitching ? 'hue-rotate(90deg)' : 'none',
        textShadow: isGlitching ? '2px 0 #ff0080, -2px 0 #00d4ff' : 'none'
      }}
    >
      {glitchText}
      
      {/* データストリームエフェクト */}
      {isGlitching && (
        <motion.span
          className="absolute -inset-1 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20"
          animate={{
            scaleX: [0, 1, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{ duration: 0.2, repeat: Infinity }}
        />
      )}
    </motion.span>
  )
}
```

### 磁石効果ボタン
```tsx
// components/effects/MagneticButton.tsx
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  strength?: number
  className?: string
  onClick?: () => void
}

export default function MagneticButton({ 
  children, 
  strength = 0.3,
  className = '',
  onClick 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return
    
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = (e.clientX - centerX) * strength
    const deltaY = (e.clientY - centerY) * strength
    
    setPosition({ x: deltaX, y: deltaY })
  }
  
  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 })
    setIsHovered(false)
  }
  
  return (
    <motion.button
      ref={buttonRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{
        x: position.x,
        y: position.y,
        scale: isHovered ? 1.05 : 1
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
    >
      {children}
      
      {/* 磁場視覚化 */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-radial from-neon-blue/20 to-transparent"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 2, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  )
}
```

### パーティクルネットワーク
```tsx
// components/effects/ParticleNetwork.tsx
import { useRef, useEffect } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
}

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // キャンバスサイズを調整
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // パーティクル初期化
    const initParticles = () => {
      const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000))
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        life: Math.random() * 100,
        maxLife: 100 + Math.random() * 100
      }))
    }
    
    initParticles()
    
    // アニメーションループ
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // パーティクル更新と描画
      particlesRef.current.forEach((particle, index) => {
        // パーティクル移動
        particle.x += particle.vx
        particle.y += particle.vy
        particle.life++
        
        // 境界処理
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1
        
        // リスポーン
        if (particle.life > particle.maxLife) {
          particle.x = Math.random() * canvas.width
          particle.y = Math.random() * canvas.height
          particle.life = 0
        }
        
        // パーティクル描画
        const opacity = 1 - (particle.life / particle.maxLife)
        ctx.fillStyle = `rgba(0, 212, 255, ${opacity * 0.6})`
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, 1, 0, Math.PI * 2)
        ctx.fill()
        
        // 接続線描画
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 100) {
            const lineOpacity = (1 - distance / 100) * opacity * 0.3
            ctx.strokeStyle = `rgba(139, 92, 246, ${lineOpacity})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.stroke()
          }
        })
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }
    
    animate()
    
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])
  
  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: 0.3 }}
    />
  )
}
```

### パフォーマンス監視
```tsx
// hooks/usePerformanceMonitor.ts
import { useEffect, useState } from 'react'

export function usePerformanceMonitor() {
  const [fps, setFps] = useState(60)
  const [memoryUsage, setMemoryUsage] = useState(0)
  
  useEffect(() => {
    let frameCount = 0
    let lastTime = performance.now()
    
    const measurePerformance = () => {
      const currentTime = performance.now()
      frameCount++
      
      if (currentTime - lastTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastTime)))
        frameCount = 0
        lastTime = currentTime
        
        // メモリ使用量（利用可能な場合）
        if ('memory' in performance) {
          const memory = (performance as any).memory
          setMemoryUsage(memory.usedJSHeapSize / memory.totalJSHeapSize)
        }
      }
      
      requestAnimationFrame(measurePerformance)
    }
    
    measurePerformance()
  }, [])
  
  return { fps, memoryUsage }
}

// components/debug/PerformanceIndicator.tsx
export function PerformanceIndicator() {
  const { fps, memoryUsage } = usePerformanceMonitor()
  
  if (process.env.NODE_ENV !== 'development') return null
  
  return (
    <div className="fixed bottom-4 right-4 bg-dark-900/90 text-white p-2 rounded text-sm font-mono z-50">
      <div>FPS: {fps}</div>
      <div>Memory: {Math.round(memoryUsage * 100)}%</div>
    </div>
  )
}
```

## 完了条件
- カスタムカーソルが全デバイスで適切に動作する
- エフェクトがパフォーマンスに悪影響を与えない
- インタラクションが直感的で分かりやすい
- パフォーマンス監視ツールが実装されている