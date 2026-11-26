import type { PlatformId, FeeResult } from "@/lib/fees";
import type { Locale } from "@/lib/i18n";

export interface PlatformZhContent {
  category: string;
  headlineRate: string;
  heroSummary: string;
  whatChanged2026: string[];
  formulaSummary: string[];
  hiddenFeeWarnings: string[];
  bestFor: string;
  faqs: { question: string; answer: string }[];
}

export const PLATFORMS_ZH: Record<PlatformId, PlatformZhContent> = {
  gumroad: {
    category: "创作者商店",
    headlineRate: "直客 10% + $0.50（另加卡费）/ Discover 30%",
    heroSummary:
      "精准测算 Gumroad 直客销售、30% Discover 市场流量抽成、PayPal 与信用卡差异，以及月销超 $20,000 自动降至 5% 的阶梯折扣。",
    whatChanged2026: [
      "直客订单收取 10% + $0.50 平台费，此外还需另付信用卡（2.9% + $0.30）或 PayPal（3.49% + $0.49）通道费。",
      "单自然月直客销售额超过 $20,000 后，超出部分的平台费率自动降至 5% + $0.50。",
      "通过 Gumroad Discover 市场带来的订单统一按 30% 全包抽成（已含卡费）。",
    ],
    formulaSummary: [
      "直客美卡订单 = 标价 × 10% + $0.50（平台）+ 标价 × 2.9% + $0.30（卡费）= 12.9% + $0.80",
      "直客 PayPal = 标价 × 10% + $0.50（平台）+ 标价 × 3.49% + $0.49（PayPal）= 13.49% + $0.99",
      "Gumroad Discover 市场单 = 标价 × 30%（全包）",
    ],
    hiddenFeeWarnings: [
      "Gumroad 官网醒目的 10% 不包含支付通道费——直客美卡实际起步就是 12.9% + $0.80。",
      "卖 $9 低价电子书时，合计 $0.80 的固定手续费单独就会吃掉近 9%，总费率飙升至 21.7% 以上。",
    ],
    bestFor: "首次试水数字产品、零固定月费冷启动的海外独立创作者。",
    faqs: [
      {
        question: "2026 年 Gumroad 实际一共扣多少？",
        answer:
          "月销 $20,000 以内的直客美卡订单，Gumroad 收 10% + $0.50 外加 2.9% + $0.30 通道费，合计 12.9% + $0.80。卖 $29 商品会扣 $4.54，实收 $24.46。",
      },
      {
        question: "Gumroad Discover 还是抽 30% 吗？",
        answer:
          "是的，凡由 Discover 市场归因带来的订单统一抽 30%（含卡费）。如果你全部靠自己引流，可以在后台关闭 Discover。",
      },
      {
        question: "什么时候 Gumroad 会从 10% 降到 5%？",
        answer: "同一自然月内直客销售额超过 $20,000 的增量部分，平台费降至 5% + $0.50，但支付通道费仍单独计算。",
      },
      {
        question: "Gumroad 帮我处理欧盟 VAT 和美国销售税吗？",
        answer: "是的，Gumroad 作为 Merchant of Record（MoR）会自动代收代缴全球 VAT/GST 和适用的美国州销售税。",
      },
    ],
  },

  "lemon-squeezy": {
    category: "MoR 包税平台",
    headlineRate: "5% + $0.50（附加费最高再加 3.5%）",
    heroSummary:
      "一键算清 Lemon Squeezy 叠加国际卡 (+1.5%)、PayPal (+1.5%) 与订阅续费 (+0.5%) 后的 2026 真实综合费率。",
    whatChanged2026: [
      "基础 MoR 包税费率维持 5% + $0.50，自动处理全球 VAT 与销售税合规。",
      "结账附加费会逐项叠加：非美卡 +1.5%、PayPal +1.5%、周期订阅 +0.5%，叠加最高可达 8.5% + $0.50。",
      "被 Stripe 收购后，不少出海 SaaS 团队也会将其与 Paddle、Polar.sh 或 Stripe Managed Payments 并排比较。",
    ],
    formulaSummary: [
      "美国本地一次性卡支付 = 标价 × 5% + $0.50",
      "国际卡订阅订单 = 标价 × (5% + 1.5% + 0.5%) + $0.50 = 7.0% + $0.50",
      "国际 PayPal 订阅订单 = 标价 × (5% + 1.5% + 1.5% + 0.5%) + $0.50 = 8.5% + $0.50",
    ],
    hiddenFeeWarnings: [
      "如果你的用户大多在美国以外且为订阅制，真实费率是 7.0% + $0.50，而不是宣传页上的 5% + $0.50。",
      "出海订阅 SaaS 对比 Paddle（美元结算一口价 5% + $0.50）通常每年能省下 2%–3.5% 的毛营收。",
    ],
    bestFor: "以美国本地一次性卡支付为主、想快速上线轻量店铺与授权码系统的独立开发者。",
    faqs: [
      {
        question: "为什么我用 Lemon Squeezy 扣的比 5% + $0.50 高？",
        answer:
          "因为 Lemon Squeezy 对非美卡加收 1.5%、PayPal 加收 1.5%、订阅续费加收 0.5%，三项叠加后可达 8.5% + $0.50。",
      },
      {
        question: "Lemon Squeezy 比 Gumroad 便宜吗？",
        answer:
          "直客销售几乎全面便宜。即使叠加国际卡和订阅费（7.0% + $0.50），仍比 Gumroad 直客（12.9% + $0.80）省近 6 个百分点。",
      },
      {
        question: "做全球 SaaS 该选 Lemon Squeezy 还是 Paddle？",
        answer:
          "只要超过 30% 流水来自非美卡、PayPal 或周期订阅，并且你用美元账户收款，Paddle 一口价 5% + $0.50 通常净到手更高。",
      },
    ],
  },

  paddle: {
    category: "MoR 包税平台",
    headlineRate: "5% + $0.50 全包一口价（MoR）",
    heroSummary:
      "测算 Paddle 透明的 5% + $0.50 全包 MoR 费率——国际卡、PayPal 与周期订阅均无额外结账加价，并可勾选估算非美元结算汇损。",
    whatChanged2026: [
      "Paddle 保持 5% + $0.50 结账一口价，覆盖美国/国际卡、PayPal 及订阅续费，不另收结账附加费。",
      "作为全球 Merchant of Record，自动代收代报欧盟 VAT、英国 VAT、GST 及美国各州销售税。",
      "唯一需要注意的隐形成本是提现币种换汇：若不结算为美元，非美元币种提现通常有 1.5%–3% 的汇损点差。",
    ],
    formulaSummary: [
      "美元结算（任意卡 / PayPal / 订阅）= 标价 × 5% + $0.50",
      "非美元币种提现估算 = 标价 × 5% + $0.50 + 约 2.0% 汇损",
    ],
    hiddenFeeWarnings: [
      "尽量把 Paddle 结算币种设为 USD 并提到美元账户（如 Wise/Mercury），可避开 1.5%–3% 的平台换汇点差。",
      "单价低于 $10 的微额订单受 $0.50 固定费影响较大，实际费率会超过 10%。",
    ],
    bestFor: "面向全球用户的 B2B SaaS、AI 工具与订阅软件。",
    faqs: [
      {
        question: "Paddle 对国际卡或 PayPal 额外加收费用吗？",
        answer: "不加收。5% + $0.50 已包含国际卡、PayPal、Apple Pay 和订阅续费的全部结账成本。",
      },
      {
        question: "怎样避开 Paddle 的提现汇损？",
        answer: "将结算币种设为美元，提现到美元多币种收款账户（如 Wise Business 或 Mercury），避免平台自动换汇。",
      },
      {
        question: "Paddle 负责全球税务合规吗？",
        answer: "是的，Paddle 作为 MoR 负责全球 VAT、GST 与销售税的计算、代收与申报。",
      },
    ],
  },

  polar: {
    category: "MoR 包税平台",
    headlineRate: "Starter 5%+$0.50 起，最高档低至 3.4%+$0.30",
    heroSummary:
      "完整支持 Polar.sh 2026 年 5 月新版四档阶梯 MoR 定价（Starter / Pro / Growth / Scale），自动算出当前流水最省钱的套餐。",
    whatChanged2026: [
      "2026 年 5 月 27 日起启用四档公开阶梯价：Starter ($0/月, 5%+$0.50)、Pro ($20/月, 3.8%+$0.40)、Growth ($100/月, 3.6%+$0.35)、Scale ($400/月, 3.4%+$0.30)。",
      "新版套餐已取消 0.5% 的订阅附加费，对订阅制 SaaS 非常友好。",
      "非美卡仍需 +1.5% 国际卡附加费，且提现时透传 Stripe 提现转账费。",
    ],
    formulaSummary: [
      "Starter ($0/月) = 标价 × 5.0% + $0.50",
      "Pro ($20/月) = $20/月 + 标价 × 3.8% + $0.40（月销约 $1,379 起回本）",
      "Growth ($100/月) = $100/月 + 标价 × 3.6% + $0.35（月销约 $5,634 起回本）",
      "Scale ($400/月) = $400/月 + 标价 × 3.4% + $0.30（月销约 $19,048 起回本）",
    ],
    hiddenFeeWarnings: [
      "国际卡仍会加收 +1.5%，如果欧洲/亚洲客户占比极高，对比 Paddle 时务必勾选国际卡选项。",
      "提现会透传 Stripe Connect 提现费（活跃月 $2 + 0.25% + $0.25）。",
    ],
    bestFor: "月流水突破 $1,500、以美区开发者与 AI 用户为主的独立 SaaS 和开源项目。",
    faqs: [
      {
        question: "什么时候升 Polar Pro ($20/月) 比免费 Starter 划算？",
        answer: "Pro 把单笔费率从 5%+$0.50 降到 3.8%+$0.40，按常见客单价算，月毛收入超过约 $1,379–$1,650 即可立刻回本省钱。",
      },
      {
        question: "Polar.sh 2026 年还收订阅附加费吗？",
        answer: "不收了，2026 年 5 月新版阶梯套餐已将订阅附加费降为 0%。",
      },
      {
        question: "Polar.sh 比 Paddle 更便宜吗？",
        answer:
          "美卡占比高且月销过 $1,500 时，Polar Pro（3.8%+$0.40+$20/月）比 Paddle（5%+$0.50）更便宜；若国际卡占比极高，Paddle 仍很有优势。",
      },
    ],
  },

  substack: {
    category: "专栏与会员订阅",
    headlineRate: "网页端 13.6% + $0.30 / iOS 端最高 40%",
    heroSummary:
      "真实还原 Substack 10% 平台费 + Stripe 2.9% + $0.30 + Stripe Billing 0.7% 订阅费，以及 Apple iOS 15%–30% 应用内购抽成。",
    whatChanged2026: [
      "网页端付费订阅实际扣除 10%（Substack）+ 2.9%+$0.30（Stripe 卡费）+ 0.7%（Stripe Billing 订阅费）= 13.6% + $0.30。",
      "通过 iOS App 内购订阅会叠加苹果 15%（中小企业计划）或 30% 抽成，建议引导读者走网页端付费。",
      "把 $5/月月付转为 $50/年年付，可将每笔 $0.30 的固定手续费摊薄 12 倍。",
    ],
    formulaSummary: [
      "美国网页卡订阅 = 标价 × (10% + 2.9% + 0.7%) + $0.30 = 13.6% + $0.30",
      "国际网页卡订阅 = 15.1% + $0.30",
      "Apple iOS 应用内购 = 苹果抽成（15% 或 30%）+ Substack 10%",
    ],
    hiddenFeeWarnings: [
      "绝大多数作者会漏算 0.7% 的 Stripe Billing 订阅费——网页端实际是 13.6% + $0.30，而非 12.9% + $0.30。",
      "$5/月专栏光 $0.30 固定费就占 6%（总扣费达 19.6%），主推年付能立刻大幅拉高利润率。",
    ],
    bestFor: "借助 Substack Notes 与推荐网络从 0 到 1,000 付费读者的海外英文专栏作者。",
    faqs: [
      {
        question: "2026 年 Substack 网页端真实费率是多少？",
        answer: "美国卡网页订阅合计 13.6% + $0.30（Substack 10% + Stripe 2.9%+$0.30 + Stripe Billing 0.7%）。",
      },
      {
        question: "$5/月的 Substack 订阅我实际能拿多少？",
        answer: "美卡网页端每单扣 $0.98（19.6%），净到手 $4.02；若读者买 $50 年付，总扣 $7.10（14.2%），每位读者每年多留 $4.66。",
      },
      {
        question: "免费发 Substack 邮件收费吗？",
        answer: "完全免费，不限免费订阅人数。",
      },
    ],
  },

  patreon: {
    category: "专栏与会员订阅",
    headlineRate: "新账号统一 10%（+ 2.9% + $0.30）",
    heroSummary:
      "支持 Patreon 2025 年 8 月后新创作者统一 10% Standard 费率、老账号 5%/8%/11% 祖传档位、≤$3 微额卡费及 iOS 抽成测算。",
    whatChanged2026: [
      "2025 年 8 月 4 日之后开启的新创作者统一使用 10% Standard 平台费率。",
      "持续发布的早期创作者可保留原档位（Founders 5% / Pro 8% / Pro+Merch 11%）。",
      "≤$3 的小额赞赏走微额通道费（5% + $0.10），高于 $3 走标准 2.9% + $0.30。",
    ],
    formulaSummary: [
      "新账号 Standard（>$3，美卡）= 标价 × 10% + 2.9% + $0.30 = 12.9% + $0.30",
      "微额赞助（≤$3）= 标价 × 10% + 5% + $0.10 = 15% + $0.10",
    ],
    hiddenFeeWarnings: [
      "粉丝在 iOS App 内加入会员会被苹果抽 30%，建议开启 iOS 端自动提价或引导走网页加入。",
      "跨国提现（PayPal / Payoneer / 电汇）还会产生额外的提现与换汇费用。",
    ],
    bestFor: "播客主、YouTube 博主、插画师与多档位权益型海外会员社群。",
    faqs: [
      {
        question: "2026 年新注册 Patreon 的抽成是多少？",
        answer: "固定 10% 平台费外加支付通道费（>$3 为 2.9% + $0.30，≤$3 为 5% + $0.10）。",
      },
      {
        question: "老账号还能保持 5% 或 8% 吗？",
        answer: "可以，只要在 2025 年 8 月 4 日前上线且保持发布状态，仍沿用原祖传费率。",
      },
      {
        question: "Patreon 和 Substack 哪个费率更低？",
        answer: "网页端刷卡场景下，Patreon Standard（12.9%+$0.30）比 Substack（13.6%+$0.30）便宜 0.7%。",
      },
    ],
  },

  payhip: {
    category: "创作者商店",
    headlineRate: "Free 5% / Plus 2% / Pro 0%（+ 通道费）",
    heroSummary:
      "算清 Payhip 三档套餐叠加 Stripe/PayPal 后的实际到手，并自动告诉你当前月流水选 Free、Plus ($29) 还是 Pro ($99) 最省钱。",
    whatChanged2026: [
      "三档功能完全一致，升级套餐的唯一目的就是降低平台抽成比例。",
      "精准回本线：月销过 $967 选 Plus（$29/月 + 2%）最划算；月销过 $3,500 选 Pro（$99/月 + 0%）最划算。",
      "所有套餐均需另付 Stripe（2.9% + $0.30）或 PayPal（3.49% + $0.49）通道费。",
    ],
    formulaSummary: [
      "Free 免费档 = 标价 × 5% + Stripe (2.9% + $0.30) = 7.9% + $0.30",
      "Plus ($29/月) = $29/月 + 标价 × 2% + Stripe (2.9% + $0.30)",
      "Pro ($99/月) = $99/月 + 0% 平台费 + Stripe (2.9% + $0.30)",
    ],
    hiddenFeeWarnings: [
      "月销一过 $1,000 千万别停留在免费档，立刻升 Plus（$29/月）当月就能省出差价。",
      "Pro 档虽然 0% 平台抽成，但依然要付 Stripe/PayPal 收款通道费。",
    ],
    bestFor: "自有流量、从 Gumroad 迁移出来把费率从 12.9% 砍到 3%–7.9% 的模板/课程/电子书卖家。",
    faqs: [
      {
        question: "Payhip 什么时候升 Plus 或 Pro 最划算？",
        answer: "月销超过 $967 升 Plus（省 3% 刚好抵消 $29 月费）；月销超过 $3,500 升 Pro（省 2% 刚好抵消 $70 差价）。",
      },
      {
        question: "Payhip 比 Gumroad 省多少？",
        answer: "哪怕免费档（7.9%+$0.30）每单也比 Gumroad 直客（12.9%+$0.80）省 5%+$0.50；月销 $2,000 时用 Payhip Plus 每年多留 $1,900+。",
      },
      {
        question: "Payhip 自动处理欧盟/英国 VAT 吗？",
        answer: "支持自动处理欧盟和英国数字产品 VAT，但需自行绑定自己的 Stripe 或 PayPal 收款账号。",
      },
    ],
  },

  whop: {
    category: "创作者商店",
    headlineRate: "基础 2.7% + $0.30（可叠加多项附加费）",
    heroSummary:
      "Whop 宣传 2.7% + $0.30 起，但风控、订阅计费、代报税与 Discord/Telegram 门禁应用费会快速叠加——在这里逐项勾选实测。",
    whatChanged2026: [
      "美国本地基础卡支付 2.7% + $0.30，无固定月费。",
      "常见附加项：Radar 风控 $0.07 + 3DS $0.03、国际卡 +1.5%、换汇 +1%、Billing +0.5%、代报税 +2%。",
      "使用 Discord、Telegram、TradingView 等门禁应用自动化功能时，可能额外加收 3% 应用费。",
    ],
    formulaSummary: [
      "基础卡支付 = 标价 × 2.7% + $0.30（+ $0.10 风控/3DS）",
      "含订阅计费 + 代报税 = 标价 × (2.7% + 0.5% + 2.0%) + $0.40 = 5.2% + $0.40",
      "若含门禁应用 + 国际卡 = 再叠加 +3.0%（应用）+ 1.5%（国际卡）",
    ],
    hiddenFeeWarnings: [
      "拿 Whop 跟 Stripe 或 Paddle 比价前，务必先勾选你实际会用到的订阅、代报税和社群门禁应用费。",
      "每笔拒付争议（Chargeback）会产生 $15 争议处理费。",
    ],
    bestFor: "海外付费社群、Discord/Telegram 会员圈、陪跑课与信息产品卖家。",
    faqs: [
      {
        question: "2026 年 Whop 真实费率大概是多少？",
        answer: "纯美卡直购约 2.7%+$0.30（含风控约 $0.40）；若开订阅（0.5%）+ 代报税（2%）+ 国际卡（1.5%），综合为 6.7%+$0.40。",
      },
      {
        question: "Whop 算 MoR 包税平台吗？",
        answer: "可选配 +2% 的 Tax & Remittance 代报税附加服务，也可自行报税以压低费率。",
      },
    ],
  },

  kofi: {
    category: "专栏与会员订阅",
    headlineRate: "0%–5%（+ 通道费）/ Gold $12/月",
    heroSummary:
      "避开 Ko-fi 新号默认 5% Standard 模式的坑，精准算出 $240/月 升级 Ko-fi Gold（$12/月 享 0% 平台费）的回本点。",
    whatChanged2026: [
      "新注册账号默认开启 5% Standard/Contributor 模式（连一次性打赏都扣 5%），在支付设置里关闭后一次性打赏可享 0% 平台费。",
      "关闭 Standard 后：一次性打赏 0% 平台费，但 Shop 商店、约稿与会员订阅仍收 5%。",
      "Ko-fi Gold 为 $12/月（0% 平台费），当需抽成的订单月销超过 $240 时立即回本。",
    ],
    formulaSummary: [
      "Free 模式一次性打赏 = 0% Ko-fi + Stripe (2.9% + $0.30)",
      "Standard 模式或商店/会员 = 5% Ko-fi + Stripe (2.9% + $0.30) = 7.9% + $0.30",
      "Ko-fi Gold = $12/月 + 0% Ko-fi + Stripe (2.9% + $0.30)",
    ],
    hiddenFeeWarnings: [
      "升级 Gold 不会追溯取消升级前已建立的老 Stripe 会员的 5% 抽成。",
      "如果你只收一次性打赏，直接在后台关闭 Standard 模式就是 0% 平台费，完全没必要花 $12/月买 Gold。",
    ],
    bestFor: "独立画师、开源作者、主播与轻量化打赏/约稿/小店创作者。",
    faqs: [
      {
        question: "什么时候买 Ko-fi Gold（$12/月）划算？",
        answer: "当你的商店、约稿或会员月销超过 $240（$240 × 5% = $12）时，买 Gold 立刻省钱。",
      },
      {
        question: "为什么我的一次性打赏也被 Ko-fi 扣了 5%？",
        answer: "新号默认打开了 Standard/Contributor 5% 模式，去收款设置里关掉即可恢复 0% 平台费。",
      },
    ],
  },

  stripe: {
    category: "直连支付通道",
    headlineRate: "2.9% + $0.30（美国本地卡）",
    heroSummary: "直连 Stripe 基准线——单笔费率最低，但需自行负责全球税务注册与申报。",
    whatChanged2026: [
      "美国本地在线卡基础费率维持 2.9% + $0.30。",
      "国际卡 +1.5%、换汇 +1.0%、Stripe Billing +0.7%、Stripe Tax Basic +0.5%。",
    ],
    formulaSummary: ["美国本地卡 = 标价 × 2.9% + $0.30"],
    hiddenFeeWarnings: ["直连 Stripe 不是 MoR，全球 VAT/销售税合规需由卖家自行处理。"],
    bestFor: "已有公司主体与财税流程、追求极低支付通道费的成熟 SaaS 团队。",
    faqs: [],
  },
};

