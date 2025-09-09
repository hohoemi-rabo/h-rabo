'use client'

import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import SwipeWrapper from '@/components/layouts/SwipeWrapper'

export default function InstructorPageClient() {
  return (
    <SwipeWrapper 
      prevPage="/" 
      nextPage="/services"
      currentPageIndex={1}
      totalPages={7}
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ 
          duration: 0.5, 
          ease: 'easeOut' 
        }}
        className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      >
      <Container size="lg">
        <div className="py-20">
          {/* ヘッダー */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl lg:text-6xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mb-6">
              講師紹介
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              豊富な経験を持つプロフェッショナルが、<br />
              皆様のIT学習をサポートいたします
            </p>
          </motion.div>

          {/* 講師カード */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 lg:p-12 max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* 講師画像エリア */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="relative"
              >
                <div className="relative aspect-square bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl overflow-hidden border border-white/10">
                  <Image
                    src="/images/instructor.png"
                    alt="講師の写真"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </motion.div>

              {/* 講師情報 */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="space-y-6"
              >
                <h2 className="text-3xl font-cyber font-bold text-white">
                  加藤 昌幸
                </h2>
                <p className="text-neon-green text-lg font-semibold">
                  代表講師・IT専門家
                </p>
                
                <div className="space-y-4 text-gray-300">
                  <p>
                    IT業界で15年以上の豊富な経験を持ち、シニアの方から若手ビジネスパーソンまで、
                    幅広い層への指導実績があります。
                  </p>
                  <p>
                    「ゆっくり、何度でも」をモットーに、一人ひとりのペースに合わせた
                    丁寧な指導を心がけています。
                  </p>
                </div>

                {/* 経歴 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-neon-blue">経歴</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>・株式会社SEGAにてゲーム開発に従事</li>
                    <li>・株式会社リコー本社での業務経験</li>
                    <li>・富士通パソコン教室での指導経験</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* 専門分野 */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-12 pt-8 border-t border-white/10"
            >
              <h3 className="text-2xl font-cyber font-bold text-center text-white mb-8">
                専門分野
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  'Windows基本操作',
                  'スマートフォン活用',
                  'インターネット利用',
                  '職場のIT活用',
                ].map((skill, index) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.4 }}
                    className="bg-dark-700/50 border border-neon-blue/30 rounded-lg p-4 text-center hover:border-neon-blue/60 transition-colors"
                  >
                    <span className="text-white font-semibold">{skill}</span>
                  </motion.div>
                ))}
              </div>
              
              {/* 技術的な依頼ボタン - 特別スタイル */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="flex justify-center mt-12"
              >
                <Link href="https://masa-olive.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: '0 0 30px rgba(0, 212, 255, 0.5)'
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="relative group"
                  >
                    <div className="absolute -inset-1 bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                    <div className="relative px-8 py-4 bg-dark-800 border border-neon-blue/50 rounded-lg font-cyber text-lg font-bold text-white hover:bg-dark-700 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <span className="text-neon-green">⚡</span>
                        <span>技術的な依頼はこちら</span>
                        <span className="text-neon-pink">→</span>
                      </div>
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-12"
          >
            <Link href="/">
              <Button variant="secondary" size="lg">
                ← ホームに戻る
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="primary" size="lg">
                サービス詳細 →
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>
    </motion.div>
    </SwipeWrapper>
  )
}