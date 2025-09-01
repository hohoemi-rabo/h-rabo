'use client'

import React from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import NavItem from './NavItem'

const menuItems = [
  { href: '/', label: 'ホーム' },
  { href: '/instructor', label: '講師紹介' },
  { href: '/services', label: 'サービス' },
  { href: '/blog', label: 'ブログ' },
  { href: '/faq', label: 'よくある質問' },
]

export interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
  activeHref?: string
}

export default function MobileMenu({ isOpen, onClose, activeHref }: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* オーバーレイ */}
          <motion.div
            className="fixed inset-0 z-40 bg-dark-900/80 backdrop-blur-sm md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* メニューパネル */}
          <motion.div
            className="fixed right-0 top-0 z-50 h-full w-80 border-l border-neon-blue/30 bg-dark-900/95 backdrop-blur-md cyber-grid md:hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            {/* グラデーションエフェクト */}
            <div className="absolute inset-0 bg-gradient-to-b from-neon-blue/5 via-transparent to-neon-purple/5 pointer-events-none" />
            
            <div className="relative p-6 pt-20">
              {/* メニューアイテム */}
              <nav className="space-y-2">
                {menuItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                  >
                    <NavItem
                      href={item.href}
                      label={item.label}
                      isActive={activeHref === item.href}
                      onClick={onClose}
                      className="block py-3 px-4 rounded-lg hover:bg-dark-700/50"
                    />
                  </motion.div>
                ))}
              </nav>

              {/* CTAボタン */}
              <motion.div
                className="pt-8 border-t border-dark-600/50 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <Link href="/contact" onClick={onClose}>
                  <button className="w-full bg-gradient-to-r from-neon-pink to-neon-purple text-white font-cyber font-semibold rounded-lg px-6 py-2.5 text-center hover:scale-105 transition-transform duration-200">
                    お問い合わせ
                  </button>
                </Link>
              </motion.div>

              {/* 装飾ライン */}
              <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-transparent via-neon-blue to-transparent opacity-50" />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}