export interface ComparisonZhContent {
  title: string;
  heroSummary: string;
  verdictSummary: string;
  keyDifferences: { topic: string; left: string; right: string }[];
  whenToPickLeft: string[];
  whenToPickRight: string[];
  faqs: { question: string; answer: string }[];
}

export const COMPARISONS_ZH: Record<string, ComparisonZhContent> = {
  "lemon-squeezy-vs-paddle": {
    title: "Lemon Squeezy vs Paddle 费率对比计算器（2026）",
    heroSummary:
      "两家都宣传自己是 5% + $0.50 的 MoR 包税平台——但只要一涉及国际卡、PayPal 或周期订阅，年底实际到手差价巨大。",
    verdictSummary:
      "纯美区一次性卡支付时两家完全一样（5%+$0.50）；但只要有海外非美卡买家、PayPal 或订阅续费，Paddle 一口价通常能帮你省下 2%～3.5% 的总流水。",
    keyDifferences: [
      { topic: "MoR 基础费率", left: "5% + $0.50", right: "5% + $0.50" },
      { topic: "国际（非美）卡加收", left: "+1.5% 附加费", right: "$0（已全包）" },
      { topic: "PayPal 结账加收", left: "+1.5% 附加费", right: "$0（已全包）" },
      { topic: "周期订阅续费加收", left: "+0.5% 附加费", right: "$0（已全包）" },
      { topic: "非美元提现汇损", left: "依提现方式约 1.5%", right: "非美元提现约 1.5%–3%" },
      { topic: "全球 VAT / 销售税（MoR）", left: "全包代报", right: "全包代报" },
    ],
    whenToPickLeft: [
      "主打美国本地卡的一次性数字产品或模板销售。",
      "想要自带轻量店铺、授权码管理且快速过审上线。",
    ],
    whenToPickRight: [
      "超过 25% 订单来自美国以外地区或使用 PayPal 支付。",
      "运营周期订阅制 SaaS，且使用美元账户（如 Wise/Mercury）收款。",
    ],
    faqs: [
      {
        question: "为什么做全球订阅 SaaS 时 Paddle 比 Lemon Squeezy 省钱？",
        answer:
          "Lemon Squeezy 会叠加国际卡 +1.5% 和订阅 +0.5%（共 7.0%+$0.50），而 Paddle 美元结算维持 5%+$0.50。月入 $5,000 国际订阅时，Paddle 一年多省 $1,200。",
      },
      {
        question: "两家都是完整 MoR 包税平台吗？",
        answer: "是的，两家都自动处理欧盟 VAT、英国 VAT、GST 与美国销售税。",
      },
    ],
  },
  "gumroad-vs-lemon-squeezy": {
    title: "Gumroad vs Lemon Squeezy 费率对比计算器（2026）",
    heroSummary:
      "把 Gumroad 直客 10%+$0.50（另加卡费）和 Lemon Squeezy MoR 摆在一起，直观算出迁移一年能多赚多少钱。",
    verdictSummary:
      "只要靠自己引流，Lemon Squeezy 每单比 Gumroad 省 5.9%～7.9%（外加 $0.30/单），并且同样享受 MoR 全球包税。",
    keyDifferences: [
      { topic: "美卡直客费率", left: "12.9% + $0.80（含卡费）", right: "5.0% + $0.50 全包" },
      { topic: "国际卡直客费率", left: "约 14.4% + $0.80", right: "6.5% + $0.50" },
      { topic: "内置市场流量", left: "支持 Discover（抽 30%）", right: "无市场流量（需自带流量）" },
      { topic: "大额阶梯折扣", left: "月销超 $20k 降至 5%+$0.50", right: "大客户定制报价" },
      { topic: "全球 VAT / 销售税", left: "MoR 全包", right: "MoR 全包" },
    ],
    whenToPickLeft: [
      "刚发布第一个 $9–$29 小产品，想蹭 Gumroad Discover 市场自然流量。",
      "已有成熟 Gumroad 粉丝列表且不想折腾迁移。",
    ],
    whenToPickRight: [
      "靠 X、YouTube、SEO 或邮件列表自带流量，不依赖 Discover。",
      "月销超过 $500，希望立刻多留 6% 以上净利润。",
    ],
    faqs: [
      {
        question: "月销 $2,000 从 Gumroad 搬到 Lemon Squeezy 一年能省多少？",
        answer: "以 70 单 $29 美卡直客（$2,030/月）计，Gumroad 扣 $317.87/月，Lemon Squeezy 扣 $136.50/月，一年多赚 $2,176。",
      },
      {
        question: "两家都自动处理欧盟 VAT 吗？",
        answer: "是的，两家均为 Merchant of Record。",
      },
    ],
  },
  "gumroad-vs-payhip": {
    title: "Gumroad vs Payhip 费率对比计算器（2026）",
    heroSummary:
      "测算从 Gumroad 直客切换到 Payhip Free（5%）、Plus（$29/月+2%）或 Pro（$99/月+0%）后，不同月流水下的年度省钱额。",
    verdictSummary:
      "只要自己带流量，Payhip 在任何营收阶段都完胜 Gumroad：免费档第一天就每单省 5%+$0.50，月销过 $967 升 Plus 还能省更多。",
    keyDifferences: [
      { topic: "免费档实际费率（美卡）", left: "12.9% + $0.80", right: "7.9% + $0.30（5%+Stripe）" },
      { topic: "付费降费套餐", left: "无（需月销超 $20k 才降）", right: "Plus $29/月 (2%) · Pro $99/月 (0%)" },
      { topic: "打款速度", left: "按周定期结算", right: "直入你的 Stripe/PayPal 即时到账" },
      { topic: "平台自带流量", left: "Gumroad Discover（30%）", right: "无（需自带流量）" },
    ],
    whenToPickLeft: [
      "Discover 市场确实给你贡献了大量自然成交。",
      "没有自己的 Stripe/PayPal，需要 Gumroad 全权代收代税。",
    ],
    whenToPickRight: [
      "已有 Stripe/PayPal 账号且自带流量，想要更低费率与即时到账。",
      "月销超 $1,000，希望用固定月费封顶平台抽成。",
    ],
    faqs: [
      {
        question: "Payhip 免费档真的比 Gumroad 便宜吗？",
        answer: "是的，Payhip Free（5%+Stripe 2.9%+$0.30 = 7.9%+$0.30）比 Gumroad 直客（12.9%+$0.80）直接少 5%+$0.50。",
      },
      {
        question: "用 Payhip 必须自己有 Stripe 或 PayPal 吗？",
        answer: "是的，Payhip 直连你的 Stripe 或 PayPal 收款，资金直接进你账户。",
      },
    ],
  },
  "substack-vs-patreon": {
    title: "Substack vs Patreon 费率对比计算器（2026）",
    heroSummary:
      "新创作者在两家都是 10% 平台费——对比 Stripe Billing 0.7% 附加费、Patreon 老账号档位与 iOS 内购对净收入的影响。",
    verdictSummary:
      "新创作者网页端刷卡时，Patreon Standard（12.9%+$0.30）比 Substack（13.6%+$0.30）省 0.7%；若持有 5%/8% 老 Patreon 账号则优势更大。",
    keyDifferences: [
      { topic: "新创作者平台费", left: "10%", right: "10% Standard（2025.8 后）" },
      { topic: "网页刷卡处理费", left: "2.9% + $0.30 + 0.7% Stripe Billing", right: "2.9% + $0.30（≤$3 为 5%+$0.10）" },
      { topic: "美卡网页总费率", left: "13.6% + $0.30", right: "12.9% + $0.30" },
      { topic: "核心增长优势", left: "Notes 广场与专栏互相推荐", right: "多档权益、播客与粉丝社群" },
    ],
    whenToPickLeft: [
      "核心内容是英文付费邮件专栏，看重 Substack 内部推荐裂变。",
      "想要零配置一体化发信 + 付费墙。",
    ],
    whenToPickRight: [
      "做播客、视频、绘画或社群，需要多档位会员权益。",
      "拥有 5% 或 8% 的老 Patreon 祖传账号。",
    ],
    faqs: [
      {
        question: "为什么 Substack 网页端比 Patreon 贵 0.7%？",
        answer: "因为 Substack 额外透传了 0.7% 的 Stripe Billing 订阅计费费，总计 13.6%+$0.30，而 Patreon 为 12.9%+$0.30。",
      },
      {
        question: "怎么在两家都省下更多手续费？",
        answer: "主推年付套餐（减少 11 次 $0.30 固定笔数费），并引导粉丝通过浏览器网页端而非 iOS App 内付费。",
      },
    ],
  },
  "polar-vs-paddle": {
    title: "Polar.sh vs Paddle 费率对比计算器（2026）",
    heroSummary:
      "深度对比 Polar.sh 2026 年 5 月新版四档 MoR 定价与 Paddle 一口价 5%+$0.50——包含国际卡加价与套餐回本测算。",
    verdictSummary:
      "美卡为主且月流水超 $1,500 时，Polar Pro（$20/月+3.8%+$0.40）比 Paddle 更便宜；若国际非美卡占比极高（Polar 另加 1.5%），Paddle 依然非常抗打。",
    keyDifferences: [
      { topic: "免费入门档费率", left: "5.0% + $0.50（Starter）", right: "5.0% + $0.50" },
      { topic: "大额阶梯降费", left: "Pro 3.8% · Growth 3.6% · Scale 3.4%", right: "需联系销售定制报价" },
      { topic: "国际卡加收", left: "+1.5% 附加费", right: "$0（已全包）" },
      { topic: "订阅附加费", left: "0%（2026 新版已取消）", right: "0%（已全包）" },
      { topic: "MoR 全球包税", left: "支持", right: "支持" },
    ],
    whenToPickLeft: [
      "做开发者工具、AI 应用或开源 SaaS，美区用户为主且 MRR 过 $1,500。",
      "喜欢公开透明的自助阶梯降费，不想走大客户商务谈判。",
    ],
    whenToPickRight: [
      "欧美亚全球买家分散，非美卡或 PayPal 支付占比高。",
      "想要简单稳定的一口价 5%+$0.50，无任何国际卡额外加价。",
    ],
    faqs: [
      {
        question: "月流水多少时 Polar Pro 比 Paddle 便宜？",
        answer: "美卡订单场景下，月毛收入超过约 $1,379–$1,650 后，Polar Pro（$20/月+3.8%+$0.40）就开始比 Paddle（5%+$0.50）更省钱。",
      },
      {
        question: "Polar 对国际卡多收费吗？",
        answer: "是的，Polar 对非美卡加收 +1.5%，而 Paddle 结账端不另收国际卡附加费。",
      },
    ],
  },
};

