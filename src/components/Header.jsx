import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Dialog } from "@headlessui/react";
import { HiMenu, HiX } from "react-icons/hi";

const navItems = [
    { name: "Sobre", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Projetos", href: "#projects" },
    { name: "Contato", href: "#contact" },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("");
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            const pos = window.scrollY;
            setScrolled(pos > 50);

            navItems.forEach(({ name, href }) => {
                const sec = document.querySelector(href);
                if (sec && pos >= sec.offsetTop - 120) {
                    setActive(name);
                }
            });
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <header
            className={`
        fixed inset-x-0 top-0 z-50 flex items-center justify-between
        px-6 py-3 transition backdrop-blur-md duration-300
        ${scrolled ? "bg-black/70" : "bg-transparent"}
      `}
        >
            <motion.a
                href="#hero"
                className="font-heading text-2xl text-accent select-none hover:opacity-80"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ repeat: Infinity, duration: 2 }}
            >
                Thales.dev
            </motion.a>

            <nav className="hidden md:flex space-x-8">
                {navItems.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className={`
              relative text-white hover:text-accent transition-colors
              ${active === item.name ? "text-accent" : ""}
            `}
                    >
                        {item.name}
                        <span
                            className={`
                absolute left-0 -bottom-1 h-0.5 bg-accent
                transition-all duration-300
                ${active === item.name ? "w-full" : "w-0"}
              `}
                        />
                    </a>
                ))}
            </nav>

            <button
                className="md:hidden text-white text-2xl"
                onClick={() => setIsOpen(true)}
            >
                <HiMenu />
            </button>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="fixed inset-0 z-50 flex"
            >
                <Dialog.Overlay className="fixed inset-0 bg-black/80" />
                <div className="relative ml-auto w-64 h-full bg-primary p-6 flex flex-col">
                    <button
                        className="self-end text-2xl text-white mb-8"
                        onClick={() => setIsOpen(false)}
                    >
                        <HiX />
                    </button>
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-white text-lg py-2 hover:text-accent transition"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
            </Dialog>
        </header>
    );
}
