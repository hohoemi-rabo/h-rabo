import HeroSection from '@/components/features/HeroSection'
import ServicesSection from '@/components/features/ServicesSection'
import InstructorSection from '@/components/features/InstructorSection'
import TestimonialsSection from '@/components/features/TestimonialsSection'
import NewsSection from '@/components/features/NewsSection'
import AccessSection from '@/components/features/AccessSection'

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <InstructorSection />
      <TestimonialsSection />
      <NewsSection />
      <AccessSection />
    </div>
  )
}
