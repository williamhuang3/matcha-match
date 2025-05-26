"use client";

import {
  useMemo,
  useEffect,
  useState,
  useCallback,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import type { Matcha } from "@/types/Matcha";
import { getMatchaArchetype, getFavoriteRegion } from "@/lib/analyzeTaste";

/* ------------------  static logo map  ------------------ */
const brandLogos: Record<string, string> = {
  Ippodo: "/logos/ippodo.png",
  "Marukyu Koyamaen": "/logos/marukyu.png",
  "Tokichi Nakamura": "/logos/tokichi.jpg",
  Gokago: "/logos/gokago.jpeg",
  Matchaful: "/logos/matchaful.png",
  Kettl: "/logos/kettl.png",
  "Horii Shichimeien": "/logos/horii.png",
  "Rockys Matcha": "/logos/rockys.jpg",
  "Nami Matcha": "/logos/nami.png",
  "Matcha Kari": "/logos/kari.jpeg",
  "Kanbayashi Shunsho": "/logos/kanbayashi.png",
  "Yamamasa Koyamaen": "/logos/yamamasa.jpg",
};

/* ====================================================== */
export default function ResultsClient() {
  const router = useRouter();
  const params = useSearchParams();
  const raw = params.get("taste");

  /* ---------- decoded taste profile ---------- */
  const parsed = useMemo(() => {
    return raw ? JSON.parse(decodeURIComponent(raw)) : null;
  }, [raw]);

  /* ---------- derived labels ---------- */
  const archetype = getMatchaArchetype(parsed);
  const regionInfo = getFavoriteRegion(parsed);

  /* ---------- state ---------- */
  const [recommended, setRecommended] = useState<Matcha[]>([]);
  const [revealedIds, setRevealedIds] = useState<Set<string>>(new Set());
  const [visibleCount, setVisibleCount] = useState(3); // show 3 cards at a time

  /* ---------- fetch recommendations ---------- */
  useEffect(() => {
    if (!parsed) return;

    (async () => {
      const res = await fetch("/api/recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed, limit: 9 }), // ask for 9
      });
      const data = await res.json();
      setRecommended(data.results); // expect up to 9 items
    })();
  }, [parsed]);

  /* ---------- handlers ---------- */
  const handleReveal = useCallback(
    (id: string) => {
      setRevealedIds((prev) => new Set(prev).add(id));
    },
    []
  );

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + 3, recommended.length));
  }, [recommended.length]);

  const handleRetake = () => router.push("/taste");

  /* ---------- guard ---------- */
  if (!parsed) {
    return (
      <p className="text-center text-matcha-taupe mt-12">
        No taste data found 🥲
      </p>
    );
  }

  /* ---------- flavor radar data ---------- */
  const flavorData = [
    { flavor: "Umami", value: parsed.umami },
    { flavor: "Grassy", value: parsed.grassy },
    { flavor: "Nutty", value: parsed.nutty },
    { flavor: "Sweetness", value: parsed.sweetness },
  ];

  /* =================================================== */
  return (
    <main className="max-w-3xl mx-auto p-6 space-y-10">
      {/* ---------- Profile Chart ---------- */}
      <h1 className="text-3xl font-bold text-matcha-taupe text-center">
        Your Matcha Taste Profile
      </h1>

      <div className="w-full h-72 bg-white rounded-xl shadow">
        <ResponsiveContainer>
          <RadarChart data={flavorData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="flavor" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar
              name="Taste"
              dataKey="value"
              stroke="#A7C4A0"
              fill="#A7C4A0"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* ---------- Archetype + Region ---------- */}
      <section className="bg-white rounded-xl p-6 shadow space-y-4 text-center">
        <h2 className="text-2xl font-bold text-matcha-taupe">You are: {archetype}</h2>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-matcha-taupe">
            Your Matcha Region: {regionInfo.region}
          </h3>
          <Image
            src={regionInfo.img}
            alt={regionInfo.region}
            width={500}
            height={300}
            className="w-full rounded-lg mt-2"
          />
          <p className="text-sm text-matcha-taupe mt-2">{regionInfo.desc}</p>
        </div>
      </section>

      {/* ---------- Taste Summary ---------- */}
      <section className="bg-matcha-taupe rounded-xl p-6 space-y-3 text-white text-center">
        <h3 className="text-xl font-semibold">Your Taste Inputs</h3>
        <p>
          <strong>🍶 Usage:</strong> {parsed.usage.join(", ")}
        </p>
        <p>
          <strong>💰 Target Price:</strong> ${Math.round(parsed.price * 30)}
        </p>
        {!!parsed.cultivars?.length && (
          <p>
            <strong>🧬 Cultivars:</strong> {parsed.cultivars.join(", ")}
          </p>
        )}
      </section>

      {/* ---------- Recommendations ---------- */}
      <section className="text-center space-y-6">
          <h2 className="text-3xl font-semibold text-matcha-taupe">
            Your Matcha Picks 🍵
          </h2>
          <p className="text-med text-matcha-taupe/80 italic">
            Click each ??? card to reveal a recommended matcha
          </p>
          <div className="bg-matcha-taupe/20 rounded-xl p-6 shadow-inner">
            {recommended.length ? (
              <>
                <div className="grid sm:grid-cols-3 gap-6">
                  {recommended.slice(0, visibleCount).map((m) => {
                    const revealed = revealedIds.has(m._id!);
                    return (
                      <div key={m._id} onClick={() => handleReveal(m._id!)} className="perspective cursor-pointer">
                        <div className={`flip-card dramatic ${revealed ? "flipped" : ""}`}>
                          <div className="flip-card-inner">
                            <div className="flip-card-front bg-matcha-taupe text-white p-8 rounded-xl shadow flex items-center justify-center text-5xl glow-on-hover">
                              ???
                            </div>
                            <div className="flip-card-back bg-matcha-med text-white p-4 rounded-xl shadow flex flex-col items-center space-y-2">
                              {brandLogos[m.brand] && (
                                <Image
                                  src={brandLogos[m.brand]}
                                  alt={m.brand}
                                  width={80}
                                  height={40}
                                  className="object-contain"
                                />
                              )}
                              <p className="text-lg font-semibold text-center">
                                {m.brand}: {m.name}
                              </p>
                              <p className="text-sm text-center opacity-90">
                                {m.usage.join(", ")}
                              </p>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm underline"
                                href={`https://www.google.com/search?q=${encodeURIComponent(`${m.brand} ${m.name} matcha`)}`}
                              >
                                🛒 Find it online
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {visibleCount < recommended.length && (
                  <div className="mt-6">
                    <button
                      onClick={handleLoadMore}
                      className="px-6 py-2 bg-matcha-med text-white rounded-full shadow hover:scale-105 transition"
                    >
                      Show 3 more ↓
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-matcha-taupe">Finding your perfect matchas...</p>
            )}
          </div>
      </section>


      {/* ---------- Retake Button ---------- */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={handleRetake}
          className="animate-pulse bg-matcha-med text-white px-6 py-3 rounded-full shadow-md hover:scale-105 transition"
        >
          ↻ Take the taste test again
        </button>
      </div>

      {/* ---------- Styles ---------- */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .flip-card {
          width: 100%;
          height: 240px;
          position: relative;
          transition: transform 0.6s ease-in-out;
        }
        .flip-card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .flipped .flip-card-inner {
          transform: rotateY(180deg) scale(1.03);
        }
        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 0.75rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        .glow-on-hover {
          box-shadow: 0 0 0 transparent;
          transition: box-shadow 0.4s ease;
        }
        .flip-card:hover .glow-on-hover {
          animation: hoverWiggle 0.3s ease-in-out infinite alternate;
          box-shadow: 0 0 12px #a7c4a0;
        }
        @keyframes hoverWiggle {
          from {
            transform: translateX(-1px);
          }
          to {
            transform: translateX(1px);
          }
        }
      `}</style>
    </main>
  );
}
