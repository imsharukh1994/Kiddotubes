'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Cookie, ShieldCheck, Check, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'kiddotube_cookie_consent_v1';

export default function CookieConsentBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (!consent) {
        setIsVisible(true);
      }
    } catch {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_KEY, 'accepted');
    } catch (err) {
      console.error(err);
    }
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Cookie Consent Banner"
      className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 bg-white/95 backdrop-blur-xl rounded-3xl p-5 border border-purple-200 shadow-2xl space-y-3 animate-fadeIn"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
            <Cookie className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900">Essential Cookies & Storage</h3>
            <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-1">
              <ShieldCheck className="w-3 h-3 text-emerald-600" />
              <span>COPPA & GDPR Safe</span>
            </span>
          </div>
        </div>

        <button
          onClick={handleAccept}
          className="p-1 text-slate-400 hover:text-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
          aria-label="Dismiss cookie notice"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs font-medium text-slate-600 leading-relaxed">
        KiddoTube uses essential local storage to remember child profiles, watch history, and bedtime timers. We do NOT track children or sell personal data.{' '}
        <Link href="/privacy" className="text-purple-700 font-bold underline">
          Privacy Policy
        </Link>
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleAccept}
          className="flex-1 py-2 px-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow-xs transition-all min-h-[44px] flex items-center justify-center gap-1 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          <Check className="w-3.5 h-3.5 stroke-[3]" />
          <span>Accept Essential Cookies</span>
        </button>

        <Link
          href="/cookie-policy"
          className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-all min-h-[44px] flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-purple-600"
        >
          Preferences
        </Link>
      </div>
    </aside>
  );
}
