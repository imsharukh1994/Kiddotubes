'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  className?: string;
  size?: 'normal' | 'large';
}

function SearchBarForm({ placeholder, className = '', size = 'normal' }: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const isLarge = size === 'large';

  return (
    <form onSubmit={handleSearch} className={`relative flex items-center w-full ${className}`} role="search">
      <div className="relative w-full flex items-center bg-purple-50/60 border border-purple-100 rounded-full focus-within:border-purple-500 focus-within:ring-4 focus-within:ring-purple-100 transition-all">
        <label htmlFor="kiddotube-search-input" className="sr-only">
          Search KiddoTube videos
        </label>
        
        <div className="pl-4 text-purple-600 flex items-center pointer-events-none">
          <Search className={isLarge ? "w-5 h-5" : "w-4 h-4"} aria-hidden="true" />
        </div>

        <input
          id="kiddotube-search-input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder || 'Search videos, songs, stories...'}
          className={`w-full bg-transparent text-slate-800 focus:outline-none text-xs sm:text-sm font-medium placeholder:text-slate-400 pl-3 pr-10 ${
            isLarge ? 'py-3.5' : 'py-2.5'
          }`}
        />

        {query ? (
          <button
            type="button"
            onClick={() => setQuery('')}
            aria-label="Clear search input"
            className="absolute right-12 pr-1 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        ) : null}

        <button
          type="submit"
          aria-label="Submit search query"
          className={`mr-1 rounded-full bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center shadow-sm transition-all transform active:scale-95 shrink-0 ${
            isLarge ? 'w-10 h-10' : 'w-8 h-8'
          }`}
        >
          <Search className={isLarge ? "w-5 h-5" : "w-4 h-4"} aria-hidden="true" />
        </button>
      </div>
    </form>
  );
}

export default function SearchBar(props: SearchBarProps) {
  return (
    <Suspense
      fallback={
        <div className="w-full h-10 bg-purple-50 border border-purple-100 rounded-full animate-pulse" />
      }
    >
      <SearchBarForm {...props} />
    </Suspense>
  );
}
