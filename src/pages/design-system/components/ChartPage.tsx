import type { ReactNode } from "react";
import PageHeader from "../../../components/docs/PageHeader";
import { SectionHeading, SpecList } from "../../../components/docs/ComponentDoc";
import { chartColorFamilies } from "../../../data/chartColors";

type 色系键名 = (typeof chartColorFamilies)[number]["key"];

type 图例项 = {
  名称: string;
  颜色: string;
  形态?: "线" | "面" | "点";
};

const 色系索引 = Object.fromEntries(chartColorFamilies.map((family) => [family.key, family])) as Record<色系键名, (typeof chartColorFamilies)[number]>;

function 取色(色系: 色系键名, 层级: number) {
  return 色系索引[色系].shades[层级];
}

const 分类色 = [
  { 名称: "数据空间", 颜色: 取色("blue", 2) },
  { 名称: "材料库", 颜色: 取色("green", 2) },
  { 名称: "智能分析", 颜色: 取色("purple", 2) },
  { 名称: "采购协同", 颜色: 取色("amber", 1) },
  { 名称: "风险异常", 颜色: 取色("red", 2) },
  { 名称: "供应状态", 颜色: 取色("orange", 2) },
];

const 色彩组合 = [
  {
    标题: "分类对比",
    用途: "比较不同材料、模型、部门或渠道。",
    规则: "优先使用 2–6 个颜色，超过 6 个合并为“其他”；相邻系列避免使用同一色系的近似层级。",
    颜色: 分类色.map((item) => item.颜色),
  },
  {
    标题: "连续强弱",
    用途: "表达热度、强度、完成率、成熟度等从低到高的单向变化。",
    规则: "只选择一个色系，由浅到深排列；不要混入红、绿等会被理解为状态判断的颜色。",
    颜色: [0, 1, 2, 3, 4, 5].map((i) => 取色("blue", i)),
  },
  {
    标题: "正负发散",
    用途: "表达围绕基准线的下降与上升、亏损与收益、低于与高于目标。",
    规则: "中点必须有清晰业务含义；负向用暖色，正向用冷色，中性区保留灰白缓冲。",
    颜色: [取色("red", 4), 取色("red", 2), 取色("red", 0), "#F1F3F5", 取色("blue", 0), 取色("blue", 2), 取色("blue", 4)],
  },
  {
    标题: "重点强调",
    用途: "在一组数据中突出当前项、异常项或推荐项。",
    规则: "基础数据保持低饱和或浅层级，重点项使用同色系更深层级；异常仍使用语义色标注。",
    颜色: ["#D5DAE1", "#D5DAE1", 取色("green", 3), "#D5DAE1", "#D5DAE1"],
  },
];

const 图表选型 = [
  ["看趋势", "折线图、面积图", "保留时间顺序，线宽 2 像素；系列超过 4 条时优先拆分。"],
  ["比大小", "柱状图、横向条形图", "柱状图必须从零基线开始；长名称用横向条形图。"],
  ["看构成", "堆叠柱、环图", "环图控制在 5 项以内；超过 5 项改为条形图或表格。"],
  ["看分布", "直方图、箱线图", "分箱间距保持一致，避免用分类色制造无意义差异。"],
  ["看相关", "散点图、气泡图", "颜色表示类别，大小表示数量；必须配合图例和坐标说明。"],
  ["看偏离", "发散条形图、阈值线", "以业务基准为中心，颜色只表达正负方向，不表达品牌。"],
];

const 图表类型样式 = [
  ["图表元素", "坐标轴、网格线、图例、悬浮提示和明细表", "作为所有图表的基础部件复用，网格线轻、文字清楚、悬浮提示只补充精确值。"],
  ["柱状图", "比较离散品类、部门、区域或材料类型", "单数据集使用单色；分组柱最多 3 组；柱形从零基线开始。"],
  ["堆叠柱状图", "比较总量及内部构成", "只在总量和构成都重要时使用；堆叠顺序保持稳定，不临时换色。"],
  ["瀑布图", "解释总量变化的增加、减少和汇总", "正向、负向、汇总三类颜色必须固定；连接线使用弱分割线。"],
  ["直方图", "查看数值分布、频次、区间集中度", "分箱宽度一致，柱间距为 0 或极小；不要使用分类色装饰每个箱。"],
  ["折线图", "查看连续时间变化和多系列趋势", "线条优先直接标注；超过 4 条拆分或使用筛选，不堆叠过密。"],
  ["面积图", "查看单系列累计趋势或体量变化", "填充透明度低于线条；面积不得遮挡坐标与关键标注。"],
  ["堆叠面积图", "查看整体趋势中的构成变化", "只用于少量稳定分类；分类过多时改为堆叠柱或表格。"],
  ["环图与半环图", "查看少量构成、进度或占比", "不超过 5 个切片；小切片合并为“其他”，并配明细表。"],
  ["地图图表", "查看空间分布、区域热度或覆盖情况", "用连续色表达强弱，不用分类色随机填充地图；必须补区域列表。"],
  ["开高低收图", "查看价格、指数或行情区间", "适合专业行情，不用普通折线过度简化；必须说明开盘、最高、最低、收盘含义。"],
];

