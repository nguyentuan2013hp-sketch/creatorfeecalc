export type PlatformId =
  | "gumroad"
  | "lemon-squeezy"
  | "paddle"
  | "polar"
  | "substack"
  | "patreon"
  | "payhip"
  | "whop"
  | "kofi"
  | "stripe";

export type PaymentMethod = "card" | "paypal" | "ios";

export interface CalculatorInput {
  price: number; // Sale price in USD
  monthlySales: number; // Number of transactions per month
  paymentMethod: PaymentMethod;
  isInternational: boolean; // Non-US / international buyer card
  isSubscription: boolean; // Recurring subscription transaction
  isNonUsdPayout: boolean; // Non-USD settlement / FX conversion
  // Platform-specific optional controls
  gumroadChannel?: "direct" | "discover";
  polarTier?: "starter" | "pro" | "growth" | "scale";
  payhipTier?: "free" | "plus" | "pro";
  patreonTier?: "standard" | "legacy-founders" | "legacy-pro" | "legacy-pro-merch";
  kofiMode?: "standard" | "free-tip" | "free-shop" | "gold";
  whopAddons?: {
    fraudAnd3ds?: boolean; // $0.07 Radar + $0.03 3DS
    billing?: boolean; // +0.5%
    taxRemittance?: boolean; // +2.0%
    gatedApp?: boolean; // +3.0% (Discord/Telegram/etc.)
  };
  stripeAddons?: {
    billing?: boolean; // +0.7%
    taxBasic?: boolean; // +0.5%
  };
  iosRate?: 0.15 | 0.30; // Apple Small Business 15% vs Standard 30%
}

export interface FeeBreakdownLine {
  label: string;
  perSale: number;
  monthly: number;
  kind: "platform" | "processing" | "surcharge" | "fixed";
}

export interface FeeResult {
  platformId: PlatformId;
  grossPerSale: number;
  monthlyGross: number;
  annualGross: number;
  platformFeePerSale: number;
  processingFeePerSale: number;
  surchargePerSale: number;
  monthlyFixedFee: number;
  totalFeePerSale: number; // Includes amortized monthly fixed fee
  totalMonthlyFee: number;
  totalAnnualFee: number;
  effectiveRatePct: number;
  netPerSale: number;
  monthlyNet: number;
  annualNet: number;
  breakdown: FeeBreakdownLine[];
  notes: string[];
  recommendedUpgrade?: string;
}

export const DEFAULT_INPUT: CalculatorInput = {
  price: 29,
  monthlySales: 50,
  paymentMethod: "card",
  isInternational: false,
  isSubscription: false,
  isNonUsdPayout: false,
  gumroadChannel: "direct",
  polarTier: "starter",
  payhipTier: "free",
  patreonTier: "standard",
  kofiMode: "standard",
  whopAddons: {
    fraudAnd3ds: true,
    billing: false,
    taxRemittance: false,
    gatedApp: false,
  },
  stripeAddons: {
    billing: false,
    taxBasic: false,
  },
  iosRate: 0.15,
};

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

export function formatCurrency(amount: number): string {
  const safe = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(safe);
}

export function formatPercent(pct: number): string {
  const safe = Number.isFinite(pct) ? pct : 0;
  return `${safe.toFixed(2)}%`;
}

