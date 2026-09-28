'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, FileText, Scale, Sparkles } from 'lucide-react';

export default function TermsOfServicePage() {
  const lastUpdated = 'September 28, 2026';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-xl text-slate-600 font-bold text-xs border border-slate-200 hover:text-purple-700 transition-colors shadow-subtle"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discover</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white space-y-3 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 backdrop-blur-md text-amber-300 rounded-full text-xs font-black uppercase tracking-wider border border-white/20">
          <FileText className="w-3.5 h-3.5 text-amber-300" />
          <span>Legal Agreement</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Terms of Service
        </h1>

        <p className="text-xs sm:text-sm text-purple-200 font-medium">
          Effective Date: {lastUpdated} • Please read carefully before using KiddoTube.
        </p>
      </div>

      {/* Main Content Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-subtle space-y-8 text-slate-700 text-sm leading-relaxed font-medium">
        
        {/* Section 1 */}
        <section className="space-y-2">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-black">1</span>
            <span>Acceptance of Terms</span>
          </h2>
          <p>
            By accessing or using the KiddoTube platform, website, or mobile applications ("Service"), you agree to be bound by these Terms of Service. If you are a parent or legal guardian accessing KiddoTube on behalf of a child, you agree to accept responsibility for your child’s compliance with these Terms.
          </p>
        </section>

        {/* Section 2 */}
        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-black">2</span>
            <span>Child Safety & COPPA Compliance</span>
          </h2>
          <p>
            KiddoTube is dedicated to providing a safe, educational, and family-friendly environment. We strictly comply with the Children’s Online Privacy Protection Act (COPPA) and international child privacy regulations:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-medium text-slate-600">
            <li>We do not collect personal identification information from children under 13 without verifiable parental consent.</li>
            <li>We enforce strict strict-mode age filters and pre-screened educational category topics.</li>
            <li>We do not run behavioral targeted advertising directed at children.</li>
          </ul>
        </section>

        {/* Section 3 */}
        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-black">3</span>
            <span>Parent Responsibility & Account Security</span>
          </h2>
          <p>
            Parents and legal guardians are encouraged to supervise their children’s viewing habits. Parents may set up a 4-digit Account Security PIN to protect screen time limits, parental controls, and profile settings. You are responsible for maintaining the confidentiality of your PIN.
          </p>
        </section>

        {/* Section 4 */}
        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-black">4</span>
            <span>KiddoTube Premium Subscriptions & Billing</span>
          </h2>
          <p>
            KiddoTube offers optional Premium Subscriptions ("KiddoTube Premium Pass") on a monthly ($4.99/mo) or annual ($29.99/yr) basis:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-medium text-slate-600">
            <li><strong>7-Day Free Trial</strong>: New subscribers may receive a 7-day free trial. You may cancel at any time before the trial ends without being charged.</li>
            <li><strong>Automatic Renewal</strong>: Subscriptions automatically renew unless canceled at least 24 hours prior to the end of the current billing period.</li>
            <li><strong>Cancellation & Refunds</strong>: You can cancel your subscription anytime in your account settings or through the store where purchased. All fees are non-refundable except where required by applicable law.</li>
          </ul>
        </section>

        {/* Section 5 */}
        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-black">5</span>
            <span>Third-Party Video Content & YouTube API Data</span>
          </h2>
          <p>
            KiddoTube embeds video content provided via YouTube’s official Data API v3 and privacy-enhanced no-cookie player embeds (<code className="text-purple-700 font-mono text-xs">youtube-nocookie.com</code>). KiddoTube does not host raw video files on its servers. All video intellectual property belongs to the respective YouTube content creators.
          </p>
        </section>

        {/* Section 6 */}
        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-black">6</span>
            <span>Prohibited Conduct</span>
          </h2>
          <p>
            You agree not to modify, reverse engineer, scrape, or extract data from the Service using automated bots, crawlers, or unauthorized software.
          </p>
        </section>

        {/* Section 7 */}
        <section className="space-y-2 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center text-xs font-black">7</span>
            <span>Contact Information</span>
          </h2>
          <p>
            If you have any questions or inquiries regarding these Terms of Service or child privacy practices, please contact our support team at:
          </p>
          <div className="p-4 bg-purple-50 rounded-2xl border border-purple-100 text-xs font-bold text-purple-900 flex items-center justify-between">
            <span>📧 Parent & Legal Inquiries: support@kiddotubes.com</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
        </section>

      </div>
    </div>
  );
}
