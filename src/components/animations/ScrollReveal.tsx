'use client'

import { motion, Variants } from 'framer-motion'
import { ReactNode } from 'react'
import { useElementInView } from '@/hooks/useScrollAnimation'

interface ScrollRevealProps {
  children: ReactNode
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade'
  delay?: number
  duration?: number
  distance?: number
  className?: string
  once?: boolean
  cascade?: boolean
  cascadeDelay?: number
}

/**
 * スクロール時に要素を表示するアニメーションコンポーネント
 */
export default function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 50,
  className = '',
  once = true,
  cascade = false,
  cascadeDelay = 0.1,
}: ScrollRevealProps) {
  const { ref, isInView } = useElementInView({ once, amount: 0.3 })

  // 方向別の初期位置設定
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { y: distance, x: 0 }
      case 'down':
        return { y: -distance, x: 0 }
      case 'left':
        return { x: distance, y: 0 }
      case 'right':
        return { x: -distance, y: 0 }
      case 'fade':
      default:
        return { x: 0, y: 0 }
    }
  }

  const variants: Variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
        when: cascade ? 'beforeChildren' : undefined,
        staggerChildren: cascade ? cascadeDelay : undefined,
      },
    },
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
    >
      {children}
    </motion.div>
  )
}

/**
 * スクロール時のパララックス効果コンポーネント
 */
interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
  offset?: number
}

export function Parallax({
  children,
  speed = 0.5,
  className = '',
  offset = 0,
}: ParallaxProps) {
  return (
    <motion.div
      className={className}
      initial={{ y: offset }}
      whileInView={{ y: -offset * speed }}
      transition={{
        duration: 1.5,
        ease: 'easeOut',
      }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {children}
    </motion.div>
  )
}

/**
 * テキストの順次表示アニメーション
 */
interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  duration?: number
  staggerDelay?: number
}

export function TextReveal({
  text,
  className = '',
  delay = 0,
  duration = 0.5,
  staggerDelay = 0.05,
}: TextRevealProps) {
  const words = text.split(' ')

  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay,
        staggerChildren: staggerDelay,
      },
    },
  }

  const child: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  }

  return (
    <motion.div
      className={`inline-flex flex-wrap ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          variants={child}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

/**
 * 数値のカウントアップアニメーション
 */
interface CountUpProps {
  end: number
  start?: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  once?: boolean
}

export function CountUp({
  end,
  start = 0,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  once = true,
}: CountUpProps) {
  const { ref, isInView } = useElementInView({ once })

  return (
    <div ref={ref} className={className}>
      {isInView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {prefix}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {Array.from({ length: 20 }).map((_, i) => {
              const progress = (i + 1) / 20
              const value = start + (end - start) * progress
              return (
                <motion.span
                  key={i}
                  className="inline-block"
                  initial={{ display: 'none' }}
                  animate={{ display: i === 19 ? 'inline' : 'none' }}
                  transition={{
                    delay: (duration / 20) * i,
                  }}
                >
                  {value.toFixed(decimals)}
                </motion.span>
              )
            })}
          </motion.span>
          {suffix}
        </motion.span>
      )}
    </div>
  )
}

/**
 * プログレスバーアニメーション
 */
interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  barClassName?: string
  showLabel?: boolean
  delay?: number
}

export function ProgressBar({
  value,
  max = 100,
  className = '',
  barClassName = '',
  showLabel = true,
  delay = 0,
}: ProgressBarProps) {
  const { ref, isInView } = useElementInView({ once: true })
  const percentage = (value / max) * 100

  return (
    <div ref={ref} className={className}>
      <div className="relative h-2 bg-dark-700 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full ${barClassName}`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
          transition={{
            duration: 1.5,
            delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
      </div>
      {showLabel && (
        <motion.div
          className="mt-2 text-sm text-dark-300"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: delay + 0.5 }}
        >
          {value}/{max}
        </motion.div>
      )}
    </div>
  )
}