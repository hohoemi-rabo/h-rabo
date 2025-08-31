import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'プライバシーポリシー',
  description: 'ほほ笑みラボのプライバシーポリシー。個人情報の取り扱いに関する方針について詳しくご説明いたします。',
  keywords: ['プライバシーポリシー', '個人情報保護', 'データ保護', '情報管理'],
  openGraph: {
    title: 'プライバシーポリシー | ほほ笑みラボ',
    description: '個人情報の取り扱いに関する方針について詳しくご説明いたします。',
    url: 'https://hohoemi-lab.com/privacy',
  },
  robots: {
    index: false, // プライバシーポリシーは検索結果に表示しない
    follow: true,
  },
}

export default function Privacy() {
  return (
    <div>
      <h1>プライバシーポリシー</h1>
      <p>パソコン・スマホ ほほ笑みラボにおける個人情報保護方針</p>
      <section>
        <h2>1. 個人情報の収集について</h2>
        <p>当教室では、お客様の個人情報を適切に収集・管理いたします。</p>
      </section>
      <section>
        <h2>2. 個人情報の利用目的</h2>
        <p>収集した個人情報は、サービス提供のためにのみ利用いたします。</p>
      </section>
      <section>
        <h2>3. 個人情報の第三者提供</h2>
        <p>お客様の同意なく第三者に個人情報を提供することはありません。</p>
      </section>
      <section>
        <h2>4. お問い合わせ</h2>
        <p>プライバシーポリシーに関するお問い合わせは、お問い合わせページよりご連絡ください。</p>
      </section>
    </div>
  )
}