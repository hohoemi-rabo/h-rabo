'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import Container from '@/components/ui/Container'
import dynamic from 'next/dynamic'
import { Suspense, useState } from 'react'
import TypingText from '@/components/animations/TypingText'
import { ParticleExplosion, Starfield } from '@/components/animations/ParticleEffects'
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations'

// 3Dコンポーネントを動的インポート（パフォーマンス最適化）
const HeroObject = dynamic(() => import('@/components/3d/HeroObject'), {
  ssr: false,
  loading: () => <div className="w-full h-full" />
})

export default function HeroSection() {
  const [showParticles, setShowParticles] = useState(false)

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

      {/* 星空エフェクト */}
      <Starfield count={30} className="opacity-30" />

      {/* サイバーグリッド背景（薄く） */}
      <div className="cyber-grid absolute inset-0 opacity-10" />

      <Container size="xl">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen py-20">
          {/* 左側：テキストコンテンツ */}
          <div className="text-center lg:text-left space-y-8 sm:space-y-12">
          {/* メインタイトル */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1
              className="font-cyber font-bold leading-tight"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              <span className="block text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-2 sm:mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                  パソコン・スマホ
                </span>
              </span>
              <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl neon-text animate-glow">
                <TypingText 
                  text="ほほ笑みラボ" 
                  speed={150}
                  delay={500}
                  onComplete={() => setShowParticles(true)}
                />
              </span>
            </motion.h1>

            <motion.p
              className="font-futura text-lg xs:text-xl sm:text-2xl md:text-3xl font-semibold text-gray-300 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <span className="text-neon-green">ゆっくり、何度でも</span>
              <span className="text-white">教えます！</span>
            </motion.p>

            <motion.p
              className="text-xs xs:text-sm sm:text-base lg:text-lg text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
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
              variants={staggerContainer}
              initial="initial"
              animate="animate"
            >
              <motion.div variants={staggerItem}>
                <Button 
                  variant="primary" 
                  size="lg" 
                  className="animate-pulse hover:animate-none text-lg px-8 py-4"
                >
                  無料体験申し込み
                </Button>
              </motion.div>
              <motion.div variants={staggerItem}>
                <Button 
                  variant="secondary" 
                  size="lg" 
                  className="text-lg px-8 py-4"
                >
                  サービス詳細
                </Button>
              </motion.div>
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

        {/* スクロール指示（グリッドの外に配置） */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: 'easeOut' }}
        >
          <motion.div
            className="flex flex-col items-center space-y-2 text-gray-400"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <span className="text-sm font-futura">SCROLL</span>
            <div className="w-6 h-10 border-2 border-neon-blue/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-neon-blue rounded-full mt-2 animate-bounce" />
            </div>
          </motion.div>
        </motion.div>
      </Container>

      {/* 浮遊する装飾要素 */}
      <motion.div
        className="absolute top-1/4 left-10 w-4 h-4 bg-neon-pink rounded-full opacity-60"
        animate={{
          y: [0, -20, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute top-1/3 right-10 w-3 h-3 bg-neon-green rounded-full opacity-60"
        animate={{
          y: [0, -15, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-neon-cyan rounded-full opacity-60"
        animate={{
          y: [0, -25, 0],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          repeat: Infinity,
          duration: 5,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* パーティクル爆発エフェクト */}
      <ParticleExplosion 
        trigger={showParticles}
        count={30}
        className="z-30"
        onComplete={() => setShowParticles(false)}
      />
    </section>
  )
}