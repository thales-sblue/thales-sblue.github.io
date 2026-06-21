import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { projects } from "../data/projects";
import { sectionIds } from "../data/site";
import SectionHeading from "./ui/SectionHeading";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

export default function Projects() {
  return (
    <section id={sectionIds.projects} className="bg-surface py-section">
      <div className="section-container">
        <SectionHeading
          title="Meus Projetos"
          subtitle="Cases de backend e full stack que demonstram decisões técnicas, integrações e regras de negócio."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((proj, index) => {
            const TechIcon = proj.Icon;
            return (
              <motion.a
                key={proj.title}
                href={proj.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-card border border-white/10 bg-surface-elevated transition duration-300 hover:scale-[1.02] hover:border-white/20 hover:shadow-2xl hover:shadow-black/40"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                custom={index}
              >
                {proj.image ? (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex aspect-video items-center justify-center bg-surface-muted">
                    {TechIcon && (
                      <TechIcon className="text-5xl text-white/50 transition group-hover:text-accent" />
                    )}
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="text-xl font-semibold tracking-tight">
                    {proj.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {proj.description}
                  </p>
                  <div className="mt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Stack
                    </p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {proj.stack.map((technology) => (
                        <span
                          key={technology}
                          className="rounded-full border border-white/10 bg-surface-muted px-2.5 py-1 text-xs text-muted"
                        >
                          {technology}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 flex-1 border-t border-white/10 pt-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                      Evidência técnica
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {proj.evidence}
                    </p>
                  </div>
                  <span className="mt-4 text-sm font-medium text-accent opacity-0 transition group-hover:opacity-100">
                    Ver no GitHub →
                  </span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
