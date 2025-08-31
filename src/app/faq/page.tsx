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

export default function FAQ() {
  return (
    <div>
      <h1>よくある質問</h1>
      <p>お客様からよくいただくご質問にお答えします</p>
      <div>
        <div>
          <h3>Q: レッスンの料金はいくらですか？</h3>
          <p>A: グループレッスンは2時間2,000円、個別レッスンは2時間2,000円〜（内容により変動）です。</p>
        </div>
        <div>
          <h3>Q: 初心者でも大丈夫ですか？</h3>
          <p>A: はい、初心者向けコースもご用意しております。ゆっくり、何度でもお教えします。</p>
        </div>
        <div>
          <h3>Q: 出張サービスはありますか？</h3>
          <p>A: はい、PINコード忘れ対応などで出張サービスも行っております。</p>
        </div>
      </div>
    </div>
  )
}