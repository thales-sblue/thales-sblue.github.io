export interface Env {
  NASA_API_KEY: string;
}

type SafeApodResponse = {
  title: string;
  date: string;
  explanation: string;
  url: string;
  media_type: string;
};

type RateLimitEntry = {
  count: number;
  windowStartedAt: number;
};

type WorkerDependencies = {
  cache: Pick<Cache, "match" | "put">;
  fetch: typeof fetch;
  now: () => Date;
  rateLimiter: InMemoryRateLimiter;
};

const ALLOWED_ORIGINS = new Set([
  "https://thales-sblue.github.io",
  "http://localhost:5173",
]);
const APOD_EARLIEST_DATE = "1995-06-16";
const APOD_API_URL = "https://api.nasa.gov/planetary/apod";
const CACHE_CONTROL = "public, max-age=86400";
const DATE_PATTERN = /^(\d{4})-(\d{2})-(\d{2})$/;
const RATE_LIMIT_MAX_REQUESTS = 20;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const UPSTREAM_TIMEOUT_MS = 8_000;

export class InMemoryRateLimiter {
  private readonly entries = new Map<string, RateLimitEntry>();

  constructor(
    private readonly maxRequests = RATE_LIMIT_MAX_REQUESTS,
    private readonly windowMs = RATE_LIMIT_WINDOW_MS,
  ) {}

  allows(key: string, now: number): boolean {
    const entry = this.entries.get(key);

    if (!entry || now - entry.windowStartedAt >= this.windowMs) {
      this.entries.set(key, { count: 1, windowStartedAt: now });
      return true;
    }

    if (entry.count >= this.maxRequests) {
      return false;
    }

    entry.count += 1;
    return true;
  }
}

const sharedRateLimiter = new InMemoryRateLimiter();

function corsHeaders(origin: string): Record<string, string> {
  return {
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET, OPTIONS",
    "Access-Control-Allow-Origin": origin,
    Vary: "Origin",
  };
}

function jsonResponse(
  status: number,
  body: unknown,
  origin?: string,
  extraHeaders: Record<string, string> = {},
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      ...(origin ? corsHeaders(origin) : {}),
      ...extraHeaders,
    },
  });
}

function parseDate(value: string): number | null {
  const match = DATE_PATTERN.exec(value);

  if (!match) {
    return null;
  }

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const timestamp = Date.UTC(year, month - 1, day);
  const parsed = new Date(timestamp);

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  return timestamp;
}

function todayUtc(now: Date): number {
  return Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
}

function isValidDate(value: string, now: Date): boolean {
  const timestamp = parseDate(value);
  const earliestTimestamp = parseDate(APOD_EARLIEST_DATE);

  return (
    timestamp !== null &&
    earliestTimestamp !== null &&
    timestamp >= earliestTimestamp &&
    timestamp <= todayUtc(now)
  );
}

function readDate(url: URL): string | null {
  const keys = [...url.searchParams.keys()];

  if (keys.length !== 1 || keys[0] !== "date") {
    return null;
  }

  const values = url.searchParams.getAll("date");
  return values.length === 1 ? values[0] : null;
}

function cacheKey(date: string): Request {
  return new Request(`https://apod-cache.internal/?date=${date}`);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function safeApodPayload(value: unknown): SafeApodResponse | null {
  if (!isRecord(value)) {
    return null;
  }

  const requiredFields = [
    "title",
    "date",
    "explanation",
    "url",
    "media_type",
  ] as const;

  if (
    requiredFields.some(
      (field) => typeof value[field] !== "string" || value[field].length === 0,
    )
  ) {
    return null;
  }

  return {
    title: value.title as string,
    date: value.date as string,
    explanation: value.explanation as string,
    url: value.url as string,
    media_type: value.media_type as string,
  };
}

function withCors(response: Response, origin: string): Response {
  const headers = new Headers(response.headers);

  for (const [name, value] of Object.entries(corsHeaders(origin))) {
    headers.set(name, value);
  }

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function fetchWithTimeout(
  input: RequestInfo | URL,
  init: RequestInit,
  timeoutMs: number,
  fetcher: typeof fetch,
): Promise<Response> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetcher(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function handleRequest(
  request: Request,
  env: Env,
  context: Pick<ExecutionContext, "waitUntil">,
  dependencies: WorkerDependencies,
): Promise<Response> {
  const origin = request.headers.get("Origin");

  if (!origin || !ALLOWED_ORIGINS.has(origin)) {
    return jsonResponse(403, { error: "Origin not allowed." });
  }

  if (request.method !== "GET" && request.method !== "OPTIONS") {
    return jsonResponse(405, { error: "Method not allowed." }, origin, {
      Allow: "GET, OPTIONS",
    });
  }

  if (request.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders(origin) });
  }

  const url = new URL(request.url);
  const date = readDate(url);
  const now = dependencies.now();

  if (!date || !isValidDate(date, now)) {
    return jsonResponse(400, { error: "Invalid APOD date." }, origin);
  }

  const clientIp = request.headers.get("CF-Connecting-IP") ?? "unknown";
  const clientKey = `${clientIp}|${origin}`;

  if (!dependencies.rateLimiter.allows(clientKey, now.getTime())) {
    return jsonResponse(429, { error: "Too many requests." }, origin);
  }

  const key = cacheKey(date);
  const cachedResponse = await dependencies.cache.match(key);

  if (cachedResponse) {
    return withCors(cachedResponse, origin);
  }

  if (!env.NASA_API_KEY || env.NASA_API_KEY.trim().length === 0) {
    return jsonResponse(
      500,
      { error: "Worker configuration unavailable." },
      origin,
    );
  }

  const nasaUrl = new URL(APOD_API_URL);
  nasaUrl.search = new URLSearchParams({
    api_key: env.NASA_API_KEY,
    date,
  }).toString();

  let upstreamResponse: Response;

  try {
    upstreamResponse = await fetchWithTimeout(
      nasaUrl.toString(),
      {},
      UPSTREAM_TIMEOUT_MS,
      dependencies.fetch,
    );
  } catch (error) {
    const status =
      error instanceof DOMException && error.name === "AbortError" ? 504 : 502;
    const message =
      status === 504
        ? "NASA upstream timed out."
        : "NASA upstream request failed.";
    return jsonResponse(status, { error: message }, origin);
  }

  if (!upstreamResponse.ok) {
    return jsonResponse(502, { error: "NASA upstream unavailable." }, origin);
  }

  let payload: unknown;

  try {
    payload = await upstreamResponse.json();
  } catch {
    return jsonResponse(
      502,
      { error: "NASA upstream returned invalid data." },
      origin,
    );
  }

  const safePayload = safeApodPayload(payload);

  if (!safePayload) {
    return jsonResponse(
      502,
      { error: "NASA upstream returned invalid data." },
      origin,
    );
  }

  const cacheableResponse = jsonResponse(200, safePayload, undefined, {
    "Cache-Control": CACHE_CONTROL,
  });
  context.waitUntil(dependencies.cache.put(key, cacheableResponse.clone()));

  return withCors(cacheableResponse, origin);
}

export default {
  fetch(request, env, context) {
    return handleRequest(request, env, context, {
      cache: caches.default,
      fetch,
      now: () => new Date(),
      rateLimiter: sharedRateLimiter,
    });
  },
} satisfies ExportedHandler<Env>;
