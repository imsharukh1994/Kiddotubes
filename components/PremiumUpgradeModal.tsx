'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { X, Crown, Check, Sparkles, ShieldCheck, Zap, Heart, Star } from 'lucide-react';

export default function PremiumUpgradeModal() {
  const { premiumModalOpen, closePremiumModal, activatePremium, user } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!premiumModalOpen) return null;

  const handleSubscribe = () => {
    setIsSuccess(true);
    setTimeout(() => {
      activatePremium();
      setIsSuccess(false);
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden my-auto">
        
        {/* Close Button */}
        <button
          onClick={closePremiumModal}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20 focus:outline-none"
          aria-label="Close Premium Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 p-6 sm:p-8 text-white text-center space-y-3 overflow-hidden">
          {/* Background Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-purple-950 flex items-center justify-center mx-auto shadow-xl transform rotate-3">
            <Crown className="w-8 h-8 fill-current" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[11px] font-black uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>KiddoTube Premium Pass</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Unlock Ad-Free Safe Discovery for Kids
          </h2>

          <p className="text-xs sm:text-sm text-purple-200/90 font-medium max-w-sm mx-auto">
            Give your children an uninterrupted, ad-free learning universe with 3D avatars & multi-kid profiles.
          </p>
        </div>

        {isSuccess ? (
          /* Celebratory Success State */
          <div className="p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner animate-bounce">
              🎉
            </div>
            <h3 className="text-2xl font-black text-slate-900">Welcome to KiddoTube Premium!</h3>
            <p className="text-xs font-semibold text-slate-600 max-w-xs mx-auto">
              Your 7-Day Free Trial is now active. Enjoy 100% ad-free video discovery & AI 3D avatars!
            </p>
          </div>
        ) : (
          /* Main Subscription Form */
          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Billing Cycle Selector */}
            <div className="flex bg-purple-50 p-1.5 rounded-2xl border border-purple-100">
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'text-purple-900 hover:text-purple-950'
                }`}
              >
                <span>Annual Pass ($2.49/mo)</span>
                <span className="px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full uppercase">
                  Save 50%
                </span>
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'text-purple-900 hover:text-purple-950'
                }`}
              >
                Monthly ($4.99/mo)
              </button>
            </div>

            {/* Premium Perks Checklist */}
            <div className="space-y-3">
              {[
                '🚫 100% Ad-Free Video Playback',
                '🤖 Unlimited AI 3D Avatar Generations',
                '⏱️ Advanced Screen Time & Bedtime Routines',
                '👦 Unlimited Multi-Kid Profiles',
                '🎨 Printable PDF Activity & Coloring Workbooks',
                '🛡️ Strict Parent Channel Whitelisting',
              ].map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Subscribe Action Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleSubscribe}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5 fill-current text-slate-950" />
                <span>Start 7-Day Free Trial (${billingCycle === 'annual' ? '29.99/yr' : '4.99/mo'})</span>
              </button>

              <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Cancel Anytime
                </span>
                <span>•</span>
                <span>No Credit Card Charged Today</span>
              </div>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}
