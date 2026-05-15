import { CONTENT } from '../../config/content';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, User, Code, ExternalLink, Copy, Check } from 'lucide-react';
import { useState } from 'react';

const iconMap: Record<string, typeof Shield> = {
  shield: Shield,
  check: CheckCircle,
  user: User,
  code: Code,
};

export const SocialProof = () => {
  const [copied, setCopied] = useState(false);
  const { contract, badges } = CONTENT.socialProof;

  const shortAddress = `${contract.address.slice(0, 6)}...${contract.address.slice(-4)}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(contract.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-6 py-12 md:px-10 md:py-16 border-t border-white/5 bg-ink/50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          {/* Contract address */}
          <div className="flex items-center gap-4">
            <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-paper/20">Contract:</span>
            <div className="flex items-center gap-2 bg-white/[0.03] border border-white/5 px-4 py-2.5">
              <span className="font-mono text-xs text-amber">{shortAddress}</span>
              <button 
                onClick={handleCopy}
                className="text-paper/30 hover:text-amber transition-colors interactive-hover p-1"
                aria-label="Copy contract address"
              >
                {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <a
                href={contract.explorer}
                target="_blank"
                rel="noopener noreferrer"
                className="text-paper/30 hover:text-amber transition-colors interactive-hover p-1"
                aria-label="View on WorldScan"
              >
                <ExternalLink size={14} />
              </a>
            </div>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
            {badges.map((badge, i) => {
              const Icon = iconMap[badge.icon] || Shield;
              return (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="badge-shimmer flex items-center gap-2.5 px-4 py-2.5 border border-white/5 bg-white/[0.02]"
                >
                  <Icon size={14} className="text-amber" strokeWidth={1.5} />
                  <span className="font-mono text-[10px] tracking-[0.15em] uppercase text-paper/50">
                    {badge.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
