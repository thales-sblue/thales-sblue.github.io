import { useState } from "react";
import { sectionIds } from "../data/site";
import {
  buildApodUrl,
  getApodDateValidationMessage,
  getApodErrorMessage,
  type ApodResponse,
  parseApodResponse,
} from "../utils/apod";
import Button from "./ui/Button";
import SectionHeading from "./ui/SectionHeading";

const APOD_REQUEST_STORAGE_KEY = "apod_requests";
const FALLBACK_BACKGROUND_IMAGE =
  "url('https://images-assets.nasa.gov/image/PIA18033/PIA18033~orig.jpg')";

type StoredRequestTimestamp = string;

function readStoredRequestTimestamps(
  rawValue: string | null,
): StoredRequestTimestamp[] {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is StoredRequestTimestamp => {
      if (typeof value !== "string") {
        return false;
      }

      return !Number.isNaN(Date.parse(value));
    });
  } catch {
    return [];
  }
}

export default function Nasa() {
  const [date, setDate] = useState("");
  const [apod, setApod] = useState<ApodResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApod = async () => {
    const apiKey = import.meta.env.VITE_NASA_API_KEY;
    const dateValidationMessage = getApodDateValidationMessage(date);

    if (dateValidationMessage) {
      setApod(null);
      return setError(dateValidationMessage);
    }

    if (!apiKey || apiKey.trim().length === 0) {
      setApod(null);
      return setError(getApodErrorMessage(undefined, "missing_api_key"));
    }

    const requests = readStoredRequestTimestamps(
      localStorage.getItem(APOD_REQUEST_STORAGE_KEY),
    );
    const now = new Date();
    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);
    const updatedRequests = requests.filter((request) => {
      return new Date(request) > lastHour;
    });

    if (updatedRequests.length >= 30) {
      setApod(null);
      return setError("Limite horário atingido. Tente novamente em breve.");
    }

    const todayString = now.toISOString().split("T")[0];
    const dailyRequests = requests.filter((request) => {
      return request.startsWith(todayString);
    });

    if (dailyRequests.length >= 50) {
      setApod(null);
      return setError("Limite diário atingido. Tente novamente amanhã.");
    }

    updatedRequests.push(now.toISOString());
    localStorage.setItem(
      APOD_REQUEST_STORAGE_KEY,
      JSON.stringify(updatedRequests),
    );

    setError("");
    setLoading(true);

    try {
      const response = await fetch(buildApodUrl(date, apiKey));

      if (!response.ok) {
        setApod(null);
        setError(getApodErrorMessage(response.status));
        return;
      }

      const payload: unknown = await response.json();
      const parsedApod = parseApodResponse(payload);

      if (!parsedApod.ok) {
        setApod(null);
        setError(getApodErrorMessage(undefined, parsedApod.code));
        return;
      }

      setApod(parsedApod.data);
    } catch {
      setApod(null);
      setError(getApodErrorMessage(undefined, "network"));
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage =
    apod?.media_type === "image"
      ? `url(${apod.url})`
      : FALLBACK_BACKGROUND_IMAGE;

  return (
    <section
      id={sectionIds.nasa}
      style={{ backgroundImage }}
      className="bg-nasa-parallax relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-cover bg-center bg-no-repeat py-section"
    >
      <div className="absolute inset-0 bg-black/50" aria-hidden />

      <div className="section-container relative z-10 w-full max-w-3xl text-center">
        <SectionHeading
          title="Universo no seu dia"
          subtitle="Já pensou em ver o céu no dia do seu aniversário?"
        />

        <div className="mx-auto mb-8 flex max-w-xs flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            value={date}
            onChange={(event) => setDate(event.target.value)}
            aria-label="Selecione uma data"
            data-testid="apod-date-input"
            className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-white backdrop-blur-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 sm:max-w-[180px]"
          />
          <Button
            onClick={fetchApod}
            className="w-full disabled:opacity-50 sm:w-auto"
            disabled={loading}
          >
            {loading ? "Carregando..." : "Buscar"}
          </Button>
        </div>

        {error && (
          <p className="mb-4 text-sm text-red-400" role="alert">
            {error}
          </p>
        )}

        {apod && (
          <div className="mt-8 rounded-card border border-white/10 bg-surface-elevated/80 p-6 text-left shadow-2xl backdrop-blur-xl md:p-8">
            <h3 className="text-2xl font-semibold tracking-tight">
              {apod.title}
            </h3>

            <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-white/10">
              {apod.media_type === "video" ? (
                <iframe
                  src={apod.url}
                  title={apod.title}
                  className="h-full w-full"
                  frameBorder="0"
                  sandbox="allow-scripts allow-same-origin allow-presentation"
                  referrerPolicy="no-referrer"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={apod.url}
                  alt={apod.title}
                  className="h-full w-full object-cover"
                />
              )}
            </div>

            <p className="mt-4 text-sm text-muted">{apod.date}</p>
            <p className="mt-3 leading-relaxed text-white/90">
              {apod.explanation}
            </p>
          </div>
        )}

        <p className="mt-8 text-sm italic text-muted">
          Imagens fornecidas pela NASA via API Astronomy Picture of the Day
          (APOD).
        </p>
      </div>
    </section>
  );
}
