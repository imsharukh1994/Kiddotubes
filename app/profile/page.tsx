'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { ArrowLeft, User, ShieldCheck, Heart, History, KeyRound, LogOut, Check } from 'lucide-react';

export default function ProfilePage() {
  const { user, isAuthenticated, logout, updateUserPin } = useAuth();
  const [newPin, setNewPin] = useState(user?.pin || '1234');
  const [pinSaved, setPinSaved] = useState(false);

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-md mx-auto py-12 px-4 text-center space-y-4">
        <h1 className="text-2xl font-black text-slate-900">Please Sign In</h1>
        <p className="text-xs text-slate-500 font-medium">
          Sign in to view your KiddoTube profile and parent controls.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-xl shadow"
        >
          Sign In
        </Link>
      </div>
    );
  }

  const handlePinUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4) {
      updateUserPin(newPin);
      setPinSaved(true);
      setTimeout(() => setPinSaved(false), 2500);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-xl text-slate-600 font-bold text-xs border border-slate-200 hover:text-purple-700 transition-colors shadow-subtle"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discover</span>
        </Link>
      </div>

      {/* User Profile Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle flex flex-col sm:flex-row items-center gap-6">
        <div className="w-20 h-20 rounded-3xl bg-purple-100 border-2 border-purple-200 text-4xl flex items-center justify-center shrink-0 shadow-sm overflow-hidden relative">
          {user.avatar.startsWith('/') || user.avatar.startsWith('http') ? (
            <Image
              src={user.avatar}
              alt={user.name}
              width={80}
              height={80}
              className="w-full h-full object-cover"
              unoptimized
            />
          ) : (
            <span>{user.avatar}</span>
          )}
        </div>

        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-50 text-purple-900 text-[11px] font-black rounded-md uppercase tracking-wider">
            ✨ KiddoTube Member Account
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">{user.name}</h1>
          <p className="text-xs font-semibold text-slate-500">{user.email}</p>
        </div>

        <button
          onClick={logout}
          className="px-4 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors shrink-0"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link
          href="/favorites"
          className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:border-purple-300 transition-all flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
            <Heart className="w-5 h-5 fill-current" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Saved Favorites</h3>
            <p className="text-xs text-slate-500 font-medium">View your saved video library</p>
          </div>
        </Link>

        <Link
          href="/history"
          className="p-5 bg-white rounded-2xl border border-slate-200/80 shadow-subtle hover:border-purple-300 transition-all flex items-center gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center shrink-0">
            <History className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-sm">Watch History</h3>
            <p className="text-xs text-slate-500 font-medium">Resume your recently watched videos</p>
          </div>
        </Link>
      </div>

      {/* Security PIN Settings */}
      <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <h2 className="text-lg font-black text-slate-900 tracking-tight">Account Security PIN</h2>
        </div>
        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          Set or update your 4-digit security PIN code to protect profile settings.
        </p>

        <form onSubmit={handlePinUpdate} className="flex items-center gap-3 max-w-sm pt-2">
          <div className="relative flex-1">
            <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="password"
              maxLength={4}
              pattern="[0-9]{4}"
              value={newPin}
              onChange={(e) => setNewPin(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl font-bold tracking-widest text-center focus:outline-none focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1 shrink-0"
          >
            {pinSaved ? (
              <>
                <Check className="w-4 h-4 text-emerald-300" />
                <span>Saved!</span>
              </>
            ) : (
              <span>Update PIN</span>
            )}
          </button>
        </form>
      </section>
    </div>
  );
}
