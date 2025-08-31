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

export default function Contact() {
  return (
    <div>
      <h1>お問い合わせ</h1>
      <p>ご質問・ご相談はお気軽にお問い合わせください</p>
      <div>
        <h2>連絡先情報</h2>
        <p>電話: 090-5646-5670</p>
        <p>所在地: 〒395-0002 長野県飯田市上郷飯沼2640-1</p>
      </div>
      <div>
        <h2>お問い合わせフォーム</h2>
        <p>こちらに後でフォームを実装します</p>
      </div>
    </div>
  )
}