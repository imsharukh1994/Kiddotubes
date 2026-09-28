'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Play, Search, Menu, X, ShieldCheck, Heart, History, Compass, Home, User as UserIcon, LogOut, ChevronDown, UserPlus, Crown } from 'lucide-react';
import SearchBar from './SearchBar';
import TimerControl from './TimerControl';
import { useAuth } from '@/context/AuthContext';

export default function Header() {
  const pathname = usePathname();
  const { user, isAuthenticated, openAuthModal, openPremiumModal, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/category/2-4', label: 'Age Groups' },
    { href: '/category/songs', label: 'Categories' },
    { href: '/favorites', label: 'Favorites' },
    { href: '/history', label: 'History' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-subtle transition-all">
      <div className="max-w-[1440px] mx-auto px-4 xs:px-5 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16 gap-3 sm:gap-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0 focus:outline-none focus:ring-2 focus:ring-purple-600 rounded-xl py-1 px-1.5 group">
            <div className="h-10 sm:h-12 md:h-13 flex items-center justify-center transition-transform group-hover:scale-105">
              <Image
                src="/images/Logo.png"
                alt="KiddoTube Logo"
                width={200}
                height={56}
                className="h-9 sm:h-11 md:h-12 w-auto object-contain max-w-[180px] sm:max-w-[220px]"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-5 text-sm font-bold text-slate-600">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-lg transition-colors hover:text-purple-700 hover:bg-purple-50 ${
                    isActive ? 'text-purple-700 bg-purple-50 font-extrabold' : ''
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Search Bar - Desktop & Tablet */}
          <div className="hidden md:block flex-1 max-w-md mx-2">
            <SearchBar placeholder="Search videos, stories, songs..." />
          </div>

          {/* Right Header Actions - Desktop */}
          <div className="hidden md:flex items-center gap-3 shrink-0">
            {/* Screen Time & Bedtime Lock Timer Control */}
            <TimerControl />

            {/* Premium Subscription Upgrade Button */}
            <Link
              href="/premium"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs active:scale-95 ${
                user?.isPremium
                  ? 'bg-amber-100 text-amber-900 border border-amber-300'
                  : 'bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-950 shadow-sm hover:shadow'
              }`}
            >
              <Crown className="w-3.5 h-3.5 fill-current text-slate-950" />
              <span>{user?.isPremium ? 'Premium' : 'Try Premium'}</span>
            </Link>

            {/* Auth Actions */}
            {isAuthenticated && user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200/80 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
                >
                  <div className="w-6 h-6 rounded-full overflow-hidden flex items-center justify-center text-sm shrink-0 bg-purple-200/60 relative">
                    {user.avatar.startsWith('/') || user.avatar.startsWith('http') ? (
                      <Image src={user.avatar} alt={user.name} width={24} height={24} className="w-full h-full object-cover" unoptimized />
                    ) : (
                      <span>{user.avatar}</span>
                    )}
                  </div>
                  <span className="text-xs font-black truncate max-w-[100px]">{user.name}</span>
                  {user.isPremium && <Crown className="w-3.5 h-3.5 text-amber-500 fill-current" />}
                  <ChevronDown className="w-3.5 h-3.5 text-purple-700" />
                </button>

                {/* Profile Dropdown Menu */}
                {profileDropdownOpen && (
                  <div
                    onMouseLeave={() => setProfileDropdownOpen(false)}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 animate-fadeIn"
                  >
                    <div className="px-4 py-2 border-b border-slate-100 flex items-center justify-between">
                      <div className="truncate">
                        <p className="text-xs font-black text-slate-900 truncate">{user.name}</p>
                        <p className="text-[11px] font-semibold text-slate-500 truncate">{user.email}</p>
                      </div>
                      {user.isPremium ? (
                        <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-black rounded-full uppercase tracking-wider">
                          👑 Pass
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            openPremiumModal();
                            setProfileDropdownOpen(false);
                          }}
                          className="px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full uppercase tracking-wider hover:bg-amber-500"
                        >
                          Upgrade
                        </button>
                      )}
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    >
                      <UserIcon className="w-4 h-4" />
                      <span>My Profile & Settings</span>
                    </Link>

                    <Link
                      href="/favorites"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    >
                      <Heart className="w-4 h-4 text-rose-600" />
                      <span>Saved Favorites</span>
                    </Link>

                    <Link
                      href="/history"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
                    >
                      <History className="w-4 h-4 text-amber-600" />
                      <span>Watch History</span>
                    </Link>

                    <button
                      onClick={() => {
                        openPremiumModal();
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-black text-amber-800 hover:bg-amber-50 transition-colors"
                    >
                      <Crown className="w-4 h-4 text-amber-500 fill-current" />
                      <span>{user.isPremium ? '👑 Premium Member' : '👑 Upgrade Pass ($4.99)'}</span>
                    </button>

                    <Link
                      href="/parents"
                      onClick={() => setProfileDropdownOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors border-t border-slate-100 mt-1 pt-2"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>For Parents & Safety</span>
                    </Link>

                    <div className="pt-1 mt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          logout();
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-3.5 py-2 text-xs font-bold text-purple-700 hover:text-purple-900 hover:bg-purple-50 rounded-xl transition-colors"
                >
                  Sign In
                </button>
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs font-black rounded-xl shadow-sm hover:shadow transition-all active:scale-95 flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Register</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Header Actions (Min 44px touch targets) */}
          <div className="flex md:hidden items-center gap-1">
            <button
              onClick={() => {
                setSearchOpen(!searchOpen);
                if (mobileMenuOpen) setMobileMenuOpen(false);
              }}
              className="min-w-[44px] min-h-[44px] p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-600"
              aria-label="Toggle Search"
            >
              <Search className="w-5 h-5 text-slate-800" />
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                if (searchOpen) setSearchOpen(false);
              }}
              className="min-w-[44px] min-h-[44px] p-2 text-slate-700 hover:bg-slate-100 rounded-xl transition-colors flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-600"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-slate-900" /> : <Menu className="w-6 h-6 text-slate-900" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar Expand */}
        {searchOpen && (
          <div className="py-3 pb-4 border-t border-slate-100 md:hidden animate-fadeIn">
            <SearchBar placeholder="Search videos, songs, stories..." />
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 py-5 space-y-3 shadow-xl animate-fadeIn">
          {/* Mobile User Profile Header */}
          {isAuthenticated && user ? (
            <div className="p-3 bg-purple-50 border border-purple-100 rounded-2xl flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-lg shrink-0 bg-purple-200/60">
                  {user.avatar.startsWith('/') || user.avatar.startsWith('http') ? (
                    <Image src={user.avatar} alt={user.name} width={32} height={32} className="w-full h-full object-cover" unoptimized />
                  ) : (
                    <span>{user.avatar}</span>
                  )}
                </div>
                <div>
                  <p className="text-xs font-black text-purple-950">{user.name}</p>
                  <p className="text-[10px] font-semibold text-purple-700">{user.email}</p>
                </div>
              </div>
              <Link
                href="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="px-2.5 py-1 bg-white text-purple-700 border border-purple-200 rounded-lg text-[11px] font-bold"
              >
                Profile
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-2 mb-3">
              <button
                onClick={() => {
                  openAuthModal('login');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  openAuthModal('register');
                  setMobileMenuOpen(false);
                }}
                className="flex-1 py-2.5 bg-purple-600 hover:bg-purple-700 text-white rounded-xl text-xs font-black shadow-sm"
              >
                Register
              </button>
            </div>
          )}

          <div className="flex flex-col space-y-1 font-bold text-sm text-slate-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname === '/' ? 'bg-purple-100 text-purple-900 font-black' : 'hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4 text-purple-700" />
              <span>Home</span>
            </Link>

            <Link
              href="/category/2-4"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname?.startsWith('/category/2-4') ? 'bg-purple-100 text-purple-900 font-black' : 'hover:bg-slate-100'
              }`}
            >
              <Compass className="w-4 h-4 text-purple-700" />
              <span>Explore Age Groups</span>
            </Link>

            <Link
              href="/category/songs"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname?.startsWith('/category/songs') ? 'bg-purple-100 text-purple-900 font-black' : 'hover:bg-slate-100'
              }`}
            >
              <Play className="w-4 h-4 text-purple-700" />
              <span>Categories</span>
            </Link>

            <Link
              href="/favorites"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname === '/favorites' ? 'bg-purple-100 text-purple-900 font-black' : 'hover:bg-slate-100'
              }`}
            >
              <Heart className="w-4 h-4 text-rose-600" />
              <span>Saved Favorites</span>
            </Link>

            <Link
              href="/history"
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                pathname === '/history' ? 'bg-purple-100 text-purple-900 font-black' : 'hover:bg-slate-100'
              }`}
            >
              <History className="w-4 h-4 text-amber-600" />
              <span>Watch History</span>
            </Link>

            <div className="pt-2 border-t border-slate-100">
              <Link
                href="/parents"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 bg-purple-50 text-purple-900 rounded-xl font-extrabold"
              >
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>For Parents & Safety</span>
              </Link>
            </div>

            {isAuthenticated && (
              <div className="pt-2 border-t border-slate-100">
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl font-bold transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}


