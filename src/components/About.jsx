import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaDatabase, FaServer } from "react-icons/fa";

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
                <p className="font-body text-gray-300 leading-relaxed mb-4">
                    Sou desenvolvedor com experiência prática em:
                </p>
                <ul className="font-body text-gray-300 leading-relaxed mb-6 space-y-2">
                    <li className="flex items-center justify-center">
                        <FaCode className="text-accent mr-2" /> Frontend com React e Vue
                    </li>
                    <li className="flex items-center justify-center">
                        <FaServer className="text-accent mr-2" /> Backend com PHP e Java
                    </li>
                    <li className="flex items-center justify-center">
                        <FaDatabase className="text-accent mr-2" /> Banco de dados Oracle e PostgreSQL
                    </li>
                </ul>
                <p className="font-body text-gray-300 leading-relaxed mb-4">
                    Atuo a mais de 3 anos na área adquirindo uma visão ampla do processo de desenvolvimento, desde o suporte técnico até a entrega de soluções completas.
                </p>
                <p className="font-body text-gray-300 leading-relaxed">
                    Gosto de aprender na prática, nada melhor que a mão no código para evoluir como dev.
                </p>
            </div>
        </motion.section>
    );
}
