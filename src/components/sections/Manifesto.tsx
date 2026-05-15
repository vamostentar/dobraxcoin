import { CONTENT } from '../../config/content';
import { motion } from 'framer-motion';

export const Manifesto = () => {
  return (
    <section id="manifesto" className="relative bg-paper text-ink px-6 py-24 md:px-10 md:py-32 overflow-hidden">
      {/* Decorative background X */}
      <div className="absolute right-[-1.5rem] bottom-[-5rem] font-display text-[20rem] text-transparent select-none pointer-events-none leading-none opacity-5" style={{ WebkitTextStroke: '1px rgba(5,4,4,0.055)' }}>
        X
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.span 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-red mb-6"
        >
          — {CONTENT.manifesto.label}
        </motion.span>

        <motion.blockquote 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-serif italic text-4xl md:text-8xl leading-[1.1] text-ink max-w-5xl"
        >
          "{CONTENT.manifesto.quote.split('.').map((part, i) => (
            i === 1 ? <em key={i} className="not-italic text-red block md:inline"> {part}</em> : part
          ))}"
        </motion.blockquote>

        <div className="mt-16 md:mt-24 grid md:grid-cols-2 gap-12 md:gap-20 max-w-4xl">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-serif text-lg md:text-xl leading-relaxed text-ink/60"
          >
            {CONTENT.manifesto.body1}
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="font-serif text-lg md:text-xl leading-relaxed text-ink/60"
          >
            {CONTENT.manifesto.body2}
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 font-mono text-[10px] tracking-[0.2em] uppercase text-ink/30"
        >
          — {CONTENT.manifesto.signature}
        </motion.div>
      </div>
    </section>
  );
};
