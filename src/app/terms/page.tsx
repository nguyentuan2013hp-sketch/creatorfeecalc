import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site";
import { TermsPageView } from "@/components/TrustPageViews";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of Use and informational disclaimer for ${SITE_CONFIG.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <TermsPageView />;
}
