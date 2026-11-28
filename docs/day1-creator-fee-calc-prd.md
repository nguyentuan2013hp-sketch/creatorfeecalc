# Day 1 精简 MVP PRD：出海收款与创作者平台费率计算器（2026）

> 生成日期：2026-11-26  
> 定位：面向欧美独立开发者、数字产品卖家、付费专栏与创作者的 **2026 实时收款费率与净收入对比计算器**  
> 技术路线：Next.js（静态预渲染 + 100% 浏览器纯前端计算，零后端与零 AI API 成本），托管于 Vercel 或 Cloudflare Pages（不休眠、免费起步）

---

## 一、核心定位与差异化卖点

- **解决什么痛点**：海外收款与创作者平台（Gumroad / Lemon Squeezy / Paddle / Polar.sh / Substack / Patreon / Payhip / Whop / Ko-fi / Stripe）表面费率简单，但实际隐藏费用极多（国际卡 +1.5%、PayPal +1.5%、Stripe Billing +0.7%、iOS 应用内抽成 15–30%、阶梯月销优惠、月费套餐盈亏平衡点）。
- **我们的 4 个杀手级交互功能（首屏即用，免注册）**：
  1. **真实净利拆解**：输入「单价 / 月订单量 / 付款方式（美国本土卡、国际卡、PayPal、iOS App）/ 交易类型（一次性 vs 订阅）」，实时拆出平台费、支付通道费、附加费、实际综合扣点（%）、单笔及月度净收入。
  2. **倒推目标标价（Reverse Pricing）**：输入“我想每单实拿 `$29`”，自动反算应标价多少。
  3. **多平台省钱横评（Side-by-Side Savings）**：同组参数一键对比前 3–5 个主流替代平台，直接展示“换平台一年能多省多少钱”和套餐升级盈亏平衡点（如 Payhip Plus `$970/月`、Polar Pro `$1,379/月`、Ko-fi Gold `$240/月`）。
  4. **单页结构化干货（专为 SEO 与 AdSense 审核设计）**：每个计算器页下方自带「2026 最新费率变更清单 + `$9/$19/$49/$99` 实拿速查表 + 3 个真实算例 + 4–6 条 FAQ（附 JSON-LD）」。

---

## 二、已核实的 2026 核心费率数据底座（2026-11-26 公开费率）

| 平台 | 月费套餐 | 平台抽成 | 支付通道费 | 关键隐藏费 / 2026 变化 |
| :--- | :--- | :--- | :--- | :--- |
| **Paddle** | `$0` | `5% + $0.50`（MoR 含全球税） | 已包含 | 非 USD 结算有 `1.5%–3%` 汇率差 |
| **Lemon Squeezy** | `$0` | `5% + $0.50`（MoR 含全球税） | 已包含 | 国际卡 `+1.5%`、PayPal `+1.5%`、订阅 `+0.5%`（最高可达 `8.5% + $0.50`）；Stripe 收购后向 Managed Payments 迁移中 |
| **Polar.sh** | Starter `$0` / Pro `$20` / Growth `$100` / Scale `$400` | Starter `5% + $0.50`；Pro `3.8% + $0.40`；Growth `3.6% + $0.35`；Scale `3.4% + $0.30`（MoR） | 已包含 | 2026-05-27 起新账号切换阶梯套餐；国际卡 `+1.5%`，订阅 `+0%`；另有 Stripe 提现费 |
| **Gumroad** | `$0` | 自带流量 `10% + $0.50`（月销超 `$20k` 降为 `5% + $0.50`）；Discover 推荐 `30%`（全包） | 直销额外收刷卡 `2.9% + $0.30` 或 PayPal `3.49% + $0.49` | Discover 通道直接扣 30% |
| **Substack** | `$0` | 付费订阅 `10%` | Stripe `2.9% + $0.30` + Stripe Billing `0.7%` | 合计 `13.6% + $0.30`；iOS App 内购走苹果 `15%–30%` |
| **Patreon** | `$0` | 标准版 `10%`（2025-08-04 后新创作者）；老账号 `5%/8%/11%` | 约 `2.9% + $0.30` | 小额打赏（`< $3`）与提现/汇率另算 |
| **Payhip** | Free `$0` / Plus `$29` / Pro `$99` | Free `5%` / Plus `2%` / Pro `0%` | Stripe/PayPal 约 `2.9% + $0.30` | 月销超 `~$970` 升 Plus 划算，超 `~$3,500` 升 Pro 划算 |
| **Whop** | `$0` | 基础 `2.7% + $0.30` | 已包含 | 叠加项多：风控 `$0.07` + 3DS `$0.03`、国际卡 `+1.5%`、换汇 `+1%`、Billing `+0.5%`、税代缴 `+2%`、部分 App `+3%` |
| **Ko-fi** | Free/Standard `$0` / Gold `$12` | Standard 默认全抽 `5%`；关闭后一次性打赏 `0%`，商店/会员 `5%`；Gold 全 `0%` | Stripe/PayPal 约 `2.9%–3% + $0.30` | 月销超 `$240` 开 Gold 划算 |
| **Stripe** | `$0` | 美国本土卡 `2.9% + $0.30` | 已包含 | 国际卡 `+1.5%`、换汇 `+1.0%`、Billing `+0.7%`、Tax Basic `+0.5%` |

