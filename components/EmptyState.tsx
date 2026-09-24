'use client';

import React from 'react';
import Link from 'next/link';
import { Sparkles, RefreshCw, Home } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
  actionText?: string;
  actionHref?: string;
  onRetry?: () => void;
}

export default function EmptyState({
  title = 'No Videos Found',
  description = "We couldn't find any videos matching your search. Try exploring another category or search term!",
  actionText = 'Back to Home',
  actionHref = '/',
  onRetry,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 my-8 bg-gradient-to-b from-purple-50/50 to-pink-50/30 rounded-3xl border-2 border-dashed border-purple-200">
      <div className="w-20 h-20 bg-gradient-to-tr from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center text-white shadow-lg mb-6 transform rotate-3">
        <Sparkles className="w-10 h-10" />
      </div>

      <h3 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight mb-2">
        {title}
      </h3>

      <p className="text-slate-600 max-w-md font-medium text-base leading-relaxed mb-6">
        {description}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl shadow-md flex items-center gap-2 transition-all transform active:scale-95"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Try Again</span>
          </button>
        )}

        {actionHref && (
          <Link
            href={actionHref}
            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-600 hover:to-amber-600 text-white font-bold rounded-2xl shadow-md flex items-center gap-2 transition-all transform active:scale-95"
          >
            <Home className="w-4 h-4" />
            <span>{actionText}</span>
          </Link>
        )}
      </div>
    </div>
  );
}
