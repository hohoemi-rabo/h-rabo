'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Float } from '@react-three/drei'
import * as THREE from 'three'

interface DataCrystalProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * データクリスタル - 知識とデータの結晶を表現する3Dオブジェクト
 * IT教育サービスのシンボルとして、学習の蓄積を視覚化
 */
export default function DataCrystal({ 
  position = [0, 0, 0],
  scale = 1 
}: DataCrystalProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const innerRef = useRef<THREE.Mesh>(null)
  const particlesRef = useRef<THREE.Points>(null)
  
  // 内部の光のパーティクル
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(30 * 3) // 30個のパーティクル
    for (let i = 0; i < 30; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.8
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.2
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.8
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    
    if (meshRef.current) {
      // ゆっくりとした回転
      meshRef.current.rotation.y = time * 0.2
      meshRef.current.rotation.x = Math.sin(time * 0.1) * 0.1
      
      // カラーシフト - HSLで虹色に変化
      const hue = (time * 30) % 360  // 30度/秒で色相が変化
      const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`)
      
      // メインメッシュのマテリアルの色を更新
      const material = meshRef.current.material as any
      if (material.color) {
        material.color = color
      }
    }
    
    if (innerRef.current) {
      // 内部構造の逆回転
      innerRef.current.rotation.y = -time * 0.3
      innerRef.current.rotation.z = time * 0.15
      
      // 内部構造も補色でカラーシフト
      const hue = ((time * 30) + 180) % 360  // メインと180度ずれた補色
      const color = new THREE.Color(`hsl(${hue}, 100%, 50%)`)
      
      const material = innerRef.current.material as THREE.MeshStandardMaterial
      if (material.color) {
        material.color = color
        material.emissive = color
      }
    }
    
    // パーティクルもカラーシフト
    if (particlesRef.current) {
      const hue = ((time * 30) + 90) % 360  // メインと90度ずれた色
      const color = new THREE.Color(`hsl(${hue}, 100%, 70%)`)
      
      const material = particlesRef.current.material as THREE.PointsMaterial
      if (material.color) {
        material.color = color
      }
    }
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group position={position} scale={scale}>
        {/* メインクリスタル - 八面体 */}
        <mesh ref={meshRef}>
          <octahedronGeometry args={[1.8, 0]} />
          <MeshTransmissionMaterial
            color="#00d4ff"
            thickness={0.3}
            roughness={0.15}
            transmission={0.95}
            ior={2.4}
            chromaticAberration={0.02}
            backside
            temporalDistortion={0.1}
            distortion={0.1}
            distortionScale={0.5}
          />
        </mesh>

        {/* 内部構造 - 小さい八面体 */}
        <mesh ref={innerRef} scale={0.5}>
          <octahedronGeometry args={[1.8, 0]} />
          <meshStandardMaterial
            color="#8b5cf6"
            emissive="#8b5cf6"
            emissiveIntensity={0.5}
            transparent
            opacity={0.3}
            wireframe
          />
        </mesh>

        {/* 内部パーティクル */}
        <points ref={particlesRef}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color="#ff0080"
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </points>

      </group>
    </Float>
  )
}