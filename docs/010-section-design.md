# 010: 各セクションのサイバーデザイン実装

## 概要
各セクションにサイバー・未来感のあるデザインを適用し、視覚的なインパクトを強化する

## 優先度
High

## 前提条件
- 008: UIコンポーネントライブラリ作成が完了していること
- 004: セクションコンポーネントの基本実装が完了していること

## Todoリスト
- [ ] ヒーローセクションの高度化
  - [ ] 大胆なタイポグラフィ
  - [ ] グラデーション背景
  - [ ] パーティクル効果の準備
  - [ ] CTA部分の強化
- [ ] サービスセクションのカードデザイン
  - [ ] ネオン枠線のサービスカード
  - [ ] ホバー時の3D効果
  - [ ] アイコンのグロウエフェクト
  - [ ] 料金表示の強調
- [ ] 講師紹介セクション
  - [ ] プロフィール画像のサイバー枠
  - [ ] スキルセットの視覚的表現
  - [ ] 経歴のタイムライン風デザイン
- [ ] 生徒さんの声セクション
  - [ ] 未来感のある口コミカード
  - [ ] 評価星のカスタムデザイン
  - [ ] カードのフローティング効果
- [ ] お知らせセクション
  - [ ] ニュースカードのサイバーデザイン
  - [ ] 日付表示の強調
  - [ ] 「NEW」バッジのアニメーション
- [ ] アクセス情報セクション
  - [ ] マップエリアのサイバー枠
  - [ ] 連絡先情報のアイコン強化
  - [ ] 営業時間の視覚的表現

## 実装詳細
### ヒーローセクション
```tsx
// components/features/HeroSection.tsx
export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* 背景グラデーション */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />
      
      {/* サイバーグリッド */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* パーティクル効果コンテナ */}
      <div className="absolute inset-0" id="particles-container" />
      
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.h1 
          className="text-6xl md:text-8xl font-cyber font-bold mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink bg-clip-text text-transparent">
            ほほ笑み
          </span>
          <br />
          <span className="neon-text">ラボ</span>
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-gray-300 mb-8 font-futura"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          ゆっくり、何度でも教えます！
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
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

export default function ServiceCard({ title, description, price, features, icon }: ServiceCardProps) {
  return (
    <motion.div
      className="group relative"
      whileHover={{ y: -10 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Card className="h-full relative overflow-hidden" glowing>
        {/* アイコン */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-neon group-hover:shadow-glow transition-all duration-300">
            {icon}
          </div>
        </div>
        
        <h3 className="text-xl font-cyber font-bold text-center mb-4 neon-text">
          {title}
        </h3>
        
        <p className="text-gray-300 text-center mb-6 font-futura">
          {description}
        </p>
        
        <div className="text-center mb-6">
          <span className="text-3xl font-bold text-neon-purple">{price}</span>
        </div>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-300">
              <div className="w-2 h-2 bg-neon-green rounded-full mr-3 flex-shrink-0" />
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
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-neon-blue rounded-lg transition-all duration-300 pointer-events-none" />
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
    <div className="grid md:grid-cols-2 gap-12 items-center">
      <motion.div
        className="relative"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* プロフィール画像（サイバー枠） */}
        <div className="relative">
          <div className="w-80 h-80 mx-auto relative">
            <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full p-1">
              <div className="w-full h-full bg-dark-900 rounded-full p-4">
                <img 
                  src="/instructor.jpg" 
                  alt="講師プロフィール" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>
          
          {/* 浮遊するスキルバッジ */}
          <motion.div
            className="absolute top-4 -right-4 bg-neon-green/20 border border-neon-green rounded-full px-3 py-1 text-sm"
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
        <h2 className="text-3xl font-cyber font-bold mb-6 neon-text">
          講師プロフィール
        </h2>
        
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
          ].map(item => (
            <div key={item.skill}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-futura">{item.skill}</span>
                <span className="text-sm text-neon-blue">{item.level}%</span>
              </div>
              <div className="w-full bg-dark-700 rounded-full h-2">
                <motion.div
                  className="h-2 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full"
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