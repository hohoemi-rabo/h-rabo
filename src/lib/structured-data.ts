// Organization Schema
export const organizationStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'パソコン・スマホ ほほ笑みラボ',
  alternateName: 'ほほ笑みラボ',
  url: 'https://hohoemi-lab.com',
  logo: 'https://hohoemi-lab.com/og-image.png',
  description: 'ゆっくり、何度でも教えます！長野県飯田市のパソコン・スマホ教室',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '上郷飯沼2640-1',
    addressLocality: '飯田市',
    addressRegion: '長野県',
    postalCode: '395-0002',
    addressCountry: 'JP',
  },
  telephone: '090-5646-5670',
  email: 'info@hohoemi-lab.com', // 実際のメールアドレスに変更
  foundingDate: '2014', // 実際の創立年に変更
  knowsAbout: [
    'パソコン教室',
    'スマートフォン教室',
    'IT教育',
    'シニア向けレッスン',
    'ビジネス向けレッスン',
    'Microsoft Office',
    'インターネット',
    '動画編集'
  ]
}

// LocalBusiness Schema
export const localBusinessStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://hohoemi-lab.com',
  name: 'パソコン・スマホ ほほ笑みラボ',
  alternateName: 'ほほ笑みラボ',
  description: 'シニアから若手ビジネスパーソンまで対応するパソコン・スマホ教室。ゆっくり、何度でも丁寧に指導いたします。',
  url: 'https://hohoemi-lab.com',
  telephone: '090-5646-5670',
  email: 'info@hohoemi-lab.com',
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
    latitude: 35.5508, // 実際の座標に変更
    longitude: 137.8263, // 実際の座標に変更
  },
  openingHours: [
    'Mo-Fr 09:00-17:00'
  ],
  priceRange: '¥¥',
  paymentAccepted: ['Cash', 'Credit Card'],
  currenciesAccepted: 'JPY',
  image: 'https://hohoemi-lab.com/og-image.png',
  logo: 'https://hohoemi-lab.com/og-image.png',
  sameAs: [
    // SNSアカウントがあれば追加
  ],
  areaServed: {
    '@type': 'City',
    name: '飯田市',
    containedInPlace: {
      '@type': 'AdministrativeArea',
      name: '長野県'
    }
  },
  serviceType: [
    'パソコン教室',
    'スマートフォン教室',
    'IT教育',
    'シニア向けレッスン',
    'ビジネス向けレッスン'
  ]
}

// Service Schema for homepage
export const serviceStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'パソコン・スマホ レッスンサービス',
  description: 'シニアから若手ビジネスパーソンまで対応するパソコン・スマホのレッスンサービス',
  provider: {
    '@type': 'LocalBusiness',
    name: 'パソコン・スマホ ほほ笑みラボ',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '上郷飯沼2640-1',
      addressLocality: '飯田市',
      addressRegion: '長野県',
      postalCode: '395-0002',
      addressCountry: 'JP',
    },
    telephone: '090-5646-5670'
  },
  areaServed: {
    '@type': 'City',
    name: '飯田市',
    containedInPlace: {
      '@type': 'AdministrativeArea', 
      name: '長野県'
    }
  },
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'レッスンサービス',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'シニア向けグループレッスン',
          description: 'ゆっくり、楽しく学べる初心者向けレッスン'
        },
        price: '2000',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'ビジネスパーソン向け個別レッスン',
          description: '課題解決型のカスタマイズレッスン'
        },
        price: '2000',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock'
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: '単発利用サービス',
          description: 'お悩み解決をピンポイントでサポート'
        },
        price: '3000',
        priceCurrency: 'JPY',
        availability: 'https://schema.org/InStock'
      }
    ]
  }
}