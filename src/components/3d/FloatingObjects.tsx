'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface FloatingObjectsProps {
  count?: number
  spread?: number
  speed?: number
}

/**
 * 浮遊する幾何学的オブジェクトのコンポーネント
 * サイバー感のある透明感のあるマテリアルで表現
 */
export default function FloatingObjects({ 
  count = 8, 
  spread = 20,
  speed = 2 
}: FloatingObjectsProps) {
  const groupRef = useRef<THREE.Group>(null)

  // 複数のオブジェクトを生成
  const objects = useMemo(
    () =>
      Array.from({ length: count }, () => ({
        position: [
          (Math.random() - 0.5) * spread,
          (Math.random() - 0.5) * (spread / 2),
          (Math.random() - 0.5) * (spread / 2),
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI, 
          Math.random() * Math.PI, 
          Math.random() * Math.PI
        ] as [number, number, number],
        scale: Math.random() * 0.5 + 0.5,
        type: Math.floor(Math.random() * 3), // 0: cube, 1: sphere, 2: octahedron
        floatSpeed: speed + Math.random() * 2,
        color: ['#00d4ff', '#8b5cf6', '#ff0080'][Math.floor(Math.random() * 3)]
      })),
    [count, spread, speed]
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
          speed={obj.floatSpeed} 
          rotationIntensity={0.5} 
          floatIntensity={2}
        >
          <mesh 
            position={obj.position} 
            rotation={obj.rotation} 
            scale={obj.scale}
          >
            {obj.type === 0 && <boxGeometry args={[1, 1, 1]} />}
            {obj.type === 1 && <sphereGeometry args={[0.6, 32, 32]} />}
            {obj.type === 2 && <octahedronGeometry args={[0.7]} />}

            <MeshTransmissionMaterial
              color={obj.color}
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