import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN
    const userId = process.env.INSTAGRAM_USER_ID
    
    console.log('Environment check:', {
      hasAccessToken: !!accessToken,
      accessTokenLength: accessToken?.length || 0,
      hasUserId: !!userId,
      userId: userId || 'not set'
    })

    if (!accessToken) {
      return NextResponse.json({ 
        error: 'INSTAGRAM_ACCESS_TOKEN not set',
        env: process.env.NODE_ENV 
      }, { status: 500 })
    }

    // Instagram APIに直接リクエスト
    const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=3&access_token=${accessToken}`)
    
    if (!response.ok) {
      const errorText = await response.text()
      console.error('Instagram API Error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      })
      
      return NextResponse.json({ 
        error: 'Instagram API Error',
        status: response.status,
        details: errorText
      }, { status: response.status })
    }

    const data = await response.json()
    
    return NextResponse.json({
      success: true,
      mediaCount: data.data?.length || 0,
      data: data.data || [],
      message: 'Instagram API working correctly'
    })

  } catch (error) {
    console.error('Test endpoint error:', error)
    return NextResponse.json({ 
      error: 'Server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}