import { Metadata } from 'next'
import InstagramPageClient from './InstagramPageClient'
import InstagramFrameTransition from '@/components/animations/InstagramFrameTransition'

export const metadata: Metadata = {
  title: 'Instagram | パソコン・スマホ ほほ笑みラボ',
  description: '最新の授業風景や生徒さんの様子をInstagramでお届けしています。',
  openGraph: {
    title: 'Instagram | パソコン・スマホ ほほ笑みラボ',
    description: '最新の授業風景や生徒さんの様子をInstagramでお届けしています。',
    images: ['/og-instagram.png'],
  },
}

// ISR（Incremental Static Regeneration）を有効にする
// 60秒ごとに再生成（1分）
export const revalidate = 60

// Instagram APIからデータを取得
async function getInstagramData() {
  try {
    // サーバーサイドで直接Instagram APIから取得
    const { getCachedInstagramData } = await import('@/lib/instagram')
    const data = await getCachedInstagramData()
    
    return {
      media: data.media.map((post) => ({
        id: post.id,
        imageUrl: post.media_url,
        caption: post.caption || '',
        // Graph APIの場合は実際のいいね数、Basic APIの場合はデフォルト値
        likes: post.like_count || 0,
        comments: post.comments_count || 0,
        createdAt: post.timestamp,
        permalink: post.permalink,
        mediaType: post.media_type
      })),
      user: data.user ? {
        username: data.user.username,
        displayName: 'パソコン・スマホ ほほ笑みラボ',
        bio: '長野県飯田市のパソコン・スマホ教室\n📍飯田市上郷飯沼\n📞 090-5646-5670\n⏰ 10:00-18:00（土日定休）',
        posts: data.user.media_count,
        followers: 342,
        following: 89,
        website: 'https://hohoemi-rabo.com'
      } : null
    }
  } catch (error) {
    console.error('Instagram data fetch error:', error)
    
    // フォールバック：ダミーデータを返す
    return {
      media: [
        {
          id: '1',
          imageUrl: 'https://via.placeholder.com/400x400/1a1a2e/16213e?text=Post+1',
          caption: 'パソコン初心者向けレッスン開催中！今日は基本操作を学習しています。皆さん熱心に取り組んでいます✨',
          likes: 24,
          createdAt: '2025-09-01T10:00:00Z'
        },
        {
          id: '2',
          imageUrl: 'https://via.placeholder.com/400x400/0f3460/16213e?text=Post+2',
          caption: 'スマホ写真講座の様子です📸 素敵な写真がたくさん撮れました！',
          likes: 18,
          createdAt: '2025-08-30T15:30:00Z'
        },
        {
          id: '3',
          imageUrl: 'https://via.placeholder.com/400x400/16213e/1a1a2e?text=Post+3',
          caption: 'Excel講座では表計算の基礎から応用まで丁寧に指導しています💻',
          likes: 31,
          createdAt: '2025-08-28T14:00:00Z'
        },
        {
          id: '4',
          imageUrl: 'https://via.placeholder.com/400x400/533483/16213e?text=Post+4',
          caption: '生徒さん同士で教え合う素晴らしい光景です👥 みんなで成長しています！',
          likes: 27,
          createdAt: '2025-08-25T11:15:00Z'
        },
        {
          id: '5',
          imageUrl: 'https://via.placeholder.com/400x400/7209b7/533483?text=Post+5',
          caption: 'オンライン授業の準備風景です💻 リモートでも充実したレッスンを提供しています',
          likes: 22,
          createdAt: '2025-08-23T16:45:00Z'
        },
        {
          id: '6',
          imageUrl: 'https://via.placeholder.com/400x400/2d1b69/7209b7?text=Post+6',
          caption: '新しいソフトウェアの講習会を開催しました🎉 皆さん興味深々でした！',
          likes: 19,
          createdAt: '2025-08-20T13:20:00Z'
        }
      ],
      user: {
        username: 'hohoemi_lab',
        displayName: 'パソコン・スマホ ほほ笑みラボ',
        bio: '長野県飯田市のパソコン・スマホ教室\n📍飯田市上郷飯沼\n📞 090-5646-5670\n⏰ 10:00-18:00（土日定休・電話対応可能）',
        posts: 156,
        followers: 342,
        following: 89,
        website: 'https://hohoemi-rabo.com'
      }
    }
  }
}

export default async function InstagramPage() {
  const data = await getInstagramData()
  
  // デフォルトのアカウント情報を設定
  const defaultAccountInfo = {
    username: 'hohoemi_lab',
    displayName: 'パソコン・スマホ ほほ笑みラボ',
    bio: '長野県飯田市のパソコン・スマホ教室\n📍飯田市上郷飯沼\n📞 090-5646-5670\n⏰ 10:00-18:00（土日定休・電話対応可能）',
    posts: 156,
    followers: 342,
    following: 89,
    website: 'https://hohoemi-rabo.com'
  }
  
  return (
    <InstagramFrameTransition>
      <InstagramPageClient posts={data.media} accountInfo={data.user || defaultAccountInfo} />
    </InstagramFrameTransition>
  )
}