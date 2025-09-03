'use client'

import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface Testimonial {
  id: number
  name: string
  age: string
  course: string
  period: string
  rating: number
  comment: string
  achievement: string
  avatar: string
  color: string
}

interface Stat {
  label: string
  value: string
  icon: string
}

interface VoicePageClientProps {
  testimonials: Testimonial[]
  stats: Stat[]
}

export default function VoicePageClient({ testimonials, stats }: VoicePageClientProps) {
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
              お客様の声
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ほほ笑みラボで学ばれた生徒さんの体験談をご紹介。<br />
              皆様の成長と笑顔が私たちの何よりの励みです。
            </p>
          </div>

          {/* 統計情報 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-2xl font-cyber font-bold text-neon-green mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* お客様の声 */}
          <div className="space-y-8 mb-16">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-300"
              >
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  {/* プロフィール */}
                  <div className="lg:col-span-1 text-center lg:text-left">
                    <div className="text-6xl mb-4 mx-auto lg:mx-0 w-fit">
                      {testimonial.avatar}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-400 mb-2">{testimonial.age}</p>
                    <div className={`inline-flex px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.color} text-dark-900 text-sm font-semibold mb-2`}>
                      {testimonial.course}
                    </div>
                    <p className="text-xs text-gray-500">{testimonial.period}</p>
                    
                    {/* 評価 */}
                    <div className="flex justify-center lg:justify-start space-x-1 mt-3">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-yellow-400">⭐</span>
                      ))}
                    </div>
                  </div>

                  {/* コメント */}
                  <div className="lg:col-span-3">
                    <blockquote className="text-gray-300 text-lg leading-relaxed mb-6">
                      &quot;{testimonial.comment}&quot;
                    </blockquote>
                    
                    {/* 習得スキル */}
                    <div className="bg-dark-700/50 rounded-lg p-4">
                      <h4 className="text-neon-blue font-semibold mb-2">💡 {testimonial.achievement}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA セクション */}
          <div className="bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 rounded-xl p-8 text-center">
            <h3 className="text-2xl font-cyber font-bold text-white mb-4">
              あなたも一歩踏み出してみませんか？
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              無料体験レッスンを実施中！まずはお気軽にご相談ください。<br />
              あなたのペースに合わせて、丁寧にサポートいたします。
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" size="lg">
                📞 無料体験申し込み
              </Button>
              <Button variant="secondary" size="lg">
                💬 お問い合わせ
              </Button>
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex justify-center gap-6 mt-12">
            <Link href="/services">
              <Button variant="secondary" size="lg">
                ← サービス詳細
              </Button>
            </Link>
            <Link href="/access">
              <Button variant="primary" size="lg">
                アクセス →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </motion.div>
  )
}