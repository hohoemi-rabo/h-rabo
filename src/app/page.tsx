import HeroSection from '@/components/features/HeroSection'
import ServicesSection from '@/components/features/ServicesSection'
import InstructorSection from '@/components/features/InstructorSection'
import TestimonialsSection from '@/components/features/TestimonialsSection'
import NewsSection from '@/components/features/NewsSection'
import AccessSection from '@/components/features/AccessSection'
import StructuredData from '@/components/seo/StructuredData'
import { 
  organizationStructuredData, 
  localBusinessStructuredData, 
  serviceStructuredData 
} from '@/lib/structured-data'

export default function Home() {
  return (
    <div>
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={localBusinessStructuredData} />
      <StructuredData data={serviceStructuredData} />
      
      <HeroSection />
      <ServicesSection />
      <InstructorSection />
      <TestimonialsSection />
      <NewsSection />
      <AccessSection />
    </div>
  )
}
