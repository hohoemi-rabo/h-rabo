'use client'

import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Course {
  title: string
  subtitle: string
  price: string
  frequency: string
  features: string[]
  color: string
  icon: string
}

interface OneTimeService {
  service: string
  price: string
  description: string
}

interface ServicesPageClientProps {
  courseServices: Course[]
  oneTimeServices: OneTimeService[]
}

export default function ServicesPageClient({ 
  courseServices, 
  oneTimeServices 
}: ServicesPageClientProps) {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      initial={{ 
        opacity: 0,
        scale: 0.95
      }}
      animate={{ 
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
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
                    <Link href="/contact">
                      <Button variant="secondary" size="md" className="w-full">
                        詳細・お申し込み
                      </Button>
                    </Link>
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
    </motion.div>
  )
}