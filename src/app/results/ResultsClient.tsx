"use client";

import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import FlightSearch from '../../components/FlightSearch';
import MatchaTours from '../../components/MatchaTours';

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
    <main className="max-w-4xl mx-auto p-6 space-y-12">
      {/* ---------- Header ---------- */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-matcha-taupe">
          Your Matcha Profile 🍵
        </h1>
        <p className="text-lg text-matcha-taupe/70 max-w-2xl mx-auto">
          Based on your taste preferences, here&apos;s your personalized matcha journey
        </p>
      </div>

      {/* ---------- Profile Overview Card ---------- */}
      <section className="bg-gradient-to-br from-white to-matcha-offwhite rounded-2xl p-8 shadow-lg">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Radar Chart */}
          <div>
            <h2 className="text-2xl font-bold text-matcha-taupe mb-4 text-center">
              Your Flavor Profile
            </h2>
            <div className="w-full h-72 bg-white rounded-xl shadow-inner">
              <ResponsiveContainer>
                <RadarChart data={flavorData}>
                  <PolarGrid gridType="polygon" />
                  <PolarAngleAxis 
                    dataKey="flavor" 
                    tick={{ fontSize: 14, fill: '#8F8389' }}
                    className="font-medium"
                  />
                  <PolarRadiusAxis 
                    angle={30} 
                    domain={[0, 5]} 
                    tick={{ fontSize: 12, fill: '#8F8389' }}
                  />
                  <Radar
                    name="Taste"
                    dataKey="value"
                    stroke="#A7C4A0"
                    fill="#A7C4A0"
                    fillOpacity={0.3}
                    strokeWidth={3}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Archetype Info */}
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-matcha-taupe mb-2">
                &ldquo;{archetype}&rdquo; Matcha Lover
              </h3>
              <div className="w-16 h-1 bg-matcha-med mx-auto rounded-full"></div>
            </div>
            
            {/* Taste Summary */}
            <div className="bg-matcha-taupe/10 rounded-xl p-6 space-y-4">
              <h4 className="text-lg font-semibold text-matcha-taupe mb-3">Your Preferences</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🍶</span>
                  <span className="text-matcha-taupe">
                    <strong>Usage:</strong> {parsed.usage.join(", ")}
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">💰</span>
                  <span className="text-matcha-taupe">
                    <strong>Budget:</strong> ${Math.round(parsed.price * 30)} per 30g
                  </span>
                </div>
                {!!parsed.cultivars?.length && (
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">🧬</span>
                    <span className="text-matcha-taupe">
                      <strong>Cultivars:</strong> {parsed.cultivars.join(", ")}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Region Section with Map ---------- */}
      <section className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold text-matcha-taupe text-center mb-8">
          Your Ideal Matcha Region
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 items-start">
          {/* Japan Map with Highlighted Region */}
          <div className="relative">
            <h3 className="text-2xl font-semibold text-matcha-taupe mb-4 text-center">
              📍 {regionInfo.region}
            </h3>
            
            {/* Japan Map with Region Overlay */}
            <div className="bg-matcha-offwhite rounded-xl p-6 text-center relative">
              <div className="relative inline-block">
                {/* Japan Vector Map */}
                <Image
                  src="/Japan Vector Map.svg"
                  alt="Japan Map"
                  width={400}
                  height={300}
                  className="w-full max-w-sm mx-auto"
                  style={{
                    filter: 'sepia(1) saturate(0.8) hue-rotate(90deg) brightness(1.4)'
                  }}
                />
                
                {/* Region marker overlay - positioned absolutely over the map */}
                <div className="absolute inset-0 pointer-events-none">
                  <div 
                    className="absolute transform -translate-x-1/2 -translate-y-1/2"
                    style={{
                      left: regionInfo.region.includes('Uji') ? '58%' : 
                            regionInfo.region.includes('Yame') ? '36%' :
                            regionInfo.region.includes('Shizuoka') ? '76%' :
                            regionInfo.region.includes('Nishio') ? '73%' : '60%',
                      top: regionInfo.region.includes('Uji') ? '56%' : 
                           regionInfo.region.includes('Yame') ? '65%' :
                           regionInfo.region.includes('Shizuoka') ? '56%' :
                           regionInfo.region.includes('Nishio') ? '56%' : '50%'
                    }}
                  >
                      <div className="w-4 h-4 bg-matcha-med rounded-full border-4 border-white shadow-lg flex items-center justify-center">
                      </div>
                      <div className="mt-2 bg-matcha-taupe text-white text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap">
                        {regionInfo.region.split(',')[0]}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Region Image */}
            <div className="mt-6">
              <Image
                src={regionInfo.img}
                alt={regionInfo.region}
                width={400}
                height={200}
                className="w-full rounded-xl shadow-md object-cover h-48"
              />
            </div>
          </div>

          {/* Region Description */}
          <div className="space-y-4">
            <div className="bg-matcha-offwhite rounded-xl p-6">
              <h4 className="text-xl font-bold text-matcha-taupe mb-4">
                Why {regionInfo.region}?
              </h4>
              <p className="text-matcha-taupe/80 leading-relaxed text-sm">
                {regionInfo.desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Travel to Japan ---------- */}
      <section className="space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl font-bold text-matcha-taupe">
            ✈️ Visit Your Matcha Region
          </h2>
          <p className="text-lg text-matcha-taupe max-w-2xl mx-auto">
            Experience authentic matcha culture in {regionInfo.region.split(',')[0]}. Find flights to Tokyo and discover matcha tours in your preferred region!
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Flights Section */}
          <div className="bg-gradient-to-br from-matcha-offwhite to-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold text-matcha-taupe mb-4 flex items-center">
              🛫 Flights to Tokyo
            </h3>
            <FlightSearch regionName={regionInfo.region.split(',')[0]} />
          </div>

          {/* Tours Section */}
          <div className="bg-gradient-to-br from-matcha-offwhite to-white rounded-2xl p-6 shadow-lg">
            <h3 className="text-2xl font-semibold text-matcha-taupe mb-4 flex items-center">
              🗾 Matcha Tours & Experiences
            </h3>
            <MatchaTours regionName={regionInfo.region.split(',')[0]} />
          </div>
        </div>
      </section>

      {/* ---------- Recommendations ---------- */}
      <section className="text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl font-bold text-matcha-taupe">
            Your Perfect Matches
          </h2>
          <p className="text-lg text-matcha-taupe max-w-lg mx-auto">
            Click each  card to reveal a matcha tailored to your taste profile!
          </p>
        </div>
        
        <div className="bg-gradient-to-br from-matcha-offwhite to-white rounded-2xl p-8 shadow-lg">
          {recommended.length ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {recommended.slice(0, visibleCount).map((m, index) => {
                  const revealed = revealedIds.has(m._id!);
                  return (
                    <div key={m._id} className="perspective cursor-pointer group">
                      <div 
                        onClick={() => handleReveal(m._id!)}
                        className={`flip-card dramatic ${revealed ? "flipped" : ""}`}
                      >
                        <div className="flip-card-inner">
                          <div className="flip-card-front bg-gradient-to-br from-matcha-taupe to-matcha-med text-white p-8 rounded-2xl shadow-lg flex flex-col items-center justify-center glow-on-hover">
                            <div className="text-6xl mb-4 group-hover:scale-110 transition-transform">
                              🍵
                            </div>
                            <div className="text-2xl font-bold opacity-80">
                              Match #{index + 1}
                            </div>
                            <div className="text-sm opacity-60 mt-2">
                              Click to reveal
                            </div>
                          </div>
                          <div className="flip-card-back bg-matcha-offwhite border-2 border-matcha-med/30 p-6 rounded-2xl shadow-lg relative">
                            {/* Shop icon in top right */}
                            <a
                              href={`https://www.google.com/search?q=${encodeURIComponent(`${m.brand} ${m.name}`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="absolute top-3 right-3 w-8 h-8 bg-matcha-med/80 hover:bg-matcha-taupe text-white rounded-md flex items-center justify-center transition-colors shadow-sm"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                            </a>
                            
                            {/* Main content */}
                            <div className="flex flex-col items-center space-y-3 h-full justify-center pt-2">
                              {brandLogos[m.brand] && (
                                <div className="bg-white rounded-lg p-3 shadow-sm">
                                  <Image
                                    src={brandLogos[m.brand]}
                                    alt={m.brand}
                                    width={80}
                                    height={40}
                                    className="object-contain"
                                  />
                                </div>
                              )}
                              <div className="text-center space-y-2">
                                <h3 className="text-lg font-bold text-matcha-taupe">
                                  {m.name}
                                </h3>
                                <p className="text-sm text-matcha-taupe/70 font-medium">
                                  by {m.brand}
                                </p>
                                <div className="flex flex-wrap gap-1 justify-center mt-2">
                                  {m.usage.map(usage => (
                                    <span key={usage} className="text-xs bg-matcha-med/80 text-white px-2 py-1 rounded-full">
                                      {usage}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {visibleCount < recommended.length && (
                <div className="mt-8">
                  <button
                    onClick={handleLoadMore}
                    className="bg-matcha-med text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:bg-matcha-taupe hover:scale-105 transition-all"
                  >
                    Show More Matches ({recommended.length - visibleCount} remaining) ↓
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="py-12 space-y-4">
              <div className="text-6xl">🔍</div>
              <p className="text-xl text-matcha-taupe font-medium">
                Finding your perfect matchas...
              </p>
              <div className="flex justify-center space-x-2">
                <div className="w-2 h-2 bg-matcha-med rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-matcha-med rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-matcha-med rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ---------- Retake Button ---------- */}
      <div className="text-center pt-8">
        <button
          onClick={handleRetake}
          className="bg-matcha-med text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition-transform"
        >
          ↻ Retake Taste Test
        </button>
      </div>

      {/* ---------- Styles ---------- */}
      <style jsx>{`
        .perspective {
          perspective: 1000px;
        }
        .flip-card {
          width: 100%;
          height: 280px;
          position: relative;
          transition: transform 0.6s ease-in-out;
        }
        .flip-card-inner {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          transition: transform 1.2s cubic-bezier(0.19, 1, 0.22, 1);
        }
        .flipped .flip-card-inner {
          transform: rotateY(180deg) scale(1.05);
        }
        .flip-card-front,
        .flip-card-back {
          backface-visibility: hidden;
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 1rem;
        }
        .flip-card-back {
          transform: rotateY(180deg);
        }
        .glow-on-hover {
          box-shadow: 0 4px 15px rgba(167, 196, 160, 0.2);
          transition: all 0.4s ease;
        }
        .flip-card:hover .glow-on-hover {
          box-shadow: 0 8px 25px rgba(167, 196, 160, 0.4), 0 0 20px rgba(167, 196, 160, 0.3);
          transform: translateY(-5px);
        }
        .group:hover .flip-card-front {
          animation: subtle-wiggle 0.6s ease-in-out infinite alternate;
        }
        @keyframes subtle-wiggle {
          from {
            transform: rotate(-1deg) scale(1.02);
          }
          to {
            transform: rotate(1deg) scale(1.02);
          }
        }
      `}</style>
    </main>
  );
}
