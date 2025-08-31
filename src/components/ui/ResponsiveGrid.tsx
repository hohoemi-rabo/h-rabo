'use client'

import React from 'react'

export interface ResponsiveGridProps {
  children: React.ReactNode
  cols?: {
    xs?: number // < 475px
    sm?: number // ≥ 640px  
    md?: number // ≥ 768px
    'md-lg'?: number // ≥ 896px
    lg?: number // ≥ 1024px
    xl?: number // ≥ 1280px
    '2xl'?: number // ≥ 1536px
  }
  gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  alignItems?: 'start' | 'center' | 'end' | 'stretch'
}

/**
 * 高度なレスポンシブグリッドコンポーネント
 * 詳細なブレークポイント制御とギャップ管理
 */
export default function ResponsiveGrid({
  children,
  cols = { xs: 1, sm: 2, lg: 3 },
  gap = 'md',
  className = '',
  alignItems = 'stretch',
}: ResponsiveGridProps) {
  // グリッドカラム数のクラス生成
  const generateGridCols = () => {
    const classes = []
    
    if (cols.xs) classes.push(`grid-cols-${cols.xs}`)
    if (cols.sm) classes.push(`sm:grid-cols-${cols.sm}`)
    if (cols.md) classes.push(`md:grid-cols-${cols.md}`)
    if (cols['md-lg']) classes.push(`md-lg:grid-cols-${cols['md-lg']}`)
    if (cols.lg) classes.push(`lg:grid-cols-${cols.lg}`)
    if (cols.xl) classes.push(`xl:grid-cols-${cols.xl}`)
    if (cols['2xl']) classes.push(`2xl:grid-cols-${cols['2xl']}`)
    
    return classes.join(' ')
  }

  // ギャップサイズのマッピング
  const gapClasses = {
    xs: 'gap-2', // 8px
    sm: 'gap-4', // 16px
    md: 'gap-6', // 24px
    lg: 'gap-8', // 32px
    xl: 'gap-12', // 48px
  }

  // アライメントクラス
  const alignmentClasses = {
    start: 'items-start',
    center: 'items-center', 
    end: 'items-end',
    stretch: 'items-stretch',
  }

  const gridClasses = [
    'grid',
    generateGridCols(),
    gapClasses[gap],
    alignmentClasses[alignItems],
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={gridClasses}>
      {children}
    </div>
  )
}