---

## 三、首批 15 个精确落地页清单（上线即自带真实数据差异）

### A. 首页与汇总页（1 页）
1. `/` — **Creator & SaaS Payment Fee Calculator (2026)**（主入口：多平台同屏对比 + 全部工具索引）

### B. 高搜索意图单平台计算页（9 页）
2. `/gumroad-fee-calculator` — `gumroad fee calculator`（含 Direct vs Discover & `$20k` 阶梯开关）
3. `/lemon-squeezy-fee-calculator` — `lemon squeezy fee calculator`（含国际卡/PayPal/订阅叠加开关）
4. `/paddle-fee-calculator` — `paddle fee calculator`（含非 USD 结汇成本选项）
5. `/polar-fee-calculator` — `polar.sh fee calculator`（含 2026-05 新阶梯套餐盈亏平衡点）
6. `/substack-fee-calculator` — `substack fee calculator`（含 Stripe Billing 0.7% + 月付/年付省钱对比 + iOS 开关）
7. `/patreon-fee-calculator` — `patreon fee calculator`（含 2025/2026 新老费率切换）
8. `/payhip-fee-calculator` — `payhip fee calculator`（含 Free/Plus/Pro 自动推荐最优档位）
9. `/whop-fee-calculator` — `whop fee calculator`（含隐形叠加费逐项勾选）
10. `/kofi-fee-calculator` — `ko-fi fee calculator`（含 Standard 避坑提醒 + Gold `$240` 回本线）

### C. 高转化两两对比页（5 页，商业意图最强）
11. `/compare/lemon-squeezy-vs-paddle` — `lemon squeezy vs paddle fee calculator`
12. `/compare/gumroad-vs-lemon-squeezy` — `gumroad vs lemon squeezy fee calculator`
13. `/compare/gumroad-vs-payhip` — `gumroad vs payhip fee calculator`
14. `/compare/substack-vs-patreon` — `substack vs patreon fee calculator`
15. `/compare/polar-vs-paddle` — `polar vs paddle fee calculator`

### D. 合规与信任必配页（不计入 15 页，但上线必做，过 AdSense 必需）
- `/about`（方法论与费率核对日期说明）
- `/methodology`（透明公式与数据来源说明）
- `/privacy-policy` & `/terms` & `/contact`
- 自动生成 `/sitemap.xml`、`/robots.txt`、`SoftwareApplication` + `FAQPage` JSON-LD

---

## 四、变现位预留（MVP 阶段只留位，拿到首批流量后再挂广告/联盟）
1. **AdSense 展示位**：仅设 2 处克制位置（计算器结果区下方 + 对比表下方），不挡首屏输入体验。
2. **上下文联盟按钮**：在「横评更省钱平台」结果行末尾放清晰标注的 *“Compare / Try [Platform]”* 链接（如 Payhip / Beehiiv / Skool / 跨境财税等）。

---

## 五、实测可用 `.com` 域名建议（2026-11-26 RDAP + DNS 实测未注册）

1. **`creatorfeecalc.com`**（首选：精准含 `creator + fee + calc` 核心词，SEO 友好、一眼看懂）
2. **`feeclarify.com`**（品牌型：简短专业，未来可扩展到电商、跨境卖家、支付网关不受限）
3. **`netcutcalc.com`**（短域名：仅 10 字母，强调“算清净到手 / Net Cut”，适配创作者与独立卖家）

> 参考注册成本：Cloudflare Registrar / Porkbun / Namecheap 常规 `.com` 首年约 `$10–$12`/年（以实际结算页为准）。

---

## 六、接下来 4 天节奏（Day 2–5）
- **Day 2（今天确认域名后）**：锁定域名与品牌名，我立刻搭好 Next.js 项目骨架 + 10 平台 2026 精准费率计算引擎 + 全套自动化单元测试（确保每一分钱公式无误）。
- **Day 3–4**：完成全部 15 个核心页面 + 合规信任页 + SEO/Schema/Sitemap + 移动端与桌面端实测验收。
- **Day 5**：部署上线至不休眠免费托管（Cloudflare Pages / Vercel），绑定正式域名 DNS，提交 Google Search Console 收录。
