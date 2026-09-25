// src/lib/recommendation/score.ts
import type { Meal } from "@/types/meal";
import { ingredientWeight } from "@/data/ingredients";
import type { RecommendationInput } from "@/types/recommendation";

export const WEIGHTS = {
  mood: 0.35,
  budget: 0.35,
  ingredient: 0.3,
} as const;

/** Moods that partially satisfy another mood. */
const MOOD_AFFINITY: Record<string, string[]> = {
  tired: ["quick", "budget"],
  happy: ["craving", "special"],
  comforting: ["hungry", "budget"],
  spicy: ["craving"],
  craving: ["spicy", "special", "comforting"],
  quick: ["tired", "budget"],
  hungry: ["comforting", "budget"],
  budget: ["quick", "hungry"],
  special: ["craving", "happy"],
};

/** 0–100 */
export function scoreMood(meal: Meal, mood: string): number {
  if (!mood || mood === "any") return 80;

  const moods = meal.moods.map((m) => m.toLowerCase());
  if (moods.includes(mood)) return 100;

  const affinity = MOOD_AFFINITY[mood] ?? [];
  if (moods.some((m) => affinity.includes(m))) return 70;

  if (moods.includes("hungry")) return 45;
  return 25;
}

/** 0–100. At or under budget = strong score. */
export function scoreBudget(meal: Meal, budget: number): number {
  if (!budget || budget <= 0) return 100;

  const ratio = meal.estimatedCostNgn / budget;
  if (ratio <= 0.5) return 100;
  if (ratio <= 1) return 100 - (ratio - 0.5) * 20; // 100 → 90
  if (ratio <= 1.25) return 90 - (ratio - 1) * 160; // 90 → 50
  if (ratio <= 1.6) return 50 - (ratio - 1.25) * 100; // 50 → 15
  return 5;
}

/** 0–100 weighted ingredient coverage. */
export function scoreIngredients(meal: Meal, userIngredients: string[]): number {
  const have = new Set(userIngredients);
  if (have.size === 0) return 65; // neutral — mood + budget drive instead

  let total = 0;
  let got = 0;
  for (const ing of meal.ingredients) {
    const w = ingredientWeight(ing);
    total += w;
    if (have.has(ing)) got += w;
  }
  if (total === 0) return 65;

  const coverage = got / total;
  return Math.round(25 + coverage * 75); // 25 floor so an odd ingredient can't zero it out
}

export function scoreMeal(meal: Meal, input: RecommendationInput) {
  const moodScore = scoreMood(meal, input.mood);
  const budgetScore = scoreBudget(meal, input.budget);
  const ingredientScore = scoreIngredients(meal, input.ingredients);

  const score =
    moodScore * WEIGHTS.mood +
    budgetScore * WEIGHTS.budget +
    ingredientScore * WEIGHTS.ingredient;

  return { moodScore, budgetScore, ingredientScore, score: Math.round(score * 10) / 10 };
}
