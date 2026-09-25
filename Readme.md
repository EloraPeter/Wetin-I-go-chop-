# Wetin I Go Chop? 🍲

**You tell us. We choose. You chop.**

A Nigeria-first food **decision** app. You're hungry, you don't know what to eat, and you don't want to think about it. Tell us your vibe, your budget and what's in your kitchen — we'll pick something.

---

## What was built

An MVP responsive web app with three screens:

| Route        | Purpose                                                                 |
| ------------ | ----------------------------------------------------------------------- |
| `/`          | Landing page — explains the product in one glance                        |
| `/recommend` | 3-step questionnaire: mood → budget → ingredients                        |
| `/result`    | The recommendation: meal, why we picked it, cost, time, recipe, try again |

**Core loop:** mood + budget + ingredients → deterministic scoring → ranked meal → explanation → recipe → *Try another meal* (inputs preserved).

---

## Project structure

```
src/
├── app/
│   ├── layout.tsx          # Fonts, SessionProvider, Header/Footer
│   ├── page.tsx            # Landing
│   ├── recommend/page.tsx  # Questionnaire (3 steps + loading)
│   ├── result/page.tsx     # Recommendation + try-again
│   └── globals.css
├── components/
│   ├── SessionProvider.tsx # Session state (sessionStorage-backed)
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Button.tsx
│   ├── ProgressIndicator.tsx
│   ├── MoodCard.tsx
│   ├── BudgetInput.tsx
│   ├── IngredientInput.tsx
│   ├── IngredientTag.tsx
│   ├── LoadingState.tsx
│   ├── EmptyState.tsx
│   ├── RecommendationCard.tsx
│   ├── MatchBadge.tsx
│   ├── RecipeSteps.tsx
│   └── MealVisual.tsx
├── data/
│   ├── meals.ts        # 50 meals (Nigeria-first)
│   ├── moods.ts        # Mood taxonomy + friendly labels
│   └── ingredients.ts  # Canonical names, aliases, pantry weights
├── lib/recommendation/
│   ├── score.ts        # mood / budget / ingredient scoring
│   ├── recommend.ts    # ranking, selection, reasons, fallback
│   └── visual.ts       # emoji + gradient helpers
└── types/
    ├── meal.ts
    └── recommendation.ts
```

**Architectural rule respected:** UI → business logic → data. No scoring logic lives in a component.

---

## How recommendation scoring works

Deterministic. No LLM. Fully testable and explainable.

```
score = (moodScore × 0.35) + (budgetScore × 0.35) + (ingredientScore × 0.30)
```

All three components are normalized to **0–100** first.

### 1. Mood score (35%)

Each meal carries `moods` tags (`tired`, `spicy`, `comforting`, `quick`, `budget`, …).

| Condition                                      | Score |
| ---------------------------------------------- | ----- |
| Exact tag match                                | 100   |
| Related mood via affinity map (e.g. `tired` ↔ `quick`, `budget`) | 70    |
| Meal tagged `hungry` (universal fallback)      | 45    |
| Otherwise                                      | 25    |
| Mood `any` ("I honestly don't know")           | 80 for everyone (neutral) |

### 2. Budget score (35%)

Based on `cost / budget`:

| Ratio       | Score      |
| ----------- | ---------- |
| ≤ 0.5×      | 100        |
| ≤ 1.0×      | 100 → 90   |
| ≤ 1.25×     | 90 → 50    |
| ≤ 1.6×      | 50 → 15    |
| beyond      | 5          |

Meals above `budget × 1.6` are filtered out entirely — unless *nothing* qualifies, in which case the filter is relaxed (the app never dead-ends).

### 3. Ingredient score (30%)

Weighted coverage of the meal's ingredient list. Pantry items count for less:

- `salt` 0.25 · `oil` 0.35 · `seasoning` 0.3 · `onion`/`pepper` 0.6 · everything else 1.0

```
coverage = Σ(weight of matched) / Σ(weight of required)
score    = 25 + coverage × 75
```

The **25 floor** means one random unmatched ingredient can't zero out an otherwise good meal. If the user lists **no** ingredients at all, the score is a neutral **65** so mood and budget drive the decision.

### Selection & "Try another meal"

1. Score and rank every meal (ties broken by cheaper first).
2. Drop previously shown meal IDs.
3. Take the top 5 remaining and return the highest.
4. If every meal has been shown, the exclusion pool resets.

Your mood, budget and ingredients are **never cleared** — the questionnaire is not re-shown.

---

## Ingredient normalization

`normalizeIngredient()` in `src/data/ingredients.ts` handles:

- Lowercasing, trimming, stripping digits/punctuation
- Removing quantities (`2 eggs` → `egg`, `a cup of rice` → `rice`)
- Aliases & synonyms (`indomie` → `noodles`, `titus` → `sardine`, `eba` → `garri`, `dodo` → `plantain`, `maggi` → `seasoning`, `ugu` → `spinach`, …)
- Simple plurals (`tomatoes` → `tomato`, `eggs` → `egg`)

Unknown ingredients are **kept as-is** and can never crash the app.

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
npm run build       # production build
npm run start       # serve the production build
```

---

## Deployment

1. Push to GitHub.
2. Import the repo on Vercel.
3. Framework preset: Next.js — no environment variables required.
4. Deploy.

---

## Recommendation tests (manual)

Run through these against `/recommend`:

| # | Mood        | Budget  | Ingredients              | Expected                                      |
| - | ----------- | ------- | ------------------------ | --------------------------------------------- |
| 1 | tired       | ₦2,000  | rice, egg                | A quick rice/egg meal ranks first             |
| 2 | spicy       | ₦3,000  | noodles, egg, pepper     | Spicy Egg Noodles ranks first                 |
| 3 | comforting  | ₦2,000  | rice, egg, tomato        | A comforting rice dish ranks first            |
| 4 | tired       | ₦1,000  | (none)                   | Cheap quick meal, no crash                    |
| 5 | happy       | ₦5,000  | (none)                   | Broader, more premium recommendation          |
| 6 | spicy       | ₦500    | rice                     | No crash; falls back to something affordable  |
| 7 | tired       | ₦2,000  | rice, egg, pepper        | Try another meal does not repeat the meal     |

---

## Known limitations

- Costs are estimates for a single homemade serving, not live market prices. The UI labels them "Estimated cost" deliberately.
- The dataset is 50 meals, hardcoded in TypeScript. No database, no CMS.
- `mealTimes` exists on every meal but is not used in scoring — reserved for V2 (time-based recommendations).
- Ingredient normalization covers common Nigerian aliases but is not exhaustive.
- Food visuals are emoji-based gradient cards rather than photographs — zero external assets, zero broken images, fast load.
- No accounts, no persistence beyond the browser session (sessionStorage).

---

## Future recommendations

**V2 — Convenience:** favourites, meal history, "Surprise Me", time-of-day scoring, admin meal management, expanded dataset.

**V3 — Personalization:** accounts, dietary preferences, allergies, nutrition info, shopping lists, better normalization.

**V4 — Local discovery:** location-based suggestions, restaurant & vendor recommendations, ordering integrations.

**V5 — AI layer:** a conversational front-end ("I'm tired, ₦3k, there's rice and egg but I don't want stress") that maps natural language onto the existing `RecommendationInput`. The deterministic engine stays the foundation — AI is only the interface.

---

## Non-goals (deliberately not built)

Authentication · database · social features · food ordering · payments · vendor dashboards · chatbot · nutrition tracker · CMS · subscriptions · native apps.
