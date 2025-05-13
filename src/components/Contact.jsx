import React from "react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function Contact() {
    return (
        <motion.section
            id="contact"
            className="py-20 px-4 bg-primary text-white"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-xl mx-auto text-center">
                <h2 className="relative inline-block font-heading text-3xl mb-6">
                    Contato
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent"></span>
                </h2>
                <p className="font-body text-gray-300 mb-6">
                    Me envie uma mensagem ou conecte-se comigo nas redes:
                </p>
                <div className="flex justify-center space-x-6">
                    <a
                        href="mailto:thales_sblue@hotmail.com"
                        className="font-body hover:text-accent transition"
                    >
                        Email
                    </a>
                    <a
                        href="https://www.linkedin.com/in/thales-s-a883a2194/"
                        target="_blank"
                        rel="noreferrer"
                        className="font-body hover:text-accent transition"
                    >
                        LinkedIn
                    </a>
                    <a
                        href="https://github.com/thales-sblue"
                        target="_blank"
                        rel="noreferrer"
                        className="font-body hover:text-accent transition"
                    >
                        GitHub
                    </a>
                </div>
            </div>
        </motion.section>
    );
}
