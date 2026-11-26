"use client";

import Link from "next/link";
import { SITE_CONFIG } from "@/lib/site";
import { STANDALONE_PLATFORMS } from "@/data/platforms";
import { COMPARISONS } from "@/data/comparisons";
import { UI_COPY, useLanguage } from "@/lib/i18n";

export function Footer() {
  const { locale, isZh } = useLanguage();
  const t = UI_COPY[locale];

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-base font-bold text-slate-900">{SITE_CONFIG.name}</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{t.footerDesc}</p>
            <p className="mt-3 text-xs text-slate-500">{t.footerVerified}</p>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              {t.footerCalcHead}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {STANDALONE_PLATFORMS.map((p) => (
                <li key={p.id}>
                  <Link href={`/${p.slug}`} className="hover:text-emerald-700 transition-colors">
                    {p.name} {t.feeCalcSuffix}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              {t.footerCompHead}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              {COMPARISONS.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/compare/${c.slug}`}
                    className="hover:text-emerald-700 transition-colors"
                  >
                    {c.title.replace(" Fee Calculator (2026)", "")}
                    {isZh ? " 对比" : ""}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              {t.footerTrustHead}
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/methodology" className="hover:text-emerald-700 transition-colors">
                  {t.footerMethodology}
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-emerald-700 transition-colors">
                  {t.footerAbout}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-700 transition-colors">
                  {t.footerContact}
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-emerald-700 transition-colors">
                  {t.footerPrivacy}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-700 transition-colors">
                  {t.footerTerms}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-slate-100 pt-6 text-xs text-slate-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p>{t.footerDisclaimer}</p>
          <p>{t.footerNotAffiliated}</p>
        </div>
      </div>
    </footer>
  );
}
