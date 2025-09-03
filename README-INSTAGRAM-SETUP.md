# Instagram同期機能 セットアップ手順

## 🎯 概要

スマホでInstagramに投稿すると、ホームページに自動で同期される機能です。

## 📋 必要な作業

### 1. Instagram Basic Display API の設定

#### Meta Developers でアプリケーション作成
1. [Meta Developers](https://developers.facebook.com/) にアクセス
2. 「My Apps」→「Create App」
3. アプリタイプ：**Consumer** を選択
4. アプリ名：`Hohoemi Lab Website`
5. アプリを作成

#### Instagram Basic Display 追加
1. アプリダッシュボードで「Add Product」
2. **Instagram Basic Display** を選択・追加
3. 「Set Up」をクリック

#### Instagram テスター追加
1. Instagram Basic Display → Basic Display
2. 「Instagram Testers」セクションで「Add Instagram Testers」
3. Instagramユーザー名を入力して招待
4. Instagramアプリで招待を承認

#### アクセストークン取得
1. 「Generate Token」をクリック
2. Instagramでログインして許可
3. アクセストークンをコピー

### 2. 環境変数の設定

`.env.local` に以下を追加：

```env
# Instagram Basic Display API
INSTAGRAM_APP_ID=your_app_id_here
INSTAGRAM_APP_SECRET=your_app_secret_here  
INSTAGRAM_ACCESS_TOKEN=your_long_lived_access_token_here
```

### 3. 長期アクセストークンへの変換

初回取得したトークンは1時間で期限切れになるため、長期トークン（60日）に変換：

```bash
curl -X GET \
  "https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token={your-short-lived-token}"
```

## 🔄 同期の仕組み

### 自動同期フロー
1. **投稿検知**: 30分間隔でInstagram APIをチェック
2. **データ取得**: 最新6件の投稿を取得
3. **キャッシュ更新**: サーバーサイドでデータをキャッシュ
4. **ページ反映**: 次回アクセス時に新しい投稿を表示

### 手動同期
API Route: `POST /api/instagram` で即座に同期をトリガー

## 🛠️ 技術仕様

### 実装ファイル
- `src/lib/instagram.ts` - Instagram API サービス
- `src/app/api/instagram/route.ts` - API Route
- `src/app/instagram/page.tsx` - Instagram ページ

### キャッシュ戦略
- **キャッシュ時間**: 30分
- **フォールバック**: API エラー時はダミーデータ表示
- **リフレッシュ**: `?refresh=true` パラメータで強制更新

### データ変換
- Instagram API レスポンス → サイト表示形式に変換
- いいね数：Basic Display API では取得不可のため仮数値
- フォロワー数：Graph API が必要なため固定値使用

## 📊 制限事項

### Instagram Basic Display API の制限
- **時間制限**: 1時間あたり200リクエスト
- **データ制限**: 基本的な投稿情報のみ（いいね数、コメント数取得不可）
- **ユーザー制限**: テスターとして招待されたユーザーのみ

### フォールバック機能
- API エラー時：ダミーデータ表示
- トークン期限切れ：自動リフレッシュ（60日毎）
- レート制限：キャッシュで対応

## 🔧 トラブルシューティング

### よくある問題

1. **「Instagram account not found」エラー**
   - Instagram テスターとして招待されているか確認
   - アプリの権限が正しく設定されているか確認

2. **トークンエラー**
   - 長期アクセストークンへの変換が必要
   - 60日毎にリフレッシュが必要

3. **データが表示されない**
   - 環境変数が正しく設定されているか確認
   - API レスポンスをログで確認

### デバッグ方法
```bash
# API動作確認
curl http://localhost:3001/api/instagram

# 強制リフレッシュ
curl http://localhost:3001/api/instagram?refresh=true
```

## 🚀 運用開始

1. 環境変数を設定
2. Instagram テスターとして招待を受諾
3. 長期アクセストークンを取得
4. デプロイ後、API動作確認
5. 投稿テストで同期を確認

## 📝 注意事項

- アクセストークンは60日で期限切れ（自動リフレッシュ対応済み）
- Instagram Business Account への切り替えでより多くの機能利用可能
- 本番環境では Meta App Review が必要な場合があります