// src/types/recommendation.ts
import type { Meal } from "./meal";

export type RecommendationInput = {
  mood: string;
  budget: number;
  ingredients: string[];
};

export type RecommendationResult = {
  meal: Meal;
  score: number;
  moodScore: number;
  budgetScore: number;
  ingredientScore: number;
  reasons: string[];
  closeMatch: boolean;
};