# 017: お問い合わせフォーム実装

## 概要

バリデーション機能付きのお問い合わせフォームとAPI Routeを実装する

## 優先度

High

## 前提条件

- 008: UIコンポーネントライブラリ作成が完了していること

## Todoリスト

- [×] フォームコンポーネントの作成
  - [×] 入力フィールドの実装（名前、メール、電話、内容）
  - [×] バリデーション機能
  - [×] エラーハンドリング
  - [×] 送信状態の表示
- [×] API Route実装
  - [×] app/api/contact/route.ts
  - [×] 入力データの検証
  - [×] メール送信機能（Resend）
  - [×] レート制限対応
- [×] 送信確認画面
  - [×] 成功時の表示
  - [×] エラー時の表示
  - [×] リダイレクト処理
- [×] セキュリティ対策
  - [×] CSRF対策
  - [×] スパム対策
  - [×] データサニタイゼーション
- [×] レスポンシブ対応
  - [×] モバイル最適化
  - [×] アクセシビリティ対応
- [×] テスト実装
  - [×] フォームバリデーションテスト
  - [×] API動作テスト

## 実装詳細

### フォームコンポーネント

```tsx
// components/forms/ContactForm.tsx
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Input, Button, Card } from '@/components/ui'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const contactSchema = z.object({
  name: z.string().min(2, '名前は2文字以上で入力してください'),
  email: z.string().email('正しいメールアドレスを入力してください'),
  phone: z
    .string()
    .regex(/^[0-9-+\s()]*$/, '正しい電話番号を入力してください')
    .optional(),
  subject: z.string().min(1, '件名を選択してください'),
  message: z.string().min(10, 'お問い合わせ内容は10文字以上で入力してください'),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

  const watchedFields = watch()

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitStatus('success')
        reset()
      } else {
        throw new Error('送信に失敗しました')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const subjects = [
    '体験レッスンについて',
    'グループレッスンについて',
    '個別レッスンについて',
    '単発サービスについて',
    'その他のお問い合わせ',
  ]

  return (
    <Card className="mx-auto max-w-2xl p-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-cyber neon-text mb-8 text-center text-2xl font-bold">お問い合わせ</h2>

        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 rounded-lg border border-green-500 bg-green-500/10 p-4"
          >
            <p className="text-center text-green-400">
              お問い合わせありがとうございます。24時間以内にご連絡いたします。
            </p>
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 rounded-lg border border-red-500 bg-red-500/10 p-4"
          >
            <p className="text-center text-red-400">
              送信に失敗しました。しばらくしてから再度お試しください。
            </p>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* 名前 */}
          <div>
            <label className="font-futura mb-2 block text-sm text-gray-300">
              お名前 <span className="text-red-400">*</span>
            </label>
            <Input {...register('name')} placeholder="山田 太郎" error={errors.name?.message} />
          </div>

          {/* メールアドレス */}
          <div>
            <label className="font-futura mb-2 block text-sm text-gray-300">
              メールアドレス <span className="text-red-400">*</span>
            </label>
            <Input
              {...register('email')}
              type="email"
              placeholder="example@email.com"
              error={errors.email?.message}
            />
          </div>

          {/* 電話番号 */}
          <div>
            <label className="font-futura mb-2 block text-sm text-gray-300">電話番号（任意）</label>
            <Input
              {...register('phone')}
              type="tel"
              placeholder="090-1234-5678"
              error={errors.phone?.message}
            />
          </div>

          {/* 件名 */}
          <div>
            <label className="font-futura mb-2 block text-sm text-gray-300">
              お問い合わせ件名 <span className="text-red-400">*</span>
            </label>
            <select
              {...register('subject')}
              className={`bg-dark-800 font-futura w-full rounded-lg border px-4 py-3 text-white transition-all duration-300 focus:outline-none ${
                errors.subject
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-dark-600 focus:border-neon-blue focus:shadow-neon'
              } `}
            >
              <option value="">件名を選択してください</option>
              {subjects.map((subject) => (
                <option key={subject} value={subject}>
                  {subject}
                </option>
              ))}
            </select>
            {errors.subject && (
              <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
            )}
          </div>

          {/* お問い合わせ内容 */}
          <div>
            <label className="font-futura mb-2 block text-sm text-gray-300">
              お問い合わせ内容 <span className="text-red-400">*</span>
            </label>
            <textarea
              {...register('message')}
              rows={6}
              placeholder="お問い合わせ内容をご記入ください"
              className={`bg-dark-800 font-futura w-full rounded-lg border px-4 py-3 text-white placeholder-gray-400 transition-all duration-300 focus:outline-none ${
                errors.message
                  ? 'border-red-500 focus:border-red-500'
                  : 'border-dark-600 focus:border-neon-blue focus:shadow-neon'
              } `}
            />
            {errors.message && (
              <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
            )}
          </div>

          {/* 送信ボタン */}
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <div className="mr-2 h-5 w-5 animate-spin rounded-full border-b-2 border-white"></div>
                送信中...
              </div>
            ) : (
              '送信する'
            )}
          </Button>
        </form>

        {/* 進行状況インジケーター */}
        <motion.div
          className="bg-dark-700 mt-6 h-1 overflow-hidden rounded-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="from-neon-blue to-neon-purple h-full bg-gradient-to-r"
            initial={{ width: '0%' }}
            animate={{
              width: `${Math.min(
                (Object.values(watchedFields).filter(Boolean).length / 5) * 100,
                100
              )}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </Card>
  )
}
```

### API Route実装

```typescript
// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { ratelimit } from '@/lib/ratelimit'

