'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useSceneStore } from '@/store/sceneStore'
import TransitionContainer from './TransitionContainer'
import TransitionParticles from './TransitionParticles'
import MotionWrapper, { AccessibleTransitionWrapper, KeyboardNavigationHint } from './MotionWrapper'
import NavigationControls from '@/components/navigation/NavigationControls'
import PerformanceMonitor from './PerformanceMonitor'
import { useMotionPreference } from '@/hooks/useMotionPreference'
import { usePerformanceOptimization, useBatteryOptimization } from '@/hooks/usePerformanceOptimization'

interface Scene3DContainerProps {
  children: {
    hero: ReactNode
    about: ReactNode
    services: ReactNode
    voice: ReactNode
    contact: ReactNode
  }
  className?: string
}

/**
 * 3D空間遷移システムのメインコンテナ
 * 全セクションを3D空間で管理し、革新的な遷移を提供
 */
export default function Scene3DContainer({ 
  children, 
  className = '' 
}: Scene3DContainerProps) {
  const { 
    currentSectionId, 
    isTransitioning, 
    sections, 
    getCurrentSection 
  } = useSceneStore()
  
  const { prefersReducedMotion } = useMotionPreference()
  const [showKeyboardHint, setShowKeyboardHint] = useState(false)
  const [mounted, setMounted] = useState(false)

  // パフォーマンス最適化フックを使用
  const { performanceMode, optimizePerformance } = usePerformanceOptimization()
  useBatteryOptimization()

  const currentSection = getCurrentSection()

  // クライアントサイドでのマウント確認
  useEffect(() => {
    setMounted(true)
    
    // キーボードヒントを初回のみ表示
    const hasSeenHint = localStorage.getItem('keyboardHintSeen')
    if (!hasSeenHint && !prefersReducedMotion) {
      setShowKeyboardHint(true)
      setTimeout(() => {
        setShowKeyboardHint(false)
        localStorage.setItem('keyboardHintSeen', 'true')
      }, 5000)
    }
  }, [prefersReducedMotion])

  // キーボードフォーカス管理
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '?' || e.key === 'h') {
        setShowKeyboardHint(!showKeyboardHint)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [showKeyboardHint])

  if (!mounted) {
    // SSR中は最初のセクションのみ表示
    return (
      <div className={className}>
        {children.hero}
      </div>
    )
  }

  // モーション軽減設定の場合はシンプル表示
  if (prefersReducedMotion) {
    const getCurrentContent = () => {
      switch (currentSectionId) {
        case 'hero': return children.hero
        case 'about': return children.about
        case 'services': return children.services
        case 'voice': return children.voice
        case 'contact': return children.contact
        default: return children.hero
      }
    }

    return (
      <div className={className}>
        <NavigationControls />
        <MotionWrapper>
          {getCurrentContent()}
        </MotionWrapper>
        <KeyboardNavigationHint isVisible={showKeyboardHint} />
      </div>
    )
  }

  return (
    <div 
      className={`relative w-full h-screen overflow-hidden ${className}`}
      style={{
        perspective: '1200px',
        transformStyle: 'preserve-3d',
      }}
      role="main"
      aria-label="3D Navigation Container"
    >
      {/* ナビゲーションコントロール */}
      <NavigationControls />

      {/* 遷移パーティクル（全体エフェクト） */}
      {isTransitioning && currentSection && (
        <div className="absolute inset-0 z-30 pointer-events-none">
          <TransitionParticles 
            type={currentSection.transition.type}
            isActive={true}
            duration={currentSection.transition.duration}
          />
        </div>
      )}

      {/* セクションコンテナ群 */}
      {sections.map((section) => {
        const sectionContent = children[section.id as keyof typeof children]
        if (!sectionContent) return null

        return (
          <TransitionContainer
            key={section.id}
            sectionId={section.id}
            className="z-10"
          >
            <AccessibleTransitionWrapper
              sectionId={section.id}
              isActive={currentSectionId === section.id}
            >
              <MotionWrapper>
                {sectionContent}
              </MotionWrapper>
            </AccessibleTransitionWrapper>
          </TransitionContainer>
        )
      })}

      {/* セクションインジケーター */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40">
        <div className="flex flex-col space-y-3">
          {sections.map((section, index) => (
            <button
              key={section.id}
              onClick={() => useSceneStore.getState().goToSection(section.id)}
              className={`
                w-3 h-3 rounded-full border transition-all duration-300
                ${currentSectionId === section.id 
                  ? 'bg-neon-blue border-neon-blue shadow-neon' 
                  : 'bg-transparent border-gray-600 hover:border-neon-blue/50'
                }
              `}
              aria-label={`Go to ${section.name}`}
              disabled={isTransitioning}
            />
          ))}
        </div>
      </div>

      {/* 進行状況インジケーター */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
        <div className="text-center text-gray-400 text-sm">
          <div className="mb-2">{currentSection?.name}</div>
          <div className="flex space-x-1">
            {sections.map((section, index) => (
              <div
                key={section.id}
                className={`
                  h-1 w-8 rounded transition-all duration-300
                  ${currentSectionId === section.id 
                    ? 'bg-neon-blue' 
                    : 'bg-gray-700'
                  }
                `}
              />
            ))}
          </div>
        </div>
      </div>

      {/* キーボードナビゲーションヒント */}
      <KeyboardNavigationHint isVisible={showKeyboardHint} />

      {/* パフォーマンスモニター */}
      <PerformanceMonitor />

      {/* ローディング中のオーバーレイ */}
      {isTransitioning && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-dark-900/20 backdrop-blur-[1px]" />
        </div>
      )}
    </div>
  )
}