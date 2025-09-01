/**
 * Framer Motion グローバルアニメーション設定
 * サイト全体で統一されたアニメーションを提供
 */

// 基本的なイージング関数
export const easing = {
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.175, 0.885, 0.32, 1.275] as const,
  easeOut: [0.4, 0, 0.2, 1] as const,
  easeIn: [0.4, 0, 1, 1] as const,
  easeInOut: [0.4, 0, 0.6, 1] as const,
}

// アニメーションのデュレーション
export const duration = {
  instant: 0.1,
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
  slower: 0.8,
  slowest: 1.2,
}

// スタガー（遅延）設定
export const stagger = {
  fast: 0.05,
  normal: 0.1,
  slow: 0.2,
  slower: 0.3,
}

// Spring アニメーション設定
export const spring = {
  gentle: { type: 'spring' as const, stiffness: 100, damping: 20 },
  bouncy: { type: 'spring' as const, stiffness: 400, damping: 10 },
  wobbly: { type: 'spring' as const, stiffness: 200, damping: 5 },
  stiff: { type: 'spring' as const, stiffness: 500, damping: 30 },
}

/**
 * 共通アニメーションバリアント
 */

// フェードイン + 上方向スライド
export const fadeInUp = {
  initial: {
    opacity: 0,
    y: 60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -60,
    transition: {
      duration: duration.fast,
      ease: easing.easeIn,
    },
  },
}

// フェードイン + 下方向スライド
export const fadeInDown = {
  initial: {
    opacity: 0,
    y: -60,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: 60,
    transition: {
      duration: duration.fast,
      ease: easing.easeIn,
    },
  },
}

// スケールイン
export const scaleIn = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.bounce,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: duration.fast,
    },
  },
}

// 左からスライドイン
export const slideInLeft = {
  initial: {
    opacity: 0,
    x: -100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    x: 100,
    transition: {
      duration: duration.fast,
    },
  },
}

// 右からスライドイン
export const slideInRight = {
  initial: {
    opacity: 0,
    x: 100,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: duration.slow,
      ease: easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: {
      duration: duration.fast,
    },
  },
}

// ローテートイン
export const rotateIn = {
  initial: {
    opacity: 0,
    rotate: -180,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      duration: duration.slow,
      ease: easing.elastic,
    },
  },
  exit: {
    opacity: 0,
    rotate: 180,
    scale: 0.5,
    transition: {
      duration: duration.normal,
    },
  },
}

// スタガーコンテナー用バリアント
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: stagger.normal,
      delayChildren: 0.2,
    },
  },
  exit: {
    transition: {
      staggerChildren: stagger.fast,
      staggerDirection: -1,
    },
  },
}

// スタガーアイテム用バリアント
export const staggerItem = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.smooth,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: duration.fast,
    },
  },
}

// パララックス効果用
export const parallax = {
  slow: { y: [0, -50] },
  normal: { y: [0, -100] },
  fast: { y: [0, -200] },
}

// グロウエフェクト
export const glow = {
  initial: {
    boxShadow: '0 0 0 rgba(0, 212, 255, 0)',
  },
  animate: {
    boxShadow: [
      '0 0 0 rgba(0, 212, 255, 0)',
      '0 0 20px rgba(0, 212, 255, 0.5)',
      '0 0 40px rgba(0, 212, 255, 0.3)',
      '0 0 0 rgba(0, 212, 255, 0)',
    ],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
}

// パルスエフェクト
export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [1, 0.8, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: easing.easeInOut,
    },
  },
}

// モーフィングパス用
export const morph = {
  initial: { pathLength: 0 },
  animate: {
    pathLength: 1,
    transition: {
      duration: 2,
      ease: easing.easeInOut,
    },
  },
}