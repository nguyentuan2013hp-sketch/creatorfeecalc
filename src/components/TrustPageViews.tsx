"use client";

import Link from "next/link";
import { Mail } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site";
import { PLATFORMS } from "@/data/platforms";
import { PLATFORMS_ZH } from "@/data/zhContent";
import { useLanguage } from "@/lib/i18n";

export function MethodologyPageView() {
  const { isZh } = useLanguage();

  return (
    <article className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
          {isZh ? "费率计算公式与核验标准（2026）" : "Fee Methodology & Verification Standards"}
        </h1>
        <p className="text-sm text-slate-600">
          {isZh ? "最近全量费率核验日期：" : "Last full rate audit: "}
          <strong>{SITE_CONFIG.lastVerifiedDate}</strong>
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-bold text-slate-950">
          {isZh ? "核心会计计算公式" : "Core Accounting Equations"}
        </h2>
        {isZh ? (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>月毛收入</strong> = 商品单价 × 月订单数
            </li>
            <li>
              <strong>每月总扣费</strong> = 平台抽成 + 单笔固定手续费 + 支付通道费 +
              已勾选附加费（国际卡 / PayPal / 订阅 / 汇损）+ 固定月费套餐
            </li>
            <li>
              <strong>真实综合费率 (%)</strong> = (每月总扣费 ÷ 月毛收入) × 100
            </li>
            <li>
              <strong>反向算标价引擎</strong>
              ：在各平台真实费率规则（含阶梯折扣与固定笔数费）上使用二分搜索，精准给出能保证「实收净到手
              ≥ 目标净收入」的最低分位定价。
            </li>
          </ul>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>Monthly Gross Revenue</strong> = Sale Price × Monthly Order Volume
            </li>
            <li>
              <strong>Total Monthly Fees</strong> = Platform Percentage Cut + Per-Transaction Fixed
              Fees + Payment Processing + Enabled Surcharges + Monthly Plan Subscription
            </li>
            <li>
              <strong>Effective Fee Rate (%)</strong> = (Total Monthly Fees ÷ Monthly Gross Revenue)
              × 100
            </li>
            <li>
              <strong>Reverse List Price Solver</strong>: Uses binary search across the exact
              platform fee schedule (including tiered volume brackets and fixed fees) to return the
              lowest cent-rounded price that guarantees Net Take-Home ≥ Target Net.
            </li>
          </ul>
        )}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-950">
          {isZh ? "2026 年 10 大平台费率一览表" : "2026 Platform Pricing Schedule Summary"}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase text-slate-500">
                <th className="py-2 pr-3 font-semibold">{isZh ? "平台" : "Platform"}</th>
                <th className="py-2 px-3 font-semibold">{isZh ? "固定月费" : "Monthly Plan"}</th>
                <th className="py-2 px-3 font-semibold">{isZh ? "基准费率" : "Headline Rate"}</th>
                <th className="py-2 pl-3 font-semibold">
                  {isZh ? "MoR 税务处理" : "MoR Tax Handling"}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {Object.values(PLATFORMS).map((p) => {
                const zh = PLATFORMS_ZH[p.id];
                return (
                  <tr key={p.id}>
                    <td className="py-2.5 pr-3 font-semibold text-slate-900">{p.name}</td>
                    <td className="py-2.5 px-3 font-mono text-xs text-slate-700">
                      {p.monthlyPlanLabel}
                    </td>
                    <td className="py-2.5 px-3 text-slate-700">
                      {isZh ? zh.headlineRate : p.headlineRate}
                    </td>
                    <td className="py-2.5 pl-3 text-slate-700">
                      {p.isMoR
                        ? isZh
                          ? "MoR 全包税"
                          : "Full MoR"
                        : isZh
                          ? "卖家自理 / 可选"
                          : "Seller / Optional"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </article>
  );
}

export function AboutPageView() {
  const { isZh } = useLanguage();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
        {isZh ? `关于 ${SITE_CONFIG.name}` : `About ${SITE_CONFIG.name}`}
      </h1>
      <p className="text-base leading-relaxed text-slate-700">
        {isZh
          ? `${SITE_CONFIG.name} 是专为独立开发者、出海 SaaS 创始人、专栏作家与数字产品创作者打造的独立费率测算工具。我们的目标很简单：帮你在定价与选型前，一眼算清扣除所有平台抽成、卡通道费、国际卡附加费和套餐月费后的真实净到手收入。`
          : `${SITE_CONFIG.name} is an independent financial utility built for indie software founders, newsletter writers, course creators, and digital product sellers. Our goal is simple: make it effortless to calculate what you actually keep after every platform cut, card processor fee, international surcharge, and monthly subscription tier.`}
      </p>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 space-y-3 text-sm leading-relaxed text-slate-700">
        <h2 className="text-lg font-bold text-slate-950">
          {isZh ? "为什么选择 CreatorFeeCalc" : "What Makes Our Calculators Different"}
        </h2>
        {isZh ? (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>拒绝隐形费率盲区：</strong>完整建模国际非美卡加收（+1.5%）、PayPal
              附加费、Stripe Billing 订阅计费（+0.7%）、苹果 iOS 内购抽成以及大额阶梯折扣。
            </li>
            <li>
              <strong>100% 浏览器本地隐私计算：</strong>
              所有测算均在你的浏览器本地完成，免注册、免登录，绝不上传或留存你的商品单价与营收数据。
            </li>
            <li>
              <strong>定期对照官方费率核验：</strong>所有平台规则均定期核对各平台公开定价文档（最近核验：2026
              年 11 月）。
            </li>
          </ul>
        ) : (
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <strong>No hidden-fee blind spots:</strong> We explicitly model international card
              markups (+1.5%), PayPal checkout fees, Stripe Billing recurring fees (+0.7%), iOS App
              Store cuts, and volume tiers.
            </li>
            <li>
              <strong>100% browser-side privacy:</strong> Every calculation runs locally in your
              browser. We never ask you to create an account or submit revenue figures to a server.
            </li>
            <li>
              <strong>Regularly verified schedules:</strong> Every platform schedule is checked
              against official public pricing pages (last verified {SITE_CONFIG.lastVerifiedLabel}).
            </li>
          </ul>
        )}
      </div>
      <p className="text-sm text-slate-600">
        {isZh ? (
          <>
            想查看完整公式细节？请阅读{" "}
            <Link href="/methodology" className="font-semibold text-emerald-700 hover:underline">
              费率公式与核验标准
            </Link>{" "}
            或{" "}
            <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">
              向我们反馈费率变更
            </Link>
            。
          </>
        ) : (
          <>
            Want to inspect our exact math? Read our{" "}
            <Link href="/methodology" className="font-semibold text-emerald-700 hover:underline">
              Methodology &amp; Formulas
            </Link>{" "}
            or{" "}
            <Link href="/contact" className="font-semibold text-emerald-700 hover:underline">
              report a fee update
            </Link>
            .
          </>
        )}
      </p>
    </article>
  );
}

export function ContactPageView() {
  const { isZh } = useLanguage();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-6">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
        {isZh ? "联系我们 & 反馈费率变更" : "Contact & Fee Update Requests"}
      </h1>
      <p className="text-base text-slate-700 leading-relaxed">
        {isZh
          ? "发现某个支付平台调整了套餐费率、地区附加费，或者希望我们新增更多海外创作者与 SaaS 收款平台？欢迎把官方定价页链接发给我们，核验后将第一时间同步更新。"
          : "Spotted a new platform tier, regional surcharge, or want us to add another creator or SaaS payment platform? Send us the official pricing link and we will audit and update the calculator."}
      </p>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-start gap-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 shrink-0">
          <Mail className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-base font-bold text-slate-950">
            {isZh ? "直达邮箱" : "Direct Email"}
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            {isZh ? "联系编辑与数据团队：" : "Reach our editorial & data team at "}
            <a
              href={`mailto:${SITE_CONFIG.contactEmail}`}
              className="font-mono font-semibold text-emerald-700 hover:underline"
            >
              {SITE_CONFIG.contactEmail}
            </a>
            {isZh ? "。" : "."}
          </p>
          <p className="mt-2 text-xs text-slate-500">
            {isZh
              ? "来信请附上平台名称、涉及国家/币种以及官方费率文档链接，方便我们快速核对上线。"
              : "Please include the platform name, country/currency, and a link to the official pricing documentation so we can verify changes quickly."}
          </p>
        </div>
      </div>
    </article>
  );
}

export function PrivacyPolicyPageView() {
  const { isZh } = useLanguage();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-6 text-sm leading-relaxed text-slate-700">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
        {isZh ? "隐私政策" : "Privacy Policy"}
      </h1>
      <p className="text-xs text-slate-500">
        {isZh ? "生效日期：" : "Effective Date: "}
        {SITE_CONFIG.lastVerifiedDate}
      </p>

      {isZh ? (
        <>
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">1. 计算输入零服务器端留存</h2>
            <p>
              您在 {SITE_CONFIG.name}{" "}
              上执行的全部费率测算均完全在浏览器本地通过前端 JavaScript 运行。您输入的商品单价、月销量、套餐档位等业务数据不会被传输或存储到任何服务器。语言偏好仅保存在您浏览器的本地存储（localStorage）中。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">2. 访问统计与广告服务</h2>
            <p>
              为维持本站永久免费运行，我们可能接入隐私友好的汇总流量分析工具及第三方广告网络（例如
              Google AdSense）。第三方广告合作伙伴可能依据其隐私政策使用 Cookie 或同类技术，您可随时在浏览器或
              Google 广告设置中管理个性化偏好。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">3. 外部链接</h2>
            <p>
              本站页面包含指向各支付平台官方定价文档或合作方的外部链接。我们对第三方外部网站的隐私实践不承担责任。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">4. 联系方式</h2>
            <p>
              如对隐私保护有任何疑问，请发送邮件至{" "}
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="font-semibold text-emerald-700 hover:underline"
              >
                {SITE_CONFIG.contactEmail}
              </a>
              。
            </p>
          </section>
        </>
      ) : (
        <>
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">
              1. Zero Server Storage of Calculator Inputs
            </h2>
            <p>
              All calculations performed on {SITE_CONFIG.name} execute entirely inside your web
              browser using client-side JavaScript. Numbers you enter (such as product prices, sales
              volumes, or pricing tiers) are never transmitted to or stored on our servers.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">2. Analytics &amp; Advertising</h2>
            <p>
              We may use privacy-friendly aggregated traffic analytics and third-party advertising
              networks (such as Google AdSense) to keep this tool free. Third-party ad partners may
              use cookies or similar technologies in accordance with their own privacy policies. You
              can manage ad personalization settings via your browser or Google Ad Settings.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">3. External Links</h2>
            <p>
              Our pages include links to official third-party platform pricing pages and optional
              partner links. We are not responsible for the privacy practices of external sites.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">4. Contact</h2>
            <p>
              For privacy questions, email{" "}
              <a
                href={`mailto:${SITE_CONFIG.contactEmail}`}
                className="font-semibold text-emerald-700 hover:underline"
              >
                {SITE_CONFIG.contactEmail}
              </a>
              .
            </p>
          </section>
        </>
      )}
    </article>
  );
}

export function TermsPageView() {
  const { isZh } = useLanguage();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 space-y-6 text-sm leading-relaxed text-slate-700">
      <h1 className="text-3xl font-extrabold tracking-tight text-slate-950">
        {isZh ? "使用条款与免责声明" : "Terms of Use"}
      </h1>
      <p className="text-xs text-slate-500">
        {isZh ? "生效日期：" : "Effective Date: "}
        {SITE_CONFIG.lastVerifiedDate}
      </p>

      {isZh ? (
        <>
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">1. 仅供测算与规划参考</h2>
            <p>
              {SITE_CONFIG.name}{" "}
              提供的支付与平台费率测算结果仅供信息参考和商业定价规划使用，不构成任何财务、会计、税务或法律建议。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">2. 第三方平台费率变动</h2>
            <p>
              各支付通道和创作者平台可能不定期调整费率表、促销档位及汇率点差。尽管我们会定期核验更新，但在做出正式定价或迁移决定前，请务必直接向对应支付平台核实最新结算条款。
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">3. 商标声明</h2>
            <p>
              本站提及的所有产品与公司名称（包括
              Gumroad、Lemon Squeezy、Paddle、Polar、Substack、Patreon、Payhip、Whop、Ko-fi 与
              Stripe）均归各自权利人所有，提及上述名称不代表本站与任何平台存在隶属或背书关系。
            </p>
          </section>
        </>
      ) : (
        <>
          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">1. Informational Estimates Only</h2>
            <p>
              {SITE_CONFIG.name} provides payment and platform fee calculations strictly for
              informational and business-planning purposes. Calculations do not constitute
              financial, accounting, tax, or legal advice.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">2. Third-Party Pricing Changes</h2>
            <p>
              Payment processors and creator platforms update their fee schedules, promotional
              tiers, and FX spreads from time to time. While we audit schedules regularly, always
              verify final rates directly with your payment provider before making pricing or
              migration commitments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-lg font-bold text-slate-950">3. Trademarks</h2>
            <p>
              All product and company names referenced on this site (including Gumroad, Lemon
              Squeezy, Paddle, Polar, Substack, Patreon, Payhip, Whop, Ko-fi, and Stripe) are
              trademarks or registered trademarks of their respective holders. Mention of them does
              not imply any affiliation or endorsement.
            </p>
          </section>
        </>
      )}
    </article>
  );
}
