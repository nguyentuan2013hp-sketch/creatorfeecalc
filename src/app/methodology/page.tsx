import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site";
import { PLATFORMS } from "@/data/platforms";

export const metadata: Metadata = {
  title: "Fee Methodology & Formulas (2026)",
  description:
    "Full formula documentation and 2026 official pricing sources behind CreatorFeeCalc's 10-platform fee engine and reverse pricing solver.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          Fee Methodology &amp; Verification Standards
        </h1>
        <p className="text-sm text-slate-600">
          Last full rate audit: <strong>{SITE_CONFIG.lastVerifiedDate}</strong>
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-bold text-slate-950">Core Accounting Equations</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Monthly Gross Revenue</strong> = Sale Price × Monthly Order Volume
          </li>
          <li>
            <strong>Total Monthly Fees</strong> = Platform Percentage Cut + Per-Transaction Fixed
            Fees + Payment Processing + Enabled Surcharges + Monthly Plan Subscription
          </li>
          <li>
            <strong>Effective Fee Rate (%)</strong> = (Total Monthly Fees ÷ Monthly Gross Revenue) ×
            100
          </li>
          <li>
            <strong>Reverse List Price Solver</strong>: Uses binary search across the exact
            platform fee schedule (including tiered volume brackets and fixed fees) to return the
            lowest cent-rounded price that guarantees Net Take-Home ≥ Target Net.
          </li>
        </ul>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-950">2026 Platform Pricing Schedule Summary</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                <th className="py-2 pr-3 font-semibold">Platform</th>
                <th className="py-2 px-3 font-semibold">Monthly Plan</th>
                <th className="py-2 px-3 font-semibold">Headline Rate</th>
                <th className="py-2 pl-3 font-semibold">MoR Tax Handling</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.values(PLATFORMS).map((p) => (
                <tr key={p.id}>
                  <td className="py-2.5 pr-3 font-semibold text-slate-900">{p.name}</td>
                  <td className="py-2.5 px-3 font-mono text-xs text-slate-700">
                    {p.monthlyPlanLabel}
                  </td>
                  <td className="py-2.5 px-3 text-slate-700">{p.headlineRate}</td>
                  <td className="py-2.5 pl-3 text-slate-700">
                    {p.isMoR ? "Full MoR" : "Seller / Optional"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}
