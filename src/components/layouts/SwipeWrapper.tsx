'use client'

import { ReactNode, useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, PanInfo } from 'framer-motion'
import { createPortal } from 'react-dom'

interface SwipeWrapperProps {
  children: ReactNode
  prevPage?: string | null  // 前のページURL
  nextPage?: string | null  // 次のページURL
  currentPageIndex?: number  // 現在のページインデックス
  totalPages?: number  // 全ページ数
}

export default function SwipeWrapper({ 
  children, 
  prevPage, 
  nextPage,
  currentPageIndex = 1,
  totalPages = 5  // eslint-disable-line @typescript-eslint/no-unused-vars
}: SwipeWrapperProps) {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null)
  const [mounted, setMounted] = useState(false)

  // ページ名を取得する関数
  const getPageName = (path?: string) => {
    if (!path) return ''
    const pageNames: Record<string, string> = {
      '/': 'ホーム',
      '/instructor': '講師紹介',
      '/services': 'サービス',
      '/faq': 'FAQ',
      '/voice': 'お客様の声',
      '/access': 'アクセス',
      '/contact': 'お問い合わせ'
    }
    return pageNames[path] || ''
  }

  // 現在のページを取得
  const getCurrentPage = () => {
    const pages = ['/', '/instructor', '/services', '/faq', '/voice', '/access', '/contact']
    return pages[currentPageIndex] || '/'
  }

  // マウント状態とモバイルデバイスの検出
  useEffect(() => {
    setMounted(true)
    
    const checkMobile = () => {
      // 768px未満であればモバイルと判定
      const isMobileDevice = window.innerWidth < 768
      setIsMobile(isMobileDevice)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // スワイプ処理
  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (!isMobile) return

    const swipeThreshold = 50 // スワイプと判定する最小距離

    // 左スワイプ（次のページへ）
    if (info.offset.x < -swipeThreshold && nextPage) {
      setSwipeDirection('left')
      setTimeout(() => {
        router.push(nextPage)
      }, 200)
    }
    // 右スワイプ（前のページへ）
    else if (info.offset.x > swipeThreshold && prevPage) {
      setSwipeDirection('right')
      setTimeout(() => {
        router.push(prevPage)
      }, 200)
    }
  }

  // モバイル以外では通常のレンダリング
  if (!isMobile) {
    return <>{children}</>
  }

  return (
    <>
      <motion.div
        className="min-h-screen"
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.2}
        onDragEnd={handleDragEnd}
        animate={{
          x: swipeDirection === 'left' ? -300 : swipeDirection === 'right' ? 300 : 0,
          opacity: swipeDirection ? 0 : 1
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        style={{ touchAction: 'pan-y' }} // 縦スクロールは許可
      >
        {children}
      </motion.div>

      {/* スワイプインジケーター - Portalでbody直下に配置 */}
      {mounted && isMobile && createPortal(
        <div className="fixed bottom-20 left-0 right-0 flex justify-center items-center pointer-events-none z-[9999]">
          <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2">
            {prevPage && (
              <span className="text-white/70 text-sm">
                ← {getPageName(prevPage)}
              </span>
            )}
            {prevPage && <span className="text-white/60 text-sm">|</span>}
            <span className="text-white font-semibold text-sm">
              {getPageName(getCurrentPage())}
            </span>
            {nextPage && <span className="text-white/60 text-sm">|</span>}
            {nextPage && (
              <span className="text-white/70 text-sm">
                {getPageName(nextPage)} →
              </span>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  )
}