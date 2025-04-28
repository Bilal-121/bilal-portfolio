import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiTailwindcss,
  SiGit,
  SiGithub,
  SiNodedotjs,
  SiMysql,
  SiPython,
  SiDjango,
  SiFlask,
  SiPhp,
  SiOpencv,
  SiTensorflow,
  SiMongodb,
  SiExpress,
  SiVite,
  SiFigma,
} from "react-icons/si";


const techIcons = [
  { icon: <SiHtml5 />, label: "HTML" },
  { icon: <SiCss3 />, label: "CSS" },
  { icon: <SiJavascript />, label: "JavaScript" },
  { icon: <SiReact />, label: "React" },
  { icon: <SiTailwindcss />, label: "Tailwind CSS" },
  { icon: <SiGit />, label: "Git" },
  { icon: <SiGithub />, label: "GitHub" },
  { icon: <SiNodedotjs />, label: "Node.js" },
  { icon: <SiExpress />, label: "Express.js" },
  { icon: <SiMongodb />, label: "MongoDB" },
  { icon: <SiMysql />, label: "MySQL" },
  { icon: <SiPython />, label: "Python" },
  { icon: <SiDjango />, label: "Django" },
  { icon: <SiFlask />, label: "Flask" },
  { icon: <SiPhp />, label: "PHP" },
  { icon: <SiOpencv />, label: "OpenCV" },
  { icon: <SiTensorflow />, label: "TensorFlow.js" },
  { icon: <SiVite />, label: "Vite" },
  { icon: <SiFigma />, label: "Figma" },
];


export default function About() {
  return (
    <section id="about" className="relative w-full bg-[#0b1c2c] text-text overflow-hidden">
      {/* Decorative background blob */}
      <div className="absolute -top-24 -left-32 w-[500px] h-[500px] bg-[#64ffda] opacity-[0.05] rounded-full blur-3xl pointer-events-none z-0" />

      {/* Main content */}
      <div className="relative z-10 px-4 sm:px-6 py-32 sm:py-36 max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        {/* Text column */}
        <div className="md:w-1/2">
          <h2 className="text-3xl font-heading font-bold text-accent mb-6">
            About Me
          </h2>

          <p className="font-body text-base sm:text-lg leading-relaxed mb-4">
            Hi, I'm <span className="text-accent font-semibold">Bilal</span>, a web developer passionate about creating clean, user-first websites that not only look good but perform flawlessly. I thrive on transforming ideas into functional solutions and constantly expanding my skills with the latest technologies.
          </p>

          <p className="font-body text-base sm:text-lg leading-relaxed mb-6">
          Starting with a strong foundation in HTML, CSS, and JavaScript, I've advanced into building modern full-stack applications using frameworks like React and Tailwind CSS — and I'm just getting started.
          </p>
        </div>

        {/* Tech stack icons */}
        <div className="md:w-1/2 bg-[#112240] p-6 rounded-lg shadow-md w-full">
          <h3 className="text-xl font-heading mb-4 text-accent">Tech Stack</h3>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 text-accent text-2xl">
            {techIcons.map((tech, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-3 bg-[#0a192f] rounded-lg hover:scale-105 transition-transform"
              >
                {tech.icon}
                <span className="text-xs mt-2 text-[#ccd6f6]">{tech.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
