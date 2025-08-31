import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function AccessSection() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            アクセス・お問い合わせ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            お気軽にお越しください。まずはお電話でお問い合わせを
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* 所在地・連絡先情報 */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">教室情報</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">📍</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">所在地</h4>
                    <p className="text-gray-700">
                      〒395-0002<br />
                      長野県飯田市上郷飯沼2640-1
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">📞</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">お電話</h4>
                    <p className="text-gray-700">
                      <a href="tel:090-5646-5670" className="text-blue-600 hover:text-blue-700 font-semibold">
                        090-5646-5670
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">🕒</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">営業時間</h4>
                    <div className="text-gray-700 space-y-1">
                      <p>平日: 9:00 - 17:00</p>
                      <p className="text-red-600">土日・祝日: お休み</p>
                      <p className="text-sm text-gray-500 mt-2">
                        ※レッスンは事前予約制となっております
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3">アクセス方法</h4>
              <ul className="text-gray-700 space-y-2">
                <li>• JR飯田線「伊那上郷駅」より徒歩15分</li>
                <li>• 中央自動車道「飯田IC」より車で10分</li>
                <li>• 駐車場完備（無料）</li>
                <li>• 公共交通機関でお越しの際はお気軽にご相談ください</li>
              </ul>
            </div>
          </div>
          
          {/* 地図プレースホルダー */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">地図</h3>
            <div className="bg-gray-200 rounded-lg h-80 flex items-center justify-center">
              <div className="text-center text-gray-500">
                <div className="text-4xl mb-4">🗺️</div>
                <p>地図を表示予定</p>
                <p className="text-sm">(Google Maps等を後で組み込み)</p>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link
                href="/contact"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
              >
                お問い合わせフォーム
              </Link>
              <p className="text-sm text-gray-600 mt-3">
                まずはお気軽にご相談ください
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}