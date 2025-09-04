'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, MeshTransmissionMaterial } from '@react-three/drei'
import * as THREE from 'three'

interface CrystalClusterProps {
  position?: [number, number, number]
  scale?: number
}

interface CrystalData {
  position: [number, number, number]
  rotation: [number, number, number]
  scale: [number, number, number]
  color: string
  speed: number
}

/**
 * 結晶クラスター - 複数の結晶が組み合わさった美しい形状
 * 各結晶が異なる速度で回転し、光を反射する
 */
export default function CrystalCluster({ 
  position = [0, 0, 0],
  scale = 1 
}: CrystalClusterProps) {
  const groupRef = useRef<THREE.Group>(null)
  const crystalsRef = useRef<THREE.Mesh[]>([])
  
  // 結晶の配置データ
  const crystals: CrystalData[] = useMemo(() => [
    // 中央の大きな結晶
    {
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      scale: [1, 2.5, 1],
      color: '#00d4ff',
      speed: 0.5
    },
    // 左上の結晶
    {
      position: [-1.2, 0.8, 0.3],
      rotation: [0.3, 0.5, -0.4],
      scale: [0.6, 1.8, 0.6],
      color: '#00ffff',
      speed: 0.7
    },
    // 右上の結晶
    {
      position: [1.0, 1.0, -0.2],
      rotation: [-0.2, -0.3, 0.5],
      scale: [0.5, 1.6, 0.5],
      color: '#40e0d0',
      speed: 0.6
    },
    // 左下の結晶
    {
      position: [-0.8, -0.9, 0.5],
      rotation: [0.4, -0.2, -0.3],
      scale: [0.7, 1.4, 0.7],
      color: '#00ced1',
      speed: 0.8
    },
    // 右下の結晶
    {
      position: [0.9, -0.7, -0.3],
      rotation: [-0.3, 0.4, 0.2],
      scale: [0.5, 1.5, 0.5],
      color: '#48d1cc',
      speed: 0.9
    },
    // 前面の小さな結晶
    {
      position: [0.3, -0.2, 1.2],
      rotation: [0.5, 0.1, -0.2],
      scale: [0.4, 1.0, 0.4],
      color: '#87ceeb',
      speed: 1.0
    },
    // 背面の結晶
    {
      position: [-0.2, 0.3, -1.0],
      rotation: [-0.1, -0.5, 0.3],
      scale: [0.45, 1.2, 0.45],
      color: '#5f9ea0',
      speed: 0.75
    }
  ], [])

  // 光る粒子のポジション
  const particlePositions = useMemo(() => {
    const positions = new Float32Array(50 * 3)
    for (let i = 0; i < 50; i++) {
      const radius = 2.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta) * (0.5 + Math.random() * 0.5)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * (0.5 + Math.random() * 0.5)
      positions[i * 3 + 2] = radius * Math.cos(phi) * (0.5 + Math.random() * 0.5)
    }
    return positions
  }, [])

  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    
    // グループ全体の回転
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1
    }
    
    // 各結晶の個別アニメーション
    crystalsRef.current.forEach((crystal, index) => {
      if (crystal) {
        const data = crystals[index]
        // 個別の振動
        crystal.rotation.x = data.rotation[0] + Math.sin(time * data.speed) * 0.1
        crystal.rotation.z = data.rotation[2] + Math.cos(time * data.speed * 0.7) * 0.1
        
        // 微妙な上下動
        crystal.position.y = data.position[1] + Math.sin(time * data.speed * 0.5) * 0.05
      }
    })
  })

  return (
    <Float
      speed={1}
      rotationIntensity={0.2}
      floatIntensity={0.3}
    >
      <group ref={groupRef} position={position} scale={scale}>
        
        {/* 結晶群 */}
        {crystals.map((crystal, index) => (
          <mesh
            key={index}
            ref={(el) => {
              if (el) crystalsRef.current[index] = el
            }}
            position={crystal.position}
            rotation={crystal.rotation}
            scale={crystal.scale}
          >
            <octahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial
              color={crystal.color}
              thickness={0.5}
              roughness={0.1}
              transmission={0.9}
              ior={2.4}
              chromaticAberration={0.03}
              backside
              temporalDistortion={0.05}
              distortion={0.2}
              distortionScale={0.3}
              attenuationColor={crystal.color}
              attenuationDistance={0.5}
            />
          </mesh>
        ))}

        {/* ベース台座（オプション） */}
        <mesh position={[0, -1.5, 0]}>
          <cylinderGeometry args={[2, 2.5, 0.3, 8]} />
          <meshStandardMaterial
            color="#1a1a2e"
            metalness={0.9}
            roughness={0.1}
            emissive="#00d4ff"
            emissiveIntensity={0.1}
          />
        </mesh>

        {/* エッジライト効果 */}
        {crystals.map((crystal, index) => (
          <lineSegments key={`edge-${index}`} position={crystal.position} scale={crystal.scale}>
            <edgesGeometry args={[new THREE.OctahedronGeometry(1, 0)]} />
            <lineBasicMaterial 
              color={crystal.color}
              transparent
              opacity={0.3}
              depthWrite={false}
            />
          </lineSegments>
        ))}

        {/* 浮遊する光の粒子 */}
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.02}
            color="#00ffff"
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>

        {/* 中央の光源エフェクト */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.8}
            depthWrite={false}
          />
        </mesh>
        
        {/* グロー効果 */}
        <mesh scale={3}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.05}
            side={THREE.BackSide}
            depthWrite={false}
          />
        </mesh>

      </group>
    </Float>
  )
}