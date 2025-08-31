# 020: パフォーマンス最適化・SEO対策

## 概要
サイト全体のパフォーマンス最適化とSEO強化を実施し、Lighthouse目標スコア90以上を達成する

## 優先度
High

## 前提条件
- 全ての基本機能が実装済みであること

## Todoリスト
- [ ] パフォーマンス最適化
  - [ ] Core Web Vitals改善
  - [ ] 画像最適化（next/image活用）
  - [ ] 動的インポート実装
  - [ ] バンドルサイズ最適化
  - [ ] キャッシング戦略実装
- [ ] SEO対策
  - [ ] sitemap.xml自動生成
  - [ ] robots.txt設定
  - [ ] 構造化データ拡充
  - [ ] メタタグ最適化
  - [ ] パンくずリスト実装
- [ ] アクセシビリティ向上
  - [ ] ARIA属性追加
  - [ ] キーボードナビゲーション改善
  - [ ] カラーコントラスト調整
  - [ ] スクリーンリーダー対応
- [ ] モニタリング設定
  - [ ] Web Vitals計測
  - [ ] エラー監視
  - [ ] パフォーマンス監視
- [ ] PWA対応（オプション）
  - [ ] Service Worker実装
  - [ ] マニフェストファイル
  - [ ] オフライン対応

## 実装詳細
### Core Web Vitals最適化
```typescript
// lib/performance.ts
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

export function initWebVitals() {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}

function sendToAnalytics(metric: any) {
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric.name, metric.value)
  }
  
  // 本番環境では分析サービスに送信
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', metric.name, {
      event_category: 'Web Vitals',
      event_label: metric.id,
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      non_interaction: true,
    })
  }
}
```

### 動的インポート実装
```tsx
// components/LazyComponents.tsx
import dynamic from 'next/dynamic'
import { Loading } from '@/components/ui'

// Three.js 3D要素の遅延読み込み
export const Dynamic3DScene = dynamic(
  () => import('@/components/3d/Scene'),
  {
    loading: () => <Loading />,
    ssr: false
  }
)

// パーティクルエフェクトの遅延読み込み
export const DynamicParticleNetwork = dynamic(
  () => import('@/components/effects/ParticleNetwork'),
  {
    loading: () => <div className="h-full bg-dark-900" />,
    ssr: false
  }
)

// 管理画面の遅延読み込み
export const DynamicAdminPanel = dynamic(
  () => import('@/components/admin/AdminPanel'),
  {
    loading: () => <Loading />,
    ssr: false
  }
)

// フォームコンポーネントの遅延読み込み
export const DynamicContactForm = dynamic(
  () => import('@/components/forms/ContactForm'),
  {
    loading: () => <div className="h-96 bg-dark-800 animate-pulse rounded-lg" />
  }
)
```

### 画像最適化
```tsx
// components/OptimizedImage.tsx
import Image from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps {
  src: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
  quality?: number
}

export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = '',
  quality = 85
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        quality={quality}
        placeholder="blur"
        blurDataURL={generateBlurDataURL(width, height)}
        onLoad={() => setIsLoaded(true)}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  )
}

function generateBlurDataURL(w: number, h: number): string {
  return `data:image/svg+xml;base64,${btoa(`
    <svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#2a2a2a;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>
  `)}`
}
```

### サイトマップ生成
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next'
import { dataManager } from '@/lib/dataManager'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hohoemi-lab.com'
  
  // 基本ページ
  const routes = [
    '',
    '/about',
    '/services',
    '/blog',
    '/contact',
    '/faq',
    '/privacy'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8
  }))
  
  // ブログ投稿
  const posts = await dataManager.getAllPosts()
  const blogRoutes = posts
    .filter(post => post.status === 'published')
    .map(post => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.6
    }))
  
  return [...routes, ...blogRoutes]
}
```

### 構造化データ拡充
```tsx
// components/seo/StructuredData.tsx
import Script from 'next/script'

interface LocalBusinessSchemaProps {
  name: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  telephone: string
  openingHours?: string[]
}

export function LocalBusinessSchema({ 
  name, 
  address, 
  telephone, 
  openingHours 
}: LocalBusinessSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://hohoemi-lab.com/#business',
    name,
    description: 'シニアから若手ビジネスパーソンまで対応するパソコン・スマホ教室',
    url: 'https://hohoemi-lab.com',
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: '35.5167', // 飯田市の座標（例）
      longitude: '137.8167'
    },
    openingHoursSpecification: openingHours?.map(hours => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(' ')[0],
      opens: hours.split(' ')[1],
      closes: hours.split(' ')[2]
    })),
    sameAs: [
      // SNSリンクがあれば追加
    ]
  }
  
  return (
    <Script id="local-business-schema" type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  )
}

