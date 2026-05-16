import React, { useState, useEffect } from "react";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Início", href: "#hero" },
  { name: "Nasa", href: "#nasa" },
  { name: "Projetos", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Sobre", href: "#about" },
  { name: "Contato", href: "#contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("Início");

  useEffect(() => {
    const onScroll = () => {
      const pos = window.scrollY + 120;
      let current = "Início";
      navItems.forEach(({ name, href }) => {
        const sec = document.querySelector(href);
        if (sec && pos >= sec.offsetTop) {
          current = name;
        }
      });
      setActive(current);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const section = document.querySelector(href);
    if (section) {
      const top = section.offsetTop - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header className="glass-nav fixed inset-x-0 top-0 z-50">
        <motion.div
          className="section-container flex h-12 items-center justify-between md:h-14"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "#hero")}
            className="text-lg font-semibold tracking-tight text-white transition hover:text-accent"
          >
            Thales
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-sm font-medium transition-colors ${
                  active === item.name
                    ? "text-accent"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <button
            className="text-2xl text-white md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menu"
          >
            <HiMenu />
          </button>
        </motion.div>
      </header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col border-l border-white/10 bg-surface-elevated/95 p-8 backdrop-blur-xl"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
            >
              <button
                className="mb-8 self-end text-2xl text-white"
                onClick={() => setIsOpen(false)}
                aria-label="Fechar menu"
              >
                <HiX />
              </button>
              <nav className="flex flex-col gap-6">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`text-xl font-medium transition-colors ${
                      active === item.name
                        ? "text-accent"
                        : "text-white hover:text-accent"
                    }`}
                  >
                    {item.name}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
