import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';

export default function GlassCard({
  children,
  className = '',
  delay = 0,
  hover = true,
}) {
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(false);
  const mouseX = useMotionValue(50);
  const mouseY = useMotionValue(50);
  const smoothX = useSpring(mouseX, { stiffness: 200, damping: 24, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 200, damping: 24, mass: 0.5 });
  const rotateX = useTransform(smoothY, [0, 100], [5, -5]);
  const rotateY = useTransform(smoothX, [0, 100], [-5, 5]);
  const glowX = useTransform(smoothX, (value) => `${value}%`);
  const glowY = useTransform(smoothY, (value) => `${value}%`);
  const spotlight = useMotionTemplate`radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.15), transparent 30%)`;

  function handlePointerMove(event) {
    if (reduceMotion || !hover) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = ((event.clientX - bounds.left) / bounds.width) * 100;
    const nextY = ((event.clientY - bounds.top) / bounds.height) * 100;

    mouseX.set(nextX);
    mouseY.set(nextY);
  }

  function handlePointerLeave() {
    setActive(false);
    mouseX.set(50);
    mouseY.set(50);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={
        hover && !reduceMotion
          ? {
              y: -4,
              scale: 1.005,
              transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] },
            }
          : undefined
      }
      whileTap={hover && !reduceMotion ? { scale: 0.995 } : undefined}
      onMouseMove={handlePointerMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={handlePointerLeave}
      style={
        hover && !reduceMotion
          ? {
              rotateX,
              rotateY,
              transformStyle: 'preserve-3d',
            }
          : undefined
      }
      className={`glass-panel rounded-[28px] ${className}`}
    >
      {hover && !reduceMotion ? (
        <>
          <motion.div
            className={`pointer-events-none absolute inset-0 transition-opacity duration-200 ${
              active ? 'opacity-100' : 'opacity-0'
            }`}
            style={{ backgroundImage: spotlight }}
          />
          <div className="shine-slide pointer-events-none absolute -left-[42%] top-[-20%] h-[150%] w-[34%] rotate-[16deg] bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-50" />
        </>
      ) : null}
      {children}
    </motion.div>
  );
}
