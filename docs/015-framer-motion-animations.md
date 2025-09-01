# 015: Framer Motion基本アニメーション実装

## 概要

サイト全体にスムーズで印象的なアニメーションをFramer Motionで実装する

## 優先度

High

## 前提条件

- 001: プロジェクトセットアップが完了していること
- 010: 各セクションのサイバーデザイン実装が完了していること

## Todoリスト

- [×] 基本アニメーション設定
  - [×] グローバルアニメーション設定
  - [×] イージング関数のカスタム定義
  - [×] アニメーション用のバリアント作成
- [×] ページ読み込み時アニメーション
  - [×] テキストのタイピングアニメーション
  - [×] 要素の順次出現アニメーション
  - [×] スケールとフェードの組み合わせ
- [×] スクロールトリガーアニメーション
  - [×] Intersection Observer活用
  - [×] スクロール進行度に応じたアニメーション
  - [×] パララックス効果
- [×] ホバーアニメーション
  - [×] カードのホバーエフェクト
  - [×] ボタンのマイクロインタラクション
  - [×] アイコンの変形アニメーション
- [×] ローディングアニメーション
  - [×] スケルトンローディング
  - [×] プログレスインジケーター
  - [×] データ読み込み状態の表示
- [×] 特殊エフェクト
  - [×] モーフィングアニメーション
  - [×] パーティクルアニメーション
  - [×] グロウエフェクト

## 実装詳細

### グローバルアニメーション設定

```typescript
// lib/animations.ts
export const globalAnimations = {
  // 基本的なイージング
  easing: {
    smooth: [0.25, 0.46, 0.45, 0.94],
    bounce: [0.68, -0.55, 0.265, 1.55],
    elastic: [0.175, 0.885, 0.32, 1.275],
  },

  // 基本的なデュレーション
  duration: {
    fast: 0.2,
    normal: 0.3,
    slow: 0.5,
    slower: 0.8,
  },

  // 遅延設定
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.2,
  },
}

// 共通バリアント
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: globalAnimations.duration.normal,
      ease: globalAnimations.easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: {
      duration: globalAnimations.duration.fast,
    },
  },
}

export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: globalAnimations.duration.normal,
      ease: globalAnimations.easing.bounce,
    },
  },
}

export const slideInLeft = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: globalAnimations.duration.slow,
      ease: globalAnimations.easing.smooth,
    },
  },
}
```

### タイピングアニメーション

```tsx
// components/animations/TypingText.tsx
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface TypingTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  onComplete?: () => void
}

export default function TypingText({
  text,
  speed = 100,
  delay = 0,
  className = '',
  onComplete,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(
      () => {
        if (displayedText.length < text.length) {
          setDisplayedText(text.slice(0, displayedText.length + 1))
        } else if (!isComplete) {
          setIsComplete(true)
          onComplete?.()
        }
      },
      displayedText.length === 0 ? delay : speed
    )

    return () => clearTimeout(timer)
  }, [displayedText, text, speed, delay, isComplete, onComplete])

  return (
    <motion.span className={className}>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, ease: 'easeInOut' }}
        className="bg-neon-blue ml-1 inline-block h-8 w-1"
      />
    </motion.span>
  )
}
```

### スクロール連動アニメーション

```tsx
// hooks/useScrollAnimation.ts
import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { useRef } from 'react'

export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  return { ref, y, opacity, scale, scrollYProgress }
}

// components/animations/ScrollReveal.tsx
interface ScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  delay?: number
}

export default function ScrollReveal({ children, direction = 'up', delay = 0 }: ScrollRevealProps) {
  const { ref, y, opacity } = useScrollAnimation()

  const directionOffsets = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: -50, y: 0 },
    right: { x: 50, y: 0 },
  }

  return (
    <motion.div
      ref={ref}
      initial={{
        opacity: 0,
        ...directionOffsets[direction],
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.div>
  )
}
```

### 高度なホバーエフェクト

```tsx
// components/animations/InteractiveCard.tsx
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'

interface InteractiveCardProps {
  children: React.ReactNode
  className?: string
  glowEffect?: boolean
}

export default function InteractiveCard({
  children,
  className = '',
  glowEffect = true,
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height

    setMousePosition({ x, y })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        rotateX: isHovered ? mousePosition.y * 10 : 0,
        rotateY: isHovered ? mousePosition.x * 10 : 0,
        scale: isHovered ? 1.02 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {children}

      {/* グロウエフェクト */}
      {glowEffect && (
        <motion.div
          className="from-neon-blue/20 to-neon-purple/20 absolute inset-0 rounded-lg bg-gradient-to-r blur-xl"
          animate={{
            opacity: isHovered ? 0.6 : 0,
            scale: isHovered ? 1.1 : 0.8,
          }}
          transition={{ duration: 0.3 }}
          style={{ zIndex: -1 }}
        />
      )}
    </motion.div>
  )
}
```

### ローディングアニメーション

```tsx
// components/animations/LoadingStates.tsx
export function SkeletonLoader({
  width = '100%',
  height = '20px',
  className = '',
}: {
  width?: string
  height?: string
  className?: string
}) {
  return (
    <motion.div
      className={`bg-dark-700 rounded ${className}`}
      style={{ width, height }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export function CyberLoader() {
  return (
    <div className="flex items-center justify-center">
      <motion.div className="relative h-16 w-16">
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="border-neon-blue absolute inset-0 rounded-full border-2"
            animate={{
              scale: [1, 2, 1],
              opacity: [1, 0, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}

export function ProgressRing({
  progress,
  size = 60,
  strokeWidth = 4,
}: {
  progress: number
  size?: number
  strokeWidth?: number
}) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI

  return (
    <motion.svg width={size} height={size} className="-rotate-90 transform">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="#2a2a2a"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="url(#gradient)"
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset: circumference - (progress / 100) * circumference }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
      <defs>
        <linearGradient id="gradient">
          <stop offset="0%" stopColor="#00d4ff" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
```

### パーティクル爆発エフェクト

```tsx
// components/animations/ParticleExplosion.tsx
import { motion } from 'framer-motion'
import { useMemo } from 'react'

export default function ParticleExplosion({
  trigger,
  count = 20,
  colors = ['#00d4ff', '#8b5cf6', '#ff0080'],
}: {
  trigger: boolean
  count?: number
  colors?: string[]
}) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        angle: (Math.PI * 2 * i) / count,
        distance: Math.random() * 100 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
        scale: Math.random() * 0.5 + 0.5,
      })),
    [count, colors]
  )

  if (!trigger) return null

  return (
    <div className="pointer-events-none absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute h-2 w-2 rounded-full"
          style={{
            backgroundColor: particle.color,
            left: '50%',
            top: '50%',
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
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
```

## 完了条件

- 全てのアニメーションがスムーズに動作する
- パフォーマンスが60fps以上で維持される
- アクセシビリティ設定が適切に反映される
- モバイル端末でのアニメーションが最適化されている
