'use client'

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { ReactNode, useRef, useState, MouseEvent } from 'react'

interface InteractiveCardProps {
  children: ReactNode
  className?: string
  glowEffect?: boolean
  tiltEffect?: boolean
  hoverScale?: number
  clickScale?: number
  shadowColor?: string
}

/**
 * インタラクティブカードコンポーネント
 * ホバー時の3Dティルト効果、グロウエフェクト、クリック時のアニメーション
 */
export default function InteractiveCard({
  children,
  className = '',
  glowEffect = true,
  tiltEffect = true,
  hoverScale = 1.02,
  clickScale = 0.98,
  shadowColor = 'rgba(0, 212, 255, 0.5)',
}: InteractiveCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // マウス位置を追跡
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // 3D回転値
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  
  // グラデーション位置
  const gradientX = useMotionValue(50)
  const gradientY = useMotionValue(50)

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !tiltEffect) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // マウス位置を計算（-1 から 1 の範囲）
    const x = (e.clientX - centerX) / (rect.width / 2)
    const y = (e.clientY - centerY) / (rect.height / 2)
    
    // 回転角度を設定（最大15度）
    rotateX.set(-y * 15)
    rotateY.set(x * 15)
    
    // グラデーション位置を設定
    gradientX.set(((e.clientX - rect.left) / rect.width) * 100)
    gradientY.set(((e.clientY - rect.top) / rect.height) * 100)
    
    // マウス位置を更新
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }

  const handleMouseLeave = () => {
    // リセット
    rotateX.set(0)
    rotateY.set(0)
    gradientX.set(50)
    gradientY.set(50)
    setIsHovered(false)
  }

  // グラデーション背景
  const background = useMotionTemplate`
    radial-gradient(
      600px circle at ${gradientX}% ${gradientY}%,
      ${shadowColor},
      transparent 40%
    )
  `

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
      animate={{
        scale: isHovered ? hoverScale : 1,
      }}
      whileTap={{ scale: clickScale }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 30,
      }}
    >
      {/* 3D回転エフェクト */}
      <motion.div
        style={{
          rotateX: tiltEffect ? rotateX : 0,
          rotateY: tiltEffect ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 30,
        }}
      >
        {/* カード本体 */}
        <div className="relative" style={{ transform: 'translateZ(0)' }}>
          {children}
        </div>

        {/* グロウエフェクト背景 */}
        {glowEffect && (
          <motion.div
            className="absolute inset-0 rounded-lg opacity-0 -z-10"
            style={{
              background,
            }}
            animate={{
              opacity: isHovered ? 0.6 : 0,
            }}
            transition={{ duration: 0.3 }}
          />
        )}

        {/* ホバー時の光沢エフェクト */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-lg pointer-events-none"
            style={{
              background: `linear-gradient(105deg, transparent 40%, rgba(255, 255, 255, 0.1) 50%, transparent 60%)`,
              transform: 'translateZ(1px)',
            }}
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 0.6,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.div>

      {/* 影エフェクト */}
      <motion.div
        className="absolute inset-0 rounded-lg blur-xl -z-20"
        style={{
          background: `linear-gradient(135deg, ${shadowColor}, transparent)`,
        }}
        animate={{
          opacity: isHovered ? 0.4 : 0,
          scale: isHovered ? 1.1 : 0.8,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

/**
 * マグネティックボタンコンポーネント
 * マウスカーソルに引き寄せられる効果
 */
interface MagneticButtonProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.5,
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return

    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // マグネティック効果の計算
    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength

    x.set(distanceX)
    y.set(distanceY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      transition={{
        type: 'spring',
        stiffness: 150,
        damping: 15,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

/**
 * 3Dフリップカード
 */
interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  className?: string
  flipDirection?: 'horizontal' | 'vertical'
}

export function FlipCard({
  front,
  back,
  className = '',
  flipDirection = 'horizontal',
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)

  const flipAnimation = {
    rotateY: flipDirection === 'horizontal' ? 180 : 0,
    rotateX: flipDirection === 'vertical' ? 180 : 0,
  }

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: 1000 }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="relative w-full h-full cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={isFlipped ? flipAnimation : { rotateY: 0, rotateX: 0 }}
        transition={{
          duration: 0.6,
          type: 'spring',
          stiffness: 100,
          damping: 30,
        }}
      >
        {/* 表面 */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>

        {/* 裏面 */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            transform: flipDirection === 'horizontal' 
              ? 'rotateY(180deg)' 
              : 'rotateX(180deg)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  )
}