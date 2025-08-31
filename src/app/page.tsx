import HeroSection from '@/components/features/HeroSection'
import ServicesSection from '@/components/features/ServicesSection'
import InstructorSection from '@/components/features/InstructorSection'
import TestimonialsSection from '@/components/features/TestimonialsSection'
import NewsSection from '@/components/features/NewsSection'
import AccessSection from '@/components/features/AccessSection'
import Scene3DContainer from '@/components/3d/Scene3DContainer'
import StructuredData from '@/components/seo/StructuredData'
import { 
  organizationStructuredData, 
  localBusinessStructuredData, 
  serviceStructuredData 
} from '@/lib/structured-data'

export default function Home() {
  return (
    <>
      <StructuredData data={organizationStructuredData} />
      <StructuredData data={localBusinessStructuredData} />
      <StructuredData data={serviceStructuredData} />
      
      <Scene3DContainer>
        {{
          hero: <HeroSection />,
          about: <InstructorSection />,
          services: <ServicesSection />,
          voice: <TestimonialsSection />,
          contact: (
            <div className="space-y-0">
              <NewsSection />
              <AccessSection />
            </div>
          )
        }}
      </Scene3DContainer>
    </>
  )
}
