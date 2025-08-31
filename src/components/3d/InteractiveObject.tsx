'use client'

import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import * as THREE from 'three'

interface InteractiveObjectProps {
  position: [number, number, number]
  text: string
  onClick?: () => void
  color?: string
  hoverColor?: string
  size?: number
}

/**
 * インタラクティブな3Dオブジェクトコンポーネント
 * ホバーとクリックに反応する立方体オブジェクト
 */
export default function InteractiveObject({ 
  position, 
  text, 
  onClick,
  color = '#00d4ff',
  hoverColor = '#ff0080',
  size = 1
}: InteractiveObjectProps) {
  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = clock.elapsedTime * 0.5
      meshRef.current.rotation.y = clock.elapsedTime * 0.3
      
      const targetScale = hovered ? 1.2 : clicked ? 0.9 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.1
      )
    }
  })

  const handleClick = () => {
    setClicked(true)
    setTimeout(() => setClicked(false), 200)
    onClick?.()
  }

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation()
          setHovered(true)
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={(e) => {
          e.stopPropagation()
          setHovered(false)
          document.body.style.cursor = 'auto'
        }}
      >
        <boxGeometry args={[size, size, size]} />
        <meshStandardMaterial
          color={hovered ? hoverColor : color}
          transparent
          opacity={0.8}
          emissive={hovered ? hoverColor : color}
          emissiveIntensity={hovered ? 0.4 : 0.2}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      <Text
        position={[0, -size * 1.5, 0]}
        fontSize={size * 0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="/fonts/cyber-font.woff"
      >
        {text}
      </Text>
    </group>
  )
}