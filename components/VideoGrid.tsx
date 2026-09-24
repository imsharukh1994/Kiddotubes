'use client';

import React from 'react';
import { VideoItem } from '@/types/youtube';
import VideoCard from './VideoCard';
import EmptyState from './EmptyState';
import LoadingState from './LoadingState';

interface VideoGridProps {
  videos: VideoItem[];
  title?: string;
  badge?: string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function VideoGrid({
  videos,
  title,
  badge,
  isLoading = false,
  emptyTitle,
  emptyDescription,
}: VideoGridProps) {
  if (isLoading) {
    return <LoadingState count={8} title={title} />;
  }

  if (!videos || videos.length === 0) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <section className="my-6">
      {title && (
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          {badge && (
            <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-black rounded-full uppercase tracking-wider border border-purple-200">
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
