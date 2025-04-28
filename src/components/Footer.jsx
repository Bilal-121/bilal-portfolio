export default function Footer() {
  return (
    <footer className="w-full bg-[#0a192f] text-[#8892b0] text-center py-6 text-sm font-body">
      <p>
        © {new Date().getFullYear()} Bilal. Built with 💻 React & Tailwind CSS.
      </p>
    </footer>
  );
}
