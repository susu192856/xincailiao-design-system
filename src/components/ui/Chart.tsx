import { useId, type ReactNode } from "react";

export type ChartType =
  | "line"
  | "bar"
  | "donut"
  | "waterfall"
  | "histogram"
  | "area"
  | "candlestick"
  | "heatmap"
  | "stacked-bar"
  | "stacked-area";

export type ChartSize = "sm" | "md" | "lg";

export type ChartLegendItem = {
  label: string;
  color: string;
  shape?: "line" | "block" | "dot";
};

export type ChartRenderContext = {
  chartType: ChartType;
  colors: string[];
  data: unknown[];
};

export type ChartProps = {
  chartType: ChartType;
  title: string;
  description?: string;
  legendItems?: ChartLegendItem[];
  colors?: string[];
  data?: unknown[];
  size?: ChartSize;
  actions?: ReactNode;
  children?: ReactNode | ((context: ChartRenderContext) => ReactNode);
  table?: ReactNode;
  showTable?: boolean;
  empty?: boolean;
  loading?: boolean;
  ariaLabel?: string;
  className?: string;
};

const plotSizeClasses: Record<ChartSize, string> = {
  sm: "min-h-[200px]",
  md: "min-h-[280px]",
  lg: "min-h-[360px]",
};

export function Chart({
  chartType,
  title,
  description,
  legendItems = [],
  colors = ["var(--data-blue-2)", "var(--data-green-2)", "var(--data-purple-2)"],
  data = [],
  size = "md",
  actions,
  children,
  table,
  showTable = false,
  empty = false,
  loading = false,
  ariaLabel,
  className = "",
}: ChartProps) {
  const titleId = `chart-${useId().replace(/:/g, "")}`;
  const plot = typeof children === "function" ? children({ chartType, colors, data }) : children;

  return (
    <figure
      className={[
        "overflow-hidden rounded-[var(--radius-sm)] border border-[var(--neutral-200)] bg-white",
        className,
      ].join(" ")}
      data-chart-type={chartType}
      data-chart-size={size}
      aria-labelledby={titleId}
      aria-busy={loading || undefined}
    >
      <figcaption className="flex flex-col gap-4 border-b border-[var(--neutral-200)] px-4 py-4 sm:flex-row sm:items-start sm:justify-between sm:px-5">
        <div className="min-w-0">
          <h3 id={titleId} className="text-base font-semibold leading-6 text-[var(--text-primary)]">{title}</h3>
          {description ? <p className="mt-1 text-sm leading-6 text-[var(--text-secondary)]">{description}</p> : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </figcaption>

      {legendItems.length ? (
        <ul className="flex flex-wrap gap-x-4 gap-y-2 px-4 pt-4 text-xs leading-5 text-[var(--text-secondary)] sm:px-5" aria-label="图例">
          {legendItems.map((item) => (
            <li key={item.label} className="inline-flex items-center gap-1.5">
              <span
                className={[
                  "shrink-0",
                  item.shape === "line" ? "h-0.5 w-5 rounded-full" : item.shape === "dot" ? "h-2.5 w-2.5 rounded-full" : "h-2.5 w-2.5 rounded-[2px]",
                ].join(" ")}
                style={{ backgroundColor: item.color }}
                aria-hidden="true"
              />
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      ) : null}

      {loading ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-3 px-5 py-8 text-sm text-[var(--text-tertiary)]" role="status">
          <span className="h-2 w-28 animate-pulse rounded-full bg-[var(--neutral-200)]" />
          图表加载中
        </div>
      ) : empty ? (
        <div className="flex min-h-64 flex-col items-center justify-center gap-1 px-5 py-8 text-center" role="status">
          <strong className="text-base font-medium text-[var(--text-primary)]">暂无数据</strong>
          <span className="text-sm leading-6 text-[var(--text-tertiary)]">调整时间范围或筛选条件后重试。</span>
        </div>
      ) : (
        <div
          className={["min-w-0 overflow-x-auto px-4 py-5 sm:px-5", plotSizeClasses[size]].join(" ")}
          role="group"
          aria-label={ariaLabel ?? `${title}图表`}
        >
          {plot}
        </div>
      )}

      {showTable && table && !loading && !empty ? (
        <div className="overflow-x-auto border-t border-[var(--neutral-200)] px-4 py-4 sm:px-5" aria-label={`${title}明细数据`}>
          {table}
        </div>
      ) : null}
    </figure>
  );
}
