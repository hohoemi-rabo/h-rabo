'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ServiceCard from './ServiceCard'

const services = [
  {
    id: 1,
    title: 'シニア向けグループレッスン',
    description: 'ゆっくり、楽しく学べます。同世代の仲間と一緒に基本から丁寧に指導します。',
    price: '2時間 2,000円',
    features: [
      '初心者コース',
      'バラエティコース', 
      'ステップアップコース',
      '週1回開催'
    ],
    icon: 'network'
  },
  {
    id: 2,
    title: 'ビジネスパーソン向け個別レッスン',
    description: '課題解決型のカスタマイズレッスン。あなたの業務に直結するスキルを効率的に習得。',
    price: '2時間 2,000円〜',
    features: [
      '完全個別指導',
      'カスタマイズ内容',
      '実践的なスキル',
      'フレキシブル対応'
    ],
    icon: 'cpu'
  },
  {
    id: 3,
    title: '単発利用サービス',
    description: 'お悩み解決をピンポイントでサポート。特定の問題を素早く解決します。',
    price: '3,000円〜',
    features: [
      '新品PC購入サポート',
      'PINコード忘れ対応',
      'パソコン最適化',
      'スマホ動画編集'
    ],
    icon: 'circuit'
  },
]

export default function ServicesSection() {
  return (
    <section className="relative py-20 sm:py-24 bg-dark-900 overflow-hidden">
      {/* 背景エフェクト */}
      <div className="cyber-grid absolute inset-0 opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-neon-blue/5 to-transparent" />
      
      {/* 装飾的なライン */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />

      <Container>
        {/* セクションヘッダー */}
        <motion.div
          className="text-center mb-16 px-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="font-cyber text-3xl xs:text-4xl sm:text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink">
              サービス
            </span>
            <span className="neon-text block sm:inline"> 紹介</span>
          </motion.h2>
          
          <motion.p
            className="font-futura text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            あなたのニーズに合わせた多様な学習プランをご用意しています
            <br className="hidden sm:block" />
            <span className="text-neon-green">最先端のIT教育で、未来を切り拓きましょう</span>
          </motion.p>

          {/* 装飾的な区切り線 */}
          <motion.div
            className="mt-8 flex justify-center"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="w-24 h-px bg-gradient-to-r from-neon-blue to-neon-purple shadow-neon" />
          </motion.div>
        </motion.div>

        {/* サービスカード */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 px-4">
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              title={service.title}
              description={service.description}
              price={service.price}
              features={service.features}
              icon={service.icon}
              delay={index * 0.2}
            />
          ))}
        </div>

        {/* 底部装飾 */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <p className="font-futura text-gray-400 text-sm">
            ※ 料金は内容により変動する場合があります。詳しくはお問い合わせください。
          </p>
        </motion.div>
      </Container>

      {/* 浮遊装飾要素 */}
      <motion.div
        className="absolute top-20 left-20 w-3 h-3 bg-neon-pink rounded-full opacity-40"
        animate={{
          y: [0, -20, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 4,
          ease: 'easeInOut',
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-2 h-2 bg-neon-cyan rounded-full opacity-40"
        animate={{
          y: [0, -15, 0],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{
          repeat: Infinity,
          duration: 3.5,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </section>
  )
}