import { useState, type ReactNode } from "react";

type TabItem = {
  value: string;
  label: ReactNode;
  content?: ReactNode;
  disabled?: boolean;
  badge?: ReactNode;
  icon?: ReactNode;
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
    sizeClass[size],
  ];

  if (variant === "page") {
    base.push(
      "relative border-0",
      "after:absolute after:right-0 after:h-4 after:w-px after:bg-[var(--neutral-200)] last:after:hidden",
      active
        ? "bg-white font-semibold text-[var(--neutral-900)]"
        : "bg-white text-[var(--text-tertiary)] hover:text-[var(--neutral-900)]",
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
      active
        ? "bg-white text-[var(--text-primary)] shadow-[var(--shadow-xs)]"
        : "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
    );
  } else if (variant === "text") {
    base.push(
      "border-0 px-2",
      active
        ? "font-semibold text-[var(--neutral-900)]"
        : "text-[var(--text-tertiary)] hover:text-[var(--neutral-900)]",
    );
  } else {
    base.push(
      "border-b-2",
      active
        ? "border-[var(--neutral-900)] text-[var(--text-primary)]"
        : "border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
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
          variant === "page" ? "gap-0 bg-white px-2" : "",
          variant === "segment" ? "w-fit rounded-[var(--radius-sm)] bg-[var(--neutral-100)] p-1" : "",
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
              onClick={() => handleChange(item.value)}
              className={getTabClass(variant, active, size)}
              role="tab"
              aria-selected={active}
            >
              {item.icon}
              {item.label}
              {item.badge ? <span className="text-xs text-[var(--text-tertiary)]">{item.badge}</span> : null}
            </button>
          );
        })}
      </div>
      {activeItem?.content ? <div className={["pt-4", panelClassName].join(" ")}>{activeItem.content}</div> : null}
    </div>
  );
}
