'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Play, Eye, EyeOff, Lock, Mail, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login, demoLogin, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    try {
      const res = await login({ email, password });
      if (res.success) {
        router.push('/');
      } else {
        setErrorMessage(res.message || 'Login failed.');
      }
    } catch {
      setErrorMessage('An unexpected error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto py-8 px-4 space-y-6">
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-slate-600 font-bold text-xs border border-slate-200 hover:text-purple-700 transition-colors shadow-subtle"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Discover</span>
        </Link>
      </div>

      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-card space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-purple-700 text-white flex items-center justify-center mx-auto shadow-md">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Sign In to KiddoTube</h1>
          <p className="text-xs text-slate-500 font-medium">
            Access your saved favorites, watch history & parent safety controls.
          </p>
        </div>

        {errorMessage ? (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
            {errorMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="login-email" className="block text-xs font-bold text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="parent@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label htmlFor="login-password" className="block text-xs font-bold text-slate-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="login-password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600 focus:outline-none"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-black text-sm rounded-xl shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        {/* Quick Demo Account */}
        <div className="pt-4 border-t border-slate-100 text-center">
          <button
            onClick={() => {
              demoLogin();
              router.push('/');
            }}
            className="w-full py-2.5 px-3 bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-200 rounded-xl text-xs font-extrabold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>✨ Try Demo Account (1-Click Login)</span>
          </button>
        </div>

        <div className="text-center pt-2 text-xs font-semibold text-slate-500">
          Don&apos;t have an account yet?{' '}
          <Link href="/register" className="text-purple-700 font-bold hover:underline">
            Create Account
          </Link>
        </div>
      </div>
    </div>
  );
}
