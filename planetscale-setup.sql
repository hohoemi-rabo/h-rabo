-- PlanetScale用のテーブル作成SQL
-- PlanetScaleのコンソールで実行、またはpscaleコマンドで実行

CREATE TABLE contact_submissions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  furigana VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  inquiry_type VARCHAR(100) NOT NULL,
  subject VARCHAR(200) NOT NULL,
  message TEXT NOT NULL,
  ip_address VARCHAR(45),
  status ENUM('new', 'read', 'replied') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  -- インデックス
  INDEX idx_created_at (created_at DESC),
  INDEX idx_status (status),
  INDEX idx_email (email)
);

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