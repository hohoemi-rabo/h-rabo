'use client'

import { OrbitControls } from '@react-three/drei'
import Scene from './Scene'
import FloatingObjects from './FloatingObjects'
import ParticleField from './ParticleField'
import CyberGrid from './CyberGrid'
import { use3DPerformance } from '@/hooks/use3DPerformance'

interface Hero3DProps {
  className?: string
  interactive?: boolean
}

/**
 * ヒーローセクション用の3Dシーン
 * パフォーマンスに応じて自動的に品質を調整
 */
export default function Hero3D({ 
  className = '',
  interactive = true 
}: Hero3DProps) {
  const { particleCount, objectCount, quality } = use3DPerformance()

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Scene
        camera={{ position: [0, 0, 10], fov: 60 }}
        className="w-full h-full"
      >
        {/* カメラコントロール */}
        {interactive && (
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.5}
            autoRotate
            autoRotateSpeed={0.5}
          />
        )}

        {/* ライティング */}
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#00d4ff" />
        <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />

        {/* 3Dオブジェクト */}
        {quality !== 'low' && (
          <FloatingObjects 
            count={objectCount} 
            spread={15}
            speed={1.5}
          />
        )}

        {/* パーティクル */}
        {particleCount > 0 && (
          <ParticleField 
            count={particleCount}
            spread={30}
            size={0.03}
          />
        )}

        {/* サイバーグリッド */}
        <CyberGrid 
          size={40}
          divisions={quality === 'high' ? 40 : 20}
          animated={quality !== 'low'}
        />

        {/* フォグ効果 */}
        <fog attach="fog" args={['#0a0a0a', 10, 50]} />
      </Scene>
    </div>
  )
}