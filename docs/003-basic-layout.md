# 003: 基本レイアウトとナビゲーション

## 概要

全ページ共通のレイアウトコンポーネントとナビゲーションを実装する

## 優先度

High

## 前提条件

- 002: ページ構造とルーティング設定が完了していること

## Todoリスト

- [ ] ルートレイアウトの実装
  - [ ] app/layout.tsxの更新
  - [ ] メタデータの基本設定
  - [ ] フォントの設定
- [ ] ヘッダーコンポーネントの作成
  - [ ] components/layouts/Header.tsx
  - [ ] ロゴ配置
  - [ ] ナビゲーションメニュー（仮デザイン）
  - [ ] モバイルメニュー（ハンバーガー）
- [ ] フッターコンポーネントの作成
  - [ ] components/layouts/Footer.tsx
  - [ ] 基本情報の配置
  - [ ] 営業時間・連絡先
  - [ ] コピーライト
- [ ] ナビゲーションコンポーネント
  - [ ] components/ui/Navigation.tsx
  - [ ] メニューリンクの実装
  - [ ] アクティブ状態の表示
- [ ] レイアウトコンテナの作成
  - [ ] components/ui/Container.tsx

## 実装詳細

### ナビゲーションメニュー項目

```typescript
const menuItems = [
  { href: '/', label: 'ホーム' },
  { href: '/about', label: '講師紹介' },
  { href: '/services', label: 'サービス' },
  { href: '/blog', label: 'ブログ' },
  { href: '/faq', label: 'よくある質問' },
  { href: '/contact', label: 'お問い合わせ' },
]
```

### 基本レイアウト構造

```typescript
// app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
```

## 完了条件

- ヘッダーとフッターが全ページに表示される
- ナビゲーションリンクが正常に動作する
- モバイル対応の基本的なレイアウト
- アクティブなページがナビゲーションで識別できる
