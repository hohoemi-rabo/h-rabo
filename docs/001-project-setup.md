# 001: プロジェクトセットアップ

## 概要

プロジェクトの基本的な構成とパッケージのインストールを行う

## 優先度

High

## 前提条件

なし

## Todoリスト

- [×] 必要なパッケージのインストール
  - [×] Framer Motion v11のインストール
  - [×] Three.js (React Three Fiber v8)のインストール
  - [×] Zustand v4のインストール
  - [×] 追加のUIライブラリ（必要に応じて）
- [×] プロジェクト構造の作成
  - [×] src/components ディレクトリ構成
  - [×] src/lib ディレクトリ作成
  - [×] src/types ディレクトリ作成
  - [×] src/hooks ディレクトリ作成
  - [×] src/store ディレクトリ作成（Zustand用）
- [×] TypeScript設定の調整
  - [×] パス設定の確認
  - [×] 型定義ファイルの準備
- [×] ESLint設定の調整
- [×] Prettierの設定追加（必要に応じて）

## 実装詳細

### パッケージインストールコマンド

```bash
npm install framer-motion@11 three @react-three/fiber@8 @react-three/drei zustand@4
npm install -D @types/three
```

### ディレクトリ構造

```
src/
├── app/           # Next.js App Router
├── components/    # コンポーネント
│   ├── ui/       # 基本UIコンポーネント
│   ├── layouts/  # レイアウトコンポーネント
│   └── features/ # 機能別コンポーネント
├── lib/          # ユーティリティ関数
├── types/        # TypeScript型定義
├── hooks/        # カスタムフック
└── store/        # Zustand store
```

## 完了条件

- すべてのパッケージが正常にインストールされている
- ディレクトリ構造が作成されている
- プロジェクトがエラーなく起動する（npm run dev）
- TypeScriptのコンパイルエラーがない（npx tsc --noEmit）
