import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import bgHero from "../assets/bg-hero.png";
import fotoPerfil from "../assets/foto-perfil.png";
import Button from "./ui/Button";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { DiJava } from "react-icons/di";
import {
  SiPhp,
  SiOracle,
  SiGit,
  SiSpringboot,
  SiTailwindcss,
  SiPostgresql,
  SiInsomnia,
  SiDbeaver,
  SiIntellijidea,
  SiGithub,
  SiDocker,
  SiTypescript,
} from "react-icons/si";

type Skill = {
  name: string;
  Icon: IconType;
};

const skills: Skill[] = [
  { name: "PHP", Icon: SiPhp },
  { name: "Java", Icon: DiJava },
  { name: "Node.js", Icon: FaNodeJs },
  { name: "React", Icon: FaReact },
  { name: "Oracle", Icon: SiOracle },
  { name: "Git", Icon: SiGit },
  { name: "Spring Boot", Icon: SiSpringboot },
  { name: "Tailwind", Icon: SiTailwindcss },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Insomnia", Icon: SiInsomnia },
  { name: "DBeaver", Icon: SiDbeaver },
  { name: "IntelliJ", Icon: SiIntellijidea },
  { name: "GitHub", Icon: SiGithub },
  { name: "Docker", Icon: SiDocker },
  { name: "TypeScript", Icon: SiTypescript },
];

export default function Hero() {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const [radius, setRadius] = useState(0);

  useEffect(() => {
    const calcRadius = () => {
      if (contentRef.current) {
        const { width, height } = contentRef.current.getBoundingClientRect();
        const diagonal = Math.sqrt(width * width + height * height);
        setRadius(diagonal / 2 + 40);
      }
    };
    calcRadius();
    window.addEventListener("resize", calcRadius);
    return () => window.removeEventListener("resize", calcRadius);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgHero})` }}
    >
      <motion.div
        className="absolute inset-0 z-10 bg-gradient-to-b from-black/85 via-black/70 to-black"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div
        ref={contentRef}
        className="relative z-20 flex w-full max-w-6xl flex-col items-center justify-center gap-10 px-6 py-24 md:flex-row md:gap-16 md:py-32"
      >
        <motion.div
          className="h-44 w-44 shrink-0 sm:h-56 sm:w-56 md:h-64 md:w-64"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <img
            src={fotoPerfil}
            alt="Foto de perfil de Thales Santos"
            className="h-full w-full rounded-full border border-white/10 object-cover shadow-2xl shadow-black/50"
          />
        </motion.div>

        <motion.div
          className="w-full max-w-xl space-y-6 text-center md:text-left"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35,
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <h1 className="text-display-lg font-semibold tracking-tight text-gradient-subtle">
            Desenvolvedor PHP / Full Stack com foco em backend.
          </h1>
          <p className="text-xl font-normal text-muted md:text-2xl">
            Trabalho com PHP 8, Oracle e Docker em aplicações de contexto
            financeiro, com integrações, testes, pipelines de CI/CD e automação
            com IA.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row md:justify-start">
            <Button href="#projects">Ver Projetos</Button>
            <Button href="#nasa" variant="secondary">
              Explorar NASA
            </Button>
          </div>
        </motion.div>
      </div>

      {radius > 0 && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[15] flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
        >
          {skills.map(({ name, Icon }, index) => {
            const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={name}
                className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${x}px)`,
                  top: `calc(50% + ${y}px)`,
                }}
                animate={{ rotate: -360 }}
                transition={{ repeat: Infinity, duration: 60, ease: "linear" }}
              >
                <Icon
                  aria-hidden="true"
                  className="text-2xl text-white/20 transition-colors duration-300 hover:text-accent sm:text-3xl"
                  title={name}
                />
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
