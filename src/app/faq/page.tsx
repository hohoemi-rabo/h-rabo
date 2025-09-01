import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'よくある質問',
  description: 'ほほ笑みラボのよくある質問。レッスンの料金、初心者の対応、出張サービスなど、お客様からよくいただくご質問にお答えします。',
  keywords: ['よくある質問', 'FAQ', '料金', '初心者', 'レッスン', 'サポート'],
  openGraph: {
    title: 'よくある質問 | ほほ笑みラボ',
    description: 'お客様からよくいただくご質問にお答えします。レッスンに関する疑問を解決いたします。',
    url: 'https://hohoemi-lab.com/faq',
  },
}

// FAQ データ
const faqCategories = [
  {
    category: '💰 料金・コースについて',
    icon: '💰',
    color: 'from-neon-green to-neon-yellow',
    questions: [
      {
        id: 1,
        question: 'レッスンの料金はいくらですか？',
        answer: 'グループレッスンは2時間2,000円、個別レッスンは2時間2,000円〜（内容により変動）です。追加料金は一切ございません。',
        details: [
          'グループレッスン: 週1回、2時間2,000円',
          '個別レッスン: 2時間2,000円〜（カスタマイズ内容により変動）',
          '新品PC購入サポート: 5,000円',
          'PINコード忘れ対応: 5,000円（出張込み）',
          'パソコン最適化: 5,000円',
          'スマホ動画編集: 3,000円',
        ]
      },
      {
        id: 2,
        question: '月謝制ですか？それとも都度払いですか？',
        answer: '基本的には都度払い制です。継続される場合は月謝制も選択可能で、より お得にご利用いただけます。',
        details: [
          '都度払い: レッスンごとのお支払い',
          '月謝制: 月4回コース 7,500円（通常8,000円）',
          '体験レッスン: 初回無料',
        ]
      },
      {
        id: 3,
        question: 'キャンセル料はかかりますか？',
        answer: '前日までのキャンセルは無料です。当日キャンセルは50％、無断キャンセルは100％のキャンセル料をいただきます。',
        details: []
      },
    ]
  },
  {
    category: '👨‍🏫 レッスン内容について',
    icon: '👨‍🏫',
    color: 'from-neon-blue to-neon-purple',
    questions: [
      {
        id: 4,
        question: '初心者でも大丈夫ですか？',
        answer: 'はい、全く問題ありません。「ゆっくり、何度でも」をモットーに、お一人お一人のペースに合わせて丁寧に指導いたします。',
        details: [
          '基本的なマウス操作から始められます',
          '専用テキストもご用意しております',
          '同じ内容を何度でもお教えします',
          '年齢制限はございません',
        ]
      },
      {
        id: 5,
        question: 'どんなことを教えてもらえますか？',
        answer: 'Windows基本操作、スマートフォン活用、インターネット利用、Office系ソフト、セキュリティ対策まで幅広く対応しています。',
        details: [
          'Windows基本操作・設定',
          'スマートフォン基本操作（iPhone・Android）',
          'LINE・メール・インターネット',
          'Word・Excel・PowerPoint',
          'セキュリティ対策・ウイルス対策',
          'オンラインショッピング・バンキング',
          'デジタルカメラ・写真整理',
          'その他、お困りのことは何でもご相談ください',
        ]
      },
      {
        id: 6,
        question: '持参するものはありますか？',
        answer: '特にございません。パソコンもスマートフォンもこちらでご用意しております。お気軽に手ぶらでお越しください。',
        details: [
          'パソコン・スマートフォンは教室にご用意',
          '筆記用具もご用意しております',
          'ご自身の機器をお持ちいただくことも可能',
        ]
      },
    ]
  },
  {
    category: '🏠 教室・サービスについて',
    icon: '🏠',
    color: 'from-neon-pink to-neon-cyan',
    questions: [
      {
        id: 7,
        question: '出張サービスはありますか？',
        answer: 'はい、ございます。PINコード忘れ対応や、ご自宅でのサポートが必要な場合は出張いたします。',
        details: [
          '出張対応エリア: 飯田市・下伊那郡',
          'PINコード忘れ対応: 5,000円（出張費込み）',
          'パソコン設定・トラブル対応',
          'ご自宅でのマンツーマンレッスン',
        ]
      },
      {
        id: 8,
        question: '駐車場はありますか？',
        answer: 'はい、専用駐車場を3台分ご用意しております。無料でご利用いただけます。',
        details: [
          '専用駐車場: 3台分',
          '無料でご利用可能',
          '大型車でも駐車可能',
        ]
      },
      {
        id: 9,
        question: '営業時間を教えてください',
        answer: '月・火・木・金は10:00-18:00、土曜日は10:00-16:00です。水曜日・日曜日は定休日です。',
        details: [
          '月曜日: 10:00-18:00',
          '火曜日: 10:00-18:00',
          '水曜日: 定休日',
          '木曜日: 10:00-18:00',
          '金曜日: 10:00-18:00',
          '土曜日: 10:00-16:00',
          '日曜日: 定休日',
        ]
      },
    ]
  },
  {
    category: '📱 技術的なご質問',
    icon: '📱',
    color: 'from-neon-purple to-neon-pink',
    questions: [
      {
        id: 10,
        question: 'オンラインレッスンも可能ですか？',
        answer: 'はい、Zoom等を使ったオンラインレッスンも承っております。遠方の方やご都合に合わせてご利用ください。',
        details: [
          'Zoom・Skype・Google Meet対応',
          '画面共有による丁寧な指導',
          '録画機能で復習も可能',
          '機器設定から丁寧にサポート',
        ]
      },
      {
        id: 11,
        question: 'パソコンの購入相談もできますか？',
        answer: 'もちろんです。用途に応じた最適なパソコン選びから、購入サポート、初期設定まで一貫してサポートいたします。',
        details: [
          '用途に応じたパソコン選び',
          '購入同行サービス（5,000円）',
          '初期設定・ソフトインストール',
          'データ移行サポート',
        ]
      },
      {
        id: 12,
        question: 'スマートフォンの機種変更サポートもありますか？',
        answer: 'はい、機種変更に伴うデータ移行、アプリの設定、LINEの引き継ぎなど、きめ細かくサポートいたします。',
        details: [
          '電話帳・写真のデータ移行',
          'LINEアカウント引き継ぎ',
          'アプリの再設定',
          '新機種の基本操作説明',
        ]
      },
    ]
  },
]

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
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
          <div className="bg-gradient-to-r from-neon-blue/10 via-neon-purple/10 to-neon-pink/10 rounded-xl p-8 text-center mb-12 border border-white/10">
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
    </div>
  )
}