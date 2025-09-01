'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

/**
 * スケルトンローダーコンポーネント
 * コンテンツ読み込み中のプレースホルダー
 */
interface SkeletonLoaderProps {
  width?: string | number
  height?: string | number
  className?: string
  variant?: 'text' | 'rectangular' | 'circular'
  animation?: 'pulse' | 'wave'
}

export function SkeletonLoader({
  width = '100%',
  height = '20px',
  className = '',
  variant = 'rectangular',
  animation = 'pulse',
}: SkeletonLoaderProps) {
  const getVariantClass = () => {
    switch (variant) {
      case 'text':
        return 'rounded'
      case 'circular':
        return 'rounded-full'
      default:
        return 'rounded-lg'
    }
  }

  if (animation === 'wave') {
    return (
      <div
        className={`relative bg-dark-700 overflow-hidden ${getVariantClass()} ${className}`}
        style={{ width, height }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-dark-600 to-transparent"
          animate={{
            x: ['-100%', '100%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      </div>
    )
  }

  return (
    <motion.div
      className={`bg-dark-700 ${getVariantClass()} ${className}`}
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

/**
 * サイバーローダー
 * 未来的な円形ローディングアニメーション
 */
interface CyberLoaderProps {
  size?: number
  color?: string
  className?: string
}

export function CyberLoader({
  size = 60,
  color = '#00d4ff',
  className = '',
}: CyberLoaderProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <motion.div 
        className="relative"
        style={{ width: size, height: size }}
      >
        {[0, 1, 2].map((index) => (
          <motion.div
            key={index}
            className="absolute inset-0 rounded-full"
            style={{
              border: `2px solid ${color}`,
              borderColor: `${color} transparent transparent transparent`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [1 - index * 0.2, 1.5 - index * 0.2, 1 - index * 0.2],
              opacity: [1 - index * 0.3, 0.5 - index * 0.2, 1 - index * 0.3],
            }}
            transition={{
              rotate: {
                duration: 2 - index * 0.3,
                repeat: Infinity,
                ease: 'linear',
              },
              scale: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
              opacity: {
                duration: 2,
                repeat: Infinity,
                ease: 'easeInOut',
              },
            }}
          />
        ))}
        
        {/* 中心のパルス */}
        <motion.div
          className="absolute inset-0 m-auto w-2 h-2 rounded-full"
          style={{ backgroundColor: color }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </motion.div>
    </div>
  )
}

/**
 * プログレスリング
 * 円形のプログレスインジケーター
 */
interface ProgressRingProps {
  progress: number
  size?: number
  strokeWidth?: number
  color?: string
  backgroundColor?: string
  showLabel?: boolean
  className?: string
}

export function ProgressRing({
  progress,
  size = 60,
  strokeWidth = 4,
  color = 'url(#gradient)',
  backgroundColor = '#2a2a2a',
  showLabel = true,
  className = '',
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = radius * 2 * Math.PI
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <motion.svg 
        width={size} 
        height={size} 
        className="transform -rotate-90"
      >
        {/* 背景の円 */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* プログレスの円 */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
        
        {/* グラデーション定義 */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </motion.svg>
      
      {/* ラベル */}
      {showLabel && (
        <motion.div 
          className="absolute text-sm font-semibold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {Math.round(progress)}%
        </motion.div>
      )}
    </div>
  )
}

/**
 * ドットローダー
 * ドットが順番に点滅するローディング
 */
interface DotLoaderProps {
  size?: number
  color?: string
  count?: number
  className?: string
}

export function DotLoader({
  size = 10,
  color = '#00d4ff',
  count = 3,
  className = '',
}: DotLoaderProps) {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      {Array.from({ length: count }).map((_, index) => (
        <motion.div
          key={index}
          className="rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: index * 0.2,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

/**
 * グリッチローダー
 * グリッチエフェクト付きローディング
 */
interface GlitchLoaderProps {
  text?: string
  className?: string
}

export function GlitchLoader({
  text = 'LOADING',
  className = '',
}: GlitchLoaderProps) {
  return (
    <div className={`relative inline-block ${className}`}>
      <motion.div
        className="font-bold text-2xl"
        animate={{
          x: [0, -2, 2, 0],
          opacity: [1, 0.8, 0.8, 1],
        }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatDelay: 1,
        }}
      >
        {text}
      </motion.div>
      
      {/* グリッチレイヤー1 */}
      <motion.div
        className="absolute inset-0 font-bold text-2xl text-neon-blue"
        style={{ clipPath: 'inset(40% 0 60% 0)' }}
        animate={{
          x: [0, 3, -3, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
        }}
      >
        {text}
      </motion.div>
      
      {/* グリッチレイヤー2 */}
      <motion.div
        className="absolute inset-0 font-bold text-2xl text-neon-purple"
        style={{ clipPath: 'inset(60% 0 40% 0)' }}
        animate={{
          x: [0, -3, 3, 0],
          opacity: [0, 1, 1, 0],
        }}
        transition={{
          duration: 0.3,
          repeat: Infinity,
          repeatDelay: 2,
          delay: 0.1,
        }}
      >
        {text}
      </motion.div>
    </div>
  )
}

/**
 * データロードステート
 * データ取得時の状態表示
 */
interface LoadingStateProps {
  isLoading: boolean
  error?: Error | null
  empty?: boolean
  children: ReactNode
  loadingComponent?: ReactNode
  errorComponent?: ReactNode
  emptyComponent?: ReactNode
}

export function LoadingState({
  isLoading,
  error,
  empty,
  children,
  loadingComponent,
  errorComponent,
  emptyComponent,
}: LoadingStateProps) {
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {loadingComponent || <CyberLoader />}
      </motion.div>
    )
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center p-8"
      >
        {errorComponent || (
          <div>
            <p className="text-red-500 mb-2">エラーが発生しました</p>
            <p className="text-sm text-dark-400">{error.message}</p>
          </div>
        )}
      </motion.div>
    )
  }

  if (empty) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center p-8"
      >
        {emptyComponent || (
          <p className="text-dark-400">データがありません</p>
        )}
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {children}
    </motion.div>
  )
}