import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import LiveInfo from "./LiveInfo";
import { siteConfig } from "../lib/siteConfig";
import { trackEvent } from "../lib/analytics";
import { getPathForSection, navigateToSection } from "../lib/navigation";
import useMagneticHover from "../lib/useMagneticHover";
import { durationMicro, easePrimary } from "../lib/motion";

const NAV_SECTIONS = [
  { id: "about", index: "01", label: "About" },
  { id: "work", index: "02", label: "Work" },
  { id: "projects", index: "03", label: "Projects" },
  { id: "contact", index: "04", label: "Contact" },
];

function MagneticNavLink({ id, index, label, isActive, onClick }) {
  const { ref, style, handlers } = useMagneticHover(0.25);

  return (
    <motion.a
      ref={ref}
      href={getPathForSection(id)}
      onClick={(e) => onClick(e, id)}
      style={style}
      {...handlers}
      className={`flex items-center gap-2 font-body text-sm transition-colors ${
        isActive ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
      }`}
    >
      <span className={`label ${isActive ? "text-accent" : "text-text-muted"}`}>
        {index}
      </span>
      {label}
      <span
        className={`h-1 w-1 rounded-full bg-accent transition-opacity ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />
    </motion.a>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            setActiveSection(id);
            const path = getPathForSection(id);
            if (window.location.pathname !== path) {
              window.history.replaceState({ section: id }, "", path);
            }
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    NAV_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const heroEl = document.getElementById("hero");
    if (heroEl) observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNav = (e, sectionId) => {
    e.preventDefault();
    navigateToSection(sectionId);
    setIsOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors ${
        scrolled ? "bg-bg border-b border-border" : "bg-transparent border-b border-transparent"
      }`}
      style={{ transitionDuration: `${durationMicro}s` }}
    >
      <nav className="container-g flex justify-between items-center py-5 desktop:py-6">
        <a
          href="/"
          onClick={(e) => handleNav(e, "hero")}
          className="font-heading text-xl text-text-primary tracking-widest"
        >
          BE
        </a>

        <ul className="hidden laptop:flex gap-8 items-center">
          {NAV_SECTIONS.map(({ id, index, label }) => (
            <li key={id}>
              <MagneticNavLink
                id={id}
                index={index}
                label={label}
                isActive={activeSection === id}
                onClick={handleNav}
              />
            </li>
          ))}
          <li>
            <a
              href={siteConfig.resumePath}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent("resume_download", { method: "navbar" })}
              className="btn-pill py-2"
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
          className="laptop:hidden text-text-primary rounded-md"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durationMicro, ease: easePrimary }}
          className="laptop:hidden fixed inset-0 top-0 bg-bg flex flex-col"
        >
          <div className="container-g w-full flex justify-between items-center py-5">
            <span className="font-heading text-xl text-text-primary tracking-widest">BE</span>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
              className="text-text-primary"
            >
              <FiX size={28} />
            </button>
          </div>

          <ul className="flex-1 w-full flex flex-col justify-center items-start gap-8 container-g">
            {NAV_SECTIONS.map(({ id, index, label }) => (
              <li key={id}>
                <a
                  href={getPathForSection(id)}
                  onClick={(e) => handleNav(e, id)}
                  className={`flex items-baseline gap-4 text-h1 font-heading ${
                    activeSection === id ? "text-accent" : "text-text-primary"
                  }`}
                >
                  <span className="label">{index}</span>
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
                className="btn-pill mt-4"
              >
                Resume
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
