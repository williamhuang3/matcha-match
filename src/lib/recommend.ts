// src/lib/recommend.ts
import type { Matcha } from "@/types/Matcha";

export type TasteProfile = {
  umami: number;
  grassy: number;
  nutty: number;
  sweetness: number;
  price: number;
  experience?: "Beginner" | "Intermediate" | "Advanced";
  usage: string[];
};

const usageOptions = ["koicha", "usucha", "latte", "culinary"];
const experienceMap = { Beginner: 0, Intermediate: 1, Advanced: 2 };

// function zScoreNormalize(values: number[]): number[] {
//   const mean = values.reduce((a, b) => a + b, 0) / values.length;
//   const std = Math.sqrt(
//     values.reduce((sum, val) => sum + (val - mean) ** 2, 0) / values.length
//   );
//   return values.map((val) => (val - mean) / (std || 1));
// }

function oneHotEncodeUsage(usage: string[]): number[] {
  return usageOptions.map((opt) => (usage.includes(opt) ? 1 : 0));
}

function oneHotEncodeExperience(exp: string): number[] {
  const vec = [0, 0, 0];
  const idx = experienceMap[exp as keyof typeof experienceMap];
  vec[idx] = 1;
  return vec;
}

function toVector(profile: TasteProfile | Matcha, means?: number[], stds?: number[]): number[] {
  const isMatcha = (p: unknown): p is Matcha => {
    return typeof p === "object" && p !== null && "profile" in p;
  };

  const p = isMatcha(profile) ? profile.profile : profile;
  const umami = p.umami ?? 3;
  const grassy = p.grassy ?? 3;
  const nutty = p.nutty ?? 3;
  const sweetness = p.sweetness ?? 3;
  const price = isMatcha(profile) ? profile.price ?? 30 : profile.price ?? 30;
  const rawExp = profile.experience ?? "Intermediate";
  const usage = isMatcha(profile) ? profile.usage ?? [] : profile.usage ?? [];

  const usageVec = oneHotEncodeUsage(usage).map((v) => v * 0.5);
  const expVec = oneHotEncodeExperience(rawExp);

  const features = [umami, grassy, nutty, sweetness, price];
  const norm = means && stds
    ? features.map((val, i) => (val - means[i]) / (stds[i] || 1))
    : features;

  return [...norm, ...expVec, ...usageVec];
}


function euclidean(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
}

export function getTopMatchas(
  user: TasteProfile,
  matchas: Matcha[],
  k = 3
): Matcha[] {
  const featureMatrix = matchas.map((m) => {
    const p = m.profile;
    return [p.umami ?? 3, p.grassy ?? 3, p.nutty ?? 3, p.sweetness ?? 3, m.price ?? 30];
  });

  const means = featureMatrix[0].map((_, i) => featureMatrix.reduce((sum, row) => sum + row[i], 0) / featureMatrix.length);
  const stds = featureMatrix[0].map(
    (_, i) => Math.sqrt(featureMatrix.reduce((sum, row) => sum + (row[i] - means[i]) ** 2, 0) / featureMatrix.length)
  );

  const userVec = toVector(user, means, stds);

  return matchas
    .map((m) => ({ matcha: m, dist: euclidean(userVec, toVector(m, means, stds)) }))
    .sort((a, b) => a.dist - b.dist)
    .slice(0, k)
    .map((m) => m.matcha);
}