import { Dna, StackPlus, FigmaLogo, FlowArrow } from "@phosphor-icons/react";
import { SectionCard, SectionHeading } from "../../components/docs/ComponentDoc";
import { Tag } from "../../components/ui/Tag";
import xincailiaoLogo from "../../assets/xincailiao-logo-horizontal.png";
import heroBg from "../../assets/hero-bg.png";

function PrincipleIcon({ type }: { type: "restraint" | "clarity" | "trust" | "efficiency" }) {
  const color = "var(--neutral-900)";
  const accent = "var(--brand-600)";
  if (type === "restraint") {
    return (
      <svg width="32" height="32" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M27 9L45 27L27 45L9 27L27 9Z" stroke={color} strokeWidth="2" strokeLinejoin="miter" />
        <path d="M30 27H42" stroke={accent} strokeWidth="2" />
      </svg>
    );
  }
  if (type === "clarity") {
    return (
      <svg width="32" height="32" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M10 31H18L24 18L32 39L38 27H44" stroke={color} strokeWidth="2" strokeLinejoin="miter" />
        <path d="M39 27H46" stroke={accent} strokeWidth="2" />
      </svg>
    );
  }
  if (type === "trust") {
    return (
      <svg width="32" height="32" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M27 10L41 16V27C41 36 35.5 42 27 45C18.5 42 13 36 13 27V16L27 10Z" stroke={color} strokeWidth="2" />
        <path d="M21 27L25 31L34 22" stroke={accent} strokeWidth="2" />
      </svg>
    );
  }
  return (
    <svg width="32" height="32" viewBox="0 0 54 54" fill="none" aria-hidden="true">
      <path d="M27 9V18" stroke={color} strokeWidth="2" />
      <path d="M27 36V45" stroke={color} strokeWidth="2" />
      <path d="M9 27H18" stroke={color} strokeWidth="2" />
      <path d="M36 27H45" stroke={color} strokeWidth="2" />
      <rect x="24" y="24" width="6" height="6" fill={accent} />
    </svg>
  );
}

const sections = [
  {
    eyebrow: "Objective",
    title: "设计目标",
    items: [
      { icon: <Dna size={24} weight="regular" />, title: "统一的视觉DNA", desc: "覆盖官网、数据空间、材库、材小模等全线产品" },
      { icon: <StackPlus size={24} weight="regular" />, title: "精准区分与快速搭建", desc: "按页面类型拆分为品牌展示、数据浏览、专业工具、系统管理四种场景，各自使用适合的信息密度和布局方式。" },
      { icon: <FigmaLogo size={24} weight="regular" />, title: "高还原度交付", desc: "Figma 组件与开发实现保持同一套 Token 体系" },
      { icon: <FlowArrow size={24} weight="regular" />, title: "持续迭代与同步", desc: "Token 由 Codex 维护，自动生成 .md 和 Figma tokens" },
    ],
  },
  {
    eyebrow: "Principles",
    title: "设计原则",
    items: [
      { icon: <PrincipleIcon type="restraint" />, title: "克制", desc: <><p className="font-medium text-[var(--text-primary)]">色彩克制</p><p>品牌红仅作为品牌签名出现；产品蓝用于产品能力以及 Radio、Checkbox、Switch 的选中状态；所有表单控件的 Focus 使用中性黑，大面积使用白色和灰阶构建界面。</p><p className="mt-3 font-medium text-[var(--text-primary)]">装饰克制</p><p>以信息传达为优先，减少无关视觉噪声。官网等品牌叙事层允许适度的视觉强化，装饰元素遵循统一数值梯度。</p></> },
      { icon: <PrincipleIcon type="clarity" />, title: "清晰", desc: <><p className="font-medium text-[var(--text-primary)]">信息层级清晰</p><p>通过严格的字号、字重、灰度体系，确保用户快速建立信息浏览动线。</p><p className="mt-3 font-medium text-[var(--text-primary)]">操作路径清晰</p><p>视觉权重递进明确，用户能无歧义地找到主行动点。</p></> },
      { icon: <PrincipleIcon type="trust" />, title: "可信", desc: <><p className="font-medium text-[var(--text-primary)]">结构可信</p><p>通过稳定结构和明确边界，建立数据治理的可靠感。</p><p className="mt-3 font-medium text-[var(--text-primary)]">反馈可信</p><p>状态反馈及时准确，权限标识清晰可辨，操作结果可预期。</p></> },
      { icon: <PrincipleIcon type="efficiency" />, title: "高效", desc: <><p className="font-medium text-[var(--text-primary)]">操作高效</p><p>面向材料工程师、工艺师、数据运营方等专业用户，减少无效步骤。</p><p className="mt-3 font-medium text-[var(--text-primary)]">信息密度高效</p><p>紧凑而有序地呈现高密度数据，减少不必要的留白和滚动。</p></> },
    ],
  },
] as const;

const productLayers = [
  { title: "品牌叙事层", feature: "门户官网，页面少、信息密度低，以品牌传播和转化引导为目标。深色背景 + 品牌红主视觉区 + 大画幅留白。", products: ["新材道官网"], details: "红色使用最充分，5 秒建立品牌第一印象。" },
  { title: "数据服务层", feature: "数据看板、卡片列表、详情预览，提供数据浏览和轻量操作。白底 + 产品蓝功能元素，模块化卡片布局。", products: ["InterMat 数据空间门户", "材库首页"], details: "InterMat → 节点链路拓扑图 · 数据市场陈列  |  材库 → 材料四面体图谱 · 数据目录树" },
  { title: "专业工具层", feature: "复杂表单、可视化画布、多步骤流程，面向专业用户深度操作。白底 + 蓝主导 + 红仅 Logo。", products: ["材小模", "智能相图", "智能拆单", "智能选材"], details: "材小模 → 步骤引导式建模流程 · 预测对比图表  |  智能相图 → 交互式相图可视化区  |  智能拆单 → 订单解析→BOM 展开看板" },
  { title: "系统管理层", feature: "筛选、列表、表单、详情、操作日志，用于后台配置与账号管理。白底 + 经典后台布局，信息密度最大化。", products: ["用户中心", "各产品后台配置", "InterMat 管理后台"], details: "侧边栏+顶栏+内容区结构，表格/表单/筛选/分页为核心形态。" },
];

