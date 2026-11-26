"use client";

import Link from "next/link";
import { Calculator, Globe } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";
import { UI_COPY, useLanguage } from "@/lib/i18n";

export function Header() {
  const { locale, setLocale } = useLanguage();
  const t = UI_COPY[locale];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group shrink-0">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
            <Calculator className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <span className="block text-base font-bold tracking-tight text-slate-900">
              {SITE_CONFIG.name}
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              {t.brandSub}
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-600 lg:flex">
          <Link href="/#compare-all" className="hover:text-slate-950 transition-colors">
            {t.navAll}
          </Link>
          <Link href="/gumroad-fee-calculator" className="hover:text-slate-950 transition-colors">
            Gumroad
          </Link>
          <Link
            href="/lemon-squeezy-fee-calculator"
            className="hover:text-slate-950 transition-colors"
          >
            Lemon Squeezy
          </Link>
          <Link href="/paddle-fee-calculator" className="hover:text-slate-950 transition-colors">
            Paddle
          </Link>
          <Link
            href="/compare/lemon-squeezy-vs-paddle"
            className="hover:text-slate-950 transition-colors"
          >
            {t.navComparisons}
          </Link>
          <Link href="/methodology" className="hover:text-slate-950 transition-colors">
            {t.navMethodology}
          </Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Switcher Pill */}
          <div
            role="group"
            aria-label="Language switcher"
            className="inline-flex items-center rounded-lg border border-slate-200 bg-slate-100 p-0.5 text-xs font-semibold"
          >
            <span className="hidden sm:inline-flex items-center pl-1.5 pr-1 text-slate-400">
              <Globe className="h-3.5 w-3.5" />
            </span>
            <button
              type="button"
              onClick={() => setLocale("en")}
              aria-pressed={locale === "en"}
              className={`rounded-md px-2 py-1 transition-all ${
                locale === "en"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLocale("zh")}
              aria-pressed={locale === "zh"}
              className={`rounded-md px-2 py-1 transition-all ${
                locale === "zh"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              中文
            </button>
          </div>

          <Link
            href="/#compare-all"
            className="rounded-lg bg-slate-900 px-3 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors sm:px-3.5 sm:text-sm whitespace-nowrap"
          >
            {t.navCta}
          </Link>
        </div>
      </div>
    </header>
  );
}
