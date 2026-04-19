import type { Variants } from "framer-motion";

export const fadeSlideUp: Variants = {
  /** Keep opacity at 1 so content is never stuck invisible if motion fails to run. */
  hidden: { opacity: 1, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: -18,
    transition: { duration: 0.35, ease: [0.4, 0, 1, 1] },
  },
};

export const springPanel: Variants = {
  hidden: { opacity: 0, y: "85%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 210,
      damping: 28,
      mass: 0.85,
    },
  },
};

/** Parent stays visible so SSR/hydration never paints an empty hero (opacity-0 shell). */
export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.38, ease: [0.4, 0, 1, 1] },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 1, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export const listItem: Variants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
};
