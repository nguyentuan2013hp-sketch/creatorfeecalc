# CreatorFeeCalc (2026)

Static-exported Next.js 15 fee calculator covering 10 creator & SaaS payment platforms (Gumroad, Lemon Squeezy, Paddle, Polar.sh, Substack, Patreon, Payhip, Whop, Ko-fi, Stripe) with 15 core landing pages, 5 trust/compliance pages, `sitemap.xml`, `robots.txt`, and `SoftwareApplication` / `FAQPage` JSON-LD.

## Commands
- `npm test` — Run 2026 fee engine unit tests
- `npm run dev` — Local development server
- `npm run build` — Generates 100% static site in `out/`

## Deploy (Free, Always-On, No Sleep)
- **Render Static Site**: Build command `npm install --include=dev && npm run build`, publish directory `out`
- **Cloudflare Pages**: Build command `npm run build`, output directory `out`
- **Vercel**: Auto-detected Next.js static export (`out`)

## Domain Swap
Edit `src/lib/site.ts` (`name`, `domain`, `url`, `contactEmail`) and rebuild.