export function calculatePlatformFee(
  platformId: PlatformId,
  rawInput: Partial<CalculatorInput> = {}
): FeeResult {
  const input: CalculatorInput = {
    ...DEFAULT_INPUT,
    ...rawInput,
    whopAddons: { ...DEFAULT_INPUT.whopAddons, ...(rawInput.whopAddons || {}) },
    stripeAddons: { ...DEFAULT_INPUT.stripeAddons, ...(rawInput.stripeAddons || {}) },
  };

  const price = Math.max(0.5, Number(input.price) || 0);
  const sales = Math.max(1, Math.round(Number(input.monthlySales) || 1));
  const monthlyGross = price * sales;

  const breakdown: FeeBreakdownLine[] = [];
  const notes: string[] = [];
  let platformFeeMonthly = 0;
  let processingFeeMonthly = 0;
  let surchargeMonthly = 0;
  let monthlyFixedFee = 0;
  let recommendedUpgrade: string | undefined;

  const addLine = (
    label: string,
    monthly: number,
    kind: FeeBreakdownLine["kind"]
  ) => {
    if (monthly <= 0) return;
    breakdown.push({
      label,
      perSale: monthly / sales,
      monthly,
      kind,
    });
    if (kind === "platform") platformFeeMonthly += monthly;
    else if (kind === "processing") processingFeeMonthly += monthly;
    else if (kind === "surcharge") surchargeMonthly += monthly;
    else if (kind === "fixed") monthlyFixedFee += monthly;
  };

  switch (platformId) {
    case "paddle": {
      // 5% + $0.50 MoR all-in; 1.5%-3% FX margin (model 2% mid-point) for non-USD payout
      const base = monthlyGross * 0.05 + 0.5 * sales;
      addLine("Paddle MoR all-in fee (5% + $0.50)", base, "platform");
      if (input.isNonUsdPayout) {
        const fx = monthlyGross * 0.02;
        addLine("Estimated non-USD FX payout margin (~2.0%)", fx, "surcharge");
      }
      notes.push("Merchant of Record: global VAT, GST & US sales tax handled automatically.");
      notes.push("No extra checkout surcharge for international cards, PayPal, or subscriptions.");
      break;
    }

    case "lemon-squeezy": {
      // 5% + $0.50 MoR base + 1.5% intl + 1.5% PayPal + 0.5% subscription
      const base = monthlyGross * 0.05 + 0.5 * sales;
      addLine("Lemon Squeezy base MoR fee (5% + $0.50)", base, "platform");
      if (input.isInternational) {
        addLine("International card surcharge (+1.5%)", monthlyGross * 0.015, "surcharge");
      }
      if (input.paymentMethod === "paypal") {
        addLine("PayPal checkout surcharge (+1.5%)", monthlyGross * 0.015, "surcharge");
      }
      if (input.isSubscription) {
        addLine("Subscription renewal surcharge (+0.5%)", monthlyGross * 0.005, "surcharge");
      }
      if (input.isNonUsdPayout) {
        addLine("International payout / FX estimate (~1.5%)", monthlyGross * 0.015, "surcharge");
      }
      notes.push("Merchant of Record: global sales tax & VAT handled by Lemon Squeezy.");
      notes.push("2026 note: Surcharges stack up to 8.5% + $0.50 on international PayPal subscriptions.");
      break;
    }

    case "polar": {
      // 2026-05-27 tiered plans:
      // Starter: $0 + 5% + $0.50
      // Pro: $20 + 3.8% + $0.40
      // Growth: $100 + 3.6% + $0.35
      // Scale: $400 + 3.4% + $0.30
      const tiers = {
        starter: { name: "Starter", fixed: 0, pct: 0.05, perTx: 0.5 },
        pro: { name: "Pro", fixed: 20, pct: 0.038, perTx: 0.4 },
        growth: { name: "Growth", fixed: 100, pct: 0.036, perTx: 0.35 },
        scale: { name: "Scale", fixed: 400, pct: 0.034, perTx: 0.3 },
      } as const;
      const tierKey = input.polarTier || "starter";
      const tier = tiers[tierKey];

      if (tier.fixed > 0) {
        addLine(`Polar ${tier.name} monthly plan`, tier.fixed, "fixed");
      }
      addLine(
        `Polar ${tier.name} MoR fee (${(tier.pct * 100).toFixed(1)}% + $${tier.perTx.toFixed(2)})`,
        monthlyGross * tier.pct + tier.perTx * sales,
        "platform"
      );
      if (input.isInternational) {
        addLine("International card surcharge (+1.5%)", monthlyGross * 0.015, "surcharge");
      }

      // Compute optimal tier
      let bestKey: keyof typeof tiers = "starter";
      let bestCost = Infinity;
      for (const [k, t] of Object.entries(tiers) as [keyof typeof tiers, (typeof tiers)[keyof typeof tiers]][]) {
        const c = t.fixed + monthlyGross * t.pct + t.perTx * sales;
        if (c < bestCost) {
          bestCost = c;
          bestKey = k;
        }
      }
      if (bestKey !== tierKey) {
        const currentCost = tier.fixed + monthlyGross * tier.pct + tier.perTx * sales;
        const monthlySave = currentCost - bestCost;
        if (monthlySave >= 1) {
          recommendedUpgrade = `Switching to Polar ${tiers[bestKey].name} ($${tiers[bestKey].fixed}/mo) saves ${formatCurrency(monthlySave)}/mo at your volume.`;
        }
      }

      notes.push("2026 pricing (effective May 27, 2026): 0% extra subscription surcharge across all plans.");
      notes.push("Full Merchant of Record; Stripe payout transfer fees ($2/mo active + 0.25% + $0.25) apply on withdrawal.");
      break;
    }

    case "gumroad": {
      if (input.gumroadChannel === "discover") {
        addLine("Gumroad Discover marketplace fee (30% all-in)", monthlyGross * 0.3, "platform");
        notes.push("Discover sales take a flat 30% cut (card processing included).");
      } else {
        // Direct: 10% + $0.50 up to $20,000/mo gross, 5% + $0.50 above $20,000/mo
        const threshold = 20000;
        let platformPctFee = 0;
        if (monthlyGross <= threshold) {
          platformPctFee = monthlyGross * 0.1;
          addLine("Gumroad direct platform fee (10% + $0.50)", platformPctFee + 0.5 * sales, "platform");
        } else {
          platformPctFee = threshold * 0.1 + (monthlyGross - threshold) * 0.05;
          addLine(
            "Gumroad direct tiered fee (10% first $20k, 5% above + $0.50)",
            platformPctFee + 0.5 * sales,
            "platform"
          );
          notes.push("Volume discount applied: direct sales above $20,000/mo drop from 10% to 5%.");
        }

        if (input.paymentMethod === "paypal") {
          addLine("PayPal processing (3.49% + $0.49)", monthlyGross * 0.0349 + 0.49 * sales, "processing");
        } else {
          addLine("Card processing (2.9% + $0.30)", monthlyGross * 0.029 + 0.3 * sales, "processing");
        }
        if (input.isInternational) {
          addLine("International card fee estimate (+1.5%)", monthlyGross * 0.015, "surcharge");
        }
        notes.push("Gumroad acts as Merchant of Record for global sales tax and VAT.");
      }
      break;
    }

    case "substack": {
      if (input.paymentMethod === "ios") {
        const appleRate = input.iosRate ?? 0.15;
        addLine(`Apple iOS in-app purchase fee (${Math.round(appleRate * 100)}%)`, monthlyGross * appleRate, "processing");
        addLine("Substack platform fee (10%)", monthlyGross * 0.1, "platform");
        notes.push("iOS in-app subscriptions incur Apple's 15% (Small Business) or 30% cut unless billed on the web.");
      } else {
        addLine("Substack platform fee (10%)", monthlyGross * 0.1, "platform");
        addLine("Stripe card processing (2.9% + $0.30)", monthlyGross * 0.029 + 0.3 * sales, "processing");
        addLine("Stripe Billing recurring fee (0.7%)", monthlyGross * 0.007, "surcharge");
        if (input.isInternational) {
          addLine("Stripe international card surcharge (+1.5%)", monthlyGross * 0.015, "surcharge");
        }
        notes.push("Web paid subscriptions total 13.6% + $0.30 before international card fees.");
      }
      notes.push("Tip: Annual subscriptions dramatically cut the $0.30 per-charge flat fee compared to monthly billing.");
      break;
    }

    case "patreon": {
      const tierMap = {
        standard: { name: "Standard (Post-Aug 2025)", pct: 0.1 },
        "legacy-founders": { name: "Legacy Founders", pct: 0.05 },
        "legacy-pro": { name: "Legacy Pro", pct: 0.08 },
        "legacy-pro-merch": { name: "Legacy Pro + Merch", pct: 0.11 },
      } as const;
      const key = input.patreonTier || "standard";
      const tier = tierMap[key];

      addLine(`Patreon ${tier.name} fee (${Math.round(tier.pct * 100)}%)`, monthlyGross * tier.pct, "platform");

      if (input.paymentMethod === "ios") {
        const appleRate = input.iosRate ?? 0.3;
        addLine(`Apple iOS in-app fee (${Math.round(appleRate * 100)}%)`, monthlyGross * appleRate, "processing");
      } else if (price <= 3) {
        addLine("Micropayment processing (5% + $0.10 for pledges ≤ $3)", monthlyGross * 0.05 + 0.1 * sales, "processing");
      } else {
        addLine("Payment processing (2.9% + $0.30)", monthlyGross * 0.029 + 0.3 * sales, "processing");
      }
      if (input.isInternational && input.paymentMethod !== "ios") {
        addLine("Cross-border / currency surcharge estimate (+1.5%)", monthlyGross * 0.015, "surcharge");
      }
      notes.push("Creators launching after August 4, 2025 are on Patreon's 10% Standard plan.");
      break;
    }

    case "payhip": {
      const tiers = {
        free: { name: "Free Forever", fixed: 0, pct: 0.05 },
        plus: { name: "Plus", fixed: 29, pct: 0.02 },
        pro: { name: "Pro", fixed: 99, pct: 0 },
      } as const;
      const tierKey = input.payhipTier || "free";
      const tier = tiers[tierKey];

      if (tier.fixed > 0) {
        addLine(`Payhip ${tier.name} monthly plan`, tier.fixed, "fixed");
      }
      if (tier.pct > 0) {
        addLine(`Payhip ${tier.name} transaction fee (${Math.round(tier.pct * 100)}%)`, monthlyGross * tier.pct, "platform");
      }

      if (input.paymentMethod === "paypal") {
        addLine("PayPal processing (3.49% + $0.49)", monthlyGross * 0.0349 + 0.49 * sales, "processing");
      } else {
        addLine("Stripe card processing (2.9% + $0.30)", monthlyGross * 0.029 + 0.3 * sales, "processing");
      }
      if (input.isInternational) {
        addLine("International card surcharge (+1.5%)", monthlyGross * 0.015, "surcharge");
      }

      // Auto-recommend optimal Payhip plan
      let bestKey: keyof typeof tiers = "free";
      let bestCost = Infinity;
      for (const [k, t] of Object.entries(tiers) as [keyof typeof tiers, (typeof tiers)[keyof typeof tiers]][]) {
        const c = t.fixed + monthlyGross * t.pct;
        if (c < bestCost) {
          bestCost = c;
          bestKey = k;
        }
      }
      if (bestKey !== tierKey) {
        const cur = tier.fixed + monthlyGross * tier.pct;
        const save = cur - bestCost;
        if (save >= 1) {
          recommendedUpgrade = `Payhip ${tiers[bestKey].name} ($${tiers[bestKey].fixed}/mo) saves ${formatCurrency(save)}/mo at $${Math.round(monthlyGross).toLocaleString()}/mo volume.`;
        }
      }

      notes.push("Break-even thresholds: Plus ($29/mo) beats Free past ~$967/mo; Pro ($99/mo) beats Plus past $3,500/mo.");
      break;
    }

    case "whop": {
      addLine("Whop base card processing (2.7% + $0.30)", monthlyGross * 0.027 + 0.3 * sales, "platform");
      if (input.whopAddons?.fraudAnd3ds) {
        addLine("Radar fraud ($0.07) + 3DS ($0.03)", 0.1 * sales, "surcharge");
      }
      if (input.isInternational) {
        addLine("International card surcharge (+1.5%)", monthlyGross * 0.015, "surcharge");
      }
      if (input.isNonUsdPayout) {
        addLine("Currency conversion fee (+1.0%)", monthlyGross * 0.01, "surcharge");
      }
      if (input.whopAddons?.billing || input.isSubscription) {
        addLine("Whop Billing / subscription suite (+0.5%)", monthlyGross * 0.005, "surcharge");
      }
      if (input.whopAddons?.taxRemittance) {
        addLine("Tax & remittance add-on (+2.0%)", monthlyGross * 0.02, "surcharge");
      }
      if (input.whopAddons?.gatedApp) {
        addLine("Gated community app fee (+3.0%)", monthlyGross * 0.03, "surcharge");
      }
      notes.push("Whop starts at 2.7% + $0.30, but optional billing, tax remittance, and community app fees stack quickly.");
      break;
    }

    case "kofi": {
      const mode = input.kofiMode || "standard";
      if (mode === "gold") {
        addLine("Ko-fi Gold monthly plan ($12/mo)", 12, "fixed");
      } else if (mode === "standard") {
        addLine("Ko-fi Standard/Contributor fee (5% on all)", monthlyGross * 0.05, "platform");
      } else if (mode === "free-shop") {
        addLine("Ko-fi Shop / Membership fee (5%)", monthlyGross * 0.05, "platform");
      } else {
        notes.push("Free mode (Standard turned OFF): 0% Ko-fi fee on one-time tips.");
      }

      if (input.paymentMethod === "paypal") {
        addLine("PayPal processing (3.49% + $0.49)", monthlyGross * 0.0349 + 0.49 * sales, "processing");
      } else {
        addLine("Stripe card processing (2.9% + $0.30)", monthlyGross * 0.029 + 0.3 * sales, "processing");
      }
      if (input.isInternational) {
        addLine("International card surcharge (+1.5%)", monthlyGross * 0.015, "surcharge");
      }

      if ((mode === "standard" || mode === "free-shop") && monthlyGross > 240) {
        const save = monthlyGross * 0.05 - 12;
        recommendedUpgrade = `Ko-fi Gold ($12/mo, 0% platform fee) saves ${formatCurrency(save)}/mo once sales pass $240/mo.`;
      } else if (mode === "gold" && monthlyGross < 240) {
        recommendedUpgrade = `Below $240/mo, Ko-fi's 5% free tier costs less than the $12/mo Gold subscription.`;
      }
      notes.push("2026 gotcha: New accounts default to 5% Standard mode; switch it off in payment settings for 0% one-time tips.");
      break;
    }

    case "stripe": {
      addLine("Stripe domestic card fee (2.9% + $0.30)", monthlyGross * 0.029 + 0.3 * sales, "processing");
      if (input.isInternational) {
        addLine("International card surcharge (+1.5%)", monthlyGross * 0.015, "surcharge");
      }
      if (input.isNonUsdPayout) {
        addLine("Currency conversion fee (+1.0%)", monthlyGross * 0.01, "surcharge");
      }
      if (input.stripeAddons?.billing || input.isSubscription) {
        addLine("Stripe Billing recurring fee (+0.7%)", monthlyGross * 0.007, "surcharge");
      }
      if (input.stripeAddons?.taxBasic) {
        addLine("Stripe Tax Basic (+0.5%)", monthlyGross * 0.005, "surcharge");
      }
      notes.push("Direct Stripe is not a Merchant of Record — you remain responsible for sales tax/VAT registration and filing.");
      break;
    }
  }

  const totalMonthlyFee =
    platformFeeMonthly + processingFeeMonthly + surchargeMonthly + monthlyFixedFee;
  const monthlyNet = Math.max(0, monthlyGross - totalMonthlyFee);
  const effectiveRatePct = monthlyGross > 0 ? (totalMonthlyFee / monthlyGross) * 100 : 0;

  return {
    platformId,
    grossPerSale: round2(price),
    monthlyGross: round2(monthlyGross),
    annualGross: round2(monthlyGross * 12),
    platformFeePerSale: round2(platformFeeMonthly / sales),
    processingFeePerSale: round2(processingFeeMonthly / sales),
    surchargePerSale: round2(surchargeMonthly / sales),
    monthlyFixedFee: round2(monthlyFixedFee),
    totalFeePerSale: round2(totalMonthlyFee / sales),
    totalMonthlyFee: round2(totalMonthlyFee),
    totalAnnualFee: round2(totalMonthlyFee * 12),
    effectiveRatePct: round2(effectiveRatePct),
    netPerSale: round2(monthlyNet / sales),
    monthlyNet: round2(monthlyNet),
    annualNet: round2(monthlyNet * 12),
    breakdown: breakdown.map((b) => ({
      ...b,
      perSale: round2(b.perSale),
      monthly: round2(b.monthly),
    })),
    notes,
    recommendedUpgrade,
  };
}

