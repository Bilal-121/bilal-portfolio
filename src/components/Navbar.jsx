// import resumePDF from "../assets/Bilal-Essakini-CV.pdf"; Import your resume PDF file here
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import burger (menu) and close icons

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a192f] shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-accent font-heading text-2xl font-bold tracking-widest">
          B
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex gap-8 font-body text-sm text-[#ccd6f6]">
          <a href="#about" className="hover:text-accent transition-all duration-200">About</a>
          <a href="#projects" className="hover:text-accent transition-all duration-200">Projects</a>
          <a href="#contact" className="hover:text-accent transition-all duration-200">Contact</a>
          <a
            href="/Bilal-Resume.pdf" // Or your resume import
            target="_blank"
            rel="noopener noreferrer"
            className="border border-accent text-accent px-3 py-1 rounded hover:bg-accent hover:text-background transition"
          >
            Resume
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-accent focus:outline-none">
            {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-[#0a192f] px-6 py-4 flex flex-col gap-6 text-[#ccd6f6] font-body text-lg shadow-md">
          <a onClick={() => setIsOpen(false)} href="#about" className="hover:text-accent transition-all">About</a>
          <a onClick={() => setIsOpen(false)} href="#projects" className="hover:text-accent transition-all">Projects</a>
          <a onClick={() => setIsOpen(false)} href="#contact" className="hover:text-accent transition-all">Contact</a>
          <button
            onClick={() => window.open('/Bilal-Essakini-CV.pdf', '_blank')}
            className="border border-accent text-accent px-3 py-1 rounded hover:bg-accent hover:text-background transition"
          >
            Resume
          </button>


        </div>
      )}
    </header>
  );
}

