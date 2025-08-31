import Link from 'next/link'
import Container from '@/components/ui/Container'

const newsItems = [
  {
    id: 1,
    date: '2024-12-01',
    category: 'お知らせ',
    title: '年末年始の営業時間について',
    summary: '年末年始の営業スケジュールをお知らせいたします。12/29-1/3は休業となります。',
    isNew: true
  },
  {
    id: 2,
    date: '2024-11-15',
    category: 'イベント',
    title: '新春特別講座「スマホ写真整理術」開催決定',
    summary: '新年に向けてスマホに溜まった写真を整理する特別講座を開催いたします。',
    isNew: true
  },
  {
    id: 3,
    date: '2024-11-01',
    category: 'サービス',
    title: '新コース「ビデオ通話マスター」開始',
    summary: 'ご家族やお友達とのビデオ通話を快適に楽しむためのコースを新設いたしました。',
    isNew: false
  },
  {
    id: 4,
    date: '2024-10-20',
    category: 'お知らせ',
    title: 'ホームページをリニューアルしました',
    summary: 'より見やすく、使いやすいホームページに生まれ変わりました。',
    isNew: false
  }
]

export default function NewsSection() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <Container>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 sm:mb-12 px-4">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">
              お知らせ
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              最新のお知らせや新しいサービスの情報をお届けします
            </p>
          </div>
          <Link
            href="/blog"
            className="self-start md:self-auto bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold transition-colors inline-block"
          >
            すべて見る
          </Link>
        </div>

        <div className="space-y-6">
          {newsItems.map((item) => (
            <article key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                <div className="flex items-center space-x-4 mb-2 md:mb-0">
                  <time className="text-sm text-gray-500 min-w-0">
                    {new Date(item.date).toLocaleDateString('ja-JP')}
                  </time>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    item.category === 'お知らせ' ? 'bg-blue-100 text-blue-800' :
                    item.category === 'イベント' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {item.category}
                  </span>
                  {item.isNew && (
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-bold">
                      NEW
                    </span>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 hover:text-blue-600 transition-colors">
                  <Link href={`/blog/${item.id}`}>
                    {item.title}
                  </Link>
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.summary}
                </p>
              </div>
              
              <div className="mt-4">
                <Link 
                  href={`/blog/${item.id}`}
                  className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  続きを読む →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  )
}