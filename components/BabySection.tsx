'use client';

import React from 'react';
import Link from 'next/link';
import { VideoItem } from '@/types/youtube';
import VideoCard from './VideoCard';
import { Heart, ShieldCheck, Moon } from 'lucide-react';

interface BabySectionProps {
  videos: VideoItem[];
}

export default function BabySection({ videos }: BabySectionProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="my-8 sm:my-10 p-4 xs:p-6 sm:p-8 bg-purple-50/60 border border-purple-100 rounded-2xl sm:rounded-3xl space-y-5 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-900 rounded-lg text-xs font-bold uppercase tracking-wider">
            <Moon className="w-3.5 h-3.5 text-purple-700 shrink-0" />
            <span>Babies & Toddlers (0–2)</span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 tracking-tight">
            Gentle Songs & Calm Sensory Content
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-600">
            Soft lullabies, calming sounds, and gentle visual rhythms designed for infants & toddlers.
          </p>
        </div>

        <Link
          href="/parents"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white hover:bg-purple-100 text-purple-900 rounded-xl text-xs font-bold border border-purple-200 transition-colors shadow-subtle shrink-0 active:scale-95"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>For Parents: Age Guidance</span>
        </Link>
      </div>

      {/* Horizontal Carousel of Gentle Videos */}
      <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none gap-3.5 sm:gap-5 pb-2 -mx-4 px-4 xs:-mx-6 xs:px-6 sm:-mx-8 sm:px-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="w-[220px] xs:w-[250px] sm:w-[280px] shrink-0 snap-start"
          >
            <VideoCard
              video={video}
              categoryLabel="Lullaby & Gentle"
              ageLabel="Ages 0–2"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
