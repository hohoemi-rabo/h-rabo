import type { Metadata } from 'next'
import Container from '@/components/ui/Container'

export const metadata: Metadata = {
  title: 'サービス詳細',
  description: 'ほほ笑みラボのサービス詳細。シニア向けグループレッスン、ビジネスパーソン向け個別レッスン、単発利用サービスなど多様なプランをご用意しています。',
  keywords: ['サービス', '料金', 'グループレッスン', '個別レッスン', 'シニア向け', 'ビジネス向け', 'パソコン教室サービス'],
  openGraph: {
    title: 'サービス詳細 | ほほ笑みラボ',
    description: 'シニア向けグループレッスンから個別指導まで、あなたのニーズに合わせた多様な学習プランをご用意しています。',
    url: 'https://hohoemi-lab.com/services',
  },
}

export default function Services() {
  return (
    <Container className="py-12">
      <div className="space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">サービス詳細</h1>
          <p className="text-lg text-gray-700">コース受講サービス・単発利用サービスの詳細</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">シニア向けグループレッスン</h2>
            <p className="text-gray-700 mb-3">初心者コース、バラエティコース、ステップアップコース</p>
            <p className="font-semibold text-lg text-gray-900">料金: 2時間2,000円、週1回</p>
          </section>
          
          <section className="bg-white p-6 rounded-lg shadow-sm border">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">ビジネスパーソン向け個別レッスン</h2>
            <p className="text-gray-700 mb-3">課題解決型のカスタマイズレッスン</p>
            <p className="font-semibold text-lg text-gray-900">料金: 2時間2,000円（内容により変動）</p>
          </section>
        </div>
      </div>
    </Container>
  )
}