'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VideoItem } from '@/types/youtube';
import { Play, Heart, Clock } from 'lucide-react';
import { isFavorite, toggleFavorite } from '@/lib/storage';

interface VideoCardProps {
  video: VideoItem;
  className?: string;
  categoryLabel?: string;
  ageLabel?: string;
}

export default function VideoCard({ video, className = '', categoryLabel, ageLabel }: VideoCardProps) {
  const [favorite, setFavorite] = useState<boolean>(() => isFavorite(video.id));

  useEffect(() => {
    setFavorite(isFavorite(video.id));
    const handleStorageUpdate = () => {
      setFavorite(isFavorite(video.id));
    };
    window.addEventListener('kiddotube_favorites_updated', handleStorageUpdate);
    return () => {
      window.removeEventListener('kiddotube_favorites_updated', handleStorageUpdate);
    };
  }, [video.id]);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newStatus = toggleFavorite(video);
    setFavorite(newStatus);
  };

  // 16:9 Widescreen thumbnail selection
  const thumbnailUrl =
    video.thumbnails?.maxres?.url ||
    video.thumbnails?.medium?.url ||
    video.thumbnails?.high?.url ||
    video.thumbnails?.default?.url ||
    `https://img.youtube.com/vi/${video.id}/mqdefault.jpg`;

  const metaText = categoryLabel && ageLabel
    ? `${categoryLabel} • ${ageLabel}`
    : categoryLabel || 'Kids Pick • Ages 2–6';

  return (
    <article className={`group relative bg-white rounded-xl overflow-hidden border border-slate-200/80 shadow-subtle hover:shadow-hover transition-all duration-200 flex flex-col h-full ${className}`}>
      {/* 16:9 Widescreen Thumbnail Container */}
      <Link
        href={`/watch/${video.id}`}
        aria-label={`Watch ${video.title}`}
        className="relative w-full aspect-[16/9] shrink-0 overflow-hidden bg-slate-900 block focus:outline-none focus:ring-2 focus:ring-purple-700"
      >
        <Image
          src={thumbnailUrl}
          alt={video.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover object-center group-hover:scale-105 transition-transform duration-300 opacity-95 group-hover:opacity-100"
          unoptimized
        />

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center">
          <div className="w-11 h-11 rounded-full bg-white/95 text-slate-900 shadow-md flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-700 group-hover:text-white transition-all">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
        </div>

        {/* Duration Badge */}
        {video.duration ? (
          <div className="absolute bottom-2.5 right-2.5 bg-black/85 text-white text-[11px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1 z-10 tracking-wide">
            <Clock className="w-3 h-3 text-amber-400" />
            <span>{video.duration}</span>
          </div>
        ) : null}

        {/* Favorite Heart Button (44x44px touch target) */}
        <button
          onClick={handleFavoriteClick}
          aria-label={favorite ? `Remove ${video.title} from favorites` : `Add ${video.title} to favorites`}
          className={`absolute top-2.5 right-2.5 min-w-[44px] min-h-[44px] p-2 rounded-full backdrop-blur-md transition-all flex items-center justify-center z-10 focus:outline-none focus:ring-2 focus:ring-rose-500 ${
            favorite
              ? 'bg-rose-600 text-white scale-105'
              : 'bg-black/40 text-white hover:bg-white hover:text-rose-600'
          }`}
        >
          <Heart className={`w-4 h-4 ${favorite ? 'fill-current' : ''}`} />
        </button>
      </Link>

      {/* Card Content & Metadata */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          <Link href={`/watch/${video.id}`} className="block focus:outline-none focus:underline">
            <h3
              className="font-bold text-slate-900 text-base leading-snug line-clamp-2 group-hover:text-purple-700 transition-colors"
              title={video.title}
            >
              {video.title}
            </h3>
          </Link>

          <p className="mt-1.5 text-xs font-semibold text-slate-500 truncate">
            {video.channelTitle}
          </p>
        </div>

        <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-700">
          <span>{metaText}</span>
        </div>
      </div>
    </article>
  );
}
