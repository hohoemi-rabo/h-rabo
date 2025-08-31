# 018: ブログシステム実装

## 概要

お知らせやブログ投稿の管理・表示機能を実装する

## 優先度

High

## 前提条件

- 002: ページ構造とルーティング設定が完了していること

## Todoリスト

- [ ] データ構造設計
  - [ ] ブログポスト型定義
  - [ ] カテゴリー管理
  - [ ] タグ機能
  - [ ] 公開状態管理
- [ ] ブログ投稿の表示機能
  - [ ] 記事一覧ページ
  - [ ] 記事詳細ページ
  - [ ] カテゴリー別表示
  - [ ] 検索機能
- [ ] 管理画面の実装
  - [ ] 投稿作成・編集画面
  - [ ] Markdownエディター
  - [ ] 画像アップロード機能
  - [ ] プレビュー機能
- [ ] API Routes実装
  - [ ] 投稿CRUD操作
  - [ ] 画像アップロード
  - [ ] 公開・非公開管理
- [ ] SEO対応
  - [ ] メタデータ生成
  - [ ] OGP設定
  - [ ] サイトマップ生成
- [ ] パフォーマンス最適化
  - [ ] 静的生成活用
  - [ ] 画像最適化
  - [ ] キャッシング戦略

## 実装詳細

### データ型定義

```typescript
// types/blog.ts
export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  coverImage?: string
  author: string
  publishedAt: Date
  updatedAt: Date
  status: 'draft' | 'published'
  category: BlogCategory
  tags: string[]
  seo: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: string
  }
}

export interface BlogCategory {
  id: string
  name: string
  slug: string
  description?: string
  color: string
}

// サンプルカテゴリー
export const blogCategories: BlogCategory[] = [
  {
    id: '1',
    name: 'お知らせ',
    slug: 'news',
    description: '教室からの重要なお知らせ',
    color: '#00d4ff',
  },
  {
    id: '2',
    name: 'パソコン講座',
    slug: 'pc-lessons',
    description: 'パソコン関連の情報',
    color: '#8b5cf6',
  },
  {
    id: '3',
    name: 'スマホ活用',
    slug: 'smartphone',
    description: 'スマートフォンの活用方法',
    color: '#ff0080',
  },
  {
    id: '4',
    name: '最新技術',
    slug: 'tech',
    description: 'IT技術の最新情報',
    color: '#00ff88',
  },
]
```

### ブログ記事一覧ページ

```tsx
// app/blog/page.tsx
import { BlogPostCard, CategoryFilter, SearchBox } from '@/components/blog'
import { getPaginatedPosts, getCategories } from '@/lib/blog'
import { Suspense } from 'react'

interface BlogPageProps {
  searchParams: {
    page?: string
    category?: string
    search?: string
  }
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1
  const category = searchParams.category
  const search = searchParams.search

  const { posts, totalPages, currentPage } = await getPaginatedPosts({
    page,
    category,
    search,
    limit: 9,
  })

  const categories = await getCategories()

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-cyber neon-text mb-4 text-4xl font-bold">ブログ・お知らせ</h1>
        <p className="font-futura text-gray-300">
          最新の情報やパソコン・スマホの活用法をお届けします
        </p>
      </div>

      {/* 検索・フィルター */}
      <div className="mb-12 flex flex-col gap-6 md:flex-row">
        <div className="flex-1">
          <SearchBox defaultValue={search} />
        </div>
        <div className="md:w-80">
          <CategoryFilter categories={categories} selectedCategory={category} />
        </div>
      </div>

      {/* 記事一覧 */}
      <Suspense fallback={<BlogPostsSkeleton />}>
        <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.id} post={post} />
          ))}
        </div>
      </Suspense>

      {/* ペジネーション */}
      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} searchParams={searchParams} />
      )}
    </div>
  )
}
```

### ブログ記事詳細ページ

```tsx
// app/blog/[slug]/page.tsx
import { getPostBySlug, getRelatedPosts } from '@/lib/blog'
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer'
import { ShareButtons } from '@/components/blog/ShareButtons'
import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import Image from 'next/image'

interface BlogPostPageProps {
  params: { slug: string }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Page Not Found',
    }
  }

  return {
    title: post.seo.metaTitle || post.title,
    description: post.seo.metaDescription || post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: post.seo.ogImage ? [post.seo.ogImage] : undefined,
      type: 'article',
      publishedTime: post.publishedAt.toISOString(),
    },
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = await getRelatedPosts(post.id, 3)

  return (
    <article className="container mx-auto max-w-4xl px-6 py-12">
      {/* ヘッダー */}
      <header className="mb-12">
        {post.coverImage && (
          <div className="relative mb-8 aspect-video overflow-hidden rounded-lg">
            <Image src={post.coverImage} alt={post.title} fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
        )}

        <div className="text-center">
          <div className="mb-6 flex items-center justify-center gap-4">
            <span
              className="rounded-full px-3 py-1 text-sm font-medium"
              style={{
                backgroundColor: `${post.category.color}20`,
                color: post.category.color,
                border: `1px solid ${post.category.color}`,
              }}
            >
              {post.category.name}
            </span>
            <time className="font-futura text-sm text-gray-400">
              {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
            </time>
          </div>

          <h1 className="font-cyber neon-text mb-4 text-4xl font-bold">{post.title}</h1>

          {post.excerpt && <p className="font-futura text-xl text-gray-300">{post.excerpt}</p>}
        </div>
      </header>

      {/* 記事本文 */}
      <div className="prose prose-lg prose-invert mb-12 max-w-none">
        <MarkdownRenderer content={post.content} />
      </div>

      {/* タグ */}
      {post.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-dark-700 rounded-full px-3 py-1 text-sm text-gray-300">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* シェアボタン */}
      <div className="border-dark-600 mb-12 border-y py-8">
        <ShareButtons title={post.title} url={`/blog/${post.slug}`} />
      </div>

      {/* 関連記事 */}
      {relatedPosts.length > 0 && (
        <section>
          <h2 className="font-cyber neon-text mb-8 text-2xl font-bold">関連記事</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <BlogPostCard key={relatedPost.id} post={relatedPost} compact />
            ))}
          </div>
        </section>
      )}
    </article>
  )
}
```

