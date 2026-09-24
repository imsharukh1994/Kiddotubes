import { NextRequest, NextResponse } from 'next/server';
import { getVideoDetailsByIds, getSingleVideoDetails } from '@/lib/youtube';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const ids = searchParams.get('ids');
  const id = searchParams.get('id');

  try {
    if (id) {
      const video = await getSingleVideoDetails(id);
      return NextResponse.json({
        success: true,
        data: video,
      });
    }

    if (!ids) {
      return NextResponse.json(
        { success: false, error: 'Missing id or ids query parameter' },
        { status: 400 }
      );
    }

    const idList = ids.split(',').map(s => s.trim()).filter(Boolean);
    const videos = await getVideoDetailsByIds(idList);
    return NextResponse.json({
      success: true,
      data: videos,
    });
  } catch (error) {
    console.error('API /api/youtube/videos error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch video details' },
      { status: 500 }
    );
  }
}
