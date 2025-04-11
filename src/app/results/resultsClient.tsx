// src/app/results/ResultsClient.tsx
"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
import { getMatchaArchetype, getFavoriteRegion } from "@/lib/analyzeTaste";

export default function ResultsClient() {
  const params = useSearchParams();
  const raw = params.get("taste");
  const parsed = raw ? JSON.parse(decodeURIComponent(raw)) : null;

  if (!parsed) {
    return <p className="text-center text-matcha-taupe mt-12">No taste data found 🥲</p>;
  }

  const archetype = getMatchaArchetype(parsed);
  const regionInfo = getFavoriteRegion(parsed);

  const flavorData = [
    { flavor: "Umami", value: parsed.umami },
    { flavor: "Grassy", value: parsed.grassy },
    { flavor: "Nutty", value: parsed.nutty },
    { flavor: "Sweetness", value: parsed.sweetness },
  ];

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-matcha-taupe">Your Matcha Taste Profile</h1>

      <div className="w-full h-72 bg-white rounded-xl shadow">
        <ResponsiveContainer>
          <RadarChart data={flavorData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="flavor" />
            <PolarRadiusAxis angle={30} domain={[0, 5]} />
            <Radar name="Taste" dataKey="value" stroke="#A7C4A0" fill="#A7C4A0" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-white rounded-xl p-4 shadow space-y-4">
        <h2 className="text-2xl font-bold text-matcha-taupe">You are: {archetype}</h2>

        <div className="mt-6">
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
      </div>

      <div className="bg-matcha-offwhite p-4 rounded-lg">
        <p className="text-matcha-taupe mb-1">
          <strong>Experience:</strong> {parsed.experience}
        </p>
        <p className="text-matcha-taupe mb-1">
          <strong>Usage:</strong> {parsed.usage.join(", ")}
        </p>
        <p className="text-matcha-taupe">
          <strong>Ideal Price:</strong> ${parsed.price}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold text-matcha-taupe mb-4">
          Top 3 Matches
        </h2>
        <ul className="space-y-2 text-matcha-taupe">
          <li>🍵 Horii Tenju</li>
          <li>🍵 Ippodo Ummon</li>
          <li>🍵 Kettl Kiwami</li>
        </ul>
      </div>
    </main>
  );
}
