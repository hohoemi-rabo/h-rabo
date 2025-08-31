'use client'

import { useFontSize } from '@/hooks/useFontSize'

export default function FontSizeToggle() {
  const { fontSizeMode, toggleFontSize } = useFontSize()

  return (
    <button
      onClick={toggleFontSize}
      className="fixed bottom-4 right-4 z-40 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={fontSizeMode === 'normal' ? '文字を大きくする' : '文字を小さくする'}
      title={fontSizeMode === 'normal' ? '文字を大きくする' : '文字を小さくする'}
    >
      <div className="flex items-center space-x-1">
        <span className="text-xs">A</span>
        <span className="text-base">A</span>
      </div>
    </button>
  )
}