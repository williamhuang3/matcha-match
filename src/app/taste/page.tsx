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
    desc: "Thick, paste-like matcha",
    icon: "厚", // Japanese character for "thick"
    color: "bg-matcha-taupe", // Darkest for most concentrated
    visual: "Low astringency",
    conflictsWith: ["Latte", "Culinary"],
  },
  {
    key: "Usucha",
    desc: "Traditional ceremony matcha",
    icon: "茶", // Japanese character for "tea"
    color: "bg-matcha-med", // Medium tone for traditional
    visual: "Low to medium astringency",
    conflictsWith: ["Culinary"],
  },
  {
    key: "Latte",
    desc: "Matcha with milk",
    icon: "☕", // Coffee cup emoji
    color: "bg-matcha-light", // Light for creamy
    visual: "Medium to high astringency",
    conflictsWith: ["Koicha"],
  },
  {
    key: "Culinary",
    desc: "For smoothies, desserts, or baking",
    icon: "🍰", // Cake emoji
    color: "bg-gradient-to-br from-matcha-med to-matcha-light", // Gradient for versatility
    visual: "Most astringent",
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

        {/* Usage Selection with Square Icon Cards */}
        <div>
          <label className="block mb-2 text-sm font-medium text-matcha-taupe">
            Preferred Usage
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {usageOptions.map(({ key, desc, icon, color, visual }) => {
              const isSelected = usage.includes(key);
              const isDisabled = !isSelected && disabledUsages.includes(key);
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => !isDisabled && toggleUsage(key)}
                  className={`flex items-center gap-3 p-4 border-2 rounded-xl transition-all duration-200 
                    ${isSelected 
                      ? "border-matcha-med bg-matcha-med/10 shadow-md" 
                      : "border-gray-200 hover:border-matcha-light"
                    }
                    ${isDisabled ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg transform hover:scale-[1.02]"}`}
                >
                  {/* Square Icon */}
                  <div className={`w-12 h-12 ${color} rounded-lg flex items-center justify-center text-white text-lg font-bold shadow-md`}>
                    {icon}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 text-left">
                    <h3 className="font-semibold text-matcha-taupe text-sm">{key}</h3>
                    <p className="text-xs text-gray-600 mt-0.5">{desc}</p>
                    <p className="text-xs text-matcha-taupe mt-1 font-medium">{visual}</p>
                  </div>
                  
                  {/* Selection Indicator */}
                  <div className={`w-5 h-5 rounded-full border-2 transition-all ${
                    isSelected 
                      ? "bg-matcha-med border-matcha-med" 
                      : "border-gray-300"
                  }`}>
                    {isSelected && (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </div>
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
