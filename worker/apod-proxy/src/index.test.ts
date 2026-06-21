import { beforeEach, describe, expect, it, vi } from "vitest";
import { handleRequest, InMemoryRateLimiter, type Env } from "./index";

const ALLOWED_ORIGIN = "https://thales-sblue.github.io";
const FIXED_NOW = new Date("2026-06-21T12:00:00Z");
const VALID_PAYLOAD = {
  title: "Earth",
  date: "2001-07-04",
  explanation: "Blue marble",
  url: "https://images.example.com/earth.jpg",
  media_type: "image",
  service_version: "ignored",
};

class MemoryCache implements Pick<Cache, "match" | "put"> {
  private readonly entries = new Map<string, Response>();

  async match(request: RequestInfo): Promise<Response | undefined> {
    const key = request instanceof Request ? request.url : String(request);
    return this.entries.get(key)?.clone();
  }

  async put(request: RequestInfo, response: Response): Promise<void> {
    const key = request instanceof Request ? request.url : String(request);
    this.entries.set(key, response.clone());
  }
}

function makeRequest(
  query = "?date=2001-07-04",
  init: RequestInit = {},
): Request {
  const headers = new Headers(init.headers);

  if (!headers.has("Origin")) {
    headers.set("Origin", ALLOWED_ORIGIN);
  }

  headers.set("CF-Connecting-IP", "203.0.113.10");

  return new Request(`https://proxy.example/${query}`, { ...init, headers });
}

describe("APOD proxy Worker", () => {
  let cache: MemoryCache;
  let fetchMock: ReturnType<typeof vi.fn>;
  let waitUntilPromises: Promise<unknown>[];
  let env: Env;

  beforeEach(() => {
    cache = new MemoryCache();
    fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(VALID_PAYLOAD), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );
    waitUntilPromises = [];
    env = { NASA_API_KEY: "worker-secret" };
  });

  async function dispatch(
    request: Request,
    rateLimiter = new InMemoryRateLimiter(),
  ): Promise<Response> {
    return handleRequest(
      request,
      env,
      {
        waitUntil(promise) {
          waitUntilPromises.push(promise);
        },
      },
      {
        cache,
        fetch: fetchMock as typeof fetch,
        now: () => FIXED_NOW,
        rateLimiter,
      },
    );
  }

  it("accepts a valid date and returns only safe APOD fields", async () => {
    const response = await dispatch(makeRequest());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      title: "Earth",
      date: "2001-07-04",
      explanation: "Blue marble",
      url: "https://images.example.com/earth.jpg",
      media_type: "image",
    });
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=86400");
    expect(fetchMock).toHaveBeenCalledOnce();

    const upstreamUrl = new URL(String(fetchMock.mock.calls[0][0]));
    expect(upstreamUrl.origin + upstreamUrl.pathname).toBe(
      "https://api.nasa.gov/planetary/apod",
    );
    expect([...upstreamUrl.searchParams.keys()].sort()).toEqual([
      "api_key",
      "date",
    ]);
    expect(upstreamUrl.searchParams.get("api_key")).toBe("worker-secret");
    expect(upstreamUrl.searchParams.get("date")).toBe("2001-07-04");
  });

  it.each([
    "?date=not-a-date",
    "?date=2026-02-30",
    "?api_key=bad&date=2001-07-04",
  ])("rejects invalid input %s", async (query) => {
    expect((await dispatch(makeRequest(query))).status).toBe(400);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("rejects a date before APOD started", async () => {
    expect((await dispatch(makeRequest("?date=1995-06-15"))).status).toBe(400);
  });

  it("rejects a future date", async () => {
    expect((await dispatch(makeRequest("?date=2026-06-22"))).status).toBe(400);
  });

  it("rejects a missing origin", async () => {
    const request = makeRequest();
    request.headers.delete("Origin");

    expect((await dispatch(request)).status).toBe(403);
  });

  it("rejects a blocked origin", async () => {
    expect(
      (
        await dispatch(
          makeRequest(undefined, {
            headers: { Origin: "https://evil.example" },
          }),
        )
      ).status,
    ).toBe(403);
  });

  it("echoes an allowed origin in CORS headers", async () => {
    const response = await dispatch(makeRequest());

    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      ALLOWED_ORIGIN,
    );
    expect(response.headers.get("Access-Control-Allow-Origin")).not.toBe("*");
  });

  it("rejects invalid methods", async () => {
    const response = await dispatch(makeRequest(undefined, { method: "POST" }));

    expect(response.status).toBe(405);
    expect(response.headers.get("Allow")).toBe("GET, OPTIONS");
  });

  it("responds to OPTIONS with the required CORS policy", async () => {
    const response = await dispatch(makeRequest("", { method: "OPTIONS" }));

    expect(response.status).toBe(204);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      ALLOWED_ORIGIN,
    );
    expect(response.headers.get("Access-Control-Allow-Methods")).toBe(
      "GET, OPTIONS",
    );
    expect(response.headers.get("Access-Control-Allow-Headers")).toBe(
      "Content-Type",
    );
  });

  it("serves a cached date without calling NASA again", async () => {
    await dispatch(makeRequest());
    await Promise.all(waitUntilPromises);
    fetchMock.mockClear();

    const response = await dispatch(
      makeRequest(undefined, { headers: { Origin: "http://localhost:5173" } }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Access-Control-Allow-Origin")).toBe(
      "http://localhost:5173",
    );
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("returns 429 when the local best-effort limit is exceeded", async () => {
    const limiter = new InMemoryRateLimiter(1, 600_000);

    expect((await dispatch(makeRequest(), limiter)).status).toBe(200);
    expect((await dispatch(makeRequest(), limiter)).status).toBe(429);
  });

  it.each([403, 500])("maps NASA HTTP %s to a safe 502", async (status) => {
    fetchMock.mockResolvedValue(new Response("upstream details", { status }));

    const response = await dispatch(makeRequest());
    const body = await response.text();

    expect(response.status).toBe(502);
    expect(body).toBe('{"error":"NASA upstream unavailable."}');
    expect(body).not.toContain("worker-secret");
  });

  it("returns 500 when the Worker secret is missing", async () => {
    env.NASA_API_KEY = "";

    const response = await dispatch(makeRequest());

    expect(response.status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
    expect(await response.json()).toEqual({
      error: "Worker configuration unavailable.",
    });
  });
});
