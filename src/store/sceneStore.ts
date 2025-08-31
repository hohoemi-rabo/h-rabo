import { create } from 'zustand'

export interface Section {
  id: string
  name: string
  position: [number, number, number]
  rotation: [number, number, number]
  transition: {
    type: 'rotate' | 'zoom' | 'slide' | 'fade'
    duration: number
    easing: string
  }
}

interface SceneState {
  currentSectionId: string
  previousSectionId: string | null
  isTransitioning: boolean
  transitionProgress: number
  sections: Section[]
  performanceMode: 'high' | 'medium' | 'low'
  inactiveSectionCache: Map<string, any>
  
  // Actions
  setCurrentSection: (sectionId: string) => void
  setTransitioning: (transitioning: boolean) => void
  setTransitionProgress: (progress: number) => void
  goToSection: (sectionId: string) => Promise<void>
  getNextSection: () => Section | null
  getPrevSection: () => Section | null
  getCurrentSection: () => Section | null
  getSectionByIndex: (index: number) => Section | null
  setPerformanceMode: (mode: 'high' | 'medium' | 'low') => void
  cleanupInactiveSections: () => void
  preloadSection: (sectionId: string) => void
}

export const useSceneStore = create<SceneState>((set, get) => ({
  currentSectionId: 'hero',
  previousSectionId: null,
  isTransitioning: false,
  transitionProgress: 0,
  performanceMode: 'high',
  inactiveSectionCache: new Map(),
  sections: [
    {
      id: 'hero',
      name: 'ホーム',
      position: [0, 0, 0],
      rotation: [0, 0, 0],
      transition: { type: 'fade', duration: 0.8, easing: 'spring' },
    },
    {
      id: 'about',
      name: '講師紹介',
      position: [-10, 0, -5],
      rotation: [0, Math.PI / 4, 0],
      transition: { type: 'rotate', duration: 1.0, easing: 'spring' },
    },
    {
      id: 'services',
      name: 'サービス',
      position: [0, -10, -8],
      rotation: [Math.PI / 6, 0, 0],
      transition: { type: 'slide', duration: 0.9, easing: 'spring' },
    },
    {
      id: 'voice',
      name: '生徒さんの声',
      position: [0, 0, -15],
      rotation: [0, 0, 0],
      transition: { type: 'zoom', duration: 1.2, easing: 'spring' },
    },
    {
      id: 'contact',
      name: 'お問い合わせ',
      position: [10, 0, -5],
      rotation: [0, -Math.PI / 4, 0],
      transition: { type: 'rotate', duration: 1.0, easing: 'spring' },
    },
  ],

  setCurrentSection: (sectionId) => 
    set((state) => ({ 
      previousSectionId: state.currentSectionId,
      currentSectionId: sectionId 
    })),
  
  setTransitioning: (transitioning) => set({ isTransitioning: transitioning }),
  
  setTransitionProgress: (progress) => set({ transitionProgress: progress }),

  goToSection: async (sectionId) => {
    const { sections, currentSectionId } = get()
    const targetSection = sections.find((s) => s.id === sectionId)

    if (!targetSection || currentSectionId === sectionId) return

    set({ 
      isTransitioning: true, 
      transitionProgress: 0,
      previousSectionId: currentSectionId
    })

    // トランジションアニメーションをトリガー
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        set({
          currentSectionId: sectionId,
          isTransitioning: false,
          transitionProgress: 1,
        })
        resolve()
      }, targetSection.transition.duration * 1000)
    })
  },

  getNextSection: () => {
    const { sections, currentSectionId } = get()
    const currentIndex = sections.findIndex((s) => s.id === currentSectionId)
    return sections[currentIndex + 1] || null
  },

  getPrevSection: () => {
    const { sections, currentSectionId } = get()
    const currentIndex = sections.findIndex((s) => s.id === currentSectionId)
    return sections[currentIndex - 1] || null
  },

  getCurrentSection: () => {
    const { sections, currentSectionId } = get()
    return sections.find((s) => s.id === currentSectionId) || null
  },

  getSectionByIndex: (index) => {
    const { sections } = get()
    return sections[index] || null
  },

  setPerformanceMode: (mode) => {
    set({ performanceMode: mode })
    
    // パフォーマンスモードに応じて遷移時間を調整
    const { sections } = get()
    const updatedSections = sections.map(section => ({
      ...section,
      transition: {
        ...section.transition,
        duration: mode === 'low' ? section.transition.duration * 0.5 
                 : mode === 'medium' ? section.transition.duration * 0.75
                 : section.transition.duration
      }
    }))
    
    set({ sections: updatedSections })
  },

  cleanupInactiveSections: () => {
    const { currentSectionId, inactiveSectionCache } = get()
    
    // 現在のセクションと隣接セクション以外のキャッシュをクリア
    const activeIds = new Set([
      currentSectionId,
      get().getNextSection()?.id,
      get().getPrevSection()?.id
    ].filter(Boolean))

    const newCache = new Map()
    for (const [id, data] of inactiveSectionCache) {
      if (activeIds.has(id)) {
        newCache.set(id, data)
      }
    }
    
    set({ inactiveSectionCache: newCache })
    
    // ガベージコレクションを促進
    if (window.gc) {
      window.gc()
    }
  },

  preloadSection: (sectionId) => {
    const { inactiveSectionCache } = get()
    
    if (!inactiveSectionCache.has(sectionId)) {
      // セクションデータの事前読み込み
      const section = get().sections.find(s => s.id === sectionId)
      if (section) {
        inactiveSectionCache.set(sectionId, {
          loaded: true,
          timestamp: Date.now()
        })
        set({ inactiveSectionCache })
      }
    }
  },
}))