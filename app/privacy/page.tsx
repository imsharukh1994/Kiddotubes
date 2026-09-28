'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ShieldCheck, Lock, Eye, Database, Check } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 28, 2026';

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      {/* Back Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-xl text-slate-600 font-bold text-xs border border-slate-200 hover:text-purple-700 transition-colors shadow-subtle focus:ring-2 focus:ring-purple-600 focus:outline-none"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discover</span>
        </Link>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 rounded-3xl p-8 sm:p-10 text-white space-y-3 shadow-xl relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/10 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider border border-white/20">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
          <span>Child & Family Privacy</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black tracking-tight">
          Privacy Policy
        </h1>

        <p className="text-xs sm:text-sm text-purple-200 font-medium">
          Last Updated: {lastUpdated} • COPPA & GDPR-K Compliant Privacy Notice
        </p>
      </div>

      {/* Main Body */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-subtle space-y-8 text-slate-800 text-sm leading-relaxed font-medium">
        
        {/* Visual Summary */}
        <div className="p-5 bg-purple-50 rounded-2xl border border-purple-100 space-y-3">
          <h2 className="text-base font-black text-purple-950 flex items-center gap-2">
            <Lock className="w-4 h-4 text-purple-700" />
            <span>Our Privacy Promises to Families</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Zero Behavioral Ad Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No Selling Personal Data</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Local Browser Storage First</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No-Cookie YouTube Player Embeds</span>
            </div>
          </div>
        </div>

        {/* Section 1: Data We Collect */}
        <section className="space-y-3">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <Database className="w-5 h-5 text-purple-700" />
            <span>1. What User Data We Collect</span>
          </h2>
          <p>
            KiddoTube is designed to collect the absolute minimum data required to deliver safe video discovery:
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left text-slate-700 border border-slate-200 rounded-xl overflow-hidden">
              <thead className="bg-slate-100 text-slate-900 font-black uppercase text-[11px]">
                <tr>
                  <th className="p-3">Data Category</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Storage Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 font-semibold">
                <tr>
                  <td className="p-3 font-bold text-slate-900">Account Credentials</td>
                  <td className="p-3">Name, email, and password for member login & profile sync.</td>
                  <td className="p-3">Encrypted local session</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Watch History & Favorites</td>
                  <td className="p-3">Allowing kids to resume videos and view saved library.</td>
                  <td className="p-3">Browser LocalStorage</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Parent PIN Code</td>
                  <td className="p-3">4-digit code protecting screen time timer settings.</td>
                  <td className="p-3">Browser LocalStorage</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-slate-900">Analytics Data</td>
                  <td className="p-3">None. We do not use invasive third-party tracking scripts.</td>
                  <td className="p-3">Not Collected</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Section 2: Children's Online Privacy Protection (COPPA) */}
        <section className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <span>2. COPPA & GDPR-K Compliance</span>
          </h2>
          <p>
            Under the Children's Online Privacy Protection Act (COPPA) and GDPR-Kids guidelines, we do not intentionally request or harvest personal data from children under 13 years of age. All user accounts must be established by a parent or legal guardian.
          </p>
        </section>

        {/* Section 3: Data Deletion Rights */}
        <section className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900">3. Your Data Deletion & Privacy Rights</h2>
          <p>
            Parents have complete control over stored data. You can clear watch history and saved favorites anytime from your profile settings or by clicking "Clear Browser Storage" in the parent dashboard (`/parents`).
          </p>
        </section>

        {/* Section 4: Contact Support */}
        <section className="space-y-3 border-t border-slate-100 pt-6">
          <h2 className="text-lg font-black text-slate-900">4. Privacy Contact</h2>
          <p>For privacy inquiries or data removal requests, email our dedicated privacy officer at:</p>
          <div className="p-4 bg-slate-100 rounded-2xl border border-slate-200 text-xs font-bold text-slate-900">
            📧 Privacy Office: privacy@kiddotubes.com
          </div>
        </section>

      </div>
    </div>
  );
}
