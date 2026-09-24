'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { VideoItem } from '@/types/youtube';
import { getRecentlyWatched } from '@/lib/storage';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import { ArrowLeft, History } from 'lucide-react';

export default function HistoryPage() {
  const [history, setHistory] = useState<VideoItem[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setHistory(getRecentlyWatched());
    setMounted(true);

    const handleStorage = () => {
      setHistory(getRecentlyWatched());
    };
    window.addEventListener('kiddotube_history_updated', handleStorage);
    return () => {
      window.removeEventListener('kiddotube_history_updated', handleStorage);
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
        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-purple-50 text-purple-900 text-xs font-bold rounded-md uppercase tracking-wider">
          <History className="w-3.5 h-3.5 text-purple-700" />
          <span>Device Watch History</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Recently Watched</h1>
        <p className="text-slate-600 text-sm font-medium">
          Resume your learning journey! Videos you watch on this device appear here automatically.
        </p>
      </div>

      {history.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {history.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <EmptyState
          title="No Watch History Yet"
          description="Videos you watch will automatically be listed here for easy access."
          actionText="Start Exploring"
          actionHref="/"
        />
      )}
    </div>
  );
}
