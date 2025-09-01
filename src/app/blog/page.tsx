import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
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

// ダミーデータ（実際にはCMSやAPIから取得）
const blogPosts = [
  {
    id: 1,
    title: 'Windows 11の新機能解説 - 生産性向上のポイント',
    excerpt: 'Windows 11に追加された新機能について、実際の業務で活用できるポイントを分かりやすく解説します。',
    category: 'テクニック',
    date: '2024-12-15',
    tags: ['Windows', 'Microsoft', 'Tips'],
    slug: 'windows-11-new-features',
    readTime: '5分',
    featured: true,
  },
  {
    id: 2,
    title: 'シニア向けスマートフォン活用術 - LINE編',
    excerpt: 'LINEの基本的な使い方から、家族との連絡に便利な機能まで、シニアの方にも分かりやすくご紹介します。',
    category: 'スマートフォン',
    date: '2024-12-10',
    tags: ['LINE', 'スマートフォン', 'シニア'],
    slug: 'senior-smartphone-line',
    readTime: '7分',
    featured: false,
  },
  {
    id: 3,
    title: '年末年始の営業についてお知らせ',
    excerpt: '年末年始の営業スケジュールと、新年からの新コース開講についてお知らせいたします。',
    category: 'お知らせ',
    date: '2024-12-08',
    tags: ['営業時間', 'お知らせ', '年末年始'],
    slug: 'year-end-schedule',
    readTime: '2分',
    featured: false,
  },
  {
    id: 4,
    title: 'セキュリティ対策の基本 - フィッシング詐欺を見抜く方法',
    excerpt: '最近増えているフィッシング詐欺の手口と、その見抜き方、対策方法について詳しく解説します。',
    category: 'セキュリティ',
    date: '2024-12-05',
    tags: ['セキュリティ', 'フィッシング詐欺', '対策'],
    slug: 'phishing-security-guide',
    readTime: '8分',
    featured: true,
  },
  {
    id: 5,
    title: 'Excelで作る家計簿 - 初心者でも簡単！',
    excerpt: 'Excelを使った家計簿の作り方を、初心者の方でも分かりやすく、ステップバイステップで解説します。',
    category: 'Office',
    date: '2024-12-01',
    tags: ['Excel', '家計簿', '初心者'],
    slug: 'excel-household-budget',
    readTime: '10分',
    featured: false,
  },
  {
    id: 6,
    title: 'オンラインレッスン開始のお知らせ',
    excerpt: 'コロナ禍に対応し、オンラインでのレッスンも開始いたします。ご自宅から安全に学習していただけます。',
    category: 'お知らせ',
    date: '2024-11-28',
    tags: ['オンライン', 'レッスン', 'お知らせ'],
    slug: 'online-lesson-start',
    readTime: '3分',
    featured: false,
  },
]

const categories = ['全て', 'テクニック', 'スマートフォン', 'Office', 'セキュリティ', 'お知らせ']

export default function Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Container size="xl">
        <div className="py-20">
          {/* ヘッダー */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mb-6">
              ブログ・お知らせ
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              最新のIT情報、レッスン情報、お知らせをお届けします。<br />
              皆様のIT学習に役立つ情報を発信しています。
            </p>
          </div>

          {/* カテゴリフィルター */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={category === '全て' ? 'primary' : 'secondary'}
                  size="sm"
                  className="hover:scale-105 transition-transform duration-200"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* 注目記事 */}
          <div className="mb-16">
            <h2 className="text-2xl font-cyber font-bold text-white mb-8 text-center">
              📌 注目の記事
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {blogPosts.filter(post => post.featured).map((post) => (
                <article
                  key={post.id}
                  className="group bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-500 hover:scale-[1.02]"
                >
                  {/* サムネイル */}
                  <div className="aspect-video bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-neon-blue/30 rounded-full mx-auto mb-3 flex items-center justify-center">
                        <span className="text-2xl">📱</span>
                      </div>
                      <p className="text-gray-400 text-sm">サムネイル</p>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    {/* メタ情報 */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-xs font-semibold rounded-full">
                        {post.category}
                      </span>
                      <div className="flex items-center gap-4 text-gray-400 text-sm">
                        <span>{post.date}</span>
                        <span>📖 {post.readTime}</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-300 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* タグ */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-dark-700/50 text-gray-400 text-xs rounded border border-white/10"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link href={`/blog/${post.slug}`}>
                      <Button variant="primary" size="sm" className="w-full">
                        続きを読む →
                      </Button>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* 記事一覧 */}
          <div className="mb-16">
            <h2 className="text-2xl font-cyber font-bold text-white mb-8 text-center">
              📝 最新記事
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.filter(post => !post.featured).map((post) => (
                <article
                  key={post.id}
                  className="group bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* 小さなサムネイル */}
                  <div className="aspect-video bg-gradient-to-br from-neon-green/20 to-neon-yellow/20 flex items-center justify-center">
                    <span className="text-3xl">
                      {post.category === 'お知らせ' ? '📢' : 
                       post.category === 'Office' ? '📊' :
                       post.category === 'セキュリティ' ? '🔒' : '💡'}
                    </span>
                  </div>
                  
                  <div className="p-5">
                    {/* メタ情報 */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        post.category === 'お知らせ' ? 'bg-neon-yellow/20 text-neon-yellow' :
                        post.category === 'Office' ? 'bg-neon-green/20 text-neon-green' :
                        post.category === 'セキュリティ' ? 'bg-neon-pink/20 text-neon-pink' :
                        'bg-neon-cyan/20 text-neon-cyan'
                      }`}>
                        {post.category}
                      </span>
                      <span className="text-gray-400 text-xs">{post.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-neon-blue transition-colors duration-300">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs">{post.date}</span>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="secondary" size="sm">
                          読む
                        </Button>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* ページネーション */}
          <div className="flex justify-center gap-2 mb-12">
            <Button variant="secondary" size="md" disabled>
              ← 前へ
            </Button>
            <Button variant="primary" size="md">1</Button>
            <Button variant="secondary" size="md">2</Button>
            <Button variant="secondary" size="md">3</Button>
            <Button variant="secondary" size="md">
              次へ →
            </Button>
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