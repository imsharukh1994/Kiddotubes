import { NextRequest, NextResponse } from 'next/server';
import { searchYouTubeVideos } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get('q') || 'kids educational videos';
  const limitParam = searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 12;

  try {
    const videos = await searchYouTubeVideos(q, limit);
    return NextResponse.json({
      success: true,
      data: videos,
      query: q,
    });
  } catch (error) {
    console.error('API /api/youtube/search error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to search YouTube videos' },
      { status: 500 }
    );
  }
}