export function localizeBreakdownLabel(label: string, locale: Locale): string {
  if (locale === "en") return label;
  return label
    .replace("Paddle MoR all-in fee (5% + $0.50)", "Paddle MoR 全包费 (5% + $0.50)")
    .replace("Estimated non-USD FX payout margin (~2.0%)", "非美元结算汇损估算 (约 2.0%)")
    .replace("Lemon Squeezy base MoR fee (5% + $0.50)", "Lemon Squeezy 基础 MoR 费 (5% + $0.50)")
    .replace("International card surcharge (+1.5%)", "国际（非美）卡附加费 (+1.5%)")
    .replace("PayPal checkout surcharge (+1.5%)", "PayPal 结账附加费 (+1.5%)")
    .replace("Subscription renewal surcharge (+0.5%)", "订阅续费附加费 (+0.5%)")
    .replace("International payout / FX estimate (~1.5%)", "跨国提现 / 汇损估算 (约 1.5%)")
    .replace(/^Polar (\w+) monthly plan$/, "Polar $1 套餐月费")
    .replace(/^Polar (\w+) MoR fee (.+)$/, "Polar $1 MoR 交易费 $2")
    .replace("Gumroad Discover marketplace fee (30% all-in)", "Gumroad Discover 市场抽成 (30% 全包)")
    .replace("Gumroad direct platform fee (10% + $0.50)", "Gumroad 直客平台费 (10% + $0.50)")
    .replace(
      "Gumroad direct tiered fee (10% first $20k, 5% above + $0.50)",
      "Gumroad 阶梯平台费（前 $20k 按 10%，超出按 5% + $0.50）"
    )
    .replace("PayPal processing (3.49% + $0.49)", "PayPal 通道费 (3.49% + $0.49)")
    .replace("Card processing (2.9% + $0.30)", "信用卡通道费 (2.9% + $0.30)")
    .replace("International card fee estimate (+1.5%)", "国际卡附加费估算 (+1.5%)")
    .replace(/^Apple iOS in-app purchase fee (.+)$/, "Apple iOS 应用内购抽成 $1")
    .replace(/^Apple iOS in-app fee (.+)$/, "Apple iOS 应用内购抽成 $1")
    .replace("Substack platform fee (10%)", "Substack 平台抽成 (10%)")
    .replace("Stripe card processing (2.9% + $0.30)", "Stripe 卡通道费 (2.9% + $0.30)")
    .replace("Stripe Billing recurring fee (0.7%)", "Stripe Billing 订阅费 (0.7%)")
    .replace("Stripe international card surcharge (+1.5%)", "Stripe 国际卡附加费 (+1.5%)")
    .replace(/^Patreon (.+) fee (.+)$/, "Patreon $1 平台费 $2")
    .replace("Micropayment processing (5% + $0.10 for pledges ≤ $3)", "微额支付通道费 (≤$3 按 5% + $0.10)")
    .replace("Payment processing (2.9% + $0.30)", "支付通道费 (2.9% + $0.30)")
    .replace("Cross-border / currency surcharge estimate (+1.5%)", "跨境 / 货币附加费估算 (+1.5%)")
    .replace(/^Payhip (\w+) monthly plan$/, "Payhip $1 套餐月费")
    .replace(/^Payhip (.+) transaction fee (.+)$/, "Payhip $1 平台抽成 $2")
    .replace("Whop base card processing (2.7% + $0.30)", "Whop 基础卡通道费 (2.7% + $0.30)")
    .replace("Radar fraud ($0.07) + 3DS ($0.03)", "Radar 防欺诈 ($0.07) + 3DS ($0.03)")
    .replace("Currency conversion fee (+1.0%)", "货币转换费 (+1.0%)")
    .replace("Whop Billing / subscription suite (+0.5%)", "Whop 订阅计费套件 (+0.5%)")
    .replace("Tax & remittance add-on (+2.0%)", "税务代报附加服务 (+2.0%)")
    .replace("Gated community app fee (+3.0%)", "门禁社群应用费 (+3.0%)")
    .replace("Ko-fi Gold monthly plan ($12/mo)", "Ko-fi Gold 套餐月费 ($12/月)")
    .replace("Ko-fi Standard/Contributor fee (5% on all)", "Ko-fi 默认 Standard 抽成 (全单 5%)")
    .replace("Ko-fi Shop / Membership fee (5%)", "Ko-fi 商店 / 会员抽成 (5%)")
    .replace("Stripe domestic card fee (2.9% + $0.30)", "Stripe 美国本地卡费 (2.9% + $0.30)")
    .replace("Stripe Billing recurring fee (+0.7%)", "Stripe Billing 订阅费 (+0.7%)")
    .replace("Stripe Tax Basic (+0.5%)", "Stripe Tax 基础计税 (+0.5%)");
}

