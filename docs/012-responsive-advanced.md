# 012: 高度なレスポンシブデザイン実装

## 概要

全デバイスで最適な体験を提供するための詳細なレスポンシブデザインを実装する

## 優先度

High

## 前提条件

- 006: レスポンシブ対応基本実装が完了していること
- 010: 各セクションのサイバーデザイン実装が完了していること

## Todoリスト

- [ ] ブレークポイント最適化
  - [ ] カスタムブレークポイントの精密調整
  - [ ] コンテナクエリの活用（必要に応じて）
  - [ ] 中間サイズデバイスの最適化
- [ ] タイポグラフィのレスポンシブ対応
  - [ ] clampを使った流動的フォントサイズ
  - [ ] 読みやすさを重視したライン設定
  - [ ] シニア向け大きめフォント設定
- [ ] レイアウトの最適化
  - [ ] グリッドシステムの詳細調整
  - [ ] Flexboxレイアウトの最適化
  - [ ] スペーシング（margin, padding）の統一
- [ ] インタラクションの最適化
  - [ ] タッチデバイス用のインタラクション
  - [ ] ホバー状態の代替案（モバイル）
  - [ ] アクセシビリティの向上
- [ ] パフォーマンス最適化
  - [ ] モバイル用画像の最適化
  - [ ] レイジーローディングの実装
  - [ ] CSSの最適化とミニファイ
- [ ] デバイス別UI調整
  - [ ] タブレット専用レイアウト調整
  - [ ] 大画面デスクトップでの最適化
  - [ ] 折りたたみデバイス対応（必要に応じて）

## 実装詳細

### 流動的タイポグラフィ

```css
/* globals.css */
.responsive-text {
  /* ヒーローテキスト */
  --hero-size: clamp(2.5rem, 8vw, 6rem);
  /* 見出し */
  --heading-size: clamp(1.5rem, 4vw, 2.5rem);
  /* 本文 */
  --body-size: clamp(1rem, 2.5vw, 1.125rem);
  /* 小文字 */
  --small-size: clamp(0.875rem, 2vw, 1rem);
}

.hero-text {
  font-size: var(--hero-size);
  line-height: 1.1;
}

.heading-text {
  font-size: var(--heading-size);
  line-height: 1.3;
}

/* シニア向け大きめフォント設定 */
.senior-mode .hero-text {
  --hero-size: clamp(3rem, 10vw, 7rem);
}

.senior-mode .heading-text {
  --heading-size: clamp(1.75rem, 5vw, 3rem);
}

.senior-mode .body-text {
  --body-size: clamp(1.125rem, 3vw, 1.375rem);
}
```

### レスポンシブコンテナシステム

```tsx
// components/ui/ResponsiveContainer.tsx
interface ContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
}

export default function ResponsiveContainer({
  children,
  size = 'lg',
  className = '',
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-2xl', // 672px
    md: 'max-w-4xl', // 896px
    lg: 'max-w-6xl', // 1152px
    xl: 'max-w-7xl', // 1280px
    full: 'max-w-none', // 制限なし
  }

  return (
    <div className={` ${sizes[size]} mx-auto px-4 sm:px-6 lg:px-8 ${className} `}>{children}</div>
  )
}
```

### レスポンシブグリッドシステム

```tsx
// components/ui/ResponsiveGrid.tsx
interface GridProps {
  children: React.ReactNode
  cols?: {
    xs?: number // < 640px
    sm?: number // ≥ 640px
    md?: number // ≥ 768px
    lg?: number // ≥ 1024px
    xl?: number // ≥ 1280px
  }
  gap?: number
  className?: string
}

export default function ResponsiveGrid({
  children,
  cols = { xs: 1, sm: 2, lg: 3 },
  gap = 6,
  className = '',
}: GridProps) {
  const gridClasses = [
    `grid`,
    `gap-${gap}`,
    cols.xs && `grid-cols-${cols.xs}`,
    cols.sm && `sm:grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return <div className={gridClasses}>{children}</div>
}
```

### タッチデバイス最適化

```tsx
// hooks/useDeviceDetection.ts
import { useState, useEffect } from 'react'

export function useDeviceDetection() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
      setIsDesktop(window.innerWidth >= 1024)
    }

    checkTouchDevice()
    window.addEventListener('resize', checkTouchDevice)

    return () => window.removeEventListener('resize', checkTouchDevice)
  }, [])

  return { isTouchDevice, isDesktop }
}

// components/ui/AdaptiveButton.tsx
export default function AdaptiveButton({ children, ...props }: ButtonProps) {
  const { isTouchDevice } = useDeviceDetection()

  return (
    <Button
      {...props}
      className={` ${props.className || ''} ${isTouchDevice ? 'min-h-[44px] min-w-[44px]' : ''} `}
      // タッチデバイスではホバーエフェクトを無効化
      style={{
        '--hover-effect': isTouchDevice ? 'none' : 'block',
      }}
    >
      {children}
    </Button>
  )
}
```

### フォントサイズ切り替え機能

```tsx
// contexts/AccessibilityContext.tsx
import { createContext, useContext, useState } from 'react'

interface AccessibilityContextType {
  fontSize: 'normal' | 'large' | 'senior'
  setFontSize: (size: 'normal' | 'large' | 'senior') => void
  contrast: 'normal' | 'high'
  setContrast: (contrast: 'normal' | 'high') => void
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'senior'>('normal')
  const [contrast, setContrast] = useState<'normal' | 'high'>('normal')

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        contrast,
        setContrast,
      }}
    >
      <div
        className={` ${fontSize === 'large' ? 'text-lg' : ''} ${fontSize === 'senior' ? 'senior-mode' : ''} ${contrast === 'high' ? 'high-contrast' : ''} `}
      >
        {children}
      </div>
    </AccessibilityContext.Provider>
  )
}
```

### メディアクエリフック

```tsx
// hooks/useMediaQuery.ts
import { useState, useEffect } from 'react'

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia(query)
    setMatches(mediaQuery.matches)

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches)
    }

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [query])

  return matches
}

// 使用例
export function useBreakpoints() {
  const isXs = useMediaQuery('(max-width: 639px)')
  const isSm = useMediaQuery('(min-width: 640px) and (max-width: 767px)')
  const isMd = useMediaQuery('(min-width: 768px) and (max-width: 1023px)')
  const isLg = useMediaQuery('(min-width: 1024px) and (max-width: 1279px)')
  const isXl = useMediaQuery('(min-width: 1280px)')

  return { isXs, isSm, isMd, isLg, isXl }
}
```

## 完了条件

- 全デバイスサイズで適切に表示される
- タッチデバイスでのインタラクションが最適化されている
- アクセシビリティ機能が実装されている
- パフォーマンスが各デバイスで最適化されている
