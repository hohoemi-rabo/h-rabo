'use client'

import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function InstructorPageClient() {
  return (
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
                <div className="aspect-square bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 rounded-xl flex items-center justify-center border border-white/10">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-neon-blue/30 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-3xl">👨‍🏫</span>
                    </div>
                    <p className="text-gray-400">講師画像</p>
                  </div>
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
                  田中 太郎
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

                {/* 資格・経歴 */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-neon-blue">資格・経歴</h3>
                  <ul className="space-y-2 text-gray-300">
                    <li>・Microsoft認定トレーナー</li>
                    <li>・情報処理技術者試験合格</li>
                    <li>・IT企業での実務経験15年</li>
                    <li>・パソコン教室指導歴8年</li>
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
                  'ビジネス向けIT',
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
            </motion.div>
          </motion.div>

          {/* ナビゲーション */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex justify-center gap-6 mt-12"
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
  )
}