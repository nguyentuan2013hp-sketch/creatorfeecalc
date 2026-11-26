import type { PlatformId } from "@/lib/fees";

export interface PlatformFaq {
  question: string;
  answer: string;
}

export interface PlatformMeta {
  id: PlatformId;
  name: string;
  shortName: string;
  slug: string; // e.g. "gumroad-fee-calculator"
  hasStandalonePage: boolean;
  category: "Merchant of Record" | "Creator Storefront" | "Newsletter & Membership" | "Payment Processor";
  isMoR: boolean;
  headlineRate: string;
  monthlyPlanLabel: string;
  seoTitle: string;
  seoDescription: string;
  heroSummary: string;
  officialUrl: string;
  whatChanged2026: string[];
  formulaSummary: string[];
  hiddenFeeWarnings: string[];
  bestFor: string;
  quickPrices: number[];
  faqs: PlatformFaq[];
  relatedComparisons: string[]; // comparison slugs
}

export const PLATFORMS: Record<PlatformId, PlatformMeta> = {
  gumroad: {
    id: "gumroad",
    name: "Gumroad",
    shortName: "Gumroad",
    slug: "gumroad-fee-calculator",
    hasStandalonePage: true,
    category: "Creator Storefront",
    isMoR: true,
    headlineRate: "10% + $0.50 (+ card) / 30% Discover",
    monthlyPlanLabel: "$0/mo",
    seoTitle: "Gumroad Fee Calculator (2026): Direct vs Discover & Reverse Pricing",
    seoDescription:
      "Calculate your exact 2026 Gumroad payout after the 10% + $0.50 direct fee, card/PayPal processing, the $20k volume tier drop to 5%, or the 30% Discover cut.",
    heroSummary:
      "Model Gumroad direct sales, 30% Discover marketplace orders, PayPal vs. card processing, and the automatic 5% tier past $20,000/month.",
    officialUrl: "https://gumroad.com/pricing",
    whatChanged2026: [
      "Direct sales carry a 10% + $0.50 platform cut plus separate card (2.9% + $0.30) or PayPal (3.49% + $0.49) processing.",
      "Once calendar-month paid sales exceed $20,000, direct platform fees drop to 5% + $0.50 on incremental revenue.",
      "Orders sourced through Gumroad Discover carry a flat 30% all-in fee (processing included).",
    ],
    formulaSummary: [
      "Direct Card Sale = Price × 10% + $0.50 (Gumroad) + Price × 2.9% + $0.30 (Card) = 12.9% + $0.80",
      "Direct PayPal Sale = Price × 10% + $0.50 (Gumroad) + Price × 3.49% + $0.49 (PayPal) = 13.49% + $0.99",
      "Gumroad Discover Sale = Price × 30% (all-in)",
    ],
    hiddenFeeWarnings: [
      "Processing fees are NOT included in Gumroad's headline 10% rate on direct sales — your true domestic US cut starts at 12.9% + $0.80.",
      "On a $9 ebook, the combined $0.80 flat fee adds nearly 9% by itself, pushing your effective rate past 21.7%.",
    ],
    bestFor: "First-time digital product creators testing demand with zero monthly commitment.",
    quickPrices: [9, 19, 29, 49, 99, 199],
    faqs: [
      {
        question: "How much does Gumroad actually take in 2026?",
        answer:
          "On a direct US card sale under $20,000/month, Gumroad charges 10% + $0.50 plus 2.9% + $0.30 payment processing — effectively 12.9% + $0.80. On a $29 product, you pay $4.54 in fees and keep $24.46.",
      },
      {
        question: "Does Gumroad still charge 30% on Discover sales?",
        answer:
          "Yes. Any sale attributed to Gumroad Discover carries a flat 30% fee, which includes card processing. You can toggle Discover off if you bring 100% of your own audience.",
      },
      {
        question: "When does Gumroad's fee drop from 10% to 5%?",
        answer:
          "Direct sales drop from 10% + $0.50 to 5% + $0.50 on revenue above $20,000 within a calendar month. Card or PayPal processing still applies on top.",
      },
      {
        question: "Does Gumroad handle EU VAT and US sales tax?",
        answer:
          "Yes. Gumroad acts as Merchant of Record, collecting and remitting global VAT, GST, and applicable US state sales taxes automatically.",
      },
    ],
    relatedComparisons: ["gumroad-vs-lemon-squeezy", "gumroad-vs-payhip"],
  },

  "lemon-squeezy": {
    id: "lemon-squeezy",
    name: "Lemon Squeezy",
    shortName: "Lemon Squeezy",
    slug: "lemon-squeezy-fee-calculator",
    hasStandalonePage: true,
    category: "Merchant of Record",
    isMoR: true,
    headlineRate: "5% + $0.50 (+ up to 3.5% surcharges)",
    monthlyPlanLabel: "$0/mo",
    seoTitle: "Lemon Squeezy Fee Calculator (2026): Real Cost with Intl, PayPal & Sub Surcharges",
    seoDescription:
      "Calculate your true 2026 Lemon Squeezy net payout including the 5% + $0.50 base MoR rate, +1.5% international cards, +1.5% PayPal, and +0.5% subscription fees.",
    heroSummary:
      "Uncover your true Lemon Squeezy effective rate after stacking international card (+1.5%), PayPal (+1.5%), and subscription (+0.5%) surcharges.",
    officialUrl: "https://www.lemonsqueezy.com/pricing",
    whatChanged2026: [
      "Base Merchant of Record pricing remains 5% + $0.50 with global VAT/sales tax handled automatically.",
      "Checkout surcharges stack individually: +1.5% for international (non-US) cards, +1.5% for PayPal, and +0.5% for recurring subscriptions — reaching 8.5% + $0.50.",
      "Following Stripe's acquisition, merchants are also evaluating migration options such as Stripe Managed Payments (~6.4% + $0.30) or Paddle/Polar.",
    ],
    formulaSummary: [
      "US Domestic One-Time Card = Price × 5% + $0.50",
      "International Card Subscription = Price × (5% + 1.5% + 0.5%) + $0.50 = 7.0% + $0.50",
      "International PayPal Subscription = Price × (5% + 1.5% + 1.5% + 0.5%) + $0.50 = 8.5% + $0.50",
    ],
    hiddenFeeWarnings: [
      "If most of your customers are outside the US and buy subscriptions, your real Lemon Squeezy rate is 7.0% + $0.50 — not 5% + $0.50.",
      "Comparing Lemon Squeezy against Paddle (flat 5% + $0.50 on USD payouts) can save 2%–3.5% of gross revenue on international SaaS.",
    ],
    bestFor: "Indie SaaS and digital creators with primarily US one-time card buyers who want fast MoR setup.",
    quickPrices: [9, 19, 29, 49, 99, 199],
    faqs: [
      {
        question: "Why is my Lemon Squeezy fee higher than 5% + $0.50?",
        answer:
          "Lemon Squeezy adds +1.5% for non-US cards, +1.5% for PayPal checkouts, and +0.5% for subscription renewals. When all three apply, the effective checkout rate becomes 8.5% + $0.50.",
      },
      {
        question: "Is Lemon Squeezy cheaper than Gumroad?",
        answer:
          "Yes, almost always on direct sales. Even with international and subscription surcharges (7.0% + $0.50), Lemon Squeezy is roughly 5.9 percentage points cheaper than Gumroad's 12.9% + $0.80 direct card rate.",
      },
      {
        question: "Should I pick Lemon Squeezy or Paddle for global SaaS?",
        answer:
          "If over 30% of your revenue comes from non-US cards, PayPal, or subscriptions and you settle in USD, Paddle's flat 5% + $0.50 usually leaves significantly more net payout.",
      },
    ],
    relatedComparisons: ["lemon-squeezy-vs-paddle", "gumroad-vs-lemon-squeezy"],
  },

  paddle: {
    id: "paddle",
    name: "Paddle",
    shortName: "Paddle",
    slug: "paddle-fee-calculator",
    hasStandalonePage: true,
    category: "Merchant of Record",
    isMoR: true,
    headlineRate: "5% + $0.50 all-in (MoR)",
    monthlyPlanLabel: "$0/mo",
    seoTitle: "Paddle Fee Calculator (2026): MoR All-In Payout & Non-USD FX Estimator",
    seoDescription:
      "Calculate your exact 2026 Paddle net revenue with its flat 5% + $0.50 Merchant of Record pricing, zero intl/PayPal surcharges, and optional FX payout margin.",
    heroSummary:
      "Calculate Paddle's flat 5% + $0.50 all-in Merchant of Record pricing — with zero checkout surcharges for international cards, PayPal, or recurring billing.",
    officialUrl: "https://www.paddle.com/pricing",
    whatChanged2026: [
      "Paddle maintains its transparent 5% + $0.50 all-in Merchant of Record rate across domestic, international, PayPal, and subscription payments.",
      "Unlike Lemon Squeezy, Paddle does not stack extra checkout percentages for subscriptions or non-US buyer cards.",
      "Watch out for non-USD payout conversions: settling in EUR/GBP/local currency typically carries a 1.5%–3% FX spread.",
    ],
    formulaSummary: [
      "USD Settlement (Any Card / PayPal / Subscription) = Price × 5% + $0.50",
      "Non-USD Payout Estimate = Price × 5% + $0.50 + ~2.0% FX margin",
    ],
    hiddenFeeWarnings: [
      "Paddle's main hidden cost is payout FX margin (1.5%–3%) if you withdraw in a non-USD currency instead of a USD account (like Wise or Mercury).",
      "On micro-transactions under $10, the $0.50 fixed fee pushes effective rates above 10%.",
    ],
    bestFor: "Global B2B SaaS and subscription software with high international buyer mix.",
    quickPrices: [15, 29, 49, 99, 199, 499],
    faqs: [
      {
        question: "Does Paddle charge extra for international cards or PayPal?",
        answer:
          "No. Paddle's 5% + $0.50 rate is all-in at checkout across international cards, PayPal, Apple Pay, and recurring subscriptions.",
      },
      {
        question: "How do I avoid Paddle's FX conversion margin?",
        answer:
          "Set your Paddle payout currency to USD and settle into a USD multi-currency account (such as Wise Business or Mercury) so you avoid automatic 1.5%–3% payout conversion spreads.",
      },
      {
        question: "Does Paddle handle EU VAT and US sales tax?",
        answer:
          "Yes. As Merchant of Record, Paddle calculates, collects, files, and remits global sales taxes, VAT, and GST on your behalf.",
      },
    ],
    relatedComparisons: ["lemon-squeezy-vs-paddle", "polar-vs-paddle"],
  },

  polar: {
    id: "polar",
    name: "Polar.sh",
    shortName: "Polar.sh",
    slug: "polar-fee-calculator",
    hasStandalonePage: true,
    category: "Merchant of Record",
    isMoR: true,
    headlineRate: "5%+$0.50 (Starter) down to 3.4%+$0.30",
    monthlyPlanLabel: "$0–$400/mo",
    seoTitle: "Polar.sh Fee Calculator (2026): New Tiered Pricing & Break-Even Solver",
    seoDescription:
      "Calculate your 2026 Polar.sh net revenue across Starter ($0), Pro ($20), Growth ($100), and Scale ($400) plans and find your exact tier break-even point.",
    heroSummary:
      "Model Polar.sh's May 2026 tiered Merchant of Record pricing (Starter, Pro, Growth, Scale) and automatically see which plan saves the most money at your revenue.",
    officialUrl: "https://polar.sh/pricing",
    whatChanged2026: [
      "Effective May 27, 2026, Polar replaced its legacy single rate with 4 public tiers: Starter ($0/mo, 5% + $0.50), Pro ($20/mo, 3.8% + $0.40), Growth ($100/mo, 3.6% + $0.35), and Scale ($400/mo, 3.4% + $0.30).",
      "Subscription renewals carry 0% extra surcharge on the new 2026 plans.",
      "International (non-US) cards incur a +1.5% surcharge, and Stripe Connect payout transfer fees apply on withdrawals.",
    ],
    formulaSummary: [
      "Starter ($0/mo) = Price × 5.0% + $0.50",
      "Pro ($20/mo) = $20/mo + Price × 3.8% + $0.40 (beats Starter past ~$1,379/mo)",
      "Growth ($100/mo) = $100/mo + Price × 3.6% + $0.35 (beats Pro past ~$5,634/mo)",
      "Scale ($400/mo) = $400/mo + Price × 3.4% + $0.30 (beats Growth past ~$19,048/mo)",
    ],
    hiddenFeeWarnings: [
      "International cards still add +1.5% on Polar.sh — factor this in when comparing Polar Pro against Paddle for European customer bases.",
      "Polar passes through Stripe payout fees ($2/mo active payout + 0.25% + $0.25 domestic withdrawal).",
    ],
    bestFor: "Developer-first SaaS, AI tools, and open-source products scaling past $1,500/mo MRR.",
    quickPrices: [15, 29, 49, 99, 199, 499],
    faqs: [
      {
        question: "When is Polar.sh Pro ($20/mo) cheaper than Starter ($0/mo)?",
        answer:
          "Because Pro cuts transaction fees from 5% + $0.50 down to 3.8% + $0.40, it typically breaks even around $1,379–$1,650 in monthly gross sales depending on your average order value.",
      },
      {
        question: "Does Polar.sh charge extra for subscriptions in 2026?",
        answer:
          "No. On the May 2026 tiered plans, Polar dropped the extra 0.5% subscription surcharge.",
      },
      {
        question: "Is Polar.sh cheaper than Paddle?",
        answer:
          "For US-heavy SaaS above ~$1,500/month, Polar Pro (3.8% + $0.40 + $20/mo) beats Paddle (5% + $0.50). If your buyers are mostly international (+1.5% on Polar), Paddle can still win until higher tiers.",
      },
    ],
    relatedComparisons: ["polar-vs-paddle"],
  },

  substack: {
    id: "substack",
    name: "Substack",
    shortName: "Substack",
    slug: "substack-fee-calculator",
    hasStandalonePage: true,
    category: "Newsletter & Membership",
    isMoR: false,
    headlineRate: "13.6% + $0.30 (web) / up to 40% iOS",
    monthlyPlanLabel: "$0/mo",
    seoTitle: "Substack Fee Calculator (2026): Real 13.6% + $0.30 Web Cut & iOS App Fee",
    seoDescription:
      "Calculate your exact 2026 Substack take-home revenue after Substack's 10%, Stripe's 2.9% + $0.30, Stripe Billing's 0.7%, and optional Apple iOS 15%–30% app cuts.",
    heroSummary:
      "See what Substack actually takes after combining its 10% cut, Stripe's 2.9% + $0.30, Stripe Billing's 0.7% recurring fee, and Apple's iOS in-app fee.",
    officialUrl: "https://substack.com/going-paid",
    whatChanged2026: [
      "Web paid subscriptions deduct 10% (Substack) + 2.9% + $0.30 (Stripe card) + 0.7% (Stripe Billing) = 13.6% + $0.30 on US cards.",
      "Subscriptions purchased inside the iOS app incur Apple's 15% (Small Business) or 30% cut unless subscribers check out on the web.",
      "Switching readers from $5/mo monthly plans to $50/yr annual plans cuts the $0.30 per-charge flat fee by 12×.",
    ],
    formulaSummary: [
      "US Web Card Subscription = Price × (10% + 2.9% + 0.7%) + $0.30 = 13.6% + $0.30",
      "International Web Card = 15.1% + $0.30",
      "Apple iOS In-App Purchase = Apple Cut (15% or 30%) + Substack 10%",
    ],
    hiddenFeeWarnings: [
      "Most writers forget Stripe Billing's 0.7% recurring fee — web fees are 13.6% + $0.30, not 12.9% + $0.30.",
      "On a $5/month newsletter, the $0.30 fixed fee alone eats 6% of revenue (bringing total web fees to 19.6%). Encouraging annual plans immediately boosts net margin.",
    ],
    bestFor: "Newsletter writers leveraging Substack Notes and recommendations to grow from 0 to 1,000 paid subscribers.",
    quickPrices: [5, 8, 10, 15, 50, 100],
    faqs: [
      {
        question: "What is the exact Substack fee percentage in 2026?",
        answer:
          "For US web card subscriptions, total fees are 13.6% + $0.30 per charge: 10% to Substack, 2.9% + $0.30 to Stripe processing, and 0.7% to Stripe Billing for recurring subscriptions.",
      },
      {
        question: "How much do I keep on a $5/month Substack subscription?",
        answer:
          "On a $5 US web subscription, total fees are $0.98 (19.6%), leaving you $4.02. On a $50/year annual subscription, fees are $7.10 (14.2%), saving $4.66 per reader each year.",
      },
      {
        question: "Does Substack charge for free newsletters?",
        answer: "No. Publishing a free Substack newsletter is completely free with unlimited subscribers.",
      },
    ],
    relatedComparisons: ["substack-vs-patreon"],
  },

  patreon: {
    id: "patreon",
    name: "Patreon",
    shortName: "Patreon",
    slug: "patreon-fee-calculator",
    hasStandalonePage: true,
    category: "Newsletter & Membership",
    isMoR: false,
    headlineRate: "10% Standard (+ 2.9% + $0.30)",
    monthlyPlanLabel: "$0/mo",
    seoTitle: "Patreon Fee Calculator (2026): 10% Standard vs Legacy Plans & iOS Fee",
    seoDescription:
      "Calculate your 2026 Patreon take-home payout with the 10% Standard tier (post-Aug 2025), Legacy 5%/8%/11% tiers, micropayment processing, and iOS app fees.",
    heroSummary:
      "Calculate net creator payouts under Patreon's 10% Standard tier (or grandfathered Legacy plans), including micropayment rates for $3 pledges and Apple iOS fees.",
    officialUrl: "https://www.patreon.com/pricing",
    whatChanged2026: [
      "Creators who launched after August 4, 2025 are automatically on Patreon's single 10% Standard platform fee.",
      "Legacy creators who remain continuously published keep their grandfathered rates (Founders 5%, Pro 8%, or Pro + Merch 11%).",
      "Pledges of $3 or less use micropayment processing (5% + $0.10) instead of standard 2.9% + $0.30.",
    ],
    formulaSummary: [
      "Standard Plan (> $3 pledge, US Card) = Price × 10% (Patreon) + Price × 2.9% + $0.30 (Processing) = 12.9% + $0.30",
      "Micropayment (≤ $3 pledge) = Price × 10% + Price × 5% + $0.10 = 15% + $0.10",
    ],
    hiddenFeeWarnings: [
      "Apple iOS in-app memberships incur Apple's 30% App Store cut unless you raise iOS tier prices or guide fans to join on desktop/mobile web.",
      "Currency conversion and payout withdrawal fees (PayPal/Payoneer/wire) apply separately depending on your country.",
    ],
    bestFor: "Podcasters, video creators, artists, and community builders offering tiered member perks.",
    quickPrices: [3, 5, 10, 15, 25, 50],
    faqs: [
      {
        question: "What is Patreon's fee for new creators in 2026?",
        answer:
          "New creators pay a flat 10% platform fee plus payment processing (2.9% + $0.30 for US web pledges over $3, or 5% + $0.10 for pledges of $3 or less).",
      },
      {
        question: "Do older Patreon accounts still pay 5% or 8%?",
        answer:
          "Yes, creators continuously published prior to August 4, 2025 keep their Legacy Founders (5%), Pro (8%), or Pro + Merch (11%) platform tiers unless they unpublish or switch.",
      },
      {
        question: "Is Patreon cheaper than Substack?",
        answer:
          "On web cards, Patreon's Standard plan (12.9% + $0.30) is 0.7% cheaper than Substack (13.6% + $0.30) because Substack passes through Stripe Billing's 0.7% recurring fee.",
      },
    ],
    relatedComparisons: ["substack-vs-patreon"],
  },

  payhip: {
    id: "payhip",
    name: "Payhip",
    shortName: "Payhip",
    slug: "payhip-fee-calculator",
    hasStandalonePage: true,
    category: "Creator Storefront",
    isMoR: false,
    headlineRate: "5% Free / 2% Plus / 0% Pro (+ card)",
    monthlyPlanLabel: "$0 / $29 / $99",
    seoTitle: "Payhip Fee Calculator (2026): Free vs Plus vs Pro Break-Even Calculator",
    seoDescription:
      "Calculate your exact 2026 Payhip payout across Free (5%), Plus ($29/mo + 2%), and Pro ($99/mo + 0%) plans plus Stripe/PayPal fees and auto-find the cheapest tier.",
    heroSummary:
      "Calculate Payhip payouts after platform + Stripe/PayPal fees, and automatically see whether Free, Plus ($29/mo), or Pro ($99/mo) saves you the most money.",
    officialUrl: "https://payhip.com/pricing",
    whatChanged2026: [
      "All 3 plans unlock identical storefront features — you only upgrade to eliminate the transaction fee.",
      "Exact break-even math: Plus ($29/mo, 2%) beats Free (5%) at $967/month; Pro ($99/mo, 0%) beats Plus at $3,500/month.",
      "Stripe (2.9% + $0.30) or PayPal (3.49% + $0.49) processing applies on top of every Payhip plan.",
    ],
    formulaSummary: [
      "Free Forever = Price × 5% + Stripe (2.9% + $0.30) = 7.9% + $0.30",
      "Plus ($29/mo) = $29/mo + Price × 2% + Stripe (2.9% + $0.30)",
      "Pro ($99/mo) = $99/mo + 0% Payhip + Stripe (2.9% + $0.30)",
    ],
    hiddenFeeWarnings: [
      "Never stay on Payhip Free once you pass $1,000/month — upgrading to Plus ($29/mo) pays for itself immediately.",
      "Remember that Payhip's 0% Pro plan still incurs Stripe/PayPal processing fees (~2.9% + $0.30).",
    ],
    bestFor: "Ebook, course, and template sellers moving off Gumroad to cut fees from 12.9% down to ~3%–7.9%.",
    quickPrices: [9, 19, 29, 49, 99, 199],
    faqs: [
      {
        question: "When should I upgrade from Payhip Free to Plus or Pro?",
        answer:
          "Upgrade to Plus ($29/mo) once monthly sales exceed $967, because saving 3% on $967 equals $29. Upgrade to Pro ($99/mo) once monthly sales exceed $3,500, because saving 2% on $3,500 equals the $70 plan difference.",
      },
      {
        question: "How much cheaper is Payhip than Gumroad?",
        answer:
          "Even on Payhip's Free plan (7.9% + $0.30 with Stripe), you save 5% + $0.50 per sale compared to Gumroad Direct (12.9% + $0.80). At $2,000/month in sales, Payhip Plus saves over $1,900/year.",
      },
      {
        question: "Does Payhip handle EU/UK VAT?",
        answer:
          "Yes, Payhip automates EU and UK VAT collection and remittance on digital products, though full global MoR coverage differs slightly from Paddle or Lemon Squeezy.",
      },
    ],
    relatedComparisons: ["gumroad-vs-payhip"],
  },

  whop: {
    id: "whop",
    name: "Whop",
    shortName: "Whop",
    slug: "whop-fee-calculator",
    hasStandalonePage: true,
    category: "Creator Storefront",
    isMoR: false,
    headlineRate: "2.7% + $0.30 (+ optional add-ons)",
    monthlyPlanLabel: "$0/mo",
    seoTitle: "Whop Fee Calculator (2026): Base 2.7% + $0.30 & Hidden Add-On Estimator",
    seoDescription:
      "Calculate your real 2026 Whop take-home revenue including base 2.7% + $0.30 processing, Radar/3DS, international cards, Billing (+0.5%), Tax (+2%), and app fees.",
    heroSummary:
      "Whop advertises 2.7% + $0.30, but optional security, subscription billing, tax remittance, and gated community app fees add up fast. Toggle each one here.",
    officialUrl: "https://whop.com/pricing",
    whatChanged2026: [
      "Whop's base domestic card processing starts at 2.7% + $0.30 with $0/month fixed cost.",
      "Common per-sale extras include $0.07 Radar fraud + $0.03 3DS, +1.5% international card, +1% FX, +0.5% Billing, and +2% optional tax remittance.",
      "Certain gated community apps/automations (such as Discord, Telegram, or TradingView gating) can add a 3% app fee.",
    ],
    formulaSummary: [
      "Base Direct Card = Price × 2.7% + $0.30 (+ $0.10 Radar/3DS)",
      "With Billing + Tax Remittance = Price × (2.7% + 0.5% + 2.0%) + $0.40 = 5.2% + $0.40",
      "With Gated App + International = Add +3.0% (app) + 1.5% (intl)",
    ],
    hiddenFeeWarnings: [
      "Always check whether your product uses Whop's Billing (+0.5%), Tax Remittance (+2%), or gated community apps (+3%) before comparing Whop to Stripe or Paddle.",
      "Disputes carry a $15 chargeback fee.",
    ],
    bestFor: "Paid communities, Discord/Telegram memberships, coaching, and info-product sellers.",
    quickPrices: [19, 29, 49, 99, 199, 499],
    faqs: [
      {
        question: "What is Whop's real fee in 2026?",
        answer:
          "For a simple domestic US card checkout without add-ons, Whop charges 2.7% + $0.30 (plus ~$0.10 for Radar/3DS). Adding Billing (0.5%), Tax Remittance (2%), and international cards (1.5%) brings it to 6.7% + $0.40.",
      },
      {
        question: "Does Whop act as Merchant of Record?",
        answer:
          "Whop offers an optional 2% Tax & Remittance add-on for US/EU/UK tax handling, or you can collect/remit taxes yourself to keep fees lower.",
      },
    ],
    relatedComparisons: [],
  },

  kofi: {
    id: "kofi",
    name: "Ko-fi",
    shortName: "Ko-fi",
    slug: "kofi-fee-calculator",
    hasStandalonePage: true,
    category: "Newsletter & Membership",
    isMoR: false,
    headlineRate: "0%–5% (+ card) / $12 Gold",
    monthlyPlanLabel: "$0 / $12/mo",
    seoTitle: "Ko-fi Fee Calculator (2026): Free vs Standard 5% Trap & Gold $240 Break-Even",
    seoDescription:
      "Calculate your exact 2026 Ko-fi net payout across Standard (5%), Free mode (0% tips / 5% shop), and Ko-fi Gold ($12/mo, 0% fees) plus Stripe/PayPal processing.",
    heroSummary:
      "Avoid Ko-fi's default 5% Standard mode trap and see the exact $240/month break-even threshold where Ko-fi Gold ($12/mo) becomes cheaper.",
    officialUrl: "https://ko-fi.com/gold",
    whatChanged2026: [
      "New Ko-fi accounts default to Standard/Contributor mode (5% fee on everything, including one-time tips) unless you turn it off in payment settings.",
      "Turning Standard mode off makes one-time tips 0% Ko-fi fee (only Stripe/PayPal processing applies), while Shop, Commissions, and Memberships remain 5%.",
      "Ko-fi Gold costs $12/month (monthly billing only for new sign-ups) and drops Ko-fi fees to 0% across all sales — breaking even at exactly $240/month.",
    ],
    formulaSummary: [
      "Free Mode One-Time Tip = 0% Ko-fi + Stripe (2.9% + $0.30)",
      "Standard Mode or Shop/Membership = 5% Ko-fi + Stripe (2.9% + $0.30) = 7.9% + $0.30",
      "Ko-fi Gold = $12/mo + 0% Ko-fi + Stripe (2.9% + $0.30)",
    ],
    hiddenFeeWarnings: [
      "Upgrading to Ko-fi Gold does NOT retroactively remove the 5% fee on older Stripe memberships created before you upgraded.",
      "If you only receive one-time tips, turn OFF Contributor/Standard mode in settings instead of paying $12/mo for Gold.",
    ],
    bestFor: "Artists, indie devs, writers, and streamers taking tips, commissions, or small shop orders.",
    quickPrices: [5, 10, 15, 25, 50, 100],
    faqs: [
      {
        question: "When is Ko-fi Gold ($12/mo) worth it?",
        answer:
          "Ko-fi Gold removes the 5% platform fee on shop orders, commissions, and memberships. Once those fee-bearing sales pass $240/month ($240 × 5% = $12), Gold saves you money every month.",
      },
      {
        question: "Why is Ko-fi taking 5% on my one-time donations?",
        answer:
          "New accounts have Standard/Contributor mode enabled by default, which charges 5% on all payments in exchange for extra perks. You can switch it off in your payment settings to get 0% Ko-fi fees on one-time tips.",
      },
    ],
    relatedComparisons: [],
  },

  stripe: {
    id: "stripe",
    name: "Stripe (Direct)",
    shortName: "Stripe",
    slug: "stripe-fee-calculator",
    hasStandalonePage: false,
    category: "Payment Processor",
    isMoR: false,
    headlineRate: "2.9% + $0.30 (US domestic)",
    monthlyPlanLabel: "$0/mo",
    seoTitle: "Stripe Fee Calculator (2026)",
    seoDescription: "Baseline Stripe US card fee calculator (2.9% + $0.30) with international, Billing, and Tax add-ons.",
    heroSummary: "Direct Stripe processing baseline — lowest per-sale cost, but you manage global tax registration and filing yourself.",
    officialUrl: "https://stripe.com/pricing",
    whatChanged2026: [
      "Standard US online card rate remains 2.9% + $0.30.",
      "International cards add +1.5%, currency conversion adds +1.0%, Stripe Billing adds +0.7%, and Stripe Tax Basic adds +0.5%.",
    ],
    formulaSummary: ["US Domestic Card = Price × 2.9% + $0.30"],
    hiddenFeeWarnings: ["Direct Stripe is not a Merchant of Record — global VAT/sales tax compliance is your responsibility."],
    bestFor: "Teams with an accountant or tax workflow who want the lowest possible payment fee.",
    quickPrices: [10, 29, 49, 99, 199],
    faqs: [],
    relatedComparisons: [],
  },
};

export const STANDALONE_PLATFORMS: PlatformMeta[] = Object.values(PLATFORMS).filter(
  (p) => p.hasStandalonePage
);

export function getPlatformBySlug(slug: string): PlatformMeta | undefined {
  return STANDALONE_PLATFORMS.find((p) => p.slug === slug);
}
