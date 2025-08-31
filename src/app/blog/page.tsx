import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ブログ・お知らせ',
  description: 'ほほ笑みラボのブログ・お知らせ一覧。最新のIT情報、レッスン情報、お知らせをお届けします。',
  keywords: ['ブログ', 'お知らせ', 'IT情報', '新着情報', 'レッスン情報'],
  openGraph: {
    title: 'ブログ・お知らせ | ほほ笑みラボ',
    description: '最新のIT情報、レッスン情報、お知らせをお届けします。',
    url: 'https://hohoemi-lab.com/blog',
  },
}

export default function Blog() {
  return (
    <div>
      <h1>ブログ・お知らせ</h1>
      <p>最新のIT情報やお知らせをお届けします</p>
      <div>
        <article>
          <h2>記事タイトル1</h2>
          <p>記事の概要がここに表示されます...</p>
        </article>
        <article>
          <h2>記事タイトル2</h2>
          <p>記事の概要がここに表示されます...</p>
        </article>
        <article>
          <h2>記事タイトル3</h2>
          <p>記事の概要がここに表示されます...</p>
        </article>
      </div>
    </div>
  )
}