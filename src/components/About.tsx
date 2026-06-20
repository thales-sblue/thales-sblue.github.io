import type { IconType } from "react-icons";
import { FaCode, FaDatabase, FaServer } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

type Highlight = {
  Icon: IconType;
  text: string;
};

const highlights: Highlight[] = [
  {
    Icon: FaServer,
    text: "Backend com PHP 8, integrações e RabbitMQ",
  },
  {
    Icon: FaDatabase,
    text: "Oracle, Docker, testes e pipelines CI/CD",
  },
  {
    Icon: FaCode,
    text: "React, Vue e automação com IA",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-surface py-section">
      <Reveal className="section-container">
        <SectionHeading title="Sobre Mim" align="left" className="md:mb-12" />
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="max-w-prose space-y-5 text-muted">
            <p className="text-lg leading-relaxed">
              Sou desenvolvedor PHP / Full Stack com foco em backend. Tenho
              experiência com aplicações de contexto financeiro, integrações,
              RabbitMQ e banco de dados Oracle.
            </p>
            <p className="leading-relaxed">
              No dia a dia, trabalho com PHP 8, Docker, testes e pipelines de
              CI/CD, incluindo validações de segurança web com OWASP ZAP.
            </p>
            <p className="leading-relaxed">
              Também atuo com React e Vue quando o produto exige uma visão de
              ponta a ponta e uso IA para automatizar rotinas de
              desenvolvimento.
            </p>
          </div>
          <ul className="space-y-4">
            {highlights.map(({ Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-4 rounded-card border border-white/10 bg-surface-elevated px-5 py-4 transition hover:border-white/20"
              >
                <Icon
                  aria-hidden="true"
                  className="shrink-0 text-xl text-accent"
                />
                <span className="font-medium text-white">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
