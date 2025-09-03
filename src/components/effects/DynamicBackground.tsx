'use client'

import { motion, useScroll, useTransform, useTime } from 'framer-motion'
import { useEffect, useState } from 'react'

interface DynamicBackgroundProps {
  variant?: 'gradient' | 'noise' | 'grid' | 'waves'
  intensity?: number
  className?: string
  interactive?: boolean
}

/**
 * 動的背景エフェクトコンポーネント
 * スクロールや時間に応じて変化する背景
 */
export default function DynamicBackground({
  variant = 'gradient',
  intensity = 1,
  className = '',
  interactive = true,
}: DynamicBackgroundProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { scrollYProgress } = useScroll()
  const time = useTime()

  // スクロール連動の変数
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])

  // 時間連動のアニメーション
  const timeBasedRotation = useTransform(time, [0, 10000], [0, 360])
  const pulseScale = useTransform(time, (t) => 1 + Math.sin(t / 1000) * 0.1)

  useEffect(() => {
    if (!interactive) return

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  const renderGradientBackground = () => (
    <motion.div
      className="absolute inset-0"
      style={{
        background: `radial-gradient(
          ellipse at ${mousePosition.x}% ${mousePosition.y}%,
          rgba(0, 212, 255, ${0.3 * intensity}) 0%,
          rgba(139, 92, 246, ${0.2 * intensity}) 25%,
          rgba(255, 0, 128, ${0.15 * intensity}) 50%,
          rgba(0, 0, 0, 0.8) 100%
        ), 
        linear-gradient(
          45deg,
          rgba(0, 212, 255, ${0.1 * intensity}) 0%,
          transparent 50%,
          rgba(139, 92, 246, ${0.1 * intensity}) 100%
        )`,
        y: backgroundY,
        rotate: interactive ? timeBasedRotation : 0,
        scale: pulseScale,
      }}
      transition={{ duration: 0.1, ease: 'linear' }}
    />
  )

  const renderNoiseBackground = () => (
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          radial-gradient(circle at 20% 80%, rgba(0, 212, 255, ${0.2 * intensity}) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(255, 0, 128, ${0.2 * intensity}) 0%, transparent 50%),
          radial-gradient(circle at 40% 40%, rgba(139, 92, 246, ${0.15 * intensity}) 0%, transparent 50%)
        `,
        filter: `blur(${2 * intensity}px)`,
      }}
      animate={{
        backgroundPosition: [
          '0% 0%, 100% 100%, 50% 50%',
          '10% 10%, 90% 90%, 60% 40%',
          '20% 5%, 80% 95%, 40% 60%',
          '0% 0%, 100% 100%, 50% 50%',
        ],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )

  const renderGridBackground = () => (
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 212, 255, ${0.1 * intensity}) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 212, 255, ${0.1 * intensity}) 1px, transparent 1px)
        `,
        backgroundSize: `${50 + mousePosition.x * 0.5}px ${50 + mousePosition.y * 0.5}px`,
        rotate,
      }}
      animate={{
        backgroundPosition: [
          '0px 0px',
          `${25 * intensity}px ${25 * intensity}px`,
          `${50 * intensity}px 0px`,
          '0px 0px',
        ],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )

  const renderWavesBackground = () => (
    <div className="absolute inset-0 overflow-hidden">
      {/* Wave Layer 1 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            45deg,
            transparent 0%,
            rgba(0, 212, 255, ${0.1 * intensity}) 50%,
            transparent 100%
          )`,
          transformOrigin: 'center',
        }}
        animate={{
          scaleX: [1, 1.2, 1],
          scaleY: [1, 0.8, 1],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Wave Layer 2 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(
            -45deg,
            transparent 0%,
            rgba(139, 92, 246, ${0.1 * intensity}) 50%,
            transparent 100%
          )`,
          transformOrigin: 'center',
        }}
        animate={{
          scaleX: [1, 0.8, 1.2, 1],
          scaleY: [1, 1.2, 0.8, 1],
          rotate: [0, -3, 3, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Wave Layer 3 */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            ellipse at center,
            rgba(255, 0, 128, ${0.05 * intensity}) 0%,
            transparent 70%
          )`,
          scale,
          rotate: timeBasedRotation,
        }}
      />
    </div>
  )

  const renderBackground = () => {
    switch (variant) {
      case 'noise':
        return renderNoiseBackground()
      case 'grid':
        return renderGridBackground()
      case 'waves':
        return renderWavesBackground()
      default:
        return renderGradientBackground()
    }
  }

  return (
    <div className={`pointer-events-none ${className}`}>
      {renderBackground()}
      
      {/* Additional overlay effects */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(255, 255, 255, ${0.02 * intensity}) 0%,
            transparent 50%
          )`,
        }}
        animate={{
          opacity: interactive ? [0.5, 1, 0.5] : 0.5,
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

/**
 * 環境光エフェクト
 * 時間や設定に応じて色温度が変化
 */
interface AmbientLightProps {
  timeOfDay?: 'dawn' | 'day' | 'dusk' | 'night'
  intensity?: number
  className?: string
}

export function AmbientLight({
  timeOfDay = 'night',
  intensity = 0.5,
  className = '',
}: AmbientLightProps) {
  const getLightColors = () => {
    switch (timeOfDay) {
      case 'dawn':
        return {
          primary: 'rgba(255, 183, 77, intensity)',
          secondary: 'rgba(255, 87, 51, intensity * 0.7)',
        }
      case 'day':
        return {
          primary: `rgba(135, 206, 250, ${intensity})`,
          secondary: `rgba(255, 255, 255, ${intensity * 0.3})`,
        }
      case 'dusk':
        return {
          primary: `rgba(255, 94, 77, ${intensity})`,
          secondary: `rgba(139, 92, 246, ${intensity * 0.8})`,
        }
      default: // night
        return {
          primary: `rgba(0, 212, 255, ${intensity})`,
          secondary: `rgba(139, 92, 246, ${intensity * 0.6})`,
        }
    }
  }

  const colors = getLightColors()

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${className}`}
      animate={{
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(circle at 20% 20%, ${colors.primary} 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, ${colors.secondary} 0%, transparent 50%),
            linear-gradient(45deg, ${colors.primary} 0%, transparent 30%, ${colors.secondary} 70%, transparent 100%)
          `,
          filter: 'blur(60px)',
        }}
      />
    </motion.div>
  )
}

