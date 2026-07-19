import officeBookingImage from "../assets/images/office-booking.webp";
import portfolioWebsiteImage from "../assets/images/portfolio-website.webp";
import cinemaBookingImage from "../assets/images/cinema-booking.webp";
import comingSoonImage from "../assets/coming-soon.svg";

const projects = [
  {
    title: "Office Desk Booking System",
    description:
      "A full-stack web app for university employees to reserve office desks, featuring user auth, admin controls, and real-time availability.",
    tech: [
      "TypeScript",
      "Next.js",
      "React",
      "Prisma",
      "PostgreSQL",
      "Supabase",
      "NextAuth.js",
      "Tailwind CSS",
      "REST API",
      "Vercel",
    ],
    github: "https://github.com/Bilal-121/Office-Desk-Booking-System",
    url: "https://office-desk-booking-system-xlgy-gilt.vercel.app",
    previewImage: officeBookingImage,
    featured: true,
  },
  {
    title: "Portfolio Website",
    description:
      "A sleek, futuristic personal portfolio designed with React, Vite, and Tailwind CSS. Features smooth animations and Lenis scroll integration.",
    tech: ["Node.js", "React", "Tailwind", "REST API", "Vite", "Framer Motion"],
    github: "https://github.com/Bilal-121/bilal-portfolio",
    url: "https://bilalessakini.com/",
    previewImage: portfolioWebsiteImage,
  },
  {
    title: "Cinema Booking Website",
    description:
      "A cinema ticket booking platform with seat selection, authentication, and payment integration.",
    tech: ["PHP", "MySQL", "JS", "HTML", "CSS", "Bootstrap", "XAMPP"],
    github: null,
    url: null,
    previewImage: cinemaBookingImage,
  },
  {
    title: "Expense Tracker Web App",
    description:
      "A lightweight FastAPI + React app for expense tracking, OCR receipt scanning, and dynamic budget visualization.",
    tech: ["Python", "FastAPI", "React", "Tailwind"],
    github: null,
    url: null,
    previewImage: comingSoonImage,
  },
  {
    title: "Calories Tracking App",
    description:
      "An AI-powered mobile app that estimates calorie intake from food photos using TensorFlow.js models.",
    tech: ["React Native", "TensorFlow.js", "Tailwind"],
    github: null,
    url: null,
    previewImage: comingSoonImage,
  },
  {
    title: "Face Recognition Attendance System",
    description:
      "A Python-based project using OpenCV and Pandas for real-time attendance marking through facial recognition.",
    tech: ["Python", "Pandas", "OpenCV"],
    github: null,
    url: null,
    previewImage: comingSoonImage,
  },
];

export default projects;
