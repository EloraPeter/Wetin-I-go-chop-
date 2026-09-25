// src/components/RecommendationCard.tsx
"use client";

import type { RecommendationResult } from "@/types/recommendation";
import { MealVisual } from "./MealVisual";
import { MatchBadge } from "./MatchBadge";
import { RecipeSteps } from "./RecipeSteps";

const DIFFICULTY_LABEL: Record < string, string > = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function RecommendationCard({
  result,
  inputBudget,
  inputIngredients,
  onTryAnother,
  onAccept,
  accepted,
  exhausted,
}: {
  result: RecommendationResult;
  inputBudget: number;
  inputIngredients: string[];
  onTryAnother: () => void;
  onAccept: () => void;
  accepted: boolean;
  exhausted: boolean;
}) {
  const { meal, reasons } = result;
  
  return (
    <div className="animate-fade-up">
      {/* Hero */}
      <MealVisual meal={meal} />

      <div className="mt-6">
        <h1 className="font-display text-3xl font-extrabold leading-tight text-charcoal sm:text-4xl">
          {meal.name}
        </h1>
        <p className="mt-2.5 text-lg text-charcoal/65">
          {result.closeMatch
            ? "Not a perfect match, but this one makes the most sense."
            : "This one makes sense for you."}
        </p>
      </div>

      {/* Explanation */}
      <div className="mt-6 rounded-3xl border border-charcoal/8 bg-white p-5 shadow-soft sm:p-6">
        <p className="leading-relaxed text-charcoal/80">
          {reasons.join(". ")}.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {result.moodScore >= 70 && <MatchBadge label="Mood match" />}
          {inputBudget > 0 && result.budgetScore >= 50 && (
            <MatchBadge label="Budget match" />
          )}
          {inputIngredients.length > 0 && result.ingredientScore >= 55 && (
            <MatchBadge label="Ingredient match" />
          )}
          {meal.cookingTimeMinutes <= 20 && <MatchBadge label="Quick" />}
        </div>
      </div>

      {/* Summary */}
      <dl className="mt-5 grid grid-cols-3 gap-3">
        <Stat
          label="Estimated cost"
          value={`₦${meal.estimatedCostNgn.toLocaleString("en-NG")}`}
        />
        <Stat label="Cooking time" value={`${meal.cookingTimeMinutes} min`} />
        <Stat label="Difficulty" value={DIFFICULTY_LABEL[meal.difficulty]} />
      </dl>

      {/* Why we picked this */}
      <section className="mt-8">
        <h2 className="mb-3 font-display text-lg font-bold text-charcoal">
          Why we picked this
        </h2>
        <ul className="space-y-2">
          {reasons.map((r, i) => (
            <li key={i} className="flex gap-2.5 text-charcoal/75">
              <span aria-hidden="true" className="text-leaf">
                ✓
              </span>
              <span>{r}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Ingredients */}
      <section className="mt-8">
        <h2 className="mb-3 font-display text-lg font-bold text-charcoal">
          You&apos;ll need
        </h2>
        <ul className="flex flex-wrap gap-2">
          {meal.ingredients.map((ing) => {
            const has = inputIngredients.includes(ing);
            return (
              <li
                key={ing}
                className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-sm font-medium capitalize ${
                  has
                    ? "bg-leaf/12 text-leaf"
                    : "bg-charcoal/6 text-charcoal/70"
                }`}
              >
                {has && (
                  <span aria-hidden="true" className="text-xs">
                    ✓
                  </span>
                )}
                {ing}
              </li>
            );
          })}
        </ul>
      </section>

      {/* Instructions */}
      <section className="mt-8">
        <h2 className="mb-4 font-display text-lg font-bold text-charcoal">
          How to make it
        </h2>
        <RecipeSteps steps={meal.instructions} />
      </section>

      {/* Actions */}
      <div className="mt-10 space-y-3">
        {accepted ? (
          <div className="rounded-3xl border-2 border-leaf/25 bg-leaf/8 p-6 text-center">
            <p className="font-display text-xl font-bold text-charcoal">
              Correct answer. Go and chop. 🍽️
            </p>
            <p className="mt-1.5 text-charcoal/65">
              Enjoy your {meal.name.toLowerCase()}.
            </p>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAccept}
            className="w-full rounded-full bg-tomato px-6 py-4 font-semibold text-white shadow-soft transition hover:bg-tomato-dark focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30 active:scale-[0.99]"
          >
            I&apos;m eating this
          </button>
        )}

        <button
          type="button"
          onClick={onTryAnother}
          className="w-full rounded-full border-2 border-charcoal/12 bg-white px-6 py-4 font-semibold text-charcoal transition hover:border-tomato/40 hover:text-tomato focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30"
        >
          Try another meal
        </button>

        {exhausted && (
          <p className="pt-1 text-center text-xs text-charcoal/45">
            That&apos;s everything that fits — we&apos;ve looped back around.
          </p>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string;value: string }) {
  return (
    <div className="rounded-2xl border border-charcoal/8 bg-white px-3 py-4 text-center">
      <dt className="text-[11px] font-semibold uppercase tracking-wide text-charcoal/45">
        {label}
      </dt>
      <dd className="mt-1.5 font-display text-base font-bold text-charcoal sm:text-lg">
        {value}
      </dd>
    </div>
  );
}
