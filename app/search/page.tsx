import React from 'react';
import SearchBar from '@/components/SearchBar';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import { searchYouTubeVideos } from '@/lib/youtube';
import Link from 'next/link';
import { ArrowLeft, Search, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

interface SearchPageProps {
  searchParams: {
    q?: string;
  };
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const query = searchParams.q || 'Kids Videos';
  return {
    title: `Search results for "${query}" — KiddoTube`,
    description: `Safe YouTube video search results for ${query} on KiddoTube.`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || '';
  const videos = query ? await searchYouTubeVideos(query, 16) : [];

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
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-subtle space-y-2">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-purple-50 text-purple-900 rounded-xl">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {query ? `Search Results for "${query}"` : 'Search KiddoTube'}
            </h1>
            <p className="text-slate-500 font-medium text-xs flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 inline" />
              <span>Safe strict search enabled via YouTube Data API</span>
            </p>
          </div>
        </div>
      </div>

      {/* Video Grid */}
      {!query ? (
        <EmptyState
          title="Type Something to Search!"
          description="Enter a search term above like 'nursery rhymes', 'dinosaurs', or 'space' to find kid-friendly videos."
          actionText="Explore Categories"
          actionHref="/"
        />
      ) : videos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
