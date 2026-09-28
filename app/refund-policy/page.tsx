'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, RefreshCw, ShieldCheck, Check, Clock } from 'lucide-react';

export default function RefundPolicyPage() {
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
          <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
          <span>Parent Guarantee</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Refund Policy
        </h1>

        <p className="text-xs sm:text-sm text-purple-200 font-medium">
          Last Updated: {lastUpdated} • 30-Day Money-Back Guarantee Information
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-subtle space-y-8 text-slate-800 text-sm leading-relaxed font-medium">
        
        <div className="p-5 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
          <h2 className="text-base font-black text-amber-950 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700" />
            <span>30-Day No-Questions-Asked Guarantee</span>
          </h2>
          <p className="text-xs text-amber-900 font-bold leading-relaxed">
            We want parents to be 100% satisfied with KiddoTube Premium Pass. If you are unsatisfied for any reason within 30 days of purchase, we will issue a full refund immediately.
          </p>
        </div>

        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900">1. 7-Day Free Trial Cancellation</h2>
          <p>
            You may cancel your 7-day free trial anytime before the 7 days expire without being charged. Cancellation can be performed with 1-click in your profile settings or by emailing support.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900">2. How to Request a Refund</h2>
          <p>
            To request a refund for your subscription purchase:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-xs font-bold text-slate-700">
            <li>Email our support team at <code>billing@kiddotubes.com</code> with your account email address.</li>
            <li>Our billing team will process your refund within 24 to 48 hours.</li>
          </ol>
        </section>

      </div>
    </div>
  );
}
