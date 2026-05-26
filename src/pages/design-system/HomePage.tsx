import { Link } from "react-router-dom";
import {
  ArrowRight,
  BookOpen,
  Code,
  Dna,
  FigmaLogo,
  FlowArrow,
  StackPlus,
} from "@phosphor-icons/react";
import xincailiaoLogo from "../../assets/xincailiao-logo-horizontal.png";

function PrincipleIcon({ type }: { type: "restraint" | "clarity" | "trust" | "efficiency" }) {
  if (type === "restraint") {
    return (
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M27 9L45 27L27 45L9 27L27 9Z" stroke="#1A1D21" strokeWidth="2" strokeLinejoin="miter" />
        <path d="M30 27H42" stroke="#FF112D" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "clarity") {
    return (
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M10 31H18L24 18L32 39L38 27H44" stroke="#1A1D21" strokeWidth="2" strokeLinejoin="miter" />
        <path d="M39 27H46" stroke="#FF112D" strokeWidth="2" />
      </svg>
    );
  }

  if (type === "trust") {
    return (
      <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
        <path d="M27 10L41 16V27C41 36 35.5 42 27 45C18.5 42 13 36 13 27V16L27 10Z" stroke="#1A1D21" strokeWidth="2" />
        <path d="M21 27L25 31L34 22" stroke="#1A1D21" strokeWidth="2" />
        <rect x="37" y="15" width="4" height="4" fill="#FF112D" />
      </svg>
    );
  }

  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" aria-hidden="true">
      <path d="M27 9V18" stroke="#1A1D21" strokeWidth="2" />
      <path d="M27 36V45" stroke="#1A1D21" strokeWidth="2" />
      <path d="M9 27H18" stroke="#1A1D21" strokeWidth="2" />
      <path d="M36 27H45" stroke="#1A1D21" strokeWidth="2" />
      <path d="M14.3 14.3L20.7 20.7" stroke="#1A1D21" strokeWidth="2" />
      <path d="M33.3 33.3L39.7 39.7" stroke="#1A1D21" strokeWidth="2" />
      <path d="M39.7 14.3L33.3 20.7" stroke="#1A1D21" strokeWidth="2" />
      <path d="M20.7 33.3L14.3 39.7" stroke="#1A1D21" strokeWidth="2" />
      <rect x="24" y="24" width="6" height="6" fill="#FF112D" />
    </svg>
  );
}

function BusinessVisualIcon({ type }: { type: "space" | "material" | "ai" }) {
  if (type === "space") {
    return (
      <svg width="64" height="52" viewBox="0 0 88 72" fill="none" aria-hidden="true">
        <rect x="10" y="14" width="20" height="16" stroke="#1A1D21" strokeWidth="1.5" />
        <rect x="58" y="14" width="20" height="16" stroke="#1A1D21" strokeWidth="1.5" />
        <rect x="34" y="42" width="20" height="16" stroke="#1A1D21" strokeWidth="1.5" />
        <path d="M30 22H58" stroke="#1A1D21" strokeWidth="1.5" />
        <path d="M44 30V42" stroke="#1A1D21" strokeWidth="1.5" />
        <rect x="42" y="20" width="4" height="4" fill="#FF112D" />
      </svg>
    );
  }

  if (type === "material") {
    return (
      <svg width="64" height="52" viewBox="0 0 88 72" fill="none" aria-hidden="true">
        <path d="M44 10L72 58H16L44 10Z" stroke="#1A1D21" strokeWidth="1.5" />
        <path d="M44 10V58" stroke="#1A1D21" strokeWidth="1.5" />
        <path d="M16 58L44 34L72 58" stroke="#1A1D21" strokeWidth="1.5" />
        <circle cx="44" cy="10" r="3" fill="#1A1D21" />
        <circle cx="16" cy="58" r="3" fill="#1A1D21" />
        <circle cx="72" cy="58" r="3" fill="#1A1D21" />
        <circle cx="44" cy="34" r="3" fill="#FF112D" />
      </svg>
    );
  }

  return (
    <svg width="64" height="52" viewBox="0 0 88 72" fill="none" aria-hidden="true">
      <path d="M10 52C20 24 31 48 42 31C52 16 61 20 78 12" stroke="#1A1D21" strokeWidth="1.5" />
      <path d="M12 58H78" stroke="#1A1D21" strokeWidth="1.5" />
      <path d="M12 18V58" stroke="#1A1D21" strokeWidth="1.5" />
      <rect x="56" y="34" width="18" height="14" stroke="#1A1D21" strokeWidth="1.5" />
      <path d="M61 41H69" stroke="#FF112D" strokeWidth="1.5" />
      <circle cx="42" cy="31" r="3" fill="#FF112D" />
    </svg>
  );
}

