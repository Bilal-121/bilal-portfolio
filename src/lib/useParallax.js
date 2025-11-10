import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function useParallax(multiplier = 0.1) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${-multiplier * 100}%`]);
  return { ref, style: { y } };
}
