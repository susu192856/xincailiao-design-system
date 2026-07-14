import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

type DescriptionItem = {
  key?: string | number;
  label: ReactNode;
  value?: ReactNode;
  span?: 1 | 2 | 3 | 4;
};

export type DescriptionListProps = HTMLAttributes<HTMLDListElement> & {
  items: DescriptionItem[];
  columns?: 1 | 2 | 3 | 4;
  bordered?: boolean;
  emptyText?: ReactNode;
  size?: "sm" | "md";
  layout?: "stacked" | "inline";
  labelWidth?: number | string;
};

const columnClasses: Record<1 | 2 | 3 | 4, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-3",
  4: "grid-cols-1 md:grid-cols-4",
};

const spanClasses: Record<1 | 2 | 3 | 4, string> = {
  1: "",
  2: "md:col-span-2",
  3: "md:col-span-3",
  4: "md:col-span-4",
};

const sizeClasses = {
  sm: {
    padding: "p-3",
    label: "text-sm leading-5",
    value: "mt-1 text-sm leading-5",
  },
  md: {
    padding: "p-4",
    label: "text-sm leading-[var(--type-body-m-line-height)]",
    value: "mt-1 text-sm leading-[var(--type-body-m-line-height)]",
  },
};

export function DescriptionList({
  items,
  columns = 2,
  bordered = true,
  emptyText = "--",
  size = "md",
  layout = "inline",
  labelWidth = 88,
  className = "",
  ...props
}: DescriptionListProps) {
  const sizing = sizeClasses[size];
  const labelStyle = layout === "inline"
    ? ({ "--description-label-width": typeof labelWidth === "number" ? `${labelWidth}px` : labelWidth } as CSSProperties)
    : undefined;

  return (
    <dl
      className={[
        "grid rounded-[var(--radius-sm)] text-sm",
        columnClasses[columns],
        bordered
          ? "gap-px overflow-hidden border border-[var(--neutral-200)] bg-[var(--neutral-200)]"
          : `bg-white ${size === "sm" ? "gap-x-10 gap-y-5" : "gap-x-10 gap-y-6"}`,
        className,
      ].join(" ")}
      {...props}
    >
      {items.map((item, index) => {
        const effectiveSpan = Math.min(item.span ?? 1, columns) as 1 | 2 | 3 | 4;
        return (
          <div
            key={item.key ?? index}
            className={[
              spanClasses[effectiveSpan],
              bordered ? "bg-white" : "",
              layout === "inline"
                ? `block md:flex ${bordered ? "md:items-stretch md:gap-0" : "md:items-baseline md:gap-3"}`
                : "",
            ].join(" ")}
          >
            <dt
              className={[
                sizing.label,
                "shrink-0 text-[var(--text-tertiary)]",
                bordered ? `${sizing.padding} bg-[var(--neutral-50)]` : "",
                layout === "inline"
                  ? bordered
                    ? "w-auto md:w-[var(--description-label-width)] md:text-right"
                    : "mb-1 w-auto md:mb-0 md:w-[var(--description-label-width)] md:text-right"
                  : "",
              ].join(" ")}
              style={labelStyle}
            >
              {item.label}
            </dt>
            <dd
              className={[
                layout === "inline" || bordered ? sizing.value.replace("mt-1 ", "") : sizing.value,
                bordered ? `${sizing.padding} bg-white` : "",
                "min-w-0 flex-1 [overflow-wrap:anywhere] text-[var(--text-primary)]",
              ].join(" ")}
            >
              {item.value ?? <span className="text-[var(--neutral-400)]">{emptyText}</span>}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}
