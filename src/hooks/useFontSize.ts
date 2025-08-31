'use client'

import { useState, useEffect } from 'react'

type FontSizeMode = 'normal' | 'large'

export function useFontSize() {
  const [fontSizeMode, setFontSizeMode] = useState<FontSizeMode>('normal')

  useEffect(() => {
    // ローカルストレージから設定を読み込み
    const saved = localStorage.getItem('fontSizeMode')
    if (saved === 'large' || saved === 'normal') {
      setFontSizeMode(saved)
    }
  }, [])

  useEffect(() => {
    // 設定をローカルストレージに保存
    localStorage.setItem('fontSizeMode', fontSizeMode)
    
    // HTMLのdata属性を更新してCSSで制御
    document.documentElement.setAttribute('data-font-size', fontSizeMode)
  }, [fontSizeMode])

  const toggleFontSize = () => {
    setFontSizeMode(prev => prev === 'normal' ? 'large' : 'normal')
  }

  return {
    fontSizeMode,
    setFontSizeMode,
    toggleFontSize,
    isLargeFont: fontSizeMode === 'large'
  }
}