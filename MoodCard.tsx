// src/components/MoodCard.tsx
"use client";

import type { MoodOption } from "@/data/moods";

export function MoodCard({
  mood,
  selected,
  onSelect,
}: {
  mood: MoodOption;
  selected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(mood.id)}
      aria-pressed={selected}
      className={`group flex w-full items-center gap-4 rounded-2xl border-2 px-4 py-4 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30 sm:px-5 ${
        selected
          ? "border-tomato bg-tomato/8 shadow-soft"
          : "border-charcoal/10 bg-white hover:-translate-y-0.5 hover:border-tomato/40 hover:shadow-soft"
      }`}
    >
      <span aria-hidden="true" className="text-2xl sm:text-3xl">
        {mood.emoji}
      </span>
      <span className="flex-1 font-semibold text-charcoal">{mood.label}</span>
      <span
        aria-hidden="true"
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold transition ${
          selected
            ? "border-tomato bg-tomato text-white"
            : "border-charcoal/20 text-transparent"
        }`}
      >
        ✓
      </span>
    </button>
  );
}