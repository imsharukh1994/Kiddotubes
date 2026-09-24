/**
 * KiddoTube Child Advertising Safety Policy
 * Strict compliance module for child-directed content environments.
 */

export interface AdSafetySettings {
  isChildDirected: boolean;
  tagForChildDirectedTreatment: boolean; // TFCD
  underAgeOfConsent: boolean; // TFUA
  maxAdRating: 'G' | 'PG';
  allowPersonalization: boolean;
  allowCrossSiteTracking: boolean;
}

export const CHILD_AD_SAFETY_CONFIG: AdSafetySettings = {
  isChildDirected: true,
  tagForChildDirectedTreatment: true,
  underAgeOfConsent: true,
  maxAdRating: 'G',
  allowPersonalization: false, // Strict COPPA & GDPR-K: No behavioral targeting
  allowCrossSiteTracking: false,
};

export const BLOCKED_AD_CATEGORIES = [
  'Adult & Matrimonial',
  'Gambling & Games of Chance',
  'Alcohol & Spirits',
  'Tobacco & Nicotine Products',
  'Weapons & Firearms',
  'Dating Services',
  'Violent Content',
  'Deceptive or Get-Rich-Quick Offers',
  'Political Campaigning',
  'Pharmaceuticals & Supplements',
  'Cosmetic Surgery',
] as const;

export type BlockedCategory = typeof BLOCKED_AD_CATEGORIES[number];

export function isCategoryAllowed(category: string): boolean {
  return !BLOCKED_AD_CATEGORIES.some(blocked => 
    category.toLowerCase().includes(blocked.toLowerCase())
  );
}

export interface AdReportRequest {
  adId?: string;
  reason: string;
  details?: string;
  timestamp: string;
}

export function submitAdReport(report: AdReportRequest): { success: boolean; message: string } {
  // In production, this routes to safety review queue
  console.log('[KiddoTube Ad Safety Report Submitted]:', report);
  return {
    success: true,
    message: 'Thank you. Your ad report has been submitted to our child safety review team.',
  };
}
