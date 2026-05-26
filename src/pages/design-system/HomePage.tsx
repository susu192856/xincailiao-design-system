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
  if (type === "restraint") {
    return (
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M27 9L45 27L27 45L9 27L27 9Z" stroke="#1A1A1A" strokeWidth="2" strokeLinejoin="miter" />
        <path d="M30 27H42" stroke="#FF112D" strokeWidth="2" />
      </svg>
    );
  }
  if (type === "clarity") {
    return (
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M10 31H18L24 18L32 39L38 27H44" stroke="#1A1A1A" strokeWidth="2" strokeLinejoin="miter" />
        <path d="M39 27H46" stroke="#FF112D" strokeWidth="2" />
      </svg>
    );
  }
  if (type === "trust") {
    return (
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M27 10L41 16V27C41 36 35.5 42 27 45C18.5 42 13 36 13 27V16L27 10Z" stroke="#1A1A1A" strokeWidth="2" />
        <path d="M21 27L25 31L34 22" stroke="#1A1A1A" strokeWidth="2" />
        <rect x="37" y="15" width="4" height="4" fill="#FF112D" />
      </svg>
    );
  }
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
      <path d="M27 9V18" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M27 36V45" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M9 27H18" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M36 27H45" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M14.3 14.3L20.7 20.7" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M33.3 33.3L39.7 39.7" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M39.7 14.3L33.3 20.7" stroke="#1A1A1A" strokeWidth="2" />
      <path d="M20.7 33.3L14.3 39.7" stroke="#1A1A1A" strokeWidth="2" />
      <rect x="24" y="24" width="6" height="6" fill="#FF112D" />
    </svg>
  );
}

const principlesData = [
  {
    index: "01",
    title: "克制",
    type: "restraint" as const,
    points: [
      { label: "关键节点", text: "品牌红 #FF112D 只用于关键节点、激活状态、决策结果和重点提示，不做大面积装饰。" },
      { label: "主体聚焦", text: "界面应减少无关视觉噪音，让数据、流程和结论成为主体。" },
    ],
  },
  {
    index: "02",
    title: "清晰",
    type: "clarity" as const,
    points: [
      { label: "复杂业务", text: "面对数据空间、材库、AI应用等复杂业务，优先建立明确的信息层级。" },
      { label: "可预测路径", text: "通过稳定的版式结构和可预测的交互路径，帮助用户快速理解系统。" },
    ],
  },
  {
    index: "03",
    title: "可信",
    type: "trust" as const,
    points: [
      { label: "可靠结构", text: "通过稳定结构、明确边界、状态反馈和权限标识，建立数据治理的可靠感。" },
      { label: "流程可追踪", text: "以流程追踪和链上存证感的视觉表达，传达数据流通与AI决策的可信。" },
    ],
  },
  {
    index: "04",
    title: "高效",
    type: "efficiency" as const,
    points: [
      { label: "专业用户", text: "面向材料工程师、工艺师、数据运营方和管理者等专业用户，减少无效步骤。" },
      { label: "结果前置", text: "将高频操作、关键指标和决策结果前置，让专业判断更快发生。" },
    ],
  },
];

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

