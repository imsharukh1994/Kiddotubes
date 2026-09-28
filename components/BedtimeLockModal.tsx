'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useTimer } from '@/context/TimerContext';
import { useAuth } from '@/context/AuthContext';
import { Moon, KeyRound, Sparkles, Volume2, VolumeX, ShieldCheck, RefreshCw } from 'lucide-react';

export default function BedtimeLockModal() {
  const { isTimeUp, unlockScreen } = useTimer();
  const { user } = useAuth();

  const [pinInput, setPinInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLullabyPlaying, setIsLullabyPlaying] = useState(true);
  const [activeTab, setActiveTab] = useState<'pin' | 'math'>('pin');

  // Math Challenge Fallback for Parents
  const [mathNum1] = useState(() => Math.floor(Math.random() * 8) + 3);
  const [mathNum2] = useState(() => Math.floor(Math.random() * 8) + 2);
  const [mathInput, setMathInput] = useState('');

  if (!isTimeUp) return null;

  const handlePinUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const userPin = user?.pin || '1234';
    const success = unlockScreen(pinInput, userPin);
    if (!success) {
      setErrorMsg('Incorrect PIN code. Try again (Default: 1234)');
    }
  };

  const handleMathUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const expected = mathNum1 + mathNum2;
    if (parseInt(mathInput, 10) === expected) {
      unlockScreen('1234', '1234');
    } else {
      setErrorMsg(`Incorrect. ${mathNum1} + ${mathNum2} = ${expected}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-xl text-white overflow-y-auto animate-fadeIn">
      {/* Stars Background Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/40 via-purple-950/60 to-slate-950 pointer-events-none" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />

      {/* Sleeping Lullaby Audio Component */}
      {isLullabyPlaying && (
        <audio
          autoPlay
          loop
          src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lullaby-goodnight-113883.mp3"
        />
      )}

      <div className="relative w-full max-w-lg bg-white/10 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl text-center space-y-6 my-auto">
        
        {/* Audio Toggle Button */}
        <button
          onClick={() => setIsLullabyPlaying(!isLullabyPlaying)}
          className="absolute top-4 right-4 px-3 py-1.5 bg-white/10 hover:bg-white/20 rounded-full text-xs font-bold text-purple-200 border border-white/15 flex items-center gap-1.5 transition-all"
        >
          {isLullabyPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Lullaby ON</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-slate-400" />
              <span>Muted</span>
            </>
          )}
        </button>

        {/* Mascot Sleeping Header Illustration */}
        <div className="space-y-3 pt-2">
          <div className="relative w-36 h-36 mx-auto">
            <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-2xl animate-pulse" />
            <Image
              src="/images/mascot-1.png"
              alt="Sleeping Kiddo Mascot"
              width={144}
              height={144}
              className="w-full h-full object-contain drop-shadow-xl animate-bounce"
              style={{ animationDuration: '3s' }}
              priority
            />
            <div className="absolute -top-2 right-2 bg-amber-300 text-slate-950 p-1.5 rounded-full shadow-lg">
              <Moon className="w-5 h-5 fill-current" />
            </div>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 bg-amber-400/20 text-amber-300 rounded-full text-xs font-black uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Screen Time Limit Reached</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Great job learning today! 🌙
          </h2>

          <p className="text-xs sm:text-sm text-purple-200 font-medium max-w-sm mx-auto leading-relaxed">
            Time to rest your eyes, play outside, or get ready for bedtime. See you tomorrow on KiddoTube!
          </p>
        </div>

        {/* Parent Unlock Drawer Panel */}
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-white/10 space-y-4 text-left">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-bold text-purple-200">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Parents Only Unlock</span>
            </div>

            <div className="flex bg-slate-800/80 p-0.5 rounded-lg text-[11px] font-bold">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('pin');
                  setErrorMsg('');
                }}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === 'pin' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Parent PIN
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('math');
                  setErrorMsg('');
                }}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === 'math' ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Math Solve
              </button>
            </div>
          </div>

          {errorMsg && (
            <div className="p-2.5 bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-bold rounded-xl text-center">
              {errorMsg}
            </div>
          )}

          {activeTab === 'pin' ? (
            <form onSubmit={handlePinUnlock} className="flex items-center gap-2">
              <div className="relative flex-1">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="password"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  placeholder="Enter PIN (1234)"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-center tracking-widest text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow transition-all shrink-0"
              >
                Unlock
              </button>
            </form>
          ) : (
            <form onSubmit={handleMathUnlock} className="flex items-center gap-2">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-xs font-black text-amber-300 bg-slate-800 px-3 py-2 rounded-xl border border-slate-700">
                  {mathNum1} + {mathNum2} = ?
                </span>
                <input
                  type="number"
                  placeholder="Answer"
                  value={mathInput}
                  onChange={(e) => setMathInput(e.target.value)}
                  className="flex-1 px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs font-bold text-center text-white focus:outline-none focus:border-purple-500"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-black text-xs rounded-xl shadow transition-all shrink-0"
              >
                Submit
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
