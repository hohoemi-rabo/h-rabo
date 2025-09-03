import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // 本番ビルド時にESLintエラーを無視（開発時は有効）
    ignoreDuringBuilds: true,
  },
  
  // 画像最適化設定
  images: {
    // 対応フォーマット（WebP、AVIF対応）
    formats: ['image/avif', 'image/webp'],
    
    // デバイスサイズのブレークポイント
    deviceSizes: [640, 768, 1024, 1280, 1600],
    
    // 画像サイズプリセット
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Instagram画像のドメインを許可
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scontent.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'scontent-*.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: '*.fbcdn.net',
      },
    ],
  },
  
  
  // セキュリティヘッダー
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
      {
        // 静的アセットのキャッシュ設定
        source: '/(.*\\.(?:ico|png|jpg|jpeg|webp|avif|svg|gif|woff|woff2|ttf|otf|eot))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
