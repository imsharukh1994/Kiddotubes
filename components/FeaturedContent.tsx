'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { VideoItem } from '@/types/youtube';
import VideoCard from './VideoCard';
import { Star, Play, Clock, Sparkles } from 'lucide-react';

interface FeaturedContentProps {
  featuredVideo?: VideoItem;
  sideVideos?: VideoItem[];
}

export default function FeaturedContent({ featuredVideo, sideVideos = [] }: FeaturedContentProps) {
  const mainVideoTitle = featuredVideo?.title || 'Ocean Animals for Kids | Learn all about the Animals and Plants that Live in the Ocean';
  const mainVideoDesc = featuredVideo?.description || 'Ocean Animals for Kids is a video designed to help students understand how important all of our oceans are. There is an abundance of life that goes on under the water!';
  const mainVideoId = featuredVideo?.id || 'ocean-adventure-1';
  const mainVideoThumb = featuredVideo?.thumbnails?.high?.url || featuredVideo?.thumbnails?.medium?.url || '/images/spotlight_ocean.png';

  return (
    <section className="my-10 space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shadow-xs">
            <Star className="w-4 h-4 fill-current" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Featured Spotlight
            </h2>
            <p className="text-xs font-semibold text-slate-500">Hand-picked educational video for curious minds</p>
          </div>
        </div>
      </div>

      {/* Main Horizontal Featured Spotlight Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-subtle hover:shadow-md transition-all group">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          
          {/* Left Side: 16:9 Horizontal Video Thumbnail */}
          <Link
            href={`/watch/${mainVideoId}`}
            className="md:col-span-6 lg:col-span-5 relative w-full aspect-[16/9] overflow-hidden block bg-slate-950 focus:outline-none"
          >
            <Image
              src={mainVideoThumb}
              alt={mainVideoTitle}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              unoptimized
            />

            <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/35 transition-colors flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-white/95 text-purple-700 shadow-2xl flex items-center justify-center group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Play className="w-6 h-6 fill-current ml-0.5" />
              </div>
            </div>

            <span className="absolute bottom-3 right-3 px-2.5 py-1 bg-slate-950/80 backdrop-blur-sm text-white text-xs font-bold rounded-lg flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>12:45</span>
            </span>
          </Link>

          {/* Right Side: Horizontal Content & Metadata */}
          <div className="md:col-span-6 lg:col-span-7 p-6 sm:p-8 space-y-4 flex flex-col justify-center">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-900 text-xs font-extrabold rounded-full border border-purple-100">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Today's Top Pick</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight leading-snug group-hover:text-purple-700 transition-colors">
                <Link href={`/watch/${mainVideoId}`}>
                  {mainVideoTitle}
                </Link>
              </h3>

              <p className="text-xs sm:text-sm font-medium text-slate-600 leading-relaxed line-clamp-3">
                {mainVideoDesc}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-purple-100 text-purple-950 text-xs font-black rounded-lg">
                  Science & Nature
                </span>
                <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">
                  Ages 6–10
                </span>
              </div>

              <Link
                href={`/watch/${mainVideoId}`}
                className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-sm hover:shadow transition-all flex items-center gap-1.5 active:scale-95"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Watch Now</span>
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* 3 Secondary Cards in a Clean Horizontal Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
    </section>
  );
}
