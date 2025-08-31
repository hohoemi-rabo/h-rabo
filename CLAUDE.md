# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server with Turbopack on http://localhost:3000
- `npm run build` - Build the application for production with Turbopack
- `npm run start` - Start production server
- `npm run lint` - Run ESLint to check code quality
- `npx tsc --noEmit` - Run TypeScript type checking without emitting files

## Architecture

This is a Next.js 15.5.2 application using the App Router architecture with TypeScript and Tailwind CSS.

### Project Structure
- `src/app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout component
  - `page.tsx` - Home page component
  - `globals.css` - Global styles with Tailwind directives
- Path alias: `@/*` maps to `./src/*`

### Technology Stack
- **Framework**: Next.js 15.5.2 with Turbopack
- **Language**: TypeScript with strict mode enabled
- **Styling**: Tailwind CSS v3.4.17
- **React**: v19.1.0
- **Linting**: ESLint with Next.js config

### Configuration Notes
- TypeScript is configured with strict mode and module resolution set to "bundler"
- Tailwind content paths include all components in `src/pages/`, `src/components/`, and `src/app/`
- ESLint extends Next.js core-web-vitals and TypeScript configurations

## プロジェクト要件定義

### プロジェクト概要
**パソコン・スマホ ほほ笑みラボ** の公式Webサイトリニューアルプロジェクト
- シニア向けの親しみやすいイメージから、最先端のIT感溢れるモダンなデザインへ刷新
- 「ほほ笑みラボ」という温かみのある名前と、クールなデザインのギャップで印象的なブランディングを実現
- ビジネスパーソン層への訴求力強化

### 基本情報
- **正式名称**: パソコン・スマホ ほほ笑みラボ
- **キャッチコピー**: ゆっくり、何度でも教えます！
- **所在地**: 〒395-0002 長野県飯田市上郷飯沼2640-1
- **連絡先**: 090-5646-5670

### 必要な追加技術スタック
- **アニメーション**: Framer Motion v11
- **3Dグラフィックス**: Three.js (React Three Fiber v8)
- **状態管理**: Zustand v4

### デザイン要件
#### デザインコンセプト
- **キーワード**: 最先端、モダン、クール、IT感満載、プロフェッショナル
- **カラースキーム**: ダークモード基調、ネオンカラーのアクセント
- **タイポグラフィ**: 未来的でシャープなフォント

#### 3D要素とアニメーション
- Three.jsを活用した印象的な3Dオブジェクト（デジタルデータの流れ、幾何学的オブジェクト、サイバー空間グリッド等）
- スクロールトリガーアニメーション、ホバーエフェクト、ページ遷移アニメーション

#### 革新的な3D空間ページ遷移システム
- 縦スクロールではなく、3D空間での移動によるセクション切り替え
- Framer Motion + CSS 3D Transformのハイブリッド方式
- 各セクションが異なるアニメーションで出現（回転、ズーム、浮き上がり等）

### サービス内容
#### コース受講サービス
1. **シニア向け（グループレッスン）**
   - 初心者コース、バラエティコース、ステップアップコース
   - 料金: 2時間2,000円、週1回

2. **ビジネスパーソン向け（個別レッスン）**
   - 課題解決型のカスタマイズレッスン
   - 料金: 2時間2,000円（内容により変動）

#### 単発利用サービス
- 新品PC購入サポート: 5,000円
- PINコード忘れ対応: 5,000円（出張込み）
- パソコン最適化: 5,000円
- スマホ動画編集: 3,000円

### 必須機能要件
1. **お問い合わせフォーム**
   - バリデーション機能、送信確認画面

2. **ブログ/お知らせ機能**
   - 管理画面から投稿・編集・削除、カテゴリー分類

3. **生徒さんの声**
   - スライダー形式で表示（3件の仮データ）

### ページ構成
- **トップページ**: ヒーローセクション（3D要素）、サービス紹介、講師紹介、生徒さんの声、お知らせ、アクセス
- **サービス詳細ページ**: コース受講、単発利用、料金表
- **その他**: FAQ、お問い合わせ、ブログ一覧、プライバシーポリシー

### パフォーマンス要件
- Lighthouseスコア90以上
- 初回読み込み3秒以内
- 60fps維持のスムーズなアニメーション

### 開発フェーズ
1. **Phase 1**: 基本構築（プロジェクトセットアップ、レイアウト、ルーティング）
2. **Phase 2**: デザイン実装（UIコンポーネント、3D要素、アニメーション）
3. **Phase 3**: 機能実装（フォーム、ブログ、レスポンシブ）
4. **Phase 4**: 最終調整（パフォーマンス、SEO、テスト）

## Next.js App Router ベストプラクティス

### コンポーネント設計
#### Server Components vs Client Components
- **デフォルトはServer Component**: データフェッチやバックエンド処理はServer Componentで実装
- **Client Componentは必要最小限**: `'use client'`は本当に必要な場合のみ使用
- **境界を明確に**: Client Componentは葉コンポーネントに配置し、Server Componentでラップ

```typescript
// ❌ 避けるべきパターン
// app/page.tsx
'use client' // ページ全体がClient Componentになる

// ✅ 推奨パターン
// app/page.tsx (Server Component)
import InteractiveButton from '@/components/InteractiveButton'

export default function Page() {
  const data = await fetchData() // Server側で実行
  return <InteractiveButton data={data} />
}

// components/InteractiveButton.tsx
'use client'
export default function InteractiveButton({ data }) {
  // インタラクティブな処理
}
```

### ファイル構造とルーティング
#### ディレクトリ構成
```
src/
├── app/                      # App Router
│   ├── (marketing)/         # ルートグループ（URLに影響しない）
│   │   ├── about/
│   │   └── services/
│   ├── (auth)/              # 認証関連のグループ
│   │   ├── login/
│   │   └── register/
│   ├── api/                 # API Routes
│   │   └── contact/route.ts
│   ├── layout.tsx           # ルートレイアウト
│   └── page.tsx             # ホームページ
├── components/              # 共有コンポーネント
│   ├── ui/                 # UIコンポーネント
│   └── features/           # 機能別コンポーネント
└── lib/                    # ユーティリティ関数
```

#### 特殊ファイル
- `page.tsx`: ルートを定義
- `layout.tsx`: 共通レイアウト（ネストされたレイアウト可能）
- `loading.tsx`: ローディングUI（Suspenseの自動ラップ）
- `error.tsx`: エラーバウンダリ（必ず'use client'）
- `not-found.tsx`: 404ページ
- `template.tsx`: レイアウトと似ているが、ナビゲーション時に再マウント

### データフェッチング
#### Server Componentでのフェッチ
```typescript
// app/posts/page.tsx
async function getPosts() {
  const res = await fetch('https://api.example.com/posts', {
    next: { revalidate: 3600 } // 1時間キャッシュ
  })
  return res.json()
}

export default async function PostsPage() {
  const posts = await getPosts()
  return <PostList posts={posts} />
}
```

#### キャッシュ戦略
- `force-cache`: デフォルト、ビルド時にキャッシュ
- `no-store`: リクエスト毎にフェッチ
- `next: { revalidate: seconds }`: 時間ベースの再検証
- `next: { tags: ['posts'] }`: タグベースの再検証

### パフォーマンス最適化
#### Parallel Data Fetching
```typescript
// 並列でデータフェッチ
export default async function Page() {
  const [users, posts, comments] = await Promise.all([
    getUsers(),
    getPosts(),
    getComments()
  ])
  return <Dashboard users={users} posts={posts} comments={comments} />
}
```

#### Streaming & Suspense
```typescript
// app/page.tsx
import { Suspense } from 'react'
import LoadingSkeleton from '@/components/LoadingSkeleton'

export default function Page() {
  return (
    <div>
      <h1>Dashboard</h1>
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowDataComponent />
      </Suspense>
    </div>
  )
}
```

#### Partial Prerendering (実験的機能)
```typescript
// next.config.ts
const nextConfig = {
  experimental: {
    ppr: true // Partial Prerenderingを有効化
  }
}
```

### メタデータ管理
#### 静的メタデータ
```typescript
// app/about/page.tsx
export const metadata = {
  title: 'About | ほほ笑みラボ',
  description: '最先端のIT教育を提供',
  openGraph: {
    title: 'About | ほほ笑みラボ',
    description: '最先端のIT教育を提供',
    images: ['/og-image.png']
  }
}
```

#### 動的メタデータ
```typescript
export async function generateMetadata({ params }) {
  const post = await getPost(params.id)
  return {
    title: post.title,
    description: post.excerpt,
  }
}
```

### Server Actions
```typescript
// app/actions.ts
'use server'

import { revalidatePath } from 'next/cache'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  const content = formData.get('content')
  
  // データベースに保存
  await db.post.create({ title, content })
  
  // キャッシュを再検証
  revalidatePath('/posts')
}

// app/new-post/page.tsx
import { createPost } from '@/app/actions'

export default function NewPost() {
  return (
    <form action={createPost}>
      <input name="title" />
      <textarea name="content" />
      <button type="submit">投稿</button>
    </form>
  )
}
```

### エラーハンドリング
```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div>
      <h2>エラーが発生しました</h2>
      <button onClick={() => reset()}>再試行</button>
    </div>
  )
}
```

### 画像最適化
```typescript
import Image from 'next/image'

export default function Hero() {
  return (
    <Image
      src="/hero.png"
      alt="Hero"
      width={1920}
      height={1080}
      priority // LCPの画像に使用
      placeholder="blur" // ぼかしプレースホルダー
      blurDataURL="..." // Base64エンコードされた画像
    />
  )
}
```

### ミドルウェア
```typescript
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // 認証チェック
  const token = request.cookies.get('token')
  
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*']
}
```

### 環境変数
```typescript
// サーバー側のみ
process.env.DATABASE_URL

// クライアント側でも使用可能（NEXT_PUBLIC_プレフィックス）
process.env.NEXT_PUBLIC_API_URL
```

### 型安全性
```typescript
// app/api/posts/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('query')
  
  return NextResponse.json({ query })
}
```

### 重要な注意点
1. **Client Componentの使用を最小限に**: パフォーマンスとSEOの観点から
2. **データフェッチはServer Componentで**: クライアントからの不要なAPIコールを避ける
3. **loading.tsxを活用**: ユーザー体験の向上
4. **キャッシュ戦略を適切に設定**: パフォーマンスと鮮度のバランス
5. **Server Actionsでフォーム処理**: プログレッシブエンハンスメント対応