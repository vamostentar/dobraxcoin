import { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { CONTENT } from '../../config/content';
import { motion } from 'framer-motion';
import { fetchTokenData, TokenData } from '../../services/web3Service';
import { getAssignedVariant, getCurrentVariantId } from '../../services/abTesting';
import { trackCTAClick, trackSectionView } from '../../services/analytics';
import { ChevronDown } from 'lucide-react';

// Lazy load the heavy 3D canvas
const CoinCanvas = lazy(() => import('../canvas/CoinCanvas').then(m => ({ default: m.CoinCanvas })));

export const Hero = () => {
  const [web3Data, setWeb3Data] = useState<TokenData | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // A/B Test: get assigned headline variant (persisted in localStorage)
  const variant = useMemo(() => getAssignedVariant(), []);
  const variantId = getCurrentVariantId();

  useEffect(() => {
    // Track which variant the user sees
    trackSectionView(`Hero (Variant ${variantId})`);
  }, [variantId]);

  useEffect(() => {
    // Detect mobile for 3D canvas
    const mq = window.matchMedia('(max-width: 768px)');
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    fetchTokenData().then(setWeb3Data);
    // Poll every 30 seconds for live data
    const interval = setInterval(() => {
      fetchTokenData().then(setWeb3Data);
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end px-6 pt-32 pb-20 md:px-10 md:pt-40 md:pb-24 overflow-hidden bg-ink">
      {/* 3D Coin Canvas — lazy loaded, disabled on mobile */}
      {!isMobile ? (
        <Suspense fallback={<div className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none" />}>
          <CoinCanvas />
        </Suspense>
      ) : (
        <div className="absolute inset-0 bg-radial-glow opacity-60 pointer-events-none" />
      )}

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.span 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="block font-mono text-[10px] md:text-xs tracking-[0.3em] uppercase text-amber mb-6"
        >
          {CONTENT.hero.eyebrow}
        </motion.span>

        {/* A/B Tested Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.9 }}
          className="font-display text-5xl sm:text-7xl md:text-[10rem] lg:text-[14rem] leading-[0.9] tracking-tight text-white max-w-5xl uppercase"
          data-variant={variantId}
        >
          {variant.title.line1}<br />
          {variant.title.line2}<br />
          <span className="text-amber italic">{variant.title.highlight}</span>
        </motion.h1>

        {/* Dual CTA — Primary + Secondary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.8 }}
          className="mt-8 md:mt-12 flex flex-col sm:flex-row gap-4"
        >
          <a
            href={CONTENT.nav.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackCTAClick('hero_primary', variantId)}
            className="group relative inline-flex items-center justify-center px-10 py-4 sm:py-5 bg-amber overflow-hidden interactive-hover"
          >
            <span className="relative z-10 font-mono text-xs font-bold tracking-widest uppercase text-ink">
              {CONTENT.hero.ctaPrimary}
            </span>
            <div className="absolute inset-0 bg-amber-bright translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
          </a>

          <a
            href="#como"
            onClick={() => trackCTAClick('hero_secondary', variantId)}
            className="group inline-flex items-center justify-center px-10 py-4 sm:py-5 border border-white/10 hover:border-white/30 transition-colors duration-300 interactive-hover"
          >
            <span className="font-mono text-xs tracking-widest uppercase text-paper/60 group-hover:text-white transition-colors duration-300">
              {CONTENT.hero.ctaSecondary}
            </span>
          </a>
        </motion.div>

        <div className="mt-14 md:mt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          {/* A/B Tested Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="font-serif italic text-lg md:text-xl text-paper/40 max-w-md leading-relaxed"
          >
            {variant.sub}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex gap-10 md:gap-16"
          >
            {CONTENT.hero.stats.map((stat, i) => (
              <div key={i}>
                <div className="font-display text-3xl md:text-5xl text-white leading-none">
                  {stat.isCounter ? (
                    <Counter target={web3Data ? web3Data.holders : 1} />
                  ) : stat.label === 'Market Cap' ? (
                    web3Data ? `$${(web3Data.marketCap / 1000000).toFixed(1)}M` : '...'
                  ) : stat.value}
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-paper/20 mt-3 border-t border-white/5 pt-2">
                  {stat.label}
                </div>
              </div>
            ))}

            {/* Live 24h change indicator */}
            {web3Data && (
              <div>
                <div className={`font-display text-3xl md:text-5xl leading-none ${web3Data.change24h >= 0 ? 'text-emerald-400' : 'text-red'}`}>
                  {web3Data.change24h >= 0 ? '+' : ''}{web3Data.change24h.toFixed(1)}%
                </div>
                <div className="font-mono text-[10px] tracking-widest uppercase text-paper/20 mt-3 border-t border-white/5 pt-2">
                  24h Change
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Live data timestamp */}
        {web3Data && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="font-mono text-[9px] tracking-widest uppercase text-paper/15">
              Live · Auto-updates every 30s
            </span>
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 scroll-indicator">
        <ChevronDown className="w-5 h-5 text-paper/20" strokeWidth={1.5} />
      </div>
    </section>
  );
};

const Counter = ({ target }: { target: number }) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (target <= 0) return;
    
    let start = 0;
    const duration = 2500;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  return <span>{count.toLocaleString()}</span>;
};
