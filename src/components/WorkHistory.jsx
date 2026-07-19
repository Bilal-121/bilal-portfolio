import { motion } from "framer-motion";
import { useClipReveal } from "../lib/motion";
import workHistory from "../data/workHistory";

function WorkEntry({ job, index, isLast }) {
  const reveal = useClipReveal();
  const number = String(index + 1).padStart(2, "0");

  return (
    <motion.div ref={reveal.ref} style={reveal.style}>
      <div className="grid tablet:grid-cols-12 gap-4 tablet:gap-6 py-10">
        <span className="label tablet:col-span-1">{number}</span>

        <div className="tablet:col-span-4">
          <h3 className="text-h2 text-text-primary">{job.title}</h3>
          <p className="label text-text-muted mt-1">
            {job.company} · {job.period}
          </p>
        </div>

        <div className="tablet:col-span-7">
          {job.description && (
            <p className="text-body text-text-secondary leading-relaxed">
              {job.description}
            </p>
          )}

          {job.subEntries && (
            <ul className="space-y-2">
              {job.subEntries.map((entry) => (
                <li
                  key={entry.title}
                  className="flex flex-wrap justify-between gap-x-4 text-body text-text-secondary"
                >
                  <span>{entry.title}</span>
                  <span className="text-text-muted">{entry.period}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {!isLast && <div className="hairline" />}
    </motion.div>
  );
}

export default function WorkHistory() {
  return (
    <section id="work" className="section relative">
      <div className="container-g">
        <h2 className="label block mb-10">02 / Work History</h2>

        <div className="hairline mb-2" />
        {workHistory.map((job, i) => (
          <WorkEntry
            key={job.title}
            job={job}
            index={i}
            isLast={i === workHistory.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