export default function HomePage() {
  const quickLinks = [
    { title: "色彩系统", path: "/design-system/colors" },
    { title: "字体系统", path: "/typography" },
    { title: "图标系统", path: "/icon" },
    { title: "布局系统", path: "/layout" },
    { title: "间距系统", path: "/spacing" },
    { title: "圆角系统", path: "/radius" },
    { title: "阴影系统", path: "/shadow" },
  ];

  const usageNotes = [
    {
      role: "设计师",
      description: "以 Figma 设计组件库为设计表达源",
    },
    {
      role: "前端",
      description: "以 Codex / GitHub 中的 src/components/ui 为代码组件源",
    },
    {
      role: "团队查看",
      description: "以当前网页文档站作为规范查阅入口",
    },
    {
      role: "新增规范",
      description: "先在 Codex 文档站补充，再同步到 Figma 组件库",
    },
  ];

  const principles = [
    {
      index: "01",
      title: "克制",
      type: "restraint" as const,
      points: [
        {
          label: "关键节点",
          text: "品牌红 #FF112D 只用于关键节点、激活状态、决策结果和重点提示，不做大面积装饰。",
        },
        {
          label: "主体聚焦",
          text: "界面应减少无关视觉噪音，让数据、流程和结论成为主体。",
        },
      ],
    },
    {
      index: "02",
      title: "清晰",
      type: "clarity" as const,
      points: [
        {
          label: "复杂业务",
          text: "面对数据空间、材库、AI应用等复杂业务，优先建立明确的信息层级。",
        },
        {
          label: "可预测路径",
          text: "通过稳定的版式结构和可预测的交互路径，帮助用户快速理解系统。",
        },
      ],
    },
    {
      index: "03",
      title: "可信",
      type: "trust" as const,
      points: [
        {
          label: "可靠结构",
          text: "通过稳定结构、明确边界、状态反馈和权限标识，建立数据治理的可靠感。",
        },
        {
          label: "流程可追踪",
          text: "以流程追踪和链上存证感的视觉表达，传达数据流通与AI决策的可信。",
        },
      ],
    },
    {
      index: "04",
      title: "高效",
      type: "efficiency" as const,
      points: [
        {
          label: "专业用户",
          text: "面向材料工程师、工艺师、数据运营方和管理者等专业用户，减少无效步骤。",
        },
        {
          label: "结果前置",
          text: "将高频操作、关键指标和决策结果前置，让专业判断更快发生。",
        },
      ],
    },
  ];

  const businessMappings = [
    {
      title: "数据空间",
      subtitle: "规则与可信流通",
      grammar: "结构语法",
      type: "space" as const,
      keywords: ["边界", "权限", "合约", "流程", "存证"],
      description: "使用稳定栅格、清晰边界、流程节点、状态标签和审计时间线，表达数据流通的可控、可追溯与可信。",
    },
    {
      title: "材库",
      subtitle: "数据加工与生产系统",
      grammar: "关系语法",
      type: "material" as const,
      keywords: ["节点", "图谱", "四面体", "标准化", "数据关联"],
      description: "使用点线关系、目录树、数据图谱、材料四面体和结构化卡片，表达材料数据从原始信息到可计算资产的过程。",
    },
    {
      title: "AI应用",
      subtitle: "材料决策系统",
      grammar: "推演语法",
      type: "ai" as const,
      keywords: ["曲线", "预测", "优化", "推荐", "决策结果"],
      description: "使用曲线变化、参数面板、结果推荐卡、优化路径和风险提示，表达AI参与材料研发、生产与业务判断的过程。",
    },
  ];

  return (
    <div className="space-y-20">
      <section className="grid min-h-[520px] grid-cols-1 items-center gap-12 border-b border-zinc-200 pb-16 lg:grid-cols-[minmax(0,1fr)_440px]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-[2px] border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-600">
            <span className="h-1.5 w-1.5 bg-[#FF112D]" />
            2026 Design System
          </div>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] text-zinc-950 lg:text-6xl">
            设计系统
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-600">
            本规范用于统一新材道在品牌传播、官网门户、产品展示、业务系统及日常对外物料中的基础视觉表达。其目标不是限制所有界面呈现为同一种样式，而是在统一品牌识别、视觉气质和设计语言的前提下，为不同产品类型和应用场景提供明确的表达边界。
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            {["可信秩序", "数据资产", "智能决策"].map((item) => (
              <span key={item} className="rounded-[2px] border border-zinc-200 bg-white px-4 py-2 text-sm text-zinc-700">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="relative rounded-[2px] bg-white p-6">
          <div className="mb-8 flex items-center justify-between border-b border-zinc-200 pb-4">
            <div>
              <img
                src={xincailiaoLogo}
                alt="新材道 XINCAILIAO"
                className="h-10 w-auto object-contain"
              />
            </div>
          </div>

          <div className="space-y-4">
            {[
              ["Brand", "品牌传播 / 官网门户", "bg-[#FF112D]"],
              ["Product", "产品展示 / 业务系统", "bg-[#006DEA]"],
              ["System", "组件规范 / 对外物料", "bg-zinc-900"],
            ].map(([title, description, color]) => (
              <div key={title} className="flex items-center gap-4 rounded-[2px] bg-zinc-50 px-5 py-5">
                <span className={`h-3 w-3 flex-shrink-0 ${color}`} />
                <div>
                  <div className="font-mono text-xs text-zinc-500">{title}</div>
                  <div className="mt-1 text-sm font-medium text-zinc-900">{description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Business Visual Mapping
            </p>
            <h2 className="text-3xl font-semibold text-zinc-950">业务视觉映射</h2>
          </div>
          <div className="hidden h-px flex-1 bg-zinc-200 md:block" />
        </div>
        <p className="mb-6 max-w-4xl text-sm leading-7 text-zinc-600">
          新材道设计系统服务于“规则、数据、决策”三类核心业务场景。视觉语言需要分别表达可信数据空间的秩序感、材库的数据关系能力，以及AI应用的推演与决策能力。
        </p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {businessMappings.map((item) => (
            <div key={item.title} className="relative overflow-hidden rounded-[2px] bg-white p-6">
              <div className="mb-6 flex items-start justify-between gap-5">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[0.18em] text-zinc-500">{item.grammar}</div>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-950">{item.title}</h3>
                  <p className="mt-1 text-sm font-medium text-zinc-600">{item.subtitle}</p>
                </div>
                <BusinessVisualIcon type={item.type} />
              </div>

              <div className="mb-5 flex flex-wrap gap-2">
                {item.keywords.map((keyword) => (
                  <span key={keyword} className="rounded-[2px] border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-xs font-normal text-zinc-700">
                    {keyword}
                  </span>
                ))}
              </div>

              <p className="text-sm leading-6 text-zinc-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Principles
            </p>
            <h2 className="text-3xl font-semibold text-zinc-950">设计原则</h2>
          </div>
          <div className="hidden h-px flex-1 bg-zinc-200 md:block" />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {principles.map((principle) => (
            <div
              key={principle.title}
              className="group relative min-h-[260px] overflow-hidden rounded-[2px] bg-white p-6"
            >
              <div className="absolute inset-x-0 top-0 h-0.5 bg-zinc-900" />
              <div className="absolute right-0 top-0 h-0.5 w-16 bg-[#FF112D]" />
              <div className="absolute right-6 top-6 font-mono text-5xl font-semibold leading-none text-zinc-100 transition-colors group-hover:text-zinc-200">
                {principle.index}
              </div>

              <div className="relative flex h-full flex-col">
                <div className="mb-5 flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center">
                    <PrincipleIcon type={principle.type} />
                  </div>
                </div>

                <h3 className="text-2xl font-semibold text-zinc-950">{principle.title}</h3>

                <div className="mt-4 space-y-4">
                  {principle.points.map((point) => (
                    <div key={point.label} className="grid gap-2 md:grid-cols-[96px_minmax(0,1fr)]">
                      <div className="text-sm font-semibold text-zinc-900">{point.label}</div>
                      <p className="text-sm leading-6 text-zinc-600">{point.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Objective
            </p>
            <h2 className="text-3xl font-semibold text-zinc-950">设计目标</h2>
          </div>
          <div className="hidden h-px flex-1 bg-zinc-200 md:block" />
        </div>
        <div>
          <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {[
              {
                title: "建立统一的\"视觉DNA\"",
                description: "将品牌心智转化为可执行的代码级规范，确保全局一改全改",
                icon: <Dna size={20} />,
              },
              {
                title: "精准区分与快速搭建",
                description: "在同一套规范下，快速拼装出四层产品的不同形态",
                icon: <StackPlus size={20} />,
              },
              {
                title: "高还原度交付",
                description: "规范即文档，Figma原型直接成为开发的验收标准",
                icon: <FigmaLogo size={20} />,
              },
              {
                title: "高效迭代与协作",
                description: "这套规范是活的系统，能够持续生长和演进",
                icon: <FlowArrow size={20} />,
              },
            ].map((item) => {
              const { title, description, icon } = item;
              return (
                <li key={title} className="rounded-[2px] bg-white p-5">
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[2px] border border-zinc-200 bg-white text-zinc-900">
                    {icon}
                  </div>
                  <div className="text-sm leading-relaxed text-zinc-700">
                    <span className="mb-1 block font-bold text-zinc-900">{title}</span>
                    {description}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Product Layers
            </p>
            <h2 className="text-3xl font-semibold text-zinc-950">产品分层</h2>
          </div>
          <div className="hidden h-px flex-1 bg-zinc-200 md:block" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
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
          ].map((layer) => (
            <div key={layer.title} className="rounded-[2px] bg-white p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-zinc-900">{layer.title}</h3>
                <p className="mt-2 max-w-xl text-sm leading-6 text-zinc-600">{layer.feature}</p>
              </div>

              <div className="mb-4">
                <div>
                  <h4 className="mb-1 text-xs font-semibold text-zinc-700">设计重点</h4>
                  <p className="text-sm text-zinc-600">{layer.focus}</p>
                </div>
              </div>

              <div className="border-t border-zinc-200 pt-3">
                <h4 className="mb-2 text-xs font-semibold text-zinc-700">对应产品</h4>
                <div className="flex flex-wrap gap-2">
                  {layer.products.map((product) => (
                    <span
                      key={product}
                      className="rounded-[2px] border border-[#FFCCD2] bg-[#FFF2F3] px-3 py-1 text-xs font-normal text-[#D90E26]"
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

      <section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Workflow
            </p>
            <h2 className="text-3xl font-semibold text-zinc-950">使用说明</h2>
          </div>
          <div className="hidden h-px flex-1 bg-zinc-200 md:block" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {usageNotes.map((note) => (
            <div
              key={note.role}
              className="rounded-[2px] bg-white p-6 text-sm"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-[2px] border border-zinc-200 text-zinc-900">
                {note.role === "设计师" ? <FigmaLogo size={20} /> : note.role === "前端" ? <Code size={20} /> : <BookOpen size={20} />}
              </div>
              <div className="font-semibold text-zinc-900">{note.role}</div>
              <div className="mt-2 leading-relaxed text-zinc-600">{note.description}</div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Start Here
            </p>
            <h2 className="text-3xl font-semibold text-zinc-950">快速入口</h2>
          </div>
          <div className="hidden h-px flex-1 bg-zinc-200 md:block" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="group flex items-center justify-between rounded-[2px] bg-white p-5 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              <span>{link.title}</span>
              <ArrowRight size={16} className="text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-zinc-900" />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