/**
 * ノイズテクスチャオーバーレイ
 * 映画的な粒子効果
 */
interface NoiseOverlayProps {
  intensity?: number
  className?: string
}

export function NoiseOverlay({
  intensity = 0.1,
  className = '',
}: NoiseOverlayProps) {
  const [noisePattern, setNoisePattern] = useState('')

  useEffect(() => {
    // SVG ノイズパターンを生成
    const generateNoise = () => {
      const canvas = document.createElement('canvas')
      canvas.width = 200
      canvas.height = 200
      const ctx = canvas.getContext('2d')
      
      if (ctx) {
        const imageData = ctx.createImageData(200, 200)
        const data = imageData.data
        
        for (let i = 0; i < data.length; i += 4) {
          const gray = Math.random() * 255
          data[i] = gray // R
          data[i + 1] = gray // G  
          data[i + 2] = gray // B
          data[i + 3] = intensity * 255 // A
        }
        
        ctx.putImageData(imageData, 0, 0)
        setNoisePattern(canvas.toDataURL())
      }
    }

    generateNoise()
    
    // ノイズパターンを定期的に更新
    const interval = setInterval(generateNoise, 100)
    return () => clearInterval(interval)
  }, [intensity])

  return (
    <motion.div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage: noisePattern ? `url(${noisePattern})` : 'none',
        backgroundRepeat: 'repeat',
        mixBlendMode: 'overlay',
        opacity: intensity,
      }}
      animate={{
        backgroundPosition: [
          '0px 0px',
          '10px 10px',
          '20px 0px',
          '0px 20px',
          '0px 0px',
        ],
      }}
      transition={{
        duration: 0.5,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}