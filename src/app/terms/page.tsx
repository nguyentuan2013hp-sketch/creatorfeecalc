import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use and informational disclaimer for ${SITE_CONFIG.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-6 text-sm leading-relaxed text-slate-700">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Terms of Use</h1>
      <p className="text-xs text-slate-500">Effective Date: {SITE_CONFIG.lastVerifiedDate}</p>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-950">1. Informational Estimates Only</h2>
        <p>
          {SITE_CONFIG.name} provides payment and platform fee calculations strictly for
          informational and business-planning purposes. Calculations do not constitute financial,
          accounting, tax, or legal advice.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-950">2. Third-Party Pricing Changes</h2>
        <p>
          Payment processors and creator platforms update their fee schedules, promotional tiers,
          and FX spreads from time to time. While we audit schedules regularly, always verify final
          rates directly with your payment provider before making pricing or migration commitments.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-950">3. Trademarks</h2>
        <p>
          All product and company names referenced on this site (including Gumroad, Lemon Squeezy,
          Paddle, Polar, Substack, Patreon, Payhip, Whop, Ko-fi, and Stripe) are trademarks or
          registered trademarks of their respective holders. Mention of them does not imply any
          affiliation or endorsement.
        </p>
      </section>
    </article>
  );
}
