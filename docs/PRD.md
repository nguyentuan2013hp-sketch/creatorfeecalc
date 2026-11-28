# CreatorFeeCalc 产品需求文档（PRD）

> 文档版本：v2.0（同步自线上生产版本 `https://www.creatorfeecalc.com`）  
> 关联原始立项文档：[Day 1 精简 MVP PRD](./day1-creator-fee-calc-prd.md)  
> 线上地址：`https://www.creatorfeecalc.com`  
> GitHub 仓库：`https://github.com/nguyentuan2013hp-sketch/creatorfeecalc`

---

## 一、产品定位与目标用户

CreatorFeeCalc 是一款面向全球独立开发者、SaaS 创业者、数字产品卖家、付费专栏作者与创作者的 **纯前端实时收款费率与净收入对比计算器**。

- **核心解决的问题**：主流收款与创作者平台（MoR、创作者店铺、订阅会员、直连网关）在官网标价之外普遍存在叠加成本——跨境卡加收（+1.5%）、PayPal 加收、订阅管理费、银行/USDC 提现费、iOS 内购抽成、汇兑加点、月费套餐盈亏平衡点以及买家增值税（VAT/GST/Sales Tax）计费口径差异。
- **技术原则**：Next.js 15 静态导出（`output: "export"`），100% 浏览器端实时运算、免注册、零后端推理成本、全站共 **215 个静态预渲染页面**。

---

## 二、覆盖平台与对比矩阵（15 家平台 + 9 组对决）

### 1. 支持的 15 个收款与创作者平台
1. **Merchant of Record（代报全球税费，6 家）**：Creem、Dodo Payments、Paddle、Polar.sh、Lemon Squeezy（含 2027-03-31 关停提示与迁移对比入口）、Gumroad（含 Direct vs Discover 30% 及月销 `$20k` 阶梯降费）。
2. **创作者店铺（Creator Storefront，3 家）**：Stan Store（Creator / Pro / Max 零抽成月费制）、Payhip（Free / Plus / Pro 自动对比）、Whop（基础 `2.7% + $0.30` + 可选风控/3DS/Billing/税代缴/社区应用叠加）。
3. **付费专栏与会员打赏（Newsletter & Membership，4 家）**：Buy Me a Coffee（含支持者代付手续费开关）、Ko-fi（Standard vs Free Tip vs Gold `$12/mo` 回本线）、Patreon（区分 10% Standard 与 Legacy 方案，且 `$3` 以下小额 `5% + $0.10` 仅限 Legacy 方案）、Substack（含 Stripe Billing `0.7%` 与 iOS 15%/30% 内购）。
4. **直连支付网关（Payment Processor，2 家）**：Stripe（Direct，含 US ACH `0.8% / $5` 封顶）、PayPal（Checkout vs Advanced Card）。

### 2. 9 组高转化两两对比页（`/compare/[slug]`）
- `creem-vs-paddle`
- `dodo-payments-vs-lemon-squeezy`
- `lemon-squeezy-vs-paddle`
- `polar-vs-paddle`
- `gumroad-vs-lemon-squeezy`
- `stan-store-vs-gumroad`
- `gumroad-vs-payhip`
- `buymeacoffee-vs-kofi`
- `substack-vs-patreon`

---

## 三、核心功能规格

### 1. 15 平台同屏对比工作台（Hub Comparator）
- **双计算模式**：
  - **正向算净到手（Net Payout）**：按产品标价、月订单数、付款方式计算扣费、有效费率、月净到手、年净到手及年度差额排名。
  - **反向算标价（Reverse Pricing）**：输入单笔目标净到手金额，使用高精度二分求解倒推各平台所需最小标价（确保含税/固定月费下净到手不少于目标值），并支持跨平台标价差与链接参数透传。
