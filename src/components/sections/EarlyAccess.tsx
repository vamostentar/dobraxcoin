import { CONTENT } from '../../config/content';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Send, MessageCircle } from 'lucide-react';
import { trackLeadCapture, trackCTAClick } from '../../services/analytics';

export const EarlyAccess = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    trackLeadCapture('email');
    // In production, this would hit an API endpoint
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setEmail('');
  };

  return (
    <section className="bg-white text-ink px-6 py-24 md:px-10 md:py-32 relative overflow-hidden">
      {/* Decorative text */}
      <div className="absolute right-[-2rem] bottom-[-4rem] font-display text-[min(26rem,22vw)] text-transparent select-none pointer-events-none leading-none opacity-5" style={{ WebkitTextStroke: '1px rgba(5,4,4,0.04)' }}>
        DBX
      </div>

      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="font-display text-5xl sm:text-7xl md:text-[9rem] leading-[0.88] tracking-tight text-ink whitespace-pre-line"
        >
          {CONTENT.early.title.split('First').map((part, i) => (
            i === 0 ? <span key={i}>{part}<em className="not-italic text-red">First.</em></span> : part
          ))}
        </motion.h2>

        <div>
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-red mb-8"
          >
            — {CONTENT.early.label}
          </motion.span>

          <ul className="space-y-0 mb-12">
            {CONTENT.early.items.map((item, i) => (
              <motion.li 
                key={i}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="font-serif text-lg py-5 border-b border-ink/10 flex gap-5 text-ink/70"
              >
                <span className="text-red flex-shrink-0 mt-1">→</span>
                {item}
              </motion.li>
            ))}
          </ul>

          {/* Primary CTA */}
          <motion.a
            href={CONTENT.nav.ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -5 }}
            className="group relative inline-flex items-center px-10 py-5 bg-ink text-white font-mono text-xs tracking-widest uppercase overflow-hidden interactive-hover"
          >
            <span className="relative z-10">{CONTENT.early.cta}</span>
            <div className="absolute inset-0 bg-red translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 cubic-bezier(0.77,0,0.18,1)" />
          </motion.a>

          {/* Lead Capture — Alternative Funnel (Temporarily hidden until backend is ready) */}
        </div>
      </div>
    </section>
  );
};
