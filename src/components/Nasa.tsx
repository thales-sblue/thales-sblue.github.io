import { useRef, useState } from "react";
import { sectionIds } from "../data/site";
import {
  APOD_EARLIEST_DATE,
  buildApodProxyUrl,
  getApodDateValidationMessage,
  getApodErrorMessage,
  getExternalVideoUrl,
  type ApodResponse,
  parseApodResponse,
} from "../utils/apod";
import Button from "./ui/Button";
import SectionHeading from "./ui/SectionHeading";

const APOD_REQUEST_STORAGE_KEY = "apod_requests";
const APOD_EXAMPLE_DATE = "2021-08-22";
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
  const [date, setDate] = useState(APOD_EXAMPLE_DATE);
  const [apod, setApod] = useState<ApodResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastRequestedDate, setLastRequestedDate] = useState("");
  const requestInFlight = useRef(false);
  const today = new Date().toISOString().split("T")[0];

  const fetchApod = async (requestedDate = date) => {
    if (requestInFlight.current) {
      return;
    }

    const proxyUrl = import.meta.env.VITE_APOD_PROXY_URL;
    const dateValidationMessage = getApodDateValidationMessage(requestedDate);

    if (dateValidationMessage) {
      setApod(null);
      return setError(dateValidationMessage);
    }

    if (!proxyUrl || proxyUrl.trim().length === 0) {
      setApod(null);
      return setError(getApodErrorMessage(undefined, "missing_proxy_url"));
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
    setLastRequestedDate(requestedDate);
    requestInFlight.current = true;
    setLoading(true);

    try {
      let response: Response;

      try {
        response = await fetch(buildApodProxyUrl(proxyUrl, requestedDate));
      } catch {
        setApod(null);
        setError(getApodErrorMessage(undefined, "network"));
        return;
      }

      if (!response.ok) {
        setApod(null);
        setError(getApodErrorMessage(response.status));
        return;
      }

      let payload: unknown;

      try {
        payload = await response.json();
      } catch {
        setApod(null);
        setError(getApodErrorMessage(undefined, "invalid_response"));
        return;
      }

      const parsedApod = parseApodResponse(payload);

      if (!parsedApod.ok) {
        setApod(null);
        setError(getApodErrorMessage(undefined, parsedApod.code));
        return;
      }

      setApod(parsedApod.data);
    } finally {
      requestInFlight.current = false;
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

        <div className="mx-auto mb-8 max-w-md">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <input
              type="date"
              min={APOD_EARLIEST_DATE}
              max={today}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              aria-label="Selecione uma data"
              data-testid="apod-date-input"
              className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-white backdrop-blur-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 sm:max-w-[180px]"
            />
            <Button
              onClick={() => void fetchApod()}
              className="w-full disabled:opacity-50 sm:w-auto"
              disabled={loading}
            >
              {loading ? "Carregando..." : "Buscar"}
            </Button>
          </div>
          <p className="mt-3 text-xs text-white/60">
            Escolha uma data entre 16/06/1995 e hoje. Algumas datas podem não
            ter imagem disponível na NASA.
          </p>
        </div>

        {error && (
          <div className="mb-4">
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
            {lastRequestedDate && (
              <div className="mt-3 flex flex-wrap justify-center gap-3">
                <button
                  type="button"
                  onClick={() => void fetchApod(lastRequestedDate)}
                  disabled={loading}
                  className="text-sm font-medium text-white underline-offset-4 hover:underline disabled:opacity-50"
                >
                  Tentar novamente
                </button>
              </div>
            )}
          </div>
        )}

        {loading && (
          <p className="mb-4 text-sm text-white/70" role="status">
            Consultando imagem da NASA...
          </p>
        )}

        {apod && (
          <div className="mt-8 rounded-card border border-white/10 bg-surface-elevated/80 p-6 text-left shadow-2xl backdrop-blur-xl md:p-8">
            <h3 className="text-2xl font-semibold tracking-tight">
              {apod.title}
            </h3>

            <div className="mt-4 aspect-video overflow-hidden rounded-xl border border-white/10">
              {apod.media_type === "video" ? (
                <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-surface-muted/80 p-6 text-center">
                  <div>
                    <p className="text-lg font-medium text-white">
                      Este conteúdo em vídeo está disponível apenas no site
                      original.
                    </p>
                    <p className="mt-2 text-sm text-white/70">
                      Alguns vídeos não permitem reprodução incorporada, por
                      isso abrimos em uma nova aba.
                    </p>
                  </div>
                  <Button
                    href={getExternalVideoUrl(apod.url)}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Assistir no site original
                  </Button>
                </div>
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