- **快捷场景预设**：Global SaaS（`$29 × 100`）、Digital Product（`$19 × 50`）、High-Ticket（`$199 × 20`）、Creator Tips（`$5 × 200`）。
- **付款方式建模**：Card / Apple Pay、Card + PayPal 混合分流（5%–95% 滑块）、PayPal Only（仅支持平台过滤开关与排位公平性）、US Bank ACH Direct Debit（自动识别 ACH + 跨境卡冲突并提示一键关闭）。
- **套餐自动寻优 & 盈亏平衡求解**：支持开启/关闭自动切换最优付费套餐（Polar / Payhip / Ko-fi），并在结果区实时给出 Top-1 与挑战者的月订单盈亏平衡拐点（可一键代入测试）。
- **负净利亏损保护与提示**：当定价比税费+手续费之和更低时，保留真实负值净利，展示红字和警示条引导调价或切换反向算标价。
- **移动端适配**：窄屏（`390×844`）无横向溢出；顶部提供最优结果直达跳转条，结果区提供返回参数区锚点，窄屏下转为卡片排行。
- **分享与导出**：一键复制带完整参数 URL、一键复制多语种摘要文本、导出 UTF-8 BOM CSV 报表。

### 2. 单平台深度计算器（`/[slug]`）& 双平台对比（`/compare/[slug]`）
- 支持正向算净到手、反向算标价、本币直输模式（`$⇄{CUR}`）、平台专属套餐/通道选项、按行费用拆解表（含占比可视化进度条）及“当前音量下更省钱的替代平台推荐”。
- 单平台页内置 `$9 / $19 / $29 / $49 / $99 / $199`（Patreon 含 `$3`）快速参考表、费率机制与隐藏坑点、同品类对比卡片与 FAQ（含 `FAQPage` + `SoftwareApplication` JSON-LD）。
- Lemon Squeezy 卡片、单平台页与相关对比页统一展示 2027 年 3 月 31 日停服预警与 MoR 迁移入口。

### 3. 实时汇率、全球税率与费率热更新
- **9 种货币换算**：USD、EUR、GBP、CAD、AUD、JPY、SGD、HKD、CNY，支持实时汇率拉取、自定义银行汇率以及本地币种直接输入折算。
- **买家税费模拟（Tax-Exclusive vs Tax-Inclusive）**：内置 US / EU / UK / DE / FR / SE / CA / AU / JP / SG / CH 税率预设及 0–35% 自定义税率。
- **费率热同步（`/rates.json`）**：支持一键刷新公开费率快照与官方来源链接，动态覆盖计算器参数。

---

## 四、国际化与 SEO 架构（7 语言 × 215 静态页面）

- **支持语言**：English（根路径 `/`）、简体中文（`/zh`）、Español（`/es`）、日本語（`/ja`）、Deutsch（`/de`）、Français（`/fr`）、Português（`/pt`）。
- **合规与信任页面**：`methodology`、`about`、`contact`、`privacy-policy`、`terms`（均已多语种化）。
- **技术 SEO 规范**：
  - 全站静态预渲染，自动输出多语言 `hreflang`（含 `zh-Hans`、`x-default`）、`canonical`、`sitemap.xml` 与 `robots.txt`。
  - Nginx 路由规则：`/compare` 与 `/{locale}/compare` 302 跳转至对应语言 `#comparisons` 锚点；无效路由统一返回真实 `404` 状态码。
  - SEO Title 与 Description 严禁出现硬编码年份 `"2026"`，保持长期检索常青。

---

## 五、统计、归因与变现底座

- **统计与行为分析**：接入 GTM（`GTM-M73RT934`）、GA4（`G-PKD1TY5QPK`）及 Microsoft Clarity（`zk2gm6iqg0`），追踪切换平台、模式切换、复制分享、CSV 导出、预设点击等关键转化事件。
- **联盟与转化链接热插槽（`/tracking.json`）**：支持在不重新编译前端的情况下热更新 15 家平台与 Wise 的联盟推广链接。
- **搜索引擎快速收录**：内置 IndexNow 验证文件（`/c7f4a9e2b81d4f63a5e092c17d8b3e46.txt`）。

---

## 六、工程验证与线上运维

- **本地校验命令**：
  - 类型检查：`./node_modules/.bin/tsc --noEmit`
  - 单元测试：`npm test`（`tests/fees.test.mjs`，覆盖核心算费、反向定价、含税/不含税、混合支付、ACH、Patreon `$3` 规则、负净利与 7 语言本地化校验，共 42 项测试）
  - 静态构建：`npm run build`（产出 215 页至 `out/`）
- **生产部署**：静态产物部署于自托管 VPS（`/var/www/creatorfeecalc`），由 Nginx + HTTPS 托管于 `https://www.creatorfeecalc.com`。
