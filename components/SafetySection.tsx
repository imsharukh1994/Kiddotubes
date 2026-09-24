'use client';

import React from 'react';
import { ShieldCheck, Filter, Users, Eye } from 'lucide-react';

export default function SafetySection() {
  const points = [
    {
      icon: Filter,
      title: 'Curated Discovery',
      description: 'Pre-filtered, safe search queries designed to bring high-quality educational videos to young viewers.',
    },
    {
      icon: Users,
      title: 'Age-Aware Browsing',
      description: 'Structured content buckets tailored for toddlers (2–4), early learners (5–7), and big kids (8–12).',
    },
    {
      icon: Eye,
      title: 'Parent-Friendly Experience',
      description: 'No account registration, zero database tracking, and no invasive ad popups.',
    },
    {
      icon: ShieldCheck,
      title: 'Privacy & Safety Embedded',
      description: 'Official YouTube privacy-enhanced no-cookie player embeds keep playback secure.',
    },
  ];

  return (
    <section className="my-12 p-6 sm:p-8 bg-slate-100/70 border border-slate-200/80 rounded-2xl">
      <div className="max-w-2xl mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-purple-100 text-purple-900 text-xs font-bold rounded-md uppercase tracking-wider mb-2">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Parent Trust</span>
        </div>
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">
          Designed with families in mind
        </h2>
        <p className="text-sm font-medium text-slate-600 mt-1">
          KiddoTube is a clean, modern content discovery platform designed to give parents peace of mind while kids explore.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map((pt, idx) => {
          const Icon = pt.icon;
          return (
            <div key={idx} className="bg-white p-5 rounded-xl border border-slate-200/70 shadow-subtle space-y-2">
              <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-900 flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{pt.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-relaxed">{pt.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
