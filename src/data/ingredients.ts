// src/data/ingredients.ts
/** Ingredients everyone is assumed to more or less have. Low weight = low penalty. */
const WEIGHTS: Record<string, number> = {
  salt: 0.25,
  water: 0.15,
  oil: 0.35,
  seasoning: 0.3,
  maggi: 0.3,
  onion: 0.6,
  pepper: 0.6,
  tomato: 0.65,
  garlic: 0.5,
  ginger: 0.5,
  curry: 0.4,
  thyme: 0.4,
  crayfish: 0.6,
};

export function ingredientWeight(name: string): number {
  return WEIGHTS[name] ?? 1;
}

/** Canonical ingredient names used across the dataset. */
export const CANONICAL_INGREDIENTS = [
  "rice", "egg", "onion", "pepper", "oil", "seasoning", "carrot", "tomato",
  "curry", "beans", "coconut", "sardine", "green beans", "chicken", "noodles",
  "yam", "spinach", "plantain", "bread", "garri", "spaghetti", "butter", "pap",
  "flour", "milk", "sugar", "mayonnaise", "sausage", "egusi", "okra", "ogbono",
  "achi", "potato", "salt", "water", "maggi", "garlic", "ginger", "crayfish",
] as const;

export const CANONICAL_SET = new Set<string>(CANONICAL_INGREDIENTS);

/** Quick-add chips shown in the ingredient step. */
export const QUICK_INGREDIENTS = [
  "rice", "egg", "noodles", "spaghetti", "beans", "yam", "plantain",
  "bread", "garri", "tomato", "pepper", "onion", "sardine", "chicken", "potato",
];

/** Aliases / synonyms → canonical name. */
export const ALIASES: Record<string, string> = {
  eggs: "egg",
  "boiled egg": "egg",
  "fried egg": "egg",
  tomatoes: "tomato",
  "fresh tomato": "tomato",
  "fresh tomatoes": "tomato",
  peppers: "pepper",
  "fresh pepper": "pepper",
  "bell pepper": "pepper",
  "chilli": "pepper",
  "chili": "pepper",
  "atarodo": "pepper",
  "shombo": "pepper",
  "tatashe": "pepper",
  onions: "onion",
  "red onion": "onion",
  "spring onion": "onion",
  indomie: "noodles",
  "instant noodles": "noodles",
  "indomie noodles": "noodles",
  "pasta": "spaghetti",
  "macaroni": "spaghetti",
  "spag": "spaghetti",
  "green bean": "green beans",
  "vegetable oil": "oil",
  "palm oil": "oil",
  "groundnut oil": "oil",
  "cooking oil": "oil",
  maggi: "seasoning",
  knorr: "seasoning",
  "stock cube": "seasoning",
  "bouillon cube": "seasoning",
  "seasoning cube": "seasoning",
  "spice": "seasoning",
  "spices": "seasoning",
  crayfish: "crayfish",
  "ground crayfish": "crayfish",
  sardines: "sardine",
  "titus fish": "sardine",
  "canned fish": "sardine",
  "tin fish": "sardine",
  "canned sardine": "sardine",
  plantains: "plantain",
  dodo: "plantain",
  "fried plantain": "plantain",
  potatoes: "potato",
  "irish potato": "potato",
  "irish potatoes": "potato",
  spuds: "potato",
  "sweet potato": "potato",
  gari: "garri",
  eba: "garri",
  "garri eba": "garri",
  akamu: "pap",
  ogi: "pap",
  "pap akamu": "pap",
  bean: "beans",
  "honey beans": "beans",
  "black eyed peas": "beans",
  "brown beans": "beans",
  "ewa": "beans",
  "agege bread": "bread",
  "sliced bread": "bread",
  breads: "bread",
  hen: "chicken",
  "chicken breast": "chicken",
  "chicken laps": "chicken",
  "meat": "chicken",
  beef: "chicken",
  fish: "sardine",
  "ugu": "spinach",
  "efo": "spinach",
  "shoko": "spinach",
  "green vegetable": "spinach",
  "vegetable": "spinach",
  "vegetables": "spinach",
  "sausages": "sausage",
  "hot dog": "sausage",
  "hot dogs": "sausage",
  mayo: "mayonnaise",
  "evaporated milk": "milk",
  "powdered milk": "milk",
  "wheat flour": "flour",
  "plain flour": "flour",
  "corn flour": "flour",
  yams: "yam",
  "pounded yam": "yam",
  "coconut milk": "coconut",
  "desiccated coconut": "coconut",
  "carrots": "carrot",
  "sugar": "sugar",
};

/**
 * Normalize a raw ingredient string into a canonical ingredient name.
 * Lowercases, strips quantities/punctuation, resolves aliases and simple plurals.
 * Never throws — unknown ingredients are returned as-is so they can't break the app.
 */
export function normalizeIngredient(raw: string): string {
  if (typeof raw !== "string") return "";

  let s = raw
    .toLowerCase()
    .replace(/[0-9]/g, " ")
    .replace(/[^a-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!s) return "";

  // Drop leading measurement/quantity words.
  s = s.replace(
    /^(a |an |some |few |small |medium |large |half |one |two |three |cup |cups |spoon |spoons |tin |tins |pack |packs |piece |pieces |slice |slices |kg |g |gram |grams |litre |liter |ml )+/,
    ""
  );
  s = s.trim();
  if (!s) return "";

  if (ALIASES[s]) return ALIASES[s];

  // Simple plural handling.
  if (s.endsWith("es") && CANONICAL_SET.has(s.slice(0, -2))) return s.slice(0, -2);
  if (s.endsWith("s") && s.length > 3 && CANONICAL_SET.has(s.slice(0, -1))) {
    return s.slice(0, -1);
  }

  return s;
}

export function normalizeIngredientList(list: string[]): string[] {
  const out: string[] = [];
  for (const item of list) {
    const n = normalizeIngredient(item);
    if (n && !out.includes(n)) out.push(n);
  }
  return out;
}
