import type { Metadata } from 'next'
import BlogPageClient from './BlogPageClient'

export const metadata: Metadata = {
  title: 'ブログ・お知らせ',
  description: 'ほほ笑みラボのブログ・お知らせ一覧。最新のIT情報、レッスン情報、お知らせをお届けします。',
  keywords: ['ブログ', 'お知らせ', 'IT情報', '新着情報', 'レッスン情報'],
  openGraph: {
    title: 'ブログ・お知らせ | ほほ笑みラボ',
    description: '最新のIT情報、レッスン情報、お知らせをお届けします。',
    url: 'https://hohoemi-lab.com/blog',
  },
}

// ダミーデータ（実際にはCMSやAPIから取得）
const blogPosts = [
  {
    id: 1,
    title: 'Windows 11の新機能解説 - 生産性向上のポイント',
    excerpt: 'Windows 11に追加された新機能について、実際の業務で活用できるポイントを分かりやすく解説します。',
    category: 'テクニック',
    date: '2024-12-15',
    tags: ['Windows', 'Microsoft', 'Tips'],
    slug: 'windows-11-new-features',
    readTime: '5分',
    featured: true,
  },
  {
    id: 2,
    title: 'シニア向けスマートフォン活用術 - LINE編',
    excerpt: 'LINEの基本的な使い方から、家族との連絡に便利な機能まで、シニアの方にも分かりやすくご紹介します。',
    category: 'スマートフォン',
    date: '2024-12-10',
    tags: ['LINE', 'スマートフォン', 'シニア'],
    slug: 'senior-smartphone-line',
    readTime: '7分',
    featured: false,
  },
  {
    id: 3,
    title: '年末年始の営業についてお知らせ',
    excerpt: '年末年始の営業スケジュールと、新年からの新コース開講についてお知らせいたします。',
    category: 'お知らせ',
    date: '2024-12-08',
    tags: ['営業時間', 'お知らせ', '年末年始'],
    slug: 'year-end-schedule',
    readTime: '2分',
    featured: false,
  },
  {
    id: 4,
    title: 'セキュリティ対策の基本 - フィッシング詐欺を見抜く方法',
    excerpt: '最近増えているフィッシング詐欺の手口と、その見抜き方、対策方法について詳しく解説します。',
    category: 'セキュリティ',
    date: '2024-12-05',
    tags: ['セキュリティ', 'フィッシング詐欺', '対策'],
    slug: 'phishing-security-guide',
    readTime: '8分',
    featured: true,
  },
  {
    id: 5,
    title: 'Excelで作る家計簿 - 初心者でも簡単！',
    excerpt: 'Excelを使った家計簿の作り方を、初心者の方でも分かりやすく、ステップバイステップで解説します。',
    category: 'Office',
    date: '2024-12-01',
    tags: ['Excel', '家計簿', '初心者'],
    slug: 'excel-household-budget',
    readTime: '10分',
    featured: false,
  },
  {
    id: 6,
    title: 'オンラインレッスン開始のお知らせ',
    excerpt: 'コロナ禍に対応し、オンラインでのレッスンも開始いたします。ご自宅から安全に学習していただけます。',
    category: 'お知らせ',
    date: '2024-11-28',
    tags: ['オンライン', 'レッスン', 'お知らせ'],
    slug: 'online-lesson-start',
    readTime: '3分',
    featured: false,
  },
]

const categories = ['全て', 'テクニック', 'スマートフォン', 'Office', 'セキュリティ', 'お知らせ']

export default function Blog() {
  return <BlogPageClient blogPosts={blogPosts} categories={categories} />
}