'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Icon } from '@/components/ui'

export interface FooterLinkProps {
  text: string
  href?: string
  external?: boolean
  className?: string
}

export default function FooterLink({
  text,
  href = '#',
  external = false,
  className = '',
}: FooterLinkProps) {
  const baseClasses = 'font-futura cursor-pointer text-sm text-gray-300 transition-colors duration-300 hover:text-neon-blue'
  const combinedClasses = `${baseClasses} ${className}`.replace(/\s+/g, ' ').trim()

  const content = (
    <motion.span
      className={combinedClasses}
      whileHover={{ x: 5 }}
      transition={{ duration: 0.2 }}
    >
      {text}
      {external && (
        <Icon 
          name="arrow_right" 
          size="xs" 
          className="ml-1 inline transform rotate-45" 
        />
      )}
    </motion.span>
  )

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className="inline-block">
      {content}
    </Link>
  )
}