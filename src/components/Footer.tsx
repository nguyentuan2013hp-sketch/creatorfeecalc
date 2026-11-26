import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site";
import { STANDALONE_PLATFORMS } from "@/data/platforms";
import { COMPARISONS } from "@/data/comparisons";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-base font-bold text-slate-900">{SITE_CONFIG.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              Independent 2026 payment and platform fee calculators for creators, indie SaaS founders,
              and digital sellers. 100% browser-side — no sign-up, no tracking of your revenue data.
            </p>
            <p className="mt-3 text-xs text-slate-500">
              Fee rates verified: {SITE_CONFIG.lastVerifiedLabel}
            </p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Fee Calculators
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {STANDALONE_PLATFORMS.map((p) => (
                <li key={p.id}>
                  <Link href={`/${p.slug}`} className="hover:text-emerald-700 transition-colors">
                    {p.name} Fee Calculator
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Head-to-Head Comparisons
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {COMPARISONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="hover:text-emerald-700 transition-colors"
                  >
                    {c.title.replace(" Fee Calculator (2026)", "")}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Trust & Transparency
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/methodology" className="hover:text-emerald-700 transition-colors">
                  Fee Methodology & Formulas
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-700 transition-colors">
                  About {SITE_CONFIG.name}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-700 transition-colors">
                  Report a Fee Update / Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-700 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-700 transition-colors">
                  Terms of Use
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-xs text-slate-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {SITE_CONFIG.year} {SITE_CONFIG.name}. Estimates are for informational planning only;
            always verify final fees with your payment provider.
          </p>
          <p>Not affiliated with Gumroad, Lemon Squeezy, Paddle, Polar, Substack, Patreon, Payhip, Whop, Ko-fi, or Stripe.</p>
        </div>
      </div>
    </footer>
  );
}
