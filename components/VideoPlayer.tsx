'use client';

import React from 'react';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { Crown, Lock, Sparkles, ShieldCheck } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title?: string;
}

export default function VideoPlayer({ videoId, title = 'KiddoTube Video Player' }: VideoPlayerProps) {
  const { isPremium, isCheckingPremium, openPremiumModal } = useAuth();
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`;

  if (isCheckingPremium) {
    return (
      <div className="relative w-full aspect-[16/9] max-h-[70vh] bg-slate-950 rounded-2xl overflow-hidden shadow-card border border-slate-800 flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-4 border-purple-400/30 border-t-amber-400 animate-spin" aria-label="Checking subscription" />
      </div>
    );
  }

  // Require active KiddoTube Premium subscription to play video
  if (!isPremium) {
    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

    return (
      <div className="relative w-full aspect-[16/9] max-h-[70vh] bg-slate-950 rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border border-purple-500/30 flex items-center justify-center text-white p-4 sm:p-8">
        {/* Background Thumbnail with Blur */}
        <div className="absolute inset-0 z-0 opacity-20 filter blur-xl scale-110 pointer-events-none">
          <Image src={thumbnailUrl} alt={title} fill className="object-cover" unoptimized />
        </div>

        {/* Dark Radial Gradient Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-950/90 via-slate-950/95 to-slate-950 z-10 pointer-events-none" />

        {/* Lock Paywall Content Card */}
        <div className="relative z-20 max-w-md mx-auto text-center space-y-4 sm:space-y-5">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 mx-auto">
            <div className="absolute inset-0 bg-amber-400/20 rounded-2xl blur-xl animate-pulse" />
            <div className="relative w-full h-full rounded-2xl bg-gradient-to-tr from-amber-400 via-amber-500 to-amber-300 text-slate-950 flex items-center justify-center shadow-2xl transform -rotate-3 border border-amber-200">
              <Crown className="w-9 h-9 sm:w-10 sm:h-10 fill-current" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-slate-900 text-amber-300 p-1 rounded-full border border-amber-400/40">
              <Lock className="w-4 h-4" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[11px] font-black uppercase tracking-wider border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Premium Access Required</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
              Unlock Video Playback with Premium
            </h2>

            <p className="text-xs sm:text-sm text-purple-200/90 font-medium max-w-sm mx-auto leading-relaxed">
              Video playback is reserved for KiddoTube Premium members. Subscribe to give your children unlimited ad-free educational discovery!
            </p>
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="button"
              onClick={openPremiumModal}
              className="w-full py-3.5 sm:py-4 px-6 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Crown className="w-5 h-5 fill-current text-slate-950" />
              <span>Unlock KiddoTube Premium Pass</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] font-semibold text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Google Play Store Subscription</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-[16/9] max-h-[70vh] bg-slate-950 rounded-2xl overflow-hidden shadow-card border border-slate-800 flex items-center justify-center">
      <iframe
        src={embedUrl}
        title={title}
        className="w-full h-full border-0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}
