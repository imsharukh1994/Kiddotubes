'use client';

import React from 'react';
import Link from 'next/link';
import SearchBar from './SearchBar';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function Hero() {
  const ageOptions = [
    { id: '2-4', label: '2–4', tag: 'Toddler' },
    { id: '5-7', label: '5–7', tag: 'Early' },
    { id: '8-12', label: '8–12', tag: 'Big Kids' },
  ];

  return (
    <section className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 border border-slate-200/80 shadow-subtle space-y-6">
      <div className="max-w-3xl space-y-2.5">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-50 text-purple-700 rounded-md text-xs font-bold uppercase tracking-wider border border-purple-100">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Curated Video Discovery</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Find something wonderful for curious little minds.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 font-medium max-w-2xl">
          Videos, stories, music and learning for every stage of childhood growth.
        </p>
      </div>

      {/* Hero Search Field & Quick Age Selection */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 pt-1 max-w-4xl">
        <div className="flex-1">
          <SearchBar size="large" placeholder="Search videos, stories, music, learning..." />
        </div>

        {/* Quick Age Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider hidden xl:inline">
            Ages:
          </span>
          {ageOptions.map((age) => (
            <Link
              key={age.id}
              href={`/category/${age.id}`}
              className="px-4 py-2.5 bg-slate-100 hover:bg-purple-700 hover:text-white text-slate-800 font-bold text-xs rounded-xl transition-all border border-slate-200 hover:border-purple-700 shadow-subtle flex items-center gap-1 focus:outline-none focus:ring-2 focus:ring-purple-600"
            >
              <span>Age {age.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
