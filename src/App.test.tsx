import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";
import {
  contactLinks,
  heroCtas,
  navigationItems,
  sectionIds,
} from "./data/site";

describe("App accessibility and semantics", () => {
  it("renders a single main landmark with the expected primary sections", () => {
    const { container } = render(<App />);

    const mains = screen.getAllByRole("main");
    const main = mains[0];

    expect(mains).toHaveLength(1);

    for (const sectionId of Object.values(sectionIds)) {
      expect(main).toContainElement(container.querySelector(`#${sectionId}`));
    }
  });

  it("exposes the required section anchors and a matching navigation target for each nav link", () => {
    render(<App />);

    for (const anchorId of Object.values(sectionIds)) {
      expect(document.getElementById(anchorId)).toBeInTheDocument();
    }

    const navigation = screen.getAllByRole("navigation")[0];
    const navLinks = within(navigation).getAllByRole("link");

    expect(navLinks).toHaveLength(navigationItems.length);

    for (const item of navigationItems) {
      const link = within(navigation).getByRole("link", { name: item.label });

      expect(link).toHaveAttribute("href", item.href);
      expect(document.querySelector(item.href)).toBeInTheDocument();
    }
  });

  it("renders a single main heading and the expected section headings", () => {
    render(<App />);

    const levelOneHeadings = screen.getAllByRole("heading", { level: 1 });
    const mainHeading = levelOneHeadings[0];

    expect(levelOneHeadings).toHaveLength(1);
    expect(mainHeading).toHaveAccessibleName(/php/i);
    expect(mainHeading).toHaveAccessibleName(/full stack/i);
    expect(mainHeading).toHaveAccessibleName(/backend/i);

    expect(
      screen.getByRole("heading", { level: 2, name: "Meus Projetos" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Hard Skills" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Sobre Mim" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 2, name: "Contato" }),
    ).toBeInTheDocument();
  });

  it("keeps important CTAs accessible by role and name", () => {
    render(<App />);

    expect(
      screen.getByRole("link", { name: heroCtas.projects.label }),
    ).toHaveAttribute("href", heroCtas.projects.href);
    expect(
      screen.getByRole("link", { name: heroCtas.nasa.label }),
    ).toHaveAttribute("href", heroCtas.nasa.href);
    expect(
      screen.getByRole("link", { name: "Vamos conversar" }),
    ).toHaveAttribute("href", contactLinks.email.href);
    expect(
      screen.getByRole("link", { name: "Conversar no WhatsApp" }),
    ).toHaveAttribute("href", contactLinks.whatsApp.href);
  });

  it("preserves contact external link metadata", () => {
    render(<App />);

    const externalContactLinks = [
      {
        accessibleName: contactLinks.linkedIn.label,
        ...contactLinks.linkedIn,
      },
      {
        accessibleName: contactLinks.github.label,
        ...contactLinks.github,
      },
      {
        accessibleName: "Conversar no WhatsApp",
        ...contactLinks.whatsApp,
      },
    ];

    for (const item of externalContactLinks) {
      const link = screen.getByRole("link", { name: item.accessibleName });

      expect(link).toHaveAttribute("href", item.href);
      expect(link).toHaveAttribute("target", item.target);
      expect(link).toHaveAttribute("rel", item.rel);
    }
  });

  it("uses noopener and noreferrer on every external link that opens in a new tab", () => {
    const { container } = render(<App />);
    const externalLinks = Array.from(
      container.querySelectorAll<HTMLAnchorElement>('a[target="_blank"]'),
    );

    expect(externalLinks.length).toBeGreaterThan(0);

    for (const link of externalLinks) {
      expect(link).toHaveAttribute("rel");
      expect(link.getAttribute("rel")).toContain("noopener");
      expect(link.getAttribute("rel")).toContain("noreferrer");
    }
  });
});