export function HomeHero() {
  return (
    <section className="relative">
      <img
        src={heroBg}
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(247,248,250,0.25) 20%, rgba(247,248,250,0.55) 45%, rgba(247,248,250,0.85) 70%, #F7F8FA 100%)",
        }}
      />
      <div className="relative z-10 mx-auto flex min-h-[450px] max-w-[calc(var(--content-docs-width)+12rem)] items-start gap-10 px-5 pt-20 md:px-8 xl:px-10">
        <div className="min-w-0 flex-1">
          <div className="mb-3 inline-flex items-center gap-2 rounded-sm border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--text-tertiary)]">
            <span className="text-[var(--text-tertiary)] mr-1.5">2026</span><span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-600)]" />
            新材道设计系统
          </div>
          <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-[var(--text-primary)]">设计系统</h1>
          <p className="mt-4 max-w-xl text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">
            覆盖官网门户、可信数据空间、材库、材小模等全线产品的统一设计语言。基于 Token 驱动的色彩、字体、间距、圆角、阴影体系，从 Figma 设计稿到 Vue 3 组件代码保持同一套设计变量，确保品牌识别一致、研发交付高效。
          </p>
        </div>
        <div className="hidden w-[360px] shrink-0 rounded-sm border border-white/20 bg-white/40 backdrop-blur-lg p-5 lg:block">
          <div className="mb-4 flex items-center border-b border-[var(--neutral-200)] pb-4">
            <img src={xincailiaoLogo} alt="新材道 XINCAILIAO" className="h-9 w-auto object-contain" />
          </div>
          <div className="space-y-3">
            {[
              ["Brand", "官网门户 / 品牌传播", "brand"],
              ["Product", "数据空间 / 材库 / AI 工具", "product"],
            ].map(([title, description, color]) => (
              <div key={title} className="flex items-start gap-3 rounded-sm px-3 py-3.5">
                <div className="min-w-0 flex-1">
                  <div className="text-xs text-[var(--text-tertiary)]">{title}</div>
                  <div className="mt-0.5 text-sm font-medium text-[var(--text-primary)]">{description}</div>
                </div>
                {color === "brand" ? (
                  <span className="mt-1 grid h-8 w-1.5 flex-shrink-0 grid-rows-2 overflow-hidden">
                    <span className="bg-[var(--neutral-900)]" />
                    <span className="bg-[var(--brand-600)]" />
                  </span>
                ) : (
                  <span className="mt-1 grid h-8 w-1.5 flex-shrink-0 grid-rows-2 overflow-hidden">
                    <span className="bg-[var(--neutral-900)]" />
                    <span className="bg-[var(--product-blue-500)]" />
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-16">

      {/* Objectives */}
      <section>
        <SectionHeading eyebrow={sections[0].eyebrow} title={sections[0].title} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sections[0].items.map((item) => (
            <SectionCard key={item.title} className="p-8">
              <div className="mb-3 flex h-8 w-8 items-center text-[var(--text-secondary)]">
                {item.icon}
              </div>
              <h3 className="text-lg font-medium leading-[26px] text-[var(--text-primary)]">{item.title}</h3>
              <div className="mt-3 space-y-1 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">{item.desc}</div>
            </SectionCard>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section>
        <SectionHeading eyebrow={sections[1].eyebrow} title={sections[1].title} />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sections[1].items.map((item) => (
            <SectionCard key={item.title} className="p-8">
              <div className="flex items-start gap-10">
                <div className="shrink-0">
                  <div className="flex h-8 w-8 items-center text-[var(--text-secondary)]">
                    {item.icon}
                  </div>
                  <h3 className="mt-2 text-lg font-medium leading-[26px] text-[var(--text-primary)] whitespace-nowrap">{item.title}</h3>
                </div>
                <div className="min-w-0 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">{item.desc}</div>
              </div>
            </SectionCard>
          ))}
        </div>
      </section>

      {/* Product Layers */}
      <section>
        <SectionHeading eyebrow="Product Layers" title="产品分层设计" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {productLayers.map((layer) => (
            <SectionCard key={layer.title} className="p-8">
              <h3 className="text-lg font-medium leading-[26px] text-[var(--text-primary)]">{layer.title}</h3>
              <p className="mt-1 text-sm leading-[var(--type-body-m-line-height)] text-[var(--text-secondary)]">{layer.feature}</p>
              {layer.details ? <p className="mt-2 text-xs leading-5 text-[var(--text-tertiary)]">{layer.details}</p> : null}
              <div className="mt-3 flex flex-wrap gap-2">
                {layer.products.map((product) => (
                  <Tag key={product} variant="neutral" size="sm">
                    {product}
                  </Tag>
                ))}
              </div>
            </SectionCard>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-[var(--neutral-200)] py-8 text-center text-xs text-[var(--text-tertiary)]">
        <p>2026 新材道设计系统 · v1.0 · 由 Codex 维护 · 通过 GitHub Pages 发布</p>
      </section>
    </div>
  );
}
