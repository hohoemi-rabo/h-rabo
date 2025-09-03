import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// 本番用レート制限（Upstash Redis使用）
function createProductionRateLimit() {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    return new Ratelimit({
      redis: Redis.fromEnv(),
      limiter: Ratelimit.slidingWindow(5, '1 h'), // 1時間に5回まで
      analytics: true,
    })
  }
  return null
}

// 開発用レート制限（メモリベース）
export class SimpleRateLimit {
  private requests: Map<string, { count: number; resetTime: number }> = new Map()
  private limit: number
  private windowMs: number

  constructor(limit: number = 5, windowMs: number = 60 * 60 * 1000) {
    this.limit = limit
    this.windowMs = windowMs
  }

  async check(identifier: string): Promise<{ success: boolean; remainingRequests?: number }> {
    const now = Date.now()
    const requestInfo = this.requests.get(identifier)

    if (!requestInfo || now > requestInfo.resetTime) {
      this.requests.set(identifier, {
        count: 1,
        resetTime: now + this.windowMs
      })
      return { success: true, remainingRequests: this.limit - 1 }
    }

    if (requestInfo.count >= this.limit) {
      return { success: false, remainingRequests: 0 }
    }

    requestInfo.count++
    this.requests.set(identifier, requestInfo)
    return { success: true, remainingRequests: this.limit - requestInfo.count }
  }
}

// 環境に応じてレート制限を選択
export const contactFormRateLimit = createProductionRateLimit() || new SimpleRateLimit(5, 60 * 60 * 1000)

export async function checkRateLimit(identifier: string) {
  if (contactFormRateLimit instanceof SimpleRateLimit) {
    return await contactFormRateLimit.check(identifier)
  } else {
    const result = await contactFormRateLimit.limit(identifier)
    return {
      success: result.success,
      remainingRequests: result.remaining
    }
  }
}