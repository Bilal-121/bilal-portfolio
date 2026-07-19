import { motion } from "framer-motion";
import { siteConfig } from "../lib/siteConfig";
import { getPathForSection, navigateToSection } from "../lib/navigation";
import { useClipReveal } from "../lib/motion";

export default function Footer() {
  const reveal = useClipReveal();

  const handleNav = (e, sectionId) => {
    e.preventDefault();
    navigateToSection(sectionId);
  };

  return (
    <footer className="relative section pt-0 pb-0 border-t border-border">
      <motion.div
        ref={reveal.ref}
        style={reveal.style}
        className="container-g py-16 flex flex-col gap-3"
      >
        <h2 className="font-heading text-h1 text-text-primary">
          Designed &amp; developed by Bilal Essakini.
        </h2>

        <p className="text-body text-text-secondary">
          Code with purpose. Design with impact.
        </p>

        <div className="grid grid-cols-12 gap-8 w-full mt-12 text-left">
          <div className="col-span-6 tablet:col-span-4">
            <h3 className="label mb-4">Explore</h3>
            <ul className="space-y-3">
              <li>
                <a href="/" onClick={(e) => handleNav(e, "hero")} className="footer-link">
                  Home
                </a>
              </li>
              <li>
                <a
                  href={getPathForSection("about")}
                  onClick={(e) => handleNav(e, "about")}
                  className="footer-link"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href={getPathForSection("projects")}
                  onClick={(e) => handleNav(e, "projects")}
                  className="footer-link"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href={getPathForSection("work")}
                  onClick={(e) => handleNav(e, "work")}
                  className="footer-link"
                >
                  Work History
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-6 tablet:col-span-4">
            <h3 className="label mb-4">Connect</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={siteConfig.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-12 tablet:col-span-4">
            <h3 className="label mb-4">Contact</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href={getPathForSection("contact")}
                  onClick={(e) => handleNav(e, "contact")}
                  className="footer-link"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.resumePath}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer-link"
                >
                  Resume
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="hairline mt-12 mb-6" />

        <div className="flex flex-col tablet:flex-row items-center justify-between gap-2 text-center">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} Bilal Essakini. All rights reserved.
          </p>
          <p className="text-xs text-text-muted">
            Last Updated: {typeof __BUILD_DATE__ !== "undefined" ? __BUILD_DATE__ : "2026"}
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
