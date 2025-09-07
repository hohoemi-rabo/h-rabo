'use client'

import { motion } from 'framer-motion'
import Container from '@/components/ui/Container'
import ContactItem from '@/components/ui/ContactItem'
import FooterLink from '@/components/ui/FooterLink'
import SocialIcon from '@/components/ui/SocialIcon'
import { Icon } from '@/components/ui'

const serviceLinks = [
  'シニア向けレッスン',
  'ビジネスパーソン向け',
  '単発利用サービス',
  '出張サポート',
]

const siteLinks = [
  { text: '講師紹介', href: '/instructor' },
  { text: 'Instagram', href: '/instagram' },
  { text: 'よくある質問', href: '/faq' },
  { text: 'お問い合わせ', href: '/contact' },
]

export default function Footer() {
  return (
    <footer className="relative bg-dark-900 border-t border-neon-blue/30 overflow-hidden">
      {/* 背景エフェクト */}
      <div className="cyber-grid absolute inset-0 opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-800 to-dark-900" />
      
      {/* 上部グラデーションライン */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-70" />

      <Container>
        <div className="relative py-12 lg:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* 会社情報 */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div>
                <motion.h3
                  className="font-cyber text-2xl font-bold neon-text mb-3"
                  whileHover={{ 
                    textShadow: '0 0 20px #00d4ff',
                    transition: { duration: 0.3 }
                  }}
                >
                  ほほ笑みラボ
                </motion.h3>
                <p className="font-futura text-sm text-gray-300 leading-relaxed">
                  ゆっくり、何度でも教えます！
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="text-neon-blue">
                    <Icon name="location" size="sm" glowing />
                  </div>
                  <div className="font-futura text-sm text-gray-300 leading-relaxed">
                    <div>〒395-0002</div>
                    <div>長野県飯田市上郷飯沼2640-1</div>
                  </div>
                </div>
                <ContactItem 
                  icon="phone" 
                  text="090-5646-5670" 
                />
                <div className="flex items-start space-x-3">
                  <div className="text-neon-blue">
                    <Icon name="email" size="sm" glowing />
                  </div>
                  <motion.a 
                    href="/contact"
                    className="font-futura text-sm text-gray-300 leading-relaxed hover:text-neon-blue transition-colors cursor-pointer"
                    whileHover={{ x: 5 }}
                  >
                    お問い合わせは随時対応
                  </motion.a>
                </div>
              </div>
            </motion.div>

            {/* サービス */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="font-cyber text-neon-purple text-lg font-semibold">
                サービス
              </h3>
              <ul className="space-y-3">
                {serviceLinks.map((item, index) => (
                  <motion.li 
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                  >
                    <FooterLink text={item} href="/services" />
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* サイト情報 */}
            <motion.div 
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="font-cyber text-neon-green text-lg font-semibold">
                サイト情報
              </h3>
              <ul className="space-y-3">
                {siteLinks.map((item, index) => (
                  <motion.li 
                    key={item.text}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + (index * 0.1) }}
                  >
                    <FooterLink text={item.text} href={item.href} />
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* 外部リンク・SNS */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h3 className="font-cyber text-neon-pink text-lg font-semibold">
                つながる
              </h3>

              {/* ソーシャルアイコン */}
              <div className="flex space-x-4">
                <SocialIcon 
                  icon="instagram" 
                  href="https://www.instagram.com/hohoemi.rabo/" 
                  color="neon-pink"
                  label="Instagram" 
                />
                <SocialIcon 
                  icon="facebook" 
                  href="https://www.facebook.com/hohoemi.rabo" 
                  color="neon-blue"
                  label="Facebook" 
                />
              </div>

              <div className="space-y-3">
                <FooterLink 
                  text="講師ポートフォリオ" 
                  href="https://masa-olive.vercel.app/" 
                  external 
                />
                <div className="bg-dark-700/30 rounded-lg p-3 border border-dark-600">
                  <p className="font-futura text-xs text-gray-400">
                    営業時間: 平日 10:00-18:00
                    <br />
                    <span className="text-neon-blue">土日はお休み（電話対応可能！）</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* 下部コピーライト */}
        <motion.div 
          className="relative border-t border-dark-700 py-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <p className="font-futura text-sm text-gray-400">
              &copy; {new Date().getFullYear()} パソコン・スマホ ほほ笑みラボ. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <FooterLink
                text="プライバシーポリシー"
                href="/privacy"
                className="text-xs hover:text-neon-blue"
              />
              <motion.div
                className="text-xs text-gray-500"
                whileHover={{ color: '#00d4ff' }}
              >
                Made with 💙 and ⚡
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Container>

      {/* 装飾エフェクト */}
      <motion.div
        className="absolute bottom-10 left-10 w-2 h-2 bg-neon-cyan rounded-full opacity-60"
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
        className="absolute top-20 right-10 w-1 h-1 bg-neon-pink rounded-full opacity-60"
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

      {/* 下部グラデーションライン */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple to-transparent opacity-50" />
    </footer>
  )
}