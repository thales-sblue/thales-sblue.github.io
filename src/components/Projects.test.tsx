import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { projects } from "../data/projects";
import Projects from "./Projects";

vi.mock("framer-motion", async () => {
  const React = await import("react");
  const animationProps = new Set([
    "animate",
    "custom",
    "exit",
    "initial",
    "transition",
    "variants",
    "viewport",
    "whileInView",
  ]);
  const motion = new Proxy(
    {},
    {
      get: (_, tag: string) => {
        const MockMotionComponent = React.forwardRef<
          HTMLElement,
          Record<string, unknown>
        >(({ children, ...props }, ref) => {
          const domProps = Object.fromEntries(
            Object.entries(props).filter(
              ([propName]) => !animationProps.has(propName),
            ),
          );

          return React.createElement(
            tag,
            { ...domProps, ref },
            children as React.ReactNode,
          );
        });

        MockMotionComponent.displayName = `MockMotion(${tag})`;

        return MockMotionComponent;
      },
    },
  );

  return {
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    motion,
  };
});

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

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

  it("renders every project card as a link from the real data source", () => {
    render(<Projects />);

    const cards = screen.getAllByRole("link");

    expect(cards).toHaveLength(projects.length);

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

  it("gives every project link an accessible name based on the project title", () => {
    render(<Projects />);

    for (const project of projects) {
      const titlePattern = new RegExp(escapeRegex(project.title), "i");
      const card = screen.getByRole("link", { name: titlePattern });

      expect(card).toHaveAttribute("href", project.link);
      expect(card).toContainElement(
        within(card).getByRole("heading", {
          level: 3,
          name: project.title,
        }),
      );
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

  it("renders non-empty alt text for every project image", () => {
    render(<Projects />);

    for (const project of projects) {
      if (!project.image) {
        continue;
      }

      const card = getProjectCard(project.title);
      const image = within(card).getByRole("img", { name: project.title });

      expect(image).toHaveAttribute("src", project.image);
      expect(image).toHaveAttribute("alt", project.title);
      expect(image.getAttribute("alt")?.trim()).not.toBe("");
    }
  });

  it("does not rely on icon-only visuals as the sole accessible label", () => {
    render(<Projects />);

    for (const project of projects) {
      if (project.image) {
        continue;
      }

      const card = getProjectCard(project.title);
      const titlePattern = new RegExp(escapeRegex(project.title), "i");

      expect(card.querySelector("svg")).toBeInTheDocument();
      expect(within(card).queryByRole("img")).not.toBeInTheDocument();
      expect(card).toHaveAccessibleName(titlePattern);
      expect(within(card).getByText(project.evidence)).toBeVisible();
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
