"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Award, CheckCircle2 } from "lucide-react";
import {
  calculatePlatformFee,
  formatCurrency,
  formatPercent,
  type CalculatorInput,
  type PaymentMethod,
} from "@/lib/fees";
import { PLATFORMS } from "@/data/platforms";
import type { ComparisonMeta } from "@/data/comparisons";

interface Props {
  comparison: ComparisonMeta;
}

export function CompareCalculator({ comparison }: Props) {
  const leftMeta = PLATFORMS[comparison.leftId];
  const rightMeta = PLATFORMS[comparison.rightId];

  const [price, setPrice] = useState<string>(String(comparison.defaultPrice));
  const [sales, setSales] = useState<string>(String(comparison.defaultSales));
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isInternational, setIsInternational] = useState<boolean>(
    Boolean(comparison.defaultIntl)
  );
  const [isSubscription, setIsSubscription] = useState<boolean>(
    Boolean(comparison.defaultSub)
  );
  const [isNonUsdPayout, setIsNonUsdPayout] = useState<boolean>(false);
  const [polarTier, setPolarTier] = useState<"starter" | "pro" | "growth" | "scale">("pro");
  const [payhipTier, setPayhipTier] = useState<"free" | "plus" | "pro">("plus");

  const shared: Partial<CalculatorInput> = useMemo(
    () => ({
      price: Math.max(0.5, parseFloat(price) || 0),
      monthlySales: Math.max(1, Math.round(parseFloat(sales) || 1)),
      paymentMethod,
      isInternational,
      isSubscription,
      isNonUsdPayout,
      polarTier,
      payhipTier,
    }),
    [
      price,
      sales,
      paymentMethod,
      isInternational,
      isSubscription,
      isNonUsdPayout,
      polarTier,
      payhipTier,
    ]
  );

  const leftRes = useMemo(
    () => calculatePlatformFee(comparison.leftId, shared),
    [comparison.leftId, shared]
  );
  const rightRes = useMemo(
    () => calculatePlatformFee(comparison.rightId, shared),
    [comparison.rightId, shared]
  );

  const diffAnnual = Math.abs(leftRes.annualNet - rightRes.annualNet);
  const diffMonthly = Math.abs(leftRes.monthlyNet - rightRes.monthlyNet);
  const winner =
    Math.abs(leftRes.annualNet - rightRes.annualNet) < 1
      ? "tie"
      : leftRes.annualNet > rightRes.annualNet
        ? "left"
        : "right";

  const winnerName =
    winner === "left" ? leftMeta.name : winner === "right" ? rightMeta.name : "Tie";

  const hasPolar = comparison.leftId === "polar" || comparison.rightId === "polar";
  const hasPayhip = comparison.leftId === "payhip" || comparison.rightId === "payhip";

  return (
    <div className="space-y-6">
      {/* Shared Controls */}
      <section className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
              Sale Price (USD)
            </label>
            <div className="relative mt-1.5">
              <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400 font-semibold">
                $
              </span>
              <input
                type="number"
                min={1}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full rounded-xl border border-slate-300 py-2 pl-7 pr-3 font-mono font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
              Monthly Orders
            </label>
            <input
              type="number"
              min={1}
              value={sales}
              onChange={(e) => setSales(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 py-2 px-3 font-mono font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
              Payment Method
            </label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
              className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white py-2 px-3 text-sm font-medium text-slate-900 focus:border-emerald-600 focus:outline-none"
            >
              <option value="card">Credit / Debit Card</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>

          {hasPolar ? (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Polar.sh Tier
              </label>
              <select
                value={polarTier}
                onChange={(e) =>
                  setPolarTier(e.target.value as "starter" | "pro" | "growth" | "scale")
                }
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white py-2 px-3 text-sm font-medium text-slate-900"
              >
                <option value="starter">Starter ($0/mo)</option>
                <option value="pro">Pro ($20/mo)</option>
                <option value="growth">Growth ($100/mo)</option>
                <option value="scale">Scale ($400/mo)</option>
              </select>
            </div>
          ) : hasPayhip ? (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-slate-600">
                Payhip Tier
              </label>
              <select
                value={payhipTier}
                onChange={(e) => setPayhipTier(e.target.value as "free" | "plus" | "pro")}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white py-2 px-3 text-sm font-medium text-slate-900"
              >
                <option value="free">Free ($0/mo + 5%)</option>
                <option value="plus">Plus ($29/mo + 2%)</option>
                <option value="pro">Pro ($99/mo + 0%)</option>
              </select>
            </div>
          ) : (
            <div className="flex flex-col justify-end">
              <div className="rounded-xl bg-slate-50 px-3 py-2 text-xs text-slate-600">
                Gross Volume:{" "}
                <strong className="font-mono text-slate-900">
                  {formatCurrency(leftRes.monthlyGross)}/mo
                </strong>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 flex flex-wrap gap-5 border-t border-slate-100 pt-4 text-sm text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isInternational}
              onChange={(e) => setIsInternational(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600"
            />
            International (non-US) cards
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
              checked={isNonUsdPayout}
              onChange={(e) => setIsNonUsdPayout(e.target.checked)}
              className="h-4 w-4 rounded border-slate-300 text-emerald-600"
            />
            Non-USD payout currency (FX)
          </label>
        </div>
      </section>

      {/* Winner Banner */}
      <div
        className={`rounded-2xl border p-5 ${
          winner === "tie"
            ? "border-slate-200 bg-slate-100"
            : "border-emerald-200 bg-emerald-50"
        }`}
      >
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="h-6 w-6 text-emerald-700 shrink-0" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                Live Winner at {formatCurrency(leftRes.monthlyGross)}/month
              </p>
              <p className="text-lg font-bold text-slate-950">
                {winner === "tie"
                  ? `${leftMeta.name} and ${rightMeta.name} tie under these settings`
                  : `${winnerName} saves you ${formatCurrency(diffAnnual)}/year (${formatCurrency(diffMonthly)}/mo)`}
              </p>
            </div>
          </div>
          {winner !== "tie" && (
            <span className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-700 px-3.5 py-2 font-mono text-sm font-bold text-white tabular-nums">
              <CheckCircle2 className="h-4 w-4" />+{formatCurrency(diffAnnual)}/yr net
            </span>
          )}
        </div>
      </div>

      {/* Side-by-Side Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { side: "left" as const, meta: leftMeta, res: leftRes },
          { side: "right" as const, meta: rightMeta, res: rightRes },
        ].map(({ side, meta, res }) => {
          const isWin = winner === side;
          return (
            <div
              key={meta.id}
              className={`rounded-2xl border bg-white p-5 sm:p-6 shadow-sm ${
                isWin ? "border-emerald-500 ring-2 ring-emerald-500/15" : "border-slate-200"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{meta.name}</h2>
                  <p className="text-xs text-slate-500">{meta.headlineRate}</p>
                </div>
                {isWin && (
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800">
                    Lowest Fees
                  </span>
                )}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-slate-50 p-3.5">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Net / Sale
                  </p>
                  <p className="mt-0.5 font-mono text-xl font-bold text-emerald-700 tabular-nums">
                    {formatCurrency(res.netPerSale)}
                  </p>
                </div>
                <div className="rounded-xl bg-slate-50 p-3.5">
                  <p className="text-[11px] font-semibold uppercase text-slate-500">
                    Effective Rate
                  </p>
                  <p className="mt-0.5 font-mono text-xl font-bold text-rose-700 tabular-nums">
                    {formatPercent(res.effectiveRatePct)}
                  </p>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-sm border-t border-slate-100 pt-4">
                {res.breakdown.map((line) => (
                  <div key={line.label} className="flex justify-between gap-2 text-xs">
                    <span className="text-slate-600">{line.label}</span>
                    <span className="font-mono font-medium text-rose-700 tabular-nums">
                      −{formatCurrency(line.monthly)}/mo
                    </span>
                  </div>
                ))}
                <div className="flex justify-between border-t border-slate-100 pt-2.5 font-semibold">
                  <span className="text-slate-900">Annual Net Take-Home</span>
                  <span className="font-mono text-emerald-700 tabular-nums">
                    {formatCurrency(res.annualNet)}/yr
                  </span>
                </div>
              </div>

              {meta.hasStandalonePage && (
                <div className="mt-4 pt-2">
                  <Link
                    href={`/${meta.slug}`}
                    className="text-xs font-semibold text-emerald-700 hover:underline"
                  >
                    Open full {meta.name} Calculator →
                  </Link>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
