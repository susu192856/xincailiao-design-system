import type { ReactNode } from "react";
import ColorScaleGrid from "../../components/docs/ColorScaleGrid";
import CopyableColorValue from "../../components/docs/CopyableColorValue";
import { SectionHeading } from "../../components/docs/ComponentDoc";
import PageHeader from "../../components/docs/PageHeader";

type ColorToken = {
  name: string;
  hex: string;
  label: string;
};

type SemanticColor = {
  name: string;
  label: string;
  text: string;
  background: string;
  tag: string;
  usage: string;
};

type DataColor = {
  name: string;
  hex: string;
  usage: string;
};

const colorRoles = [
  {
    name: "品牌红",
    hex: "#FF112D",
    token: "brand-600",
    role: "品牌识别、关键状态、当前选中、重点强调",
    usage: "小面积精确使用，不做大面积铺色",
  },
  {
    name: "产品蓝",
    hex: "#006DEA",
    token: "product-blue-500",
    role: "链接、信息提示、科技感辅助、交互态",
    usage: "不与品牌红形成高饱和冲突",
  },
  {
    name: "中性黑",
    hex: "#1A1A1A",
    token: "neutral-900",
    role: "主标题、核心文本、主要操作按钮",
    usage: "保持高级、稳定、理性的视觉基调",
  },
];

function ColorChip({ color, label }: { color: string; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-8 w-8 border border-[var(--neutral-200)] bg-white" style={{ backgroundColor: color }} />
      <CopyableColorValue value={color} display={label ?? color} className="whitespace-nowrap" />
    </div>
  );
}

