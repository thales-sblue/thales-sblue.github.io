// src/components/Header.jsx
import React, { useState, useEffect } from "react";
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

    useEffect(() => {
        const onScroll = () => {
            const pos = window.scrollY;
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
        <>
            <header className="fixed inset-x-0 top-0 z-50 flex items-center bg-black/70 px-6 py-3">
                {/* Navegação Desktop, alinhada à direita */}
                <nav className="hidden md:flex ml-auto space-x-8">
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

                {/* Botão Mobile */}
                <button
                    className="md:hidden ml-auto text-white text-2xl"
                    onClick={() => setIsOpen(true)}
                >
                    <HiMenu />
                </button>
            </header>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="fixed inset-0 z-40 flex">
                    {/* Fundo semitransparente */}
                    <div
                        className="absolute inset-0 bg-black/80"
                        onClick={() => setIsOpen(false)}
                    />

                    {/* Drawer móvel: altura auto até o último item */}
                    <div className="fixed top-0 right-0 w-64 bg-primary p-6 flex flex-col space-y-4 rounded-bl-lg z-50">
                        <button
                            className="self-end text-white text-2xl"
                            onClick={() => setIsOpen(false)}
                        >
                            <HiX />
                        </button>
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsOpen(false)}
                                className="text-white text-lg hover:text-accent transition"
                            >
                                {item.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
