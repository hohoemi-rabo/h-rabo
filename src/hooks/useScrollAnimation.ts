'use client'

import { useScroll, useTransform, MotionValue, useInView } from 'framer-motion'
import { useRef, RefObject } from 'react'

/**
 * スクロール連動アニメーション用カスタムフック
 */
export function useScrollAnimation() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  // Y軸のパララックス効果
  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const yReverse = useTransform(scrollYProgress, [0, 1], [-100, 100])
  
  // 透明度の変化
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0])
  const fadeIn = useTransform(scrollYProgress, [0, 0.5], [0, 1])
  const fadeOut = useTransform(scrollYProgress, [0.5, 1], [1, 0])
  
  // スケールの変化
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
  const scaleUp = useTransform(scrollYProgress, [0, 1], [0.5, 1.2])
  const scaleDown = useTransform(scrollYProgress, [0, 1], [1.2, 0.8])
  
  // 回転
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])
  const rotateReverse = useTransform(scrollYProgress, [0, 1], [360, 0])

  // X軸の移動
  const x = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const xReverse = useTransform(scrollYProgress, [0, 1], [100, -100])

  return {
    ref,
    scrollYProgress,
    // 位置
    y,
    yReverse,
    x,
    xReverse,
    // 透明度
    opacity,
    fadeIn,
    fadeOut,
    // スケール
    scale,
    scaleUp,
    scaleDown,
    // 回転
    rotate,
    rotateReverse,
  }
}

/**
 * パララックス効果用フック
 */
export function useParallax(speed: number = 0.5) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [100 * speed, -100 * speed]
  )

  return { ref, y, scrollYProgress }
}

/**
 * セクションごとのスクロールプログレス
 */
export function useSectionProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start center', 'end center'],
  })

  // 0-100%のプログレス値
  const progress = useTransform(scrollYProgress, [0, 1], [0, 100])
  
  // セクション内での位置判定
  const isEntering = useTransform(scrollYProgress, (value) => value > 0 && value < 0.3)
  const isInView = useTransform(scrollYProgress, (value) => value >= 0.3 && value <= 0.7)
  const isLeaving = useTransform(scrollYProgress, (value) => value > 0.7 && value < 1)

  return {
    ref,
    progress,
    isEntering,
    isInView,
    isLeaving,
    scrollYProgress,
  }
}

/**
 * スクロールによるテキストハイライト
 */
export function useTextHighlight() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 80%', 'start 20%'],
  })

  // グラデーション位置の計算
  const gradientPosition = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '100%']
  )

  return {
    ref,
    gradientPosition,
    scrollYProgress,
  }
}

/**
 * 要素の可視性を検出
 */
export function useElementInView(
  options?: {
    once?: boolean
    margin?: string
    amount?: number | 'some' | 'all'
  }
) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, {
    once: options?.once ?? false,
    margin: options?.margin ?? '0px' as any,
    amount: options?.amount ?? 0.5,
  })

  return { ref, isInView }
}

/**
 * スクロール速度を検出
 */
export function useScrollVelocity() {
  const { scrollY } = useScroll()
  const scrollVelocity = useTransform(scrollY, (current) => {
    const prev = scrollY.getPrevious() ?? 0
    return current - prev
  })

  // スクロール方向
  const scrollDirection = useTransform(scrollVelocity, (velocity) => {
    if (velocity > 0) return 'down'
    if (velocity < 0) return 'up'
    return 'idle'
  })

  return {
    scrollY,
    scrollVelocity,
    scrollDirection,
  }
}

/**
 * カスタムスクロールスナップ
 */
export function useScrollSnap(sections: RefObject<HTMLElement>[]) {
  const { scrollY } = useScroll()

  const snapToSection = (index: number) => {
    const section = sections[index]?.current
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const getCurrentSection = (yPosition: number): number => {
    let currentIndex = 0
    sections.forEach((section, index) => {
      if (section.current) {
        const rect = section.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight / 2) {
          currentIndex = index
        }
      }
    })
    return currentIndex
  }

  return {
    scrollY,
    snapToSection,
    getCurrentSection,
  }
}