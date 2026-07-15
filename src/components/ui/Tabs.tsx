import { useId, useState, type ReactNode } from "react";

type TabItem = {
  value: string;
  label: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  badge?: ReactNode;
  icon?: ReactNode;
  disabledReason?: string;
};

export type TabsProps = {
  items: TabItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: "line" | "page" | "card" | "segment" | "text";
  size?: "sm" | "md" | "lg";
  className?: string;
  listClassName?: string;
  panelClassName?: string;
};

const sizeClass = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-2.5 text-base",
};

function getTabClass(variant: NonNullable<TabsProps["variant"]>, active: boolean, size: NonNullable<TabsProps["size"]>) {
  const base = [
    "inline-flex items-center gap-1.5 whitespace-nowrap transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--neutral-900)]",
    "disabled:cursor-not-allowed disabled:opacity-50",
    variant === "page" ? "" : sizeClass[size],
  ];

  if (variant === "page") {
    base.push(
      "relative h-10 w-full justify-center border-0 px-3.5 py-1.5 text-base",
      "after:absolute after:right-0 after:h-4 after:w-px after:bg-[var(--neutral-200)] last:after:hidden",
      active
        ? "bg-white font-medium text-[var(--neutral-900)]"
        : "bg-transparent text-[var(--text-tertiary)] hover:bg-[var(--neutral-50)] hover:text-[var(--neutral-900)]",
    );
  } else if (variant === "card") {
    base.push(
      "border border-[var(--neutral-200)]",
      active
        ? "bg-white text-[var(--text-primary)]"
        : "bg-[var(--neutral-50)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
    );
  } else if (variant === "segment") {
    base.push(
      "rounded-[var(--radius-sm)]",
      size === "sm" ? "h-6 px-2 py-0" : "",
      active
        ? "bg-white text-[var(--text-primary)] shadow-[var(--shadow-xs)]"
        : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
    );
  } else if (variant === "text") {
    base.push(
      "relative border-0 px-2 after:absolute after:-right-1.5 after:h-3 after:w-px after:bg-[var(--neutral-300)] last:after:hidden",
      active
        ? "font-normal text-[var(--product-blue-600)]"
        : "text-[var(--text-tertiary)] hover:text-[var(--neutral-900)]",
    );
  } else {
    base.push(
      "relative border-0 after:absolute after:bottom-0 after:left-1/2 after:h-0.5 after:-translate-x-1/2",
      active
        ? "text-[var(--text-primary)] after:w-8 after:bg-[var(--neutral-900)]"
        : "text-[var(--text-tertiary)] after:w-0 hover:text-[var(--text-primary)]",
    );
  }

  return base.join(" ");
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  variant = "line",
  size = "md",
  className = "",
  listClassName = "",
  panelClassName = "",
}: TabsProps) {
  const [internalValue, setInternalValue] = useState(defaultValue ?? items[0]?.value ?? "");
  const instanceId = useId().replace(/:/g, "");
  const currentValue = value ?? internalValue;
  const activeItem = items.find((item) => item.value === currentValue) ?? items[0];

  function handleChange(nextValue: string) {
    if (value === undefined) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  }

  return (
    <div className={className}>
      <div
        className={[
          "flex overflow-x-auto",
          variant === "line" ? "gap-4 border-b border-[var(--neutral-200)]" : "",
          variant === "page" ? "inline-grid w-fit grid-flow-col auto-cols-fr gap-0 rounded-[var(--radius-sm)] bg-[var(--neutral-100)]" : "",
          variant === "segment" ? "w-fit rounded-[var(--radius-sm)] bg-[var(--neutral-100)] p-0.5" : "",
          variant === "text" ? "w-fit gap-3" : "",
          variant === "card" ? "gap-1" : "",
          listClassName,
        ].join(" ")}
        role="tablist"
      >
        {items.map((item) => {
          const active = item.value === activeItem.value;
          return (
            <button
              key={item.value}
              type="button"
              disabled={item.disabled}
              title={item.disabled ? item.disabledReason : undefined}
              onClick={() => handleChange(item.value)}
              className={getTabClass(variant, active, size)}
              role="tab"
              aria-selected={active}
              aria-controls={`${instanceId}-${item.value}-panel`}
              id={`${instanceId}-${item.value}-tab`}
            >
              {item.icon}
              {item.label}
              {item.badge ? <span className="text-xs text-[var(--text-tertiary)]">{item.badge}</span> : null}
            </button>
          );
        })}
      </div>
      {activeItem?.content ? (
        <div
          role="tabpanel"
          id={`${instanceId}-${activeItem.value}-panel`}
          aria-labelledby={`${instanceId}-${activeItem.value}-tab`}
          className={[
            variant === "page" ? "min-h-12 bg-[var(--neutral-50)] p-4" : "pt-4",
            panelClassName,
          ].join(" ")}
        >
          {activeItem.content}
        </div>
      ) : null}
    </div>
  );
}
