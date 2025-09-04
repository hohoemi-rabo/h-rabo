'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import Container from '@/components/ui/Container'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'
import { Starfield } from '@/components/animations/ParticleEffects'

// 3Dコンポーネントを動的インポート（パフォーマンス最適化）
const HeroObject = dynamic(() => import('@/components/3d/HeroObject'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />
})

export default function HeroSection() {

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 多層グラデーション背景 */}
      <div className="absolute inset-0">
        {/* ベースグラデーション */}
        <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
        
        {/* 追加グラデーション層1 - 放射状 */}
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-dark-800/50 to-dark-900 opacity-70" />
        
        {/* 追加グラデーション層2 - 上下 */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-transparent to-dark-900 opacity-60" />
        
        {/* 追加グラデーション層3 - アクセント */}
        <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/5 via-transparent to-neon-purple/5 opacity-30" />
        
        {/* ノイズテクスチャ効果 */}
        <div className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.9' /%3E%3C/filter%3E%3Crect width='60' height='60' filter='url(%23noise)' opacity='0.05'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
          }}
        />
      </div>



      <Container size="xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          {/* 左側：テキストコンテンツ */}
          <div className="text-center lg:text-left space-y-8 sm:space-y-12">
          {/* メインタイトル */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1
              className="font-rajdhani font-bold leading-tight tracking-wide"
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="block text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                  パソコン・スマホ
                </span>
              </span>
              <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl neon-text">
                ほほ笑みラボ
              </span>
            </motion.h1>

            <motion.p
              className="font-futura text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <span className="text-neon-green">ゆっくり、何度でも</span>
              <span className="text-white">教えます！</span>
            </motion.p>

            <motion.p
              className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
            >
              最先端のIT教育を提供するプロフェッショナルな学習環境で、
              <br className="hidden sm:block" />
              あなたのデジタルライフをサポートします
            </motion.p>
          </div>

            {/* CTAボタン */}
            <motion.div
              className="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center lg:justify-start px-4 lg:px-0 max-w-md xs:max-w-none mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <Link href="/contact">
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="text-lg px-8 py-4"
                >
                  お問い合わせ
                </Button>
              </Link>
              <Link href="/services">
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="text-lg px-8 py-4"
                >
                  サービス詳細
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* 右側：3Dオブジェクト */}
          <div className="relative h-[400px] lg:h-[600px] hidden lg:block">
            <Suspense fallback={<div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
            </div>}>
              <HeroObject className="w-full h-full" />
            </Suspense>
          </div>

        </div>

      </Container>



    </section>
  )
}