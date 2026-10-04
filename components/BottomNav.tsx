'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Compass, Search, Heart, User } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function BottomNav() {
  const pathname = usePathname();
  const { isAuthenticated, openAuthModal } = useAuth();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/category/2-4', label: 'Explore', icon: Compass },
    { href: '/search', label: 'Search', icon: Search },
    { href: '/favorites', label: 'Favorites', icon: Heart },
    { 
      href: isAuthenticated ? '/profile' : '#auth', 
      label: isAuthenticated ? 'Profile' : 'Sign In', 
      icon: User,
      onClick: (e: React.MouseEvent) => {
        if (!isAuthenticated) {
          e.preventDefault();
          openAuthModal('login');
        }
      }
    },
  ];

  return (
    <nav aria-label="Mobile Navigation" className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.href !== '#auth' && (pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href)));
          
          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className={`flex flex-col items-center justify-center min-w-[56px] py-1 px-2 rounded-2xl transition-all duration-200 active:scale-90 ${
                isActive
                  ? 'text-purple-700 font-extrabold'
                  : 'text-slate-500 hover:text-purple-600 font-semibold'
              }`}
            >
              <div
                className={`p-1.5 rounded-xl transition-all ${
                  isActive ? 'bg-purple-100 text-purple-700 shadow-xs' : 'bg-transparent'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              </div>
              <span className="text-[10px] tracking-tight mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
