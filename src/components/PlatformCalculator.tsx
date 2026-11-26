"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Info, Sparkles, TrendingDown } from "lucide-react";
import {
  ALL_PLATFORM_IDS,
  calculatePlatformFee,
  calculateReversePrice,
  comparePlatforms,
  DEFAULT_INPUT,
  formatCurrency,
  formatPercent,
  type CalculatorInput,
  type PaymentMethod,
  type PlatformId,
} from "@/lib/fees";
import { PLATFORMS } from "@/data/platforms";
import { UI_COPY, useLanguage } from "@/lib/i18n";
import { localizeFeeResult } from "@/data/zhContent";

interface Props {
  platformId: PlatformId;
}

export function PlatformCalculator({ platformId }: Props) {
  const { locale, isZh } = useLanguage();
  const t = UI_COPY[locale];

  const meta = PLATFORMS[platformId];
  const [mode, setMode] = useState<"forward" | "reverse">("forward");
  const [priceInput, setPriceInput] = useState<string>(
    String(meta.quickPrices[2] ?? 29)
  );
  const [salesInput, setSalesInput] = useState<string>("50");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [isInternational, setIsInternational] = useState<boolean>(false);
  const [isSubscription, setIsSubscription] = useState<boolean>(
    platformId === "substack" || platformId === "patreon"
  );
  const [isNonUsdPayout, setIsNonUsdPayout] = useState<boolean>(false);

  // Platform-specific controls
  const [gumroadChannel, setGumroadChannel] = useState<"direct" | "discover">("direct");
  const [polarTier, setPolarTier] = useState<"starter" | "pro" | "growth" | "scale">("starter");
  const [payhipTier, setPayhipTier] = useState<"free" | "plus" | "pro">("free");
  const [patreonTier, setPatreonTier] = useState<
    "standard" | "legacy-founders" | "legacy-pro" | "legacy-pro-merch"
  >("standard");
  const [kofiMode, setKofiMode] = useState<"standard" | "free-tip" | "free-shop" | "gold">(
    "standard"
  );
  const [iosRate, setIosRate] = useState<0.15 | 0.3>(0.15);
  const [whopAddons, setWhopAddons] = useState({
    fraudAnd3ds: true,
    billing: false,
    taxRemittance: false,
    gatedApp: false,
  });

  const numericPrice = Math.max(0.5, parseFloat(priceInput) || 0);
  const numericSales = Math.max(1, Math.round(parseFloat(salesInput) || 1));

  const sharedInput: Partial<CalculatorInput> = useMemo(
    () => ({
      ...DEFAULT_INPUT,
      price: numericPrice,
      monthlySales: numericSales,
      paymentMethod,
      isInternational,
      isSubscription,
      isNonUsdPayout,
      gumroadChannel,
      polarTier,
      payhipTier,
      patreonTier,
      kofiMode,
      iosRate,
      whopAddons,
    }),
    [
      numericPrice,
      numericSales,
      paymentMethod,
      isInternational,
      isSubscription,
      isNonUsdPayout,
      gumroadChannel,
      polarTier,
      payhipTier,
      patreonTier,
      kofiMode,
      iosRate,
      whopAddons,
    ]
  );

  const computed = useMemo(() => {
    if (mode === "reverse") {
      const { requiredPrice, result } = calculateReversePrice(
        platformId,
        numericPrice,
        sharedInput
      );
      return { requiredPrice, result: localizeFeeResult(result, locale) };
    }
    const result = calculatePlatformFee(platformId, sharedInput);
    return { requiredPrice: null, result: localizeFeeResult(result, locale) };
  }, [mode, platformId, numericPrice, sharedInput, locale]);

  const { result, requiredPrice } = computed;

  const alternatives = useMemo(() => {
    const benchmarkInput: Partial<CalculatorInput> = {
      ...sharedInput,
      price: result.grossPerSale,
      paymentMethod: paymentMethod === "ios" ? "card" : paymentMethod,
    };
    const ranked = comparePlatforms(
      ALL_PLATFORM_IDS.filter((id) => id !== platformId),
      benchmarkInput
    );
    return ranked
      .map((alt) => ({
        alt,
        meta: PLATFORMS[alt.platformId],
        annualDiff: alt.annualNet - result.annualNet,
      }))
      .filter((x) => x.annualDiff > 10)
      .slice(0, 3);
  }, [platformId, sharedInput, result.grossPerSale, result.annualNet, paymentMethod]);

  const keepPct = Math.max(0, Math.min(100, 100 - result.effectiveRatePct));
  const platformPct =
    result.grossPerSale > 0
      ? Math.min(100 - keepPct, (result.platformFeePerSale / result.grossPerSale) * 100)
      : 0;
  const otherFeePct = Math.max(0, 100 - keepPct - platformPct);

  const showPayPal =
    platformId === "gumroad" ||
    platformId === "lemon-squeezy" ||
    platformId === "payhip" ||
    platformId === "kofi";
  const showIos = platformId === "substack" || platformId === "patreon";

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left: Controls */}
        <section className="lg:col-span-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
          {/* Mode Switch */}
          <div className="grid grid-cols-2 rounded-xl bg-slate-100 p-1 text-xs font-semibold sm:text-sm">
            <button
              type="button"
              onClick={() => setMode("forward")}
              className={`rounded-lg py-2 px-3 transition-all ${
                mode === "forward"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.modeNetPayout}
            </button>
            <button
              type="button"
              onClick={() => setMode("reverse")}
              className={`rounded-lg py-2 px-3 transition-all ${
                mode === "reverse"
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              {t.modeReverse}
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {/* Price / Target Net */}
            <div>
              <label
                htmlFor="calc-price"
                className="block text-sm font-semibold text-slate-800"
              >
                {mode === "forward" ? t.labelForwardPrice : t.labelReversePrice}
              </label>
              <div className="relative mt-1.5">
                <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400 font-semibold">
                  $
                </span>
                <input
                  id="calc-price"
                  type="number"
                  min={0.5}
                  step="0.5"
                  value={priceInput}
                  onChange={(e) => setPriceInput(e.target.value)}
                  className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-8 pr-4 font-mono text-base font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {meta.quickPrices.map((qp) => (
                  <button
                    key={qp}
                    type="button"
                    onClick={() => setPriceInput(String(qp))}
                    className={`rounded-md border px-2.5 py-1 text-xs font-mono font-medium transition-colors ${
                      Number(priceInput) === qp
                        ? "border-emerald-600 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    ${qp}
                  </button>
                ))}
              </div>
            </div>

            {/* Monthly Volume */}
            <div>
              <label
                htmlFor="calc-sales"
                className="block text-sm font-semibold text-slate-800"
              >
                {t.labelMonthlyVolume}
              </label>
              <input
                id="calc-sales"
                type="number"
                min={1}
                step={1}
                value={salesInput}
                onChange={(e) => setSalesInput(e.target.value)}
                className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3.5 font-mono text-base font-semibold text-slate-900 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-600/20"
              />
            </div>

            {/* Platform-Specific Tier / Channel Selectors */}
            {platformId === "gumroad" && (
              <div>
                <span className="block text-sm font-semibold text-slate-800">
                  {t.labelSalesChannel}
                </span>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {[
                    {
                      id: "direct",
                      label: isZh ? "直客销售 (10%+$0.50)" : "Direct (10% + $0.50)",
                    },
                    {
                      id: "discover",
                      label: isZh ? "Discover 市场 (30% 全包)" : "Discover (30% all-in)",
                    },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setGumroadChannel(opt.id as "direct" | "discover")}
                      className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                        gumroadChannel === opt.id
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                          : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {platformId === "polar" && (
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  {t.labelPolarTier}
                </label>
                <select
                  value={polarTier}
                  onChange={(e) =>
                    setPolarTier(e.target.value as "starter" | "pro" | "growth" | "scale")
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="starter">
                    {isZh ? "Starter — $0/月 (5.0% + $0.50)" : "Starter — $0/mo (5.0% + $0.50)"}
                  </option>
                  <option value="pro">
                    {isZh ? "Pro — $20/月 (3.8% + $0.40)" : "Pro — $20/mo (3.8% + $0.40)"}
                  </option>
                  <option value="growth">
                    {isZh ? "Growth — $100/月 (3.6% + $0.35)" : "Growth — $100/mo (3.6% + $0.35)"}
                  </option>
                  <option value="scale">
                    {isZh ? "Scale — $400/月 (3.4% + $0.30)" : "Scale — $400/mo (3.4% + $0.30)"}
                  </option>
                </select>
              </div>
            )}

            {platformId === "payhip" && (
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  {t.labelPayhipTier}
                </label>
                <select
                  value={payhipTier}
                  onChange={(e) => setPayhipTier(e.target.value as "free" | "plus" | "pro")}
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="free">
                    {isZh ? "Free 免费档 — $0/月 + 5%" : "Free Forever — $0/mo + 5%"}
                  </option>
                  <option value="plus">
                    {isZh ? "Plus — $29/月 + 2%" : "Plus — $29/mo + 2%"}
                  </option>
                  <option value="pro">
                    {isZh ? "Pro — $99/月 + 0%" : "Pro — $99/mo + 0%"}
                  </option>
                </select>
              </div>
            )}

            {platformId === "patreon" && (
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  {t.labelPatreonTier}
                </label>
                <select
                  value={patreonTier}
                  onChange={(e) =>
                    setPatreonTier(
                      e.target.value as
                        | "standard"
                        | "legacy-founders"
                        | "legacy-pro"
                        | "legacy-pro-merch"
                    )
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="standard">
                    {isZh ? "Standard（2025.8 后新号）— 10%" : "Standard (Post-Aug 2025) — 10%"}
                  </option>
                  <option value="legacy-pro">
                    {isZh ? "老账号 Legacy Pro — 8%" : "Legacy Pro — 8%"}
                  </option>
                  <option value="legacy-founders">
                    {isZh ? "老账号 Legacy Founders — 5%" : "Legacy Founders — 5%"}
                  </option>
                  <option value="legacy-pro-merch">
                    {isZh ? "老账号 Legacy Pro + Merch — 11%" : "Legacy Pro + Merch — 11%"}
                  </option>
                </select>
              </div>
            )}

            {platformId === "kofi" && (
              <div>
                <label className="block text-sm font-semibold text-slate-800">
                  {t.labelKofiMode}
                </label>
                <select
                  value={kofiMode}
                  onChange={(e) =>
                    setKofiMode(
                      e.target.value as "standard" | "free-tip" | "free-shop" | "gold"
                    )
                  }
                  className="mt-1.5 w-full rounded-xl border border-slate-300 bg-white py-2.5 px-3 text-sm font-medium text-slate-900 focus:border-emerald-600 focus:outline-none"
                >
                  <option value="standard">
                    {isZh
                      ? "Standard / Contributor（默认）— 全单 5%"
                      : "Standard / Contributor (Default) — 5% all"}
                  </option>
                  <option value="free-tip">
                    {isZh
                      ? "免费模式（已关闭 Standard）— 一次性打赏 0%"
                      : "Free Mode (Standard OFF) — 0% 1-time tips"}
                  </option>
                  <option value="free-shop">
                    {isZh
                      ? "免费模式 — 商店 / 会员抽 5%"
                      : "Free Mode — 5% Shop / Memberships"}
                  </option>
                  <option value="gold">
                    {isZh ? "Ko-fi Gold ($12/月) — 全单 0% 平台费" : "Ko-fi Gold ($12/mo) — 0% all"}
                  </option>
                </select>
              </div>
            )}

            {/* Payment Method Selector */}
            {(showPayPal || showIos) &&
              !(platformId === "gumroad" && gumroadChannel === "discover") && (
                <div>
                  <span className="block text-sm font-semibold text-slate-800">
                    {t.labelCheckoutMethod}
                  </span>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                        paymentMethod === "card"
                          ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {t.card}
                    </button>
                    {showPayPal && (
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("paypal")}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                          paymentMethod === "paypal"
                            ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                            : "border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {t.paypal}
                      </button>
                    )}
                    {showIos && (
                      <button
                        type="button"
                        onClick={() => setPaymentMethod("ios")}
                        className={`rounded-xl border px-3 py-2 text-xs font-semibold transition-colors ${
                          paymentMethod === "ios"
                            ? "border-emerald-600 bg-emerald-50 text-emerald-900"
                            : "border-slate-200 bg-white text-slate-700"
                        }`}
                      >
                        {t.appleIos}
                      </button>
                    )}
                  </div>
                  {showIos && paymentMethod === "ios" && (
                    <div className="mt-2 flex gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setIosRate(0.15)}
                        className={`rounded-lg border px-2.5 py-1 font-medium ${
                          iosRate === 0.15
                            ? "border-amber-500 bg-amber-50 text-amber-900"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        {isZh ? "苹果小微企业 (15%)" : "Apple Small Biz (15%)"}
                      </button>
                      <button
                        type="button"
                        onClick={() => setIosRate(0.3)}
                        className={`rounded-lg border px-2.5 py-1 font-medium ${
                          iosRate === 0.3
                            ? "border-amber-500 bg-amber-50 text-amber-900"
                            : "border-slate-200 text-slate-600"
                        }`}
                      >
                        {isZh ? "标准苹果税 (30%)" : "Standard App Store (30%)"}
                      </button>
                    </div>
                  )}
                </div>
              )}

            {/* Common Toggles */}
            {!(platformId === "gumroad" && gumroadChannel === "discover") && (
              <div className="space-y-2.5 border-t border-slate-100 pt-4">
                {platformId !== "paddle" && paymentMethod !== "ios" && (
                  <label className="flex items-center justify-between gap-3 text-sm text-slate-700 cursor-pointer">
                    <span>{t.labelIntlCard}</span>
                    <input
                      type="checkbox"
                      checked={isInternational}
                      onChange={(e) => setIsInternational(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                    />
                  </label>
                )}

                {platformId === "lemon-squeezy" && (
                  <label className="flex items-center justify-between gap-3 text-sm text-slate-700 cursor-pointer">
                    <span>{t.labelRecurringSub}</span>
                    <input
                      type="checkbox"
                      checked={isSubscription}
                      onChange={(e) => setIsSubscription(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                    />
                  </label>
                )}

                {(platformId === "paddle" ||
                  platformId === "lemon-squeezy" ||
                  platformId === "whop") && (
                  <label className="flex items-center justify-between gap-3 text-sm text-slate-700 cursor-pointer">
                    <span>
                      {t.labelNonUsdPayout}{" "}
                      {platformId === "paddle" ? "(~2%)" : platformId === "whop" ? "(+1%)" : "(~1.5%)"}
                    </span>
                    <input
                      type="checkbox"
                      checked={isNonUsdPayout}
                      onChange={(e) => setIsNonUsdPayout(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-600"
                    />
                  </label>
                )}

                {platformId === "whop" && (
                  <div className="space-y-2 rounded-xl bg-slate-50 p-3 text-xs text-slate-700">
                    <p className="font-semibold text-slate-900">{t.labelWhopAddons}</p>
                    {[
                      {
                        key: "fraudAnd3ds",
                        label: isZh
                          ? "Radar 防欺诈 ($0.07) + 3DS ($0.03)"
                          : "Radar fraud ($0.07) + 3DS ($0.03)",
                      },
                      {
                        key: "billing",
                        label: isZh
                          ? "订阅计费套件 Billing (+0.5%)"
                          : "Billing / subscription suite (+0.5%)",
                      },
                      {
                        key: "taxRemittance",
                        label: isZh
                          ? "全球税务代报服务 (+2.0%)"
                          : "Tax & remittance add-on (+2.0%)",
                      },
                      {
                        key: "gatedApp",
                        label: isZh
                          ? "门禁社群应用 Discord/Telegram (+3.0%)"
                          : "Gated app (Discord/Telegram, +3.0%)",
                      },
                    ].map((item) => (
                      <label
                        key={item.key}
                        className="flex items-center justify-between gap-2 cursor-pointer"
                      >
                        <span>{item.label}</span>
                        <input
                          type="checkbox"
                          checked={whopAddons[item.key as keyof typeof whopAddons]}
                          onChange={(e) =>
                            setWhopAddons((prev) => ({
                              ...prev,
                              [item.key]: e.target.checked,
                            }))
                          }
                          className="h-4 w-4 rounded border-slate-300 text-emerald-600"
                        />
                      </label>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Right: Results */}
        <section className="lg:col-span-7 flex flex-col gap-5">
          {/* Primary Metric Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
            {mode === "reverse" && requiredPrice !== null && (
              <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  {t.reverseHeading} {formatCurrency(numericPrice)}
                </p>
                <p className="mt-1 font-mono text-3xl font-bold text-emerald-950 tabular-nums">
                  {formatCurrency(requiredPrice)}
                </p>
                <p className="mt-1 text-xs text-emerald-800">
                  {t.reverseNotePrefix} {formatCurrency(requiredPrice)} {t.reverseNoteMid}{" "}
                  {formatCurrency(result.totalFeePerSale)} {t.reverseNoteEnd}{" "}
                  <strong className="font-mono">{formatCurrency(result.netPerSale)}</strong>{" "}
                  {t.perSaleSuffix}
                </p>
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-xl bg-emerald-50/70 p-4 border border-emerald-100">
                <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
                  {t.youKeepSale}
                </p>
                <p className="mt-1 font-mono text-2xl font-bold text-emerald-900 tabular-nums">
                  {formatCurrency(result.netPerSale)}
                </p>
                <p className="mt-1 text-xs text-emerald-700 tabular-nums">
                  {formatPercent(keepPct)} {isZh ? "占标价" : "of"}{" "}
                  {formatCurrency(result.grossPerSale)}
                </p>
              </div>

              <div className="rounded-xl bg-rose-50/70 p-4 border border-rose-100">
                <p className="text-xs font-semibold uppercase tracking-wide text-rose-800">
                  {t.totalFeesSale}
                </p>
                <p className="mt-1 font-mono text-2xl font-bold text-rose-900 tabular-nums">
                  {formatCurrency(result.totalFeePerSale)}
                </p>
                <p className="mt-1 text-xs text-rose-700 tabular-nums">
                  {t.effectiveRate}: {formatPercent(result.effectiveRatePct)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-100/80 p-4 border border-slate-200">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-600">
                  {t.monthlyNetLabel} ({numericSales} {t.salesUnit})
                </p>
                <p className="mt-1 font-mono text-2xl font-bold text-slate-900 tabular-nums">
                  {formatCurrency(result.monthlyNet)}
                </p>
                <p className="mt-1 text-xs text-slate-600 tabular-nums">
                  {formatCurrency(result.annualNet)} {t.yrNetSuffix}
                </p>
              </div>
            </div>

            {/* Visual Proportion Bar */}
            <div className="mt-5">
              <div className="flex items-center justify-between text-xs font-medium text-slate-600 mb-1.5">
                <span>{t.revenueSplit}</span>
                <span className="tabular-nums">
                  {t.keepWord} {formatPercent(keepPct)} · {t.feesWord}{" "}
                  {formatPercent(result.effectiveRatePct)}
                </span>
              </div>
              <div className="flex h-3.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div
                  style={{ width: `${keepPct}%` }}
                  className="bg-emerald-500 transition-all duration-300"
                />
                <div
                  style={{ width: `${platformPct}%` }}
                  className="bg-amber-500 transition-all duration-300"
                />
                <div
                  style={{ width: `${otherFeePct}%` }}
                  className="bg-rose-500 transition-all duration-300"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-4 text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> {t.legendKeep}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> {t.legendPlatform}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> {t.legendOther}
                </span>
              </div>
            </div>

            {/* Tier Upgrade Alert */}
            {result.recommendedUpgrade && (
              <div className="mt-4 flex items-start gap-2.5 rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-xs text-amber-950">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
                <div>
                  <p className="font-semibold">{t.planTipTitle}</p>
                  <p className="mt-0.5">{result.recommendedUpgrade}</p>
                </div>
              </div>
            )}

            {/* Itemized Breakdown */}
            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                    <th className="py-2 pr-3 font-semibold">{t.colFeeComp}</th>
                    <th className="py-2 px-3 text-right font-semibold">{t.colPerSale}</th>
                    <th className="py-2 pl-3 text-right font-semibold">{t.colMonthly}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {result.breakdown.map((line) => (
                    <tr key={line.label}>
                      <td className="py-2.5 pr-3 text-slate-700">{line.label}</td>
                      <td className="py-2.5 px-3 text-right font-mono text-rose-700 tabular-nums">
                        −{formatCurrency(line.perSale)}
                      </td>
                      <td className="py-2.5 pl-3 text-right font-mono text-rose-700 tabular-nums">
                        −{formatCurrency(line.monthly)}
                      </td>
                    </tr>
                  ))}
                  <tr className="bg-slate-50 font-semibold">
                    <td className="py-2.5 pr-3 text-slate-900">{t.netTakeHome}</td>
                    <td className="py-2.5 px-3 text-right font-mono text-emerald-700 tabular-nums">
                      {formatCurrency(result.netPerSale)}
                    </td>
                    <td className="py-2.5 pl-3 text-right font-mono text-emerald-700 tabular-nums">
                      {formatCurrency(result.monthlyNet)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {result.notes.length > 0 && (
              <ul className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-xs text-slate-600">
                {result.notes.map((n) => (
                  <li key={n} className="flex items-start gap-2">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-slate-400" />
                    <span>{n}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Switch & Save Box */}
          {alternatives.length > 0 && (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <TrendingDown className="h-4 w-4 text-emerald-600" />
                  <h2 className="text-sm font-bold text-slate-900">
                    {t.cheaperAltsTitle} ({formatCurrency(result.monthlyGross)}
                    {t.moSuffix})
                  </h2>
                </div>
                <Link
                  href="/#compare-all"
                  className="text-xs font-semibold text-emerald-700 hover:underline"
                >
                  {t.all10Link}
                </Link>
              </div>
              <div className="mt-3 divide-y divide-slate-100">
                {alternatives.map(({ alt, meta: altMeta, annualDiff }) => (
                  <div
                    key={alt.platformId}
                    className="flex flex-col gap-1 py-2.5 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        {altMeta.hasStandalonePage ? (
                          <Link
                            href={`/${altMeta.slug}`}
                            className="text-sm font-semibold text-slate-900 hover:text-emerald-700"
                          >
                            {altMeta.name}
                          </Link>
                        ) : (
                          <span className="text-sm font-semibold text-slate-900">
                            {altMeta.name}
                          </span>
                        )}
                        {altMeta.isMoR && (
                          <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                            MoR
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500">
                        {t.effectiveRate}: {formatPercent(alt.effectiveRatePct)} ·{" "}
                        {isZh ? "月净到手" : "Net"} {formatCurrency(alt.monthlyNet)}
                        {t.moSuffix}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 rounded-lg bg-emerald-50 px-2.5 py-1 font-mono text-xs font-bold text-emerald-800 tabular-nums">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {t.saveYrPrefix} {formatCurrency(annualDiff)}
                        {t.yrSuffix}
                      </span>
                      {altMeta.hasStandalonePage && (
                        <Link
                          href={`/${altMeta.slug}`}
                          className="text-slate-400 hover:text-slate-700"
                          aria-label={`Open ${altMeta.name} calculator`}
                        >
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
