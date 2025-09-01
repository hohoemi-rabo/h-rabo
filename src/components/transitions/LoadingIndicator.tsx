'use client'

import { motion } from 'framer-motion'

interface LoadingIndicatorProps {
  isVisible: boolean
  progress?: number
}

/**
 * 洗練されたローディングインジケーター
 * ページ遷移中の視覚フィードバック
 */
export default function LoadingIndicator({ isVisible, progress = 0 }: LoadingIndicatorProps) {
  if (!isVisible) return null

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* プログレスバー */}
      <div className="relative h-1 bg-dark-800/50 backdrop-blur-sm">
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        />
        
        {/* グロー効果 */}
        <motion.div
          className="absolute left-0 top-0 h-full bg-gradient-to-r from-neon-blue/50 via-neon-purple/50 to-neon-pink/50 blur-sm"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.3,
            ease: 'easeOut',
          }}
        />
      </div>

      {/* パルス効果 */}
      <motion.div
        className="absolute right-4 top-2"
        animate={{
          opacity: [0.4, 1, 0.4],
          scale: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1 h-1 bg-neon-blue rounded-full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* データストリーム */}
      <div className="absolute left-0 top-1 w-full h-px overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-transparent via-neon-cyan to-transparent"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ width: '30%' }}
        />
      </div>
    </motion.div>
  )
}