# お問い合わせフォーム セットアップ手順

## 本格運用に必要な設定

### 1. Resend アカウント設定

1. [Resend](https://resend.com) でアカウント作成
2. APIキーを取得
3. ドメイン認証設定

### 2. Supabase データベース設定（推奨）

1. [Supabase](https://supabase.com) でプロジェクト作成
2. `supabase-setup.sql` を SQL Editor で実行
3. Project URL と Anon Key を取得

### 3. Upstash Redis設定（オプション）

1. [Upstash](https://upstash.com) でアカウント作成
2. Redis データベース作成
3. 接続情報を取得

### 3. 環境変数設定

`.env.local` ファイルを編集：

```env
# 必須: Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxx

# 推奨: Supabase (データベース)
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxx

# オプション: Upstash Redis (レート制限用)
UPSTASH_REDIS_REST_URL=https://xxxxxxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxx

# メール設定
CONTACT_EMAIL_TO=info@hohoemi-lab.com
CONTACT_EMAIL_FROM=noreply@resend.dev
```

## 現在の実装状況

### ✅ 実装済み機能

- **フォームバリデーション**: Zodスキーマによる厳密な検証
- **メール送信**: ResendAPI経由で管理者・顧客双方に送信
- **レート制限**: Upstash Redis対応（未設定時はメモリベース）
- **データ保存**: Supabase PostgreSQL（フォールバック：JSONファイル）
- **セキュリティ**: HTMLエスケープ、XSS対策
- **エラーハンドリング**: 適切なエラーレスポンス

### 📁 作成されたファイル

```
src/
├── app/
│   ├── api/
│   │   └── contact/
│   │       └── route.ts          # API エンドポイント
│   └── contact/
│       ├── page.tsx              # 既存ページ（修正済み）
│       └── ContactPageClient.tsx # クライアントコンポーネント
├── lib/
│   ├── database.ts               # データ保存機能
│   └── ratelimit.ts             # レート制限機能
data/
└── contacts.json                 # お問い合わせデータ（自動作成）
```

## 本番デプロイ時の注意事項

### 1. 環境変数の設定
- Vercel/Netlifyの管理画面で環境変数を設定
- `RESEND_API_KEY` は必須

### 2. ドメイン認証
- ResendでSPF/DKIMレコード設定
- 送信元ドメインの認証完了

### 3. データバックアップ
- 現在は `data/contacts.json` にデータ保存
- 本番環境では定期的なバックアップを推奨

## テスト方法

```bash
# 開発サーバー起動
npm run dev

# フォームテスト（有効データ）
curl -X POST http://localhost:3001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name":"テスト太郎",
    "phone":"090-1234-5678",
    "email":"test@example.com",
    "inquiryType":"体験レッスンについて",
    "subject":"テスト件名",
    "message":"これはテストメッセージです。10文字以上の内容を入力しています。",
    "privacy":true
  }'
```

## セキュリティ対策

- ✅ 入力データのバリデーション
- ✅ HTMLエスケープ処理
- ✅ レート制限（IP単位）
- ✅ CSRFトークン（Next.js標準）
- ✅ 適切なHTTPヘッダー設定

## 今後の改善案

1. **データベース移行**: PostgreSQL + Prisma
2. **管理画面**: お問い合わせ一覧・返信管理
3. **通知機能**: Slack/Discord連携
4. **分析機能**: お問い合わせ統計
5. **スパム対策**: reCAPTCHA導入