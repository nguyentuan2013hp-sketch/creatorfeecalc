import Link from "next/link";
import { ArrowRight, CheckCircle2, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";
import { STANDALONE_PLATFORMS } from "@/data/platforms";
import { COMPARISONS } from "@/data/comparisons";
import { HubComparator } from "@/components/HubComparator";

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: SITE_CONFIG.description,
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14 space-y-14">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
          <Sparkles className="h-3.5 w-3.5" />
          Updated for {SITE_CONFIG.lastVerifiedLabel} · 100% Free &amp; Browser-Side
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          Know Exactly What You Keep After Platform Fees
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
          Headline rates hide international card markups, PayPal surcharges, Stripe Billing cuts,
          and iOS fees. Compare real 2026 net payouts and reverse list prices across 10 creator and
          SaaS payment platforms in seconds.
        </p>
        <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-slate-600 sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> No sign-up required
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Reverse pricing solver
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> Tier break-even alerts
          </span>
        </div>
      </section>

      {/* Flagship 10-Platform Interactive Comparator */}
      <HubComparator />

      {/* 9 Single-Platform Calculators Grid */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Dedicated Platform Fee Calculators (2026)
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Pick a platform to unlock platform-specific tiers, volume discounts, iOS vs. web
            toggles, and reverse target-net pricing.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STANDALONE_PLATFORMS.map((p) => (
            <Link
              key={p.id}
              href={`/${p.slug}`}
              className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {p.category}
                  </span>
                  {p.isMoR && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                      <ShieldCheck className="h-3 w-3" /> MoR
                    </span>
                  )}
                </div>
                <h3 className="mt-2 text-lg font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                  {p.name} Fee Calculator
                </h3>
                <p className="mt-1 font-mono text-xs font-semibold text-emerald-700">
                  {p.headlineRate}
                </p>
                <p className="mt-2 text-sm text-slate-600 line-clamp-2">{p.heroSummary}</p>
              </div>
              <div className="mt-4 flex items-center text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                Calculate payout <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5 Head-to-Head Comparisons */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-emerald-600" />
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">
            Head-to-Head Platform Fee Comparisons
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMPARISONS.map((c) => (
            <Link
              key={c.slug}
              href={`/compare/${c.slug}`}
              className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md"
            >
              <h3 className="text-base font-bold text-slate-950 group-hover:text-emerald-700">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 line-clamp-3">{c.heroSummary}</p>
              <p className="mt-4 inline-flex items-center text-xs font-semibold text-emerald-700">
                Compare side by side <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Fee Math Matters (Educational Trust Block) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">
          Why 2026 Creator &amp; SaaS Fees Are Rarely What the Pricing Page Says
        </h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3 text-sm leading-relaxed text-slate-600">
          <div>
            <h3 className="font-bold text-slate-900">1. Stacked Checkout Surcharges</h3>
            <p className="mt-1.5">
              A 5% base rate frequently becomes 7%–8.5% once international card fees (+1.5%),
              PayPal (+1.5%), and subscription billing fees (+0.5% to +0.7%) stack together.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">2. Flat Per-Transaction Drag</h3>
            <p className="mt-1.5">
              On a $5 newsletter or $9 template, fixed fees ($0.30–$0.80) can quietly eat 6% to 9%
              on top of percentage cuts. Annual billing or reverse pricing fixes that margin leak.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">3. Monthly Plan Break-Even</h3>
            <p className="mt-1.5">
              Paying $12–$29/month on Ko-fi Gold, Polar Pro, or Payhip Plus often pays for itself
              at just $240–$1,400/month in sales. Our calculators flag those thresholds live.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
