'use client'

import Container from '@/components/ui/Container'
import { Button } from '@/components/ui'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// バリデーションスキーマ
const contactSchema = z.object({
  name: z.string().min(1, '名前を入力してください'),
  furigana: z.string().optional(),
  phone: z.string()
    .min(1, '電話番号を入力してください')
    .regex(/^[0-9-+\s()]*$/, '正しい電話番号を入力してください'),
  email: z.string()
    .min(1, 'メールアドレスを入力してください')
    .email('正しいメールアドレスを入力してください'),
  inquiryType: z.string().min(1, 'お問い合わせ種別を選択してください'),
  subject: z.string().min(1, '件名を入力してください'),
  message: z.string().min(10, 'お問い合わせ内容は10文字以上で入力してください'),
  privacy: z.boolean().refine((val) => val === true, {
    message: 'プライバシーポリシーに同意してください',
  }),
})

type ContactFormData = z.infer<typeof contactSchema>

interface ContactMethod {
  icon: string
  title: string
  value: string
  description: string
  subtext: string
  action: string | null
  color: string
  available: boolean
}

interface InquiryType {
  icon: string
  title: string
  examples: string[]
}

interface ContactPageClientProps {
  contactMethods: ContactMethod[]
  inquiryTypes: InquiryType[]
}

