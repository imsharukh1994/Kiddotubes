'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { Crown, Check, Sparkles, ShieldCheck, ArrowLeft, Star, Heart, Lock } from 'lucide-react';

export default function PremiumPage() {
  const { user, activatePremium } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubscribe = () => {
    setIsSuccess(true);
    setTimeout(() => {
      activatePremium();
      setIsSuccess(false);
    }, 1800);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-white rounded-xl text-slate-600 font-bold text-xs border border-slate-200 hover:text-purple-700 transition-colors shadow-subtle"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discover</span>
        </Link>
      </div>

      {/* Hero Premium Header Banner */}
      <div className="relative bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 rounded-3xl p-8 sm:p-12 text-white text-center space-y-4 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-purple-950 flex items-center justify-center mx-auto shadow-2xl transform rotate-3">
          <Crown className="w-9 h-9 fill-current" />
        </div>

        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-400/20 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>KiddoTube Premium Pass</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
          Unlock the Ultimate Safe Learning Experience
        </h1>

        <p className="text-sm sm:text-base text-purple-200/90 font-medium max-w-xl mx-auto leading-relaxed">
          Give your children an uninterrupted, 100% ad-free video discovery universe with 3D avatars, screen time lock routines, and multi-kid profiles.
        </p>
      </div>

      {isSuccess ? (
        <div className="bg-white rounded-3xl p-10 text-center space-y-4 border border-emerald-200 shadow-xl animate-fadeIn">
          <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl shadow-inner animate-bounce">
            🎉
          </div>
          <h2 className="text-3xl font-black text-slate-900">Welcome to KiddoTube Premium!</h2>
          <p className="text-sm font-semibold text-slate-600 max-w-sm mx-auto">
            Your 7-Day Free Trial is now active. Enjoy 100% ad-free video discovery & 3D AI avatars!
          </p>
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-md transition-all"
          >
            Start Discovering Now
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Side: Perks Grid */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-6">
            <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Star className="w-5 h-5 text-amber-500 fill-current" />
              <span>Everything Included in Premium</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: '🚫 100% Ad-Free Playback', desc: 'Zero ad interruptions or popups while kids watch.' },
                { title: '🤖 Unlimited 3D Avatars', desc: 'Create custom 3D Pixar-style avatars with AI.' },
                { title: '⏱️ Screen Time Timers', desc: 'Auto-locks into Bedtime Lullaby Mode when time expires.' },
                { title: '👦 Multi-Kid Profiles', desc: 'Separate age-tailored feeds for each of your children.' },
                { title: '🎨 PDF Activity Workbooks', desc: 'Download printable coloring pages & tracing sheets.' },
                { title: '🛡️ Strict Channel Locks', desc: 'Block unwanted YouTube channels or whitelist approved ones.' },
              ].map((perk, idx) => (
                <div key={idx} className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100/80 space-y-1">
                  <h3 className="text-sm font-extrabold text-slate-900">{perk.title}</h3>
                  <p className="text-xs text-slate-600 font-medium leading-relaxed">{perk.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Subscription Pricing Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-purple-200 shadow-xl space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-black uppercase tracking-wider text-purple-700">Choose Your Pass</span>
              <h3 className="text-2xl font-black text-slate-900">7-Day Free Trial</h3>
              <p className="text-xs text-slate-500 font-medium">Cancel anytime in 1-click. Zero lock-in.</p>
            </div>

            {/* Billing Cycle Toggle */}
            <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 ${
                  billingCycle === 'annual'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                <span>Annual ($29.99/yr)</span>
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'text-slate-700 hover:text-slate-900'
                }`}
              >
                Monthly ($4.99/mo)
              </button>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center space-y-1">
              <span className="text-2xl font-black text-amber-950">
                {billingCycle === 'annual' ? '$2.49 / month' : '$4.99 / month'}
              </span>
              <p className="text-[11px] font-bold text-amber-800">
                {billingCycle === 'annual' ? 'Billed annually at $29.99 (Save 50%)' : 'Billed monthly'}
              </p>
            </div>

            {/* Subscribe Button */}
            <button
              type="button"
              onClick={handleSubscribe}
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5 fill-current text-slate-950" />
              <span>{user?.isPremium ? 'Active Premium Member' : 'Start 7-Day Free Trial'}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400 text-center">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>30-Day Money Back Guarantee</span>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
