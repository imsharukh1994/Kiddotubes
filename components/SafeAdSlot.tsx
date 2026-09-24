'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Flag, X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { submitAdReport } from '@/lib/adSafetyPolicy';

interface SafeAdSlotProps {
  placement?: string;
  context?: string;
  ageTreatment?: 'child' | 'general';
}

export default function SafeAdSlot({
  placement = 'homepage',
  context = 'kids',
  ageTreatment = 'child',
}: SafeAdSlotProps) {
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Inappropriate for children');
  const [submitted, setSubmitted] = useState(false);

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitAdReport({
      adId: 'lego-creative-play-2026',
      reason: reportReason,
      timestamp: new Date().toISOString(),
    });
    setSubmitted(true);
    setTimeout(() => {
      setReportModalOpen(false);
      setSubmitted(false);
    }, 2000);
  };

  return (
    <div className="my-8">
      {/* Label above ad */}
      <div className="flex items-center justify-between mb-1.5 px-1">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          ADVERTISEMENT
        </span>
        <button
          onClick={() => setReportModalOpen(true)}
          className="text-[10px] font-bold text-slate-400 hover:text-rose-600 flex items-center gap-1 transition-colors"
        >
          <Flag className="w-3 h-3" />
          <span>Report Ad</span>
        </button>
      </div>

      {/* Safe Contextual Ad Banner matching the reference mockup */}
      <div className="relative bg-amber-50/80 border border-amber-200/90 rounded-2xl overflow-hidden shadow-subtle p-4 sm:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo & Copy */}
        <div className="flex items-center gap-4 text-center md:text-left">
          {/* Lego Style Red Badge Logo */}
          <div className="w-14 h-14 bg-red-600 rounded-xl flex items-center justify-center font-black text-white text-base shadow-sm shrink-0 border-2 border-red-500">
            LEGO
          </div>

          <div>
            <h3 className="text-base sm:text-xl font-black text-slate-900 tracking-tight">
              Build a Bigger Imagination
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold mt-0.5">
              Creative play for brighter tomorrows.
            </p>
          </div>
        </div>

        {/* Action Button & Graphic */}
        <div className="flex items-center gap-4 shrink-0">
          <a
            href="https://www.lego.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2.5 bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider rounded-full shadow-sm hover:shadow transition-all transform active:scale-95"
          >
            Shop Now
          </a>

          {/* Graphic Illustration */}
          <div className="relative w-20 h-16 sm:w-28 sm:h-20 hidden sm:block shrink-0">
            <Image
              src="/images/ad_creative_play.png"
              alt="LEGO Building Blocks"
              fill
              className="object-contain"
              unoptimized
            />
          </div>
        </div>
      </div>

      {/* Report Ad Safety Modal */}
      {reportModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2 text-rose-600 font-bold text-base">
                <Flag className="w-5 h-5" />
                <span>Report Advertisement</span>
              </div>
              <button
                onClick={() => setReportModalOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-lg font-bold text-slate-900">Report Submitted</h4>
                <p className="text-xs text-slate-500 font-medium">
                  Our child safety team will review this ad immediately.
                </p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <p className="text-xs text-slate-600 font-medium leading-relaxed">
                  KiddoTube strictly enforces child-directed advertising guidelines. Let us know if this ad fails our safety policy.
                </p>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">Reason for Report</label>
                  <select
                    value={reportReason}
                    onChange={(e) => setReportReason(e.target.value)}
                    className="w-full py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600"
                  >
                    <option value="Inappropriate for children">Inappropriate for children</option>
                    <option value="Misleading or deceptive">Misleading or deceptive</option>
                    <option value="Broken link or formatting">Broken link or formatting</option>
                    <option value="Repetitive or unwanted">Repetitive or unwanted</option>
                  </select>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Non-personalized contextual ads only (COPPA compliant).</span>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setReportModalOpen(false)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl shadow-sm"
                  >
                    Submit Report
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
