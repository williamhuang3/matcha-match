// src/lib/recommend.ts
import { Matcha } from "@/types";

export type TasteProfile = {
  umami: number;
  grassy: number;
  nutty: number;
  sweetness: number;
  price: number;
  experience: "Beginner" | "Intermediate" | "Advanced";
  usage: string[];
};

const usageOptions = ["koicha", "usucha", "latte", "culinary"];
const experienceMap = { Beginner: 0, Intermediate: 1, Advanced: 2 };

function normalizePrice(price: number, min = 10, max = 50): number {
  return (price - min) / (max - min);
}

function toVector(profile: TasteProfile | Matcha): number[] {
  const { umami, grassy, nutty, sweetness } = profile.profile || profile;
  const price = normalizePrice((profile as any).price || 30);
  const rawExp = (profile as any).experience ?? "Intermediate";
  const experience =
    experienceMap[rawExp as "Beginner" | "Intermediate" | "Advanced"];
  
  const usageVec = usageOptions.map((opt) =>
    (profile as any).usage?.includes(opt) ? 1 : 0
  );
  return [umami, grassy, nutty, sweetness, price, experience, ...usageVec];
}

function euclidean(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
}

export function getTopMatchas(
  user: TasteProfile,
  matchas: Matcha[],
  k = 3
): Matcha[] {
  const userVec = toVector(user);
  return matchas
    .map((m) => ({ matcha: m, dist: euclidean(userVec, toVector(m)) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, k)
    .map((m) => m.matcha);
}
