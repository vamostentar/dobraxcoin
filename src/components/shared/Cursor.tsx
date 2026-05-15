import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export const Cursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPointerFine, setIsPointerFine] = useState(false);
  
  const mouseX = useSpring(0, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 28 });

  useEffect(() => {
    // Only show custom cursor on devices with precise pointer (mouse)
    const mq = window.matchMedia('(pointer: fine)');
    setIsPointerFine(mq.matches);
    
    const handleChange = (e: MediaQueryListEvent) => setIsPointerFine(e.matches);
    mq.addEventListener('change', handleChange);
    return () => mq.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isPointerFine) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.tagName === 'INPUT' ||
        target.closest('.interactive-hover')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseEnter);
    };
  }, [mouseX, mouseY, isPointerFine]);

  // Don't render on touch devices
  if (!isPointerFine) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-3 h-3 bg-amber rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isHovered ? 44 : 10,
        height: isHovered ? 44 : 10,
        backgroundColor: isHovered ? '#F5C04A' : '#E09B1A',
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 20, mass: 0.5 }}
    />
  );
};
