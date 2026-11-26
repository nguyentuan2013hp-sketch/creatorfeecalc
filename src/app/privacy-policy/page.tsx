import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site";
import { PrivacyPolicyPageView } from "@/components/TrustPageViews";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_CONFIG.name}. All fee calculations run locally in your browser.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return <PrivacyPolicyPageView />;
}
