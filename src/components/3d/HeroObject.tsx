'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import Scene from './Scene'
import DataCrystal from './DataCrystal'
import { use3DPerformance } from '@/hooks/use3DPerformance'

interface HeroObjectProps {
  className?: string
}

// カラーシフトする光源コンポーネント
function AnimatedLights() {
  const light1Ref = useRef<THREE.PointLight>(null)
  const light2Ref = useRef<THREE.PointLight>(null)
  
  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    
    // 光源1のカラーシフト
    if (light1Ref.current) {
      const hue = ((time * 40) + 120) % 360
      light1Ref.current.color = new THREE.Color(`hsl(${hue}, 100%, 50%)`)
    }
    
    // 光源2のカラーシフト
    if (light2Ref.current) {
      const hue = ((time * 40) + 240) % 360
      light2Ref.current.color = new THREE.Color(`hsl(${hue}, 100%, 50%)`)
    }
  })
  
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={0.8} 
        color="#ffffff"
        castShadow
      />
      <pointLight 
        ref={light1Ref}
        position={[-5, 5, -5]} 
        intensity={0.6} 
        color="#00d4ff" 
      />
      <pointLight 
        ref={light2Ref}
        position={[0, -5, 0]} 
        intensity={0.4} 
        color="#8b5cf6" 
      />
    </>
  )
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

        {/* カラーシフトするライティング */}
        <AnimatedLights />

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