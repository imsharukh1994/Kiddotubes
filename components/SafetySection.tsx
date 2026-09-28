'use client';

import React from 'react';
import Image from 'next/image';
import { ShieldCheck, Filter, Users, Eye } from 'lucide-react';

export default function SafetySection() {
  const points = [
    {
      icon: Filter,
      title: 'Curated Discovery',
      description: 'Pre-filtered, safe search queries bringing high-quality educational videos to young viewers.',
    },
    {
      icon: Users,
      title: 'Age-Aware Browsing',
      description: 'Structured content buckets tailored for toddlers (2–4), early learners (5–7), and big kids (8–12).',
    },
    {
      icon: Eye,
      title: 'Parent-Friendly Experience',
      description: 'No forced registrations, zero invasive tracking, and kid-appropriate content controls.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy & Safety Embedded',
      description: 'Official YouTube privacy-enhanced no-cookie player embeds keep playback safe.',
    },
  ];

  return (
    <section className="my-8 sm:my-12 p-6 sm:p-10 bg-gradient-to-br from-purple-50 via-white to-amber-50/50 border border-purple-100 rounded-3xl shadow-sm relative overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Text & 4 Points */}
        <div className="lg:col-span-8 space-y-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-950 text-xs font-black rounded-full uppercase tracking-wider mb-2.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Parent Trust & Safety</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Designed with families in mind
            </h2>
            <p className="text-xs sm:text-sm font-medium text-slate-600 mt-1">
              KiddoTube is a clean, modern content discovery platform designed to give parents peace of mind while kids explore.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {points.map((pt, idx) => {
              const Icon = pt.icon;
              return (
                <div key={idx} className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-2">
                  <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-900 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-purple-700" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{pt.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{pt.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Mascot #2 Feature */}
        <div className="lg:col-span-4 flex items-center justify-center relative">
          <div className="relative w-full max-w-[260px] sm:max-w-[300px] aspect-square flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-200/40 rounded-full blur-2xl" />
            <Image
              src="/images/mascot-2.png"
              alt="KiddoTube Mascot Buddy"
              width={300}
              height={300}
              className="w-full h-full object-contain drop-shadow-xl relative z-10 transition-transform duration-300 hover:scale-105"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
