import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'アクセス・お問い合わせ',
  description: 'ほほ笑みラボへのアクセス方法とお問い合わせ先をご案内。長野県飯田市で最先端のIT教育を提供しています。',
}

const businessHours = [
  { day: '月曜日', time: '10:00 - 18:00', status: 'open' },
  { day: '火曜日', time: '10:00 - 18:00', status: 'open' },
  { day: '水曜日', time: '定休日', status: 'closed' },
  { day: '木曜日', time: '10:00 - 18:00', status: 'open' },
  { day: '金曜日', time: '10:00 - 18:00', status: 'open' },
  { day: '土曜日', time: '10:00 - 16:00', status: 'open' },
  { day: '日曜日', time: '定休日', status: 'closed' },
]

const accessMethods = [
  {
    method: '🚗 お車でお越しの方',
    description: '駐車場完備（3台分）',
    details: [
      '中央自動車道 飯田ICより約15分',
      '国道153号線沿い、上郷飯沼交差点近く',
      '無料駐車場あり',
    ],
    color: 'from-neon-blue to-neon-cyan',
  },
  {
    method: '🚌 公共交通機関をご利用の方',
    description: 'バス停「飯沼」より徒歩5分',
    details: [
      'JR飯田線「伊那上郷駅」よりバス10分',
      '信南交通バス「飯沼」下車',
      '徒歩約5分',
    ],
    color: 'from-neon-green to-neon-yellow',
  },
]

const contactInfo = [
  {
    icon: '📞',
    label: 'お電話',
    value: '090-5646-5670',
    description: '営業時間内にお気軽にどうぞ',
    action: 'tel:090-5646-5670',
  },
  {
    icon: '📧',
    label: 'メール',
    value: 'info@hohoemi-lab.com',
    description: '24時間受付中',
    action: 'mailto:info@hohoemi-lab.com',
  },
  {
    icon: '📍',
    label: '住所',
    value: '〒395-0002 長野県飯田市上郷飯沼2640-1',
    description: '専用駐車場あり',
    action: null,
  },
]

export default function AccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
              
              <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6">
                <div className="space-y-4">
                  {businessHours.map((schedule, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center py-3 border-b border-white/10 last:border-b-0"
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

          {/* 地図エリア（プレースホルダー） */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-8">
              所在地
            </h2>
            
            <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8 text-center">
              <div className="aspect-video bg-dark-700/50 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <div className="text-6xl mb-4">🗺️</div>
                  <p className="text-white font-semibold mb-2">Google Mapsで確認</p>
                  <p className="text-gray-400">〒395-0002 長野県飯田市上郷飯沼2640-1</p>
                </div>
              </div>
              <Button variant="primary" size="lg">
                📍 Google Mapsで開く
              </Button>
            </div>
          </div>

          {/* CTA セクション */}
          <div className="bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 rounded-xl p-8 text-center mb-12">
            <h3 className="text-2xl font-cyber font-bold text-white mb-4">
              まずはお気軽にご相談ください
            </h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              無料体験レッスンも実施中！<br />
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
            <Link href="/">
              <Button variant="primary" size="lg">
                ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}