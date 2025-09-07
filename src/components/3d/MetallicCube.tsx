'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

interface MetallicCubeProps {
  position?: [number, number, number]
  scale?: number
}

/**
 * メタリックキューブ - ルービックキューブ風の3Dオブジェクト
 * IT教育のロジカル思考を表現するメタリックキューブ
 */
export default function MetallicCube({ 
  position = [0, 0, 0],
  scale = 1 
}: MetallicCubeProps) {
  const groupRef = useRef<THREE.Group>(null)
  const cubesRef = useRef<THREE.Mesh[]>([])
  
  // 3x3x3のキューブ配置データを生成
  const cubeData = useMemo(() => {
    const cubes = []
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          cubes.push({
            position: [x * 0.6, y * 0.6, z * 0.6] as [number, number, number],
            id: `${x}-${y}-${z}`,
            initialRotation: [0, 0, 0] as [number, number, number],
            // 各軸の回転速度をランダム化
            rotationSpeed: {
              x: (Math.random() - 0.5) * 1.2, // 元の速度に戻す
              y: (Math.random() - 0.5) * 1.2,
              z: (Math.random() - 0.5) * 1.2
            },
            // 回転の位相オフセット（タイミングのズレ）
            phaseOffset: Math.random() * Math.PI * 2
          })
        }
      }
    }
    return cubes
  }, [])


  useFrame(({ clock }) => {
    const time = clock.elapsedTime
    
    if (groupRef.current) {
      // ランダムな回転 - 複数軸で異なる速度
      groupRef.current.rotation.x = time * 0.3 // X軸周りに回転
      groupRef.current.rotation.y = time * 0.5 // Y軸周りに回転
      groupRef.current.rotation.z = time * 0.2 // Z軸周りに回転
    }
    
    // 色変化のみ保持
    cubesRef.current.forEach((cube, index) => {
      if (cube && cubeData[index]) {
        // カラーシフト - メタリック感を保ちながら色変化
        const hue = (time * 20 + index * 13.7) % 360
        const material = cube.material as THREE.MeshStandardMaterial
        if (material) {
          material.color = new THREE.Color(`hsl(${hue}, 80%, 60%)`)
          material.emissive = new THREE.Color(`hsl(${hue}, 100%, 10%)`)
        }
      }
    })
  })

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.1}
      floatIntensity={0.3}
    >
      <group ref={groupRef} position={position} scale={scale}>
        
        {/* ライティング */}
        <ambientLight intensity={0.4} color="#ffffff" />
        <pointLight 
          position={[3, 3, 3]} 
          intensity={1.2} 
          color="#ffffff"
          distance={8}
          decay={2}
        />
        <pointLight 
          position={[-2, -1, 2]} 
          intensity={0.8} 
          color="#00d4ff"
          distance={6}
          decay={2}
        />
        
        {/* 3x3x3キューブ配置 - 角丸キューブ */}
        {cubeData.map((cubeInfo, index) => (
          <RoundedBox
            key={cubeInfo.id}
            ref={(el) => {
              if (el) cubesRef.current[index] = el
            }}
            position={cubeInfo.position}
            rotation={cubeInfo.initialRotation}
            args={[0.58, 0.58, 0.58]} // width, height, depth
            radius={0.05} // 角の丸み
            smoothness={4} // 滑らかさ
          >
            <meshStandardMaterial
              color="#4a9eff"
              metalness={0.9}
              roughness={0.1}
              emissive="#001122"
              emissiveIntensity={0.1}
            />
          </RoundedBox>
        ))}
        
        {/* 中央コア */}
        <mesh>
          <sphereGeometry args={[0.2, 16, 16]} />
          <meshStandardMaterial
            color="#ff4a4a"
            metalness={1.0}
            roughness={0.0}
            emissive="#220000"
            emissiveIntensity={0.3}
          />
        </mesh>
        
      </group>
    </Float>
  )
}