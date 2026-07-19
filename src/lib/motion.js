// Motion tokens and reveal primitives.
// Scroll reveals are clip-path/opacity driven (never y-offset) so elements occupy
// their final layout box before animating — no reserved dead space, no layout shift.
import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";
import useReducedMotion from "./useReducedMotion";

export const easePrimary = [0.16, 1, 0.3, 1];
export const durationMicro = 0.2;
export const durationReveal = 0.7;
export const durationPage = 0.5;

export const staggerChildren = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// One-time reveal for content that should animate in on load, not on scroll
// (e.g. the Hero headline). Use with initial="hidden" animate="show".
export const clipRevealOnLoad = {
  hidden: { clipPath: "inset(0 0 100% 0)", opacity: 0 },
  show: (i = 0) => ({
    clipPath: "inset(0 0 0% 0)",
    opacity: 1,
    transition: { duration: durationReveal, ease: easePrimary, delay: i * 0.08 },
  }),
};

// Scroll-linked clip-path reveal: ties an element's reveal directly to its own
// scroll position entering the viewport, via useScroll + useTransform, per the
// PRD's explicit reveal technique. Returns a ref + motion style to spread onto
// a motion.* element. Respects prefers-reduced-motion (renders fully visible,
// no motion, when set).
export function useClipReveal(offset = ["start 0.9", "start 0.4"]) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({ target: ref, offset });
  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    ["inset(0 0 100% 0)", "inset(0 0 0% 0)"]
  );
  const opacity = useTransform(scrollYProgress, [0, 0.35], [0, 1]);

  if (reducedMotion) {
    return { ref, style: {} };
  }

  return { ref, style: { clipPath, opacity } };
}
