import { motion } from "framer-motion";
import heroImage from "../assets/Profile-image.jpg";

import { clipRevealOnLoad } from "../lib/motion";
import { navigateToSection } from "../lib/navigation";
import { siteConfig } from "../lib/siteConfig";
import { trackEvent } from "../lib/analytics";
import useMagneticHover from "../lib/useMagneticHover";

// Candidate headline — drafted for Bilal's review, not final copy.
// Alternates: "Turning complex products into clean, fast front-ends."
//             "Front-end developer crafting interfaces people trust."
const HEADLINE = "I build interfaces that feel as good as they look.";

function MagneticCTA({ as: Tag = "a", className, children, ...props }) {
  const { ref, style, handlers } = useMagneticHover(0.2);
  return (
    <Tag ref={ref} style={style} className={className} {...handlers} {...props}>
      {children}
    </Tag>
  );
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="section relative min-h-[90vh] flex items-center"
    >
      <div className="container-g relative z-10 w-full">
        <div className="grid tablet:grid-cols-12 gap-10 tablet:gap-6 items-start">
          {/* Photo — mobile: above text, full width. Desktop: cols 8-12, bottom-aligned */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="order-1 tablet:order-2 tablet:col-start-8 tablet:col-span-5 tablet:self-end flex justify-center tablet:justify-end"
          >
            <div className="relative w-[220px] h-[220px] tablet:w-[320px] tablet:h-[320px] overflow-hidden rounded-tl-[24px]">
              <img
                src={heroImage}
                alt="Bilal Essakini"
                className="w-full h-full object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-bg/25 mix-blend-multiply pointer-events-none" />
            </div>
          </motion.div>

          {/* Text — cols 1-7, top-aligned */}
          <div className="order-2 tablet:order-1 tablet:col-span-7 flex flex-col">
            <motion.p
              variants={clipRevealOnLoad}
              custom={0}
              initial="hidden"
              animate="show"
              className="label mb-4"
            >
              Bilal Essakini — Front-End Developer
            </motion.p>

            <motion.h1
              variants={clipRevealOnLoad}
              custom={1}
              initial="hidden"
              animate="show"
              className="text-display text-text-primary mb-6"
            >
              {HEADLINE}
            </motion.h1>

            <motion.p
              variants={clipRevealOnLoad}
              custom={2}
              initial="hidden"
              animate="show"
              className="text-body-lg text-text-secondary max-w-[48ch] mb-10"
            >
              A front-end developer with a passion for crafting beautiful,
              interactive web experiences.
            </motion.p>

            <motion.div
              variants={clipRevealOnLoad}
              custom={3}
              initial="hidden"
              animate="show"
              className="flex flex-wrap gap-4"
            >
              <MagneticCTA
                href="/projects"
                onClick={(e) => {
                  e.preventDefault();
                  navigateToSection("projects");
                }}
                className="btn-pill-filled"
              >
                View my work
              </MagneticCTA>

              <MagneticCTA
                href={siteConfig.resumePath}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("resume_download", { method: "hero" })}
                className="btn-pill"
              >
                Hiring? Get my CV
              </MagneticCTA>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
