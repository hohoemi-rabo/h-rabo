import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey)

// TypeScript型定義
export interface ContactSubmission {
  id?: string
  name: string
  furigana?: string
  email: string
  phone: string
  inquiry_type: string
  subject: string
  message: string
  ip_address?: string
  status: 'new' | 'read' | 'replied'
  created_at?: string
  updated_at?: string
}

// Supabaseテーブル操作
export async function saveContactToSupabase(data: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>) {
  const { data: result, error } = await supabase
    .from('contact_submissions')
    .insert({
      ...data,
      status: 'new'
    })
    .select()
    .single()

  if (error) {
    console.error('Supabase insert error:', error)
    throw new Error('データベースへの保存に失敗しました')
  }

  return result
}

export async function getContactSubmissions() {
  const { data, error } = await supabase
    .from('contact_submissions')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Supabase select error:', error)
    throw new Error('データの取得に失敗しました')
  }

  return data
}

export async function updateContactStatus(id: string, status: ContactSubmission['status']) {
  const { data, error } = await supabase
    .from('contact_submissions')
    .update({ 
      status,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Supabase update error:', error)
    throw new Error('ステータスの更新に失敗しました')
  }

  return data
}