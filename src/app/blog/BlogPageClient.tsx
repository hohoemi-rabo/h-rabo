'use client'

import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { motion } from 'framer-motion'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  tags: string[]
  slug: string
  readTime: string
  featured: boolean
}

interface BlogPageClientProps {
  blogPosts: BlogPost[]
  categories: string[]
}

export default function BlogPageClient({ blogPosts, categories }: BlogPageClientProps) {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900"
      initial={{ 
        opacity: 0,
        scale: 0.95
      }}
      animate={{ 
        opacity: 1,
        scale: 1
      }}
      transition={{
        duration: 0.5,
        ease: 'easeOut',
      }}
    >
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
    </motion.div>
  )
}