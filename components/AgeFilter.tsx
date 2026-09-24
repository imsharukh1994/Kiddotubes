'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AGE_OPTIONS = [
  { id: '2-4', label: '2–4 Years', badge: 'Toddler' },
  { id: '5-7', label: '5–7 Years', badge: 'Early' },
  { id: '8-12', label: '8–12 Years', badge: 'Big Kids' },
];

export default function AgeFilter({ className = '' }: { className?: string }) {
  const pathname = usePathname();

  return (
    <div className={`flex items-center flex-wrap gap-2 ${className}`}>
      <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
        Popular Age:
      </span>
      {AGE_OPTIONS.map((age) => {
        const href = `/category/${age.id}`;
        const isActive = pathname === href;

        return (
          <Link
            key={age.id}
            href={href}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border focus:outline-none focus:ring-2 focus:ring-purple-600 ${
              isActive
                ? 'bg-purple-900 text-white border-purple-900 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-purple-300 hover:text-purple-900'
            }`}
          >
            {age.label}
          </Link>
        );
      })}
    </div>
  );
}
