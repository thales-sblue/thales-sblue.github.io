import React from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs } from "react-icons/fa";
import { DiJava } from "react-icons/di";
import { SiPhp, SiOracle, SiGit } from "react-icons/si";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const skills = [
    { name: "PHP", Icon: SiPhp },
    { name: "Java", Icon: DiJava },
    { name: "Node.js", Icon: FaNodeJs },
    { name: "React", Icon: FaReact },
    { name: "Oracle", Icon: SiOracle },
    { name: "Git", Icon: SiGit },
];

export default function Skills() {
    return (
        <motion.section
            id="skills"
            className="py-20 px-4 bg-primary text-white"
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
        >
            <div className="max-w-5xl mx-auto text-center">
                <h2 className="font-heading text-3xl mb-12 inline-block relative">
                    Minhas Skills
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent"></span>
                </h2>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-8 justify-items-center">
                    {skills.map(({ name, Icon }) => (
                        <div
                            key={name}
                            className="flex flex-col items-center space-y-2"
                        >
                            <Icon className="text-6xl text-accent hover:scale-110 transition-transform" />
                            <span className="font-body text-sm">{name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.section>
    );
}
