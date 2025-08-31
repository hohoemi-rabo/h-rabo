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
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            サービス紹介
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            あなたのニーズに合わせた多様な学習プランをご用意しています
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div key={service.id} className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-blue-600">{service.price}</div>
              </div>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Link
                href="/services"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition-colors"
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