/**
 * Reverse Pricing Solver:
 * Finds the minimum list price (rounded up to nearest cent) such that
 * netPerSale >= targetNetPerSale under the exact platform fee rules.
 */
export function calculateReversePrice(
  platformId: PlatformId,
  targetNetPerSale: number,
  rawInput: Partial<CalculatorInput> = {}
): { requiredPrice: number; result: FeeResult } {
  const target = Math.max(0.5, Number(targetNetPerSale) || 0);
  let low = target;
  let high = Math.max(target * 2.5 + 20, 50);

  while (calculatePlatformFee(platformId, { ...rawInput, price: high }).netPerSale < target) {
    high *= 2;
    if (high > 1_000_000) break;
  }

  for (let i = 0; i < 45; i++) {
    const mid = (low + high) / 2;
    const res = calculatePlatformFee(platformId, { ...rawInput, price: mid });
    if (res.netPerSale >= target) {
      high = mid;
    } else {
      low = mid;
    }
  }

  let requiredPrice = Math.ceil(high * 100) / 100;
  let result = calculatePlatformFee(platformId, { ...rawInput, price: requiredPrice });

  // Guard against cent-rounding boundary edge case
  while (result.netPerSale < target && requiredPrice < high + 0.05) {
    requiredPrice = round2(requiredPrice + 0.01);
    result = calculatePlatformFee(platformId, { ...rawInput, price: requiredPrice });
  }

  return { requiredPrice, result };
}

export const ALL_PLATFORM_IDS: PlatformId[] = [
  "stripe",
  "whop",
  "polar",
  "paddle",
  "lemon-squeezy",
  "payhip",
  "kofi",
  "patreon",
  "substack",
  "gumroad",
];

export function comparePlatforms(
  platformIds: PlatformId[],
  rawInput: Partial<CalculatorInput> = {}
): FeeResult[] {
  return platformIds
    .map((id) => calculatePlatformFee(id, rawInput))
    .sort((a, b) => b.annualNet - a.annualNet);
}
