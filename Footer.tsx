// src/components/Footer.tsx
export function Footer() {
  return (
    <footer className="mt-20 border-t border-charcoal/8 bg-cream px-5 py-10">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-3 text-center">
        <p className="font-display text-base font-bold text-charcoal">
          Wetin I Go <span className="text-tomato">Chop?</span>
        </p>
        <p className="text-sm text-charcoal/55">
          You tell us. We choose. You chop.
        </p>
        <p className="max-w-md text-xs leading-relaxed text-charcoal/40">
          Costs shown are estimates for a single homemade serving, not live market
          prices. Built for hungry, indecisive people. 🇳🇬
        </p>
      </div>
    </footer>
  );
}