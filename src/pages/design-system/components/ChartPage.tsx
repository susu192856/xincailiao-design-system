import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import CodeBlock from "../../../components/docs/CodeBlock";
import DocsTable from "../../../components/docs/DocsTable";
import PageHeader from "../../../components/docs/PageHeader";
import { RuleCallout, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Chart, type ChartLegendItem } from "../../../components/ui/Chart";
import { Tabs } from "../../../components/ui/Tabs";
import { chartColorFamilies } from "../../../data/chartColors";
import {
  dbsChartStyles,
  type DbsBarState,
  type DbsCurveState,
  type DbsDonutState,
} from "../../../data/dbsChartStyles";

type BarMode = "bar" | "grouped-bar" | "stacked-bar" | "horizontal-bar" | "bidirectional-bar";
type DonutMode = "pie" | "donut" | "semi-donut";
type CurveMode = "line" | "multi-line" | "area" | "stacked-area";

const barData = [
  { label: "铝合金", current: 76, previous: 62 },
  { label: "工程塑料", current: 58, previous: 48 },
  { label: "铜合金", current: 86, previous: 70 },
  { label: "复合材料", current: 64, previous: 52 },
  { label: "特种钢", current: 48, previous: 44 },
  { label: "陶瓷", current: 34, previous: 28 },
];

const donutData = [
  { label: "材料性能", value: 28, amount: "35,280", color: dbsChartStyles.donut.series[0] },
  { label: "工艺参数", value: 22, amount: "27,720", color: dbsChartStyles.donut.series[1] },
  { label: "检测报告", value: 18, amount: "22,680", color: dbsChartStyles.donut.series[2] },
  { label: "供应信息", value: 14, amount: "17,640", color: dbsChartStyles.donut.series[3] },
  { label: "知识文档", value: 10, amount: "12,600", color: dbsChartStyles.donut.series[4] },
  { label: "其他", value: 8, amount: "10,080", color: dbsChartStyles.donut.series[5] },
];

const semiDonutData = [
  { label: "7 天内", value: 36, amount: "45,360", color: dbsChartStyles.semiDonut.series[0] },
  { label: "7–15 天", value: 21, amount: "26,460", color: dbsChartStyles.semiDonut.series[1] },
  { label: "16–30 天", value: 17, amount: "21,420", color: dbsChartStyles.semiDonut.series[2] },
  { label: "30 天以上", value: 26, amount: "32,760", color: dbsChartStyles.semiDonut.series[3] },
];

const curveData = {
  labels: ["一月", "二月", "三月", "四月", "五月", "六月"],
  primary: [34, 52, 46, 68, 62, 82],
  secondary: [22, 31, 38, 42, 54, 61],
  tertiary: [14, 20, 26, 34, 39, 48],
  quaternary: [8, 14, 18, 22, 29, 36],
};

