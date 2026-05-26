import { Link } from "react-router-dom";
import { Dna, StackPlus, FigmaLogo, FlowArrow } from "@phosphor-icons/react";
import {
  Palette, TextT, Smiley, Rows, Circle, Cube, Layout,
  Square, CaretDown, Table, Cards,
  Tag, FileText, ChartBar,
} from "@phosphor-icons/react";
import PageHeader from "../../components/docs/PageHeader";

interface CardLink {
  title: string;
  path: string;
  icon: React.ReactNode;
  desc: string;
}

const tokenLinks: CardLink[] = [
  { title: "色彩系统", path: "/design-system/colors", icon: <Palette size={20} weight="regular" />, desc: "品牌红、产品蓝、中性灰、语义色" },
  { title: "字体系统", path: "/typography", icon: <TextT size={20} weight="regular" />, desc: "字号层级、行高规范、字体栈" },
  { title: "图标系统", path: "/icon", icon: <Smiley size={20} weight="regular" />, desc: "Phosphor Icons 常用图标库" },
  { title: "间距系统", path: "/spacing", icon: <Rows size={20} weight="regular" />, desc: "4px 基准的间距体系" },
  { title: "圆角系统", path: "/radius", icon: <Circle size={20} weight="regular" />, desc: "2px 起的多层级圆角" },
  { title: "阴影系统", path: "/shadow", icon: <Cube size={20} weight="regular" />, desc: "6 级阴影高度" },
  { title: "布局系统", path: "/layout", icon: <Layout size={20} weight="regular" />, desc: "官网与后台布局规范" },
];

const componentLinks: CardLink[] = [
  { title: "按钮", path: "/components/button", icon: <Square size={20} weight="regular" />, desc: "4 种变体 × 4 种色彩语义" },
  { title: "输入框", path: "/components/input", icon: <TextT size={20} weight="regular" />, desc: "3 种尺寸，支持标签/错误态" },
  { title: "选择器", path: "/components/select", icon: <CaretDown size={20} weight="regular" />, desc: "下拉选择，支持占位/禁用" },
  { title: "表格", path: "/components/table", icon: <Table size={20} weight="regular" />, desc: "组合式 Table 组件" },
  { title: "卡片", path: "/components/card", icon: <Cards size={20} weight="regular" />, desc: "Header/Content/Footer 分块" },
  { title: "弹窗", path: "/components/modal", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 20V8a2 2 0 012-2h12a2 2 0 012 2v6a2 2 0 01-2 2H8l-4 4z"/></svg>, desc: "标题/描述/内容/底部操作" },
  { title: "标签", path: "/components/tag", icon: <Tag size={20} weight="regular" />, desc: "6 种状态色彩" },
  { title: "Tabs", path: "/components/tabs", icon: <FileText size={20} weight="regular" />, desc: "受控切换，支持禁用项" },
  { title: "开关", path: "/components/switch", icon: <Square size={20} weight="regular" />, desc: "切换开关" },
  { title: "复选框", path: "/components/checkbox", icon: <Square size={20} weight="regular" />, desc: "多选，支持禁用" },
  { title: "单选框", path: "/components/radio", icon: <Circle size={20} weight="regular" />, desc: "单选互斥" },
  { title: "文本域", path: "/components/textarea", icon: <TextT size={20} weight="regular" />, desc: "多行输入" },
  { title: "消息提示", path: "/components/toast", icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3C7 3 3 7 3 12C3 17 7 21 12 21C17 21 21 17 21 12"/><path d="M12 8V13M12 15V15.5"/></svg>, desc: "操作反馈" },
  { title: "分页", path: "/components/pagination", icon: <ChartBar size={20} weight="regular" />, desc: "分页导航" },
];

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

const colorRoles = [
  { name: "品牌红", hex: "#FF112D", token: "brand-600", role: "品牌识别、关键状态、当前选中、重点强调", usage: "小面积精确使用，不做大面积铺色" },
  { name: "产品蓝", hex: "#006DEA", token: "product-blue-500", role: "链接、信息提示、科技感辅助、交互态", usage: "不与品牌红形成高饱和冲突" },
  { name: "中性黑", hex: "#1A1A1A", token: "neutral-900", role: "主标题、核心文本、主要操作按钮", usage: "保持高级、稳定、理性的视觉基调" },
];

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
      { icon: <PrincipleIcon type="restraint" />, title: "克制", desc: "品牌红只用于关键节点，不做大面积装饰。界面减少无关视觉噪音。" },
      { icon: <PrincipleIcon type="clarity" />, title: "清晰", desc: "面对数据空间、材库、AI应用等复杂业务，优先建立明确的信息层级。" },
      { icon: <PrincipleIcon type="trust" />, title: "可信", desc: "通过稳定结构、明确边界、状态反馈和权限标识，建立数据治理的可靠感。" },
      { icon: <PrincipleIcon type="efficiency" />, title: "高效", desc: "面向材料工程师、工艺师、数据运营方等专业用户，减少无效步骤。" },
    ],
  },
] as const;

