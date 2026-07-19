import { motion } from "framer-motion";
import { useClipReveal } from "../lib/motion";

export default function About() {
  const bio = useClipReveal();

  return (
    <section id="about" className="section relative">
      <div className="container-g grid tablet:grid-cols-12 gap-10 tablet:gap-6">
        <div className="tablet:col-span-3">
          <h2 className="label tablet:sticky tablet:top-32 inline-block">
            01 / About
          </h2>
        </div>

        <motion.div
          ref={bio.ref}
          style={bio.style}
          className="tablet:col-span-9 max-w-[68ch]"
        >
          <p className="text-body-lg text-text-primary mb-6">
            I'm a front-end developer who loves building clean, user-first
            websites that look great and run fast.
          </p>

          <p className="text-body-lg text-text-secondary">
            I enjoy turning ideas into performant digital products using{" "}
            <span className="text-text-primary">React</span> and{" "}
            <span className="text-text-primary">Tailwind CSS</span>, with a
            focus on detail and smooth experience. I'm always learning and
            improving — currently building with{" "}
            <span className="text-text-primary">TypeScript</span> to deliver
            even more robust and scalable products.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
