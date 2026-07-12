import { motion } from "framer-motion";
import { siteConfig } from "../lib/siteConfig";
import { getPathForSection, navigateToSection } from "../lib/navigation";

export default function Footer() {
  const handleNav = (e, sectionId) => {
    e.preventDefault();
    navigateToSection(sectionId);
  };

  return (
    <footer className="relative section text-center text-sm text-text/60 pt-0 pb-0">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="panel p-6 rounded-none always-glow flex flex-col gap-3 relative z-20"
      >
        <motion.h2
          animate={{
            backgroundPosition: ["0%", "100%", "0%"],
          }}
          transition={{ duration: 6, repeat: Infinity }}
          className="text-center justify-center text-transparent bg-clip-text bg-gradient-to-r from-glow via-violet to-glow bg-[length:200%_auto] font-heading text-lg full-width"
        >
          Designed & Developed by Bilal Essakini one line at a time .
        </motion.h2>

        <p className="text-center text-text/60">
          Code with purpose. Design with impact.
        </p>

        <div className="grid grid-cols-12 gap-8 w-full mt-8 text-left relative z-30">
          <div className="col-span-6 md:col-span-4">
            <h3 className="mb-4 text-sm font-semibold text-text/80 uppercase tracking-wide">Explore</h3>
            <ul className="space-y-3">
              <li><a href="/" onClick={(e) => handleNav(e, "hero")} className="footer-link">Home</a></li>
              <li><a href={getPathForSection("about")} onClick={(e) => handleNav(e, "about")} className="footer-link">About</a></li>
              <li><a href={getPathForSection("projects")} onClick={(e) => handleNav(e, "projects")} className="footer-link">Projects</a></li>
              <li><a href={getPathForSection("work")} onClick={(e) => handleNav(e, "work")} className="footer-link">Experience</a></li>
            </ul>
          </div>

          <div className="col-span-6 md:col-span-4">
            <h3 className="mb-4 text-sm font-semibold text-text/80 uppercase tracking-wide">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a href={siteConfig.socials.github} target="_blank" rel="noopener noreferrer" className="footer-link">
                  GitHub
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noopener noreferrer" className="footer-link">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href={siteConfig.socials.instagram} target="_blank" rel="noopener noreferrer" className="footer-link">
                  Instagram
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-12 md:col-span-4">
            <h3 className="mb-4 text-sm font-semibold text-text/80 uppercase tracking-wide">Contact</h3>
            <ul className="space-y-3">
              <li><a href={getPathForSection("contact")} onClick={(e) => handleNav(e, "contact")} className="footer-link">Contact Form</a></li>
              <li>
                <a href={siteConfig.resumePath} target="_blank" rel="noopener noreferrer" className="footer-link">
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-8 text-center">
          <p className="text-xs text-text/50">
            &copy; {new Date().getFullYear()} Bilal Essakini. All rights reserved.
          </p>
          <p className="text-xs text-text/50">
            Last Updated: {typeof __BUILD_DATE__ !== "undefined" ? __BUILD_DATE__ : "2025"}
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
