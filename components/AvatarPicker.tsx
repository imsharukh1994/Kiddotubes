'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, Wand2, Check, RefreshCw, Palette } from 'lucide-react';
import { getApiUrl } from '@/lib/api-config';

export interface AvatarOption {
  id: string;
  type: 'image' | 'emoji';
  value: string; // Image URL or Emoji string
  label: string;
  badge?: string;
}

export const AI_AVATARS: AvatarOption[] = [
  { id: 'kt-mascot-1', type: 'image', value: '/images/mascot-1.png', label: 'Kiddo Mascot', badge: 'Official' },
  { id: 'kt-mascot-2', type: 'image', value: '/images/mascot-2.png', label: 'Buddy Mascot', badge: 'Official' },
  { id: 'ai-astronaut', type: 'image', value: '/avatars/astronaut.png', label: 'Cosmic Explorer', badge: 'AI 3D' },
  { id: 'ai-dino', type: 'image', value: '/avatars/dino.png', label: 'Dino Adventurer', badge: 'AI 3D' },
  { id: 'ai-unicorn', type: 'image', value: '/avatars/unicorn.png', label: 'Magic Unicorn', badge: 'AI 3D' },
  { id: 'ai-robot', type: 'image', value: '/avatars/robot.png', label: 'Gamer Bot', badge: 'AI 3D' },
  { id: 'ai-panda', type: 'image', value: '/avatars/panda.png', label: 'Ninja Panda', badge: 'AI 3D' },
  { id: 'ai-parent', type: 'image', value: '/avatars/parent.png', label: 'Parent Guardian', badge: 'AI 3D' },
];

export const EMOJI_AVATARS: AvatarOption[] = [
  { id: 'em-lion', type: 'emoji', value: '🦁', label: 'Brave Lion' },
  { id: 'em-rocket', type: 'emoji', value: '🚀', label: 'Rocket' },
  { id: 'em-palette', type: 'emoji', value: '🎨', label: 'Artist' },
  { id: 'em-unicorn', type: 'emoji', value: '🦄', label: 'Unicorn' },
  { id: 'em-owl', type: 'emoji', value: '🦉', label: 'Wise Owl' },
  { id: 'em-bear', type: 'emoji', value: '🐻', label: 'Teddy Bear' },
  { id: 'em-parent', type: 'emoji', value: '👩‍👧‍👦', label: 'Family' },
  { id: 'em-star', type: 'emoji', value: '⭐', label: 'Superstar' },
  { id: 'em-dino', type: 'emoji', value: '🦖', label: 'T-Rex' },
  { id: 'em-kitten', type: 'emoji', value: '🐱', label: 'Cute Kitten' },
  { id: 'em-puppy', type: 'emoji', value: '🐶', label: 'Playful Puppy' },
  { id: 'em-fox', type: 'emoji', value: '🦊', label: 'Smart Fox' },
  { id: 'em-dolphin', type: 'emoji', value: '🐬', label: 'Ocean Dolphin' },
  { id: 'em-bee', type: 'emoji', value: '🐝', label: 'Honey Bee' },
  { id: 'em-hero', type: 'emoji', value: '🦸', label: 'Superhero' },
  { id: 'em-wizard', type: 'emoji', value: '🧙', label: 'Wizard' },
  { id: 'em-crown', type: 'emoji', value: '👑', label: 'Royal Crown' },
  { id: 'em-planet', type: 'emoji', value: '🪐', label: 'Planet' },
  { id: 'em-rainbow', type: 'emoji', value: '🌈', label: 'Rainbow' },
  { id: 'em-icecream', type: 'emoji', value: '🍦', label: 'Ice Cream' },
  { id: 'em-balloon', type: 'emoji', value: '🎈', label: 'Party Balloon' },
  { id: 'em-guitar', type: 'emoji', value: '🎸', label: 'Music Star' },
  { id: 'em-soccer', type: 'emoji', value: '⚽', label: 'Sports Star' },
  { id: 'em-robot', type: 'emoji', value: '🤖', label: 'Sci-Fi Bot' },
];

const AI_GENERATOR_STYLES = [
  { name: 'Cosmic Hero', avatar: '/avatars/astronaut.png' },
  { name: 'Dino Scientist', avatar: '/avatars/dino.png' },
  { name: 'Sparkle Fairy', avatar: '/avatars/unicorn.png' },
  { name: 'Neon Gamer', avatar: '/avatars/robot.png' },
  { name: 'Ninja Master', avatar: '/avatars/panda.png' },
  { name: 'Parent Guardian', avatar: '/avatars/parent.png' },
];

interface AvatarPickerProps {
  selectedAvatar: string;
  onSelectAvatar: (avatarValue: string) => void;
}

