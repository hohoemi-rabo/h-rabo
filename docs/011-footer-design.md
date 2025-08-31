# 011: フッターのサイバーデザイン実装

## 概要

フッター部分にサイバー感のあるデザインを実装し、サイト全体の統一感を完成させる

## 優先度

Medium

## 前提条件

- 008: UIコンポーネントライブラリ作成が完了していること

## Todoリスト

- [×] フッターレイアウトの再設計
  - [×] マルチカラムレイアウト
  - [×] 各セクションの明確な分離
  - [×] レスポンシブ対応
- [×] 会社情報セクション
  - [×] ロゴとキャッチコピー
  - [×] 連絡先情報のアイコン強化
  - [×] 営業時間の視覚的表現
- [×] ナビゲーションリンク
  - [×] フッター用ナビゲーション
  - [×] ホバーエフェクト
  - [×] カテゴリー別整理
- [×] SNS・外部リンク
  - [×] ソーシャルアイコンのネオンデザイン
  - [×] ポートフォリオリンク
  - [×] ホバー時のアニメーション
- [×] 著作権・法的情報
  - [×] コピーライト表示
  - [×] プライバシーポリシーリンク
  - [×] 利用規約リンク（必要に応じて）
- [×] フッター全体のエフェクト
  - [×] 上部境界線のグラデーション
  - [×] 背景のサイバーグリッド
  - [×] 微細なアニメーション

## 実装詳細

### フッターコンポーネント

```tsx
// components/layouts/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-dark-900 border-gradient-to-r from-neon-blue via-neon-purple to-neon-pink relative border-t">
      {/* 背景エフェクト */}
      <div className="cyber-grid absolute inset-0 opacity-10" />

      <div className="container relative mx-auto px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* 会社情報 */}
          <div className="space-y-4">
            <motion.div
              className="font-cyber neon-text text-2xl font-bold"
              whileHover={{ textShadow: '0 0 20px #00d4ff' }}
            >
              ほほ笑みラボ
            </motion.div>

            <p className="font-futura text-sm text-gray-300">ゆっくり、何度でも教えます！</p>

            <div className="space-y-2">
              <ContactItem icon={<LocationIcon />} text="〒395-0002 長野県飯田市上郷飯沼2640-1" />
              <ContactItem icon={<PhoneIcon />} text="090-5646-5670" />
              <ContactItem icon={<ClockIcon />} text="お問い合わせは随時対応" />
            </div>
          </div>

          {/* サービス */}
          <div className="space-y-4">
            <h3 className="font-cyber text-neon-purple text-lg font-semibold">サービス</h3>
            <ul className="space-y-2">
              {[
                'シニア向けレッスン',
                'ビジネスパーソン向け',
                '単発利用サービス',
                '出張サポート',
              ].map((item) => (
                <li key={item}>
                  <FooterLink text={item} />
                </li>
              ))}
            </ul>
          </div>

          {/* サイト情報 */}
          <div className="space-y-4">
            <h3 className="font-cyber text-neon-green text-lg font-semibold">サイト情報</h3>
            <ul className="space-y-2">
              {[
                { text: '講師紹介', href: '/about' },
                { text: 'ブログ', href: '/blog' },
                { text: 'よくある質問', href: '/faq' },
                { text: 'お問い合わせ', href: '/contact' },
              ].map((item) => (
                <li key={item.text}>
                  <FooterLink text={item.text} href={item.href} />
                </li>
              ))}
            </ul>
          </div>

          {/* 外部リンク */}
          <div className="space-y-4">
            <h3 className="font-cyber text-neon-pink text-lg font-semibold">外部リンク</h3>

            {/* ソーシャルアイコン */}
            <div className="flex space-x-4">
              <SocialIcon icon={<TwitterIcon />} href="#" color="neon-blue" />
              <SocialIcon icon={<FacebookIcon />} href="#" color="neon-purple" />
              <SocialIcon icon={<InstagramIcon />} href="#" color="neon-pink" />
            </div>

            <div className="space-y-2">
              <FooterLink text="講師ポートフォリオ" href="https://example-portfolio.com" external />
            </div>
          </div>
        </div>

        {/* 下部コピーライト */}
        <div className="border-dark-700 mt-12 border-t pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <p className="font-futura text-sm text-gray-400">
              © 2025 パソコン・スマホ ほほ笑みラボ. All rights reserved.
            </p>

            <div className="flex space-x-6">
              <FooterLink
                text="プライバシーポリシー"
                href="/privacy"
                className="hover:text-neon-blue text-sm text-gray-400"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

### フッターサブコンポーネント

```tsx
// components/ui/ContactItem.tsx
interface ContactItemProps {
  icon: React.ReactNode
  text: string
}

export default function ContactItem({ icon, text }: ContactItemProps) {
  return (
    <div className="flex items-center space-x-3">
      <div className="text-neon-blue">{icon}</div>
      <span className="font-futura text-sm text-gray-300">{text}</span>
    </div>
  )
}

// components/ui/FooterLink.tsx
interface FooterLinkProps {
  text: string
  href?: string
  external?: boolean
  className?: string
}

export default function FooterLink({
  text,
  href = '#',
  external = false,
  className = '',
}: FooterLinkProps) {
  return (
    <motion.a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`hover:text-neon-blue font-futura cursor-pointer text-sm text-gray-300 transition-colors duration-300 ${className} `}
      whileHover={{ x: 5 }}
    >
      {text}
      {external && <ExternalLinkIcon className="ml-1 inline h-3 w-3" />}
    </motion.a>
  )
}

// components/ui/SocialIcon.tsx
interface SocialIconProps {
  icon: React.ReactNode
  href: string
  color: 'neon-blue' | 'neon-purple' | 'neon-pink' | 'neon-green'
}

export default function SocialIcon({ icon, href, color }: SocialIconProps) {
  const colorClasses = {
    'neon-blue': 'hover:text-neon-blue hover:shadow-[0_0_15px_rgba(0,212,255,0.5)]',
    'neon-purple': 'hover:text-neon-purple hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]',
    'neon-pink': 'hover:text-neon-pink hover:shadow-[0_0_15px_rgba(255,0,128,0.5)]',
    'neon-green': 'hover:text-neon-green hover:shadow-[0_0_15px_rgba(0,255,136,0.5)]',
  }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex h-10 w-10 items-center justify-center rounded-full border border-gray-600 text-gray-400 transition-all duration-300 ${colorClasses[color]} `}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
    >
      {icon}
    </motion.a>
  )
}
```

## 完了条件

- フッターが4カラムレイアウトで整理されている
- 各セクションにサイバー感のあるデザインが適用されている
- ソーシャルアイコンがホバーでアニメーションする
- レスポンシブ対応が完了している
