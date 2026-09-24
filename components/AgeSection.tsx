'use client';

import React from 'react';
import Link from 'next/link';
import { AGE_GROUPS } from '@/lib/categories';
import { ArrowRight, ShieldCheck } from 'lucide-react';

export default function AgeSection() {
  return (
    <section className="space-y-4 my-10">
      <div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Browse by Age
        </h2>
        <p className="text-sm font-medium text-slate-500 mt-0.5">
          Curated channels tailored specifically for every developmental milestone
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {AGE_GROUPS.map((ch) => (
          <Link
            key={ch.id}
            href={`/category/${ch.slug}`}
            className={`group p-5 rounded-2xl bg-white border shadow-subtle hover:shadow-card transition-all duration-200 flex flex-col justify-between ${ch.colorTint} ${ch.borderTint} focus:outline-none focus:ring-2 focus:ring-purple-600`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-11 h-11 rounded-2xl bg-white/90 shadow-sm flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {ch.emoji}
                </div>
                <span className="text-[11px] font-bold text-slate-600 bg-white/80 px-2.5 py-1 rounded-full border border-slate-200/60">
                  {ch.videoCountText}
                </span>
              </div>

              <div className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider">
                AGE {ch.title}
              </div>
              <h3 className="text-xl font-black text-slate-900 tracking-tight mt-0.5 group-hover:text-purple-700 transition-colors">
                {ch.subtitle}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed mt-2">
                {ch.description}
              </p>

              {ch.id === '0-2' && (
                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-purple-700 bg-purple-100/60 px-2.5 py-1 rounded-lg">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>For parents: Gentle sensory guidance</span>
                </div>
              )}
            </div>

            <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-purple-700 group-hover:text-purple-900">
              <span>Explore Channel</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
