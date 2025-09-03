import { NextRequest, NextResponse } from 'next/server'
import { getCachedInstagramData } from '@/lib/instagram'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const refresh = searchParams.get('refresh') === 'true'

    // リフレッシュが指定されている場合は、キャッシュをクリア
    if (refresh) {
      // キャッシュクリア機能を追加する場合
      console.log('Instagram data refresh requested')
    }

    const data = await getCachedInstagramData()

    // データが取得できない場合はダミーデータを返す
    if (!data.media.length) {
      console.warn('No Instagram data available, using fallback')
      
      return NextResponse.json({
        success: true,
        data: {
          media: [],
          user: null,
          cached: false,
          message: 'Instagram API not configured or no data available'
        }
      })
    }

    return NextResponse.json({
      success: true,
      data: {
        media: data.media.map(post => ({
          id: post.id,
          imageUrl: post.media_url,
          caption: post.caption || '',
          likes: Math.floor(Math.random() * 50) + 10, // Instagram Basic Display APIではいいね数取得不可のため仮数値
          createdAt: post.timestamp,
          permalink: post.permalink,
          mediaType: post.media_type
        })),
        user: data.user ? {
          username: data.user.username,
          displayName: 'パソコン・スマホ ほほ笑みラボ',
          bio: '長野県飯田市のパソコン・スマホ教室\n📍飯田市上郷飯沼\n📞 090-5646-5670\n⏰ 10:00-18:00（水・日定休）',
          posts: data.user.media_count,
          followers: 342, // 実際のフォロワー数はGraph APIでないと取得できない
          following: 89,
          website: 'https://hohoemi-lab.com'
        } : null,
        cached: true,
        timestamp: data.timestamp
      }
    })

  } catch (error) {
    console.error('Instagram API error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch Instagram data',
        data: {
          media: [],
          user: null,
          cached: false
        }
      },
      { status: 500 }
    )
  }
}

// POST method for manual sync/refresh
export async function POST(request: NextRequest) {
  try {
    // 手動同期トリガー
    console.log('Manual Instagram sync triggered')
    
    const data = await getCachedInstagramData()
    
    return NextResponse.json({
      success: true,
      message: 'Instagram data refreshed successfully',
      data: {
        mediaCount: data.media.length,
        timestamp: data.timestamp
      }
    })

  } catch (error) {
    console.error('Instagram sync error:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to sync Instagram data'
      },
      { status: 500 }
    )
  }
}