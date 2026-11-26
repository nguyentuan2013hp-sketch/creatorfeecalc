import type { Metadata } from "next";
import { MethodologyPageView } from "@/components/TrustPageViews";

export const metadata: Metadata = {
  title: "Fee Methodology & Formulas (2026)",
  description:
    "Full formula documentation and 2026 official pricing sources behind CreatorFeeCalc's 10-platform fee engine and reverse pricing solver.",
  alternates: { canonical: "/methodology" },
};

export default function MethodologyPage() {
  return <MethodologyPageView />;
}
