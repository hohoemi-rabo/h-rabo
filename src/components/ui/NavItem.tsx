'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

export interface NavItemProps {
  href: string
  label: string
  isActive?: boolean
  onClick?: () => void
  className?: string
}

export default function NavItem({ href, label, isActive, onClick, className = '' }: NavItemProps) {
  const router = useRouter()
  
  // 講師紹介ページへの3D遷移処理
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href === '/instructor') {
      e.preventDefault()
      
      // 3D遷移エフェクトを開始
      document.body.style.perspective = '1200px'
      document.body.style.transformStyle = 'preserve-3d'
      
      // ページ遷移を少し遅らせて3D効果を見せる
      setTimeout(() => {
        router.push(href)
      }, 100)
    }
    
    // 元のonClickも実行
    if (onClick) {
      onClick()
    }
  }
  
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={href}
        onClick={handleClick}
        className={`
          font-futura relative block font-medium transition-all duration-300 
          ${isActive 
            ? 'text-neon-blue shadow-neon' 
            : 'text-white hover:text-neon-blue'
          }
          ${href === '/instructor' ? 'cursor-pointer' : ''}
        `.replace(/\s+/g, ' ').trim()}
      >
        {label}

        {/* アンダーラインアニメーション */}
        <motion.div
          className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"
          initial={{ width: 0 }}
          animate={{ width: isActive ? '100%' : 0 }}
          whileHover={{ width: '100%' }}
          transition={{ duration: 0.3 }}
        />

        {/* ホバー時のグロウ効果 */}
        <motion.div
          className="absolute inset-0 rounded-lg"
          initial={{ opacity: 0, boxShadow: 'none' }}
          whileHover={{
            opacity: 0.2,
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)',
          }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.div>
  )
}