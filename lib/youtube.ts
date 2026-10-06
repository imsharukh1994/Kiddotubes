import { VideoItem, YouTubeSearchItem, YouTubeVideoDetailsItem } from '@/types/youtube';

const YOUTUBE_API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

// Curated high-quality kid-friendly fallback videos used if YouTube API key is missing or quota is exceeded
const FALLBACK_KIDS_VIDEOS: VideoItem[] = [
  {
    id: '_slpLnBoHek',
    title: 'Meow Meow Billi Karti | Hindi Rhyme For Kids | Balgeet In Hindi',
    description: 'Fun educational nursery rhymes for toddlers and kids with cute animated characters.',
    channelTitle: 'Zolotune Toons',
    publishedAt: '2024-01-15T00:00:00Z',
    duration: '6:16',
    ageGroup: '2–4',
    categorySlug: 'songs',
    thumbnails: {
      high: { url: 'https://img.youtube.com/vi/_slpLnBoHek/hqdefault.jpg' },
      medium: { url: 'https://img.youtube.com/vi/_slpLnBoHek/mqdefault.jpg' },
    },
  },
  {
    id: 'fC7oUOUEEi4',
    title: 'Wheels on the Bus Go Round and Round | CoComelon Nursery Rhymes',
    description: 'Sing along with JJ and family to the classic nursery rhyme Wheels on the Bus!',
    channelTitle: 'CoComelon - Nursery Rhymes',
    publishedAt: '2024-02-10T00:00:00Z',
    duration: '3:32',
    ageGroup: '0–2',
    categorySlug: 'songs',
    thumbnails: {
      high: { url: 'https://img.youtube.com/vi/fC7oUOUEEi4/hqdefault.jpg' },
      medium: { url: 'https://img.youtube.com/vi/fC7oUOUEEi4/mqdefault.jpg' },
    },
  },
  {
    id: 'XqZsoesa55w',
    title: 'Baby Shark Dance | #babyshark Most Viewed Video',
    description: 'Sing and dance along with Baby Shark, Mommy Shark, Daddy Shark and friends!',
    channelTitle: 'Pinkfong Baby Shark',
    publishedAt: '2024-01-01T00:00:00Z',
    duration: '2:16',
    ageGroup: '0–2',
    categorySlug: 'songs',
    thumbnails: {
      high: { url: 'https://img.youtube.com/vi/XqZsoesa55w/hqdefault.jpg' },
      medium: { url: 'https://img.youtube.com/vi/XqZsoesa55w/mqdefault.jpg' },
    },
  },
  {
    id: 't0Q2otsqC4I',
    title: 'Learn ABC Alphabet Phonics Song for Kids & Toddlers',
    description: 'Learn letters A to Z with Phonics sounds and colorful animations.',
    channelTitle: 'Super Simple Songs',
    publishedAt: '2024-03-05T00:00:00Z',
    duration: '4:45',
    ageGroup: '2–4',
    categorySlug: 'learning',
    thumbnails: {
      high: { url: 'https://img.youtube.com/vi/t0Q2otsqC4I/hqdefault.jpg' },
      medium: { url: 'https://img.youtube.com/vi/t0Q2otsqC4I/mqdefault.jpg' },
    },
  },
  {
    id: '30pY7-F-JdI',
    title: '30 Cute Animal Sounds for Kids | Real Animal Sounds for Toddlers',
    description: 'Learn wild animals and farm animals sounds with fun 4K visuals.',
    channelTitle: 'Kids Learning Fun',
    publishedAt: '2024-02-20T00:00:00Z',
    duration: '8:22',
    ageGroup: '2–4',
    categorySlug: 'learning',
    thumbnails: {
      high: { url: 'https://img.youtube.com/vi/30pY7-F-JdI/hqdefault.jpg' },
      medium: { url: 'https://img.youtube.com/vi/30pY7-F-JdI/mqdefault.jpg' },
    },
  },
  {
    id: '71h8MZKFkt4',
    title: 'Solar System Song for Kids | Planet Song Educational Discovery',
    description: 'Explore Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, and Neptune!',
    channelTitle: 'Kids Learning Tube',
    publishedAt: '2024-01-20T00:00:00Z',
    duration: '5:10',
    ageGroup: '5–7',
    categorySlug: 'science',
    thumbnails: {
      high: { url: 'https://img.youtube.com/vi/71h8MZKFkt4/hqdefault.jpg' },
      medium: { url: 'https://img.youtube.com/vi/71h8MZKFkt4/mqdefault.jpg' },
    },
  },
  {
    id: 'dp1_xV0-R0k',
    title: 'Bedtime Lullaby Calm Music for Babies to Sleep',
    description: 'Gentle relaxing music and calm twinkling stars for bedtime sleep.',
    channelTitle: 'Lullaby World',
    publishedAt: '2024-01-10T00:00:00Z',
    duration: '12:00',
    ageGroup: '0–2',
    categorySlug: 'stories',
    thumbnails: {
      high: { url: 'https://img.youtube.com/vi/dp1_xV0-R0k/hqdefault.jpg' },
      medium: { url: 'https://img.youtube.com/vi/dp1_xV0-R0k/mqdefault.jpg' },
    },
  },
  {
    id: 'hTqtGJwsJVE',
    title: 'Easy Drawing & Painting Craft Tutorial for Kids',
    description: 'Step by step easy drawing for kids to boost creativity and imagination.',
    channelTitle: 'Art for Kids Hub',
    publishedAt: '2024-03-01T00:00:00Z',
    duration: '7:40',
    ageGroup: '5–7',
    categorySlug: 'creativity',
    thumbnails: {
      high: { url: 'https://img.youtube.com/vi/hTqtGJwsJVE/hqdefault.jpg' },
      medium: { url: 'https://img.youtube.com/vi/hTqtGJwsJVE/mqdefault.jpg' },
    },
  }
];

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
  // YouTube accepts 0-50; also guards against NaN from a malformed ?limit= query parameter.
  maxResults = Number.isFinite(maxResults) ? Math.min(Math.max(Math.trunc(maxResults), 1), 50) : 12;
  query = (query || '').trim() || 'educational videos';
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    console.warn('YOUTUBE_API_KEY is not set or using placeholder, using fallback videos.');
    return FALLBACK_KIDS_VIDEOS.slice(0, maxResults);
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
      return FALLBACK_KIDS_VIDEOS.slice(0, maxResults);
    }

    const data = await res.json();
    const items: YouTubeSearchItem[] = data.items || [];
    const videoIds = items.map(item => item.id.videoId).filter(Boolean) as string[];

    if (videoIds.length === 0) return FALLBACK_KIDS_VIDEOS.slice(0, maxResults);

    // Fetch video details (to get duration)
    const details = await getVideoDetailsByIds(videoIds);
    return details.length > 0 ? details : FALLBACK_KIDS_VIDEOS.slice(0, maxResults);
  } catch (error) {
    console.error('Failed to search YouTube videos:', error);
    return FALLBACK_KIDS_VIDEOS.slice(0, maxResults);
  }
}

