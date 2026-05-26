import type { ReactNode } from "react";

type TabItem = {
  value: string;
  label: string;
  content: ReactNode;
  disabled?: boolean;
};

type TabsProps = {
  items: TabItem[];
  value: string;
  onValueChange?: (value: string) => void;
  className?: string;
};

export function Tabs({ items, value, onValueChange, className = "" }: TabsProps) {
  const activeItem = items.find((item) => item.value === value) ?? items[0];

  return (
    <div className={className}>
      <div className="flex border-b border-[var(--neutral-200)]">
        {items.map((item) => {
          const active = item.value === activeItem.value;
          return (
            <button
              key={item.value}
              type="button"
              disabled={item.disabled}
              onClick={() => onValueChange?.(item.value)}
              className={[
                "border-b-2 px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50",
                active
                  ? "border-[var(--neutral-900)] text-[var(--neutral-900)]"
                  : "border-transparent text-[var(--neutral-600)] hover:text-[var(--neutral-900)]",
              ].join(" ")}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      <div className="pt-4">{activeItem.content}</div>
    </div>
  );
}
