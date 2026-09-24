'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VideoItem } from '@/types/youtube';
import VideoCard from './VideoCard';
import { Star, Play, Clock } from 'lucide-react';

interface FeaturedContentProps {
  featuredVideo?: VideoItem;
  sideVideos?: VideoItem[];
}

export default function FeaturedContent({ featuredVideo, sideVideos = [] }: FeaturedContentProps) {
  const mainVideoTitle = featuredVideo?.title || 'The Amazing Ocean';
  const mainVideoDesc = featuredVideo?.description || 'Dive into the wonderful world of sea animals and discover amazing ocean facts!';
  const mainVideoId = featuredVideo?.id || 'ocean-adventure-1';

  return (
    <section className="my-10">
      {/* Header matching mockup */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            Featured for You
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left Side: Large Editorial Spotlight Card */}
        <div className="lg:col-span-7 group bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-subtle flex flex-col justify-between">
          <Link
            href={`/watch/${mainVideoId}`}
            className="relative w-full aspect-[16/9] overflow-hidden block bg-slate-950 focus:outline-none"
          >
            <Image
              src="/images/spotlight_ocean.png"
              alt={mainVideoTitle}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />

            <div className="absolute inset-0 bg-slate-950/10 group-hover:bg-slate-950/25 transition-colors flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-white/95 text-purple-700 shadow-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>
          </Link>

          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-tight group-hover:text-purple-700 transition-colors">
                {mainVideoTitle}
              </h3>
              <p className="text-xs sm:text-sm font-medium text-slate-600 mt-2 leading-relaxed line-clamp-2">
                {mainVideoDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              {/* Metadata Badges */}
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 bg-purple-50 text-purple-900 text-xs font-bold rounded-md border border-purple-100">
                  Science
                </span>
                <span className="px-2.5 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md">
                  Ages 6–10
                </span>
                <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>12:45</span>
                </span>
              </div>

              {/* Watch Now Button */}
              <Link
                href={`/watch/${mainVideoId}`}
                className="px-5 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-full shadow-sm hover:shadow transition-all"
              >
                Watch Now
              </Link>
            </div>
          </div>
        </div>

        {/* Right Side: 3 Smaller Cards matching mockup */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-3.5">
          {sideVideos.length > 0 ? (
            sideVideos.slice(0, 3).map((vid, idx) => {
              const labels = [
                { cat: 'Life Skills', age: 'Ages 4–8' },
                { cat: 'Environment', age: 'Ages 5–10' },
                { cat: 'Learning', age: 'Ages 3–6' },
              ];
              const l = labels[idx % labels.length];
              return (
                <VideoCard
                  key={vid.id}
                  video={vid}
                  categoryLabel={l.cat}
                  ageLabel={l.age}
                />
              );
            })
          ) : (
            <>
              <VideoCard
                video={{
                  id: 'kindness-matters-1',
                  title: 'Kindness Matters',
                  description: 'Learn about empathy and sharing.',
                  channelTitle: 'Life Skills',
                  publishedAt: '2026-01-01',
                  duration: '5:32',
                  thumbnails: {},
                }}
                categoryLabel="Life Skills"
                ageLabel="Ages 4–8"
              />
              <VideoCard
                video={{
                  id: 'plant-tree-1',
                  title: "Let's Plant a Tree",
                  description: 'Discover how trees help our environment.',
                  channelTitle: 'Environment',
                  publishedAt: '2026-01-01',
                  duration: '6:10',
                  thumbnails: {},
                }}
                categoryLabel="Environment"
                ageLabel="Ages 5–10"
              />
              <VideoCard
                video={{
                  id: 'count-animals-1',
                  title: 'Count with Animals',
                  description: 'Counting 1 to 10 with cute forest animals.',
                  channelTitle: 'Learning',
                  publishedAt: '2026-01-01',
                  duration: '4:18',
                  thumbnails: {},
                }}
                categoryLabel="Learning"
                ageLabel="Ages 3–6"
              />
            </>
          )}
        </div>
      </div>
    </section>
  );
}
