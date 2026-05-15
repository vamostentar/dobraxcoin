import { CONTENT } from '../../config/content';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { fetchTokenData, TokenData } from '../../services/web3Service';
import { trackCTAClick } from '../../services/analytics';
import { getCurrentVariantId } from '../../services/abTesting';

export const CTA = () => {
  const [web3Data, setWeb3Data] = useState<TokenData | null>(null);

  useEffect(() => {
    fetchTokenData().then(setWeb3Data);
  }, []);

  return (
    <section className="relative min-h-[80vh] flex flex-col justify-center items-center px-6 py-32 text-center border-t border-white/5 overflow-hidden">
      <div className="absolute inset-0 bg-radial-glow pointer-events-none opacity-50" />
      
      <motion.span 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-amber mb-6"
      >
        — {CONTENT.cta.label}
      </motion.span>

      <motion.h2 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="font-display text-5xl sm:text-7xl md:text-[12rem] text-white leading-[0.9] tracking-tight mb-10"
      >
        {CONTENT.cta.title.split('yours').map((part, i) => (
          i === 0 ? <span key={i}>{part}<span className="text-amber">yours.</span></span> : part
        ))}
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="font-serif italic text-xl md:text-2xl text-paper/40 max-w-lg mb-8"
      >
        {CONTENT.cta.sub}
      </motion.p>

      {/* Urgency element: community counter */}
      {web3Data && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mb-10 flex items-center gap-3 px-5 py-3 border border-white/5 bg-white/[0.02]"
        >
          <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-paper/40">
            <span className="text-white font-bold">{web3Data.holders.toLocaleString()}+</span> verified humans have joined
          </span>
        </motion.div>
      )}

      <motion.a
        href={CONTENT.nav.ctaHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackCTAClick('footer_cta', getCurrentVariantId())}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="group relative px-12 py-5 bg-amber overflow-hidden interactive-hover"
      >
        <span className="relative z-10 font-mono text-xs font-bold tracking-widest uppercase text-ink">
          {CONTENT.cta.button}
        </span>
        <div className="absolute inset-0 bg-amber-bright translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 cubic-bezier(0.77,0,0.18,1)" />
      </motion.a>

      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="mt-20 font-mono text-[10px] tracking-[0.3em] uppercase text-paper/10"
      >
        {CONTENT.cta.footer}
      </motion.div>
    </section>
  );
};
