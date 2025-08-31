'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'

export interface CTAButtonProps {
  href?: string
  onClick?: () => void
  children?: React.ReactNode
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function CTAButton({ 
  href = '/contact',
  onClick,
  children = 'お問い合わせ',
  variant = 'primary',
  size = 'md',
  className = ''
}: CTAButtonProps) {
  const baseClasses = 'font-cyber font-semibold rounded-lg transition-all duration-300 inline-block text-center'
  
  const variants = {
    primary: 'bg-gradient-to-r from-neon-pink to-neon-purple text-white shadow-neon hover:shadow-glow animate-pulse hover:animate-none',
    secondary: 'border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-900 shadow-sm hover:shadow-neon'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2.5 text-base',
    lg: 'px-8 py-3 text-lg'
  }

  const buttonClasses = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`.replace(/\s+/g, ' ').trim()

  const content = (
    <motion.span
      className={buttonClasses}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.span>
  )

  if (href && !onClick) {
    return (
      <Link href={href}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} className="inline-block">
      {content}
    </button>
  )
}