export function BlogPostSchema({ post }: { post: BlogPost }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.coverImage || '/images/default-og.jpg',
    author: {
      '@type': 'Organization',
      name: 'パソコン・スマホ ほほ笑みラボ'
    },
    publisher: {
      '@type': 'Organization',
      name: 'パソコン・スマホ ほほ笑みラボ',
      logo: {
        '@type': 'ImageObject',
        url: '/images/logo.png'
      }
    },
    datePublished: post.publishedAt.toISOString(),
    dateModified: post.updatedAt.toISOString(),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://hohoemi-lab.com/blog/${post.slug}`
    }
  }
  
  return (
    <Script id="blog-post-schema" type="application/ld+json">
      {JSON.stringify(schema)}
    </Script>
  )
}
```

### パンくずリスト
```tsx
// components/seo/Breadcrumb.tsx
import Link from 'next/link'
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import Script from 'next/script'

interface BreadcrumbItem {
  label: string
  href: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `https://hohoemi-lab.com${item.href}`
    }))
  }
  
  return (
    <>
      <nav aria-label="パンくずリスト" className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-400">
          <li>
            <Link 
              href="/" 
              className="hover:text-neon-blue transition-colors"
            >
              ホーム
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center space-x-2">
              <ChevronRightIcon className="w-4 h-4 text-gray-600" />
              {index === items.length - 1 ? (
                <span className="text-white" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="hover:text-neon-blue transition-colors"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      
      <Script id="breadcrumb-schema" type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </Script>
    </>
  )
}
```

### robots.txt設定
```typescript
// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://hohoemi-lab.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/admin/', '/api/'],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
```

### パフォーマンス監視
```tsx
// components/monitoring/PerformanceMonitor.tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function PerformanceMonitor() {
  const router = useRouter()
  
  useEffect(() => {
    // ページ読み込み時間の計測
    const measurePageLoad = () => {
      if (typeof window !== 'undefined' && window.performance) {
        const loadTime = window.performance.timing.loadEventEnd - 
                        window.performance.timing.navigationStart
        
        if (loadTime > 0) {
          console.log(`Page load time: ${loadTime}ms`)
          
          // 分析サービスに送信
          if (window.gtag) {
            window.gtag('event', 'page_load_time', {
              event_category: 'Performance',
              value: loadTime,
              non_interaction: true
            })
          }
        }
      }
    }
    
    // ページ読み込み完了後に実行
    if (document.readyState === 'complete') {
      measurePageLoad()
    } else {
      window.addEventListener('load', measurePageLoad)
    }
    
    // メモリ使用量の監視
    const monitorMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        const memoryUsage = memory.usedJSHeapSize / 1024 / 1024 // MB
        
        if (memoryUsage > 50) { // 50MB以上で警告
          console.warn(`High memory usage: ${memoryUsage.toFixed(2)}MB`)
        }
      }
    }
    
    const memoryInterval = setInterval(monitorMemory, 30000) // 30秒ごと
    
    return () => {
      window.removeEventListener('load', measurePageLoad)
      clearInterval(memoryInterval)
    }
  }, [])
  
  // ルート変更の計測
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const startTime = Date.now()
      
      const measureRouteChange = () => {
        const routeChangeTime = Date.now() - startTime
        console.log(`Route change time: ${routeChangeTime}ms`)
        
        if (window.gtag) {
          window.gtag('event', 'route_change_time', {
            event_category: 'Performance',
            value: routeChangeTime,
            custom_parameter: url
          })
        }
      }
      
      // 少し遅延させて計測
      setTimeout(measureRouteChange, 100)
    }
    
    router.events?.on('routeChangeComplete', handleRouteChange)
    
    return () => {
      router.events?.off('routeChangeComplete', handleRouteChange)
    }
  }, [router])
  
  return null
}
```

### バンドル最適化設定
```javascript
// next.config.ts
const nextConfig = {
  // 実験的機能の有効化
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
  
  // 画像最適化
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // コンパイル最適化
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // バンドル分析
  webpack: (config, { isServer, dev }) => {
    if (!dev && !isServer) {
      // Three.jsの最適化
      config.resolve.alias = {
        ...config.resolve.alias,
        three: 'three/build/three.module.js',
      }
      
      // 不要なlocaleファイルを除外
      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        })
      )
    }
    
    return config
  },
  
  // ヘッダー設定
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

## 完了条件
- Lighthouse Performanceスコア90以上を達成
- Core Web Vitals全指標が良好
- sitemap.xml、robots.txtが正常に生成される
- 構造化データが適切に実装されている
- アクセシビリティスコア90以上を達成