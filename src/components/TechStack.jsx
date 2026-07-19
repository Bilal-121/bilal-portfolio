import { motion } from "framer-motion";
import { useClipReveal } from "../lib/motion";
import techGroups from "../data/techStack";

export default function TechStack() {
  const reveal = useClipReveal();

  return (
    <section className="sub-section relative">
      <div className="container-g">
        <motion.div
          ref={reveal.ref}
          style={reveal.style}
          className="grid tablet:grid-cols-2 gap-x-12 gap-y-8"
        >
          {techGroups.map((group) => (
            <div key={group.category} className="flex flex-col gap-2">
              <span className="label">{group.category}</span>
              <p className="text-body text-text-secondary leading-relaxed">
                {group.techs.map((t) => t.label).join(", ")}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
