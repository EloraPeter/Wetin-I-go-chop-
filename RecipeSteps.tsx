// src/components/RecipeSteps.tsx
export function RecipeSteps({ steps }: { steps: string[] }) {
  return (
    <ol className="space-y-3">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-3.5">
          <span
            aria-hidden="true"
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tomato/10 text-sm font-bold text-tomato"
          >
            {i + 1}
          </span>
          <p className="pt-0.5 leading-relaxed text-charcoal/80">{step}</p>
        </li>
      ))}
    </ol>
  );
}