import { Link } from "react-router-dom";
import { Dna, StackPlus, FigmaLogo, FlowArrow } from "@phosphor-icons/react";
import {
  Palette, TextT, Smiley, Rows, Circle, Cube, Layout,
  Square, CaretDown, Table, Cards,
  Tag, FileText, ChartBar,
} from "@phosphor-icons/react";
import xincailiaoLogo from "../../assets/xincailiao-logo-horizontal.png";

interface CardLink {
  title: string;
  path: string;
  icon: React.ReactNode;
  desc: string;
}

const tokenLinks: CardLink[] = [
  { title: "色彩系统", path: "/design-system/colors", icon: <Palette size={24} weight="regular" />, desc: "品牌红、产品蓝、中性灰、语义色" },
  { title: "字体系统", path: "/typography", icon: <TextT size={24} weight="regular" />, desc: "字号层级、行高规范、字体栈" },
  { title: "图标系统", path: "/icon", icon: <Smiley size={24} weight="regular" />, desc: "Phosphor Icons 常用图标库" },
  { title: "间距系统", path: "/spacing", icon: <Rows size={24} weight="regular" />, desc: "4px 基准的间距体系" },
  { title: "圆角系统", path: "/radius", icon: <Circle size={24} weight="regular" />, desc: "2px 起的多层级圆角" },
  { title: "阴影系统", path: "/shadow", icon: <Cube size={24} weight="regular" />, desc: "6 级阴影高度" },
  { title: "布局系统", path: "/layout", icon: <Layout size={24} weight="regular" />, desc: "官网与后台布局规范" },
];

const componentLinks: CardLink[] = [
  { title: "按钮", path: "/components/button", icon: <Square size={24} weight="regular" />, desc: "4 种变体 × 4 种色彩语义" },
  { title: "输入框", path: "/components/input", icon: <TextT size={24} weight="regular" />, desc: "3 种尺寸，支持标签/错误态" },
  { title: "选择器", path: "/components/select", icon: <CaretDown size={24} weight="regular" />, desc: "下拉选择，支持占位/禁用" },
  { title: "表格", path: "/components/table", icon: <Table size={24} weight="regular" />, desc: "组合式 Table 组件" },
  { title: "卡片", path: "/components/card", icon: <Cards size={24} weight="regular" />, desc: "Header/Content/Footer 分块" },
  { title: "弹窗", path: "/components/modal", icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20V8a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H8l-4 4z"/></svg>, desc: "标题/描述/内容/底部操作" },
  { title: "标签", path: "/components/tag", icon: <Tag size={24} weight="regular" />, desc: "6 种状态色彩" },
  { title: "Tabs", path: "/components/tabs", icon: <FileText size={24} weight="regular" />, desc: "受控切换，支持禁用项" },
  { title: "分页", path: "/components/pagination", icon: <ChartBar size={24} weight="regular" />, desc: "简洁分页导航" },
];

function PrincipleIcon({ type }: { type: "restraint" | "clarity" | "trust" | "efficiency" }) {
  const color = "var(--neutral-900)";
  const accent = "#FF112D";
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
        <path d="M21 27L25 31L34 22" stroke={color} strokeWidth="2" />
        <rect x="37" y="15" width="4" height="4" fill={accent} />
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
      { icon: <Dna size={20} />, title: "建立统一的「视觉DNA」", desc: "将品牌心智转化为可执行的代码级规范，覆盖官网、数据空间、材库、材小模等全线产品" },
      { icon: <StackPlus size={20} />, title: "精准区分与快速搭建", desc: "在同一套规范下，快速拼装品牌叙事、数据服务、专业工具、系统管理四层产品" },
      { icon: <FigmaLogo size={20} />, title: "高还原度交付", desc: "设计规范即验收标准，Figma 组件与开发实现保持同一套 Token 体系" },
      { icon: <FlowArrow size={20} />, title: "持续迭代与同步", desc: "Token 由 Codex 维护，自动生成 .md 文档、Figma tokens 和部署网站" },
    ],
  },
  {
    eyebrow: "Principles",
    title: "设计原则",
    items: [
      { icon: <PrincipleIcon type="restraint" />, title: "克制", desc: "品牌红 #FF112D 只用于关键节点、激活状态和决策结果，不做大面积装饰。界面减少无关视觉噪音，让数据、流程和结论成为主体。" },
      { icon: <PrincipleIcon type="clarity" />, title: "清晰", desc: "面对数据空间、材库、AI应用等复杂业务，优先建立明确的信息层级。通过稳定的版式结构和可预测的交互路径，帮助用户快速理解系统。" },
      { icon: <PrincipleIcon type="trust" />, title: "可信", desc: "通过稳定结构、明确边界、状态反馈和权限标识，建立数据治理的可靠感。以流程追踪和链上存证感的视觉表达，传达数据流通与AI决策的可信。" },
      { icon: <PrincipleIcon type="efficiency" />, title: "高效", desc: "面向材料工程师、工艺师、数据运营方和管理者等专业用户，减少无效步骤。将高频操作、关键指标和决策结果前置，让专业判断更快发生。" },
    ],
  },
] as const;

