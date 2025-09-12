'use client'

import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { motion } from 'framer-motion'
import SwipeWrapper from '@/components/layouts/SwipeWrapper'

interface BusinessHour {
  day: string
  time: string
  status: string
}

interface AccessMethod {
  method: string
  description: string
  details: string[]
  color: string
}

interface ContactInfo {
  icon: string
  label: string
  value: string
  description: string
  action: string | null
}

interface AccessPageClientProps {
  businessHours: BusinessHour[]
  accessMethods: AccessMethod[]
  contactInfo: ContactInfo[]
}

export default function AccessPageClient({ 
  businessHours, 
  accessMethods, 
  contactInfo 
}: AccessPageClientProps) {
  return (
    <SwipeWrapper 
      prevPage="/voice" 
      nextPage="/contact"
      currentPageIndex={6}
      totalPages={8}
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
              アクセス・お問い合わせ
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              お気軽にお越しください。<br />
              無料体験レッスンのご相談も随時受け付けています。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* お問い合わせ情報 */}
            <div>
              <h2 className="text-3xl font-cyber font-bold text-white mb-8">
                お問い合わせ
              </h2>
              
              <div className="space-y-6">
                {contactInfo.map((contact, index) => (
                  <div
                    key={index}
                    className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-3xl">{contact.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">
                          {contact.label}
                        </h3>
                        {contact.action ? (
                          <a
                            href={contact.action}
                            className="text-neon-blue hover:text-neon-cyan transition-colors duration-200 font-semibold text-lg block mb-2"
                          >
                            {contact.value}
                          </a>
                        ) : (
                          <p className="text-white font-semibold text-lg mb-2">
                            {contact.value}
                          </p>
                        )}
                        <p className="text-gray-400 text-sm">
                          {contact.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 営業時間 */}
            <div>
              <h2 className="text-3xl font-cyber font-bold text-white mb-8">
                営業時間
              </h2>
              
              <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all duration-300">
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-white/5 last:border-b-0"
                    >
                      <span className="text-white font-semibold">
                        {schedule.day}
                      </span>
                      <span
                        className={`font-bold ${
                          schedule.status === 'open'
                            ? 'text-neon-green'
                            : 'text-gray-400'
                        }`}
                      >
                        {schedule.time}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 p-4 bg-neon-blue/10 rounded-lg">
                  <p className="text-neon-blue font-semibold text-sm">
                    💡 営業時間外でもメールでのお問い合わせは24時間受付中です
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* アクセス方法 */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-12">
              アクセス方法
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {accessMethods.map((access, index) => (
                <div
                  key={index}
                  className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 hover:border-white/20 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold text-white mb-3">
                    {access.method}
                  </h3>
                  <p className="text-gray-300 mb-6">{access.description}</p>
                  
                  <div className="space-y-2">
                    {access.details.map((detail, i) => (
                      <div key={i} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 地図エリア */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-8">
              所在地
            </h2>
            
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-xl p-6">
              <div className="aspect-video rounded-lg overflow-hidden mb-6">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3247.131272669226!2d137.84789097524333!3d35.525753538500076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x601c9a2377337c89%3A0xfa0a289de6b8cfcd!2z44CSMzk1LTAwMDIg6ZW36YeO55yM6aOv55Sw5biC5LiK6YO36aOv5rK877yS77yW77yU77yQ!5e0!3m2!1sja!2sjp!4v1756978677684!5m2!1sja!2sjp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="ほほ笑みラボの所在地"
                />
              </div>
              
              <div className="text-center">
                <p className="text-white font-semibold mb-2">📍 〒395-0002 長野県飯田市上郷飯沼2640-1</p>
                <p className="text-gray-400 mb-4">専用駐車場完備（無料）</p>
                
                <a
                  href="https://www.google.com/maps/search/〒395-0002+長野県飯田市上郷飯沼2640-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="primary" size="lg">
                    📍 Google Mapsで開く
                  </Button>
                </a>
              </div>
            </div>
          </div>

          {/* CTA セクション */}
          <div className="bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 rounded-xl p-8 text-center mb-12">
            <h3 className="text-2xl font-cyber font-bold text-white mb-4">
              まずはお気軽にご相談ください
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              無料相談いつでも受付中！<br />
              あなたのペースに合わせたIT学習をサポートいたします。
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button variant="primary" size="lg">
                📞 今すぐ電話する
              </Button>
              <Button variant="secondary" size="lg">
                📧 メールで相談
              </Button>
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex justify-center gap-6">
            <Link href="/voice">
              <Button variant="secondary" size="lg">
                ← お客様の声
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="primary" size="lg">
                お問い合わせ →
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </motion.div>
    </SwipeWrapper>
  )
}