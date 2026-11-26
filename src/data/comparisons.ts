import type { PlatformId } from "@/lib/fees";
import type { PlatformFaq } from "./platforms";

export interface ComparisonMeta {
  slug: string;
  leftId: PlatformId;
  rightId: PlatformId;
  title: string;
  seoTitle: string;
  seoDescription: string;
  heroSummary: string;
  defaultPrice: number;
  defaultSales: number;
  defaultIntl?: boolean;
  defaultSub?: boolean;
  verdictSummary: string;
  keyDifferences: {
    topic: string;
    left: string;
    right: string;
  }[];
  whenToPickLeft: string[];
  whenToPickRight: string[];
  faqs: PlatformFaq[];
}

export const COMPARISONS: ComparisonMeta[] = [
  {
    slug: "lemon-squeezy-vs-paddle",
    leftId: "lemon-squeezy",
    rightId: "paddle",
    title: "Lemon Squeezy vs Paddle Fee Calculator (2026)",
    seoTitle: "Lemon Squeezy vs Paddle Fee Calculator (2026): Real MoR Savings",
    seoDescription:
      "Compare 2026 Lemon Squeezy vs Paddle fees side by side. See how +1.5% international, +1.5% PayPal, and +0.5% subscription surcharges impact annual net profit.",
    heroSummary:
      "Both advertise 5% + $0.50 as Merchants of Record — but once you add international cards, PayPal, or subscriptions, your actual annual payout diverges sharply.",
    defaultPrice: 29,
    defaultSales: 100,
    defaultIntl: true,
    defaultSub: true,
    verdictSummary:
      "On US-only one-time card payments, Lemon Squeezy and Paddle cost the exact same (5% + $0.50). As soon as you sell recurring subscriptions or non-US customers buy with international cards or PayPal, Paddle's flat all-in rate typically saves 2% to 3.5% of gross revenue.",
    keyDifferences: [
      { topic: "Base MoR Rate", left: "5% + $0.50", right: "5% + $0.50" },
      { topic: "International Card Fee", left: "+1.5% surcharge", right: "$0 extra (included)" },
      { topic: "PayPal Checkout Fee", left: "+1.5% surcharge", right: "$0 extra (included)" },
      { topic: "Subscription Renewal Fee", left: "+0.5% surcharge", right: "$0 extra (included)" },
      { topic: "Non-USD Payout FX", left: "Varies by payout method (~1.5%)", right: "1.5%–3% FX margin if not USD" },
      { topic: "Global Tax / VAT (MoR)", left: "Included", right: "Included" },
    ],
    whenToPickLeft: [
      "You sell one-time digital products or templates primarily to US cardholders.",
      "You want built-in lightweight digital storefront, license keys, and fast indie onboarding.",
    ],
    whenToPickRight: [
      "Over 25% of your buyers are outside the US or pay via PayPal.",
      "You run a recurring SaaS subscription and settle payouts into a USD account.",
    ],
    faqs: [
      {
        question: "Why does Paddle beat Lemon Squeezy on global subscriptions?",
        answer:
          "Lemon Squeezy stacks +1.5% for international cards and +0.5% for subscription renewals (7.0% + $0.50 total), whereas Paddle keeps a flat 5% + $0.50 on USD settlements. On $5,000/mo in international MRR, that saves $1,200/year.",
      },
      {
        question: "Are both Lemon Squeezy and Paddle full Merchants of Record?",
        answer:
          "Yes. Both platforms handle EU VAT, UK VAT, GST, and US state sales tax compliance on your behalf.",
      },
    ],
  },
  {
    slug: "gumroad-vs-lemon-squeezy",
    leftId: "gumroad",
    rightId: "lemon-squeezy",
    title: "Gumroad vs Lemon Squeezy Fee Calculator (2026)",
    seoTitle: "Gumroad vs Lemon Squeezy Fee Calculator (2026): How Much You Save",
    seoDescription:
      "Compare 2026 Gumroad (12.9% + $0.80 direct / 30% Discover) against Lemon Squeezy (5% + $0.50 base MoR) to see your exact monthly and annual savings.",
    heroSummary:
      "Compare Gumroad's 10% + $0.50 (+ card processing) against Lemon Squeezy's Merchant of Record pricing and calculate your exact yearly savings from switching.",
    defaultPrice: 29,
    defaultSales: 60,
    defaultIntl: false,
    defaultSub: false,
    verdictSummary:
      "For creators bringing their own audience, Lemon Squeezy beats Gumroad by roughly 5.9%–7.9% of gross sales (plus $0.30 per order) while still acting as Merchant of Record for global taxes.",
    keyDifferences: [
      { topic: "US Direct Card Sale", left: "12.9% + $0.80 (10%+$0.50 + card)", right: "5.0% + $0.50 all-in" },
      { topic: "International Card Sale", left: "~14.4% + $0.80", right: "6.5% + $0.50" },
      { topic: "Marketplace Discovery", left: "Built-in Discover (30% cut)", right: "No marketplace (bring own traffic)" },
      { topic: "Volume Discount", left: "Drops to 5%+$0.50 past $20k/mo", right: "Custom enterprise pricing" },
      { topic: "Global Tax / VAT (MoR)", left: "Included", right: "Included" },
    ],
    whenToPickLeft: [
      "You are launching your first $9–$29 product and want Gumroad Discover's built-in marketplace traffic.",
      "You want zero setup friction and already have an established Gumroad audience.",
    ],
    whenToPickRight: [
      "You generate traffic via X, YouTube, SEO, or newsletters and don't rely on Gumroad Discover.",
      "You sell SaaS, Notion templates, or courses above $500/month and want to keep 6%+ more profit.",
    ],
    faqs: [
      {
        question: "How much do I save moving $2,000/month from Gumroad to Lemon Squeezy?",
        answer:
          "On 70 US direct card sales at $29 ($2,030/mo), Gumroad deducts $317.87/mo while Lemon Squeezy deducts $136.50/mo — saving you $181.37/month or $2,176/year.",
      },
      {
        question: "Do both handle EU VAT automatically?",
        answer:
          "Yes, both Gumroad and Lemon Squeezy operate as Merchant of Record and handle global digital sales tax.",
      },
    ],
  },
  {
    slug: "gumroad-vs-payhip",
    leftId: "gumroad",
    rightId: "payhip",
    title: "Gumroad vs Payhip Fee Calculator (2026)",
    seoTitle: "Gumroad vs Payhip Fee Calculator (2026): Free vs Plus vs Pro Savings",
    seoDescription:
      "Compare 2026 Gumroad fees against Payhip Free (5%), Plus ($29/mo + 2%), and Pro ($99/mo + 0%) plus Stripe/PayPal processing to find the lowest-cost storefront.",
    heroSummary:
      "See how quickly switching from Gumroad Direct to Payhip Free, Plus ($29/mo), or Pro ($99/mo) pays off across your monthly digital product volume.",
    defaultPrice: 29,
    defaultSales: 50,
    defaultIntl: false,
    defaultSub: false,
    verdictSummary:
      "Payhip wins on price at every single revenue level for self-driven traffic: Payhip Free saves 5% + $0.50 per order on Day 1, and upgrading to Payhip Plus ($29/mo) past $967/mo cuts fees even further.",
    keyDifferences: [
      { topic: "Free Plan Effective Rate (US Card)", left: "12.9% + $0.80", right: "7.9% + $0.30 (5% + Stripe)" },
      { topic: "Paid Plans to Cut Fees", left: "None (drops at $20k/mo)", right: "Plus $29/mo (2%) · Pro $99/mo (0%)" },
      { topic: "Payout Speed", left: "Weekly / scheduled payouts", right: "Instant via Stripe/PayPal" },
      { topic: "Marketplace Traffic", left: "Gumroad Discover (30%)", right: "None (bring your own audience)" },
    ],
    whenToPickLeft: [
      "You actively earn meaningful organic sales from Gumroad Discover.",
      "You want full global MoR coverage across every country without connecting your own Stripe/PayPal.",
    ],
    whenToPickRight: [
      "You bring your own buyers and want instant Stripe/PayPal payouts with much lower fees.",
      "You sell over $1,000/month and want a predictable flat monthly plan (Plus or Pro).",
    ],
    faqs: [
      {
        question: "Is Payhip really cheaper than Gumroad even on the Free plan?",
        answer:
          "Yes. Payhip Free charges 5% plus Stripe (2.9% + $0.30) = 7.9% + $0.30. Gumroad Direct charges 10% + $0.50 plus Stripe (2.9% + $0.30) = 12.9% + $0.80.",
      },
      {
        question: "Does Payhip require a Stripe or PayPal account?",
        answer:
          "Yes. Unlike Gumroad, Payhip connects directly to your Stripe or PayPal account so customer payments land in your account right away.",
      },
    ],
  },
  {
    slug: "substack-vs-patreon",
    leftId: "substack",
    rightId: "patreon",
    title: "Substack vs Patreon Fee Calculator (2026)",
    seoTitle: "Substack vs Patreon Fee Calculator (2026): Real Creator Take-Home",
    seoDescription:
      "Compare 2026 Substack fees (13.6% + $0.30 web) vs Patreon fees (12.9% + $0.30 Standard or Legacy 5%–8%) across monthly, annual, and iOS memberships.",
    heroSummary:
      "Both take a headline 10% platform fee for new creators — compare how Stripe Billing's extra 0.7%, Legacy Patreon tiers, and iOS fees change your actual payout.",
    defaultPrice: 10,
    defaultSales: 200,
    defaultIntl: false,
    defaultSub: true,
    verdictSummary:
      "On web cards for new creators, Patreon Standard (12.9% + $0.30) saves 0.7% over Substack (13.6% + $0.30) because Substack adds Stripe Billing's 0.7% fee. Legacy Patreon creators (5%–8%) save substantially more.",
    keyDifferences: [
      { topic: "Platform Fee (New Creators)", left: "10%", right: "10% Standard (post-Aug 2025)" },
      { topic: "Web Card Processing", left: "2.9% + $0.30 + 0.7% Stripe Billing", right: "2.9% + $0.30 (5%+$0.10 if ≤$3)" },
      { topic: "Total US Web Effective Rate", left: "13.6% + $0.30", right: "12.9% + $0.30" },
      { topic: "Best Growth Lever", left: "Built-in Notes & newsletter referrals", right: "Multi-tier perks, podcasts & community" },
    ],
    whenToPickLeft: [
      "Your core product is a written newsletter and you want Substack's built-in recommendation network.",
      "You want email delivery + paid subscriptions bundled with zero setup.",
    ],
    whenToPickRight: [
      "You run a podcast, YouTube channel, or art community with multiple membership tiers.",
      "You have a grandfathered Legacy Patreon account at 5% or 8%.",
    ],
    faqs: [
      {
        question: "Why is Substack 0.7% more expensive than Patreon on web cards?",
        answer:
          "Substack passes through Stripe Billing's 0.7% recurring subscription fee on top of Stripe's 2.9% + $0.30 card fee, making web fees 13.6% + $0.30 versus Patreon's 12.9% + $0.30.",
      },
      {
        question: "How do I cut fees on both Substack and Patreon?",
        answer:
          "Promote annual subscriptions (saving 11× the $0.30 per-charge flat fee each year) and encourage readers to subscribe via web browser rather than inside the iOS app.",
      },
    ],
  },
  {
    slug: "polar-vs-paddle",
    leftId: "polar",
    rightId: "paddle",
    title: "Polar.sh vs Paddle Fee Calculator (2026)",
    seoTitle: "Polar.sh vs Paddle Fee Calculator (2026): MoR Pricing & Break-Even",
    seoDescription:
      "Compare 2026 Polar.sh tiered MoR plans (Starter, Pro, Growth, Scale) vs Paddle's flat 5% + $0.50 all-in rate across US and international SaaS buyers.",
    heroSummary:
      "Compare Polar.sh's May 2026 tiered Merchant of Record pricing against Paddle's flat 5% + $0.50 rate — including international card surcharges and monthly plan break-even.",
    defaultPrice: 49,
    defaultSales: 80,
    defaultIntl: false,
    defaultSub: true,
    verdictSummary:
      "For US-dominant SaaS above ~$1,500/mo MRR, Polar Pro ($20/mo + 3.8% + $0.40) beats Paddle (5% + $0.50). However, if most customers use non-US cards (+1.5% surcharge on Polar), Paddle remains cheaper on Starter and close on Pro.",
    keyDifferences: [
      { topic: "Entry / $0 Plan Rate", left: "5.0% + $0.50 (Starter)", right: "5.0% + $0.50" },
      { topic: "Paid Volume Tiers", left: "Pro 3.8% · Growth 3.6% · Scale 3.4%", right: "Custom enterprise quotes" },
      { topic: "International Card Fee", left: "+1.5% surcharge", right: "$0 extra (included)" },
      { topic: "Subscription Surcharge", left: "0% (removed in May 2026 plans)", right: "0% (included)" },
      { topic: "Merchant of Record", left: "Full MoR", right: "Full MoR" },
    ],
    whenToPickLeft: [
      "You build developer tools, AI apps, or open-source products with mostly US cards and MRR above $1,500.",
      "You want self-serve public volume tiers down to 3.4% + $0.30 without sales calls.",
    ],
    whenToPickRight: [
      "A high share of your buyers are outside the US or prefer PayPal checkout.",
      "You want one predictable 5% + $0.50 rate with zero international card surcharges.",
    ],
    faqs: [
      {
        question: "At what revenue does Polar Pro beat Paddle?",
        answer:
          "On domestic US card transactions, Polar Pro ($20/mo + 3.8% + $0.40) beats Paddle (5% + $0.50) starting around $1,379–$1,650/month in gross revenue.",
      },
      {
        question: "Does Polar charge extra for international buyers?",
        answer:
          "Yes, Polar adds +1.5% on international (non-US) cards, whereas Paddle includes international cards in its 5% + $0.50 rate.",
      },
    ],
  },
];

export function getComparisonBySlug(slug: string): ComparisonMeta | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
