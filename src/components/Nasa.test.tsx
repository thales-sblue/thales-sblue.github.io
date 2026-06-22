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

  it("starts with the stable example date, limits, and guidance", () => {
    render(<Nasa />);

    const input = screen.getByTestId("apod-date-input");
    expect(input).toHaveValue("2021-08-22");
    expect(input).toHaveAttribute("min", "1995-06-16");
    expect(input).toHaveAttribute(
      "max",
      new Date().toISOString().split("T")[0],
    );
    expect(
      screen.getByText(
        "Escolha uma data entre 16/06/1995 e hoje. Algumas datas podem não ter imagem disponível na NASA.",
      ),
    ).toBeInTheDocument();
  });

  it("does not render the example date buttons", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 502 });
    render(<Nasa />);

    expect(
      screen.queryByRole("button", { name: "Testar data exemplo" }),
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    await screen.findByRole("button", { name: "Tentar novamente" });
    expect(
      screen.queryByRole("button", { name: "Usar data exemplo" }),
    ).not.toBeInTheDocument();
  });

  it("allows the user to change the date manually", () => {
    render(<Nasa />);

    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });

    expect(screen.getByTestId("apod-date-input")).toHaveValue("2001-07-04");
  });

  it("shows a safe configuration message and does not call fetch when the proxy URL is missing", () => {
    vi.stubEnv("VITE_APOD_PROXY_URL", "");
    render(<Nasa />);

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

  it("renders image APOD media normally", async () => {
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

    const image = await screen.findByRole("img", { name: "Earth" });
    expect(image).toHaveAttribute(
      "src",
      "https://images.example.com/earth.jpg",
    );
  });

  it.each([
    [
      400,
      "A data selecionada não pôde ser consultada. Verifique a data e tente novamente.",
    ],
    [403, "Esta origem não está autorizada a consultar o proxy da NASA."],
    [
      429,
      "Muitas consultas em pouco tempo. Aguarde alguns minutos e tente novamente.",
    ],
    [
      502,
      "A NASA não retornou uma imagem para essa data. Tente uma data mais antiga ou escolha outro dia.",
    ],
    [
      504,
      "A NASA demorou para responder. Tente novamente ou escolha uma data mais antiga.",
    ],
  ])("shows the mapped message for HTTP %i", async (status, message) => {
    fetchMock.mockResolvedValue({
      ok: false,
      status,
    });

    render(<Nasa />);
    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(await screen.findByText(message)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Tentar novamente" }),
    ).toBeInTheDocument();
  });

  it("shows the proxy connection message for a network failure", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));
    render(<Nasa />);

    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(
      await screen.findByText(
        "Falha de conexão ao consultar o proxy da NASA. Verifique sua internet e tente novamente.",
      ),
    ).toBeInTheDocument();
  });

  it("retries the last selected date", async () => {
    fetchMock.mockResolvedValue({ ok: false, status: 502 });
    render(<Nasa />);

    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2001-07-04" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));
    fireEvent.click(
      await screen.findByRole("button", { name: "Tentar novamente" }),
    );

    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(fetchMock.mock.calls[1][0]).toBe(fetchMock.mock.calls[0][0]);
    expect(screen.getByTestId("apod-date-input")).toHaveValue("2001-07-04");
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
        "A resposta recebida veio em um formato inesperado. Tente outra data.",
      ),
    ).toBeInTheDocument();
  });

  it("renders video APOD as a safe external-link fallback", async () => {
    const rawVideoUrl = "https://www.youtube.com/embed/ACaPI2M4GyU?rel=0";
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        title: "Earth's Recent Climate Spiral",
        date: "2022-08-22",
        explanation: "A visualization of Earth's changing climate.",
        url: rawVideoUrl,
        media_type: "video",
      }),
    });

    const { container } = render(<Nasa />);
    fireEvent.change(screen.getByTestId("apod-date-input"), {
      target: { value: "2022-08-22" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Buscar" }));

    expect(
      await screen.findByText(
        "Este conteúdo em vídeo está disponível apenas no site original.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Alguns vídeos não permitem reprodução incorporada, por isso abrimos em uma nova aba.",
      ),
    ).toBeInTheDocument();

    const link = screen.getByRole("link", {
      name: "Assistir no site original",
    });
    expect(link).toHaveAttribute(
      "href",
      "https://www.youtube.com/watch?v=ACaPI2M4GyU",
    );
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
    expect(link).toHaveAttribute("rel", expect.stringContaining("noreferrer"));
    expect(container.querySelector("iframe")).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 3,
        name: "Earth's Recent Climate Spiral",
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("2022-08-22")).toBeInTheDocument();
    expect(
      screen.getByText("A visualization of Earth's changing climate."),
    ).toBeInTheDocument();

    const requestUrl = String(fetchMock.mock.calls[0][0]);
    expect(requestUrl).not.toContain("api.nasa.gov");
    expect(requestUrl).not.toContain("api_key");
  });

  it("still blocks unsafe video URLs", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        title: "Launch",
        date: "2001-07-04",
        explanation: "Video",
        url: "javascript:alert(1)",
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
