"use client";

import Link from "next/link";
import { AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, ExternalLink } from "lucide-react";
import { formatCurrency, formatPercent, type FeeResult } from "@/lib/fees";
import type { PlatformMeta } from "@/data/platforms";
import type { ComparisonMeta } from "@/data/comparisons";
import { COMPARISONS_ZH, PLATFORMS_ZH } from "@/data/zhContent";
import { PlatformCalculator } from "@/components/PlatformCalculator";
import { UI_COPY, useLanguage } from "@/lib/i18n";

interface QuickTableRow {
  price: number;
  fwd: FeeResult;
  requiredList: number;
}

interface PlatformPageViewProps {
  meta: PlatformMeta;
  quickTableRows: QuickTableRow[];
  relatedComps: ComparisonMeta[];
}

export function PlatformPageView({ meta, quickTableRows, relatedComps }: PlatformPageViewProps) {
  const { locale, isZh } = useLanguage();
  const t = UI_COPY[locale];
  const zh = PLATFORMS_ZH[meta.id];

  const category = isZh ? zh.category : meta.category;
  const headlineRate = isZh ? zh.headlineRate : meta.headlineRate;
  const heroSummary = isZh ? zh.heroSummary : meta.heroSummary;
  const whatChanged = isZh ? zh.whatChanged2026 : meta.whatChanged2026;
  const formulas = isZh ? zh.formulaSummary : meta.formulaSummary;
  const warnings = isZh ? zh.hiddenFeeWarnings : meta.hiddenFeeWarnings;
  const bestFor = isZh ? zh.bestFor : meta.bestFor;
  const faqs = isZh ? zh.faqs : meta.faqs;

  return (
    <>
      {/* Breadcrumb + Header */}
      <header className="space-y-3">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            {t.homeCrumb}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-900">
            {meta.name} {t.feeCalcSuffix}
          </span>
        </nav>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-800">
            {t.verifiedBadge}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-0.5 text-xs font-semibold text-slate-700">
            {category}
          </span>
          <span className="rounded-full bg-slate-100 px-3 py-0.5 font-mono text-xs font-semibold text-slate-700">
            {headlineRate}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {isZh ? `${meta.name} 费率计算器（2026）` : `${meta.name} Fee Calculator (2026)`}
        </h1>
        <p className="max-w-3xl text-base text-slate-600">{heroSummary}</p>
      </header>

      {/* Interactive Calculator */}
      <PlatformCalculator platformId={meta.id} />

      {/* Quick-Reference Payout Table */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">
          {meta.name} {t.quickTableTitleSuffix}
        </h2>
        <p className="mt-1 text-sm text-slate-600">{t.quickTableSub}</p>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2.5 pr-4 font-semibold">{t.colSalePrice}</th>
                <th className="py-2.5 px-4 text-right font-semibold">{t.colTotalFees}</th>
                <th className="py-2.5 px-4 text-right font-semibold">{t.effectiveRate}</th>
                <th className="py-2.5 px-4 text-right font-semibold">{t.colYouKeep}</th>
                <th className="py-2.5 pl-4 text-right font-semibold">{t.colChargeToNet}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {quickTableRows.map(({ price, fwd, requiredList }) => (
                <tr key={price} className="hover:bg-slate-50">
                  <td className="py-2.5 pr-4 font-mono font-semibold text-slate-900 tabular-nums">
                    {formatCurrency(price)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-rose-700 tabular-nums">
                    −{formatCurrency(fwd.totalFeePerSale)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono text-slate-700 tabular-nums">
                    {formatPercent(fwd.effectiveRatePct)}
                  </td>
                  <td className="py-2.5 px-4 text-right font-mono font-bold text-emerald-700 tabular-nums">
                    {formatCurrency(fwd.netPerSale)}
                  </td>
                  <td className="py-2.5 pl-4 text-right font-mono font-semibold text-slate-900 tabular-nums">
                    {formatCurrency(requiredList)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Educational Content Grid */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-950">
            {isZh
              ? `${meta.name} ${t.howFeesWorkSuffix}`
              : `${t.howFeesWorkPrefix} ${meta.name} ${t.howFeesWorkSuffix}`}
          </h2>
          <ul className="space-y-2.5 text-sm text-slate-700">
            {whatChanged.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-slate-900 p-4 text-xs text-slate-100 font-mono space-y-1.5">
            <p className="text-[11px] uppercase tracking-wider text-emerald-400 font-sans font-semibold">
              {t.transparentFormulas}
            </p>
            {formulas.map((f) => (
              <p key={f}>{f}</p>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-slate-950">{t.hiddenCostsTitle}</h2>
          <ul className="space-y-3 text-sm text-slate-700">
            {warnings.map((w) => (
              <li
                key={w}
                className="flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50/60 p-3.5 text-amber-950"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <span>{w}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">{t.bestFit}</p>
            <p className="mt-1">{bestFor}</p>
            <a
              href={meta.officialUrl}
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:underline"
            >
              {`${t.verifyOfficialPrefix} ${meta.name} ${t.verifyOfficialSuffix}`}
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </section>

      {/* Related Comparisons */}
      {relatedComps.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl font-bold text-slate-950">
            {isZh
              ? `${meta.name} ${t.compareSideTitleSuffix}`
              : `${t.compareSideTitlePrefix} ${meta.name} ${t.compareSideTitleSuffix}`}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {relatedComps.map((c) => {
              const czh = COMPARISONS_ZH[c.slug];
              return (
                <Link
                  key={c.slug}
                  href={`/compare/${c.slug}`}
                  className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm hover:border-emerald-400 transition-all"
                >
                  <h3 className="font-bold text-slate-950 group-hover:text-emerald-700">
                    {isZh && czh ? czh.title : c.title}
                  </h3>
                  <p className="mt-1.5 text-sm text-slate-600">
                    {isZh && czh ? czh.heroSummary : c.heroSummary}
                  </p>
                  <span className="mt-3 inline-flex items-center text-xs font-semibold text-emerald-700">
                    {t.runComparison} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      {/* FAQs */}
      {faqs.length > 0 && (
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-950">
            {isZh
              ? `${t.faqTitlePrefix}${meta.name} ${t.faqTitleSuffix}`
              : `${t.faqTitlePrefix} ${meta.name} ${t.faqTitleSuffix}`}
          </h2>
          <div className="mt-4 divide-y divide-slate-100">
            {faqs.map((faq) => (
              <div key={faq.question} className="py-4 first:pt-2 last:pb-0">
                <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
