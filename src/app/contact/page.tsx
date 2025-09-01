import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'お問い合わせ',
  description: 'ほほ笑みラボへのお問い合わせページ。レッスンに関するご相談や質問はお気軽にお問い合わせください。電話：090-5646-5670',
  keywords: ['お問い合わせ', '相談', '質問', '連絡先', '電話番号', 'アクセス'],
  openGraph: {
    title: 'お問い合わせ | ほほ笑みラボ',
    description: 'レッスンに関するご相談や質問はお気軽にお問い合わせください。',
    url: 'https://hohoemi-lab.com/contact',
  },
}

// 連絡方法データ
const contactMethods = [
  {
    icon: '📞',
    title: 'お電話でのお問い合わせ',
    value: '090-5646-5670',
    description: '営業時間内（10:00-18:00）にお気軽にお電話ください。',
    subtext: '※水曜日・日曜日は定休日です',
    action: 'tel:090-5646-5670',
    color: 'from-neon-blue to-neon-cyan',
    available: true,
  },
  {
    icon: '📧',
    title: 'メールでのお問い合わせ',
    value: 'info@hohoemi-lab.com',
    description: '24時間いつでも受付中。お返事は営業時間内にいたします。',
    subtext: '返信まで1-2営業日お時間をいただく場合があります',
    action: 'mailto:info@hohoemi-lab.com',
    color: 'from-neon-green to-neon-yellow',
    available: true,
  },
  {
    icon: '💬',
    title: 'LINE公式アカウント',
    value: '@hohoemi-lab',
    description: '気軽に質問・相談ができます。友達追加してメッセージしてください。',
    subtext: '準備中です（近日公開予定）',
    action: null,
    color: 'from-neon-pink to-neon-purple',
    available: false,
  },
]

// お問い合わせ内容の例
const inquiryTypes = [
  {
    icon: '🎓',
    title: 'レッスンについて',
    examples: ['初心者向けコースの内容', '個別レッスンの相談', '料金についての質問'],
  },
  {
    icon: '💻',
    title: '技術的なご相談',
    examples: ['パソコン購入の相談', 'ソフトの使い方', 'トラブル対応'],
  },
  {
    icon: '🏠',
    title: '出張サービス',
    examples: ['出張レッスンの相談', 'セットアップ代行', 'PINコード忘れ対応'],
  },
  {
    icon: '❓',
    title: 'その他のご質問',
    examples: ['営業時間について', 'アクセス方法', '体験レッスンの申し込み'],
  },
]

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Container size="xl">
        <div className="py-20">
          {/* ヘッダー */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mb-6">
              お問い合わせ
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ご質問・ご相談はお気軽にお問い合わせください。<br />
              「ゆっくり、何度でも」お答えいたします！
            </p>
          </div>

          {/* 連絡方法 */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-12">
              📞 連絡方法
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:border-white/20 ${
                    method.available ? 'hover:scale-[1.02]' : 'opacity-75'
                  }`}
                >
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {method.title}
                  </h3>
                  
                  <div className={`text-lg font-semibold mb-3 bg-gradient-to-r ${method.color} bg-clip-text text-transparent`}>
                    {method.value}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">
                    {method.description}
                  </p>
                  
                  <p className="text-gray-400 text-xs mb-4">
                    {method.subtext}
                  </p>
                  
                  {method.available && method.action ? (
                    <a href={method.action}>
                      <Button variant="primary" size="sm" className="w-full">
                        {method.icon === '📞' ? '電話をかける' : 
                         method.icon === '📧' ? 'メールを送る' : '問い合わせる'}
                      </Button>
                    </a>
                  ) : (
                    <Button variant="secondary" size="sm" className="w-full" disabled>
                      {method.available ? '問い合わせる' : '準備中'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* お問い合わせフォーム */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-12">
              📝 お問い合わせフォーム
            </h2>
            
            <div className="max-w-4xl mx-auto">
              <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <form className="space-y-6">
                  {/* お名前 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        お名前 <span className="text-neon-pink">*</span>
                      </label>
                      <input
                        type="text"
                        className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                        placeholder="山田 太郎"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        フリガナ
                      </label>
                      <input
                        type="text"
                        className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                        placeholder="ヤマダ タロウ"
                      />
                    </div>
                  </div>

                  {/* 連絡先 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        電話番号 <span className="text-neon-pink">*</span>
                      </label>
                      <input
                        type="tel"
                        className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                        placeholder="090-0000-0000"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        メールアドレス <span className="text-neon-pink">*</span>
                      </label>
                      <input
                        type="email"
                        className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                        placeholder="example@email.com"
                        required
                      />
                    </div>
                  </div>

                  {/* お問い合わせ種別 */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      お問い合わせ種別 <span className="text-neon-pink">*</span>
                    </label>
                    <select
                      className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                      required
                    >
                      <option value="">選択してください</option>
                      <option value="lesson">レッスンについて</option>
                      <option value="technical">技術的なご相談</option>
                      <option value="visit">出張サービス</option>
                      <option value="trial">体験レッスン申し込み</option>
                      <option value="other">その他</option>
                    </select>
                  </div>

                  {/* 件名 */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      件名 <span className="text-neon-pink">*</span>
                    </label>
                    <input
                      type="text"
                      className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                      placeholder="お問い合わせ内容の件名をご入力ください"
                      required
                    />
                  </div>

                  {/* お問い合わせ内容 */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      お問い合わせ内容 <span className="text-neon-pink">*</span>
                    </label>
                    <textarea
                      rows={6}
                      className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300 resize-y"
                      placeholder="お問い合わせ内容を詳しくお聞かせください。&#10;&#10;例：&#10;・パソコン初心者ですが、レッスンを受けることは可能でしょうか？&#10;・個別レッスンの料金について教えてください。&#10;・出張サービスの対応エリアを教えてください。"
                      required
                    ></textarea>
                  </div>

                  {/* プライバシーポリシー同意 */}
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      id="privacy"
                      className="mt-1 w-4 h-4 text-neon-blue bg-dark-700 border-white/20 rounded focus:ring-neon-blue focus:ring-2"
                      required
                    />
                    <label htmlFor="privacy" className="text-gray-300 text-sm">
                      <Link href="/privacy" className="text-neon-blue hover:text-neon-cyan underline">
                        プライバシーポリシー
                      </Link>
                      に同意します <span className="text-neon-pink">*</span>
                    </label>
                  </div>

                  {/* 送信ボタン */}
                  <div className="text-center pt-4">
                    <Button variant="primary" size="lg" className="px-12">
                      📤 送信する
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* 注意事項 */}
              <div className="mt-8 bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-6">
                <h3 className="text-neon-blue font-semibold mb-3">📋 ご利用にあたって</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>・お返事まで1-2営業日お時間をいただく場合があります</li>
                  <li>・緊急のお問い合わせは直接お電話（090-5646-5670）にてご連絡ください</li>
                  <li>・営業時間: 月火木金 10:00-18:00、土 10:00-16:00（水日定休）</li>
                  <li>・個人情報は適切に管理し、お問い合わせ対応以外の目的で使用いたしません</li>
                </ul>
              </div>
            </div>
          </div>

          {/* お問い合わせ内容の例 */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-12">
              💬 こんなご質問をお受けしています
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {inquiryTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-white/20 transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{type.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    {type.title}
                  </h3>
                  <ul className="space-y-2">
                    {type.examples.map((example, i) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-1 h-1 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/faq">
              <Button variant="secondary" size="lg">
                ❓ よくある質問
              </Button>
            </Link>
            <Link href="/">
              <Button variant="primary" size="lg">
                🏠 ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}