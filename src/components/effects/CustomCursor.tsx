'use client'

import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

interface CursorState {
  type: 'default' | 'hover' | 'click' | 'text' | 'pointer'
  scale: number
  rotation: number
}

/**
 * カスタムカーソルコンポーネント
 * サイバー感のあるインタラクティブなカーソルエフェクト
 */
export default function CustomCursor() {
  const [mounted, setMounted] = useState(false)
  const [cursorState, setCursorState] = useState<CursorState>({
    type: 'default',
    scale: 1,
    rotation: 0,
  })
  
  // スムーズなカーソル移動
  const cursorX = useMotionValue(0)
  const cursorY = useMotionValue(0)
  
  // バネアニメーションでスムーズに追従
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)
  
  // トレイル用の遅延カーソル
  const trailX = useSpring(cursorX, { damping: 30, stiffness: 200 })
  const trailY = useSpring(cursorY, { damping: 30, stiffness: 200 })

  // ホバー可能要素の監視
  const hoverableElements = 'button, a, [role="button"], input, textarea, select'
  const clickableElements = 'button, a, [role="button"]'

  useEffect(() => {
    setMounted(true)

    const updateCursorPosition = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseDown = () => {
      setCursorState(prev => ({ 
        ...prev, 
        type: 'click', 
        scale: 0.8,
        rotation: prev.rotation + 45 
      }))
    }

    const handleMouseUp = () => {
      setCursorState(prev => ({ 
        ...prev, 
        type: 'default', 
        scale: 1,
      }))
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.matches(clickableElements)) {
        setCursorState(prev => ({ 
          ...prev, 
          type: 'pointer', 
          scale: 1.5 
        }))
      } else if (target.matches('input[type="text"], textarea')) {
        setCursorState(prev => ({ 
          ...prev, 
          type: 'text', 
          scale: 1.2 
        }))
      } else if (target.matches(hoverableElements)) {
        setCursorState(prev => ({ 
          ...prev, 
          type: 'hover', 
          scale: 1.3 
        }))
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      
      if (target.matches(hoverableElements)) {
        setCursorState(prev => ({ 
          ...prev, 
          type: 'default', 
          scale: 1 
        }))
      }
    }

    // イベントリスナーを追加
    document.addEventListener('mousemove', updateCursorPosition)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    // デフォルトカーソルを非表示
    document.body.style.cursor = 'none'

    return () => {
      document.removeEventListener('mousemove', updateCursorPosition)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
      document.body.style.cursor = 'auto'
    }
  }, [cursorX, cursorY])

  // SSR対応
  if (!mounted) return null

  // カーソルタイプ別のスタイル
  const getCursorStyle = () => {
    switch (cursorState.type) {
      case 'hover':
        return {
          backgroundColor: '#ff0080',
          boxShadow: '0 0 20px #ff0080, 0 0 40px #ff008050',
          border: '2px solid #ff0080',
        }
      case 'click':
        return {
          backgroundColor: '#00ff88',
          boxShadow: '0 0 30px #00ff88, 0 0 60px #00ff8850',
          border: '2px solid #00ff88',
        }
      case 'text':
        return {
          backgroundColor: '#8b5cf6',
          boxShadow: '0 0 15px #8b5cf6, 0 0 30px #8b5cf650',
          border: '2px solid #8b5cf6',
          borderRadius: '2px',
          width: '3px',
          height: '20px',
        }
      case 'pointer':
        return {
          backgroundColor: '#00d4ff',
          boxShadow: '0 0 25px #00d4ff, 0 0 50px #00d4ff50',
          border: '2px solid #00d4ff',
        }
      default:
        return {
          backgroundColor: '#00d4ff',
          boxShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff30',
          border: '1px solid #00d4ff',
        }
    }
  }

  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      {/* トレイルカーソル（外側） */}
      <motion.div
        className="absolute rounded-full border border-neon-blue/30"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorState.scale * 40,
          height: cursorState.scale * 40,
          rotate: cursorState.rotation,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      />

      {/* セカンダリトレイル */}
      <motion.div
        className="absolute rounded-full border border-neon-purple/20"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorState.scale * 60,
          height: cursorState.scale * 60,
          rotate: -cursorState.rotation * 0.5,
        }}
        transition={{ 
          type: 'spring', 
          stiffness: 200, 
          damping: 40,
          delay: 0.05 
        }}
      />

      {/* メインカーソル */}
      <motion.div
        className="absolute rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          ...getCursorStyle(),
          mixBlendMode: cursorState.type === 'click' ? 'normal' : 'difference',
        }}
        animate={{
          scale: cursorState.scale,
          rotate: cursorState.rotation,
          width: cursorState.type === 'text' ? 3 : 16,
          height: cursorState.type === 'text' ? 20 : 16,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />

      {/* クリック時のリップルエフェクト */}
      {cursorState.type === 'click' && (
        <motion.div
          className="absolute rounded-full border-2 border-neon-green"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 3, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}

      {/* ホバー時のオーラエフェクト */}
      {(cursorState.type === 'hover' || cursorState.type === 'pointer') && (
        <motion.div
          className="absolute rounded-full"
          style={{
            x: cursorXSpring,
            y: cursorYSpring,
            translateX: '-50%',
            translateY: '-50%',
            background: `radial-gradient(circle, ${
              cursorState.type === 'hover' ? '#ff008020' : '#00d4ff20'
            } 0%, transparent 70%)`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            width: 80,
            height: 80,
          }}
          transition={{ 
            scale: { 
              duration: 2, 
              repeat: Infinity, 
              ease: 'easeInOut' 
            }
          }}
        />
      )}

      {/* パーティクルトレイル */}
      <motion.div
        className="absolute"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-cyan rounded-full"
            animate={{
              x: [0, -10 - i * 5, -15 - i * 7],
              y: [0, -5 - i * 3, -8 - i * 4],
              opacity: [1, 0.5, 0],
              scale: [1, 0.8, 0],
            }}
            transition={{
              duration: 0.8,
              delay: i * 0.1,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>
    </div>
  )
}