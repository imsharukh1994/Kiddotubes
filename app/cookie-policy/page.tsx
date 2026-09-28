'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cookie, ShieldCheck, Check } from 'lucide-react';

export default function CookiePolicyPage() {
  const lastUpdated = 'September 28, 2026';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-xl text-slate-600 font-bold text-xs border border-slate-200 hover:text-purple-700 transition-colors shadow-subtle focus:ring-2 focus:ring-purple-600 focus:outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discover</span>
        </Link>
      </div>

      <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white space-y-3 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider border border-white/20">
          <Cookie className="w-3.5 h-3.5 text-amber-300" />
          <span>Cookie & Storage Policy</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Cookie Policy
        </h1>

        <p className="text-xs sm:text-sm text-purple-200 font-medium">
          Last Updated: {lastUpdated} • Transparent Cookie & Storage Information
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-subtle space-y-8 text-slate-800 text-sm leading-relaxed font-medium">
        
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">1. How KiddoTube Uses Cookies & Local Storage</h2>
          <p>
            KiddoTube uses minimal, essential cookies and browser LocalStorage to remember your preferences (such as active child profile, dark/light theme, screen time timers, and saved favorites). We do NOT use invasive advertising tracking cookies.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900">2. Types of Cookies Used</h2>
          <div className="space-y-3 text-xs font-semibold text-slate-700">
            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
              <h3 className="text-sm font-black text-purple-950 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Strictly Necessary Session Storage</span>
              </h3>
              <p className="text-slate-600">Essential for user login authentication and 4-digit Parent PIN validation.</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 space-y-1">
              <h3 className="text-sm font-black text-purple-950 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Privacy-Enhanced YouTube Player Embeds</span>
              </h3>
              <p className="text-slate-600">Videos load via <code>youtube-nocookie.com</code>, preventing YouTube from placing tracking cookies on your device.</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900">3. Managing Cookie Preferences</h2>
          <p>
            You can clear or block cookies anytime via your browser settings or using our Cookie Consent banner at the bottom of the screen.
          </p>
        </section>

      </div>
    </div>
  );
}
