'use client'

import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">エラーが発生しました</h1>
      <p className="text-lg mb-4">申し訳ございませんが、問題が発生しました。</p>
      <p className="text-sm text-gray-600 mb-8">
        {error.message || 'システムエラーが発生しています'}
      </p>
      <div className="space-x-4">
        <button
          onClick={() => reset()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
        >
          再試行
        </button>
        <Link
          href="/"
          className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-colors inline-block"
        >
          ホームページに戻る
        </Link>
      </div>
    </div>
  )
}