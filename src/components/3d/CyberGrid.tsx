'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface CyberGridProps {
  size?: number
  divisions?: number
  color?: string
  animated?: boolean
}

/**
 * サイバー空間を表現するグリッドコンポーネント
 * TRONのようなデジタル空間を演出
 */
export default function CyberGrid({ 
  size = 50, 
  divisions = 50,
  color = '#00d4ff',
  animated = true
}: CyberGridProps) {
  const gridRef = useRef<THREE.LineSegments>(null)
  const gridRef2 = useRef<THREE.LineSegments>(null)

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = []
    const halfSize = size / 2

    // 横線
    for (let i = 0; i <= divisions; i++) {
      const y = (i / divisions - 0.5) * size
      vertices.push(-halfSize, y, 0, halfSize, y, 0)
    }

    // 縦線
    for (let i = 0; i <= divisions; i++) {
      const x = (i / divisions - 0.5) * size
      vertices.push(x, -halfSize, 0, x, halfSize, 0)
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [size, divisions])

  useFrame(({ clock }) => {
    if (!animated) return
    
    if (gridRef.current) {
      const material = gridRef.current.material as THREE.LineBasicMaterial
      material.opacity = 0.3 + Math.sin(clock.elapsedTime * 2) * 0.1
    }
    
    if (gridRef2.current) {
      const material = gridRef2.current.material as THREE.LineBasicMaterial
      material.opacity = 0.2 + Math.sin(clock.elapsedTime * 2 + Math.PI) * 0.1
    }
  })

  return (
    <group>
      {/* メイングリッド */}
      <lineSegments ref={gridRef} geometry={geometry} rotation={[Math.PI / 2, 0, 0]}>
        <lineBasicMaterial 
          color={color} 
          transparent 
          opacity={0.3}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      
      {/* 追加グリッド（縦方向） */}
      <lineSegments ref={gridRef2} geometry={geometry} position={[0, 0, -size/4]}>
        <lineBasicMaterial 
          color={color} 
          transparent 
          opacity={0.2}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
    </group>
  )
}