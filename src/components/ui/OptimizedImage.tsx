'use client'

import React, { useState, useRef } from 'react'
import Image from 'next/image'
import { useDeviceDetection, getOptimalImageSize } from '@/hooks/useDeviceDetection'
import { useIntersectionObserver as useIntersection } from '@/hooks/useIntersectionObserver'

export interface OptimizedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  sizes?: string
  quality?: number
  placeholder?: 'blur' | 'empty'
  blurDataURL?: string
  fill?: boolean
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
  loading?: 'lazy' | 'eager'
  /** デバイスに応じた画像サイズの自動最適化 */
  autoOptimize?: boolean
  /** レスポンシブ画像の設定 */
  responsive?: boolean
  /** WebP対応の自動検出 */
  useWebP?: boolean
  /** 低品質画像プレースホルダー（LQIP）の使用 */
  useLQIP?: boolean
  /** プログレッシブ読み込みのハンドラー */
  onLoadStart?: () => void
  onLoadComplete?: () => void
  onError?: () => void
}

/**
 * パフォーマンス最適化されたレスポンシブ画像コンポーネント
 * デバイスに応じた最適な画像サイズとフォーマットを自動選択
 */
export default function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes,
  quality,
  placeholder = 'empty',
  blurDataURL,
  fill = false,
  objectFit = 'cover',
  loading = 'lazy',
  autoOptimize = true,
  responsive = true,
  useWebP = true,
  useLQIP = true,
  onLoadStart,
  onLoadComplete,
  onError,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [loadingState, setLoadingState] = useState<'idle' | 'loading' | 'loaded' | 'error'>('idle')
  
  const imageRef = useRef<HTMLDivElement | null>(null)
  const deviceInfo = useDeviceDetection()
  
  // Intersection Observer で遅延読み込みを制御
  const isIntersecting = useIntersection(imageRef, {
    threshold: 0.1,
    rootMargin: deviceInfo.isMobile ? '50px' : '100px'
  })

  // デバイス最適化された画像サイズを計算
  const getOptimizedDimensions = () => {
    if (!autoOptimize || (!width && !height)) {
      return { width, height, quality }
    }

    const optimized = getOptimalImageSize(deviceInfo)
    return {
      width: width || optimized.width,
      height: height || optimized.height,
      quality: quality || optimized.quality
    }
  }

  // レスポンシブ sizes 属性を生成
  const getResponsiveSizes = () => {
    if (sizes) return sizes
    if (!responsive) return undefined

    // デフォルトのレスポンシブ設定
    return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
  }

  // WebP サポートを検出
  const getOptimizedSrc = () => {
    if (!useWebP) return src
    
    // Next.js の自動WebP変換に依存
    // 実際の実装では、WebP対応を検出してsrcを変更する場合もある
    return src
  }

  // LQIP（Low Quality Image Placeholder）用の小さな画像を生成
  const getLQIPSrc = () => {
    if (!useLQIP || blurDataURL) return blurDataURL
    
    // 10x10の小さな画像を生成（実際の実装では事前生成が推奨）
    const canvas = document.createElement('canvas')
    canvas.width = 10
    canvas.height = 10
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.fillStyle = '#1a1a1a'
      ctx.fillRect(0, 0, 10, 10)
      return canvas.toDataURL()
    }
    return undefined
  }

  const optimizedDimensions = getOptimizedDimensions()
  const shouldLoad = priority || isIntersecting

  const handleLoadStart = () => {
    setLoadingState('loading')
    onLoadStart?.()
  }

  const handleLoadComplete = () => {
    setIsLoaded(true)
    setLoadingState('loaded')
    onLoadComplete?.()
  }

  const handleError = () => {
    setHasError(true)
    setLoadingState('error')
    onError?.()
  }

  // エラー時のフォールバック
  if (hasError) {
    return (
      <div 
        ref={imageRef}
        className={`bg-dark-700 flex items-center justify-center text-gray-400 ${className}`}
        style={{ 
          width: optimizedDimensions.width, 
          height: optimizedDimensions.height 
        }}
      >
        <span className="text-xs">画像を読み込めませんでした</span>
      </div>
    )
  }

  return (
    <div ref={imageRef} className={`relative overflow-hidden ${className}`}>
      {shouldLoad && (
        <>
          {/* メイン画像 */}
          <Image
            src={getOptimizedSrc()}
            alt={alt}
            width={optimizedDimensions.width}
            height={optimizedDimensions.height}
            fill={fill}
            sizes={getResponsiveSizes()}
            quality={optimizedDimensions.quality}
            priority={priority}
            loading={loading}
            placeholder={placeholder}
            blurDataURL={getLQIPSrc()}
            className={`
              transition-opacity duration-300
              ${isLoaded ? 'opacity-100' : 'opacity-0'}
              ${fill ? '' : 'w-full h-auto'}
            `.replace(/\s+/g, ' ').trim()}
            style={{
              objectFit: fill ? objectFit : undefined,
            }}
            onLoadStart={handleLoadStart}
            onLoad={handleLoadComplete}
            onError={handleError}
            {...props}
          />

          {/* ローディング表示 */}
          {loadingState === 'loading' && (
            <div className="absolute inset-0 bg-dark-700 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </>
      )}

      {/* Intersection Observer で監視するための要素 */}
      {!shouldLoad && (
        <div 
          className="bg-dark-700 animate-pulse"
          style={{ 
            width: optimizedDimensions.width, 
            height: optimizedDimensions.height 
          }}
        />
      )}
    </div>
  )
}

