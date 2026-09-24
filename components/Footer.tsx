'use client';

import React from 'react';
import Link from 'next/link';
import { Play, ShieldCheck, User } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-slate-200/80 py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Brand Logo & Mission */}
          <div className="md:col-span-1 space-y-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-purple-600 flex items-center justify-center text-white">
                <Play className="w-4 h-4 fill-current ml-0.5 text-white" />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tight">
                Kiddo<span className="text-purple-600">Tube</span>
              </span>
            </Link>
            <p className="text-xs font-semibold text-slate-500 leading-relaxed">
              Curated video discovery platform for kids. Safe, fun, and educational videos for every developmental stage.
            </p>
          </div>

          {/* Column 2: Explore */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Explore</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link href="/" className="hover:text-purple-700 transition-colors">Home</Link></li>
              <li><Link href="/category/2-4" className="hover:text-purple-700 transition-colors">Browse</Link></li>
              <li><Link href="/category/songs" className="hover:text-purple-700 transition-colors">Categories</Link></li>
              <li><Link href="/category/2-4" className="hover:text-purple-700 transition-colors">Age Groups</Link></li>
            </ul>
          </div>

          {/* Column 3: Parents & Safety */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">Parents & Safety</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link href="/parents" className="hover:text-purple-700 transition-colors">For Parents</Link></li>
              <li><Link href="/parents" className="hover:text-purple-700 transition-colors">Child Safety Guidelines</Link></li>
              <li><Link href="/parents" className="hover:text-purple-700 transition-colors">Privacy & Data Rights</Link></li>
              <li><Link href="/parents" className="hover:text-purple-700 transition-colors">Child-Directed Advertising</Link></li>
            </ul>
          </div>

          {/* Column 4: Library & Support */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-900">My Library</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-600">
              <li><Link href="/favorites" className="hover:text-purple-700 transition-colors">Saved Favorites</Link></li>
              <li><Link href="/history" className="hover:text-purple-700 transition-colors">Watch History</Link></li>
              <li><Link href="/parents" className="hover:text-purple-700 transition-colors">Report an Ad</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official YouTube Data API v3 integration with privacy-enhanced no-cookie player embeds.</span>
          </div>

          <div>
            © {new Date().getFullYear()} KiddoTube. Safe. Fun. Learning Always.
          </div>
        </div>
      </div>
    </footer>
  );
}
