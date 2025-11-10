import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="relative section text-center text-sm text-text/70 pt-0 pb-0">
      {/* <div className="container-g relative z-10"> */}
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

          <div className="grid grid-cols-2 gap-8 w-full mt-8 md:grid-cols-4 text-left relative z-30">
            
            <div>
              <h3 className="mb-4 text-sm font-semibold text-text/80 uppercase tracking-wide">Explore</h3>
              <ul className="text-text/60 space-y-3">
                <li>
                  <a href="#hero" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10">
                    About
                  </a>
                </li>
                <li>
                  <a href="#projects" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10">
                    Projects
                  </a>
                </li>
                <li>
                  <a href="#work" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10">
                    Experience
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-text uppercase tracking-wide">Connect</h3>
              <ul className="text-text/70 space-y-3">
                <li>
                  <a
                    href="https://github.com/Bilal-121"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/bilal-essakini"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/bilal_essakini/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-text uppercase tracking-wide">Contact</h3>
              <ul className="text-text/70 space-y-3">
                <li>
                  <a
                    href="mailto:essakinibilal1@outlook.com"
                    className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10"
                  >
                    Email Me
                  </a>
                </li>
                <li>
                  <a href="#contact" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10">
                    Contact Form
                  </a>
                </li>
                <li>
                  <a
                    href="https://calendly.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10"
                  >
                    Schedule Call
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10">
                    Collaborate
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold text-text uppercase tracking-wide">Resources</h3>
              <ul className="text-text/70 space-y-3">
                <li>
                  <a href="#" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10">
                    Resume
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10">
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#" className="relative inline-block hover:text-glow transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[1px] after:w-0 after:bg-glow after:transition-all after:duration-300 hover:after:w-full cursor-pointer z-10">
                    Testimonials
                  </a>
                </li>
              </ul>
            </div>
          
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mt-8 text-center">
            <p className="text-xs text-text/50">
              © {new Date().getFullYear()} Bilal Essakini. All rights reserved.
            </p>
            <p className="text-xs text-end text-text/50">
              Last Updated: 2025-01-15
            </p>
          </div>

        </motion.div>
      {/* </div> */}
    </footer>
  );
}
