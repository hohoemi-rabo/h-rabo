# 004: セクションコンポーネントの基本実装

## 概要

トップページの各セクションコンポーネントを基本的な形で実装する

## 優先度

High

## 前提条件

- 003: 基本レイアウトとナビゲーションが完了していること

## Todoリスト

- [ ] ヒーローセクションの作成
  - [ ] components/features/HeroSection.tsx
  - [ ] キャッチコピーの配置
  - [ ] 仮の背景画像またはプレースホルダー
- [ ] サービス紹介セクション
  - [ ] components/features/ServicesSection.tsx
  - [ ] 3つのサービスカード（仮デザイン）
  - [ ] 基本的なグリッドレイアウト
- [ ] 講師紹介セクション
  - [ ] components/features/InstructorSection.tsx
  - [ ] プロフィール情報の配置
  - [ ] 経歴の表示
- [ ] 生徒さんの声セクション
  - [ ] components/features/TestimonialsSection.tsx
  - [ ] 3件の仮データ作成
  - [ ] 基本的なカード表示
- [ ] お知らせセクション
  - [ ] components/features/NewsSection.tsx
  - [ ] 仮のお知らせデータ
  - [ ] リスト表示
- [ ] アクセス情報セクション
  - [ ] components/features/AccessSection.tsx
  - [ ] 所在地情報
  - [ ] 営業時間
  - [ ] 連絡先

## 実装詳細

### サービスデータ構造

```typescript
const services = [
  {
    id: 1,
    title: 'シニア向けグループレッスン',
    description: 'ゆっくり、楽しく学べます',
    price: '2時間 2,000円',
  },
  {
    id: 2,
    title: 'ビジネスパーソン向け個別レッスン',
    description: '課題解決型のカスタマイズレッスン',
    price: '2時間 2,000円〜',
  },
  {
    id: 3,
    title: '単発利用サービス',
    description: 'お悩み解決をピンポイントでサポート',
    price: '3,000円〜',
  },
]
```

### 生徒さんの声データ

```typescript
const testimonials = [
  {
    id: 1,
    name: '田中様（70代）',
    content:
      'パソコンが苦手でしたが、優しく教えていただき、今では孫とビデオ通話ができるようになりました。',
  },
  {
    id: 2,
    name: '佐藤様（30代）',
    content: '仕事で必要なExcelの使い方を効率的に学べました。実践的で助かっています。',
  },
  {
    id: 3,
    name: '鈴木様（60代）',
    content: 'スマホの使い方から丁寧に教えていただき、写真の整理や共有ができるようになりました。',
  },
]
```

## 完了条件

- すべてのセクションコンポーネントが作成されている
- トップページに各セクションが表示される
- 基本的なレイアウトが整っている
- 仮データが正しく表示される
