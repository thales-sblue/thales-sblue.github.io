import React from "react";
import { FaCode, FaDatabase, FaServer } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";

const highlights = [
  {
    Icon: FaCode,
    text: "Frontend com React e Vue",
  },
  {
    Icon: FaServer,
    text: "Backend com PHP e Java",
  },
  {
    Icon: FaDatabase,
    text: "Banco de dados Oracle e PostgreSQL",
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
              Sou desenvolvedor com experiência prática em criar soluções do
              suporte técnico à entrega completa de produtos.
            </p>
            <p className="leading-relaxed">
              Atuo há mais de 3 anos na área, com visão ampla do processo de
              desenvolvimento e foco em código limpo e resultados.
            </p>
            <p className="leading-relaxed">
              Gosto de aprender na prática — nada melhor que a mão no código
              para evoluir como dev.
            </p>
          </div>

          <ul className="space-y-4">
            {highlights.map(({ Icon, text }) => (
              <li
                key={text}
                className="flex items-center gap-4 rounded-card border border-white/10 bg-surface-elevated px-5 py-4 transition hover:border-white/20"
              >
                <Icon className="shrink-0 text-xl text-accent" />
                <span className="font-medium text-white">{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}