/**
 * Server-side function to fetch details for multiple video IDs
 */
export async function getVideoDetailsByIds(videoIds: string[]): Promise<VideoItem[]> {
  const apiKey = process.env.YOUTUBE_API_KEY;
  if (!apiKey || apiKey === 'your_youtube_api_key_here') {
    return FALLBACK_KIDS_VIDEOS.filter(v => videoIds.includes(v.id));
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
      return FALLBACK_KIDS_VIDEOS.filter(v => videoIds.includes(v.id));
    }

    const data = await res.json();
    const items: YouTubeVideoDetailsItem[] = data.items || [];

    const parsed = items.map(item => ({
      id: item.id,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      channelId: item.snippet.channelId,
      publishedAt: item.snippet.publishedAt,
      duration: formatIsoDuration(item.contentDetails?.duration),
      thumbnails: item.snippet.thumbnails,
    }));

    return parsed.length > 0 ? parsed : FALLBACK_KIDS_VIDEOS.filter(v => videoIds.includes(v.id));
  } catch (error) {
    console.error('Failed to fetch YouTube video details:', error);
    return FALLBACK_KIDS_VIDEOS.filter(v => videoIds.includes(v.id));
  }
}

/**
 * Fetch details for a single video ID
 */
export async function getSingleVideoDetails(videoId: string): Promise<VideoItem | null> {
  const results = await getVideoDetailsByIds([videoId]);
  if (results.length > 0) return results[0];
  const fallbackMatch = FALLBACK_KIDS_VIDEOS.find(v => v.id === videoId);
  if (fallbackMatch) return fallbackMatch;

  // Generic fallback single video object so watch page never renders empty
  return {
    id: videoId,
    title: 'Kids Learning Video',
    description: 'Enjoy watching safe educational videos for kids on KiddoTube.',
    channelTitle: 'KiddoTube Featured Channel',
    publishedAt: new Date().toISOString(),
    duration: '5:00',
    ageGroup: '2–6',
    thumbnails: {
      high: { url: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` },
      medium: { url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg` },
    },
  };
}

