// src/app/result/page.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSession } from "@/components/SessionProvider";
import { RecommendationCard } from "@/components/RecommendationCard";
import { EmptyState } from "@/components/EmptyState";
import { recommendMeal } from "@/lib/recommendation/recommend";

export default function ResultPage() {
  const router = useRouter();
  const { mood, budget, ingredients, seen, result, setResult, markSeen } =
  useSession();
  
  const [accepted, setAccepted] = useState(false);
  const [exhausted, setExhausted] = useState(false);
  const [missingInput, setMissingInput] = useState(false);
  
  // If the user deep-linked here without answering the questions, send them back.
  useEffect(() => {
    if (!mood || !budget) {
      setMissingInput(true);
      const t = setTimeout(() => router.replace("/recommend"), 1400);
      return () => clearTimeout(t);
    }
  }, [mood, budget, router]);
  
  // Safety net: inputs exist but no result was computed (e.g. hard refresh).
  useEffect(() => {
    if (mood && budget && !result) {
      const rec = recommendMeal({ mood, budget, ingredients }, seen);
      if (rec) setResult(rec);
      else setMissingInput(true);
    }
  }, [mood, budget, ingredients, seen, result, setResult]);
  
  const handleTryAnother = useCallback(() => {
    if (!result) return;
    setAccepted(false);
    
    const nextSeen = [...seen, result.meal.id];
    const next = recommendMeal({ mood, budget, ingredients }, nextSeen);
    
    if (!next) return;
    
    // Pool was exhausted — recommendMeal resets and may return the same meal.
    setExhausted(next.meal.id === result.meal.id);
    
    markSeen(result.meal.id);
    setResult(next);
    
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [result, seen, mood, budget, ingredients, markSeen, setResult]);
  
  if (missingInput) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16">
        <EmptyState
          emoji="🤔"
          title="Let's start from the top"
          body="We need your mood and budget first. Taking you back..."
        >
          <Link
            href="/recommend"
            className="inline-flex rounded-full bg-tomato px-6 py-3.5 font-semibold text-white shadow-soft transition hover:bg-tomato-dark"
          >
            Start over
          </Link>
        </EmptyState>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div className="mx-auto max-w-xl px-5 py-16">
        <EmptyState
          emoji="🍲"
          title="Still thinking..."
          body="Give us a second to work out what you should eat."
        />
      </div>
    );
  }
  
  return (
    <div className="mx-auto max-w-xl px-5 py-10 sm:py-14">
      {result.closeMatch && (
        <div className="mb-6 rounded-2xl border border-gold/40 bg-gold/10 p-4">
          <p className="text-sm leading-relaxed text-charcoal/75">
            <strong className="font-semibold">
              Hmm... your options are looking a little tight.
            </strong>{" "}
            We couldn&apos;t find a perfect match, but here&apos;s something close.
          </p>
        </div>
      )}

      <RecommendationCard
        result={result}
        inputBudget={budget}
        inputIngredients={ingredients}
        onTryAnother={handleTryAnother}
        onAccept={() => setAccepted(true)}
        accepted={accepted}
        exhausted={exhausted}
      />

      <div className="mt-8 text-center">
        <Link
          href="/recommend"
          className="text-sm font-semibold text-charcoal/50 underline underline-offset-4 transition hover:text-tomato"
        >
          Change my answers
        </Link>
      </div>
    </div>
  );
}
