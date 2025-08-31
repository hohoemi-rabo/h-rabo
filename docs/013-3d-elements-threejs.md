# 013: Three.js 3D要素の実装

## 概要
Three.jsを使用して印象的な3Dオブジェクトとサイバー空間を表現する

## 優先度
High

## 前提条件
- 001: プロジェクトセットアップが完了していること

## Todoリスト
- [ ] Three.js基本セットアップ
  - [ ] React Three Fiberの設定
  - [ ] @react-three/dreiの活用
  - [ ] パフォーマンス最適化設定
- [ ] ヒーロー用3Dオブジェクト
  - [ ] 浮遊する幾何学的オブジェクト
  - [ ] パーティクルシステム
  - [ ] 回転・浮遊アニメーション
  - [ ] マウス追従効果
- [ ] サイバー空間グリッド
  - [ ] 無限に続くグリッド背景
  - [ ] データフローの視覚化
  - [ ] パルス効果
- [ ] セクション別3D要素
  - [ ] サービスセクション用オブジェクト
  - [ ] 各セクションのアクセント3D
  - [ ] インタラクティブ要素
- [ ] パフォーマンス最適化
  - [ ] LOD（Level of Detail）実装
  - [ ] フラスタムカリング
  - [ ] オクルージョンカリング
  - [ ] モバイル端末での軽量化

## 実装詳細
### 基本セットアップ
```tsx
// components/3d/Scene.tsx
import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface SceneProps {
  children: React.ReactNode
  camera?: {
    position: [number, number, number]
    fov?: number
  }
}

export default function Scene({ 
  children, 
  camera = { position: [0, 0, 5], fov: 75 }
}: SceneProps) {
  return (
    <ErrorBoundary fallback={<div>3D Scene Error</div>}>
      <Canvas
        camera={camera}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance"
        }}
        dpr={[1, 2]} // デバイスピクセル比を制限
        performance={{ min: 0.5 }} // パフォーマンス調整
      >
        <Suspense fallback={null}>
          {children}
        </Suspense>
      </Canvas>
    </ErrorBoundary>
  )
}
```

### ヒーロー用フローティングオブジェクト
```tsx
// components/3d/FloatingObjects.tsx
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

export default function FloatingObjects() {
  const groupRef = useRef<THREE.Group>(null)
  
  // 複数のオブジェクトを生成
  const objects = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      position: [
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.5,
      type: Math.floor(Math.random() * 3) // 0: cube, 1: sphere, 2: octahedron
    })), []
  )
  
  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.05
    }
  })
  
  return (
    <group ref={groupRef}>
      {objects.map((obj, index) => (
        <Float
          key={index}
          speed={2 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={2}
        >
          <mesh
            position={obj.position}
            rotation={obj.rotation}
            scale={obj.scale}
          >
            {obj.type === 0 && <boxGeometry />}
            {obj.type === 1 && <sphereGeometry />}
            {obj.type === 2 && <octahedronGeometry />}
            
            <MeshTransmissionMaterial
              color="#00d4ff"
              thickness={0.5}
              roughness={0.1}
              transmission={0.9}
              ior={1.5}
              chromaticAberration={0.02}
              backside
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}
```

### パーティクルシステム
```tsx
// components/3d/ParticleField.tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function ParticleField({ count = 1000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)
  
  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    
    const color1 = new THREE.Color('#00d4ff')
    const color2 = new THREE.Color('#8b5cf6')
    const color3 = new THREE.Color('#ff0080')
    
    for (let i = 0; i < count; i++) {
      // ランダムな位置
      positions[i * 3] = (Math.random() - 0.5) * 50
      positions[i * 3 + 1] = (Math.random() - 0.5) * 50
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50
      
      // ランダムな色
      const colorChoice = Math.random()
      const selectedColor = colorChoice < 0.33 ? color1 : 
                           colorChoice < 0.66 ? color2 : color3
      
      colors[i * 3] = selectedColor.r
      colors[i * 3 + 1] = selectedColor.g
      colors[i * 3 + 2] = selectedColor.b
    }
    
    return [positions, colors]
  }, [count])
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * 0.02
    }
  })
  
  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}
```

### サイバーグリッド
```tsx
// components/3d/CyberGrid.tsx
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

export default function CyberGrid() {
  const gridRef = useRef<THREE.LineSegments>(null)
  
  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const size = 50
    const divisions = 50
    
    // 横線
    for (let i = 0; i <= divisions; i++) {
      const y = (i / divisions - 0.5) * size
      vertices.push(-size/2, y, 0, size/2, y, 0)
    }
    
    // 縦線
    for (let i = 0; i <= divisions; i++) {
      const x = (i / divisions - 0.5) * size
      vertices.push(x, -size/2, 0, x, size/2, 0)
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [])
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.1
    }
  })
  
  return (
    <lineSegments ref={gridRef} geometry={geometry}>
      <lineBasicMaterial 
        color="#00d4ff" 
        transparent 
        opacity={0.3}
      />
    </lineSegments>
  )
}
```

### インタラクティブ3Dオブジェクト
```tsx
// components/3d/InteractiveObject.tsx
import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveObjectProps {
  position: [number, number, number]
  text: string
  onClick?: () => void
}

export default function InteractiveObject({ 
  position, 
  text, 
  onClick 
}: InteractiveObjectProps) {
  const [hovered, setHovered] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.5
      meshRef.current.rotation.y = clock.elapsedTime * 0.3
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1)
    }
  })
  
  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
          color={hovered ? '#ff0080' : '#00d4ff'}
          transparent
          opacity={0.8}
          emissive={hovered ? '#ff0080' : '#00d4ff'}
          emissiveIntensity={0.2}
        />
      </mesh>
      
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </group>
  )
}
```

### パフォーマンス最適化フック
```tsx
// hooks/use3DPerformance.ts
import { useEffect, useState } from 'react'

export function use3DPerformance() {
  const [quality, setQuality] = useState<'high' | 'medium' | 'low'>('high')
  const [particleCount, setParticleCount] = useState(1000)
  
  useEffect(() => {
    const checkPerformance = () => {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl')
      
      if (!gl) {
        setQuality('low')
        setParticleCount(100)
        return
      }
      
      const isMobile = /Mobi|Android/i.test(navigator.userAgent)
      const hasLowMemory = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2
      
      if (isMobile || hasLowMemory) {
        setQuality('medium')
        setParticleCount(500)
      } else {
        setQuality('high')
        setParticleCount(1000)
      }
    }
    
    checkPerformance()
  }, [])
  
  return { quality, particleCount }
}
```

## 完了条件
- 3Dオブジェクトが正常にレンダリングされる
- パフォーマンスが各デバイスで最適化されている
- インタラクティブ要素が動作する
- モバイルでのフォールバック機能が実装されている