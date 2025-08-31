# 007: デザインシステム・カラーパレット設定

## 概要

「最先端、モダン、クール、IT感満載」を表現するデザインシステムとカラーパレットを実装する

## 優先度

High

## 前提条件

- 001: プロジェクトセットアップが完了していること

## Todoリスト

- [×] カラーパレットの設定
  - [×] ダークモード基調のベースカラー
  - [×] ネオンカラーのアクセント色
  - [×] グラデーションカラーの定義
  - [×] tailwind.config.jsへの反映
- [×] タイポグラフィの設定
  - [×] 未来的でシャープなフォントの選定
  - [×] フォントサイズのスケール設定
  - [×] 行間・文字間隔の調整
- [×] シャドウとエフェクト
  - [×] グロウエフェクトの定義
  - [×] ボックスシャドウのバリエーション
  - [×] ネオンライトエフェクト
- [×] CSS変数の設定
  - [×] globals.cssの更新
  - [×] カスタムプロパティの定義
- [×] デザイントークンの作成
  - [×] src/lib/design-tokens.ts

## 実装詳細

### カラーパレット

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        // ベースカラー（ダークモード基調）
        dark: {
          900: '#0a0a0a', // 最深部
          800: '#1a1a1a', // 背景
          700: '#2a2a2a', // カード背景
          600: '#3a3a3a', // ボーダー
        },
        // ネオンアクセント
        neon: {
          blue: '#00d4ff', // サイバーブルー
          purple: '#8b5cf6', // エレクトリックパープル
          green: '#00ff88', // マトリックスグリーン
          pink: '#ff0080', // ネオンピンク
        },
        // グラデーション用
        gradient: {
          from: '#0066ff',
          via: '#8b5cf6',
          to: '#ff0080',
        },
      },
      fontFamily: {
        cyber: ['Orbitron', 'monospace'],
        futura: ['Futura', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 20px rgba(0, 212, 255, 0.5)',
        glow: '0 0 40px rgba(139, 92, 246, 0.3)',
        cyber: '0 4px 32px rgba(0, 0, 0, 0.8)',
      },
    },
  },
}
```

### CSS変数とエフェクト

```css
/* globals.css */
:root {
  --neon-blue: #00d4ff;
  --neon-purple: #8b5cf6;
  --neon-green: #00ff88;

  --glow-animation: glow 2s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    box-shadow: 0 0 5px var(--neon-blue);
  }
  to {
    box-shadow:
      0 0 20px var(--neon-blue),
      0 0 30px var(--neon-blue);
  }
}

.neon-text {
  color: var(--neon-blue);
  text-shadow: 0 0 10px var(--neon-blue);
}

.cyber-grid {
  background-image:
    linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### デザイントークン

```typescript
// src/lib/design-tokens.ts
export const designTokens = {
  colors: {
    primary: 'var(--neon-blue)',
    secondary: 'var(--neon-purple)',
    accent: 'var(--neon-green)',
    background: {
      primary: '#0a0a0a',
      secondary: '#1a1a1a',
      card: '#2a2a2a',
    },
  },
  typography: {
    heading: 'font-cyber',
    body: 'font-futura',
  },
  effects: {
    glow: 'shadow-neon',
    hover: 'shadow-glow',
  },
}
```

## 完了条件

- カラーパレットがTailwindに設定されている
- フォントが適切に読み込まれている
- エフェクトクラスが動作する
- デザイントークンが使用可能
