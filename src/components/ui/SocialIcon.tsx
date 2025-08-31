'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@/components/ui'

export interface SocialIconProps {
  icon: string
  href: string
  color?: 'neon-blue' | 'neon-purple' | 'neon-pink' | 'neon-green'
  label?: string
}

export default function SocialIcon({ 
  icon, 
  href, 
  color = 'neon-blue',
  label
}: SocialIconProps) {
  const colorClasses = {
    'neon-blue': 'hover:text-neon-blue hover:border-neon-blue hover:shadow-neon',
    'neon-purple': 'hover:text-neon-purple hover:border-neon-purple hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]',
    'neon-pink': 'hover:text-neon-pink hover:border-neon-pink hover:shadow-[0_0_15px_rgba(255,0,128,0.5)]',
    'neon-green': 'hover:text-neon-green hover:border-neon-green hover:shadow-[0_0_15px_rgba(0,255,136,0.5)]',
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label || `${icon} link`}
      className={`
        flex h-10 w-10 items-center justify-center rounded-full 
        border border-gray-600 text-gray-400 
        transition-all duration-300 backdrop-blur-sm
        ${colorClasses[color]}
      `.replace(/\s+/g, ' ').trim()}
      whileHover={{ 
        scale: 1.15, 
        rotate: [0, -5, 5, 0],
        transition: { rotate: { duration: 0.5 } }
      }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Icon name={icon as any} size="sm" />
    </motion.a>
  )
}