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
  border: string;
  usage: string;
  sample: string;
};

type DataColor = {
  name: string;
  hex: string;
  usage: string;
};

function ColorChip({ color, label }: { color: string; label?: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="h-8 w-8 border border-[var(--neutral-200)] bg-white" style={{ backgroundColor: color }} />
      <CopyableColorValue value={color} display={label ?? color} className="whitespace-nowrap" />
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
          <p className="mt-1 text-xs leading-5 text-[var(--text-tertiary)]">{color.usage}</p>
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
      className="text-xs font-medium text-[var(--text-tertiary)] transition-colors hover:text-[var(--neutral-900)]"
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
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">{eyebrow}</p>
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
  <rect x="164" y="92" width="42" height="150" fill="#006DEA"/>
  <rect x="236" y="144" width="42" height="98" fill="#006DEA"/>
  <rect x="308" y="72" width="42" height="170" fill="#006DEA"/>
  <rect x="380" y="108" width="42" height="134" fill="#006DEA"/>
  <rect x="452" y="164" width="42" height="78" fill="#006DEA"/>
</svg>`;

  return (
    <ChartExampleCard
      eyebrow="Bar Chart"
      title="柱状图"
      svg={svg}
      description="适合分类对比。这个示例只有一个指标，因此全部使用 data-01；柱状图从零基线开始，不用不同颜色伪造额外分类。"
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
          ["材库", 164, 92, 150, "#006DEA"],
          ["模型", 236, 144, 98, "#006DEA"],
          ["预警", 308, 72, 170, "#006DEA"],
          ["完成", 380, 108, 134, "#006DEA"],
          ["其他", 452, 164, 78, "#006DEA"],
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

function StackedBarChartExample() {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 560 300">
  <rect width="560" height="300" fill="#F7F8FA"/>
  <g stroke="#E6E9EE" stroke-width="1">
    <line x1="64" y1="70" x2="520" y2="70"/>
    <line x1="64" y1="130" x2="520" y2="130"/>
    <line x1="64" y1="190" x2="520" y2="190"/>
    <line x1="64" y1="242" x2="520" y2="242"/>
  </g>
  <g stroke="#97A0AD" stroke-width="1.5">
    <line x1="64" y1="242" x2="520" y2="242"/>
    <line x1="64" y1="60" x2="64" y2="242"/>
  </g>
  <rect x="92" y="192" width="48" height="50" fill="#006DEA"/>
  <rect x="92" y="142" width="48" height="50" fill="#14B8A6"/>
  <rect x="92" y="92" width="48" height="50" fill="#8B5CF6"/>
  <rect x="172" y="172" width="48" height="70" fill="#006DEA"/>
  <rect x="172" y="122" width="48" height="50" fill="#14B8A6"/>
  <rect x="172" y="82" width="48" height="40" fill="#8B5CF6"/>
  <rect x="252" y="182" width="48" height="60" fill="#006DEA"/>
  <rect x="252" y="132" width="48" height="50" fill="#14B8A6"/>
  <rect x="252" y="102" width="48" height="30" fill="#8B5CF6"/>
  <rect x="332" y="202" width="48" height="40" fill="#006DEA"/>
  <rect x="332" y="152" width="48" height="50" fill="#14B8A6"/>
  <rect x="332" y="112" width="48" height="40" fill="#8B5CF6"/>
  <rect x="412" y="192" width="48" height="50" fill="#006DEA"/>
  <rect x="412" y="142" width="48" height="50" fill="#14B8A6"/>
  <rect x="412" y="107" width="48" height="35" fill="#8B5CF6"/>
</svg>`;

  return (
    <ChartExampleCard
      eyebrow="Stacked Bar"
      title="堆叠柱状图"
      svg={svg}
      description="适合展示总量构成和占比关系。每段使用不同颜色，避免超过 4 层叠加以免难以辨识；总高度代表总量。"
    >
      <svg viewBox="0 0 560 300" className="h-auto w-full" role="img" aria-label="堆叠柱状图数据色示例">
        <rect width="560" height="300" fill="#F7F8FA" />
        <g stroke="#E6E9EE" strokeWidth="1">
          {[70, 130, 190, 242].map((y) => (
            <line key={y} x1="64" y1={y} x2="520" y2={y} />
          ))}
        </g>
        <g stroke="#97A0AD" strokeWidth="1.5">
          <line x1="64" y1="242" x2="520" y2="242" />
          <line x1="64" y1="60" x2="64" y2="242" />
        </g>
        <g className="font-mono text-[11px] fill-[var(--neutral-500)]">
          <text x="34" y="74">100</text>
          <text x="40" y="194">50</text>
          <text x="47" y="246">0</text>
        </g>
        {[
          { x: 92, segments: [{ h: 50, y: 192, c: "#006DEA" }, { h: 50, y: 142, c: "#14B8A6" }, { h: 50, y: 92, c: "#8B5CF6" }] },
          { x: 172, segments: [{ h: 70, y: 172, c: "#006DEA" }, { h: 50, y: 122, c: "#14B8A6" }, { h: 40, y: 82, c: "#8B5CF6" }] },
          { x: 252, segments: [{ h: 60, y: 182, c: "#006DEA" }, { h: 50, y: 132, c: "#14B8A6" }, { h: 30, y: 102, c: "#8B5CF6" }] },
          { x: 332, segments: [{ h: 40, y: 202, c: "#006DEA" }, { h: 50, y: 152, c: "#14B8A6" }, { h: 40, y: 112, c: "#8B5CF6" }] },
          { x: 412, segments: [{ h: 50, y: 192, c: "#006DEA" }, { h: 50, y: 142, c: "#14B8A6" }, { h: 35, y: 107, c: "#8B5CF6" }] },
        ].map((bar) =>
          bar.segments.map((seg, i) => (
            <rect key={`${bar.x}-${i}`} x={bar.x} y={seg.y} width="48" height={seg.h} fill={seg.c} />
          ))
        )}
        {["Q1", "Q2", "Q3", "Q4", "Now"].map((label, i) => (
          <text key={label} x={116 + i * 80} y="268" textAnchor="middle" className="text-[11px] fill-[var(--neutral-500)]">{label}</text>
        ))}
        {[
          ["材料A", "#006DEA", 32],
          ["材料B", "#14B8A6", 94],
          ["材料C", "#8B5CF6", 156],
        ].map(([label, color, x]) => (
          <g key={label}>
            <rect x={Number(x)} y="18" width="10" height="10" fill={String(color)} />
            <text x={Number(x) + 16} y="28" className="text-[11px] font-medium fill-[var(--neutral-600)]">{label}</text>
          </g>
        ))}
      </svg>
    </ChartExampleCard>
  );
}

function CoreRuleRow({
  semantic,
  variable,
  color,
  display,
  context,
  usage,
}: {
  semantic: string;
  variable: string;
  color: string;
  display: string;
  context: string;
  usage: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 border-b border-[var(--neutral-100)] px-5 py-4 text-sm last:border-b-0 lg:grid-cols-[150px_190px_190px_180px_minmax(0,1fr)] lg:items-center">
      <div>
        <h3 className="font-semibold text-[var(--neutral-900)]">{semantic}</h3>
      </div>
      <div className="font-mono text-xs text-[var(--text-tertiary)]">{variable}</div>
      <div>
        <p className="mb-2 text-xs font-semibold text-[var(--text-tertiary)] lg:hidden">默认值</p>
        <ColorChip color={color} label={display} />
      </div>
      <p className="text-sm font-medium text-[var(--text-secondary)]">{context}</p>
      <p className="text-sm leading-6 text-[var(--text-secondary)]">{usage}</p>
    </div>
  );
}

function SemanticCard({ color }: { color: SemanticColor }) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
      <div className="h-1.5" style={{ backgroundColor: color.text }} />
      <div className="p-5">
        <div className="flex items-start justify-between gap-5">
          <div>
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{color.name}</p>
            <h3 className="mt-1.5 text-lg font-semibold text-[var(--text-primary)]">{color.label}</h3>
          </div>
          <span className="rounded-full px-2.5 py-1 text-xs font-semibold" style={{ backgroundColor: color.background, color: color.text }}>
            {color.sample}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{color.usage}</p>

        <div className="mt-5 overflow-hidden rounded-sm border border-[var(--neutral-200)]">
          {[
            ["文字 / 图标", color.text],
            ["浅背景", color.background],
            ["边框", color.border],
          ].map(([role, value]) => (
            <div key={role} className="grid grid-cols-[100px_1fr] items-center border-b border-[var(--neutral-100)] px-3 py-2.5 text-xs last:border-b-0">
              <span className="text-[var(--text-tertiary)]">{role}</span>
              <div className="flex items-center justify-end gap-2">
                <span className="h-5 w-5 rounded-sm border border-black/5" style={{ backgroundColor: value }} />
                <CopyableColorValue value={value} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-sm border px-3.5 py-3 text-sm leading-6" style={{ backgroundColor: color.background, borderColor: color.border }}>
          <span className="font-semibold" style={{ color: color.text }}>{color.sample}</span>
          <span className="ml-2 text-[var(--text-secondary)]">状态信息必须配合明确文字，不只依赖颜色。</span>
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
    { name: "neutral-400", hex: "#B8C0CC", label: "边框、骨架和非文字装饰" },
    { name: "neutral-500", hex: "#97A0AD", label: "禁用文字或非必要信息，不用于正常小字" },
    { name: "neutral-600", hex: "#6F7785", label: "三级说明文字，白底对比度 4.51:1" },
    { name: "neutral-700", hex: "#4B5563", label: "次级正文、导航和标注" },
    { name: "neutral-800", hex: "#2B313A", label: "主正文和高频界面文字" },
    { name: "neutral-900", hex: "#1A1A1A", label: "标题/主按钮/深背景" },
  ];

  const semanticColors: SemanticColor[] = [
    { name: "success", text: "#047857", background: "#ECFDF5", border: "#A7F3D0", label: "成功状态", usage: "用于保存成功、流程完成、校验通过等正向反馈。", sample: "操作成功" },
    { name: "warning", text: "#B45309", background: "#FFFBEB", border: "#FDE68A", label: "警告提示", usage: "用于风险提示、临界状态、需要用户关注但未阻断的情况。", sample: "需要关注" },
    { name: "error", text: "#B91C1C", background: "#FEF2F2", border: "#FECACA", label: "错误 / 危险", usage: "用于删除、失败、不可逆风险操作，不等同于品牌红。", sample: "操作失败" },
    { name: "info", text: "#006DEA", background: "#EFF6FF", border: "#BFDBFE", label: "信息提示", usage: "用于系统提示、链接信息、普通通知和可交互提示。", sample: "系统通知" },
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
      color: "#F7F8FA",
      display: "neutral-50",
      variable: "color/bg/page",
      context: "页面底层",
      usage: "默认页面底色；品牌首页可按版块使用白色，但不形成另一套色板。",
    },
    {
      semantic: "容器/卡片",
      color: "#FFFFFF",
      display: "#FFFFFF",
      variable: "color/bg/surface",
      context: "内容容器",
      usage: "卡片、弹窗、表单等容器统一使用白色，保持内容聚焦。",
    },
    {
      semantic: "弱背景/表头",
      color: "#F1F3F5",
      display: "neutral-100",
      variable: "color/bg/subtle",
      context: "分组与表头",
      usage: "用于表头、字段区和弱分组；营销页面需要更轻时使用 neutral-50。",
    },
    {
      semantic: "标题文字",
      color: "#1A1A1A",
      display: "neutral-900",
      variable: "color/text/title",
      context: "标题/关键数据",
      usage: "一级标题、模块标题和关键数据标题统一使用 neutral-900。",
    },
    {
      semantic: "主要正文",
      color: "#2B313A",
      display: "neutral-800",
      variable: "color/text/primary",
      context: "正文/表单值",
      usage: "正文、表格主要内容与表单值使用 neutral-800。",
    },
    {
      semantic: "辅助文字",
      color: "#4B5563",
      display: "neutral-700",
      variable: "color/text/secondary",
      context: "描述/标注",
      usage: "页面描述、次级正文和高频标注使用 neutral-700；neutral-600 仅用于三级说明。",
    },
    {
      semantic: "标准边框",
      color: "#D5DAE1",
      display: "neutral-300",
      variable: "color/border/default",
      context: "控件边框",
      usage: "输入框和高密度容器使用 neutral-300；纯分割线使用 neutral-200。",
    },
    {
      semantic: "任务主行动",
      color: "#1A1A1A",
      display: "neutral-900",
      variable: "color/action/task/default",
      context: "任务推进",
      usage: "提交、确认、发布、创建等改变业务流程的操作使用黑色。",
    },
    {
      semantic: "产品功能",
      color: "#006DEA",
      display: "product-blue-500",
      variable: "color/action/product",
      context: "链接/功能操作",
      usage: "链接、筛选、下载、焦点和产品功能使用产品蓝。",
    },
    {
      semantic: "品牌强调",
      color: "#FF112D",
      display: "brand-600",
      variable: "color/action/brand",
      context: "品牌关键节点",
      usage: "Logo、品牌签名和关键转化小面积使用，不作为错误色或后台常规操作色。",
    },
  ];

  return (
    <div className="space-y-20">
      <PageHeader
        title="色彩系统"
        description="色彩系统以中性灰建立信息秩序，以 task 黑色推进提交、确认、发布和创建等任务，以 product 蓝色承载分析、生成、连接、筛选和导出等产品能力。品牌红仅用于品牌识别与关键转化，错误与风险使用独立语义色。"
      />

      <section>
        <SectionHeading
          eyebrow="Core Color Rules"
          title="核心色彩与使用规则"
          description="只维护一套语义色系统。官网、门户和后台共享相同变量，通过页面密度与业务场景选择轻重，不再维护两套基础色板。"
        />
        <div className="overflow-hidden bg-white">
          <div className="hidden grid-cols-[150px_190px_190px_180px_minmax(0,1fr)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-semibold text-[var(--text-secondary)] lg:grid">
            <div>语义</div>
            <div>变量</div>
            <div>默认值</div>
            <div>主要场景</div>
            <div>使用说明</div>
          </div>
          {coreColorRules.map((rule) => (
            <CoreRuleRow key={rule.semantic} {...rule} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Action Decision"
          title="黑色与产品蓝的使用决策"
          description="黑色和蓝色共同属于后台操作体系，但表达不同意图：黑色推进任务，蓝色调用产品能力。它们不是主色与次色的关系。"
        />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-[400px_minmax(0,1fr)]">
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">按顺序判断</h3>
            <ol className="mt-5 space-y-4">
              {[
                ["危险且不可逆", "danger", "删除、撤销审批、永久停用"],
                ["提交或改变业务流程", "task · 黑色", "提交、确认、发布、创建"],
                ["调用可重复或可撤回能力", "product · 蓝色", "分析、生成、连接、筛选、导出"],
                ["退出或不产生改变", "neutral", "取消、返回、关闭"],
              ].map(([question, tone, examples], index) => (
                <li key={question} className="grid grid-cols-[28px_1fr] gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--neutral-900)] font-mono text-xs text-white">{index + 1}</span>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">{question} → {tone}</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">{examples}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
            <div className="min-w-[620px]">
              <div className="grid grid-cols-[130px_1fr_1fr] border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-semibold text-[var(--text-secondary)]">
                <span>场景</span><span>黑色 task</span><span>蓝色 product</span>
              </div>
              {[
                ["表单", "提交、保存修改", "保存草稿用 outline"],
                ["表格工具栏", "新建数据", "筛选、导出、下载用 outline/text"],
                ["分析面板", "通常不出现", "运行分析、生成结果可用 solid"],
                ["普通弹窗", "确认、完成", "辅助能力用 outline"],
                ["危险确认", "不使用", "不使用，改用 danger"],
                ["导航链接", "不使用", "使用 text"],
              ].map(([scene, task, product]) => (
                <div key={scene} className="grid grid-cols-[130px_1fr_1fr] border-b border-[var(--neutral-100)] px-5 py-4 text-sm last:border-b-0">
                  <strong className="text-[var(--text-primary)]">{scene}</strong>
                  <span className="text-[var(--text-secondary)]">{task}</span>
                  <span className="text-[var(--text-secondary)]">{product}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5 rounded-[var(--radius-sm)] border border-[var(--warning-border)] bg-[var(--warning-bg)] px-5 py-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">唯一主操作原则：</strong>
          同一按钮组最多一个 solid。黑色 task solid 已存在时，蓝色 product 必须降为 outline 或 text；能力型页面没有任务提交时，蓝色 product 才可以成为唯一 solid。
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Brand</p>
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Product</p>
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
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Neutral</p>
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
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {semanticColors.map((color) => (
            <SemanticCard key={color.name} color={color} />
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="Data Visualization"
          title="数据可视化"
          description="结合 DBS Data Visualisation Guideline 的设计原则、图表选型、布局、颜色用法与检查清单，保留新材道自己的业务语义和数据色 Token。先决定表达什么，再决定是否使用图表，最后才选择颜色。"
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["1", "明确问题", "写清用户要比较、发现趋势、理解构成，还是定位异常。"],
            ["2", "判断载体", "几个关键数字用指标卡；需要精确查找用表格；只有关系和模式才用图表。"],
            ["3", "选择图形", "根据比较、趋势、构成、分布、净变化、地域或金融数据选择图表。"],
            ["4", "补齐信息", "加入标题、单位、图例、标签、交互和无数据 / 极值状态，再检查可访问性。"],
          ].map(([step, title, description]) => (
            <div key={step} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[var(--neutral-900)] font-mono text-xs text-white">{step}</span>
              <h3 className="mt-4 text-base font-semibold text-[var(--text-primary)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{description}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[150px_170px_210px_minmax(0,1fr)] border-b border-[var(--neutral-200)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-semibold text-[var(--text-secondary)]">
              <span>数据关系</span><span>优先图表</span><span>适用场景</span><span>关键限制</span>
            </div>
            {[
              ["分类比较", "柱状图 / 分组柱状图", "材料、模型、区域之间比较", "单系列只用一种颜色，柱状图必须从零基线开始。"],
              ["时间趋势", "折线图 / 面积图", "价格、强度、完成率随时间变化", "小数据集可改用柱状图；面积图仅用于强调累计量。"],
              ["构成占比", "堆叠柱 / 环图", "总量由哪些部分构成", "环图不超过 5 类；类别多时合并“其他”或改用条形图。"],
              ["数值分布", "直方图", "批次、区间、频次分布", "区间宽度必须一致并说明单位。"],
              ["净变化", "瀑布图", "增减项如何形成最终结果", "明确起点、终点和正负贡献。"],
              ["地域分布", "地图", "地区强度、分布或占比", "必须提供清晰图例，不用面积大小暗示数值。"],
              ["金融价格", "K 线 / OHLC", "开高低收与价格波动", "仅用于专业金融语境，不为装饰而使用。"],
            ].map(([relation, chart, scene, limit]) => (
              <div key={relation} className="grid grid-cols-[150px_170px_210px_minmax(0,1fr)] border-b border-[var(--neutral-100)] px-5 py-4 text-sm last:border-b-0">
                <strong className="text-[var(--text-primary)]">{relation}</strong>
                <span className="text-[var(--text-primary)]">{chart}</span>
                <span className="text-[var(--text-secondary)]">{scene}</span>
                <span className="text-[var(--text-secondary)]">{limit}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 rounded-[var(--radius-sm)] border border-[var(--info-border)] bg-[var(--info-bg)] px-5 py-4 text-sm leading-6 text-[var(--text-secondary)]">
          <strong className="text-[var(--text-primary)]">两套颜色合同：</strong>
          success / warning / error / info 用于界面状态；data-01～12 用于图表编码。即使色相接近也不能互换，例如图表中的 data-06 不会自动继承 error 的文字色优化。
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
          {[
            {
              title: "分类色 Categorical",
              usage: "离散类别之间没有高低顺序。优先 2–6 色；相邻色需明显可辨，并配合标签或图例。",
              colors: ["#006DEA", "#14B8A6", "#8B5CF6", "#F59E0B", "#10B981", "#EF4444"],
            },
            {
              title: "连续色 Sequential",
              usage: "同一指标由低到高。保持单一色相与连续明度，水平色阶从左到右、垂直色阶从上到下由浅至深。",
              colors: ["#EDF5FF", "#B8D8FF", "#5A9FFF", "#006DEA", "#00449A", "#001D47"],
            },
            {
              title: "发散色 Diverging",
              usage: "表达相对基准的负向与正向变化。中点必须是零、目标值或行业基准等明确业务含义。",
              colors: ["#B91C1C", "#FCA5A5", "#F7F8FA", "#8BBEFF", "#006DEA"],
            },
          ].map((palette) => (
            <div key={palette.title} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{palette.title}</h3>
              <div className="my-4 flex h-8 overflow-hidden rounded-sm">
                {palette.colors.map((color) => (
                  <span key={color} className="flex-1" style={{ backgroundColor: color }} />
                ))}
              </div>
              <p className="text-sm leading-6 text-[var(--text-secondary)]">{palette.usage}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
          {dataColors.map((color) => (
            <DataColorCard key={color.name} color={color} />
          ))}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <LineChartExample />
          <DonutChartExample />
          <BarChartExample />
          <StackedBarChartExample />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">图表结构</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">信息必须让用户在不猜测的情况下理解图表；控制项只在确实影响当前视图时出现。</p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                ["必需", "标题与结论"],
                ["必需", "坐标轴与单位"],
                ["按需", "图例与直接标签"],
                ["按需", "Tooltip / 明细"],
                ["可选", "筛选与排序"],
                ["可选", "同数据视图切换"],
              ].map(([level, item]) => (
                <div key={item} className="border border-[var(--neutral-200)] p-3">
                  <p className="text-[11px] font-semibold text-[var(--text-tertiary)]">{level}</p>
                  <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-6">
            <h3 className="text-base font-semibold text-[var(--text-primary)]">上线前检查</h3>
            <div className="mt-4 space-y-3">
              {[
                "是否真的需要图表，还是指标卡或表格更清楚？",
                "图表类型是否忠实表达数据，没有截断坐标轴或制造误导？",
                "标题、单位、图例和标签是否完整且无歧义？",
                "是否同时设计无数据、最少数据、最大数据和超长标签？",
                "颜色、字号和对比度是否可读，并有非颜色识别方式？",
                "点击、悬停、筛选和自定义是否提供明确反馈与键盘路径？",
                "关键异常是否被标注，但没有用大面积高饱和色制造噪音？",
              ].map((item) => (
                <div key={item} className="grid grid-cols-[20px_1fr] gap-3 text-sm leading-6 text-[var(--text-secondary)]">
                  <span className="mt-1 flex h-4 w-4 items-center justify-center border border-[var(--neutral-400)] text-[10px] text-[var(--success-text)]">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Guidelines" title="使用原则" />
        <div className="rounded-sm bg-white p-5">
          <div className="space-y-2 text-sm leading-6">
            <p><span className="mr-2 font-semibold text-[var(--success-text)]">✓</span>先判断操作意图，再选择颜色：任务推进使用 task 黑色，产品能力使用 product 蓝色。</p>
            <p><span className="mr-2 font-semibold text-[var(--success-text)]">✓</span>后台功能操作使用产品蓝，帮助用户识别可交互行为。</p>
            <p><span className="mr-2 font-semibold text-[var(--success-text)]">✓</span>品牌红仅作为关键节点和品牌签名，小面积出现。</p>
            <p className="mt-3"><span className="mr-2 font-semibold text-[var(--error-text)]">✗</span>不要把品牌红当作常规后台按钮色。</p>
            <p><span className="mr-2 font-semibold text-[var(--error-text)]">✗</span>不要把产品蓝命名为"次按钮"，蓝色是业务色彩语义。</p>
            <p><span className="mr-2 font-semibold text-[var(--error-text)]">✗</span>不要用相近但未定义的临时色破坏 token 一致性。</p>
            <p><span className="mr-2 font-semibold text-[var(--error-text)]">✗</span>不要只依赖颜色表达状态，必须配合文字或图标语义。</p>
          </div>
        </div>
      </section>
    </div>
  );
}
