'use client'

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { useState, useRef, useCallback, useEffect } from 'react'

interface FloatingCardProps {
  children: React.ReactNode
  className?: string
  intensity?: number
  rotationRange?: number
}

/**
 * 浮遊カードコンポーネント
 * 3D変形とホバーエフェクトを持つインタラクティブカード
 */
export function FloatingCard({ 
  children, 
  className = '', 
  intensity = 1,
  rotationRange = 10 
}: FloatingCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovered, setIsHovered] = useState(false)

  const rotateX = useSpring(0, { stiffness: 300, damping: 30 })
  const rotateY = useSpring(0, { stiffness: 300, damping: 30 })
  const scale = useSpring(1, { stiffness: 400, damping: 40 })

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    const rotateXValue = (mouseY / (rect.height / 2)) * rotationRange * intensity
    const rotateYValue = (mouseX / (rect.width / 2)) * rotationRange * intensity
    
    rotateX.set(-rotateXValue)
    rotateY.set(rotateYValue)
    
    setMousePosition({
      x: (mouseX / rect.width) * 100 + 50,
      y: (mouseY / rect.height) * 100 + 50,
    })
  }, [rotateX, rotateY, rotationRange, intensity])

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
    scale.set(1.05)
  }, [scale])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    rotateX.set(0)
    rotateY.set(0)
    scale.set(1)
    setMousePosition({ x: 50, y: 50 })
  }, [rotateX, rotateY, scale])

  return (
    <motion.div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl bg-black/20 backdrop-blur-sm border border-white/10 ${className}`}
      style={{
        rotateX,
        rotateY,
        scale,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* ホログラフィックオーバーレイ */}
      <motion.div
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
            rgba(0, 212, 255, 0.4) 0%, 
            rgba(139, 92, 246, 0.3) 30%, 
            transparent 60%)`,
        }}
        animate={{
          opacity: isHovered ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* エッジグロー */}
      <motion.div
        className="absolute inset-0 rounded-xl border pointer-events-none"
        style={{
          borderColor: '#00d4ff',
          boxShadow: isHovered ? '0 0 20px rgba(0, 212, 255, 0.5)' : 'none',
        }}
        animate={{
          opacity: isHovered ? 1 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* リフレクション */}
      {isHovered && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-xl pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* コンテンツ */}
      <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  )
}

interface HolographicButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  variant?: 'primary' | 'secondary' | 'accent'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
}

/**
 * ホログラフィックボタンコンポーネント
 * 近未来的な光る境界線と3Dエフェクト
 */
