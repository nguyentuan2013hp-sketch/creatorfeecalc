"use client";

import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import type { ComparisonMeta } from "@/data/comparisons";
import { PLATFORMS } from "@/data/platforms";
import { COMPARISONS_ZH } from "@/data/zhContent";
import { CompareCalculator } from "@/components/CompareCalculator";
import { UI_COPY, useLanguage } from "@/lib/i18n";

export function ComparePageView({ comp }: { comp: ComparisonMeta }) {
  const { locale, isZh } = useLanguage();
  const t = UI_COPY[locale];
  const czh = COMPARISONS_ZH[comp.slug];

  const leftMeta = PLATFORMS[comp.leftId];
  const rightMeta = PLATFORMS[comp.rightId];

  const title = isZh && czh ? czh.title : comp.title;
  const heroSummary = isZh && czh ? czh.heroSummary : comp.heroSummary;
  const verdictSummary = isZh && czh ? czh.verdictSummary : comp.verdictSummary;
  const keyDifferences = isZh && czh ? czh.keyDifferences : comp.keyDifferences;
  const whenToPickLeft = isZh && czh ? czh.whenToPickLeft : comp.whenToPickLeft;
  const whenToPickRight = isZh && czh ? czh.whenToPickRight : comp.whenToPickRight;
  const faqs = isZh && czh ? czh.faqs : comp.faqs;

  return (
    <>
      <header className="space-y-3">
        <nav className="flex items-center gap-1.5 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-slate-900">
            {t.homeCrumb}
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-slate-900">{title}</span>
        </nav>

        <span className="inline-block rounded-full bg-emerald-50 border border-emerald-200 px-3 py-0.5 text-xs font-semibold text-emerald-800">
          {t.h2hBadge}
        </span>

        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 sm:text-4xl">
          {title}
        </h1>
        <p className="max-w-3xl text-base text-slate-600">{heroSummary}</p>
      </header>

      <CompareCalculator comparison={comp} />

      {/* Verdict + Matrix */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-5">
        <div>
          <h2 className="text-xl font-bold text-slate-950">{t.bottomLineVerdict}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{verdictSummary}</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                <th className="py-2.5 pr-4 font-semibold">{t.colFeeDimension}</th>
                <th className="py-2.5 px-4 font-semibold">{leftMeta.name}</th>
                <th className="py-2.5 pl-4 font-semibold">{rightMeta.name}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {keyDifferences.map((row) => (
                <tr key={row.topic}>
                  <td className="py-3 pr-4 font-semibold text-slate-900">{row.topic}</td>
                  <td className="py-3 px-4 text-slate-700">{row.left}</td>
                  <td className="py-3 pl-4 text-slate-700">{row.right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* When to Pick Each */}
      <section className="grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            {t.whenToPick} {leftMeta.name}
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
            {whenToPickLeft.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-950">
            {t.whenToPick} {rightMeta.name}
          </h2>
          <ul className="mt-3 space-y-2.5 text-sm text-slate-700">
            {whenToPickRight.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQs */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">{t.faqTitlePlain}</h2>
        <div className="mt-4 divide-y divide-slate-100">
          {faqs.map((faq) => (
            <div key={faq.question} className="py-4 first:pt-2 last:pb-0">
              <h3 className="text-base font-bold text-slate-900">{faq.question}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
