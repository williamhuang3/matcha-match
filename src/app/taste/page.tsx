"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const usageOptions = ["Koicha", "Usucha", "Latte", "Culinary"];
const flavorOptions = [
  {
    key: "umami",
    label: "Umami",
    desc: "Deep savory flavor, rich & smooth",
  },
  {
    key: "grassy",
    label: "Grassy",
    desc: "Fresh, vegetal green tea flavor",
  },
  {
    key: "nutty",
    label: "Nutty",
    desc: "Toasty or roasted notes",
  },
  {
    key: "sweetness",
    label: "Sweetness",
    desc: "Natural mellow sweetness (not sugar)",
  },
];

const cultivarOptions = ["Samidori", "Asahi", "Uji Hikari", "Yabukita"];

export default function TasteTestPage() {
  const router = useRouter();

  const [experience, setExperience] = useState("Beginner");
  const [flavors, setFlavors] = useState({
    umami: 3,
    grassy: 3,
    nutty: 3,
    sweetness: 3,
  });
  const [usage, setUsage] = useState<string[]>([]);
  const [price, setPrice] = useState(30);
  const [cultivars, setCultivars] = useState<string[]>([]);

  const toggleUsage = (option: string) => {
    setUsage((prev) =>
      prev.includes(option) ? prev.filter((u) => u !== option) : [...prev, option]
    );
  };

  const toggleCultivar = (option: string) => {
    setCultivars((prev) =>
      prev.includes(option) ? prev.filter((c) => c !== option) : [...prev, option]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!usage.length) {
      alert("Please select at least one preferred usage.");
      return;
    }

    const tasteData = {
      experience,
      ...flavors,
      usage,
      price,
      cultivars,
    };

    const encoded = encodeURIComponent(JSON.stringify(tasteData));
    router.push(`/results?taste=${encoded}`);
  };

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-matcha-taupe">Taste Test</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Experience Level */}
        <div>
          <label className="block mb-2 text-sm font-medium text-matcha-taupe">
            Experience Level
          </label>
          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full p-2 rounded bg-white border border-matcha-med"
          >
            <option>Beginner</option>
            <option>Intermediate</option>
            <option>Advanced</option>
          </select>
        </div>

        {/* Flavor Buttons */}
        {flavorOptions.map(({ key, label, desc }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-matcha-taupe mb-1">
              {label}
            </label>
            <p className="text-xs text-matcha-taupe mb-2">{desc}</p>
            <div className="flex justify-between items-center bg-matcha-med p-2 rounded-full h-14">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => setFlavors({ ...flavors, [key]: num })}
                  className={`h-10 w-10 rounded-full text-sm font-medium transition ${
                    flavors[key as keyof typeof flavors] === num
                      ? "bg-matcha-light text-matcha-taupe"
                      : "text-white"
                  }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        ))}


        {/* Usage Selection with Icons */}
        <div>
          <label className="block mb-2 text-sm font-medium text-matcha-taupe">
            Preferred Usage
          </label>
          <div className="space-y-4">
            {[
              {
                key: "Koicha",
                desc: "Thick paste-like matcha",
                icons: "🍵🍵🍵🍵 + 💧",
              },
              {
                key: "Usucha",
                desc: "Traditional matcha",
                icons: "🍵🍵 + 💧💧",
              },
              {
                key: "Latte",
                desc: "Matcha with milk",
                icons: "🍵 + 💧 + 🥛",
              },
              {
                key: "Culinary",
                desc: "For smoothies, desserts, or baking",
                icons: "🍵 + 🍞",
              },
            ].map(({ key, desc, icons }) => (
              <div
                key={key}
                className="flex items-start justify-between gap-4 p-3 border border-matcha-med rounded-lg"
              >
                {/* Checkbox left */}
                <input
                  type="checkbox"
                  checked={usage.includes(key)}
                  onChange={() => toggleUsage(key)}
                  className="mt-1 accent-matcha-med"
                />

                {/* Label content */}
                <div className="flex-1">
                  <p className="font-semibold text-matcha-taupe">{key}</p>
                  <p className="text-xs text-matcha-taupe">{desc}</p>
                </div>

                {/* Icons right */}
                <div className="text-xl text-right whitespace-nowrap">{icons}</div>
              </div>

            ))}
          </div>
        </div>



        {/* Cultivars (Optional) */}
        <div>
          <label className="block mb-2 text-sm font-medium text-matcha-taupe">
            Cultivars (optional)
          </label>
          <div className="flex flex-wrap gap-4">
            {cultivarOptions.map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={cultivars.includes(option)}
                  onChange={() => toggleCultivar(option)}
                  className="accent-matcha-med"
                />
                <span className="text-matcha-taupe text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Slider */}
        <div>
          <label className="block mb-1 text-sm font-medium text-matcha-taupe">
            Ideal Price (30g tin)
          </label>
          <input
            type="range"
            min={10}
            max={50}
            step={1}
            value={price}
            onChange={(e) => setPrice(parseInt(e.target.value))}
            className="w-full accent-matcha-med"
          />
          <div className="text-right text-sm text-matcha-taupe">${price}</div>
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-matcha-med text-white rounded-full hover:bg-matcha-light transition"
        >
          See My Matcha Profile →
        </button>
      </form>
    </main>
  );
}