function DataTable({ columns, rows }: { columns: string[]; rows: string[][] }) {
  return (
    <DocsTable className="min-w-[560px]">
        <thead className="bg-[var(--neutral-50)] text-[var(--text-secondary)]">
          <tr>
            {columns.map((column) => <th key={column} className="px-3 py-2.5 font-medium">{column}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-[var(--neutral-100)]">
          {rows.map((row) => (
            <tr key={row.join("-")}>
              {row.map((cell, index) => (
                <td key={`${cell}-${index}`} className={index ? "px-3 py-2.5 font-data tabular-nums text-[var(--text-secondary)]" : "px-3 py-2.5 text-[var(--text-primary)]"}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
    </DocsTable>
  );
}

function RuleSurface({ title, children, tone }: { title: string; children: ReactNode; tone: "do" | "dont" | "neutral" }) {
  const toneClass = {
    do: "border-t-[var(--success-solid)]",
    dont: "border-t-[var(--error-solid)]",
    neutral: "border-t-[var(--neutral-900)]",
  }[tone];

  return (
    <div className={["border border-[var(--neutral-200)] border-t-2 bg-white p-5", toneClass].join(" ")}>
      <p className="text-sm font-semibold text-[var(--text-primary)]">{title}</p>
      <div className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{children}</div>
    </div>
  );
}

function RoleCard({ role, task, route }: { role: string; task: string; route: string }) {
  return (
    <div className="border border-[var(--neutral-200)] bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">{role}</p>
      <p className="mt-3 text-base font-semibold text-[var(--text-primary)]">{route}</p>
      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{task}</p>
    </div>
  );
}

function StateSelector<T extends string>({
  value,
  onChange,
  items,
}: {
  value: T;
  onChange: (value: T) => void;
  items: { value: T; label: string }[];
}) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-2 border-b border-[var(--neutral-100)] pb-4" aria-label="DBS 状态预览">
      <span className="mr-1 text-xs font-medium text-[var(--text-tertiary)]">浅色状态</span>
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          className={[
            "h-6 border px-2 py-0 text-xs leading-none transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]",
            value === item.value
              ? "border-[var(--neutral-900)] bg-[var(--neutral-900)] text-white"
              : "border-[var(--neutral-200)] bg-white text-[var(--text-secondary)] hover:border-[var(--neutral-400)] hover:text-[var(--text-primary)]",
          ].join(" ")}
          aria-pressed={value === item.value}
          onClick={() => onChange(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

function BarChartDemo() {
  const [mode, setMode] = useState<BarMode>("bar");
  const [visualState, setVisualState] = useState<DbsBarState>("default");
  const [activeIndex, setActiveIndex] = useState(2);
  const active = barData[activeIndex];
  const max = 100;
  const modeMeta = {
    bar: { title: "单系列柱状图", description: "比较同一指标在多个离散类别中的大小。" },
    "grouped-bar": { title: "分组多系列柱状图", description: "在同一类别内比较少量系列，系列建议不超过 3 个。" },
    "stacked-bar": { title: "堆叠柱状图", description: "同时查看总量与稳定构成；需要精确比较中间层时改用分组柱。" },
    "horizontal-bar": { title: "横向条形图", description: "用于长类别名、排序结果或类别超过 8 个的比较。" },
    "bidirectional-bar": { title: "双向柱状图", description: "围绕共同基准比较增加与减少、流入与流出等相反方向。" },
  }[mode];
  const stackedRows = barData.map((item) => {
    const governed = Math.round(item.current * 0.55);
    const review = Math.round(item.current * 0.28);
    return { ...item, governed, review, pending: item.current - governed - review };
  });
  const bidirectionalRows = barData.map((item) => ({
    ...item,
    added: Math.round(item.current * 0.48),
    removed: Math.round(item.previous * 0.26),
  }));
  const legend: ChartLegendItem[] = mode === "grouped-bar"
    ? [
        { label: "本期", color: dbsChartStyles.bar.primary },
        { label: "上期", color: dbsChartStyles.bar.secondary },
      ]
    : mode === "stacked-bar"
      ? [
          { label: "已治理", color: dbsChartStyles.bar.primary },
          { label: "待复核", color: dbsChartStyles.bar.secondary },
          { label: "待补充", color: dbsChartStyles.bar.trend },
        ]
      : mode === "bidirectional-bar"
        ? [
            { label: "下线", color: dbsChartStyles.bar.negative },
            { label: "新增", color: dbsChartStyles.bar.positive },
          ]
        : [{ label: "本期数据量", color: dbsChartStyles.bar.primary }];
  if (visualState === "trend") legend.push({ label: "趋势", color: dbsChartStyles.bar.trend, shape: "line" });
  if (visualState === "benchmark") legend.push({ label: "基准点", color: dbsChartStyles.text.primary, shape: "dot" });
  const tableConfig = mode === "stacked-bar"
    ? {
        columns: ["材料类别", "已治理", "待复核", "待补充", "合计"],
        rows: stackedRows.map((item) => [item.label, `${item.governed} 万条`, `${item.review} 万条`, `${item.pending} 万条`, `${item.current} 万条`]),
      }
    : mode === "bidirectional-bar"
      ? {
          columns: ["材料类别", "下线", "新增", "净增加"],
          rows: bidirectionalRows.map((item) => [item.label, `${item.removed} 万条`, `${item.added} 万条`, `${item.added - item.removed} 万条`]),
        }
      : {
          columns: mode === "grouped-bar" ? ["材料类别", "本期数据量", "上期数据量", "环比"] : ["材料类别", "本期数据量"],
          rows: barData.map((item) => mode === "grouped-bar"
            ? [item.label, `${item.current} 万条`, `${item.previous} 万条`, `+${Math.round(((item.current - item.previous) / item.previous) * 100)}%`]
            : [item.label, `${item.current} 万条`]),
        };

  return (
    <Chart
      chartType={mode}
      title={modeMeta.title}
      description={modeMeta.description}
      legendItems={legend}
      trendLine={visualState === "trend"}
      benchmarkPoints={visualState === "benchmark"}
      actions={(
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as BarMode)}
          variant="segment"
          size="sm"
          items={[
            { value: "bar", label: "单系列", content: null },
            { value: "grouped-bar", label: "多系列", content: null },
            { value: "stacked-bar", label: "堆叠", content: null },
            { value: "horizontal-bar", label: "横向", content: null },
            { value: "bidirectional-bar", label: "双向", content: null },
          ]}
        />
      )}
      showTable
      table={<DataTable columns={tableConfig.columns} rows={tableConfig.rows} />}
      ariaLabel={`可交互${modeMeta.title}`}
    >
      <div>
        <StateSelector<DbsBarState>
          value={visualState}
          onChange={setVisualState}
          items={[
            { value: "default", label: "默认" },
            { value: "trend", label: "趋势线" },
            { value: "benchmark", label: "基准点" },
            { value: "skeleton", label: "骨架屏" },
          ]}
        />
        <div className="min-w-[640px]">
        {mode === "horizontal-bar" ? (
          <div className="space-y-2">
            {barData.map((item, index) => (
              <button key={item.label} type="button" className={`grid w-full grid-cols-[92px_minmax(0,1fr)_64px] items-center gap-3 px-3 py-2 text-left outline-none ${index === activeIndex ? "bg-[var(--neutral-50)]" : "hover:bg-[var(--neutral-50)] focus-visible:bg-[var(--neutral-50)]"}`} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)} aria-pressed={index === activeIndex} aria-label={`${item.label}，${item.current} 万条`}>
                <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                <span className="h-7" style={{ backgroundColor: dbsChartStyles.grid }}><span className="block h-full" style={{ width: `${item.current}%`, backgroundColor: visualState === "skeleton" ? dbsChartStyles.skeleton : dbsChartStyles.bar.primary }} /></span>
                <strong className="text-right font-data text-sm tabular-nums text-[var(--text-primary)]">{item.current} 万</strong>
              </button>
            ))}
          </div>
        ) : mode === "bidirectional-bar" ? (
          <div>
            <div className="grid grid-cols-[92px_minmax(0,1fr)_minmax(0,1fr)] gap-3 px-3 pb-2 text-xs text-[var(--text-tertiary)]"><span /><span className="text-right">下线 ←</span><span>→ 新增</span></div>
            <div className="space-y-2">
              {bidirectionalRows.map((item, index) => (
                <button key={item.label} type="button" className={`grid w-full grid-cols-[92px_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 px-3 py-2 text-left outline-none ${index === activeIndex ? "bg-[var(--neutral-50)]" : "hover:bg-[var(--neutral-50)] focus-visible:bg-[var(--neutral-50)]"}`} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)} aria-pressed={index === activeIndex} aria-label={`${item.label}，下线 ${item.removed} 万条，新增 ${item.added} 万条`}>
                  <span className="text-sm text-[var(--text-secondary)]">{item.label}</span>
                  <span className="flex h-7 justify-end" style={{ borderRight: `1px solid ${dbsChartStyles.baseline}` }}><span className="h-full" style={{ width: `${item.removed}%`, backgroundColor: visualState === "skeleton" ? dbsChartStyles.skeleton : dbsChartStyles.bar.negative }} /></span>
                  <span className="h-7"><span className="block h-full" style={{ width: `${item.added}%`, backgroundColor: visualState === "skeleton" ? dbsChartStyles.skeleton : dbsChartStyles.bar.positive }} /></span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="relative h-[292px] pb-8 pl-12">
            {["100", "75", "50", "25", "0"].map((label, index) => <span key={label} className="absolute left-0 font-data text-xs tabular-nums text-[var(--text-tertiary)]" style={{ top: `${index * 56 - 6}px` }}>{label}</span>)}
            <div className="absolute bottom-8 left-12 right-0 top-0 flex flex-col justify-between" aria-hidden="true">{[0, 1, 2, 3, 4].map((line) => <span key={line} className="h-px" style={{ backgroundColor: line === 4 ? dbsChartStyles.baseline : dbsChartStyles.grid }} />)}</div>
            {visualState === "trend" ? (
              <svg className="pointer-events-none absolute bottom-8 left-12 right-0 top-0 z-[2] h-[224px] w-[calc(100%-3rem)]" viewBox="0 0 600 224" preserveAspectRatio="none" aria-hidden="true">
                <polyline points="20,166 130,142 240,128 350,94 460,78 580,52" fill="none" stroke={dbsChartStyles.bar.trend} strokeWidth="2" />
              </svg>
            ) : null}
            <div className="absolute bottom-8 left-12 right-0 top-0 grid grid-cols-6">
              {barData.map((item, index) => {
                const selected = index === activeIndex;
                const segments = stackedRows[index];
                const tooltipAlign = index === 0 ? "left-1" : index === barData.length - 1 ? "right-1" : "left-1/2 -translate-x-1/2";
                return (
                  <button key={item.label} type="button" className={`group relative flex h-full items-end justify-center gap-1 px-3 outline-none transition-colors ${selected ? "bg-[var(--neutral-50)]" : "hover:bg-[var(--neutral-50)] focus-visible:bg-[var(--neutral-50)]"}`} onMouseEnter={() => setActiveIndex(index)} onFocus={() => setActiveIndex(index)} onClick={() => setActiveIndex(index)} aria-label={`${item.label}：本期 ${item.current} 万条，上期 ${item.previous} 万条`} aria-pressed={selected}>
                    {selected && visualState !== "skeleton" ? <span className={`absolute top-2 z-10 w-36 rounded-[var(--radius-sm)] bg-[var(--neutral-900)] px-3 py-2 text-left text-xs leading-5 text-white shadow-[var(--shadow-md)] ${tooltipAlign}`} role="status"><strong className="block font-medium">{item.label}</strong><span className="block text-[var(--neutral-200)]">本期 {item.current} 万条</span>{mode === "grouped-bar" ? <span className="block text-[var(--neutral-200)]">上期 {item.previous} 万条</span> : null}</span> : null}
                    {mode === "grouped-bar" ? <span className="w-4" style={{ height: `${(item.previous / max) * 70}%`, backgroundColor: visualState === "skeleton" ? dbsChartStyles.skeleton : dbsChartStyles.bar.secondary }} aria-hidden="true" /> : null}
                    {mode === "stacked-bar" ? (
                      <span className="flex w-7 flex-col-reverse overflow-hidden" style={{ height: `${(item.current / max) * 70}%` }} aria-hidden="true">
                        <span style={{ flex: segments.governed, backgroundColor: visualState === "skeleton" ? dbsChartStyles.skeleton : dbsChartStyles.bar.primary }} /><span style={{ flex: segments.review, backgroundColor: visualState === "skeleton" ? dbsChartStyles.skeleton : dbsChartStyles.bar.secondary }} /><span style={{ flex: segments.pending, backgroundColor: visualState === "skeleton" ? dbsChartStyles.skeleton : dbsChartStyles.bar.trend }} />
                      </span>
                    ) : <span className="relative w-6" style={{ height: `${(item.current / max) * 70}%`, backgroundColor: visualState === "skeleton" ? dbsChartStyles.skeleton : dbsChartStyles.bar.primary }} aria-hidden="true">{visualState === "benchmark" ? <span className="absolute -left-1 top-[34%] h-2 w-8 border-y-2 border-white" style={{ backgroundColor: dbsChartStyles.text.primary }} /> : null}</span>}
                    <span className="absolute -bottom-7 left-1/2 w-full -translate-x-1/2 truncate px-1 text-center text-xs text-[var(--text-tertiary)]">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="mt-3 grid grid-cols-3 gap-3 border-t border-[var(--neutral-100)] pt-4">
          <div><p className="text-xs text-[var(--text-tertiary)]">当前类别</p><p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{active.label}</p></div>
          <div><p className="text-xs text-[var(--text-tertiary)]">{mode === "bidirectional-bar" ? "新增" : "本期总量"}</p><p className="mt-1 font-data text-lg font-semibold tabular-nums text-[var(--text-primary)]">{mode === "bidirectional-bar" ? bidirectionalRows[activeIndex].added : active.current} 万</p></div>
          <div><p className="text-xs text-[var(--text-tertiary)]">{mode === "stacked-bar" ? "已治理占比" : mode === "bidirectional-bar" ? "净增加" : "环比"}</p><p className="mt-1 font-data text-lg font-semibold tabular-nums text-[var(--success-text)]">{mode === "stacked-bar" ? `${Math.round((stackedRows[activeIndex].governed / active.current) * 100)}%` : mode === "bidirectional-bar" ? `${bidirectionalRows[activeIndex].added - bidirectionalRows[activeIndex].removed} 万` : `+${Math.round(((active.current - active.previous) / active.previous) * 100)}%`}</p></div>
        </div>
        </div>
      </div>
    </Chart>
  );
}

function polarPoint(cx: number, cy: number, radius: number, angle: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

function sectorPath(startAngle: number, endAngle: number, outerRadius: number, innerRadius: number, cy = 110) {
  const cx = 110;
  const outerStart = polarPoint(cx, cy, outerRadius, startAngle);
  const outerEnd = polarPoint(cx, cy, outerRadius, endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  if (innerRadius === 0) {
    return `M ${cx} ${cy} L ${outerStart.x} ${outerStart.y} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} Z`;
  }
  const innerEnd = polarPoint(cx, cy, innerRadius, endAngle);
  const innerStart = polarPoint(cx, cy, innerRadius, startAngle);
  return `M ${outerStart.x} ${outerStart.y} A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y} L ${innerEnd.x} ${innerEnd.y} A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y} Z`;
}

function DonutChartDemo() {
  const [mode, setMode] = useState<DonutMode>("donut");
  const [visualState, setVisualState] = useState<DbsDonutState>("default");
  const [activeIndex, setActiveIndex] = useState(0);
  const isSemi = mode === "semi-donut";
  const defaultData = isSemi ? semiDonutData : donutData;
  const displayData = visualState === "low-value"
    ? [
        { label: "已使用", value: 4, amount: "5,040", color: isSemi ? dbsChartStyles.semiDonut.series[0] : dbsChartStyles.donut.lowValue },
        { label: "剩余", value: 96, amount: "120,960", color: dbsChartStyles.donut.remainder },
      ]
    : visualState === "no-data" || visualState === "skeleton"
      ? [{ label: visualState === "no-data" ? "暂无数据" : "加载中", value: 100, amount: "—", color: dbsChartStyles.skeleton }]
      : defaultData;
  const active = displayData[Math.min(activeIndex, displayData.length - 1)];
  const modeMeta = {
    pie: { title: "饼图", description: "用于少量分类的整体构成；通过扇区角度表达占比。" },
    donut: { title: "环图", description: "在构成关系之外，通过中心区域补充总量或当前切片。" },
    "semi-donut": { title: "半环图", description: "只用于有明确上限的进度、容量或区间，不替代普通构成图。" },
  }[mode];
  let angleOffset = isSemi ? -90 : 0;
  const totalAngle = isSemi ? 180 : 360;

  return (
    <Chart
      chartType={mode}
      title={modeMeta.title}
      description={modeMeta.description}
      legendItems={displayData.map((item) => ({ label: item.label, color: item.color }))}
      state={visualState === "hover" ? "hovered" : "default"}
      edgeCase={visualState === "low-value" ? "low-value" : visualState === "no-data" ? "no-data" : "none"}
      actions={(
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as DonutMode)}
          variant="segment"
          size="sm"
          items={[
            { value: "pie", label: "饼图", content: null },
            { value: "donut", label: "环图", content: null },
            { value: "semi-donut", label: "半环图", content: null },
          ]}
        />
      )}
      showTable
      table={<DataTable columns={["内容类型", "占比", "数据量"]} rows={displayData.map((item) => [item.label, visualState === "no-data" || visualState === "skeleton" ? "—" : `${item.value}%`, item.amount === "—" ? "—" : `${item.amount} 条`])} />}
      ariaLabel={`可交互数据资产构成${modeMeta.title}`}
    >
      <div>
        <StateSelector<DbsDonutState>
          value={visualState}
          onChange={setVisualState}
          items={[
            { value: "default", label: "默认" },
            { value: "hover", label: "悬停" },
            { value: "low-value", label: "低值" },
            { value: "no-data", label: "无数据" },
            { value: "skeleton", label: "骨架屏" },
          ]}
        />
        <div className="grid min-w-[560px] gap-8 md:grid-cols-[300px_minmax(0,1fr)] md:items-center">
        <svg className="mx-auto h-auto w-full max-w-[300px]" viewBox={isSemi ? "0 0 220 160" : "0 0 220 220"} role="img" aria-label={`数据资产构成${modeMeta.title}，可聚焦每个切片查看明细`}>
          {displayData.map((item, index) => {
            const startAngle = angleOffset;
            const endAngle = startAngle + (item.value / 100) * totalAngle;
            angleOffset = endAngle;
            const selected = index === activeIndex;
            const midAngle = (startAngle + endAngle) / 2;
            const pop = polarPoint(0, 0, 5, midAngle);
            const canInteract = visualState !== "no-data" && visualState !== "skeleton";
            const fill = visualState === "hover" && selected
              ? (isSemi ? dbsChartStyles.semiDonut.hover : index === 0 ? dbsChartStyles.donut.hover : item.color)
              : item.color;
            return (
              <path
                key={item.label}
                d={sectorPath(startAngle, endAngle, 76, mode === "pie" ? 0 : 44, isSemi ? 124 : 110)}
                fill={fill}
                stroke="white"
                strokeWidth={dbsChartStyles.geometry.sliceSeparator}
                className="cursor-pointer outline-none transition-opacity focus-visible:opacity-70"
                opacity={visualState === "hover" && !selected ? 0.72 : 1}
                transform={visualState === "hover" && selected ? `translate(${pop.x} ${pop.y})` : undefined}
                tabIndex={canInteract ? 0 : -1}
                role="button"
                aria-label={`${item.label}，占比 ${item.value}%`}
                onMouseEnter={() => canInteract && setActiveIndex(index)}
                onFocus={() => canInteract && setActiveIndex(index)}
                onClick={() => canInteract && setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") setActiveIndex(index);
                }}
              />
            );
          })}
          {mode !== "pie" && visualState !== "skeleton" ? (
            <>
              <text x="110" y={isSemi ? "119" : "104"} textAnchor="middle" fill={dbsChartStyles.text.primary} fontSize="25" fontWeight="600" className="font-data">{visualState === "no-data" ? "—" : `${active.value}%`}</text>
              <text x="110" y={isSemi ? "139" : "126"} textAnchor="middle" fill={dbsChartStyles.text.secondary} fontSize="12">{active.label}</text>
            </>
          ) : null}
        </svg>
        <div className="space-y-2">
          <div className="mb-3 flex items-end justify-between border-b border-[var(--neutral-100)] px-3 pb-3">
            <div><p className="text-xs text-[var(--text-tertiary)]">当前类别</p><p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{active.label}</p></div>
            <div className="text-right"><p className="font-data text-2xl font-semibold tabular-nums text-[var(--text-primary)]">{active.value}%</p><p className="text-xs text-[var(--text-tertiary)]">{active.amount} 条</p></div>
          </div>
          {displayData.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={[
                "grid w-full grid-cols-[12px_minmax(0,1fr)_auto_auto] items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-left text-sm outline-none transition-colors",
                index === activeIndex ? "bg-[var(--neutral-100)]" : "hover:bg-[var(--neutral-50)] focus-visible:bg-[var(--neutral-50)]",
              ].join(" ")}
              onMouseEnter={() => visualState !== "no-data" && visualState !== "skeleton" && setActiveIndex(index)}
              onFocus={() => visualState !== "no-data" && visualState !== "skeleton" && setActiveIndex(index)}
              onClick={() => visualState !== "no-data" && visualState !== "skeleton" && setActiveIndex(index)}
              aria-pressed={index === activeIndex}
            >
              <span className="h-3 w-3 rounded-[2px]" style={{ backgroundColor: item.color }} aria-hidden="true" />
              <span className="truncate text-[var(--text-primary)]">{item.label}</span>
              <span className="font-data tabular-nums text-[var(--text-secondary)]">{item.amount}</span>
              <strong className="w-10 text-right font-data tabular-nums text-[var(--text-primary)]">{item.value}%</strong>
            </button>
          ))}
        </div>
        </div>
      </div>
    </Chart>
  );
}

function chartY(value: number, max = 100) {
  return 240 - (value / max) * 190;
}

function pointString(values: number[], max = 100) {
  return values.map((value, index) => `${70 + index * 100},${chartY(value, max)}`).join(" ");
}

function smoothPath(values: number[], max = 100) {
  const points = values.map((value, index) => ({ x: 70 + index * 100, y: chartY(value, max) }));
  return points.slice(1).reduce((path, point, index) => {
    const previous = points[index];
    const mid = (previous.x + point.x) / 2;
    return `${path} C ${mid} ${previous.y}, ${mid} ${point.y}, ${point.x} ${point.y}`;
  }, `M ${points[0].x} ${points[0].y}`);
}

function areaPath(values: number[], max = 100) {
  const points = values.map((value, index) => `${70 + index * 100} ${chartY(value, max)}`).join(" L ");
  return `M ${points} L 570 240 L 70 240 Z`;
}

function betweenPath(upper: number[], lower: number[], max = 100) {
  const upperPoints = upper.map((value, index) => `${70 + index * 100} ${chartY(value, max)}`).join(" L ");
  const lowerPoints = lower.map((_, index) => `${70 + (lower.length - 1 - index) * 100} ${chartY(lower[lower.length - 1 - index], max)}`).join(" L ");
  return `M ${upperPoints} L ${lowerPoints} Z`;
}

function CurveChartDemo() {
  const [mode, setMode] = useState<CurveMode>("line");
  const [visualState, setVisualState] = useState<DbsCurveState>("default");
  const [activeIndex, setActiveIndex] = useState(3);
  const x = 70 + activeIndex * 100;
  const tooltipX = Math.max(12, Math.min(x - 68, 492));
  const stackedBase = curveData.quaternary;
  const stackedMiddle = curveData.quaternary.map((value, index) => value + curveData.tertiary[index]);
  const stackedUpper = stackedMiddle.map((value, index) => value + curveData.secondary[index]);
  const stackedTop = stackedUpper.map((value, index) => value + curveData.primary[index]);
  const stackedMax = 240;
  const showAllSeries = mode === "multi-line" || mode === "stacked-area";
  const modeMeta = {
    line: { title: "单折线图", description: "突出一个指标随连续时间的变化、拐点与异常。" },
    "multi-line": { title: "多折线图", description: "比较 2–4 个同量纲系列的趋势，不用颜色数量代替筛选。" },
    area: { title: "面积图", description: "强化单系列的累计体量和变化趋势，透明填充不得遮挡刻度。" },
    "stacked-area": { title: "堆叠面积图", description: "查看少量稳定分类的总量与构成如何随时间共同变化。" },
  }[mode];
  const legend: ChartLegendItem[] = mode === "line" || mode === "area"
    ? [{ label: "数据空间", color: mode === "area" ? dbsChartStyles.area.primary : dbsChartStyles.line.series[0], shape: "line" }]
    : mode === "multi-line"
      ? [
        { label: "数据空间", color: dbsChartStyles.line.series[0], shape: "line" },
        { label: "材料库", color: dbsChartStyles.line.series[5], shape: "line" },
        { label: "智能分析", color: "#F36FD5", shape: "line" },
        { label: "业务应用", color: dbsChartStyles.line.series[1], shape: "line" },
      ]
      : [
          { label: "数据空间", color: dbsChartStyles.stackedArea.fourSeries[0] },
          { label: "材料库", color: dbsChartStyles.stackedArea.fourSeries[1] },
          { label: "智能分析", color: dbsChartStyles.stackedArea.fourSeries[2] },
          { label: "业务应用", color: dbsChartStyles.stackedArea.fourSeries[3] },
        ];
  if (visualState === "trend") legend.push({ label: "趋势 / 预算", color: mode === "area" ? dbsChartStyles.area.trend : dbsChartStyles.line.trend, shape: "line" });

  return (
    <Chart
      chartType={mode}
      title={modeMeta.title}
      description={modeMeta.description}
      legendItems={legend}
      edgeCase={visualState === "missing" ? "partially-unavailable" : "none"}
      trendLine={visualState === "trend"}
      dots={visualState === "dots"}
      smoothLine={visualState === "smooth"}
      actions={(
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as CurveMode)}
          variant="segment"
          size="sm"
          items={[
            { value: "line", label: "单折线", content: null },
            { value: "multi-line", label: "多折线", content: null },
            { value: "area", label: "面积", content: null },
            { value: "stacked-area", label: "堆叠面积", content: null },
          ]}
        />
      )}
      showTable
      table={(
        <DataTable
          columns={["月份", "数据空间", "材料库", "智能分析", "业务应用"]}
          rows={curveData.labels.map((label, index) => [label, `${curveData.primary[index]} 万次`, `${curveData.secondary[index]} 万次`, `${curveData.tertiary[index]} 万次`, `${curveData.quaternary[index]} 万次`])}
        />
      )}
      ariaLabel={`可交互${modeMeta.title}`}
    >
      <div>
        <StateSelector<DbsCurveState>
          value={visualState}
          onChange={setVisualState}
          items={[
            { value: "default", label: "默认" },
            { value: "dots", label: "数据点" },
            { value: "smooth", label: "平滑线" },
            { value: "trend", label: "趋势线" },
            { value: "missing", label: "缺失数据" },
            { value: "skeleton", label: "骨架屏" },
          ]}
        />
        <div className="min-w-[640px]">
        <svg className="h-auto w-full" viewBox="0 0 640 280" role="img" aria-label={`${modeMeta.title}，可聚焦月份查看精确值`}>
          {[40, 90, 140, 190, 240].map((y) => <line key={y} x1="50" x2="610" y1={y} y2={y} stroke={y === 240 ? dbsChartStyles.baseline : dbsChartStyles.grid} />)}
          {curveData.labels.map((label, index) => (
            <text key={label} x={70 + index * 100} y="265" textAnchor="middle" fill="var(--neutral-600)" fontSize="11">{label}</text>
          ))}
          {visualState === "skeleton" ? (
            <>
              <polyline points="70,168 170,148 270,158 370,126 470,138 570,112" fill="none" stroke={dbsChartStyles.skeleton} strokeWidth="8" />
              {showAllSeries ? <polyline points="70,208 170,196 270,186 370,176 470,160 570,152" fill="none" stroke={dbsChartStyles.skeleton} strokeWidth="8" /> : null}
            </>
          ) : mode === "area" ? (
            <>
              {visualState !== "missing" ? <path d={areaPath(curveData.primary)} fill={dbsChartStyles.area.primary} opacity="0.16" /> : null}
              {visualState === "smooth" ? <path d={smoothPath(curveData.primary)} fill="none" stroke={dbsChartStyles.area.primary} strokeWidth="2" /> : visualState === "missing" ? (
                <><polyline points={pointString(curveData.primary.slice(0, 3))} fill="none" stroke={dbsChartStyles.area.primary} strokeWidth="2" /><polyline points={`470,${chartY(curveData.primary[4])} 570,${chartY(curveData.primary[5])}`} fill="none" stroke={dbsChartStyles.area.unavailable} strokeWidth="2" strokeDasharray="4 4" /></>
              ) : <polyline points={pointString(curveData.primary)} fill="none" stroke={dbsChartStyles.area.primary} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />}
            </>
          ) : mode === "stacked-area" ? (
            <>
              <path d={areaPath(stackedBase, stackedMax)} fill={dbsChartStyles.stackedArea.fourSeries[3]} opacity="0.54" />
              <path d={betweenPath(stackedMiddle, stackedBase, stackedMax)} fill={dbsChartStyles.stackedArea.fourSeries[2]} opacity="0.54" />
              <path d={betweenPath(stackedUpper, stackedMiddle, stackedMax)} fill={dbsChartStyles.stackedArea.fourSeries[1]} opacity="0.54" />
              <path d={betweenPath(stackedTop, stackedUpper, stackedMax)} fill={dbsChartStyles.stackedArea.fourSeries[0]} opacity="0.54" />
              <polyline points={pointString(stackedTop, stackedMax)} fill="none" stroke={dbsChartStyles.stackedArea.fourSeries[0]} strokeWidth="2" />
            </>
          ) : mode === "multi-line" ? (
            <>
              <polyline points={pointString(curveData.primary)} fill="none" stroke={dbsChartStyles.line.series[0]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              <polyline points={pointString(curveData.secondary)} fill="none" stroke={dbsChartStyles.line.series[5]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              <polyline points={pointString(curveData.tertiary)} fill="none" stroke="#F36FD5" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              <polyline points={pointString(curveData.quaternary)} fill="none" stroke={dbsChartStyles.line.series[1]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            </>
          ) : visualState === "smooth" ? (
            <path d={smoothPath(curveData.primary)} fill="none" stroke={dbsChartStyles.line.series[0]} strokeWidth="2" />
          ) : visualState === "missing" ? (
            <><polyline points={pointString(curveData.primary.slice(0, 3))} fill="none" stroke={dbsChartStyles.line.series[0]} strokeWidth="2" /><polyline points={`470,${chartY(curveData.primary[4])} 570,${chartY(curveData.primary[5])}`} fill="none" stroke={dbsChartStyles.line.series[0]} strokeWidth="2" /></>
          ) : (
            <polyline points={pointString(curveData.primary)} fill="none" stroke={dbsChartStyles.line.series[0]} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          )}
          {visualState === "trend" ? <polyline points="70,180 170,162 270,148 370,130 470,114 570,96" fill="none" stroke={mode === "area" ? dbsChartStyles.area.trend : mode === "stacked-area" ? dbsChartStyles.stackedArea.trend : dbsChartStyles.line.trend} strokeWidth="2" strokeDasharray="5 4" /> : null}
          {visualState === "dots" ? [curveData.primary, ...(showAllSeries ? [curveData.secondary, curveData.tertiary, curveData.quaternary] : [])].flatMap((series, seriesIndex) => series.map((value, index) => <circle key={`${seriesIndex}-${index}`} cx={70 + index * 100} cy={chartY(value, mode === "stacked-area" ? stackedMax : 100)} r="4" fill={[dbsChartStyles.line.series[0], dbsChartStyles.line.series[5], "#F36FD5", dbsChartStyles.line.series[1]][seriesIndex]} stroke="white" strokeWidth="2" />)) : null}
          {curveData.labels.map((label, index) => (
            <g
              key={label}
              role="button"
              tabIndex={0}
              aria-label={`${label}：数据空间 ${curveData.primary[index]} 万次，材料库 ${curveData.secondary[index]} 万次，智能分析 ${curveData.tertiary[index]} 万次`}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
              className="cursor-pointer outline-none"
            >
              <rect x={30 + index * 100} y="24" width="80" height="216" fill={index === activeIndex ? "var(--neutral-100)" : "transparent"} opacity="0.62" />
              {index === activeIndex && visualState !== "skeleton" ? <line x1={70 + index * 100} x2={70 + index * 100} y1="28" y2="240" stroke={dbsChartStyles.baseline} strokeDasharray="4 4" /> : null}
            </g>
          ))}
          {visualState !== "skeleton" ? <g transform={`translate(${tooltipX} 34)`} role="status">
            <rect width="136" height={showAllSeries ? 88 : 66} rx="3" fill="var(--neutral-900)" />
            <text x="12" y="20" fill="white" fontSize="11" fontWeight="600">{curveData.labels[activeIndex]}</text>
            <text x="12" y="41" fill="var(--neutral-200)" fontSize="10">数据空间</text>
            <text x="122" y="41" fill="white" fontSize="11" textAnchor="end">{curveData.primary[activeIndex]} 万</text>
            {showAllSeries ? (
              <>
                <text x="12" y="61" fill="var(--neutral-200)" fontSize="10">材料库</text>
                <text x="122" y="61" fill="white" fontSize="11" textAnchor="end">{curveData.secondary[activeIndex]} 万</text>
                <text x="12" y="79" fill="var(--neutral-200)" fontSize="10">智能分析</text>
                <text x="122" y="79" fill="white" fontSize="11" textAnchor="end">{curveData.tertiary[activeIndex]} 万</text>
              </>
            ) : null}
          </g> : null}
        </svg>
        </div>
      </div>
    </Chart>
  );
}

function InteractionRules({ type }: { type: "bar" | "donut" | "curve" }) {
  const content = {
    bar: [
      ["桌面端", "悬浮整列类别带，而不是只悬浮柱形；工具提示展示类别、系列、精确值和单位。"],
      ["移动端", "点击柱形后保持选中，并在图下方显示明细；坐标轴可精简，但不能缩小到不可读。"],
      ["键盘与读屏", "每个类别是可聚焦目标，名称同时播报本期与对比值；明细表提供等价数据。"],
      ["设计交付", "Figma（设计工具）分别提供单系列、分组多系列、堆叠、横向和双向柱状图，并覆盖默认、悬浮、选中与移动端状态。"],
    ],
    donut: [
      ["桌面端", "悬浮切片与对应图例行同步高亮；中心区域显示当前切片名称和占比。"],
      ["移动端", "点击切片或明细行保持选中，优先通过列表读精确值，不依赖小切片命中。"],
      ["键盘与读屏", "切片可聚焦并播报名称与占比；同时提供包含数量和占比的明细表。"],
      ["设计交付", "Figma（设计工具）分别提供饼图、环图和半环图，将切片、中心值、图例行和选中态拆分为可复用部件。"],
    ],
    curve: [
      ["桌面端", "悬浮整列时间带，工具提示同时显示同一时间点的所有系列，不追逐细小折线。"],
      ["移动端", "点击时间点后保持选中，图下列表同步显示该时间点明细；复杂序列允许横向滚动。"],
      ["键盘与读屏", "每个时间点可聚焦；读屏内容包含日期、系列名、数值和单位，表格提供完整历史。"],
      ["设计交付", "Figma（设计工具）分离单折线、多折线、面积和堆叠面积四种类型，不用一个布尔属性临时改变含义。"],
    ],
  }[type];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {content.map(([title, text]) => (
        <RuleSurface key={title} title={title} tone="neutral"><p>{text}</p></RuleSurface>
      ))}
    </div>
  );
}

function DataPaletteOverview() {
  return (
    <aside className="border border-[var(--neutral-200)] bg-[var(--neutral-50)] p-5" aria-labelledby="chart-palette-overview-title">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 id="chart-palette-overview-title" className="text-base font-semibold text-[var(--text-primary)]">数据色谱概览</h3>
          <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">10 个色系用于选择方向；具体色值、变量名称和复制操作在颜色页统一维护。</p>
        </div>
        <Link
          to="/design-system/colors"
          className="inline-flex min-h-9 shrink-0 items-center text-sm font-medium text-[var(--product-blue-600)] transition-colors hover:text-[var(--product-blue-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] focus-visible:ring-offset-2"
        >
          查看完整数据色板 →
        </Link>
      </div>

      <ul className="mt-4 grid grid-cols-1 gap-2 md:grid-cols-2" aria-label="10 个数据色系">
        {chartColorFamilies.map((family) => (
          <li key={family.key} className="flex min-w-0 items-center gap-3 bg-white px-3 py-2.5" aria-label={`${family.name}，7 个层级`}>
            <span className="w-16 shrink-0 text-xs font-medium text-[var(--text-secondary)]">{family.name}</span>
            <span className="flex h-5 min-w-0 flex-1 overflow-hidden rounded-[2px]" aria-hidden="true">
              {family.shades.map((shade) => <span key={shade} className="min-w-0 flex-1" style={{ backgroundColor: shade }} />)}
            </span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function BarCategory() {
  return (
    <Tabs
      defaultValue="examples"
      items={[
        {
          value: "examples",
          label: "案例",
          content: (
            <div className="space-y-4">
              <BarChartDemo />
              <CodeBlock code={`<Chart\n  chartType="bar"\n  title="材料数据量对比"\n  legendItems={legendItems}\n  showTable\n  table={<DataTable rows={rows} />}\n>\n  <BarPlot data={data} interactive />\n</Chart>`} />
            </div>
          ),
        },
        {
          value: "rules",
          label: "使用规则",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <RuleSurface title="推荐" tone="do"><p>用于离散类别比较，所有柱形从零基线开始；单系列只用一种颜色，分组系列不超过 3 组。</p></RuleSurface>
                <RuleSurface title="避免" tone="dont"><p>不要截断纵轴夸大差异，不要为每根柱随机配色，也不要把连续时间分布误画成分类柱状图。</p></RuleSurface>
              </div>
              <SpecList items={[
                "竖向柱状图用于短类别名；标签较长或类别超过 8 个时改用横向条形图。",
                "柱宽随容器密度调整，柱间距至少等于柱宽的 50%；分组内间距小于组间距。",
                "堆叠柱用于比较总量和稳定构成；中间层需要精确比较时改用分组多系列柱。",
                "双向柱必须围绕共同零基线表达相反方向，不用于两组无关指标的装饰性镜像。",
                "DBS Examples 的标准柱形保持直角（0px），确保柱宽和零基线关系准确；业务页面不得自行增加圆角。",
                "尺寸按 12 / 8 / 4 栅格列宽提供大、中、小三档；小尺寸减少刻度数量，不缩小正文。",
                "趋势线和基准点必须在图例中说明编码，不与柱形使用同一颜色。",
              ]} />
              <DataPaletteOverview />
            </div>
          ),
        },
        { value: "interaction", label: "交互与适配", content: <InteractionRules type="bar" /> },
      ]}
    />
  );
}

function DonutCategory() {
  return (
    <Tabs
      defaultValue="examples"
      items={[
        { value: "examples", label: "案例", content: <DonutChartDemo /> },
        {
          value: "rules",
          label: "使用规则",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <RuleSurface title="推荐" tone="do"><p>仅表达少量构成或完成度，切片总和必须为 100%；中心区域展示总量或当前切片，不放长段文字。</p></RuleSurface>
                <RuleSurface title="避免" tone="dont"><p>超过 6 个切片时改为排序条形图或表格；不要使用 3D 或常驻爆炸切片，悬停外移只表达当前焦点。</p></RuleSurface>
              </div>
              <SpecList items={[
                "饼图和环图用于少量构成；环图中心只补充总量或当前项，不重复图例长文本。",
                "半环图仅用于有明确目标上限的进度、容量或区间，不作为普通占比装饰。",
                "切片按业务顺序或数值降序排列，“其他”固定置于末尾并使用中性灰。",
                "切片之间保留 2–3px 白色分隔，不用粗描边；最小可见切片不足 3% 时合并为“其他”。",
                "图例同时显示名称、数量和占比，不能只靠颜色判断类别。",
                "移动端优先保证明细列表可读，环图可缩小但交互目标不得小于 44px。",
              ]} />
              <DataPaletteOverview />
            </div>
          ),
        },
        { value: "interaction", label: "交互与适配", content: <InteractionRules type="donut" /> },
      ]}
    />
  );
}

function CurveCategory() {
  return (
    <Tabs
      defaultValue="examples"
      items={[
        { value: "examples", label: "案例", content: <CurveChartDemo /> },
        {
          value: "rules",
          label: "使用规则",
          content: (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <RuleSurface title="推荐" tone="do"><p>折线用于连续趋势，面积图用于单系列体量，堆叠面积用于少量且稳定的构成随时间变化。</p></RuleSurface>
                <RuleSurface title="避免" tone="dont"><p>不要用平滑曲线制造不存在的峰谷，不要堆叠会频繁增删的分类，也不要用面积比较精确差值。</p></RuleSurface>
              </div>
              <SpecList items={[
                "折线宽度为 2px；默认不显示全部数据点，仅在悬浮、选中、异常或关键节点显示。",
                "单折线突出一个指标；多折线用于同量纲趋势比较且不超过 4 条，超过时用筛选、分面小图或拆分视图。",
                "面积填充透明度低于边界线，确保网格、阈值和标注仍然清楚。",
                "堆叠面积分类顺序必须稳定，最重要系列靠近基线；不适合比较中间层的精确变化。",
                "时间轴保持等距；缺失值显示断线或明确缺口，不用零值伪造连续。",
              ]} />
              <DataPaletteOverview />
            </div>
          ),
        },
        { value: "interaction", label: "交互与适配", content: <InteractionRules type="curve" /> },
      ]}
    />
  );
}

const colorModels = [
  { title: "柱状图 Examples", colors: [dbsChartStyles.bar.primary, dbsChartStyles.bar.secondary, "#4E74FF", "#E56322"], text: "单系列、分组、蓝色与极简橙色案例使用 DBS 原始组合。" },
  { title: "Donut Examples", colors: [...dbsChartStyles.donut.series], text: "六个构成类别按 Examples 的绿、珊瑚、浅蓝、红、粉、琥珀顺序展示。" },
  { title: "曲线图 Examples", colors: [dbsChartStyles.line.series[0], dbsChartStyles.line.series[5], "#F36FD5", dbsChartStyles.line.series[1]], text: "多折线按同一 Examples 组合使用，图例与线色必须同步。" },
  { title: "双向柱状图 Examples", colors: [dbsChartStyles.bar.negative, dbsChartStyles.grid, dbsChartStyles.bar.positive], text: "以共同零基线区分 Outflow 与 Inflow，不替换成错误/成功状态色。" },
];

export default function ChartPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="图表"
        description="图表规范帮助普通浏览者读懂数据、帮助设计师做出正确图表选择，并让开发使用同一套容器、交互、设计变量（Token）和可访问性合同。"
      />

      <section>
        <SectionHeading eyebrow="Reading path" title="按角色进入内容" description="默认先看案例；需要做设计决策时切换使用规则，需要实现或验收时切换交互与适配。页面不要求三类角色同时阅读全部内容。" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <RoleCard role="普通浏览者" route="先看案例" task="通过标题、图例、工具提示和明细表理解数据结论，不需要掌握图表术语。" />
          <RoleCard role="设计师" route="切换使用规则" task="确认适用场景、错误案例、尺寸、颜色编码、移动端重排和 Figma（设计工具）状态。" />
          <RoleCard role="开发" route="切换交互与适配" task="核对组件属性、悬浮与键盘行为、空态、加载态、响应式和等价数据表。" />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Selection" title="高频优先，低频按问题查找" description="柱状图、饼图和曲线图进入完整规范；低频图表只保留选型入口，避免默认页面无限增长。" />
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          {[
            ["柱状图", "比大小", "单系列、多系列、堆叠、横向与双向比较"],
            ["饼图", "看构成", "饼图、环图与有明确上限的半环图"],
            ["曲线图", "看趋势", "单折线、多折线、面积与堆叠面积"],
          ].map(([title, question, detail], index) => (
            <div key={title} className="border border-[var(--neutral-200)] bg-white p-5">
              <div className="flex items-center justify-between gap-4"><p className="text-base font-semibold text-[var(--text-primary)]">{title}</p><span className="font-data text-xs text-[var(--text-tertiary)]">0{index + 1}</span></div>
              <p className="mt-3 text-sm font-medium text-[var(--text-primary)]">{question}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{detail}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 overflow-x-auto border border-[var(--neutral-200)] bg-white">
          <div className="grid min-w-[720px] grid-cols-[160px_220px_minmax(0,1fr)] bg-[var(--neutral-50)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)]"><span>低频问题</span><span>推荐图表</span><span>判断边界</span></div>
          {[
            ["看分布", "直方图、箱线图", "用于连续数值分布，不使用分类色装饰每个区间。"],
            ["解释变化", "瀑布图", "表达期初、增加、减少与期末，三类颜色固定。"],
            ["看相关与空间", "散点图、地图", "必须说明坐标、大小或区域色阶含义，并提供列表替代。"],
          ].map(([question, charts, rule]) => (
            <div key={question} className="grid min-w-[720px] grid-cols-[160px_220px_minmax(0,1fr)] border-t border-[var(--neutral-100)] px-5 py-3.5 text-sm"><strong className="text-[var(--text-primary)]">{question}</strong><span className="text-[var(--text-secondary)]">{charts}</span><span className="text-[var(--text-secondary)]">{rule}</span></div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Patterns" title="高频图表规范" description="沿用标签页规范的后台三级层级：一级切换图表类别，二级切换案例与规则，三级只改变当前图表形态。" />
        <div className="bg-[var(--neutral-100)]">
          <Tabs
            defaultValue="bar"
            variant="page"
            size="lg"
            panelClassName="bg-white p-4 md:p-5"
            items={[
              { value: "bar", label: "柱状图", content: <BarCategory /> },
              { value: "donut", label: "饼图", content: <DonutCategory /> },
              { value: "curve", label: "曲线图", content: <CurveCategory /> },
            ]}
          />
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Color encoding" title="DBS 数据色与图表配方" description="颜色页维护 DBS 的 10 个数据色系；高频图表按 01 / 05 / 06 / 07 / 08 的 Examples 组合使用精确色值，不从色谱中挑近似色替换。" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {colorModels.map((model) => (
            <div key={model.title} className="border border-[var(--neutral-200)] bg-white p-5">
              <p className="text-sm font-semibold text-[var(--text-primary)]">{model.title}</p>
              <div className="mt-3 flex h-7 overflow-hidden rounded-[var(--radius-sm)]">{model.colors.map((item, index) => <span key={`${item}-${index}`} className="flex-1" style={{ backgroundColor: item }} />)}</div>
              <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">{model.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="Delivery contract" title="代码与 Figma（设计工具）交付合同" description="本规范是规则源头；DBS Examples 是本轮浅色图表视觉依据，网页验收通过后，React、Vue 和 Figma（设计工具）使用同名属性与状态。" />
        <RuleCallout title="组件合同">
          <p><code>Chart</code> 统一负责标题、副标题、操作区、图例、绘图区、加载/空状态和可选明细表；具体图形只负责数据编码，不重复绘制容器。</p>
        </RuleCallout>
        <div className="mt-4">
          <SpecList items={[
            "图表类型属性（chartType）：柱状图包含 bar、grouped-bar、stacked-bar、horizontal-bar、bidirectional-bar；饼图包含 pie、donut、semi-donut；曲线图包含 line、multi-line、area、stacked-area。",
            "尺寸属性（size）：sm、md、lg，对应 4 / 8 / 12 栅格列宽，不以缩小文字替代响应式重排。",
            "状态属性：state 使用 default、hovered、selected；edgeCase 使用 none、low-value、no-data、new-data、partially-unavailable；趋势线、基准点、数据点和平滑线使用独立布尔属性。",
            "浅色视觉配方：颜色、网格线、文字、线宽、数据点和切片分隔统一引用 dbsChartStyles；不增加暗色主题属性，数据色不等于业务状态色。",
            "可访问性：可见标题、键盘焦点、非颜色编码、工具提示与等价数据表缺一不可。",
            "实现来源：React 使用 src/components/ui/Chart.tsx，Vue 使用 XcChart.vue；页面示例不得另建不兼容容器。",
          ]} />
        </div>
      </section>
    </div>
  );
}