export function localizeNote(note: string, locale: Locale): string {
  if (locale === "en") return note;
  const map: Record<string, string> = {
    "Merchant of Record: global VAT, GST & US sales tax handled automatically.":
      "MoR 全包税：自动代收代缴全球 VAT、GST 与美国销售税。",
    "No extra checkout surcharge for international cards, PayPal, or subscriptions.":
      "国际卡、PayPal 与周期订阅均无额外结账附加费。",
    "Merchant of Record: global sales tax & VAT handled by Lemon Squeezy.":
      "MoR 全包税：由 Lemon Squeezy 自动处理全球销售税与 VAT。",
    "2026 note: Surcharges stack up to 8.5% + $0.50 on international PayPal subscriptions.":
      "2026 提示：国际卡 + PayPal + 订阅三项叠加最高可达 8.5% + $0.50。",
    "2026 pricing (effective May 27, 2026): 0% extra subscription surcharge across all plans.":
      "2026 新版定价（5 月 27 日起）：全档位取消额外订阅附加费（0%）。",
    "Full Merchant of Record; Stripe payout transfer fees ($2/mo active + 0.25% + $0.25) apply on withdrawal.":
      "完整 MoR 包税；提现时另透传 Stripe 提现费（活跃月 $2 + 0.25% + $0.25）。",
    "Discover sales take a flat 30% cut (card processing included).":
      "Discover 市场归因订单统一按 30% 抽成（已含卡费）。",
    "Volume discount applied: direct sales above $20,000/mo drop from 10% to 5%.":
      "已触发阶梯折扣：月直客超 $20,000 部分平台费从 10% 降至 5%。",
    "Gumroad acts as Merchant of Record for global sales tax and VAT.":
      "Gumroad 作为 MoR 自动代收代缴全球销售税与 VAT。",
    "iOS in-app subscriptions incur Apple's 15% (Small Business) or 30% cut unless billed on the web.":
      "iOS 应用内购会被苹果抽 15%（中小企业计划）或 30%，建议引导网页端订阅。",
    "Web paid subscriptions total 13.6% + $0.30 before international card fees.":
      "网页端美卡订阅合计 13.6% + $0.30（未含国际卡附加费）。",
    "Tip: Annual subscriptions dramatically cut the $0.30 per-charge flat fee compared to monthly billing.":
      "省钱技巧：引导读者选年付，可把每笔 $0.30 固定手续费大幅摊薄。",
    "Creators launching after August 4, 2025 are on Patreon's 10% Standard plan.":
      "2025 年 8 月 4 日后上线的新创作者统一适用 10% Standard 费率。",
    "Break-even thresholds: Plus ($29/mo) beats Free past ~$967/mo; Pro ($99/mo) beats Plus past $3,500/mo.":
      "回本线：月销超 $967 选 Plus ($29/月) 更省；月销超 $3,500 选 Pro ($99/月) 更省。",
    "Whop starts at 2.7% + $0.30, but optional billing, tax remittance, and community app fees stack quickly.":
      "Whop 起步为 2.7% + $0.30，但勾选订阅、代报税与社群门禁应用后费率会快速叠加。",
    "Free mode (Standard turned OFF): 0% Ko-fi fee on one-time tips.":
      "已关闭 Standard 收费模式：一次性打赏 0% 平台费。",
    "2026 gotcha: New accounts default to 5% Standard mode; switch it off in payment settings for 0% one-time tips.":
      "2026 避坑提醒：新账号默认开启 5% Standard 模式，去支付设置关掉才能享受一次性打赏 0% 平台费。",
    "Direct Stripe is not a Merchant of Record — you remain responsible for sales tax/VAT registration and filing.":
      "直连 Stripe 非包税平台（非 MoR），需自行负责各国 VAT 与销售税申报。",
  };
  return map[note] ?? note;
}

