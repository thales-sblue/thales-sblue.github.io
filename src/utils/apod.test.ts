import { describe, expect, it } from "vitest";
import {
  APOD_API_URL,
  buildApodUrl,
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

  it("builds a request URL with encoded params", () => {
    expect(buildApodUrl("2001-07-04", "demo key")).toBe(
      `${APOD_API_URL}?api_key=demo+key&date=2001-07-04`,
    );
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
      "A NASA não retornou uma imagem para essa data. Tente outra data.",
    );
    expect(getApodErrorMessage(403)).toBe(
      "A API da NASA recusou a solicitação. Tente novamente mais tarde.",
    );
    expect(getApodErrorMessage(429)).toBe(
      "Limite de consultas da NASA atingido. Tente novamente mais tarde.",
    );
    expect(getApodErrorMessage(503)).toBe(
      "A API da NASA está indisponível no momento. Tente novamente mais tarde.",
    );
    expect(getApodErrorMessage(undefined, "network")).toBe(
      "Falha de conexão ao consultar a NASA. Verifique sua internet e tente novamente.",
    );
  });
});
