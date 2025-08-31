'use client'

import React from 'react'

export interface ResponsiveContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  className?: string
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

/**
 * 高度なレスポンシブコンテナコンポーネント
 * デバイスサイズに応じて最適なコンテナ幅とパディングを提供
 */
export default function ResponsiveContainer({
  children,
  size = 'lg',
  className = '',
  padding = 'md',
}: ResponsiveContainerProps) {
  const sizeClasses = {
    sm: 'max-w-2xl', // 672px - 小さなコンテンツ
    md: 'max-w-4xl', // 896px - 標準的なコンテンツ
    lg: 'max-w-6xl', // 1152px - 大きなコンテンツ（デフォルト）
    xl: 'max-w-7xl', // 1280px - 最大幅
    full: 'max-w-none', // 制限なし
  }

  const paddingClasses = {
    none: 'px-0',
    sm: 'px-4 sm:px-6',
    md: 'px-4 sm:px-6 lg:px-8',
    lg: 'px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16',
  }

  return (
    <div 
      className={`
        ${sizeClasses[size]} 
        ${paddingClasses[padding]} 
        mx-auto 
        ${className}
      `.replace(/\s+/g, ' ').trim()}
    >
      {children}
    </div>
  )
}