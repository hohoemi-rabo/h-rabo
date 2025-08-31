'use client'

import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import Button, { ButtonProps } from './Button'
import { useDeviceDetection } from '@/hooks/useDeviceDetection'
import { useAccessibility } from '@/contexts/AccessibilityContext'

export interface AdaptiveButtonProps extends ButtonProps {
  /** タッチデバイスでのサイズ調整 */
  touchSize?: 'standard' | 'large' | 'auto'
  /** ホバーエフェクトの無効化（タッチデバイス用） */
  disableHoverOnTouch?: boolean
  /** モーションプロパティ */
  motionProps?: Partial<MotionProps>
  /** 長押し対応 */
  onLongPress?: () => void
  /** タップフィードバック */
  hapticFeedback?: boolean
}

/**
 * デバイスに適応するアダプティブボタンコンポーネント
 * タッチデバイスとデスクトップで最適化された操作性を提供
 */
export default function AdaptiveButton({
  children,
  touchSize = 'auto',
  disableHoverOnTouch = true,
  motionProps = {},
  onLongPress,
  hapticFeedback = false,
  className = '',
  ...buttonProps
}: AdaptiveButtonProps) {
  const { isTouchDevice, hasHover } = useDeviceDetection()
  const { reducedMotion } = useAccessibility()

  // タッチデバイス向けサイズ調整
  const getTouchSizeClasses = () => {
    if (!isTouchDevice) return ''
    
    switch (touchSize) {
      case 'large':
        return 'min-h-[56px] min-w-[56px] px-6 py-4 text-base'
      case 'standard':
        return 'min-h-[44px] min-w-[44px] px-4 py-3'
      case 'auto':
      default:
        return buttonProps.size === 'sm' 
          ? 'min-h-[44px] min-w-[44px] px-4 py-2'
          : 'min-h-[48px] min-w-[48px] px-5 py-3'
    }
  }

  // ホバーエフェクト制御
  const getHoverClasses = () => {
    if (isTouchDevice && disableHoverOnTouch) {
      return 'focus:ring-2 focus:ring-neon-blue focus:ring-opacity-50'
    }
    return 'hover:shadow-neon hover:scale-105 focus:ring-2 focus:ring-neon-blue focus:ring-opacity-50'
  }

  // 長押しハンドラー
  const handleLongPress = () => {
    if (onLongPress) {
      // 触覚フィードバック（対応デバイスのみ）
      if (hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(50)
      }
      onLongPress()
    }
  }

  // モーションプロップスの設定
  const getMotionProps = () => {
    if (reducedMotion) {
      return {
        initial: { opacity: 1 },
        whileHover: { opacity: 1 },
        whileTap: { opacity: 0.9 },
        transition: { duration: 0 },
        ...motionProps
      }
    }

    return {
      initial: { scale: 1 },
      whileHover: hasHover ? { scale: 1.05 } : undefined,
      whileTap: { scale: 0.95 },
      transition: { 
        type: 'spring' as const, 
        stiffness: 300, 
        damping: 20
      },
      ...motionProps
    }
  }

  const combinedClassName = [
    className,
    getTouchSizeClasses(),
    getHoverClasses(),
    'touch-manipulation', // タッチ操作の最適化
    'select-none', // テキスト選択を無効化
    isTouchDevice ? 'active:bg-opacity-80' : '', // アクティブ状態の視覚フィードバック
  ].filter(Boolean).join(' ')

  return (
    <motion.div
      {...getMotionProps()}
      onTapStart={() => {
        // タップ開始時の触覚フィードバック
        if (hapticFeedback && isTouchDevice && 'vibrate' in navigator) {
          navigator.vibrate(10)
        }
      }}
      onPointerDown={() => {
        if (onLongPress) {
          const timer = setTimeout(handleLongPress, 500)
          const cleanup = () => clearTimeout(timer)
          
          const handleUp = () => {
            cleanup()
            document.removeEventListener('pointerup', handleUp)
          }
          
          document.addEventListener('pointerup', handleUp)
        }
      }}
    >
      <Button
        {...buttonProps}
        className={combinedClassName}
        style={{
          // タッチデバイスでのホバー効果を無効化
          ...buttonProps.style,
          ...(isTouchDevice && disableHoverOnTouch ? {
            '--hover-bg': 'transparent',
            '--hover-scale': '1',
          } : {})
        }}
      >
        {children}
      </Button>
    </motion.div>
  )
}

/**
 * フローティングアクションボタン（FAB）コンポーネント
 */
export function FloatingActionButton({
  children,
  className = '',
  ...props
}: AdaptiveButtonProps) {
  const { isTouchDevice } = useDeviceDetection()

  return (
    <AdaptiveButton
      {...props}
      touchSize="large"
      className={`
        fixed bottom-6 right-6 z-50 
        rounded-full shadow-neon-strong
        ${isTouchDevice ? 'h-14 w-14' : 'h-12 w-12'}
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </AdaptiveButton>
  )
}