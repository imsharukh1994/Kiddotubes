'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { VideoItem } from '@/types/youtube';
import VideoCard from './VideoCard';
import LoadingState from './LoadingState';
import EmptyState from './EmptyState';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

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
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingState count={5} title={title} />;
  }

  if (!videos || videos.length === 0) {
    return null;
  }

  return (
    <section className="my-6 sm:my-8 group/row relative">
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-4">
        <div>
          {title ? (
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
              {title}
            </h2>
          ) : null}
          {subtitle ? (
            <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">{subtitle}</p>
          ) : null}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Scroll controls - hidden on touch devices, visible on desktop hover */}
          <div className="hidden md:flex items-center gap-1.5 opacity-0 group-hover/row:opacity-100 transition-opacity">
            <button
              onClick={() => scroll('left')}
              className="p-1.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-purple-50 hover:text-purple-700 transition-all focus:outline-none"
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="p-1.5 rounded-full bg-white text-slate-700 border border-slate-200 shadow-sm hover:bg-purple-50 hover:text-purple-700 transition-all focus:outline-none"
              aria-label="Scroll right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {seeAllHref ? (
            <Link
              href={seeAllHref}
              className="text-xs font-bold text-purple-700 hover:text-purple-900 flex items-center gap-1 transition-colors px-2 py-1 rounded-lg hover:bg-purple-50"
            >
              <span>See all</span>
              <ArrowRight className="w-3.5 h-3.5 transform group-hover/row:translate-x-0.5 transition-transform" />
            </Link>
          ) : null}
        </div>
      </div>

      {/* Horizontal Scrolling Video Row */}
      <div
        ref={rowRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3.5 sm:gap-5 pb-3 -mx-4 px-4 xs:-mx-5 xs:px-5 sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 scroll-smooth"
      >
        {videos.map((video) => (
          <div
            key={video.id}
            className="w-[230px] xs:w-[260px] sm:w-[290px] lg:w-[320px] shrink-0 snap-start"
          >
            <VideoCard video={video} />
          </div>
        ))}
      </div>
    </section>
  );
}

