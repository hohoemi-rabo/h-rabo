'use client'

import { useSceneStore } from '@/store/sceneStore'
import { useEffect, useCallback, useRef } from 'react'

/**
 * 3D空間ナビゲーションコントロール
 * キーボード、タッチジェスチャー、マウスホイールでのセクション遷移を制御
 */
export default function NavigationControls() {
  const { 
    currentSectionId, 
    goToSection, 
    getNextSection, 
    getPrevSection, 
    isTransitioning 
  } = useSceneStore()

  // キーボードナビゲーション
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (isTransitioning) return

    // モーダルやフォームが開いている時は無効にする
    if (event.target && (event.target as HTMLElement).tagName === 'INPUT') return
    if (event.target && (event.target as HTMLElement).tagName === 'TEXTAREA') return

    switch (event.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        event.preventDefault()
        const prevSection = getPrevSection()
        if (prevSection) goToSection(prevSection.id)
        break

      case 'ArrowRight':
      case 'ArrowDown':
      case ' ': // スペースキー
        event.preventDefault()
        const nextSection = getNextSection()
        if (nextSection) goToSection(nextSection.id)
        break

      case 'Home':
        event.preventDefault()
        goToSection('hero')
        break

      case 'End':
        event.preventDefault()
        goToSection('contact')
        break

      // 数字キーで直接遷移
      case '1':
        event.preventDefault()
        goToSection('hero')
        break
      case '2':
        event.preventDefault()
        goToSection('about')
        break
      case '3':
        event.preventDefault()
        goToSection('services')
        break
      case '4':
        event.preventDefault()
        goToSection('voice')
        break
      case '5':
        event.preventDefault()
        goToSection('contact')
        break
    }
  }, [isTransitioning, goToSection, getNextSection, getPrevSection])

  // タッチジェスチャー処理
  const handleTouchGesture = useCallback(() => {
    let startY = 0
    let startX = 0
    let startTime = 0

    const handleTouchStart = (event: TouchEvent) => {
      if (isTransitioning) return
      
      const touch = event.touches[0]
      startY = touch.clientY
      startX = touch.clientX
      startTime = Date.now()
    }

    const handleTouchEnd = (event: TouchEvent) => {
      if (isTransitioning) return

      const touch = event.changedTouches[0]
      const endY = touch.clientY
      const endX = touch.clientX
      const endTime = Date.now()

      const deltaY = startY - endY
      const deltaX = startX - endX
      const deltaTime = endTime - startTime

      // スワイプ速度と距離の閾値
      const minDistance = 50
      const maxTime = 500

      if (deltaTime > maxTime) return

      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      if (distance < minDistance) return

      // 縦スワイプを優先
      if (Math.abs(deltaY) > Math.abs(deltaX)) {
        if (deltaY > 0) {
          // 上スワイプ - 次のセクション
          const nextSection = getNextSection()
          if (nextSection) goToSection(nextSection.id)
        } else {
          // 下スワイプ - 前のセクション
          const prevSection = getPrevSection()
          if (prevSection) goToSection(prevSection.id)
        }
      }
    }

    return { handleTouchStart, handleTouchEnd }
  }, [isTransitioning, goToSection, getNextSection, getPrevSection])

  // マウスホイールナビゲーション用のthrottleRef
  const lastScrollTimeRef = useRef(0)

  // マウスホイールナビゲーション（オプション）
  const handleWheel = useCallback((event: WheelEvent) => {
    if (isTransitioning) return

    // スクロール速度制御のためのデバウンス
    const now = Date.now()
    const scrollThrottle = 800 // 800ms間隔

    if (now - lastScrollTimeRef.current > scrollThrottle) {
      lastScrollTimeRef.current = now

      if (event.deltaY > 0) {
        // 下スクロール - 次のセクション
        const nextSection = getNextSection()
        if (nextSection) {
          event.preventDefault()
          goToSection(nextSection.id)
        }
      } else {
        // 上スクロール - 前のセクション
        const prevSection = getPrevSection()
        if (prevSection) {
          event.preventDefault()
          goToSection(prevSection.id)
        }
      }
    }
  }, [isTransitioning, goToSection, getNextSection, getPrevSection])

  // イベントリスナーの設定
  useEffect(() => {
    // キーボード
    window.addEventListener('keydown', handleKeyPress)

    // タッチ
    const touchHandlers = handleTouchGesture()
    window.addEventListener('touchstart', touchHandlers.handleTouchStart, { passive: true })
    window.addEventListener('touchend', touchHandlers.handleTouchEnd, { passive: true })

    // マウスホイール
    window.addEventListener('wheel', handleWheel, { passive: false })

    return () => {
      window.removeEventListener('keydown', handleKeyPress)
      window.removeEventListener('touchstart', touchHandlers.handleTouchStart)
      window.removeEventListener('touchend', touchHandlers.handleTouchEnd)
      window.removeEventListener('wheel', handleWheel)
    }
  }, [handleKeyPress, handleTouchGesture, handleWheel])

  // このコンポーネントはUIを描画しない（制御のみ）
  return null
}