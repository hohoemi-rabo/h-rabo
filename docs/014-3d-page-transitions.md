# 014: 革新的な3D空間ページ遷移システム

## 概要

縦スクロールではなく、3D空間での移動によるセクション切り替えを実装する

## 優先度

Very High

## 前提条件

- 001: プロジェクトセットアップが完了していること
- 013: Three.js 3D要素の実装が完了していること

## Todoリスト

- [ ] 3D遷移システムの基盤構築
  - [ ] セクション管理システム
  - [ ] 3D座標系での配置
  - [ ] カメラ制御システム
  - [ ] 状態管理（Zustand）
- [ ] セクション遷移アニメーション
  - [ ] 回転遷移（rotateY: -90° → 0° → 90°）
  - [ ] ズーム遷移（z軸移動）
  - [ ] フェード遷移（opacity + scale）
  - [ ] スライド遷移（x, y軸移動）
- [ ] ナビゲーション制御
  - [ ] メニューからの直接遷移
  - [ ] キーボードナビゲーション
  - [ ] マウスホイール制御（オプション）
  - [ ] タッチジェスチャー対応
- [ ] パフォーマンス最適化
  - [ ] GPU加速の活用
  - [ ] 非アクティブセクションの最適化
  - [ ] プリロード戦略
  - [ ] メモリ管理
- [ ] アクセシビリティ対応
  - [ ] motion-preferenceの検出
  - [ ] フォールバック実装
  - [ ] キーボードアクセシビリティ
  - [ ] スクリーンリーダー対応

## 実装詳細

### 3D遷移ストア（Zustand）

```typescript
// store/sceneStore.ts
import { create } from 'zustand'

export interface Section {
  id: string
  name: string
  position: [number, number, number]
  rotation: [number, number, number]
  transition: {
    type: 'rotate' | 'zoom' | 'slide' | 'fade'
    duration: number
    easing: string
  }
}

interface SceneState {
  currentSectionId: string
  isTransitioning: boolean
  transitionProgress: number
  sections: Section[]

  // Actions
  setCurrentSection: (sectionId: string) => void
  setTransitioning: (transitioning: boolean) => void
  setTransitionProgress: (progress: number) => void
  goToSection: (sectionId: string) => Promise<void>
  getNextSection: () => Section | null
  getPrevSection: () => Section | null
}

export const useSceneStore = create<SceneState>((set, get) => ({
  currentSectionId: 'hero',
  isTransitioning: false,
  transitionProgress: 0,
  sections: [
    {
      id: 'hero',
      name: 'ホーム',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      transition: { type: 'fade', duration: 0.8, easing: 'spring' },
    },
    {
      id: 'about',
      name: '講師紹介',
      position: [-10, 0, -5],
      rotation: [0, Math.PI / 4, 0],
      transition: { type: 'rotate', duration: 1.0, easing: 'spring' },
    },
    {
      id: 'services',
      name: 'サービス',
      position: [0, -10, -8],
      rotation: [Math.PI / 6, 0, 0],
      transition: { type: 'slide', duration: 0.9, easing: 'spring' },
    },
    {
      id: 'voice',
      name: '生徒さんの声',
      position: [0, 0, -15],
      rotation: [0, 0, 0],
      transition: { type: 'zoom', duration: 1.2, easing: 'spring' },
    },
    {
      id: 'contact',
      name: 'お問い合わせ',
      position: [10, 0, -5],
      rotation: [0, -Math.PI / 4, 0],
      transition: { type: 'rotate', duration: 1.0, easing: 'spring' },
    },
  ],

  setCurrentSection: (sectionId) => set({ currentSectionId: sectionId }),
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  setTransitionProgress: (progress) => set({ transitionProgress: progress }),

  goToSection: async (sectionId) => {
    const { sections, currentSectionId } = get()
    const targetSection = sections.find((s) => s.id === sectionId)

    if (!targetSection || currentSectionId === sectionId) return

    set({ isTransitioning: true, transitionProgress: 0 })

    // トランジションアニメーションをトリガー
    // 実際のアニメーションはFramer Motionで制御

    return new Promise((resolve) => {
      setTimeout(() => {
        set({
          currentSectionId: sectionId,
          isTransitioning: false,
          transitionProgress: 1,
        })
        resolve()
      }, targetSection.transition.duration * 1000)
    })
  },

  getNextSection: () => {
    const { sections, currentSectionId } = get()
    const currentIndex = sections.findIndex((s) => s.id === currentSectionId)
    return sections[currentIndex + 1] || null
  },

  getPrevSection: () => {
    const { sections, currentSectionId } = get()
    const currentIndex = sections.findIndex((s) => s.id === currentSectionId)
    return sections[currentIndex - 1] || null
  },
}))
```

### 3D遷移コンテナ

