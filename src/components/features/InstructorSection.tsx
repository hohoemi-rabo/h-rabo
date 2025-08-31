'use client'

import { motion } from 'framer-motion'
import { Button, Icon } from '@/components/ui'
import Container from '@/components/ui/Container'

const skills = [
  { skill: 'パソコン指導', level: 95, icon: 'cpu' },
  { skill: 'プログラミング', level: 90, icon: 'circuit' },
  { skill: '最新技術対応', level: 85, icon: 'database' }
]

const specialties = [
  'パソコン基本操作',
  'スマートフォン活用',
  'インターネット・メール',
  'オフィスソフト',
  '動画編集',
  'トラブル解決'
]

export default function InstructorSection() {
  return (
    <section className="relative py-20 sm:py-24 bg-dark-800 overflow-hidden">
      {/* 背景エフェクト */}
      <div className="cyber-grid absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/10 via-transparent to-neon-blue/10" />

      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center px-4">
          {/* プロフィール画像部分 */}
          <motion.div
            className="relative order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* メインプロフィール画像 */}
            <div className="relative mx-auto max-w-sm">
              <div className="relative">
                {/* サイバー風の枠 */}
                <div className="relative h-80 w-80 mx-auto">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink p-1 animate-glow">
                    <div className="h-full w-full rounded-full bg-dark-900 p-4 flex items-center justify-center overflow-hidden">
                      <span 
                        role="img" 
                        aria-label="講師" 
                        className="text-8xl"
                      >
                        👨‍🏫
                      </span>
                      {/* 実際の画像に置き換える場合 */}
                      {/* <img
                        src="/instructor.jpg"
                        alt="講師プロフィール写真"
                        className="h-full w-full rounded-full object-cover"
                      /> */}
                    </div>
                  </div>
                </div>

                {/* 浮遊するスキルバッジ */}
                <motion.div
                  className="absolute -top-4 -right-4 bg-neon-green/20 border border-neon-green rounded-full px-3 py-1 text-sm font-cyber text-neon-green"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ repeat: Infinity, duration: 3 }}
                >
                  IT Expert
                </motion.div>

                <motion.div
                  className="absolute -bottom-4 -left-4 bg-neon-pink/20 border border-neon-pink rounded-full px-3 py-1 text-sm font-cyber text-neon-pink"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, delay: 1 }}
                >
                  10+ Years
                </motion.div>
              </div>

              {/* 装飾的な要素 */}
              <div className="absolute -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-neon-blue/20 to-transparent opacity-50 rounded-full" />
            </div>
          </motion.div>

          {/* コンテンツ部分 */}
          <motion.div
            className="space-y-8 order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* ヘッダー */}
            <div>
              <motion.h2
                className="font-cyber text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">
                  講師
                </span>
                <span className="neon-text"> プロフィール</span>
              </motion.h2>
              
              <motion.p
                className="font-futura text-lg text-gray-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                最先端のIT技術を分かりやすく教える専門講師
              </motion.p>
            </div>

            {/* 経歴・経験 */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="bg-dark-700/50 rounded-lg p-4 border border-neon-blue/30 hover:border-neon-blue/50 transition-colors">
                <h3 className="font-cyber text-xl font-semibold text-neon-blue mb-2 flex items-center">
                  <Icon name="shield" size="sm" className="mr-2" />
                  経験豊富な指導実績
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  富士通パソコン教室での豊富な指導経験を経て、株式会社SEGAでゲーム開発に従事。
                  10年以上にわたり幅広い年齢層にIT技術を指導してきました。
                </p>
              </div>
              
              <div className="bg-dark-700/50 rounded-lg p-4 border border-neon-purple/30 hover:border-neon-purple/50 transition-colors">
                <h3 className="font-cyber text-xl font-semibold text-neon-purple mb-2 flex items-center">
                  <Icon name="cpu" size="sm" className="mr-2" />
                  指導方針
                </h3>
                <p className="text-gray-300 leading-relaxed">
                  「ゆっくり、何度でも」をモットーに、お一人お一人のペースに合わせた
                  指導を心がけています。分からないことは何度でもお聞きください。
                </p>
              </div>
            </motion.div>

            {/* 専門分野 */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              <h3 className="font-cyber text-xl font-semibold text-neon-green mb-4 flex items-center">
                <Icon name="network" size="sm" className="mr-2" />
                専門分野
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {specialties.map((specialty, index) => (
                  <motion.div
                    key={specialty}
                    className="bg-dark-700/30 rounded-lg px-3 py-2 text-sm text-gray-300 border border-dark-600 hover:border-neon-green/50 transition-colors"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.8 + (index * 0.1) }}
                  >
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-neon-green rounded-full mr-2 animate-pulse" />
                      {specialty}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* スキルレベル */}
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <h3 className="font-cyber text-xl font-semibold text-neon-cyan mb-4 flex items-center">
                <Icon name="circuit" size="sm" className="mr-2" />
                スキルレベル
              </h3>
              {skills.map((item, index) => (
                <div key={item.skill} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-futura text-sm text-gray-300 flex items-center">
                      <Icon name={item.icon as any} size="xs" className="mr-2" />
                      {item.skill}
                    </span>
                    <span className="text-neon-blue text-sm font-semibold">{item.level}%</span>
                  </div>
                  <div className="bg-dark-700 h-2 w-full rounded-full overflow-hidden">
                    <motion.div
                      className="h-2 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-neon"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      transition={{ duration: 1.5, delay: 0.9 + (index * 0.2), ease: 'easeOut' }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>

            {/* CTAボタン */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <Button variant="primary" size="lg" className="animate-pulse hover:animate-none">
                詳しい紹介を見る
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* 装飾エフェクト */}
      <motion.div
        className="absolute top-1/4 left-8 w-2 h-2 bg-neon-cyan rounded-full opacity-60"
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
        className="absolute bottom-1/4 right-8 w-3 h-3 bg-neon-pink rounded-full opacity-60"
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
    </section>
  )
}