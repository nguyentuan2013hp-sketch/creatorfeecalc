import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";
import { COMPARISONS, getComparisonBySlug } from "@/data/comparisons";
import { PLATFORMS } from "@/data/platforms";
import { CompareCalculator } from "@/components/CompareCalculator";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) return {};
  return {
    title: comp.seoTitle,
    description: comp.seoDescription,
    alternates: {
      canonical: `/compare/${comp.slug}`,
    },
    openGraph: {
      title: comp.seoTitle,
      description: comp.seoDescription,
      url: `${SITE_CONFIG.url}/compare/${comp.slug}`,
    },
  };
}

export default async function ComparePage({ params }: PageProps) {
  const { slug } = await params;
  const comp = getComparisonBySlug(slug);
  if (!comp) notFound();

  const leftMeta = PLATFORMS[comp.leftId];
  const rightMeta = PLATFORMS[comp.rightId];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comp.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-10 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <header className="space-y-3">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-900">{comp.title}</span>
        </nav>

        <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-800">
          2026 Head-to-Head Comparison · Verified {SITE_CONFIG.lastVerifiedLabel}
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {comp.title}
        </h1>
        <p className="max-w-3xl text-base text-slate-600">{comp.heroSummary}</p>
      </header>

      <CompareCalculator comparison={comp} />

      {/* Verdict + Matrix */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-950">Bottom-Line Verdict (2026)</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{comp.verdictSummary}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2.5 pr-4 font-semibold">Fee Dimension</th>
                <th className="py-2.5 px-4 font-semibold">{leftMeta.name}</th>
                <th className="py-2.5 pl-4 font-semibold">{rightMeta.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comp.keyDifferences.map((row) => (
                <tr key={row.topic}>
                  <td className="py-3 pr-4 font-semibold text-slate-900">{row.topic}</td>
                  <td className="py-3 px-4 text-slate-700">{row.left}</td>
                  <td className="py-3 pl-4 text-slate-700">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* When to Pick Each */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">When to Pick {leftMeta.name}</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
            {comp.whenToPickLeft.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">When to Pick {rightMeta.name}</h2>
          <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
            {comp.whenToPickRight.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">Frequently Asked Questions</h2>
        <div className="mt-4 divide-y divide-slate-100">
          {comp.faqs.map((faq) => (
            <div key={faq.question} className="py-4 first:pt-2 last:pb-0">
              <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
