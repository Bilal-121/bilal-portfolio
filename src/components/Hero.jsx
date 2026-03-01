import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import heroImage from "../assets/Profile-image.jpg";
import rocket from "../assets/rocket.svg";
import { fadeInUp } from "../lib/motion";

export default function Hero() {
  const ref = useRef(null);

  // useScroll ties the section to scroll progress
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]); // subtle upward drift

  return (
    <section
      ref={ref}
      id="hero"
      className="section relative min-h-[90vh] flex items-center overflow-hidden"
    >
      {/* Floating parallax glow layer */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 bg-gradient-to-tr from-violet/10 via-transparent to-glow/10 blur-[120px] opacity-70 pointer-events-none"
      />

      <div className="container-g relative z-10">
        {/* Main Glass Panel */}
        <div className="panel relative overflow-hidden px-6 md:px-12 py-14 md:py-20">
          <div className="panel-gradient" />

          <div className="grid md:grid-cols-2 items-center gap-10 relative z-10">
            {/* Text Section */}
            <div>
              <motion.p
                variants={fadeInUp}
                initial="hidden"
                animate="show"
                className="text-glow text-lg mb-2"
              >
                Hi, my name is
              </motion.p>

              <motion.h1
                variants={fadeInUp}
                initial="hidden"
                animate="show"
                className="font-heading text-[56px] md:text-[72px] gradient-text mb-4 leading-tight"
              >
                Bilal.
              </motion.h1>

              <div className="soft-divider mb-6" />

              <motion.p
                variants={fadeInUp}
                initial="hidden"
                animate="show"
                className="text-text/85 text-lg md:text-xl max-w-[42ch] mb-8"
              >
                A Front-End Engineer with a passion for crafting beautiful, 
                interactive web experiences.
              </motion.p>

              <motion.a
                href="#about"
                variants={fadeInUp}
                initial="hidden"
                animate="show"
                className="btn-neon relative overflow-hidden"
              >
                Get to Know Me
              </motion.a>
            </div>

            {/* Image Section */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="show"
              className="flex justify-center md:justify-end"
            >
              <img
                src={heroImage}
                alt="Bilal Essakini"
                className="w-[240px] h-[240px] md:w-[280px] md:h-[280px] object-cover rounded-full avatar-rim"
                loading="lazy"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
