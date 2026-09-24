'use client';

import React from 'react';
import { VideoItem } from '@/types/youtube';
import VideoRow from './VideoRow';
import { ShieldCheck, Heart } from 'lucide-react';

interface ParentPicksSectionProps {
  videos: VideoItem[];
}

export default function ParentPicksSection({ videos }: ParentPicksSectionProps) {
  if (!videos || videos.length === 0) return null;

  return (
    <section className="my-10 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-900 rounded-md text-xs font-bold uppercase tracking-wider border border-emerald-200/80 mb-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Curated Criteria</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            👨‍👩‍👧 Parent Picks
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-600">
            Educational, age-aware, learning-focused videos chosen for family enjoyment.
          </p>
        </div>
      </div>

      <VideoRow
        title=""
        seeAllHref="/category/learning"
        videos={videos}
      />
    </section>
  );
}
