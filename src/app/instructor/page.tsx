import type { Metadata } from 'next'
import InstructorPageClient from './InstructorPageClient'
import PageTransition3D from '@/components/animations/PageTransition3D'

export const metadata: Metadata = {
  title: '講師紹介',
  description: 'ほほ笑みラボの講師をご紹介します。豊富な経験を持つプロフェッショナルが、皆様のIT学習をサポートいたします。',
}

export default function InstructorPage() {
  return (
    <PageTransition3D>
      <InstructorPageClient />
    </PageTransition3D>
  )
}