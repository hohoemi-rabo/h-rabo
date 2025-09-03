'use client'

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef, useState, MouseEvent } from 'react'

interface MagneticButtonProps {
  children: React.ReactNode
  strength?: number
  distance?: number
  className?: string
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  onMouseMove?: (e: MouseEvent<HTMLButtonElement>) => void
}

/**
 * 磁石効果ボタンコンポーネント
 * マウスカーソルに引き寄せられるマグネティックエフェクト
 */
export default function MagneticButton({
  children,
  strength = 0.4,
  distance = 100,
  className = '',
  onClick,
  variant = 'primary',
  size = 'md',
  onMouseMove,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // マウス位置の追跡
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // ボタンの移動量（スプリングアニメーション）
  const springConfig = { damping: 20, stiffness: 300 }
  const x = useSpring(0, springConfig)
  const y = useSpring(0, springConfig)
  
  // 回転効果
  const rotateX = useTransform(y, [-20, 20], [5, -5])
  const rotateY = useTransform(x, [-20, 20], [-5, 5])

  // バリアント別スタイル
  const getVariantClass = () => {
    const baseClass = 'relative overflow-hidden font-semibold transition-all duration-300'
    const sizeClass = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg',
    }[size]

    const variantClass = {
      primary: 'bg-gradient-to-r from-neon-blue to-neon-purple text-white border border-transparent hover:shadow-neon',
      secondary: 'bg-transparent text-neon-blue border border-neon-blue hover:bg-neon-blue/10',
      ghost: 'bg-transparent text-white border border-white/30 hover:border-white/60',
    }[variant]

    return `${baseClass} ${sizeClass} ${variantClass} ${className}`
  }

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const deltaX = e.clientX - centerX
    const deltaY = e.clientY - centerY
    const distanceFromCenter = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // 磁石効果の範囲内かチェック
    if (distanceFromCenter < distance) {
      const magneticStrength = Math.max(0, 1 - distanceFromCenter / distance)
      const magneticX = deltaX * strength * magneticStrength
      const magneticY = deltaY * strength * magneticStrength
      
      x.set(magneticX)
      y.set(magneticY)
      
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    // 外部のonMouseMoveハンドラがあれば呼び出し
    if (onMouseMove) {
      onMouseMove(e)
    }
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <motion.button
      ref={buttonRef}
      className={getVariantClass()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        x,
        y,
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 背景グラデーション */}
      <motion.div
        className="absolute inset-0 opacity-0 bg-gradient-to-r from-neon-pink/30 via-neon-blue/30 to-neon-purple/30"
        animate={{
          opacity: isHovered ? 1 : 0,
          scale: isHovered ? 1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* 磁場視覚化 */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mouseX.get() + 50}% ${mouseY.get() + 50}%, 
              rgba(0, 212, 255, 0.3) 0%, 
              rgba(139, 92, 246, 0.2) 30%, 
              transparent 60%)`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* リップル効果 */}
      {isHovered && (
        <>
          <motion.div
            className="absolute inset-0 border border-white/30 rounded-lg"
            animate={{
              scale: [1, 1.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
          <motion.div
            className="absolute inset-0 border border-white/20 rounded-lg"
            animate={{
              scale: [1, 1.8],
              opacity: [0.3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
              delay: 0.5,
            }}
          />
        </>
      )}

      {/* パーティクルエフェクト */}
      {isHovered && (
        <div className="absolute inset-0 overflow-hidden rounded-lg">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full"
              style={{
                left: `${20 + i * 10}%`,
                top: '50%',
              }}
              animate={{
                y: [0, -10, 0],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      )}

      {/* 子要素 */}
      <motion.span
        className="relative z-10 block"
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.span>

      {/* ホバー時の光沢エフェクト */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          style={{
            transform: 'skewX(-20deg)',
          }}
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 0.8,
            ease: 'easeInOut',
          }}
        />
      )}
    </motion.button>
  )
}

/**
 * 拡張マグネティックボタン
 * より強力な磁石効果と追加のビジュアルエフェクト
 */
interface EnhancedMagneticButtonProps extends MagneticButtonProps {
  showTrail?: boolean
  glowIntensity?: number
}

export function EnhancedMagneticButton({
  children,
  strength = 0.6,
  distance = 150,
  className = '',
  onClick,
  variant = 'primary',
  size = 'lg',
  showTrail = true,
  glowIntensity = 1,
}: EnhancedMagneticButtonProps) {
  const [trailPositions, setTrailPositions] = useState<Array<{x: number, y: number, id: number}>>([])

  const handleTrailUpdate = (e: MouseEvent<HTMLButtonElement>) => {
    if (!showTrail) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setTrailPositions(prev => [
      ...prev.slice(-8), // 最新8個のポイントを保持
      { x, y, id: Date.now() }
    ])
  }

  return (
    <div className="relative">
      <MagneticButton
        strength={strength}
        distance={distance}
        className={className}
        onClick={onClick}
        variant={variant}
        size={size}
        onMouseMove={handleTrailUpdate}
      >
        {children}
      </MagneticButton>

      {/* トレイルエフェクト */}
      {showTrail && trailPositions.map((pos, index) => (
        <motion.div
          key={pos.id}
          className="absolute w-2 h-2 bg-neon-blue rounded-full pointer-events-none"
          style={{
            left: pos.x - 4,
            top: pos.y - 4,
          }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ 
            opacity: 0, 
            scale: 0,
          }}
          transition={{ 
            duration: 0.8,
            delay: index * 0.05,
          }}
        />
      ))}

      {/* グローエフェクト */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-xl -z-10"
        style={{
          background: `linear-gradient(45deg, 
            rgba(0, 212, 255, ${0.3 * glowIntensity}), 
            rgba(139, 92, 246, ${0.2 * glowIntensity}))`,
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}