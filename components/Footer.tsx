'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Lock, Heart, History, Scale, Cookie, RefreshCw } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200/80 py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Logo & Business Details */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="inline-block focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-lg">
              <Image
                src="/images/Logo.png"
                alt="KiddoTube Logo"
                width={150}
                height={38}
                className="h-9 w-auto object-contain"
              />
            </Link>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed">
              KiddoTube Media Inc. — Safe, curated video discovery platform for kids. COPPA & GDPR-K compliant.
            </p>
            <p className="text-[11px] font-bold text-slate-400">
              Support: support@kiddotubes.com
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Explore</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link href="/" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Home</Link></li>
              <li><Link href="/category/2-4" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Browse by Age</Link></li>
              <li><Link href="/category/songs" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Categories</Link></li>
              <li><Link href="/premium" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">KiddoTube Premium</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal & Privacy Policies */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Legal & Trust</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link href="/privacy" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Terms of Service</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Cookie Policy</Link></li>
              <li><Link href="/refund-policy" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Refund Guarantee (30 Days)</Link></li>
            </ul>
          </div>

          {/* Column 4: Parents & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Parents & Library</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link href="/parents" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Parent Dashboard</Link></li>
              <li><Link href="/favorites" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Saved Favorites</Link></li>
              <li><Link href="/history" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Watch History</Link></li>
              <li><Link href="/parents" className="hover:text-purple-700 transition-colors focus:ring-2 focus:ring-purple-600 rounded-sm">Report Content / Ad</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Official YouTube Data API v3 integration with privacy-enhanced no-cookie embeds.</span>
          </div>

          <div>
            © {new Date().getFullYear()} KiddoTube Inc. All Rights Reserved. COPPA & GDPR-K Compliant.
          </div>
        </div>
      </div>
    </footer>
  );
}
