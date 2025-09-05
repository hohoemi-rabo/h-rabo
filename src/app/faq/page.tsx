import type { Metadata } from 'next'
import FaqPageClient from './FaqPageClient'
import LongDistanceTransition from '@/components/animations/LongDistanceTransition'

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
        answer: '料金については個別にご相談させていただいております。お客様のご要望に応じて最適なプランをご提案いたします。',
        details: [],
        contactLink: true
      },
      {
        id: 2,
        question: '月謝制ですか？それとも都度払いですか？',
        answer: 'お支払い方法についても、お客様のご都合に合わせて柔軟に対応いたします。詳しくはお問い合わせください。',
        details: [],
        contactLink: true
      },
      {
        id: 3,
        question: 'キャンセル料はかかりますか？',
        answer: 'かかりません。急な予定変更でも安心してご連絡ください。',
        details: [
          'キャンセル料は一切いただきません',
          '当日でも遠慮なくご連絡ください',
          '振替レッスンも可能です',
        ]
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
        answer: 'もちろん大丈夫です！あなたのレベルに合わせたカリキュラムを組ませていただきます。詳しくはお問い合わせください。',
        details: [],
        contactLink: true
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
        answer: 'はい、かなり広い専用駐車場を無料でご用意しております。複数台でお越しいただいても大丈夫です。',
        details: [
          '専用駐車場完備（無料）',
          '広いスペースで駐車しやすい',
          '複数台での来場も可能',
          '大型車でも安心して駐車できます',
        ]
      },
      {
        id: 9,
        question: '営業時間を教えてください',
        answer: '平日10:00-18:00で営業しております。土日は定休日ですが、状況によっては対応させていただきます。',
        details: [
          '月曜日: 10:00-18:00',
          '火曜日: 10:00-18:00',
          '水曜日: 10:00-18:00',
          '木曜日: 10:00-18:00',
          '金曜日: 10:00-18:00',
          '土曜日: 定休日（状況により対応可能）',
          '日曜日: 定休日（状況により対応可能）',
          '電話対応は土日も可能です',
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
        question: 'ホームページは作れますか？',
        answer: 'はい、高品質なホームページを制作いたします。個人事業主様から企業様まで、目的に応じたプロフェッショナルなWebサイトをお作りします。',
        details: [
          '最新技術を使った高品質なデザイン',
          'スマートフォン対応（レスポンシブデザイン）',
          'SEO対策で検索上位表示をサポート',
          '更新・保守サポートも充実',
          '個人事業主から企業まで幅広く対応',
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
    <LongDistanceTransition className="border-4 border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.6),0_0_40px_rgba(156,163,175,0.3)]">
      <FaqPageClient faqCategories={faqCategories} />
    </LongDistanceTransition>
  )
}