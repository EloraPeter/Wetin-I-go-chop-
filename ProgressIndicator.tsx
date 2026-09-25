// src/components/ProgressIndicator.tsx
export function ProgressIndicator({
  step,
  total = 3,
}: {
  step: number;
  total ? : number;
}) {
  return (
    <div className="mb-7">
      <p className="mb-2.5 text-xs font-semibold uppercase tracking-wider text-charcoal/45">
        Step {step} of {total}
      </p>
      <div
        className="flex gap-1.5"
        role="progressbar"
        aria-valuemin={1}
        aria-valuemax={total}
        aria-valuenow={step}
        aria-label={`Step ${step} of ${total}`}
      >
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
              i < step ? "bg-tomato" : "bg-charcoal/10"
            }`}
          />
        ))}
      </div>
    </div>
  );
}