// src/types/meal.ts
export type Difficulty = "easy" | "medium" | "hard";

export type Meal = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  estimatedCostNgn: number;
  cookingTimeMinutes: number;
  difficulty: Difficulty;
  moods: string[];
  mealTimes: string[];
  instructions: string[];
  imageUrl?: string;
};