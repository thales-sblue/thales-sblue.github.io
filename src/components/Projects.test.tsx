import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { projects } from "../data/projects";
import Projects from "./Projects";

describe("Projects", () => {
  it("renders the section title", () => {
    render(<Projects />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Meus Projetos" }),
    ).toBeInTheDocument();
  });

  it("renders at least one project from the real data source", () => {
    render(<Projects />);

    expect(screen.getByText(projects[0].title)).toBeInTheDocument();
  });

  it("renders project links with href", () => {
    render(<Projects />);

    expect(screen.getByRole("link", { name: /PHP Bank/i })).toHaveAttribute(
      "href",
      projects[0].link,
    );
  });

  it("preserves the Ver no GitHub call to action", () => {
    render(<Projects />);

    expect(screen.getAllByText(/Ver no GitHub/i).length).toBeGreaterThan(0);
  });
});
