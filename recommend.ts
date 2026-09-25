// src/lib/recommendation/recommend.ts
import { MEALS } from "@/data/meals";
import type { Meal } from "@/types/meal";
import type { RecommendationInput, RecommendationResult } from "@/types/recommendation";
import { scoreMeal } from "./score";
import { moodLabel } from "@/data/moods";

/** How far above budget we'll still consider a meal (before full fallback). */
const BUDGET_TOLERANCE = 1.6;
const POOL_SIZE = 5;

function formatNaira(n: number): string {
  return `₦${n.toLocaleString("en-NG")}`;
}

function buildReasons(
  result: Omit < RecommendationResult, "reasons" | "closeMatch" > ,
  input: RecommendationInput
): string[] {
  const { meal, moodScore, budgetScore, ingredientScore } = result;
  const reasons: string[] = [];
  
  // Mood
  if (input.mood === "any") {
    reasons.push("You said you didn't mind — so we picked something safe and satisfying");
  } else if (moodScore >= 90) {
    reasons.push(`Matches your ${moodLabel(input.mood)} mood`);
  } else if (moodScore >= 60) {
    reasons.push(`Close to what you're in the mood for`);
  }
  
  // Budget
  if (input.budget > 0) {
    if (meal.estimatedCostNgn <= input.budget) {
      reasons.push(`Fits comfortably within your ${formatNaira(input.budget)} budget`);
    } else if (budgetScore >= 40) {
      reasons.push(
        `A little above your ${formatNaira(input.budget)} budget — about ${formatNaira(
          meal.estimatedCostNgn - input.budget
        )} over`
      );
    }
  }
  
  // Ingredients
  if (input.ingredients.length === 0) {
    reasons.push("You don't need much to pull this off — easy to shop for");
  } else if (ingredientScore >= 85) {
    reasons.push("You already have almost everything you need");
  } else if (ingredientScore >= 60) {
    reasons.push("You already have most of the ingredients");
  } else if (ingredientScore >= 40) {
    reasons.push("Uses some of what you've already got");
  }
  
  if (reasons.length === 0) {
    reasons.push("It's one of the best options available with what you told us");
  }
  
  return reasons.slice(0, 3);
}

/** Score + sort every meal for the given input. Deterministic. */
export function rankMeals(input: RecommendationInput): RecommendationResult[] {
  const scored = MEALS.map((meal) => {
    const s = scoreMeal(meal, input);
    return { meal, ...s };
  });
  
  // Prefer meals within budget tolerance; fall back to everything if none qualify.
  let eligible = scored;
  if (input.budget > 0) {
    const within = scored.filter(
      (s) => s.meal.estimatedCostNgn <= input.budget * BUDGET_TOLERANCE
    );
    if (within.length > 0) eligible = within;
  }
  
  return eligible
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.meal.estimatedCostNgn - b.meal.estimatedCostNgn;
    })
    .map((s) => {
      const partial = { ...s };
      const closeMatch = s.budgetScore < 50 || s.ingredientScore < 40;
      return {
        ...partial,
        reasons: buildReasons(partial, input),
        closeMatch,
      };
    });
}

/**
 * Pick a recommendation. Excludes previously shown meals so "Try another meal"
 * feels like discovery. Resets the exclusion pool if everything has been seen.
 */
export function recommendMeal(
  input: RecommendationInput,
  excludeIds: string[] = []
): RecommendationResult | null {
  const ranked = rankMeals(input);
  if (ranked.length === 0) return null;
  
  const fresh = ranked.filter((r) => !excludeIds.includes(r.meal.id));
  const pool = (fresh.length > 0 ? fresh : ranked).slice(0, POOL_SIZE);
  
  return pool[0];
}

/** Used for the "no perfect match" copy. */
export function hasPerfectMatch(results: RecommendationResult[]): boolean {
  return results.some(
    (r) => r.moodScore >= 70 && r.budgetScore >= 50 && r.ingredientScore >= 40
  );
}

export type { Meal };