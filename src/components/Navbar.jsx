import resumePDF from "../assets/CV.pdf";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-[#0a192f] shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        {/* Logo / Initial */}
        <div className="text-accent font-heading text-2xl font-bold tracking-widest">
          B
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-6 font-body text-sm text-[#ccd6f6]">
          <a href="#about" className="hover:text-accent transition-all duration-200">
            About
          </a>
          <a href="#work" className="hover:text-accent transition-all duration-200">
            Experiance
          </a>
          <a href="#projects" className="hover:text-accent transition-all duration-200">
            Projects
          </a>
          <a href="#contact" className="hover:text-accent transition-all duration-200">
            Contact
          </a>
          <a
            href={resumePDF}
            download target="_blank"
            rel="noopener noreferrer"
            className="border border-accent text-accent px-3 py-1 rounded hover:bg-accent hover:text-background transition"
          >
            Download Resume
          </a>

        </nav>
      </div>
    </header>
  );
}
