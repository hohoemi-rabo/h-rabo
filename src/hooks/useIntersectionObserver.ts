'use client'

import { useState, useEffect, RefObject } from 'react'

export interface IntersectionObserverOptions extends IntersectionObserverInit {
  /** 一度表示されたら監視を停止する */
  once?: boolean
  /** 要素が完全に表示されるまで待つ */
  fullVisibility?: boolean
}

/**
 * Intersection Observer カスタムフック
 * 要素の表示状態を監視し、パフォーマンス最適化に使用
 */
export function useIntersectionObserver(
  ref: RefObject<Element | null>,
  options: IntersectionObserverOptions = {}
): boolean {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasBeenSeen, setHasBeenSeen] = useState(false)

  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = false,
    fullVisibility = false,
    ...otherOptions
  } = options

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // 一度見られていて、onceオプションが有効な場合は監視を停止
    if (once && hasBeenSeen) return

    const observerOptions: IntersectionObserverInit = {
      threshold: fullVisibility ? 1.0 : threshold,
      rootMargin,
      ...otherOptions
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        const intersecting = entry.isIntersecting
        
        setIsIntersecting(intersecting)
        
        if (intersecting && !hasBeenSeen) {
          setHasBeenSeen(true)
        }
      },
      observerOptions
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [ref, threshold, rootMargin, once, fullVisibility, hasBeenSeen, otherOptions])

  return once ? hasBeenSeen : isIntersecting
}

/**
 * 複数要素の Intersection Observer フック
 */
export function useIntersectionObserverMultiple(
  refs: RefObject<Element>[],
  options: IntersectionObserverOptions = {}
): boolean[] {
  const [intersections, setIntersections] = useState<boolean[]>(
    new Array(refs.length).fill(false)
  )

  const {
    threshold = 0.1,
    rootMargin = '50px',
    once = false,
    fullVisibility = false,
    ...otherOptions
  } = options

  useEffect(() => {
    const elements = refs.map(ref => ref.current).filter(Boolean)
    if (elements.length === 0) return

    const observerOptions: IntersectionObserverInit = {
      threshold: fullVisibility ? 1.0 : threshold,
      rootMargin,
      ...otherOptions
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = elements.indexOf(entry.target as Element)
          if (index !== -1) {
            setIntersections(prev => {
              const newState = [...prev]
              newState[index] = entry.isIntersecting
              return newState
            })
          }
        })
      },
      observerOptions
    )

    elements.forEach(element => {
      if (element) observer.observe(element)
    })

    return () => {
      observer.disconnect()
    }
  }, [refs, threshold, rootMargin, once, fullVisibility, otherOptions])

  return intersections
}

/**
 * パフォーマンス監視用のIntersection Observer
 * スクロール最適化や無限スクロール実装に使用
 */
export function useViewportObserver(
  ref: RefObject<Element>,
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) {
  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry)
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
        ...options
      }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [ref, callback, options])
}