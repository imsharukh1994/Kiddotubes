'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Play, Search, Menu, X, ShieldCheck } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/category/2-4', label: 'Explore' },
    { href: '/category/songs', label: 'Categories' },
    { href: '/category/2-4', label: 'Age Groups' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-subtle transition-all">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 gap-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-lg p-0.5">
            <div className="w-8 h-8 rounded-xl bg-purple-700 flex items-center justify-center text-white shadow-sm">
              <Play className="w-4 h-4 fill-current ml-0.5 text-white" />
            </div>
            <span className="text-2xl font-black text-slate-900 tracking-tight leading-none">
              Kiddo<span className="text-purple-700">Tube</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-bold text-slate-600">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`transition-colors hover:text-purple-700 ${
                    isActive ? 'text-purple-700 font-extrabold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden md:block flex-1 max-w-md mx-2">
            <SearchBar placeholder="Search videos, stories, songs..." />
          </div>

          {/* Right Header Actions */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <Link
              href="/parents"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-purple-700 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>For Parents</span>
            </Link>
          </div>

          {/* Mobile Header Actions */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expand */}
        {searchOpen && (
          <div className="py-3 border-t border-slate-100 md:hidden animate-fadeIn">
            <SearchBar />
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-3 font-bold text-sm text-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-purple-700"
            >
              Home
            </Link>
            <Link
              href="/category/2-4"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-purple-700"
            >
              Explore Age Groups
            </Link>
            <Link
              href="/category/songs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-purple-700"
            >
              Categories
            </Link>
            <Link
              href="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-purple-700"
            >
              Saved Favorites
            </Link>
            <Link
              href="/history"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 border-b border-slate-100 hover:text-purple-700"
            >
              Watch History
            </Link>
            <Link
              href="/parents"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-purple-700 font-extrabold flex items-center gap-1.5"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>For Parents</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
