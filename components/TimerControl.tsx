'use client';

import React, { useState } from 'react';
import { useTimer } from '@/context/TimerContext';
import { Clock, Play, Square, ChevronDown, Check, ShieldCheck } from 'lucide-react';

export default function TimerControl() {
  const { timeRemaining, isTimerActive, startTimer, stopTimer, formatTime } = useTimer();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const presets = [
    { label: '15 Mins', minutes: 15 },
    { label: '30 Mins', minutes: 30 },
    { label: '45 Mins', minutes: 45 },
    { label: '60 Mins', minutes: 60 },
  ];

  return (
    <div className="relative">
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border shadow-xs focus:outline-none ${
          isTimerActive
            ? 'bg-amber-50 text-amber-900 border-amber-300 ring-2 ring-amber-400/30 animate-pulse'
            : 'bg-slate-100 hover:bg-purple-50 text-slate-700 hover:text-purple-700 border-slate-200/80'
        }`}
        title="Parent Screen Time & Bedtime Lock Timer"
      >
        <Clock className={`w-4 h-4 ${isTimerActive ? 'text-amber-600' : 'text-purple-600'}`} />
        <span>
          {isTimerActive && timeRemaining !== null
            ? formatTime(timeRemaining)
            : 'Set Timer'}
        </span>
        <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
      </button>

      {/* Preset Dropdown Panel */}
      {dropdownOpen && (
        <div
          onMouseLeave={() => setDropdownOpen(false)}
          className="absolute right-0 mt-2 w-64 bg-white rounded-2xl border border-slate-200 shadow-2xl p-4 z-50 animate-fadeIn space-y-3"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-black text-slate-900">Screen Time Limit</span>
            </div>
            {isTimerActive && (
              <span className="px-2 py-0.5 bg-amber-100 text-amber-900 text-[10px] font-extrabold rounded-full">
                Active
              </span>
            )}
          </div>

          <p className="text-[11px] font-medium text-slate-500 leading-tight">
            Select viewing duration. App automatically locks into Bedtime Lullaby Mode when time expires.
          </p>

          {/* Presets Grid */}
          <div className="grid grid-cols-2 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.minutes}
                type="button"
                onClick={() => {
                  startTimer(preset.minutes);
                  setDropdownOpen(false);
                }}
                className="px-3 py-2 bg-slate-50 hover:bg-purple-600 hover:text-white text-slate-800 text-xs font-extrabold rounded-xl border border-slate-200 hover:border-purple-600 transition-all flex items-center justify-center gap-1 active:scale-95"
              >
                <Play className="w-3 h-3 fill-current" />
                <span>{preset.label}</span>
              </button>
            ))}
          </div>

          {/* Stop / Cancel Action */}
          {isTimerActive && (
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  stopTimer();
                  setDropdownOpen(false);
                }}
                className="w-full py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold rounded-xl border border-rose-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                <span>Turn Off Timer</span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
