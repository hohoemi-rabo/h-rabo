# 005: メタデータとSEO基本設定

## 概要

各ページのメタデータ設定とSEOの基本的な実装を行う

## 優先度

Medium

## 前提条件

- 002: ページ構造とルーティング設定が完了していること

## Todoリスト

- [×] ルートメタデータの設定
  - [×] app/layout.tsxのメタデータ設定
  - [×] サイト全体のデフォルト設定
- [×] 各ページのメタデータ設定
  - [×] トップページ
  - [×] 講師紹介ページ
  - [×] サービス詳細ページ
  - [×] ブログ一覧ページ
  - [×] お問い合わせページ
  - [×] FAQページ
  - [×] プライバシーポリシーページ
- [×] OGP画像の設定
  - [×] デフォルトOGP画像の準備
  - [×] 各ページのOGP設定
- [×] 構造化データの実装
  - [×] Organization schema
  - [×] LocalBusiness schema
- [×] robots.txtの作成
- [×] sitemap.xmlの自動生成設定

## 実装詳細

### ルートメタデータ

```typescript
// app/layout.tsx
export const metadata: Metadata = {
  title: {
    default: 'パソコン・スマホ ほほ笑みラボ | ゆっくり、何度でも教えます！',
    template: '%s | ほほ笑みラボ',
  },
  description:
    '長野県飯田市のパソコン・スマホ教室。シニアから若手ビジネスパーソンまで、最先端のIT教育を提供します。',
  keywords: ['パソコン教室', 'スマホ教室', '飯田市', 'シニア向け', 'IT教育'],
  authors: [{ name: 'ほほ笑みラボ' }],
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: 'https://hohoemi-lab.com',
    siteName: 'パソコン・スマホ ほほ笑みラボ',
  },
  twitter: {
    card: 'summary_large_image',
  },
}
```

### 構造化データ例

```typescript
const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'パソコン・スマホ ほほ笑みラボ',
  description: 'シニアから若手ビジネスパーソンまで対応するパソコン・スマホ教室',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '上郷飯沼2640-1',
    addressLocality: '飯田市',
    addressRegion: '長野県',
    postalCode: '395-0002',
    addressCountry: 'JP',
  },
  telephone: '090-5646-5670',
}
```

## 完了条件

- 各ページに適切なメタデータが設定されている
- OGP画像が正しく表示される
- 構造化データが実装されている
- sitemap.xmlが自動生成される
