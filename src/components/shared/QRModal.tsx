import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { X } from 'lucide-react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
}

export const QRModal = ({ isOpen, onClose, url }: QRModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/90 backdrop-blur-md"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative bg-paper p-8 md:p-12 max-w-md w-full text-ink perspective-1000 overflow-hidden"
          >
            {/* Decorative Grain */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22g%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.75%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23g)%22/%3E%3C/svg%3E')]" />

            <button 
              onClick={onClose}
              className="absolute top-6 right-6 text-ink/40 hover:text-ink transition-colors interactive-hover"
            >
              <X size={24} />
            </button>

            <div className="relative z-10 text-center">
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-red mb-4 block">
                — Scan to Invest
              </span>
              <h2 className="font-display text-4xl mb-8 leading-none uppercase tracking-tight">
                Get $DBX on <br/><span className="text-red italic">World App</span>
              </h2>

              <div className="bg-white p-6 inline-block shadow-2xl mb-8">
                <QRCodeSVG 
                  value={url} 
                  size={200}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "/logo.svg",
                    x: undefined,
                    y: undefined,
                    height: 40,
                    width: 40,
                    excavate: true,
                  }}
                />
              </div>

              <p className="font-serif italic text-lg text-ink/60 leading-relaxed mb-0">
                Point your camera at the screen to open the PUF Mini-App directly on your device.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
