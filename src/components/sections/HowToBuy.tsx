import { CONTENT } from '../../config/content';
import { motion } from 'framer-motion';

export const HowToBuy = () => {
  return (
    <section id="como" className="px-6 py-24 md:px-10 md:py-32 border-t border-white/5 relative">
      <div className="absolute top-10 right-10 font-display text-9xl text-white/[0.03] select-none pointer-events-none">
        03
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-amber mb-6"
        >
          — {CONTENT.howTo.label}
        </motion.span>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-8xl text-white leading-none tracking-tight max-w-2xl mb-20"
        >
          {CONTENT.howTo.title}
        </motion.h2>

        <div className="space-y-0">
          {CONTENT.howTo.steps.map((step, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="group grid md:grid-cols-[100px_1fr_250px] gap-10 md:gap-20 py-12 md:py-16 border-t border-white/5 hover:bg-white/[0.02] hover:pl-4 transition-all duration-500 interactive-hover"
            >
              <div className="font-mono text-xs tracking-widest text-amber pt-2">
                {step.n}
              </div>
              
              <div>
                <h3 className="font-display text-3xl md:text-4xl text-white tracking-wide mb-4">
                  {step.name}
                </h3>
                <p className="font-serif text-lg text-paper/40 leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>

              <div className="flex items-start md:justify-end md:pt-4">
                <a 
                  href={step.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-mono text-[10px] tracking-widest uppercase text-amber border-b border-amber/20 pb-1 hover:text-amber-bright hover:border-amber-bright transition-all duration-300"
                >
                  {step.linkText}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
