# 010: 各セクションのサイバーデザイン実装

## 概要

各セクションにサイバー・未来感のあるデザインを適用し、視覚的なインパクトを強化する

## 優先度

High

## 前提条件

- 008: UIコンポーネントライブラリ作成が完了していること
- 004: セクションコンポーネントの基本実装が完了していること

## Todoリスト

- [×] ヒーローセクションの高度化
  - [×] 大胆なタイポグラフィ
  - [×] グラデーション背景
  - [×] パーティクル効果の準備
  - [×] CTA部分の強化
- [×] サービスセクションのカードデザイン
  - [×] ネオン枠線のサービスカード
  - [×] ホバー時の3D効果
  - [×] アイコンのグロウエフェクト
  - [×] 料金表示の強調
- [×] 講師紹介セクション
  - [×] プロフィール画像のサイバー枠
  - [×] スキルセットの視覚的表現
  - [×] 経歴のタイムライン風デザイン
- [×] 生徒さんの声セクション
  - [×] 未来感のある口コミカード
  - [×] 評価星のカスタムデザイン
  - [×] カードのフローティング効果
- [×] お知らせセクション
  - [×] ニュースカードのサイバーデザイン
  - [×] 日付表示の強調
  - [×] 「NEW」バッジのアニメーション
- [×] アクセス情報セクション
  - [×] マップエリアのサイバー枠
  - [×] 連絡先情報のアイコン強化
  - [×] 営業時間の視覚的表現

## 実装詳細

### ヒーローセクション

```tsx
// components/features/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* 背景グラデーション */}
      <div className="from-dark-900 via-dark-800 to-dark-900 absolute inset-0 bg-gradient-to-br" />

      {/* サイバーグリッド */}
      <div className="cyber-grid absolute inset-0 opacity-30" />

      {/* パーティクル効果コンテナ */}
      <div className="absolute inset-0" id="particles-container" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.h1
          className="font-cyber mb-6 text-6xl font-bold md:text-8xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="from-neon-blue via-neon-purple to-neon-pink bg-gradient-to-r bg-clip-text text-transparent">
            ほほ笑み
          </span>
          <br />
          <span className="neon-text">ラボ</span>
        </motion.h1>

        <motion.p
          className="font-futura mb-8 text-xl text-gray-300 md:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ゆっくり、何度でも教えます！
        </motion.p>

        <motion.div
          className="flex flex-col justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Button variant="primary" size="lg" className="animate-pulse">
            無料体験申し込み
          </Button>
          <Button variant="secondary" size="lg">
            サービス詳細
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
```

### サービスカード

```tsx
// components/features/ServiceCard.tsx
interface ServiceCardProps {
  title: string
  description: string
  price: string
  features: string[]
  icon: React.ReactNode
}

export default function ServiceCard({
  title,
  description,
  price,
  features,
  icon,
}: ServiceCardProps) {
  return (
    <motion.div
      className="group relative"
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="relative h-full overflow-hidden" glowing>
        {/* アイコン */}
        <div className="mb-6 text-center">
          <div className="from-neon-blue to-neon-purple shadow-neon group-hover:shadow-glow inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-r transition-all duration-300">
            {icon}
          </div>
        </div>

        <h3 className="font-cyber neon-text mb-4 text-center text-xl font-bold">{title}</h3>

        <p className="font-futura mb-6 text-center text-gray-300">{description}</p>

        <div className="mb-6 text-center">
          <span className="text-neon-purple text-3xl font-bold">{price}</span>
        </div>

        <ul className="mb-6 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-300">
              <div className="bg-neon-green mr-3 h-2 w-2 flex-shrink-0 rounded-full" />
              {feature}
            </li>
          ))}
        </ul>

        <div className="mt-auto">
          <Button variant="primary" className="w-full">
            詳しく見る
          </Button>
        </div>

        {/* ホバー時の境界線エフェクト */}
        <div className="group-hover:border-neon-blue pointer-events-none absolute inset-0 rounded-lg border-2 border-transparent transition-all duration-300" />
      </Card>
    </motion.div>
  )
}
```

### 講師プロフィールカード

```tsx
// components/features/InstructorProfile.tsx
export default function InstructorProfile() {
  return (
    <div className="grid items-center gap-12 md:grid-cols-2">
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* プロフィール画像（サイバー枠） */}
        <div className="relative">
          <div className="relative mx-auto h-80 w-80">
            <div className="from-neon-blue to-neon-purple absolute inset-0 rounded-full bg-gradient-to-r p-1">
              <div className="bg-dark-900 h-full w-full rounded-full p-4">
                <img
                  src="/instructor.jpg"
                  alt="講師プロフィール"
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* 浮遊するスキルバッジ */}
          <motion.div
            className="bg-neon-green/20 border-neon-green absolute -right-4 top-4 rounded-full border px-3 py-1 text-sm"
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 3 }}
          >
            IT Expert
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <h2 className="font-cyber neon-text mb-6 text-3xl font-bold">講師プロフィール</h2>

        <div className="space-y-4 text-gray-300">
          <p>富士通パソコン教室での豊富な指導経験</p>
          <p>株式会社SEGA でゲーム開発に従事</p>
          <p>最新技術にも精通し、幅広く対応</p>
        </div>

        {/* スキルプログレスバー */}
        <div className="mt-8 space-y-4">
          {[
            { skill: 'パソコン指導', level: 95 },
            { skill: 'プログラミング', level: 90 },
            { skill: '最新技術', level: 85 },
          ].map((item) => (
            <div key={item.skill}>
              <div className="mb-1 flex justify-between">
                <span className="font-futura text-sm">{item.skill}</span>
                <span className="text-neon-blue text-sm">{item.level}%</span>
              </div>
              <div className="bg-dark-700 h-2 w-full rounded-full">
                <motion.div
                  className="from-neon-blue to-neon-purple h-2 rounded-full bg-gradient-to-r"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${item.level}%` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
```

## 完了条件

- 各セクションがサイバー感のあるデザインになっている
- ホバー効果とアニメーションが実装されている
- カードやコンポーネントが統一感を持っている
- レスポンシブデザインが適切に動作する
