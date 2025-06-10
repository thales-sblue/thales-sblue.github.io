import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import bgHero from "../assets/bg-hero.png";
import fotoPerfil from "../assets/foto-perfil.png";
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

const skills = [
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
    const contentRef = useRef(null);
    const [radius, setRadius] = useState(0);

    useEffect(() => {
        const calcRadius = () => {
            if (contentRef.current) {
                const { width, height } = contentRef.current.getBoundingClientRect();
                const diagonal = Math.sqrt(width * width + height * height);
                setRadius(diagonal / 2 + 20);
            }
        };
        calcRadius();
        window.addEventListener("resize", calcRadius);
        return () => window.removeEventListener("resize", calcRadius);
    }, []);

    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${bgHero})` }}
        >
            <div className="absolute inset-0 bg-black/30 sm:bg-black/60 z-10" />

            <div
                ref={contentRef}
                className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-8 px-4 max-w-6xl w-full"
            >
                <motion.div
                    className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <img
                        src={fotoPerfil}
                        alt="Thales Santos"
                        className="w-full h-full object-cover rounded-full border-4 border-accent shadow-2xl"
                    />
                </motion.div>

                <motion.div
                    className="w-full max-w-xl text-center md:text-left space-y-4 px-4"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                >
                    <h1 className="font-heading text-4xl md:text-5xl text-white leading-snug">
                        Olá, eu sou o Thales
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300">
                        Veja meus projetos e as soluções que já criei em Java, NodeJs, PHP e muito mais.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 items-center justify-center md:justify-start">
                        <a
                            href="#nasa"
                            className="bg-accent text-black font-semibold px-4 py-2 text-sm rounded-full hover:bg-white hover:text-black transition w-4/5 max-w-[160px] text-center"
                        >
                            Explorar o Universo
                        </a>
                        <a
                            href="#projects"
                            className="bg-accent text-black font-semibold px-4 py-2 text-sm rounded-full hover:bg-white hover:text-black transition w-4/5 max-w-[160px] text-center"
                        >
                            Ver Projetos
                        </a>
                    </div>
                </motion.div>
            </div>

            {radius > 0 && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
                >
                    {skills.map(({ name, Icon }, index) => {
                        const angle = (index / skills.length) * 2 * Math.PI - Math.PI / 2;
                        const x = Math.cos(angle) * radius;
                        const y = Math.sin(angle) * radius;
                        return (
                            <motion.div
                                key={name}
                                className="absolute flex items-center justify-center pointer-events-auto -translate-x-1/2 -translate-y-1/2"
                                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                            >
                                <Icon className="text-4xl text-accent hover:text-red-600 cursor-pointer" title={name} />
                            </motion.div>
                        );
                    })}
                </motion.div>
            )}
        </section>
    );
}
