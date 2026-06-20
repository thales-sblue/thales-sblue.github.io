import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { projects } from "../data/projects";
import Projects from "./Projects";

function getProjectCard(title: string) {
  const card = screen
    .getByRole("heading", { level: 3, name: title })
    .closest("a");

  if (!card) {
    throw new Error(`Project card not found for ${title}`);
  }

  return card;
}

describe("Projects", () => {
  it("renders the section title", () => {
    render(<Projects />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Meus Projetos" }),
    ).toBeInTheDocument();
  });

  it("renders every project title and link from the real data source", () => {
    render(<Projects />);

    for (const project of projects) {
      const heading = screen.getByRole("heading", {
        level: 3,
        name: project.title,
      });
      const card = heading.closest("a");

      expect(heading).toBeInTheDocument();
      expect(card).toHaveAttribute("href", project.link);
    }
  });

  it("renders the technical evidence label and text for every project", () => {
    render(<Projects />);

    expect(screen.getAllByText("Evidência técnica")).toHaveLength(
      projects.length,
    );

    for (const project of projects) {
      const card = getProjectCard(project.title);

      expect(within(card).getByText("Evidência técnica")).toBeInTheDocument();
      expect(within(card).getByText(project.evidence)).toBeInTheDocument();
    }
  });

  it("renders projects backed by images or icons without throwing", () => {
    const { container } = render(<Projects />);

    for (const project of projects) {
      const card = getProjectCard(project.title);

      if (project.image) {
        expect(
          within(card).getByRole("img", { name: project.title }),
        ).toHaveAttribute("src", project.image);
      } else if (project.Icon) {
        expect(card.querySelector("svg")).toBeInTheDocument();
      }
    }

    expect(container.querySelectorAll("img")).not.toHaveLength(0);
    expect(container.querySelectorAll("svg")).not.toHaveLength(0);
  });
});
