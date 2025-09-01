import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import type { Metadata } from 'next'

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Container size="xl">
        <div className="py-20">
          {/* ヘッダー */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mb-6">
              サービス詳細
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              あなたのニーズに合わせた多彩なコースをご用意。<br />
              初心者からプロフェッショナルまで対応いたします。
            </p>
          </div>

          {/* コース受講サービス */}
          <div className="mb-20">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-12">
              コース受講サービス
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {courseServices.map((course, index) => (
                <div
                  key={index}
                  className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-300"
                >
                  {/* コースヘッダー */}
                  <div className="text-center mb-6">
                    <div className="text-6xl mb-4">{course.icon}</div>
                    <h3 className="text-2xl font-cyber font-bold text-white mb-2">
                      {course.title}
                    </h3>
                    <p className="text-gray-300 mb-4">{course.subtitle}</p>
                    
                    {/* 価格表示 */}
                    <div className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${course.color} rounded-full text-dark-900 font-bold text-lg`}>
                      {course.price}
                    </div>
                    <p className="text-neon-green mt-2 font-semibold">{course.frequency}</p>
                  </div>

                  {/* 特徴リスト */}
                  <div className="space-y-3">
                    {course.features.map((feature, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTAボタン */}
                  <div className="mt-8 text-center">
                    <Button variant="secondary" size="md" className="w-full">
                      詳細・お申し込み
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 単発利用サービス */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-12">
              単発利用サービス
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {oneTimeServices.map((service, index) => (
                <div
                  key={index}
                  className="bg-dark-700/50 border border-neon-blue/30 rounded-lg p-6 hover:border-neon-blue/50 transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-white">{service.service}</h3>
                    <span className="text-neon-green font-bold text-lg">{service.price}</span>
                  </div>
                  <p className="text-gray-400">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* お問い合わせセクション */}
          <div className="bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-cyber font-bold text-white mb-4">
              お気軽にご相談ください
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              ご不明な点やカスタマイズのご要望がございましたら、<br />
              お気軽にお問い合わせください。無料相談も承っております。
            </p>
            
            <div className="space-y-4">
              <div className="text-2xl font-bold text-neon-green">
                📞 090-5646-5670
              </div>
              <div className="text-gray-300">
                📍 〒395-0002 長野県飯田市上郷飯沼2640-1
              </div>
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex justify-center gap-6 mt-12">
            <Link href="/instructor">
              <Button variant="secondary" size="lg">
                ← 講師紹介
              </Button>
            </Link>
            <Link href="/voice">
              <Button variant="primary" size="lg">
                お客様の声 →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}