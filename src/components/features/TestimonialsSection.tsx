import Container from '@/components/ui/Container'

const testimonials = [
  {
    id: 1,
    name: '田中様（70代）',
    content: 'パソコンが苦手でしたが、優しく教えていただき、今では孫とビデオ通話ができるようになりました。毎週のレッスンが楽しみです。',
    course: 'シニア向けグループレッスン',
    rating: 5
  },
  {
    id: 2,
    name: '佐藤様（30代）',
    content: '仕事で必要なExcelの使い方を効率的に学べました。実践的で助かっています。短期間で大幅にスキルアップできました。',
    course: 'ビジネスパーソン向け個別レッスン',
    rating: 5
  },
  {
    id: 3,
    name: '鈴木様（60代）',
    content: 'スマホの使い方から丁寧に教えていただき、写真の整理や共有ができるようになりました。家族とのコミュニケーションが豊かになりました。',
    course: '単発利用サービス',
    rating: 5
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-20 bg-blue-50">
      <Container>
        <div className="text-center mb-12 sm:mb-16 px-4">
          <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            生徒さんの声
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            実際にレッスンを受けられた生徒さんからの嬉しいお声をご紹介します
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 px-4">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-xl shadow-lg p-4 sm:p-6 relative">
              {/* 引用符アイコン */}
              <div className="absolute -top-4 left-6">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-lg">&ldquo;</span>
                </div>
              </div>
              
              <div className="pt-4 sm:pt-6 space-y-3 sm:space-y-4">
                {/* 星評価 */}
                <div className="flex justify-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-base sm:text-lg">★</span>
                  ))}
                </div>
                
                {/* レビュー内容 */}
                <p className="text-sm sm:text-base text-gray-700 text-center italic leading-relaxed">
                  {testimonial.content}
                </p>
                
                {/* 生徒情報 */}
                <div className="text-center pt-3 sm:pt-4 border-t border-gray-100">
                  <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">{testimonial.name}</h4>
                  <p className="text-xs sm:text-sm text-blue-600">{testimonial.course}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8 sm:mt-12 px-4">
          <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
            あなたも「ほほ笑みラボ」で新しいスキルを身につけませんか？
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-colors shadow-lg"
          >
            まずは無料相談から
          </a>
        </div>
      </Container>
    </section>
  )
}