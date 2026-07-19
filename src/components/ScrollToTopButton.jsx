import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import rocket from "../assets/rocket.svg";
import { navigateToSection } from "../lib/navigation";

export default function ScrollToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {showButton && (
        <motion.a
          href="/"
          title="Back to top"
          onClick={(e) => {
            e.preventDefault();
            navigateToSection("hero");
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-6 right-6 z-50 surface p-4 rounded-full hover:border-accent transition-colors group"
        >
          <img
            src={rocket}
            alt="Back to Top"
            className="w-8 h-8 tablet:w-10 tablet:h-10 transition-transform group-hover:-translate-y-1 group-hover:scale-110"
          />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
