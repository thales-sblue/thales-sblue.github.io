import type { IconType } from "react-icons";
import {
  FaCheckCircle,
  FaDatabase,
  FaLaptopCode,
  FaServer,
} from "react-icons/fa";
import { sectionIds } from "../data/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

type SkillGroup = {
  title: string;
  skills: string[];
  Icon: IconType;
};

const skillGroups: SkillGroup[] = [
  {
    title: "Backend & APIs",
    skills: ["PHP 8", "Java / Spring Boot", "Node.js", "REST APIs", "RabbitMQ"],
    Icon: FaServer,
  },
  {
    title: "Data & Infrastructure",
    skills: ["Oracle", "PostgreSQL", "Docker", "Git"],
    Icon: FaDatabase,
  },
  {
    title: "Qualidade, Entrega & Segurança",
    skills: ["Tests", "CI/CD pipelines", "AI-assisted automation", "OWASP ZAP"],
    Icon: FaCheckCircle,
  },
  {
    title: "Frontend Support",
    skills: ["React", "Vue.js", "TypeScript", "Tailwind CSS"],
    Icon: FaLaptopCode,
  },
];

export default function Skills() {
  return (
    <section id={sectionIds.skills} className="bg-surface-elevated py-section">
      <Reveal className="section-container">
        <SectionHeading
          title="Hard Skills"
          subtitle="Tecnologias e práticas que fazem parte da minha atuação em backend e desenvolvimento full stack."
        />
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-12">
          {skillGroups.map(({ title, skills, Icon }) => (
            <div key={title} className="group flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted/50 transition duration-300 group-hover:bg-surface-muted">
                <Icon
                  aria-hidden="true"
                  className="text-3xl text-white/70 transition duration-300 group-hover:text-accent"
                />
              </div>
              <h3 className="text-center text-sm font-medium text-white">
                {title}
              </h3>
              <ul className="space-y-1 text-center text-sm text-muted transition group-hover:text-white">
                {skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
