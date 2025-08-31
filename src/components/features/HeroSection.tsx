import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <Container>
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
              パソコン・スマホ
              <br />
              <span className="text-blue-600">ほほ笑みラボ</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-700 font-semibold">
              ゆっくり、何度でも教えます！
            </p>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              最先端のIT教育を提供するプロフェッショナルな学習環境で、
              あなたのデジタルライフをサポートします
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors shadow-lg"
            >
              お問い合わせ
            </Link>
            <Link
              href="/services"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors"
            >
              サービス詳細
            </Link>
          </div>
        </div>
      </Container>
      
      {/* 背景装飾 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full opacity-20"></div>
      </div>
    </section>
  )
}