import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Nasa from "./Nasa";

describe("Nasa", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("renders the section title, date input, and search button", () => {
    const { container } = render(<Nasa />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Universo no seu dia" }),
    ).toBeInTheDocument();
    expect(container.querySelector('input[type="date"]')).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Buscar" })).toBeInTheDocument();
  });

  it("shows a validation message and does not call the API when search is clicked without a date", () => {
    render(<Nasa />);

    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(screen.getByRole("alert")).toHaveTextContent("Selecione uma data.");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
