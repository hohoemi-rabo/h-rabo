import type { Metadata } from 'next'
import VoicePageClient from './VoicePageClient'
import LongDistanceTransition from '@/components/animations/LongDistanceTransition'

export const metadata: Metadata = {
  title: 'お客様の声',
  description: 'ほほ笑みラボで学ばれた生徒さんの体験談をご紹介。シニアの方からビジネスパーソンまで、様々な方にご利用いただいています。',
}

const testimonials = [
  {
    id: 1,
    name: '佐藤 花子',
    age: '72歳',
    course: 'シニア向けグループレッスン',
    period: '受講歴：1年3ヶ月',
    rating: 5,
    comment: 'パソコンは全く触ったことがなかったのですが、田中先生のおかげで今では孫とビデオ通話ができるようになりました！「ゆっくり、何度でも」という言葉通り、本当に丁寧に教えてくださいます。同世代の仲間もできて、毎週の教室が楽しみです。',
    achievement: '習得したスキル：基本操作、インターネット、ビデオ通話',
    avatar: '👵',
    color: 'from-neon-blue to-neon-cyan',
  },
  {
    id: 2,
    name: '山田 健一',
    age: '35歳',
    course: 'ビジネス向け個別レッスン',
    period: '受講歴：6ヶ月',
    rating: 5,
    comment: '仕事でExcelの高度な機能が必要になり、個別レッスンをお願いしました。単なる操作方法だけでなく、効率化のコツや実践的なテクニックまで教えていただき、業務効率が格段に上がりました。投資した以上の価値がありました。',
    achievement: '習得したスキル：Excel上級、データ分析、マクロ作成',
    avatar: '👨‍💼',
    color: 'from-neon-purple to-neon-pink',
  },
  {
    id: 3,
    name: '鈴木 美智子',
    age: '68歳',
    course: 'バラエティコース',
    period: '受講歴：2年',
    rating: 5,
    comment: 'スマートフォンの写真整理から始まって、今では動画編集まで楽しんでいます。先生は私たちのペースに合わせてくださるので、焦ることなく学べます。趣味の範囲が大きく広がり、人生がより豊かになりました。',
    achievement: '習得したスキル：写真整理、動画編集、SNS活用',
    avatar: '👩‍🦳',
    color: 'from-neon-green to-neon-yellow',
  },
]

const stats = [
  { label: '受講生満足度', value: '98%', icon: '😊' },
  { label: '継続受講率', value: '92%', icon: '📈' },
  { label: '目標達成率', value: '95%', icon: '🎯' },
  { label: '平均受講期間', value: '1.5年', icon: '⏰' },
]

export default function VoicePage() {
  return (
    <LongDistanceTransition className="border-4 border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.6),0_0_40px_rgba(156,163,175,0.3)]">
      <VoicePageClient testimonials={testimonials} stats={stats} />
    </LongDistanceTransition>
  )
}