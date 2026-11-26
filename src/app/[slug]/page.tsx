import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import {
  calculatePlatformFee,
  calculateReversePrice,
  formatCurrency,
  formatPercent,
} from "@/lib/fees";
import { SITE_CONFIG } from "@/lib/site";
import { getPlatformBySlug, STANDALONE_PLATFORMS } from "@/data/platforms";
import { getComparisonBySlug } from "@/data/comparisons";
import { PlatformCalculator } from "@/components/PlatformCalculator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return STANDALONE_PLATFORMS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const meta = getPlatformBySlug(slug);
  if (!meta) return {};
  return {
    title: meta.seoTitle,
    description: meta.seoDescription,
    alternates: {
      canonical: `/${meta.slug}`,
    },
    openGraph: {
      title: meta.seoTitle,
      description: meta.seoDescription,
      url: `${SITE_CONFIG.url}/${meta.slug}`,
    },
  };
}

export default async function PlatformCalculatorPage({ params }: PageProps) {
  const { slug } = await params;
  const meta = getPlatformBySlug(slug);
  if (!meta) notFound();

  const quickTableRows = meta.quickPrices.map((p) => {
    const fwd = calculatePlatformFee(meta.id, { price: p, monthlySales: 10 });
    const rev = calculateReversePrice(meta.id, p, { monthlySales: 10 });
    return { price: p, fwd, requiredList: rev.requiredPrice };
  });

  const relatedComps = meta.relatedComparisons
    .map((s) => getComparisonBySlug(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x));

  const softwareJsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `${meta.name} Fee Calculator (2026)`,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    url: `${SITE_CONFIG.url}/${meta.slug}`,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    description: meta.seoDescription,
  };

  const faqJsonLd =
    meta.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: meta.faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: f.answer,
            },
          })),
        }
      : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareJsonLd) }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* Breadcrumb + Header */}
      <header className="space-y-3">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-900">{meta.name} Fee Calculator</span>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-800">
            Verified {SITE_CONFIG.lastVerifiedLabel}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700">
            {meta.category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-0.5 font-mono text-xs font-semibold text-slate-700">
            {meta.headlineRate}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {meta.name} Fee Calculator (2026)
        </h1>
        <p className="max-w-3xl text-base text-slate-600">{meta.heroSummary}</p>
      </header>

      {/* Interactive Calculator */}
      <PlatformCalculator platformId={meta.id} />

      {/* Quick-Reference Payout Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">
          {meta.name} 2026 Quick-Reference Payout Table (US Domestic Card)
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          Instant take-home estimates on common price points plus the exact reverse list price to
          net each target amount after fees.
        </p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2.5 pr-4 font-semibold">Sale Price</th>
                <th className="py-2.5 px-4 text-right font-semibold">Total Fees</th>
                <th className="py-2.5 px-4 text-right font-semibold">Effective Rate</th>
                <th className="py-2.5 px-4 text-right font-semibold">You Keep</th>
                <th className="py-2.5 pl-4 text-right font-semibold">
                  Charge to Net Full Price
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quickTableRows.map(({ price, fwd, requiredList }) => (
                <tr key={price} className="hover:bg-slate-50">
                  <td className="py-2.5 pr-4 font-mono font-semibold text-slate-900 tabular-nums">
                    {formatCurrency(price)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-rose-700 tabular-nums">
                    −{formatCurrency(fwd.totalFeePerSale)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-700 tabular-nums">
                    {formatPercent(fwd.effectiveRatePct)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700 tabular-nums">
                    {formatCurrency(fwd.netPerSale)}
                  </td>
                  <td className="py-2.5 pl-4 text-right font-mono font-semibold text-slate-900 tabular-nums">
                    {formatCurrency(requiredList)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Educational Content Grid */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-950">
            How {meta.name} Fees Work in 2026
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-700">
            {meta.whatChanged2026.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-slate-900 p-4 text-xs text-slate-100 font-mono space-y-1.5">
            <p className="text-[11px] uppercase tracking-wider text-emerald-400 font-sans font-semibold">
              Transparent Formulas
            </p>
            {meta.formulaSummary.map((f) => (
              <p key={f}>{f}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-950">
            Hidden Costs &amp; Watch-Outs
          </h2>
          <ul className="space-y-3 text-sm text-slate-700">
            {meta.hiddenFeeWarnings.map((w) => (
              <li
                key={w}
                className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-amber-950"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>{w}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Best Fit</p>
            <p className="mt-1">{meta.bestFor}</p>
            <a
              href={meta.officialUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
            >
              Verify on official {meta.name} pricing page
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Comparisons */}
      {relatedComps.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950">
            Compare {meta.name} Side by Side
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedComps.map((c) => (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-400 transition-all"
              >
                <h3 className="font-bold text-slate-950 group-hover:text-emerald-700">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600">{c.heroSummary}</p>
                <span className="mt-3 inline-flex items-center text-xs font-semibold text-emerald-700">
                  Run comparison <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {meta.faqs.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            Frequently Asked Questions — {meta.name} Fees (2026)
          </h2>
          <div className="mt-4 divide-y divide-slate-100">
            {meta.faqs.map((faq) => (
              <div key={faq.question} className="py-4 first:pt-2 last:pb-0">
                <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
