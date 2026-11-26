import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/lib/site";
import { COMPARISONS, getComparisonBySlug } from "@/data/comparisons";
import { ComparePageView } from "@/components/ComparePageView";

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
      <ComparePageView comp={comp} />
    </div>
  );
}
