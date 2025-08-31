import type { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: '講師紹介',
  description: 'パソコン・スマホ ほほ笑みラボの講師紹介。IT指導歴10年以上の経験豊富な講師が、最先端のIT技術を分かりやすく丁寧に指導いたします。',
  keywords: ['講師紹介', 'IT指導', 'パソコン講師', 'スマホ講師', '経験豊富', '専門指導'],
  openGraph: {
    title: '講師紹介 | ほほ笑みラボ',
    description: 'IT指導歴10年以上の経験豊富な講師が、最先端のIT技術を分かりやすく丁寧に指導いたします。',
    url: 'https://hohoemi-lab.com/about',
  },
}

export default function About() {
  return (
    <Container className="py-12">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">講師紹介</h1>
        <p className="text-lg text-gray-700">パソコン・スマホ ほほ笑みラボの講師について</p>
        <p className="text-lg text-gray-700">最先端のIT技術を分かりやすく教える専門講師陣</p>
      </div>
    </Container>
  )
}