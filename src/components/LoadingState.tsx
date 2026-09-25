// src/components/LoadingState.tsx
"use client";

import { useEffect, useState } from "react";

const MESSAGES = [
  "Hmm... let me think 🤔",
  "Checking your budget...",
  "Looking at what you've got...",
  "Finding something you'll actually want to eat...",
  "Okay, I found something. 👀",
];

const STEP_MS = 620;

export function LoadingState({ onDone }: { onDone: () => void }) {
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index >= MESSAGES.length - 1) {
      const t = setTimeout(onDone, STEP_MS);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [index, onDone]);
  
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
    >
      <div className="relative mb-8 flex h-24 w-24 items-center justify-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-tomato/15" />
        <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-gold/40 to-tomato/30 text-4xl">
          🍲
        </span>
      </div>

      <p
        key={index}
        className="animate-fade-up font-display text-xl font-bold text-charcoal sm:text-2xl"
      >
        {MESSAGES[index]}
      </p>

      <div className="mt-8 flex gap-1.5" aria-hidden="true">
        {MESSAGES.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i <= index ? "w-6 bg-tomato" : "w-1.5 bg-charcoal/12"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
