import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site";
import { ContactPageView } from "@/components/TrustPageViews";

export const metadata: Metadata = {
  title: "Contact & Report a Fee Update",
  description: `Contact ${SITE_CONFIG.name} to suggest a new creator platform calculator or report a 2026 fee change.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactPageView />;
}
