'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense, ReactNode } from 'react'

interface SceneProps {
  children: ReactNode
  camera?: {
    position: [number, number, number]
    fov?: number
  }
  className?: string
  fallback?: ReactNode
}

/**
 * 3Dシーンのベースコンポーネント
 * React Three Fiberのキャンバスをラップし、エラーハンドリングとパフォーマンス設定を提供
 */
export default function Scene({ 
  children, 
  camera = { position: [0, 0, 5], fov: 75 },
  className = '',
  fallback = null
}: SceneProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={camera}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]} // デバイスピクセル比を制限
        performance={{ min: 0.5 }} // パフォーマンス調整
        style={{ width: '100%', height: '100%' }} // 明示的なサイズ指定
      >
        <Suspense fallback={fallback}>
          {children}
        </Suspense>
      </Canvas>
    </div>
  )
}