'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchBar from '@/components/SearchBar';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import { ArrowLeft, Search, ShieldCheck, Loader2 } from 'lucide-react';
import { VideoItem } from '@/types/youtube';
import { getApiUrl } from '@/lib/api-config';

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setVideos([]);
      return;
    }

    let isMounted = true;
    setLoading(true);

    const apiUrl = getApiUrl(`/api/youtube/search?q=${encodeURIComponent(query)}&limit=16`);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          if (data && data.success && Array.isArray(data.data)) {
            setVideos(data.data);
          } else {
            setVideos([]);
          }
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error('Failed to search videos:', err);
        if (isMounted) {
          setVideos([]);
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [query]);

  return (
    <div className="space-y-8 pb-8">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-slate-600 font-semibold text-xs border border-slate-200 hover:border-purple-300 hover:text-purple-900 transition-colors shadow-subtle"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discover</span>
        </Link>

        <div className="w-full sm:w-auto flex-1 max-w-xl">
          <SearchBar />
        </div>
      </div>

      {/* Results Header */}
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 xs:p-6 border border-slate-200/80 shadow-subtle space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 text-purple-900 rounded-xl shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
              {query ? `Search Results for "${query}"` : 'Search KiddoTube'}
            </h1>
            <p className="text-slate-500 font-medium text-xs flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Safe strict search enabled via YouTube Data API</span>
            </p>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="w-8 h-8 text-purple-600 animate-spin" />
        </div>
      ) : !query ? (
        <EmptyState
          title="Type Something to Search!"
          description="Enter a search term above like 'nursery rhymes', 'dinosaurs', or 'space' to find kid-friendly videos."
          actionText="Explore Categories"
          actionHref="/"
        />
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-5">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      ) : (
        <EmptyState
          title={`No Results for "${query}"`}
          description="We couldn't find any videos for your query. Try another search term or check out our age categories!"
          actionText="Browse Categories"
          actionHref="/"
        />
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500">Loading search...</div>}>
      <SearchContent />
    </Suspense>
  );
}
