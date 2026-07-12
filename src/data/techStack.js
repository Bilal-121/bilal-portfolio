import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
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
  SiVite,
  SiFramer,
} from "react-icons/si";

const techGroups = [
  {
    category: "Languages",
    techs: [
      { icon: SiJavascript, label: "JavaScript" },
      { icon: SiTypescript, label: "TypeScript" },
      { icon: SiPython, label: "Python" },
      { icon: SiPhp, label: "PHP" },
      { icon: SiHtml5, label: "HTML" },
      { icon: SiCss3, label: "CSS" },
    ],
  },
  {
    category: "Libraries & Frameworks",
    techs: [
      { icon: SiReact, label: "React" },
      { icon: SiNodedotjs, label: "Node.js" },
      { icon: SiTailwindcss, label: "Tailwind" },
      { icon: SiExpress, label: "Express" },
      { icon: SiFramer, label: "Framer Motion" },
    ],
  },
  {
    category: "Tools & Platforms",
    techs: [
      { icon: SiGit, label: "Git" },
      { icon: SiGithub, label: "GitHub" },
      { icon: SiVite, label: "Vite" },
      { icon: SiVercel, label: "Vercel" },
      { icon: SiRender, label: "Render" },
    ],
  },
  {
    category: "Databases",
    techs: [
      { icon: SiMongodb, label: "MongoDB" },
      { icon: SiMysql, label: "MySQL" },
    ],
  },
  {
    category: "Design",
    techs: [
      { icon: SiFigma, label: "Figma" },
      { icon: SiCanva, label: "Canva" },
    ],
  },
];

export default techGroups;