export function localizeUpgradeTip(tip: string | undefined, locale: Locale): string | undefined {
  if (!tip || locale === "en") return tip;
  let m = tip.match(/^Switching to Polar (\w+) \(\$(\d+)\/mo\) saves (\$[\d,.]+)\/mo at your volume\.$/);
  if (m) return `按当前月流水，改用 Polar ${m[1]}（$${m[2]}/月）每月可多省 ${m[3]}。`;
  m = tip.match(/^Payhip (\w+) \(\$(\d+)\/mo\) saves (\$[\d,.]+)\/mo at (\$[\d,]+)\/mo volume\.$/);
  if (m) return `当前月流水 ${m[4]} 下，升级 Payhip ${m[1]}（$${m[2]}/月）每月可多省 ${m[3]}。`;
  m = tip.match(/^Ko-fi Gold \(\$12\/mo, 0% platform fee\) saves (\$[\d,.]+)\/mo once sales pass \$240\/mo\.$/);
  if (m) return `月销已超 $240，升级 Ko-fi Gold（$12/月 享 0% 平台费）每月可多省 ${m[1]}。`;
  if (tip.startsWith("Below $240/mo")) {
    return "当前月销低于 $240，用免费档 5% 抽成比付 $12/月 Gold 套餐更划算。";
  }
  return tip;
}

export function localizeFeeResult(res: FeeResult, locale: Locale): FeeResult {
  if (locale === "en") return res;
  return {
    ...res,
    breakdown: res.breakdown.map((b) => ({
      ...b,
      label: localizeBreakdownLabel(b.label, locale),
    })),
    notes: res.notes.map((n) => localizeNote(n, locale)),
    recommendedUpgrade: localizeUpgradeTip(res.recommendedUpgrade, locale),
  };
}
