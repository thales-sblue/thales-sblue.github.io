import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionHeading from "./SectionHeading";

describe("SectionHeading", () => {
  it("renders the title", () => {
    render(<SectionHeading title="Projetos" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Projetos" }),
    ).toBeInTheDocument();
  });

  it("renders the subtitle when provided", () => {
    render(
      <SectionHeading
        title="Projetos"
        subtitle="Aplicacoes entregues em diferentes stacks."
      />,
    );

    expect(
      screen.getByText("Aplicacoes entregues em diferentes stacks."),
    ).toBeInTheDocument();
  });

  it("does not break when subtitle is omitted", () => {
    render(<SectionHeading title="Projetos" />);

    expect(screen.queryByText(/diferentes stacks/i)).not.toBeInTheDocument();
  });

  it("accepts align and className props", () => {
    const { container } = render(
      <SectionHeading
        title="Projetos"
        align="left"
        className="custom-heading"
      />,
    );

    expect(container.firstChild).toHaveClass("text-left", "custom-heading");
  });
});
