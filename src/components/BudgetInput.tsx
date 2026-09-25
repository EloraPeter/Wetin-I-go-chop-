// src/components/BudgetInput.tsx
"use client";

const QUICK_AMOUNTS = [1000, 2000, 3000, 5000];

export function BudgetInput({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label htmlFor="budget" className="mb-2 block text-sm font-semibold text-charcoal/70">
        Your budget
      </label>

      <div className="relative">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 font-display text-xl font-bold text-charcoal/40"
        >
          ₦
        </span>
        <input
          id="budget"
          type="number"
          inputMode="numeric"
          min={0}
          step={100}
          placeholder="0"
          value={value > 0 ? value : ""}
          onChange={(e) => {
            const raw = e.target.value;
            if (raw === "") return onChange(0);
            const n = Number(raw);
            onChange(Number.isFinite(n) && n >= 0 ? Math.min(n, 10_000_000) : 0);
          }}
          className="w-full rounded-2xl border-2 border-charcoal/12 bg-white py-4 pl-11 pr-5 font-display text-xl font-bold text-charcoal placeholder:text-charcoal/25 transition focus:border-tomato focus:outline-none focus:ring-4 focus:ring-tomato/20"
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {QUICK_AMOUNTS.map((amt) => {
          const selected = value === amt;
          return (
            <button
              key={amt}
              type="button"
              onClick={() => onChange(amt)}
              aria-pressed={selected}
              className={`rounded-full border-2 px-4 py-2.5 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30 ${
                selected
                  ? "border-tomato bg-tomato text-white"
                  : "border-charcoal/12 bg-white text-charcoal/75 hover:border-tomato/40 hover:text-tomato"
              }`}
            >
              ₦{amt.toLocaleString("en-NG")}
              {amt === 5000 ? "+" : ""}
            </button>
          );
        })}
      </div>
    </div>
  );
}
