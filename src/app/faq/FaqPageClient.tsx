'use client'

import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SwipeWrapper from '@/components/layouts/SwipeWrapper'

interface FaqItem {
  id: number
  question: string
  answer: string
  details: string[]
  contactLink?: boolean
}

interface FaqCategory {
  category: string
  icon: string
  color: string
  questions: FaqItem[]
}

interface FaqPageClientProps {
  faqCategories: FaqCategory[]
}

export default function FaqPageClient({ faqCategories }: FaqPageClientProps) {
  return (
    <SwipeWrapper 
      prevPage="/services" 
      nextPage="/voice"
      currentPageIndex={3}
      totalPages={7}
    >
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
              よくある質問
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              お客様からよくいただくご質問にお答えします。<br />
              こちらにない質問がございましたら、お気軽にお問い合わせください。
            </p>
          </div>

          {/* FAQ セクション */}
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="mb-16">
                {/* カテゴリータイトル */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r ${category.color} bg-opacity-20 border border-white/20 mb-4`}>
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <h2 className="text-xl font-cyber font-bold text-white">
                      {category.category.replace(/^[^\s]+ /, '')}
                    </h2>
                  </div>
                </div>

                {/* 質問一覧 */}
                <div className="space-y-6">
                  {category.questions.map((faq) => (
                    <details
                      key={faq.id}
                      className="group bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300"
                    >
                      <summary className="flex items-center justify-between p-6 cursor-pointer hover:bg-white/5 transition-colors duration-200">
                        <div className="flex items-start space-x-4 flex-1">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-1`}>
                            Q
                          </div>
                          <h3 className="text-lg font-semibold text-white group-hover:text-neon-blue transition-colors duration-300 flex-1">
                            {faq.question}
                          </h3>
                        </div>
                        <div className="ml-4 transform group-open:rotate-180 transition-transform duration-300">
                          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </summary>
                      
                      <div className="px-6 pb-6">
                        <div className="flex items-start space-x-4">
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                            A
                          </div>
                          <div className="flex-1">
                            <p className="text-gray-300 mb-4 leading-relaxed">
                              {faq.answer}
                            </p>
                            
                            {faq.details && faq.details.length > 0 && (
                              <div className="bg-dark-700/50 rounded-lg p-4 border border-white/10">
                                <h4 className="text-neon-blue font-semibold mb-3 text-sm">📋 詳細情報</h4>
                                <ul className="space-y-2">
                                  {faq.details.map((detail, index) => (
                                    <li key={index} className="flex items-start space-x-2 text-gray-300 text-sm">
                                      <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                                      <span>{detail}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* お問い合わせCTA */}
          <div className="bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 rounded-xl p-8 text-center mb-12 border border-white/10 mt-16">
            <div className="text-4xl mb-4">❓</div>
            <h3 className="text-2xl font-cyber font-bold text-white mb-4">
              他にもご質問がございますか？
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              こちらに掲載されていない質問や、詳しくお聞きしたいことがございましたら、<br />
              お電話またはメールでお気軽にお問い合わせください。
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" size="lg">
                📞 電話で相談する
              </Button>
              <Link href="/contact">
                <Button variant="secondary" size="lg">
                  📧 メールで問い合わせ
                </Button>
              </Link>
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex justify-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                ← ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </motion.div>
    </SwipeWrapper>
  )
}