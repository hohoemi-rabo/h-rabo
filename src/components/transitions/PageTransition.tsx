'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * ページ遷移アニメーション
 * 分離戦略を使っているページはアニメーションをスキップ
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()

  // 分離戦略を使用しているページリスト（独自のアニメーションを持つ）
  const separateAnimationPages = [
    '/',
    '/services',
    '/voice', 
    '/access',
    '/blog',
    '/faq'
  ]

  // 分離戦略ページはPageTransitionのアニメーションをスキップ
  if (separateAnimationPages.includes(pathname)) {
    return <>{children}</>
  }

  // その他のページ（/instructorなど）はPageTransitionでフェードイン
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