import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">404 - ページが見つかりません</h1>
      <p className="text-lg mb-8">お探しのページは存在しないか、移動された可能性があります。</p>
      <Link 
        href="/" 
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
      >
        ホームページに戻る
      </Link>
    </div>
  )
}