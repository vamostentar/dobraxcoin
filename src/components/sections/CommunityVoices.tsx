import { CONTENT } from '../../config/content';
import { motion } from 'framer-motion';
import { MessageCircle, Twitter } from 'lucide-react';

const platformIcons: Record<string, typeof Twitter> = {
  'Twitter / X': Twitter,
  'Telegram': MessageCircle,
};

export const CommunityVoices = () => {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32 border-t border-white/5 relative bg-ink">
      <div className="absolute top-10 right-10 font-display text-9xl text-white/[0.03] select-none pointer-events-none">
        ❝
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-amber mb-6"
        >
          — {CONTENT.communityVoices.label}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-8xl text-white leading-none tracking-tight max-w-3xl mb-16"
        >
          {CONTENT.communityVoices.title}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CONTENT.communityVoices.testimonials.map((testimonial, i) => {
            const PlatformIcon = platformIcons[testimonial.platform] || MessageCircle;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="testimonial-card group relative p-8 md:p-10 border border-white/5 flex flex-col justify-between min-h-[220px]"
              >
                {/* Quote */}
                <p className="font-serif italic text-lg md:text-xl text-paper/50 leading-relaxed group-hover:text-paper/70 transition-colors duration-500">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <span className="font-mono text-xs tracking-widest text-amber block">
                      {testimonial.author}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-paper/15">
                    <PlatformIcon size={14} strokeWidth={1.5} />
                    <span className="font-mono text-[9px] tracking-widest uppercase">
                      {testimonial.platform}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center"
        >
          <a
            href="https://x.com/DobraXcoin"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-white/5 hover:border-amber/30 transition-colors duration-300 interactive-hover"
          >
            <Twitter size={16} className="text-paper/30 group-hover:text-amber transition-colors" strokeWidth={1.5} />
            <span className="font-mono text-[10px] tracking-widest uppercase text-paper/40 group-hover:text-white transition-colors">
              Follow on X
            </span>
          </a>
          <a
            href="https://t.me/dobraxcoin"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-6 py-3 border border-white/5 hover:border-amber/30 transition-colors duration-300 interactive-hover"
          >
            <MessageCircle size={16} className="text-paper/30 group-hover:text-amber transition-colors" strokeWidth={1.5} />
            <span className="font-mono text-[10px] tracking-widest uppercase text-paper/40 group-hover:text-white transition-colors">
              Join Telegram
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
};
