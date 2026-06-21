import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { contactLinks, sectionIds } from "../data/site";
import SectionHeading from "./ui/SectionHeading";
import Reveal from "./ui/Reveal";
import Button from "./ui/Button";

type ContactLink = {
  label: string;
  href: string;
  target?: "_blank";
  rel?: "noopener noreferrer";
  Icon: IconType;
};

const links: ContactLink[] = [
  {
    label: contactLinks.email.label,
    href: contactLinks.email.href,
    target: contactLinks.email.target,
    rel: contactLinks.email.rel,
    Icon: FaEnvelope,
  },
  {
    label: contactLinks.linkedIn.label,
    href: contactLinks.linkedIn.href,
    target: contactLinks.linkedIn.target,
    rel: contactLinks.linkedIn.rel,
    Icon: FaLinkedin,
  },
  {
    label: contactLinks.github.label,
    href: contactLinks.github.href,
    target: contactLinks.github.target,
    rel: contactLinks.github.rel,
    Icon: FaGithub,
  },
];

export default function Contact() {
  return (
    <section id={sectionIds.contact} className="bg-surface-elevated py-section">
      <Reveal className="section-container text-center">
        <SectionHeading
          title="Contato"
          subtitle="Para conversas técnicas, networking ou contato profissional, meus canais estão abaixo."
        />
        <div className="mx-auto flex max-w-2xl flex-col gap-4 sm:flex-row sm:justify-center">
          {links.map(({ label, href, target, rel, Icon }) => (
            <a
              key={label}
              href={href}
              target={target}
              rel={rel}
              className="group flex flex-1 items-center justify-center gap-3 rounded-card border border-white/10 bg-surface px-6 py-4 transition hover:border-accent/50 hover:bg-surface-muted/30"
            >
              <Icon
                aria-hidden="true"
                className="text-xl text-muted transition group-hover:text-accent"
              />
              <span className="font-medium text-white">{label}</span>
            </a>
          ))}
        </div>
        <div className="mt-10">
          <Button href={contactLinks.email.href}>Vamos conversar</Button>
        </div>
      </Reveal>
    </section>
  );
}