const productLayers = [
  {
    title: "品牌叙事层",
    feature: "页面少、信息密度低、强视觉叙事",
    products: ["新材道官网"],
  },
  {
    title: "数据服务层",
    feature: "数据看板、卡片列表、详情预览、轻量操作入口",
    products: ["新材料可信数据空间", "材库"],
  },
  {
    title: "专业工具层",
    feature: "复杂表单、可视化画布、多步骤流程、结果呈现",
    products: ["材小模", "智能拆单", "智能相图", "智能选材"],
  },
  {
    title: "系统管理层",
    feature: "筛选框、列表、表单、详情页、操作日志",
    products: ["用户中心/账号管理", "各产品的后台配置"],
  },
];

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="h-3 w-0.5 shrink-0 bg-[var(--docs-accent)]" aria-hidden="true" />
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">{eyebrow}</p>
      <div className="h-px flex-1 bg-[var(--neutral-200)]" />
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Brand Intro */}
      <PageHeader
        title="设计系统"
        description="新材道全线产品的统一设计规范。在统一的品牌识别和设计语言下，为不同产品类型和业务场景提供清晰、一致的视觉表达边界。"
        version="v1.0"
      />

      {/* Brand Color Roles */}
      <section>
        <SectionHeader eyebrow="Color Roles" title="色彩角色" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {colorRoles.map((c) => (
            <div key={c.name} className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-6 w-6 rounded-sm" style={{ backgroundColor: c.hex }} />
                <div>
                  <p className="text-sm font-semibold text-[var(--neutral-900)]">{c.name}</p>
                  <p className="font-mono text-[10px] text-[var(--neutral-500)]">{c.token} · {c.hex}</p>
                </div>
              </div>
              <p className="mb-2 text-xs leading-5 text-[var(--neutral-700)]">{c.role}</p>
              <p className="text-xs text-[var(--neutral-500)]">{c.usage}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Design Tokens */}
      <section>
        <SectionHeader eyebrow="Tokens" title="设计 Token" />
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tokenLinks.map((link) => (
            <Link key={link.path} to={link.path} className="group rounded-sm border border-[var(--neutral-200)] bg-white p-5 transition-colors hover:border-[var(--neutral-300)]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--neutral-200)] text-[var(--neutral-600)]">
                {link.icon}
              </div>
              <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{link.title}</h3>
              <p className="mt-1 text-xs leading-5 text-[var(--neutral-500)]">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* UI Components */}
      <section>
        <SectionHeader eyebrow="Components" title="UI 组件" />
        <p className="-mt-5 mb-6 text-sm leading-7 text-[var(--neutral-600)]">
          当前共 14 个基础组件。开发用 Vue 3 实现，设计师在 Figma 中保持对应。
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {componentLinks.map((link) => (
            <Link key={link.path} to={link.path} className="group rounded-sm border border-[var(--neutral-200)] bg-white p-5 transition-colors hover:border-[var(--neutral-300)]">
              <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-sm border border-[var(--neutral-200)] text-[var(--neutral-600)]">
                {link.icon}
              </div>
              <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{link.title}</h3>
              <p className="mt-1 text-xs leading-5 text-[var(--neutral-500)]">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Objectives + Principles */}
      {sections.map((section) => (
        <section key={section.title}>
          <SectionHeader eyebrow={section.eyebrow} title={section.title} />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {section.items.map((item) => (
              <div key={item.title} className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
                <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-sm border border-[var(--neutral-200)] text-[var(--neutral-600)]">
                  {item.icon}
                </div>
                <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-[var(--neutral-500)]">{item.desc}</p>
              </div>
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
              <div className="mt-3 flex flex-wrap gap-2">
                {layer.products.map((product) => (
                  <span key={product} className="rounded-sm border border-[var(--neutral-200)] bg-[var(--neutral-50)] px-2 py-0.5 text-[10px] text-[var(--neutral-600)]">
                    {product}
                  </span>
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
