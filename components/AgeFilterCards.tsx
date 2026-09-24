'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AGE_GROUPS } from '@/lib/categories';

export default function AgeFilterCards() {
  const pathname = usePathname();

  return (
    <div className="space-y-2">
      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
        Quick age filter:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        {AGE_GROUPS.map((item) => {
          const href = `/category/${item.slug}`;
          const isActive = pathname === href;

          return (
            <Link
              key={item.id}
              href={href}
              className={`flex items-center gap-2.5 p-2.5 rounded-2xl border transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-600 ${item.colorTint} ${item.borderTint} ${
                isActive ? 'ring-2 ring-purple-600 shadow-sm' : 'hover:scale-[1.02]'
              }`}
            >
              <div className="w-9 h-9 rounded-xl bg-white/90 shadow-sm flex items-center justify-center text-lg shrink-0">
                {item.emoji}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs sm:text-sm font-black leading-none text-slate-900">
                  {item.title}
                </div>
                <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 truncate mt-0.5">
                  {item.subtitle}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
