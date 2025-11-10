import { motion } from "framer-motion";
import { fadeInUp, staggerChildren } from "../lib/motion";
import useParallax from "../lib/useParallax";

import SectionPill from "./SectionPill";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiPython,
  SiFigma,
  SiNodedotjs,
  SiMongodb,
  SiCanva,
  SiMysql,
  SiExpress,
  SiPhp,
  SiVercel,
  SiRender,
} from "react-icons/si";

const techIcons = [
  { icon: <SiHtml5 />, label: "HTML" },
  { icon: <SiCss3 />, label: "CSS" },
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiReact />, label: "React" },
  { icon: <SiTailwindcss />, label: "Tailwind" },
  { icon: <SiGit />, label: "Git" },
  { icon: <SiGithub />, label: "GitHub" },
  { icon: <SiPython />, label: "Python" },
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiFigma />, label: "Figma" },
];

export default function About() {
  const { ref, style } = useParallax(0.15);

  const techGroups = [
    {
      category: "Languages",
      techs: [
        { icon: <SiJavascript />, label: "JavaScript" },
        { icon: <SiPython />, label: "Python" },
        { icon: <SiPhp />, label: "PHP" },
        { icon: <SiHtml5 />, label: "HTML" },
        { icon: <SiCss3 />, label: "CSS" },

      ]
    },
    {
      category: "Libraries & Frameworks",
      techs: [
        { icon: <SiReact />, label: "React" },
        { icon: <SiNodedotjs />, label: "Node.js" },
        { icon: <SiTailwindcss />, label: "Tailwind" },
      ]
    },
    {
      category: "Tools & Database",
      techs: [
        { icon: <SiGit />, label: "Git" },
        { icon: <SiGithub />, label: "GitHub" },
        { icon: <SiVercel />, label: "Vercel" },
        { icon: <SiRender />, label: "Render" },
        { icon: <SiMongodb />, label: "MongoDB" },
        { icon: <SiMysql />, label: "MySQL" },
        { icon: <SiExpress />, label: "Express" },
      ]
    },
    {
      category: "Design",
      techs: [
        { icon: <SiFigma />, label: "Figma" },
        { icon: <SiCanva />, label: "Canva" },
      ]
    }
  ];

  return (
    <>
      <section ref={ref} className="section relative overflow-hidden">
        <SectionPill id="about" title="About Me" />
        {/* Parallax glow background */}
        <motion.div
          style={style}
          className="absolute inset-0 bg-gradient-to-tr from-glow/10 via-transparent to-violet/10 blur-[100px] opacity-60 pointer-events-none"
        />

        <div className="container-g relative z-10 flex flex-col md:flex-row gap-10 items-start">
          {/* About text panel - Fades in from left like opening a book */}
          <motion.div
            className="panel p-8 rounded-2xl md:w-1/2"
            initial={{ 
              opacity: 0, 
              x: -100,
              rotateY: -45,
            }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              x: -50,
              transition: { duration: 0.5 }
            }}
            viewport={{ 
              once: false,
              amount: 0.3,
            }}
            transition={{ 
              duration: 0.8,
              delay: 0.2,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{ 
              transformStyle: "preserve-3d",
              transformOrigin: "left center"
            }}
          >
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              viewport={{ once: false }}
              className="text-lg mb-4"
            >
              I'm a Front-End Developer passionate about crafting clean, user-first
              experiences that perform beautifully.
            </motion.p>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: false }}
              className="text-lg mb-4"
            >
              I enjoy turning ideas into performant digital products using{" "}
              <span className="text-glow">React</span> and{" "}
              <span className="text-violet">Tailwind CSS</span>. My goal is to
              create interfaces that feel as smooth as they look.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              viewport={{ once: false }}
              className="text-lg"
            >
              Also I'm on a journey to mastering new technologies and pushing the
              boundaries of web development. Im currently diving deeper into{" "}
              <span className="text-glow">TypeScript</span> to enhance my skill set.
            </motion.p>
          </motion.div>

          {/* Tech stack panel - Fades in from right like opening a book */}
          <motion.div
            className="panel p-6 rounded-2xl md:w-1/2"
            initial={{ 
              opacity: 0, 
              x: 100,
              rotateY: 45,
            }}
            whileInView={{ 
              opacity: 1, 
              x: 0,
              rotateY: 0,
            }}
            exit={{
              opacity: 0,
              x: 50,
              transition: { duration: 0.5 }
            }}
            viewport={{ 
              once: false,
              amount: 0.3,
            }}
            transition={{ 
              duration: 0.8,
              delay: 0.4,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            style={{ 
              transformStyle: "preserve-3d",
              transformOrigin: "right center"
            }}
          >
            <h3 className="text-xl font-heading mb-6 text-glow">Tech Stack</h3>
            <div className="space-y-6">
              {techGroups.map((group, groupIndex) => (
                <div key={groupIndex} className="space-y-3">
                  <h4 className="text-sm font-semibold text-violet uppercase tracking-wider">
                    {group.category}
                  </h4>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3" style={{ perspective: "1000px" }}>
                    {group.techs.map((tech, techIndex) => (
                      <motion.div
                        key={techIndex}
                        whileHover={{ 
                          scale: 1.15,
                          rotateY: 15,
                          rotateX: -10,
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ 
                          type: "spring", 
                          stiffness: 400,
                          damping: 15
                        }}
                        className="flex flex-col items-center justify-center p-3 bg-surface rounded-lg text-glow text-2xl cursor-pointer relative z-10"
                        style={{ 
                          transformStyle: "preserve-3d",
                        }}
                      >
                        {tech.icon}
                        <span className="text-xs mt-2 text-text/70">{tech.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
