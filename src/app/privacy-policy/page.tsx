import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${SITE_CONFIG.name}. All fee calculations run locally in your browser.`,
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-6 text-sm leading-relaxed text-slate-700">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">Privacy Policy</h1>
      <p className="text-xs text-slate-500">Effective Date: {SITE_CONFIG.lastVerifiedDate}</p>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-950">1. Zero Server Storage of Calculator Inputs</h2>
        <p>
          All calculations performed on {SITE_CONFIG.name} execute entirely inside your web browser
          using client-side JavaScript. Numbers you enter (such as product prices, sales volumes, or
          pricing tiers) are never transmitted to or stored on our servers.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-950">2. Analytics &amp; Advertising</h2>
        <p>
          We may use privacy-friendly aggregated traffic analytics and third-party advertising
          networks (such as Google AdSense) to keep this tool free. Third-party ad partners may use
          cookies or similar technologies in accordance with their own privacy policies. You can
          manage ad personalization settings via your browser or Google Ad Settings.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-950">3. External Links</h2>
        <p>
          Our pages include links to official third-party platform pricing pages and optional
          partner links. We are not responsible for the privacy practices of external sites.
        </p>
      </section>

      <section className="space-y-2">
        <h2 className="text-lg font-bold text-slate-950">4. Contact</h2>
        <p>
          For privacy questions, email{" "}
          <a
            href={`mailto:${SITE_CONFIG.contactEmail}`}
            className="font-semibold text-emerald-700 hover:underline"
          >
            {SITE_CONFIG.contactEmail}
          </a>
          .
        </p>
      </section>
    </article>
  );
}
