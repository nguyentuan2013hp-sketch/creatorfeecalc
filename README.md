# CreatorFeeCalc

Static-exported Next.js 15 fee intelligence & calculator suite covering **15 creator & SaaS payment platforms**, **9 head-to-head comparisons**, **forward & reverse target pricing**, **live FX & global VAT/sales tax modeling**, and **7 languages** (`en`, `zh`, `es`, `ja`, `de`, `fr`, `pt` — 215 pre-rendered static pages).

- Live site: https://www.creatorfeecalc.com
- Product Requirements Document: [docs/PRD.md](docs/PRD.md) (and [Day 1 MVP PRD](docs/day1-creator-fee-calc-prd.md))

## Commands
- `npm test` — Run fee engine, reverse-pricing, and 7-locale unit tests (`tests/fees.test.mjs`)
- `./node_modules/.bin/tsc --noEmit` — TypeScript check
- `npm run dev` — Local development server
- `npm run build` — Generate 100% static export in `out/`

## Architecture
- `src/lib/fees.ts` — 15-platform fee engine, mixed Card/PayPal blending, US ACH, inclusive/exclusive buyer tax, reverse pricing solver, and break-even crossover solver
- `src/data/platforms.ts` & `src/data/comparisons.ts` — Canonical platform schedules and head-to-head comparison metadata
- `src/data/locales/` — Full 7-language UI, fee breakdown notes, formatters, SEO metadata, and trust docs
- `public/rates.json` & `public/tracking.json` — Live fee-rate overrides and affiliate link slots
- `src/components/` — Hub comparator, platform calculators, comparison calculators, FX converter, and tax/rate sync modules
