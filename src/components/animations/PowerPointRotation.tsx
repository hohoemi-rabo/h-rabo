'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface PowerPointRotationProps {
  children: React.ReactNode
  className?: string
}

export default function PowerPointRotation({ 
  children, 
  className = '' 
}: PowerPointRotationProps) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className={className}>{children}</div>
  }

  // PowerPointの「回転」エフェクトを再現
  const rotationVariants = {
    initial: {
      opacity: 0,
      rotateY: 90,
      scale: 0.8,
      transformPerspective: 1200,
    },
    animate: {
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transformPerspective: 1200,
      transition: {
        type: 'tween' as const,
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
      }
    },
    exit: {
      opacity: 0,
      rotateY: -90,
      scale: 0.8,
      transformPerspective: 1200,
      transition: {
        type: 'tween' as const,
        duration: 0.6,
        ease: [0.55, 0.085, 0.68, 0.53] as [number, number, number, number],
      }
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        variants={rotationVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className={className}
        style={{
          transformStyle: 'preserve-3d',
          transformOrigin: 'center center',
          backfaceVisibility: 'hidden',
          willChange: 'transform, opacity',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}