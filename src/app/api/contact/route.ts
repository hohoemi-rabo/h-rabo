import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'
import { checkRateLimit } from '@/lib/ratelimit'
import { saveContactSubmission } from '@/lib/database'

// Resendインスタンスを遅延初期化
let resend: Resend | null = null

function getResendClient() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY)
  }
  return resend
}

const contactSchema = z.object({
  name: z.string().min(1).max(50),
  furigana: z.string().optional(),
  phone: z.string().min(1).regex(/^[0-9-+\s()]*$/),
  email: z.string().email(),
  inquiryType: z.string().min(1),
  message: z.string().min(10).max(1000),
})

export async function POST(request: NextRequest) {
  try {
    // レート制限チェック
    const forwarded = request.headers.get('x-forwarded-for')
    const ip = forwarded?.split(',')[0].trim() ?? 'anonymous'
    const { success } = await checkRateLimit(ip)

    if (!success) {
      return NextResponse.json(
        { 
          success: false,
          error: '送信回数が制限を超えています。しばらく時間をおいてから再度お試しください。' 
        }, 
        { status: 429 }
      )
    }

    const body = await request.json()
    const validatedData = contactSchema.parse(body)

    // お問い合わせ種別を日本語に変換
    const inquiryTypeMap: Record<string, string> = {
      lesson: 'レッスンについて',
      technical: '技術的なご相談',
      visit: '出張サービス',
      other: 'その他'
    }

    const sanitizedData = {
      ...validatedData,
      name: escapeHtml(validatedData.name),
      furigana: validatedData.furigana ? escapeHtml(validatedData.furigana) : '',
      message: escapeHtml(validatedData.message),
      inquiryType: inquiryTypeMap[validatedData.inquiryType] || validatedData.inquiryType,
    }

    // メール送信
    if (!process.env.RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured')
    }

    const emailHtml = `
      <h2>新しいお問い合わせ</h2>
      <p><strong>お名前:</strong> ${sanitizedData.name}</p>
      ${sanitizedData.furigana ? `<p><strong>フリガナ:</strong> ${sanitizedData.furigana}</p>` : ''}
      <p><strong>メールアドレス:</strong> ${sanitizedData.email}</p>
      <p><strong>電話番号:</strong> ${sanitizedData.phone}</p>
      <p><strong>お問い合わせ種別:</strong> ${sanitizedData.inquiryType}</p>
      <p><strong>お問い合わせ内容:</strong></p>
      <p style="white-space: pre-wrap; background-color: #f5f5f5; padding: 10px; border-left: 4px solid #007bff;">${sanitizedData.message}</p>
      <hr>
      <p style="font-size: 12px; color: #666;">送信日時: ${new Date().toLocaleString('ja-JP', { timeZone: 'Asia/Tokyo' })}</p>
    `

    // Resendクライアントを取得
    const resendClient = getResendClient()
    
    if (!resendClient) {
      console.warn('Resend API key not configured, skipping email notification')
      // APIキーが設定されていない場合でも、フォーム送信は成功扱いにする
      return NextResponse.json(
        {
          success: true,
          message: 'お問い合わせを受け付けました（メール通知は無効）',
        },
        { status: 200 }
      )
    }

    // 管理者宛メール
    await resendClient.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'noreply@hohoemi-lab.com',
      to: [process.env.CONTACT_EMAIL_TO || 'info@hohoemi-lab.com'],
      subject: `[ホームページお問い合わせ] ${sanitizedData.inquiryType} - ${sanitizedData.name}様より`,
      html: emailHtml,
      replyTo: sanitizedData.email,
    })

    // 自動返信メール
    await resendClient.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'noreply@hohoemi-lab.com',
      to: [sanitizedData.email],
      subject: 'お問い合わせありがとうございます - パソコン・スマホ ほほ笑みラボ',
      html: `
        <div style="font-family: 'Hiragino Sans', 'ヒラギノ角ゴシック', 'Yu Gothic', '游ゴシック', sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">お問い合わせありがとうございます</h2>
          
          <p>${sanitizedData.name} 様</p>
          
          <p>この度は、パソコン・スマホ ほほ笑みラボにお問い合わせいただき、ありがとうございます。</p>
          
          <p>以下の内容で承りました：</p>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 15px 0;">
            <p><strong>お問い合わせ種別:</strong> ${sanitizedData.inquiryType}</p>
            <p><strong>お問い合わせ内容:</strong></p>
            <p style="white-space: pre-wrap;">${sanitizedData.message}</p>
          </div>
          
          <p>24時間以内にご連絡いたしますので、しばらくお待ちください。</p>
          
          <hr style="margin: 20px 0;">
          
          <div style="font-size: 14px; color: #666;">
            <p><strong>パソコン・スマホ ほほ笑みラボ</strong></p>
            <p>電話: 090-5646-5670</p>
            <p>営業時間: 10:00-18:00（水曜・日曜定休）</p>
            <p>所在地: 〒395-0002 長野県飯田市上郷飯沼2640-1</p>
          </div>
        </div>
      `,
    })

    // データベースに保存
    await saveContactSubmission({
      name: sanitizedData.name,
      furigana: sanitizedData.furigana,
      email: sanitizedData.email,
      phone: sanitizedData.phone,
      inquiryType: sanitizedData.inquiryType,
      message: sanitizedData.message,
      ip: ip !== 'anonymous' ? ip : undefined,
    })

    console.log('Contact form submission successful:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      inquiryType: sanitizedData.inquiryType,
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json({ 
      success: true,
      message: 'お問い合わせありがとうございます。確認メールをお送りしました。24時間以内にご連絡いたします。'
    })
  } catch (error) {
    console.error('Contact form error:', error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          success: false,
          error: 'Invalid input data', 
          details: error.issues 
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { 
        success: false,
        error: 'Internal server error' 
      }, 
      { status: 500 }
    )
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