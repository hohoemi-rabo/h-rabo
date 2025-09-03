import axios from 'axios'

const INSTAGRAM_BASE_URL = 'https://graph.instagram.com'

export interface InstagramMedia {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  permalink: string
  thumbnail_url?: string
  timestamp: string
  username?: string
}

export interface InstagramUser {
  id: string
  username: string
  account_type: string
  media_count: number
}

export interface InstagramResponse {
  data: InstagramMedia[]
  paging?: {
    cursors: {
      before: string
      after: string
    }
    next?: string
  }
}

class InstagramService {
  private accessToken: string

  constructor() {
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || ''
    
    // デバッグ用ログ（本番環境でも確認できるようにconsole.logを使用）
    if (!this.accessToken) {
      console.log('[Instagram Service] Warning: INSTAGRAM_ACCESS_TOKEN is not set')
    } else {
      console.log('[Instagram Service] Access token is configured (length:', this.accessToken.length, ')')
    }
  }

  async getUser(): Promise<InstagramUser | null> {
    try {
      if (!this.accessToken) {
        console.warn('Instagram access token not configured')
        return null
      }

      const response = await axios.get(`${INSTAGRAM_BASE_URL}/me`, {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: this.accessToken,
        },
      })

      return response.data
    } catch (error) {
      console.error('Instagram user fetch error:', error)
      return null
    }
  }

  async getMedia(limit: number = 6): Promise<InstagramMedia[]> {
    try {
      if (!this.accessToken) {
        console.warn('Instagram access token not configured')
        return []
      }

      const response = await axios.get(`${INSTAGRAM_BASE_URL}/me/media`, {
        params: {
          fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username',
          limit,
          access_token: this.accessToken,
        },
      })

      return response.data.data || []
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('[Instagram API] Media fetch error:', {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          message: error.message
        })
      } else {
        console.error('[Instagram API] Media fetch error:', error)
      }
      return []
    }
  }

  async refreshToken(): Promise<string | null> {
    try {
      if (!this.accessToken) {
        return null
      }

      const response = await axios.get(`${INSTAGRAM_BASE_URL}/refresh_access_token`, {
        params: {
          grant_type: 'ig_refresh_token',
          access_token: this.accessToken,
        },
      })

      return response.data.access_token
    } catch (error) {
      console.error('Instagram token refresh error:', error)
      return null
    }
  }

  // アクセストークンの有効性をチェック
  async validateToken(): Promise<boolean> {
    try {
      if (!this.accessToken) {
        return false
      }

      await axios.get(`${INSTAGRAM_BASE_URL}/me`, {
        params: {
          fields: 'id',
          access_token: this.accessToken,
        },
      })

      return true
    } catch (error) {
      console.error('Instagram token validation error:', error)
      return false
    }
  }
}

export const instagramService = new InstagramService()

// キャッシュ機能付きデータ取得
let cachedData: { media: InstagramMedia[], user: InstagramUser | null, timestamp: number } | null = null
const CACHE_DURATION = 30 * 60 * 1000 // 30分

export async function getCachedInstagramData() {
  const now = Date.now()
  
  console.log('[getCachedInstagramData] Starting data fetch...')
  
  // キャッシュが有効な場合はキャッシュを返す
  if (cachedData && (now - cachedData.timestamp) < CACHE_DURATION) {
    console.log('[getCachedInstagramData] Returning cached data')
    return cachedData
  }

  console.log('[getCachedInstagramData] Cache expired or not available, fetching new data...')
  
  // 新しいデータを取得
  const [media, user] = await Promise.all([
    instagramService.getMedia(6),
    instagramService.getUser(),
  ])

  console.log('[getCachedInstagramData] Fetched media count:', media.length)
  console.log('[getCachedInstagramData] User info:', user ? 'Available' : 'Not available')

  // キャッシュを更新
  cachedData = {
    media,
    user,
    timestamp: now,
  }

  return cachedData
}