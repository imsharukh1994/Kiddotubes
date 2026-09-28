'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Play, Eye, EyeOff, Lock, Mail, User, ShieldCheck, ArrowLeft, KeyRound, Sparkles } from 'lucide-react';
import AvatarPicker from '@/components/AvatarPicker';

export default function RegisterPage() {
  const router = useRouter();
  const { register, isAuthenticated } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('1234');
  const [avatar, setAvatar] = useState('🦁');
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

    if (!name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await register({ name, email, password, pin, avatar });
      if (res.success) {
        router.push('/');
      } else {
        setErrorMessage(res.message || 'Registration failed.');
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
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Create KiddoTube Account</h1>
          <p className="text-xs text-slate-500 font-medium">
            Personalized video discovery with AI-generated avatars.
          </p>
        </div>

        {errorMessage ? (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold rounded-xl text-center">
            {errorMessage}
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="space-y-1">
            <label htmlFor="reg-name" className="block text-xs font-bold text-slate-700">
              Full Name
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="reg-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex Jenkins"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>
          </div>

          {/* Avatar choice */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700">Choose Profile Avatar</label>
            <AvatarPicker selectedAvatar={avatar} onSelectAvatar={setAvatar} />
          </div>

          {/* Security PIN */}
          <div className="space-y-1">
            <label htmlFor="reg-pin" className="block text-xs font-bold text-slate-700 flex items-center gap-1">
              <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
              <span>Security PIN (4 Digits)</span>
            </label>
            <input
              id="reg-pin"
              type="password"
              maxLength={4}
              pattern="[0-9]{4}"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              placeholder="1234"
              className="w-full px-4 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 font-bold tracking-widest text-center"
            />
          </div>

          {/* Email Address */}
          <div className="space-y-1">
            <label htmlFor="reg-email" className="block text-xs font-bold text-slate-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                id="reg-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 font-medium"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label htmlFor="reg-password" className="block text-xs font-bold text-slate-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute left-3.5 top-3 text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                required
                minLength={6}
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
            {isSubmitting ? 'Creating Account...' : 'Complete Registration'}
          </button>
        </form>

        <div className="text-center pt-2 text-xs font-semibold text-slate-500">
          Already have an account?{' '}
          <Link href="/login" className="text-purple-700 font-bold hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
