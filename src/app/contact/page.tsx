import type { Metadata } from 'next'
import ContactPageClient from './ContactPageClient'
import LongDistanceTransition from '@/components/animations/LongDistanceTransition'

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
    description: '営業時間内（平日10:00-18:00）にお気軽にお電話ください。',
    subtext: '※土日は定休日ですが、電話対応は可能です',
    action: 'tel:090-5646-5670',
    color: 'from-neon-blue to-neon-cyan',
    available: true,
  },
  {
    icon: '📧',
    title: 'メールでのお問い合わせ',
    value: 'rabo.hohoemi@gmail.com',
    description: '24時間いつでも受付中。お返事は営業時間内にいたします。',
    subtext: '返信まで1-2営業日お時間をいただく場合があります',
    action: 'mailto:rabo.hohoemi@gmail.com',
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
    <LongDistanceTransition className="border-4 border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.6),0_0_40px_rgba(156,163,175,0.3)]">
      <ContactPageClient contactMethods={contactMethods} inquiryTypes={inquiryTypes} />
    </LongDistanceTransition>
  )
}