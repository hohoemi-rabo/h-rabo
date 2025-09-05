'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface DigitalNoiseProps {
  intensity?: 'low' | 'medium' | 'high'
  color?: 'blue' | 'red' | 'green' | 'white' | 'rainbow'
  className?: string
  trigger?: boolean
}

/**
 * デジタルノイズエフェクト
 * RGB分離、グリッチ、スキャンライン、デジタルノイズを組み合わせた
 * サイバーパンク風のエフェクトコンポーネント
 */
export default function DigitalNoise({ 
  intensity = 'medium',
  color = 'blue',
  className = '',
  trigger = false
}: DigitalNoiseProps) {
  const [isActive, setIsActive] = useState(false)
  const [glitchLines, setGlitchLines] = useState<Array<{
    top: number
    height: number
    opacity: number
    direction: number
  }>>([])
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()

  // インテンシティの設定
  const settings = {
    low: {
      glitchFrequency: 0.02,
      noiseOpacity: 0.03,
      rgbSeparation: 1,
      scanlineOpacity: 0.05,
      glitchDuration: 100
    },
    medium: {
      glitchFrequency: 0.05,
      noiseOpacity: 0.08,
      rgbSeparation: 2,
      scanlineOpacity: 0.1,
      glitchDuration: 150
    },
    high: {
      glitchFrequency: 0.1,
      noiseOpacity: 0.15,
      rgbSeparation: 3,
      scanlineOpacity: 0.2,
      glitchDuration: 200
    }
  }

  const config = settings[intensity]

  // カラー設定
  const colorSettings = {
    blue: ['#00d4ff', '#0080ff', '#4040ff'],
    red: ['#ff0040', '#ff4080', '#ff8080'],
    green: ['#00ff80', '#40ff40', '#80ff80'],
    white: ['#ffffff', '#f0f0f0', '#e0e0e0'],
    rainbow: ['#ff0040', '#00d4ff', '#00ff80', '#ff8040']
  }

  const colors = colorSettings[color]

  // ノイズキャンバスの描画
  const drawNoise = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const { width, height } = canvas
    const imageData = ctx.createImageData(width, height)
    const data = imageData.data

    for (let i = 0; i < data.length; i += 4) {
      const noise = Math.random() * 255
      const alpha = Math.random() * config.noiseOpacity * 255

      if (color === 'rainbow') {
        data[i] = Math.random() * 255     // Red
        data[i + 1] = Math.random() * 255 // Green  
        data[i + 2] = Math.random() * 255 // Blue
      } else {
        const baseColor = colors[Math.floor(Math.random() * colors.length)]
        const rgb = hexToRgb(baseColor)
        
        data[i] = rgb.r + (noise - 128) * 0.5     // Red
        data[i + 1] = rgb.g + (noise - 128) * 0.5 // Green
        data[i + 2] = rgb.b + (noise - 128) * 0.5 // Blue
      }
      data[i + 3] = alpha // Alpha
    }

    ctx.putImageData(imageData, 0, 0)
  }

  // グリッチライン生成
  const generateGlitchLines = () => {
    const lines = []
    const lineCount = 3 + Math.random() * 5

    for (let i = 0; i < lineCount; i++) {
      lines.push({
        top: Math.random() * 100,
        height: 1 + Math.random() * 3,
        opacity: 0.3 + Math.random() * 0.7,
        direction: Math.random() > 0.5 ? 1 : -1
      })
    }

    setGlitchLines(lines)
  }

  // アニメーションループ
  const animate = () => {
    if (Math.random() < config.glitchFrequency) {
      setIsActive(true)
      generateGlitchLines()
      drawNoise()
      
      setTimeout(() => {
        setIsActive(false)
        setGlitchLines([])
      }, config.glitchDuration)
    } else {
      drawNoise()
    }

    animationRef.current = requestAnimationFrame(animate)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // キャンバスサイズ設定
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * 2 // 高解像度対応
      canvas.height = rect.height * 2
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.scale(2, 2)
      }
    }

    updateCanvasSize()
    animate()

    window.addEventListener('resize', updateCanvasSize)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [intensity, color])

  // トリガー効果
  useEffect(() => {
    if (trigger) {
      setIsActive(true)
      generateGlitchLines()
      setTimeout(() => {
        setIsActive(false)
        setGlitchLines([])
      }, config.glitchDuration * 2)
    }
  }, [trigger])

  return (
    <div className={`fixed inset-0 pointer-events-none z-10 ${className}`}>
      {/* ベースノイズキャンバス */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full mix-blend-screen"
        style={{ 
          opacity: isActive ? 1 : 0.3,
          transition: 'opacity 0.1s ease'
        }}
      />

      {/* RGB分離エフェクト */}
      {isActive && (
        <>
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            style={{
              backgroundColor: colors[0],
              opacity: 0.1,
              transform: `translateX(${config.rgbSeparation}px)`
            }}
            animate={{
              transform: [
                `translateX(${config.rgbSeparation}px)`,
                `translateX(-${config.rgbSeparation}px)`,
                `translateX(${config.rgbSeparation}px)`
              ]
            }}
            transition={{ duration: 0.1, repeat: 2 }}
          />
          <motion.div
            className="absolute inset-0 mix-blend-screen"
            style={{
              backgroundColor: colors[1] || colors[0],
              opacity: 0.1,
              transform: `translateX(-${config.rgbSeparation}px)`
            }}
            animate={{
              transform: [
                `translateX(-${config.rgbSeparation}px)`,
                `translateX(${config.rgbSeparation}px)`,
                `translateX(-${config.rgbSeparation}px)`
              ]
            }}
            transition={{ duration: 0.1, repeat: 2, delay: 0.05 }}
          />
        </>
      )}

      {/* グリッチライン */}
      {isActive && glitchLines.map((line, index) => (
        <motion.div
          key={index}
          className="absolute left-0 right-0 mix-blend-screen"
          style={{
            top: `${line.top}%`,
            height: `${line.height}%`,
            backgroundColor: colors[index % colors.length],
            opacity: line.opacity
          }}
          animate={{
            x: [0, line.direction * 10, -line.direction * 5, 0]
          }}
          transition={{ 
            duration: 0.15,
            times: [0, 0.3, 0.7, 1]
          }}
        />
      ))}

      {/* スキャンライン */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            ${colors[0]}${Math.floor(config.scanlineOpacity * 255).toString(16).padStart(2, '0')} 2px,
            ${colors[0]}${Math.floor(config.scanlineOpacity * 255).toString(16).padStart(2, '0')} 4px
          )`,
          animation: 'scanlines 0.1s linear infinite'
        }}
      />

      {/* CSS アニメーション定義 */}
      <style jsx>{`
        @keyframes scanlines {
          0% { transform: translateY(0px); }
          100% { transform: translateY(4px); }
        }
      `}</style>
    </div>
  )
}

// ヘックス色をRGBに変換するヘルパー関数
function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : { r: 0, g: 212, b: 255 }
}