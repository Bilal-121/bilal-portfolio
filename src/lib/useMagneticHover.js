import { useRef } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import useReducedMotion from "./useReducedMotion";

// Subtle magnetic pull toward the cursor — reserved for nav links and primary CTAs only.
export default function useMagneticHover(strength = 0.3) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 20, mass: 0.5 });

  if (reducedMotion) {
    return { ref, style: {}, handlers: {} };
  }

  const onMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength);
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { ref, style: { x: springX, y: springY }, handlers: { onMouseMove, onMouseLeave } };
}
