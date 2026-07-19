import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";
import { useClipReveal } from "../lib/motion";
import projects from "../data/projects";
import { trackEvent } from "../lib/analytics";

function PreviewImage({ project, featured }) {
  if (project.previewImage) {
    return (
      <img
        src={project.previewImage}
        alt={`${project.title} preview`}
        loading="lazy"
        className={`w-full object-cover transition-transform ${
          featured ? "h-64 tablet:h-96" : "h-48"
        } group-hover:scale-[1.03]`}
        style={{ transitionDuration: "200ms" }}
      />
    );
  }

  return (
    <div
      className={`w-full flex items-center justify-center bg-bg-raised border-b border-border ${
        featured ? "h-64 tablet:h-96" : "h-48"
      }`}
    >
      <span className="font-heading text-h2 text-text-muted">{project.title}</span>
    </div>
  );
}

function ProjectCard({ project, index, featured }) {
  const reveal = useClipReveal();
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      ref={reveal.ref}
      style={reveal.style}
      className={`group relative surface overflow-hidden ${
        featured ? "tablet:col-span-2" : ""
      }`}
    >
      <div className="absolute top-4 left-4 z-10 label text-text-primary/80">
        {number}
      </div>

      <div className="absolute top-4 right-4 z-10 flex gap-2">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} source code on GitHub`}
            onClick={() =>
              trackEvent("project_click", { project: project.title, link_type: "github" })
            }
            className="project-link bg-bg/80 backdrop-blur-sm"
          >
            <FiGithub size={16} />
          </a>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${project.title} live demo`}
            onClick={() =>
              trackEvent("project_click", { project: project.title, link_type: "live" })
            }
            className="project-link bg-bg/80 backdrop-blur-sm"
          >
            <FiExternalLink size={16} />
          </a>
        )}
      </div>

      <div className="overflow-hidden">
        <PreviewImage project={project} featured={featured} />
      </div>

      <div className="p-6">
        <h3 className="text-h2 text-text-primary mb-2">{project.title}</h3>
        <p className="text-body text-text-secondary mb-4">{project.description}</p>
        <p className="text-body text-text-muted text-sm">{project.tech.join(" · ")}</p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const featured = projects.find((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section relative">
      <div className="container-g">
        <h2 className="label block mb-10">03 / Projects</h2>

        <div className="grid tablet:grid-cols-2 gap-6">
          {featured && (
            <ProjectCard project={featured} index={0} featured />
          )}
          {rest.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={featured ? i + 1 : i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
