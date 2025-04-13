"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

const cultivarOptions = ["Samidori", "Asahi", "Uji Hikari", "Yabukita", "Okumidori", "Saemidori"];

const usageOptions = [
  {
    key: "Koicha",
    desc: "Thick paste-like matcha",
    icons: "🍵🍵🍵🍵 + 💧",
    conflictsWith: ["Latte", "Culinary"],
  },
  {
    key: "Usucha",
    desc: "Traditional matcha",
    icons: "🍵🍵 + 💧💧",
    conflictsWith: ["Culinary"],
  },
  {
    key: "Latte",
    desc: "Matcha with milk",
    icons: "🍵 + 💧 + 🥛",
    conflictsWith: ["Koicha"],
  },
  {
    key: "Culinary",
    desc: "For smoothies, desserts, or baking",
    icons: "🍵 + 🍞",
    conflictsWith: ["Koicha", "Usucha"],
  },
];

export default function TasteTestPage() {
  const router = useRouter();

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
      prev.includes(option)
        ? prev.filter((u) => u !== option)
        : [...prev, option]
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
      ...flavors,
      usage,
      price: price / 30,
      cultivars,
    };

    const encoded = encodeURIComponent(JSON.stringify(tasteData));
    router.push(`/results?taste=${encoded}`);
  };

  // Determine disabled usage options
  const disabledUsages = usageOptions.reduce<string[]>((acc, { key, conflictsWith }) => {
    if (usage.includes(key)) {
      return [...acc, ...conflictsWith];
    }
    return acc;
  }, []);

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold text-matcha-taupe">Taste Test</h1>
      <form onSubmit={handleSubmit} className="space-y-6">

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

        {/* Usage Selection with Button Cards */}
        <div>
          <label className="block mb-2 text-sm font-medium text-matcha-taupe">
            Preferred Usage
          </label>
          <div className="space-y-4">
            {usageOptions.map(({ key, desc, icons }) => {
              const isSelected = usage.includes(key);
              const isDisabled = !isSelected && disabledUsages.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => !isDisabled && toggleUsage(key)}
                  className={`flex w-full items-start justify-between gap-4 p-3 border rounded-lg transition
                    ${isSelected ? "bg-matcha-med text-white" : "border-matcha-med"}
                    ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:bg-matcha-light"}`}
                >
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-matcha-taupe">{key}</p>
                    <p className="text-xs text-matcha-taupe">{desc}</p>
                  </div>
                  <div className="text-xl text-right whitespace-nowrap">{icons}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cultivars (Optional) */}
        <div>
          <label className="block mb-1 text-sm font-medium text-matcha-taupe">
            Cultivars (optional)
          </label>
          <p className="text-xs text-matcha-taupe mb-2">
            Cultivars are matcha plant varieties — like grape types for wine. Some are sweeter, some more savory.
          </p>
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
            Target Price (30g tin)
          </label>
          <input
            type="range"
            min={10}
            max={70}
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
