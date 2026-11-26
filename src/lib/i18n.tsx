"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "en" | "zh";

interface LanguageContextValue {
  locale: Locale;
  isZh: boolean;
  setLocale: (next: Locale) => void;
  toggleLocale: () => void;
}

const STORAGE_KEY = "creatorfeecalc_lang";

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  isZh: false,
  setLocale: () => {},
  toggleLocale: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get("lang");
      if (urlLang === "zh" || urlLang === "en") {
        setLocaleState(urlLang);
        window.localStorage.setItem(STORAGE_KEY, urlLang);
        document.documentElement.lang = urlLang === "zh" ? "zh-CN" : "en";
        return;
      }
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved === "zh" || saved === "en") {
        setLocaleState(saved);
        document.documentElement.lang = saved === "zh" ? "zh-CN" : "en";
      }
    } catch {
      // Ignore storage access restrictions
    }
  }, []);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next === "zh" ? "zh-CN" : "en";
    } catch {
      // Ignore storage access restrictions
    }
  };

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      isZh: locale === "zh",
      setLocale,
      toggleLocale: () => setLocale(locale === "en" ? "zh" : "en"),
    }),
    [locale]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  return useContext(LanguageContext);
}

export const UI_COPY = {
  en: {
    brandSub: "2026 Verified Fee Rates",
    navAll: "All 10 Platforms",
    navComparisons: "Comparisons",
    navMethodology: "Methodology",
    navCta: "Compare Fees",
    footerDesc:
      "Independent 2026 payment and platform fee calculators for creators, indie SaaS founders, and digital sellers. 100% browser-side — no sign-up, no tracking of your revenue data.",
    footerVerified: "Fee rates verified: November 2026",
    footerCalcHead: "Fee Calculators",
    footerCompHead: "Head-to-Head Comparisons",
    footerTrustHead: "Trust & Transparency",
    footerMethodology: "Fee Methodology & Formulas",
    footerAbout: "About CreatorFeeCalc",
    footerContact: "Report a Fee Update / Contact",
    footerPrivacy: "Privacy Policy",
    footerTerms: "Terms of Use",
    footerDisclaimer:
      "© 2026 CreatorFeeCalc. Estimates are for informational planning only; always verify final fees with your payment provider.",
    footerNotAffiliated:
      "Not affiliated with Gumroad, Lemon Squeezy, Paddle, Polar, Substack, Patreon, Payhip, Whop, Ko-fi, or Stripe.",
    heroBadge: "Updated for November 2026 · 100% Free & Browser-Side",
    heroTitle: "Know Exactly What You Keep After Platform Fees",
    heroSub:
      "Headline rates hide international card markups, PayPal surcharges, Stripe Billing cuts, and iOS fees. Compare real 2026 net payouts and reverse list prices across 10 creator and SaaS payment platforms in seconds.",
    heroPill1: "No sign-up required",
    heroPill2: "Reverse pricing solver",
    heroPill3: "Tier break-even alerts",
    hubTitle: "Live 10-Platform Payout Ranking (2026 Rates)",
    hubSub:
      "Enter your price and monthly volume to rank every major creator & SaaS platform by real net take-home pay.",
    monthlyGross: "Monthly Gross",
    productPrice: "Product Price (USD)",
    monthlySales: "Monthly Sales",
    buyerPayment: "Buyer Payment",
    card: "Credit / Debit Card",
    paypal: "PayPal",
    appleIos: "Apple iOS App",
    intlBuyers: "International buyers (+1.5%)",
    recurringSub: "Recurring subscription",
    morOnly: "Merchant of Record (tax handled) only",
    colPlatform: "Platform",
    colTaxMor: "Tax / MoR",
    colFeeSale: "Fee / Sale",
    colEffRate: "Eff. Rate",
    colMonthlyNet: "Monthly Net",
    colAnnualNet: "Annual Net",
    colVsBest: "vs. #1",
    fullMor: "Full MoR",
    selfManaged: "Self-managed",
    bestBadge: "Best",
    dedicatedTitle: "Dedicated Platform Fee Calculators (2026)",
    dedicatedSub:
      "Pick a platform to unlock platform-specific tiers, volume discounts, iOS vs. web toggles, and reverse target-net pricing.",
    feeCalcSuffix: "Fee Calculator",
    calcPayoutCta: "Calculate payout",
    h2hTitle: "Head-to-Head Platform Fee Comparisons",
    compareSideBySide: "Compare side by side",
    eduTitle: "Why 2026 Creator & SaaS Fees Are Rarely What the Pricing Page Says",
    edu1Title: "1. Stacked Checkout Surcharges",
    edu1Body:
      "A 5% base rate frequently becomes 7%–8.5% once international card fees (+1.5%), PayPal (+1.5%), and subscription billing fees (+0.5% to +0.7%) stack together.",
    edu2Title: "2. Flat Per-Transaction Drag",
    edu2Body:
      "On a $5 newsletter or $9 template, fixed fees ($0.30–$0.80) can quietly eat 6% to 9% on top of percentage cuts. Annual billing or reverse pricing fixes that margin leak.",
    edu3Title: "3. Monthly Plan Break-Even",
    edu3Body:
      "Paying $12–$29/month on Ko-fi Gold, Polar Pro, or Payhip Plus often pays for itself at just $240–$1,400/month in sales. Our calculators flag those thresholds live.",
    homeCrumb: "Home",
    verifiedBadge: "Verified November 2026",
    modeNetPayout: "Net Payout",
    modeReverse: "Reverse List Price",
    labelForwardPrice: "Product / Subscription Price (USD)",
    labelReversePrice: "Target Net Take-Home Per Sale (USD)",
    labelMonthlyVolume: "Estimated Monthly Sales / Subscribers",
    labelSalesChannel: "Sales Channel",
    labelPolarTier: "Polar.sh 2026 Plan Tier",
    labelPayhipTier: "Payhip Plan Tier",
    labelPatreonTier: "Patreon Creator Tier",
    labelKofiMode: "Ko-fi Fee Mode",
    labelCheckoutMethod: "Buyer Checkout Method",
    labelIntlCard: "International (non-US) buyer card (+1.5%)",
    labelRecurringSub: "Recurring subscription (+0.5%)",
    labelNonUsdPayout: "Non-USD payout / currency conversion",
    labelWhopAddons: "Whop Stackable Add-Ons",
    reverseHeading: "Recommended List Price to Net",
    reverseNotePrefix: "Charging",
    reverseNoteMid: "covers",
    reverseNoteEnd: "in fees and leaves you",
    perSaleSuffix: "per sale.",
    youKeepSale: "You Keep / Sale",
    totalFeesSale: "Total Fees / Sale",
    effectiveRate: "Effective rate",
    monthlyNetLabel: "Monthly Net",
    salesUnit: "sales",
    yrNetSuffix: "/ yr net",
    revenueSplit: "Revenue Split",
    keepWord: "Keep",
    feesWord: "Fees",
    legendKeep: "You Keep",
    legendPlatform: "Platform Cut",
    legendOther: "Processing / Surcharges / Plan",
    planTipTitle: "Plan Optimization Tip",
    colFeeComp: "Fee Component",
    colPerSale: "Per Sale",
    colMonthly: "Monthly",
    netTakeHome: "Net Take-Home",
    cheaperAltsTitle: "Cheaper Alternatives at Your Volume",
    all10Link: "All 10 →",
    saveYrPrefix: "Save",
    yrSuffix: "/yr",
    moSuffix: "/mo",
    quickTableTitleSuffix: "2026 Quick-Reference Payout Table (US Domestic Card)",
    quickTableSub:
      "Instant take-home estimates on common price points plus the exact reverse list price to net each target amount after fees.",
    colSalePrice: "Sale Price",
    colTotalFees: "Total Fees",
    colYouKeep: "You Keep",
    colChargeToNet: "Charge to Net Full Price",
    howFeesWorkPrefix: "How",
    howFeesWorkSuffix: "Fees Work in 2026",
    transparentFormulas: "Transparent Formulas",
    hiddenCostsTitle: "Hidden Costs & Watch-Outs",
    bestFit: "Best Fit",
    verifyOfficialPrefix: "Verify on official",
    verifyOfficialSuffix: "pricing page",
    compareSideTitlePrefix: "Compare",
    compareSideTitleSuffix: "Side by Side",
    runComparison: "Run comparison",
    faqTitlePrefix: "Frequently Asked Questions —",
    faqTitleSuffix: "Fees (2026)",
    faqTitlePlain: "Frequently Asked Questions",
    h2hBadge: "2026 Head-to-Head Comparison · Verified November 2026",
    salePriceLabel: "Sale Price (USD)",
    monthlyOrdersLabel: "Monthly Orders",
    paymentMethodLabel: "Payment Method",
    grossVolumeLabel: "Gross Volume:",
    intlCardsShort: "International (non-US) cards",
    nonUsdFxShort: "Non-USD payout currency (FX)",
    liveWinnerAt: "Live Winner at",
    tieLabel: "tie under these settings",
    savesYou: "saves you",
    lowestFeesBadge: "Lowest Fees",
    netPerSaleShort: "Net / Sale",
    effRateShort: "Effective Rate",
    annualNetTakeHome: "Annual Net Take-Home",
    openFullCalcPrefix: "Open full",
    openFullCalcSuffix: "Calculator →",
    bottomLineVerdict: "Bottom-Line Verdict (2026)",
    colFeeDimension: "Fee Dimension",
    whenToPick: "When to Pick",
  },
  zh: {
    brandSub: "2026 实测核验费率",
    navAll: "10 平台总榜",
    navComparisons: "两两对比",
    navMethodology: "计算公式",
    navCta: "立即对比",
    footerDesc:
      "面向独立开发者、出海 SaaS 创始人与数字产品创作者的 2026 平台费率计算器。100% 浏览器本地计算——免注册、不收集任何营收数据。",
    footerVerified: "费率核验时间：2026 年 11 月",
    footerCalcHead: "单平台费率计算器",
    footerCompHead: "热门平台两两对比",
    footerTrustHead: "透明说明与合规",
    footerMethodology: "费率公式与核验标准",
    footerAbout: "关于 CreatorFeeCalc",
    footerContact: "反馈费率变更 / 联系我们",
    footerPrivacy: "隐私政策",
    footerTerms: "使用条款",
    footerDisclaimer:
      "© 2026 CreatorFeeCalc。计算结果仅用于定价与收款规划参考，实际结算费率请以各支付平台官方账单为准。",
    footerNotAffiliated:
      "本站与 Gumroad、Lemon Squeezy、Paddle、Polar、Substack、Patreon、Payhip、Whop、Ko-fi 或 Stripe 无隶属关系。",
    heroBadge: "2026 年 11 月已核验 · 100% 免费 · 浏览器本地计算",
    heroTitle: "一眼算清扣完所有平台抽成后，你真实到手多少钱",
    heroSub:
      "很多平台官网只写基础抽成，却藏着国际卡加收、PayPal 附加费、订阅计费费和苹果 iOS 抽成。几秒对比 10 大海外创作者与 SaaS 收款平台的 2026 真实净到手与反向定价。",
    heroPill1: "免注册直接使用",
    heroPill2: "支持反向算标价",
    heroPill3: "付费套餐回本线提醒",
    hubTitle: "10 大出海收款平台实时净到手排名（2026 费率）",
    hubSub: "输入商品单价与月销量，按真实年净收入实时排出最省钱的平台。",
    monthlyGross: "月毛收入",
    productPrice: "商品单价（美元 USD）",
    monthlySales: "月销量 / 订单数",
    buyerPayment: "买家付款方式",
    card: "信用卡 / 借记卡",
    paypal: "PayPal",
    appleIos: "Apple iOS 应用内购",
    intlBuyers: "国际买家 / 非美卡 (+1.5%)",
    recurringSub: "周期订阅制订单",
    morOnly: "仅看包税平台（MoR 代理收税）",
    colPlatform: "平台",
    colTaxMor: "税务 / MoR",
    colFeeSale: "单笔扣费",
    colEffRate: "实际总费率",
    colMonthlyNet: "月净到手",
    colAnnualNet: "年净到手",
    colVsBest: "对比第 1 名",
    fullMor: "MoR 全包税",
    selfManaged: "自行报税",
    bestBadge: "最省钱",
    dedicatedTitle: "9 大热门平台专属计算器（2026）",
    dedicatedSub:
      "点进任意平台，解锁专属套餐档位、阶梯折扣、iOS 与网页端对比，以及「目标到手反推标价」。",
    feeCalcSuffix: "费率计算器",
    calcPayoutCta: "查看详细测算",
    h2hTitle: "热门平台两两对决计算器",
    compareSideBySide: "左右对比测算",
    eduTitle: "为什么 2026 出海收款真实扣费，往往远高于官网标价？",
    edu1Title: "1. 隐形附加费层层叠加",
    edu1Body:
      "官网写着 5% 基础费率，但叠加非美卡（+1.5%）、PayPal（+1.5%）和订阅续费（+0.5%～+0.7%）后，真实费率常飙到 7%～8.5%。",
    edu2Title: "2. 固定笔数费吃掉低价品利润",
    edu2Body:
      "卖 $5 专栏或 $9 模板时，每笔 $0.30～$0.80 的固定手续费就能额外吃掉 6%～9% 利润。改用年付或反向加价可立刻止损。",
    edu3Title: "3. 月费套餐的精准回本线",
    edu3Body:
      "Ko-fi Gold、Polar Pro 或 Payhip Plus 看似要交 $12–$29/月，但在月销 $240–$1,400 时就会比免费档更省钱，工具会自动标出提醒。",
    homeCrumb: "首页",
    verifiedBadge: "2026 年 11 月已核验",
    modeNetPayout: "正向算净到手",
    modeReverse: "反向算标价",
    labelForwardPrice: "商品 / 订阅标价（美元 USD）",
    labelReversePrice: "每单目标净到手金额（美元 USD）",
    labelMonthlyVolume: "预估月销量 / 订阅人数",
    labelSalesChannel: "销售渠道",
    labelPolarTier: "Polar.sh 2026 套餐档位",
    labelPayhipTier: "Payhip 套餐档位",
    labelPatreonTier: "Patreon 创作者档位",
    labelKofiMode: "Ko-fi 收费模式",
    labelCheckoutMethod: "买家结账方式",
    labelIntlCard: "国际（非美国）银行卡 (+1.5%)",
    labelRecurringSub: "周期性订阅订单 (+0.5%)",
    labelNonUsdPayout: "非美元币种提现 / 汇损换汇",
    labelWhopAddons: "Whop 可叠加功能附加费",
    reverseHeading: "若每单想净到手",
    reverseNotePrefix: "建议标价设为",
    reverseNoteMid: "，扣除总费用",
    reverseNoteEnd: "后，每单实际净到手",
    perSaleSuffix: "。",
    youKeepSale: "每单净到手",
    totalFeesSale: "每单总扣费",
    effectiveRate: "真实总费率",
    monthlyNetLabel: "月净收入",
    salesUnit: "单",
    yrNetSuffix: "/ 年净到手",
    revenueSplit: "收入去向占比",
    keepWord: "净到手",
    feesWord: "总扣费",
    legendKeep: "创作者净到手",
    legendPlatform: "平台抽成",
    legendOther: "通道费 / 附加费 / 月费分摊",
    planTipTitle: "套餐省钱提醒",
    colFeeComp: "扣费明细项",
    colPerSale: "单笔金额",
    colMonthly: "每月合计",
    netTakeHome: "实际净到手",
    cheaperAltsTitle: "同等月流水下更省钱的替代平台",
    all10Link: "查看全部 10 家 →",
    saveYrPrefix: "每年多留",
    yrSuffix: "/年",
    moSuffix: "/月",
    quickTableTitleSuffix: "2026 常见定价速查表（美国本地卡）",
    quickTableSub: "一眼对照常见价位的实际扣费、净到手，以及「想净赚该金额应设的标价」。",
    colSalePrice: "商品标价",
    colTotalFees: "单笔总扣费",
    colYouKeep: "实际到手",
    colChargeToNet: "想净赚标价应定为",
    howFeesWorkPrefix: "",
    howFeesWorkSuffix: "2026 年收费规则详解",
    transparentFormulas: "透明计算公式",
    hiddenCostsTitle: "隐藏扣费与避坑提醒",
    bestFit: "最适合人群",
    verifyOfficialPrefix: "前往",
    verifyOfficialSuffix: "官方定价页核对",
    compareSideTitlePrefix: "",
    compareSideTitleSuffix: "热门对比测算",
    runComparison: "进入对比测算",
    faqTitlePrefix: "常见问题 — ",
    faqTitleSuffix: "2026 费率解答",
    faqTitlePlain: "常见问题解答",
    h2hBadge: "2026 两两深度对比 · 2026 年 11 月已核验",
    salePriceLabel: "商品单价（USD）",
    monthlyOrdersLabel: "月订单数",
    paymentMethodLabel: "付款方式",
    grossVolumeLabel: "月毛流水：",
    intlCardsShort: "国际（非美）信用卡",
    nonUsdFxShort: "非美元结算提现（含汇损）",
    liveWinnerAt: "当前月流水胜出平台",
    tieLabel: "在当前条件下费用基本持平",
    savesYou: "每年帮你多省",
    lowestFeesBadge: "更省钱",
    netPerSaleShort: "每单净到手",
    effRateShort: "实际总费率",
    annualNetTakeHome: "预估年净到手",
    openFullCalcPrefix: "打开完整",
    openFullCalcSuffix: "单平台计算器 →",
    bottomLineVerdict: "2026 核心结论",
    colFeeDimension: "对比维度",
    whenToPick: "什么时候选",
  },
} as const;
