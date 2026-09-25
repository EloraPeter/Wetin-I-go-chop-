// src/components/MealVisual.tsx
import type { Meal } from "@/types/meal";
import { mealEmoji, mealGradient } from "@/lib/recommendation/visual";

export function MealVisual({
  meal,
  size = "hero",
}: {
  meal: Meal;
  size ? : "hero" | "compact";
}) {
  const emoji = mealEmoji(meal);
  const gradient = mealGradient(meal);
  
  if (size === "compact") {
    return (
      <div
        aria-hidden="true"
        className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} text-2xl`}
      >
        {emoji}
      </div>
    );
  }
  
  return (
    <div
      role="img"
      aria-label={`Illustration for ${meal.name}`}
      className={`relative flex h-44 w-full items-center justify-center overflow-hidden rounded-3xl bg-gradient-to-br ${gradient} sm:h-56`}
    >
      <span aria-hidden="true" className="text-7xl drop-shadow-sm sm:text-8xl">
        {emoji}
      </span>
      <span
        aria-hidden="true"
        className="absolute -bottom-8 -right-6 text-[7rem] opacity-10"
      >
        {emoji}
      </span>
      <span
        aria-hidden="true"
        className="absolute -left-5 -top-6 text-[5rem] opacity-10"
      >
        🍽️
      </span>
    </div>
  );
}