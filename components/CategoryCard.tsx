'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryInfo } from '@/types/youtube';
import { Music, BookOpen, Microscope, Palette, Puzzle, Compass, Brain, Activity } from 'lucide-react';

interface CategoryCardProps {
  category: CategoryInfo;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Music,
  BookOpen,
  Microscope,
  Palette,
  Puzzle,
  Compass,
  Brain,
  Activity,
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const IconComponent = ICON_MAP[category.icon] || Music;

  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group block p-3.5 sm:p-4 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 ${category.color}`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-white/80 backdrop-blur-sm shadow-sm shrink-0 group-hover:scale-110 transition-transform">
          <IconComponent className="w-5 h-5" />
        </div>

        <div className="overflow-hidden">
          <h3 className="text-sm font-black tracking-tight leading-none group-hover:text-purple-950 transition-colors">
            {category.title}
          </h3>
          <p className="text-[11px] font-semibold opacity-80 truncate mt-1">
            {category.description}
          </p>
        </div>
      </div>
    </Link>
  );
}
