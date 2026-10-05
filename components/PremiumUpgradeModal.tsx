'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { X, Crown, Check, Sparkles, ShieldCheck, Loader2 } from 'lucide-react';

interface SubscriptionProduct {
  productId: string;
  basePlanId: string;
  formattedPrice: string;
  title: string;
  description: string;
  billingPeriod: string;
  offerToken: string;
}

export default function PremiumUpgradeModal() {
  const { premiumModalOpen, closePremiumModal, isPremium, restorePurchases } = useAuth();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);
  const [products, setProducts] = useState<SubscriptionProduct[]>([]);
  const [fetchingProducts, setFetchingProducts] = useState(false);
  const wasPremium = useRef(isPremium);

  // Celebrate only when Google Play flips the entitlement to Premium while the modal is open
  useEffect(() => {
    if (isPremium && !wasPremium.current && premiumModalOpen) {
      setIsSuccess(true);
      const t = setTimeout(() => {
        setIsSuccess(false);
        closePremiumModal();
      }, 1800);
      wasPremium.current = isPremium;
      return () => clearTimeout(t);
    }
    wasPremium.current = isPremium;
  }, [isPremium, premiumModalOpen, closePremiumModal]);

  // Fetch dynamic products from Google Play when the modal opens
  useEffect(() => {
    if (typeof window === 'undefined' || !premiumModalOpen) return;
    const capacitorPlugin = (window as any).Capacitor?.Plugins?.BillingPlugin;
    if (!capacitorPlugin) return;

    setFetchingProducts(true);
    capacitorPlugin
      .getProducts()
      .then((res: { products?: SubscriptionProduct[] }) => {
        if (res && res.products) {
          setProducts(res.products);
        }
      })
      .catch((err: any) => {
        console.warn('Could not fetch Google Play products:', err);
      })
      .finally(() => {
        setFetchingProducts(false);
      });
  }, [premiumModalOpen]);

  if (!premiumModalOpen) return null;

  const handleRestore = async () => {
    setErrorMessage(null);
    setInfoMessage(null);
    setIsRestoring(true);
    const msg = await restorePurchases();
    setIsRestoring(false);
    setInfoMessage(msg);
  };

  const monthlyProduct = products.find((p) => p.basePlanId === 'monthly-premium');
  const yearlyProduct = products.find((p) => p.basePlanId === 'yearly-premium');

  const selectedProduct = billingCycle === 'annual' ? yearlyProduct : monthlyProduct;
  const displayPrice = selectedProduct?.formattedPrice
    ? selectedProduct.formattedPrice
    : fetchingProducts
    ? 'Loading price...'
    : 'Google Play Pricing';

  const handleSubscribe = async () => {
    setErrorMessage(null);
    setIsLoading(true);
    const capacitorPlugin = typeof window !== 'undefined' && (window as any).Capacitor?.Plugins?.BillingPlugin;

    if (capacitorPlugin) {
      try {
        const targetBasePlanId = billingCycle === 'annual' ? 'yearly-premium' : 'monthly-premium';
        const res = await capacitorPlugin.launchPurchase({
          basePlanId: targetBasePlanId,
        });
        console.log('Google Play Billing flow launched:', res);
      } catch (err: any) {
        console.error('Google Play Billing Error:', err);
        setErrorMessage(
          err?.message ||
            "Subscription product 'kiddotube_premium' is being processed by Google Play."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
      setErrorMessage(
        'Google Play Billing is available when running on an Android device with Google Play Store installed.'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-slate-950/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-purple-200 overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={closePremiumModal}
          className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors z-20 focus:outline-none"
          aria-label="Close Premium Modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Header Banner */}
        <div className="relative bg-gradient-to-br from-purple-800 via-purple-900 to-indigo-950 p-6 sm:p-8 text-white text-center space-y-3 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-200 text-purple-950 flex items-center justify-center mx-auto shadow-xl transform rotate-3">
            <Crown className="w-8 h-8 fill-current" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 text-amber-300 rounded-full text-[11px] font-black uppercase tracking-wider border border-amber-400/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>KiddoTube Premium Pass</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
            Unlock Ad-Free Safe Discovery for Kids
          </h2>

          <p className="text-xs sm:text-sm text-purple-200/90 font-medium max-w-sm mx-auto">
            Give your children an uninterrupted, ad-free learning universe with 3D avatars & multi-kid profiles.
          </p>
        </div>

        {isSuccess ? (
          /* Celebratory Success State */
          <div className="p-8 text-center space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl shadow-inner animate-bounce">
              🎉
            </div>
            <h3 className="text-2xl font-black text-slate-900">Welcome to KiddoTube Premium!</h3>
            <p className="text-xs font-semibold text-slate-600 max-w-xs mx-auto">
              Your subscription is now active through Google Play. Enjoy 100% ad-free video discovery & AI 3D avatars!
            </p>
          </div>
        ) : (
          /* Main Subscription Form */
          <div className="p-6 sm:p-8 space-y-6">
            {/* Billing Cycle Selector */}
            <div className="flex bg-purple-50 p-1.5 rounded-2xl border border-purple-100">
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                  billingCycle === 'annual'
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'text-purple-900 hover:text-purple-950'
                }`}
              >
                <span>Annual Pass</span>
                {yearlyProduct?.formattedPrice ? (
                  <span className="text-[10px] font-extrabold opacity-90">({yearlyProduct.formattedPrice})</span>
                ) : null}
                <span className="px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-full uppercase">
                  Best Value
                </span>
              </button>

              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-purple-700 text-white shadow-md'
                    : 'text-purple-900 hover:text-purple-950'
                }`}
              >
                <span>Monthly Pass</span>
                {monthlyProduct?.formattedPrice ? (
                  <span className="text-[10px] font-extrabold opacity-90"> ({monthlyProduct.formattedPrice})</span>
                ) : null}
              </button>
            </div>

            {/* Premium Perks Checklist */}
            <div className="space-y-3">
              {[
                '🚫 100% Ad-Free Video Playback',
                '🤖 Unlimited AI 3D Avatar Generations',
                '⏱️ Advanced Screen Time & Bedtime Routines',
                '👦 Unlimited Multi-Kid Profiles',
                '🎨 Printable PDF Activity & Coloring Workbooks',
                '📥 Offline Video Downloads — Coming Soon',
              ].map((perk, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs font-bold text-slate-800">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <span>{perk}</span>
                </div>
              ))}
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-900 text-xs font-medium space-y-1">
                <div className="flex items-start gap-2">
                  <span className="text-base">⚠️</span>
                  <div>
                    <span className="font-bold text-amber-950">Google Play Billing:</span>
                    <p className="mt-0.5">{errorMessage}</p>
                  </div>
                </div>
              </div>
            )}

            {infoMessage && (
              <div className="p-3 bg-purple-50 border border-purple-200 rounded-2xl text-purple-900 text-xs font-semibold text-center">
                {infoMessage}
              </div>
            )}

            {/* Subscribe Action Button */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                disabled={isLoading || isPremium}
                onClick={handleSubscribe}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-700 text-slate-950 font-black text-sm rounded-2xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-75"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting Google Play...</span>
                  </>
                ) : (
                  <>
                    <Crown className="w-5 h-5 fill-current text-slate-950" />
                    <span>
                      {isPremium
                        ? 'Active Premium Member'
                        : `Subscribe via Google Play ${displayPrice ? `(${displayPrice})` : ''}`}
                    </span>
                  </>
                )}
              </button>

              {!isPremium && (
                <button
                  type="button"
                  disabled={isRestoring}
                  onClick={handleRestore}
                  className="w-full py-2 text-xs font-bold text-purple-700 hover:text-purple-900 hover:underline disabled:opacity-60"
                >
                  {isRestoring ? 'Checking Google Play...' : 'Already subscribed? Restore Purchases'}
                </button>
              )}

              <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  Official Google Play Store Billing
                </span>
                <span>•</span>
                <span>Cancel Anytime</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
