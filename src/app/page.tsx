// src/app/recommend/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { MOODS } from "@/data/moods";
import { useSession } from "@/components/SessionProvider";
import { ProgressIndicator } from "@/components/ProgressIndicator";
import { MoodCard } from "@/components/MoodCard";
import { BudgetInput } from "@/components/BudgetInput";
import { IngredientInput } from "@/components/IngredientInput";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/Button";
import { recommendMeal } from "@/lib/recommendation/recommend";
import { normalizeIngredient } from "@/data/ingredients";

const TOTAL_STEPS = 3;

export default function RecommendPage() {
  const router = useRouter();
  const {
    mood,
    budget,
    ingredients,
    seen,
    setMood,
    setBudget,
    addIngredient,
    removeIngredient,
    clearIngredients,
    setResult,
  } = useSession();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [budgetError, setBudgetError] = useState("");
  
  // Land on the first incomplete step (preserves inputs across visits)
  useEffect(() => {
    if (!mood) setStep(1);
    else if (!budget) setStep(2);
    else setStep(3);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  const handleAddIngredient = useCallback(
    (raw: string) => {
      const normalized = normalizeIngredient(raw);
      if (normalized) addIngredient(normalized);
    },
    [addIngredient]
  );
  
  const finish = useCallback(() => {
    setLoading(true);
  }, []);
  
  const onLoadingDone = useCallback(() => {
    const recommendation = recommendMeal({ mood, budget, ingredients }, seen);
    if (!recommendation) {
      setLoading(false);
      router.push("/result");
      return;
    }
    setResult(recommendation);
    router.push("/result");
  }, [mood, budget, ingredients, seen, setResult, router]);
  
  if (loading) {
    return (
      <div className="mx-auto max-w-xl px-5">
        <LoadingState onDone={onLoadingDone} />
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-xl px-5 py-10 sm:py-14">
      <ProgressIndicator step={step} total={TOTAL_STEPS} />

      <div key={step} className="animate-fade-up">
        {step === 1 && (
          <section>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
              What&apos;s the vibe?
            </h1>
            <p className="mt-2.5 text-lg text-charcoal/65">
              Tell us how you&apos;re feeling. No judgement 😂
            </p>

            <div className="mt-8 space-y-3">
              {MOODS.map((m) => (
                <MoodCard
                  key={m.id}
                  mood={m}
                  selected={mood === m.id}
                  onSelect={setMood}
                />
              ))}
            </div>

            <div className="mt-8">
              <Button
                fullWidth
                disabled={!mood}
                onClick={() => setStep(2)}
              >
                Continue →
              </Button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
              How much are we working with?
            </h1>
            <p className="mt-2.5 text-lg text-charcoal/65">
              Be honest. We won&apos;t judge your wallet.
            </p>

            <div className="mt-8">
              <BudgetInput
                value={budget}
                onChange={(v) => {
                  setBudget(v);
                  if (budgetError) setBudgetError("");
                }}
              />
            </div>

            {budgetError && (
              <p role="alert" className="mt-3 text-sm font-medium text-tomato">
                {budgetError}
              </p>
            )}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
              <Button
                fullWidth
                onClick={() => {
                  if (!budget || budget <= 0) {
                    setBudgetError("Enter a valid amount so we can work with your budget.");
                    return;
                  }
                  setStep(3);
                }}
              >
                Continue →
              </Button>
              <Button variant="ghost" fullWidth onClick={() => setStep(1)}>
                ← Back
              </Button>
            </div>
          </section>
        )}

        {step === 3 && (
          <section>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
              What&apos;s in your kitchen?
            </h1>
            <p className="mt-2.5 text-lg text-charcoal/65">
              Tell us what you&apos;ve got. Even if it&apos;s just one thing.
            </p>

            <div className="mt-8">
              <IngredientInput
                ingredients={ingredients}
                onAdd={handleAddIngredient}
                onRemove={removeIngredient}
                onClearAll={clearIngredients}
              />
            </div>

            {ingredients.length === 0 && (
              <div className="mt-6 rounded-2xl border border-gold/40 bg-gold/10 p-4">
                <p className="text-sm leading-relaxed text-charcoal/75">
                  <strong className="font-semibold">No wahala.</strong> You don&apos;t
                  have anything at home? Tell us your budget and we&apos;ll still
                  find something.
                </p>
              </div>
            )}

            <div className="mt-8 space-y-3">
              <Button fullWidth onClick={finish}>
                What should I eat?
              </Button>

              <div className="flex flex-col gap-2 sm:flex-row">
                <Button variant="ghost" fullWidth onClick={() => setStep(2)}>
                  ← Back
                </Button>
                <Button
                  variant="secondary"
                  fullWidth
                  onClick={() => {
                    clearIngredients();
                    finish();
                  }}
                >
                  I don&apos;t have any ingredients
                </Button>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}