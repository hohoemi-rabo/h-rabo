import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  eslint: {
    // 本番ビルド時にESLintエラーを無視（開発時は有効）
    ignoreDuringBuilds: true,
  },
}

export default nextConfig
