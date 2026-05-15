/**
 * Analytics Service
 * 
 * Lightweight analytics wrapper supporting Plausible Analytics.
 * Plausible is privacy-friendly (no cookies, GDPR compliant by default).
 * 
 * Setup: Replace PLAUSIBLE_DOMAIN with your actual domain.
 * The script tag is injected in index.html.
 */

const PLAUSIBLE_DOMAIN = 'dobraxcoin.com';

interface EventOptions {
  /** Custom properties to attach to the event */
  props?: Record<string, string | number | boolean>;
  /** Revenue tracking */
  revenue?: { currency: string; amount: number };
}

/**
 * Track a custom event via Plausible
 */
export const trackEvent = (eventName: string, options?: EventOptions) => {
  try {
    // Plausible global function
    const plausible = (window as any).plausible;
    if (typeof plausible === 'function') {
      plausible(eventName, options);
    }

    // Also log in development
    if (import.meta.env.DEV) {
      console.log(`[Analytics] ${eventName}`, options?.props || '');
    }
  } catch {
    // Silently fail — analytics should never break the app
  }
};

/**
 * Track CTA click with variant info for A/B correlation
 */
export const trackCTAClick = (ctaLocation: string, variant?: string) => {
  trackEvent('CTA Click', {
    props: {
      location: ctaLocation,
      ...(variant ? { headline_variant: variant } : {}),
    },
  });
};

/**
 * Track section visibility (scroll depth)
 */
export const trackSectionView = (sectionName: string) => {
  trackEvent('Section View', {
    props: { section: sectionName },
  });
};

/**
 * Track QR Modal open
 */
export const trackQROpen = (source: string) => {
  trackEvent('QR Modal Open', {
    props: { source },
  });
};

/**
 * Track lead capture submission
 */
export const trackLeadCapture = (type: 'email' | 'telegram') => {
  trackEvent('Lead Capture', {
    props: { type },
  });
};

/**
 * Track FAQ interaction
 */
export const trackFAQOpen = (question: string) => {
  trackEvent('FAQ Open', {
    props: { question },
  });
};
