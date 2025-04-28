import { motion } from "framer-motion";
import { FaBriefcase, FaLaptopHouse } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi";
import { MdVolunteerActivism } from "react-icons/md";
import backgroundImage from "../assets/work-exp-bg-image.webp"; // adjust your path

const workHistory = [
  {
    title: "Web Developer",
    company: "Unoversity of Herfordshire",
    period: "March 2025 - Presently",
    description: "Spearheading the development and optimization of large-scale web applications using CMS, APIs, and React, enhancing user accessibility and performance. Collaborating with cross-functional teams to deliver SEO-optimized, mobile-first experiences that support 24/7 university operations. Driving initiatives to improve site speed, user journeys, and accessibility standards across platforms.",
    icon: <FaBriefcase />,
  },
  {
    title: "Graduate Marketing Executive (Web Developer)",
    company: "Unoversity of Herfordshire",
    period: "March 2024 - February 2025",
    description: "Worked on various projects, focusing on web development using tech stack HTML, JS, CSS, Bootstrap, CMS, and digital marketing strategies. Gained experience in team communication and project management.",
    icon: <FaBriefcase />,
  },
  {
    title: "HBS Computer Science",
    company: "Student",
    period: "Septmber 2020 - Julay 2023",
    description: "Studied computer science, focusing on web development, programming languages, and software engineering principles. Gained hands-on experience through projects and internships.",
    icon: <HiAcademicCap />,
  },
  {
    title: "IT Support | Volunteer",
    company: "Lewsey Community Centre  ",
    period: "January 2018 - March 218",
    description: "Provided technical support and assistance to users, troubleshooting hardware and software issues. Gained experience in customer service and problem-solving.",
    icon: <FaBriefcase />,
  },
  {
    title: "Youth Worker | Volunteer",
    company: "CYCD",
    period: "July 2017 - Augustus 2017",
    description: "Worked with 150+ youth groups, organizing activities and providing support. Developed skills in communication, teamwork, and leadership.",
    icon: <MdVolunteerActivism />,
  },
];

export default function WorkHistory() {
  return (
    <section
      id="work"
      className="relative w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      {/* Light overlay for readability */}
      <div className="absolute inset-0 bg-[#0a192f]/60 backdrop-blur-sm"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-32 sm:py-36">
        <h2 className="text-3xl font-heading font-bold text-accent text-center mb-12">
          Work History
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-accent"></div>

          <div className="flex flex-col gap-20">
            {workHistory.map((job, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className={`relative w-full md:w-[calc(50%-2.5rem)] ${
                  index % 2 === 0 ? "md:ml-auto pr-6" : "md:mr-auto pl-6"
                }`}
              >
                {/* Small center dot */}
                {/* <div className="hidden md:block absolute top-10 left-1/2 transform -translate-x-1/2 bg-accent w-4 h-4 rounded-full z-10"></div> */}

                {/* Big icon floating above */}
                <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-accent w-10 h-10 rounded-full flex items-center justify-center text-background text-lg shadow-lg z-20">
                  {job.icon}
                </div>

                {/* Card */}
                <div className="mt-8 bg-[#112240] p-6 rounded-lg shadow-md hover:shadow-accent/30 transition-all">
                  <h3 className="text-xl font-heading text-white mb-1">
                    {job.title}
                  </h3>
                  <p className="text-sm text-accent mb-2 font-bold">
                    {job.company}
                  </p>
                  <p className="text-sm text-[#8892b0] mb-4">{job.period}</p>
                  <p className="text-sm text-[#ccd6f6]">{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}