export default function AvatarPicker({ selectedAvatar, onSelectAvatar }: AvatarPickerProps) {
  const [tab, setTab] = useState<'ai' | 'emoji' | 'custom'>('ai');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreview, setGeneratedPreview] = useState<string | null>(null);

  const handleAiGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customPrompt.trim()) return;

    setIsGenerating(true);
    try {
      const res = await fetch(getApiUrl('/api/avatar/generate'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: customPrompt.trim() }),
      });

      const data = await res.json();
      if (data.success && data.avatarUrl) {
        setGeneratedPreview(data.avatarUrl);
        onSelectAvatar(data.avatarUrl);
      } else {
        // Fallback preset
        onSelectAvatar('/avatars/astronaut.png');
      }
    } catch (err) {
      console.error('Failed to generate AI avatar:', err);
      onSelectAvatar('/avatars/astronaut.png');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
      {/* Current Selected Avatar Preview Header */}
      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200/70 shadow-subtle">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-100 border-2 border-purple-300 flex items-center justify-center overflow-hidden shrink-0 shadow-sm text-2xl">
            {selectedAvatar.startsWith('/') || selectedAvatar.startsWith('http') ? (
              <Image
                src={selectedAvatar}
                alt="Selected Avatar"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <span>{selectedAvatar}</span>
            )}
          </div>
          <div>
            <p className="text-xs font-black text-slate-900">Current Selected Avatar</p>
            <p className="text-[11px] font-semibold text-purple-700">
              {selectedAvatar.startsWith('/') ? '3D AI Avatar' : 'Emoji Icon'}
            </p>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-emerald-100 text-emerald-900 text-[10px] font-black rounded-full uppercase tracking-wider flex items-center gap-1">
          <Check className="w-3 h-3 text-emerald-600" />
          <span>Active</span>
        </span>
      </div>

      {/* Mode Tabs */}
      <div className="flex p-1 bg-slate-200/60 rounded-xl text-xs font-bold text-slate-600">
        <button
          type="button"
          onClick={() => setTab('ai')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
            tab === 'ai' ? 'bg-white text-purple-900 font-extrabold shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-purple-600" />
          <span>3D AI Avatars</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('emoji')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
            tab === 'emoji' ? 'bg-white text-purple-900 font-extrabold shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <Palette className="w-3.5 h-3.5 text-amber-500" />
          <span>24+ Emoji Icons</span>
        </button>

        <button
          type="button"
          onClick={() => setTab('custom')}
          className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1 transition-all ${
            tab === 'custom' ? 'bg-white text-purple-900 font-extrabold shadow-sm' : 'hover:text-slate-900'
          }`}
        >
          <Wand2 className="w-3.5 h-3.5 text-emerald-600" />
          <span>AI Generator</span>
        </button>
      </div>

      {/* TAB 1: 3D AI AVATARS GALLERY */}
      {tab === 'ai' && (
        <div className="grid grid-cols-3 xs:grid-cols-6 gap-2 pt-1">
          {AI_AVATARS.map((item) => {
            const isSelected = selectedAvatar === item.value;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectAvatar(item.value)}
                className={`group relative p-1.5 rounded-xl border transition-all flex flex-col items-center justify-center ${
                  isSelected
                    ? 'bg-purple-100 border-purple-600 ring-2 ring-purple-400/50 scale-105 shadow-sm'
                    : 'bg-white border-slate-200 hover:border-purple-300 hover:bg-purple-50/50'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden relative shadow-xs">
                  <Image
                    src={item.value}
                    alt={item.label}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                    unoptimized
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-700 truncate w-full text-center mt-1">
                  {item.label.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* TAB 2: EMOJI ICONS GALLERY */}
      {tab === 'emoji' && (
        <div className="grid grid-cols-6 xs:grid-cols-8 gap-1.5 pt-1 max-h-36 overflow-y-auto scrollbar-none pr-1">
          {EMOJI_AVATARS.map((item) => {
            const isSelected = selectedAvatar === item.value;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectAvatar(item.value)}
                className={`w-9 h-9 rounded-xl text-xl flex items-center justify-center border transition-all ${
                  isSelected
                    ? 'bg-purple-100 border-purple-600 ring-2 ring-purple-400/50 scale-110 shadow-sm'
                    : 'bg-white border-slate-200 hover:bg-slate-100'
                }`}
                title={item.label}
              >
                {item.value}
              </button>
            );
          })}
        </div>
      )}

      {/* TAB 3: AI CUSTOM GENERATOR */}
      {tab === 'custom' && (
        <div className="space-y-3 pt-1">
          <form onSubmit={handleAiGenerate} className="space-y-2">
            <label htmlFor="ai-avatar-prompt" className="block text-xs font-bold text-slate-700">
              Describe your dream AI Avatar prompt:
            </label>
            <div className="flex gap-2">
              <input
                id="ai-avatar-prompt"
                type="text"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g. Superhero Dino with glowing cape"
                className="flex-1 px-3 py-2 text-xs bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-purple-500 font-medium"
              />
              <button
                type="submit"
                disabled={isGenerating || !customPrompt.trim()}
                className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs rounded-xl shadow-sm flex items-center gap-1 shrink-0 disabled:opacity-50"
              >
                {isGenerating ? (
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Wand2 className="w-3.5 h-3.5 text-amber-300" />
                )}
                <span>Generate</span>
              </button>
            </div>
          </form>

          {/* Quick Prompt Presets */}
          <div className="space-y-1">
            <p className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
              Quick AI Presets
            </p>
            <div className="flex flex-wrap gap-1.5">
              {AI_GENERATOR_STYLES.map((st) => (
                <button
                  key={st.name}
                  type="button"
                  onClick={() => {
                    setCustomPrompt(st.name);
                    onSelectAvatar(st.avatar);
                  }}
                  className="px-2.5 py-1 bg-white hover:bg-purple-100 text-purple-900 border border-slate-200 hover:border-purple-300 rounded-lg text-[10px] font-bold transition-colors"
                >
                  ✨ {st.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
