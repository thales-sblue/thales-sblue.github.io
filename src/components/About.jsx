import React from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function About() {
    return (
        <motion.section
            id="about"
            className="py-20 px-4 bg-dark-gray text-white"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-3xl mx-auto text-center">
                <h2 className="relative inline-block font-heading text-3xl mb-6">
                    Sobre Mim
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent"></span>
                </h2>
                <p className="font-body text-gray-300 leading-relaxed">
                    Sou desenvolvedor com experiência prática em backend com PHP, frontend com React e bom domínio de banco de dados Oracle.
                    Atuei por mais de 2 anos na área adquirindo uma visão ampla do processo de desenvolvimento, desde o suporte técnico até a entrega de soluções completas.               </p>
                <p className="font-body text-gray-300 leading-relaxed">
                    Gosto de aprender na prática e atualmente estou focado em estudar Java e NodeJs para ampliar minhas habilidades e evoluir como dev.
                </p>
            </div>
        </motion.section>
    );
}
