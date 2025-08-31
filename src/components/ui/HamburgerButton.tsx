'use client'

import React from 'react'
import { motion } from 'framer-motion'

export interface HamburgerButtonProps {
  isOpen: boolean
  onClick: () => void
  className?: string
}

export default function HamburgerButton({ isOpen, onClick, className = '' }: HamburgerButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`relative flex h-10 w-10 flex-col items-center justify-center space-y-1 rounded-lg border border-neon-blue/30 bg-dark-800/80 backdrop-blur-sm transition-all duration-300 hover:border-neon-blue hover:shadow-neon md:hidden ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
    >
      {/* トップライン */}
      <motion.div
        className="h-0.5 w-6 bg-neon-blue shadow-neon"
        animate={{
          rotate: isOpen ? 45 : 0,
          y: isOpen ? 8 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* ミドルライン */}
      <motion.div
        className="h-0.5 w-6 bg-neon-blue shadow-neon"
        animate={{
          opacity: isOpen ? 0 : 1,
          scale: isOpen ? 0.5 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* ボトムライン */}
      <motion.div
        className="h-0.5 w-6 bg-neon-blue shadow-neon"
        animate={{
          rotate: isOpen ? -45 : 0,
          y: isOpen ? -8 : 0,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* ホバー時のグロウエフェクト */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1, boxShadow: '0 0 15px rgba(0, 212, 255, 0.3)' }}
        transition={{ duration: 0.3 }}
      />
    </motion.button>
  )
}