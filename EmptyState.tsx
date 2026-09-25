// src/components/EmptyState.tsx
import type { ReactNode } from "react";

export function EmptyState({
  emoji = "🍽️",
  title,
  body,
  children,
}: {
  emoji ? : string;
  title: string;
  body: string;
  children ? : ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-charcoal/8 bg-white p-8 text-center shadow-soft">
      <div aria-hidden="true" className="mb-3 text-4xl">
        {emoji}
      </div>
      <h2 className="font-display text-xl font-bold text-charcoal">{title}</h2>
      <p className="mx-auto mt-2 max-w-sm leading-relaxed text-charcoal/65">{body}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}