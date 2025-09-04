import axios from 'axios'

// Instagram Graph API (Business Account用)
const INSTAGRAM_GRAPH_URL = 'https://graph.facebook.com/v18.0'
// Basic Display API (フォールバック用)
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
  like_count?: number  // Graph APIで取得可能
  comments_count?: number  // Graph APIで取得可能
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
  private userId: string
  private isGraphAPI: boolean

  constructor() {
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || ''
    this.userId = process.env.INSTAGRAM_USER_ID || ''
    
    // Graph API (Business Account) かどうかを判定
    // Graph APIのトークンは通常EAAで始まる
    this.isGraphAPI = this.accessToken.startsWith('EAA') && this.userId.length > 0
    
    // デバッグ用ログ
    if (!this.accessToken) {
      console.log('[Instagram Service] Warning: INSTAGRAM_ACCESS_TOKEN is not set')
    } else {
      console.log('[Instagram Service] Access token is configured (length:', this.accessToken.length, ')')
      console.log('[Instagram Service] API Type:', this.isGraphAPI ? 'Graph API (Business)' : 'Basic Display API')
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

      // Graph API を使用する場合 - まず正しいInstagram Business Account IDを取得
      if (this.isGraphAPI && this.userId) {
        console.log('[Instagram Service] Using Graph API for media fetch')
        
        try {
          // まずInstagram Business Account IDを取得
          console.log('[Instagram Service] Getting Instagram Business Account ID...')
          const accountResponse = await axios.get(`${INSTAGRAM_GRAPH_URL}/${this.userId}`, {
            params: {
              fields: 'instagram_business_account',
              access_token: this.accessToken,
            },
          })

          const instagramAccountId = accountResponse.data.instagram_business_account?.id
          
          if (!instagramAccountId) {
            throw new Error('Instagram Business Account ID not found')
          }

          console.log('[Instagram Service] Instagram Business Account ID:', instagramAccountId)

          // Instagram Business Account IDを使ってメディアを取得
          const response = await axios.get(`${INSTAGRAM_GRAPH_URL}/${instagramAccountId}/media`, {
            params: {
              fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,like_count,comments_count',
              limit,
              access_token: this.accessToken,
            },
          })

          // Graph APIのレスポンスをマッピング
          return (response.data.data || []).map((item: any) => ({
            ...item,
            // Graph APIは like_count を提供
            like_count: item.like_count || 0,
            comments_count: item.comments_count || 0,
          }))
        } catch (graphError) {
          console.error('[Instagram Service] Graph API specific error:', graphError)
          throw graphError
        }
      }

      // Basic Display API を使用する場合（フォールバック）
      console.log('[Instagram Service] Using Basic Display API for media fetch')
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
        console.error('[Instagram API] Media fetch error:')
        console.error('Endpoint:', this.isGraphAPI ? `${INSTAGRAM_GRAPH_URL}/${this.userId}/media` : `${INSTAGRAM_BASE_URL}/me/media`)
        console.error('User ID:', this.userId)
        console.error('API Type:', this.isGraphAPI ? 'Graph API' : 'Basic Display API')
        console.error('Status:', error.response?.status)
        console.error('Status Text:', error.response?.statusText)
        console.error('Data:', error.response?.data)
        console.error('Message:', error.message)
      } else {
        console.error('[Instagram API] Media fetch error:', error)
      }

      // Graph API でエラーが発生した場合、Basic Display API にフォールバック
      if (this.isGraphAPI) {
        console.log('[Instagram API] Falling back to Basic Display API')
        try {
          const response = await axios.get(`${INSTAGRAM_BASE_URL}/me/media`, {
            params: {
              fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,username',
              limit,
              access_token: this.accessToken,
            },
          })
          return response.data.data || []
        } catch (fallbackError) {
          console.error('[Instagram API] Fallback error:', fallbackError)
          return []
        }
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
const CACHE_DURATION = 1 * 60 * 1000 // 1分（ISRと同期）

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