const resend = new Resend(process.env.RESEND_API_KEY)

const contactSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(10).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    // レート制限チェック
    const ip = request.ip ?? 'anonymous'
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
    }

    // リクエストボディの検証
    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // HTMLエスケープ
    const sanitizedData = {
      ...validatedData,
      name: escapeHtml(validatedData.name),
      message: escapeHtml(validatedData.message),
    }

    // メール送信
    const emailHtml = `
      <h2>新しいお問い合わせ</h2>
      <p><strong>お名前:</strong> ${sanitizedData.name}</p>
      <p><strong>メールアドレス:</strong> ${sanitizedData.email}</p>
      <p><strong>電話番号:</strong> ${sanitizedData.phone || 'なし'}</p>
      <p><strong>件名:</strong> ${sanitizedData.subject}</p>
      <p><strong>お問い合わせ内容:</strong></p>
      <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
    `

    await resend.emails.send({
      from: 'noreply@hohoemi-lab.com',
      to: ['info@hohoemi-lab.com'],
      subject: `[ホームページ] ${sanitizedData.subject}`,
      html: emailHtml,
      replyTo: sanitizedData.email,
    })

    // 自動返信メール
    await resend.emails.send({
      from: 'noreply@hohoemi-lab.com',
      to: [sanitizedData.email],
      subject: 'お問い合わせありがとうございます - ほほ笑みラボ',
      html: `
        <h2>お問い合わせありがとうございます</h2>
        <p>${sanitizedData.name} 様</p>
        <p>この度は、パソコン・スマホ ほほ笑みラボにお問い合わせいただき、ありがとうございます。</p>
        <p>24時間以内にご連絡いたしますので、しばらくお待ちください。</p>
        <br>
        <p>パソコン・スマホ ほほ笑みラボ</p>
        <p>電話: 090-5646-5670</p>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }

    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}
```

### レート制限実装

```typescript
// lib/ratelimit.ts
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

export const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, '1 h'), // 1時間に5回まで
  analytics: true,
})
```

## 完了条件

- [×] フォームが正常に動作し、バリデーションが機能する
- [×] API Routeがメールを送信できる
- [×] レート制限とセキュリティ対策が実装されている
- [×] レスポンシブデザインが適用されている

## 実装完了報告 (2025-09-03)

✅ **チケット017: お問い合わせフォーム実装** - **完了**

### 実装内容
- **フォーム機能**: ContactPageClient.tsx で完全実装
- **API Route**: /api/contact で Resend メール送信
- **データ保存**: JSONファイル（data/contacts.json）での履歴管理
- **セキュリティ**: レート制限、バリデーション、HTMLエスケープ
- **動作確認**: rabo.hohoemi@gmail.com への送信成功確認済み

### 使用技術
- **フロントエンド**: React Hook Form + Zod バリデーション
- **バックエンド**: Next.js API Routes
- **メール送信**: Resend API
- **データ保存**: JSON ファイルベース
- **レート制限**: メモリベース（1時間5回制限）

### 本番運用準備完了
現在の設定で即座に本格運用可能。
