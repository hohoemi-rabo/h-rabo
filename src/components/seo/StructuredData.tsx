import Script from 'next/script'

/**
 * ローカルビジネスの構造化データ
 * SEO向上のためにGoogle検索に詳細情報を提供
 */
export function LocalBusinessSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://hohoemi-lab.com/#business',
    name: 'パソコン・スマホ ほほ笑みラボ',
    alternateName: 'ほほ笑みラボ',
    description: 'シニアから若手ビジネスパーソンまで対応する、長野県飯田市のパソコン・スマホ教室。ゆっくり、何度でも教えます！',
    url: 'https://hohoemi-lab.com',
    telephone: '090-5646-5670',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '上郷飯沼2640-1',
      addressLocality: '飯田市',
      addressRegion: '長野県',
      postalCode: '395-0002',
      addressCountry: 'JP',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 35.516667,
      longitude: 137.85,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '18:00',
      },
    ],
    priceRange: '¥¥',
    image: 'https://hohoemi-lab.com/images/store-front.jpg',
    serviceArea: {
      '@type': 'Place',
      name: '飯田市および周辺地域',
    },
    sameAs: [
      'https://www.instagram.com/hohoemi.rabo',
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'パソコン・スマホ教室サービス',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'シニア向けグループレッスン',
            description: '初心者コース、バラエティコース、ステップアップコース',
          },
          price: '2000',
          priceCurrency: 'JPY',
          unitText: '2時間',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'ビジネスパーソン向け個別レッスン',
            description: '課題解決型のカスタマイズレッスン',
          },
          price: '2000',
          priceCurrency: 'JPY',
          unitText: '2時間',
        },
      ],
    },
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}

/**
 * WebPageの構造化データ
 */
interface WebPageSchemaProps {
  title: string
  description: string
  path: string
}

export function WebPageSchema({ title, description, path }: WebPageSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `https://hohoemi-lab.com${path}`,
    isPartOf: {
      '@type': 'WebSite',
      name: 'パソコン・スマホ ほほ笑みラボ',
      url: 'https://hohoemi-lab.com',
    },
    provider: {
      '@type': 'LocalBusiness',
      '@id': 'https://hohoemi-lab.com/#business',
    },
  }

  return (
    <Script
      id="webpage-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema),
      }}
    />
  )
}