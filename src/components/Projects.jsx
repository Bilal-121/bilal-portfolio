import { motion } from "framer-motion";

const projects = [
  {
    title: "Portfolio Website",
    description:"A sleek, fully responsive portfolio designed with React, Vite, and Tailwind CSS. Highlights my professional work, technical skills, and career journey. Optimized for speed, mobile accessibility, and smooth navigation.",
    tech: "React • Tailwind • Vite",
    github: "https://github.com/Bilal-121/Portfolio-Project",
    live: "https://your-portfolio-link.com", //add the github live user link here
  },
  {
    title: "Expense Tracker Web App (WIP)",
    description:"A lightweight, FastAPI-powered web app to track daily expenses. Features OCR-based receipt scanning and intuitive category filtering for easier financial management.",
    tech: "Python • FastAPI • Tailwind • OCR",
    github: "https://github.com/Bilal-121/Expense-Tracker-Web-App-Project",
    live: "#", //add the github live user link here
  },
  {
    title: "Calories Tracking App (WIP)",
    description:"An AI-powered health app to calculate and monitor daily calorie intake using food image recognition and macro tracking. Built with React Native, TensorFlow.js, and Tailwind CSS.",
    tech: "React Native • TensorFlow.js • Tailwind",
    github: "https://github.com/Bilal-121/Calories-Tracking-App-Project",
    live: "#", //add the github live user link here
  },
  {
    title: "Cinema Booking Website (WIP)",
    description:"A full-stack cinema booking platform with user authentication, cinema availability, seat selection, and payment integration.",
    tech: "HTML • CSS • JavaScript • PHP • MySQL • CRUD • Agile",
    github: "https://github.com/Bilal-121/Cinema-Booking-Website-Project",
    live: "#", //add the github live user link here
  },
  {
    title:"Face recognition Attendance System",
    description:"A face recognition attendance system using Python and OpenCV. It captures images, recognizes faces, and marks attendance in a CSV file.",
    tech:"Python • Pandas • OpenCV • CSV",
    github: "https://github.com/Bilal-121/Face-recognition-Attendance-System-Project",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="w-full bg-background text-text">
      <div className="px-4 sm:px-6 py-32 sm:py-36 max-w-7xl mx-auto">
        <h2 className="text-3xl font-heading font-bold text-accent mb-12">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#112240] p-6 rounded-lg shadow-md hover:shadow-accent/30 hover:scale-[1.02] transition-all"
            >
              <h3 className="text-xl font-heading text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm font-body text-[#8892b0] mb-4">
                {project.description}
              </p>
              <p className="text-sm font-body text-accent mb-4">{project.tech}</p>
              <div className="flex flex-wrap gap-4 text-sm">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  GitHub
                </a>
                <a
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  Live Demo
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
