'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode, useRef, useEffect } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * ページ遷移アニメーションコンポーネント
 * 左右スライドアニメーションでページ間遷移を実現
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const previousPathnameRef = useRef<string>('')

  useEffect(() => {
    previousPathnameRef.current = pathname
  }, [pathname])

  // ページの順序定義
  const routes = [
    '/',           // ホーム (0)
    '/instructor', // 講師紹介 (1)
    '/services',   // サービス (2)
    '/voice',      // お客様の声 (3)
    '/access',     // アクセス (4)
  ]

  // 遷移方向の計算（現在のページが前のページより後なら正の方向）
  const getDirection = (currentPath: string, previousPath: string) => {
    const currentIndex = routes.indexOf(currentPath)
    const previousIndex = routes.indexOf(previousPath)
    
    // インデックスが見つからない場合は0方向
    if (currentIndex === -1 || previousIndex === -1) {
      return 0
    }
    
    return currentIndex > previousIndex ? 1 : -1
  }

  const direction = getDirection(pathname, previousPathnameRef.current)

  // より洗練されたアニメーション設定
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : direction < 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.05,
    }),
  }

  const transition = {
    type: 'tween' as const,
    duration: 0.8,
    ease: [0.25, 0.46, 0.45, 0.94] as const, // よりスムーズなイージング
  }

  return (
    <div className="relative overflow-hidden min-h-screen">
      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={pathname}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
      
      {/* ダークスライドオーバーレイ */}
      <AnimatePresence>
        <motion.div
          key={`overlay-${pathname}`}
          className="fixed inset-0 bg-gradient-to-r from-dark-900 via-dark-800 to-dark-900 z-50 pointer-events-none"
          initial={{ x: '100%' }}
          animate={{ x: '100%' }}
          exit={{ 
            x: ['100%', '0%', '-100%'],
            transition: { 
              duration: 0.8, 
              ease: [0.25, 0.46, 0.45, 0.94] as const,
              times: [0, 0.5, 1]
            }
          }}
        />
      </AnimatePresence>
    </div>
  )
}