import type { Metadata } from 'next'
import ServicesPageClient from './ServicesPageClient'

export const metadata: Metadata = {
  title: 'サービス詳細',
  description: 'ほほ笑みラボのサービス内容をご紹介。シニア向けグループレッスンからビジネスパーソン向け個別レッスンまで、幅広いニーズにお応えします。',
}

const courseServices = [
  {
    title: 'シニア向けグループレッスン',
    subtitle: 'ゆっくり、何度でも丁寧に指導',
    price: '2時間 2,000円',
    frequency: '週1回',
    features: [
      '初心者コース - パソコンの基本操作から',
      'バラエティコース - 様々なアプリケーション',
      'ステップアップコース - より実践的な使い方',
      '少人数制で一人ひとりに寄り添います',
    ],
    color: 'from-neon-blue to-neon-cyan',
    icon: '👥',
  },
  {
    title: 'ビジネスパーソン向け個別レッスン',
    subtitle: '課題解決型カスタマイズレッスン',
    price: '2時間 2,000円～',
    frequency: '予約制',
    features: [
      'Excel・PowerPoint等のOffice系',
      'プレゼンテーション作成支援',
      'データ分析・自動化支援',
      '個別ニーズに完全対応',
    ],
    color: 'from-neon-purple to-neon-pink',
    icon: '💼',
  },
]

const oneTimeServices = [
  { service: '新品PC購入サポート', price: '5,000円', description: '最適なPC選びから初期設定まで' },
  { service: 'PINコード忘れ対応', price: '5,000円', description: '出張対応込み・データ復旧' },
  { service: 'パソコン最適化', price: '5,000円', description: '動作改善・セキュリティ対策' },
  { service: 'スマホ動画編集', price: '3,000円', description: '思い出を素敵な動画に' },
]

export default function ServicesPage() {
  return <ServicesPageClient courseServices={courseServices} oneTimeServices={oneTimeServices} />
}