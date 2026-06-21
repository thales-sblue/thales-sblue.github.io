import { describe, expect, it } from "vitest";
import {
  buildApodProxyUrl,
  getApodDateValidationMessage,
  getApodErrorMessage,
  isSafeApodImageUrl,
  isSafeApodVideoUrl,
  isValidApodDate,
  parseApodResponse,
} from "./apod";

describe("apod helpers", () => {
  const today = new Date(2026, 5, 21);

  it("rejects an empty date", () => {
    expect(getApodDateValidationMessage("", today)).toBe("Selecione uma data.");
  });

  it("rejects an invalid date string", () => {
    expect(getApodDateValidationMessage("2026-02-30", today)).toBe(
      "Digite uma data válida no formato AAAA-MM-DD.",
    );
  });

  it("rejects a future date", () => {
    expect(getApodDateValidationMessage("2026-06-22", today)).toBe(
      "Infelizmente, ainda não conseguimos captar imagens do futuro.",
    );
  });

  it("rejects a date before the APOD start", () => {
    expect(getApodDateValidationMessage("1995-06-15", today)).toBe(
      "Não há imagens antes de 16 de junho de 1995.",
    );
  });

  it("accepts a valid APOD date", () => {
    expect(isValidApodDate("2001-07-04", today)).toBe(true);
  });

  it("builds a proxy URL containing only the selected date", () => {
    const url = buildApodProxyUrl(
      "https://apod-proxy.example.workers.dev/?api_key=discarded#fragment",
      "2001-07-04",
    );

    expect(url).toBe("https://apod-proxy.example.workers.dev/?date=2001-07-04");
    expect(url).not.toContain("api_key");
    expect(url).not.toContain("api.nasa.gov");
  });

  it("parses a valid APOD image response", () => {
    expect(
      parseApodResponse({
        title: "Earth",
        date: "2001-07-04",
        explanation: "Blue marble",
        url: "https://images.example.com/earth.jpg",
        media_type: "image",
      }),
    ).toEqual({
      ok: true,
      data: {
        title: "Earth",
        date: "2001-07-04",
        explanation: "Blue marble",
        url: "https://images.example.com/earth.jpg",
        media_type: "image",
      },
    });
  });

  it("parses a valid APOD video response", () => {
    expect(
      parseApodResponse({
        title: "Launch",
        date: "2001-07-04",
        explanation: "Video",
        url: "https://www.youtube.com/embed/example",
        media_type: "video",
      }),
    ).toEqual({
      ok: true,
      data: {
        title: "Launch",
        date: "2001-07-04",
        explanation: "Video",
        url: "https://www.youtube.com/embed/example",
        media_type: "video",
      },
    });
  });

  it("rejects malformed responses", () => {
    expect(
      parseApodResponse({
        title: "Earth",
        date: "2001-07-04",
        explanation: "Blue marble",
        media_type: "image",
      }),
    ).toEqual({ ok: false, code: "invalid_response" });
  });

  it("rejects unsupported media types", () => {
    expect(
      parseApodResponse({
        title: "Sound",
        date: "2001-07-04",
        explanation: "Audio",
        url: "https://example.com/audio.mp3",
        media_type: "audio",
      }),
    ).toEqual({ ok: false, code: "unsupported_media" });
  });

  it("rejects unsafe image URLs", () => {
    expect(isSafeApodImageUrl("javascript:alert(1)")).toBe(false);
    expect(isSafeApodImageUrl("http://example.com/image.jpg")).toBe(false);
    expect(isSafeApodImageUrl("//example.com/image.jpg")).toBe(false);
  });

  it("accepts safe HTTPS image URLs", () => {
    expect(isSafeApodImageUrl("https://example.com/image.jpg")).toBe(true);
  });

  it("accepts known video hosts and rejects unknown ones", () => {
    expect(isSafeApodVideoUrl("https://www.youtube.com/embed/example")).toBe(
      true,
    );
    expect(isSafeApodVideoUrl("https://player.vimeo.com/video/example")).toBe(
      true,
    );
    expect(isSafeApodVideoUrl("https://example.com/embed/example")).toBe(false);
  });

  it("maps HTTP statuses and fallback codes to safe messages", () => {
    expect(getApodErrorMessage(400)).toBe(
      "A data selecionada não pôde ser consultada. Verifique a data e tente novamente.",
    );
    expect(getApodErrorMessage(403)).toBe(
      "Esta origem não está autorizada a consultar o proxy da NASA.",
    );
    expect(getApodErrorMessage(429)).toBe(
      "Muitas consultas em pouco tempo. Aguarde alguns minutos e tente novamente.",
    );
    expect(getApodErrorMessage(502)).toBe(
      "A NASA não retornou uma imagem para essa data. Tente uma data mais antiga ou escolha outro dia.",
    );
    expect(getApodErrorMessage(504)).toBe(
      "A NASA demorou para responder. Tente novamente ou escolha uma data mais antiga.",
    );
    expect(getApodErrorMessage(undefined, "network")).toBe(
      "Falha de conexão ao consultar o proxy da NASA. Verifique sua internet e tente novamente.",
    );
    expect(getApodErrorMessage(undefined, "missing_proxy_url")).toBe(
      "Configuração do proxy da NASA indisponível no momento.",
    );
    expect(getApodErrorMessage(undefined, "invalid_response")).toBe(
      "A resposta recebida veio em um formato inesperado. Tente outra data.",
    );
    expect(getApodErrorMessage(undefined, "unsafe_media_url")).toBe(
      "O conteúdo retornado pela NASA para essa data não é compatível para exibição aqui.",
    );
    expect(getApodErrorMessage(undefined, "unsupported_media")).toBe(
      "O conteúdo retornado pela NASA para essa data não é compatível para exibição aqui.",
    );
  });
});
