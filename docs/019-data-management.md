# 019: データ管理・CMS機能実装

## 概要

ブログ投稿やサイトコンテンツを管理するための機能を実装する

## 優先度

Medium

## 前提条件

- 018: ブログシステム実装が完了していること

## Todoリスト

- [ ] データ保存方法の選択
  - [ ] ファイルベース（JSON/Markdown）の実装
  - [ ] データベース連携（SQLite/PostgreSQL）の準備
  - [ ] 画像ファイル管理システム
- [ ] 簡易CMS機能
  - [ ] 管理画面UI
  - [ ] ログイン認証
  - [ ] 投稿作成・編集機能
  - [ ] ファイルアップロード機能
- [ ] データ操作API
  - [ ] CRUD操作の実装
  - [ ] ファイル操作API
  - [ ] バックアップ機能
- [ ] コンテンツ管理
  - [ ] 静的コンテンツの管理
  - [ ] 設定データの管理
  - [ ] メディアライブラリ
- [ ] セキュリティ対策
  - [ ] アクセス制限
  - [ ] データ検証
  - [ ] ファイルアップロード制限

## 実装詳細

### ファイルベースデータ管理

```typescript
// lib/dataManager.ts
import fs from 'fs/promises'
import path from 'path'
import { BlogPost, BlogCategory } from '@/types/blog'

const DATA_DIR = path.join(process.cwd(), 'data')
const POSTS_DIR = path.join(DATA_DIR, 'posts')
const IMAGES_DIR = path.join(process.cwd(), 'public/images')

export class FileDataManager {
  async init() {
    await this.ensureDirectories()
  }

  private async ensureDirectories() {
    await fs.mkdir(DATA_DIR, { recursive: true })
    await fs.mkdir(POSTS_DIR, { recursive: true })
    await fs.mkdir(IMAGES_DIR, { recursive: true })
  }

  // ブログ投稿の管理
  async getAllPosts(): Promise<BlogPost[]> {
    try {
      const files = await fs.readdir(POSTS_DIR)
      const posts: BlogPost[] = []

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(POSTS_DIR, file)
          const content = await fs.readFile(filePath, 'utf-8')
          const post = JSON.parse(content) as BlogPost
          posts.push({
            ...post,
            publishedAt: new Date(post.publishedAt),
            updatedAt: new Date(post.updatedAt),
          })
        }
      }

      return posts.sort(
        (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      )
    } catch (error) {
      console.error('Error reading posts:', error)
      return []
    }
  }

  async getPostById(id: string): Promise<BlogPost | null> {
    try {
      const filePath = path.join(POSTS_DIR, `${id}.json`)
      const content = await fs.readFile(filePath, 'utf-8')
      const post = JSON.parse(content) as BlogPost

      return {
        ...post,
        publishedAt: new Date(post.publishedAt),
        updatedAt: new Date(post.updatedAt),
      }
    } catch (error) {
      return null
    }
  }

  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    const posts = await this.getAllPosts()
    return posts.find((post) => post.slug === slug) || null
  }

  async createPost(post: Omit<BlogPost, 'id' | 'updatedAt'>): Promise<BlogPost> {
    const id = Date.now().toString()
    const newPost: BlogPost = {
      ...post,
      id,
      updatedAt: new Date(),
    }

    await this.savePost(newPost)
    return newPost
  }

  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost | null> {
    const existingPost = await this.getPostById(id)
    if (!existingPost) return null

    const updatedPost: BlogPost = {
      ...existingPost,
      ...updates,
      id,
      updatedAt: new Date(),
    }

    await this.savePost(updatedPost)
    return updatedPost
  }

  async deletePost(id: string): Promise<boolean> {
    try {
      const filePath = path.join(POSTS_DIR, `${id}.json`)
      await fs.unlink(filePath)
      return true
    } catch (error) {
      return false
    }
  }

  private async savePost(post: BlogPost): Promise<void> {
    const filePath = path.join(POSTS_DIR, `${post.id}.json`)
    await fs.writeFile(filePath, JSON.stringify(post, null, 2))
  }

  // 画像管理
  async saveImage(file: File, directory = 'blog'): Promise<string> {
    const buffer = Buffer.from(await file.arrayBuffer())
    const extension = path.extname(file.name)
    const filename = `${Date.now()}-${Math.random().toString(36).substring(7)}${extension}`
    const imagePath = path.join(IMAGES_DIR, directory, filename)

    await fs.mkdir(path.dirname(imagePath), { recursive: true })
    await fs.writeFile(imagePath, buffer)

    return `/images/${directory}/${filename}`
  }

  async deleteImage(imagePath: string): Promise<boolean> {
    try {
      const fullPath = path.join(process.cwd(), 'public', imagePath)
      await fs.unlink(fullPath)
      return true
    } catch (error) {
      return false
    }
  }
}

export const dataManager = new FileDataManager()
```

### 簡易管理画面

