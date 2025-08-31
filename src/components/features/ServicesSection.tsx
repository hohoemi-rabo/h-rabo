import Link from 'next/link'
import Container from '@/components/ui/Container'

const services = [
  {
    id: 1,
    title: 'シニア向けグループレッスン',
    description: 'ゆっくり、楽しく学べます。同世代の仲間と一緒に基本から丁寧に指導します。',
    price: '2時間 2,000円',
    features: [
      '初心者コース',
      'バラエティコース',
      'ステップアップコース',
      '週1回開催'
    ],
    icon: '👥'
  },
  {
    id: 2,
    title: 'ビジネスパーソン向け個別レッスン',
    description: '課題解決型のカスタマイズレッスン。あなたの業務に直結するスキルを効率的に習得。',
    price: '2時間 2,000円〜',
    features: [
      '完全個別指導',
      'カスタマイズ内容',
      '実践的なスキル',
      'フレキシブル対応'
    ],
    icon: '💼'
  },
  {
    id: 3,
    title: '単発利用サービス',
    description: 'お悩み解決をピンポイントでサポート。特定の問題を素早く解決します。',
    price: '3,000円〜',
    features: [
      '新品PC購入サポート',
      'PINコード忘れ対応',
      'パソコン最適化',
      'スマホ動画編集'
    ],
    icon: '🛠️'
  },
]

export default function ServicesSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            サービス紹介
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            あなたのニーズに合わせた多様な学習プランをご用意しています
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-4 sm:mb-6">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">{service.description}</p>
                <div className="text-xl sm:text-2xl font-bold text-blue-600">{service.price}</div>
              </div>
              
              <ul className="space-y-2 mb-4 sm:mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm sm:text-base text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 flex-shrink-0"></span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/services"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors"
              >
                詳細を見る
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}