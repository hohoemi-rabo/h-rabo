import { connect } from '@planetscale/database'

const connection = connect({
  url: process.env.DATABASE_URL
})

export interface ContactSubmission {
  id?: number
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

export async function saveContactToPlanetScale(data: Omit<ContactSubmission, 'id' | 'created_at' | 'updated_at' | 'status'>) {
  const result = await connection.execute(
    `INSERT INTO contact_submissions 
     (name, furigana, email, phone, inquiry_type, subject, message, ip_address, status, created_at) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'new', NOW())`,
    [
      data.name,
      data.furigana || null,
      data.email,
      data.phone,
      data.inquiry_type,
      data.subject,
      data.message,
      data.ip_address || null
    ]
  )

  return {
    id: result.insertId,
    ...data,
    status: 'new' as const,
    created_at: new Date().toISOString()
  }
}

export async function getContactSubmissions() {
  const result = await connection.execute(
    'SELECT * FROM contact_submissions ORDER BY created_at DESC'
  )
  return result.rows as ContactSubmission[]
}

export async function updateContactStatus(id: number, status: ContactSubmission['status']) {
  await connection.execute(
    'UPDATE contact_submissions SET status = ?, updated_at = NOW() WHERE id = ?',
    [status, id]
  )
  
  const result = await connection.execute(
    'SELECT * FROM contact_submissions WHERE id = ?',
    [id]
  )
  
  return result.rows[0] as ContactSubmission
}