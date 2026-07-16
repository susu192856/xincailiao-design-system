import { useState, type ReactNode } from "react";
import CodeBlock from "../../../components/docs/CodeBlock";
import DocsTable from "../../../components/docs/DocsTable";
import PageHeader from "../../../components/docs/PageHeader";
import { RuleCallout, SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { Chart, type ChartLegendItem } from "../../../components/ui/Chart";
import { Tabs } from "../../../components/ui/Tabs";
import { chartColorFamilies } from "../../../data/chartColors";

type ColorFamilyKey = (typeof chartColorFamilies)[number]["key"];
type BarMode = "single" | "grouped";
type CurveMode = "line" | "area" | "stacked-area";

const colorFamilyIndex = Object.fromEntries(
  chartColorFamilies.map((family) => [family.key, family]),
) as Record<ColorFamilyKey, (typeof chartColorFamilies)[number]>;

function color(family: ColorFamilyKey, shade: number) {
  return colorFamilyIndex[family].shades[shade];
}

const barData = [
  { label: "铝合金", current: 76, previous: 62 },
  { label: "工程塑料", current: 58, previous: 48 },
  { label: "铜合金", current: 86, previous: 70 },
  { label: "复合材料", current: 64, previous: 52 },
  { label: "特种钢", current: 48, previous: 44 },
  { label: "陶瓷", current: 34, previous: 28 },
];

const donutData = [
  { label: "材料性能", value: 34, amount: "42,860", color: color("blue", 2) },
  { label: "工艺参数", value: 26, amount: "32,780", color: color("green", 2) },
  { label: "检测报告", value: 18, amount: "22,690", color: color("purple", 2) },
  { label: "供应信息", value: 14, amount: "17,640", color: color("amber", 1) },
  { label: "其他", value: 8, amount: "10,080", color: "var(--neutral-400)" },
];

const curveData = {
  labels: ["一月", "二月", "三月", "四月", "五月", "六月"],
  primary: [34, 52, 46, 68, 62, 82],
  secondary: [22, 31, 38, 42, 54, 61],
  tertiary: [14, 20, 26, 34, 39, 48],
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

function BarChartDemo() {
  const [mode, setMode] = useState<BarMode>("single");
  const [activeIndex, setActiveIndex] = useState(2);
  const active = barData[activeIndex];
  const max = 100;
  const legend: ChartLegendItem[] = mode === "single"
    ? [{ label: "本期数据量", color: "var(--product-blue-500)" }]
    : [
        { label: "本期", color: "var(--product-blue-500)" },
        { label: "上期", color: "var(--product-blue-200)" },
      ];

  return (
    <Chart
      chartType="bar"
      title="材料数据量对比"
      description="按材料类别比较已治理数据量；柱形从零基线开始，选择任一类别查看精确值。"
      legendItems={legend}
      actions={(
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as BarMode)}
          variant="segment"
          size="sm"
          items={[
            { value: "single", label: "单系列", content: null },
            { value: "grouped", label: "分组对比", content: null },
          ]}
        />
      )}
      showTable
      table={(
        <DataTable
          columns={["材料类别", "本期数据量", "上期数据量", "环比"]}
          rows={barData.map((item) => [item.label, `${item.current} 万条`, `${item.previous} 万条`, `+${Math.round(((item.current - item.previous) / item.previous) * 100)}%`])}
        />
      )}
      ariaLabel="可交互材料数据量柱状图"
    >
      <div className="min-w-[640px]">
        <div className="relative h-[292px] pb-8 pl-12">
          {["100", "75", "50", "25", "0"].map((label, index) => (
            <span key={label} className="absolute left-0 font-data text-xs tabular-nums text-[var(--text-tertiary)]" style={{ top: `${index * 56 - 6}px` }}>{label}</span>
          ))}
          <div className="absolute bottom-8 left-12 right-0 top-0 flex flex-col justify-between" aria-hidden="true">
            {[0, 1, 2, 3, 4].map((line) => <span key={line} className="h-px bg-[var(--neutral-200)]" />)}
          </div>
          <div className="absolute bottom-8 left-12 right-0 top-0 grid grid-cols-6">
            {barData.map((item, index) => {
              const selected = index === activeIndex;
              const tooltipAlign = index === 0 ? "left-1" : index === barData.length - 1 ? "right-1" : "left-1/2 -translate-x-1/2";
              return (
                <button
                  key={item.label}
                  type="button"
                  className={[
                    "group relative flex h-full items-end justify-center gap-1 px-3 outline-none transition-colors",
                    selected ? "bg-[var(--neutral-50)]" : "hover:bg-[var(--neutral-50)] focus-visible:bg-[var(--neutral-50)]",
                  ].join(" ")}
                  onMouseEnter={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`${item.label}：本期 ${item.current} 万条，上期 ${item.previous} 万条`}
                  aria-pressed={selected}
                >
                  {selected ? (
                    <span className={["absolute top-2 z-10 w-36 rounded-[var(--radius-sm)] bg-[var(--neutral-900)] px-3 py-2 text-left text-xs leading-5 text-white shadow-[var(--shadow-md)]", tooltipAlign].join(" ")} role="status">
                      <strong className="block font-medium">{item.label}</strong>
                      <span className="block text-[var(--neutral-200)]">本期 {item.current} 万条</span>
                      {mode === "grouped" ? <span className="block text-[var(--neutral-200)]">上期 {item.previous} 万条</span> : null}
                    </span>
                  ) : null}
                  {mode === "grouped" ? (
                    <span className="w-4 rounded-t-[2px] bg-[var(--product-blue-200)] transition-[height]" style={{ height: `${(item.previous / max) * 70}%` }} aria-hidden="true" />
                  ) : null}
                  <span className="w-6 rounded-t-[2px] bg-[var(--product-blue-500)] transition-[height]" style={{ height: `${(item.current / max) * 70}%` }} aria-hidden="true" />
                  <span className="absolute -bottom-7 left-1/2 w-full -translate-x-1/2 truncate px-1 text-center text-xs text-[var(--text-tertiary)]">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 border-t border-[var(--neutral-100)] pt-4">
          <div><p className="text-xs text-[var(--text-tertiary)]">当前类别</p><p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{active.label}</p></div>
          <div><p className="text-xs text-[var(--text-tertiary)]">本期</p><p className="mt-1 font-data text-lg font-semibold tabular-nums text-[var(--text-primary)]">{active.current} 万</p></div>
          <div><p className="text-xs text-[var(--text-tertiary)]">环比</p><p className="mt-1 font-data text-lg font-semibold tabular-nums text-[var(--success-text)]">+{Math.round(((active.current - active.previous) / active.previous) * 100)}%</p></div>
        </div>
      </div>
    </Chart>
  );
}

function DonutChartDemo() {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = donutData[activeIndex];
  const circumference = 2 * Math.PI * 62;
  let offset = 0;

  return (
    <Chart
      chartType="donut"
      title="数据资产构成"
      description="查看已治理数据按内容类型的构成；不超过 5 个切片，并同步提供精确明细。"
      actions={<span className="text-xs leading-6 text-[var(--text-tertiary)]">本月 · 共 126,050 条</span>}
      showTable
      table={<DataTable columns={["内容类型", "占比", "数据量"]} rows={donutData.map((item) => [item.label, `${item.value}%`, `${item.amount} 条`])} />}
      ariaLabel="可交互数据资产构成环图"
    >
      <div className="grid min-w-[560px] gap-8 md:grid-cols-[300px_minmax(0,1fr)] md:items-center">
        <svg className="mx-auto h-auto w-full max-w-[300px]" viewBox="0 0 220 220" role="img" aria-label="数据资产构成环图，可聚焦每个切片查看明细">
          <circle cx="110" cy="110" r="62" fill="none" stroke="var(--neutral-100)" strokeWidth="24" />
          {donutData.map((item, index) => {
            const segment = (item.value / 100) * circumference;
            const dashOffset = -offset;
            offset += segment;
            const selected = index === activeIndex;
            return (
              <circle
                key={item.label}
                cx="110"
                cy="110"
                r="62"
                fill="none"
                stroke={item.color}
                strokeWidth={selected ? 30 : 24}
                strokeDasharray={`${Math.max(segment - 3, 0)} ${circumference - segment + 3}`}
                strokeDashoffset={dashOffset}
                transform="rotate(-90 110 110)"
                className="cursor-pointer outline-none transition-[stroke-width,opacity] focus-visible:opacity-70"
                opacity={selected ? 1 : 0.72}
                tabIndex={0}
                role="button"
                aria-label={`${item.label}，占比 ${item.value}%`}
                onMouseEnter={() => setActiveIndex(index)}
                onFocus={() => setActiveIndex(index)}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") setActiveIndex(index);
                }}
              />
            );
          })}
          <text x="110" y="104" textAnchor="middle" fill="var(--neutral-900)" fontSize="25" fontWeight="600" className="font-data">{active.value}%</text>
          <text x="110" y="126" textAnchor="middle" fill="var(--neutral-600)" fontSize="12">{active.label}</text>
        </svg>
        <div className="space-y-2">
          {donutData.map((item, index) => (
            <button
              key={item.label}
              type="button"
              className={[
                "grid w-full grid-cols-[12px_minmax(0,1fr)_auto_auto] items-center gap-3 rounded-[var(--radius-sm)] px-3 py-2.5 text-left text-sm outline-none transition-colors",
                index === activeIndex ? "bg-[var(--neutral-100)]" : "hover:bg-[var(--neutral-50)] focus-visible:bg-[var(--neutral-50)]",
              ].join(" ")}
              onMouseEnter={() => setActiveIndex(index)}
              onFocus={() => setActiveIndex(index)}
              onClick={() => setActiveIndex(index)}
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
    </Chart>
  );
}

function pointString(values: number[]) {
  return values.map((value, index) => `${70 + index * 100},${240 - value * 2}`).join(" ");
}

function areaPath(values: number[]) {
  const points = values.map((value, index) => `${70 + index * 100} ${240 - value * 2}`).join(" L ");
  return `M ${points} L 570 240 L 70 240 Z`;
}

function betweenPath(upper: number[], lower: number[]) {
  const upperPoints = upper.map((value, index) => `${70 + index * 100} ${240 - value * 2}`).join(" L ");
  const lowerPoints = lower.map((value, index) => `${70 + (lower.length - 1 - index) * 100} ${240 - lower[lower.length - 1 - index] * 2}`).join(" L ");
  return `M ${upperPoints} L ${lowerPoints} Z`;
}

function CurveChartDemo() {
  const [mode, setMode] = useState<CurveMode>("line");
  const [activeIndex, setActiveIndex] = useState(3);
  const x = 70 + activeIndex * 100;
  const tooltipX = Math.max(12, Math.min(x - 68, 492));
  const stackedTotal = curveData.primary.map((value, index) => Math.min(value + curveData.secondary[index] * 0.45, 96));
  const legend: ChartLegendItem[] = mode === "line"
    ? [
        { label: "数据空间", color: color("blue", 2), shape: "line" },
        { label: "材料库", color: color("green", 2), shape: "line" },
        { label: "智能分析", color: color("purple", 2), shape: "line" },
      ]
    : mode === "area"
      ? [{ label: "数据调用量", color: color("blue", 2), shape: "line" }]
      : [
          { label: "数据空间", color: color("blue", 2) },
          { label: "材料库", color: color("green", 2) },
        ];

  return (
    <Chart
      chartType={mode}
      title="材料数据调用趋势"
      description="折线看变化，面积看单系列体量，堆叠面积看稳定分类的构成变化。"
      legendItems={legend}
      actions={(
        <Tabs
          value={mode}
          onValueChange={(value) => setMode(value as CurveMode)}
          variant="segment"
          size="sm"
          items={[
            { value: "line", label: "折线", content: null },
            { value: "area", label: "面积", content: null },
            { value: "stacked-area", label: "堆叠面积", content: null },
          ]}
        />
      )}
      showTable
      table={(
        <DataTable
          columns={["月份", "数据空间", "材料库", "智能分析"]}
          rows={curveData.labels.map((label, index) => [label, `${curveData.primary[index]} 万次`, `${curveData.secondary[index]} 万次`, `${curveData.tertiary[index]} 万次`])}
        />
      )}
      ariaLabel="可交互材料数据调用趋势图"
    >
      <div className="min-w-[640px]">
        <svg className="h-auto w-full" viewBox="0 0 640 280" role="img" aria-label={`${mode === "line" ? "折线" : mode === "area" ? "面积" : "堆叠面积"}趋势图，可聚焦月份查看精确值`}>
          {[40, 90, 140, 190, 240].map((y) => <line key={y} x1="50" x2="610" y1={y} y2={y} stroke="var(--neutral-200)" />)}
          {curveData.labels.map((label, index) => (
            <text key={label} x={70 + index * 100} y="265" textAnchor="middle" fill="var(--neutral-600)" fontSize="11">{label}</text>
          ))}
          {mode === "area" ? (
            <>
              <path d={areaPath(curveData.primary)} fill={color("blue", 0)} opacity="0.32" />
              <polyline points={pointString(curveData.primary)} fill="none" stroke={color("blue", 3)} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            </>
          ) : mode === "stacked-area" ? (
            <>
              <path d={areaPath(curveData.primary)} fill={color("blue", 1)} opacity="0.72" />
              <path d={betweenPath(stackedTotal, curveData.primary)} fill={color("green", 1)} opacity="0.72" />
              <polyline points={pointString(stackedTotal)} fill="none" stroke={color("green", 3)} strokeWidth="2" />
            </>
          ) : (
            <>
              <polyline points={pointString(curveData.primary)} fill="none" stroke={color("blue", 3)} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              <polyline points={pointString(curveData.secondary)} fill="none" stroke={color("green", 3)} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              <polyline points={pointString(curveData.tertiary)} fill="none" stroke={color("purple", 3)} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
            </>
          )}
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
              {index === activeIndex ? <line x1={70 + index * 100} x2={70 + index * 100} y1="28" y2="240" stroke="var(--neutral-400)" strokeDasharray="4 4" /> : null}
            </g>
          ))}
          <g transform={`translate(${tooltipX} 34)`} role="status">
            <rect width="136" height={mode === "line" ? 88 : 66} rx="3" fill="var(--neutral-900)" />
            <text x="12" y="20" fill="white" fontSize="11" fontWeight="600">{curveData.labels[activeIndex]}</text>
            <text x="12" y="41" fill="var(--neutral-200)" fontSize="10">数据空间</text>
            <text x="122" y="41" fill="white" fontSize="11" textAnchor="end">{curveData.primary[activeIndex]} 万</text>
            {mode === "line" ? (
              <>
                <text x="12" y="61" fill="var(--neutral-200)" fontSize="10">材料库</text>
                <text x="122" y="61" fill="white" fontSize="11" textAnchor="end">{curveData.secondary[activeIndex]} 万</text>
                <text x="12" y="79" fill="var(--neutral-200)" fontSize="10">智能分析</text>
                <text x="122" y="79" fill="white" fontSize="11" textAnchor="end">{curveData.tertiary[activeIndex]} 万</text>
              </>
            ) : null}
          </g>
        </svg>
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
      ["设计交付", "Figma 提供默认、悬浮、选中、带趋势线、带表格和移动端列表状态。"],
    ],
    donut: [
      ["桌面端", "悬浮切片与对应图例行同步高亮；中心区域显示当前切片名称和占比。"],
      ["移动端", "点击切片或明细行保持选中，优先通过列表读精确值，不依赖小切片命中。"],
      ["键盘与读屏", "切片可聚焦并播报名称与占比；同时提供包含数量和占比的明细表。"],
      ["设计交付", "Figma 将切片、中心值、图例行和选中态拆分为可复用部件。"],
    ],
    curve: [
      ["桌面端", "悬浮整列时间带，工具提示同时显示同一时间点的所有系列，不追逐细小折线。"],
      ["移动端", "点击时间点后保持选中，图下列表同步显示该时间点明细；复杂序列允许横向滚动。"],
      ["键盘与读屏", "每个时间点可聚焦；读屏内容包含日期、系列名、数值和单位，表格提供完整历史。"],
      ["设计交付", "Figma 分离折线、面积、堆叠面积三种类型，不用一个布尔属性临时改变含义。"],
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
                "圆角仅用于顶部两个角，半径固定为 2px，底部保持直角以准确贴合零基线。",
                "尺寸按 12 / 8 / 4 栅格列宽提供大、中、小三档；小尺寸减少刻度数量，不缩小正文。",
                "趋势线和基准点必须在图例中说明编码，不与柱形使用同一颜色。",
              ]} />
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
                <RuleSurface title="避免" tone="dont"><p>超过 5 个切片时改为排序条形图或表格；不要使用 3D、爆炸切片或相近颜色制造装饰效果。</p></RuleSurface>
              </div>
              <SpecList items={[
                "完整环图用于构成；半环图仅用于有明确目标上限的进度或区间，不作为普通占比装饰。",
                "切片按业务顺序或数值降序排列，“其他”固定置于末尾并使用中性灰。",
                "切片之间保留 2–3px 白色分隔，不用粗描边；最小可见切片不足 3% 时合并为“其他”。",
                "图例同时显示名称、数量和占比，不能只靠颜色判断类别。",
                "移动端优先保证明细列表可读，环图可缩小但交互目标不得小于 44px。",
              ]} />
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
                "同图折线不超过 4 条；超过时用筛选、分面小图或拆分视图。",
                "面积填充透明度低于边界线，确保网格、阈值和标注仍然清楚。",
                "堆叠面积分类顺序必须稳定，最重要系列靠近基线；不适合比较中间层的精确变化。",
                "时间轴保持等距；缺失值显示断线或明确缺口，不用零值伪造连续。",
              ]} />
            </div>
          ),
        },
        { value: "interaction", label: "交互与适配", content: <InteractionRules type="curve" /> },
      ]}
    />
  );
}

