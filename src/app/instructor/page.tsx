import type { Metadata } from 'next'
import InstructorPageClient from './InstructorPageClient'
import LongDistanceTransition from '@/components/animations/LongDistanceTransition'

export const metadata: Metadata = {
  title: '講師紹介',
  description: 'ほほ笑みラボの講師をご紹介します。豊富な経験を持つプロフェッショナルが、皆様のIT学習をサポートいたします。',
}

export default function InstructorPage() {
  return (
    <LongDistanceTransition className="border-4 border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.6),0_0_40px_rgba(156,163,175,0.3)]">
      <InstructorPageClient />
    </LongDistanceTransition>
  )
}

// 元に戻す用のコード:
// <SimplePageTransition type="fadeDown" className="border-4 border-red-500">
//   <InstructorPageClient />
// </SimplePageTransition>