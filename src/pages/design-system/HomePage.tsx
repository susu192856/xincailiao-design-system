import { Link } from "react-router-dom";
import { Dna, StackPlus, FigmaLogo, FlowArrow } from "@phosphor-icons/react";
import { Tag } from "../../components/ui/Tag";
import xincailiaoLogo from "../../assets/xincailiao-logo-horizontal.png";
import heroBg from "../../assets/hero-bg.png";

function PrincipleIcon({ type }: { type: "restraint" | "clarity" | "trust" | "efficiency" }) {
  const color = "var(--neutral-900)";
  const accent = "#FF112D";
  if (type === "restraint") {
    return (
      <svg width="28" height="28" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M27 9L45 27L27 45L9 27L27 9Z" stroke={color} strokeWidth="2" strokeLinejoin="miter" />
        <path d="M30 27H42" stroke={accent} strokeWidth="2" />
      </svg>
    );
  }
  if (type === "clarity") {
    return (
      <svg width="28" height="28" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M10 31H18L24 18L32 39L38 27H44" stroke={color} strokeWidth="2" strokeLinejoin="miter" />
        <path d="M39 27H46" stroke={accent} strokeWidth="2" />
      </svg>
    );
  }
  if (type === "trust") {
    return (
      <svg width="28" height="28" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M27 10L41 16V27C41 36 35.5 42 27 45C18.5 42 13 36 13 27V16L27 10Z" stroke={color} strokeWidth="2" />
        <path d="M21 27L25 31L34 22" stroke={color} strokeWidth="2" />
        <rect x="37" y="15" width="3" height="3" fill={accent} />
      </svg>
    );
  }
  return (
    <svg width="28" height="28" viewBox="0 0 54 54" fill="none" aria-hidden="true">
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
      { icon: <Dna size={18} weight="regular" />, title: "统一的视觉DNA", desc: "覆盖官网、数据空间、材库、材小模等全线产品" },
      { icon: <StackPlus size={18} weight="regular" />, title: "精准区分与快速搭建", desc: "拼装品牌叙事、数据服务、专业工具、系统管理四层产品" },
      { icon: <FigmaLogo size={18} weight="regular" />, title: "高还原度交付", desc: "Figma 组件与开发实现保持同一套 Token 体系" },
      { icon: <FlowArrow size={18} weight="regular" />, title: "持续迭代与同步", desc: "Token 由 Codex 维护，自动生成 .md 和 Figma tokens" },
    ],
  },
  {
    eyebrow: "Principles",
    title: "设计原则",
    items: [
      { icon: <PrincipleIcon type="restraint" />, title: "克制", desc: <><p className="font-medium text-[var(--neutral-800)]">色彩克制</p><p>品牌红仅作为品牌签名出现，产品蓝仅用于可交互元素，大面积使用白色和灰阶构建界面。</p><p className="mt-3 font-medium text-[var(--neutral-800)]">装饰克制</p><p>以信息传达为优先，减少无关视觉噪声。官网等品牌叙事层允许适度的视觉强化，装饰元素遵循统一数值梯度。</p></> },
      { icon: <PrincipleIcon type="clarity" />, title: "清晰", desc: <><p className="font-medium text-[var(--neutral-800)]">信息层级清晰</p><p>通过严格的字号、字重、灰度体系，确保用户快速建立信息浏览动线。</p><p className="mt-3 font-medium text-[var(--neutral-800)]">操作路径清晰</p><p>视觉权重递进明确，用户能无歧义地找到主行动点。</p></> },
      { icon: <PrincipleIcon type="trust" />, title: "可信", desc: <><p className="font-medium text-[var(--neutral-800)]">结构可信</p><p>通过稳定结构和明确边界，建立数据治理的可靠感。</p><p className="mt-3 font-medium text-[var(--neutral-800)]">反馈可信</p><p>状态反馈及时准确，权限标识清晰可辨，操作结果可预期。</p></> },
      { icon: <PrincipleIcon type="efficiency" />, title: "高效", desc: <><p className="font-medium text-[var(--neutral-800)]">操作高效</p><p>面向材料工程师、工艺师、数据运营方等专业用户，减少无效步骤。</p><p className="mt-3 font-medium text-[var(--neutral-800)]">信息密度高效</p><p>紧凑而有序地呈现高密度数据，减少不必要的留白和滚动。</p></> },
    ],
  },
] as const;

