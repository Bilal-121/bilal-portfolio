import { motion } from "framer-motion";
import heroImage from "../assets/Profile-image.jpg"; // Adjust the path as necessary

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-center bg-background text-text px-4 sm:px-6 overflow-hidden">
      {/* Decorative glow */}
      <div className="absolute top-[-100px] right-[-120px] w-[450px] h-[450px] bg-[#64ffda] opacity-[0.05] rounded-full blur-3xl z-0" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-10">
        <div className="sm:w-3/5">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-accent text-base sm:text-lg font-body mb-2"
          >
            Hi, my name is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-[2.5rem] sm:text-[3.5rem] font-heading font-bold text-white mb-4 leading-tight"
          >
            Bilal.
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl sm:text-2xl font-heading text-[#8892b0] mb-8"
          >
            I build seamless, responsive, and impactful digital experiences websites — blending creativity with modern technology.
          </motion.h2>

          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="inline-block border border-accent text-accent px-6 py-3 font-body rounded hover:bg-accent hover:text-background transition-all"
          >
            View Projects
          </motion.a>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="relative sm:w-2/5 hidden sm:block"
        >
          {/* Glow Behind Image */}
          <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-accent opacity-20 blur-3xl rounded-full transform -translate-x-1/2 -translate-y-1/2 z-0"></div>

          {/* Floating Profile Image */}
          <motion.img
            src={heroImage}
            alt="Bilal's portrait or illustration"
            className="relative w-full bg-[#112240] rounded-2xl border-4 border-accent shadow-lg hover:scale-105 hover:shadow-accent/50 transition-all duration-300 ease-in-out z-10"
            animate={{
              y: [0, -10, 0], // move up by 10px then back to 0
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
          />
        </motion.div>

      </div>
    </section>
  );
}
