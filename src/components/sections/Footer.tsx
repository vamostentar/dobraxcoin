import { CONTENT } from '../../config/content';

export const Footer = () => {
  return (
    <footer className="px-6 py-12 md:px-10 md:py-16 border-t border-white/5 bg-ink">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 md:gap-20">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3 opacity-50 hover:opacity-100 transition-opacity duration-500">
            <img src="/logo.svg" alt="DobraX Logo" className="w-6 h-6 grayscale" />
            <span className="font-display text-lg tracking-widest text-paper uppercase">
              {CONTENT.nav.logo}
            </span>
          </div>
          <div className="font-mono text-[9px] tracking-widest text-paper/10 uppercase text-center md:text-left whitespace-pre-line leading-relaxed">
            {CONTENT.footer.note}
          </div>
        </div>

        {/* Links with proper touch targets (min 44px) */}
        <div className="flex flex-wrap gap-6 md:gap-12 justify-center">
          {CONTENT.footer.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[10px] tracking-widest uppercase text-paper/30 hover:text-white transition-colors duration-300 interactive-hover py-2 px-1 min-h-[44px] flex items-center"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
