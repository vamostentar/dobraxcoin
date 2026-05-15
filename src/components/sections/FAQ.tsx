import { useState } from 'react';
import { CONTENT } from '../../config/content';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { trackFAQOpen } from '../../services/analytics';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    if (openIndex !== i) {
      trackFAQOpen(CONTENT.faq.items[i].q);
    }
    setOpenIndex(prev => (prev === i ? null : i));
  };

  return (
    <section id="faq" className="px-6 py-24 md:px-10 md:py-32 border-t border-white/5 relative bg-ink">
      <div className="absolute top-10 right-10 font-display text-9xl text-white/[0.03] select-none pointer-events-none">
        ?
      </div>

      <div className="max-w-4xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-red mb-6"
        >
          — {CONTENT.faq.label}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-8xl text-white leading-none tracking-tight mb-16 whitespace-pre-line"
        >
          {CONTENT.faq.title}
        </motion.h2>

        <div className="space-y-0">
          {CONTENT.faq.items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border-t border-white/5 last:border-b"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full flex items-center justify-between py-7 md:py-8 text-left group interactive-hover"
                aria-expanded={openIndex === i}
              >
                <span className="font-serif text-lg md:text-xl text-paper/70 group-hover:text-white transition-colors duration-300 pr-8">
                  {item.q}
                </span>
                <motion.div
                  animate={{ rotate: openIndex === i ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0"
                >
                  <ChevronDown size={18} className="text-amber" strokeWidth={1.5} />
                </motion.div>
              </button>

              <div
                className="faq-answer"
                data-open={openIndex === i}
              >
                <div>
                  <p className="font-serif text-base md:text-lg text-paper/40 leading-relaxed pb-8 pr-12 max-w-3xl">
                    {item.a}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contract verification CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href={CONTENT.socialProof.contract.explorer}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-[10px] tracking-widest uppercase text-paper/30 hover:text-amber transition-colors duration-300 interactive-hover"
          >
            Verify contract on WorldScan →
          </a>
        </motion.div>
      </div>
    </section>
  );
};
