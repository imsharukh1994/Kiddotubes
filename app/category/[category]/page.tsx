import React from 'react';
import { getCategoryBySlug, getAgeGroupBySlug, CATEGORIES } from '@/lib/categories';
import { searchYouTubeVideos } from '@/lib/youtube';
import VideoCard from '@/components/VideoCard';
import EmptyState from '@/components/EmptyState';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Sparkles } from 'lucide-react';
import type { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    category: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const category = getCategoryBySlug(params.category);
  const ageGroup = getAgeGroupBySlug(params.category);
  const title = category?.title || ageGroup?.title || 'Category';

  return {
    title: `${title} Videos — KiddoTube`,
    description: category?.description || ageGroup?.description || 'Curated kid-friendly videos.',
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const category = getCategoryBySlug(params.category);
  const ageGroup = getAgeGroupBySlug(params.category);

  if (!category && !ageGroup) {
    return (
      <EmptyState
        title="Category Not Found"
        description="We couldn't find the requested category. Explore our age-tailored content channels!"
        actionText="Back to Home"
        actionHref="/"
      />
    );
  }

  const title = category?.title || ageGroup?.title || '';
  const description = category?.description || ageGroup?.description || '';
  const query = category?.query || ageGroup?.query || 'kids videos';
  const ageBadge = category?.ageGroup || ageGroup?.badge || 'All Ages';

  const videos = await searchYouTubeVideos(query, 16);

  return (
    <div className="space-y-8 pb-8">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-lg text-slate-600 font-semibold text-xs border border-slate-200 hover:border-purple-300 hover:text-purple-900 transition-colors shadow-subtle"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discover</span>
        </Link>
      </div>

      {/* Category Banner */}
      <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 bg-purple-100 text-purple-900 text-xs font-bold rounded-md uppercase tracking-wider">
            Ages {ageBadge}
          </span>
          <span className="text-xs text-slate-400 font-semibold">• {videos.length} Videos</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-slate-900 tracking-tight">{title}</h1>

        <p className="text-slate-600 font-medium text-sm sm:text-base max-w-2xl leading-relaxed">
          {description}
        </p>

        <div className="pt-2 flex items-center gap-2 text-xs font-medium text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Strict server-side safe query: &quot;{query}&quot;</span>
        </div>
      </section>

      {/* Video Grid */}
      <section className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Watch & Learn</h2>

        {videos.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {videos.map((video) => (
              <VideoCard key={video.id} video={video} categoryLabel={title} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="No Videos Loaded"
            description="Unable to load YouTube videos for this category. Please check back shortly."
            actionText="Go to Homepage"
            actionHref="/"
          />
        )}
      </section>
    </div>
  );
}