### ブログ投稿カードコンポーネント

```tsx
// components/blog/BlogPostCard.tsx
import { BlogPost } from '@/types/blog'
import { Card } from '@/components/ui'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

interface BlogPostCardProps {
  post: BlogPost
  compact?: boolean
}

export default function BlogPostCard({ post, compact = false }: BlogPostCardProps) {
  return (
    <motion.div whileHover={{ y: -5 }} transition={{ type: 'spring', stiffness: 300 }}>
      <Card className="hover:shadow-glow h-full overflow-hidden transition-all duration-300">
        <Link href={`/blog/${post.slug}`}>
          {post.coverImage && (
            <div className={`relative aspect-video ${compact ? 'aspect-[4/3]' : ''}`}>
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

              {/* カテゴリーバッジ */}
              <div className="absolute left-4 top-4">
                <span
                  className="rounded-full px-2 py-1 text-xs font-medium backdrop-blur-sm"
                  style={{
                    backgroundColor: `${post.category.color}30`,
                    color: post.category.color,
                    border: `1px solid ${post.category.color}50`,
                  }}
                >
                  {post.category.name}
                </span>
              </div>
            </div>
          )}

          <div className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <time className="font-futura text-sm text-gray-400">
                {new Date(post.publishedAt).toLocaleDateString('ja-JP')}
              </time>

              {post.tags.slice(0, 2).map((tag) => (
                <span key={tag} className="text-neon-blue text-xs">
                  #{tag}
                </span>
              ))}
            </div>

            <h3
              className={`font-cyber mb-3 line-clamp-2 font-bold text-white ${
                compact ? 'text-lg' : 'text-xl'
              }`}
            >
              {post.title}
            </h3>

            {!compact && (
              <p className="font-futura line-clamp-3 text-sm text-gray-300">{post.excerpt}</p>
            )}

            <div className="text-neon-blue hover:text-neon-purple mt-4 flex items-center transition-colors">
              <span className="font-futura text-sm">続きを読む</span>
              <svg className="ml-2 h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </Link>
      </Card>
    </motion.div>
  )
}
```

### Markdownレンダラー

```tsx
// components/blog/MarkdownRenderer.tsx
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import Image from 'next/image'

interface MarkdownRendererProps {
  content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')
          return !inline && match ? (
            <SyntaxHighlighter {...props} style={oneDark} language={match[1]} PreTag="div">
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={`${className} bg-dark-800 text-neon-blue rounded px-1 py-0.5`}
              {...props}
            >
              {children}
            </code>
          )
        },
        img({ src, alt }) {
          return (
            <div className="my-8">
              <Image
                src={src || ''}
                alt={alt || ''}
                width={800}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          )
        },
        h1: ({ children }) => (
          <h1 className="font-cyber neon-text mb-6 mt-12 text-3xl font-bold first:mt-0">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="font-cyber text-neon-purple mb-4 mt-10 text-2xl font-bold">{children}</h2>
        ),
        h3: ({ children }) => (
          <h3 className="font-cyber text-neon-green mb-3 mt-8 text-xl font-bold">{children}</h3>
        ),
        p: ({ children }) => (
          <p className="font-futura mb-6 leading-relaxed text-gray-300">{children}</p>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-neon-blue my-6 border-l-4 pl-4 italic text-gray-400">
            {children}
          </blockquote>
        ),
        ul: ({ children }) => (
          <ul className="mb-6 list-inside list-disc space-y-2 text-gray-300">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-6 list-inside list-decimal space-y-2 text-gray-300">{children}</ol>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
```

### API Routes実装

```typescript
// app/api/blog/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { getPaginatedPosts } from '@/lib/blog'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = Number(searchParams.get('page')) || 1
  const category = searchParams.get('category') || undefined
  const search = searchParams.get('search') || undefined
  const limit = Number(searchParams.get('limit')) || 10

  try {
    const result = await getPaginatedPosts({
      page,
      category,
      search,
      limit,
    })

    return NextResponse.json(result)
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## 完了条件

- ブログ記事の一覧・詳細表示が動作する
- カテゴリーフィルターと検索機能が実装されている
- SEO対応（メタデータ、OGP）が完了している
- レスポンシブデザインが適用されている
