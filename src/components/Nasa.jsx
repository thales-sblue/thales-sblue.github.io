import React, { useState } from "react";

const APOD_API = "https://api.nasa.gov/planetary/apod";
const API_KEY = import.meta.env.VITE_NASA_API_KEY;

export default function Nasa() {
    const [date, setDate] = useState("");
    const [apod, setApod] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const fetchApod = async () => {
        if (!date) return setError("Selecione uma data");
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

    return (
        <section
            id="nasa"
            style={{
                backgroundImage: apod
                    ? `url(${apod.url})`
                    : `linear-gradient(to right, #0f0f1f, #180a1f)`,
            }}
            className="
        relative
        bg-cover bg-center
        before:absolute before:inset-0 before:bg-black/60
        overflow-hidden
      "
        >
            <div className="absolute inset-0 bg-gradient-to-r from-red-700/30 via-transparent to-black/80 mix-blend-overlay" />

            <div className="relative z-10 max-w-xl mx-auto py-24 px-4 text-white">
                <h2 className="text-3xl md:text-4xl font-heading text-center mb-6">
                    Já pensou em ver o universo no dia do seu aniversário?{' '}
                    <span className="inline-block animate-bounce">🔭</span>
                </h2>

                <div className="flex gap-2 justify-center mb-8">
                    <input
                        type="date"
                        max={new Date().toISOString().split("T")[0]}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="
              bg-black/50 border border-gray-600 rounded-lg
              px-3 py-2 text-white placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-red-500
            "
                    />
                    <button
                        onClick={fetchApod}
                        className="
              bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg
              font-semibold transition
            "
                    >
                        Buscar
                    </button>
                </div>

                {loading && <p className="text-center">Carregando...</p>}
                {error && <p className="text-red-400 text-center">{error}</p>}

                {apod && (
                    <div className="bg-black/70 rounded-xl p-6 space-y-4">
                        <h3 className="text-2xl font-semibold">{apod.title}</h3>
                        <div className="w-full aspect-video rounded-lg overflow-hidden border border-gray-700">
                            {apod.media_type === "video" ? (
                                <iframe
                                    src={apod.url}
                                    title={apod.title}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allowFullScreen
                                />
                            ) : (
                                <img
                                    src={apod.url}
                                    alt={apod.title}
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>
                        <p className="text-sm text-gray-300">{apod.date}</p>
                        <p className="text-gray-200">{apod.explanation}</p>
                    </div>
                )}
            </div>
        </section>
    );
}
