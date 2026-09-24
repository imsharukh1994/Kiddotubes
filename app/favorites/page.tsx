'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { VideoItem } from '@/types/youtube';
import { getFavorites } from '@/lib/storage';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import { ArrowLeft, Heart } from 'lucide-react';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<VideoItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setMounted(true);

    const handleStorage = () => {
      setFavorites(getFavorites());
    };
    window.addEventListener('kiddotube_favorites_updated', handleStorage);
    return () => {
      window.removeEventListener('kiddotube_favorites_updated', handleStorage);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="space-y-8 pb-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-slate-600 font-semibold text-xs border border-slate-200 hover:border-purple-300 hover:text-purple-900 transition-colors shadow-subtle"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discover</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle space-y-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-rose-50 text-rose-700 text-xs font-bold rounded-md uppercase tracking-wider">
          <Heart className="w-3.5 h-3.5 text-rose-600 fill-current" />
          <span>Saved Favorites</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Favorite Videos</h1>
        <p className="text-slate-600 text-sm font-medium">
          Saved locally on your device for quick access.
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {favorites.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Favorites Saved Yet"
          description="Click the heart icon on any video card to save it to your local favorites library."
          actionText="Browse Content"
          actionHref="/"
        />
      )}
    </div>
  );
}
