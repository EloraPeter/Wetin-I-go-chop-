// src/components/Button.tsx
"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30 " +
  "disabled:opacity-45 disabled:cursor-not-allowed active:scale-[0.98] select-none";

const sizes = "px-6 py-3.5 text-base min-h-[52px]";

const variants: Record<Variant, string> = {
  primary:
    "bg-tomato text-white shadow-soft hover:bg-tomato-dark hover:shadow-lg hover:-translate-y-0.5",
  secondary:
    "bg-white text-charcoal border-2 border-charcoal/12 hover:border-tomato/50 hover:bg-cream",
  ghost: "bg-transparent text-charcoal/70 hover:bg-charcoal/5 hover:text-charcoal",
};

export function Button({
  variant = "primary",
  loading = false,
  fullWidth = false,
  className = "",
  children,
  disabled,
  ...rest
}: Props) {
  return (
    <button
      className={`${base} ${sizes} ${variants[variant]} ${
        fullWidth ? "w-full" : ""
      } ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...rest}
    >
      {loading && (
        <span
          aria-hidden="true"
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
        />
      )}
      {children}
    </button>
  );
}
