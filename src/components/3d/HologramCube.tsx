'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, Box, Edges } from '@react-three/drei'
import * as THREE from 'three'

interface HologramCubeProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * ホログラムキューブ - 半透明で輝くサイバー感のあるボックス
 * エッジが光り、内部にデータグリッドが浮遊するエフェクト
 */
export default function HologramCube({ 
  position = [0, 0, 0],
  scale = 1 
}: HologramCubeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const edgeRef = useRef<THREE.LineSegments>(null)
  
  // 内部グリッドのポイント
  const gridPoints = useMemo(() => {
    const points = []
    const gridSize = 3
    const step = 0.6
    
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let y = -gridSize; y <= gridSize; y++) {
        for (let z = -gridSize; z <= gridSize; z++) {
          points.push(x * step, y * step, z * step)
        }
      }
    }
    
    return new Float32Array(points)
  }, [])

  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    
    if (meshRef.current) {
      // メインキューブの回転
      meshRef.current.rotation.x = time * 0.1
      meshRef.current.rotation.y = time * 0.15
      
      // パルス効果
      const pulse = Math.sin(time * 2) * 0.05 + 1
      meshRef.current.scale.setScalar(scale * pulse)
    }
    
    if (innerRef.current) {
      // 内部キューブの逆回転
      innerRef.current.rotation.x = -time * 0.2
      innerRef.current.rotation.y = -time * 0.3
    }
    
    if (edgeRef.current && edgeRef.current.material) {
      // エッジの輝度アニメーション
      const material = edgeRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.8 + Math.sin(time * 3) * 0.2
    }
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.3}
      floatIntensity={0.4}
    >
      <group position={position}>
        
        {/* メインホログラムキューブ */}
        <mesh ref={meshRef}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshPhysicalMaterial
            color="#00d4ff"
            transmission={0.9}
            opacity={0.2}
            transparent
            roughness={0}
            metalness={0.1}
            clearcoat={1}
            clearcoatRoughness={0}
            ior={1.5}
            thickness={0.5}
            attenuationColor="#00d4ff"
            attenuationDistance={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>

        {/* 光るエッジ */}
        <lineSegments ref={edgeRef}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.5, 2.5, 2.5)]} />
          <lineBasicMaterial 
            color="#00ffff" 
            linewidth={2}
            transparent
            opacity={0.8}
          />
        </lineSegments>

        {/* 内部の小さいキューブ */}
        <mesh ref={innerRef} scale={0.6}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={0.15}
            wireframe
          />
        </mesh>

        {/* 追加の光るエッジ（内側） */}
        <lineSegments scale={0.6}>
          <edgesGeometry args={[new THREE.BoxGeometry(2.5, 2.5, 2.5)]} />
          <lineBasicMaterial 
            color="#ff00ff" 
            transparent
            opacity={0.5}
          />
        </lineSegments>

        {/* 内部のデータポイント */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[gridPoints, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.03}
            color="#00ffff"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* グロー効果のための追加メッシュ */}
        <mesh scale={1.1}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
          />
        </mesh>
        
        {/* さらに外側のグロー */}
        <mesh scale={1.3}>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshBasicMaterial
            color="#00ffff"
            transparent
            opacity={0.02}
            side={THREE.BackSide}
          />
        </mesh>

      </group>
    </Float>
  )
}