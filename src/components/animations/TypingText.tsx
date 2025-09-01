'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef, useCallback } from 'react'

interface TypingTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
  cursorClassName?: string
  onComplete?: () => void
  showCursor?: boolean
}

/**
 * タイピングアニメーションテキストコンポーネント
 * 文字を1文字ずつ表示していくタイピング効果を実現
 */
export default function TypingText({
  text,
  speed = 100,
  delay = 0,
  className = '',
  cursorClassName = '',
  onComplete,
  showCursor = true,
}: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [isComplete, setIsComplete] = useState(false)
  const [showCursorState, setShowCursorState] = useState(false)
  const hasStarted = useRef(false)
  const hasCompleted = useRef(false)

  useEffect(() => {
    if (hasStarted.current) return
    hasStarted.current = true
    
    // 遅延後にタイピング開始
    const startTimer = setTimeout(() => {
      setShowCursorState(true)
    }, delay)

    return () => clearTimeout(startTimer)
  }, [delay])

  const memoizedOnComplete = useCallback(() => {
    if (!hasCompleted.current) {
      hasCompleted.current = true
      onComplete?.()
    }
  }, [onComplete])

  useEffect(() => {
    if (!showCursorState) return

    const timer = setTimeout(
      () => {
        if (displayedText.length < text.length) {
          setDisplayedText(text.slice(0, displayedText.length + 1))
        } else if (!isComplete) {
          setIsComplete(true)
          memoizedOnComplete()
        }
      },
      displayedText.length === 0 ? 0 : speed
    )

    return () => clearTimeout(timer)
  }, [displayedText, text, speed, isComplete, memoizedOnComplete, showCursorState])

  return (
    <motion.span 
      className={`inline-flex items-baseline ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <span>{displayedText}</span>
      
      {/* タイピングカーソル */}
      {showCursor && showCursorState && (
        <motion.span
          className={`ml-[2px] inline-block h-[1.2em] w-[2px] bg-neon-blue ${cursorClassName}`}
          animate={{ 
            opacity: isComplete ? [1, 0] : [1, 0],
            scaleY: [1, 1, 1, 0.8],
          }}
          transition={{ 
            opacity: {
              duration: 0.5, 
              repeat: Infinity, 
              ease: 'easeInOut',
              repeatDelay: 0.5,
            },
            scaleY: {
              duration: 0.3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
          }}
          style={{
            transformOrigin: 'bottom',
          }}
        />
      )}
    </motion.span>
  )
}

/**
 * 複数行のタイピングアニメーション
 */
interface MultiLineTypingTextProps {
  lines: string[]
  speed?: number
  lineDelay?: number
  className?: string
  onComplete?: () => void
}

export function MultiLineTypingText({
  lines,
  speed = 80,
  lineDelay = 500,
  className = '',
  onComplete,
}: MultiLineTypingTextProps) {
  const [currentLineIndex, setCurrentLineIndex] = useState(0)
  const [completedLines, setCompletedLines] = useState<string[]>([])

  const handleLineComplete = () => {
    if (currentLineIndex < lines.length - 1) {
      setCompletedLines([...completedLines, lines[currentLineIndex]])
      setTimeout(() => {
        setCurrentLineIndex(currentLineIndex + 1)
      }, lineDelay)
    } else {
      onComplete?.()
    }
  }

  return (
    <div className={className}>
      {/* 完了した行 */}
      {completedLines.map((line, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          className="mb-2"
        >
          {line}
        </motion.div>
      ))}
      
      {/* 現在タイピング中の行 */}
      {currentLineIndex < lines.length && (
        <TypingText
          text={lines[currentLineIndex]}
          speed={speed}
          onComplete={handleLineComplete}
          className="mb-2"
        />
      )}
    </div>
  )
}

/**
 * コードブロックのタイピングアニメーション
 */
interface CodeTypingTextProps {
  code: string
  language?: string
  speed?: number
  className?: string
  onComplete?: () => void
}

export function CodeTypingText({
  code,
  language = 'typescript',
  speed = 50,
  className = '',
  onComplete,
}: CodeTypingTextProps) {
  return (
    <motion.div 
      className={`font-mono text-sm ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="rounded-lg bg-dark-800 p-4 border border-dark-600">
        {/* 言語インジケーター */}
        <div className="flex items-center mb-3 pb-2 border-b border-dark-600">
          <div className="flex space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <span className="ml-4 text-xs text-dark-300">{language}</span>
        </div>
        
        {/* コード表示 */}
        <TypingText
          text={code}
          speed={speed}
          onComplete={onComplete}
          className="text-neon-green"
          cursorClassName="bg-neon-green"
        />
      </div>
    </motion.div>
  )
}