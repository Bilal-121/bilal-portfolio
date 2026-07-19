import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import TechStack from "./components/TechStack";
import WorkHistory from "./components/WorkHistory";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";
import { getSectionForPath, navigateToSection } from "./lib/navigation";

export default function App() {
  useEffect(() => {
    window.history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const sectionId = getSectionForPath(window.location.pathname);
    if (sectionId !== "hero") {
      requestAnimationFrame(() => {
        navigateToSection(sectionId, { instant: true });
      });
    }
  }, []);

  useEffect(() => {
    const handlePopState = (e) => {
      const sectionId = e.state?.section || getSectionForPath(window.location.pathname);
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-[9999] bg-accent text-bg px-4 py-2 rounded-md"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <TechStack />
        <WorkHistory />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
