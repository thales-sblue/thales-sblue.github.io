import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Nasa from "./Nasa";

describe("Nasa", () => {
  let fetchMock: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("VITE_APOD_PROXY_URL", "https://apod-proxy.example.workers.dev");
    localStorage.clear();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.unstubAllEnvs();
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

  it("shows a safe configuration message and does not call fetch when the proxy URL is missing", () => {
    vi.stubEnv("VITE_APOD_PROXY_URL", "");
    render(<Nasa />);

    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Configuração do proxy da NASA indisponível no momento.",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("calls the proxy with only the selected date", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        title: "Earth",
        date: "2001-07-04",
        explanation: "Blue marble",
        url: "https://images.example.com/earth.jpg",
        media_type: "image",
      }),
    });

    render(<Nasa />);
    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    await screen.findByRole("heading", { level: 3, name: "Earth" });
    expect(fetchMock).toHaveBeenCalledOnce();

    const requestUrl = String(fetchMock.mock.calls[0][0]);
    expect(requestUrl).toBe(
      "https://apod-proxy.example.workers.dev/?date=2001-07-04",
    );
    expect(requestUrl).not.toContain("api_key");
    expect(requestUrl).not.toContain("api.nasa.gov");
  });

  it("avoids duplicate requests while a request is loading", () => {
    fetchMock.mockReturnValue(new Promise(() => undefined));

    render(<Nasa />);
    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });

    const button = screen.getByRole("button", { name: "Buscar" });
    fireEvent.click(button);
    fireEvent.click(button);

    expect(fetchMock).toHaveBeenCalledOnce();
    expect(
      screen.getByRole("button", { name: "Carregando..." }),
    ).toBeDisabled();
  });

  it("shows the NASA rate-limit message for HTTP 429", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 429,
    });

    render(<Nasa />);

    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(
      await screen.findByText(
        "Limite de consultas da NASA atingido. Tente novamente mais tarde.",
      ),
    ).toBeInTheDocument();
  });

  it("shows the NASA unavailable message for HTTP 500", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      status: 500,
    });

    render(<Nasa />);

    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(
      await screen.findByText(
        "A API da NASA está indisponível no momento. Tente novamente mais tarde.",
      ),
    ).toBeInTheDocument();
  });

  it("shows the invalid response message for malformed API payloads", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        title: "Earth",
        date: "2001-07-04",
      }),
    });

    render(<Nasa />);

    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(
      await screen.findByText(
        "A resposta da NASA veio em um formato inesperado. Tente outra data.",
      ),
    ).toBeInTheDocument();
  });

  it("does not render an iframe for an unsafe video URL", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        title: "Launch",
        date: "2001-07-04",
        explanation: "Video",
        url: "https://example.com/embed/video",
        media_type: "video",
      }),
    });

    const { container } = render(<Nasa />);

    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(
      await screen.findByText(
        "O conteúdo retornado pela NASA para essa data não é compatível para exibição aqui.",
      ),
    ).toBeInTheDocument();
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
  });
});
