import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function InstructorSection() {
  return (
    <section className="py-20 bg-gray-50">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                講師紹介
              </h2>
              <p className="text-lg text-gray-600">
                最先端のIT技術を分かりやすく教える専門講師陣
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">経験豊富な指導実績</h3>
                <p className="text-gray-700">
                  10年以上にわたり、幅広い年齢層の方々にIT技術を指導してきました。
                  特にシニア層への優しく丁寧な指導には定評があります。
                </p>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">専門分野</h3>
                <ul className="grid grid-cols-2 gap-2 text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    パソコン基本操作
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    スマートフォン活用
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    インターネット・メール
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    オフィスソフト
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    動画編集
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    トラブル解決
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">指導方針</h3>
                <p className="text-gray-700">
                  「ゆっくり、何度でも」をモットーに、お一人お一人のペースに合わせた
                  指導を心がけています。分からないことは何度でもお聞きください。
                </p>
              </div>
            </div>
            
            <Link
              href="/about"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              詳しい紹介を見る
            </Link>
          </div>
          
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-8">
              <div className="w-48 h-48 bg-gray-300 rounded-full mx-auto mb-6 flex items-center justify-center text-6xl">
                👨‍🏫
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-gray-900">講師プロフィール</h3>
                <p className="text-gray-600">IT指導歴10年以上</p>
                <p className="text-sm text-gray-500">
                  長野県飯田市を中心に活動
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}