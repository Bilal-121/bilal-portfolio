import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, staggerChildren } from "../lib/motion";
import SectionPill from "./SectionPill";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import projects from "../data/projects";
import { trackEvent } from "../lib/analytics";

function LazyVideo({ src, title }) {
  const [loaded, setLoaded] = useState(false);

  if (!src) {
    return (
      <div className="w-full h-40 bg-surface rounded-lg mb-4 flex items-center justify-center text-text/40">
        No preview available
      </div>
    );
  }

  return (
    <video
      src={loaded ? src : undefined}
      className="w-full h-40 object-cover rounded-lg mb-4 bg-surface"
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      aria-label={`${title} demo video`}
      ref={(el) => {
        if (el && !loaded) {
          setLoaded(true);
        }
      }}
    />
  );
}

export default function Projects() {
  const [flippedIndex, setFlippedIndex] = useState(null);

  const handleCardClick = (index) => {
    setFlippedIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="section relative">
      <SectionPill id="projects" title="Projects" />

      <div className="container-g">
        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerChildren}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeInUp}
              className="h-[400px] group"
              style={{ perspective: "1000px" }}
              onClick={() => handleCardClick(i)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 ease-out pointer-events-auto ${
                  flippedIndex === i ? "[transform:rotateY(180deg)]" : ""
                } md:group-hover:[transform:rotateY(180deg)]`}
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT SIDE */}
                <div
                  className="absolute inset-0 panel p-6 rounded-2xl overflow-hidden"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 border border-transparent rounded-2xl pointer-events-none"
                    animate={{
                      borderColor: [
                        "rgba(92,225,230,0.2)",
                        "rgba(168,85,247,0.25)",
                        "rgba(92,225,230,0.2)",
                      ],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <div className="flex flex-col h-full relative z-10">
                    <h3 className="font-heading text-xl text-white mb-2">
                      {p.title}
                    </h3>
                    <p className="font-body text-text/80 mb-4 line-clamp-3">
                      {p.description}
                    </p>
                    <p className="font-body text-sm text-glow/80 mb-4 line-clamp-2">
                      {p.tech}
                    </p>

                    <div className="mt-auto">
                      <p className="text-xs text-center text-text/60 italic md:hidden">
                        Tap to flip and see more
                      </p>
                      <p className="text-xs text-center text-text/60 italic hidden md:block">
                        Hover to flip and see more →
                      </p>
                    </div>
                  </div>

                  <div className="absolute inset-0 bg-gradient-to-tr from-violet/10 via-transparent to-glow/10 opacity-50 rounded-2xl pointer-events-none" />
                </div>

                {/* BACK SIDE */}
                <div
                  className="absolute inset-0 panel p-6 rounded-2xl overflow-hidden flex flex-col pointer-events-auto z-20"
                  style={{
                    backfaceVisibility: "hidden",
                    WebkitBackfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <LazyVideo src={p.video} title={p.title} />

                  <h3 className="font-heading text-lg text-white mb-2">
                    {p.title}
                  </h3>

                  <p className="font-body text-xs text-text/60 mb-4 flex-grow overflow-auto">
                    {p.description}
                  </p>

                  <div
                    className="flex gap-3 mt-auto relative z-30"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {p.github && (
                      <button
                        onClick={() => {
                          trackEvent("project_click", {
                            project: p.title,
                            link_type: "github",
                          });
                          window.open(
                            p.github,
                            "_blank",
                            "noopener,noreferrer"
                          );
                        }}
                        className="btn-project btn-project-glow"
                      >
                        <FiGithub size={18} /> Code
                      </button>
                    )}
                    {p.url && (
                      <button
                        onClick={() => {
                          trackEvent("project_click", {
                            project: p.title,
                            link_type: "live",
                          });
                          window.open(p.url, "_blank", "noopener,noreferrer");
                        }}
                        className="btn-project btn-project-violet"
                      >
                        <FiExternalLink size={18} /> Live
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-center text-text/60 italic mt-3 md:hidden">
                    Tap to flip back
                  </p>
                  <p className="text-xs text-center text-text/60 italic mt-3 hidden md:block">
                    ← Hover away to flip back
                  </p>

                  <div className="absolute inset-0 bg-gradient-to-br from-glow/10 via-transparent to-violet/10 opacity-50 rounded-2xl pointer-events-none -z-10" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
