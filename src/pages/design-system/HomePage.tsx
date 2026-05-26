import { Link } from "react-router-dom";
import {
  Palette, TextT, Smiley, Rows, Circle, Cube, Layout,
  Square, CaretDown, Table, Cards,
  Tag, FileText, ChartBar,
} from "@phosphor-icons/react";

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

const principles = [
  {
    number: "01",
    title: "克制",
    desc: "品牌红只用于关键节点，不做大面积装饰。界面减少无关视觉噪音，让数据、流程和结论成为主体。",
  },
  {
    number: "02",
    title: "清晰",
    desc: "面对数据空间、材库、AI应用等复杂业务，优先建立明确的信息层级和可预测的交互路径。",
  },
  {
    number: "03",
    title: "可信",
    desc: "通过稳定结构、明确边界、状态反馈，建立数据治理的可靠感与流程可追溯的信任感。",
  },
  {
    number: "04",
    title: "高效",
    desc: "面向材料工程师、数据运营方等专业用户，将高频操作和关键决策结果前置，减少无效步骤。",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="pt-8">
        <div className="mb-2 inline-flex items-center gap-2 rounded-sm border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--neutral-600)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-600)]" />
          2026 · 新材道设计系统
        </div>
        <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-[var(--neutral-900)]">
          统一的视觉语言
          <br />
          高效的协作基础
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--neutral-600)]">
          本规范统一新材道在品牌传播、官网门户、产品展示和业务系统中的基础视觉表达。
          在统一品牌识别和设计语言的前提下，为不同产品类型提供明确的表达边界。
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {["可信数据空间", "AI+材料", "工业数据治理"].map((tag) => (
            <span key={tag} className="rounded-sm border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-sm text-[var(--neutral-700)]">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Design Tokens */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-[var(--neutral-900)]">设计 Token</h2>
          <div className="h-px flex-1 bg-[var(--neutral-200)]" />
        </div>
        <p className="mb-6 max-w-2xl text-sm leading-7 text-[var(--neutral-600)]">
          基础设计变量是规范的核心。开发通过 CSS 变量直接引用，设计师通过 Figma Tokens 同步使用。
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tokenLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="group rounded-sm border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--neutral-200)] text-[var(--neutral-700)]">
                {link.icon}
              </div>
              <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{link.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-[var(--neutral-500)]">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Components */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-[var(--neutral-900)]">UI 组件</h2>
          <div className="h-px flex-1 bg-[var(--neutral-200)]" />
        </div>
        <p className="mb-6 max-w-2xl text-sm leading-7 text-[var(--neutral-600)]">
          当前共 9 个基础组件。开发参考以下规范用 Vue 3 实现，设计师在 Figma 中保持对应。
        </p>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {componentLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="group rounded-sm border border-[var(--neutral-200)] bg-white p-5 transition-all hover:border-[var(--neutral-300)] hover:shadow-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--neutral-200)] text-[var(--neutral-700)]">
                {link.icon}
              </div>
              <h3 className="text-sm font-semibold text-[var(--neutral-900)]">{link.title}</h3>
              <p className="mt-1.5 text-xs leading-5 text-[var(--neutral-500)]">{link.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section>
        <div className="mb-6 flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-[var(--neutral-900)]">设计原则</h2>
          <div className="h-px flex-1 bg-[var(--neutral-200)]" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {principles.map((p) => (
            <div key={p.title} className="relative rounded-sm border border-[var(--neutral-200)] bg-white p-6">
              <span className="absolute right-5 top-4 font-mono text-4xl font-semibold leading-none text-[var(--neutral-100)]">
                {p.number}
              </span>
              <h3 className="relative text-lg font-semibold text-[var(--neutral-900)]">{p.title}</h3>
              <p className="relative mt-3 text-sm leading-6 text-[var(--neutral-600)]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer info */}
      <section className="border-t border-[var(--neutral-200)] py-8 text-center text-xs text-[var(--neutral-500)]">
        <p>2026 新材道设计系统 · 由 Codex 维护 · 通过 GitHub Pages 发布</p>
      </section>
    </div>
  );
}
