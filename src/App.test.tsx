import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

const requiredSectionAnchors = [
  "hero",
  "projects",
  "skills",
  "about",
  "contact",
] as const;

describe("App accessibility and semantics", () => {
  it("renders a single main landmark with the expected primary sections", () => {
    const { container } = render(<App />);

    const mains = screen.getAllByRole("main");
    const main = mains[0];

    expect(mains).toHaveLength(1);
    expect(main).toContainElement(container.querySelector("#hero"));
    expect(main).toContainElement(container.querySelector("#projects"));
    expect(main).toContainElement(container.querySelector("#skills"));
    expect(main).toContainElement(container.querySelector("#about"));
    expect(main).toContainElement(container.querySelector("#contact"));
  });

  it("exposes the required section anchors and a matching navigation target for each nav link", () => {
    render(<App />);

    for (const anchorId of requiredSectionAnchors) {
      expect(document.getElementById(anchorId)).toBeInTheDocument();
    }

    const navigation = screen.getAllByRole("navigation")[0];

    for (const link of within(navigation).getAllByRole("link")) {
      const href = link.getAttribute("href");

      expect(href).toMatch(/^#/);
      expect(document.querySelector(href ?? "")).toBeInTheDocument();
    }
  });

  it("renders a single main heading and the expected section headings", () => {
    render(<App />);

    expect(
      screen.getAllByRole("heading", {
        level: 1,
        name: /desenvolvedor php \/ full stack com foco em backend\./i,
      }),
    ).toHaveLength(1);

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

    expect(screen.getByRole("link", { name: "Ver Projetos" })).toHaveAttribute(
      "href",
      "#projects",
    );
    expect(screen.getByRole("link", { name: "Explorar NASA" })).toHaveAttribute(
      "href",
      "#nasa",
    );
    expect(
      screen.getByRole("link", { name: "Vamos conversar" }),
    ).toHaveAttribute("href", "mailto:thales_sblue@hotmail.com");
    expect(
      screen.getByRole("link", { name: "Conversar no WhatsApp" }),
    ).toHaveAttribute("href", "https://wa.me/5544999072631");
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
