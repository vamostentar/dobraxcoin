import { motion } from 'framer-motion';

const phases = [
  {
    tag: "Phase 01",
    title: "The Genesis",
    status: "active" as const,
    progress: 73,
    items: [
      { text: "Fair Launch on World Chain", done: true },
      { text: "Proof of Personhood Integration", done: true },
      { text: "Manifesto Release", done: true },
      { text: "Initial Community Formation", done: false },
    ]
  },
  {
    tag: "Phase 02",
    title: "Expansion",
    status: "upcoming" as const,
    progress: 0,
    items: [
      { text: "Listing on Major L2 DEXs", done: false },
      { text: "Strategic Partnerships", done: false },
      { text: "Community Governance Alpha", done: false },
      { text: "Global Awareness Campaign", done: false },
    ]
  },
  {
    tag: "Phase 03",
    title: "Ecosystem",
    status: "upcoming" as const,
    progress: 0,
    items: [
      { text: "Utility Tier Deployment", done: false },
      { text: "DobraX DAO Launch", done: false },
      { text: "Mobile-First Wallet Integration", done: false },
      { text: "The Next Frontier", done: false },
    ]
  }
];

export const Roadmap = () => {
  return (
    <section className="px-6 py-24 md:px-10 md:py-32 border-t border-white/5 relative bg-ink">
       <div className="absolute top-10 right-10 font-display text-9xl text-white/[0.03] select-none pointer-events-none uppercase">
        Roadmap
      </div>

      <div className="max-w-7xl mx-auto">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="inline-block font-mono text-[10px] tracking-[0.25em] uppercase text-red mb-12"
        >
          — Vision & Execution
        </motion.span>

        <div className="grid md:grid-cols-3 gap-12 md:gap-20">
          {phases.map((phase, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="relative"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-red">
                  {phase.tag}
                </div>
                {phase.status === 'active' && (
                  <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-400/10 border border-emerald-400/20">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="font-mono text-[9px] tracking-widest uppercase text-emerald-400">Active</span>
                  </span>
                )}
              </div>

              <h3 className="font-display text-4xl text-white uppercase mb-4 tracking-tight italic">
                {phase.title}
              </h3>

              {/* Progress bar */}
              {phase.status === 'active' && (
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-mono text-[9px] tracking-widest uppercase text-paper/20">Progress</span>
                    <span className="font-mono text-[9px] tracking-widest uppercase text-amber">{phase.progress}%</span>
                  </div>
                  <div className="h-px bg-white/10 relative overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${phase.progress}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: 0.3 }}
                      className="absolute inset-y-0 left-0 bg-amber shadow-[0_0_8px_rgba(224,155,26,0.4)]"
                    />
                  </div>
                </div>
              )}

              <ul className="space-y-4">
                {phase.items.map((item, j) => (
                  <li key={j} className={`font-serif flex gap-4 text-sm leading-tight border-l pl-6 group transition-colors duration-500 ${
                    item.done 
                      ? 'border-emerald-400/30 text-paper/50' 
                      : 'border-white/5 text-paper/30 hover:border-red'
                  }`}>
                    {item.done && <span className="text-emerald-400 flex-shrink-0">✓</span>}
                    <span className={item.done ? 'line-through decoration-paper/10' : ''}>{item.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
