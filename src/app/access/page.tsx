import type { Metadata } from 'next'
import AccessPageClient from './AccessPageClient'

export const metadata: Metadata = {
  title: 'アクセス・お問い合わせ',
  description: 'ほほ笑みラボへのアクセス方法とお問い合わせ先をご案内。長野県飯田市で最先端のIT教育を提供しています。',
}

const businessHours = [
  { day: '月曜日', time: '10:00 - 18:00', status: 'open' },
  { day: '火曜日', time: '10:00 - 18:00', status: 'open' },
  { day: '水曜日', time: '10:00 - 18:00', status: 'open' },
  { day: '木曜日', time: '10:00 - 18:00', status: 'open' },
  { day: '金曜日', time: '10:00 - 18:00', status: 'open' },
  { day: '土曜日', time: '定休日（状況により対応可能）', status: 'closed' },
  { day: '日曜日', time: '定休日（状況により対応可能）', status: 'closed' },
]

const accessMethods = [
  {
    method: '🚗 お車でお越しの方',
    description: '駐車場完備（3台分）',
    details: [
      '中央自動車道 飯田ICより約15分',
      '国道153号線沿い、上郷飯沼交差点近く',
      '無料駐車場あり',
    ],
    color: 'from-neon-blue to-neon-cyan',
  },
  {
    method: '🚌 公共交通機関をご利用の方',
    description: 'バス停「飯沼」より徒歩5分',
    details: [
      'JR飯田線「伊那上郷駅」よりバス10分',
      '信南交通バス「飯沼」下車',
      '徒歩約5分',
    ],
    color: 'from-neon-green to-neon-yellow',
  },
]

const contactInfo = [
  {
    icon: '📞',
    label: 'お電話',
    value: '090-5646-5670',
    description: '営業時間内にお気軽にどうぞ',
    action: 'tel:090-5646-5670',
  },
  {
    icon: '📧',
    label: 'メール',
    value: 'rabo.hohoemi@gmail.com',
    description: '24時間受付中',
    action: 'mailto:rabo.hohoemi@gmail.com',
  },
  {
    icon: '📍',
    label: '住所',
    value: '〒395-0002 長野県飯田市上郷飯沼2640-1',
    description: '専用駐車場あり',
    action: null,
  },
]

export default function AccessPage() {
  return <AccessPageClient businessHours={businessHours} accessMethods={accessMethods} contactInfo={contactInfo} />
}