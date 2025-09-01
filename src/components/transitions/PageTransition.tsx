'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * シンプルなページ遷移アニメーション
 * 左右スライドのみ
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  // ページの順序定義
  const routes = [
    '/',           // ホーム (0)
    '/instructor', // 講師紹介 (1)
    '/services',   // サービス (2)
    '/voice',      // お客様の声 (3)
    '/access',     // アクセス (4)
  ]

  // 遷移方向の計算
  const getDirection = (currentPath: string) => {
    const currentIndex = routes.indexOf(currentPath)
    return currentIndex > 0 ? 1 : -1 // ホーム以外は右から左
  }

  const direction = getDirection(pathname)

  // 講師紹介ページはフェードインアニメーション（テスト用）
  if (pathname === '/instructor') {
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ 
            opacity: 0,
            scale: 0.95
          }}
          animate={{ 
            opacity: 1,
            scale: 1
          }}
          exit={{ 
            opacity: 0,
            scale: 0.95
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut',
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    )
  }

  // その他のページは通常のスライドアニメーション
  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.div
          key={pathname}
          initial={{ 
            x: direction > 0 ? '100%' : '-100%'
          }}
          animate={{ 
            x: 0
          }}
          exit={{ 
            x: direction > 0 ? '-100%' : '100%'
          }}
          transition={{
            type: 'tween',
            duration: 0.8,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}