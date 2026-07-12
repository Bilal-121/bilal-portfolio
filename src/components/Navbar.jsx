import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import LiveInfo from "./LiveInfo";
import { siteConfig } from "../lib/siteConfig";
import { trackEvent } from "../lib/analytics";

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "work", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/35 backdrop-blur-md border-b border-border">
      <nav className="container-g flex justify-between items-center py-5 md:py-6">
        <a
          href="#hero"
          className="font-heading text-2xl gradient-text tracking-widest"
        >
          BE
        </a>

        <ul className="hidden md:flex gap-8 font-body text-base text-text/80 items-center">
          {NAV_SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`transition ${
                  activeSection === id
                    ? "text-glow"
                    : "hover:text-glow"
                }`}
              >
                {label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("resume_download", { method: "navbar" })}
              className="border border-glow text-glow px-3 py-1 rounded hover:bg-glow hover:text-background transition"
            >
              Resume
            </a>
          </li>
          <li>
            <LiveInfo />
          </li>
        </ul>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-glow focus:outline-none"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-background border-t border-border text-text/80 font-body text-lg overflow-hidden"
          >
            <ul className="flex flex-col gap-6 p-6 items-center text-center">
              {NAV_SECTIONS.map(({ id, label }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setIsOpen(false)}
                    className={`transition ${
                      activeSection === id ? "text-glow" : "hover:text-glow"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={siteConfig.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackEvent("resume_download", { method: "mobile_nav" });
                    setIsOpen(false);
                  }}
                  className="border border-glow text-glow px-3 py-1 rounded hover:bg-glow hover:text-background transition inline-block text-center"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
