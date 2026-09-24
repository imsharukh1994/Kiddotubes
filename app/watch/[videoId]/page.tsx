import React from 'react';
import Link from 'next/link';
import { getSingleVideoDetails, searchYouTubeVideos } from '@/lib/youtube';
import VideoPlayer from '@/components/VideoPlayer';
import VideoCard from '@/components/VideoCard';
import SafeAdSlot from '@/components/SafeAdSlot';
import WatchActions from '@/components/WatchActions';
import EmptyState from '@/components/EmptyState';
import WatchTracker from './WatchTracker';
import { ArrowLeft, Sparkles, ShieldCheck, Clock } from 'lucide-react';
import type { Metadata } from 'next';

interface WatchPageProps {
  params: {
    videoId: string;
  };
}

export async function generateMetadata({ params }: WatchPageProps): Promise<Metadata> {
  const video = await getSingleVideoDetails(params.videoId);
  if (!video) {
    return { title: 'Watch Video — KiddoTube' };
  }
  return {
    title: `${video.title} — KiddoTube`,
    description: video.description?.slice(0, 160) || 'Watch kid-friendly videos on KiddoTube.',
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const videoId = params.videoId;
  const video = await getSingleVideoDetails(videoId);

  // Fetch related videos based on channel title or category query
  const searchKeyword = video?.categorySlug || video?.channelTitle || 'kids songs';
  const relatedVideos = video
    ? await searchYouTubeVideos(`${searchKeyword} educational`, 8)
    : [];

  const filteredRelated = relatedVideos.filter((item) => item.id !== videoId);

  if (!video) {
    return (
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-all shadow-subtle focus:outline-none focus:ring-2 focus:ring-purple-600"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Discover</span>
          </Link>
        </div>
        <EmptyState
          title="Video Not Available"
          description="We couldn't load details for this video. It may be unavailable or private."
          actionText="Explore KiddoTube"
          actionHref="/"
        />
      </div>
    );
  }

  const ageText = video.ageGroup ? `Ages ${video.ageGroup}` : 'Ages 2–6';

  return (
    <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      {/* Tracker for Recently Watched local storage */}
      <WatchTracker video={video} />

      {/* Back Button Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-all shadow-subtle focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </Link>
      </div>

      {/* VIDEO PLAYER */}
      <section className="w-full max-w-full">
        <VideoPlayer videoId={video.id} title={video.title} />
      </section>

      {/* VIDEO DETAILS CARD */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-6">
        {/* Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight break-words">
          {video.title}
        </h1>

        {/* Creator & Metadata & Action Buttons Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
          {/* Creator & Metadata Chips */}
          <div className="space-y-3">
            <div>
              <p className="text-base sm:text-lg font-black text-slate-900">
                {video.channelTitle || 'Kids Faith TV'}
              </p>
              <p className="text-xs text-slate-500 font-semibold">
                Kids songs & educational content
              </p>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-purple-100 text-purple-900 text-xs font-black px-3 py-1 rounded-full">
                Kids Pick
              </span>
              <span className="bg-amber-100 text-amber-950 text-xs font-black px-3 py-1 rounded-full">
                {ageText}
              </span>
              {video.duration ? (
                <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>{video.duration}</span>
                </span>
              ) : null}
            </div>
          </div>

          {/* Save & Share Action Buttons */}
          <div className="shrink-0">
            <WatchActions video={video} />
          </div>
        </div>

        {/* Video Description & Safety Note */}
        <div className="space-y-3">
          <div className="flex items-center gap-1.5 text-purple-900 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>About this video</span>
          </div>
          <p className="text-slate-700 font-medium text-xs sm:text-sm leading-relaxed whitespace-pre-line bg-slate-50 p-4 rounded-xl border border-slate-100">
            {video.description || 'No description provided for this video.'}
          </p>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Embedded directly via official YouTube no-cookie player (COPPA Safe).</span>
          </div>
        </div>
      </section>

      {/* ADVERTISEMENT SLOT */}
      <section aria-label="Advertisement">
        <SafeAdSlot placement="watch" context="kids" ageTreatment="child" />
      </section>

      {/* RELATED VIDEOS GRID ("More Like This") */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-purple-600" />
            <span>More Like This</span>
          </h2>
        </div>

        {filteredRelated.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredRelated.map((rel) => (
              <VideoCard key={rel.id} video={rel} />
            ))}
          </div>
        ) : (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm font-medium">
            No related videos found right now.
          </div>
        )}
      </section>
    </div>
  );
}
