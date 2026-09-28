'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Play, Eye, EyeOff, Lock, Mail, User, ShieldCheck, Sparkles, KeyRound } from 'lucide-react';
import AvatarPicker from './AvatarPicker';

const AVATAR_OPTIONS = ['🦁', '🚀', '🎨', '🦄', '🦉', '🐻', '👩‍👧‍👦', '⭐'];

export default function AuthModal() {
  const { authModalOpen, authModalTab, closeAuthModal, login, register, demoLogin } = useAuth();

  const [activeTab, setActiveTab] = useState<'login' | 'register'>(authModalTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [pin, setPin] = useState('1234');
  const [selectedAvatar, setSelectedAvatar] = useState('🦁');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Synchronize tab if opened with specific tab
  React.useEffect(() => {
    setActiveTab(authModalTab);
    setErrorMessage('');
  }, [authModalTab, authModalOpen]);

  if (!authModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      if (activeTab === 'login') {
        const result = await login({ email, password });
        if (!result.success) {
          setErrorMessage(result.message || 'Login failed. Check your credentials.');
        }
      } else {
        if (!name.trim()) {
          setErrorMessage('Please enter your name.');
          setIsSubmitting(false);
          return;
        }
        const result = await register({
          name,
          email,
          password,
          pin,
          avatar: selectedAvatar,
        });
        if (!result.success) {
          setErrorMessage(result.message || 'Registration failed.');
        }
      }
    } catch {
      setErrorMessage('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-full transition-colors z-10 focus:outline-none"
          aria-label="Close Auth Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header Banner */}
        <div className="bg-gradient-to-br from-purple-700 to-purple-900 p-6 text-white text-center space-y-2 relative overflow-hidden">
          <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center mx-auto text-white shadow-inner">
            <Play className="w-5 h-5 fill-current ml-0.5" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            Kiddo<span className="text-amber-400">Tube</span>
          </h2>
          <p className="text-xs text-purple-200 font-medium">
            {activeTab === 'login'
              ? 'Sign in to sync saved favorites & watch history'
              : 'Create a customized user profile with AI Avatars'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-slate-100 bg-slate-50/80 p-1">
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all ${
              activeTab === 'login'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMessage('');
            }}
            className={`flex-1 py-2.5 text-xs sm:text-sm font-bold rounded-2xl transition-all ${
              activeTab === 'register'
                ? 'bg-white text-purple-700 shadow-sm'
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {errorMessage ? (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
              {errorMessage}
            </div>
          ) : null}

          {/* REGISTER EXTRA FIELDS */}
          {activeTab === 'register' && (
            <>
              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="auth-name" className="block text-xs font-bold text-slate-700">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute left-3.5 top-3 text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="auth-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Jenkins"
                    className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
                  />
                </div>
              </div>

              {/* Avatar Choice */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700">Choose Profile Avatar</label>
                <AvatarPicker selectedAvatar={selectedAvatar} onSelectAvatar={setSelectedAvatar} />
              </div>

              {/* Security PIN */}
              <div className="space-y-1">
                <label htmlFor="auth-pin" className="block text-xs font-bold text-slate-700 flex items-center gap-1">
                  <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Security PIN (4 Digits)</span>
                </label>
                <input
                  id="auth-pin"
                  type="password"
                  maxLength={4}
                  pattern="[0-9]{4}"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="e.g. 1234"
                  className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 font-bold tracking-widest text-center"
                />
              </div>
            </>
          )}

          {/* EMAIL FIELD */}
          <div className="space-y-1">
            <label htmlFor="auth-email" className="block text-xs font-bold text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="auth-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div className="space-y-1">
            <label htmlFor="auth-password" className="block text-xs font-bold text-slate-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="auth-password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 focus:bg-white font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
                aria-label="Toggle Password Visibility"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded-xl shadow-md hover:shadow-lg transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting
              ? 'Processing...'
              : activeTab === 'login'
              ? 'Sign In'
              : 'Create KiddoTube Account'}
          </button>

          {/* QUICK DEMO LOGIN SHORTCUT */}
          <div className="pt-3 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={demoLogin}
              className="w-full py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-purple-600" />
              <span>Try Demo Account (1-Click Login)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
