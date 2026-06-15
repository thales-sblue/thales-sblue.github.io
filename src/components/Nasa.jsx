import { useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import Button from "./ui/Button";

const APOD_API = "https://api.nasa.gov/planetary/apod";
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export default function Nasa() {
  const [date, setDate] = useState("");
  const [apod, setApod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchApod = async () => {
    const today = new Date();
    const selectedDate = new Date(date);
    const earliestDate = new Date("1995-06-16");

    if (!date) {
      return setError("Selecione uma data.");
    }

    if (selectedDate > today) {
      return setError(
        "Infelizmente, ainda não conseguimos captar imagens do futuro.",
      );
    }

    if (selectedDate < earliestDate) {
      return setError("Não há imagens antes de 16 de junho de 1995.");
    }

    const requests = JSON.parse(localStorage.getItem("apod_requests") || "[]");
    const now = new Date();

    const lastHour = new Date(now.getTime() - 60 * 60 * 1000);
    const updatedRequests = requests.filter((r) => new Date(r) > lastHour);
    if (updatedRequests.length >= 30) {
      return setError("Limite horário atingido. Tente novamente em breve.");
    }

    const todayStr = now.toISOString().split("T")[0];
    const dailyRequests = updatedRequests.filter((r) => r.startsWith(todayStr));
    if (dailyRequests.length >= 50) {
      return setError("Limite diário atingido. Tente novamente amanhã.");
    }

    updatedRequests.push(now.toISOString());
    localStorage.setItem("apod_requests", JSON.stringify(updatedRequests));

    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${APOD_API}?api_key=${API_KEY}&date=${date}`);
      if (!res.ok) throw new Error();
      setApod(await res.json());
    } catch {
      setError("Não conseguimos buscar a imagem.");
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage =
    apod?.media_type === "image" && apod?.url
      ? `url(${apod.url})`
      : `url('https://images-assets.nasa.gov/image/PIA18033/PIA18033~orig.jpg')`;

  return (
    <section
      id="nasa"
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
            onChange={(e) => setDate(e.target.value)}
            className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-2.5 text-white backdrop-blur-sm transition focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/50 sm:max-w-[180px]"
          />
          <Button
            onClick={fetchApod}
            className="w-full disabled:opacity-50 sm:w-auto"
            disabled={loading}
          >
            {loading ? "Carregando…" : "Buscar"}
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
