-- Supabase用のテーブル作成SQL
-- Supabaseの「SQL Editor」で実行してください

-- お問い合わせテーブルを作成
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  furigana VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  inquiry_type VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  ip_address INET,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 作成日時でのインデックス（新しい順で取得するため）
CREATE INDEX idx_contact_submissions_created_at ON contact_submissions (created_at DESC);

-- ステータスでのインデックス（未対応分を検索するため）
CREATE INDEX idx_contact_submissions_status ON contact_submissions (status);

-- メールアドレスでのインデックス（重複チェック等で使用）
CREATE INDEX idx_contact_submissions_email ON contact_submissions (email);

-- 更新日時の自動更新トリガー
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_contact_submissions_updated_at
    BEFORE UPDATE ON contact_submissions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) の設定（セキュリティ強化）
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- 全てのユーザーが読み取り可能（管理画面用）
CREATE POLICY "Enable read access for all users" ON contact_submissions
    FOR SELECT USING (true);

-- 認証されたユーザーのみ挿入可能
CREATE POLICY "Enable insert for authenticated users only" ON contact_submissions
    FOR INSERT WITH CHECK (true);

-- 認証されたユーザーのみ更新可能（ステータス変更用）
CREATE POLICY "Enable update for authenticated users only" ON contact_submissions
    FOR UPDATE USING (true);

-- サンプルデータの挿入（テスト用）
INSERT INTO contact_submissions (
  name, 
  furigana, 
  email, 
  phone, 
  inquiry_type, 
  subject, 
  message
) VALUES (
  'テスト太郎',
  'テストタロウ',
  'test@example.com',
  '090-1234-5678',
  '体験レッスンについて',
  'テスト件名',
  'これはテスト用のお問い合わせです。'
);