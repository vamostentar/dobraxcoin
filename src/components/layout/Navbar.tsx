import { useState } from 'react';
import { CONTENT } from '../../config/content';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenQR: () => void;
}

export const Navbar = ({ onOpenQR }: NavbarProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[500] flex justify-between items-center px-6 py-5 md:px-10 md:py-7 bg-ink/20 backdrop-blur-md border-b border-white/5"
      >
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <img src="/logo.svg" alt="DobraX Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <span className="font-display text-xl md:text-2xl tracking-wider text-white uppercase flex items-baseline gap-1">
            {CONTENT.nav.logo}
            <sup className="font-mono text-[10px] tracking-widest text-amber uppercase">{CONTENT.nav.ticker}</sup>
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {CONTENT.nav.links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-[10px] tracking-[0.2em] uppercase text-paper/40 hover:text-white transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* CTA Button */}
          <button
            onClick={onOpenQR}
            className="group relative px-6 py-3 overflow-hidden bg-amber interactive-hover"
          >
            <span className="relative z-10 font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink">
              {CONTENT.nav.cta}
            </span>
            <div className="absolute inset-0 bg-amber-bright translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 cubic-bezier(0.77,0,0.18,1)" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden flex items-center justify-center w-11 h-11 text-paper/60 hover:text-white transition-colors"
            aria-label="Open navigation menu"
          >
            <Menu size={22} strokeWidth={1.5} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-[600] bg-ink/80 mobile-menu-backdrop md:hidden"
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[700] w-[280px] bg-ink border-l border-white/5 flex flex-col md:hidden"
            >
              {/* Close button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center w-11 h-11 text-paper/40 hover:text-white transition-colors"
                  aria-label="Close navigation menu"
                >
                  <X size={22} strokeWidth={1.5} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-2 px-8 mt-4">
                {CONTENT.nav.links.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="font-mono text-xs tracking-[0.2em] uppercase text-paper/50 hover:text-white transition-colors duration-300 py-4 border-b border-white/5"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="mt-auto p-8">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenQR();
                  }}
                  className="w-full group relative py-4 overflow-hidden bg-amber interactive-hover"
                >
                  <span className="relative z-10 font-mono text-[11px] font-medium tracking-[0.18em] uppercase text-ink">
                    {CONTENT.nav.cta}
                  </span>
                  <div className="absolute inset-0 bg-amber-bright translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500" />
                </button>

                <div className="flex gap-6 mt-6 justify-center">
                  {CONTENT.footer.links.slice(0, 2).map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[9px] tracking-widest uppercase text-paper/20 hover:text-amber transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
