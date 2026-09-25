// src/components/IngredientTag.tsx
export function IngredientTag({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-tomato/10 py-1.5 pl-4 pr-2 text-sm font-semibold capitalize text-tomato-dark">
      {label}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove ${label}`}
        className="flex h-6 w-6 items-center justify-center rounded-full text-tomato-dark/60 transition hover:bg-tomato/15 hover:text-tomato-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-tomato/40"
      >
        <span aria-hidden="true" className="text-base leading-none">
          ×
        </span>
      </button>
    </span>
  );
}