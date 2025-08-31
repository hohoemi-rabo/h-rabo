'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui'
import Container from '@/components/ui/Container'

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

      {/* サイバーグリッド */}
      <div className="cyber-grid absolute inset-0 opacity-30" />

      {/* 装飾的なライトエフェクト */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-gradient-radial from-neon-blue/10 via-transparent to-transparent opacity-50" />
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-gradient-radial from-neon-purple/10 via-transparent to-transparent opacity-50" />
      </div>

      {/* パーティクル効果コンテナ（将来のThree.js用） */}
      <div className="absolute inset-0" id="particles-container" />

      <Container>
        <div className="relative z-10 text-center space-y-8 sm:space-y-12">
          {/* メインタイトル */}
          <div className="space-y-4 sm:space-y-6">
            <motion.h1
              className="font-cyber font-bold leading-tight"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <span className="block text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl mb-2 sm:mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
                  パソコン・スマホ
                </span>
              </span>
              <span className="block text-5xl xs:text-6xl sm:text-7xl md:text-8xl lg:text-9xl neon-text animate-glow">
                ほほ笑みラボ
              </span>
            </motion.h1>

            <motion.p
              className="font-futura text-xl xs:text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-300 px-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            >
              <span className="text-neon-green">ゆっくり、何度でも</span>
              <span className="text-white">教えます！</span>
            </motion.p>

            <motion.p
              className="text-base xs:text-lg sm:text-xl lg:text-2xl text-gray-400 max-w-3xl mx-auto px-4 leading-relaxed"
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
            className="flex flex-col xs:flex-row gap-4 sm:gap-6 justify-center px-4 max-w-md xs:max-w-none mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: 'easeOut' }}
          >
            <Button 
              variant="primary" 
              size="lg" 
              className="animate-pulse hover:animate-none text-lg px-8 py-4"
            >
              無料体験申し込み
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="text-lg px-8 py-4"
            >
              サービス詳細
            </Button>
          </motion.div>

          {/* スクロール指示 */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
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
        </div>
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
    </section>
  )
}