```tsx
// components/3d/TransitionContainer.tsx
import { motion } from 'framer-motion'
import { useSceneStore } from '@/store/sceneStore'
import { useEffect, useRef } from 'react'

interface TransitionContainerProps {
  sectionId: string
  children: React.ReactNode
}

export default function TransitionContainer({ sectionId, children }: TransitionContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { currentSectionId, isTransitioning, sections, transitionProgress } = useSceneStore()

  const section = sections.find((s) => s.id === sectionId)
  const isActive = currentSectionId === sectionId
  const isVisible = isActive || isTransitioning

  if (!section) return null

  // REQUIREMENTS.mdで定義された遷移設定
  const sectionTransitions = {
    initial: {
      rotateY: section.transition.type === 'rotate' ? -90 : 0,
      z: section.transition.type === 'zoom' ? -500 : 0,
      opacity: 0,
      scale: 0.8,
    },
    enter: {
      rotateY: 0,
      z: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20,
        duration: section.transition.duration,
      },
    },
    exit: {
      rotateY: section.transition.type === 'rotate' ? 90 : 0,
      z: section.transition.type === 'zoom' ? 500 : 0,
      opacity: 0,
      scale: section.transition.type === 'zoom' ? 1.2 : 0.8,
      transition: {
        duration: section.transition.duration * 0.6,
      },
    },
  }

  return (
    <motion.div
      ref={containerRef}
      className="absolute inset-0 h-full w-full"
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        pointerEvents: isActive ? 'auto' : 'none',
      }}
      initial="initial"
      animate={isActive ? 'enter' : 'exit'}
      variants={sectionTransitions}
      onAnimationComplete={() => {
        if (!isActive && containerRef.current) {
          containerRef.current.style.visibility = 'hidden'
        }
      }}
      onAnimationStart={() => {
        if (containerRef.current) {
          containerRef.current.style.visibility = 'visible'
        }
      }}
    >
      {/* セクション固有の3Dエフェクト */}
      <motion.div
        className="relative h-full w-full"
        animate={{
          rotateX: section.rotation[0],
          rotateY: section.rotation[1],
          rotateZ: section.rotation[2],
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        {children}
      </motion.div>

      {/* パーティクルエフェクト（遷移時） */}
      {isTransitioning && isActive && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: section.transition.duration }}
        >
          <TransitionParticles type={section.transition.type} />
        </motion.div>
      )}
    </motion.div>
  )
}
```

### 遷移効果別のパーティクル

```tsx
// components/3d/TransitionParticles.tsx
import { useMemo } from 'react'
import { motion } from 'framer-motion'

interface TransitionParticlesProps {
  type: 'rotate' | 'zoom' | 'slide' | 'fade'
}

export default function TransitionParticles({ type }: TransitionParticlesProps) {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: i * 0.02,
      })),
    []
  )

  const getParticleAnimation = (type: string, particle: any) => {
    switch (type) {
      case 'rotate':
        return {
          rotate: [0, 360],
          scale: [0, 1, 0],
          opacity: [0, 1, 0],
        }
      case 'zoom':
        return {
          scale: [0, 2, 0],
          opacity: [1, 0.5, 0],
          z: [0, 100, 0],
        }
      case 'slide':
        return {
          x: [particle.x - 50, particle.x + 50],
          opacity: [0, 1, 0],
        }
      default:
        return {
          opacity: [0, 1, 0],
          scale: [0.5, 1, 0.5],
        }
    }
  }

  return (
    <div className="absolute inset-0">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="bg-neon-blue shadow-neon absolute h-2 w-2 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={getParticleAnimation(type, particle)}
          transition={{
            duration: 1.5,
            delay: particle.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  )
}
```

### ナビゲーション制御

```tsx
// components/navigation/3DNavigationControls.tsx
import { useSceneStore } from '@/store/sceneStore'
import { useEffect } from 'react'

export default function NavigationControls() {
  const { currentSectionId, goToSection, getNextSection, getPrevSection, isTransitioning } =
    useSceneStore()

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (isTransitioning) return

      switch (event.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          const prevSection = getPrevSection()
          if (prevSection) goToSection(prevSection.id)
          break
        case 'ArrowRight':
        case 'ArrowDown':
          const nextSection = getNextSection()
          if (nextSection) goToSection(nextSection.id)
          break
        case 'Home':
          goToSection('hero')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isTransitioning])

  // タッチジェスチャー処理
  useEffect(() => {
    let startY = 0
    let endY = 0

    const handleTouchStart = (event: TouchEvent) => {
      startY = event.touches[0].clientY
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (isTransitioning) return

      endY = event.changedTouches[0].clientY
      const diff = startY - endY

      if (Math.abs(diff) > 50) {
        // 50pxより大きなスワイプ
        if (diff > 0) {
          // 上スワイプ - 次のセクション
          const nextSection = getNextSection()
          if (nextSection) goToSection(nextSection.id)
        } else {
          // 下スワイプ - 前のセクション
          const prevSection = getPrevSection()
          if (prevSection) goToSection(prevSection.id)
        }
      }
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isTransitioning])

  return null // このコンポーネントはUIを描画しない
}
```

### フォールバック対応

```tsx
// hooks/useMotionPreference.ts
import { useState, useEffect } from 'react'

export function useMotionPreference() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handler = () => setPrefersReducedMotion(mediaQuery.matches)
    mediaQuery.addEventListener('change', handler)

    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return prefersReducedMotion
}

// components/3d/MotionWrapper.tsx
export default function MotionWrapper({ children }: { children: React.ReactNode }) {
  const prefersReducedMotion = useMotionPreference()

  if (prefersReducedMotion) {
    // シンプルなフェード遷移にフォールバック
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )
  }

  return <>{children}</>
}
```

## 完了条件

- 5つのセクション間の3D遷移が動作する
- キーボードとタッチでのナビゲーションが機能する
- パフォーマンスが60fps以上で維持される
- アクセシビリティ対応が実装されている
- モバイル端末での最適化が完了している
