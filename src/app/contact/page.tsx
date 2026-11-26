import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Report a Fee Update",
  description: `Contact ${SITE_CONFIG.name} to suggest a new creator platform calculator or report a 2026 fee change.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
        Contact &amp; Fee Update Requests
      </h1>
      <p className="text-base text-slate-700 leading-relaxed">
        Spotted a new platform tier, regional surcharge, or want us to add another creator or SaaS
        payment platform? Send us the official pricing link and we will audit and update the
        calculator.
      </p>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
          <Mail className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-950">Direct Email</h2>
          <p className="mt-1 text-sm text-slate-600">
            Reach our editorial &amp; data team at{" "}
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="font-mono font-semibold text-emerald-700 hover:underline"
            >
              {SITE_CONFIG.contactEmail}
            </a>
            .
          </p>
          <p className="mt-2 text-xs text-slate-500">
            Please include the platform name, country/currency, and a link to the official pricing
            documentation so we can verify changes quickly.
          </p>
        </div>
      </div>
    </article>
  );
}
