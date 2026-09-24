import React from 'react';
import Link from 'next/link';
import { ShieldCheck, ArrowLeft, Lock, Eye, Flag, HeartHandshake, Sparkles, CheckCircle2 } from 'lucide-react';
import ParentControls from './ParentControls';
import SafeAdSlot from '@/components/SafeAdSlot';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Parents & Safety — KiddoTube',
  description: 'Learn how KiddoTube provides a safe, privacy-first, and COPPA-compliant video discovery experience for children.',
};

export default function ParentsPage() {
  return (
    <div className="max-w-[1280px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full text-slate-700 font-bold text-xs sm:text-sm border border-slate-200 hover:border-purple-300 hover:text-purple-700 hover:bg-purple-50 transition-all shadow-subtle focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Discover</span>
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-subtle space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-50 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-black rounded-full uppercase tracking-wider">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Parent Resource Center</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
          Safe, Trusted & Privacy-First Video Discovery
        </h1>

        <p className="text-slate-600 font-medium text-sm sm:text-base max-w-3xl leading-relaxed">
          KiddoTube is built with zero accounts, zero behavioral tracking, and strict strict-mode age filters so your children can explore educational videos safely.
        </p>

        {/* Anchor Quick Navigation */}
        <div className="pt-4 flex flex-wrap gap-2 text-xs font-bold text-slate-700">
          <a
            href="#safety"
            className="px-4 py-2 bg-slate-100 hover:bg-purple-100 hover:text-purple-900 rounded-full transition-colors"
          >
            🛡️ Child Safety Guidelines
          </a>
          <a
            href="#privacy"
            className="px-4 py-2 bg-slate-100 hover:bg-purple-100 hover:text-purple-900 rounded-full transition-colors"
          >
            🔒 Privacy & Data Rights
          </a>
          <a
            href="#advertising"
            className="px-4 py-2 bg-slate-100 hover:bg-purple-100 hover:text-purple-900 rounded-full transition-colors"
          >
            📢 Contextual Ads (COPPA)
          </a>
          <a
            href="#controls"
            className="px-4 py-2 bg-slate-100 hover:bg-purple-100 hover:text-purple-900 rounded-full transition-colors"
          >
            ⚙️ Device Controls
          </a>
        </div>
      </div>

      {/* INTERACTIVE PARENT CONTROLS */}
      <section id="controls">
        <ParentControls />
      </section>

      {/* CORE SAFETY PILLARS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Section 1: Child Safety */}
        <section
          id="safety"
          className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Child Safety Guidelines</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            Every query sent to the official YouTube Data API v3 enforces <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-900 font-bold">safeSearch: strict</code> and <code className="bg-slate-100 px-1.5 py-0.5 rounded text-purple-900 font-bold">videoEmbeddable: true</code>.
          </p>
          <ul className="space-y-2 text-xs font-semibold text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Strictly age-filtered playlists for 0–2, 2–4, 5–7, and 8–12 year olds.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>Official YouTube no-cookie embed URL framework for zero third-party tracking.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
              <span>No user comments, external links, or unvetted community chat.</span>
            </li>
          </ul>
        </section>

        {/* Section 2: Privacy & Data Rights */}
        <section
          id="privacy"
          className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Privacy & Data Rights</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            KiddoTube operates with complete data minimalism. We do not require signups, credit cards, or personal identifiers.
          </p>
          <ul className="space-y-2 text-xs font-semibold text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span>Watch history and saved favorites remain 100% on your device local storage.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span>No user tracking cookies or behavioral profile building.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
              <span>Full compliance with COPPA (US) and GDPR-K (EU) standards.</span>
            </li>
          </ul>
        </section>

        {/* Section 3: Contextual Advertising Policy */}
        <section
          id="advertising"
          className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Child-Directed Advertising Policy</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            All advertising featured on KiddoTube is strictly non-personalized and contextual.
          </p>
          <ul className="space-y-2 text-xs font-semibold text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Zero child watch-history or search-history ad targeting.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>No remarketing, behavioral profiling, or cross-site tracking.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>Prominent &quot;ADVERTISEMENT&quot; labels on all sponsor banners.</span>
            </li>
          </ul>
        </section>

        {/* Section 4: Report an Ad & Support */}
        <section
          id="report-ad"
          className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-subtle space-y-4"
        >
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Flag className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-black text-slate-900">Ad Safety Reporting</h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
            If you ever see an advertisement that does not meet our strict child safety standards, click the &quot;Report Ad&quot; button directly on the ad.
          </p>
          <div className="bg-rose-50 p-4 rounded-xl border border-rose-100 text-xs text-rose-950 font-medium">
            <div className="flex items-center gap-1.5 font-bold mb-1">
              <HeartHandshake className="w-4 h-4 text-rose-600" />
              <span>Our Commitment to Families</span>
            </div>
            Ad safety reports are immediately logged and inspected by our review team to ensure instant removal of unsuitable content.
          </div>
        </section>
      </div>

      {/* Demonstration Banner */}
      <section className="space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider px-1">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Contextual Ad Example</span>
        </div>
        <SafeAdSlot placement="parents" context="kids" ageTreatment="child" />
      </section>
    </div>
  );
}
