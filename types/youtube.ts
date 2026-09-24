export interface YouTubeThumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface VideoItem {
  id: string;
  title: string;
  description: string;
  channelTitle: string;
  channelId?: string;
  publishedAt: string;
  duration?: string; // Formatted ISO 8601 e.g. PT4M13S -> 4:13
  thumbnails: {
    default?: YouTubeThumbnail;
    medium?: YouTubeThumbnail;
    high?: YouTubeThumbnail;
    maxres?: YouTubeThumbnail;
  };
  categorySlug?: string;
  ageGroup?: string;
}

export interface CategoryInfo {
  id: string;
  slug: string;
  title: string;
  ageGroup: "0–2" | "2–4" | "5–7" | "8–12";
  description: string;
  query: string;
  color: string;
  gradient: string;
  icon: string;
}

export interface YouTubeSearchItem {
  kind: string;
  id: {
    kind: string;
    videoId?: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default?: YouTubeThumbnail;
      medium?: YouTubeThumbnail;
      high?: YouTubeThumbnail;
    };
    channelTitle: string;
  };
}

export interface YouTubeVideoDetailsItem {
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default?: YouTubeThumbnail;
      medium?: YouTubeThumbnail;
      high?: YouTubeThumbnail;
      maxres?: YouTubeThumbnail;
    };
    channelTitle: string;
  };
  contentDetails?: {
    duration: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  nextPageToken?: string;
}
