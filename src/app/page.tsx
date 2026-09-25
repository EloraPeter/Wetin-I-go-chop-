// src/app/page.tsx
import Link from "next/link";

const FOOD_EMOJIS = ["🍚", "🍜", "🍳", "🍌", "🫘", "🍝", "🍠", "🥘", "🥪"];

export default function LandingPage() {
  return (
    <div className="mx-auto max-w-5xl px-5">
      {/* HERO */}
      <section className="py-14 sm:py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-gold/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-charcoal/70">
              🇳🇬 Naija-first food decisions
            </p>

            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-charcoal sm:text-5xl lg:text-6xl">
              Wetin I Go <span className="text-tomato">Chop?</span>
            </h1>

            <p className="mt-5 font-display text-xl font-semibold text-charcoal/80 sm:text-2xl">
              Don&apos;t know what to eat? We&apos;ve got you.
            </p>

            <p className="mt-4 max-w-lg text-lg leading-relaxed text-charcoal/65">
              Tell us how you&apos;re feeling, what you want to spend, and what
              you&apos;ve already got. We&apos;ll help you figure out the rest.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-full bg-tomato px-8 py-4 text-lg font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-tomato-dark hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30 active:scale-[0.98]"
              >
                What should I eat?
              </Link>
              <p className="text-sm text-charcoal/50 sm:ml-2">
                No overthinking. No food wahala.
              </p>
            </div>
          </div>

          {/* Food collage */}
          <div className="relative" aria-hidden="true">
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {FOOD_EMOJIS.map((emoji, i) => (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded-3xl bg-white text-4xl shadow-soft sm:text-5xl ${
                    i % 2 === 0 ? "translate-y-0" : "translate-y-3"
                  }`}
                >
                  <span className={i % 3 === 0 ? "" : "opacity-90"}>{emoji}</span>
                </div>
              ))}
            </div>
            <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-gold/25 via-transparent to-tomato/20 blur-2xl" />
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="scroll-mt-24 py-14 sm:py-16">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          How it works
        </h2>
        <p className="mt-3 max-w-xl text-lg text-charcoal/65">
          Three small questions. One clear answer. Under a minute.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-3">
          <Step
            n="1"
            emoji="😴"
            title="Tell us the vibe"
            body="Tired? Spicy mood? Just want comfort? Pick one. No judgement."
          />
          <Step
            n="2"
            emoji="💸"
            title="Tell us your budget"
            body="₦1,000 or ₦5,000 — we'll work with whatever you've got."
          />
          <Step
            n="3"
            emoji="🧅"
            title="Tell us what you've got"
            body="Rice? Egg? Nothing at all? That's fine too. We'll still find something."
          />
        </div>
      </section>

      {/* ABOUT */}
      <section
        id="about"
        className="scroll-mt-24 rounded-3xl border border-charcoal/8 bg-white p-8 shadow-soft sm:p-12"
      >
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-charcoal sm:text-4xl">
          This is not a recipe site
        </h2>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal/70">
          It&apos;s a food <strong className="font-semibold text-charcoal">decision</strong>{" "}
          product. The recipe is just supporting information. The real job is
          simple: you&apos;re hungry, you don&apos;t want to think, you just want
          somebody to tell you what to eat.
        </p>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-charcoal/70">
          So that&apos;s what we do.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-charcoal/70">
            🇳🇬 Nigerian meals first
          </span>
          <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-charcoal/70">
            ⚡ Under 60 seconds
          </span>
          <span className="rounded-full bg-cream px-4 py-2 text-sm font-semibold text-charcoal/70">
            🧠 Zero overthinking
          </span>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-16 text-center sm:py-20">
        <p className="font-display text-2xl font-extrabold text-charcoal sm:text-3xl">
          Stop thinking. Start chopping.
        </p>
        <Link
          href="/recommend"
          className="mt-7 inline-flex items-center justify-center rounded-full bg-tomato px-9 py-4 text-lg font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-tomato-dark hover:shadow-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-tomato/30 active:scale-[0.98]"
        >
          What should I eat?
        </Link>
      </section>
    </div>
  );
}

function Step({
  n,
  emoji,
  title,
  body,
}: {
  n: string;
  emoji: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-3xl border border-charcoal/8 bg-white p-6 shadow-soft">
      <div className="flex items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-tomato/10 font-display text-sm font-bold text-tomato"
        >
          {n}
        </span>
        <span aria-hidden="true" className="text-2xl">
          {emoji}
        </span>
      </div>
      <h3 className="mt-4 font-display text-lg font-bold text-charcoal">{title}</h3>
      <p className="mt-1.5 leading-relaxed text-charcoal/65">{body}</p>
    </div>
  );
}