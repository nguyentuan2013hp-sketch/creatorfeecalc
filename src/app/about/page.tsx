import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site";
import { AboutPageView } from "@/components/TrustPageViews";

export const metadata: Metadata = {
  title: "About",
  description: `Learn why ${SITE_CONFIG.name} builds transparent, zero-signup 2026 fee calculators for independent creators and SaaS founders.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return <AboutPageView />;
}
