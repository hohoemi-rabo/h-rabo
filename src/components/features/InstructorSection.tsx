import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function InstructorSection() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center px-4">
          <div className="space-y-4 sm:space-y-6 order-2 md:order-1">
            <div>
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                講師紹介
              </h2>
              <p className="text-base sm:text-lg text-gray-600">
                最先端のIT技術を分かりやすく教える専門講師陣
              </p>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">経験豊富な指導実績</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  10年以上にわたり、幅広い年齢層の方々にIT技術を指導してきました。
                  特にシニア層への優しく丁寧な指導には定評があります。
                </p>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">専門分野</h3>
                <ul className="grid grid-cols-1 xs:grid-cols-2 gap-2 text-sm sm:text-base text-gray-700">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                    パソコン基本操作
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                    スマートフォン活用
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                    インターネット・メール
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                    オフィスソフト
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                    動画編集
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 flex-shrink-0"></span>
                    トラブル解決
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">指導方針</h3>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                  「ゆっくり、何度でも」をモットーに、お一人お一人のペースに合わせた
                  指導を心がけています。分からないことは何度でもお聞きください。
                </p>
              </div>
            </div>
            
            <Link
              href="/about"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors"
            >
              詳しい紹介を見る
            </Link>
          </div>
          
          <div className="text-center order-1 md:order-2">
            <div className="bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl p-6 sm:p-8 max-w-sm mx-auto">
              <div className="relative w-32 h-32 sm:w-48 sm:h-48 bg-gray-300 rounded-full mx-auto mb-4 sm:mb-6 flex items-center justify-center text-4xl sm:text-6xl overflow-hidden">
                <span role="img" aria-label="講師">👨‍🏫</span>
                {/* 実際の画像に置き換える場合 */}
                {/* <Image
                  src="/instructor.jpg"
                  alt="講師プロフィール写真"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 8rem, 12rem"
                /> */}
              </div>
              <div className="space-y-1 sm:space-y-2">
                <h3 className="text-lg sm:text-2xl font-bold text-gray-900">講師プロフィール</h3>
                <p className="text-sm sm:text-base text-gray-600">IT指導歴10年以上</p>
                <p className="text-xs sm:text-sm text-gray-500">
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