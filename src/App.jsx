import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkHistory from "./components/WorkHistory";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ScrollToTopButton from "./components/ScrollToTopButton";

export default function App() {
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

  return (
    <>
      {/* accessibility skip link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only absolute top-2 left-2 z-[9999] bg-glow text-background px-4 py-2 rounded-md"
      >
        Skip to content
      </a>

      <Navbar />

      {/* background glows */}
      

      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <WorkHistory />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
