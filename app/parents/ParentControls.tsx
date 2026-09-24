'use client';

import React, { useState, useEffect } from 'react';
import { Trash2, ShieldCheck, CheckCircle2, RotateCcw, Lock } from 'lucide-react';
import { clearHistory, getFavorites, clearFavorites } from '@/lib/storage';

export default function ParentControls() {
  const [historyCleared, setHistoryCleared] = useState(false);
  const [favCleared, setFavCleared] = useState(false);
  const [favCount, setFavCount] = useState(0);
  const [defaultAgeGroup, setDefaultAgeGroup] = useState<string>('all');
  const [ageSaved, setAgeSaved] = useState(false);

  useEffect(() => {
    setFavCount(getFavorites().length);
    const savedAge = localStorage.getItem('kiddotube_default_age') || 'all';
    setDefaultAgeGroup(savedAge);
  }, []);

  const handleClearHistory = () => {
    clearHistory();
    setHistoryCleared(true);
    setTimeout(() => setHistoryCleared(false), 3000);
  };

  const handleClearFavorites = () => {
    clearFavorites();
    setFavCount(0);
    setFavCleared(true);
    setTimeout(() => setFavCleared(false), 3000);
  };

  const handleAgeGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setDefaultAgeGroup(val);
    localStorage.setItem('kiddotube_default_age', val);
    setAgeSaved(true);
    setTimeout(() => setAgeSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-subtle space-y-6">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
          <Lock className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-xl font-black text-slate-900">Parental Control Settings</h2>
          <p className="text-xs text-slate-500 font-semibold">
            Manage device settings, local watch data, and default content filters.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Control 1: Age Filter Preference */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md">
              Device Filter
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Default Age Group</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Select default age content range for this device.
            </p>
          </div>

          <div className="space-y-2">
            <select
              value={defaultAgeGroup}
              onChange={handleAgeGroupChange}
              className="w-full py-2.5 px-3 bg-white border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-purple-600 shadow-sm"
            >
              <option value="all">All Ages (0–12)</option>
              <option value="0-2">0–2 (Babies & Toddlers)</option>
              <option value="2-4">2–4 (Early Learners)</option>
              <option value="5-7">5–7 (Learn & Explore)</option>
              <option value="8-12">8–12 (Curious Minds)</option>
            </select>

            {ageSaved && (
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Default filter updated!</span>
              </div>
            )}
          </div>
        </div>

        {/* Control 2: Clear Watch History */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-rose-900 bg-rose-100 px-2.5 py-0.5 rounded-md">
              Data Privacy
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Watch History</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Reset all recently watched videos stored on this browser.
            </p>
          </div>

          <button
            onClick={handleClearHistory}
            type="button"
            className="w-full py-2.5 px-4 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 hover:border-rose-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            {historyCleared ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">History Cleared</span>
              </>
            ) : (
              <>
                <RotateCcw className="w-4 h-4 text-rose-600" />
                <span>Clear Watch History</span>
              </>
            )}
          </button>
        </div>

        {/* Control 3: Clear Favorites */}
        <div className="bg-slate-50 p-5 rounded-xl border border-slate-200/60 flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-md">
              Saved Content ({favCount})
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-2">Saved Favorites</h3>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Clear all favorited video bookmarks from local storage.
            </p>
          </div>

          <button
            onClick={handleClearFavorites}
            type="button"
            className="w-full py-2.5 px-4 bg-white hover:bg-rose-50 text-slate-700 hover:text-rose-700 border border-slate-300 hover:border-rose-300 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            {favCleared ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Favorites Cleared</span>
              </>
            ) : (
              <>
                <Trash2 className="w-4 h-4 text-rose-600" />
                <span>Clear Favorites</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
