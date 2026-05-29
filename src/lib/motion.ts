import type { Transition, Variants } from 'framer-motion';

// Shared easing — a soft "expo out" that feels expensive, never bouncy-cheap.
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const springSoft: Transition = {
  type: 'spring',
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: EASE_OUT } },
};

/** Parent that staggers its children into view. */
export const staggerParent: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05, delayChildren: 0.04 },
  },
};

/** Child card used inside a staggerParent (or whileInView). */
export const cardItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
};
