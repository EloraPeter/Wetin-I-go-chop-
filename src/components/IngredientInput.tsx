// src/components/IngredientInput.tsx
"use client";

import { useMemo, useState } from "react";
import { QUICK_INGREDIENTS, normalizeIngredient } from "@/data/ingredients";
import { IngredientTag } from "./IngredientTag";

export function IngredientInput({
  ingredients,
  onAdd,
  onRemove,
  onClearAll,
}: {
  ingredients: string[];
  onAdd: (v: string) => void;
  onRemove: (v: string) => void;
  onClearAll: () => void;
}) {
  const [draft, setDraft] = useState("");
  const [hint, setHint] = useState("");
  
  const quickOptions = useMemo(
    () => QUICK_INGREDIENTS.filter((i) => !ingredients.includes(i)).slice(0, 10),
    [ingredients]
  );
  
  function commit(raw: string) {
    const cleaned = normalizeIngredient(raw);
    if (!cleaned) {
      setHint("Type an ingredient first 🙂");
      return;
    }
    if (ingredients.includes(cleaned)) {
      setHint(`You already added ${cleaned}.`);
      setDraft("");
      return;
    }
    onAdd(cleaned);
    setDraft("");
    setHint("");
  }
  
  function handleKeyDown(e: React.KeyboardEvent < HTMLInputElement > ) {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      commit(draft);
      return;
    }
    if (e.key === "Backspace" && draft === "" && ingredients.length > 0) {
      onRemove(ingredients[ingredients.length - 1]);
    }
  }
  
  return (
    <div>
      <label htmlFor="ingredient" className="mb-2 block text-sm font-semibold text-charcoal/70">
        Add an ingredient
      </label>

      <div className="flex gap-2">
        <input
          id="ingredient"
          type="text"
          value={draft}
          autoComplete="off"
          placeholder="Type an ingredient..."
          onChange={(e) => {
            setDraft(e.target.value);
            if (hint) setHint("");
          }}
          onKeyDown={handleKeyDown}
          className="min-w-0 flex-1 rounded-2xl border-2 border-charcoal/12 bg-white px-5 py-3.5 text-base text-charcoal placeholder:text-charcoal/30 transition focus:border-tomato focus:outline-none focus:ring-4 focus:ring-tomato/20"
        />
        <button
          type="button"
          onClick={() => commit(draft)}
          className="shrink-0 rounded-2xl border-2 border-charcoal/12 bg-white px-5 font-semibold text-charcoal/75 transition hover:border-tomato/40 hover:text-tomato focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30"
        >
          Add
        </button>
      </div>

      <p aria-live="polite" className="mt-2 min-h-[20px] text-xs text-charcoal/50">
        {hint}
      </p>

      {ingredients.length > 0 && (
        <>
          <div className="mt-3 flex flex-wrap gap-2">
            {ingredients.map((ing) => (
              <IngredientTag key={ing} label={ing} onRemove={() => onRemove(ing)} />
            ))}
          </div>
          <button
            type="button"
            onClick={onClearAll}
            className="mt-3 text-xs font-semibold text-charcoal/45 underline underline-offset-4 transition hover:text-tomato"
          >
            Clear all ingredients
          </button>
        </>
      )}

      {quickOptions.length > 0 && (
        <div className="mt-6">
          <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal/40">
            Common ones
          </p>
          <div className="flex flex-wrap gap-2">
            {quickOptions.map((ing) => (
              <button
                key={ing}
                type="button"
                onClick={() => commit(ing)}
                className="rounded-full border border-charcoal/12 bg-white px-3.5 py-2 text-sm font-medium capitalize text-charcoal/70 transition hover:border-tomato/40 hover:bg-tomato/5 hover:text-tomato focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30"
              >
                + {ing}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
