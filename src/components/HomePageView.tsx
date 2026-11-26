"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Scale, ShieldCheck, Sparkles } from "lucide-react";
import { STANDALONE_PLATFORMS } from "@/data/platforms";
import { COMPARISONS } from "@/data/comparisons";
import { COMPARISONS_ZH, PLATFORMS_ZH } from "@/data/zhContent";
import { HubComparator } from "@/components/HubComparator";
import { UI_COPY, useLanguage } from "@/lib/i18n";

export function HomePageView() {
  const { locale, isZh } = useLanguage();
  const t = UI_COPY[locale];

  return (
    <>
      {/* Hero */}
      <section className="max-w-3xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800">
          <Sparkles className="h-3.5 w-3.5" />
          {t.heroBadge}
        </div>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-950 sm:text-5xl">
          {t.heroTitle}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">{t.heroSub}</p>
        <div className="mt-5 flex flex-wrap gap-4 text-xs font-medium text-slate-600 sm:text-sm">
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {t.heroPill1}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {t.heroPill2}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" /> {t.heroPill3}
          </span>
        </div>
      </section>

      {/* Flagship 10-Platform Interactive Comparator */}
      <HubComparator />

      {/* 9 Single-Platform Calculators Grid */}
      <section className="space-y-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">{t.dedicatedTitle}</h2>
          <p className="mt-1 text-sm text-slate-600">{t.dedicatedSub}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STANDALONE_PLATFORMS.map((p) => {
            const zh = PLATFORMS_ZH[p.id];
            return (
              <Link
                key={p.id}
                href={`/${p.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {isZh ? zh.category : p.category}
                    </span>
                    {p.isMoR && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        <ShieldCheck className="h-3 w-3" /> {isZh ? "MoR 包税" : "MoR"}
                      </span>
                    )}
                  </div>
                  <h3 className="mt-2 text-lg font-bold text-slate-950 group-hover:text-emerald-700 transition-colors">
                    {p.name} {t.feeCalcSuffix}
                  </h3>
                  <p className="mt-1 font-mono text-xs font-semibold text-emerald-700">
                    {isZh ? zh.headlineRate : p.headlineRate}
                  </p>
                  <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                    {isZh ? zh.heroSummary : p.heroSummary}
                  </p>
                </div>
                <div className="mt-4 flex items-center text-xs font-semibold text-slate-800 group-hover:text-emerald-700">
                  {t.calcPayoutCta} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 5 Head-to-Head Comparisons */}
      <section className="space-y-5">
        <div className="flex items-center gap-2">
          <Scale className="h-5 w-5 text-emerald-600" />
          <h2 className="text-2xl font-bold tracking-tight text-slate-950">{t.h2hTitle}</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {COMPARISONS.map((c) => {
            const czh = COMPARISONS_ZH[c.slug];
            return (
              <Link
                key={c.slug}
                href={`/compare/${c.slug}`}
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-emerald-400 hover:shadow-md"
              >
                <h3 className="text-base font-bold text-slate-950 group-hover:text-emerald-700">
                  {isZh && czh ? czh.title : c.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                  {isZh && czh ? czh.heroSummary : c.heroSummary}
                </p>
                <p className="mt-4 inline-flex items-center text-xs font-semibold text-emerald-700">
                  {t.compareSideBySide} <ArrowRight className="ml-1 h-3.5 w-3.5" />
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Why Fee Math Matters (Educational Trust Block) */}
      <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
        <h2 className="text-xl font-bold text-slate-950">{t.eduTitle}</h2>
        <div className="mt-4 grid gap-6 md:grid-cols-3 text-sm leading-relaxed text-slate-600">
          <div>
            <h3 className="font-bold text-slate-900">{t.edu1Title}</h3>
            <p className="mt-1.5">{t.edu1Body}</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{t.edu2Title}</h3>
            <p className="mt-1.5">{t.edu2Body}</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-900">{t.edu3Title}</h3>
            <p className="mt-1.5">{t.edu3Body}</p>
          </div>
        </div>
      </section>
    </>
  );
}
