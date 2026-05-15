import { CONTENT } from '../../config/content';
import { motion } from 'framer-motion';
import { UserCheck, Lock, Zap, Globe, Shield, Coins } from 'lucide-react';

const icons = [UserCheck, Lock, Zap, Globe, Shield, Coins];

export const Pillars = () => {
  return (
    <section id="pillars" className="px-6 py-24 md:px-10 md:py-32 border-t border-white/5 relative">
      <div className="absolute top-10 right-10 font-display text-9xl text-white/[0.03] select-none pointer-events-none">
        02
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-amber mb-12"
        >
          — {CONTENT.pillars.label}
        </motion.span>

        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 mt-8">
          {/* Main Card (Large) */}
          <BentoCard 
            index={0}
            className="md:col-span-2 md:row-span-2 min-h-[400px]"
            item={CONTENT.pillars.items[0]}
            icon={icons[0]}
          />

          {/* Secondary Card (Medium) */}
          <BentoCard 
            index={1}
            className="md:col-span-2 min-h-[200px]"
            item={CONTENT.pillars.items[1]}
            icon={icons[1]}
          />

          {/* Small Card */}
          <BentoCard 
            index={2}
            className="md:col-span-1 min-h-[200px]"
            item={CONTENT.pillars.items[2]}
            icon={icons[2]}
          />

          {/* New Dynamic Metric Card (Elite addition) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="group relative bg-amber p-8 overflow-hidden hover:bg-amber-bright transition-colors duration-500 md:col-span-1 min-h-[200px] flex flex-col justify-between interactive-hover"
          >
            <div className="relative z-10">
              <span className="font-mono text-[9px] tracking-widest uppercase text-ink/40 mb-2 block">World Chain Native</span>
              <h3 className="font-display text-2xl text-ink leading-tight uppercase">Built for <br/>Scale</h3>
            </div>
            <Globe className="w-12 h-12 text-ink/20 absolute bottom-[-10px] right-[-10px] group-hover:scale-125 transition-transform duration-700" />
            <div className="relative z-10 font-serif italic text-sm text-ink/60">
              Leveraging L2 efficiency.
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const BentoCard = ({ item, icon: Icon, className, index }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.15 }}
    className={`group relative bg-ink p-8 md:p-10 border border-white/5 overflow-hidden hover:bg-[#0D0B08] transition-colors duration-500 interactive-hover flex flex-col ${className}`}
  >
    <div className="absolute top-4 right-6 font-display text-7xl text-white/[0.03] select-none pointer-events-none group-hover:text-amber/5 transition-colors duration-500">
      {item.n}
    </div>

    <Icon className="w-8 h-8 text-amber mb-8 group-hover:scale-110 transition-transform duration-500" strokeWidth={1.2} />
    
    <div className="mt-auto">
      <h3 className="font-display text-3xl text-white leading-[1.05] mb-4 whitespace-pre-line tracking-wide uppercase">
        {item.title}
      </h3>
      
      <p className="font-serif text-base text-paper/40 leading-relaxed group-hover:text-paper/60 transition-colors duration-500 max-w-sm">
        {item.desc}
      </p>
    </div>
  </motion.div>
);