export default function ContactPageClient({ contactMethods, inquiryTypes }: ContactPageClientProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  })

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
        // 成功メッセージを表示してから、3秒後にリセット
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 5000)
      } else {
        throw new Error('送信に失敗しました')
      }
    } catch {
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Container size="xl">
        <div className="py-20">
          {/* ヘッダー */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-6xl font-cyber font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink mb-6">
              お問い合わせ
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              ご質問・ご相談はお気軽にお問い合わせください。<br />
              「ゆっくり、何度でも」お答えいたします！
            </p>
          </div>

          {/* 連絡方法 */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-12">
              📞 連絡方法
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className={`bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center transition-all duration-300 hover:border-white/20 ${
                    method.available ? 'hover:scale-[1.02]' : 'opacity-75'
                  }`}
                >
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {method.title}
                  </h3>
                  
                  <div className={`text-lg font-semibold mb-3 bg-gradient-to-r ${method.color} bg-clip-text text-transparent`}>
                    {method.value}
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-3">
                    {method.description}
                  </p>
                  
                  <p className="text-gray-400 text-xs mb-4">
                    {method.subtext}
                  </p>
                  
                  {method.available && method.action ? (
                    <a href={method.action}>
                      <Button variant="primary" size="sm" className="w-full">
                        {method.icon === '📞' ? '電話をかける' : 
                         method.icon === '📧' ? 'メールを送る' : '問い合わせる'}
                      </Button>
                    </a>
                  ) : (
                    <Button variant="secondary" size="sm" className="w-full" disabled>
                      {method.available ? '問い合わせる' : '準備中'}
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* お問い合わせフォーム */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-12">
              📝 お問い合わせフォーム
            </h2>
            
            <div className="max-w-4xl mx-auto">
              {/* 成功メッセージ */}
              {submitStatus === 'success' && (
                <div className="mb-6 bg-green-500/10 border border-green-500 rounded-xl p-6 text-center">
                  <p className="text-green-400 text-lg font-semibold">
                    ✅ お問い合わせを送信しました！
                  </p>
                  <p className="text-gray-300 mt-2">
                    24時間以内にご連絡いたします。お待ちください。
                  </p>
                </div>
              )}

              {/* エラーメッセージ */}
              {submitStatus === 'error' && (
                <div className="mb-6 bg-red-500/10 border border-red-500 rounded-xl p-6 text-center">
                  <p className="text-red-400 text-lg font-semibold">
                    ❌ 送信に失敗しました
                  </p>
                  <p className="text-gray-300 mt-2">
                    しばらくしてから再度お試しください。
                  </p>
                </div>
              )}

              <div className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* お名前 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        お名前 <span className="text-neon-pink">*</span>
                      </label>
                      <input
                        {...register('name')}
                        type="text"
                        className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                        placeholder="山田 太郎"
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-400">{errors.name.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        フリガナ
                      </label>
                      <input
                        {...register('furigana')}
                        type="text"
                        className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                        placeholder="ヤマダ タロウ"
                      />
                    </div>
                  </div>

                  {/* 連絡先 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        電話番号 <span className="text-neon-pink">*</span>
                      </label>
                      <input
                        {...register('phone')}
                        type="tel"
                        className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                        placeholder="090-0000-0000"
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-400">{errors.phone.message}</p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-white font-semibold mb-2">
                        メールアドレス <span className="text-neon-pink">*</span>
                      </label>
                      <input
                        {...register('email')}
                        type="email"
                        className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                        placeholder="example@email.com"
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  {/* お問い合わせ種別 */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      お問い合わせ種別 <span className="text-neon-pink">*</span>
                    </label>
                    <select
                      {...register('inquiryType')}
                      className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                    >
                      <option value="">選択してください</option>
                      <option value="lesson">レッスンについて</option>
                      <option value="technical">技術的なご相談</option>
                      <option value="visit">出張サービス</option>
                      <option value="trial">体験レッスン申し込み</option>
                      <option value="other">その他</option>
                    </select>
                    {errors.inquiryType && (
                      <p className="mt-1 text-sm text-red-400">{errors.inquiryType.message}</p>
                    )}
                  </div>

                  {/* 件名 */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      件名 <span className="text-neon-pink">*</span>
                    </label>
                    <input
                      {...register('subject')}
                      type="text"
                      className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300"
                      placeholder="お問い合わせ内容の件名をご入力ください"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-400">{errors.subject.message}</p>
                    )}
                  </div>

                  {/* お問い合わせ内容 */}
                  <div>
                    <label className="block text-white font-semibold mb-2">
                      お問い合わせ内容 <span className="text-neon-pink">*</span>
                    </label>
                    <textarea
                      {...register('message')}
                      rows={6}
                      className="w-full bg-dark-700/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-neon-blue focus:ring-2 focus:ring-neon-blue/20 focus:outline-none transition-all duration-300 resize-y"
                      placeholder="お問い合わせ内容を詳しくお聞かせください。"
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-400">{errors.message.message}</p>
                    )}
                  </div>

                  {/* プライバシーポリシー同意 */}
                  <div className="flex items-start space-x-3">
                    <input
                      {...register('privacy')}
                      type="checkbox"
                      id="privacy"
                      className="mt-1 w-4 h-4 text-neon-blue bg-dark-700 border-white/20 rounded focus:ring-neon-blue focus:ring-2"
                    />
                    <label htmlFor="privacy" className="text-gray-300 text-sm">
                      <Link href="/privacy" className="text-neon-blue hover:text-neon-cyan underline">
                        プライバシーポリシー
                      </Link>
                      に同意します <span className="text-neon-pink">*</span>
                    </label>
                  </div>
                  {errors.privacy && (
                    <p className="mt-1 text-sm text-red-400">{errors.privacy.message}</p>
                  )}

                  {/* 送信ボタン */}
                  <div className="text-center pt-4">
                    <Button 
                      type="submit" 
                      variant="primary" 
                      size="lg" 
                      className="px-12"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <span className="animate-spin h-5 w-5 mr-3 border-b-2 border-white rounded-full"></span>
                          送信中...
                        </span>
                      ) : (
                        '📤 送信する'
                      )}
                    </Button>
                  </div>
                </form>
              </div>
              
              {/* 注意事項 */}
              <div className="mt-8 bg-neon-blue/10 border border-neon-blue/30 rounded-xl p-6">
                <h3 className="text-neon-blue font-semibold mb-3">📋 ご利用にあたって</h3>
                <ul className="space-y-2 text-gray-300 text-sm">
                  <li>・お返事まで1-2営業日お時間をいただく場合があります</li>
                  <li>・緊急のお問い合わせは直接お電話（090-5646-5670）にてご連絡ください</li>
                  <li>・営業時間: 月火木金 10:00-18:00、土 10:00-16:00（水日定休）</li>
                  <li>・個人情報は適切に管理し、お問い合わせ対応以外の目的で使用いたしません</li>
                </ul>
              </div>
            </div>
          </div>

          {/* お問い合わせ内容の例 */}
          <div className="mb-16">
            <h2 className="text-3xl font-cyber font-bold text-center text-white mb-12">
              💬 こんなご質問をお受けしています
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {inquiryTypes.map((type, index) => (
                <div
                  key={index}
                  className="bg-dark-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:border-white/20 transition-all duration-300"
                >
                  <div className="text-3xl mb-4">{type.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    {type.title}
                  </h3>
                  <ul className="space-y-2">
                    {type.examples.map((example: string, i: number) => (
                      <li key={i} className="text-gray-300 text-sm flex items-start space-x-2">
                        <div className="w-1 h-1 bg-neon-green rounded-full mt-2 flex-shrink-0" />
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ナビゲーション */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/faq">
              <Button variant="secondary" size="lg">
                ❓ よくある質問
              </Button>
            </Link>
            <Link href="/">
              <Button variant="primary" size="lg">
                🏠 ホームに戻る
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  )
}