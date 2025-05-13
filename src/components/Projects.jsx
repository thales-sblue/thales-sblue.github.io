import React from "react";
import { motion } from "framer-motion";
import { projects } from "../data/projects";
import bgProjects from "../assets/bg-projects.png";

const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.15,
            duration: 0.5,
        },
    }),
};

export default function Projects() {
    return (
        <section
            id="projects"
            className="relative py-20 px-4 text-white bg-cover bg-center"
            style={{ backgroundImage: `url(${bgProjects})` }}
        >
            <div className="absolute inset-0 bg-black/60 pointer-events-none" />

            <div className="relative max-w-5xl mx-auto text-center">
                <h2 className="relative inline-block font-heading text-3xl mb-8">
                    Meus Projetos
                    <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-accent" />
                </h2>

                <div className="grid justify-items-center gap-8 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((proj, index) => {
                        const TechIcon = proj.Icon;
                        return (
                            <motion.a
                                key={proj.title}
                                href={proj.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                  block w-80 bg-primary rounded-lg overflow-hidden
                  border-2 border-transparent hover:border-accent
                  shadow-lg hover:shadow-xl transition
                  relative z-10
                "
                                variants={fadeUp}
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, amount: 0.3 }}
                                custom={index}
                            >
                                {proj.image ? (
                                    <img
                                        src={proj.image}
                                        alt={proj.title}
                                        className="w-full h-48 object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-48 flex items-center justify-center bg-dark-gray">
                                        <TechIcon className="text-6xl text-accent" />
                                    </div>
                                )}
                                <div className="p-4">
                                    <h3 className="font-heading text-xl mb-2">{proj.title}</h3>
                                    <p className="font-body text-gray-300 text-sm leading-relaxed">
                                        {proj.description}
                                    </p>
                                </div>
                            </motion.a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