function 色条({ 颜色 }: { 颜色: string[] }) {
  return (
    <div className="flex h-8 overflow-hidden rounded-sm border border-white">
      {颜色.map((color, index) => (
        <span key={`${color}-${index}`} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </div>
  );
}

function 图例({ items }: { items: 图例项[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[var(--text-secondary)]">
      {items.map((item) => (
        <span key={item.名称} className="inline-flex items-center gap-1.5">
          <span
            className={item.形态 === "线" ? "h-0.5 w-5 rounded-full" : "h-2.5 w-2.5 rounded-sm"}
            style={{ backgroundColor: item.颜色 }}
          />
          {item.名称}
        </span>
      ))}
    </div>
  );
}

function 图表容器({
  标题,
  说明,
  右侧,
  图例项,
  children,
  表格,
}: {
  标题: string;
  说明: string;
  右侧?: string;
  图例项: 图例项[];
  children: ReactNode;
  表格?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
      <div className="border-b border-[var(--neutral-200)] px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-base font-semibold leading-6 text-[var(--text-primary)]">{标题}</h3>
            <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{说明}</p>
          </div>
          {右侧 ? <span className="shrink-0 text-xs leading-5 text-[var(--text-tertiary)]">{右侧}</span> : null}
        </div>
        <div className="mt-4">
          <图例 items={图例项} />
        </div>
      </div>
      <div className="p-5">
        {children}
        {表格 ? <div className="mt-5">{表格}</div> : null}
      </div>
    </div>
  );
}

function 明细表({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-sm border border-[var(--neutral-200)]">
      <div className="min-w-[520px]">
        <div className="grid bg-[var(--neutral-50)] text-xs font-semibold text-[var(--text-secondary)]" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
          {columns.map((column) => (
            <div key={column} className="border-r border-[var(--neutral-200)] px-3 py-2.5 last:border-r-0">{column}</div>
          ))}
        </div>
        {rows.map((row) => (
          <div key={row.join("-")} className="grid border-t border-[var(--neutral-100)] text-xs text-[var(--text-secondary)]" style={{ gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))` }}>
            {row.map((cell, index) => (
              <div key={`${cell}-${index}`} className="border-r border-[var(--neutral-100)] px-3 py-2.5 last:border-r-0">{cell}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function 坐标文字({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return <text x={x} y={y} fill="var(--neutral-600)" fontSize="11">{children}</text>;
}

function 折线图示例() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 640 260" role="img" aria-label="三条材料数据趋势折线图">
      {[48, 92, 136, 180].map((y) => (
        <line key={y} x1="56" x2="608" y1={y} y2={y} stroke="var(--neutral-200)" strokeWidth="1" />
      ))}
      <line x1="56" x2="608" y1="220" y2="220" stroke="var(--neutral-300)" />
      <line x1="56" x2="56" y1="32" y2="220" stroke="var(--neutral-300)" />
      {["一月", "二月", "三月", "四月", "五月", "六月"].map((label, index) => (
        <坐标文字 key={label} x={72 + index * 98} y={244}>{label}</坐标文字>
      ))}
      {["0", "25", "50", "75"].map((label, index) => (
        <坐标文字 key={label} x={20} y={224 - index * 44}>{label}</坐标文字>
      ))}
      <polyline points="74,180 172,150 270,118 368,108 466,82 564,58" fill="none" stroke={取色("blue", 2)} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points="74,194 172,166 270,156 368,126 466,116 564,92" fill="none" stroke={取色("green", 2)} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points="74,206 172,196 270,174 368,160 466,146 564,134" fill="none" stroke={取色("purple", 2)} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
      <line x1="56" x2="608" y1="118" y2="118" stroke="var(--warning-text)" strokeDasharray="5 5" />
      <text x="520" y="110" fill="var(--warning-text)" fontSize="11">目标线</text>
      {[["74,180", 取色("blue", 2)], ["368,126", 取色("green", 2)], ["564,134", 取色("purple", 2)]].map(([point, color]) => {
        const [x, y] = point.split(",").map(Number);
        return <circle key={point} cx={x} cy={y} r="4" fill="white" stroke={color} strokeWidth="2" />;
      })}
    </svg>
  );
}

function 柱状图示例() {
  const bars = [
    { label: "铝材", value: 142, color: 取色("blue", 2) },
    { label: "铜材", value: 118, color: 取色("green", 2) },
    { label: "硅材", value: 96, color: 取色("purple", 2) },
    { label: "树脂", value: 74, color: 取色("amber", 1) },
    { label: "助剂", value: 58, color: 取色("orange", 2) },
  ];

  return (
    <svg className="h-auto w-full" viewBox="0 0 640 260" role="img" aria-label="材料品类采购量柱状图">
      {[52, 94, 136, 178].map((y) => (
        <line key={y} x1="56" x2="608" y1={y} y2={y} stroke="var(--neutral-200)" strokeWidth="1" />
      ))}
      <line x1="56" x2="608" y1="220" y2="220" stroke="var(--neutral-300)" />
      <line x1="56" x2="56" y1="32" y2="220" stroke="var(--neutral-300)" />
      {bars.map((bar, index) => {
        const height = bar.value;
        const x = 86 + index * 96;
        const y = 220 - height;
        return (
          <g key={bar.label}>
            <rect x={x} y={y} width="42" height={height} rx="2" fill={bar.color} />
            <坐标文字 x={x + 4} y={244}>{bar.label}</坐标文字>
            <text x={x + 6} y={y - 8} fill="var(--neutral-700)" fontSize="11">{bar.value}</text>
          </g>
        );
      })}
      <坐标文字 x={16} y={224}>0</坐标文字>
      <坐标文字 x={10} y={138}>100</坐标文字>
      <坐标文字 x={10} y={54}>200</坐标文字>
    </svg>
  );
}

function 发散图示例() {
  const rows = [
    ["华东", -28],
    ["华南", 18],
    ["华北", 44],
    ["西南", -12],
    ["海外", 31],
  ] as const;

  return (
    <svg className="h-auto w-full" viewBox="0 0 640 260" role="img" aria-label="区域目标偏离发散条形图">
      <line x1="320" x2="320" y1="32" y2="224" stroke="var(--neutral-500)" strokeDasharray="4 4" />
      <坐标文字 x={304} y={244}>基准</坐标文字>
      {rows.map(([label, value], index) => {
        const y = 48 + index * 36;
        const width = Math.abs(value) * 4;
        const isNegative = value < 0;
        return (
          <g key={label}>
            <坐标文字 x={60} y={y + 14}>{label}</坐标文字>
            <rect
              x={isNegative ? 320 - width : 320}
              y={y}
              width={width}
              height="20"
              rx="2"
              fill={isNegative ? 取色("red", 3) : 取色("blue", 3)}
            />
            <text x={isNegative ? 320 - width - 34 : 320 + width + 8} y={y + 14} fill="var(--neutral-700)" fontSize="11">{value}%</text>
          </g>
        );
      })}
    </svg>
  );
}

function 环图示例() {
  const segments = [
    { 名称: "数据空间", 值: 34, 颜色: 取色("blue", 2) },
    { 名称: "材料库", 值: 26, 颜色: 取色("green", 2) },
    { 名称: "智能分析", 值: 18, 颜色: 取色("purple", 2) },
    { 名称: "采购协同", 值: 14, 颜色: 取色("amber", 1) },
    { 名称: "其他", 值: 8, 颜色: "var(--neutral-400)" },
  ];
  const circumference = 339.292;
  let offset = 0;

  return (
    <div className="grid gap-5 md:grid-cols-[260px_minmax(0,1fr)] md:items-center">
      <svg className="mx-auto h-auto w-full max-w-[260px]" viewBox="0 0 180 180" role="img" aria-label="数据模块占比环图">
        <circle cx="90" cy="90" r="54" fill="none" stroke="var(--neutral-100)" strokeWidth="28" />
        {segments.map((item) => {
          const dash = Math.max((item.值 / 100) * circumference - 2, 0);
          const dashOffset = -offset;
          offset += (item.值 / 100) * circumference;
          return (
            <circle
              key={item.名称}
              cx="90"
              cy="90"
              r="54"
              fill="none"
              stroke={item.颜色}
              strokeWidth="28"
              strokeDasharray={`${dash} ${circumference - dash}`}
              strokeDashoffset={dashOffset}
              transform="rotate(-90 90 90)"
            />
          );
        })}
        <text x="90" y="84" textAnchor="middle" fill="var(--neutral-900)" fontSize="20" fontWeight="700">100%</text>
        <text x="90" y="105" textAnchor="middle" fill="var(--neutral-600)" fontSize="11">总占比</text>
      </svg>
      <div className="space-y-2">
        {segments.map((item) => (
          <div key={item.名称} className="grid grid-cols-[12px_1fr_auto] items-center gap-2 text-sm">
            <span className="h-3 w-3 rounded-sm" style={{ backgroundColor: item.颜色 }} />
            <span className="text-[var(--text-secondary)]">{item.名称}</span>
            <span className="font-semibold text-[var(--text-primary)]">{item.值}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function 热力矩阵示例() {
  const rows = ["强度", "韧性", "耐温", "成本"];
  const columns = ["一月", "二月", "三月", "四月", "五月"];
  const levels = [0, 1, 2, 3, 4, 5, 2, 4, 3, 1, 5, 4, 2, 1, 0, 1, 3, 5, 4, 2];
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[520px]">
        <div className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] text-xs font-semibold text-[var(--text-secondary)]">
          <span />
          {columns.map((column) => <span key={column} className="px-2 py-2 text-center">{column}</span>)}
        </div>
        {rows.map((row, rowIndex) => (
          <div key={row} className="grid grid-cols-[64px_repeat(5,minmax(0,1fr))] items-center gap-1 text-xs">
            <span className="text-[var(--text-secondary)]">{row}</span>
            {columns.map((column, columnIndex) => {
              const level = levels[rowIndex * columns.length + columnIndex];
              return (
                <span
                  key={`${row}-${column}`}
                  className="flex h-10 items-center justify-center rounded-sm font-semibold"
                  style={{ backgroundColor: 取色("blue", level), color: level > 3 ? "white" : "var(--neutral-900)" }}
                >
                  {level + 1}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function 瀑布图示例() {
  const bars = [
    { label: "期初", value: 90, start: 0, color: "var(--neutral-500)" },
    { label: "新增", value: 46, start: 90, color: 取色("blue", 3) },
    { label: "降本", value: 24, start: 136, color: 取色("blue", 2) },
    { label: "损耗", value: -32, start: 160, color: 取色("red", 3) },
    { label: "期末", value: 128, start: 0, color: "var(--neutral-900)" },
  ];
  return (
    <svg className="h-auto w-full" viewBox="0 0 640 260" role="img" aria-label="成本变化瀑布图">
      {[58, 98, 138, 178, 218].map((y) => <line key={y} x1="56" x2="608" y1={y} y2={y} stroke="var(--neutral-200)" />)}
      <line x1="56" x2="608" y1="220" y2="220" stroke="var(--neutral-300)" />
      {bars.map((bar, index) => {
        const x = 80 + index * 96;
        const top = 220 - Math.max(bar.start, bar.start + bar.value);
        const height = Math.abs(bar.value);
        return (
          <g key={bar.label}>
            <rect x={x} y={top} width="44" height={height} rx="2" fill={bar.color} />
            <坐标文字 x={x - 2} y={244}>{bar.label}</坐标文字>
            <text x={x + 4} y={top - 8} fill="var(--neutral-700)" fontSize="11">{bar.value > 0 && index !== 0 && index !== bars.length - 1 ? `+${bar.value}` : bar.value}</text>
            {index > 0 && index < bars.length - 1 ? <line x1={x - 52} x2={x} y1={220 - bar.start} y2={220 - bar.start} stroke="var(--neutral-300)" strokeDasharray="4 4" /> : null}
          </g>
        );
      })}
    </svg>
  );
}

function 直方图示例() {
  const values = [18, 42, 76, 112, 146, 132, 104, 68, 36, 22];
  return (
    <svg className="h-auto w-full" viewBox="0 0 640 260" role="img" aria-label="材料强度分布直方图">
      {[52, 94, 136, 178].map((y) => <line key={y} x1="56" x2="608" y1={y} y2={y} stroke="var(--neutral-200)" />)}
      <line x1="56" x2="608" y1="220" y2="220" stroke="var(--neutral-300)" />
      <line x1="56" x2="56" y1="32" y2="220" stroke="var(--neutral-300)" />
      {values.map((value, index) => {
        const x = 74 + index * 50;
        const y = 220 - value;
        return <rect key={index} x={x} y={y} width="46" height={value} fill={取色("blue", 2)} opacity={index === 4 ? 1 : 0.72} />;
      })}
      {["0", "20", "40", "60", "80", "100"].map((label, index) => <坐标文字 key={label} x={70 + index * 50} y={244}>{label}</坐标文字>)}
    </svg>
  );
}

function 面积图示例() {
  return (
    <svg className="h-auto w-full" viewBox="0 0 640 260" role="img" aria-label="模型调用面积趋势图">
      {[52, 94, 136, 178].map((y) => <line key={y} x1="56" x2="608" y1={y} y2={y} stroke="var(--neutral-200)" />)}
      <line x1="56" x2="608" y1="220" y2="220" stroke="var(--neutral-300)" />
      <path d="M74 188 L170 172 L266 132 L362 118 L458 82 L564 64 L564 220 L74 220 Z" fill={取色("green", 1)} opacity="0.28" />
      <path d="M74 188 L170 172 L266 132 L362 118 L458 82 L564 64" fill="none" stroke={取色("green", 3)} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      {["一月", "二月", "三月", "四月", "五月", "六月"].map((label, index) => <坐标文字 key={label} x={72 + index * 98} y={244}>{label}</坐标文字>)}
      <text x="430" y="72" fill="var(--neutral-700)" fontSize="11">增长趋势</text>
    </svg>
  );
}

function 开高低收图示例() {
  const rows = [
    { x: 100, high: 58, low: 192, open: 132, close: 96, up: true },
    { x: 172, high: 72, low: 206, open: 108, close: 150, up: false },
    { x: 244, high: 46, low: 178, open: 138, close: 82, up: true },
    { x: 316, high: 66, low: 198, open: 96, close: 142, up: false },
    { x: 388, high: 54, low: 176, open: 130, close: 88, up: true },
    { x: 460, high: 88, low: 212, open: 118, close: 164, up: false },
    { x: 532, high: 62, low: 188, open: 152, close: 102, up: true },
  ];
  return (
    <svg className="h-auto w-full" viewBox="0 0 640 260" role="img" aria-label="材料指数开高低收图">
      {[52, 94, 136, 178, 220].map((y) => <line key={y} x1="56" x2="608" y1={y} y2={y} stroke="var(--neutral-200)" />)}
      <line x1="56" x2="608" y1="220" y2="220" stroke="var(--neutral-300)" />
      {rows.map((item, index) => {
        const color = item.up ? 取色("blue", 3) : 取色("red", 3);
        const y = Math.min(item.open, item.close);
        const height = Math.abs(item.open - item.close);
        return (
          <g key={index}>
            <line x1={item.x} x2={item.x} y1={item.high} y2={item.low} stroke={color} strokeWidth="2" />
            <rect x={item.x - 10} y={y} width="20" height={height} fill="white" stroke={color} strokeWidth="2" />
          </g>
        );
      })}
      <坐标文字 x={76} y={244}>周一</坐标文字>
      <坐标文字 x={508} y={244}>周日</坐标文字>
    </svg>
  );
}

export default function ChartPage() {
  return (
    <div className="space-y-16">
      <PageHeader
        title="图表"
        description="图表规范用于统一数据色组合、图表结构、标题表头和可视化组件拆解方式。色值与颜色页共用同一数据源，设计稿和代码只维护一套数据色板。"
      />

      <section>
        <SectionHeading
          eyebrow="数据色板"
          title="数据色板"
          description="共 10 个色系，每系 7 个深浅层级。色板参考社区数据可视化资源的色系组织方式，在新材道规范中以中文命名和组件化规则落地。"
        />
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {chartColorFamilies.map((family) => (
            <div key={family.key} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-[var(--text-primary)]">{family.name}</p>
                <p className="text-xs text-[var(--text-tertiary)]">7 个层级</p>
              </div>
              <div className="mt-3 flex h-10 overflow-hidden rounded-sm">
                {family.shades.map((color) => (
                  <span key={color} className="flex-1" style={{ backgroundColor: color }} />
                ))}
              </div>
              <div className="mt-3 grid grid-cols-7 gap-1 text-center font-mono text-[10px] text-[var(--text-tertiary)]">
                {family.shades.map((color) => (
                  <span key={color} className="truncate" title={color}>{color}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="组合规则"
          title="数据色组合使用规则"
          description="先判断数据关系，再选择配色模型。不要把 10 个色系当作装饰色随机排列，颜色必须服务于数据比较、顺序、偏离或重点。"
        />
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {色彩组合.map((item) => (
            <div key={item.标题} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{item.标题}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{item.用途}</p>
              <div className="mt-4"><色条 颜色={item.颜色} /></div>
              <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">{item.规则}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="图表选型"
          title="先选问题，再选图表"
          description="图表不是页面装饰。每个图表必须回答一个明确问题，并能在标题、副标题、图例、坐标和表格明细中被拆解复用。"
        />
        <div className="mt-6 overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="min-w-[760px]">
            <div className="grid grid-cols-[160px_220px_minmax(0,1fr)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-semibold text-[var(--text-secondary)]">
              <span>业务问题</span>
              <span>推荐图表</span>
              <span>使用规则</span>
            </div>
            {图表选型.map(([question, chart, rule]) => (
              <div key={question} className="grid grid-cols-[160px_220px_minmax(0,1fr)] border-t border-[var(--neutral-100)] px-5 py-4 text-sm">
                <strong className="text-[var(--text-primary)]">{question}</strong>
                <span className="text-[var(--text-secondary)]">{chart}</span>
                <span className="leading-6 text-[var(--text-secondary)]">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="类型样式"
          title="完整图表类型样式"
          description="参考文件按图表元素、图表构建器和多个图表类型拆分。新材道规范保留这种可拆解思路，但在页面中统一为中文规则，便于设计师复制和开发复用。"
        />
        <div className="mt-6 overflow-x-auto rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white">
          <div className="min-w-[900px]">
            <div className="grid grid-cols-[160px_260px_minmax(0,1fr)] bg-[var(--neutral-50)] px-5 py-3 text-xs font-semibold text-[var(--text-secondary)]">
              <span>类型</span>
              <span>适用场景</span>
              <span>样式规则</span>
            </div>
            {图表类型样式.map(([type, scene, rule]) => (
              <div key={type} className="grid grid-cols-[160px_260px_minmax(0,1fr)] border-t border-[var(--neutral-100)] px-5 py-4 text-sm">
                <strong className="text-[var(--text-primary)]">{type}</strong>
                <span className="leading-6 text-[var(--text-secondary)]">{scene}</span>
                <span className="leading-6 text-[var(--text-secondary)]">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="结构拆解"
          title="标题、表头与图表容器拆解"
          description="图表必须被拆成稳定部件，方便设计师复制、前端组件化和移动端重排。"
        />
        <div className="mt-6 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {[
            ["标题区", "标题回答“这张图看什么”，副标题说明口径、时间范围、样本量和筛选条件。右侧放更新时间或局部操作。"],
            ["图例区", "2 条以内可直接标在线上；3 条以上使用图例。图例只解释数据系列，不承载筛选入口。"],
            ["绘图区", "坐标轴文字使用说明字号，网格线使用弱分割线，阈值线使用语义色和文字标注。"],
            ["表头区", "图表下方明细表沿用表格规范：表头浅灰背景、说明字号、字段名短而明确。"],
            ["空状态", "无数据时保留标题和筛选条件，绘图区替换为空状态，不隐藏整个模块。"],
            ["移动端", "标题、图例、图表、表格纵向堆叠；复杂图表允许横向滚动，不能压缩到不可读。"],
          ].map(([title, content]) => (
            <div key={title} className="rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white p-5">
              <h3 className="text-base font-semibold text-[var(--text-primary)]">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{content}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionHeading
          eyebrow="样式示例"
          title="可复用图表示例"
          description="以下示例使用同一套容器、标题、图例、坐标标注和明细表结构。图表区域可替换，外围信息结构保持一致。"
        />
        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <图表容器
            标题="材料数据调用趋势"
            说明="按月查看数据空间、材料库和智能分析的调用变化。"
            右侧="近 6 个月"
            图例项={[
              { 名称: "数据空间", 颜色: 取色("blue", 2), 形态: "线" },
              { 名称: "材料库", 颜色: 取色("green", 2), 形态: "线" },
              { 名称: "智能分析", 颜色: 取色("purple", 2), 形态: "线" },
            ]}
          >
            <折线图示例 />
          </图表容器>

          <图表容器
            标题="品类采购量对比"
            说明="比较不同材料品类的采购量，柱状图从零基线开始。"
            右侧="单位：吨"
            图例项={[{ 名称: "采购量", 颜色: 取色("blue", 2) }]}
            表格={<明细表 columns={["品类", "采购量", "变化"]} rows={[["铝材", "142", "+12%"], ["铜材", "118", "+8%"], ["硅材", "96", "-3%"]]} />}
          >
            <柱状图示例 />
          </图表容器>

          <图表容器
            标题="区域目标偏离"
            说明="围绕基准线比较各区域与目标值的偏离方向。"
            右侧="目标差异"
            图例项={[
              { 名称: "低于目标", 颜色: 取色("red", 3) },
              { 名称: "高于目标", 颜色: 取色("blue", 3) },
            ]}
          >
            <发散图示例 />
          </图表容器>

          <图表容器
            标题="模块访问占比"
            说明="环图只用于少量构成关系，“其他”固定使用中性灰并放在末尾。"
            右侧="本月"
            图例项={分类色.slice(0, 4).map((item) => ({ 名称: item.名称, 颜色: item.颜色 })).concat([{ 名称: "其他", 颜色: "var(--neutral-400)" }])}
          >
            <环图示例 />
          </图表容器>

          <div className="xl:col-span-2">
            <图表容器
              标题="材料指标热力矩阵"
              说明="连续色用于表达同一指标的强弱变化，表头和单元格可独立复用。"
              右侧="评分：1–6"
              图例项={[
                { 名称: "低", 颜色: 取色("blue", 0) },
                { 名称: "中", 颜色: 取色("blue", 3) },
                { 名称: "高", 颜色: 取色("blue", 5) },
              ]}
            >
              <热力矩阵示例 />
            </图表容器>
          </div>

          <图表容器
            标题="成本变化拆解"
            说明="瀑布图用于解释从期初到期末的增加、减少和汇总变化。"
            右侧="单位：万元"
            图例项={[
              { 名称: "增加", 颜色: 取色("blue", 3) },
              { 名称: "减少", 颜色: 取色("red", 3) },
              { 名称: "汇总", 颜色: "var(--neutral-900)" },
            ]}
          >
            <瀑布图示例 />
          </图表容器>

          <图表容器
            标题="材料强度分布"
            说明="直方图用于查看连续数值的区间分布，所有分箱使用同一色系。"
            右侧="样本：240"
            图例项={[{ 名称: "样本频次", 颜色: 取色("blue", 2) }]}
          >
            <直方图示例 />
          </图表容器>

          <图表容器
            标题="模型调用体量"
            说明="面积图用于表达单系列趋势和体量变化，填充层只做辅助。"
            右侧="近 6 个月"
            图例项={[{ 名称: "调用量", 颜色: 取色("green", 3), 形态: "线" }]}
          >
            <面积图示例 />
          </图表容器>

          <图表容器
            标题="材料指数波动"
            说明="开高低收图用于专业行情场景，不能用普通折线过度简化价格区间。"
            右侧="本周"
            图例项={[
              { 名称: "上涨", 颜色: 取色("blue", 3) },
              { 名称: "下跌", 颜色: 取色("red", 3) },
            ]}
          >
            <开高低收图示例 />
          </图表容器>
        </div>
      </section>

      <section>
        <SectionHeading eyebrow="使用原则" title="交付前检查" />
        <SpecList
          items={[
            "所有图表必须有标题；标题不足以说明口径时必须补副标题。",
            "颜色不能作为唯一信息来源，必须配合图例、标签、数值、线型或表格明细。",
            "同一页面中的同一业务对象必须保持同一颜色，不跨模块随意换色。",
            "危险、成功、警告、信息提示使用语义色；数据色只用于数据系列。",
            "移动端优先保留可读性，复杂图表允许横向滚动，不把坐标和标签压缩到不可读。",
            "如果图表无法回答明确业务问题，改用指标卡、表格或说明文字。",
          ]}
        />
      </section>
    </div>
  );
}
