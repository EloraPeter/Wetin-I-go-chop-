// src/lib/recommendation/visual.ts
import type { Meal } from "@/types/meal";

export function mealEmoji(meal: Meal): string {
  const n = meal.name.toLowerCase();
  if (n.includes("noodle") || n.includes("indomie")) return "🍜";
  if (n.includes("spaghetti") || n.includes("pasta")) return "🍝";
  if (n.includes("rice")) return "🍚";
  if (n.includes("beans") || n.includes("akara") || n.includes("moi")) return "🫘";
  if (n.includes("yam")) return "🍠";
  if (n.includes("potato")) return "🥔";
  if (n.includes("sandwich") || n.includes("bread")) return "🥪";
  if (n.includes("plantain")) return "🍌";
  if (n.includes("pancake")) return "🥞";
  if (n.includes("soup") || n.includes("garri")) return "🥘";
  if (n.includes("pap")) return "🥣";
  if (n.includes("chicken")) return "🍗";
  if (n.includes("egg")) return "🍳";
  return "🍽️";
}

export function mealGradient(meal: Meal): string {
  const gradients = [
    "from-[#F4B942]/35 via-[#FFF8EE] to-[#D94F3D]/25",
    "from-[#D94F3D]/25 via-[#FFF8EE] to-[#F4B942]/35",
    "from-[#5E8C61]/25 via-[#FFF8EE] to-[#F4B942]/30",
    "from-[#F4B942]/30 via-[#FFF8EE] to-[#5E8C61]/25",
  ];
  let hash = 0;
  for (let i = 0; i < meal.id.length; i++) hash = (hash * 31 + meal.id.charCodeAt(i)) >>> 0;
  return gradients[hash % gradients.length];
}