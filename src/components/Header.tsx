import Link from "next/link";
import { Calculator } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm group-hover:bg-emerald-700 transition-colors">
            <Calculator className="h-5 w-5" />
          </span>
          <div className="leading-tight">
            <span className="block text-base font-bold tracking-tight text-slate-900">
              {SITE_CONFIG.name}
            </span>
            <span className="block text-[11px] font-medium text-slate-500">
              2026 Verified Fee Rates
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <Link href="/#compare-all" className="hover:text-slate-950 transition-colors">
            All 10 Platforms
          </Link>
          <Link href="/gumroad-fee-calculator" className="hover:text-slate-950 transition-colors">
            Gumroad
          </Link>
          <Link href="/lemon-squeezy-fee-calculator" className="hover:text-slate-950 transition-colors">
            Lemon Squeezy
          </Link>
          <Link href="/paddle-fee-calculator" className="hover:text-slate-950 transition-colors">
            Paddle
          </Link>
          <Link href="/compare/lemon-squeezy-vs-paddle" className="hover:text-slate-950 transition-colors">
            Comparisons
          </Link>
          <Link href="/methodology" className="hover:text-slate-950 transition-colors">
            Methodology
          </Link>
        </nav>

        <Link
          href="/#compare-all"
          className="rounded-lg bg-slate-900 px-3.5 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors sm:text-sm"
        >
          Compare Fees
        </Link>
      </div>
    </header>
  );
}