export default function HomePage() {
  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="grid min-h-[460px] grid-cols-1 items-center gap-12 pt-8 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-sm border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--neutral-600)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand-600)]" />
            2026 · 新材道设计系统
          </div>
          <h1 className="mt-6 text-[2.75rem] font-semibold leading-[1.1] tracking-tight text-[var(--neutral-900)]">
            可信数据空间 · 统一设计语言
            <br />
            覆盖新材道全产品矩阵
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--neutral-600)]">
            本设计系统服务于新材道全产品矩阵，涵盖品牌官网门户、新材料可信数据空间、材库数据管理、
            材小模AI平台及智能选材等工具型产品。在统一的品牌识别和设计语言下，
            为不同产品类型和业务场景提供清晰、一致的视觉表达边界。
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {["新材料可信数据空间", "AI+材料", "工业数据治理"].map((tag) => (
              <span key={tag} className="rounded-sm border border-[var(--neutral-200)] bg-white px-3 py-1.5 text-sm text-[var(--neutral-700)]">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
          <div className="mb-5 flex items-center border-b border-[var(--neutral-200)] pb-4">
            <img src={xincailiaoLogo} alt="新材道 XINCAILIAO" className="h-9 w-auto object-contain" />
          </div>
          <div className="space-y-3">
            {[
              ["Brand", "官网门户 / 品牌传播", "bg-[var(--brand-600)]"],
              ["Product", "数据空间 / 材库 / AI 工具", "bg-[var(--product-blue-500)]"],
              ["System", "后台配置 / 管理系统", "bg-[var(--neutral-900)]"],
            ].map(([title, description, color]) => (
              <div key={title} className="flex items-center gap-3 rounded-sm bg-[var(--neutral-50)] px-4 py-4">
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

      {/* Design Objectives */}
      <section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">
              Objective
            </p>
            <h2 className="text-3xl font-semibold text-[var(--neutral-900)]">设计目标</h2>
          </div>
          <div className="hidden h-px flex-1 bg-[var(--neutral-200)] md:block" />
        </div>
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              title: "建立统一的「视觉DNA」",
              description: "将品牌心智转化为可执行的代码级规范，覆盖官网、数据空间、材库、材小模等全线产品",
              icon: <Dna size={20} />,
            },
            {
              title: "精准区分与快速搭建",
              description: "在同一套规范下，快速拼装品牌叙事、数据服务、专业工具、系统管理四层产品",
              icon: <StackPlus size={20} />,
            },
            {
              title: "高还原度交付",
              description: "设计规范即验收标准，Figma 组件与开发实现保持同一套 Token 体系",
              icon: <FigmaLogo size={20} />,
            },
            {
              title: "持续迭代与同步",
              description: "Token 由 Codex 维护，自动生成 .md 文档、Figma tokens 和部署网站",
              icon: <FlowArrow size={20} />,
            },
          ].map((item) => (
            <li key={item.title} className="rounded-sm border border-[var(--neutral-200)] bg-white p-5">
              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-sm border border-[var(--neutral-200)] text-[var(--neutral-900)]">
                {item.icon}
              </div>
              <div className="text-sm leading-relaxed text-[var(--neutral-600)]">
                <span className="mb-1 block font-semibold text-[var(--neutral-900)]">{item.title}</span>
                {item.description}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* Design Principles */}
      <section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">
              Principles
            </p>
            <h2 className="text-3xl font-semibold text-[var(--neutral-900)]">设计原则</h2>
          </div>
          <div className="hidden h-px flex-1 bg-[var(--neutral-200)] md:block" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {principlesData.map((principle) => (
            <div
              key={principle.title}
              className="group relative min-h-[240px] overflow-hidden rounded-sm border border-[var(--neutral-200)] bg-white p-6"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-[var(--neutral-900)]" />
              <div className="absolute right-0 top-0 h-0.5 w-16 bg-[var(--brand-600)]" />
              <div className="absolute right-6 top-6 font-mono text-5xl font-semibold leading-none text-[var(--neutral-100)]">
                {principle.index}
              </div>
              <div className="relative flex h-full flex-col">
                <div className="mb-5 flex h-12 w-12 items-center justify-center">
                  <PrincipleIcon type={principle.type} />
                </div>
                <h3 className="text-2xl font-semibold text-[var(--neutral-900)]">{principle.title}</h3>
                <div className="mt-4 space-y-4">
                  {principle.points.map((point) => (
                    <div key={point.label} className="grid gap-2 md:grid-cols-[96px_minmax(0,1fr)]">
                      <div className="text-sm font-semibold text-[var(--neutral-900)]">{point.label}</div>
                      <p className="text-sm leading-6 text-[var(--neutral-600)]">{point.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Product Layers */}
      <section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">
              Product Layers
            </p>
            <h2 className="text-3xl font-semibold text-[var(--neutral-900)]">产品分层</h2>
          </div>
          <div className="hidden h-px flex-1 bg-[var(--neutral-200)] md:block" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {productLayers.map((layer) => (
            <div key={layer.title} className="rounded-sm border border-[var(--neutral-200)] bg-white p-6">
              <h3 className="text-lg font-semibold text-[var(--neutral-900)]">{layer.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-6 text-[var(--neutral-600)]">{layer.feature}</p>
              <div className="mb-3 mt-4">
                <h4 className="mb-1 text-xs font-semibold text-[var(--neutral-700)]">设计重点</h4>
                <p className="text-sm text-[var(--neutral-600)]">{layer.focus}</p>
              </div>
              <div className="border-t border-[var(--neutral-200)] pt-3">
                <h4 className="mb-2 text-xs font-semibold text-[var(--neutral-700)]">对应产品</h4>
                <div className="flex flex-wrap gap-2">
                  {layer.products.map((product) => (
                    <span
                      key={product}
                      className="rounded-sm border border-[var(--brand-200)] bg-[var(--brand-50)] px-3 py-1 text-xs font-normal text-[var(--brand-700)]"
                    >
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
