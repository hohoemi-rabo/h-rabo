'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'

interface Dynamic3DRotationProps {
  children: ReactNode
  className?: string
}

/**
 * ダイナミックな3D回転ページ遷移
 * ページ全体がクルッと回転しながら出現
 */
export default function Dynamic3DRotation({ children, className = '' }: Dynamic3DRotationProps) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{
          opacity: 0,
          rotateY: -90,
          rotateX: 15,
          scale: 0.7,
          z: -800
        }}
        animate={{
          opacity: 1,
          rotateY: 0,
          rotateX: 0,
          scale: 1,
          z: 0
        }}
        exit={{
          opacity: 0,
          rotateY: 90,
          rotateX: -15,
          scale: 0.7,
          z: -800
        }}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
        className={className}
        style={{
          willChange: 'transform, opacity',
          transformOrigin: 'center center',
          perspective: '1500px',
          transformStyle: 'preserve-3d',
          backfaceVisibility: 'hidden'
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}