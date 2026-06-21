export const sectionIds = {
  hero: "hero",
  projects: "projects",
  nasa: "nasa",
  skills: "skills",
  about: "about",
  contact: "contact",
} as const;

export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
export type SectionHref = `#${SectionId}`;

export type NavigationItem = {
  label: string;
  href: SectionHref;
};

export type ActionLink = {
  label: string;
  href: string;
};

export type ExternalLinkBehavior = {
  target: "_blank";
  rel: "noopener noreferrer";
};

export type ContactLink = ActionLink &
  Partial<ExternalLinkBehavior> & {
    kind: "email" | "whatsApp" | "github" | "linkedIn";
  };

export type SiteProfile = {
  name: string;
  title: string;
  email: string;
  whatsAppUrl: string;
  githubUrl: string;
  linkedInUrl: string;
};

export const siteProfile = {
  name: "Thales",
  title: "Desenvolvedor PHP / Full Stack com foco em backend.",
  email: "thales_sblue@hotmail.com",
  whatsAppUrl: "https://wa.me/5544999072631",
  githubUrl: "https://github.com/thales-sblue",
  linkedInUrl: "https://www.linkedin.com/in/thales-s-a883a2194/",
} as const satisfies SiteProfile;

export const navigationItems = [
  { label: "Início", href: `#${sectionIds.hero}` },
  { label: "Nasa", href: `#${sectionIds.nasa}` },
  { label: "Projetos", href: `#${sectionIds.projects}` },
  { label: "Skills", href: `#${sectionIds.skills}` },
  { label: "Sobre", href: `#${sectionIds.about}` },
  { label: "Contato", href: `#${sectionIds.contact}` },
] as const satisfies readonly NavigationItem[];

export const heroCtas = {
  projects: {
    label: "Ver Projetos",
    href: `#${sectionIds.projects}`,
  },
  nasa: {
    label: "Explorar NASA",
    href: `#${sectionIds.nasa}`,
  },
} as const satisfies Record<string, ActionLink>;

export const contactLinks = {
  email: {
    kind: "email",
    label: "Email",
    href: `mailto:${siteProfile.email}`,
    target: undefined,
    rel: undefined,
  },
  whatsApp: {
    kind: "whatsApp",
    label: "WhatsApp",
    href: siteProfile.whatsAppUrl,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  github: {
    kind: "github",
    label: "GitHub",
    href: siteProfile.githubUrl,
    target: "_blank",
    rel: "noopener noreferrer",
  },
  linkedIn: {
    kind: "linkedIn",
    label: "LinkedIn",
    href: siteProfile.linkedInUrl,
    target: "_blank",
    rel: "noopener noreferrer",
  },
} as const satisfies Record<string, ContactLink>;
