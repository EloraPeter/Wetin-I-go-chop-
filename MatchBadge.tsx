// src/components/MatchBadge.tsx
export function MatchBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf/12 px-3 py-1.5 text-xs font-semibold text-leaf">
      <span aria-hidden="true">✓</span>
      {label}
    </span>
  );
}