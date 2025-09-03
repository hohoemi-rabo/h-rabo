'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback, useMemo } from 'react'

interface GlitchTextProps {
  text: string
  glitchIntensity?: number
  className?: string
  triggerOnHover?: boolean
  autoGlitch?: boolean
  autoGlitchInterval?: number
  colors?: {
    primary?: string
    glitch1?: string
    glitch2?: string
  }
}

/**
 * グリッチテキストエフェクトコンポーネント
 * サイバー感のあるテキストグリッチ効果
 */
export default function GlitchText({
  text,
  glitchIntensity = 3,
  className = '',
  triggerOnHover = true,
  autoGlitch = false,
  autoGlitchInterval = 5000,
  colors = {
    primary: '#ffffff',
    glitch1: '#ff0080',
    glitch2: '#00d4ff',
  }
}: GlitchTextProps) {
  const [isGlitching, setIsGlitching] = useState(false)
  const [glitchText, setGlitchText] = useState(text)
  const [glitchLayers, setGlitchLayers] = useState<string[]>([])

  // グリッチ文字セット
  const glitchChars = useMemo(() => 
    '!@#$%^&*()_+-=[]{}|;:,.<>?~`¡™£¢∞§¶•ªº–≠œ∑´®†¥¨ˆøπ"\'«åß∂ƒ©˙∆˚¬…æΩ≈ç√∫˜µ≤≥÷', 
    []
  )

  // グリッチテキスト生成関数
  const generateGlitchText = useCallback((originalText: string, intensity: number) => {
    let result = originalText
    const maxChanges = Math.min(intensity, originalText.length)
    
    // ランダムな位置の文字をグリッチ文字に置き換え
    for (let i = 0; i < maxChanges; i++) {
      const randomIndex = Math.floor(Math.random() * originalText.length)
      const randomChar = glitchChars[Math.floor(Math.random() * glitchChars.length)]
      result = result.substring(0, randomIndex) + randomChar + result.substring(randomIndex + 1)
    }
    
    return result
  }, [glitchChars])

  // グリッチレイヤー生成
  const generateGlitchLayers = useCallback(() => {
    return [
      generateGlitchText(text, Math.floor(glitchIntensity * 0.7)),
      generateGlitchText(text, Math.floor(glitchIntensity * 0.5)),
      generateGlitchText(text, Math.floor(glitchIntensity * 0.3)),
    ]
  }, [text, glitchIntensity, generateGlitchText])

  // グリッチエフェクト開始
  const startGlitch = useCallback(() => {
    setIsGlitching(true)
    setGlitchLayers(generateGlitchLayers())
    
    let glitchCount = 0
    const maxGlitches = 8
    
    const glitchInterval = setInterval(() => {
      setGlitchText(generateGlitchText(text, glitchIntensity))
      setGlitchLayers(generateGlitchLayers())
      glitchCount++
      
      if (glitchCount >= maxGlitches) {
        clearInterval(glitchInterval)
        setTimeout(() => {
          setIsGlitching(false)
          setGlitchText(text)
          setGlitchLayers([])
        }, 100)
      }
    }, 80)
  }, [text, glitchIntensity, generateGlitchText, generateGlitchLayers])

  // 自動グリッチ
  useEffect(() => {
    if (!autoGlitch) return

    const interval = setInterval(() => {
      if (!isGlitching) {
        startGlitch()
      }
    }, autoGlitchInterval)

    return () => clearInterval(interval)
  }, [autoGlitch, autoGlitchInterval, isGlitching, startGlitch])

  // ホバーイベント
  const handleMouseEnter = () => {
    if (triggerOnHover && !isGlitching) {
      startGlitch()
    }
  }

  return (
    <motion.span
      className={`relative inline-block ${triggerOnHover ? 'cursor-pointer' : ''} ${className}`}
      onMouseEnter={handleMouseEnter}
      style={{
        color: colors.primary,
      }}
    >
      {/* メインテキスト */}
      <motion.span
        className="relative z-10"
        animate={{
          filter: isGlitching ? [
            'hue-rotate(0deg)',
            'hue-rotate(90deg)',
            'hue-rotate(180deg)',
            'hue-rotate(270deg)',
            'hue-rotate(0deg)'
          ] : 'hue-rotate(0deg)',
        }}
        transition={{
          duration: isGlitching ? 0.3 : 0,
          ease: 'easeInOut',
        }}
      >
        {glitchText}
      </motion.span>

      {/* グリッチレイヤー1 */}
      <AnimatePresence>
        {isGlitching && glitchLayers[0] && (
          <motion.span
            className="absolute inset-0 z-20"
            style={{
              color: colors.glitch1,
              clipPath: 'inset(0 0 80% 0)',
            }}
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, 2, -2, 1, -1, 0],
              opacity: [0, 0.8, 0.9, 0.7, 0.8, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
            }}
          >
            {glitchLayers[0]}
          </motion.span>
        )}
      </AnimatePresence>

      {/* グリッチレイヤー2 */}
      <AnimatePresence>
        {isGlitching && glitchLayers[1] && (
          <motion.span
            className="absolute inset-0 z-30"
            style={{
              color: colors.glitch2,
              clipPath: 'inset(20% 0 60% 0)',
            }}
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, -3, 3, -2, 2, 0],
              opacity: [0, 0.7, 0.8, 0.6, 0.7, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              delay: 0.05,
            }}
          >
            {glitchLayers[1]}
          </motion.span>
        )}
      </AnimatePresence>

      {/* グリッチレイヤー3 */}
      <AnimatePresence>
        {isGlitching && glitchLayers[2] && (
          <motion.span
            className="absolute inset-0 z-40"
            style={{
              color: colors.glitch1,
              clipPath: 'inset(60% 0 0 0)',
            }}
            initial={{ x: 0, opacity: 0 }}
            animate={{
              x: [0, 1, -3, 2, -1, 0],
              opacity: [0, 0.6, 0.7, 0.5, 0.6, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: 'easeInOut',
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              delay: 0.1,
            }}
          >
            {glitchLayers[2]}
          </motion.span>
        )}
      </AnimatePresence>

      {/* スキャンライン効果 */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            style={{
              background: `linear-gradient(
                to bottom,
                transparent 0%,
                transparent 45%,
                ${colors.glitch2}50 48%,
                ${colors.glitch2}80 50%,
                ${colors.glitch2}50 52%,
                transparent 55%,
                transparent 100%
              )`,
            }}
            initial={{ y: '-100%' }}
            animate={{ y: '100%' }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.15,
              ease: 'linear',
              repeat: 3,
            }}
          />
        )}
      </AnimatePresence>

      {/* データストリーム効果 */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            className="absolute -inset-1 z-0"
            style={{
              background: `linear-gradient(
                90deg,
                transparent 0%,
                ${colors.glitch2}20 25%,
                ${colors.glitch1}30 50%,
                ${colors.glitch2}20 75%,
                transparent 100%
              )`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{
              scaleX: [0, 1.2, 0.8, 1, 0],
              opacity: [0, 0.3, 0.5, 0.3, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: 'easeInOut',
            }}
          />
        )}
      </AnimatePresence>

      {/* ノイズオーバーレイ */}
      <AnimatePresence>
        {isGlitching && (
          <motion.div
            className="absolute inset-0 z-60 pointer-events-none mix-blend-screen"
            style={{
              backgroundImage: `radial-gradient(circle at 50% 50%, 
                ${colors.glitch2}20 0%, 
                transparent 30%, 
                ${colors.glitch1}10 60%, 
                transparent 100%)`,
            }}
            animate={{
              scale: [1, 1.05, 0.95, 1.02, 1],
              opacity: [0.2, 0.4, 0.3, 0.5, 0.2],
            }}
            transition={{
              duration: 0.2,
              ease: 'easeInOut',
              repeat: 2,
            }}
          />
        )}
      </AnimatePresence>
    </motion.span>
  )
}

/**
 * シンプルなグリッチテキスト（軽量版）
 */
interface SimpleGlitchTextProps {
  text: string
  className?: string
}

export function SimpleGlitchText({ text, className = '' }: SimpleGlitchTextProps) {
  return (
    <GlitchText
      text={text}
      glitchIntensity={2}
      className={className}
      triggerOnHover={true}
      autoGlitch={false}
      colors={{
        primary: '#ffffff',
        glitch1: '#ff0080',
        glitch2: '#00d4ff',
      }}
    />
  )
}