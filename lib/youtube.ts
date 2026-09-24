import { VideoItem, YouTubeSearchItem, YouTubeVideoDetailsItem } from '@/types/youtube';

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Format ISO 8601 duration (e.g. PT4M13S -> 4:13)
 */
export function formatIsoDuration(isoDuration?: string): string {
  if (!isoDuration) return '0:00';
  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '0:00';
  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
  if (hours > 0) {
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${formattedMinutes}:${formattedSeconds}`;
  }
  return `${minutes}:${formattedSeconds}`;
}

/**
 * Server-side function to search YouTube videos
 */
export async function searchYouTubeVideos(query: string, maxResults: number = 12): Promise<VideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    console.warn('YOUTUBE_API_KEY is not set or using placeholder.');
    return [];
  }

  try {
    const searchUrl = new URL(`${YOUTUBE_API_BASE_URL}/search`);
    searchUrl.searchParams.set('key', apiKey);
    searchUrl.searchParams.set('part', 'snippet');
    searchUrl.searchParams.set('q', `${query} kids`);
    searchUrl.searchParams.set('type', 'video');
    searchUrl.searchParams.set('videoEmbeddable', 'true');
    searchUrl.searchParams.set('safeSearch', 'strict');
    searchUrl.searchParams.set('videoDuration', 'medium'); // Filter out vertical YouTube shorts under 2 minutes
    searchUrl.searchParams.set('maxResults', maxResults.toString());

    const res = await fetch(searchUrl.toString(), {
      next: { revalidate: 3600 }, // Cache search queries for 1 hour to respect API limits
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`YouTube API Search error (${res.status}):`, errText);
      return [];
    }

    const data = await res.json();
    const items: YouTubeSearchItem[] = data.items || [];
    const videoIds = items.map(item => item.id.videoId).filter(Boolean) as string[];

    if (videoIds.length === 0) return [];

    // Fetch video details (to get duration)
    const details = await getVideoDetailsByIds(videoIds);
    return details;
  } catch (error) {
    console.error('Failed to search YouTube videos:', error);
    return [];
  }
}

/**
 * Server-side function to fetch details for multiple video IDs
 */
export async function getVideoDetailsByIds(videoIds: string[]): Promise<VideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    return [];
  }

  try {
    const detailsUrl = new URL(`${YOUTUBE_API_BASE_URL}/videos`);
    detailsUrl.searchParams.set('key', apiKey);
    detailsUrl.searchParams.set('part', 'snippet,contentDetails');
    detailsUrl.searchParams.set('id', videoIds.join(','));

    const res = await fetch(detailsUrl.toString(), {
      next: { revalidate: 86400 }, // Cache video details for 24 hours
    });

    if (!res.ok) {
      console.error(`YouTube API Video Details error (${res.status}):`, await res.text());
      return [];
    }

    const data = await res.json();
    const items: YouTubeVideoDetailsItem[] = data.items || [];

    return items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      duration: formatIsoDuration(item.contentDetails?.duration),
      thumbnails: item.snippet.thumbnails,
    }));
  } catch (error) {
    console.error('Failed to fetch YouTube video details:', error);
    return [];
  }
}

/**
 * Fetch details for a single video ID
 */
export async function getSingleVideoDetails(videoId: string): Promise<VideoItem | null> {
  const results = await getVideoDetailsByIds([videoId]);
  return results.length > 0 ? results[0] : null;
}
