import React from 'react';
import Hero from '@/components/Hero';
import VideoRow from '@/components/VideoRow';
import AgeSection from '@/components/AgeSection';
import BabySection from '@/components/BabySection';
import SafeAdSlot from '@/components/SafeAdSlot';
import CategoryCard from '@/components/CategoryCard';
import FeaturedContent from '@/components/FeaturedContent';
import ParentPicksSection from '@/components/ParentPicksSection';
import SafetySection from '@/components/SafetySection';
import { CATEGORIES } from '@/lib/categories';
import { searchYouTubeVideos } from '@/lib/youtube';

export const revalidate = 3600; // Cache homepage data for 1 hour

export default async function HomePage() {
  // Parallel data fetching via Promise.all per Vercel React Best Practices (async-parallel)
  const [
    trendingVideos,
    babyVideos,
    featuredVideos,
    learnVideos,
    bedtimeVideos,
    creativeVideos,
    parentPicksVideos,
  ] = await Promise.all([
    searchYouTubeVideos('popular kids learning videos nursery rhymes', 10),
    searchYouTubeVideos('baby lullabies nursery rhymes gentle songs for babies toddlers', 8),
    searchYouTubeVideos('educational science experiments for kids ocean animals', 8),
    searchYouTubeVideos('alphabet numbers phonics educational for kids reading math', 8),
    searchYouTubeVideos('bedtime stories lullabies calm music quiet stories kids', 8),
    searchYouTubeVideos('kids drawing crafts music dance diy imagination', 8),
    searchYouTubeVideos('educational family friendly learning songs for children', 8),
  ]);

  const mainFeatured = featuredVideos.length > 0 ? featuredVideos[0] : undefined;
  const sideFeatured = featuredVideos.slice(1, 4);

  return (
    <div className="space-y-12">
      {/* 1. HERO (Find something wonderful for curious little minds) */}
      <Hero />

      {/* 2. TRENDING FOR KIDS */}
      <VideoRow
        title="🔥 Trending for Kids"
        subtitle="Popular discoveries for young explorers"
        seeAllHref="/category/2-4"
        videos={trendingVideos}
      />

      {/* 3. 0–2 SPECIAL EXPERIENCE (Gentle Lullabies & Calm Sensory) */}
      <BabySection videos={babyVideos} />

      {/* 4. BROWSE BY AGE (4 Cards: 0–2, 2–4, 5–7, 8–12) */}
      <AgeSection />

      {/* 5. SAFE CONTEXTUAL ADVERTISEMENT */}
      <SafeAdSlot
        placement="homepage"
        context="kids"
        ageTreatment="child"
      />

      {/* 6. EXPLORE BY CATEGORY (8 Pastel Cards) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Explore by Category
          </h2>
          <p className="text-xs sm:text-sm font-medium text-slate-500 mt-0.5">
            Discover topics ranging from catchy songs to science experiments
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </section>

      {/* 7. FEATURED TODAY (Editorial Spotlight Section) */}
      <FeaturedContent
        featuredVideo={mainFeatured}
        sideVideos={sideFeatured}
      />

      {/* 8. LEARN & EXPLORE */}
      <VideoRow
        title="🧠 Learn & Explore"
        subtitle="ABC, reading, numbers, space and problem solving"
        seeAllHref="/category/learning"
        videos={learnVideos}
      />

      {/* 9. BEDTIME & CALM */}
      <VideoRow
        title="🌙 Bedtime & Calm"
        subtitle="Bedtime stories, lullabies and quiet relaxing music"
        seeAllHref="/category/stories"
        videos={bedtimeVideos}
      />

      {/* 10. CREATIVE CORNER */}
      <VideoRow
        title="🎨 Creative Corner"
        subtitle="Drawing, crafts, music, dance and DIY imagination"
        seeAllHref="/category/creativity"
        videos={creativeVideos}
      />

      {/* 11. PARENT PICKS */}
      <ParentPicksSection videos={parentPicksVideos} />

      {/* 12. PARENT SAFETY & DISCREET TRUST SECTION */}
      <SafetySection />
    </div>
  );
}
