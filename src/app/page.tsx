import HeroSection from '@/components/features/HeroSection'
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
      
      <HeroSection />
    </>
  )
}
