# 002: ページ構造とルーティング設定

## 概要

すべてのページの基本構造とルーティングを設定する

## 優先度

High

## 前提条件

- 001: プロジェクトセットアップが完了していること

## Todoリスト

- [ ] ページファイルの作成
  - [ ] app/page.tsx（トップページ）の基本構造
  - [ ] app/about/page.tsx（講師紹介）
  - [ ] app/services/page.tsx（サービス詳細）
  - [ ] app/blog/page.tsx（ブログ一覧）
  - [ ] app/blog/[slug]/page.tsx（ブログ詳細）
  - [ ] app/contact/page.tsx（お問い合わせ）
  - [ ] app/faq/page.tsx（よくある質問）
  - [ ] app/privacy/page.tsx（プライバシーポリシー）
- [ ] ルートグループの設定
  - [ ] app/(marketing)/ グループ作成
  - [ ] 必要に応じた整理
- [ ] 404ページの作成
  - [ ] app/not-found.tsx
- [ ] エラーページの作成
  - [ ] app/error.tsx
- [ ] ローディングUIの作成
  - [ ] app/loading.tsx

## 実装詳細

### 各ページの基本テンプレート

```typescript
// app/[page-name]/page.tsx
export default function PageName() {
  return (
    <div>
      <h1>ページタイトル</h1>
      <p>仮のコンテンツ</p>
    </div>
  )
}
```

### ルートグループ構造

```
app/
├── (marketing)/
│   ├── about/page.tsx
│   └── services/page.tsx
├── blog/
│   ├── page.tsx
│   └── [slug]/page.tsx
├── contact/page.tsx
├── faq/page.tsx
├── privacy/page.tsx
└── page.tsx
```

## 完了条件

- すべてのページファイルが作成されている
- 各ページにアクセスできる
- 404ページが正常に表示される
- エラーハンドリングが動作する