export function HolographicButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
}: HolographicButtonProps) {
  const [isPressed, setIsPressed] = useState(false)

  const variants = {
    primary: {
      bg: 'bg-gradient-to-r from-neon-blue/20 to-neon-purple/20',
      border: 'border-neon-blue',
      glow: 'shadow-neon-blue',
    },
    secondary: {
      bg: 'bg-gradient-to-r from-neon-purple/20 to-neon-pink/20',
      border: 'border-neon-purple',
      glow: 'shadow-neon-purple',
    },
    accent: {
      bg: 'bg-gradient-to-r from-neon-green/20 to-neon-cyan/20',
      border: 'border-neon-green',
      glow: 'shadow-neon-green',
    },
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  const variantStyle = variants[variant]
  const sizeStyle = sizes[size]

  return (
    <motion.button
      className={`relative overflow-hidden rounded-lg font-semibold text-white border-2 backdrop-blur-sm transition-all duration-300 ${variantStyle.bg} ${variantStyle.border} ${sizeStyle} ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={disabled ? undefined : onClick}
      onMouseDown={() => !disabled && setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      whileHover={disabled ? {} : {
        scale: 1.05,
        boxShadow: '0 0 30px rgba(0, 212, 255, 0.6)',
      }}
      whileTap={disabled ? {} : {
        scale: 0.95,
      }}
      disabled={disabled}
    >
      {/* アニメーション境界線 */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        animate={{
          background: [
            'linear-gradient(0deg, rgba(0,212,255,0.5), transparent, rgba(139,92,246,0.5))',
            'linear-gradient(90deg, rgba(139,92,246,0.5), transparent, rgba(255,0,128,0.5))',
            'linear-gradient(180deg, rgba(255,0,128,0.5), transparent, rgba(0,212,255,0.5))',
            'linear-gradient(270deg, rgba(0,212,255,0.5), transparent, rgba(139,92,246,0.5))',
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* 内部グロー */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        animate={{
          x: ['-100%', '100%'],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* スキャンライン */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-white/20 to-transparent"
        style={{
          height: '2px',
        }}
        animate={{
          y: ['-2px', '100%'],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* プレス効果 */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 0.3 }}
        />
      )}

      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}

interface ParallaxTextProps {
  children: React.ReactNode
  className?: string
  speed?: number
}

/**
 * パララックステキストコンポーネント
 * スクロールに応じて異なる速度で移動する3Dテキスト
 */
export function ParallaxText({ 
  children, 
  className = '', 
  speed = 0.5 
}: ParallaxTextProps) {
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -200 * speed])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      className={`text-white ${className}`}
      style={{
        y,
        opacity,
        transform: 'translateZ(0)', // GPU加速を有効化
      }}
    >
      {children}
    </motion.div>
  )
}

interface DataStreamProps {
  className?: string
  lineCount?: number
  speed?: number
}

/**
 * データストリームエフェクト
 * マトリックス風のデータフロー表現
 */
export function DataStream({ 
  className = '', 
  lineCount = 5,
  speed = 1 
}: DataStreamProps) {
  const streamChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン'

  return (
    <div className={`overflow-hidden ${className}`}>
      {Array.from({ length: lineCount }).map((_, i) => (
        <motion.div
          key={i}
          className="font-mono text-neon-green/60 whitespace-nowrap"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 10 / speed,
            delay: i * 0.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {Array.from({ length: 50 }).map((_, j) => (
            <motion.span
              key={j}
              animate={{
                opacity: [0.3, 1, 0.3],
                color: ['#00ff88', '#00d4ff', '#8b5cf6', '#00ff88'],
              }}
              transition={{
                duration: 2,
                delay: j * 0.1,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              {streamChars[Math.floor(Math.sin(i * j + Date.now() / 1000) * streamChars.length * 0.5 + streamChars.length * 0.5)]}
            </motion.span>
          ))}
        </motion.div>
      ))}
    </div>
  )
}

interface NeonBorderProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  animated?: boolean
}

/**
 * ネオンボーダーコンポーネント
 * 光る境界線エフェクト
 */
export function NeonBorder({ 
  children, 
  className = '', 
  glowColor = '#00d4ff',
  animated = true 
}: NeonBorderProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        scale: animated ? 1.02 : 1,
      }}
    >
      {/* ネオン境界線 */}
      <motion.div
        className="absolute inset-0 rounded-lg border-2"
        style={{
          borderColor: glowColor,
          boxShadow: `0 0 10px ${glowColor}, inset 0 0 10px ${glowColor}20`,
        }}
        animate={animated ? {
          boxShadow: [
            `0 0 10px ${glowColor}, inset 0 0 10px ${glowColor}20`,
            `0 0 20px ${glowColor}, inset 0 0 15px ${glowColor}40`,
            `0 0 10px ${glowColor}, inset 0 0 10px ${glowColor}20`,
          ],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* コーナーディテール */}
      {[0, 1, 2, 3].map((corner) => (
        <motion.div
          key={corner}
          className="absolute w-4 h-4"
          style={{
            ...(corner === 0 && { top: -2, left: -2 }),
            ...(corner === 1 && { top: -2, right: -2 }),
            ...(corner === 2 && { bottom: -2, left: -2 }),
            ...(corner === 3 && { bottom: -2, right: -2 }),
            borderColor: glowColor,
            ...(corner === 0 && { borderTop: '2px solid', borderLeft: '2px solid' }),
            ...(corner === 1 && { borderTop: '2px solid', borderRight: '2px solid' }),
            ...(corner === 2 && { borderBottom: '2px solid', borderLeft: '2px solid' }),
            ...(corner === 3 && { borderBottom: '2px solid', borderRight: '2px solid' }),
          }}
          animate={animated ? {
            opacity: [0.5, 1, 0.5],
          } : {}}
          transition={{
            duration: 1.5,
            delay: corner * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

interface ScrollIndicatorProps {
  className?: string
}

/**
 * スクロールインジケータ
 * 近未来的なスクロール案内
 */
export function ScrollIndicator({ className = '' }: ScrollIndicatorProps) {
  return (
    <motion.div 
      className={`flex flex-col items-center space-y-2 ${className}`}
      animate={{
        y: [0, 10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div className="text-white/60 text-sm font-light tracking-wider">SCROLL</div>
      <div className="relative">
        <div className="w-px h-16 bg-gradient-to-b from-neon-blue to-transparent" />
        <motion.div
          className="absolute top-0 left-0 w-px bg-neon-blue"
          animate={{
            height: [0, 64, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>
      <motion.div
        className="w-2 h-2 rounded-full bg-neon-blue"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  )
}

export default {
  FloatingCard,
  HolographicButton,
  ParallaxText,
  DataStream,
  NeonBorder,
  ScrollIndicator,
}