const productLayers = [
  {
    title: "品牌叙事层",
    feature: "页面少、信息密度低、强视觉叙事",
    focus: "建立品牌信任，讲清楚价值主张，引导用户进入下一层",
    products: ["新材道官网"],
  },
  {
    title: "数据服务层",
    feature: "数据看板、卡片列表、详情预览、轻量操作入口",
    focus: "数据可读性优先，操作轻量化，让用户快速获取价值",
    products: ["新材料可信数据空间", "材库"],
  },
  {
    title: "专业工具层",
    feature: "复杂表单、可视化画布、多步骤流程、结果呈现",
    focus: "操作效率最大化，路径最短化，反馈即时化",
    products: ["材小模", "智能拆单", "智能相图", "智能选材"],
  },
  {
    title: "系统管理层",
    feature: "筛选框、列表、表单、详情页、操作日志",
    focus: "标准化、可预测，降低运维学习成本",
    products: ["用户中心/账号管理", "各产品的后台配置"],
  },
];

function SectionCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
      <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--neutral-200)] text-[var(--neutral-700)]">
        {icon}
      </div>
      <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{title}</h3>
      <p className="mt-1.5 text-xs leading-5 text-[var(--neutral-500)]">{desc}</p>
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">
          {eyebrow}
        </p>
        <h2 className="text-2xl font-semibold text-[var(--neutral-900)]">{title}</h2>
      </div>
      <div className="h-px flex-1 bg-[var(--neutral-200)]" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero */}
      <section className="grid min-h-[400px] grid-cols-1 items-center gap-12 pt-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-sm border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--neutral-600)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-600)]" />
            2026 · 新材道设计系统
          </div>
          <h1 className="mt-5 text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-[var(--neutral-900)]">
            设计系统
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--neutral-600)]">
            新材道全线产品的统一设计规范。在统一的品牌识别和设计语言下，
            为不同产品类型和业务场景提供清晰、一致的视觉表达边界。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["AI+材料", "工业数据", "产业智能化"].map((tag) => (
              <span key={tag} className="rounded-sm border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-sm text-[var(--neutral-700)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
          <div className="mb-4 flex items-center border-b border-[var(--neutral-200)] pb-4">
            <img src={xincailiaoLogo} alt="新材道 XINCAILIAO" className="h-9 w-auto object-contain" />
          </div>
          <div className="space-y-3">
            {[
              ["Brand", "官网门户 / 品牌传播", "bg-[var(--brand-600)]"],
              ["Product", "数据空间 / 材库 / AI 工具", "bg-[var(--product-blue-500)]"],
              ["System", "后台配置 / 管理系统", "bg-[var(--neutral-900)]"],
            ].map(([title, description, color]) => (
              <div key={title} className="flex items-center gap-3 rounded-sm bg-[var(--neutral-50)] px-3 py-3.5">
                <span className={`h-3 w-3 flex-shrink-0 ${color}`} />
                <div>
                  <div className="font-mono text-xs text-[var(--neutral-500)]">{title}</div>
                  <div className="mt-0.5 text-sm font-medium text-[var(--neutral-900)]">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Design Tokens */}
      <section>
        <SectionHeader eyebrow="Tokens" title="设计 Token" />
        <p className="-mt-4 mb-6 max-w-2xl text-sm leading-7 text-[var(--neutral-600)]">
          基础设计变量是规范的核心。开发通过 CSS 变量直接引用，设计师通过 Figma Tokens 同步使用。
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tokenLinks.map((link) => (
            <Link key={link.path} to={link.path} className="group rounded-sm border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--neutral-200)] text-[var(--neutral-700)]">
                {link.icon}
              </div>
              <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{link.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-[var(--neutral-500)]">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* UI Components */}
      <section>
        <SectionHeader eyebrow="Components" title="UI 组件" />
        <p className="-mt-4 mb-6 max-w-2xl text-sm leading-7 text-[var(--neutral-600)]">
          当前共 9 个基础组件。开发参考以下规范用 Vue 3 实现，设计师在 Figma 中保持对应。
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {componentLinks.map((link) => (
            <Link key={link.path} to={link.path} className="group rounded-sm border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:shadow-sm">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--neutral-200)] text-[var(--neutral-700)]">
                {link.icon}
              </div>
              <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{link.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-[var(--neutral-500)]">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* 设计目标 + 设计原则 (统一卡片风格) */}
      {sections.map((section) => (
        <section key={section.title}>
          <SectionHeader eyebrow={section.eyebrow} title={section.title} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {section.items.map((item) => (
              <SectionCard key={item.title} icon={item.icon} title={item.title} desc={item.desc} />
            ))}
          </div>
        </section>
      ))}

      {/* Product Layers */}
      <section>
        <SectionHeader eyebrow="Product Layers" title="产品分层" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {productLayers.map((layer) => (
            <div key={layer.title} className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
              <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{layer.title}</h3>
              <p className="mt-1 text-xs leading-5 text-[var(--neutral-500)]">{layer.feature}</p>
              <div className="mt-4 border-t border-[var(--neutral-200)] pt-3">
                <p className="mb-2 text-xs font-semibold text-[var(--neutral-700)]">对应产品</p>
                <div className="flex flex-wrap gap-2">
                  {layer.products.map((product) => (
                    <span key={product} className="rounded-sm border border-[var(--brand-200)] bg-[var(--brand-50)] px-2.5 py-1 text-xs text-[var(--brand-700)]">
                      {product}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <section className="border-t border-[var(--neutral-200)] py-8 text-center text-xs text-[var(--neutral-500)]">
        <p>2026 新材道设计系统 · 由 Codex 维护 · 通过 GitHub Pages 发布</p>
      </section>
    </div>
  );
}
