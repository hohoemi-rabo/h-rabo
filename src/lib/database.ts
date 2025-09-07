// シンプルなJSONファイル保存（Resend専用実装）
import fs from 'fs/promises'
import path from 'path'

interface ContactSubmission {
  id: string
  name: string
  furigana?: string
  email: string
  phone: string
  inquiryType: string
  message: string
  createdAt: string
  ip?: string
  status: 'new' | 'read' | 'replied'
}

const DB_PATH = path.join(process.cwd(), 'data', 'contacts.json')

export async function saveContactSubmission(data: {
  name: string
  furigana?: string
  email: string
  phone: string
  inquiryType: string
  message: string
  ip?: string
}) {
  try {
    const dataDir = path.dirname(DB_PATH)
    await fs.mkdir(dataDir, { recursive: true })

    let submissions: ContactSubmission[] = []
    try {
      const fileContent = await fs.readFile(DB_PATH, 'utf-8')
      submissions = JSON.parse(fileContent)
    } catch {
      // ファイルが存在しない場合は空配列
    }

    const newSubmission: ContactSubmission = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
      status: 'new'
    }

    submissions.unshift(newSubmission)
    await fs.writeFile(DB_PATH, JSON.stringify(submissions, null, 2), 'utf-8')

    return newSubmission
  } catch (error) {
    console.error('Failed to save contact submission:', error)
    throw new Error('データの保存に失敗しました')
  }
}

export async function getContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    const fileContent = await fs.readFile(DB_PATH, 'utf-8')
    return JSON.parse(fileContent)
  } catch {
    return []
  }
}

export async function updateSubmissionStatus(id: string, status: ContactSubmission['status']) {
  try {
    const submissions = await getContactSubmissions()
    const index = submissions.findIndex(sub => sub.id === id)
    
    if (index !== -1) {
      submissions[index].status = status
      await fs.writeFile(DB_PATH, JSON.stringify(submissions, null, 2), 'utf-8')
      return submissions[index]
    }
    
    throw new Error('お問い合わせが見つかりません')
  } catch (error) {
    console.error('Failed to update submission status:', error)
    throw error
  }
}

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2)
}