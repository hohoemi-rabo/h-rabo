import type { Metadata } from 'next'
import { Geist, Geist_Mono, Orbitron, JetBrains_Mono, Rajdhani } from 'next/font/google'
import Header from '@/components/layouts/Header'
import Footer from '@/components/layouts/Footer'
import FontSizeToggle from '@/components/ui/FontSizeToggle'
import PageTransition from '@/components/transitions/PageTransition'
import { LocalBusinessSchema } from '@/components/seo/StructuredData'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const orbitron = Orbitron({
  variable: '--font-cyber',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
})

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono-cyber',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const rajdhani = Rajdhani({
  variable: '--font-rajdhani',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: {
    default: 'パソコン・スマホ ほほ笑みラボ | ゆっくり、何度でも教えます！',
    template: '%s | ほほ笑みラボ',
  },
  description: '長野県飯田市のパソコン・スマホ教室。シニアから若手ビジネスパーソンまで、最先端のIT教育を提供します。ゆっくり、何度でも丁寧に指導いたします。',
  keywords: ['パソコン教室', 'スマホ教室', '飯田市', '長野県', 'シニア向け', 'IT教育', 'ビジネスパーソン', '個別レッスン'],
  authors: [{ name: 'ほほ笑みラボ' }],
  creator: 'ほほ笑みラボ',
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://hohoemi-lab.com',
    title: 'パソコン・スマホ ほほ笑みラボ',
    description: 'ゆっくり、何度でも教えます！長野県飯田市のパソコン・スマホ教室',
    siteName: 'ほほ笑みラボ',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'パソコン・スマホ ほほ笑みラボ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'パソコン・スマホ ほほ笑みラボ',
    description: 'ゆっくり、何度でも教えます！長野県飯田市のパソコン・スマホ教室',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // google: 'google-site-verification-code', // 後で設定
    // yandex: 'yandex-verification-code', // 後で設定
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ja">
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${jetbrainsMono.variable} ${rajdhani.variable} antialiased`}>
        <LocalBusinessSchema />
        <div className="flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
          <Footer />
          <FontSizeToggle />
        </div>
      </body>
    </html>
  )
}
