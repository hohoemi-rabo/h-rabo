/**
 * 動的インポート用のラッパーコンポーネント
 * パフォーマンス最適化のため、重いコンポーネントを遅延読み込み
 */

import dynamic from 'next/dynamic'

// パーティクルネットワークエフェクトの遅延読み込み
export const LazyParticleNetwork = dynamic(
  () => import('@/components/effects/ParticleNetwork'),
  {
    loading: () => <div className="bg-dark-900 h-full animate-pulse" />,
    ssr: false,
  }
)

// 動的背景エフェクトの遅延読み込み
export const LazyDynamicBackground = dynamic(
  () => import('@/components/effects/DynamicBackground'),
  {
    loading: () => <div className="bg-gradient-to-br from-gray-900 to-gray-800 h-full" />,
    ssr: false,
  }
)

// ノイズオーバーレイの遅延読み込み（NoiseOverlayコンポーネントがある場合）
export const LazyNoiseOverlay = dynamic(
  () => import('@/components/effects/DynamicBackground').then(mod => ({ default: mod.NoiseOverlay })),
  {
    loading: () => null,
    ssr: false,
  }
)

// アンビエントライトの遅延読み込み
export const LazyAmbientLight = dynamic(
  () => import('@/components/effects/DynamicBackground').then(mod => ({ default: mod.AmbientLight })),
  {
    loading: () => null,
    ssr: false,
  }
)

// パフォーマンスモニターの遅延読み込み（開発環境のみ）
export const LazyPerformanceMonitor = dynamic(
  () => import('@/components/effects/PerformanceMonitor'),
  {
    loading: () => null,
    ssr: false,
  }
)

// グリッチテキストエフェクトの遅延読み込み
export const LazyGlitchText = dynamic(
  () => import('@/components/effects/GlitchText'),
  {
    loading: () => <span className="text-white">Loading...</span>,
    ssr: false,
  }
)

// マグネティックボタンの遅延読み込み
export const LazyMagneticButton = dynamic(
  () => import('@/components/effects/MagneticButton'),
  {
    loading: () => (
      <button className="px-6 py-3 bg-gray-700 text-white rounded-lg animate-pulse">
        Loading...
      </button>
    ),
    ssr: false,
  }
)

