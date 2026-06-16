import type { IconType } from "react-icons";
import { FaReact, FaNodeJs, FaVuejs } from "react-icons/fa";
import { DiJava } from "react-icons/di";
import { SiPhp, SiOracle, SiGit, SiPostgresql } from "react-icons/si";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

type Skill = {
  name: string;
  Icon: IconType;
};

const skills: Skill[] = [
  { name: "PHP", Icon: SiPhp },
  { name: "Java", Icon: DiJava },
  { name: "Node.js", Icon: FaNodeJs },
  { name: "React", Icon: FaReact },
  { name: "Vue.js", Icon: FaVuejs },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Oracle", Icon: SiOracle },
  { name: "Git", Icon: SiGit },
];

export default function Skills() {
  return (
    <section id="skills" className="bg-surface-elevated py-section">
      <Reveal className="section-container">
        <SectionHeading
          title="Hard Skills"
          subtitle="Tecnologias que uso no dia a dia para entregar soluções."
        />
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-4 sm:gap-12">
          {skills.map(({ name, Icon }) => (
            <div key={name} className="group flex flex-col items-center gap-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-surface-muted/50 transition duration-300 group-hover:bg-surface-muted">
                <Icon className="text-3xl text-white/70 transition duration-300 group-hover:text-accent" />
              </div>
              <span className="text-sm font-medium text-muted transition group-hover:text-white">
                {name}
              </span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
