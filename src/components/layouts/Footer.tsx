import Link from 'next/link'
import Container from '@/components/ui/Container'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <Container>
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 会社情報 */}
            <div>
              <h3 className="text-lg font-bold mb-4">パソコン・スマホ ほほ笑みラボ</h3>
              <p className="text-gray-300 mb-4">ゆっくり、何度でも教えます！</p>
              <div className="text-sm text-gray-400 space-y-2">
                <p>〒395-0002</p>
                <p>長野県飯田市上郷飯沼2640-1</p>
                <p>TEL: 090-5646-5670</p>
              </div>
            </div>

            {/* サイトリンク */}
            <div>
              <h3 className="text-lg font-bold mb-4">サイトマップ</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    ホーム
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    講師紹介
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-white transition-colors">
                    サービス
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-white transition-colors">
                    ブログ
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:text-white transition-colors">
                    よくある質問
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    お問い合わせ
                  </Link>
                </li>
              </ul>
            </div>

            {/* その他の情報 */}
            <div>
              <h3 className="text-lg font-bold mb-4">その他</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/privacy" className="hover:text-white transition-colors">
                    プライバシーポリシー
                  </Link>
                </li>
              </ul>
              <div className="mt-6 text-sm text-gray-400">
                <p>営業時間: 平日 9:00-17:00</p>
                <p>（土日・祝日はお休み）</p>
              </div>
            </div>
          </div>
        </div>

        {/* コピーライト */}
        <div className="border-t border-gray-800 py-6">
          <div className="text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} パソコン・スマホ ほほ笑みラボ. All rights reserved.</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}