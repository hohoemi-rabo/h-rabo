import HomePageClient from './HomePageClient'
import { 
  organizationStructuredData, 
  localBusinessStructuredData, 
  serviceStructuredData 
} from '@/lib/structured-data'

export default function Home() {
  return (
    <HomePageClient
      organizationStructuredData={organizationStructuredData}
      localBusinessStructuredData={localBusinessStructuredData}
      serviceStructuredData={serviceStructuredData}
    />
  )
}
