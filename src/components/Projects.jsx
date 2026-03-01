import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerChildren } from "../lib/motion";
import SectionPill from "./SectionPill";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import portfolioProjectVideo from "../assets/portfolio-website-video.mp4";
import cinemaBookingVideo from "../assets/Cinema-Booking-System-video.mp4";

const projects = [

  {
    title: "Portfolio Website",
    description:
      "A sleek, futuristic personal portfolio designed with React, Vite, and Tailwind CSS. Features smooth animations and Lenis scroll integration.",
    tech: "Node.js • React • Tailwind • REST API• Vite • Framer Motion",
    github: "https://github.com/Bilal-121/bilal-portfolio",
    url: "https://bilal-portfolio-orpin.vercel.app/",
    live: portfolioProjectVideo,
  },
  {
    title: "Office Desk Booking System",
    description:
      "A Full-Stack web app for University employees to reserve office desks, featuring user auth, admin controls, and real-time availability.",
    tech: "TypeScript • React • Node.js • Express • Neo4j • Tailwind CSS • REST API • Render • Vercel",
    github: "#",
    url: "#",
    live: "#",
  },
  {
    title: "Expense Tracker Web App",
    description:
      "A lightweight FastAPI + React app for expense tracking, OCR receipt scanning, and dynamic budget visualization.",
    tech: "Python • FastAPI • React • Tailwind",
    github: "https://github.com/Bilal-121/Expense-Tracker-Web-App-Project",
    live: "#",
  },
  {
    title: "Calories Tracking App",
    description:
      "An AI-powered mobile app that estimates calorie intake from food photos using TensorFlow.js models.",
    tech: "React Native • TensorFlow.js • Tailwind",
    github: "https://github.com/Bilal-121/Calories-Tracking-App-Project",
    live: "#",
  },
  {
    title: "Cinema Booking Website",
    description:
      "A cinema ticket booking platform with seat selection, authentication, and payment integration.",
    tech: "PHP • MySQL • JS • HTML • CSS Bootstrap • XAMPP",
    github: "https://github.com/Bilal-121/Cinema-Booking-Website-Project",
    live: cinemaBookingVideo,
  },
  {
    title: "Face Recognition Attendance System",
    description:
      "A Python-based project using OpenCV and Pandas for real-time attendance marking through facial recognition.",
    tech: "Python • Pandas • OpenCV",
    github: "#",
    live: "#",
  },
];

export default function Projects() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      

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
                key={i}
                variants={fadeInUp}
                className="h-[400px] group"
                style={{ perspective: "1000px" }}
              >
                <div
                  className="relative w-full h-full transition-transform duration-1000 ease-out group-hover:[transform:rotateY(180deg)] pointer-events-auto"
                  style={{ 
                    transformStyle: "preserve-3d",
                  }}
                >
                  {/* FRONT SIDE */}
                  <div 
                    className="absolute inset-0 panel p-6 rounded-2xl overflow-hidden"
                    style={{ 
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden"
                    }}
                  >
                    {/* Glow border animation */}
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
                        <p className="text-xs text-center text-text/60 italic">
                          Hover to flip and see more →
                        </p>
                      </div>
                    </div>

                    {/* Floating background glow */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-violet/10 via-transparent to-glow/10 opacity-50 rounded-2xl pointer-events-none" />
                  </div>

                  {/* BACK SIDE */}
                  <div 
                    className="absolute inset-0 panel p-6 rounded-2xl overflow-hidden flex flex-col pointer-events-auto z-20"
                    style={{ 
                      backfaceVisibility: "hidden",
                      WebkitBackfaceVisibility: "hidden",
                      transform: "rotateY(180deg)"
                    }}
                  >
                    {/* Video/Image Preview */}
                    {p.live && typeof p.live === 'string' && p.live.endsWith('.mp4') ? (
                      <video
                        src={p.live}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : p.live && p.live !== '#' ? (
                      <img 
                        src={p.live} 
                        alt={p.title}
                        className="w-full h-40 object-cover rounded-lg mb-4"
                      />
                    ) : (
                      <div className="w-full h-40 bg-surface rounded-lg mb-4 flex items-center justify-center text-text/40">
                        No preview available
                      </div>
                    )}

                    <h3 className="font-heading text-lg text-white mb-2">
                      {p.title}
                    </h3>
                    
                    <p className="font-body text-xs text-text/70 mb-4 flex-grow overflow-auto">
                      {p.description}
                    </p>

                    {/* Buttons */}
                    <div className="flex gap-3 mt-auto relative z-30">
                      {p.github && p.github !== '#' && (
                        <button
                          onClick={() => {
                            if (p.github && p.github !== '#') {
                              window.open(p.github, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-glow/20 hover:bg-glow/40 hover:text-white hover:shadow-lg hover:shadow-glow/50 text-glow py-2 px-4 rounded-lg transition-all duration-300 text-sm border border-glow/40 hover:border-glow/80 cursor-pointer font-semibold pointer-events-auto relative z-40"
                        >
                          <FiGithub size={18} /> Code
                        </button>
                      )}
                      {p.url && p.url !== '#' && (
                        <button
                          onClick={() => {
                            if (p.url && p.url !== '#') {
                              window.open(p.url, '_blank', 'noopener,noreferrer');
                            }
                          }}
                          className="flex-1 flex items-center justify-center gap-2 bg-violet/20 hover:bg-violet/40 hover:text-white hover:shadow-lg hover:shadow-violet/50 text-violet py-2 px-4 rounded-lg transition-all duration-300 text-sm border border-violet/40 hover:border-violet/80 cursor-pointer font-semibold pointer-events-auto relative z-40"
                        >
                          <FiExternalLink size={18} /> Live
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-center text-text/60 italic mt-3">
                      ← Hover away to flip back
                    </p>

                    {/* Background glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-glow/10 via-transparent to-violet/10 opacity-50 rounded-2xl pointer-events-none -z-10" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* 🪟 Modal view for project details */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/90 backdrop-blur-md z-[9999] flex items-center justify-center p-6"
              onClick={() => setSelected(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="panel p-8 max-w-lg rounded-2xl text-center relative"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-heading text-white mb-4 gradient-text">
                  {selected.title}
                </h3>
                <p className="text-text/85 mb-4">{selected.description}</p>
                <p className="text-glow mb-6">{selected.tech}</p>
                {selected.live && (
                    <video
                      src={selected.live} alt="project video"
                      controls
                      autoPlay
                      muted
                      className="mb-6 rounded-lg mx-auto max-h-60 object-cover"
                    ></video>
                  )}

                <div className="flex justify-center gap-6">
                  {selected.github && (
                    <a
                      href={selected.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-neon"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
}
