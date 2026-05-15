import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Fast preloader: ~800ms total instead of 2.5s
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 200);
          return 100;
        }
        // Accelerated progress: reaches 100 in ~800ms
        return Math.min(prev + 4, 100);
      });
    }, 16);

    // Failsafe: force-dismiss after 1.2s regardless
    const failsafe = setTimeout(() => setLoading(false), 1200);

    return () => {
      clearInterval(interval);
      clearTimeout(failsafe);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[2000] bg-ink flex flex-col items-center justify-center"
        >
          {/* Logo Pulse */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <img src="/logo.svg" alt="DobraX" className="w-16 h-16 grayscale brightness-200" />
          </motion.div>

          {/* Progress Bar Container */}
          <div className="w-48 h-px bg-white/10 relative overflow-hidden">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-amber shadow-[0_0_10px_rgba(224,155,26,0.5)]"
              initial={{ width: "0%" }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear" }}
            />
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 font-mono text-[9px] tracking-[0.4em] uppercase text-white/20"
          >
            Initialising Defiance {progress}%
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
