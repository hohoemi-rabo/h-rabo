'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/features/HeroSection'
import SwipeWrapper from '@/components/layouts/SwipeWrapper'

export default function HomePageClient() {
  return (
    <SwipeWrapper 
      prevPage={null} 
      nextPage="/instructor"
      currentPageIndex={0}
      totalPages={7}
    >
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
    </SwipeWrapper>
  )
}