const colorModels = [
  { title: "分类比较", colors: [color("blue", 2), color("green", 2), color("purple", 2), color("amber", 1)], text: "不同类别使用不同色系，默认不超过 6 类。" },
  { title: "连续强弱", colors: [0, 1, 2, 3, 4].map((shade) => color("blue", shade)), text: "同一指标从浅到深，表示数值递增。" },
  { title: "正负发散", colors: [color("red", 4), color("red", 1), "#F1F3F5", color("blue", 1), color("blue", 4)], text: "以明确业务基准为中心区分下降与上升。" },
  { title: "单项强调", colors: ["#D5DAE1", "#D5DAE1", color("blue", 3), "#D5DAE1", "#D5DAE1"], text: "其余数据降噪，仅突出当前或推荐项。" },
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
            ["柱状图", "比大小", "离散类别、分组对比、长标签横向条形"],
            ["饼图", "看构成", "少量占比、总量构成、明确目标进度"],
            ["曲线图", "看趋势", "折线、面积与堆叠面积的连续时间变化"],
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
        <SectionHeading eyebrow="Patterns" title="高频图表规范" description="先切换图表类别，再在案例、使用规则、交互与适配之间切换。默认只加载当前内容，控制页面长度和阅读负担。" />
        <Tabs
          defaultValue="bar"
          variant="page"
          size="lg"
          className="border border-[var(--neutral-200)] bg-[var(--neutral-100)]"
          panelClassName="bg-[var(--neutral-50)] p-4 md:p-6"
          items={[
            { value: "bar", label: "柱状图", content: <BarCategory /> },
            { value: "donut", label: "饼图", content: <DonutCategory /> },
            { value: "curve", label: "曲线图", content: <CurveCategory /> },
          ]}
        />
      </section>

      <section>
        <SectionHeading eyebrow="Color encoding" title="跨图表共享的颜色编码" description="完整数据色板在颜色页维护；图表页只保留选择模型，避免重复展示 70 个色值。" />
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
        <SectionHeading eyebrow="Delivery contract" title="代码与 Figma（设计工具）交付合同" description="本规范是规则源头；网页验收通过后，React、Vue 和 Figma（设计工具）使用同名属性与状态。" />
        <RuleCallout title="组件合同">
          <p><code>Chart</code> 统一负责标题、副标题、操作区、图例、绘图区、加载/空状态和可选明细表；具体图形只负责数据编码，不重复绘制容器。</p>
        </RuleCallout>
        <div className="mt-4">
          <SpecList items={[
            "图表类型属性（chartType）：bar、donut、line、area、stacked-area；低频类型按选型矩阵扩展。",
            "尺寸属性（size）：sm、md、lg，对应 4 / 8 / 12 栅格列宽，不以缩小文字替代响应式重排。",
            "状态属性（state）：default、hover、selected、loading、empty、with-table；Figma（设计工具）必须提供可静态检查的关键状态。",
            "设计变量（Token）：颜色、网格线、文字、圆角和阴影只引用现有变量；数据色不等于业务状态色。",
            "可访问性：可见标题、键盘焦点、非颜色编码、工具提示与等价数据表缺一不可。",
            "实现来源：React 使用 src/components/ui/Chart.tsx，Vue 使用 XcChart.vue；页面示例不得另建不兼容容器。",
          ]} />
        </div>
      </section>
    </div>
  );
}
