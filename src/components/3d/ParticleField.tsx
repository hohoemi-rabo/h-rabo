'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  spread?: number
  size?: number
  speed?: number
}

/**
 * パーティクルフィールドコンポーネント
 * ネオンカラーの粒子が浮遊する空間を表現
 */
export default function ParticleField({ 
  count = 1000,
  spread = 50,
  size = 0.05,
  speed = 0.02
}: ParticleFieldProps) {
  const meshRef = useRef<THREE.Points>(null)

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)

    const color1 = new THREE.Color('#00d4ff')
    const color2 = new THREE.Color('#8b5cf6')
    const color3 = new THREE.Color('#ff0080')

    for (let i = 0; i < count; i++) {
      // ランダムな位置
      positions[i * 3] = (Math.random() - 0.5) * spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread

      // ランダムな色
      const colorChoice = Math.random()
      const selectedColor = colorChoice < 0.33 ? color1 : colorChoice < 0.66 ? color2 : color3

      colors[i * 3] = selectedColor.r
      colors[i * 3 + 1] = selectedColor.g
      colors[i * 3 + 2] = selectedColor.b
    }

    return [positions, colors]
  }, [count, spread])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.elapsedTime * speed
      meshRef.current.rotation.x = clock.elapsedTime * speed * 0.5
    }
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute 
          attach="attributes-color" 
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={size} 
        vertexColors 
        transparent 
        opacity={0.8} 
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}