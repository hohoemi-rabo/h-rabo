export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  
  return (
    <div>
      <h1>ブログ記事詳細</h1>
      <p>記事のスラッグ: {slug}</p>
      <article>
        <h2>記事タイトル</h2>
        <p>記事の内容がここに表示されます...</p>
        <p>詳細な記事コンテンツ</p>
      </article>
    </div>
  )
}