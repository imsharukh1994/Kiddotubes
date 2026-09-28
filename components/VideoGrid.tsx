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
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-5 sm:mb-6">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          {badge && (
            <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-purple-100 text-purple-700 text-[11px] sm:text-xs font-black rounded-full uppercase tracking-wider border border-purple-200">
              {badge}
            </span>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5 lg:gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </section>
  );
}
