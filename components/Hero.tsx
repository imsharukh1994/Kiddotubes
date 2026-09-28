'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import { Sparkles, ShieldCheck } from 'lucide-react';

export default function Hero() {
  const ageOptions = [
    { id: '0-2', label: '0–2', tag: 'Baby' },
    { id: '2-4', label: '2–4', tag: 'Toddler' },
    { id: '5-7', label: '5–7', tag: 'Early' },
    { id: '8-12', label: '8–12', tag: 'Big Kids' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-purple-50 via-white to-amber-50/40 rounded-3xl p-6 sm:p-8 lg:p-10 border border-purple-100/80 shadow-subtle">
      {/* Background Decorative Circles */}
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-purple-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Headline, Search, & Quick Age Buttons */}
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/90 text-purple-700 rounded-full text-[11px] sm:text-xs font-black uppercase tracking-wider border border-purple-200/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0 animate-pulse" />
              <span>Safe & Curated Kid Discovery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-[1.15]">
              Find something wonderful for <span className="text-purple-700 underline decoration-amber-400 decoration-wavy decoration-2">curious little minds</span>.
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-slate-600 font-medium max-w-2xl leading-relaxed">
              Videos, stories, music, and learning tailored for every developmental milestone.
            </p>
          </div>

          {/* Hero Search Field & Quick Age Selection */}
          <div className="space-y-3 pt-1 max-w-2xl">
            <SearchBar size="large" placeholder="Search videos, stories, music, learning..." />

            {/* Quick Age Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider shrink-0 mr-1">
                Age Groups:
              </span>
              {ageOptions.map((age) => (
                <Link
                  key={age.id}
                  href={`/category/${age.id}`}
                  className="px-3.5 py-2 bg-white hover:bg-purple-600 hover:text-white text-slate-800 font-bold text-xs rounded-xl transition-all border border-slate-200 hover:border-purple-600 shadow-xs flex items-center gap-1 shrink-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-600"
                >
                  <span>Age {age.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: KiddoTube Official Mascots Showcase */}
        <div className="lg:col-span-4 flex items-center justify-center lg:justify-end">
          <div className="relative w-full max-w-[340px] aspect-square flex items-center justify-center">
            {/* Soft Glow Ring Behind Mascots */}
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-300/40 to-amber-200/50 rounded-full blur-2xl scale-95" />

            {/* Mascot Container Card */}
            <div className="relative w-full h-full bg-white/80 backdrop-blur-md rounded-3xl p-4 border border-purple-100 shadow-xl flex items-center justify-center overflow-hidden group">
              {/* Mascot 1 */}
              <div className="relative w-1/2 h-full flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/mascot-1.png"
                  alt="KiddoTube Mascot Explorer"
                  width={220}
                  height={220}
                  className="w-full h-auto object-contain drop-shadow-md"
                  priority
                />
              </div>

              {/* Mascot 2 */}
              <div className="relative w-1/2 h-full flex items-center justify-center p-2 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src="/images/mascot-2.png"
                  alt="KiddoTube Mascot Buddy"
                  width={220}
                  height={220}
                  className="w-full h-auto object-contain drop-shadow-md"
                  priority
                />
              </div>

              {/* Badge Overlay */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 px-3 py-1 rounded-full border border-purple-200 shadow-sm text-[11px] font-black text-purple-900 tracking-wider flex items-center gap-1 shrink-0 whitespace-nowrap">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>KiddoTube Guides</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