function RoleCard({
  eyebrow,
  title,
  color,
  hex,
  description,
  items,
}: {
  eyebrow: string;
  title: string;
  color: string;
  hex: string;
  description: string;
  items: string[];
}) {
  return (
    <div className="bg-white p-6">
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">{eyebrow}</p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">{title}</h3>
          <p className="mt-3 max-w-[34rem] text-sm leading-7 text-[var(--neutral-600)]">{description}</p>
        </div>
        <span className="mt-1 h-2 w-2" style={{ backgroundColor: color }} />
      </div>
      <div className="mb-6 bg-[var(--neutral-50)] p-3">
        <div className="flex h-24 items-center justify-center" style={{ backgroundColor: color }}>
          <button
            type="button"
            className="font-mono text-sm font-semibold text-white"
            onClick={() => navigator.clipboard.writeText(hex)}
            title={`复制 ${hex}`}
          >
            {hex}
          </button>
        </div>
      </div>
      <div className="space-y-3 text-sm text-[var(--neutral-700)]">
        {items.map((item) => (
          <div key={item} className="grid gap-2 md:grid-cols-[80px_1fr]">
            <span className="font-semibold text-[var(--neutral-900)]">{item.split("：")[0]}</span>
            <span className="leading-6 text-[var(--neutral-600)]">{item.split("：").slice(1).join("：")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataColorCard({ color }: { color: DataColor }) {
  return (
    <div className="bg-white p-4">
      <div className="mb-3 h-14" style={{ backgroundColor: color.hex }} />
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-mono text-sm font-semibold text-[var(--neutral-900)]">{color.name}</h3>
          <p className="mt-1 text-xs leading-5 text-[var(--neutral-500)]">{color.usage}</p>
        </div>
        <CopyableColorValue value={color.hex} />
      </div>
    </div>
  );
}

function CopySvgButton({ svg }: { svg: string }) {
  return (
    <button
      type="button"
      className="text-xs font-medium text-[var(--neutral-500)] transition-colors hover:text-[var(--neutral-900)]"
      onClick={() => navigator.clipboard.writeText(svg)}
    >
      复制 SVG
    </button>
  );
}

function ChartExampleCard({
  eyebrow,
  title,
  description,
  svg,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  svg: string;
  children: ReactNode;
}) {
  return (
    <div className="bg-white p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">{eyebrow}</p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">{title}</h3>
        </div>
        <CopySvgButton svg={svg} />
      </div>
      <div className="bg-[var(--neutral-50)] p-4">{children}</div>
      <p className="mt-4 text-sm leading-6 text-[var(--neutral-600)]">{description}</p>
    </div>
  );
}

function LineChartExample() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300">
  <rect width="560" height="300" fill="#F7F8FA"/>
  <g stroke="#E6E9EE" stroke-width="1">
    <line x1="64" y1="48" x2="520" y2="48"/>
    <line x1="64" y1="96" x2="520" y2="96"/>
    <line x1="64" y1="144" x2="520" y2="144"/>
    <line x1="64" y1="192" x2="520" y2="192"/>
    <line x1="64" y1="240" x2="520" y2="240"/>
  </g>
  <g stroke="#97A0AD" stroke-width="1.5">
    <line x1="64" y1="240" x2="520" y2="240"/>
    <line x1="64" y1="40" x2="64" y2="240"/>
  </g>
  <path d="M64 204 C126 164 160 176 216 126 S336 84 392 110 S476 148 520 76" fill="none" stroke="#006DEA" stroke-width="3"/>
  <path d="M64 218 C120 202 174 192 226 174 S330 134 386 146 S474 170 520 140" fill="none" stroke="#14B8A6" stroke-width="3"/>
  <path d="M64 160 C122 178 174 118 230 136 S342 208 398 168 S474 96 520 116" fill="none" stroke="#8B5CF6" stroke-width="3"/>
  <line x1="64" y1="118" x2="520" y2="118" stroke="#F59E0B" stroke-width="2" stroke-dasharray="6 6"/>
</svg>`;

  return (
    <ChartExampleCard
      eyebrow="Line Chart"
      title="曲线图"
      svg={svg}
      description="适合趋势、预测和材料参数变化。建议 2-4 条主曲线，阈值线使用警戒色并保持虚线。"
    >
      <svg viewBox="0 0 560 300" className="h-auto w-full" role="img" aria-label="曲线图数据色示例">
        <rect width="560" height="300" fill="#F7F8FA" />
        <g stroke="#E6E9EE" strokeWidth="1">
          {[48, 96, 144, 192, 240].map((y) => (
            <line key={y} x1="64" y1={y} x2="520" y2={y} />
          ))}
        </g>
        <g stroke="#97A0AD" strokeWidth="1.5">
          <line x1="64" y1="240" x2="520" y2="240" />
          <line x1="64" y1="40" x2="64" y2="240" />
        </g>
        <g className="font-mono text-[11px] fill-[var(--neutral-500)]">
          <text x="34" y="52">100</text>
          <text x="40" y="148">50</text>
          <text x="47" y="244">0</text>
          {["Q1", "Q2", "Q3", "Q4", "Now"].map((label, index) => (
            <text key={label} x={60 + index * 112} y="272">{label}</text>
          ))}
        </g>
        <path d="M64 204 C126 164 160 176 216 126 S336 84 392 110 S476 148 520 76" fill="none" stroke="#006DEA" strokeWidth="3" />
        <path d="M64 218 C120 202 174 192 226 174 S330 134 386 146 S474 170 520 140" fill="none" stroke="#14B8A6" strokeWidth="3" />
        <path d="M64 160 C122 178 174 118 230 136 S342 208 398 168 S474 96 520 116" fill="none" stroke="#8B5CF6" strokeWidth="3" />
        <line x1="64" y1="118" x2="520" y2="118" stroke="#F59E0B" strokeWidth="2" strokeDasharray="6 6" />
        {[
          ["模型A", "#006DEA", 352],
          ["模型B", "#14B8A6", 414],
          ["预测", "#8B5CF6", 476],
        ].map(([label, color, x]) => (
          <g key={label}>
            <rect x={Number(x)} y="24" width="10" height="10" fill={String(color)} />
            <text x={Number(x) + 16} y="34" className="text-[11px] font-medium fill-[var(--neutral-600)]">{label}</text>
          </g>
        ))}
      </svg>
    </ChartExampleCard>
  );
}

function DonutChartExample() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300">
  <rect width="560" height="300" fill="#F7F8FA"/>
  <g transform="translate(170 150) rotate(-90)">
    <circle r="72" fill="none" stroke="#006DEA" stroke-width="28" stroke-dasharray="142 452"/>
    <circle r="72" fill="none" stroke="#14B8A6" stroke-width="28" stroke-dasharray="104 452" stroke-dashoffset="-152"/>
    <circle r="72" fill="none" stroke="#8B5CF6" stroke-width="28" stroke-dasharray="78 452" stroke-dashoffset="-266"/>
    <circle r="72" fill="none" stroke="#F59E0B" stroke-width="28" stroke-dasharray="58 452" stroke-dashoffset="-354"/>
    <circle r="72" fill="none" stroke="#64748B" stroke-width="28" stroke-dasharray="40 452" stroke-dashoffset="-422"/>
  </g>
</svg>`;

  const legend = [
    ["数据空间", "32%", "#006DEA"],
    ["材库", "23%", "#14B8A6"],
    ["AI 应用", "17%", "#8B5CF6"],
    ["预警", "13%", "#F59E0B"],
    ["其他", "15%", "#64748B"],
  ];

  return (
    <ChartExampleCard
      eyebrow="Donut Chart"
      title="饼图 / 环图"
      svg={svg}
      description="适合占比表达。建议控制在 5 个以内分类，超过 5 个时合并为“其他”，避免全量彩虹色。"
    >
      <svg viewBox="0 0 560 300" className="h-auto w-full" role="img" aria-label="环图数据色示例">
        <rect width="560" height="300" fill="#F7F8FA" />
        <g transform="translate(168 150) rotate(-90)">
          <circle r="72" fill="none" stroke="#006DEA" strokeWidth="28" strokeDasharray="142 452" />
          <circle r="72" fill="none" stroke="#14B8A6" strokeWidth="28" strokeDasharray="104 452" strokeDashoffset="-152" />
          <circle r="72" fill="none" stroke="#8B5CF6" strokeWidth="28" strokeDasharray="78 452" strokeDashoffset="-266" />
          <circle r="72" fill="none" stroke="#F59E0B" strokeWidth="28" strokeDasharray="58 452" strokeDashoffset="-354" />
          <circle r="72" fill="none" stroke="#64748B" strokeWidth="28" strokeDasharray="40 452" strokeDashoffset="-422" />
        </g>
        <circle cx="168" cy="150" r="45" fill="#F7F8FA" />
        <text x="168" y="145" textAnchor="middle" className="text-lg font-semibold fill-[var(--neutral-900)]">5</text>
        <text x="168" y="168" textAnchor="middle" className="text-xs fill-[var(--neutral-500)]">类数据</text>
        {legend.map(([label, value, color], index) => (
          <g key={label} transform={`translate(310 ${74 + index * 36})`}>
            <rect width="12" height="12" fill={color} />
            <text x="22" y="11" className="text-sm font-medium fill-[var(--neutral-700)]">{label}</text>
            <text x="162" y="11" textAnchor="end" className="text-sm font-mono fill-[var(--neutral-500)]">{value}</text>
          </g>
        ))}
      </svg>
    </ChartExampleCard>
  );
}

function BarChartExample() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300">
  <rect width="560" height="300" fill="#F7F8FA"/>
  <g stroke="#E6E9EE" stroke-width="1">
    <line x1="64" y1="58" x2="520" y2="58"/>
    <line x1="64" y1="104" x2="520" y2="104"/>
    <line x1="64" y1="150" x2="520" y2="150"/>
    <line x1="64" y1="196" x2="520" y2="196"/>
    <line x1="64" y1="242" x2="520" y2="242"/>
  </g>
  <g stroke="#97A0AD" stroke-width="1.5">
    <line x1="64" y1="242" x2="520" y2="242"/>
    <line x1="64" y1="50" x2="64" y2="242"/>
  </g>
  <rect x="92" y="122" width="42" height="120" fill="#006DEA"/>
  <rect x="164" y="92" width="42" height="150" fill="#14B8A6"/>
  <rect x="236" y="144" width="42" height="98" fill="#8B5CF6"/>
  <rect x="308" y="72" width="42" height="170" fill="#F59E0B"/>
  <rect x="380" y="108" width="42" height="134" fill="#10B981"/>
  <rect x="452" y="164" width="42" height="78" fill="#64748B"/>
</svg>`;

  return (
    <ChartExampleCard
      eyebrow="Bar Chart"
      title="柱状图"
      svg={svg}
      description="适合分类对比。单系列优先同一主色；多系列再启用对比色，数量控制在 6 色以内。"
    >
      <svg viewBox="0 0 560 300" className="h-auto w-full" role="img" aria-label="柱状图数据色示例">
        <rect width="560" height="300" fill="#F7F8FA" />
        <g stroke="#E6E9EE" strokeWidth="1">
          {[58, 104, 150, 196, 242].map((y) => (
            <line key={y} x1="64" y1={y} x2="520" y2={y} />
          ))}
        </g>
        <g stroke="#97A0AD" strokeWidth="1.5">
          <line x1="64" y1="242" x2="520" y2="242" />
          <line x1="64" y1="50" x2="64" y2="242" />
        </g>
        <g className="font-mono text-[11px] fill-[var(--neutral-500)]">
          <text x="34" y="62">100</text>
          <text x="40" y="154">50</text>
          <text x="47" y="246">0</text>
        </g>
        {[
          ["空间", 92, 122, 120, "#006DEA"],
          ["材库", 164, 92, 150, "#14B8A6"],
          ["模型", 236, 144, 98, "#8B5CF6"],
          ["预警", 308, 72, 170, "#F59E0B"],
          ["完成", 380, 108, 134, "#10B981"],
          ["其他", 452, 164, 78, "#64748B"],
        ].map(([label, x, y, h, color]) => (
          <g key={label}>
            <rect x={Number(x)} y={Number(y)} width="42" height={Number(h)} fill={String(color)} />
            <text x={Number(x) + 21} y="270" textAnchor="middle" className="text-[11px] fill-[var(--neutral-500)]">{label}</text>
          </g>
        ))}
      </svg>
    </ChartExampleCard>
  );
}

function CoreRuleRow({
  semantic,
  variable,
  website,
  backend,
  usage,
}: {
  semantic: string;
  variable: string;
  website: { color: string; display: string };
  backend: { color: string; display: string };
  usage: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 border-b border-[var(--neutral-100)] px-5 py-5 text-sm last:border-b-0 lg:grid-cols-[150px_180px_190px_190px_minmax(0,1fr)] lg:items-center">
      <div>
        <h3 className="font-semibold text-[var(--neutral-900)]">{semantic}</h3>
      </div>
      <div className="font-mono text-xs text-[var(--neutral-500)]">{variable}</div>
      <div>
        <p className="mb-2 text-xs font-semibold text-[var(--neutral-500)] lg:hidden">官网/门户</p>
        <ColorChip color={website.color} label={website.display} />
      </div>
      <div>
        <p className="mb-2 text-xs font-semibold text-[var(--neutral-500)] lg:hidden">后台产品</p>
        <ColorChip color={backend.color} label={backend.display} />
      </div>
      <p className="text-sm leading-6 text-[var(--neutral-600)]">{usage}</p>
    </div>
  );
}

function SemanticCard({ color }: { color: SemanticColor }) {
  return (
    <div className="bg-white p-5">
      <div className="mb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">{color.name}</p>
        <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">{color.label}</h3>
        <p className="mt-2 text-sm leading-6 text-[var(--neutral-600)]">{color.usage}</p>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-[var(--neutral-500)]">文字色</span>
          <ColorChip color={color.text} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-[var(--neutral-500)]">背景</span>
          <ColorChip color={color.background} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-xs text-[var(--neutral-500)]">标签</span>
          <ColorChip color={color.tag} />
        </div>
      </div>
    </div>
  );
}

export default function ColorsPage() {
  const brandColors: ColorToken[] = [
    { name: "brand-50", hex: "#FFF2F3", label: "最浅背景" },
    { name: "brand-100", hex: "#FFE4E7", label: "浅背景" },
    { name: "brand-200", hex: "#FFCCD2", label: "辅助强调" },
    { name: "brand-300", hex: "#FF9AA6", label: "装饰描边" },
    { name: "brand-400", hex: "#FF6677", label: "悬停辅助" },
    { name: "brand-500", hex: "#FF3D52", label: "悬停" },
    { name: "brand-600", hex: "#FF112D", label: "品牌主色" },
    { name: "brand-700", hex: "#D90E26", label: "点击" },
    { name: "brand-800", hex: "#B30C1F", label: "深色文字" },
    { name: "brand-900", hex: "#8C0918", label: "极深装饰" },
  ];

  const productColors: ColorToken[] = [
    { name: "product-blue-50", hex: "#EDF5FF", label: "页面浅背景" },
    { name: "product-blue-100", hex: "#D9EBFF", label: "信息背景" },
    { name: "product-blue-200", hex: "#B8D8FF", label: "弱强调" },
    { name: "product-blue-300", hex: "#8BBEFF", label: "浅交互态" },
    { name: "product-blue-400", hex: "#5A9FFF", label: "辅助功能" },
    { name: "product-blue-500", hex: "#006DEA", label: "功能主色" },
    { name: "product-blue-600", hex: "#0058C2", label: "Hover" },
    { name: "product-blue-700", hex: "#00449A", label: "Active" },
    { name: "product-blue-800", hex: "#00306F", label: "深色重点" },
    { name: "product-blue-900", hex: "#001D47", label: "深色背景" },
  ];

  const neutralColors: ColorToken[] = [
    { name: "neutral-50", hex: "#F7F8FA", label: "页面底色/大面积背景" },
    { name: "neutral-100", hex: "#F1F3F5", label: "卡片背景/浅容器" },
    { name: "neutral-200", hex: "#E6E9EE", label: "分割线/弱边框" },
    { name: "neutral-300", hex: "#D5DAE1", label: "输入框边框/Disabled" },
    { name: "neutral-400", hex: "#B8C0CC", label: "Placeholder/辅助信息" },
    { name: "neutral-500", hex: "#97A0AD", label: "次级文字/图标" },
    { name: "neutral-600", hex: "#6F7785", label: "正文辅助文字" },
    { name: "neutral-700", hex: "#4B5563", label: "次标题/导航文字" },
    { name: "neutral-800", hex: "#2B313A", label: "主正文/深色UI文字" },
    { name: "neutral-900", hex: "#1A1A1A", label: "标题/主按钮/深背景" },
  ];

  const semanticColors: SemanticColor[] = [
    { name: "success", text: "#10B981", background: "#D1FAE5", tag: "#A7F3D0", label: "成功状态", usage: "用于保存成功、流程完成、校验通过等正向反馈。" },
    { name: "warning", text: "#F59E0B", background: "#FEF3C7", tag: "#FDE68A", label: "警告提示", usage: "用于风险提示、临界状态、需要用户关注但未阻断的情况。" },
    { name: "error", text: "#EF4444", background: "#FEE2E2", tag: "#FECACA", label: "错误/危险", usage: "用于删除、失败、不可逆风险操作，不等同于品牌红。" },
    { name: "info", text: "#006DEA", background: "#DBEAFE", tag: "#BFDBFE", label: "信息提示", usage: "用于系统提示、链接信息、普通通知和可交互提示。" },
  ];

  const dataColors: DataColor[] = [
    { name: "data-01", hex: "#006DEA", usage: "主数据序列" },
    { name: "data-02", hex: "#14B8A6", usage: "对比序列" },
    { name: "data-03", hex: "#8B5CF6", usage: "模型/算法" },
    { name: "data-04", hex: "#F59E0B", usage: "警戒/阈值" },
    { name: "data-05", hex: "#10B981", usage: "增长/完成" },
    { name: "data-06", hex: "#EF4444", usage: "风险/异常" },
    { name: "data-07", hex: "#64748B", usage: "基准/其他" },
    { name: "data-08", hex: "#0EA5E9", usage: "辅助蓝" },
    { name: "data-09", hex: "#A855F7", usage: "辅助紫" },
    { name: "data-10", hex: "#84CC16", usage: "正向辅助" },
    { name: "data-11", hex: "#F97316", usage: "热度/阶段" },
    { name: "data-12", hex: "#475569", usage: "低强调序列" },
  ];

  const coreColorRules = [
    {
      semantic: "页面背景",
      website: { color: "#FFFFFF", display: "#FFFFFF" },
      backend: { color: "#F7F8FA", display: "neutral-50" },
      variable: "color/bg/page",
      usage: "官网/门户页面底色使用纯白，后台页面底色使用 neutral-50 承载高密度容器。",
    },
    {
      semantic: "容器/卡片",
      website: { color: "#FFFFFF", display: "#FFFFFF" },
      backend: { color: "#FFFFFF", display: "#FFFFFF" },
      variable: "color/bg/surface",
      usage: "卡片、弹窗、表单等容器统一使用白色，保持内容聚焦。",
    },
    {
      semantic: "弱背景/表头",
      website: { color: "#F7F8FA", display: "neutral-50" },
      backend: { color: "#F1F3F5", display: "neutral-100" },
      variable: "color/bg/subtle",
      usage: "官网保持轻量，后台通过 neutral-100 强化表头、字段区和分组层次。",
    },
    {
      semantic: "标题文字",
      website: { color: "#1A1A1A", display: "neutral-900" },
      backend: { color: "#1A1A1A", display: "neutral-900" },
      variable: "color/text/title",
      usage: "一级标题、模块标题和关键数据标题统一使用 neutral-900。",
    },
    {
      semantic: "主要正文",
      website: { color: "#2B313A", display: "neutral-800" },
      backend: { color: "#2B313A", display: "neutral-800" },
      variable: "color/text/primary",
      usage: "正文文字统一使用 neutral-800，保证阅读稳定性。",
    },
    {
      semantic: "辅助文字",
      website: { color: "#6F7785", display: "neutral-600" },
      backend: { color: "#6F7785", display: "neutral-600" },
      variable: "color/text/secondary",
      usage: "说明文字、次级信息、表格辅助字段使用 neutral-600。",
    },
    {
      semantic: "标准边框",
      website: { color: "#E6E9EE", display: "neutral-200" },
      backend: { color: "#D5DAE1", display: "neutral-300" },
      variable: "color/border/default",
      usage: "官网边框更轻，后台边框更明确，用于表格、输入框和高密度容器。",
    },
    {
      semantic: "主行动按钮",
      website: { color: "#1A1A1A", display: "neutral-900" },
      backend: { color: "#1A1A1A", display: "neutral-900" },
      variable: "color/action/primary",
      usage: "主行动优先使用 neutral-900，黑色承担最重要确认与提交。",
    },
    {
      semantic: "功能/品牌强调",
      website: { color: "#FF112D", display: "brand-600" },
      backend: { color: "#006DEA", display: "product-blue-500" },
      variable: "color/action/accent",
      usage: "官网关键转化可使用品牌红；后台功能操作、链接和焦点使用产品蓝。",
    },
  ];

  return (
    <div className="space-y-20">
      <PageHeader
        title="色彩系统"
        description="色彩系统用于建立新材道在品牌传播、数据空间、材库和 AI 应用中的统一视觉语义。品牌红 #FF112D 只用于品牌识别与关键强调，不替代错误色、不用于普通标签、不向后台操作泛化。产品蓝 #006DEA 承载功能操作，中性灰承载秩序和阅读。"
      />

      <section>
        <SectionHeading
          eyebrow="Color Roles"
          title="色彩角色"
          description="色彩角色用于快速建立颜色的业务分工：品牌红负责识别与关键节点，产品蓝负责功能交互，中性灰负责阅读秩序。"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {colorRoles.map((color) => (
            <div key={color.name} className="bg-white p-5">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-6 w-6 rounded-sm" style={{ backgroundColor: color.hex }} />
                <div>
                  <p className="text-sm font-semibold text-[var(--neutral-900)]">{color.name}</p>
                  <p className="font-mono text-[10px] text-[var(--neutral-500)]">
                    {color.token} · {color.hex}
                  </p>
                </div>
              </div>
              <p className="mb-2 text-xs leading-5 text-[var(--neutral-700)]">{color.role}</p>
              <p className="text-xs text-[var(--neutral-500)]">{color.usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Color Semantics"
          title="色彩语义模型"
          description="不要先从“好看”选择颜色，而要先判断颜色承担的业务语义：品牌识别、产品功能、信息层级或状态反馈。"
        />
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <RoleCard
            eyebrow="Brand Red"
            title="品牌红"
            color="#FF112D"
            hex="#FF112D"
            description="用于品牌识别、关键转化、关键节点和重点提示。它是视觉签名，不是后台常规操作色。"
            items={[
              "突出：Logo、品牌签名、官网关键转化",
              "克制：不做大面积背景，不参与普通信息层级竞争",
              "禁止：不要用品牌红替代错误色",
            ]}
          />
          <RoleCard
            eyebrow="Product Blue"
            title="产品蓝"
            color="#006DEA"
            hex="#006DEA"
            description="用于数据空间、材库、AI 应用和后台系统中的功能操作、链接、焦点和可交互状态。"
            items={[
              "突出：保存、筛选、下载、链接、焦点态",
              "克制：不把蓝色等同于次按钮",
              "边界：不用于品牌营销的主视觉表达",
            ]}
          />
          <RoleCard
            eyebrow="Neutral System"
            title="中性灰"
            color="#1A1A1A"
            hex="#1A1A1A"
            description="用于文字、背景、边框、分割线和主行动按钮，建立专业、稳定、可长期阅读的产品气质。"
            items={[
              "突出：标题、主正文、主行动、结构边界",
              "克制：用灰度建立层级，减少彩色噪音",
              "原则：复杂业务优先保证信息可读性",
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Core Rules"
          title="核心用色规则"
          description="同一语义在官网和后台中可以使用不同深浅，但必须保持角色一致：背景承载、文字阅读、边框分隔、行动触发。"
        />
        <div className="overflow-hidden bg-white">
          <div className="hidden grid-cols-[150px_180px_190px_190px_minmax(0,1fr)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-semibold text-[var(--neutral-500)] lg:grid">
            <div>语义</div>
            <div>变量</div>
            <div>官网/门户</div>
            <div>后台产品</div>
            <div>使用说明</div>
          </div>
          {coreColorRules.map((rule) => (
            <CoreRuleRow key={rule.semantic} {...rule} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Action Colors"
          title="行动色分工"
          description="按钮和可交互状态需要区分“视觉层级”和“业务语义”。黑色可以是主行动，蓝色是产品功能，红色只用于品牌关键节点。"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            ["主行动", "neutral-900", "#1A1A1A", "确认、提交、页面最重要操作。官网与后台都可使用。"],
            ["产品功能", "product-blue-500", "#006DEA", "保存、下载、筛选、链接、焦点态。主要用于业务系统。"],
            ["品牌强调", "brand-600", "#FF112D", "官网营销、品牌露出、关键转化。避免在后台常规操作中滥用。"],
          ].map(([title, token, color, usage]) => (
            <div key={title} className="bg-white p-6">
              <div className="mb-5 h-16" style={{ backgroundColor: color }} />
              <h3 className="text-lg font-semibold text-[var(--neutral-900)]">{title}</h3>
              <p className="mt-2 font-mono text-xs text-[var(--neutral-500)]">{token}</p>
              <p className="mt-4 text-sm leading-6 text-[var(--neutral-600)]">{usage}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Color Scales"
          title="色阶系统"
          description="色阶用于背景、悬停、按下、标签、弱强调等状态。优先使用已有 token，不临时创造相近色。"
        />
        <div className="space-y-10">
          <div>
            <div className="mb-4 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">Brand</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">品牌红色阶</h3>
              </div>
              <span className="h-2 w-2 bg-[var(--brand-600)]" />
            </div>
            <div className="overflow-x-auto bg-white p-4">
              <ColorScaleGrid colors={brandColors} className="min-w-[980px]" />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">Product</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">产品蓝色阶</h3>
              </div>
              <span className="h-2 w-2 bg-[var(--product-blue-500)]" />
            </div>
            <div className="overflow-x-auto bg-white p-4">
              <ColorScaleGrid colors={productColors} className="min-w-[980px]" />
            </div>
          </div>

          <div>
            <div className="mb-4 flex items-end justify-between gap-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--neutral-500)]">Neutral</p>
                <h3 className="mt-2 text-lg font-semibold text-[var(--neutral-900)]">中性灰色阶</h3>
              </div>
              <span className="h-2 w-2 bg-[var(--neutral-900)]" />
            </div>
            <div className="overflow-x-auto bg-white p-4">
              <ColorScaleGrid colors={neutralColors} className="min-w-[980px]" />
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Semantic Colors"
          title="语义色"
          description="语义色用于状态反馈。尤其注意：错误/危险使用 error，不使用品牌红，避免品牌识别和风险提示混淆。"
        />
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {semanticColors.map((color) => (
            <SemanticCard key={color.name} color={color} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Data Visualization"
          title="数据色"
          description="数据色用于曲线图、饼图、柱状图等可视化场景。优先保证序列可区分、含义稳定、与品牌红和产品蓝的语义边界清晰。"
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {dataColors.map((color) => (
            <DataColorCard key={color.name} color={color} />
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <LineChartExample />
          <DonutChartExample />
          <BarChartExample />
        </div>

        <div className="mt-6 bg-[var(--neutral-50)] p-5">
          <h3 className="mb-3 text-base font-semibold text-[var(--neutral-900)]">数据色使用原则</h3>
          <div className="grid grid-cols-1 gap-4 text-sm leading-6 text-[var(--neutral-700)] md:grid-cols-3">
            <p><span className="font-semibold text-[var(--neutral-900)]">顺序稳定：</span>同一业务指标在不同图表中保持相同颜色，避免用户重新学习。</p>
            <p><span className="font-semibold text-[var(--neutral-900)]">重点克制：</span>品牌红不进入普通序列，只在关键阈值、异常结果或决策点中出现。</p>
            <p><span className="font-semibold text-[var(--neutral-900)]">数量控制：</span>曲线图 2-4 色、饼图 3-5 色、柱状图优先同色系深浅或少量对比色。</p>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用原则" />
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-[var(--neutral-900)]">推荐做法</h3>
            <ul className="space-y-3 text-sm leading-6 text-[var(--neutral-700)]">
              <li>• 先判断色彩语义，再选择具体色阶。</li>
              <li>• 主行动优先使用 neutral-900，保持专业与稳定。</li>
              <li>• 后台功能操作使用产品蓝，帮助用户识别可交互行为。</li>
              <li>• 品牌红只作为关键节点和品牌签名，小面积出现。</li>
            </ul>
          </div>
          <div className="bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold text-[var(--neutral-900)]">避免做法</h3>
            <ul className="space-y-3 text-sm leading-6 text-[var(--neutral-700)]">
              <li>• 不要把品牌红当作常规后台按钮色。</li>
              <li>• 不要把产品蓝命名为次按钮，蓝色是业务色彩语义。</li>
              <li>• 不要用相近但未定义的临时色破坏 token 一致性。</li>
              <li>• 不要只依赖颜色表达状态，必须配合文字或图标语义。</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
