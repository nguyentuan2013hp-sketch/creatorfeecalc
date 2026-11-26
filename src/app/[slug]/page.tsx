import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { calculatePlatformFee, calculateReversePrice } from "@/lib/fees";
import { SITE_CONFIG } from "@/lib/site";
import { getPlatformBySlug, STANDALONE_PLATFORMS } from "@/data/platforms";
import { getComparisonBySlug } from "@/data/comparisons";
import { PlatformPageView } from "@/components/PlatformPageView";

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
      <PlatformPageView
        meta={meta}
        quickTableRows={quickTableRows}
        relatedComps={relatedComps}
      />
    </div>
  );
}
