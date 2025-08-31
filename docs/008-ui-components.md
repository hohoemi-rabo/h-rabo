# 008: UIコンポーネントライブラリ作成

## 概要

サイバー・未来感のあるUIコンポーネントライブラリを作成する

## 優先度

High

## 前提条件

- 007: デザインシステム・カラーパレット設定が完了していること

## Todoリスト

- [×] ボタンコンポーネント
  - [×] components/ui/Button.tsx
  - [×] プライマリボタン（ネオングロウ）
  - [×] セカンダリボタン（アウトライン）
  - [×] ホバーエフェクト
- [×] カードコンポーネント
  - [×] components/ui/Card.tsx
  - [×] サイバーカードデザイン
  - [×] グラスモーフィズム効果
  - [×] 角の光るエフェクト
- [×] 入力フィールドコンポーネント
  - [×] components/ui/Input.tsx
  - [×] サイバー風テキストフィールド
  - [×] フォーカスエフェクト
  - [×] エラー状態のスタイル
- [×] ローディングコンポーネント
  - [×] components/ui/Loading.tsx
  - [×] サイバーローディングアニメーション
  - [×] スピナーとプログレスバー
- [×] アイコンコンポーネント
  - [×] components/ui/Icon.tsx
  - [×] 基本アイコンセット
  - [×] サイバー風デザイン
- [×] モーダルコンポーネント
  - [×] components/ui/Modal.tsx
  - [×] サイバー風モーダルデザイン
  - [×] アニメーション付き表示/非表示

## 実装詳細

### ボタンコンポーネント

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export default function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  onClick,
}: ButtonProps) {
  const baseStyles = 'font-cyber font-semibold transition-all duration-300'

  const variants = {
    primary:
      'bg-gradient-to-r from-neon-blue to-neon-purple text-white shadow-neon hover:shadow-glow',
    secondary: 'border border-neon-blue text-neon-blue hover:bg-neon-blue hover:text-dark-900',
    ghost: 'text-neon-green hover:text-white hover:bg-neon-green/20',
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}
```

### カードコンポーネント

```tsx
// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode
  className?: string
  glowing?: boolean
}

export default function Card({ children, className = '', glowing = false }: CardProps) {
  return (
    <div
      className={`bg-dark-700/80 border-dark-600 rounded-lg border p-6 backdrop-blur-sm transition-all duration-300 ${glowing ? 'shadow-neon hover:shadow-glow' : 'hover:border-neon-blue/50'} ${className} `}
    >
      {children}
    </div>
  )
}
```

### 入力フィールドコンポーネント

```tsx
// components/ui/Input.tsx
interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password'
  placeholder?: string
  value?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  className?: string
}

export default function Input({
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  className = '',
}: InputProps) {
  return (
    <div className={`w-full ${className}`}>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`bg-dark-800 font-futura w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
          error
            ? 'border-red-500 focus:border-red-500 focus:shadow-[0_0_10px_rgba(239,68,68,0.5)]'
            : 'border-dark-600 focus:border-neon-blue focus:shadow-neon'
        } `}
      />
      {error && <p className="font-futura mt-1 text-sm text-red-400">{error}</p>}
    </div>
  )
}
```

### ローディングコンポーネント

```tsx
// components/ui/Loading.tsx
interface LoadingProps {
  size?: 'sm' | 'md' | 'lg'
  type?: 'spinner' | 'pulse' | 'cyber'
}

export default function Loading({ size = 'md', type = 'cyber' }: LoadingProps) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  }

  if (type === 'cyber') {
    return (
      <div className={`${sizes[size]} relative`}>
        <div className="border-neon-blue absolute inset-0 animate-spin rounded-full border-2 border-t-transparent"></div>
        <div className="border-neon-purple animate-reverse absolute inset-2 animate-spin rounded-full border-2 border-b-transparent"></div>
      </div>
    )
  }

  // その他のローディングタイプ...
}
```

## 完了条件

- 全てのUIコンポーネントが作成されている
- Storybookまたはテストページで動作確認できる
- 各コンポーネントがデザインシステムに準拠している
- プロパティによる柔軟なカスタマイズが可能
