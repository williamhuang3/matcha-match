// src/lib/recommend.ts

import type { Matcha } from "@/types/Matcha";

export type TasteProfile = {
  umami: number;
  grassy: number;
  nutty: number;
  sweetness: number;
  price: number;
  usage: string[];
};

// Compute Euclidean distance between two feature vectors
function euclidean(a: number[], b: number[]): number {
  return Math.sqrt(a.reduce((sum, val, i) => sum + (val - b[i]) ** 2, 0));
}

// Normalize + weight a profile vector
function toVector(profile: TasteProfile | Matcha, means?: number[], stds?: number[]): number[] {
  const isMatcha = (p: unknown): p is Matcha =>
    typeof p === "object" && p !== null && "profile" in p;

  const p = isMatcha(profile) ? profile.profile : profile;

  const umami = p.umami ?? 3;
  const grassy = p.grassy ?? 3;
  const nutty = p.nutty ?? 3;
  const sweetness = p.sweetness ?? 3;
  const price = isMatcha(profile) ? profile.price ?? 30 : profile.price ?? 30;

  const features = [umami, grassy, nutty, sweetness, price];

  const norm = means && stds
    ? features.map((val, i) => (val - means[i]) / (stds[i] || 1))
    : features;

  const weights = [1, 1, 1, 1, 5]; // Slightly weight price
  const weighted = norm.map((v, i) => v * weights[i]);

  return weighted;
}

// Soft overlap score: how well does this matcha fulfill the user's intended use?
function usageScore(user: string[], matcha: string[]): number {
  const matchSet = new Set((matcha ?? []).map((u) => u.toLowerCase()));
  const intersect = user.filter((u) => matchSet.has(u.toLowerCase()));
  return intersect.length / user.length;
}

// Main function
export function getTopMatchas(
  user: TasteProfile,
  matchas: Matcha[],
  k = 3
): Matcha[] {
  // Normalize on real taste + price fields
  const featureMatrix = matchas.map((m) => {
    const p = m.profile;
    return [
      p.umami ?? 3,
      p.grassy ?? 3,
      p.nutty ?? 3,
      p.sweetness ?? 3,
      m.price ?? 30,
    ];
  });

  const means = featureMatrix[0].map((_, i) =>
    featureMatrix.reduce((sum, row) => sum + row[i], 0) / featureMatrix.length
  );

  const stds = featureMatrix[0].map((_, i) =>
    Math.sqrt(
      featureMatrix.reduce((sum, row) => sum + (row[i] - means[i]) ** 2, 0) /
        featureMatrix.length
    )
  );

  const userVec = toVector(user, means, stds);

  return matchas
    .map((m) => {
      const vec = toVector(m, means, stds);
      const dist = euclidean(userVec, vec);
      const usageBoost = usageScore(user.usage, m.usage ?? []);
      const adjustedDist = dist - usageBoost * 0.5; // usage match boosts closeness
      return { matcha: m, dist: adjustedDist };
    })
    .sort((a, b) => a.dist - b.dist)
    .slice(0, k)
    .map((m) => m.matcha);
}
