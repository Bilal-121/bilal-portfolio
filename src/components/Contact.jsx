import { motion } from "framer-motion";

export default function Contact() {
  return (
    <section id="contact" className="relative w-full bg-[#0b1c2c] text-text overflow-hidden">
      {/* Decorative blurred glow blob */}
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#64ffda] opacity-[0.05] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 py-32 sm:py-36 max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-3xl font-heading font-bold text-accent mb-6"
        >
          Get In Touch
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-body text-base sm:text-lg mb-10 text-[#ccd6f6]"
        >
          Let's build something great together. Whether you're looking for a developer, collaborator, or just want to connect — I'm open to new opportunities and would love to hear from you.
        </motion.p>

        <motion.a
          href="mailto:essakinibilal1@outlook.com"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="inline-block border border-accent text-accent px-6 py-3 font-body rounded hover:bg-accent hover:text-background transition-all"
        >
          Say Hello
        </motion.a>

        <motion.div
          className="flex justify-center gap-6 mt-10 text-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <a
            href="https://github.com/Bilal-121"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition"
          >
            <i className="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/bilal-essakini1"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-accent transition"
          >
            <i className="fab fa-linkedin"></i>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
