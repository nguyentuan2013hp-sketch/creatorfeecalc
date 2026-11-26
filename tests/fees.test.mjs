import test from "node:test";
import assert from "node:assert/strict";
import {
  calculatePlatformFee,
  calculateReversePrice,
  comparePlatforms,
  ALL_PLATFORM_IDS,
} from "../src/lib/fees.ts";

test("Stripe direct domestic $50 sale => $1.75 fee, $48.25 net", () => {
  const res = calculatePlatformFee("stripe", { price: 50, monthlySales: 10 });
  assert.equal(res.totalFeePerSale, 1.75);
  assert.equal(res.netPerSale, 48.25);
  assert.equal(res.effectiveRatePct, 3.5);
});

test("Polar Starter $50 domestic sale => $3.00 fee, $47.00 net", () => {
  const res = calculatePlatformFee("polar", {
    price: 50,
    monthlySales: 10,
    polarTier: "starter",
  });
  assert.equal(res.totalFeePerSale, 3.0);
  assert.equal(res.netPerSale, 47.0);
});

test("Polar Pro break-even recommendation above $1,379/mo", () => {
  const res = calculatePlatformFee("polar", {
    price: 50,
    monthlySales: 60, // $3,000/mo
    polarTier: "starter",
  });
  assert.ok(res.recommendedUpgrade && res.recommendedUpgrade.includes("Polar Pro"));
});

test("Payhip Free $50 domestic card => $4.25 fee, $45.75 net", () => {
  const res = calculatePlatformFee("payhip", {
    price: 50,
    monthlySales: 10,
    payhipTier: "free",
  });
  assert.equal(res.totalFeePerSale, 4.25);
  assert.equal(res.netPerSale, 45.75);
});

test("Payhip Plus beats Free past ~$967/mo and Pro beats Plus past $3,500/mo", () => {
  const mid = calculatePlatformFee("payhip", {
    price: 50,
    monthlySales: 30, // $1,500/mo
    payhipTier: "free",
  });
  assert.ok(mid.recommendedUpgrade && mid.recommendedUpgrade.includes("Payhip Plus"));

  const high = calculatePlatformFee("payhip", {
    price: 50,
    monthlySales: 100, // $5,000/mo
    payhipTier: "plus",
  });
  assert.ok(high.recommendedUpgrade && high.recommendedUpgrade.includes("Payhip Pro"));
});

test("Lemon Squeezy stacks intl + PayPal + subscription up to 8.5% + $0.50", () => {
  const res = calculatePlatformFee("lemon-squeezy", {
    price: 100,
    monthlySales: 10,
    paymentMethod: "paypal",
    isInternational: true,
    isSubscription: true,
  });
  assert.equal(res.totalFeePerSale, 9.0);
  assert.equal(res.netPerSale, 91.0);
});

test("Paddle stays 5% + $0.50 regardless of intl card or subscription", () => {
  const res = calculatePlatformFee("paddle", {
    price: 100,
    monthlySales: 10,
    isInternational: true,
    isSubscription: true,
    isNonUsdPayout: false,
  });
  assert.equal(res.totalFeePerSale, 5.5);
  assert.equal(res.netPerSale, 94.5);
});

test("Gumroad Direct vs Discover & $20k volume discount", () => {
  const direct = calculatePlatformFee("gumroad", {
    price: 100,
    monthlySales: 10,
    gumroadChannel: "direct",
  });
  // 10% + $0.50 = $10.50; Stripe 2.9% + $0.30 = $3.20 => total $13.70
  assert.equal(direct.totalFeePerSale, 13.7);

  const discover = calculatePlatformFee("gumroad", {
    price: 100,
    monthlySales: 10,
    gumroadChannel: "discover",
  });
  assert.equal(discover.totalFeePerSale, 30.0);
  assert.equal(discover.netPerSale, 70.0);

  const highVol = calculatePlatformFee("gumroad", {
    price: 100,
    monthlySales: 300, // $30,000/mo: first $20k @10% ($2000) + $10k @5% ($500) + $0.50*300 ($150) = $2650 platform
    gumroadChannel: "direct",
  });
  assert.equal(highVol.platformFeePerSale, 8.83);
});

test("Substack web totals 13.6% + $0.30", () => {
  const res = calculatePlatformFee("substack", {
    price: 10,
    monthlySales: 100,
    paymentMethod: "card",
  });
  // 10% ($1.00) + 2.9%+$0.30 ($0.59) + 0.7% ($0.07) = $1.66
  assert.equal(res.totalFeePerSale, 1.66);
  assert.equal(res.netPerSale, 8.34);
});

test("Ko-fi Gold break-even at $240/mo", () => {
  const res = calculatePlatformFee("kofi", {
    price: 20,
    monthlySales: 20, // $400/mo
    kofiMode: "standard",
  });
  assert.ok(res.recommendedUpgrade && res.recommendedUpgrade.includes("Ko-fi Gold"));
});

test("Reverse pricing guarantees netPerSale >= targetNetPerSale on all 10 platforms", () => {
  for (const id of ALL_PLATFORM_IDS) {
    const target = 29;
    const { requiredPrice, result } = calculateReversePrice(id, target, {
      monthlySales: 25,
    });
    assert.ok(
      result.netPerSale >= target,
      `${id}: net ${result.netPerSale} should be >= ${target} at requiredPrice ${requiredPrice}`
    );
    assert.ok(
      result.netPerSale <= target + 0.05,
      `${id}: net ${result.netPerSale} should be tightly bounded near ${target}`
    );
  }
});

test("comparePlatforms ranks highest annualNet first", () => {
  const ranked = comparePlatforms(ALL_PLATFORM_IDS, { price: 29, monthlySales: 50 });
  assert.equal(ranked.length, 10);
  for (let i = 1; i < ranked.length; i++) {
    assert.ok(ranked[i - 1].annualNet >= ranked[i].annualNet);
  }
});
