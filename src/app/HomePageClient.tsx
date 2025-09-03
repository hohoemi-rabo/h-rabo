'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/features/HeroSection'

export default function HomePageClient() {
  return (
    <motion.div 
      initial={{ 
        opacity: 0,
        scale: 0.95
      }}
      animate={{ 
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
      
      <HeroSection />
    </motion.div>
  )
}