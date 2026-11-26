"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck } from "lucide-react";
import {
  ALL_PLATFORM_IDS,
  comparePlatforms,
  formatCurrency,
  formatPercent,
  type PaymentMethod,
} from "@/lib/fees";
import { PLATFORMS } from "@/data/platforms";

export function HubComparator() {
  const [price, setPrice] = useState<string>("29");
  const [sales, setSales] = useState<string>("50");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isInternational, setIsInternational] = useState<boolean>(false);
  const [isSubscription, setIsSubscription] = useState<boolean>(false);
  const [morOnly, setMorOnly] = useState<boolean>(false);

  const numericPrice = Math.max(0.5, parseFloat(price) || 0);
  const numericSales = Math.max(1, Math.round(parseFloat(sales) || 1));

  const ranked = useMemo(() => {
    const ids = morOnly
      ? ALL_PLATFORM_IDS.filter((id) => PLATFORMS[id].isMoR)
      : ALL_PLATFORM_IDS;
    return comparePlatforms(ids, {
      price: numericPrice,
      monthlySales: numericSales,
      paymentMethod,
      isInternational,
      isSubscription,
    });
  }, [numericPrice, numericSales, paymentMethod, isInternational, isSubscription, morOnly]);

  const bestAnnual = ranked[0]?.annualNet ?? 0;

  return (
    <section
      id="compare-all"
      className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm"
    >
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950">
            Live 10-Platform Payout Ranking (2026 Rates)
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Enter your price and monthly volume to rank every major creator & SaaS platform by real
            net take-home pay.
          </p>
        </div>
        <span className="text-xs font-mono text-slate-500">
          Monthly Gross: {formatCurrency(numericPrice * numericSales)}
        </span>
      </div>

      {/* Controls */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label
            htmlFor="hub-price"
            className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            Product Price (USD)
          </label>
          <div className="relative mt-1.5">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-semibold">
              $
            </span>
            <input
              id="hub-price"
              type="number"
              min={1}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-300 py-2 pl-7 pr-3 font-mono font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="hub-sales"
            className="block text-xs font-semibold uppercase tracking-wide text-slate-600"
          >
            Monthly Sales
          </label>
          <input
            id="hub-sales"
            type="number"
            min={1}
            value={sales}
            onChange={(e) => setSales(e.target.value)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 py-2 px-3 font-mono font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
            Buyer Payment
          </label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
            className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white py-2 px-3 text-sm font-medium text-slate-900"
          >
            <option value="card">Credit / Debit Card</option>
            <option value="paypal">PayPal</option>
          </select>
        </div>

        <div className="flex flex-col justify-center gap-2 pt-1 text-xs font-medium text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isInternational}
              onChange={(e) => setIsInternational(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600"
            />
            International buyers (+1.5%)
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isSubscription}
              onChange={(e) => setIsSubscription(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600"
            />
            Recurring subscription
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={morOnly}
              onChange={(e) => setMorOnly(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600"
            />
            Merchant of Record (tax handled) only
          </label>
        </div>
      </div>

      {/* Ranking Table */}
      <div className="mt-6 overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
              <th className="py-2.5 pr-3 font-semibold">Platform</th>
              <th className="py-2.5 px-3 font-semibold">Tax / MoR</th>
              <th className="py-2.5 px-3 text-right font-semibold">Fee / Sale</th>
              <th className="py-2.5 px-3 text-right font-semibold">Eff. Rate</th>
              <th className="py-2.5 px-3 text-right font-semibold">Monthly Net</th>
              <th className="py-2.5 px-3 text-right font-semibold">Annual Net</th>
              <th className="py-2.5 pl-3 text-right font-semibold">vs. #1</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {ranked.map((row, idx) => {
              const meta = PLATFORMS[row.platformId];
              const gap = bestAnnual - row.annualNet;
              return (
                <tr
                  key={row.platformId}
                  className={idx === 0 ? "bg-emerald-50/50" : "hover:bg-slate-50"}
                >
                  <td className="py-3 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 font-mono text-[11px] font-bold text-slate-700">
                        {idx + 1}
                      </span>
                      {meta.hasStandalonePage ? (
                        <Link
                          href={`/${meta.slug}`}
                          className="font-semibold text-slate-900 hover:text-emerald-700 inline-flex items-center gap-1"
                        >
                          {meta.name}
                          <ArrowUpRight className="h-3.5 w-3.5 text-slate-400" />
                        </Link>
                      ) : (
                        <span className="font-semibold text-slate-900">{meta.name}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-3">
                    {meta.isMoR ? (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">
                        <ShieldCheck className="h-3 w-3" /> Full MoR
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500">Self-managed</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-rose-700 tabular-nums">
                    {formatCurrency(row.totalFeePerSale)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-slate-800 tabular-nums">
                    {formatPercent(row.effectiveRatePct)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-emerald-700 tabular-nums">
                    {formatCurrency(row.monthlyNet)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold text-slate-900 tabular-nums">
                    {formatCurrency(row.annualNet)}
                  </td>
                  <td className="py-3 pl-3 text-right font-mono text-xs tabular-nums">
                    {gap < 1 ? (
                      <span className="font-bold text-emerald-700">Best</span>
                    ) : (
                      <span className="text-rose-600">−{formatCurrency(gap)}/yr</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