const productLayers = [
  { title: "品牌叙事层", feature: "页面少、信息密度低、强视觉叙事", products: ["新材道官网"] },
  { title: "数据服务层", feature: "数据看板、卡片列表、详情预览、轻量操作入口", products: ["新材料可信数据空间", "材库"] },
  { title: "专业工具层", feature: "复杂表单、可视化画布、多步骤流程、结果呈现", products: ["材小模", "智能拆单", "智能相图", "智能选材"] },
  { title: "系统管理层", feature: "筛选框、列表、表单、详情页、操作日志", products: ["用户中心/账号管理", "各产品的后台配置"] },
];

function SectionHeader({ title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3">
        <span className="h-5 w-0.5 shrink-0 bg-[var(--docs-accent)]" aria-hidden="true" />
        <h2 className="text-2xl font-medium leading-8 text-[var(--neutral-900)]">{title}</h2>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section
        className="relative -mt-12"
        style={{
          width: "calc(100vw - 256px)",
          marginLeft: "calc(-50vw + 50% + 128px)",
        }}
      >
        <img
          src={heroBg}
          alt=""
          className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32"
          style={{ background: "linear-gradient(to bottom, transparent, white)" }}
        />
        <div className="relative z-10 mx-auto grid min-h-[400px] max-w-[1024px] grid-cols-1 items-start gap-16 px-8 pt-20 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="mb-3 inline-flex items-center gap-2 rounded-sm border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--neutral-600)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-600)]" />
              新材道设计系统
            </div>
            <h1 className="mt-5 text-[2.5rem] font-semibold leading-[1.08] tracking-tight text-[var(--neutral-900)]">设计系统</h1>
            <p className="mt-4 max-w-xl text-sm leading-[22px] text-[var(--neutral-700)]">
              覆盖官网门户、可信数据空间、材库、材小模等全线产品的统一设计语言。<br />
              基于 Token 驱动的色彩、字体、间距、圆角、阴影体系，从 Figma 设计<br />稿到 Vue 3 组件代码保持同一套设计变量，确保品牌识别一致、研发交付高效。
            </p>
          </div>
          <div className="rounded-sm border border-white/20 bg-white/40 backdrop-blur-lg p-5">
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
                    <div className="font-mono text-xs text-[var(--neutral-500)]">{title}</div>
                    <div className="mt-0.5 text-sm font-medium text-[var(--neutral-900)]">{description}</div>
                  </div>
                  {color === "brand" ? (
                    <span className="mt-1 grid h-8 w-1.5 flex-shrink-0 grid-rows-2 overflow-hidden">
                      <span className="bg-[var(--neutral-900)]" />
                      <span className="bg-[var(--brand-600)]" />
                    </span>
                  ) : color === "product" ? (
                    <span className="mt-1 grid h-8 w-1.5 flex-shrink-0 grid-rows-2 overflow-hidden">
                      <span className="bg-[var(--neutral-900)]" />
                      <span className="bg-[var(--product-blue-500)]" />
                    </span>
                  ) : (
                    <span className={`mt-1 h-1.5 w-8 flex-shrink-0 ${color}`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Objectives + Principles */}
      {sections.map((section) => (
        <section key={section.title}>
          <SectionHeader eyebrow={section.eyebrow} title={section.title} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {section.items.map((item) => (
              <div key={item.title} className="rounded-sm bg-[var(--neutral-50)] p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-sm bg-white text-[var(--neutral-700)]">
                  {item.icon}
                </div>
                <h3 className="text-lg font-medium leading-[26px] text-[var(--neutral-900)]">{item.title}</h3>
                <div className="mt-3 space-y-1 text-sm leading-[22px] text-[var(--neutral-600)]">{item.desc}</div>
              </div>
            ))}
          </div>
        </section>
      ))}

      {/* Product Layers */}
      <section>
        <SectionHeader eyebrow="Product Layers" title="产品分层设计" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {productLayers.map((layer) => (
            <div key={layer.title} className="rounded-sm bg-[var(--neutral-50)] p-5">
              <h3 className="text-lg font-medium leading-[26px] text-[var(--neutral-900)]">{layer.title}</h3>
              <p className="mt-1 text-sm leading-[22px] text-[var(--neutral-600)]">{layer.feature}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {layer.products.map((product) => (
                  <Tag key={product} variant="neutral" size="sm" className="bg-white">
                    {product}
                  </Tag>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-[var(--neutral-200)] py-8 text-center text-[10px] text-[var(--neutral-500)]">
        <p>2026 新材道设计系统 · v1.0 · 由 Codex 维护 · 通过 GitHub Pages 发布</p>
      </section>
    </div>
  );
}
