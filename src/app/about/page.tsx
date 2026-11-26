import type { Metadata } from "next";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `Learn why ${SITE_CONFIG.name} builds transparent, zero-signup 2026 fee calculators for independent creators and SaaS founders.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
        About {SITE_CONFIG.name}
      </h1>
      <p className="text-base leading-relaxed text-slate-700">
        {SITE_CONFIG.name} is an independent financial utility built for indie software founders,
        newsletter writers, course creators, and digital product sellers. Our goal is simple: make
        it effortless to calculate what you actually keep after every platform cut, card processor
        fee, international surcharge, and monthly subscription tier.
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-bold text-slate-950">What Makes Our Calculators Different</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>No hidden-fee blind spots:</strong> We explicitly model international card
            markups (+1.5%), PayPal checkout fees, Stripe Billing recurring fees (+0.7%), iOS
            App Store cuts, and volume tiers.
          </li>
          <li>
            <strong>100% browser-side privacy:</strong> Every calculation runs locally in your
            browser. We never ask you to create an account or submit revenue figures to a server.
          </li>
          <li>
            <strong>Regularly verified schedules:</strong> Every platform schedule is checked
            against official public pricing pages (last verified {SITE_CONFIG.lastVerifiedLabel}).
          </li>
        </ul>
      </div>
      <p className="text-sm text-slate-600">
        Want to inspect our exact math? Read our{" "}
        <Link href="/methodology" className="font-semibold text-emerald-700 hover:underline">
          Methodology &amp; Formulas
        </Link>{" "}
        or{" "}
        <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">
          report a fee update
        </Link>
        .
      </p>
    </article>
  );
}
