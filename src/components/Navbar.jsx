import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import LiveInfo from "./LiveInfo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-background/35 backdrop-blur-md border-b border-border">
      <nav className="container-g flex justify-between items-center py-4">
        {/* Logo */}
        <a
          href="#hero"
          className="font-heading text-2xl gradient-text tracking-widest"
        >
          BE
        </a>

        {/* /* Desktop Nav */}
          <ul className="hidden md:flex gap-8 font-body text-sm text-text/90 items-center">
            <li><a href="#about" className="hover:text-glow transition">About</a></li>
            <li><a href="#work" className="hover:text-glow transition">Experience</a></li>
            <li><a href="#projects" className="hover:text-glow transition">Projects</a></li>
            <li><a href="#contact" className="hover:text-glow transition">Contact</a></li>
            <li>
              <a
                href="/Bilal-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-glow text-glow px-3 py-1 rounded hover:bg-glow hover:text-background transition"
              >
                Resume
              </a>
            </li>
            <li>
              <LiveInfo />
            </li>
          </ul>

          {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-glow focus:outline-none"
        >
          {isOpen ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </nav>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border text-text/90 font-body text-lg">
          <ul className="flex flex-col gap-6 p-6">
            {["about", "work", "projects", "contact"].map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setIsOpen(false)}
                  className="hover:text-glow transition"
                >
                  {id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
            <li>
              <a
                href="/Bilal-Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-glow text-glow px-3 py-1 rounded hover:bg-glow hover:text-background transition inline-block text-center"
              >
                Resume
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