```tsx
// app/admin/page.tsx
'use client'
import { useState, useEffect } from 'react'
import { BlogPost } from '@/types/blog'
import { Card, Button, Modal } from '@/components/ui'
import { PostEditor } from '@/components/admin/PostEditor'

export default function AdminPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts')
      const data = await response.json()
      setPosts(data)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = () => {
    setSelectedPost(null)
    setIsEditorOpen(true)
  }

  const handleEditPost = (post: BlogPost) => {
    setSelectedPost(post)
    setIsEditorOpen(true)
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('この投稿を削除しますか？')) return

    try {
      const response = await fetch(`/api/admin/posts/${postId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        fetchPosts()
      }
    } catch (error) {
      console.error('Failed to delete post:', error)
    }
  }

  const handleSavePost = async (post: BlogPost | Omit<BlogPost, 'id' | 'updatedAt'>) => {
    try {
      const isEdit = 'id' in post
      const response = await fetch(`/api/admin/posts${isEdit ? `/${post.id}` : ''}`, {
        method: isEdit ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      })

      if (response.ok) {
        fetchPosts()
        setIsEditorOpen(false)
      }
    } catch (error) {
      console.error('Failed to save post:', error)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-12">
        <div className="text-center">
          <div className="border-neon-blue mx-auto h-12 w-12 animate-spin rounded-full border-b-2"></div>
          <p className="mt-4 text-gray-400">読み込み中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-cyber neon-text text-3xl font-bold">コンテンツ管理</h1>
        <Button onClick={handleCreatePost} variant="primary">
          新規投稿作成
        </Button>
      </div>

      <div className="grid gap-6">
        {posts.map((post) => (
          <Card key={post.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="mb-2 flex items-center gap-3">
                  <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                  <span
                    className={`rounded-full px-2 py-1 text-xs ${
                      post.status === 'published'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {post.status === 'published' ? '公開中' : '下書き'}
                  </span>
                </div>
                <p className="mb-2 text-sm text-gray-400">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>カテゴリー: {post.category.name}</span>
                  <span>更新: {new Date(post.updatedAt).toLocaleDateString('ja-JP')}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button onClick={() => handleEditPost(post)} variant="secondary" size="sm">
                  編集
                </Button>
                <Button
                  onClick={() => handleDeletePost(post.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300"
                >
                  削除
                </Button>
              </div>
            </div>
          </Card>
        ))}

        {posts.length === 0 && (
          <Card className="p-12 text-center">
            <p className="mb-4 text-gray-400">投稿がありません</p>
            <Button onClick={handleCreatePost} variant="primary">
              最初の投稿を作成
            </Button>
          </Card>
        )}
      </div>

      {/* 投稿エディター */}
      <Modal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        title={selectedPost ? '投稿を編集' : '新規投稿作成'}
        size="full"
      >
        <PostEditor
          post={selectedPost}
          onSave={handleSavePost}
          onCancel={() => setIsEditorOpen(false)}
        />
      </Modal>
    </div>
  )
}
```

### 投稿エディター

```tsx
// components/admin/PostEditor.tsx
'use client'
import { useState, useRef } from 'react'
import { BlogPost, blogCategories } from '@/types/blog'
import { Input, Button } from '@/components/ui'
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer'

interface PostEditorProps {
  post?: BlogPost | null
  onSave: (post: BlogPost | Omit<BlogPost, 'id' | 'updatedAt'>) => void
  onCancel: () => void
}

export default function PostEditor({ post, onSave, onCancel }: PostEditorProps) {
  const [formData, setFormData] = useState({
    title: post?.title || '',
    slug: post?.slug || '',
    excerpt: post?.excerpt || '',
    content: post?.content || '',
    coverImage: post?.coverImage || '',
    category: post?.category.id || blogCategories[0].id,
    tags: post?.tags.join(', ') || '',
    status: post?.status || 'draft',
    seo: {
      metaTitle: post?.seo.metaTitle || '',
      metaDescription: post?.seo.metaDescription || '',
      ogImage: post?.seo.ogImage || '',
    },
  })

  const [isPreview, setIsPreview] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleInputChange = (field: string, value: string, nested?: string) => {
    if (nested) {
      setFormData((prev) => ({
        ...prev,
        [field]: {
          ...(prev[field as keyof typeof prev] as object),
          [nested]: value,
        },
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    // タイトルが変更されたら自動でスラッグを生成
    if (field === 'title' && !post) {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '')
      setFormData((prev) => ({ ...prev, slug }))
    }
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const data = await response.json()
      if (data.url) {
        setFormData((prev) => ({ ...prev, coverImage: data.url }))
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  const handleSubmit = () => {
    const category = blogCategories.find((c) => c.id === formData.category)!
    const tags = formData.tags
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean)

    const postData = {
      ...formData,
      category,
      tags,
      author: 'ほほ笑みラボ',
      publishedAt: post?.publishedAt || new Date(),
    }

    if (post) {
      onSave({ ...postData, id: post.id, updatedAt: new Date() })
    } else {
      onSave(postData)
    }
  }

  return (
    <div className="flex h-full flex-col">
      {/* ツールバー */}
      <div className="border-dark-600 flex items-center justify-between border-b p-4">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => setIsPreview(!isPreview)}
            variant={isPreview ? 'primary' : 'secondary'}
            size="sm"
          >
            {isPreview ? 'エディター' : 'プレビュー'}
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button onClick={onCancel} variant="ghost" size="sm">
            キャンセル
          </Button>
          <Button
            onClick={() => {
              setFormData((prev) => ({ ...prev, status: 'draft' }))
              handleSubmit()
            }}
            variant="secondary"
            size="sm"
          >
            下書き保存
          </Button>
          <Button
            onClick={() => {
              setFormData((prev) => ({ ...prev, status: 'published' }))
              handleSubmit()
            }}
            variant="primary"
            size="sm"
          >
            公開
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* エディター */}
        <div
          className={`${isPreview ? 'w-1/2' : 'w-full'} border-dark-600 overflow-y-auto border-r p-6`}
        >
          <div className="max-w-2xl space-y-6">
            {/* 基本情報 */}
            <div className="space-y-4">
              <Input
                label="タイトル"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="投稿タイトルを入力"
              />

              <Input
                label="スラッグ"
                value={formData.slug}
                onChange={(e) => handleInputChange('slug', e.target.value)}
                placeholder="URL用のスラッグ"
              />

              <div>
                <label className="font-futura mb-2 block text-sm text-gray-300">概要</label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => handleInputChange('excerpt', e.target.value)}
                  placeholder="投稿の概要を入力"
                  rows={3}
                  className="bg-dark-800 border-dark-600 font-futura focus:border-neon-blue w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>

            {/* カバー画像 */}
            <div>
              <label className="font-futura mb-2 block text-sm text-gray-300">カバー画像</label>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="secondary"
                  size="sm"
                  disabled={isUploading}
                >
                  {isUploading ? 'アップロード中...' : '画像選択'}
                </Button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                {formData.coverImage && (
                  <img
                    src={formData.coverImage}
                    alt="Cover"
                    className="h-12 w-20 rounded object-cover"
                  />
                )}
              </div>
            </div>

            {/* カテゴリーとタグ */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="font-futura mb-2 block text-sm text-gray-300">カテゴリー</label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="bg-dark-800 border-dark-600 font-futura focus:border-neon-blue w-full rounded-lg border px-4 py-3 text-white focus:outline-none"
                >
                  {blogCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <Input
                label="タグ（カンマ区切り）"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                placeholder="tag1, tag2, tag3"
              />
            </div>

            {/* 本文 */}
            <div>
              <label className="font-futura mb-2 block text-sm text-gray-300">
                本文（Markdown）
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Markdown形式で本文を入力"
                rows={20}
                className="bg-dark-800 border-dark-600 focus:border-neon-blue w-full rounded-lg border px-4 py-3 font-mono text-sm text-white placeholder-gray-400 focus:outline-none"
              />
            </div>

            {/* SEO設定 */}
            <div className="border-dark-600 space-y-4 rounded-lg border p-4">
              <h3 className="text-lg font-semibold text-white">SEO設定</h3>

              <Input
                label="メタタイトル"
                value={formData.seo.metaTitle}
                onChange={(e) => handleInputChange('seo', e.target.value, 'metaTitle')}
                placeholder="検索結果に表示されるタイトル"
              />

              <div>
                <label className="font-futura mb-2 block text-sm text-gray-300">
                  メタディスクリプション
                </label>
                <textarea
                  value={formData.seo.metaDescription}
                  onChange={(e) => handleInputChange('seo', e.target.value, 'metaDescription')}
                  placeholder="検索結果に表示される説明文"
                  rows={3}
                  className="bg-dark-800 border-dark-600 font-futura focus:border-neon-blue w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* プレビュー */}
        {isPreview && (
          <div className="w-1/2 overflow-y-auto p-6">
            <div className="prose prose-invert max-w-none">
              <h1 className="font-cyber neon-text mb-4 text-3xl font-bold">
                {formData.title || 'タイトルなし'}
              </h1>
              {formData.excerpt && <p className="mb-8 text-xl text-gray-300">{formData.excerpt}</p>}
              <MarkdownRenderer content={formData.content} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
```

### アップロードAPI

```typescript
// app/api/admin/upload/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { dataManager } from '@/lib/dataManager'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // ファイルタイプ検証
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 })
    }

    // ファイルサイズ制限（5MB）
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'File too large' }, { status: 400 })
    }

    const url = await dataManager.saveImage(file)

    return NextResponse.json({ url })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 })
  }
}
```

## 完了条件

- ファイルベースのデータ管理システムが動作する
- 管理画面で投稿の作成・編集・削除ができる
- 画像のアップロード機能が動作する
- セキュリティ対策が実装されている
