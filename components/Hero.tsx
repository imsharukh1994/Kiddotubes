'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBar from './SearchBar';
import { Sparkles, ShieldCheck, Play } from 'lucide-react';

export default function Hero() {
  const ageOptions = [
    { id: '0-2', label: '0–2', tag: 'Baby' },
    { id: '2-4', label: '2–4', tag: 'Toddler' },
    { id: '5-7', label: '5–7', tag: 'Early' },
    { id: '8-12', label: '8–12', tag: 'Big Kids' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 rounded-3xl p-6 sm:p-10 lg:p-12 text-white shadow-xl">
      {/* Decorative Glowing Background Orbs */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-10 w-72 h-72 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Hero Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* Left Column: Headlines & Search */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-white/10 backdrop-blur-md text-amber-300 rounded-full text-xs font-black uppercase tracking-wider border border-white/20 shadow-inner">
              <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '6s' }} />
              <span>Safe & Curated Video Discovery</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.15] text-white">
              Find something wonderful for{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-200 to-amber-400">
                curious little minds.
              </span>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-purple-100/90 font-medium max-w-xl leading-relaxed">
              Discover educational videos, catchy nursery rhymes, quiet bedtime stories, and fun science activities for every developmental stage.
            </p>
          </div>

          {/* Search Bar & Age Selection */}
          <div className="space-y-4 pt-1 max-w-xl">
            <div className="bg-white/10 backdrop-blur-lg p-2 rounded-2xl border border-white/20 shadow-2xl">
              <SearchBar size="large" placeholder="Search videos, stories, songs, learning..." />
            </div>

            {/* Quick Age Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-1">
              <span className="text-xs font-extrabold text-purple-200 uppercase tracking-wider shrink-0 mr-1">
                Age Groups:
              </span>
              {ageOptions.map((age) => (
                <Link
                  key={age.id}
                  href={`/category/${age.id}`}
                  className="px-4 py-2 bg-white/15 hover:bg-amber-400 hover:text-slate-950 text-white font-black text-xs rounded-xl transition-all border border-white/25 hover:border-amber-400 shadow-sm flex items-center gap-1 shrink-0 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <span>Age {age.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Seamless Floating Mascot */}
        <div className="lg:col-span-5 flex items-center justify-center lg:justify-end relative">
          <div className="relative w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px] aspect-square flex items-center justify-center">
            
            {/* Soft Ambient Mascot Glow */}
            <div className="absolute inset-4 bg-gradient-to-tr from-amber-400/30 to-purple-400/40 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '4s' }} />

            {/* Floating Mascot Image - NO WHITE CARD BOX */}
            <div className="relative w-full h-full flex items-center justify-center transition-transform duration-500 hover:scale-105">
              <Image
                src="/images/mascot-1.png"
                alt="KiddoTube Mascot Guide"
                width={420}
                height={420}
                className="w-full h-full object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.45)]"
                priority
              />
            </div>

            {/* Floating Sparkle Badge Overlay */}
            <div className="absolute bottom-2 right-4 bg-white/95 backdrop-blur-md px-4 py-2 rounded-2xl border border-purple-200 shadow-xl text-xs font-black text-purple-950 tracking-wide flex items-center gap-2 transform rotate-2 hover:rotate-0 transition-transform">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Official KiddoTube Buddy</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
