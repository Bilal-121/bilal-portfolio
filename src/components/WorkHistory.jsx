import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SectionPill from "./SectionPill";
import workHistory from "../data/workHistory";

export default function WorkHistory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <>
      

      <section ref={ref} className="section relative overflow-hidden">

        <SectionPill id="work" title="Work History" />

        <div className="container-g relative flex flex-col items-center">
          {/* Timeline vertical glowing spine */}
          <motion.div
            style={{ height: lineHeight }}
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-glow/50 via-glow/70 to-violet/60 rounded-full shadow-glow"
          />

          <div className="flex flex-col gap-20 relative z-10 w-full md:w-3/4">
            {workHistory.map((job, i) => (
              <motion.div
                key={i}
                initial={{ 
                  opacity: 0,
                  x: i % 2 === 0 ? 100 : -100,
                }}
                whileInView={{ 
                  opacity: 1,
                  x: 0,
                }}
                viewport={{ 
                  once: false,
                  amount: 0.3,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className={`group relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                } md:items-center gap-8`}
              >
                {/* Connector circle */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-glow shadow-glow z-10 group-hover:scale-125 transition-transform duration-300" />

                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.03, rotateY: i % 2 === 0 ? 3 : -3 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="panel hover-glow p-6 md:w-[48%] rounded-2xl"
                >
                  <h3 className="text-xl font-heading text-white mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-glow mb-2 font-semibold">
                    {job.company}
                  </p>
                  <p className="text-sm text-text/70 mb-4">{job.period}</p>
                  <p className="text-sm text-text/90 leading-relaxed">
                    {job.description}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
