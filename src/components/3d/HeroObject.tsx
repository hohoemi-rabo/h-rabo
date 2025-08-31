'use client'

import { OrbitControls } from '@react-three/drei'
import Scene from './Scene'
import DataCrystal from './DataCrystal'
import { use3DPerformance } from '@/hooks/use3DPerformance'

interface HeroObjectProps {
  className?: string
}

/**
 * ヒーローセクション用のシンプルな3Dオブジェクト
 * Resendスタイルのミニマルなデザイン
 */
export default function HeroObject({ 
  className = ''
}: HeroObjectProps) {
  const { quality } = use3DPerformance()

  // 低品質モードでは3Dを表示しない
  if (quality === 'low') {
    return null
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Scene
        camera={{ position: [0, 0, 10], fov: 40 }}
        className="w-full h-full"
      >
        {/* 自動回転するコントロール */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
        />

        {/* ライティング - ソフトで美しい照明 */}
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={0.8} 
          color="#ffffff"
          castShadow
        />
        <pointLight 
          position={[-5, 5, -5]} 
          intensity={0.4} 
          color="#00d4ff" 
        />
        <pointLight 
          position={[0, -5, 0]} 
          intensity={0.2} 
          color="#8b5cf6" 
        />

        {/* メインオブジェクト - 中央に配置 */}
        <DataCrystal 
          position={[0, 0, 0]}
          scale={1.5}
        />

        {/* 薄いフォグで奥行き感を演出 */}
        <fog attach="fog" args={['#0a0a0a', 8, 15]} />
      </Scene>
    </div>
  )
}