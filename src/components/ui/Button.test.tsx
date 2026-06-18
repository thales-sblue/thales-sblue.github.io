import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Button from "./Button";

describe("Button", () => {
  it("renders as a link when href is provided", () => {
    render(<Button href="https://example.com">Abrir</Button>);

    expect(screen.getByRole("link", { name: "Abrir" })).toHaveAttribute(
      "href",
      "https://example.com",
    );
  });

  it("renders as a button when href is not provided", () => {
    render(<Button>Buscar</Button>);

    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  it("applies type button in button mode and forwards disabled", () => {
    render(<Button disabled>Enviar</Button>);

    expect(screen.getByRole("button", { name: "Enviar" })).toHaveAttribute(
      "type",
      "button",
    );
    expect(screen.getByRole("button", { name: "Enviar" })).toBeDisabled();
  });

  it("preserves children content", () => {
    render(<Button href="#projects">Ver projetos</Button>);

    expect(screen.getByText("Ver projetos")).toBeInTheDocument();
  });
});
