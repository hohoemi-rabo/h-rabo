# 009: ヘッダー・ナビゲーションのサイバーデザイン

## 概要
未来感のあるヘッダーデザインとナビゲーションシステムを実装する

## 優先度
High

## 前提条件
- 007: デザインシステム・カラーパレット設定が完了していること
- 008: UIコンポーネントライブラリ作成が完了していること

## Todoリスト
- [ ] ヘッダーデザインの実装
  - [ ] サイバーグリッド背景
  - [ ] ネオンロゴデザイン
  - [ ] 透明度とブラー効果
  - [ ] スクロール時の動的変化
- [ ] ナビゲーションメニューの改良
  - [ ] ホバーエフェクト（グロウ効果）
  - [ ] アクティブ状態の表示
  - [ ] アンダーラインアニメーション
  - [ ] サブメニューのスタイリング
- [ ] モバイルメニューの高度化
  - [ ] サイドから出現するサイバーメニュー
  - [ ] メニューアイテムのアニメーション
  - [ ] ハンバーガーアイコンの変形アニメーション
  - [ ] 背景のオーバーレイ効果
- [ ] CTA（Call to Action）ボタン
  - [ ] 「お問い合わせ」ボタンのネオンデザイン
  - [ ] パルスアニメーション
  - [ ] ホバー時のエフェクト強化

## 実装詳細
### ヘッダーコンポーネント
```tsx
// components/layouts/Header.tsx
'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-dark-900/95 backdrop-blur-md border-b border-neon-blue/30' 
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100 }}
    >
      {/* サイバーグリッド背景 */}
      <div className="absolute inset-0 cyber-grid opacity-20"></div>
      
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* ロゴ */}
          <motion.div
            className="text-2xl font-cyber font-bold neon-text"
            whileHover={{ scale: 1.05, textShadow: '0 0 20px #00d4ff' }}
          >
            ほほ笑みラボ
          </motion.div>
          
          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map(item => (
              <NavItem key={item.href} {...item} />
            ))}
            <CTAButton />
          </div>
          
          {/* モバイルメニューボタン */}
          <HamburgerButton 
            isOpen={isMobileMenuOpen}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </nav>
      
      {/* モバイルメニュー */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </motion.header>
  )
}
```

### ナビゲーションアイテム
```tsx
// components/ui/NavItem.tsx
interface NavItemProps {
  href: string
  label: string
  isActive?: boolean
}

export default function NavItem({ href, label, isActive }: NavItemProps) {
  return (
    <motion.a
      href={href}
      className={`
        relative font-futura font-medium transition-all duration-300
        ${isActive ? 'text-neon-blue' : 'text-white hover:text-neon-blue'}
      `}
      whileHover={{ scale: 1.05 }}
    >
      {label}
      
      {/* アンダーラインアニメーション */}
      <motion.div
        className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-neon-blue to-neon-purple"
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        transition={{ duration: 0.3 }}
      />
      
      {/* ホバー時のグロウ効果 */}
      <motion.div
        className="absolute inset-0 rounded-lg"
        initial={{ opacity: 0 }}
        whileHover={{ 
          opacity: 0.2, 
          boxShadow: '0 0 20px rgba(0, 212, 255, 0.5)' 
        }}
      />
    </motion.a>
  )
}
```

### CTAボタン
```tsx
// components/ui/CTAButton.tsx
export default function CTAButton() {
  return (
    <motion.button
      className={`
        px-6 py-2 bg-gradient-to-r from-neon-pink to-neon-purple
        text-white font-cyber font-semibold rounded-lg
        shadow-neon hover:shadow-glow transition-all duration-300
        animate-pulse hover:animate-none
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      お問い合わせ
    </motion.button>
  )
}
```

### モバイルメニュー
```tsx
// components/ui/MobileMenu.tsx
interface MobileMenuProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  return (
    <>
      {/* オーバーレイ */}
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 md:hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
        onClick={onClose}
      />
      
      {/* メニューパネル */}
      <motion.div
        className={`
          fixed top-0 right-0 h-full w-80 bg-dark-900/95 backdrop-blur-md
          border-l border-neon-blue/30 z-50 md:hidden cyber-grid
        `}
        initial={{ x: '100%' }}
        animate={{ x: isOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 100 }}
      >
        <div className="p-6 pt-20">
          {menuItems.map((item, index) => (
            <motion.a
              key={item.href}
              href={item.href}
              className="block py-4 text-white hover:text-neon-blue transition-colors"
              initial={{ opacity: 0, x: 50 }}
              animate={{ 
                opacity: isOpen ? 1 : 0, 
                x: isOpen ? 0 : 50 
              }}
              transition={{ delay: index * 0.1 }}
              onClick={onClose}
            >
              {item.label}
            </motion.a>
          ))}
          
          <motion.div
            className="pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ delay: 0.5 }}
          >
            <CTAButton />
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
```

## 完了条件
- ヘッダーがサイバー感のあるデザインになっている
- ナビゲーションにホバーエフェクトが実装されている
- モバイルメニューがスムーズにアニメーションする
- スクロール時のヘッダー変化が動作する