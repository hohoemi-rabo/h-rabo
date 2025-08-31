# 006: レスポンシブ対応基本実装

## 概要

PC、タブレット、スマートフォンでの基本的な表示対応を実装する

## 優先度

High

## 前提条件

- 003: 基本レイアウトとナビゲーションが完了していること
- 004: セクションコンポーネントの基本実装が完了していること

## Todoリスト

- [ ] ブレークポイントの設定
  - [ ] Tailwind設定の調整
  - [ ] カスタムブレークポイント（必要に応じて）
- [ ] ヘッダーのレスポンシブ対応
  - [ ] モバイルメニューの実装
  - [ ] ハンバーガーメニューの動作
  - [ ] メニューの開閉アニメーション
- [ ] 各セクションのレスポンシブ対応
  - [ ] ヒーローセクション
  - [ ] サービスカードのグリッド調整
  - [ ] 講師紹介のレイアウト調整
  - [ ] 生徒さんの声のカード配置
- [ ] フォントサイズの調整
  - [ ] 見出しのレスポンシブサイズ
  - [ ] 本文のレスポンシブサイズ
  - [ ] シニア向けフォントサイズ切り替え機能の準備
- [ ] 画像のレスポンシブ対応
  - [ ] アスペクト比の維持
  - [ ] モバイル用画像の最適化

## 実装詳細

### ブレークポイント設定

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      sm: '640px', // スマートフォン
      md: '768px', // タブレット
      lg: '1024px', // 小型デスクトップ
      xl: '1280px', // デスクトップ
      '2xl': '1536px', // 大型デスクトップ
    },
  },
}
```

### レスポンシブグリッドの例

```tsx
// サービスカードのグリッド
<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  {services.map((service) => (
    <ServiceCard key={service.id} {...service} />
  ))}
</div>
```

### モバイルメニューの基本構造

```tsx
const [isMenuOpen, setIsMenuOpen] = useState(false)

return (
  <nav>
    {/* デスクトップメニュー */}
    <div className="hidden md:flex">{/* メニュー項目 */}</div>

    {/* モバイルメニュー */}
    <div className="md:hidden">
      <button onClick={() => setIsMenuOpen(!isMenuOpen)}>{/* ハンバーガーアイコン */}</button>
      {isMenuOpen && <div className="mobile-menu">{/* メニュー項目 */}</div>}
    </div>
  </nav>
)
```

## 完了条件

- すべてのデバイスサイズで適切に表示される
- モバイルメニューが正常に動作する
- 画像が各デバイスで最適化されている
- テキストが読みやすいサイズで表示される
