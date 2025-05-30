import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { FaHome, FaProjectDiagram, FaCode, FaUser, FaEnvelope } from "react-icons/fa";

const navItems = [
    { name: "Início", href: "#hero", icon: <FaHome /> },
    { name: "Nasa", href: "#nasa", icon: <FaCode /> },
    { name: "Projetos", href: "#projects", icon: <FaProjectDiagram /> },
    { name: "Skills", href: "#skills", icon: <FaCode /> },
    { name: "Sobre", href: "#about", icon: <FaUser /> },
    { name: "Contato", href: "#contact", icon: <FaEnvelope /> },
];

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [active, setActive] = useState("");

    useEffect(() => {
        const onScroll = () => {
            const pos = window.scrollY + 160;
            navItems.forEach(({ name, href }) => {
                const sec = document.querySelector(href);
                if (sec && pos >= sec.offsetTop) {
                    setActive(name);
                }
            });
        };
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const handleNavClick = (e, href) => {
        e.preventDefault();
        setIsOpen(false);
        const section = document.querySelector(href);
        if (section) {
            const top = section.offsetTop - 140;
            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <>
            <header className="fixed inset-x-0 top-0 z-50 flex items-center bg-black/90 px-6 py-3 shadow-md">
                <nav className="hidden md:flex ml-auto space-x-8">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={(e) => handleNavClick(e, item.href)}
                            className={
                                "relative text-white hover:text-red-600 transition-colors flex items-center space-x-2 " +
                                (active === item.name ? "text-red-600" : "")
                            }
                        >
                            {item.icon}
                            <span>{item.name}</span>
                            <span
                                className={
                                    "absolute left-0 -bottom-1 h-0.5 bg-red-600 transition-all duration-300 " +
                                    (active === item.name ? "w-full" : "w-0")
                                }
                            />
                        </a>
                    ))}
                </nav>

                <button
                    className="md:hidden ml-auto text-white text-2xl"
                    onClick={() => setIsOpen(true)}
                    aria-label="Open menu"
                >
                    <HiMenu />
                </button>
            </header>

            {isOpen && (
                <div className="fixed inset-0 z-40 flex">
                    <div
                        className="absolute inset-0 bg-black/90"
                        onClick={() => setIsOpen(false)}
                    />

                    <div className="fixed top-0 right-0 w-64 bg-black p-6 flex flex-col space-y-6 rounded-bl-lg shadow-lg z-50">
                        <button
                            className="self-end text-white text-2xl"
                            onClick={() => setIsOpen(false)}
                            aria-label="Close menu"
                        >
                            <HiX />
                        </button>
                        {navItems.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                onClick={(e) => handleNavClick(e, item.href)}
                                className="flex items-center space-x-3 text-white text-lg hover:text-red-600 transition"
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
}
