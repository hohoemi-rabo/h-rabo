'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@/components/ui'

export interface ContactItemProps {
  icon: string
  text: string
  className?: string
}

export default function ContactItem({ icon, text, className = '' }: ContactItemProps) {
  return (
    <motion.div 
      className={`flex items-start space-x-3 ${className}`}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ x: 5 }}
    >
      <div className="text-neon-blue">
        <Icon name={icon as any} size="sm" glowing />
      </div>
      <span className="font-futura text-sm text-gray-300 leading-relaxed whitespace-pre-line">{text}</span>
    </motion.div>
  )
}