'use client';

import React from 'react';
import Link from 'next/link';
import { VideoItem } from '@/types/youtube';
import VideoCard from './VideoCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import { ArrowRight } from 'lucide-react';

interface VideoRowProps {
  videos: VideoItem[];
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export default function VideoRow({
  videos,
  title,
  subtitle,
  seeAllHref,
  isLoading = false,
  emptyTitle,
  emptyDescription,
}: VideoRowProps) {
  if (isLoading) {
    return <LoadingState count={5} title={title} />;
  }

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">{subtitle}</p>
          ) : null}
        </div>

        {seeAllHref ? (
          <Link
            href={seeAllHref}
            className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 transition-colors group"
          >
            <span>See all</span>
            <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        ) : null}
      </div>

      {/* Horizontal Scrolling Video Row */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-5 pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12">
        {videos.map((video) => (
          <div
            key={video.id}
            className="w-[280px] sm:w-[300px] lg:w-[320px] shrink-0 snap-start"
          >
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </section>
  );
}
