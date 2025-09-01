'use client'

import { motion } from 'framer-motion'
import HeroSection from '@/components/features/HeroSection'
import StructuredData from '@/components/seo/StructuredData'

interface HomePageClientProps {
  organizationStructuredData: any
  localBusinessStructuredData: any
  serviceStructuredData: any
}

export default function HomePageClient({ 
  organizationStructuredData,
  localBusinessStructuredData,
  serviceStructuredData
}: HomePageClientProps) {
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
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={localBusinessStructuredData} />
      <StructuredData data={serviceStructuredData} />
      
      <HeroSection />
    </motion.div>
  )
}