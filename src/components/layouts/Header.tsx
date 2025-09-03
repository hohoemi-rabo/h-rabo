'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import NavItem from '@/components/ui/NavItem'
import CTAButton from '@/components/ui/CTAButton'
import HamburgerButton from '@/components/ui/HamburgerButton'
import MobileMenu from '@/components/ui/MobileMenu'

const menuItems = [
  { href: '/', label: 'ホーム' },
  { href: '/instructor', label: '講師紹介' },
  { href: '/services', label: 'サービス' },
  { href: '/blog', label: 'ブログ' },
  { href: '/faq', label: 'よくある質問' },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <motion.header
        className={`fixed top-0 z-50 w-full transition-all duration-300 animate-slide-down ${
          isScrolled
            ? 'bg-dark-900/95 border-b border-neon-blue/30 backdrop-blur-md shadow-cyber'
            : 'bg-transparent'
        }`}
      >
        {/* サイバーグリッド背景 */}
        <div className="cyber-grid absolute inset-0 opacity-20 pointer-events-none" />
        
        {/* グラデーション装飾 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-neon-blue/5 to-transparent pointer-events-none" />

        <Container>
          <nav className="relative py-4">
            <div className="flex items-center justify-between">
              {/* ロゴ */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link 
                  href="/" 
                  className="flex items-center space-x-2"
                  onClick={closeMobileMenu}
                >
                  <div className="font-cyber text-xl sm:text-2xl font-bold neon-text">
                    ほほ笑みラボ
                  </div>
                  <div className="hidden xs:block text-xs sm:text-sm text-gray-300">
                    パソコン・スマホ
                  </div>
                </Link>
              </motion.div>

              {/* デスクトップナビゲーション */}
              <div className="hidden md:flex items-center space-x-8">
                {menuItems.map((item) => (
                  <NavItem
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
                  />
                ))}
                <CTAButton />
              </div>

              {/* モバイルハンバーガーメニュー */}
              <HamburgerButton
                isOpen={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              />
            </div>
          </nav>
        </Container>
      </motion.header>

      {/* モバイルメニュー */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={closeMobileMenu}
        activeHref={pathname}
      />
    </>
  )
}