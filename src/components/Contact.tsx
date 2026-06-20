import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

type ContactLink = {
  label: string;
  href: string;
  Icon: IconType;
};

const links: ContactLink[] = [
  {
    label: "Email",
    href: "mailto:thales_sblue@hotmail.com",
    Icon: FaEnvelope,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/thales-s-a883a2194/",
    Icon: FaLinkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/thales-sblue",
    Icon: FaGithub,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-surface-elevated py-section">
      <Reveal className="section-container text-center">
        <SectionHeading
          title="Contato"
          subtitle="Para conversas técnicas, networking ou contato profissional, meus canais estão abaixo."
        />
        <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:justify-center">
          {links.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="group flex flex-1 items-center justify-center gap-3 rounded-card border border-white/10 bg-surface px-6 py-4 transition hover:border-accent/50 hover:bg-surface-muted/30"
            >
              <Icon className="text-xl text-muted transition group-hover:text-accent" />
              <span className="font-medium text-white">{label}</span>
            </a>
          ))}
        </div>
        <div className="mt-10">
          <Button href="mailto:thales_sblue@hotmail.com">
            Vamos conversar
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
