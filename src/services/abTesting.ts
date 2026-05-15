/**
 * A/B Testing Service
 * 
 * Lightweight client-side A/B testing for headline variants.
 * Uses localStorage to persist variant assignment across sessions.
 * Integrates with analytics to track which variant converts better.
 */

export interface ABVariant {
  id: string;
  title: {
    line1: string;
    line2: string;
    highlight: string;
  };
  sub: string;
}

/** 
 * Headline variants for the Hero section.
 * Variant A = control (current), B & C = challengers.
 */
export const HERO_VARIANTS: ABVariant[] = [
  {
    id: 'A',
    title: {
      line1: 'The',
      line2: 'Currency',
      highlight: 'of Defiance.',
    },
    sub: 'Not a trend. Not a hype cycle. A statement — for those who believe money should belong to those who use it.',
  },
  {
    id: 'B',
    title: {
      line1: 'Your',
      line2: 'Money.',
      highlight: 'Your Rules.',
    },
    sub: 'No banks. No gatekeepers. Just verified humans building a financial system that answers to no one but its community.',
  },
  {
    id: 'C',
    title: {
      line1: 'Own',
      line2: 'What\'s',
      highlight: 'Truly Yours.',
    },
    sub: 'Built on World Chain, powered by Proof of Personhood. The first token where every holder is a verified human.',
  },
];

const STORAGE_KEY = 'dbx_ab_variant';

/**
 * Get the assigned variant for this user.
 * Persists across sessions via localStorage.
 * Distribution: equal weight across all variants.
 */
export const getAssignedVariant = (): ABVariant => {
  try {
    // Check for existing assignment
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const variant = HERO_VARIANTS.find(v => v.id === stored);
      if (variant) return variant;
    }

    // Assign randomly with equal weight
    const randomIndex = Math.floor(Math.random() * HERO_VARIANTS.length);
    const variant = HERO_VARIANTS[randomIndex];
    
    localStorage.setItem(STORAGE_KEY, variant.id);
    return variant;
  } catch {
    // Fallback to control if localStorage unavailable
    return HERO_VARIANTS[0];
  }
};

/**
 * Get the current variant ID (for analytics tagging)
 */
export const getCurrentVariantId = (): string => {
  try {
    return localStorage.getItem(STORAGE_KEY) || 'A';
  } catch {
    return 'A';
  }
};

/**
 * Force a specific variant (for testing/debugging)
 * Usage in browser console: window.__setABVariant('B')
 */
export const forceVariant = (variantId: string): void => {
  try {
    localStorage.setItem(STORAGE_KEY, variantId);
    window.location.reload();
  } catch {
    console.error('Failed to set variant');
  }
};

// Expose debug function globally in development
if (import.meta.env.DEV) {
  (window as any).__setABVariant = forceVariant;
  (window as any).__getABVariant = getCurrentVariantId;
}
