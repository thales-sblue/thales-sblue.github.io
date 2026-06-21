export const APOD_API_URL = "https://api.nasa.gov/planetary/apod";
export const APOD_EARLIEST_DATE = "1995-06-16";

export type ApodMediaType = "image" | "video";

export type ApodResponse = {
  title: string;
  date: string;
  explanation: string;
  url: string;
  media_type: ApodMediaType;
};

type RawApodResponse = Record<keyof ApodResponse, string>;

export type ApodErrorCode =
  | "invalid_response"
  | "unsupported_media"
  | "unsafe_media_url"
  | "network"
  | "missing_api_key";

export type ApodResult =
  | { ok: true; data: ApodResponse }
  | { ok: false; code: ApodErrorCode };

const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const ALLOWED_VIDEO_HOSTS = new Set([
  "www.youtube.com",
  "youtube.com",
  "player.vimeo.com",
]);

type ParsedApodDate = {
  utcTime: number;
  year: number;
  month: number;
  day: number;
};

function parseApodDate(value: string): ParsedApodDate | null {
  const match = DATE_PATTERN.exec(value);

  if (!match) {
    return null;
  }

  const [, yearRaw, monthRaw, dayRaw] = match;
  const year = Number(yearRaw);
  const month = Number(monthRaw);
  const day = Number(dayRaw);
  const utcTime = Date.UTC(year, month - 1, day);
  const parsed = new Date(utcTime);

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return { utcTime, year, month, day };
}

function getTodayUtcTime(today: Date): number {
  return Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasRequiredString(
  value: Record<string, unknown>,
  key: keyof ApodResponse,
): boolean {
  return typeof value[key] === "string" && value[key].trim().length > 0;
}

function isRawApodResponse(value: unknown): value is RawApodResponse {
  if (!isRecord(value)) {
    return false;
  }

  return (
    hasRequiredString(value, "title") &&
    hasRequiredString(value, "date") &&
    hasRequiredString(value, "explanation") &&
    hasRequiredString(value, "url") &&
    hasRequiredString(value, "media_type")
  );
}

function isSafeHttpsUrl(url: string): URL | null {
  try {
    const parsed = new URL(url);

    if (parsed.protocol !== "https:") {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function isValidApodDate(date: string, today = new Date()): boolean {
  return getApodDateValidationMessage(date, today) === null;
}

export function getApodDateValidationMessage(
  date: string,
  today = new Date(),
): string | null {
  if (date.trim().length === 0) {
    return "Selecione uma data.";
  }

  const parsedDate = parseApodDate(date);

  if (!parsedDate) {
    return "Digite uma data válida no formato AAAA-MM-DD.";
  }

  const earliestDate = parseApodDate(APOD_EARLIEST_DATE);

  if (!earliestDate) {
    return "Configuração de data da NASA indisponível no momento.";
  }

  if (parsedDate.utcTime < earliestDate.utcTime) {
    return "Não há imagens antes de 16 de junho de 1995.";
  }

  if (parsedDate.utcTime > getTodayUtcTime(today)) {
    return "Infelizmente, ainda não conseguimos captar imagens do futuro.";
  }

  return null;
}

export function buildApodUrl(date: string, apiKey: string): string {
  const params = new URLSearchParams({
    api_key: apiKey,
    date,
  });

  return `${APOD_API_URL}?${params.toString()}`;
}

export function parseApodResponse(payload: unknown): ApodResult {
  if (!isRawApodResponse(payload)) {
    return { ok: false, code: "invalid_response" };
  }

  if (!parseApodDate(payload.date)) {
    return { ok: false, code: "invalid_response" };
  }

  if (payload.media_type !== "image" && payload.media_type !== "video") {
    return { ok: false, code: "unsupported_media" };
  }

  if (payload.media_type === "image" && !isSafeApodImageUrl(payload.url)) {
    return { ok: false, code: "unsafe_media_url" };
  }

  if (payload.media_type === "video" && !isSafeApodVideoUrl(payload.url)) {
    return { ok: false, code: "unsafe_media_url" };
  }

  return {
    ok: true,
    data: {
      title: payload.title,
      date: payload.date,
      explanation: payload.explanation,
      url: payload.url,
      media_type: payload.media_type,
    },
  };
}

export function getApodErrorMessage(
  status?: number,
  fallbackCode?: ApodErrorCode,
): string {
  if (fallbackCode === "missing_api_key") {
    return "Configuração da API da NASA indisponível no momento.";
  }

  if (fallbackCode === "network") {
    return "Falha de conexão ao consultar a NASA. Verifique sua internet e tente novamente.";
  }

  if (fallbackCode === "invalid_response") {
    return "A resposta da NASA veio em um formato inesperado. Tente outra data.";
  }

  if (
    fallbackCode === "unsupported_media" ||
    fallbackCode === "unsafe_media_url"
  ) {
    return "O conteúdo retornado pela NASA para essa data não é compatível para exibição aqui.";
  }

  if (status === 400) {
    return "A NASA não retornou uma imagem para essa data. Tente outra data.";
  }

  if (status === 403) {
    return "A API da NASA recusou a solicitação. Tente novamente mais tarde.";
  }

  if (status === 429) {
    return "Limite de consultas da NASA atingido. Tente novamente mais tarde.";
  }

  if (status !== undefined && status >= 500) {
    return "A API da NASA está indisponível no momento. Tente novamente mais tarde.";
  }

  return "Não conseguimos buscar a imagem.";
}

export function isSafeApodImageUrl(url: string): boolean {
  return isSafeHttpsUrl(url) !== null;
}

export function isSafeApodVideoUrl(url: string): boolean {
  const parsed = isSafeHttpsUrl(url);

  if (!parsed) {
    return false;
  }

  return ALLOWED_VIDEO_HOSTS.has(parsed.hostname);
}
