'use client'

import { useState } from 'react'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import Navigation from '@/components/ui/Navigation'
import { cn } from '@/lib/utils'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* ロゴ */}
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            onClick={closeMobileMenu}
          >
            <div className="text-xl font-bold text-blue-600">
              ほほ笑みラボ
            </div>
            <div className="hidden sm:block text-sm text-gray-600">
              パソコン・スマホ
            </div>
          </Link>

          {/* デスクトップナビゲーション */}
          <Navigation className="hidden md:block" />

          {/* モバイルハンバーガーメニュー */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1"
            aria-label="メニューを開く"
          >
            <div className={cn(
              'w-6 h-0.5 bg-gray-600 transition-all duration-300',
              isMobileMenuOpen && 'rotate-45 translate-y-1.5'
            )} />
            <div className={cn(
              'w-6 h-0.5 bg-gray-600 transition-all duration-300',
              isMobileMenuOpen && 'opacity-0'
            )} />
            <div className={cn(
              'w-6 h-0.5 bg-gray-600 transition-all duration-300',
              isMobileMenuOpen && '-rotate-45 -translate-y-1.5'
            )} />
          </button>
        </div>

        {/* モバイルメニュー */}
        <div className={cn(
          'md:hidden transition-all duration-300 ease-in-out overflow-hidden',
          isMobileMenuOpen ? 'max-h-64 pb-4' : 'max-h-0'
        )}>
          <Navigation 
            isMobile={true} 
            onItemClick={closeMobileMenu}
            className="pt-4 border-t border-gray-100"
          />
        </div>
      </Container>
    </header>
  )
}