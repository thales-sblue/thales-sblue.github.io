import React from "react";
import { motion } from "framer-motion";
import bgHero from "../assets/bg-hero.png";
import fotoPerfil from "../assets/foto-perfil.png";

export default function Hero() {
    return (
        <section
            id="hero"
            className="
        relative h-screen
        flex flex-col md:flex-row        /* empilha no mobile, lado a lado no desktop */
        items-center justify-center      /* tudo centralizado */
        gap-8                            /* espaço constante entre foto e texto */
        bg-cover bg-center
      "
            style={{ backgroundImage: `url(${bgHero})` }}
        >
            <div className="absolute inset-0 bg-black/60 z-10" />

            <motion.div
                className="relative z-20 flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            >
                <img
                    src={fotoPerfil}
                    alt="Thales Santos"
                    className="
            w-64 h-64 md:w-80 md:h-80 
            object-cover
            rounded-xl
            border-2 border-accent
            shadow-xl
          "
                />
            </motion.div>

            <motion.div
                className="
          relative z-20
          px-6 
          max-w-md       /* largura máxima pra texto ficar próximo */
          text-center md:text-left
          space-y-6
        "
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="font-heading text-4xl md:text-5xl text-white leading-snug">
                    Olá, eu sou o Thales Santos
                </h1>
                <p className="font-body text-lg md:text-xl text-gray-300">
                    Veja meus projetos e as soluções que já criei em Java, NodeJs e muito mais.
                </p>
                <a
                    href="#projects"
                    className="
            inline-block 
            bg-accent text-black font-semibold 
            px-6 py-3 rounded-full 
            hover:scale-105 transition
          "
                >
                    Ver Projetos
                </a>
            </motion.div>
        </section>
    );
}
