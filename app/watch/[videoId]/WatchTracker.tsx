'use client';

import { useEffect } from 'react';
import { VideoItem } from '@/types/youtube';
import { addRecentlyWatched } from '@/lib/storage';

export default function WatchTracker({ video }: { video: VideoItem }) {
  useEffect(() => {
    if (video) {
      addRecentlyWatched(video);
    }
  }, [video]);

  return null;
}
