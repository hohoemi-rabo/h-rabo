// シンプルなメモリベースのレート制限（Resend専用実装）
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

// レート制限インスタンス（1時間に5回まで）
export const contactFormRateLimit = new SimpleRateLimit(5, 60 * 60 * 1000)

export async function checkRateLimit(identifier: string) {
  return await contactFormRateLimit.check(identifier)
}